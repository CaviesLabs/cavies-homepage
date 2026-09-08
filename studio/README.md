# Cavies Studio

The Cavies product design and frontend engineering website. This app lives in `studio/`; the original Cavies Labs website remains at the repository root as a legacy reference.

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

The Vercel project is `cavies/cavies-studio`, connected to `CaviesLabs/cavies-homepage` on GitHub. Its Root Directory is `studio`, and its production branch is `main`. Keep these project settings in Vercel: building the repository root would build the separate legacy site.

Push changes through a pull request. Vercel creates preview deployments for feature branches and production deployments when changes merge into `main`. The `Check Cavies Studio` GitHub workflow runs lint and a production build for relevant pull requests and pushes to `main` or `codex/cavies-studio`.

The production domain and canonical URL are `https://cavies.xyz`; `https://cavies-studio.vercel.app` also serves the Vercel project. DNS is managed in Cloudflare. Manage domain attachments in Vercel, use the DNS targets shown in the Vercel domain settings, and preserve existing mail and unrelated DNS records when changing web traffic routing.

The legacy GitHub Pages workflow is manual-only and is retained as a historical rollback reference. Its deprecated Actions must be updated before reuse. Production releases use Vercel; the old root app and legacy hosting configuration do not deploy the Studio app.

No application environment variables, database, analytics, tracking cookies, or contact-form backend are required. Inquiry links open the visitor's mail application or Telegram.
