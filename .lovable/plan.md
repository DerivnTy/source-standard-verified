## Goal

Restructure `/learn` around **four comprehensive guides** instead of a category listing plus twelve individual articles. Each topic opens directly into one long, well‑structured guide with an in‑page table of contents. The intermediate `/learn/education` listing and the twelve `/learn/education/:slug` article pages are retired.

## New information architecture

```text
/learn                                       Learn landing (unchanged shell)
  ├─ /learn/learn-the-basics                 Learn the Basics — guide
  ├─ /learn/verification                     Verification Guide
  ├─ /learn/choosing-a-provider              Provider Guide
  ├─ /learn/sourcing-and-manufacturing       Sourcing Guide
  ├─ /learn/news                             News & Insights (unchanged)
  ├─ /learn/news/:slug                       News article (unchanged)
  └─ /learn/faq                              FAQ (unchanged)
```

No more `/learn/education` and no more `/learn/education/:slug`.

## Guide composition (content is preserved, not rewritten)

Each guide is assembled from the existing `EDUCATION_ARTICLES` records that share its `topic`. Each article becomes one **section** inside the guide, with the article's `question` as the section heading and its existing `sections[]` body rendered underneath. Nothing is discarded; only navigation changes.

- **Learn the Basics** — sections: What Is a Compounded Medication?, What Are Peptides? (plus a short intro para).
- **Verification Guide** — sections: What Does Verified Mean?, What Happens During a Verification Review?, What Does Greenlisted Mean?, Why Do Facility Records Matter?
- **Provider Guide** — sections: How Do I Know If a Provider Is Trustworthy?, What Should I Ask My Provider?, What Information Should a Transparent Provider Share?
- **Sourcing Guide** — sections: What Is a 503A Pharmacy?, What Is a 503B Outsourcing Facility?, Who Manufactures Compounded Medications?, Compounded vs FDA-Approved, Why Does Sourcing Matter?, What Is Sterile Compounding?, How Do I Read a Certificate of Analysis?, What Is Compounded Hormone Therapy?

Each section keeps a stable anchor equal to the current article slug (e.g. `#what-does-verified-mean`) so external links and search results still land in the right place.

## Page structure for `/learn/:topicId`

- `PageMeta` with per-guide title / description / JSON-LD (`Article` schema for the guide plus one `FAQPage` entity aggregating all section questions).
- `LearnShell` breadcrumbs: `Learn > {Guide Title}`.
- `BriefingHero` (`tone="navy"`, `variant="chapter"`) with guide title + one-line description from `EDUCATION_TOPICS`.
- **In-page table of contents**: an editorial hairline `<nav>` listing each section title. Clicking a TOC row uses the existing `useHashScroll` behavior (center-aligned smooth scroll). Sticky on desktop (`lg:sticky lg:top-24`), inline card at the top on mobile — no drawer, no modal, matching the site's in‑place interaction rule.
- Long-form body: for each section render `<section id={slug}>` with an `<h2>` (question), followed by the article's short answer as a lead paragraph, then its `sections[]` rendered through the existing `ArticleSection` prose styles. Renders as one continuous editorial document.
- `KeyTakeaway` (per section, optional) → dropped in favor of a single guide-level takeaway at the end using the topic description.
- `ContinueLearning` at the bottom, excluding the current guide path.

## Files changed

**New**
- `src/pages/LearnGuide.tsx` — resolves `:topicId` against `EDUCATION_TOPICS`, 404-redirects to `/learn` when unknown, renders the guide via a new template.
- `src/components/learn/LearnGuideTemplate.tsx` — the shell + hero + TOC + section renderer described above.
- `src/components/learn/GuideTOC.tsx` — sticky/inline table-of-contents component (semantic `<nav aria-label="On this page">`).

**Edited**
- `src/App.tsx`
  - Replace the `/learn/education` + `/learn/education/:slug` routes with `/learn/:topicId` → `<LearnGuide />`.
  - Extend `LEARN_REDIRECTS` (client-side `<Navigate replace>` entries the app already generates from this map):
    - `/learn/education` → `/learn`
    - `/learn/education#learn-the-basics` → `/learn/learn-the-basics`
    - `/learn/education#verification` → `/learn/verification`
    - `/learn/education#choosing-a-provider` → `/learn/choosing-a-provider`
    - `/learn/education#sourcing-and-manufacturing` → `/learn/sourcing-and-manufacturing`
    - For each of the 12 `/learn/education/:slug` articles → the correct guide URL plus `#slug` anchor (e.g. `/learn/education/what-does-verified-mean` → `/learn/verification#what-does-verified-mean`).
  - Update the existing `/library/*` and `/education/*` legacy redirects that currently point at `/learn/education/...` so they now target the corresponding guide URL + anchor.
- `src/pages/Learn.tsx` — "Start Here" list links change from `/learn/education#${topic.id}` to `/learn/${topic.id}`. Remove the "Education" NavCard from the "Browse by Resource" section (education no longer has a landing page); keep "News & Insights" and "FAQ".
- `src/config/navigation.ts` — remove `ROUTES.education`; where it appears in header/footer link groups, drop it. UtilityHeader link map updated accordingly.
- `src/components/UtilityHeader.tsx` and any nav that surfaces "Education" — remove the entry.
- `src/components/learn/ContinueLearning.tsx` — replace any "Browse Education" card with links to the four guides (or the Learn hub, depending on current copy).
- `src/data/learn.ts`
  - Add helper `EDUCATION_GUIDES = EDUCATION_TOPICS.map(t => ({ ...t, articles: educationArticlesByTopic(t.id) }))` and a per-topic `guideIntro` map (one short paragraph per guide, drawn from existing topic descriptions).
  - Remove the `NextStepId` / `NEXT_STEPS` entry `learn-education` (no longer a real page) and any references; replace call sites with `learn-news` or `contact` as appropriate.
- `public/sitemap.xml` — remove the 12 `/learn/education/*` article URLs and the `/learn/education` listing; add `/learn/learn-the-basics`, `/learn/verification`, `/learn/choosing-a-provider`, `/learn/sourcing-and-manufacturing`.

**Deleted**
- `src/pages/LearnEducation.tsx`
- `src/pages/LearnEducationArticle.tsx`
- `src/components/learn/CategoryHeader.tsx` (only used by the retired listing).
- `src/components/learn/ArticleCard.tsx` if no other page consumes it after the change (verified before deletion).
- The `EducationArticleTemplate` export inside `src/components/learn/LearnArticleTemplate.tsx`; the file is kept for `NewsArticleTemplate`, which is still in use.

Article records themselves stay in `learn.ts` as the content source for the guides — they just no longer render as standalone pages.

## SEO handling

- Guide pages get fresh titles/descriptions in `PageMeta` (e.g. "Verification Guide — Source Standard").
- Each guide emits an `Article` JSON-LD plus a `FAQPage` JSON-LD whose `mainEntity` array covers every section question, so the twelve consumer questions still show up in structured data.
- Client-side 301-equivalent redirects (`<Navigate replace>`) preserve inbound links; anchors carry through because `useHashScroll` centers on the section on mount.
- `sitemap.xml` updated in the same commit to avoid stranded URLs.

## Verification

1. `/learn` — clicking each of the four "Start Here" rows lands directly on the corresponding guide (no intermediate category page).
2. `/learn/verification` (and each other guide) — hero, sticky TOC, all sections render in order, hairline dividers between them, no cards.
3. Deep link `/learn/verification#what-does-greenlisted-mean` — page loads, section scrolls to viewport center.
4. Every retired URL redirects:
   - `/learn/education` → `/learn`
   - `/learn/education/what-does-verified-mean` → `/learn/verification#what-does-verified-mean`
   - `/library/clinical` → `/learn/verification`
5. Header, footer, breadcrumbs, and `ContinueLearning` no longer expose "Education" as a destination.
6. Build passes; no dead imports.

## Out of scope

- News (`/learn/news`, `/learn/news/:slug`) and FAQ (`/learn/faq`) are unchanged.
- No visual/token changes to hero, section padding, or typography — this is pure IA plus a new guide template built from existing components.
- No new content is written; guides are composed from existing article copy.
