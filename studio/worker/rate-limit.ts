// Enquiry send allowance: 5 per client per rolling hour, 100 per rolling 24
// hours globally. The ledger lives in one SQLite-backed Durable Object
// (worker/ledger.ts). A Durable Object runs one request at a time and the
// read-check-insert below is a single synchronous transaction, so concurrent
// requests cannot overshoot either limit. Only HMAC identifiers and timestamps
// are stored.

const hour = 60 * 60 * 1000;
const day = 24 * hour;
export const globalLimit = 100;
export const clientLimit = 5;

export type EnquiryReservation =
  { allowed: true } | { allowed: false; retryAfter: number };

/** The slice of Durable Object `SqlStorage` the ledger uses. */
export type LedgerSql = {
  exec(
    query: string,
    ...bindings: (string | number)[]
  ): { toArray(): Record<string, unknown>[] };
};

export function enquiryRateLimitConfigured(env: {
  RATE_LIMIT_SALT?: string;
  LEDGER?: unknown;
}): boolean {
  return Boolean(
    env.RATE_LIMIT_SALT && env.RATE_LIMIT_SALT.length >= 32 && env.LEDGER,
  );
}

const ipv4 =
  /^(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

/** Only the header Cloudflare sets at its own edge is trusted. */
export function getEnquiryClientIp(
  request: Pick<Request, "headers">,
): string | undefined {
  const value = request.headers.get("cf-connecting-ip")?.trim();
  if (!value) return undefined;
  if (ipv4.test(value)) return value;
  if (!/^[0-9a-f:.]+$/i.test(value) || !value.includes(":")) return undefined;
  try {
    return new URL(`http://[${value}]/`).hostname.slice(1, -1);
  } catch {
    return undefined;
  }
}

/** HMAC-SHA-256 of the client key, hex. The raw address never reaches storage. */
export async function hashClientKey(
  clientKey: string,
  salt: string,
): Promise<string> {
  if (!salt || salt.length < 32 || !clientKey || clientKey.length > 256) {
    throw new Error("Enquiry rate limiting is not configured.");
  }
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(clientKey));
  return Array.from(new Uint8Array(mac), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export function initLedger(sql: LedgerSql): void {
  sql.exec(
    "CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, client TEXT NOT NULL, at INTEGER NOT NULL)",
  );
}

/**
 * Reserve before sending mail. Failed or uncertain sends retain their
 * reservation. Call inside one synchronous transaction.
 */
export function reserve(
  sql: LedgerSql,
  hashedClient: string,
  now: number,
): EnquiryReservation {
  if (!/^[a-f0-9]{64}$/.test(hashedClient)) {
    throw new Error("Invalid enquiry client identifier.");
  }
  if (!Number.isSafeInteger(now) || now < 0) {
    throw new Error("Invalid enquiry rate limit clock.");
  }
  sql.exec("DELETE FROM reservations WHERE at <= ?", now - day);
  const rows = sql
    .exec("SELECT client, at FROM reservations ORDER BY at ASC")
    .toArray() as { client: string; at: number }[];
  const clientRows = rows.filter(
    (row) => row.client === hashedClient && row.at > now - hour,
  );
  const globalReset = rows.length >= globalLimit ? rows[0].at + day : 0;
  const clientReset =
    clientRows.length >= clientLimit ? clientRows[0].at + hour : 0;
  if (globalReset || clientReset) {
    return {
      allowed: false,
      retryAfter: Math.max(
        1,
        Math.ceil((Math.max(globalReset, clientReset) - now) / 1000),
      ),
    };
  }
  sql.exec(
    "INSERT INTO reservations (client, at) VALUES (?, ?)",
    hashedClient,
    now,
  );
  return { allowed: true };
}
