# Search and sharing

The primary positioning is website design and frontend engineering for startups and businesses, serving Australia and clients worldwide. This describes the target market, not an Australian office address. Monthly engagements are quoted to scope and budget; do not reinstate old fixed rates or invent case-study budgets. Case-study metadata describes the actual work; visible pages retain concise copy and image galleries.

## Maintained signals

- Canonicals, Open Graph URLs, and the sitemap use `https://cavies.xyz`.
- `www.cavies.xyz` and the stable production Vercel alias redirect with HTTP 308. Preview URLs remain usable and have noindex metadata.
- All 14 public pages have unique search titles/descriptions and matching Open Graph/Twitter metadata. The homepage sharing image is `public/brand/social-card.png`; case studies use their own uncropped source images.
- Organization and WebSite JSON-LD identify Cavies Studio, its logo, contact address, and owner-confirmed LinkedIn profile. Case pages provide BreadcrumbList and WebPage data. Advisory screenshots do not assert Cavies designed the current Ancient8 or Solscan websites.
- The sitemap is generated from the portfolio data and includes all 51 case-study images. No automatically refreshed last-modified timestamps are invented.
- Missing routes return real 404 responses with noindex, without a competing global index directive.
- Structured data is serialized with HTML-safe escaping. No fabricated reviews, ratings, funding totals, addresses, or claims of rich-result eligibility are added.

## Google Search Console

Use the URL-prefix property `https://cavies.xyz/` in the owner's Google account. It covers the canonical homepage and all case studies. The public Google verification meta tag is maintained in `app/page.tsx`; keep it in place after verification. Submit `https://cavies.xyz/sitemap.xml`. A broader DNS domain property is optional; do not authorize new DNS-account integrations solely for verification.

After significant page changes, inspect the homepage in Search Console and request indexing when available. Monitor indexing and query impressions as data becomes available. A sitemap submission and valid structured data do not guarantee indexing, rankings, or special search features.

When adding a project, update `lib/project-seo.ts` alongside its content. The sitemap and galleries derive from existing project data. Keep service prices, public copy, and metadata consistent. Avoid keyword stuffing or adding thin pages solely to target search terms.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
