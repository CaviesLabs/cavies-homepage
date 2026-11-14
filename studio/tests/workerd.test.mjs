// Runs the real delivery code and Durable Object ledger inside workerd
// (`wrangler dev`), against a stub provider, so differences between Node and
// the Workers runtime are caught. No network beyond localhost; nothing is sent.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import test, { after, before } from "node:test";

const workerPort = 3101;
const stubPort = 3102;
const base = `http://127.0.0.1:${workerPort}`;
// A fresh range each run: wrangler dev keeps Durable Object state between runs.
const run = Math.floor(Math.random() * 200) + 1;
const ip = (n) => `198.51.${run}.${n}`;
const endpoint = `${base}/api/enquiry`;
const calls = [];
let sendStatus = 200;
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
      if (req.url === "/turnstile") {
        return json(200, {
          success: true,
          hostname: "cavies.studio",
          action: "enquiry",
        });
      }
      if (req.url === "/token") {
        return json(200, {
          access_token: "stub-access-token",
          token_type: "Bearer",
          scope: "https://www.googleapis.com/auth/gmail.send",
        });
      }
      if (sendStatus === 302) {
        return json(302, {}, { location: "http://127.0.0.1:3102/elsewhere" });
      }
      return json(200, { id: "stub-message-id" });
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

test("delivers through Turnstile, the Google token and the Gmail send, under workerd", async () => {
  calls.length = 0;
  const response = await post(ip(10));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(
    calls.map((call) => call.path),
    ["/turnstile", "/token", "/send"],
  );
  const raw = JSON.parse(calls[2].body).raw;
  const mime = Buffer.from(raw, "base64url").toString("utf8");
  assert.match(
    mime,
    /^From: Cavies website <contact@cavies.studio>\r\nTo: tin@cavies.studio\r\nReply-To: visitor@example\.com\r\n/,
  );
});

test("a provider redirect fails the send under workerd instead of being followed", async () => {
  calls.length = 0;
  sendStatus = 302;
  const response = await post(ip(11));
  sendStatus = 200;
  assert.equal(response.status, 502);
  assert.ok(!calls.some((call) => call.path === "/elsewhere"));
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
