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

// Counts what the video route asks of the assets binding, so a test can tell a cache hit (no
// call) from a miss (one). `/__test/assets-calls` reads the count. A request with the header
// `x-test-no-cache` is answered without the cache (the slicing path alone). The cache key carries
// a version id: a random one per run, because wrangler dev keeps the local cache between runs.
let assetCalls = 0;
// The promises handed to waitUntil, so a test can wait for a cache put instead of a timer.
const pending: Promise<unknown>[] = [];
let testVersion: string | undefined;

export default {
  fetch: (request: Request, env: TestEnv, ctx: ExecutionContext) => {
    const { pathname } = new URL(request.url);
    if (pathname === "/__test/assets-calls") {
      return Response.json({ calls: assetCalls });
    }
    if (pathname === "/__test/settled") {
      return Promise.allSettled(pending.splice(0)).then(() =>
        Response.json({ calls: assetCalls }),
      );
    }
    testVersion ??= crypto.randomUUID();
    const assets = {
      fetch: (...args: Parameters<Fetcher["fetch"]>) => {
        assetCalls += 1;
        return env.ASSETS.fetch(...args);
      },
    } as Fetcher;
    return handle(
      request,
      {
        ...env,
        ASSETS: assets,
        CF_VERSION_METADATA: { id: testVersion } as WorkerVersionMetadata,
        EMAIL: {
          send: (message: unknown) => stubSend(env, message),
        } as unknown as SendEmail,
      },
      {
        providerFetch: (url, init) =>
          fetch(env.STUB_URL + stubPaths[String(url)], init),
        waitUntil: (promise) => {
          pending.push(promise);
          ctx.waitUntil(promise);
        },
        video: request.headers.has("x-test-no-cache")
          ? { cache: undefined }
          : {},
      },
    );
  },
} satisfies ExportedHandler<TestEnv>;
