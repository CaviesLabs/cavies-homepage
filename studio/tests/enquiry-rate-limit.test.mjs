import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import {
  clientLimit,
  enquiryRateLimitConfigured,
  getEnquiryClientIp,
  globalLimit,
  hashClientKey,
  initLedger,
  reserve,
} from "../worker/rate-limit.ts";

const salt = "a-secret-rate-limit-test-salt-of-at-least-32-characters";
const hour = 60 * 60 * 1000;
const day = 24 * hour;
const start = Date.UTC(2026, 9, 4, 12);
const hashed = (key) => createHmac("sha256", salt).update(key).digest("hex");

// A real SQLite database behind the same exec() shape as a Durable Object's
// SqlStorage. Each call to reserve() is synchronous, as it is inside the
// ledger's transactionSync, so interleaving cannot happen.
function ledger() {
  const db = new DatabaseSync(":memory:");
  const sql = {
    exec(query, ...bindings) {
      const statement = db.prepare(query);
      const isRead = /^\s*SELECT/i.test(query);
      const rows = isRead
        ? statement.all(...bindings).map((row) => ({ ...row }))
        : (statement.run(...bindings), []);
      return { toArray: () => rows };
    },
  };
  initLedger(sql);
  return {
    sql,
    rows: () => sql.exec("SELECT client, at FROM reservations").toArray(),
  };
}

test("limits and client key hashing match the Vercel-era values", () => {
  assert.equal(clientLimit, 5);
  assert.equal(globalLimit, 100);
});

test("requires a strong salt and the ledger binding", () => {
  assert.equal(enquiryRateLimitConfigured({}), false);
  assert.equal(
    enquiryRateLimitConfigured({ RATE_LIMIT_SALT: salt, LEDGER: {} }),
    true,
  );
  assert.equal(enquiryRateLimitConfigured({ RATE_LIMIT_SALT: salt }), false);
  assert.equal(
    enquiryRateLimitConfigured({ RATE_LIMIT_SALT: "short", LEDGER: {} }),
    false,
  );
});

test("uses only a valid CF-Connecting-IP, rejecting spoofable alternatives", () => {
  const request = (headers) => ({ headers: new Headers(headers) });
  assert.equal(
    getEnquiryClientIp(request({ "cf-connecting-ip": "203.0.113.1" })),
    "203.0.113.1",
  );
  assert.equal(
    getEnquiryClientIp(request({ "cf-connecting-ip": "2001:0DB8:0:0::1" })),
    "2001:db8::1",
  );
  for (const headers of [
    {},
    { "x-forwarded-for": "203.0.113.1" },
    { "x-vercel-forwarded-for": "203.0.113.1" },
    { "cf-connecting-ip": "203.0.113.1, 203.0.113.2" },
    { "cf-connecting-ip": "999.0.113.1" },
    { "cf-connecting-ip": "unknown" },
    { "cf-connecting-ip": "::1]/evil" },
  ]) {
    assert.equal(getEnquiryClientIp(request(headers)), undefined);
  }
});

test("hashes the client key with HMAC-SHA-256 and rejects weak salts", async () => {
  assert.equal(await hashClientKey("203.0.113.1", salt), hashed("203.0.113.1"));
  await assert.rejects(hashClientKey("203.0.113.1", "short"), /not configured/);
  await assert.rejects(hashClientKey("", salt), /not configured/);
});

test("stores hashes and timestamps, never the client address", async () => {
  const store = ledger();
  const key = await hashClientKey("203.0.113.1", salt);
  assert.deepEqual(reserve(store.sql, key, start), { allowed: true });
  assert.deepEqual(store.rows(), [
    { client: hashed("203.0.113.1"), at: start },
  ]);
  assert.ok(!JSON.stringify(store.rows()).includes("203.0.113.1"));
  assert.throws(
    () => reserve(store.sql, "203.0.113.1", start),
    /Invalid enquiry client identifier/,
  );
});

test("allows five attempts per client per rolling hour, without extending rejection", () => {
  const store = ledger();
  const one = hashed("one-client");
  for (let index = 0; index < 5; index += 1) {
    assert.equal(reserve(store.sql, one, start).allowed, true);
  }
  assert.deepEqual(reserve(store.sql, one, start + 20_000), {
    allowed: false,
    retryAfter: 3580,
  });
  assert.equal(store.rows().length, 5);
  assert.equal(
    reserve(store.sql, hashed("another-client"), start).allowed,
    true,
  );
  assert.equal(reserve(store.sql, one, start + hour).allowed, true);
});

test("global 100 attempts use a rolling 24 hours across IPs and midnight", () => {
  const store = ledger();
  for (let index = 0; index < 100; index += 1) {
    assert.equal(
      reserve(store.sql, hashed(`client-${index}`), start).allowed,
      true,
    );
  }
  assert.deepEqual(
    reserve(store.sql, hashed("new-client"), start + 12 * hour),
    {
      allowed: false,
      retryAfter: 12 * 60 * 60,
    },
  );
  assert.equal(store.rows().length, 100);
  assert.equal(
    reserve(store.sql, hashed("new-client"), start + day).allowed,
    true,
  );
  assert.equal(store.rows().length, 1);
});

test("a burst cannot overshoot the global or per-client last slot", async () => {
  const globalStore = ledger();
  for (let index = 0; index < 99; index += 1) {
    reserve(globalStore.sql, hashed(`existing-${index}`), start);
  }
  // Each reserve() is one synchronous transaction, so even when started
  // together they run one after another, as inside the Durable Object.
  const results = await Promise.all(
    Array.from({ length: 20 }, (_, index) =>
      Promise.resolve().then(() =>
        reserve(globalStore.sql, hashed(`new-${index}`), start),
      ),
    ),
  );
  assert.equal(results.filter((result) => result.allowed).length, 1);
  assert.equal(globalStore.rows().length, 100);

  const clientStore = ledger();
  for (let index = 0; index < 4; index += 1) {
    reserve(clientStore.sql, hashed("same-client"), start);
  }
  const clientResults = await Promise.all(
    Array.from({ length: 20 }, () =>
      Promise.resolve().then(() =>
        reserve(clientStore.sql, hashed("same-client"), start),
      ),
    ),
  );
  assert.equal(clientResults.filter((result) => result.allowed).length, 1);
  assert.equal(clientStore.rows().length, 5);
});

test("rejects an invalid clock rather than writing a bad timestamp", () => {
  const store = ledger();
  for (const now of [-1, 1.5, Number.NaN]) {
    assert.throws(
      () => reserve(store.sql, hashed("client"), now),
      /Invalid enquiry rate limit clock/,
    );
  }
  assert.equal(store.rows().length, 0);
});

test("a failed send keeps its reservation (the caller never releases one)", () => {
  const store = ledger();
  reserve(store.sql, hashed("client"), start);
  // No release API exists; a later attempt counts the earlier reservation.
  reserve(store.sql, hashed("client"), start + 1);
  assert.equal(store.rows().length, 2);
});

test("IPv6 clients are keyed by their /64, IPv4 by the address", async () => {
  const { rateLimitClientKey } = await import("../worker/rate-limit.ts");
  assert.equal(rateLimitClientKey("203.0.113.1"), "203.0.113.1");
  assert.equal(
    rateLimitClientKey("2001:db8:1:2:aaaa:bbbb:cccc:dddd"),
    "2001:db8:1:2::/64",
  );
  assert.equal(rateLimitClientKey("2001:db8:1:2::1"), "2001:db8:1:2::/64");
  assert.equal(rateLimitClientKey("2001:db8:1:2::ffff"), "2001:db8:1:2::/64");
  assert.equal(rateLimitClientKey("2001:db8::1"), "2001:db8:0:0::/64");
  assert.equal(rateLimitClientKey("::1"), "0:0:0:0::/64");
  assert.notEqual(
    rateLimitClientKey("2001:db8:1:3::1"),
    rateLimitClientKey("2001:db8:1:2::1"),
  );
});
