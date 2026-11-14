import {
  createEnquiryHandler,
  enquiryDeliveryConfig,
} from "./enquiry-delivery";
import type { EnquiryLedger } from "./ledger";
import {
  enquiryRateLimitConfigured,
  getEnquiryClientIp,
  hashClientKey,
  rateLimitClientKey,
} from "./rate-limit";

export { EnquiryLedger } from "./ledger";

export type Env = {
  LEDGER: DurableObjectNamespace<EnquiryLedger>;
  RATE_LIMIT_SALT?: string;
  ENQUIRY_DELIVERY_ENABLED?: string;
  ENQUIRY_EXTRA_ORIGIN?: string;
  ENQUIRY_ENV?: string;
  TURNSTILE_SECRET_KEY?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GMAIL_REFRESH_TOKEN?: string;
};

const securityHeaders = {
  "Strict-Transport-Security": "max-age=63072000",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
};

// Static assets get these from public/_headers; Worker replies get them here.
function withSecurityHeaders(response: Response): Response {
  const secured = new Response(response.body, response);
  for (const [name, value] of Object.entries(securityHeaders)) {
    secured.headers.set(name, value);
  }
  return secured;
}

async function route(
  request: Request,
  env: Env,
  providerFetch?: typeof fetch,
): Promise<Response> {
  const { pathname } = new URL(request.url);
  if (pathname !== "/api/enquiry") {
    return Response.json(
      { ok: false, message: "Not found." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }
  if (request.method !== "POST") {
    return Response.json(
      { ok: false, message: "Method not allowed." },
      { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
    );
  }
  const handler = createEnquiryHandler({
    config: enquiryDeliveryConfig(env),
    rateLimitsReady: enquiryRateLimitConfigured(env),
    clientKey: (incoming) => getEnquiryClientIp(incoming) || null,
    reserveAttempt: async (clientKey) =>
      env.LEDGER.getByName("global").reserve(
        await hashClientKey(
          rateLimitClientKey(clientKey),
          env.RATE_LIMIT_SALT ?? "",
        ),
      ),
    fetch: providerFetch,
  });
  return handler(request);
}

/** `providerFetch` is for tests only (worker/test-entry.ts). */
export async function handle(
  request: Request,
  env: Env,
  providerFetch?: typeof fetch,
): Promise<Response> {
  return withSecurityHeaders(await route(request, env, providerFetch));
}

// wrangler.jsonc sends only /api/* here (assets.run_worker_first); every page
// is a static asset and never runs this code.
export default {
  fetch: (request: Request, env: Env) => handle(request, env),
} satisfies ExportedHandler<Env>;
