// Byte ranges for the site's video files.
//
// Workers static assets answer a `Range` request with 200 and the whole file, and no
// `Accept-Ranges` or `Content-Range` (Cloudflare's "Billing and Limitations" page, section
// "Range requests": https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/).
// Safari on iPhone and iPad needs byte-range support from the server that hosts a video
// (Apple, "Configuring Your Server" in the Safari Web Content Guide). So the Worker runs first
// for video paths (`assets.run_worker_first` in the wrangler configs) and answers the one range
// asked for. Pages and pictures never come here.
//
// Two ways, the cheap one first. The Workers Cache API answers a `Range` request natively from a
// cached full copy (https://developers.cloudflare.com/workers/runtime-apis/cache/: `match` returns
// 206 for a stored response with a Content-Length, 304 for If-None-Match, 416 with
// `Content-Range: bytes */size`; 512 MB an object on Free; a copy lives as long as its
// Cache-Control says and may go sooner; copies stay in the data centre that made them). On a miss
// the Worker takes the file from the assets binding, answers that request itself by cutting the
// bytes, and puts the whole file in the cache for the next ones. Cutting the stream in JS costs CPU
// in proportion to where the range starts (the binding cannot seek), so it is the fallback.

/** The extensions `assets.run_worker_first` sends here in the wrangler configs (tests/workerd.test.mjs holds the three configs to one list). */
export function isVideoPath(pathname: string): boolean {
  return /\.(mp4|m4v|mov|webm)$/i.test(pathname);
}

export type RangeOutcome =
  | { kind: "full" }
  | { kind: "unsatisfiable" }
  | { kind: "partial"; start: number; end: number };

/**
 * Reads a `Range` header against a file of `size` bytes (RFC 9110, section 14). One range is
 * served. A header this does not understand, a reversed range and several ranges at once are
 * ignored, which the RFC allows: the caller then sends the whole file with 200. `end` is inclusive.
 */
export function parseRange(header: string | null, size: number): RangeOutcome {
  if (header === null) return { kind: "full" };
  const match = /^\s*bytes\s*=\s*(\d*)\s*-\s*(\d*)\s*$/i.exec(header);
  if (!match) return { kind: "full" };
  const [, first, last] = match;
  if (first === "" && last === "") return { kind: "full" };
  if (first === "") {
    // A suffix: the last N bytes.
    const length = Number(last);
    if (length === 0 || size === 0) return { kind: "unsatisfiable" };
    return { kind: "partial", start: Math.max(size - length, 0), end: size - 1 };
  }
  const start = Number(first);
  if (last !== "" && Number(last) < start) return { kind: "full" };
  if (start >= size) return { kind: "unsatisfiable" };
  const end = last === "" ? size - 1 : Math.min(Number(last), size - 1);
  return { kind: "partial", start, end };
}

/** A body cut to bytes `start` to `end` (inclusive) of the source; the rest of the source is cancelled. */
export function sliceBody(
  source: ReadableStream<Uint8Array>,
  start: number,
  end: number,
): ReadableStream<Uint8Array> {
  const reader = source.getReader();
  let offset = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        const chunkStart = offset;
        offset += value.byteLength;
        if (offset <= start) continue;
        controller.enqueue(
          value.subarray(
            Math.max(start - chunkStart, 0),
            Math.min(end + 1 - chunkStart, value.byteLength),
          ),
        );
        if (offset > end) {
          controller.close();
          await reader.cancel();
        }
        return;
      }
    },
    cancel: (reason) => reader.cancel(reason),
  });
}

/** `If-Range` holds only for the exact strong ETag the file has now; anything else means "send it all". */
function ifRangeHolds(header: string | null, etag: string | null): boolean {
  if (header === null) return true;
  const value = header.trim();
  return etag !== null && !etag.startsWith("W/") && value === etag;
}

// The binding hands the Worker a body with no Content-Length (the edge adds one on the way out),
// and cutting a range needs the size for Content-Range and for "the last N bytes". The first
// request for a file in an isolate reads the whole body once and remembers its size under the
// file's ETag (a content hash) for ten minutes; requests that arrive while that read is going
// wait for the size instead of buffering the file again, and stream and cut the body. When the
// ten minutes are up the next miss reads the file again, which is also what puts it back in the
// cache after the cache has let go of it.
const sizes = new Map<string, { size: Promise<number>; at: number }>();
const sizesLimit = 32;
const sizesLifetimeMs = 10 * 60 * 1000;

type Source =
  | { kind: "bytes"; size: number; bytes: Uint8Array }
  | { kind: "stream"; size: number; body: ReadableStream<Uint8Array> };

async function sourceOf(upstream: Response): Promise<Source> {
  const etag = upstream.headers.get("etag");
  const known = etag === null ? undefined : sizes.get(etag);
  if (
    known !== undefined &&
    upstream.body !== null &&
    Date.now() - known.at < sizesLifetimeMs
  ) {
    try {
      return { kind: "stream", size: await known.size, body: upstream.body };
    } catch {
      // The read that was meant to give the size failed; read this one's own copy.
    }
  }
  const read = upstream.arrayBuffer().then((buffer) => new Uint8Array(buffer));
  if (etag !== null) {
    if (sizes.size >= sizesLimit) sizes.clear();
    const size = read.then((bytes) => bytes.byteLength);
    sizes.set(etag, { size, at: Date.now() });
    size.catch(() => sizes.delete(etag));
  }
  const bytes = await read;
  return { kind: "bytes", size: bytes.byteLength, bytes };
}

/** Bytes `start` to `end` (inclusive) of a source as a response body. */
function bodyOf(
  source: Source,
  start: number,
  end: number,
): BodyInit | ReadableStream<Uint8Array> {
  if (source.kind === "bytes") return source.bytes.subarray(start, end + 1);
  if (start === 0 && end === source.size - 1) return source.body;
  const { readable, writable } = new FixedLengthStream(end - start + 1);
  // A viewer who seeks or leaves cancels the stream; that is not an error.
  sliceBody(source.body, start, end)
    .pipeTo(writable)
    .catch(() => {});
  return readable;
}

export type VideoDeps = {
  assets: Fetcher;
  /** `caches.default`; without it every request is cut from the assets binding. */
  cache?: Cache;
  /** The Worker version's id: a new deploy's file is a new cache entry, never the old copy. */
  version?: string;
  waitUntil?: (promise: Promise<unknown>) => void;
};

/**
 * A request the cache is asked to answer: no range, or one plain `bytes=a-b`, `a-` or `-n` that
 * is not reversed. Anything else (several ranges, a reversed one, a bad unit) is answered by
 * `parseRange` and the binding, so what the visitor gets does not depend on the cache. A request
 * with `If-Range` is looked up too and kept only when the cached copy's strong ETag is the
 * validator (`fromCache`).
 */
export function cacheable(request: Request): boolean {
  const range = request.headers.get("range");
  if (range === null) return true;
  const match = /^\s*bytes\s*=\s*(\d*)\s*-\s*(\d*)\s*$/i.exec(range);
  if (!match || (match[1] === "" && match[2] === "")) return false;
  return (
    match[1] === "" || match[2] === "" || Number(match[2]) >= Number(match[1])
  );
}

/** One entry per video per Worker version; the visitor's query string never makes a new one. */
function cacheKey(url: string, version: string): Request {
  const key = new URL(url);
  key.search = "";
  key.hash = "";
  key.searchParams.set("v", version);
  return new Request(key, { method: "GET" });
}

async function fromCache(
  request: Request,
  deps: VideoDeps,
): Promise<Response | null> {
  // Without a version id a deploy could be served the file it replaced, so there is no cache.
  if (!deps.cache || deps.version === undefined || !cacheable(request)) {
    return null;
  }
  const key = cacheKey(request.url, deps.version);
  // Range and the conditional headers go with the lookup; the cache cuts and compares itself.
  const headers = new Headers();
  for (const name of ["range", "if-none-match", "if-modified-since"]) {
    const value = request.headers.get(name);
    if (value !== null) headers.set(name, value);
  }
  // If-Range is judged here, against the copy's ETag, not by the cache.
  let hit: Response | undefined;
  try {
    hit = await deps.cache.match(new Request(key, { headers }));
  } catch {
    return null;
  }
  if (!hit) return null;
  const ranged = request.headers.has("range");
  const conditional =
    request.headers.has("if-none-match") ||
    request.headers.has("if-modified-since");
  // An If-Range is the slicer's rule too: it holds only for the copy's strong ETag, otherwise the
  // whole file is sent, which the binding path does.
  const ifRange = request.headers.get("if-range");
  const sound =
    (hit.status === 304 && conditional) ||
    (hit.status === 200 && !ranged) ||
    ((hit.status === 206 || hit.status === 416) &&
      ranged &&
      hit.headers.has("content-range") &&
      ifRangeHolds(ifRange, hit.headers.get("etag")));
  if (!sound) {
    await hit.body?.cancel();
    return null;
  }
  const out = new Headers(hit.headers);
  out.set("Accept-Ranges", "bytes");
  if (hit.status === 416) {
    // The same 416 as the slicer's: no validator, no type, never cached.
    out.delete("ETag");
    out.delete("Content-Type");
    out.set("Content-Length", "0");
    out.set("Cache-Control", "no-store");
    await hit.body?.cancel();
    return new Response(null, { status: 416, headers: out });
  }
  if (request.method === "HEAD") {
    await hit.body?.cancel();
    return new Response(null, { status: hit.status, headers: out });
  }
  return new Response(hit.body, { status: hit.status, headers: out });
}

/** Puts the whole file in the cache after the visitor has been answered. */
function storeInCache(
  deps: VideoDeps,
  request: Request,
  upstream: Response,
  bytes: Uint8Array,
): void {
  if (!deps.cache || !deps.waitUntil) return;
  const headers = new Headers(upstream.headers);
  headers.delete("Set-Cookie");
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Length", String(bytes.byteLength));
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "public, max-age=3600");
  }
  if (deps.version === undefined) return;
  deps.waitUntil(
    deps.cache
      .put(
        cacheKey(request.url, deps.version),
        new Response(bytes, { status: 200, headers }),
      )
      .catch(() => {}),
  );
}

/**
 * Answers a GET or HEAD for a video with byte-range support: from the cache when it has the
 * file, otherwise cut from the assets binding. Caching headers, the content type and the ETag
 * are the ones the asset already carries (`public/_headers`).
 */
export async function serveVideo(
  request: Request,
  deps: VideoDeps,
): Promise<Response> {
  const { assets } = deps;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed.", {
      status: 405,
      headers: { Allow: "GET, HEAD", "Cache-Control": "no-store" },
    });
  }
  const cached = await fromCache(request, deps);
  if (cached) return cached;
  const rangeHeader = request.headers.get("range");
  // The binding does not slice, so it is asked for the whole file. A conditional request goes
  // through to it, and its 304 is final (RFC 9110: If-None-Match comes before Range).
  const headers = new Headers();
  for (const name of ["if-none-match", "if-modified-since"]) {
    const value = request.headers.get(name);
    if (value !== null) headers.set(name, value);
  }
  const upstream = await assets.fetch(
    new Request(request.url, { method: "GET", headers }),
  );
  if (
    upstream.status !== 200 ||
    upstream.body === null ||
    upstream.headers.has("content-encoding")
  ) {
    // A 304, a 404 or anything this cannot slice goes back as the binding made it.
    const passed = new Response(upstream.body, upstream);
    if (upstream.status === 304) passed.headers.set("Accept-Ranges", "bytes");
    return passed;
  }

  const head = request.method === "HEAD";
  const source = await sourceOf(upstream);
  if (source.kind === "bytes") {
    storeInCache(deps, request, upstream, source.bytes);
  }
  const size = source.size;
  const outcome = ifRangeHolds(
    request.headers.get("if-range"),
    upstream.headers.get("etag"),
  )
    ? parseRange(rangeHeader, size)
    : ({ kind: "full" } as const);

  const out = new Headers(upstream.headers);
  out.set("Accept-Ranges", "bytes");
  if (outcome.kind === "unsatisfiable") {
    if (source.kind === "stream") await source.body.cancel();
    out.delete("ETag");
    out.delete("Content-Type");
    out.set("Content-Range", `bytes */${size}`);
    out.set("Content-Length", "0");
    out.set("Cache-Control", "no-store");
    return new Response(null, { status: 416, headers: out });
  }
  const partial = outcome.kind === "partial";
  const start = partial ? outcome.start : 0;
  const end = partial ? outcome.end : size - 1;
  out.set("Content-Length", String(Math.max(end - start + 1, 0)));
  if (partial) out.set("Content-Range", `bytes ${start}-${end}/${size}`);
  if (head || size === 0) {
    if (source.kind === "stream") await source.body.cancel();
    return new Response(null, { status: partial ? 206 : 200, headers: out });
  }
  return new Response(bodyOf(source, start, end), {
    status: partial ? 206 : 200,
    headers: out,
  });
}
