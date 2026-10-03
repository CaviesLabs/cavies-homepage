import { randomUUID } from "node:crypto";
import { prepareEnquiry, type EnquiryFields } from "./enquiry";

const mailbox = "tin@cavies.xyz";
const sender = "contact@cavies.xyz";
const canonicalOrigin = "https://cavies.xyz";
const gmailSendScope = "https://www.googleapis.com/auth/gmail.send";
const permittedScopes = new Set([
  gmailSendScope,
  "openid",
  "email",
  "https://www.googleapis.com/auth/userinfo.email",
]);
const maxBodyBytes = 8 * 1024;
const maxProviderBytes = 32 * 1024;
const bodyTimeoutMs = 3_000;
const providerTimeoutMs = 5_000;
const unavailableMessage =
  "The form is temporarily unavailable. Please email contact@cavies.xyz.";
const unconfirmedMessage =
  "We couldn't confirm your enquiry was sent. Please email contact@cavies.xyz if you need help.";

type Environment = Record<string, string | undefined>;
type LimitResult = { allowed: true } | { allowed: false; retryAfter: number };
type JsonObject = Record<string, unknown>;

export type EnquiryDeliveryConfig = {
  enabled: boolean;
  production: boolean;
  allowedOrigins: string[];
  turnstileSecret: string;
  googleClientId: string;
  googleClientSecret: string;
  gmailRefreshToken: string;
};

export type EnquiryDeliveryDependencies = {
  config: EnquiryDeliveryConfig;
  rateLimitsReady: boolean;
  reserveAttempt: (clientKey: string) => Promise<LimitResult>;
  clientKey: (request: Request) => string | null;
  fetch?: typeof globalThis.fetch;
  timeoutMs?: number;
};

// Only the current deployment is allowed in preview; other *.vercel.app sites
// must not be able to use this endpoint as an email relay.
export function enquiryDeliveryConfig(env: Environment): EnquiryDeliveryConfig {
  const production =
    env.VERCEL_ENV === "production" || env.NODE_ENV === "production";
  const allowedOrigins = [canonicalOrigin];
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL) {
    const origin = exactOrigin(`https://${env.VERCEL_URL}`);
    if (origin && /^[a-z0-9-]+\.vercel\.app$/.test(new URL(origin).hostname)) {
      allowedOrigins.push(origin);
    }
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
    googleClientId: env.GOOGLE_CLIENT_ID?.trim() || "",
    googleClientSecret: env.GOOGLE_CLIENT_SECRET?.trim() || "",
    gmailRefreshToken: env.GMAIL_REFRESH_TOKEN?.trim() || "",
  };
}

function deliveryConfigReady(config: EnquiryDeliveryConfig): boolean {
  const testSecret = /^[123]x0{20,}/.test(config.turnstileSecret);
  return Boolean(
    config.enabled &&
    config.turnstileSecret &&
    config.googleClientId &&
    config.googleClientSecret &&
    config.gmailRefreshToken &&
    !(config.production && testSecret),
  );
}

// The caller must separately confirm durable rate limiting is configured.
export function enquiryDeliveryConfigured(
  env: Environment = process.env,
): boolean {
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
    return new TextDecoder("utf-8", { fatal: true }).decode(
      Buffer.concat(chunks),
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
    clearTimeout(timer);
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

function mimeMessage(
  fields: EnquiryFields,
  subject: string,
  body: string,
): string {
  const encodedBody =
    Buffer.from(body.replace(/\r\n|\r|\n/g, "\r\n"), "utf8")
      .toString("base64")
      .match(/.{1,76}/g)
      ?.join("\r\n") || "";
  // Subject contains only the service allowlist; no visitor-supplied name.
  const mime = [
    `From: Cavies website <${sender}>`,
    `To: ${mailbox}`,
    `Reply-To: ${fields.email.trim()}`,
    `Subject: ${subject}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${randomUUID()}@cavies.xyz>`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    encodedBody,
    "",
  ].join("\r\n");
  return Buffer.from(mime, "utf8").toString("base64url");
}

export function createEnquiryHandler(
  dependencies: EnquiryDeliveryDependencies,
) {
  const { config } = dependencies;
  const fetcher = dependencies.fetch || globalThis.fetch;
  const timeout = dependencies.timeoutMs ?? providerTimeoutMs;

  async function providerJson(url: string, init: RequestInit) {
    return withDeadline(async (signal) => {
      const response = await fetcher(url, {
        ...init,
        signal,
        cache: "no-store",
        redirect: "error",
      });
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
    if (!deliveryConfigReady(config) || !dependencies.rateLimitsReady) {
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
          "Too many enquiries have been submitted. Please try later or email contact@cavies.xyz.",
          Math.max(1, Math.ceil(limit.retryAfter)),
        );
      }
    } catch {
      return failure(503, unavailableMessage);
    }

    let accessToken: string;
    try {
      const token = await providerJson("https://oauth2.googleapis.com/token", {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: config.googleClientId,
          client_secret: config.googleClientSecret,
          refresh_token: config.gmailRefreshToken,
          scope: gmailSendScope,
        }),
      });
      if (
        !token.ok ||
        !object(token.data) ||
        typeof token.data.access_token !== "string" ||
        !token.data.access_token ||
        (token.data.token_type !== undefined &&
          token.data.token_type !== "Bearer")
      ) {
        return failure(503, unavailableMessage);
      }
      // Identity scopes establish mailbox ownership during setup. No Gmail scope
      // other than send is accepted, even if a wider grant is misconfigured.
      const scopes =
        typeof token.data.scope === "string"
          ? token.data.scope.trim().split(/\s+/)
          : [];
      if (
        !scopes.includes(gmailSendScope) ||
        scopes.some((scope) => !permittedScopes.has(scope))
      ) {
        return failure(503, unavailableMessage);
      }
      accessToken = token.data.access_token;
    } catch {
      return failure(503, unavailableMessage);
    }

    try {
      const sent = await providerJson(
        `https://gmail.googleapis.com/gmail/v1/users/${encodeURIComponent(mailbox)}/messages/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            raw: mimeMessage(
              fields,
              prepared.draft.subject,
              prepared.draft.body,
            ),
          }),
        },
      );
      if (
        !sent.ok ||
        !object(sent.data) ||
        typeof sent.data.id !== "string" ||
        !sent.data.id.trim()
      ) {
        return failure(
          sent.status === 429 ? 429 : 502,
          unconfirmedMessage,
          sent.status === 429 ? 60 : undefined,
        );
      }
      return json(200, { ok: true });
    } catch {
      // A send timeout may have delivered the message. Never retry it automatically.
      return failure(502, unconfirmedMessage);
    }
  };
}
