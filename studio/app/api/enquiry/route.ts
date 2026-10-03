import {
  createEnquiryHandler,
  enquiryDeliveryConfig,
} from "@/lib/enquiry-delivery";
import {
  enquiryRateLimitConfigured,
  getEnquiryClientIp,
  reserveEnquiryAttempt,
} from "@/lib/enquiry-rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  const handler = createEnquiryHandler({
    config: enquiryDeliveryConfig(process.env),
    rateLimitsReady: enquiryRateLimitConfigured(),
    clientKey: (incoming) => getEnquiryClientIp(incoming) || null,
    reserveAttempt: reserveEnquiryAttempt,
  });
  return handler(request);
}
