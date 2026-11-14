# Cavies Studio

The Cavies product design and frontend engineering website. This app lives in `studio/`; the original Cavies Labs website remains at the repository root as a legacy reference.

## Development

Requires Node.js 22.18 or later (the enquiry tests use Node’s built-in TypeScript stripping).

```sh
cd studio
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm run test:enquiry
npm run test:scope
npm run test:workerd
```

For production HTTP/SEO smoke checks, run `npm run build:cf`, then `npx wrangler dev --port 3100` in one terminal and `npm run test:smoke` in another (or point `SITE_TEST_URL` at a deployed workers.dev address). Set `SITE_TEST_URL` if the server uses another port. These checks cover public routes, metadata, sitemap, robots, redirects and real 404s; they do not replace mobile/desktop browser and keyboard QA.

## Content

- `lib/projects.ts` and `lib/additional-projects.ts` own the portfolio descriptions, screenshots, galleries, collaboration credits, and ordering. Counts and case-study navigation are derived from those collections.
- A project's optional `liveLink` adds a link to its public deployment on the case study and in the showcase. Emberline links to its calculator site at emberline.cavies.studio, Reai to reai.sg, Tender to tender-by-hyperflow.dev-226.workers.dev, and the pre-launch Amoeba and vPawHook to amoeba.family and vpawhook.com; Seitrace links to its archived demo at seitrace.com, which runs the original interface on labeled sample data. Projects that shut down or whose deployments were removed (Paperdash, Skew, DexPaid, Loosecoins) and Tyche, whose only address is a preview build, have no link.
- `context` is kept with each project but not rendered on its case study, which shows `description`, `role`, `details` and `approach` (or `story`). Put anything a visitor must read, such as a pre-launch or shut-down status, in `approach` or `description`.
- `app/page.tsx` owns the homepage and concise FAQ. Its order is hero, service paths, the four featured interfaces, the advisory strip, Selected work (cards 05–08 and the index from 09, continuing the featured numbering), Monthly plans with the scope builder, Games, and FAQ.
- `app/work/page.tsx` is the full index: featured interfaces, selected work, the wider portfolio, games in development, and past collaborations, each card opening its case study. The Work navigation item, case-study back links, and the 404 page point here.
- In-page anchors scroll smoothly (`data-scroll-behavior="smooth"` on `<html>`), and reduced motion restores instant jumps.
- `app/services/business-websites/page.tsx` explains business website builds, improvements, and ongoing support, with Beigman Engineering as relevant project context.
- `app/contact/page.tsx` and `components/enquiry-form.tsx` provide Gmail enquiry delivery when fully configured, with an email-draft fallback when unavailable. `worker/` validates requests, verifies Turnstile, reserves a durable send allowance, and calls Gmail with send-only OAuth access.
- `app/globals.css` owns the responsive visual system.
- `components/project-showcase.tsx` displays the four curated projects from `showcaseProjects` as selectable, full-width screenshots: Emberline, Beigman Engineering, Reai, and Tender (the owner's order from 11 November 2026). Selected work continues with Amoeba, vPawHook, Tyche, and Seitrace; the index follows with Paperdash (shut down; its case study leads with the arcade), then Skew, HeavenDash, 0DTE, Chat, Chirp, Pit Finance, brrr, DexPaid, Loosecoins, and the rest in their earlier order. Schlong belongs only in the secondary portfolio list.
- Portfolio screenshots preserve the entire captured view and original aspect ratio. Avoid cover cropping, overlapping panels, fixed-height clipping, or image tilt/zoom that hides UI. Case studies and the showcase provide links to full-resolution images.
- `lib/project-galleries.ts` adds detail-page images to the existing project galleries. Prefer distinct product screens, complete workflow panels, and original artwork; keep sample, prototype, and current-site context labels.
- `lib/game-projects.ts` contains four unreleased game case studies. `components/game-showcase.tsx` provides keyboard-accessible game and screenshot selection. Its previews preserve full images, with no autoplay; the cases stay separate from the established product order. A case's optional `gamePage` links the game's own page from its case study and the showcase.
- `app/games/oddly-orderly/` holds Oddly Orderly's own pages, which the stores and the game link to: the game page, `press` (presskit()-style factsheet and downloads), `privacy` (the policy shipped with the game) and `support`. `lib/oddly-orderly.ts` owns their copy, media and facts, including `steamUrl`: set it to the Steam store page once that is public, and the Steam buttons appear. `lib/oddly-orderly-privacy.ts` holds the policy word for word; paste the game's new text there whenever it changes. `/games` redirects to the homepage's games section. Media is in `public/games/oddly-orderly/`; see `docs/portfolio-sources.md`.
- The product and game selectors use short user-triggered transitions and moving selection indicators, disabled for reduced motion. See `docs/portfolio-motion.md` for reference review and design choices.
- `components/pricing.tsx` owns the monthly plans: Websites, Product interfaces, and Security audit. Each is quoted to an agreed scope and delivery capacity; no fixed public rate or unverified case-study price is advertised.
- `components/scope-builder.tsx` (under the plans, `/#scope`) composes three visitor decisions into one sentence. `lib/project-scope.ts` owns the options, phrasing, service mapping, and the `/contact?help=…&stage=…&timing=…` link. Plan cards and primary calls to action pass `help` so the contact form preselects the service. See `docs/portfolio-motion.md`.
- `components/option-row.tsx` is the shared segmented radio group with a sliding indicator; `components/morph-text.tsx` settles changed text letter by letter and reads as plain text to assistive technology.
- On `/contact`, a complete scope from the URL shows as a stub, preselects the service, and prefills the first line of the brief until the visitor edits or clears the form. After a confirmed send, `components/enquiry-ticket.tsx` prints a summary of what was sent. Nothing about delivery changed.
- `components/reflective-mark.tsx` progressively enhances the hero with a reflective C. Its scene loads on demand, stops rendering when idle or offscreen, and uses a static fallback for reduced motion or unavailable WebGL. See `docs/hero-motion.md`.
- `public/work/` contains optimized, locally hosted original artwork and product captures. See `docs/portfolio-sources.md` for provenance.
- `lib/contact.ts` is the single source for the contact address and email links. `gameContactEmail` beside it is the games' support, privacy and press address.
- Contact: `tin@cavies.studio` and `https://t.me/tincavies`; for the games, `contact@cavies.studio`.

Project and advisory work are attributed separately. No funding totals, impact metrics, or endorsements are implied. Pre-launch captures and sample states are identified on project pages.

## Deployment

The site runs on the Cloudflare Workers Free plan: a static export served as Worker static assets, with the enquiry endpoint as Worker code at `/api/enquiry`. `docs/cloudflare-workers.md` has the layout, the build and deploy commands, the Worker secrets, and the cutover and rollback notes. The Worker is `cavies-studio` in the Cloudflare account "Dev@cavies.xyz"; `wrangler.production.jsonc` is its configuration (`wrangler.jsonc` is the separate test Worker `cavies-studio-test`). Deploy from `studio/` with `npm run deploy:cf` (workers.dev test) or `npm run deploy:cf:production` (zone route), after the verify gate; both build first. The direct enquiry form is off in the build until `ENQUIRY_FORM_ENABLED=true`, which production refuses without `ENQUIRY_DELIVERY_VERIFIED=yes`. GitHub Actions is disabled for this repository, and no Actions workflows are maintained. The Vercel project `cavies/cavies-studio` is retired (the Vercel team is on the Hobby plan, which is non-commercial only).

The production domain and canonical URL are `https://cavies.studio` (moved from `cavies.xyz` on 22 October 2026). The `www` hostname and the former `cavies.xyz` and `www.cavies.xyz` hostnames redirect permanently to the canonical domain, preserving paths and queries, through the small Worker in `redirect/`. Game subdomains of cavies.xyz are separate deployments and are unaffected. Test builds on a workers.dev address are built with `SITE_NOINDEX=1` and marked noindex. DNS is managed in Cloudflare. Preserve existing mail and unrelated DNS records when changing web traffic routing.

The site works without delivery credentials: it shows an email-draft composer, and the sending endpoint fails closed. Direct email and Telegram remain available without JavaScript. Enquiry text is sent through Gmail and is not stored in a site database or application logs. The private rate-limit ledger (a Durable Object) stores HMAC identifiers and timestamps only. No marketing analytics are added.

Gmail delivery setup, operating limits, validation, and rollback are documented in `docs/enquiry-delivery.md`. Never expose credentials through public environment variables or commit Google client downloads. Verify actual inbox arrival before enabling production delivery; a Gmail API acknowledgement confirms acceptance, not inbox placement.

## Search metadata

`lib/seo.ts` owns the canonical origin, company profile, homepage metadata, and shared social metadata. `lib/project-seo.ts` provides a distinct title and description for each case study. `lib/structured-data.ts` describes the company, website, portfolio, and case-study breadcrumbs; it preserves the distinction between product work and past advisory relationships. See `docs/seo.md` for indexing and maintenance notes.
