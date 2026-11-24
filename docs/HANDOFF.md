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

## /playable-ads: three playable demos, the five networks, the quote form: 24 November 2026

**What shipped**
- PR #37: the page `/playable-ads` (title "Playable Ads for Mobile Games | Cavies Studio"). It shows three demos of our own games in phone frames (Rise & Squeeze, Lantern Burst, Cavy Conga), each a sandboxed iframe (`sandbox="allow-scripts"`) that loads only after "Tap to play", with Replay; the line "One build, exported for: Unity Ads, AppLovin, Google App campaigns, TikTok, Meta" and "Each export follows that network's published specs, checked against each network's size limit before delivery"; how it works; "Fixed price, quoted in a day."; and the existing enquiry form with a new "Playable ads" service preselected (`lib/enquiry.ts`, `components/enquiry-form.tsx` `defaultService`; delivery, rate limit and secrets untouched). No prices, no install or performance claims, no client names.
- The demo files: `studio/public/playable-ads/demos/<id>/index.html`, the `generic` builds from the Playables repo (ad bytes built at Playables commit `308d6b90`; 731,749 / 1,615,793 / 1,575,160 bytes; sha256 in the Playables repo's `.tmp/ad-demos/<id>/SHA256SUMS`). `.gitattributes` marks them `-text` so line-ending conversion cannot change them. `npm run demos:drop -- <dist-ad folder>` replaces them (README, "Playable ads demos"). A demo's end-card button posts `{type:'cavies-ad-cta'}` to the page; the page ignores the payload's url, checks `event.source` and scrolls to the quote form.
- `public/_headers`: the demo folder alone is framable (`X-Frame-Options: SAMEORIGIN`, every other path stays `DENY`), sends `X-Robots-Tag: noindex` and a sandbox CSP that allows inline script and `data:` and `blob:` only. Sitemap entry, canonical `https://cavies.studio/playable-ads`, footer link "Playable ads", `/playable-ads/` redirects to `/playable-ads`.

**Decisions**
- Meow, 24 Nov 2026: the playable-ads test and its prices (plan: studio-os `growth/playable-ads/PLAN.md`); "fixed price, quoted in a day", no price on the site.
- Mine: the form topic became a fifth service ("Playable ads") in the shared list, so it also shows on `/contact`. The alternative was a preset "Not sure yet".
- Mine: the footer is the only link (the header has four items and the home page's two service cards sit in a two-column grid); say if it should be in the header.
- Mine: the phone frame is a plain rounded frame, 372 px wide at most, with no camera-dot overlay (it covered Rise & Squeeze's HUD). At that size the games draw 10.7 to 10.9 px at worst in Lantern Burst's tutorial hints and Cavy Conga's pick-card captions (just under the studio's 11 px label floor); Rise & Squeeze draws nothing under 11.
- Reviewer (Opus 5.5) read the page and the headers before merge: merge after fixes, all done.

**Open items**
- Not verified: the page on a phone held upright (the S24 was held sideways; the page ran there at a forced 384x693 size, which shows the frame about 716 px tall, so a visitor scrolls a little); a screen reader and a full keyboard walk (only Tap to play by keyboard); the live form delivery (off in the build; the composer shows); real network SDKs (none involved here).
- Each demo's end card needs a thumb: the demos were played by scripted touch only.
- Cavy Conga is the weakest of the three on art (the Playables handoff says why); Meow or Miu may swap a demo with `npm run demos:drop`.
- Deploy: see the next entry (written after the production deploy and smoke check).

**How to verify**
- From `studio/`: `npm run lint`, `typecheck`, `build`, `test:enquiry`, `test:scope`, `test:workerd` (all pass as run 24 Nov: 43, 4 and 5 tests), then `npm run build:cf`, `npx wrangler dev --port <free port>`, `npm run test:smoke` (24 of 24).
- Screenshots (not committed): `studio/.tmp/screens/real/` in the PR worktree: phone 390x844 and desktop 1440x900, each demo idle, mid-run, end card, after the card's button, replay.

**Disk**
- The PR worktree `cavies-homepage-wt-ads`: removed `.next`, `out`, `.wrangler`, `node_modules`, `public/_img`; left `studio/.tmp/screens` (19 MB, untracked).

## cavies.xyz serves the site again instead of redirecting: 17 November 2026

**What shipped**
- Meow asked (17 Nov 2026) for cavies.xyz to stop redirecting to cavies.studio, because the AWS Activate application needs a website on the exact domain it names.
- New assets-only Worker `cavies-xyz` (`studio/wrangler.xyz.jsonc`, zone route `cavies.xyz/*`), deployed with the new `npm run deploy:cf:xyz` (`studio/scripts/deploy-cf.mjs` mode `xyz`). Same static export as cavies.studio, direct form always off, no Worker code, no secrets, no `/api/enquiry`.
- The cavies.xyz zone's Redirect Rule now matches `www.cavies.xyz` only and sends it to `https://cavies.xyz` (308, path and query kept). It used to send both hosts to cavies.studio.
- No DNS record changed. cavies.studio, www.cavies.studio, mail records and the game subdomains were not touched.

**Decisions (mine)**
- A separate Worker instead of a second route on `cavies-studio`: the enquiry endpoint accepts `https://cavies.studio` only, so the production build's form would fail on cavies.xyz.
- Canonical tags, robots.txt and the sitemap on cavies.xyz still name `https://cavies.studio`, so search engines keep indexing the canonical site. The pages still say cavies.studio in the contact addresses and privacy policy.

**Open items**
- Run `npm run deploy:cf:xyz` after each production deploy, or the copy drifts.
- The 308 from cavies.xyz was the signal for the October domain move; with it gone, only the canonical tags tell Google which domain is the real one. Once AWS Activate is settled, Meow decides whether to put the redirect back (steps in `studio/docs/cloudflare-workers.md`, "cavies.xyz").
- The retired `redirect/worker.js` and the smoke test that imports it still describe the old behaviour.

**How to verify**
- `curl -I https://cavies.xyz/` is 200; `curl -I "https://www.cavies.xyz/contact?a=1"` is 308 to `https://cavies.xyz/contact?a=1`.
- `SITE_TEST_URL=https://cavies.xyz npm run test:smoke` passes 21 of 22; the enquiry-endpoint test fails by design (no endpoint there).
- Checked after the deploy: home, /contact (composer, no Send button), a case page, 404, sitemap, security headers with HSTS, http to https; cavies.studio 200, www.cavies.studio 308, playables.cavies.xyz 200, MX unchanged. Not checked: screenshots (the pages are the same build as cavies.studio with the form off).

**Disk**
- Nothing new kept: the build reused `studio/out` (81 MB) and `node_modules` in the existing worktree `cavies-homepage-wt-cf`.

## cavies.studio moved from Vercel to Cloudflare Workers Free: 14 November 2026

**What moved**
- cavies.studio, www.cavies.studio, cavies.xyz and www.cavies.xyz now reach Cloudflare. The four DNS records are the same CNAMEs to Vercel, switched from DNS-only to proxied (no record was deleted, so there was no gap). The Worker `cavies-studio` serves cavies.studio through the zone route `cavies.studio/*`; the Worker `cavies-studio-redirect` sends the other three hosts to https://cavies.studio with a 308, path and query kept. Mail records and every other subdomain are untouched and answered the same before and after.
- Site: a static export served as Worker static assets, plus the enquiry endpoint at `/api/enquiry` (Worker code, Durable Object ledger for the 5 per hour and 100 per day limits). Test Worker: `cavies-studio-test` (own name, ledger and address, form off, no Gmail secrets). Details and commands: `studio/docs/cloudflare-workers.md`.
- Gmail sign-in was redone (new client secret and refresh token for the same OAuth client and mailbox, piped straight into the Worker). The delivery gate passed: Meow sent one test enquiry from the workers.dev contact page and it arrived in his inbox. The enquiry form is on in production.
- Always Use HTTPS is now on for both zones. Privacy policy version 2 (14 November 2026) names Cloudflare as host (`studio/lib/studio-privacy.ts`, `docs/legal/privacy-policy-2026-11-14.md`).

**Deploy and verification**
- Production Worker deployed with `ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes npm run deploy:cf:production`, redirect Worker with `npm run deploy:cf:redirect`; records switched with `cf dns records edit`.
- Checked on the live hosts: https and http (301 to https), all main pages, 404, sitemap, robots, `/games` and `/work/seispace` redirects (with trailing slashes), the four security headers including HSTS on pages, redirects and Worker replies, `Server: cloudflare`, `/api/enquiry` rejection paths, the contact form and spam-check script, privacy v2, the trailer playing, no console errors beyond the spam widget's own messages, page heights identical to the old site. The repo smoke test passes against https://cavies.studio (22 of 22; a run now and then fails with a connection timeout from this PC to a Cloudflare address, which also happens to the unchanged emberline host).
- No real enquiry was sent during the cutover.

**Decisions (mine unless stated)**
- Zone routes plus proxying existing records instead of Custom Domains, because a Custom Domain cannot sit on a hostname that has a CNAME and deleting first would leave a gap.
- Test and production are separate Workers so a test deploy cannot overwrite the live site.
- `npm run build` is the full pipeline, so a Vercel build of `main` still produces a working static fallback instead of one with missing images.
- Meow approved the move, privacy v2 (14 Nov 2026; wording not individually reviewed) and Always Use HTTPS.

**Rollback**
- Set the record back to DNS-only: `cf dns records edit <id> --zone <zone> --body '{... "proxied": false}'` for cavies.studio (44976ad48916a47fe38c724acacce618), www.cavies.studio (ff23a53beab63817ae0d723d493d4dce), cavies.xyz (6dd3e3e8693f38b9e27b8d83a282b0ca), www.cavies.xyz (bc68edd9b9f76bd3e7306cc03077e532). Traffic returns to Vercel within minutes.
- Caveats: Vercel cannot renew certificates for a hostname while it is proxied, so rollback is safe only while the Vercel certificates are valid; once the Vercel project is deleted there is nothing to roll back to.

**Still on Vercel**
- The Vercel project `cavies/cavies-studio`, its domains and its Blob store (the old rate-limit ledger) are untouched. The Vercel project builds `main`; after this merge its build produces a static composer-only site (or fails and keeps the old deployment). Nothing serves the live domains from it.

**Open items**
- Meow retires Vercel in a few days: delete the Vercel project and its Blob store, then replace each CNAME with a proxied `AAAA 100::` placeholder. Agents do not do this.
- Check the first real enquiry that arrives, and watch the Worker for errors for a few days (`npx wrangler tail`).
- The old client secret and refresh token stay valid until Vercel is retired; revoke them then if wanted (Meow's call).

**How to verify**
- `cd studio; npm run lint; npm run typecheck; npm run test:enquiry; npm run test:scope; npm run test:workerd`, then `SITE_TEST_URL=https://cavies.studio npm run test:smoke`.

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
