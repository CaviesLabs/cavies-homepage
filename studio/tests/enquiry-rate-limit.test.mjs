import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { BlobError, BlobPreconditionFailedError } from "@vercel/blob";
import {
  enquiryRateLimitConfigured,
  getEnquiryClientIp,
  reserveEnquiryAttempt,
} from "../lib/enquiry-rate-limit.ts";

const salt = "a-secret-rate-limit-test-salt-of-at-least-32-characters";
const hour = 60 * 60 * 1000;
const day = 24 * hour;
const start = Date.UTC(2026, 9, 4, 12);
const hashed = (key) => createHmac("sha256", salt).update(key).digest("hex");

// Models one shared object with atomic creates and ETag compare-and-swap writes.
function memoryBlob(initial = null) {
  let text = initial === null ? null : JSON.stringify(initial);
  let version = text === null ? 0 : 1;
  const calls = { reads: [], writes: [] };
  const blob = {
    async get(path, options) {
      calls.reads.push({ path, options });
      if (text === null) return null;
      return {
        statusCode: 200,
        stream: new Response(text).body,
        blob: { etag: `etag-${version}` },
      };
    },
    async put(path, body, options) {
      calls.writes.push({ path, body, options });
      if (options.allowOverwrite === false && text !== null) {
        throw new BlobError("This blob already exists.");
      }
      if (options.ifMatch && options.ifMatch !== `etag-${version}`) {
        throw new BlobPreconditionFailedError();
      }
      text = body;
      version += 1;
      return { etag: `etag-${version}` };
    },
  };
  return {
    blob,
    calls,
    state: () => (text === null ? null : JSON.parse(text)),
    raw: () => text,
  };
}

function settings(store, now = start) {
  return { blob: store.blob, salt, now: () => now, retryDelay: async () => {} };
}

test("requires a strong salt and a Blob credential without exposing either", () => {
  assert.equal(enquiryRateLimitConfigured({}), false);
  assert.equal(
    enquiryRateLimitConfigured({
      RATE_LIMIT_SALT: salt,
      BLOB_READ_WRITE_TOKEN: "token",
    }),
    true,
  );
  assert.equal(
    enquiryRateLimitConfigured({
      RATE_LIMIT_SALT: salt,
      BLOB_STORE_ID: "store_example",
      VERCEL_OIDC_TOKEN: "token",
    }),
    true,
  );
  assert.equal(
    enquiryRateLimitConfigured({
      RATE_LIMIT_SALT: "short",
      BLOB_READ_WRITE_TOKEN: "token",
    }),
    false,
  );
});

test("uses only a valid Vercel supplied IP on Vercel, rejecting spoofable alternatives", () => {
  const request = (headers) => ({ headers: new Headers(headers) });
  assert.equal(
    getEnquiryClientIp(
      request({ "x-vercel-forwarded-for": "203.0.113.1" }),
      true,
    ),
    "203.0.113.1",
  );
  assert.equal(
    getEnquiryClientIp(
      request({ "x-vercel-forwarded-for": "2001:0DB8:0:0::1" }),
      true,
    ),
    "2001:db8::1",
  );
  for (const headers of [
    { "x-forwarded-for": "203.0.113.1" },
    { "cf-connecting-ip": "203.0.113.1" },
    { "x-vercel-forwarded-for": "203.0.113.1, 203.0.113.2" },
    { "x-vercel-forwarded-for": "unknown" },
  ]) {
    assert.equal(getEnquiryClientIp(request(headers), true), undefined);
  }
  assert.equal(
    getEnquiryClientIp(
      request({ "x-vercel-forwarded-for": "203.0.113.1" }),
      false,
    ),
    undefined,
  );
});

test("creates one private uncached ledger and stores hashes, never the client address", async () => {
  const store = memoryBlob();
  assert.deepEqual(
    await reserveEnquiryAttempt("203.0.113.1", settings(store)),
    { allowed: true },
  );
  assert.deepEqual(store.state(), {
    version: 1,
    entries: [{ key: hashed("203.0.113.1"), at: start }],
  });
  assert.ok(!store.raw().includes("203.0.113.1"));
  assert.equal(store.calls.reads[0].options.useCache, false);
  assert.equal(store.calls.reads[0].options.access, "private");
  assert.equal(store.calls.writes[0].options.access, "private");
  assert.equal(store.calls.writes[0].options.allowOverwrite, false);
  assert.equal(store.calls.writes[0].options.addRandomSuffix, false);
  await reserveEnquiryAttempt("203.0.113.2", settings(store));
  assert.equal(store.calls.writes[1].options.ifMatch, "etag-1");
});

test("allows five attempts per client per rolling hour, without extending rejection", async () => {
  const store = memoryBlob();
  for (let index = 0; index < 5; index += 1) {
    assert.equal(
      (await reserveEnquiryAttempt("one-client", settings(store))).allowed,
      true,
    );
  }
  const blocked = await reserveEnquiryAttempt(
    "one-client",
    settings(store, start + 20_000),
  );
  assert.deepEqual(blocked, { allowed: false, retryAfter: 3580 });
  assert.equal(store.state().entries.length, 5);
  assert.equal(store.calls.writes.length, 5);
  assert.equal(
    (await reserveEnquiryAttempt("another-client", settings(store))).allowed,
    true,
  );
  assert.equal(
    (await reserveEnquiryAttempt("one-client", settings(store, start + hour)))
      .allowed,
    true,
  );
});

test("global 100 attempts use a rolling 24 hours across IPs and midnight", async () => {
  const store = memoryBlob();
  for (let index = 0; index < 100; index += 1) {
    assert.equal(
      (await reserveEnquiryAttempt(`client-${index}`, settings(store))).allowed,
      true,
    );
  }
  assert.deepEqual(
    await reserveEnquiryAttempt(
      "new-client",
      settings(store, start + 12 * hour),
    ),
    { allowed: false, retryAfter: 12 * 60 * 60 },
  );
  assert.equal(store.state().entries.length, 100);
  assert.equal(
    (await reserveEnquiryAttempt("new-client", settings(store, start + day)))
      .allowed,
    true,
  );
  assert.equal(store.state().entries.length, 1);
});

test("concurrent creates preserve both accepted reservations", async () => {
  const store = memoryBlob();
  const results = await Promise.all([
    reserveEnquiryAttempt("first", settings(store)),
    reserveEnquiryAttempt("second", settings(store)),
  ]);
  assert.ok(results.every((result) => result.allowed));
  assert.equal(store.state().entries.length, 2);
  assert.equal(
    new Set(store.state().entries.map((entry) => entry.key)).size,
    2,
  );
});

test("concurrent requests cannot overshoot the global last slot", async () => {
  const store = memoryBlob({
    version: 1,
    entries: Array.from({ length: 99 }, (_, index) => ({
      key: hashed(`existing-${index}`),
      at: start,
    })),
  });
  const results = await Promise.all(
    Array.from({ length: 20 }, (_, index) =>
      reserveEnquiryAttempt(`new-${index}`, settings(store)),
    ),
  );
  assert.equal(results.filter((result) => result.allowed).length, 1);
  assert.equal(results.filter((result) => !result.allowed).length, 19);
  assert.equal(store.state().entries.length, 100);
});

test("concurrent requests cannot overshoot the per-client last slot", async () => {
  const store = memoryBlob({
    version: 1,
    entries: Array.from({ length: 4 }, () => ({
      key: hashed("same-client"),
      at: start,
    })),
  });
  const results = await Promise.all(
    Array.from({ length: 20 }, () =>
      reserveEnquiryAttempt("same-client", settings(store)),
    ),
  );
  assert.equal(results.filter((result) => result.allowed).length, 1);
  assert.equal(store.state().entries.length, 5);
});

test("fails closed on corrupt or oversized state rather than resetting the allowance", async () => {
  for (const value of [
    {},
    { version: 2, entries: [] },
    { version: 1, entries: [{ key: "raw-ip", at: start }] },
    { version: 1, entries: [{ key: hashed("client"), at: -1 }] },
    {
      version: 1,
      entries: Array.from({ length: 101 }, () => ({
        key: hashed("client"),
        at: start,
      })),
    },
  ]) {
    const store = memoryBlob(value);
    await assert.rejects(
      reserveEnquiryAttempt("client", settings(store)),
      /Invalid enquiry rate limit state/,
    );
    assert.equal(store.calls.writes.length, 0);
  }
});

test("does not retry storage outages and bounds compare-and-swap retries", async () => {
  const failing = memoryBlob();
  failing.blob.put = async () => {
    throw new Error("storage unavailable");
  };
  await assert.rejects(
    reserveEnquiryAttempt("client", settings(failing)),
    /storage unavailable/,
  );
  assert.equal(failing.calls.reads.length, 1);

  const conflict = memoryBlob();
  conflict.blob.put = async () => {
    throw new BlobPreconditionFailedError();
  };
  await assert.rejects(
    reserveEnquiryAttempt("client", settings(conflict)),
    /Unable to reserve enquiry allowance/,
  );
  assert.equal(conflict.calls.reads.length, 5);
});

test("retains a reservation after caller failure or an ambiguous successful write", async () => {
  const store = memoryBlob();
  const originalPut = store.blob.put;
  store.blob.put = async (...args) => {
    await originalPut(...args);
    throw new Error("connection lost after storage committed");
  };
  await assert.rejects(
    reserveEnquiryAttempt("client", settings(store)),
    /connection lost/,
  );
  assert.equal(store.state().entries.length, 1);
  store.blob.put = originalPut;
  await reserveEnquiryAttempt("client", settings(store));
  assert.equal(store.state().entries.length, 2);
});
