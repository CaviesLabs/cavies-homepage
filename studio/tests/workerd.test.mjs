// Runs the real delivery code and Durable Object ledger inside workerd
// (`wrangler dev`), against a stub provider, so differences between Node and
// the Workers runtime are caught. No network beyond localhost; nothing is sent.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import test, { after, before } from "node:test";
import { cacheable, isVideoPath, parseRange, sliceBody } from "../worker/video-range.ts";

// Ports: a free block from the studio pre-push gate when it runs this (CAVIES_GATE_PORT_BASE, studio-os
// ops/machine/GATE.md), so two checkouts never share them; by hand, 3101 to 3103.
const workerPort = Number(process.env.CAVIES_GATE_PORT_BASE ?? 3101);
const stubPort = workerPort + 1;
const inspectorPort = workerPort + 2;
const base = `http://127.0.0.1:${workerPort}`;
// A fresh range each run: wrangler dev keeps Durable Object state between runs.
const run = Math.floor(Math.random() * 200) + 1;
const ip = (n) => `198.51.${run}.${n}`;
const endpoint = `${base}/api/enquiry`;
const calls = [];
let sendCode = "";
let turnstileRedirect = false;
let worker;
let stub;

before(async () => {
  stub = createServer((req, res) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      calls.push({ path: req.url, method: req.method, body });
      const json = (status, value, headers = {}) => {
        res.writeHead(status, {
          "content-type": "application/json",
          ...headers,
        });
        res.end(JSON.stringify(value));
      };
      if (req.url === "/turnstile" && turnstileRedirect) {
        return json(302, {}, { location: `http://127.0.0.1:${stubPort}/elsewhere` });
      }
      if (req.url === "/turnstile") {
        return json(200, {
          success: true,
          hostname: "cavies.studio",
          action: "enquiry",
        });
      }
      // /send stands in for the EMAIL binding (worker/test-entry.ts).
      if (sendCode) return json(200, { code: sendCode });
      return json(200, { messageId: "stub-message-id" });
    });
  });
  await new Promise((resolve) => stub.listen(stubPort, "127.0.0.1", resolve));
  worker = spawn(
    process.execPath,
    [
      "node_modules/wrangler/bin/wrangler.js",
      "dev",
      "-c",
      "tests/workerd/wrangler.jsonc",
      "--port",
      String(workerPort),
      "--ip",
      "127.0.0.1",
      "--inspector-port",
      String(inspectorPort),
      // The stub's address follows its port (tests/workerd/wrangler.jsonc holds the by-hand default).
      "--var",
      `STUB_URL:http://127.0.0.1:${stubPort}`,
    ],
    { stdio: "ignore" },
  );
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    try {
      await fetch(base, { method: "GET" });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error("wrangler dev did not start");
});

after(() => {
  worker?.kill();
  if (process.platform === "win32" && worker?.pid) {
    spawn("taskkill", ["/pid", String(worker.pid), "/t", "/f"], {
      stdio: "ignore",
    });
  }
  stub?.close();
});

const valid = {
  name: "René Visitor",
  email: "visitor@example.com",
  service: "Security audit",
  website: "",
  brief: "A long enough brief about a café website.",
  company: "",
  turnstileToken: "stub-token",
};
const post = (ip, body = valid) =>
  fetch(endpoint, {
    method: "POST",
    headers: {
      origin: "https://cavies.studio",
      "content-type": "application/json",
      "cf-connecting-ip": ip,
    },
    body: JSON.stringify(body),
  });

test("delivers through Turnstile and the email send, under workerd", async () => {
  calls.length = 0;
  const response = await post(ip(10));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(
    calls.map((call) => call.path),
    ["/turnstile", "/send"],
  );
  const message = JSON.parse(calls[1].body);
  assert.deepEqual(message.from, {
    name: "Cavies website",
    email: "contact@cavies.studio",
  });
  assert.equal(message.to, "tin@cavies.studio");
  assert.equal(message.replyTo, "visitor@example.com");
  assert.equal(message.subject, "Project enquiry: Security audit");
  assert.match(message.text, /René Visitor/);
});

test("a binding error code fails the send under workerd, and throttling answers 429", async () => {
  calls.length = 0;
  sendCode = "E_DELIVERY_FAILED";
  const failed = await post(ip(11));
  sendCode = "E_RATE_LIMIT_EXCEEDED";
  const throttled = await post(ip(11));
  sendCode = "";
  assert.equal(failed.status, 502);
  assert.equal(throttled.status, 429);
  assert.equal(throttled.headers.get("retry-after"), "60");
});

test("a provider redirect fails under workerd instead of being followed", async () => {
  calls.length = 0;
  turnstileRedirect = true;
  const response = await post(ip(15));
  turnstileRedirect = false;
  assert.equal(response.status, 503);
  assert.ok(!calls.some((call) => call.path === "/elsewhere"));
  assert.ok(!calls.some((call) => call.path === "/send"));
});

test("the Durable Object ledger allows five per client per hour and rejects the sixth", async () => {
  const statuses = [];
  for (let index = 0; index < 6; index += 1) {
    statuses.push((await post(ip(12))).status);
  }
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429]);
  assert.equal((await post(ip(13))).status, 200);
});

test("Worker replies carry all security headers, including 404 and 405", async () => {
  const expected = {
    "strict-transport-security": "max-age=63072000",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin",
  };
  const replies = [
    await post(ip(14)),
    await fetch(endpoint, { method: "GET" }),
    await fetch(`${base}/api/other`, { method: "POST" }),
    await fetch(endpoint, {
      method: "POST",
      headers: {
        origin: "https://evil.example",
        "content-type": "application/json",
      },
      body: "{}",
    }),
  ];
  assert.deepEqual(
    replies.map((reply) => reply.status),
    [200, 405, 404, 403],
  );
  for (const reply of replies) {
    for (const [name, value] of Object.entries(expected)) {
      assert.equal(reply.headers.get(name), value, `${reply.status} ${name}`);
    }
  }
});

test("rejects a foreign origin before any provider call", async () => {
  calls.length = 0;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      origin: "https://evil.example",
      "content-type": "application/json",
    },
    body: JSON.stringify(valid),
  });
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
});

// Byte ranges for videos. The fixture clip (tests/workerd/assets/games/clip.mp4) is 5,000
// bytes and byte i is i % 251, so every slice can be checked. Workers static assets alone
// answer a Range request with 200 and the whole file (Cloudflare's "Billing and
// Limitations" page); the Worker runs first for video paths and answers the range.
const clip = `${base}/games/clip.mp4`;
const clipBytes = Buffer.from(Array.from({ length: 5000 }, (_, i) => i % 251));
const bytesOf = async (reply) => Buffer.from(await reply.arrayBuffer());

// The same assertions twice: through the cache (the way production answers) and with the
// cache switched off by the test entry's header (the slicing fallback on its own).
for (const [mode, extra] of [
  ["cache", {}],
  ["slicing only", { "x-test-no-cache": "1" }],
]) {
  const vfetch = (url, init = {}) =>
    fetch(url, { ...init, headers: { ...extra, ...init.headers } });

  test(`a video with no Range answers 200 with the whole file and Accept-Ranges (${mode})`, async () => {
    const reply = await vfetch(clip);
    assert.equal(reply.status, 200);
    assert.equal(reply.headers.get("accept-ranges"), "bytes");
    assert.equal(reply.headers.get("content-length"), "5000");
    assert.equal(reply.headers.get("content-type"), "video/mp4");
    assert.equal(
      reply.headers.get("cache-control"),
      "public, max-age=86400, must-revalidate",
    );
    assert.ok(reply.headers.get("etag"));
    assert.equal(reply.headers.get("x-content-type-options"), "nosniff");
    assert.equal(reply.headers.get("strict-transport-security"), "max-age=63072000");
    assert.deepEqual(await bytesOf(reply), clipBytes);
  });

  test(`a video answers a first range, a middle range, an open range and the last bytes with 206 (${mode})`, async () => {
    const cases = [
      ["bytes=0-1", 0, 1],
      ["bytes=0-99", 0, 99],
      ["bytes=1000-1999", 1000, 1999],
      ["bytes=4900-", 4900, 4999],
      ["bytes=-100", 4900, 4999],
      ["bytes=4990-9999", 4990, 4999],
      ["bytes=-99999", 0, 4999],
    ];
    for (const [range, start, end] of cases) {
      const reply = await vfetch(clip, { headers: { range } });
      assert.equal(reply.status, 206, range);
      assert.equal(reply.headers.get("content-range"), `bytes ${start}-${end}/5000`, range);
      assert.equal(reply.headers.get("content-length"), String(end - start + 1), range);
      assert.equal(reply.headers.get("accept-ranges"), "bytes", range);
      assert.equal(reply.headers.get("content-type"), "video/mp4", range);
      assert.ok(reply.headers.get("etag"), range);
      assert.equal(reply.headers.get("x-content-type-options"), "nosniff", range);
      assert.deepEqual(await bytesOf(reply), clipBytes.subarray(start, end + 1), range);
    }
  });

  test(`a range that cannot be met answers 416 with the size (${mode})`, async () => {
    for (const range of ["bytes=5000-", "bytes=9000-9999", "bytes=-0"]) {
      const reply = await vfetch(clip, { headers: { range } });
      assert.equal(reply.status, 416, range);
      assert.equal(reply.headers.get("content-range"), "bytes */5000", range);
      assert.equal(reply.headers.get("cache-control"), "no-store", range);
      assert.equal(reply.headers.get("etag"), null, range);
      assert.equal((await bytesOf(reply)).length, 0, range);
    }
  });

  test(`a range the Worker does not read is ignored and the whole file comes back (${mode})`, async () => {
    for (const range of ["bytes=0-1,5-9", "bytes=9-3", "items=0-1", "bytes=", "nonsense"]) {
      const reply = await vfetch(clip, { headers: { range } });
      assert.equal(reply.status, 200, range);
      assert.equal(reply.headers.get("accept-ranges"), "bytes", range);
      assert.equal((await bytesOf(reply)).length, 5000, range);
    }
  });

  test(`If-Range keeps the range for the file's ETag and drops it for any other (${mode})`, async () => {
    const etag = (await vfetch(clip)).headers.get("etag");
    const same = await vfetch(clip, { headers: { range: "bytes=0-9", "if-range": etag } });
    assert.equal(same.status, 206);
    await same.arrayBuffer();
    const other = await vfetch(clip, { headers: { range: "bytes=0-9", "if-range": '"old"' } });
    assert.equal(other.status, 200);
    assert.equal((await bytesOf(other)).length, 5000);
  });

  test(`HEAD for a video answers the headers and no body, with or without a range (${mode})`, async () => {
    const plain = await vfetch(clip, { method: "HEAD" });
    assert.equal(plain.status, 200);
    assert.equal(plain.headers.get("accept-ranges"), "bytes");
    assert.equal(plain.headers.get("content-length"), "5000");
    assert.equal((await bytesOf(plain)).length, 0);
    const ranged = await vfetch(clip, { method: "HEAD", headers: { range: "bytes=10-19" } });
    assert.equal(ranged.status, 206);
    assert.equal(ranged.headers.get("content-range"), "bytes 10-19/5000");
    assert.equal(ranged.headers.get("content-length"), "10");
    assert.equal((await bytesOf(ranged)).length, 0);
  });

  test(`a conditional request for a video answers 304; other methods answer 405; a missing video 404 (${mode})`, async () => {
    const etag = (await vfetch(clip)).headers.get("etag");
    const notModified = await vfetch(clip, { headers: { "if-none-match": etag } });
    assert.equal(notModified.status, 304);
    assert.equal(notModified.headers.get("accept-ranges"), "bytes");
    // If-None-Match comes before Range (RFC 9110): a matching ETag is a 304 even with a range.
    const rangedRevalidation = await vfetch(clip, {
      headers: { range: "bytes=0-9", "if-none-match": etag },
    });
    assert.equal(rangedRevalidation.status, 304);
    const post = await vfetch(clip, { method: "POST" });
    assert.equal(post.status, 405);
    assert.equal(post.headers.get("allow"), "GET, HEAD");
    const missing = await vfetch(`${base}/games/missing.mp4`, { headers: { range: "bytes=0-1" } });
    assert.equal(missing.status, 404);
    assert.ok(!missing.headers.has("content-range"));
  });

}

test("a page is still a plain static asset: a Range request gets 200, the whole page, no Accept-Ranges", async () => {
  const reply = await fetch(`${base}/page`, { headers: { range: "bytes=0-9" } });
  assert.equal(reply.status, 200);
  assert.equal(reply.headers.get("accept-ranges"), null);
  assert.equal(reply.headers.get("content-range"), null);
  assert.match(await reply.text(), /A page\./);
  const missing = await fetch(`${base}/no-such-page`);
  assert.equal(missing.status, 404);
});

test("the three wrangler configs route the same video paths to the Worker", () => {
  const read = (path) =>
    JSON.parse(
      readFileSync(path, "utf8")
        .split("\n")
        .filter((line) => !line.trim().startsWith("//"))
        .join("\n"),
    ).assets;
  const test = read("tests/workerd/wrangler.jsonc");
  // The test config also routes the test entry's own counter, /__test/*.
  const routed = test.run_worker_first.filter((pattern) => pattern !== "/__test/*");
  assert.deepEqual(routed, ["/api/*", "/*.mp4", "/*.m4v", "/*.mov", "/*.webm"]);
  for (const path of ["wrangler.jsonc", "wrangler.production.jsonc"]) {
    const assets = read(path);
    assert.deepEqual(assets.run_worker_first, routed, path);
    assert.equal(assets.binding, "ASSETS", path);
    assert.equal(
      JSON.parse(
        readFileSync(path, "utf8")
          .split("\n")
          .filter((line) => !line.trim().startsWith("//"))
          .join("\n"),
      ).version_metadata.binding,
      "CF_VERSION_METADATA",
      path,
    );
    assert.equal(assets.html_handling, test.html_handling, path);
    assert.equal(assets.not_found_handling, test.not_found_handling, path);
  }
});

test("a path under /api/ that ends in .mp4 is still answered by the JSON 404, not the video route", async () => {
  const reply = await fetch(`${base}/api/x.mp4`, { headers: { range: "bytes=0-1" } });
  assert.equal(reply.status, 404);
  assert.deepEqual(await reply.json(), { ok: false, message: "Not found." });
});

test("isVideoPath knows every extension the configs route", () => {
  const assets = JSON.parse(
    readFileSync("wrangler.production.jsonc", "utf8")
      .split("\n")
      .filter((line) => !line.trim().startsWith("//"))
      .join("\n"),
  ).assets;
  for (const pattern of assets.run_worker_first.filter((p) => p !== "/api/*")) {
    const extension = pattern.replace("/*", "");
    assert.ok(isVideoPath(`/a/b/clip${extension}`), pattern);
  }
  assert.ok(!isVideoPath("/games/oddly-orderly"));
  assert.ok(!isVideoPath("/a.mp4/b"));
  assert.ok(!isVideoPath("/a.webp"));
});

test("parseRange follows RFC 9110 for one range and ignores what it cannot read", () => {
  const range = (header, size = 100) => parseRange(header, size);
  assert.deepEqual(range(null), { kind: "full" });
  assert.deepEqual(range("bytes=0-0"), { kind: "partial", start: 0, end: 0 });
  assert.deepEqual(range("bytes=10-19"), { kind: "partial", start: 10, end: 19 });
  assert.deepEqual(range("bytes=90-"), { kind: "partial", start: 90, end: 99 });
  assert.deepEqual(range("bytes=90-5000"), { kind: "partial", start: 90, end: 99 });
  assert.deepEqual(range("bytes=-10"), { kind: "partial", start: 90, end: 99 });
  assert.deepEqual(range("bytes=-500"), { kind: "partial", start: 0, end: 99 });
  assert.deepEqual(range(" Bytes = 1 - 2 "), { kind: "partial", start: 1, end: 2 });
  assert.deepEqual(range("bytes=100-"), { kind: "unsatisfiable" });
  assert.deepEqual(range("bytes=100-200"), { kind: "unsatisfiable" });
  assert.deepEqual(range("bytes=-0"), { kind: "unsatisfiable" });
  assert.deepEqual(range("bytes=0-", 0), { kind: "unsatisfiable" });
  for (const ignored of ["bytes=5-2", "bytes=0-1,4-5", "bytes=-", "bytes=", "items=0-1", "0-1", "bytes=a-b"]) {
    assert.deepEqual(range(ignored), { kind: "full" }, ignored);
  }
});

test("sliceBody cuts a stream of any chunk size to the bytes asked for and stops reading", async () => {
  const source = Uint8Array.from({ length: 1000 }, (_, i) => i % 251);
  const streamOf = (chunk) => {
    let at = 0;
    const state = { cancelled: false, reads: 0 };
    const stream = new ReadableStream({
      pull(controller) {
        state.reads += 1;
        if (at >= source.length) return controller.close();
        controller.enqueue(source.slice(at, at + chunk));
        at += chunk;
      },
      cancel() {
        state.cancelled = true;
      },
    });
    return { stream, state };
  };
  const collect = async (stream) => {
    const parts = [];
    for await (const part of stream) parts.push(part);
    return Buffer.concat(parts);
  };
  for (const chunk of [1, 7, 64, 333, 1000, 4096]) {
    for (const [start, end] of [[0, 0], [0, 999], [5, 5], [6, 7], [63, 64], [100, 700], [332, 333], [999, 999], [0, 499], [500, 999]]) {
      const { stream } = streamOf(chunk);
      const got = await collect(sliceBody(stream, start, end));
      assert.deepEqual(got, Buffer.from(source.subarray(start, end + 1)), `chunk ${chunk} bytes ${start}-${end}`);
    }
  }
  const { stream, state } = streamOf(64);
  await collect(sliceBody(stream, 0, 9));
  assert.ok(state.cancelled, "the source is cancelled once the last byte is out");
  assert.ok(state.reads < 4, "and not read to its end");
});

// The cache path. A second fixture (games/clip-cache.mp4, 3,000 bytes) that no other test asks
// for, so its first request is a miss. The test entry counts what the video route asks of the
// assets binding (/__test/assets-calls): a miss asks once, a hit not at all.
const cached = `${base}/games/clip-cache.mp4`;
const cachedBytes = Buffer.from(Array.from({ length: 3000 }, (_, i) => (i * 7) % 253));
const assetCalls = async () =>
  (await (await fetch(`${base}/__test/assets-calls`)).json()).calls;

test("the cache: a miss is answered from the assets binding and fills the cache; hits never ask it", async () => {
  const before = await assetCalls();
  const miss = await fetch(cached, { headers: { range: "bytes=10-19" } });
  assert.equal(miss.status, 206);
  assert.equal(miss.headers.get("content-range"), "bytes 10-19/3000");
  assert.deepEqual(await bytesOf(miss), cachedBytes.subarray(10, 20));
  assert.equal((await assetCalls()) - before, 1, "a miss asks the binding once");

  // The put runs after the reply (waitUntil); the test entry hands back its promises.
  await fetch(`${base}/__test/settled`);
  const was = await assetCalls();
  await (await fetch(cached, { headers: { range: "bytes=0-0" } })).arrayBuffer();
  assert.equal(await assetCalls(), was, "the file reached the cache");

  const hits = await assetCalls();
  const etag = (await fetch(cached, { headers: { range: "bytes=0-0" } })).headers.get("etag");
  assert.ok(etag);
  for (const [range, start, end] of [
    ["bytes=0-1", 0, 1],
    ["bytes=1000-1999", 1000, 1999],
    ["bytes=2900-", 2900, 2999],
    ["bytes=-100", 2900, 2999],
    ["bytes=2990-9999", 2990, 2999],
  ]) {
    const reply = await fetch(cached, { headers: { range } });
    assert.equal(reply.status, 206, range);
    assert.equal(reply.headers.get("content-range"), `bytes ${start}-${end}/3000`, range);
    assert.equal(reply.headers.get("content-length"), String(end - start + 1), range);
    assert.equal(reply.headers.get("accept-ranges"), "bytes", range);
    assert.equal(reply.headers.get("content-type"), "video/mp4", range);
    assert.equal(reply.headers.get("etag"), etag, range);
    assert.equal(reply.headers.get("x-content-type-options"), "nosniff", range);
    assert.equal(reply.headers.get("strict-transport-security"), "max-age=63072000", range);
    assert.deepEqual(await bytesOf(reply), cachedBytes.subarray(start, end + 1), range);
  }
  const unmeetable = await fetch(cached, { headers: { range: "bytes=3000-" } });
  assert.equal(unmeetable.status, 416);
  assert.equal(unmeetable.headers.get("content-range"), "bytes */3000");
  assert.equal(unmeetable.headers.get("cache-control"), "no-store");
  assert.equal(unmeetable.headers.get("etag"), null);
  assert.equal((await bytesOf(unmeetable)).length, 0);
  const whole = await fetch(cached);
  assert.equal(whole.status, 200);
  assert.equal(whole.headers.get("accept-ranges"), "bytes");
  assert.equal(whole.headers.get("content-length"), "3000");
  assert.deepEqual(await bytesOf(whole), cachedBytes);
  const head = await fetch(cached, { method: "HEAD", headers: { range: "bytes=10-19" } });
  assert.equal(head.status, 206);
  assert.equal(head.headers.get("content-range"), "bytes 10-19/3000");
  assert.equal((await bytesOf(head)).length, 0);
  const notModified = await fetch(cached, { headers: { "if-none-match": etag, range: "bytes=0-9" } });
  assert.equal(notModified.status, 304);
  // The visitor's query string never makes a second copy.
  const plainHead = await fetch(cached, { method: "HEAD" });
  assert.equal(plainHead.status, 200);
  assert.equal(plainHead.headers.get("content-length"), "3000");
  assert.equal(plainHead.headers.get("accept-ranges"), "bytes");
  assert.equal((await bytesOf(plainHead)).length, 0);
  const plainNotModified = await fetch(cached, { headers: { "if-none-match": etag } });
  assert.equal(plainNotModified.status, 304);
  assert.equal(plainNotModified.headers.get("accept-ranges"), "bytes");
  // If-Range with the copy's ETag keeps the range, and it is answered by the cache.
  const ifRangeHit = await fetch(cached, { headers: { range: "bytes=100-199", "if-range": etag } });
  assert.equal(ifRangeHit.status, 206);
  assert.deepEqual(await bytesOf(ifRangeHit), cachedBytes.subarray(100, 200));
  const withQuery = await fetch(`${cached}?x=1`, { headers: { range: "bytes=5-6" } });
  assert.equal(withQuery.status, 206);
  assert.deepEqual(await bytesOf(withQuery), cachedBytes.subarray(5, 7));
  assert.equal(await assetCalls(), hits, "none of these asked the binding");
});

test("the cache is asked only for plain ranges: several ranges, a reversed one and a stale If-Range go to the slicer", async () => {
  const etag = (await fetch(cached, { headers: { range: "bytes=0-0" } })).headers.get("etag");
  const before = await assetCalls();
  const several = await fetch(cached, { headers: { range: "bytes=0-1,5-9" } });
  assert.equal(several.status, 200);
  assert.equal((await bytesOf(several)).length, 3000);
  const reversed = await fetch(cached, { headers: { range: "bytes=9-3" } });
  assert.equal(reversed.status, 200);
  assert.equal((await bytesOf(reversed)).length, 3000);
  const staleIfRange = await fetch(cached, { headers: { range: "bytes=0-9", "if-range": '"old"' } });
  assert.equal(staleIfRange.status, 200);
  assert.equal((await bytesOf(staleIfRange)).length, 3000);
  assert.equal((await assetCalls()) - before, 3, "each of the three asked the binding");
  const ifRange = await fetch(cached, { headers: { range: "bytes=0-9", "if-range": etag } });
  assert.equal(ifRange.status, 206);
  assert.deepEqual(await bytesOf(ifRange), cachedBytes.subarray(0, 10));
  assert.equal((await assetCalls()) - before, 3, "a matching If-Range did not");
});

test("cacheable() lets only a plain range reach the cache", () => {
  const request = (headers) => new Request("https://cavies.studio/a.mp4", { headers });
  for (const range of [undefined, "bytes=0-1", "bytes=5-", "bytes=-5", "bytes=3-3", " Bytes = 1 - 2 "]) {
    assert.ok(cacheable(request(range === undefined ? {} : { range })), String(range));
  }
  for (const range of ["bytes=9-3", "bytes=0-1,4-5", "bytes=", "bytes=-", "items=0-1", "nonsense"]) {
    assert.ok(!cacheable(request({ range })), range);
  }
  // If-Range is judged after the lookup, against the copy's ETag (fromCache).
  assert.ok(cacheable(request({ range: "bytes=0-1", "if-range": '"x"' })));
});
