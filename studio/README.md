# Cavies Studio

The new Cavies product design and frontend engineering website. This app lives in `studio/` so the original Cavies Labs website and its deployment remain available during review.

## Development

Requires Node.js 22 or later.

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
```

## Content

- `lib/projects.ts` owns the portfolio descriptions, screenshots, project galleries, and contact destinations.
- `app/page.tsx` owns the homepage, services, process, and FAQs.
- `app/globals.css` owns the responsive visual system.
- `public/work/` contains optimized, locally hosted original artwork and product captures. See `docs/portfolio-sources.md` for provenance.
- Contact: `tin@cavies.xyz` and `https://t.me/tincavies`.

Project and advisory work are attributed separately. No funding totals, impact metrics, or endorsements are implied. Pre-launch captures and sample states are identified on project pages.

## Deployment

The Vercel project is `cavies/cavies-studio`. Deploy this directory with the Vercel CLI:

```sh
cd studio
vercel link --project cavies-studio --scope cavies
vercel deploy --scope cavies
```

Use `--prod` only when publishing the approved version. Before enabling Git-based deployments, select `studio` as the Vercel Root Directory and merge the app into the connected production branch. The old repository root app is a separate legacy site.

The page metadata and sitemap use the intended canonical domain, `https://cavies.xyz`. Domain attachment and DNS cutover are separate from the review deployment. Preserve any existing mail records when configuring the domain.

No application environment variables, database, analytics, tracking cookies, or contact-form backend are required. Inquiry links open the visitor's mail application or Telegram.
