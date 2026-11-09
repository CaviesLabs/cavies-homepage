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
- PR: see the pull request that added this file.
- Docs changed: `CLAUDE.md`, `docs/HANDOFF.md`, `docs/PROVENANCE.md`
