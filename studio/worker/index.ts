import {
  createEnquiryHandler,
  enquiryDeliveryConfig,
} from "./enquiry-delivery";
import type { EnquiryLedger } from "./ledger";
import {
  enquiryRateLimitConfigured,
  getEnquiryClientIp,
  hashClientKey,
} from "./rate-limit";

export { EnquiryLedger } from "./ledger";

type Env = {
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

// wrangler.jsonc sends only /api/* here (assets.run_worker_first); every page
// is a static asset and never runs this code.
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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
        {
          status: 405,
          headers: { Allow: "POST", "Cache-Control": "no-store" },
        },
      );
    }
    const handler = createEnquiryHandler({
      config: enquiryDeliveryConfig(env),
      rateLimitsReady: enquiryRateLimitConfigured(env),
      clientKey: (incoming) => getEnquiryClientIp(incoming) || null,
      reserveAttempt: async (clientKey) =>
        env.LEDGER.getByName("global").reserve(
          await hashClientKey(clientKey, env.RATE_LIMIT_SALT ?? ""),
        ),
    });
    return handler(request);
  },
} satisfies ExportedHandler<Env>;
