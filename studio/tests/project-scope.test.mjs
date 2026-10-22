import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Match Next's extensionless TypeScript import resolution without changing the
// production module or compiling a separate, potentially different test copy.
const hooks = registerHooks({
  resolve(specifier, context, next) {
    if (
      (specifier === "./contact" || specifier === "./enquiry") &&
      context.parentURL?.endsWith("/lib/project-scope.ts")
    ) {
      return next(`${specifier}.ts`, context);
    }
    return next(specifier, context);
  },
});
const { enquiryServices } = await import("../lib/enquiry.ts");
const {
  defaultScope,
  isCompleteScope,
  parseScope,
  scopeContactHref,
  scopeHelpOptions,
  scopeSentence,
  scopeService,
  scopeStageOptions,
  scopeTimingOptions,
} = await import("../lib/project-scope.ts");
hooks.deregister();

test("every help option maps to an allowed enquiry service", () => {
  for (const option of scopeHelpOptions) {
    assert.ok(enquiryServices.includes(scopeService(option.id)), option.id);
  }
});

test("every combination composes one short readable sentence", () => {
  for (const help of scopeHelpOptions) {
    for (const stage of scopeStageOptions) {
      for (const timing of scopeTimingOptions) {
        const sentence = scopeSentence({
          help: help.id,
          stage: stage.id,
          timing: timing.id,
        });
        assert.match(sentence, /^We need [^.]+, [^.]+\.$/);
        assert.ok(sentence.length <= 90, sentence);
      }
    }
  }
});

test("contact links carry only the chosen decisions and parse back", () => {
  assert.equal(scopeContactHref({}), "/contact");
  assert.equal(scopeContactHref({ help: "product" }), "/contact?help=product");
  const href = scopeContactHref(defaultScope);
  const parsed = parseScope(new URL(href, "https://cavies.studio").search);
  assert.deepEqual(parsed, defaultScope);
  assert.ok(isCompleteScope(parsed));
});

test("unknown or partial query values are ignored safely", () => {
  assert.equal(parseScope(""), null);
  assert.equal(parseScope("?help=%3Cscript%3E&stage=1&timing="), null);
  assert.deepEqual(parseScope("?help=audit&timing=never"), { help: "audit" });
  assert.equal(isCompleteScope({ help: "audit" }), false);
  assert.equal(isCompleteScope(null), false);
});
