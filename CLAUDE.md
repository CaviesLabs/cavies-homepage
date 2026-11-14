# Cavies Studio website: notes for Claude

The studio rules are loaded globally from `~/.claude/CLAUDE.md` (source: `studio-os/STUDIO.md`). This file holds only what is specific to this repo. If the two disagree, say so in your report.

## What this is
The cavies.studio website: the studio's portfolio, services, enquiry form and the public pages for its games (Oddly Orderly: game page, press kit, privacy policy, support). Type: web, Next.js App Router. Platform: Cloudflare Workers Free plan (Worker `cavies-studio`, static export plus the enquiry Worker; moved off Vercel in November 2026, see `studio/docs/cloudflare-workers.md`). Domain: `https://cavies.studio`. The app lives in `studio/`; the repo root holds only this file, the README and `docs/`.

## Source-of-truth docs
Read before working. If your work deviates from them, say so in your report.
- `studio/README.md`: layout, content ownership, deployment, validation. Start here. The root `README.md` is a short pointer to it.
- `studio/AGENTS.md`: the Next.js agent rules, imported below. `studio/CLAUDE.md` already imports it.
- `studio/docs/`: `portfolio-sources.md` (where every portfolio capture and game asset came from), `enquiry-delivery.md`, `seo.md`, `hero-motion.md`, `portfolio-motion.md`.
- `docs/HANDOFF.md`: dated log of what shipped and what is open. Newest first.
- `docs/PROVENANCE.md`: generated and third-party assets. The record of sources is `studio/docs/portfolio-sources.md`.
- There is no `docs/PLAN.md` or `docs/SPEC.md`; `studio/README.md` plays that part.

@studio/AGENTS.md

## Repo rules
Copied word for word from `studio/README.md` (the full text stays there). Do not shorten or soften them. File paths inside them are relative to `studio/`.

Project and advisory work are attributed separately. No funding totals, impact metrics, or endorsements are implied. Pre-launch captures and sample states are identified on project pages.

- Portfolio screenshots preserve the entire captured view and original aspect ratio. Avoid cover cropping, overlapping panels, fixed-height clipping, or image tilt/zoom that hides UI. Case studies and the showcase provide links to full-resolution images.

The site runs on the Cloudflare Workers Free plan: a static export served as Worker static assets, with the enquiry endpoint as Worker code at `/api/enquiry`. `docs/cloudflare-workers.md` has the layout, the build and deploy commands, the Worker secrets, and the cutover and rollback notes. The Worker is `cavies-studio` in the Cloudflare account "Dev@cavies.xyz"; `wrangler.production.jsonc` is its configuration (`wrangler.jsonc` is the separate test Worker `cavies-studio-test`). Deploy from `studio/` with `npm run deploy:cf` (workers.dev test) or `npm run deploy:cf:production` (zone route), after the verify gate; both build first. The direct enquiry form is off in the build until `ENQUIRY_FORM_ENABLED=true`, which production refuses without `ENQUIRY_DELIVERY_VERIFIED=yes`. GitHub Actions is disabled for this repository, and no Actions workflows are maintained. The Vercel project `cavies/cavies-studio` is retired (the Vercel team is on the Hobby plan, which is non-commercial only).

The production domain and canonical URL are `https://cavies.studio` (moved from `cavies.xyz` on 22 October 2026). The `www` hostname and the former `cavies.xyz` and `www.cavies.xyz` hostnames redirect permanently to the canonical domain, preserving paths and queries, through the small Worker in `redirect/`. Game subdomains of cavies.xyz are separate deployments and are unaffected. Test builds on a workers.dev address are built with `SITE_NOINDEX=1` and marked noindex. DNS is managed in Cloudflare. Preserve existing mail and unrelated DNS records when changing web traffic routing.

The site works without delivery credentials: it shows an email-draft composer, and the sending endpoint fails closed. Direct email and Telegram remain available without JavaScript. Enquiry text is sent through Gmail and is not stored in a site database or application logs. The private rate-limit ledger (a Durable Object) stores HMAC identifiers and timestamps only. No marketing analytics are added.

Gmail delivery setup, operating limits, validation, and rollback are documented in `docs/enquiry-delivery.md`. Never expose credentials through public environment variables or commit Google client downloads. Verify actual inbox arrival before enabling production delivery; a Gmail API acknowledgement confirms acceptance, not inbox placement.

## Commands
Run from `studio/`. There is no lefthook, no pnpm workspace and no GitHub Actions; the checks run locally.
- `npm ci`: install dependencies.
- `npm run dev`: run the site locally (Node.js 22.18 or later).
- Verify gate, run before every push and before merging: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:enquiry`, `npm run test:scope`, `npm run test:workerd` (the commands `studio/README.md` lists under Validation). For routes and metadata, build with `npm run build:cf`, run `npx wrangler dev --port 3100` and `npm run test:smoke`.
- Deploys: `npm run deploy:cf:production` from `studio/` (wrangler, signed in as the Cloudflare account "Dev@cavies.xyz"). Merging to `main` no longer deploys. Follow the studio shipping rules: verify gate and a smoke check first, batch deploys, smoke-check `https://cavies.studio` after, log it in `docs/HANDOFF.md`.

## How to finish a task
1. Run the verify gate and fix what it finds.
2. Add an entry at the top of `docs/HANDOFF.md`: what shipped, decisions, open items, how to verify, links.
3. Work on a branch and open a PR with `gh`. Merge under the studio shipping rules and the repo rules above.
