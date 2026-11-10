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
