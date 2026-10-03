import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { BlobError, BlobPreconditionFailedError, get, put } from "@vercel/blob";

const hour = 60 * 60 * 1000;
const day = 24 * hour;
const globalLimit = 100;
const clientLimit = 5;
const statePath = "enquiries/rate-limit-v1.json";
const maxAttempts = 5;

type Entry = { key: string; at: number };
type State = { version: 1; entries: Entry[] };
type Environment = Record<string, string | undefined>;

export type EnquiryReservation =
  { allowed: true } | { allowed: false; retryAfter: number };

type ReservationOptions = {
  blob?: { get: typeof get; put: typeof put };
  now?: () => number;
  salt?: string;
  retryDelay?: (attempt: number) => Promise<void>;
};

export function enquiryRateLimitConfigured(
  env: Environment = process.env,
): boolean {
  return Boolean(
    env.RATE_LIMIT_SALT &&
    env.RATE_LIMIT_SALT.length >= 32 &&
    (env.BLOB_READ_WRITE_TOKEN || (env.BLOB_STORE_ID && env.VERCEL_OIDC_TOKEN)),
  );
}

/** Only trust the header that Vercel supplies at its own ingress. */
export function getEnquiryClientIp(
  request: Pick<Request, "headers">,
  onVercel = process.env.VERCEL === "1",
): string | undefined {
  if (!onVercel) return undefined;
  const value = request.headers.get("x-vercel-forwarded-for")?.trim();
  if (!value || !isIP(value)) return undefined;
  if (isIP(value) === 4) return value;
  return new URL(`http://[${value}]/`).hostname.slice(1, -1);
}

function parseState(text: string): State {
  // A full ledger is under 10 KB; a malformed/oversized ledger must never reset it.
  if (text.length > 20_000)
    throw new Error("Invalid enquiry rate limit state.");
  const state: unknown = JSON.parse(text);
  if (
    !state ||
    typeof state !== "object" ||
    !("version" in state) ||
    state.version !== 1 ||
    !("entries" in state) ||
    !Array.isArray(state.entries) ||
    state.entries.length > globalLimit ||
    !state.entries.every(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        typeof entry.key === "string" &&
        /^[a-f0-9]{64}$/.test(entry.key) &&
        Number.isSafeInteger(entry.at) &&
        entry.at >= 0,
    )
  ) {
    throw new Error("Invalid enquiry rate limit state.");
  }
  return state as State;
}

function isWriteConflict(error: unknown): boolean {
  return (
    error instanceof BlobPreconditionFailedError ||
    (error instanceof BlobError && /already exists/i.test(error.message))
  );
}

/**
 * Reserve before sending mail. Failed or uncertain sends retain their reservation.
 * Every deployment uses this one private ledger, with an atomic conditional write.
 */
export async function reserveEnquiryAttempt(
  clientKey: string,
  options: ReservationOptions = {},
): Promise<EnquiryReservation> {
  const salt = options.salt ?? process.env.RATE_LIMIT_SALT;
  if (!salt || salt.length < 32 || !clientKey || clientKey.length > 256) {
    throw new Error("Enquiry rate limiting is not configured.");
  }
  if (!options.blob && !enquiryRateLimitConfigured()) {
    throw new Error("Enquiry rate limiting is not configured.");
  }

  const blob = options.blob ?? { get, put };
  const now = options.now ?? Date.now;
  const key = createHmac("sha256", salt).update(clientKey).digest("hex");
  const abortSignal = AbortSignal.timeout(8_000);
  const retryDelay =
    options.retryDelay ??
    ((attempt: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, (20 + Math.random() * 20) * 2 ** attempt);
      }));

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    // useCache:false avoids the Blob CDN's cached state, including cached misses.
    const current = await blob.get(statePath, {
      access: "private",
      useCache: false,
      abortSignal,
    });
    let previous: State = { version: 1, entries: [] };
    if (current) {
      if (current.statusCode !== 200 || !current.stream || !current.blob.etag) {
        throw new Error("Unable to read enquiry rate limit state.");
      }
      previous = parseState(await new Response(current.stream).text());
    }

    const timestamp = now();
    if (!Number.isSafeInteger(timestamp) || timestamp < 0) {
      throw new Error("Invalid enquiry rate limit clock.");
    }
    const entries = previous.entries
      .filter((entry) => entry.at > timestamp - day)
      .sort((left, right) => left.at - right.at);
    const clientEntries = entries.filter(
      (entry) => entry.key === key && entry.at > timestamp - hour,
    );
    const globalReset = entries.length >= globalLimit ? entries[0].at + day : 0;
    const clientReset =
      clientEntries.length >= clientLimit ? clientEntries[0].at + hour : 0;
    if (globalReset || clientReset) {
      return {
        allowed: false,
        retryAfter: Math.max(
          1,
          Math.ceil((Math.max(globalReset, clientReset) - timestamp) / 1000),
        ),
      };
    }

    const next: State = {
      version: 1,
      entries: [...entries, { key, at: timestamp }],
    };
    try {
      await blob.put(statePath, JSON.stringify(next), {
        access: "private",
        addRandomSuffix: false,
        contentType: "application/json",
        cacheControlMaxAge: 60,
        abortSignal,
        // Missing object: atomic create; existing object: compare-and-swap.
        ...(current
          ? { allowOverwrite: true, ifMatch: current.blob.etag }
          : { allowOverwrite: false }),
      });
      return { allowed: true };
    } catch (error) {
      if (!isWriteConflict(error)) throw error;
      if (attempt + 1 < maxAttempts) await retryDelay(attempt);
    }
  }
  // Never send after a storage failure or without successfully reserving a slot.
  throw new Error("Unable to reserve enquiry allowance.");
}
