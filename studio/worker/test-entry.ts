// Test-only entry for tests/workerd.test.mjs, run under `wrangler dev` (workerd).
// The real handler, headers and ledger run unchanged; only the three provider
// URLs are pointed at a local stub server (STUB_URL), through the runtime's own
// fetch, so runtime differences (fetch options, Web Crypto, Durable Objects)
// are exercised.
import { handle, type Env } from "./index";

export { EnquiryLedger } from "./ledger";

const stubPaths: Record<string, string> = {
  "https://challenges.cloudflare.com/turnstile/v0/siteverify": "/turnstile",
  "https://oauth2.googleapis.com/token": "/token",
  "https://gmail.googleapis.com/gmail/v1/users/me/messages/send": "/send",
};

export default {
  fetch: (request: Request, env: Env & { STUB_URL: string }) =>
    handle(request, env, (url, init) =>
      fetch(env.STUB_URL + stubPaths[String(url)], init),
    ),
} satisfies ExportedHandler<Env & { STUB_URL: string }>;
