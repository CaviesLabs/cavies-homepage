// Runs the real delivery code and Durable Object ledger inside workerd
// (`wrangler dev`), against a stub provider, so differences between Node and
// the Workers runtime are caught. No network beyond localhost; nothing is sent.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import test, { after, before } from "node:test";

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

test("a video with no Range answers 200 with the whole file and Accept-Ranges", async () => {
  const reply = await fetch(clip);
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

test("a video answers a first range, a middle range, an open range and the last bytes with 206", async () => {
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
    const reply = await fetch(clip, { headers: { range } });
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

test("a range that cannot be met answers 416 with the size", async () => {
  for (const range of ["bytes=5000-", "bytes=9000-9999", "bytes=-0"]) {
    const reply = await fetch(clip, { headers: { range } });
    assert.equal(reply.status, 416, range);
    assert.equal(reply.headers.get("content-range"), "bytes */5000", range);
    assert.equal((await bytesOf(reply)).length, 0, range);
  }
});

test("a range the Worker does not read is ignored and the whole file comes back", async () => {
  for (const range of ["bytes=0-1,5-9", "bytes=9-3", "items=0-1", "bytes=", "nonsense"]) {
    const reply = await fetch(clip, { headers: { range } });
    assert.equal(reply.status, 200, range);
    assert.equal(reply.headers.get("accept-ranges"), "bytes", range);
    assert.equal((await bytesOf(reply)).length, 5000, range);
  }
});

test("If-Range keeps the range for the file's ETag and drops it for any other", async () => {
  const etag = (await fetch(clip)).headers.get("etag");
  const same = await fetch(clip, { headers: { range: "bytes=0-9", "if-range": etag } });
  assert.equal(same.status, 206);
  await same.arrayBuffer();
  const other = await fetch(clip, { headers: { range: "bytes=0-9", "if-range": '"old"' } });
  assert.equal(other.status, 200);
  assert.equal((await bytesOf(other)).length, 5000);
});

test("HEAD for a video answers the headers and no body, with or without a range", async () => {
  const plain = await fetch(clip, { method: "HEAD" });
  assert.equal(plain.status, 200);
  assert.equal(plain.headers.get("accept-ranges"), "bytes");
  assert.equal(plain.headers.get("content-length"), "5000");
  assert.equal((await bytesOf(plain)).length, 0);
  const ranged = await fetch(clip, { method: "HEAD", headers: { range: "bytes=10-19" } });
  assert.equal(ranged.status, 206);
  assert.equal(ranged.headers.get("content-range"), "bytes 10-19/5000");
  assert.equal(ranged.headers.get("content-length"), "10");
  assert.equal((await bytesOf(ranged)).length, 0);
});

test("a conditional request for a video answers 304; other methods answer 405; a missing video 404", async () => {
  const etag = (await fetch(clip)).headers.get("etag");
  const notModified = await fetch(clip, { headers: { "if-none-match": etag } });
  assert.equal(notModified.status, 304);
  assert.equal(notModified.headers.get("accept-ranges"), "bytes");
  const post = await fetch(clip, { method: "POST" });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("allow"), "GET, HEAD");
  const missing = await fetch(`${base}/games/missing.mp4`, { headers: { range: "bytes=0-1" } });
  assert.equal(missing.status, 404);
  assert.ok(!missing.headers.has("content-range"));
});

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
  assert.deepEqual(test.run_worker_first, ["/api/*", "/*.mp4", "/*.m4v", "/*.mov", "/*.webm"]);
  for (const path of ["wrangler.jsonc", "wrangler.production.jsonc"]) {
    const assets = read(path);
    assert.deepEqual(assets.run_worker_first, test.run_worker_first, path);
    assert.equal(assets.binding, "ASSETS", path);
    assert.equal(assets.html_handling, test.html_handling, path);
    assert.equal(assets.not_found_handling, test.not_found_handling, path);
  }
});
