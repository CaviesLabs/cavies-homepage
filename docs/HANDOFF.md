# Cavies Studio website: handoff log

Newest first. This file is how the next session, or the owner, learns what happened without reading the whole thread.

No earlier handoff file exists in this repo. Before this file, history is in `git log`, in the "Updated" notes of `studio/docs/portfolio-sources.md`, and in `studio/README.md`.

## How to add an entry
<!-- Keep this note in the file. -->
- Add a new section at the top, under this note, headed `## <Title>: <D Month YYYY>`.
- Fill the five fields below. Write "none" rather than deleting a field.
- Plain English, short sentences. Name files, PR numbers and commit hashes.
- Record decisions the owner made, with the date, and decisions you made without them, labelled as yours.
- Never put secrets, tokens or account ids in an entry.
- One entry per milestone or merged PR. Do not edit old entries; add a new one that corrects them.

---

## Move to Cloudflare Workers Free, built and deployed to workers.dev, not cut over: 14 November 2026

**What shipped**
- A static export served as Worker static assets (`studio/wrangler.jsonc`), the enquiry endpoint as Worker code at `/api/enquiry` with a SQLite Durable Object ledger (`studio/worker/`), `public/_headers` and `public/_redirects`, build-time image resizing (`studio/scripts/`), and a separate redirect Worker for www.cavies.studio, cavies.xyz and www.cavies.xyz (`studio/redirect/`, not deployed). Details: `studio/docs/cloudflare-workers.md`.
- Test deploy: https://cavies-studio.dev-226.workers.dev (noindex build). Tender's address is now tender-by-hyperflow.dev-226.workers.dev.
- cavies.studio is still served by Vercel. No DNS, domain or Vercel change was made.

**Decisions**
- Mine: the Worker has no Vercel-style firewall rule; the 5 per client per hour and 100 per day limits are the only throttles.
- Mine: the privacy policy still names Vercel. Changing a published policy needs a dated version and Meow's approval, so it is left for the cutover.
- Mine: `ENQUIRY_EXTRA_ORIGIN` lets one workers.dev origin through for testing, passed with `--var` only.

**Open items**
- Cutover and rollback steps are in `studio/docs/cloudflare-workers.md` and the pull request (zone routes plus switching the existing records to proxied: no DNS gap, one-step rollback). Worker secrets: `TURNSTILE_SECRET_KEY` was read from the widget with `cf turnstile widgets get` and piped into the Worker; `RATE_LIMIT_SALT` is new. Still missing, needs Meow: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `ENQUIRY_DELIVERY_ENABLED`. Delivery stays off until then.
- One real enquiry must be delivered and seen in the inbox before the production build turns the form on (`ENQUIRY_DELIVERY_VERIFIED=yes`). The form is off in every build until then.

**How to verify**
- `cd studio; npm run lint; npm run typecheck; npm run test:enquiry; npm run test:scope; npm run build:cf`, then `npx wrangler dev --port 3100` and `npm run test:smoke`.

## Portfolio order of 11 November: Emberline, Beigman, Reai, Tender first; Tender, Amoeba and Tyche added: 11 November 2026

**What shipped**
- The owner's new order (PR #33). Featured: Emberline, Beigman Engineering, Reai, Tender. Selected work (05 to 08): Amoeba, vPawHook, Tyche, Seitrace. The index starts at 09 with Paperdash; the rest keep their order. `studio/lib/projects.ts`.
- New cases in `studio/lib/additional-projects.ts`, `project-galleries.ts` and `project-seo.ts`, with images in `studio/public/work/`:
  - Tender, client work for HyperFlow, linked to tender-by-hyperflow.vercel.app.
  - Amoeba, pre-launch, linked to amoeba.family.
  - Tyche, pre-launch, not linked: its only address is a preview build.
- Emberline now leads with the public calculator site (emberline.cavies.studio, linked). The two pilot images moved into its gallery.
- vPawHook:
  - The Sepolia test site is gone (404), so the copy says the game has not launched and the pool has not opened.
  - New lead, formats and hook images in the site's current look. The two outdated images (`vpawhook-hooks.webp`, `vpawhook-race-formats.webp`) were removed.
  - Linked to vpawhook.com.
- Paperdash has shut down. paperdash.xyz no longer resolves, so it has no link. It leads with the arcade, and its captions say "captured while live".
- Reai copy: in a trial, with an assistant on each agent's own number and a central AI on Reai's company number.
- Smoke tests:
  - They check the first nine positions of the order.
  - They match honesty labels against the visible page, not meta tags.
  - They check the new and changed cases and that Paperdash is not linked.
- Provenance:
  - `studio/docs/portfolio-sources.md` has an 11 November section.
  - `docs/PROVENANCE.md` notes the Amoeba mascot's AI-assisted origin.
  - `studio/README.md` describes the new order and links, and says that `context` is not rendered.

**Decisions**
- The order above. Meow, 11 November 2026.
- Paperdash is shut down and its arcade can be showcased; Reai is in a trial with a central AI and an assistant for each agent who signs up. Meow, 9 November 2026 (desk answer in studio-os `DECISIONS.md`).
- Tender names HyperFlow in its role line and search title. Their own site reads "Tender by HyperFlow", and Meow asked for Tender at the top, but no written OK from HyperFlow is on file. A studio-os PENDING line asks Meow to confirm. (mine), 11 November 2026
- Tender's lead image ends above the landing page's live price, so no savings figure sits on the homepage. The copy leaves out HyperFlow's internal operations. (mine)
- vPawHook says "has not launched" rather than "deployed on Ethereum mainnet": before the opening, the portfolio says no more than vpawhook.com does. (mine)
- Not used, though captured:
  - Tyche's token page, which showed a third-party token's market data and its creator's address.
  - Emberline's validation page, whose pass count would read as an accuracy claim.
  - Emberline's drafting-support sentence, which would be a new public offer on the studio site and is Meow's call. (mine)
- Status lines (pre-launch, shut down, in a trial) sit in `description` or `approach`, because case pages do not render `context`. (mine)

**Open items**
- HyperFlow consent: if Meow or HyperFlow says no, drop "for HyperFlow" from Tender's role line and from its search title and description. Owner: Meow.
- Launch-day refreshes. Whoever runs each launch updates the case the same day:
  - Amoeba: its copy and images say pre-launch.
  - Tyche: preview build, no draw yet.
  - vPawHook: "the pool has not opened" becomes false at the opening.
- Tender changes often. Re-run the capture script in `research/screenshots/2026-11-11/tender/` (local, outside the repo) after the next site release.
- From the growth backlog item of 9 November, still open: the Rosewater series page, and contact@cavies.studio as the one enquiry address in the site schema. This PR did only that item's role lines.
- `meowttt7/grandpaw` README and AGENTS still describe testnet.vpawhook.com as a current site, and the repo has no provenance file.

**How to verify**
- From `studio/`, all passed on the branch: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:enquiry`, `npm run test:scope`, then `npx next start --port 3123` and `SITE_TEST_URL=http://127.0.0.1:3123 npm run test:smoke`.
- Desktop (1440) and phone (390) screenshots showed no page errors. They covered the homepage showcase (with Tender selected), Selected work, /work and seven case studies.
- Production after merge:
  - https://cavies.studio/work lists Emberline, Beigman Engineering, Reai, Tender, Amoeba, vPawHook, Tyche, Seitrace and Paperdash first.
  - /work/paperdash has no paperdash.xyz link.
  - /work/emberline links the calculator site.

**Links**
- PR: https://github.com/CaviesLabs/cavies-homepage/pull/33
- Research packages (briefs, manifests, capture scripts, raw captures): `research/screenshots/2026-11-11/` in the Cavies Studio workspace, outside this repo.
- Models: Opus 5.5 integrated and wrote the copy edits. Four Fable 5.2 helpers on dev2 and dev3 made the captures and draft copy. The Opus reviewer and the Haiku supervisor checked the PR.

---

## Studio privacy policy page at /privacy: 10 November 2026

**What shipped**
- A studio privacy policy at `/privacy` (PR #32, commits `f1f8a4c`, `50013df` and this entry). Before this the site had only per-game policies and `/privacy` answered 404.
- `studio/lib/studio-privacy.ts` holds the text (Version 1, effective 10 November 2026) and a small parser. `studio/app/privacy/page.tsx` renders it in the Oddly Orderly policy page's layout and styles (it imports `app/games/oddly-orderly/game.module.css`).
- The footer has a "Privacy" link, the sitemap lists `/privacy`, and the smoke test checks the sitemap entry.
- `docs/legal/privacy-policy-2026-11-10.md` is the dated copy of the published text. The studio template (studio-os `ops/legal/PRIVACY-POLICY-TEMPLATE.md`) asks for one per published version.
- Why: Google needs a privacy policy link before the consent screen of the internal YouTube uploader ("Cavies posting", Google Cloud project `cavies-posting`) can be published, and YouTube's API audit form asks for one. The next step, adding the link on the Google Auth Platform Branding page, is done in the studio-os thread.

**Decisions**
- Operator is "Tin Tran, trading as Cavies Studio", Australia; contact contact@cavies.studio; no postal address, no ABN. Meow, 10 November 2026.
- Meow approved the full text in the thread on 10 November 2026, including three lines the brief did not ask for: "We aim to reply within 30 days", the section "If we email you first" (outreach email), and the section "Links to other sites".
- The policy points to Cloudflare's Turnstile privacy notice instead of making its own claim about what the spam check stores in the browser. (mine), 10 November 2026
- Nekonnect is not linked under "Our games": its `/privacy` answered 404 on 10 November 2026. (mine)
- The text was checked against the code on 10 November 2026: the enquiry fields and Gmail delivery (`lib/enquiry-delivery.ts`), the hashed rate-limit ledger (`lib/enquiry-rate-limit.ts`), Turnstile (`components/enquiry-turnstile.tsx`), self-hosted fonts, no analytics script, no cookies in the live site's responses, and studio-os `growth/posting/` for the YouTube section (one scope, `youtube.upload`).

**Open items**
- No adviser has read the policy. It is not legal advice. Owner: Meow.
- The data-processing terms of Vercel, Cloudflare and Google were not read (the template asks for a dated check); only their privacy pages were confirmed to load. Owner: whoever next revises the policy.
- The Vercel project still has a Web Analytics record in its settings. Nothing on the site sends to it (no script, no package). Meow declined Web Analytics on 9 November 2026.
- When the site's behaviour changes (analytics, a new provider, accounts, a new game policy), update `studio/lib/studio-privacy.ts`, bump the version and date, and add a new dated copy in `docs/legal/`. The next template review is due 8 November 2027.

**How to verify**
- From `studio/`: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:enquiry`, `npm run test:scope`; then `npx next start --port <free port>` and `SITE_TEST_URL=http://127.0.0.1:<port> npm run test:smoke`. All passed before the merge.
- Production: `https://cavies.studio/privacy` answers 200 with the title "Privacy policy | Cavies Studio", and `https://cavies.studio/sitemap.xml` lists it. The result of the check after the merge is reported in the task thread; if it had failed, a newer entry above would say so.

**Links**
- PR: https://github.com/CaviesLabs/cavies-homepage/pull/32
- Page: https://cavies.studio/privacy
- Dated copy: `docs/legal/privacy-policy-2026-11-10.md`

---

## State of the site and studio files added: 9 November 2026

**What shipped**
- This entry and the thin studio files: root `CLAUDE.md`, `docs/HANDOFF.md`, `docs/PROVENANCE.md`. Docs only; no code, config or dependency changed. The app is unchanged from `main` at `7900cfe`.
- State of the site before this change, from `git log` and `README.md`:
  - The Next.js app lives in `studio/`, deployed by the Vercel project `cavies/cavies-studio` (Root Directory `studio`, production branch `main`). Production domain is `https://cavies.studio`.
  - The old Cavies Labs site was removed from the repo root on 12 October 2026 (`11a7c43`, PR #21). Its last state is tagged `legacy-cavies-labs-site`.
  - Latest work, the Paperdash and Reai showcase, new projects and refreshed games, went in on 19 October 2026 (`548b998`, PR #22).
  - The site moved from `cavies.xyz` to `cavies.studio` on 22 October 2026 (`dfe69db`, PR #23). Enquiry notifications are sent from `contact@cavies.studio` (`171a929`, PR #25).
  - Oddly Orderly's own pages (game page, press kit, privacy policy, support) went in on 23 October 2026 (`3bc2aec`, `c814379`, `ca616bc`, PR #26). The policy text was extended on 24 October (`e9fc758`, `6b88087`, `d54f03c`, PRs #27 to #29) and on 3 November (`99af283`, PR #30).

**Decisions**
- `CLAUDE.md` is at the repo root and imports `studio/AGENTS.md` rather than copying it, because `next dev` rewrites that file's rule block. The repo's own rules are copied word for word from `studio/README.md` under "Repo rules". (mine), 9 November 2026
- `studio/CLAUDE.md` and `studio/AGENTS.md` are untouched. (mine), 9 November 2026

**Open items**
- `steamUrl` in `studio/lib/oddly-orderly.ts` is `null`. Set it when the Steam store page is public and the Steam buttons appear. Owner: Meow.
- `docs/PROVENANCE.md` has no rows yet. Rows come from the game repositories' own provenance records. Owner: whoever next touches game art.

**How to verify**
- From `studio/`: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:enquiry`, `npm run test:scope`. All pass on `main` at the time of this change.

**Links**
- PR: https://github.com/CaviesLabs/cavies-homepage/pull/31
- Docs changed: `CLAUDE.md`, `docs/HANDOFF.md`, `docs/PROVENANCE.md`
