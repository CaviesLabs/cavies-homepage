# Portfolio provenance

Updated 7 October 2026 from the repositories and websites the owner authorized. Images are locally hosted. Private code, credentials, and private user/account data are not published.

| Project       | Source                                                   | Basis of presentation                                                                                                                                                                                                                                           |
| ------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ClaimHQ       | CaviesLabs/claimhq                                       | Original marketing frontend and reward-claim/distribution walkthroughs rendered locally. Public origin was unavailable. Source marketing metrics are not repeated as project outcomes.                                                                          |
| Schlong       | meowttt7/schlong; https://testnet.schlong.xyz            | Actual public-testnet game scene and collectible shop, with wallet disconnected. Testnet status is explicit; no mainnet-availability claims.                                                                                                                    |
| HeavenDash    | CaviesLabs/heavendash                                    | Original dashboard and analytics components rendered locally with synthetic fixtures because public deployments were unavailable. Sample-data banners are embedded in captures and repeated in captions. Values are illustrative, not project results.          |
| brrr          | CaviesLabs/brrr                                          | Original frontend rendered locally. Protocol selection, swap/bridge navigation, and token utility flows. The Trade route requires an unavailable backend, so captures focus on unauthenticated utility surfaces. No backend secrets or wallet connections used. |
| Seitrace      | CaviesLabs/seitrace-frontend; https://seitrace.com       | Cavies-built explorer; AboutUs explicitly credits Cavies. Retired in April 2026 and redeployed at seitrace.com as an archived demo with generated sample data. Captures from that deployment show the homepage, block, transaction, and account views.          |
| Cap Table     | meowttt7/captable                                        | Founder product portfolio: corporate-ladder strategy game. Original pre-launch frontend capture.                                                                                                                                                                |
| 0DTE          | meowttt7/0DTE                                            | Founder product portfolio: expiry-market frontend. Original pre-launch homepage and board captures, with placeholder states identified.                                                                                                                         |
| Pit Finance   | CaviesLabs/pit-app; https://pit.finance                  | Public, logged-out vault overview. No displayed historical figures are claimed as current performance.                                                                                                                                                          |
| Pocket        | CaviesLabs/hamsterpocket-frontend                        | Recurring purchase/strategy frontend. Original banner_seo.png product artwork, labeled as artwork.                                                                                                                                                              |
| LaunchReceipt | meowttt7/launchreceipt; https://launchreceipt.vercel.app | Public scanner/report captures. Read-only research interface; no assertion of complete historical data coverage.                                                                                                                                                |
| Detourist     | meowttt7/Detourist; https://detourist.vercel.app         | Public launch and sample-deal captures. Sample offers are labeled.                                                                                                                                                                                              |

## Beigman Engineering and Reply Guy — 21 September 2026

- **Beigman Engineering:** owner-requested website case study, captured from `https://beigman.com.au/`. Four full-width views show the homepage, project browser, engineering roadmap, and performance-solutions explorer. Motion was temporarily reduced to capture settled interface states. Existing site copy, architectural imagery, and project attributions are source content, not Cavies engineering credentials or independently claimed project outcomes. No enquiry was submitted.
- **Reply Guy:** original frontend from `meowttt7/replyguy` at commit `dd820f19520727771505949fddb59af6ce45433f`, before the later REPLY rebrand. The historical version matches the owner's requested Reply Guy identity and former `replyguy.fun` website. Four local captures show the landing hero, analytics, leaderboard, and reward-flow diagram. All activity, profiles, entries, and reward figures are synthetic and labeled as sample data in both screenshots and captions. No production credentials, accounts, wallets, or data services were used. Private source code and local capture fixtures are outside the published site.

Raw captures and dimensions are recorded in the local `research/screenshots/beigman-replyguy-manifest.json` file. Beigman replaces ClaimHQ in the third showcase position; ClaimHQ is retained as a case study.

## Chat and Chirp — 29 September 2026

- **Chat (`usechat.live`):** original frontend from `meowttt7/tipkick` at commit `02dd205444e539faa7b0b93bfc5885a8ad2b43a3`. The public Vercel deployment was paused at capture time. The fee-flow explanation, complete token-launch form, and documentation were rendered locally without production credentials. A temporary capture adapter leaves resource data unpopulated and labels the screenshots “Portfolio preview · Live data disconnected.” No tokens, payments, streamer profiles, or metrics were fabricated. The fourth image is the repository's original `public/brands/chat-banner-2026.jpg` artwork. No transaction, account connection, or live service change was made.
- **Chirp (`justchirp.xyz`):** four captures from the public website show its landing page, illustrated offline-payment walkthrough, app home, and mobile Receive form. All app views are signed out; balances remain unpopulated. The walkthrough is the site's own labeled illustration, not a completed payment. No account, microphone, wallet, or payment action was used. Repository `meowttt7/chirp` at commit `18ff59e4575a525658d22a33dbde5863f718f7dc` was read only to verify product behavior and source attribution.

Both additions retain the existing four-project showcase and appear in the wider portfolio. Screenshots preserve complete viewport width; longer forms and walkthroughs include the complete relevant interface. Raw sources, capture dimensions, and the local-only Chat adapter are recorded under `research/screenshots/`, outside deployment inputs.

## Seitrace archive — 7 October 2026

- **Seitrace (`seitrace.com`):** the explorer was retired in April 2026. Its original frontend (`CaviesLabs/seitrace-frontend`, PR #672) now runs on the Vercel project `cavies/seitrace` in archive mode: a deterministic sample chain bundled with the frontend replaces the retired indexer, gateway, stats, and account services. A site-wide notice and a “Sample data” tag label every page, real Sei hashes resolve to “Not in this archive”, and sign-in, wallet connections, analytics, and third-party promotions are disabled. Validator, provider, account, and NFT names and all figures are generated samples, not network data or project results.
- Four captures (homepage, block, transaction, and account details) were taken from `https://seitrace.com` at a 1440 px layout width, starting below the site-wide notice; the “Sample data” tag remains visible. They replace the earlier local fixture captures. No wallet, account, or transaction was used. The case study links to the archive.

Capture routes and dimensions are recorded in the local `research/screenshots/seitrace-archive-manifest.json` file.

## Past advisory and collaboration

Ancient8 and Solscan are owner-confirmed past product advisory and collaboration relationships. These have their own section and case-study role labels. Screenshots of the current public websites give context to those organizations; they do not claim Cavies designed or built the current sites.

- Ancient8: https://ancient8.gg/ — current homepage and games directory, captured 8 September 2026 after the owner manually accepted the website's terms dialog.
- Solscan: https://solscan.io/ — current public dashboard, captured 8 September 2026 without signing in.

No fundraising attribution, growth metrics, customer testimonials, or endorsements are invented.

## Expanded case-study galleries — 11 September 2026

Additional images are registered in `lib/project-galleries.ts`. They supplement the original hero and gallery images without changing homepage selections. Each image retains its native aspect ratio and links to the full-resolution file. Narrow details show complete self-contained panels, not partial desktop screenshots.

| Project       | Additional visuals                                                    | Capture basis                                                                                                                                                                                                                          |
| ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Seitrace      | Block details, transaction details, account details                   | Captured from the archived deployment at seitrace.com, with generated sample data labeled in the top bar and captions. Replaces the earlier local fixture captures, including the API overview, which the archive does not include.    |
| ClaimHQ       | Feature illustration grid                                             | Complete original marketing section rendered locally.                                                                                                                                                                                  |
| HeavenDash    | Creator leaderboard and creator portfolio                             | Original components with labeled synthetic creator and pool fixtures; no private account information.                                                                                                                                  |
| brrr          | Single-recipient and batch-transfer setup                             | Complete original logged-out forms. No wallet connection, transfer, or transaction submitted.                                                                                                                                          |
| 0DTE          | Round/settlement timeline and editorial interface                     | Original pre-launch frontend. Pending auction and empty account screens were omitted.                                                                                                                                                  |
| Cap Table     | Coinflip terminal and upgrade flow                                    | Original pre-launch frontend with disconnected wallet. Unconfigured hiring screen was omitted.                                                                                                                                         |
| Schlong       | Collectible artwork                                                   | Original `apps/web/public/dongle-assets/collection/11/item/5.png`. The public testnet is now unavailable; existing earlier testnet captures are retained. Repetitive room artwork and empty account views were omitted.                |
| Pit Finance   | Product homepage, complete vault detail, strategy configuration panel | Public logged-out site at `pit.finance`, including the WETH vault and Core Mode configuration. The adjacent unavailable optimizer is outside the standalone panel capture. Values are point-in-time site content, not Cavies outcomes. |
| Pocket        | Product homepage, token-pair selection, daily scheduling              | Original frontend rendered locally with labeled synthetic statistics and token fixtures because the public origin no longer resolves. No wallet, private history, or deposit flow was used.                                            |
| LaunchReceipt | Creator preflight and API reference                                   | Original frontend rendered locally because the public deployment was paused. Preflight inputs are labeled examples and were not submitted.                                                                                             |
| Detourist     | Complete preference onboarding and value-score explanation            | Public prototype and illustrative marketing example. Empty live deal feed was omitted.                                                                                                                                                 |
| Ancient8      | App directory, ecosystem map, community section                       | Current public site; context for past advisory work only. Existing Chrome session retained the owner's prior terms acceptance. Community images do not imply Cavies attended those events.                                             |
| Solscan       | Token leaderboard, token chart, DeFi analytics                        | Current public site; context for past advisory work only. All twenty displayed leaderboard rows and the complete selected chart are preserved.                                                                                         |

Raw captures, exact routes, and per-image notes are stored in the local `research/screenshots/*-gallery-manifest.json` files outside the deployment. Original capture sources were inspected before WebP optimization. Shorter galleries are intentional when further available images are repetitive or incomplete.

## Removed examples

- SeiSpace was removed at the owner's request because the available logo-only visual did not demonstrate interface work. Its former case-study URL redirects to the work section.
- CyBall was removed after a bounded archive search: cyball.com led to a blank lander, the documentation origin was unavailable during the direct check, and the strongest archived portfolio candidate returned 404. Search snippets alone were not used as a visual case study.

## Asset handling

- Cavies mark and cavy illustration: original cavies-homepage assets.
- Product images: authorized screenshots/original artwork, optimized as WebP without changing the depicted UI.
- HeavenDash's temporary sample adapters and dependency-only fixes for local research remain outside the published repository.
- Manrope and DM Serif Display fonts use the Fontsource packages and their bundled licenses; interface icons use Lucide React.
- Source clones, raw screenshots, exact capture notes, and research findings remain in the local research directory, outside deployment inputs.
