import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Match Next's extensionless TypeScript import resolution without changing the
// production module or compiling a separate, potentially different test copy.
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (
      specifier === "./enquiry" &&
      context.parentURL?.endsWith("/lib/enquiry-delivery.ts")
    ) {
      return next("./enquiry.ts", context);
    }
    return next(specifier, context);
  },
});
const {
  createEnquiryHandler,
  enquiryDeliveryConfig,
  enquiryDeliveryConfigured,
} = await import("../lib/enquiry-delivery.ts");
hooks.deregister();

const valid = {
  name: "Example Visitor",
  email: "visitor@example.com",
  service: "Business website & support",
  website: "https://example.com",
  brief: "We would like to improve our public product website.",
  company: "",
  turnstileToken: "mock-token",
};
const env = {
  NODE_ENV: "production",
  VERCEL_ENV: "production",
  ENQUIRY_DELIVERY_ENABLED: "true",
  TURNSTILE_SECRET_KEY: "mock-secret",
  GOOGLE_CLIENT_ID: "mock-client-id",
  GOOGLE_CLIENT_SECRET: "mock-client-secret",
  GMAIL_REFRESH_TOKEN: "mock-refresh-token",
};
const captcha = { success: true, hostname: "cavies.xyz", action: "enquiry" };
const googleToken = {
  access_token: "mock-access-token",
  token_type: "Bearer",
  scope: "https://www.googleapis.com/auth/gmail.send",
};

function request(body = valid, headers = {}) {
  return new Request("https://cavies.xyz/api/enquiry", {
    method: "POST",
    headers: {
      origin: "https://cavies.xyz",
      "content-type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function setup(overrides = {}) {
  const calls = [];
  const reservations = [];
  const replies = overrides.replies || [
    captcha,
    googleToken,
    { id: "message-id" },
  ];
  const handler = createEnquiryHandler({
    config: enquiryDeliveryConfig(overrides.env || env),
    rateLimitsReady: true,
    clientKey: () => "192.0.2.10",
    reserveAttempt: async (key) => {
      reservations.push(key);
      return { allowed: true };
    },
    fetch: async (url, init) => {
      calls.push({ url, init });
      const reply = replies[calls.length - 1];
      if (reply instanceof Error) throw reply;
      if (reply instanceof Response) return reply;
      return Response.json(reply);
    },
    ...overrides.dependencies,
  });
  return { handler, calls, reservations };
}

test("production config is exact-origin only and ignores preview/development knobs", () => {
  const config = enquiryDeliveryConfig({
    ...env,
    VERCEL_URL: "some-preview.vercel.app",
    ENQUIRY_LOCAL_ORIGIN: "http://localhost:3000",
  });
  assert.deepEqual(config.allowedOrigins, ["https://cavies.xyz"]);
  assert.deepEqual(
    enquiryDeliveryConfig({
      ...env,
      VERCEL_ENV: "preview",
      VERCEL_URL: "this-preview.vercel.app",
    }).allowedOrigins,
    ["https://cavies.xyz", "https://this-preview.vercel.app"],
  );
  for (const host of [
    "evil.example",
    "good.vercel.app/path",
    "*.vercel.app",
    "good.vercel.app@evil.example",
  ]) {
    assert.deepEqual(
      enquiryDeliveryConfig({ ...env, VERCEL_ENV: "preview", VERCEL_URL: host })
        .allowedOrigins,
      ["https://cavies.xyz"],
    );
  }
  assert.deepEqual(
    enquiryDeliveryConfig({
      NODE_ENV: "development",
      ENQUIRY_LOCAL_ORIGIN: "http://localhost:3000",
    }).allowedOrigins,
    ["https://cavies.xyz", "http://localhost:3000"],
  );
  assert.deepEqual(
    enquiryDeliveryConfig({
      NODE_ENV: "development",
      ENQUIRY_LOCAL_ORIGIN: "https://evil.example",
    }).allowedOrigins,
    ["https://cavies.xyz"],
  );
});

test("rejects absent, null, foreign, malformed and cross-site origins before any provider or limit call", async () => {
  for (const origin of [
    "",
    "null",
    "https://evil.example",
    "http://cavies.xyz",
    "https://cavies.xyz.evil.example",
    "https://cavies.xyz/",
    "https://cavies.xyz:444",
  ]) {
    const run = setup();
    const response = await run.handler(request(valid, { origin }));
    assert.equal(response.status, 403, origin);
    assert.deepEqual(run.calls, []);
    assert.deepEqual(run.reservations, []);
    assert.equal(response.headers.get("access-control-allow-origin"), null);
  }
  const run = setup();
  assert.equal(
    (await run.handler(request(valid, { "sec-fetch-site": "cross-site" })))
      .status,
    403,
  );
  assert.equal(run.calls.length, 0);
});

test("fails closed when delivery, credentials, CAPTCHA key or durable limiter is missing", async () => {
  assert.equal(enquiryDeliveryConfigured(env), true);
  for (const key of [
    "ENQUIRY_DELIVERY_ENABLED",
    "TURNSTILE_SECRET_KEY",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GMAIL_REFRESH_TOKEN",
  ]) {
    const run = setup({ env: { ...env, [key]: "" } });
    assert.equal(enquiryDeliveryConfigured({ ...env, [key]: "" }), false);
    assert.equal((await run.handler(request())).status, 503, key);
    assert.equal(run.calls.length, 0);
  }
  for (const secret of [
    "1x0000000000000000000000000000000AA",
    "2x0000000000000000000000000000000AA",
    "3x0000000000000000000000000000000AA",
  ]) {
    const run = setup({ env: { ...env, TURNSTILE_SECRET_KEY: secret } });
    assert.equal(
      enquiryDeliveryConfigured({ ...env, TURNSTILE_SECRET_KEY: secret }),
      false,
    );
    assert.equal((await run.handler(request())).status, 503);
    assert.equal(run.calls.length, 0);
  }
  for (const dependencies of [
    { rateLimitsReady: false },
    { clientKey: () => null },
  ]) {
    const run = setup({ dependencies });
    assert.equal((await run.handler(request())).status, 503);
    assert.equal(run.calls.length, 0);
  }
});

test("rejects non-JSON, malformed or non-object bodies without network activity", async () => {
  for (const body of [
    "{broken",
    "null",
    "[]",
    "42",
    JSON.stringify({ ...valid, name: 3 }),
  ]) {
    const run = setup();
    assert.equal((await run.handler(request(body))).status, 400);
    assert.equal(run.calls.length, 0);
  }
  for (const contentType of [
    "text/plain",
    "application/x-www-form-urlencoded",
    "",
  ]) {
    const run = setup();
    assert.equal(
      (await run.handler(request(valid, { "content-type": contentType })))
        .status,
      400,
    );
    assert.equal(run.calls.length, 0);
  }
});

test("body limit counts streamed bytes even without Content-Length or with a false short length", async () => {
  for (const length of [undefined, "2", "9000"]) {
    let cancelled = false;
    const run = setup();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"brief":"'));
        controller.enqueue(new Uint8Array(8192).fill(65));
      },
      cancel() {
        cancelled = true;
      },
    });
    const response = await run.handler(
      new Request("https://cavies.xyz/api/enquiry", {
        method: "POST",
        duplex: "half",
        body: stream,
        headers: {
          origin: "https://cavies.xyz",
          "content-type": "application/json",
          ...(length ? { "content-length": length } : {}),
        },
      }),
    );
    assert.equal(response.status, 413);
    if (length !== "9000") assert.equal(cancelled, true);
    assert.equal(run.calls.length, 0);
  }
});

test("slow or unfinished body is cancelled within the configured deadline", async () => {
  let cancelled = false;
  const stream = new ReadableStream({
    cancel() {
      cancelled = true;
    },
  });
  const run = setup({ dependencies: { timeoutMs: 20 } });
  const response = await run.handler(
    new Request("https://cavies.xyz/api/enquiry", {
      method: "POST",
      duplex: "half",
      body: stream,
      headers: {
        origin: "https://cavies.xyz",
        "content-type": "application/json",
      },
    }),
  );
  assert.equal(response.status, 400);
  assert.equal(cancelled, true);
  assert.equal(run.calls.length, 0);
});

test("shared field errors and header-injection attempts return 400 before CAPTCHA", async () => {
  for (const invalid of [
    { name: "" },
    { email: "invalid" },
    { service: "Arbitrary subject" },
    { brief: "short" },
    { email: "visitor@example.com\r\nBcc: victim@example.com" },
    { email: "x,y@example.com" },
    { email: "x@example.com;" },
    { email: "x(comment)@example.com" },
    { name: "Example\nBcc: someone@example.com" },
    { service: "Security audit\r\nBcc: victim@example.com" },
  ]) {
    const run = setup();
    const response = await run.handler(request({ ...valid, ...invalid }));
    assert.equal(response.status, 400);
    assert.ok((await response.json()).errors);
    assert.equal(run.calls.length, 0);
  }
});

test("honeypot and malformed CAPTCHA tokens fail without provider calls", async () => {
  for (const invalid of [
    { company: "Filled" },
    { company: null },
    { turnstileToken: "" },
    { turnstileToken: null },
    { turnstileToken: "x".repeat(2049) },
  ]) {
    const run = setup();
    assert.equal(
      (await run.handler(request({ ...valid, ...invalid }))).status,
      403,
    );
    assert.equal(run.calls.length, 0);
    assert.equal(run.reservations.length, 0);
  }
});

test("requires CAPTCHA success, exact hostname and enquiry action before reserving a send", async () => {
  for (const reply of [
    { ...captcha, success: false },
    { ...captcha, action: "login" },
    { ...captcha, hostname: "evil.example" },
    { success: true },
    null,
  ]) {
    const run = setup({ replies: [reply] });
    assert.equal((await run.handler(request())).status, 403);
    assert.equal(run.calls.length, 1);
    assert.equal(run.reservations.length, 0);
  }
});

test("CAPTCHA outage and durable limiter failure cannot proceed to Gmail", async () => {
  for (const reply of [
    new Error("Provider secret detail"),
    new Response("unavailable", { status: 500 }),
  ]) {
    const run = setup({ replies: [reply] });
    const response = await run.handler(request());
    assert.equal(response.status, 503);
    assert.ok(!(await response.text()).includes("Provider secret detail"));
    assert.equal(run.calls.length, 1);
  }
  const run = setup({
    dependencies: {
      reserveAttempt: async () => {
        throw new Error("Storage failed");
      },
    },
  });
  assert.equal((await run.handler(request())).status, 503);
  assert.equal(run.calls.length, 1);
});

test("durable quota rejects with Retry-After and never refreshes Google token", async () => {
  const run = setup({
    dependencies: {
      reserveAttempt: async () => ({ allowed: false, retryAfter: 61 }),
    },
  });
  const response = await run.handler(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "61");
  assert.equal(run.calls.length, 1);
});

test("refresh errors, malformed tokens and overprivileged scopes cannot send mail", async () => {
  for (const token of [
    new Error("refresh token secret"),
    Response.json({ error: "invalid_grant" }, { status: 400 }),
    {},
    { access_token: "" },
    { ...googleToken, token_type: "Other" },
    { ...googleToken, scope: undefined },
    { ...googleToken, scope: "openid email" },
    { ...googleToken, scope: `${googleToken.scope} https://mail.google.com/` },
    {
      ...googleToken,
      scope: `${googleToken.scope} https://www.googleapis.com/auth/gmail.readonly`,
    },
  ]) {
    const run = setup({ replies: [captcha, token] });
    const response = await run.handler(request());
    assert.equal(response.status, 503);
    assert.ok(!(await response.text()).includes("refresh token secret"));
    assert.equal(run.calls.length, 2);
    assert.equal(run.reservations.length, 1);
  }
});

test("send permission may be accompanied only by the one-time identity scopes", async () => {
  for (const identity of [
    "openid email",
    "openid https://www.googleapis.com/auth/userinfo.email",
  ]) {
    const run = setup({
      replies: [
        captcha,
        { ...googleToken, scope: `${googleToken.scope} ${identity}` },
        { id: "message-id" },
      ],
    });
    assert.equal((await run.handler(request())).status, 200);
    assert.equal(run.calls.length, 3);
  }
});

test("only Gmail acknowledgement succeeds; MIME preserves Unicode and fixes all routing headers", async () => {
  const run = setup();
  const data = {
    ...valid,
    name: "René · 阮",
    brief: "A bilingual café website.\nPlease preserve this: 🙂 & <html>.",
    to: "attacker@example.com",
    subject: "Ignored subject",
  };
  const response = await run.handler(request(data));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(run.calls.length, 3);
  assert.deepEqual(run.reservations, ["192.0.2.10"]);
  assert.equal(
    run.calls[0].url,
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  );
  assert.equal(run.calls[0].init.body.get("response"), "mock-token");
  assert.equal(run.calls[1].url, "https://oauth2.googleapis.com/token");
  assert.equal(run.calls[1].init.body.get("grant_type"), "refresh_token");
  assert.equal(run.calls[1].init.body.get("scope"), googleToken.scope);
  assert.equal(
    run.calls[2].url,
    "https://gmail.googleapis.com/gmail/v1/users/tin%40cavies.xyz/messages/send",
  );
  assert.equal(
    run.calls[2].init.headers.Authorization,
    "Bearer mock-access-token",
  );
  assert.ok(
    run.calls.every(
      ({ init }) => init.cache === "no-store" && init.redirect === "error",
    ),
  );
  const raw = JSON.parse(run.calls[2].init.body).raw;
  assert.match(raw, /^[A-Za-z0-9_-]+$/);
  const [headers, encodedBody] = Buffer.from(raw, "base64url")
    .toString("utf8")
    .split("\r\n\r\n");
  assert.match(
    headers,
    /^From: Cavies website <contact@cavies.xyz>\r\nTo: tin@cavies.xyz\r\nReply-To: visitor@example.com\r\n/,
  );
  assert.match(
    headers,
    /Subject: Project enquiry: Business website & support\r\n/,
  );
  assert.match(headers, /Content-Type: text\/plain; charset="UTF-8"/);
  assert.ok(
    !headers.includes("attacker") &&
      !headers.includes("Ignored subject") &&
      !headers.includes("René"),
  );
  assert.ok(encodedBody.split("\r\n").every((line) => line.length <= 76));
  const body = Buffer.from(
    encodedBody.replaceAll("\r\n", ""),
    "base64",
  ).toString("utf8");
  assert.match(body, /Name: René · 阮/);
  assert.ok(body.endsWith(data.brief.replaceAll("\n", "\r\n")));
});

test("send errors and missing IDs return failure without retry or provider details", async () => {
  for (const result of [
    new Error("access-token private-content"),
    Response.json({ error: "private-content" }, { status: 403 }),
    {},
    { id: "" },
  ]) {
    const run = setup({ replies: [captcha, googleToken, result] });
    const response = await run.handler(request());
    assert.equal(response.status, 502);
    assert.equal(run.calls.length, 3);
    assert.ok(!(await response.text()).includes("private-content"));
  }
});

test("Gmail throttling is exposed as a bounded retry interval without automatic retry", async () => {
  const run = setup({
    replies: [
      captcha,
      googleToken,
      Response.json({ error: "quota" }, { status: 429 }),
    ],
  });
  const response = await run.handler(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
  assert.equal(run.calls.length, 3);
});

test("ambiguous send timeout aborts and does not retry", async () => {
  let calls = 0;
  let sendSignal;
  const run = setup({
    dependencies: {
      timeoutMs: 20,
      fetch: async (_url, init) => {
        calls++;
        if (calls === 1) return Response.json(captcha);
        if (calls === 2) return Response.json(googleToken);
        sendSignal = init.signal;
        return new Promise(() => {});
      },
    },
  });
  const response = await run.handler(request());
  assert.equal(response.status, 502);
  assert.equal(calls, 3);
  assert.equal(sendSignal.aborted, true);
});
