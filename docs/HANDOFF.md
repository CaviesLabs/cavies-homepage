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

## The trailer answers byte ranges: PR #51 merged and live: 28 November 2026

**What shipped**
- PR #51 merged as `f594d6b` (head `74c21cc`). Workers static assets answer a `Range` request with 200 and the whole file (Cloudflare, "Billing and Limitations", "Range requests"); Safari on iPhone and iPad needs byte ranges (Apple, Safari Web Content Guide, "Configuring Your Server"). The configs now run the Worker first for `.mp4`, `.m4v`, `.mov` and `.webm` (the trailer is the only video) and `worker/video-range.ts` serves one range from the `ASSETS` binding: 206, 416, 200 with `Accept-Ranges`, `HEAD`, 304, `If-Range`. Pages, pictures and `/api/enquiry` are untouched. Details and cost in `studio/docs/cloudflare-workers.md`, "Video byte ranges".
- Deployed: production `35987eaf-5310-433e-899d-5f4cd924329e` at 20:45 UTC on 27 Nov (03:45 on 28 Nov by this PC's clock), `ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes npm run deploy:cf:production`, after `gate.py run --full` on `f594d6b` (all `same` as the passes on `74c21cc`, its tree). Previous version `ba1506dd-8ff0-42c7-bb64-3867215c4fef`. (The 27 Nov entry below gives its deploy time as 19:55 UTC on 28 Nov; the deployments list says 27 Nov.)
- Smoke check of https://cavies.studio: the trailer with `bytes=0-1` 206 `bytes 0-1/14033943`; a middle range 206 (bytes equal the file's); the last 1,000 bytes and an open range 206; `bytes=14033943-` 416 `bytes */14033943`; no range 200, `Accept-Ranges: bytes`, 14,033,943 bytes, byte-identical to the repo file; `HEAD` 200; `/`, the game page, press kit, `/contact`, `/privacy` and the capsule picture 200; a picture with a `Range` still 200 (static asset); `GET /api/enquiry` 405. No enquiry or email was sent.

**Open**
- No one has played the trailer on an iPhone or iPad yet.
- Worker CPU: `wrangler tail` over 37 range requests shows `cpuTime` 7 to 110 ms (median 32 ms), above the Free plan's 10 ms, with every request 206 and outcome `ok`. If failures (error 1102) appear, move to the Cache API or R2 (see the doc).
- A trailer play now costs a handful to about ten Worker requests (Free plan: 100,000 a day); it cost none before.

**How to verify**
- `curl -s -D - -o /dev/null --max-filesize 1000 -r 0-1 https://cavies.studio/games/oddly-orderly/oddly-orderly-trailer.mp4` shows 206 and `Content-Range: bytes 0-1/14033943`. `cd studio && npm run test:workerd` (19 tests).

**Disk:** worktree `cavies-homepage-wt-ranges` with its `node_modules`, build output and the branch (local and remote) removed; scratch files from the checks deleted. Models: Sonnet 5.5 did the work; Haiku 5.5 (supervisor) and Opus 5.5 (reviewer) read the branch before the merge. Not verified: playback on a real iPhone or iPad.

---

## Oddly Orderly's pages deployed: PR #50 merged and live: 28 November 2026

**What shipped**
- PR #50 merged as `0f8647a` (head `f2507b8`). Added before the merge, at the otters' director's ask: the game page carries the approved two-sentence art note under the platforms line, word for word as the press kit has it (the game's `GO-PUBLIC.md` says it goes on the studio's page for the game too); a smoke test holds it.
- Deployed: production `ba1506dd-8ff0-42c7-bb64-3867215c4fef` at about 19:55 UTC by this PC's clock (`ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes npm run deploy:cf:production`, after `gate.py run --full` on `0f8647a`: every check `same` as the passes on `f2507b8`, whose tree it is). Previous version `b7d1d9ee-7562-4444-a888-b5ea2043bf98`. The first try failed on a network timeout before anything was published; the second went through.
- Smoke check of https://cavies.studio: the game page, press kit, support, privacy and case study answer 200 and none says "magpie"; the eight screenshots, eighteen downloads, capsule, icon, logo, sharing image and poster (34 files) answer 200 with picture content types; the trailer answers 200 at 14,033,943 bytes; `/`, `/playable-ads`, `/contact` and `/work/emberline` answer 200; the game page and press kit carry no tester address, `cavies.xyz`, password, date or Steam link.

**Open**
- A `Range` request for the trailer answers 200, not 206 (no `Accept-Ranges`). An untouched image on the site does the same, so it is the Workers static-assets host and not the new file; the trailer is faststart, `preload="none"`, so it plays as it downloads. Not rolled back for it.
- The case study's rendered text never names the otters (its `context` line, which is not rendered, does); only its pictures and captions show them.

**How to verify**
- The five pages above on cavies.studio; `gate.py run --full` reads `same` at `0f8647a`.

**Disk:** worktree `cavies-homepage-wt-otters` with its `node_modules`, build output and branch removed after this entry; the main checkout is clean on `main`. Models: Sonnet 5.5 did the work; Haiku 5.5 and Opus 5.5 read PR #50 before the merge. Not verified: the trailer played to its end in a browser.

## Oddly Orderly's pages: the two otters in the magpie's place: 27 November 2026

**What shipped** (PR #50, branch `claude/oddly-orderly-otters`; open, not merged, not deployed)
- No page says "magpie" (a smoke test now fails if one does). Game page: the store's first eight screenshots, the store's short description and the otters' line word for word. Press kit: all eighteen screenshots, logo, icon, main capsule, the art note at the final `GO-PUBLIC.md` wording. Sharing image: the end card. Case study: its cover and one gallery picture that showed the bird are accepted screenshots.
- Trailer: the accepted 52.4 s cut re-encoded H.264 High 1080p30, two-pass 2.0 Mbps, AAC 128 kbps, 14.0 MB (under the site's 15 MB download check; 2.2 Mbps came to 15.4 MB). Poster from `thumbnail-gameplay.png`; no autoplay.
- Support: the settings as the game has them, Start over and Clear all rosettes. Left out, not checkable in the game: "Steam achievements stay earned". Privacy: the game's `privacy_policy.txt` word for word; two words differed ("the magpie" is "the otters"); the effective date is the game's own.
- Records: `portfolio-sources.md`, `docs/PROVENANCE.md`, README, seo notes; `site-smoke.test.mjs` names the new copy.

**Open**
- The director reads the PR, then says go; deploy follows the studio rules. The game page does not carry the AI disclosure (only the press kit does, as before). The trailer was not played to the end in a browser.

**How to verify**
- `cd studio && npm run build:cf`, `npx wrangler dev --port 3217`, `SITE_TEST_URL=http://127.0.0.1:3217 npm run test:smoke` (25 pass); phone and desktop screenshots of the five pages checked by eye.

**Disk:** build output and `node_modules` removed from the worktree `cavies-homepage-wt-otters` before the handoff; the worktree stays until the PR is read.

## Dependencies: Next.js 16.4.6, the audit's fixes, 21 GitHub alerts cleared: 26 November 2026

**What shipped**
- Meow asked (26 Nov) for the alerts GitHub reports to be looked at and fixed. PR #49 (`d872bc2`, merged as `16ff97f`): `next` 16.3.4 to 16.4.6 and `eslint-config-next` to match, plus `npm audit fix` (brace-expansion, minimatch, source-map-js, zod, the typescript-eslint chain; also ignore and semver). `npm audit`: 11 to 0. All 21 of GitHub's open alerts are at or above their first patched version (17 were Next.js).
- How exposed the live site was: little. It is a static export plus one hand-written Worker, with no Next.js server, image optimisation API, server actions or `use cache`. A clean-up, not an incident.
- Deployed: production `b7d1d9ee-7562-4444-a888-b5ea2043bf98` (after `gate.py run --full` on `16ff97f`). Previous version `f4554a91-1dda-4671-9151-44814ce359b9`.
- Supervisor (Haiku) then reviewer (Opus 5.5): nothing blocking. The reviewer compared the new build with a 16.3.4 build: same 2,073 files, identical head tags, JSON-LD, image attributes, robots, sitemap, headers and redirects.

**Decisions (mine)**
- Took four releases under a week old (ignore, typescript-eslint, brace-expansion, source-map-js): build-time or dev-only, no install scripts, hashes match the registry.

**Open**
- A `wrangler dev --port 3100` started from the main checkout on 24 Nov at 20:38 is still running (root process 81444) and holds the port the smoke test uses by default. Not mine, so not stopped. Until it is, run the smoke test with `SITE_TEST_URL` on another port.
- 16.4 writes the route prefetch files in a new format: a tab that was open across the deploy may do one full page load on its next in-app navigation.

**How to verify**
- `cd studio && npm audit` reads 0. GitHub's Dependabot page shows the alerts as fixed once it has rescanned main.
- After the deploy: `/`, `/contact`, `/work`, `/playable-ads`, `/games/oddly-orderly`, `/privacy`, `/sitemap.xml`, `/robots.txt` answer 200; `/games` 302; `/work/` 308; an unknown path 404 with noindex; the four security headers are present; a `/_next/static` file is `immutable`; `GET /api/enquiry` 405. In a browser, Home to Work to Contact by the in-page links: 19 prefetch files fetched, no failed request, no console error. No enquiry was sent.

**Disk:** removed the worktree `cavies-homepage-wt-deps` with its `node_modules`, `.next` and `out`. Left: nothing.

## Enquiry form: a copied-draft notice no longer keeps the error style: 26 November 2026

**What shipped**
- PR #48 (`5396c3e`, merged as `f2f9398`). After a failed send the status line is an error (red, `aria-live="assertive"`). Copy draft and Open email draft then set a new text and left the error style on: "Draft copied" in red, read out as an alert. The text and the tone were two `useState` values. They are one `Notice` value now, set only by `announce()` or `say()` in `studio/components/enquiry-form.tsx`, so the typecheck keeps it from coming back. No wording changed.
- Deployed: production `f4554a91-1dda-4671-9151-44814ce359b9` (`ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes npm run deploy:cf:production`, after `gate.py run --full` on `f2f9398`). Previous version `b271c8e3-a0cb-4e69-a769-113d345c249e`.
- Found by the studio's survey of implicit state machines (studio-os `departments/engineering/reports/state-machines-2026-11-26.md`, H1), from the studio pipeline thread of 26 Nov (Fable 5.2); supervisor (Haiku): not blocking.

**Decisions (mine)**
- Not done: the survey's wider idea, one reducer for the whole form lifecycle. It would touch every handler of a working production form for no fix beyond this one.

**Open**
- GitHub reports 21 known vulnerabilities in this repo's dependencies on main (3 critical, 3 high). Not looked at here.
- The main checkout's `studio/.env.local` (ignored) still holds a `VERCEL_OIDC_TOKEN` line from before Vercel was retired. Nothing reads it. Delete the file when next in that checkout.

**How to verify**
- https://cavies.studio/contact shows "Send enquiry" and loads Turnstile; `GET /api/enquiry` answers 405. Checked after the deploy, with `/`, `/playable-ads`, `/games/oddly-orderly` and `/privacy` (all 200). No enquiry was sent.
- The fix itself was seen on a local dev server at 1280x900 and 390x844 with `/api/enquiry` answered by a 500 inside the test browser: error after the failed send, then a normal polite notice after Copy draft.

**Disk:** removed the worktree `cavies-homepage-wt-notice` with its `node_modules`, `.next` and `out` (about 1 GB). Left: nothing.

## Enquiry form sends through Cloudflare Email Sending; Gmail token removed: 25 November 2026

**What shipped**
- Meow agreed (25 Nov 2026) to move the form off the Gmail API onto Cloudflare Email Sending, which Workers Free may use for free to the account's verified destination addresses. PR #47 (`2470e82`): the Worker hands the notification to its `send_email` binding `EMAIL` (from `Cavies website <contact@cavies.studio>`, to tin@cavies.studio, Reply-To the visitor), held to that sender and recipient in both wrangler configs. Turnstile, origins, rate limits and the messages are unchanged. Setup errors (sender or recipient not verified, malformed message) answer 503 "temporarily unavailable"; Email Sending throttling 429; other failures 502 "couldn't confirm". Only the binding's error code is logged. `scripts/authorize-gmail.mjs` removed.
- Privacy policy version 3, effective 25 November 2026 (Meow approved the wording in the thread): Cloudflare sends the enquiry on to our Google mailbox. Dated copy `docs/legal/privacy-policy-2026-11-25.md`.
- Cloudflare, by CLI: `cavies.studio` onboarded as a sending domain (`cf email-sending subdomains create`); five new records, all under `cf-bounce` (three MX, SPF TXT, DKIM TXT on `cf-bounce._domainkey`). Apex MX, SPF, Google DKIM and DMARC (`p=none`) untouched (before and after snapshots diffed). `tin@cavies.studio` added as the account's verified destination address (verify link clicked in the studio browser).
- Deployed: production `e0980f8c-cdbb-47e7-8dbc-0c187d3c93b8` (`ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes npm run deploy:cf:production`, after `gate.py run --full` on `2470e82`). Previous version `89f76a38-6629-4cba-9f22-9acd1eecb4ea`. Deleting the three secrets made version `b271c8e3-a0cb-4e69-a769-113d345c249e` (same code).
- After the test enquiry arrived: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `GMAIL_REFRESH_TOKEN` deleted from `cavies-studio`, and the Gmail grant "Cavies Studio Enquiries" removed from tin@'s Google account (linked apps). Nothing else used that OAuth client (searched the workspace, `tools/outreach` uses the Gmail connector, `tools/invoicing` Apps Script).

**Test send (Meow approved it in the thread)**
- One enquiry on https://cavies.studio/contact, name "Cavies test (agent)", email contact@cavies.studio, service "Not sure yet". Meow ticked Turnstile and pressed Send. It reached tin@'s Inbox (Primary) at 16:44:54 UTC: From `Cavies website <contact@cavies.studio>`, Reply-To `contact@cavies.studio` (the address typed in the form), Return-Path `bounces@cf-bounce.cavies.studio`, SPF, DKIM (`cavies.studio`, selector `cf-bounce`) and DMARC pass.

**Decisions (mine)**
- Tested on production, not the test Worker: the test Worker would need its own secrets and the workers.dev hostname put back on the Turnstile widget. Rollback was one `wrangler rollback` while the Google secrets existed.
- The test Worker carries the same `EMAIL` binding; it sends nothing while `ENQUIRY_DELIVERY_ENABLED` is unset there.

**Mistake, fixed**
- I ran `npm run deploy:cf:xyz` from a checkout made before PR #46, which had removed that script and deleted the `cavies-xyz` Worker. It re-created the Worker (version `79c6a3b9`) for about 5 minutes; visitors still got the 308 because the Redirect Rule runs first. I deleted it again with `wrangler delete --name cavies-xyz`. Not checked by listing: that its `cavies.xyz/*` route went with it (deleting a Worker removes its routes; both cavies.xyz hosts answer 308 to cavies.studio).

**Open**
- The workerd ledger test failed once in the first gate run (all six requests 429), then passed on the three runs after. It reuses persisted Durable Object state and picks one of 200 random IP ranges per run; if it fails again, give it a fresh state directory per run.
- The Google Cloud project `cavies-studio-enquiries` and its OAuth client still exist, unused. Delete them if wanted (Meow's call; costs nothing).

**How to verify**
- `cf email-sending subdomains preview -z cavies.studio --name cavies.studio` has an empty `errors` list; `cf email-routing addresses list` shows tin@cavies.studio verified.
- `SITE_TEST_URL=https://cavies.studio npm run test:smoke` passed 24 of 24 after the deploy; `/privacy` shows "Version 3. Effective 25 November 2026."
- A POST with the right origin and a broken body answers 400 (endpoint configured), not 503.

**Disk**: removed `studio/node_modules`, `studio/out`, `.next`, `public/_img` and `.wrangler` from the worktree `cavies-homepage-wt-email`, then the worktree itself. DNS snapshots (about 20 KB) are in `review/email-sending-2026-11-25/` in the Cavies Studio workspace.

---

## cavies.xyz redirects to cavies.studio again: 25 November 2026

**What shipped**
- Meow said (25 Nov 2026) the AWS Activate credit has arrived and asked for cavies.xyz to redirect to cavies.studio again, undoing the 17 November change.
- The cavies.xyz zone's Redirect Rule (ref `cavies_xyz_to_cavies_studio`) matches `cavies.xyz` and `www.cavies.xyz` again and sends both to `https://cavies.studio` (308, path and query kept). Changed with `cf rulesets rules update`.
- The assets-only Worker `cavies-xyz` and its route `cavies.xyz/*` are deleted (`wrangler delete`), after the rule was live and checked.
- Repo: `studio/wrangler.xyz.jsonc`, the `deploy:cf:xyz` script and the `xyz` mode of `studio/scripts/deploy-cf.mjs` are removed. `CLAUDE.md`, `studio/README.md`, `studio/docs/seo.md`, `studio/docs/cloudflare-workers.md` and the comment in `studio/public/_redirects` describe the redirect.
- No DNS record changed. cavies.studio was not deployed or touched.

**Decisions (mine)**
- Deleted the Worker instead of leaving it without traffic: the rule runs before it, so it could never answer, and a stale copy of the site is one more thing to drift.
- The docs say the redirects are Cloudflare Redirect Rules, not the text from before 17 November, which still named the retired `redirect/` Worker.

**Open items**
- None for cavies.xyz. Nobody needs to run `deploy:cf:xyz` any more; it no longer exists.
- Still stale from before: `studio/redirect/` (retired Worker), the `deploy:cf:redirect` script, three lines in `studio/docs/cloudflare-workers.md` (11, 23, 51) that describe that Worker as live, and the smoke test that imports it.

**How to verify**
- `curl -I https://cavies.xyz/` and `curl -I "https://www.cavies.xyz/contact?a=1"` are 308 to the same path and query on `https://cavies.studio`.
- Checked after the change: cavies.xyz (https and http), a path with a query on both hosts, cavies.studio 200, www.cavies.studio 308, playables.cavies.xyz 200. Not checked: Search Console (the 308 is the signal it needs; nothing to do there).

**Disk**
- Nothing new kept. The worktree `cavies-homepage-wt-cf` keeps its `studio/node_modules` and `studio/out` from earlier threads.

## Gate setup step: 25 November 2026

**What shipped** (branch `chore/gate-setup`; tooling only; no page change, nothing deployed)
- `gate.toml`: `[gate] setup = "cd studio && { [ node_modules/.package-lock.json -nt package-lock.json ] || npm ci; }"`. The gate runs it once before the first check of a push, so a fresh worktree needs no hand-made install and a stale `node_modules` cannot decide a check. `npm ci` rewrites `node_modules/.package-lock.json`, so a second run finds it newer and does nothing.
  - Fresh checkout: `npm ci`, 35 to 49 s (two runs). Nothing changed: 0.03 s.
- `lint` is marked `beside = true`: eslint ignores everything the build writes (`.next`, `out`, `public/_img`, `next-env.d.ts`) and writes no file.
- `types` stays in the ordered lane: `tsconfig.json` includes `.next/types`, which the build writes, and `tsc` writes `tsconfig.tsbuildinfo`.
- `CLAUDE.md`: the verify line says to check with `python ~/.cavies/gate.py run`, never the npm scripts by hand.
- The weekly review's `python ~/.cavies/gate.py audit` no longer skips this repo.

**Decisions**
- Meow, 25 Nov 2026: add `setup` to this repo's `gate.toml` (asked in the studio-os gate review).
- Mine: only `lint` runs beside. `types`, `build` and the workerd test share `.next` or `out`, or start servers; the enquiry and scope tests are quick and I left them in the ordered lane.

**Open items**
- None.

**How to verify**
- `python ~/.cavies/gate.py audit --ref HEAD` from this repo. On 25 Nov 2026 it exited 0 for commit `7b6bc06` (all five checks fresh, 26 min, most of it waiting in the job slots), and `gate.py run` then read `same` for all five.

**Disk**
- The worktree `cavies-homepage-wt-gate` and its `studio/node_modules` (682 MB) are removed after the merge. The audit's own checkout was removed by the gate.

---

## The studio pre-push gate: 25 November 2026

**What shipped** (branch `chore/studio-gate`; tooling and one test only; no page change, nothing deployed)
- `gate.toml` and `lefthook.yml` (repo root): `git push` now runs the studio gate (studio-os `ops/machine/GATE.md`).
  - Five checks, run from `studio/`, together the verify gate: lint, types, build, the enquiry and scope tests, and the workerd test.
  - All of them skip a push that changes only Markdown or a docs folder.
  - A check that already passed on the same files reads `same`.
- `studio/tests/workerd.test.mjs`: the worker, stub and inspector ports now come from the gate's free block (`CAVIES_GATE_PORT_BASE`; 3101 to 3103 by hand). The stub's address goes to `wrangler dev` with `--var`. So two checkouts never collide on 3101 and 3102.
- `never_skip` (every check runs):
  - the gate's files, the npm, TypeScript, eslint and Next configs, and every `wrangler*.jsonc`;
  - `studio/worker/` (the enquiry endpoint and its rate-limit ledger), `studio/lib/enquiry.ts`, `studio/lib/contact.ts` and the privacy pages' sources;
  - the build, deploy and Gmail-authorise scripts, and `studio/redirect/`.
- `CLAUDE.md`: the commands say the push runs the gate, and that `lefthook install` sets it up once per clone.

**Decisions**
- Meow, 25 Nov 2026: one pre-push gate for every studio repo (studio-os `DECISIONS.md`).
- Mine: the docs folders skip every check. Code, tests and the build name them only in comments.

**Open items**
- None.

**How to verify**
- `python ~/.cavies/gate.py plan`. Or push a Markdown-only change and read the hook's lines.
- `CAVIES_GATE_PORT_BASE=20160 npm run test:workerd` from `studio/` runs the five workerd tests on other ports.

**Disk**
- Removed: this worktree's `studio/node_modules` and build output.
- Left: the worktree itself, for the daily sweep once merged.

---

## Correction: Cloudflare Web Analytics is off for cavies.studio: 25 November 2026

**What changed**
- The entry below this one (Tide Jars deploy) says automatic injection was turned off with `--auto-install=false` and that the beacon still loaded. That was right about the symptom but not the fix. `auto_install=false` alone left the zone's Web Analytics ruleset enabled and the beacon (`static.cloudflareinsights.com/beacon.min.js`) was still injected; the update also reset the site's `lite` flag from `true` to `false` (a PUT replaces the fields it is not given).
- The lead then set the site to `auto_install: true`, `enabled: false`, `lite: true` (account Dev@cavies.xyz, site tag `967c0d32...`): `cf rum site-info update <site-id> --auto-install=true --enabled=false --lite=true`. A compressed fetch with a browser User-Agent (`curl -sL --compressed -H "User-Agent: Mozilla/5.0 Chrome/130" -H "Accept: text/html" "https://cavies.studio/contact?x=$RANDOM"`) now finds no `cloudflareinsights` on `/contact` and `/playable-ads` (25 Nov, about 20:00 UTC). The first check of that day used curl without `--compressed`, so its "0 matches" was meaningless; do not trust a curl that does not decompress.
- Why: the published privacy policy (`studio/lib/studio-privacy.ts`) says the site has no analytics. The site had been created in Web Analytics on 22 Oct with automatic injection on.

**Decisions**
- Meow, 25 Nov 2026: "what do you recommend? will follow your recommendations" (the lead recommended turning it off).

**Open items**
- To turn it back on: `cf rum site-info update <site-id> --auto-install=true --enabled=true --lite=true`, and update the privacy policy first.
- Other zones in that Cloudflare account (other products) have their own Web Analytics sites with automatic injection on; not touched here.

**How to verify**
- The curl above, and `cf rum site-info list --per-page 50` with `CLOUDFLARE_ACCOUNT_ID` set to the Dev@cavies.xyz account: `auto_install: true`, `enabled: false`, `lite: true` for cavies.studio.

**Disk**
- Nothing made.

## Deploy: Tide Jars replaces Cavy Conga on /playable-ads: 25 November 2026

**What shipped**
- PR #41 merged as `a944b9c`: the third demo on `/playable-ads` is now Tide Jars (Puzzle) in place of Cavy Conga. Order: Rise & Squeeze, Lantern Burst, Tide Jars. `studio/lib/playable-ads.ts` (new entry, sea-glass poster gradient, no art), `studio/public/playable-ads/demos/tide-jars/index.html` (the `generic` build, 178,384 bytes, sha256 `bd304a50baa2b1a6a12194d33e6ebaed56725deb45674faefee35dd173011dee`; game sources at Playables commit `b78d4561`, ad bytes from the Playables PR #327 branch `ads/demo-swap`), `scripts/drop-playable-demos.mjs`, README "Playable ads demos" and the smoke tests. The two other demo files are unchanged. `public/_headers` already covered `/playable-ads/demos/*`. The old `/playable-ads/demos/cavy-conga/` URL now answers 404 (nobody links it).
- Deployed from a detached checkout of `a944b9c`. Production `cavies-studio`: version `89f76a38-6629-4cba-9f22-9acd1eecb4ea` (19:33 UTC), previous `2869cb7a-6e70-4d15-91bb-15e96dda9e5a`. cavies.xyz `cavies-xyz`: version `7776340c-e2d1-43fc-a653-5d0478b040d9` (19:35 UTC), previous `11c2500c-02a8-4ebe-94a8-689a8fa772bc`. Form flags as before (`ENQUIRY_FORM_ENABLED=true`, `ENQUIRY_DELIVERY_VERIFIED=yes` on production only).

**Decision of the lead, 25 Nov 2026**
- Cloudflare Web Analytics' automatic injection was turned OFF for the cavies.studio zone (account Dev@cavies.xyz, site tag `967c0d32...`, `cf rum site-info update <site> --auto-install=false`), because the published privacy policy says the site has no analytics. To turn it back on: the same command with `--auto-install=true`. `cf rum site-info list` (with `CLOUDFLARE_ACCOUNT_ID` set) shows `auto_install: false` for cavies.studio.

**Gate and smoke, as they ran**
- Before the merge: `lint`, `typecheck`, `build` clean; `test:enquiry` 43 of 43; `test:scope` 4 of 4; `test:workerd` 5 of 5; `build:cf`, `wrangler dev` on port 3161, `test:smoke` 24 of 24 (the old demo URL 404s locally too).
- Screenshots (not committed; kept in `studio/.tmp/screens/tide-jars/` in the PR worktree), phone 390x844 and desktop 1440x900: the page idle, Tide Jars playing mid-run, its end card, and the page after its button (scrolled to the quote form, focus on the "Ask for a quote." heading). Tide Jars looks right in the frame: both jars and the empty jar visible, the hand hint, nothing hidden by the frame or its rounded corners. The smallest text the game draws is "Moves", 11.6 px at the phone's 322 px frame and 12.7 px at 352 px (measured by hooking `fillText`), so nothing is under 11 px. The end card reads "Tide Jars" and "Learn more".
- Live, cavies.studio and cavies.xyz: `/playable-ads` is 200, `x-frame-options: DENY`, and the page text names Rise & Squeeze, Lantern Burst and Tide Jars (no Cavy Conga), the five networks and "Fixed price, quoted in a day". The three demo folders are 200 with `x-frame-options: SAMEORIGIN`, `x-robots-tag: noindex` and the sandbox CSP, and the served bytes hash to ce0421b3, 2680fd06 and bd304a50 on both domains. `/playable-ads/demos/cavy-conga/` is 404 on both. On cavies.studio: home, `/contact`, `/work/tender`, `sitemap.xml` (lists `/playable-ads`) and `robots.txt` are 200. `SITE_TEST_URL=https://cavies.studio npm run test:smoke`: 24 of 24. `SITE_TEST_URL=https://cavies.xyz npm run test:smoke`: 23 of 24, the one failure being the enquiry-endpoint test, by design.
- Chrome headless, 390x844 (touch) and 1440x900: on cavies.studio "Tap to play" on Tide Jars starts the real demo (322x702 and 352x765 canvases, drawn, played to the end card, its button scrolls to the quote form); on cavies.xyz the same start, with no console errors and no bad responses. Browser closed. No form was submitted.

**Found, not fixed: the analytics beacon is still injected on cavies.studio**
- With `auto_install: false` already set, a curl with a browser User-Agent (19:36 to 19:42 UTC, cache-busting query strings) still finds `static.cloudflareinsights.com/beacon.min.js` in the HTML of the home page, `/contact`, `/work/tender`, `/playable-ads` and the demo pages on cavies.studio. A browser then asks for `https://cavies.studio/cdn-cgi/rum`, which answers 404 (so no data is being taken in, but the script still loads on the pages and the console shows a 404). cavies.xyz has no beacon. Plain curl (no browser UA) and `sitemap.xml` / `robots.txt` show none, as before. It may be edge propagation lag, or the zone's separate Web Analytics "enabled" ruleset (`enabled: true`, `lite: false` for cavies.studio in `cf rum site-info list`) injecting regardless; I did not change any zone setting. Re-check with: `curl -sL -H "User-Agent: Mozilla/5.0 Chrome/130" -H "Accept: text/html" --compressed https://cavies.studio/contact | grep -c cloudflareinsights` (0 is the goal). Until it is 0 the privacy policy's "no analytics" line is not met on the live pages.
- Other console messages on the page are Turnstile's (a 401 from its challenge call, a blocked `data:` connect) and one "focus-without-user-activation" policy note when the demo's button moves focus to the quote heading; the scroll and focus themselves work.

**Not checked**
- A real phone held upright; a screen reader; the live form's delivery (no enquiry sent); Safari and Firefox; the other two demos played in the live browser (served and hashed only).

**How to roll back**
- From `studio/`: `npx wrangler rollback 2869cb7a-6e70-4d15-91bb-15e96dda9e5a -c wrangler.production.jsonc` and `npx wrangler rollback 11c2500c-02a8-4ebe-94a8-689a8fa772bc -c wrangler.xyz.jsonc`. Not needed.

**Disk**
- Removed `studio/.next`, `out`, `.wrangler`, `node_modules`, `public/_img` and the local wrangler log. Left `studio/.tmp/screens` (untracked, the lead wants it): it now holds only the `tide-jars` folder, 2.7 MB; the `real/` folder of the 24 November screenshots (19 MB) was not there when this thread looked, and nothing here removed it. Left the worktree `cavies-homepage-wt-ads`.

---

## Deploy: /playable-ads live on cavies.studio and cavies.xyz: 24 November 2026

**What was deployed**
- PR #37 merged as `b511162` (squash, `origin/main`). The tree deployed was a detached checkout of exactly that commit, rebuilt with `npm run build:cf`; the three demo files again hashed 5ee6ec69 (Cavy Conga), 2680fd06 (Lantern Burst), ce0421b3 (Rise & Squeeze), and `git archive HEAD studio/public/playable-ads` showed 1,575,160, 1,615,793 and 731,749 bytes.
- Production Worker `cavies-studio`: `ENQUIRY_FORM_ENABLED=true ENQUIRY_DELIVERY_VERIFIED=yes npm run deploy:cf:production`, version `2869cb7a-6e70-4d15-91bb-15e96dda9e5a` (16:17 UTC). Previous: `00925a66-07ba-41e8-82d9-67256401213b`.
- cavies.xyz Worker `cavies-xyz`: `npm run deploy:cf:xyz`, version `11c2500c-02a8-4ebe-94a8-689a8fa772bc` (16:19 UTC). Previous: `05a22ab0-93f4-43d9-8c3c-fe3e0dedf5c9`.

**Gate before the merge (24 Nov, from `studio/` after `npm ci`)**
- `lint`, `typecheck`, `build` clean; `test:enquiry` 43 of 43; `test:scope` 4 of 4; `test:workerd` 5 of 5; `build:cf`, `wrangler dev` on port 3151, `test:smoke` 24 of 24.

**Smoke results as they ran (live)**
- `https://cavies.studio/playable-ads`: 200, `x-frame-options: DENY`; the HTML names Unity Ads, AppLovin, Google App campaigns, TikTok and Meta and says "Fixed price, quoted in a day". `/playable-ads/` answers 308 to `/playable-ads`.
- `/playable-ads/demos/{cavy-conga,lantern-burst,rise-squeeze}/`: 200, `x-frame-options: SAMEORIGIN`, `x-robots-tag: noindex`, the sandbox CSP (`sandbox allow-scripts; default-src 'none'; ... connect-src 'none'`). The bytes served by curl hash to the same first eight characters as the files in the repo, on cavies.studio and cavies.xyz. (`.../index.html` answers 307 to the folder, as for every page.)
- Home, `/contact` (still shows Send enquiry), `/work/tender`, `sitemap.xml` (lists `https://cavies.studio/playable-ads`) and `robots.txt`: all 200.
- `SITE_TEST_URL=https://cavies.studio npm run test:smoke`: 24 of 24 pass (the enquiry-endpoint test passes live).
- `https://cavies.xyz/playable-ads`: 200 with the same text; the demo folder has the same headers. `SITE_TEST_URL=https://cavies.xyz npm run test:smoke`: 23 of 24; the one failure is "the enquiry endpoint is the Worker's", by design (cavies.xyz has no endpoint), as in the 17 November entry.
- Chrome headless (Playwright) against the live page at 390x844 (touch) and 1440x900: page loads (200), "Tap to play Cavy Conga" starts the real demo (a 322x702 and a 352x765 canvas inside the sandboxed frame, drawn: the grove with the conga line, a "Drag anywhere to steer" hint and the Dance button, about 225 distinct colours in the capture). No page errors. Browser closed. The enquiry form was not touched.

**Found, not fixed**
- Console noise, the same on both widths: Cloudflare's Web Analytics beacon (`static.cloudflareinsights.com`) is injected into every HTML response a browser fetches, the demo files included (curl with a browser User-Agent shows it; plain curl does not). The demo's sandbox CSP blocks it ("violates script-src 'unsafe-inline'"), so no request leaves the demo and the demo bytes in the repo are unchanged; the other messages come from the Turnstile widget on the page (a 401 from its challenge call and a blocked `data:` connect). All pre-existing zone behaviour, none from the page's code. If a clean console matters: switch the beacon's automatic setup off for the zone, or add `Cache-Control: no-transform` to the demo folder in `public/_headers` (not tried).

**Not checked**
- The page on a real phone held upright; a screen reader; the form's live delivery (no test enquiry was sent, by instruction); the other demos (Lantern Burst, Rise & Squeeze) played in the live browser session (served and hashed only); Safari or Firefox.

**How to roll back**
- From `studio/`: `npx wrangler rollback 00925a66-07ba-41e8-82d9-67256401213b -c wrangler.production.jsonc` for cavies.studio, and `npx wrangler rollback 05a22ab0-93f4-43d9-8c3c-fe3e0dedf5c9 -c wrangler.xyz.jsonc` for cavies.xyz (or `wrangler versions deploy` with the old id). Rollback was not needed.

**Disk**
- Removed after the checks: `studio/.next`, `studio/out`, `studio/.wrangler`, `studio/node_modules`, `studio/public/_img`, and the local wrangler log. Left: `studio/.tmp/screens` (19 MB, untracked, the lead wants it) and the worktree `cavies-homepage-wt-ads`. Scratch captures of the live check are in the session scratchpad, not the repo.

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

## Tender case no longer links to its site: 24 November 2026

**What shipped**
- Meow took the parked Tender site offline (24 Nov 2026). PR #38 removed `liveLink` and `url` from the Tender case in `studio/lib/additional-projects.ts`; the text and pictures stay, the caption reads "Landing page · Captured while live". README link list and the smoke test (Tender must have no link) updated.
- Deployed after the merge: `npm run deploy:cf:production` (with the form flags as on 14 Nov) and `npm run deploy:cf:xyz`. Production version `00925a66-07ba-41e8-82d9-67256401213b`, cavies.xyz `05a22ab0-93f4-43d9-8c3c-fe3e0dedf5c9` (previous versions are in `wrangler deployments list`).

**How to verify**
- `/work/tender` is 200 on cavies.studio and cavies.xyz and has no tender-by-hyperflow link; `/contact` still shows Send enquiry; `SITE_TEST_URL=https://cavies.studio npm run test:smoke` passes 22 of 22.
- Not verified: a phone-width screenshot (Edge headless cannot go below its minimum window width, so the 390 px capture was cropped).

**Open**: if the Tender site returns, put the link back and revert the smoke test line.

**Disk**: removed the build output (`studio/out`, `.next`, `public/_img`) after the deploy; `node_modules` removed too.

---

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
