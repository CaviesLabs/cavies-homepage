# Search and sharing

The primary positioning is website design and frontend engineering for startups and businesses, serving Australia and clients worldwide. This describes the target market, not an Australian office address. Monthly engagements are quoted to scope and budget; do not reinstate old fixed rates or invent case-study budgets. Case-study metadata describes the actual work; visible pages retain concise copy and image galleries.

## Maintained signals

- Canonicals, Open Graph URLs, and the sitemap use `https://cavies.studio`.
- `www.cavies.studio`, the former `cavies.xyz` and `www.cavies.xyz` hostnames, and the stable production Vercel alias redirect with HTTP 308, preserving paths and queries. Preview URLs remain usable and have noindex metadata.
- All public pages have unique search titles/descriptions and matching Open Graph/Twitter metadata. The homepage sharing image is `public/brand/social-card.png`; case studies use their own uncropped source images.
- Organization and WebSite JSON-LD identify Cavies Studio, its logo, contact address, and owner-confirmed LinkedIn profile. Case pages provide BreadcrumbList and WebPage data. Advisory screenshots do not assert Cavies designed the current Ancient8 or Solscan websites.
- The sitemap is generated from the portfolio data and includes every case-study hero and gallery image. No automatically refreshed last-modified timestamps are invented.
- Missing routes return real 404 responses with noindex, without a competing global index directive.
- Structured data is serialized with HTML-safe escaping. No fabricated reviews, ratings, funding totals, addresses, or claims of rich-result eligibility are added.

## Google Search Console

Use the URL-prefix property `https://cavies.studio/` in the owner's Google account. It covers the canonical homepage and all case studies. The public Google verification meta tag is maintained in `app/page.tsx`; keep it in place after verification. Submit `https://cavies.studio/sitemap.xml`. The site moved from cavies.xyz on 22 October 2026: keep the old `https://cavies.xyz/` property and run Search Console's Change of Address from it to the new property while the redirects are live. A broader DNS domain property is optional; do not authorize new DNS-account integrations solely for verification.

After significant page changes, inspect the homepage in Search Console and request indexing when available. Monitor indexing and query impressions as data becomes available. A sitemap submission and valid structured data do not guarantee indexing, rankings, or special search features.

When adding a project, update `lib/project-seo.ts` alongside its content. The sitemap and galleries derive from existing project data. Keep service prices, public copy, and metadata consistent. Avoid keyword stuffing or adding thin pages solely to target search terms.

## Business website enquiry path

- `/services/business-websites` is the substantive service page for businesses and service providers in Australia and worldwide. It has its own canonical and social metadata, scope, process, FAQ, and links to the Beigman Engineering case and contact page.
- The homepage separates business websites from startup/product interface work. Seitrace remains product-interface proof; the Beigman case describes website design/build, ongoing maintenance and SEO support without unverified rankings or business results.
- `/contact` prepares an email draft locally and offers copy fallback. It does not send messages or store enquiry text. Do not describe this as a working server-delivered contact form.
- Both new public routes appear in the sitemap. Preserve preview noindex, homepage Google verification, existing portfolio URLs/images, redirects, real 404s and structured-data escaping.

## Oddly Orderly's pages

- `/games/oddly-orderly` (the game), `/games/oddly-orderly/press`, `/games/oddly-orderly/privacy` and `/games/oddly-orderly/support` are public and in the sitemap, the first two with their images. The stores and the game link to these exact URLs; don't move them.
- Each has its own title, description and sharing image through `pageMetadata` (the end card, or the capsule for the press kit).
- The game page describes a `VideoGame` (genre, platforms, screenshots, the trailer as a `VideoObject`) published by the organization. It states no offers, prices, ratings or release date. The subpages carry a breadcrumb and a `WebPage` about the game.
- `steamUrl` in `lib/oddly-orderly.ts` is null until the Steam page is public. Setting it shows the Steam buttons and adds the store page to the game's `sameAs`; the release text ("Coming soon") is separate copy.
- `/games` redirects with HTTP 307 to the homepage's games section (`/#games`), where the navigation's Games item points. It is temporary so a games index can take the URL later.
- The pages use their own contact address, `gameContactEmail` (`lib/contact.ts`), for support, privacy and press.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
