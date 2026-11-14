// Builds out/ for the Cloudflare Worker: resized images, then the static export.
// The enquiry form is switched on at build time with the site's public
// Turnstile key (it is in every production page, so it is not a secret).
// Override either with the environment; set ENQUIRY_FORM_ENABLED=false for a
// build with the email-draft composer only. SITE_NOINDEX=1 marks a test build.
import { spawnSync } from "node:child_process";

const env = {
  ENQUIRY_FORM_ENABLED: "true",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "0x4AAAAAAFM-53cFpNHTdaOn",
  ...process.env,
};
for (const [command, args] of [
  [process.execPath, ["scripts/prepare-images.mjs"]],
  [process.execPath, ["node_modules/next/dist/bin/next", "build"]],
  [process.execPath, ["scripts/flatten-segments.mjs"]],
]) {
  const result = spawnSync(command, args, { stdio: "inherit", env });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
