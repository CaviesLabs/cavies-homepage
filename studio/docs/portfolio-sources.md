# Portfolio provenance

Updated 11 September 2026 from the repositories and websites the owner authorized. Images are locally hosted. Private code, credentials, and private user/account data are not published.

| Project       | Source                                                   | Basis of presentation                                                                                                                                                                                                                                           |
| ------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ClaimHQ       | CaviesLabs/claimhq                                       | Original marketing frontend and reward-claim/distribution walkthroughs rendered locally. Public origin was unavailable. Source marketing metrics are not repeated as project outcomes.                                                                          |
| Schlong       | meowttt7/schlong; https://testnet.schlong.xyz            | Actual public-testnet game scene and collectible shop, with wallet disconnected. Testnet status is explicit; no mainnet-availability claims.                                                                                                                    |
| HeavenDash    | CaviesLabs/heavendash                                    | Original dashboard and analytics components rendered locally with synthetic fixtures because public deployments were unavailable. Sample-data banners are embedded in captures and repeated in captions. Values are illustrative, not project results.          |
| brrr          | CaviesLabs/brrr                                          | Original frontend rendered locally. Protocol selection, swap/bridge navigation, and token utility flows. The Trade route requires an unavailable backend, so captures focus on unauthenticated utility surfaces. No backend secrets or wallet connections used. |
| Seitrace      | CaviesLabs/seitrace-frontend                             | Cavies-built explorer; AboutUs explicitly credits Cavies. Original explorer homepage rendered locally with labeled sample data because the live origin was unavailable. Shows search, network stats, chart, blocks, and transactions.                           |
| Cap Table     | meowttt7/captable                                        | Founder product portfolio: corporate-ladder strategy game. Original pre-launch frontend capture.                                                                                                                                                                |
| 0DTE          | meowttt7/0DTE                                            | Founder product portfolio: expiry-market frontend. Original pre-launch homepage and board captures, with placeholder states identified.                                                                                                                         |
| Pit Finance   | CaviesLabs/pit-app; https://pit.finance                  | Public, logged-out vault overview. No displayed historical figures are claimed as current performance.                                                                                                                                                          |
| Pocket        | CaviesLabs/hamsterpocket-frontend                        | Recurring purchase/strategy frontend. Original banner_seo.png product artwork, labeled as artwork.                                                                                                                                                              |
| LaunchReceipt | meowttt7/launchreceipt; https://launchreceipt.vercel.app | Public scanner/report captures. Read-only research interface; no assertion of complete historical data coverage.                                                                                                                                                |
| Detourist     | meowttt7/Detourist; https://detourist.vercel.app         | Public launch and sample-deal captures. Sample offers are labeled.                                                                                                                                                                                              |

## Past advisory and collaboration

Ancient8 and Solscan are owner-confirmed past product advisory and collaboration relationships. These have their own section and case-study role labels. Screenshots of the current public websites give context to those organizations; they do not claim Cavies designed or built the current sites.

- Ancient8: https://ancient8.gg/ — current homepage and games directory, captured 8 September 2026 after the owner manually accepted the website's terms dialog.
- Solscan: https://solscan.io/ — current public dashboard, captured 8 September 2026 without signing in.

No fundraising attribution, growth metrics, customer testimonials, or endorsements are invented.

## Expanded case-study galleries — 11 September 2026

Additional images are registered in `lib/project-galleries.ts`. They supplement the original hero and gallery images without changing homepage selections. Each image retains its native aspect ratio and links to the full-resolution file. Narrow details show complete self-contained panels, not partial desktop screenshots.

| Project | Additional visuals | Capture basis |
| --- | --- | --- |
| Seitrace | Block details, transaction details, API overview | Original `BlockDetails`, `TxDetails`, and `Insights` components rendered in the original app shell, with labeled local fixtures. The offline capture harness avoids the unavailable legacy route metadata service. Account-dependent API pricing was outside the captured overview. |
| ClaimHQ | Feature illustration grid | Complete original marketing section rendered locally. |
| HeavenDash | Creator leaderboard and creator portfolio | Original components with labeled synthetic creator and pool fixtures; no private account information. |
| brrr | Single-recipient and batch-transfer setup | Complete original logged-out forms. No wallet connection, transfer, or transaction submitted. |
| 0DTE | Round/settlement timeline and editorial interface | Original pre-launch frontend. Pending auction and empty account screens were omitted. |
| Cap Table | Coinflip terminal and upgrade flow | Original pre-launch frontend with disconnected wallet. Unconfigured hiring screen was omitted. |
| Schlong | Collectible artwork | Original `apps/web/public/dongle-assets/collection/11/item/5.png`. The public testnet is now unavailable; existing earlier testnet captures are retained. Repetitive room artwork and empty account views were omitted. |
| Pit Finance | Product homepage, complete vault detail, strategy configuration panel | Public logged-out site at `pit.finance`, including the WETH vault and Core Mode configuration. The adjacent unavailable optimizer is outside the standalone panel capture. Values are point-in-time site content, not Cavies outcomes. |
| Pocket | Product homepage, token-pair selection, daily scheduling | Original frontend rendered locally with labeled synthetic statistics and token fixtures because the public origin no longer resolves. No wallet, private history, or deposit flow was used. |
| LaunchReceipt | Creator preflight and API reference | Original frontend rendered locally because the public deployment was paused. Preflight inputs are labeled examples and were not submitted. |
| Detourist | Complete preference onboarding and value-score explanation | Public prototype and illustrative marketing example. Empty live deal feed was omitted. |
| Ancient8 | App directory, ecosystem map, community section | Current public site; context for past advisory work only. Existing Chrome session retained the owner's prior terms acceptance. Community images do not imply Cavies attended those events. |
| Solscan | Token leaderboard, token chart, DeFi analytics | Current public site; context for past advisory work only. All twenty displayed leaderboard rows and the complete selected chart are preserved. |

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
