import assert from "node:assert/strict";
import test from "node:test";
import {
  copyEnquiryText,
  enquiryLimits,
  enquiryServices,
  maxMailtoLength,
  prepareEnquiry,
} from "../lib/enquiry.ts";

const recipient = "contact@cavies.xyz";
const valid = {
  name: "Example Visitor",
  email: "visitor@example.com",
  service: enquiryServices[0],
  website: "",
  brief: "We would like to improve our public product website.",
};

test("requires name, email, service and a useful brief", () => {
  const result = prepareEnquiry(
    { name: " ", email: "", service: "", website: "", brief: "" },
    recipient,
  );
  assert.equal(result.ok, false);
  assert.deepEqual(Object.keys(result.errors), [
    "name",
    "email",
    "service",
    "brief",
  ]);
});

test("prepares an encoded draft with no website when optional URL is empty", () => {
  const result = prepareEnquiry(valid, recipient);
  assert.equal(result.ok, true);
  const uri = new URL(result.draft.mailtoHref);
  assert.equal(uri.protocol, "mailto:");
  assert.equal(uri.pathname, recipient);
  assert.equal(
    uri.searchParams.get("subject"),
    `Project enquiry: ${valid.service}`,
  );
  assert.equal(uri.searchParams.get("body"), result.draft.body);
  assert.ok(!result.draft.body.includes("Website:"));
  assert.ok(result.draft.copyText.startsWith(`To: ${recipient}\nSubject:`));
});

test("trims boundary whitespace and preserves ordinary Unicode and brief line breaks", () => {
  const result = prepareEnquiry(
    {
      ...valid,
      name: "  René & Co  ",
      email: " visitor@example.com ",
      website: "https://example.com/path?a=1&b=2",
      brief: "A bilingual site for our café.\nKeep our existing brand.",
    },
    recipient,
  );
  assert.equal(result.ok, true);
  assert.match(result.draft.body, /Name: René & Co\n/);
  assert.match(
    result.draft.body,
    /Website: https:\/\/example.com\/path\?a=1&b=2/,
  );
  assert.equal(
    new URL(result.draft.mailtoHref).searchParams.get("body"),
    result.draft.body,
  );
});

test("enforces every field length bound even without HTML constraints", () => {
  for (const [field, limit] of Object.entries(enquiryLimits)) {
    const result = prepareEnquiry(
      { ...valid, [field]: "x".repeat(limit + 1) },
      recipient,
    );
    assert.equal(result.ok, false, field);
    assert.ok(result.errors[field], field);
  }
});

test("accepts brief lengths at the lower and upper bound without truncation", () => {
  for (const length of [20, enquiryLimits.brief]) {
    const result = prepareEnquiry(
      { ...valid, brief: "a".repeat(length) },
      recipient,
    );
    assert.equal(result.ok, true);
    assert.ok(result.draft.body.endsWith("a".repeat(length)));
  }
});

test("rejects unknown service, malformed email and email header injection", () => {
  for (const email of [
    "missing-at",
    "a@b",
    "a@@example.com",
    "a@example.com\r\nBcc: b@example.com",
    "a@example.com\u0000",
  ]) {
    const result = prepareEnquiry({ ...valid, email }, recipient);
    assert.equal(result.ok, false);
    assert.ok(result.errors.email);
  }
  const service = prepareEnquiry(
    { ...valid, service: "Other\nBcc:someone@example.com" },
    recipient,
  );
  assert.equal(service.ok, false);
  assert.ok(service.errors.service);
});

test("rejects executable, incomplete and credential-bearing website URLs", () => {
  for (const website of [
    "javascript:alert(1)",
    "data:text/html,hi",
    "example.com",
    "https://user:secret@example.com",
    "https://example.com/with space",
    "https://example.com/\npath",
  ]) {
    const result = prepareEnquiry({ ...valid, website }, recipient);
    assert.equal(result.ok, false, website);
    assert.ok(result.errors.website, website);
  }
});

test("rejects control characters while allowing ordinary multiline brief text", () => {
  for (const values of [
    { name: "Name\nInjected" },
    { brief: `${valid.brief}\u0000` },
  ]) {
    assert.equal(prepareEnquiry({ ...valid, ...values }, recipient).ok, false);
  }
});

test("long encoded Unicode drafts keep complete copy text and omit the mailto link", () => {
  const brief = "🙂".repeat(350);
  const result = prepareEnquiry({ ...valid, brief }, recipient);
  assert.equal(result.ok, true);
  assert.equal(result.draft.mailtoHref, null);
  assert.ok(result.draft.copyText.endsWith(brief));
  assert.ok(encodeURIComponent(result.draft.body).length > maxMailtoLength);
});

test("malformed Unicode cannot crash draft preparation or lose the copy fallback", () => {
  const brief = `${valid.brief}\uD800`;
  const result = prepareEnquiry({ ...valid, brief }, recipient);
  assert.equal(result.ok, true);
  assert.equal(result.draft.mailtoHref, null);
  assert.ok(result.draft.copyText.endsWith(brief));
});

test("user-controlled text is encoded as body content, never mailto query parameters", () => {
  const result = prepareEnquiry(
    {
      ...valid,
      brief:
        "Please build a site &bcc=attacker@example.com?subject=changed #with symbols",
    },
    recipient,
  );
  assert.equal(result.ok, true);
  const uri = new URL(result.draft.mailtoHref);
  assert.deepEqual([...uri.searchParams.keys()], ["subject", "body"]);
  assert.equal(uri.searchParams.get("body"), result.draft.body);
});

test("copy returns success only after writing the complete draft", async () => {
  let written;
  let finish;
  const pending = copyEnquiryText("Complete draft text", (text) => {
    written = text;
    return new Promise((resolve) => {
      finish = resolve;
    });
  });
  assert.equal(written, "Complete draft text");
  finish();
  assert.equal(await pending, "copied");
});

test("copy denial and missing Clipboard API both preserve the manual fallback", async () => {
  assert.equal(await copyEnquiryText("Draft text"), "manual");
  assert.equal(
    await copyEnquiryText("Draft text", async () => {
      throw new Error("Permission denied");
    }),
    "manual",
  );
});
