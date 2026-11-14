// Builds out/ for the Cloudflare Worker: resized images, then the static export.
// The direct enquiry form is OFF unless ENQUIRY_FORM_ENABLED=true is set: a static
// page cannot ask the Worker whether delivery works, so the form is switched on
// only after one real enquiry has been delivered (see docs/cloudflare-workers.md).
// NEXT_PUBLIC_TURNSTILE_SITE_KEY defaults to the site's public widget key (it is
// in every page that shows the form, so it is not a secret). SITE_NOINDEX=1 marks
// a workers.dev test build noindex.
import { spawnSync } from "node:child_process";

const env = {
  ENQUIRY_FORM_ENABLED: "false",
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
