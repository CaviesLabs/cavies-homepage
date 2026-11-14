# Hosting on Cloudflare Workers (Free plan)

cavies.studio is a static export of the Next.js app, served as Worker static assets, plus one Worker route, `/api/enquiry`. Written 14 November 2026 for the move off Vercel (the `cavies` team is on Hobby, which is non-commercial only).

## How it fits together

- `npm run build:cf` resizes every raster in `public/` to WebP at the widths in `next.config.ts` (`scripts/prepare-images.mjs`, output in git-ignored `public/_img/`), then runs `next build`, which writes the static site to `out/`. `lib/image-loader.ts` points `next/image` at those files.
- `wrangler.jsonc` deploys `out/` as assets and `worker/index.ts` as the Worker. `assets.run_worker_first` is `["/api/*"]`, so pages never run Worker code. `html_handling: auto-trailing-slash` serves `/contact` from `contact.html`; `not_found_handling: 404-page` serves `404.html` with a 404 status.
- `public/_headers` carries the three security headers on every response and the cache rules. `public/_redirects` carries `/work/seispace` (301) and `/games` (302).
- The enquiry endpoint is `worker/enquiry-delivery.ts` (the same checks and limits as before: exact origin, JSON only, 8 KiB body, honeypot, shared validation, strict Reply-To, Turnstile with hostname and action, Gmail send-only OAuth) and `worker/rate-limit.ts` plus `worker/ledger.ts`: 5 per client per rolling hour and 100 per rolling 24 hours, kept as HMAC identifiers and timestamps in one SQLite Durable Object (`EnquiryLedger`, instance `global`). Each reservation is one synchronous transaction, so concurrent requests cannot overshoot. The client address is `CF-Connecting-IP`; IPv6 clients are keyed by their /64.
- `redirect/` is a separate tiny Worker that sends `www.cavies.studio`, `cavies.xyz` and `www.cavies.xyz` to `https://cavies.studio` (308, path and query kept, HSTS header as on Vercel). Worker replies (the endpoint, 404, 405) carry the same security headers as pages, including `Strict-Transport-Security: max-age=63072000`.
- Free plan limits that matter: 10 ms CPU per request (the enquiry path uses about 2 ms), 50 subrequests (the endpoint makes up to 3), 100,000 Worker requests a day (static assets are free and unlimited), 20,000 assets per Worker (about 1,800 used).

## Build and deploy

```sh
cd studio
npm ci
npm run lint && npm run typecheck && npm run test:enquiry && npm run test:scope && npm run test:workerd
npm run deploy:cf                 # test deploy to https://cavies-studio.dev-226.workers.dev (noindex build)
npm run deploy:cf:production      # zone route for cavies.studio (indexable build); see the cutover
npm run deploy:cf:redirect        # redirect Worker for www.cavies.studio, cavies.xyz, www.cavies.xyz
```

Both deploy scripts build first (`npm run build:cf`: resized images, then the static export in `out/`). The test deploy uses `wrangler.jsonc` and passes the one test origin with `--var`. The production deploy uses `wrangler.production.jsonc` (zone route, `workers_dev` off), refuses a noindex build, and never passes a test origin. wrangler is a pinned devDependency (the global one may be too old for the compatibility date). `npm run test:workerd` runs the real delivery code and Durable Object ledger inside workerd (`wrangler dev`) against a local stub provider, so Node and Workers runtime differences are caught. For example, Workers rejects `redirect: "error"` on `fetch`, so a provider redirect is handled as a 3xx failure instead.

The direct enquiry form is **off by default** in the build. A static page cannot ask the Worker whether delivery works, so it is switched on only with `ENQUIRY_FORM_ENABLED=true`, and the production deploy refuses that unless `ENQUIRY_DELIVERY_VERIFIED=yes` is also set. That is done only after one real enquiry was delivered and seen in the inbox. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` defaults to the public widget key.

## Worker secrets

Set with `wrangler secret put NAME` (pipe or paste; never commit): `ENQUIRY_DELIVERY_ENABLED` (exactly `true` enables delivery), `TURNSTILE_SECRET_KEY` (readable with `cf turnstile widgets get` in the Dev account), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `RATE_LIMIT_SALT` (32 or more random characters). The Gmail setup is unchanged: see `enquiry-delivery.md`. Production accepts only `https://cavies.studio`. The test deploy additionally allows exactly `https://cavies-studio.dev-226.workers.dev` through `ENQUIRY_EXTRA_ORIGIN` (no other value is honoured); the production deploy does not set it. The Turnstile widget must allow a hostname before the form can work on it.

## Cutover and rollback (no DNS gap, one-step rollback)

Current state: `cavies.studio`, `www.cavies.studio`, `cavies.xyz` and `www.cavies.xyz` are DNS-only CNAMEs to Vercel. A Worker Custom Domain cannot be created on a hostname that has a CNAME (Cloudflare's Custom Domains documentation), and deleting the record first would leave the name unresolvable. So the Worker is attached with **zone routes**, which only fire on proxied records, and the cutover is switching each existing record to proxied in place. Universal SSL certificates are already active on both zones for the apex and `*.` hostnames (checked with `cf ssl certificate-packs list`), so no certificate has to be issued.

1. Gate: Worker secrets in place (including the three Google values), the Turnstile widget allowing the test hostname, then a test deploy with `ENQUIRY_FORM_ENABLED=true`. Send one real enquiry from the workers.dev contact page and see it arrive. Only then is `ENQUIRY_DELIVERY_VERIFIED=yes` allowed.
2. Merge the PR, then `npm run deploy:cf:production` and `npm run deploy:cf:redirect`. The routes are inert while the records are DNS-only, so traffic is unchanged.
3. Always Use HTTPS is on for both zones (done for `cavies.studio` on 14 November 2026 with `cf zones settings edit always_use_https --zone cavies.studio --body '{"value":"on"}'`; it was already on for `cavies.xyz`), so plain http to proxied hostnames redirects. It also applies to the other proxied hostnames on the cavies.studio zone (emberline, countercats, pawplate, evantis-demo).
4. Switch `cavies.studio` to proxied (`cf dns records edit <id> --proxied true`; ids are in the PR). Smoke-check https and http, headers, redirects, 404, sitemap, robots, the trailer and the contact page.
5. Switch `www.cavies.studio`, `cavies.xyz` and `www.cavies.xyz` to proxied. Check that the redirects keep path and query and send HSTS.
6. If the form is to go live, build production with `ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes`. Update the privacy text and the HANDOFF entry. Retire Vercel only after a few days.

Rollback, one step per hostname: set the record back to DNS-only (`--proxied false`). Traffic returns to Vercel as soon as resolvers drop the proxied answer (a few minutes). The routes can stay, because they do nothing on a DNS-only record. The Vercel project and its domains must stay in place until the Worker has run for a while. After Vercel is retired, replace each CNAME with a proxied placeholder `AAAA 100::` (the pattern the other Worker-only hostnames use).

## Gmail sign-in (state on 14 November 2026)

The site sends through the Google Cloud project `cavies-studio-enquiries`, OAuth client "Cavies website enquiry sender" (a Web application), as the mailbox that signs in as tin@cavies.xyz (the same account as tin@cavies.studio), mail from contact@cavies.studio to tin@cavies.studio, scope `gmail.send` plus the identity scopes the code accepts. The client's registered redirect URI is `http://127.0.0.1:8787/oauth/callback`. The live Vercel site keeps using the old client secret (ending `d7qV`) and the old refresh token; neither was touched or revoked.

Done on 14 November 2026, in the studio browser: a new client secret was added to the same client (Google allows two and shows a new one only at creation, so a first attempt that did not wait for it was wasted and Meow deleted that unused secret), the consent flow was run for the same mailbox and scopes with offline access, and the new secret and refresh token were piped straight into `wrangler secret put` from one process (nothing written to a file, a log or a screenshot). The Worker now has all enquiry secrets: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `TURNSTILE_SECRET_KEY`, `RATE_LIMIT_SALT`, `ENQUIRY_DELIVERY_ENABLED`.

**The delivery gate is not yet passed.** The one labelled test enquiry through the real form on workers.dev needs a person: the spam check did not complete without one, and the studio browser guard refuses the Send button for agents. To run it: add `cavies-studio.dev-226.workers.dev` to the Turnstile widget (`cf turnstile widgets update`, Dev account), deploy with `ENQUIRY_FORM_ENABLED=true node scripts/deploy-cf.mjs test`, open `https://cavies-studio.dev-226.workers.dev/contact`, fill the form (the text should say it is the cutover test), tick the spam check and press Send once, then see the mail arrive in the tin@cavies.studio inbox. Afterwards remove the hostname from the widget (domains back to `cavies.studio` and `cavies.xyz`) and run `npm run deploy:cf` again, which builds with the form off and without the test-origin var.

## Privacy policy

Version 2 (14 November 2026) is in `lib/studio-privacy.ts` and `docs/legal/privacy-policy-2026-11-14.md`: Cloudflare replaces Vercel as host and keeper of the form-limit codes, the server code runs on Cloudflare Workers, and the enquiry path names Gmail. It goes live with the cutover (the page is built from the branch), so its effective date must be corrected in both files if the cutover slips to another day. The 10 November copy stays as published.
