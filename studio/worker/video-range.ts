// Byte ranges for the site's video files.
//
// Workers static assets answer a `Range` request with 200 and the whole file, and no
// `Accept-Ranges` or `Content-Range` (Cloudflare's "Billing and Limitations" page, section
// "Range requests": https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/).
// Safari on iPhone and iPad needs byte-range support from the server that hosts a video
// (Apple, "Configuring Your Server" in the Safari Web Content Guide). So the Worker runs first
// for video paths (`assets.run_worker_first` in the wrangler configs), takes the file from
// the assets binding and answers the one range asked for. Pages and pictures never come here.

/** The extensions `assets.run_worker_first` sends here in the wrangler configs (tests/workerd.test.mjs holds the three configs to one list). */
export function isVideoPath(pathname: string): boolean {
  return /\.(mp4|m4v|mov|webm)$/.test(pathname);
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
function sliceBody(
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
// and a range needs the size for Content-Range and for "the last N bytes". The first request for
// a file in an isolate reads the whole body once and remembers its size under the file's ETag (a
// content hash, so a new deploy's file is a new key); later requests stream and cut.
const sizes = new Map<string, number>();
const sizesLimit = 32;

type Source =
  | { kind: "bytes"; size: number; bytes: Uint8Array }
  | { kind: "stream"; size: number; body: ReadableStream<Uint8Array> };

async function sourceOf(upstream: Response): Promise<Source> {
  const etag = upstream.headers.get("etag");
  const known = etag === null ? undefined : sizes.get(etag);
  if (known !== undefined && upstream.body !== null) {
    return { kind: "stream", size: known, body: upstream.body };
  }
  const bytes = new Uint8Array(await upstream.arrayBuffer());
  if (etag !== null) {
    if (sizes.size >= sizesLimit) sizes.clear();
    sizes.set(etag, bytes.byteLength);
  }
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
  void sliceBody(source.body, start, end).pipeTo(writable);
  return readable;
}

/**
 * Answers a GET or HEAD for a video from the assets binding with byte-range support. Caching
 * headers, the content type and the ETag are the ones the asset already carries (`public/_headers`).
 */
export async function serveVideo(
  request: Request,
  assets: Fetcher,
): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed.", {
      status: 405,
      headers: { Allow: "GET, HEAD", "Cache-Control": "no-store" },
    });
  }
  const rangeHeader = request.headers.get("range");
  // The binding does not slice, so it is asked for the whole file; a conditional request
  // (If-None-Match) goes through to it only when no range is asked.
  const headers = new Headers();
  if (rangeHeader === null) {
    for (const name of ["if-none-match", "if-modified-since"]) {
      const value = request.headers.get(name);
      if (value !== null) headers.set(name, value);
    }
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
