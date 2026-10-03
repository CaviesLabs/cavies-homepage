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
```

For production HTTP/SEO smoke checks, run `npm run start -- --port 3100` in one terminal, then `npm run test:smoke` in another. Set `SITE_TEST_URL` if the server uses another port. These checks cover public routes, metadata, sitemap, robots, redirects and real 404s; they do not replace mobile/desktop browser and keyboard QA.

## Content

- `lib/projects.ts` and `lib/additional-projects.ts` own the portfolio descriptions, screenshots, galleries, collaboration credits, and ordering. Counts and case-study navigation are derived from those collections.
- `app/page.tsx` owns the homepage and concise FAQ.
- `app/services/business-websites/page.tsx` explains business website builds, improvements, and ongoing support, with Beigman Engineering as relevant project context.
- `app/contact/page.tsx` and `components/enquiry-form.tsx` provide a local-only enquiry composer. It prepares an email draft and provides copy/manual-copy fallback; it does not submit or deliver messages.
- `app/globals.css` owns the responsive visual system.
- `components/project-showcase.tsx` displays the four curated projects from `showcaseProjects` as selectable, full-width screenshots: Seitrace, HeavenDash, Beigman Engineering, and 0DTE. Beigman is third; ClaimHQ remains in the wider portfolio. Schlong belongs only in the secondary portfolio list.
- Portfolio screenshots preserve the entire captured view and original aspect ratio. Avoid cover cropping, overlapping panels, fixed-height clipping, or image tilt/zoom that hides UI. Case studies and the showcase provide links to full-resolution images.
- `lib/project-galleries.ts` adds detail-page images to the existing project galleries. Prefer distinct product screens, complete workflow panels, and original artwork; keep sample, prototype, and current-site context labels.
- `components/pricing.tsx` owns the monthly plans: Websites, Product interfaces, and Security audit. Each is quoted to an agreed scope and delivery capacity; no fixed public rate or unverified case-study price is advertised.
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

No application environment variables, database, analytics, tracking cookies, or contact-form backend are required. The enquiry composer keeps entered text in the browser page until the visitor chooses to open an email draft or copy it. It never reports an enquiry as sent. Direct email and Telegram remain available, including when JavaScript is unavailable.

Direct form delivery is deliberately not configured. Before enabling it, choose and approve the delivery provider, destination, privacy wording, credentials and any cost. A future sending endpoint must validate server-side, reject oversized requests and header injection, enforce origin and abuse/rate-limit controls, and avoid logging or analytics containing enquiry text or personal data. Verify actual delivery and failure states; never return a success state merely because the form was completed.

## Search metadata

`lib/seo.ts` owns the canonical origin, company profile, homepage metadata, and shared social metadata. `lib/project-seo.ts` provides a distinct title and description for each case study. `lib/structured-data.ts` describes the company, website, portfolio, and case-study breadcrumbs; it preserves the distinction between product work and past advisory relationships. See `docs/seo.md` for indexing and maintenance notes.
