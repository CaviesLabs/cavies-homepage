# Hosting on Cloudflare Workers (Free plan)

cavies.studio is a static export of the Next.js app, served as Worker static assets, plus one Worker route, `/api/enquiry`. Written 14 November 2026 for the move off Vercel (the `cavies` team is on Hobby, which is non-commercial only).

## How it fits together

- `npm run build:cf` resizes every raster in `public/` to WebP at the widths in `next.config.ts` (`scripts/prepare-images.mjs`, output in git-ignored `public/_img/`), then runs `next build`, which writes the static site to `out/`. `lib/image-loader.ts` points `next/image` at those files.
- `wrangler.jsonc` deploys `out/` as assets and `worker/index.ts` as the Worker. `assets.run_worker_first` is `["/api/*"]`, so pages never run Worker code. `html_handling: auto-trailing-slash` serves `/contact` from `contact.html`; `not_found_handling: 404-page` serves `404.html` with a 404 status.
- `public/_headers` carries the three security headers on every response and the cache rules. `public/_redirects` carries `/work/seispace` (301) and `/games` (302).
- The enquiry endpoint is `worker/enquiry-delivery.ts` (the same checks and limits as before: exact origin, JSON only, 8 KiB body, honeypot, shared validation, strict Reply-To, Turnstile with hostname and action, Gmail send-only OAuth) and `worker/rate-limit.ts` plus `worker/ledger.ts`: 5 per client per rolling hour and 100 per rolling 24 hours, kept as HMAC identifiers and timestamps in one SQLite Durable Object (`EnquiryLedger`, instance `global`). Each reservation is one synchronous transaction, so concurrent requests cannot overshoot. The client address is `CF-Connecting-IP`.
- `redirect/` is a separate tiny Worker that sends `www.cavies.studio`, `cavies.xyz` and `www.cavies.xyz` to `https://cavies.studio` (308, path and query kept).
- Free plan limits that matter: 10 ms CPU per request (the enquiry path uses about 2 ms), 50 subrequests (the endpoint makes up to 3), 100,000 Worker requests a day (static assets are free and unlimited), 20,000 assets per Worker (about 1,800 used).

## Build and deploy

```sh
cd studio
npm ci
npm run lint && npm run typecheck && npm run test:enquiry && npm run test:scope
npm run build:cf            # add SITE_NOINDEX=1 for a workers.dev test build
npm run deploy:cf           # wrangler deploy
```

The build reads two variables, both defaulted in `scripts/build-cf.mjs`: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (the public widget key) and `ENQUIRY_FORM_ENABLED` (`true` shows the direct form; anything else builds the email-draft composer only). A static page cannot ask the Worker whether it is configured, so the Worker refuses every request until its own secrets are complete, and the form shows its unavailable message.

## Worker secrets

Set with `wrangler secret put NAME` (pipe or paste; never commit): `ENQUIRY_DELIVERY_ENABLED` (exactly `true` enables delivery), `TURNSTILE_SECRET_KEY`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `RATE_LIMIT_SALT` (32 or more random characters). The Gmail setup is unchanged: see `enquiry-delivery.md`. Production accepts only `https://cavies.studio`. For testing on a workers.dev address, pass `--var ENQUIRY_EXTRA_ORIGIN:https://<name>.<subdomain>.workers.dev` to that one `wrangler deploy` (only `https://*.workers.dev` is honoured; the next plain deploy removes it). The Turnstile widget must also allow that hostname.

## Cutover and rollback

The steps, the current DNS records and the rollback are in the pull request description; this repo's `docs/HANDOFF.md` records the cutover once done. Until the cutover cavies.studio is still served by Vercel.

## Privacy policy

`lib/studio-privacy.ts` names Vercel as the host and as keeper of the form-limit codes. After the cutover that is Cloudflare. Changing the published policy needs a new dated version and Meow's approval (see the header of that file), so it is not changed in the move pull request.
