// Test-only entry for tests/workerd.test.mjs, run under `wrangler dev` (workerd).
// The real handler, headers and ledger run unchanged; the Turnstile URL is
// pointed at a local stub server (STUB_URL) through the runtime's own fetch,
// and env.EMAIL is swapped for an object with the binding's send() that posts
// the message to the same stub as JSON, so the real wiring from env.EMAIL and
// runtime differences (fetch options, Web Crypto, Durable Objects, the send
// path's error handling) are exercised and nothing is sent.
import { handle, type Env } from "./index";

export { EnquiryLedger } from "./ledger";

const stubPaths: Record<string, string> = {
  "https://challenges.cloudflare.com/turnstile/v0/siteverify": "/turnstile",
};

type TestEnv = Env & { STUB_URL: string };

// Behaves like the binding: resolves with { messageId } or throws an Error
// carrying the stub's `code`.
async function stubSend(env: TestEnv, message: unknown): Promise<unknown> {
  const response = await fetch(env.STUB_URL + "/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(message),
  });
  const data = (await response.json()) as { messageId?: string; code?: string };
  if (data.code) throw Object.assign(new Error("stub send failed"), { code: data.code });
  return data;
}

export default {
  fetch: (request: Request, env: TestEnv) =>
    handle(
      request,
      {
        ...env,
        EMAIL: {
          send: (message: unknown) => stubSend(env, message),
        } as unknown as SendEmail,
      },
      (url, init) => fetch(env.STUB_URL + stubPaths[String(url)], init),
    ),
} satisfies ExportedHandler<TestEnv>;
