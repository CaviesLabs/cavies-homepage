import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Match Next's extensionless TypeScript import resolution without changing the
// production module or compiling a separate, potentially different test copy.
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (
      specifier === "../lib/enquiry" &&
      context.parentURL?.endsWith("/worker/enquiry-delivery.ts")
    ) {
      return next("../lib/enquiry.ts", context);
    }
    return next(specifier, context);
  },
});
const {
  createEnquiryHandler,
  enquiryDeliveryConfig,
  enquiryDeliveryConfigured,
} = await import("../worker/enquiry-delivery.ts");
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
const mailer = { send: async () => ({ messageId: "binding-message-id" }) };
const env = {
  ENQUIRY_DELIVERY_ENABLED: "true",
  TURNSTILE_SECRET_KEY: "mock-secret",
  EMAIL: mailer,
};
const captcha = { success: true, hostname: "cavies.studio", action: "enquiry" };
const sendError = (code) =>
  Object.assign(new Error(`binding detail private-content ${code}`), { code });

function request(body = valid, headers = {}) {
  return new Request("https://cavies.studio/api/enquiry", {
    method: "POST",
    headers: {
      origin: "https://cavies.studio",
      "content-type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function setup(overrides = {}) {
  const calls = [];
  const reservations = [];
  const sends = [];
  const replies = overrides.replies || [captcha];
  const sent =
    "sent" in overrides ? overrides.sent : { messageId: "binding-message-id" };
  const handler = createEnquiryHandler({
    config: enquiryDeliveryConfig(overrides.env || env),
    rateLimitsReady: true,
    sendEmail: async (message) => {
      sends.push(message);
      if (sent instanceof Error) throw sent;
      return sent;
    },
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
  return { handler, calls, reservations, sends };
}

test("production config is exact-origin only and ignores development knobs", () => {
  const config = enquiryDeliveryConfig({
    ...env,
    ENQUIRY_LOCAL_ORIGIN: "http://localhost:3000",
  });
  assert.equal(config.production, true);
  assert.deepEqual(config.allowedOrigins, ["https://cavies.studio"]);
  assert.deepEqual(
    enquiryDeliveryConfig({
      ...env,
      ENQUIRY_EXTRA_ORIGIN: "https://cavies-studio-test.dev-226.workers.dev",
    }).allowedOrigins,
    ["https://cavies.studio", "https://cavies-studio-test.dev-226.workers.dev"],
  );
  for (const origin of [
    "https://evil.example",
    "https://evil.workers.dev",
    "https://other.dev-226.workers.dev",
    "http://cavies-studio-test.dev-226.workers.dev",
    "https://cavies-studio-test.dev-226.workers.dev/path",
    "https://*.workers.dev",
    "https://good.workers.dev@evil.example",
    "https://workers.dev.evil.example",
  ]) {
    assert.deepEqual(
      enquiryDeliveryConfig({ ...env, ENQUIRY_EXTRA_ORIGIN: origin })
        .allowedOrigins,
      ["https://cavies.studio"],
    );
  }
  assert.deepEqual(
    enquiryDeliveryConfig({
      ENQUIRY_ENV: "development",
      ENQUIRY_LOCAL_ORIGIN: "http://localhost:3000",
    }).allowedOrigins,
    ["https://cavies.studio", "http://localhost:3000"],
  );
  assert.deepEqual(
    enquiryDeliveryConfig({
      ENQUIRY_ENV: "development",
      ENQUIRY_LOCAL_ORIGIN: "https://evil.example",
    }).allowedOrigins,
    ["https://cavies.studio"],
  );
});

test("rejects absent, null, foreign, malformed and cross-site origins before any provider or limit call", async () => {
  for (const origin of [
    "",
    "null",
    "https://evil.example",
    "http://cavies.studio",
    "https://cavies.studio.evil.example",
    "https://cavies.studio/",
    "https://cavies.studio:444",
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

test("fails closed when delivery, the email binding, CAPTCHA key or durable limiter is missing", async () => {
  assert.equal(enquiryDeliveryConfigured(env), true);
  for (const [key, value] of [
    ["ENQUIRY_DELIVERY_ENABLED", ""],
    ["ENQUIRY_DELIVERY_ENABLED", "yes"],
    ["TURNSTILE_SECRET_KEY", ""],
    ["EMAIL", undefined],
    ["EMAIL", {}],
  ]) {
    const run = setup({ env: { ...env, [key]: value } });
    assert.equal(enquiryDeliveryConfigured({ ...env, [key]: value }), false);
    assert.equal((await run.handler(request())).status, 503, key);
    assert.equal(run.calls.length, 0);
    assert.equal(run.sends.length, 0);
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
    { sendEmail: undefined },
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
      new Request("https://cavies.studio/api/enquiry", {
        method: "POST",
        duplex: "half",
        body: stream,
        headers: {
          origin: "https://cavies.studio",
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
    new Request("https://cavies.studio/api/enquiry", {
      method: "POST",
      duplex: "half",
      body: stream,
      headers: {
        origin: "https://cavies.studio",
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

test("CAPTCHA outage and durable limiter failure cannot proceed to the email send", async () => {
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
  assert.equal(run.sends.length, 0);
});

test("durable quota rejects with Retry-After and never sends", async () => {
  const run = setup({
    dependencies: {
      reserveAttempt: async () => ({ allowed: false, retryAfter: 61 }),
    },
  });
  const response = await run.handler(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "61");
  assert.equal(run.calls.length, 1);
  assert.equal(run.sends.length, 0);
});

test("only a binding message id succeeds; the message is fixed except Reply-To and the body", async () => {
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
  assert.equal(run.calls.length, 1);
  assert.deepEqual(run.reservations, ["192.0.2.10"]);
  assert.equal(
    run.calls[0].url,
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  );
  assert.equal(run.calls[0].init.body.get("response"), "mock-token");
  assert.ok(
    run.calls.every(
      ({ init }) => init.cache === "no-store" && init.redirect === "manual",
    ),
  );
  assert.equal(run.sends.length, 1);
  const [message] = run.sends;
  assert.deepEqual(Object.keys(message).sort(), [
    "from",
    "replyTo",
    "subject",
    "text",
    "to",
  ]);
  assert.deepEqual(message.from, {
    name: "Cavies website",
    email: "contact@cavies.studio",
  });
  assert.equal(message.to, "tin@cavies.studio");
  assert.equal(message.replyTo, "visitor@example.com");
  assert.equal(message.subject, "Project enquiry: Business website & support");
  assert.ok(
    !message.subject.includes("René") &&
      !message.subject.includes("Ignored subject") &&
      !JSON.stringify([message.to, message.from]).includes("attacker"),
  );
  assert.match(message.text, /Name: René · 阮/);
  assert.ok(message.text.endsWith(data.brief));
});

test("Reply-To is the trimmed visitor address", async () => {
  const run = setup();
  await run.handler(request({ ...valid, email: "  visitor@example.com " }));
  assert.equal(run.sends[0]?.replyTo, "visitor@example.com");
});

test("send errors and missing message ids return failure without retry or provider details", async () => {
  for (const result of [
    sendError("E_DELIVERY_FAILED"),
    sendError("E_SENDER_NOT_VERIFIED"),
    sendError("E_RECIPIENT_PLAN_RESTRICTED"),
    new Error("private-content without a code"),
    new TypeError("private-content malformed message"),
    undefined,
    {},
    { messageId: "" },
    { messageId: 42 },
  ]) {
    const run = setup({ sent: result });
    const response = await run.handler(request());
    assert.equal(response.status, 502);
    assert.equal(run.sends.length, 1);
    assert.ok(!(await response.text()).includes("private-content"));
  }
});

test("Email Sending throttling is a bounded retry interval without automatic retry", async () => {
  for (const code of ["E_RATE_LIMIT_EXCEEDED", "E_DAILY_LIMIT_EXCEEDED"]) {
    const run = setup({ sent: sendError(code) });
    const response = await run.handler(request());
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("retry-after"), "60");
    assert.equal(run.sends.length, 1);
  }
});

test("only the binding's error code is logged, never message fields", async () => {
  const lines = [];
  const original = console.log;
  console.log = (line) => lines.push(String(line));
  try {
    await setup({ sent: sendError("E_DELIVERY_FAILED") }).handler(request());
    await setup({ sent: new Error("no code") }).handler(request());
    await setup({
      sent: Object.assign(new Error("x"), { code: "visitor@example.com" }),
    }).handler(request());
  } finally {
    console.log = original;
  }
  assert.deepEqual(lines, [
    JSON.stringify({ event: "enquiry_send_failed", code: "E_DELIVERY_FAILED" }),
  ]);
});

test("ambiguous send timeout fails and does not retry", async () => {
  let sends = 0;
  const run = setup({
    dependencies: {
      timeoutMs: 20,
      sendEmail: async () => {
        sends++;
        return new Promise(() => {});
      },
    },
  });
  const response = await run.handler(request());
  assert.equal(response.status, 502);
  assert.equal(run.calls.length, 1);
  assert.equal(sends, 1);
});

test("a provider redirect is a failure, never followed or treated as success", async () => {
  const redirect = () =>
    new Response(null, {
      status: 302,
      headers: { location: "https://evil.example/" },
    });
  const captchaRedirect = setup({ replies: [redirect()] });
  assert.equal((await captchaRedirect.handler(request())).status, 503);
  assert.equal(captchaRedirect.calls.length, 1);
  assert.equal(captchaRedirect.sends.length, 0);
});
