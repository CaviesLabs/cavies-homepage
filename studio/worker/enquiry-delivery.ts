import { prepareEnquiry, type EnquiryFields } from "../lib/enquiry";

// The mailbox was tin@cavies.xyz until the October 2026 move to cavies.studio;
// the old address remains an alias of the same Google Workspace account.
const mailbox = "tin@cavies.studio";
// Sent through Cloudflare Email Sending (the `EMAIL` send_email binding) since
// 25 November 2026. On Workers Free it delivers only to the account's verified
// destination addresses, and tin@cavies.studio is the one verified address.
// The sender is an address on the onboarded sending domain cavies.studio (it
// is also an alias of the mailbox, so a reply to the notification itself goes
// nowhere new); the binding's allowed_sender_addresses holds it to this one.
const sender = "contact@cavies.studio";
const canonicalOrigin = "https://cavies.studio";
// The one workers.dev address that may be named in ENQUIRY_EXTRA_ORIGIN.
const testOrigin = "https://cavies-studio-test.dev-226.workers.dev";
// Email Sending errors that mean "slow down", not "broken".
const throttledCodes = new Set([
  "E_RATE_LIMIT_EXCEEDED",
  "E_DAILY_LIMIT_EXCEEDED",
]);
const maxBodyBytes = 8 * 1024;
const maxProviderBytes = 32 * 1024;
const bodyTimeoutMs = 3_000;
const providerTimeoutMs = 5_000;
const unavailableMessage =
  "The form is temporarily unavailable. Please email tin@cavies.studio.";
const unconfirmedMessage =
  "We couldn't confirm your enquiry was sent. Please email tin@cavies.studio if you need help.";

export type Environment = {
  ENQUIRY_ENV?: string;
  ENQUIRY_DELIVERY_ENABLED?: string;
  ENQUIRY_EXTRA_ORIGIN?: string;
  ENQUIRY_LOCAL_ORIGIN?: string;
  TURNSTILE_SECRET_KEY?: string;
  EMAIL?: EnquiryMailer;
};
/** The one message shape this endpoint sends (a subset of the binding's builder). */
export type EnquiryEmail = {
  from: { name: string; email: string };
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};
/** The part of Cloudflare's SendEmail binding the endpoint uses. */
export type EnquiryMailer = {
  send(message: EnquiryEmail): Promise<{ messageId: string }>;
};
type LimitResult = { allowed: true } | { allowed: false; retryAfter: number };
type JsonObject = Record<string, unknown>;

export type EnquiryDeliveryConfig = {
  enabled: boolean;
  production: boolean;
  allowedOrigins: string[];
  turnstileSecret: string;
  /** The `EMAIL` send_email binding is attached to the Worker. */
  emailBound: boolean;
};

export type EnquiryDeliveryDependencies = {
  config: EnquiryDeliveryConfig;
  rateLimitsReady: boolean;
  reserveAttempt: (clientKey: string) => Promise<LimitResult>;
  clientKey: (request: Request) => string | null;
  /** Hands the notification to the `EMAIL` binding. Absent means not configured. */
  sendEmail?: (message: EnquiryEmail) => Promise<unknown>;
  fetch?: typeof globalThis.fetch;
  timeoutMs?: number;
};

// The site is served from https://cavies.studio only. ENQUIRY_EXTRA_ORIGIN
// lets that one workers.dev address (and no other) through for pre-cutover testing; it is never set
// in wrangler.jsonc, only passed with `wrangler deploy --var`. ENQUIRY_ENV is
// "development" only in a local `wrangler dev` (.dev.vars).
export function enquiryDeliveryConfig(env: Environment): EnquiryDeliveryConfig {
  const production = env.ENQUIRY_ENV !== "development";
  const allowedOrigins = [canonicalOrigin];
  if (env.ENQUIRY_EXTRA_ORIGIN) {
    const origin = exactOrigin(env.ENQUIRY_EXTRA_ORIGIN);
    if (origin === testOrigin) allowedOrigins.push(origin);
  }
  if (!production && env.ENQUIRY_LOCAL_ORIGIN) {
    const origin = exactOrigin(env.ENQUIRY_LOCAL_ORIGIN);
    if (
      origin &&
      ["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname)
    ) {
      allowedOrigins.push(origin);
    }
  }
  return {
    enabled: env.ENQUIRY_DELIVERY_ENABLED === "true",
    production,
    allowedOrigins,
    turnstileSecret: env.TURNSTILE_SECRET_KEY?.trim() || "",
    emailBound: typeof env.EMAIL?.send === "function",
  };
}

function deliveryConfigReady(config: EnquiryDeliveryConfig): boolean {
  const testSecret = /^[123]x0{20,}/.test(config.turnstileSecret);
  return Boolean(
    config.enabled &&
    config.turnstileSecret &&
    config.emailBound &&
    !(config.production && testSecret),
  );
}

export function enquiryDeliveryConfigured(env: Environment): boolean {
  return deliveryConfigReady(enquiryDeliveryConfig(env));
}

function exactOrigin(value: string): string | null {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && url.origin === value
      ? value
      : null;
  } catch {
    return null;
  }
}

function json(status: number, body: JsonObject, retryAfter?: number): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}),
    },
  });
}

function failure(status: number, message: string, retryAfter?: number) {
  return json(status, { ok: false, message }, retryAfter);
}

class BodyTooLarge extends Error {}

async function readBounded(
  stream: ReadableStream<Uint8Array> | null,
  limit: number,
  signal: AbortSignal,
): Promise<string> {
  if (!stream) return "";
  const reader = stream.getReader();
  const cancel = () => {
    void reader.cancel().catch(() => {});
  };
  signal.addEventListener("abort", cancel, { once: true });
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > limit) throw new BodyTooLarge();
      chunks.push(chunk.value);
    }
    const all = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      all.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(
      all,
    );
  } finally {
    signal.removeEventListener("abort", cancel);
    cancel();
    reader.releaseLock();
  }
}

async function withDeadline<T>(
  work: (signal: AbortSignal) => Promise<T>,
  timeout: number,
): Promise<T> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work(controller.signal),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new Error("Deadline exceeded"));
        }, timeout);
      }),
    ]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    controller.abort();
  }
}

async function requestJson(
  request: Request,
  timeout: number,
): Promise<unknown> {
  const length = request.headers.get("content-length");
  if (length && /^\d+$/.test(length) && Number(length) > maxBodyBytes) {
    void request.body?.cancel().catch(() => {});
    throw new BodyTooLarge();
  }
  return withDeadline(async (signal) => {
    // Cancellation also bounds a slow body that never finishes uploading.
    return JSON.parse(await readBounded(request.body, maxBodyBytes, signal));
  }, timeout);
}

function object(value: unknown): value is JsonObject {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

// RFC 5322 dot-atom mailbox only: no display names, lists, comments or controls
// can enter Reply-To. Visitor names and international text stay in the body.
function replyAddress(value: string): boolean {
  const [local, domain, extra] = value.split("@");
  return (
    !extra &&
    !!local &&
    !!domain &&
    local.length <= 64 &&
    !local.startsWith(".") &&
    !local.endsWith(".") &&
    !local.includes("..") &&
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) &&
    domain.length <= 253 &&
    domain.split(".").length >= 2 &&
    domain
      .split(".")
      .every((label) =>
        /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(label),
      )
  );
}

export function createEnquiryHandler(
  dependencies: EnquiryDeliveryDependencies,
) {
  const { config, sendEmail } = dependencies;
  const fetcher = dependencies.fetch || globalThis.fetch;
  const timeout = dependencies.timeoutMs ?? providerTimeoutMs;

  async function providerJson(url: string, init: RequestInit) {
    return withDeadline(async (signal) => {
      const response = await fetcher(url, {
        ...init,
        signal,
        cache: "no-store",
        // Workers rejects redirect: "error"; a 3xx is treated as a failure below.
        redirect: "manual",
      });
      if (response.status >= 300 && response.status < 400) {
        void response.body?.cancel().catch(() => {});
        throw new Error("Provider redirected.");
      }
      const text = await readBounded(response.body, maxProviderBytes, signal);
      const data: unknown = JSON.parse(text);
      return { status: response.status, ok: response.ok, data };
    }, timeout);
  }

  return async function handleEnquiry(request: Request): Promise<Response> {
    const origin = request.headers.get("origin");
    if (
      !origin ||
      !exactOrigin(origin) ||
      !config.allowedOrigins.includes(origin)
    ) {
      return failure(403, "Submit your enquiry from the Cavies contact page.");
    }
    if (request.headers.get("sec-fetch-site") === "cross-site") {
      return failure(403, "Submit your enquiry from the Cavies contact page.");
    }
    if (
      request.headers
        .get("content-type")
        ?.split(";")[0]
        .trim()
        .toLowerCase() !== "application/json"
    ) {
      return failure(400, "Submit the contact form as JSON.");
    }
    if (
      !deliveryConfigReady(config) ||
      !sendEmail ||
      !dependencies.rateLimitsReady
    ) {
      return failure(503, unavailableMessage);
    }
    const clientKey = dependencies.clientKey(request);
    if (!clientKey) return failure(503, unavailableMessage);

    let data: unknown;
    try {
      data = await requestJson(
        request,
        dependencies.timeoutMs ?? bodyTimeoutMs,
      );
    } catch (error) {
      return failure(
        error instanceof BodyTooLarge ? 413 : 400,
        error instanceof BodyTooLarge
          ? "This enquiry is too large. Please shorten it."
          : "The form could not be read. Please check your details.",
      );
    }
    const fieldNames = [
      "name",
      "email",
      "service",
      "website",
      "brief",
    ] as const;
    if (
      !object(data) ||
      !fieldNames.every((field) => typeof data[field] === "string")
    ) {
      return failure(400, "Please complete the contact form.");
    }
    if (typeof data.company !== "string" || data.company !== "") {
      return failure(403, "The enquiry could not be verified.");
    }
    const fields: EnquiryFields = {
      name: data.name as string,
      email: data.email as string,
      service: data.service as string,
      website: data.website as string,
      brief: data.brief as string,
    };
    const prepared = prepareEnquiry(fields, mailbox);
    if (!prepared.ok) {
      return json(400, {
        ok: false,
        errors: prepared.errors,
        message: "Please check the highlighted fields.",
      });
    }
    if (!replyAddress(fields.email.trim())) {
      return json(400, {
        ok: false,
        errors: {
          email: "Enter a valid email address, such as you@example.com.",
        },
        message: "Please check the highlighted fields.",
      });
    }
    if (
      typeof data.turnstileToken !== "string" ||
      !data.turnstileToken.trim() ||
      data.turnstileToken.length > 2048
    ) {
      return failure(403, "Please complete the security check and try again.");
    }

    try {
      const verification = await providerJson(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: new URLSearchParams({
            secret: config.turnstileSecret,
            response: data.turnstileToken,
          }),
        },
      );
      if (!verification.ok) return failure(503, unavailableMessage);
      if (
        !object(verification.data) ||
        verification.data.success !== true ||
        verification.data.action !== "enquiry" ||
        verification.data.hostname !== new URL(origin).hostname
      ) {
        return failure(
          403,
          "Please complete the security check and try again.",
        );
      }
    } catch {
      return failure(503, unavailableMessage);
    }

    try {
      const limit = await dependencies.reserveAttempt(clientKey);
      if (!limit.allowed) {
        return failure(
          429,
          "Too many enquiries have been submitted. Please try later or email tin@cavies.studio.",
          Math.max(1, Math.ceil(limit.retryAfter)),
        );
      }
    } catch {
      return failure(503, unavailableMessage);
    }

    try {
      // Subject contains only the service allowlist; no visitor-supplied name.
      // Reply-To passed the strict mailbox check above.
      const sent = await withDeadline(
        () =>
          sendEmail({
            from: { name: "Cavies website", email: sender },
            to: mailbox,
            replyTo: fields.email.trim(),
            subject: prepared.draft.subject,
            text: prepared.draft.body,
          }),
        timeout,
      );
      if (
        !object(sent) ||
        typeof sent.messageId !== "string" ||
        !sent.messageId.trim()
      ) {
        return failure(502, unconfirmedMessage);
      }
      return json(200, { ok: true });
    } catch (error) {
      // A send timeout may have delivered the message. Never retry it automatically.
      // Only the binding's error code is logged: never the message or its fields.
      const code =
        object(error) && typeof error.code === "string" ? error.code : "";
      if (/^E_[A-Z_]{1,60}$/.test(code)) {
        console.log(JSON.stringify({ event: "enquiry_send_failed", code }));
      }
      return throttledCodes.has(code)
        ? failure(429, unconfirmedMessage, 60)
        : failure(502, unconfirmedMessage);
    }
  };
}
