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
- A project's optional `liveLink` adds a link to its public deployment on the case study and in the showcase. Emberline links to its calculator site at emberline.cavies.studio, Reai to reai.sg, and the pre-launch Amoeba and vPawHook to amoeba.family and vpawhook.com; Seitrace links to its archived demo at seitrace.com, which runs the original interface on labeled sample data. Projects that shut down or whose deployments were removed (Paperdash, Skew, DexPaid, Loosecoins, and Tender, whose site was taken down on 24 November 2026) and Tyche, whose only address is a preview build, have no link.
- `context` is kept with each project but not rendered on its case study, which shows `description`, `role`, `details` and `approach` (or `story`). Put anything a visitor must read, such as a pre-launch or shut-down status, in `approach` or `description`.
- `app/page.tsx` owns the homepage and concise FAQ. Its order is hero, service paths, the four featured interfaces, the advisory strip, Selected work (cards 05–08 and the index from 09, continuing the featured numbering), Monthly plans with the scope builder, Games, and FAQ.
- `app/work/page.tsx` is the full index: featured interfaces, selected work, the wider portfolio, games in development, and past collaborations, each card opening its case study. The Work navigation item, case-study back links, and the 404 page point here.
- In-page anchors scroll smoothly (`data-scroll-behavior="smooth"` on `<html>`), and reduced motion restores instant jumps.
- `app/services/business-websites/page.tsx` explains business website builds, improvements, and ongoing support, with Beigman Engineering as relevant project context.
- `app/playable-ads/page.tsx` is the Playable ads page (`/playable-ads`): three demo ads in CSS phone frames (`components/playable-demos.tsx`), the five networks, how it works, and the enquiry form with the service set to Playable ads. `lib/playable-ads.ts` owns the demos, the networks list and the paths. No prices or performance claims go on it (the plan is `studio-os/growth/playable-ads/PLAN.md`). See "Playable ads demos" below.
- `app/contact/page.tsx` and `components/enquiry-form.tsx` provide direct enquiry delivery when fully configured, with an email-draft fallback when unavailable. `worker/` validates requests, verifies Turnstile, reserves a durable send allowance, and sends the notification through the Worker's Cloudflare Email Sending binding (`EMAIL`), which may only send from contact@cavies.studio to tin@cavies.studio.
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

## Playable ads demos

Each demo is one self-contained HTML file in `public/playable-ads/demos/<id>/index.html`, shown in a sandboxed iframe (`sandbox="allow-scripts"`, no `allow-same-origin`) that gets its `src` only when the visitor presses Tap to play. The ids are `rise-squeeze`, `lantern-burst` and `tide-jars`. The three files are the `generic` builds of the demo ads from the Playables repo (`rise-squeeze` and `lantern-burst`: dropped 24 November 2026, ad bytes built at Playables commit `308d6b90`, 731,749 and 1,615,793 bytes; `tide-jars`: dropped 25 November 2026 in place of Cavy Conga, game sources at Playables commit `b78d4561`, ad bytes built on the Playables PR #327 branch `ads/demo-swap`, 178,384 bytes, sha256 `bd304a50baa2b1a6a12194d33e6ebaed56725deb45674faefee35dd173011dee`; update this line at each drop). `drop-playable-demos.mjs` prints each size; compare with the `SHA256SUMS` beside the build. The frame `src` is the folder URL (`/playable-ads/demos/<id>/`), which serves that `index.html` without a redirect.

To drop in new builds, build the demo ads in the Playables repo (`node tools/build.ts --ad --network generic squishy-studio firefly-festival tide-jars`), then from `studio/` run `npm run demos:drop -- <path to that repo's dist-ad folder>`. It copies each game's `generic/index.html` (Rise & Squeeze is `squishy-studio`, Lantern Burst is `firefly-festival`, Tide Jars is `tide-jars`), refuses a missing, non-HTML or over-5 MB file, and replaces nothing if any of the three fails. Then check each on `/playable-ads` and commit the three files. The `generic` build posts `{ type: "cavies-ad-cta", url }` to its parent when its end button is pressed; the page accepts that message only from its own three frames, never opens the `url`, and scrolls to the quote form.

`public/_headers` detaches the site-wide `X-Frame-Options: DENY` for `/playable-ads/demos/*` and sets `SAMEORIGIN`, so the page can frame its own files. Nothing else on the site may be framed. The same block adds `X-Robots-Tag: noindex` and a Content-Security-Policy (`sandbox allow-scripts`, inline script and style only, `data:` and `blob:` pictures, fonts and media, no network); a demo that needs more than that fails in the page, so loosen the policy there only after checking why. The root `.gitattributes` marks the demo files `-text`, so line-ending conversion can never change their bytes.

## Deployment

The site runs on the Cloudflare Workers Free plan: a static export served as Worker static assets, with the enquiry endpoint as Worker code at `/api/enquiry`. `docs/cloudflare-workers.md` has the layout, the build and deploy commands, the Worker secrets, and the cutover and rollback notes. The Worker is `cavies-studio` in the Cloudflare account "Dev@cavies.xyz"; `wrangler.production.jsonc` is its configuration (`wrangler.jsonc` is the separate test Worker `cavies-studio-test`). Deploy from `studio/` with `npm run deploy:cf` (workers.dev test) or `npm run deploy:cf:production` (zone route), after the verify gate; both build first. The direct enquiry form is off in the build until `ENQUIRY_FORM_ENABLED=true`, which production refuses without `ENQUIRY_DELIVERY_VERIFIED=yes`. GitHub Actions is disabled for this repository, and no Actions workflows are maintained. The Vercel project `cavies/cavies-studio` is retired (the Vercel team is on the Hobby plan, which is non-commercial only).

The production domain and canonical URL are `https://cavies.studio` (moved from `cavies.xyz` on 22 October 2026). The `www.cavies.studio` hostname redirects permanently to the canonical domain, preserving paths and queries, through a Cloudflare Redirect Rule (the small Worker in `redirect/` is retired). Since 17 November 2026 `cavies.xyz` no longer redirects: it serves the same static export from its own assets-only Worker `cavies-xyz` (`wrangler.xyz.jsonc`, `npm run deploy:cf:xyz`, direct form off, canonical tags still pointing at `https://cavies.studio`), and `www.cavies.xyz` redirects to `https://cavies.xyz`. Deploy it after each production deploy so the two do not drift. Game subdomains of cavies.xyz are separate deployments and are unaffected. Test builds on a workers.dev address are built with `SITE_NOINDEX=1` and marked noindex. DNS is managed in Cloudflare. Preserve existing mail and unrelated DNS records when changing web traffic routing.

The site works without delivery credentials: it shows an email-draft composer, and the sending endpoint fails closed. Direct email and Telegram remain available without JavaScript. Enquiry text is sent to the studio mailbox through Cloudflare Email Sending and is not stored in a site database or application logs. The private rate-limit ledger (a Durable Object) stores HMAC identifiers and timestamps only. No marketing analytics are added.

Email delivery setup, operating limits, validation, and rollback are documented in `docs/enquiry-delivery.md` and `docs/cloudflare-workers.md`. Never expose credentials through public environment variables or commit them. Verify actual inbox arrival before enabling production delivery; a send acknowledgement confirms acceptance, not inbox placement.

## Search metadata

`lib/seo.ts` owns the canonical origin, company profile, homepage metadata, and shared social metadata. `lib/project-seo.ts` provides a distinct title and description for each case study. `lib/structured-data.ts` describes the company, website, portfolio, and case-study breadcrumbs; it preserves the distinction between product work and past advisory relationships. See `docs/seo.md` for indexing and maintenance notes.
