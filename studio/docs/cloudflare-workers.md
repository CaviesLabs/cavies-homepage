# Hosting on Cloudflare Workers (Free plan)

cavies.studio is a static export of the Next.js app, served as Worker static assets, plus one Worker route, `/api/enquiry`. Written 14 November 2026 for the move off Vercel (the `cavies` team is on Hobby, which is non-commercial only).

## How it fits together

- `npm run build` (also `build:cf`) resizes every raster in `public/` to WebP at the widths in `next.config.ts` (`scripts/prepare-images.mjs`, output in git-ignored `public/_img/`), then runs `next build`, which writes the static site to `out/`. `lib/image-loader.ts` points `next/image` at those files.
- `wrangler.production.jsonc` deploys `out/` as assets and `worker/index.ts` as the Worker. `assets.run_worker_first` is `["/api/*"]`, so pages never run Worker code. `html_handling: auto-trailing-slash` serves `/contact` from `contact.html`; `not_found_handling: 404-page` serves `404.html` with a 404 status.
- `public/_headers` carries the four security headers (with HSTS) on every response and the cache rules. `public/_redirects` carries `/work/seispace` (301), `/games` (302) and 308s from trailing-slash page forms to the plain path.
- The enquiry endpoint is `worker/enquiry-delivery.ts` (the same checks and limits as before: exact origin, JSON only, 8 KiB body, honeypot, shared validation, strict Reply-To, Turnstile with hostname and action, Gmail send-only OAuth) and `worker/rate-limit.ts` plus `worker/ledger.ts`: 5 per client per rolling hour and 100 per rolling 24 hours, kept as HMAC identifiers and timestamps in one SQLite Durable Object (`EnquiryLedger`, instance `global`). Each reservation is one synchronous transaction, so concurrent requests cannot overshoot. The client address is `CF-Connecting-IP`; IPv6 clients are keyed by their /64.
- `redirect/` is a separate tiny Worker that sends `www.cavies.studio`, `cavies.xyz` and `www.cavies.xyz` to `https://cavies.studio` (308, path and query kept, HSTS header as on Vercel). Worker replies (the endpoint, 404, 405) carry the same security headers as pages, including `Strict-Transport-Security: max-age=63072000`.
- Free plan limits that matter: 10 ms CPU per request (the enquiry path uses about 2 ms), 50 subrequests (the endpoint makes up to 3), 100,000 Worker requests a day (static assets are free and unlimited), 20,000 assets per Worker (about 1,800 used).

## Build and deploy

```sh
cd studio
npm ci
npm run lint && npm run typecheck && npm run test:enquiry && npm run test:scope && npm run test:workerd
npm run build                     # same as build:cf: resized images, static export in out/, prefetch-file copies
npm run deploy:cf                 # TEST Worker `cavies-studio-test` on its own workers.dev address (noindex build, form off)
npm run deploy:cf:production      # production Worker `cavies-studio` (zone route cavies.studio/*); indexable build
npm run deploy:cf:redirect        # redirect Worker for www.cavies.studio, cavies.xyz, www.cavies.xyz
```

There are two Workers, so a test deploy can never overwrite the live site. `cavies-studio` is production: it holds the enquiry secrets and the ledger. `cavies-studio-test` has its own name, address (`https://cavies-studio-test.dev-226.workers.dev`) and ledger, and no Gmail secrets. The deploy scripts build first. The production deploy uses `wrangler.production.jsonc` (zone route, `workers_dev` off), refuses a noindex build, and never passes a test origin. wrangler is a pinned devDependency (the global one may be too old for the compatibility date). `npm run test:workerd` runs the real delivery code and Durable Object ledger inside workerd (`wrangler dev`) against a local stub provider, so Node and Workers runtime differences are caught. For example, Workers rejects `redirect: "error"` on `fetch`, so a provider redirect is handled as a 3xx failure instead.

`npm run build` is the whole pipeline (not just `next build`), so a Vercel build of this repository, which the retired Vercel project still runs when `main` changes, produces a working static composer-only site rather than one with missing images.

The direct enquiry form is **off by default** in the build. A static page cannot ask the Worker whether delivery works, so it is switched on only with `ENQUIRY_FORM_ENABLED=true`, and the production deploy refuses that unless `ENQUIRY_DELIVERY_VERIFIED=yes` is also set, which is justified only by a real enquiry delivered and seen in the inbox (done on 14 November 2026, below). `NEXT_PUBLIC_TURNSTILE_SITE_KEY` defaults to the public widget key.

## Worker secrets

Set on the production Worker `cavies-studio` with `wrangler secret put NAME` (pipe or paste; never commit; check with `npx wrangler secret list -c wrangler.production.jsonc`): `ENQUIRY_DELIVERY_ENABLED` (exactly `true` enables delivery), `TURNSTILE_SECRET_KEY` (readable with `cf turnstile widgets get` in the Dev account), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `RATE_LIMIT_SALT` (32 or more random characters). The Gmail setup is unchanged: see `enquiry-delivery.md`. Production accepts only `https://cavies.studio`. A test deploy with the form on (the delivery gate) additionally allows exactly `https://cavies-studio-test.dev-226.workers.dev` through `ENQUIRY_EXTRA_ORIGIN` (no other value is honoured) and needs its own copy of the secrets and a Turnstile widget hostname.

## Gmail sign-in and the delivery gate (14 November 2026)

The site sends through the Google Cloud project `cavies-studio-enquiries`, OAuth client "Cavies website enquiry sender" (a Web application), as the mailbox that signs in as tin@cavies.xyz (the same account as tin@cavies.studio), mail from contact@cavies.studio to tin@cavies.studio, scope `gmail.send` plus the identity scopes the code accepts. The client's registered redirect URI is `http://127.0.0.1:8787/oauth/callback`. The Vercel site's original client secret and refresh token were not touched or revoked.

A new client secret was added to the same client in the studio browser (Google shows a secret only at creation and allows two per client, so a first attempt that did not wait for the value was wasted and Meow deleted that unused secret). The consent flow was run for the same mailbox and scopes with offline access, and the new secret and refresh token were piped straight into `wrangler secret put` from one process, with nothing written to a file, a log or a screenshot.

The delivery gate passed on 14 November 2026: on a form-on build of the test Worker, Meow passed the spam check and pressed Send on `/contact`; the endpoint answered 200 (which the code returns only after Gmail returns a message id) and the message arrived in his inbox. The workers.dev hostname was then removed from the Turnstile widget (domains `cavies.studio` and `cavies.xyz` only) and the test Worker was redeployed with the form off.

## Cutover and rollback

State before the cutover: `cavies.studio`, `www.cavies.studio`, `cavies.xyz` and `www.cavies.xyz` are DNS-only CNAMEs to Vercel. A Worker Custom Domain cannot be created on a hostname that has a CNAME (Cloudflare's Custom Domains documentation), and deleting the record first would leave the name unresolvable. So the Worker is attached with **zone routes**, which only fire on proxied records, and the cutover is switching each existing record to proxied in place, which has no DNS gap.

Pre-flight (read-only, 14 November 2026): both zones are in the "Dev@cavies.xyz" account; the only existing routes are `evantis-demo.cavies.studio/*` and `playables.cavies.xyz/*`, so nothing overlaps `cavies.studio/*` or the three redirect hosts; Universal SSL is active on both zones and covers the apex and `*.` names (so `www` too); Always Use HTTPS is on for both zones; SSL mode is `full` (cavies.studio) and `strict` (cavies.xyz), which works with the Vercel origin as a fallback; Pseudo IPv4 is off on both zones (if it were set to overwrite headers, `CF-Connecting-IP` would carry a fake IPv4 for IPv6 visitors and the per-client limit would key on it, so keep it off).

Steps:
1. `npm run deploy:cf:production` with `ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes`, and `npm run deploy:cf:redirect`. The routes are inert while the records are DNS-only, so traffic is unchanged.
2. Switch `cavies.studio` to proxied (`cf dns records edit <id> --proxied true`). Smoke-check https and http, headers, redirects, 404, sitemap, robots, the trailer, the contact page.
3. Switch `www.cavies.studio`, `cavies.xyz` and `www.cavies.xyz` to proxied. Check that the redirects keep path and query and send HSTS, and that mail records and the other subdomains still answer as before.
4. Merge the pull request after the Workers are serving. Merging to `main` triggers a Vercel production build of the retired project (the live DNS no longer points there once step 2 is done). It runs `npm run build`, which is the full pipeline, so if it succeeds it publishes a static composer-only site (form off, no `/api/enquiry`, `vercel.json` headers and redirects) as the fallback, and if it fails Vercel keeps the previous deployment. Either way nothing serves cavies.studio from Vercel while the records are proxied.
5. Meow retires Vercel a few days later: delete the Vercel project `cavies/cavies-studio` and its Blob store (the old rate-limit ledger), and then replace each CNAME with a proxied placeholder `AAAA 100::` (the pattern the other Worker-only hostnames use). Agents do not delete the project, its domains or its Blob store.

Rollback, one step per hostname: set the record back to DNS-only (`--proxied false`). Traffic returns to Vercel as soon as resolvers drop the proxied answer (a few minutes). The routes can stay, because they do nothing on a DNS-only record. Two caveats. While a hostname is proxied, Vercel cannot renew its certificate for that name, so the window for rolling back safely is the time left on the existing Vercel certificates (weeks, but not forever); do not leave the Vercel domains proxied-and-forgotten and expect them to work. And once Vercel is retired (project deleted) there is nothing to roll back to; the only way back would be rebuilding it.

## Privacy policy

Version 2 (effective 14 November 2026, the cutover day) is in `lib/studio-privacy.ts` and `docs/legal/privacy-policy-2026-11-14.md`: Cloudflare replaces Vercel as host and keeper of the form-limit codes, the server code runs on Cloudflare Workers, the codes are deleted the next time an enquiry passes the spam check, and the enquiry path names Gmail. Meow approved the update on 14 November 2026 to proceed; the wording was not individually reviewed by him. If the cutover happens on another day, correct the effective date in both files. The 10 November copy stays as published.
