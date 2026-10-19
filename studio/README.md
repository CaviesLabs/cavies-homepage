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
```

For production HTTP/SEO smoke checks, run `npm run start -- --port 3100` in one terminal, then `npm run test:smoke` in another. Set `SITE_TEST_URL` if the server uses another port. These checks cover public routes, metadata, sitemap, robots, redirects and real 404s; they do not replace mobile/desktop browser and keyboard QA.

## Content

- `lib/projects.ts` and `lib/additional-projects.ts` own the portfolio descriptions, screenshots, galleries, collaboration credits, and ordering. Counts and case-study navigation are derived from those collections.
- A project's optional `liveLink` adds a link to its public deployment on the case study and in the showcase. Paperdash links to paperdash.xyz and Reai to reai.sg; Seitrace links to its archived demo at seitrace.com, which runs the original interface on labeled sample data. Projects whose deployments were removed (Skew, DexPaid, Loosecoins), pre-launch vPawHook, and the local Emberline pilot have no link.
- `app/page.tsx` owns the homepage and concise FAQ. Its order is hero, service paths, the four featured interfaces, the advisory strip, Selected work (cards 05–08 and the index from 09, continuing the featured numbering), Monthly plans with the scope builder, Games, and FAQ.
- `app/work/page.tsx` is the full index: featured interfaces, selected work, the wider portfolio, games in development, and past collaborations, each card opening its case study. The Work navigation item, case-study back links, and the 404 page point here.
- In-page anchors scroll smoothly (`data-scroll-behavior="smooth"` on `<html>`), and reduced motion restores instant jumps.
- `app/services/business-websites/page.tsx` explains business website builds, improvements, and ongoing support, with Beigman Engineering as relevant project context.
- `app/contact/page.tsx` and `components/enquiry-form.tsx` provide Gmail enquiry delivery when fully configured, with an email-draft fallback when unavailable. `app/api/enquiry/route.ts` validates requests, verifies Turnstile, reserves a durable send allowance, and calls Gmail with send-only OAuth access.
- `app/globals.css` owns the responsive visual system.
- `components/project-showcase.tsx` displays the four curated projects from `showcaseProjects` as selectable, full-width screenshots: Paperdash, Seitrace, Beigman Engineering, and Reai (the owner's order from 19 October 2026). Selected work continues with Skew, vPawHook, HeavenDash, and 0DTE; the index follows with Chat, Chirp, Pit Finance, brrr, then the shorter DexPaid, Loosecoins, and Emberline entries. Schlong belongs only in the secondary portfolio list.
- Portfolio screenshots preserve the entire captured view and original aspect ratio. Avoid cover cropping, overlapping panels, fixed-height clipping, or image tilt/zoom that hides UI. Case studies and the showcase provide links to full-resolution images.
- `lib/project-galleries.ts` adds detail-page images to the existing project galleries. Prefer distinct product screens, complete workflow panels, and original artwork; keep sample, prototype, and current-site context labels.
- `lib/game-projects.ts` contains four unreleased game case studies. `components/game-showcase.tsx` provides keyboard-accessible game and screenshot selection. Its previews preserve full images, with no autoplay; the cases stay separate from the established product order.
- The product and game selectors use short user-triggered transitions and moving selection indicators, disabled for reduced motion. See `docs/portfolio-motion.md` for reference review and design choices.
- `components/pricing.tsx` owns the monthly plans: Websites, Product interfaces, and Security audit. Each is quoted to an agreed scope and delivery capacity; no fixed public rate or unverified case-study price is advertised.
- `components/scope-builder.tsx` (under the plans, `/#scope`) composes three visitor decisions into one sentence. `lib/project-scope.ts` owns the options, phrasing, service mapping, and the `/contact?help=…&stage=…&timing=…` link. Plan cards and primary calls to action pass `help` so the contact form preselects the service. See `docs/portfolio-motion.md`.
- `components/option-row.tsx` is the shared segmented radio group with a sliding indicator; `components/morph-text.tsx` settles changed text letter by letter and reads as plain text to assistive technology.
- On `/contact`, a complete scope from the URL shows as a stub, preselects the service, and prefills the first line of the brief until the visitor edits or clears the form. After a confirmed send, `components/enquiry-ticket.tsx` prints a summary of what was sent. Nothing about delivery changed.
- `components/reflective-mark.tsx` progressively enhances the hero with a reflective C. Its scene loads on demand, stops rendering when idle or offscreen, and uses a static fallback for reduced motion or unavailable WebGL. See `docs/hero-motion.md`.
- `public/work/` contains optimized, locally hosted original artwork and product captures. See `docs/portfolio-sources.md` for provenance.
- `lib/contact.ts` is the single source for the contact address and email links.
- Contact: `contact@cavies.xyz` and `https://t.me/tincavies`.

Project and advisory work are attributed separately. No funding totals, impact metrics, or endorsements are implied. Pre-launch captures and sample states are identified on project pages.

## Deployment

The Vercel project is `cavies/cavies-studio`, connected to `CaviesLabs/cavies-homepage` on GitHub. Its Root Directory is `studio`, and its production branch is `main`. Keep these project settings in Vercel: building the repository root would build the separate legacy site.

Push changes through a pull request. Vercel creates preview deployments for feature branches and production deployments when changes merge into `main`. Run `npm run lint` and `npm run build` locally before merging. GitHub Actions is disabled for this repository, and no Actions workflows are maintained.

The production domain and canonical URL are `https://cavies.xyz`. The `www` hostname and `cavies-studio.vercel.app` redirect permanently to the canonical domain, preserving paths and queries. Preview deployments remain available for review and are marked noindex. DNS is managed in Cloudflare. Preserve existing mail and unrelated DNS records when changing web traffic routing.

Production releases use Vercel. The old root app and legacy hosting configuration do not deploy the Studio app; the former GitHub Pages workflow is available only in Git history.

The site works without delivery credentials: it shows an email-draft composer, and the sending endpoint fails closed. Direct email and Telegram remain available without JavaScript. Enquiry text is sent through Gmail and is not stored in a site database or application logs. The private rate-limit ledger stores HMAC identifiers and timestamps only. No marketing analytics are added.

Gmail delivery setup, operating limits, validation, and rollback are documented in `docs/enquiry-delivery.md`. Never expose credentials through public environment variables or commit Google client downloads. Verify actual inbox arrival before enabling production delivery; a Gmail API acknowledgement confirms acceptance, not inbox placement.

## Search metadata

`lib/seo.ts` owns the canonical origin, company profile, homepage metadata, and shared social metadata. `lib/project-seo.ts` provides a distinct title and description for each case study. `lib/structured-data.ts` describes the company, website, portfolio, and case-study breadcrumbs; it preserves the distinction between product work and past advisory relationships. See `docs/seo.md` for indexing and maintenance notes.
