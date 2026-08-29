# Source Standard — SEO Growth Engine

## Audit: what already exists

Good foundation, narrower than what you're asking for.

- **Head metadata**: `PageMeta` already emits title, description, canonical, OG, Twitter, and JSON-LD. Used on ~50 pages. Solid base to build on.
- **Sitemap**: `scripts/generate-sitemap.ts` runs on every dev/build, currently emits **4,366 URLs** — all static routes, 4,179 clinic profiles, greenlist facilities, advisors, and Learn articles. No `lastmod` except Learn articles. No sitemap index (Google's limit is 50k/file, so we're fine on count but the file is large).
- **robots.txt**: open, sitemap declared, two utility routes disallowed. Healthy.
- **Clinic profiles**: `/directory/:slug`, 4,179 records. Most have only name + status + city/state. Rich fields (medicalDirector, clinicalFocus, summary, verified scope) exist in the type but are populated for a small minority. **All 4,179 are currently in the sitemap** — this is the biggest risk in the current setup.
- **Facilities**: `/greenlist/:slug`, ~40 records with genuinely rich regulatory profiles.
- **Articles**: `src/data/learn.ts` — education + news as data, rendered by templates. NewsArticle already has NewsArticle schema. Education articles are folded into guide pages, not standalone.
- **Analytics**: none. No GA, no GSC verification, no query data.
- **Rendering**: pure client-side React SPA. Google renders JS, but it's slower and less reliable than server HTML.

## The two decisions that shape everything

**1. Thin pages.** Publishing 4,179 near-identical "Not Source Standard Verified, no other data" pages is the single most likely way to damage the domain. The fix is an **indexation gate**: a content-sufficiency score per profile. Only profiles clearing the bar get into the sitemap and get `index`; the rest render normally for humans but carry `noindex,follow` and stay out of the sitemap. As data gets filled in, pages graduate automatically.

**2. Server rendering.** Everything below works on the current SPA, but per-page metadata is only visible to crawlers that execute JS. Social previews (LinkedIn, Slack, iMessage) will always show the generic site card. Real server-rendered HTML needs a migration to Lovable's newer TanStack Start template — worth doing at some point for a site whose whole strategy is search, but it's a separate project. I'd build everything below first, on the current stack.

## Phase 1 — Programmatic SEO core

A single `src/seo/` module every entity type feeds into, so new records inherit SEO automatically.

- **`entitySeo.ts`** — one function per entity type (clinic, facility, article, cluster page) returning title, description, canonical, OG, breadcrumb trail, and JSON-LD graph. Adding a clinic means adding a data row, nothing else.
- **Indexation gate (`indexability.ts`)** — scores each clinic on presence of location, category, website, clinical focus, medical director, summary, verification record, facility linkage. Above threshold: indexable + in sitemap. Below: `noindex,follow`, excluded from sitemap, still browsable and still internally linked.
- **Per-page overrides** — an optional `seo` block on any record: `{ title?, description?, index? }`. Set it and it wins over the generated value. Covers your manual index/noindex and title/description override requirement without a CMS.
- **Schema graph** — Organization + LocalBusiness (only where address exists), BreadcrumbList on every page, Article/NewsArticle on articles, WebSite + SearchAction sitewide, Pharmacy/MedicalOrganization for facilities. Nothing asserted that isn't in the data.
- **Unknown-data handling** — profiles explicitly render "Not independently verified" / "Not reported to Source Standard" rather than omitting fields silently. That's both honest and unique on-page content.

## Phase 2 — Topic cluster architecture

New hub-and-spoke sections with real content, contextually interlinked:

```
/peptides/                     hub
  /peptides/testing/
  /peptides/purity-testing/
  /peptides/sterility-testing/
  /peptides/endotoxin-testing/
  /peptides/sourcing/
/compounding/                  hub
  /compounding/503a/
  /compounding/503b/
  /compounding/503a-vs-503b/
/clinics/                      -> canonical home for clinic profiles
/facilities/                   -> canonical home for facility profiles
/articles/[slug]/
```

**URL migration**: `/directory/*` and `/greenlist/*` become `/clinics/*` and `/facilities/*`, with permanent-intent redirects from the old paths (client-side `<Navigate replace>` plus canonicals pointing at the new URLs). `/learn/*` stays and `/articles/[slug]` is added as the canonical article path with `/learn/news/*` redirecting. This is worth doing now while the site has little accumulated authority to lose — but say the word if you'd rather keep the existing paths and I'll build the clusters around them instead.

**Article buildout**: the 13 questions you listed, written as full SEO landing pages from the article template — H1/H2/H3 hierarchy, author + publisher, published/updated dates, Article schema, breadcrumbs, related articles, and links out to relevant clinic and facility profiles. Written from what we can actually support; anything uncertain is labeled as such.

**Interlinking engine (`internalLinks.ts`)** — automatic, rule-based, not hand-maintained:
- clinic profile -> its facility, its state index, its category cluster, 3 topically relevant articles, nearby clinics
- facility profile -> clinics sourcing from it, testing articles, 503A/503B cluster pages
- article -> its cluster hub, sibling articles, profiles it names
- cluster hub -> every spoke, plus the directory slices that match

## Phase 3 — Technical SEO pass

Canonical self-reference audit across all routes, duplicate-content review (the `/directory` = `/verified-vendors` alias collapses to one canonical), 404 handling with a proper 404 signal, pagination with `rel` semantics on `/clinics/browse/[n]`, heading-hierarchy audit, image alt coverage, semantic landmarks, route-level code splitting and lazy loading for LCP/CWV, and sitemap split into an index (`sitemap-static`, `sitemap-clinics`, `sitemap-facilities`, `sitemap-articles`) with real `lastmod` only where a page-specific timestamp exists.

## Phase 4 — Measurement and search intelligence

- **Google Search Console**: verify the domain via meta tag and submit the sitemap index through the connector.
- **Google Analytics 4**: measurement ID stored as a secret, loaded sitewide, with SPA route-change page views wired in.
- **Search intelligence dashboard** at `/admin/seo` (auth-gated): a backend function pulls Search Console query, page, and date data on a daily schedule into a Cloud table; the page reads the cache. Views for impressions/clicks/CTR/position by page and by query, branded vs non-branded split (name-match heuristic on "source standard"), which clinic profiles are getting impressions, which clusters are gaining, and a content-gap list of queries where we show up but rank poorly.
- **Indexation report**: how many profiles clear the quality gate, which ones just missed and what field would push them over.

## Technical notes

- All SEO logic lives in `src/seo/`; entity pages call one hook and get everything.
- Sitemap generator reads the same indexability module the pages do, so the sitemap and the robots meta can never disagree.
- GSC data flows through the connector gateway from a backend function only; no tokens in the browser.
- No keyword stuffing, no doorway pages, no generated filler profiles. Volume comes from real records and real articles.

## Suggested sequencing

Phase 1 and the analytics/GSC part of Phase 4 first — that gets the quality gate in place and starts collecting query data while everything else is built. Then Phase 2, then 3, then the dashboard.
