// Builds, checks and deploys the Worker.
//   node scripts/deploy-cf.mjs test        workers.dev test deploy (wrangler.jsonc):
//                                          noindex build, the one test origin allowed.
//   node scripts/deploy-cf.mjs production  zone route (wrangler.production.jsonc):
//                                          indexable build, no test origin.
// Production refuses a noindex build, and refuses the direct form unless
// ENQUIRY_DELIVERY_VERIFIED=yes says a real enquiry was delivered and seen.
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const mode = process.argv[2];
if (!["test", "production"].includes(mode)) {
  console.error("Usage: deploy-cf.mjs test|production");
  process.exit(2);
}
const env = { ...process.env };
if (mode === "test") {
  env.SITE_NOINDEX = "1";
} else {
  if (env.SITE_NOINDEX) {
    console.error(
      "Refusing: SITE_NOINDEX is set; a production build must be indexable.",
    );
    process.exit(1);
  }
  if (
    env.ENQUIRY_FORM_ENABLED === "true" &&
    env.ENQUIRY_DELIVERY_VERIFIED !== "yes"
  ) {
    console.error(
      "Refusing: ENQUIRY_FORM_ENABLED=true needs ENQUIRY_DELIVERY_VERIFIED=yes, set only after one real enquiry was delivered to the inbox.",
    );
    process.exit(1);
  }
}
const run = (args) => {
  const result = spawnSync(process.execPath, args, { stdio: "inherit", env });
  if (result.status !== 0) process.exit(result.status ?? 1);
};
run(["scripts/build-cf.mjs"]);

const home = await readFile("out/index.html", "utf8");
const noindex = /<meta name="robots" content="[^"]*noindex/.test(home);
if (mode === "production" && noindex) {
  console.error("Refusing: out/index.html is a noindex build.");
  process.exit(1);
}
if (mode === "test" && !noindex) {
  console.error("Refusing: a test deploy must be a noindex build.");
  process.exit(1);
}
run(
  mode === "test"
    ? [
        "node_modules/wrangler/bin/wrangler.js",
        "deploy",
        "--var",
        "ENQUIRY_EXTRA_ORIGIN:https://cavies-studio.dev-226.workers.dev",
      ]
    : [
        "node_modules/wrangler/bin/wrangler.js",
        "deploy",
        "-c",
        "wrangler.production.jsonc",
      ],
);
