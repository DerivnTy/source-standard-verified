
# Phase 1 — Learn: Education + News & Insights

Two content engines under one Learn parent. Different purposes, different templates, different rhythms — but one coherent system.

**Learn**
- **Education** — Evergreen knowledge. Built to rank for years.
- **News & Insights** — Timely publication. Built to bring people back.

---

## Information architecture

```text
/learn                              Learn hub (routes to both engines)
│
├── /learn/education                Education hub
│   ├── Basics
│   ├── Choosing a Provider
│   ├── Verification
│   └── Sourcing & Manufacturing
│   └── /learn/education/:slug      Article
│
└── /learn/news                     News & Insights hub
    ├── Industry News
    ├── Regulatory Updates
    ├── Scientific Research
    ├── Source Standard Updates
    └── Editorial / Analysis
    └── /learn/news/:slug           Post
```

Existing `/education/*` and `/library/*` routes are consolidated into this structure via the migration map (Step 0). Every retired route gets a 301 to its new home.

---

## Step 0 — Pre-Implementation Audit (deliverable, ships first)

Before any new routes are created:

**0.1 Inventory** every existing page under `/education/*` and `/library/*` (excluding the four `/library/faq/*` pages finalized in Tier D — out of scope).

**0.2 Classify each page** by engine and topic:
- Education → Basics / Choosing a Provider / Verification / Sourcing & Manufacturing
- News & Insights → Industry News / Regulatory Updates / Scientific Research / Source Standard Updates / Editorial · Analysis

Rule of thumb: if the title answers a timeless question, it's Education. If it reports or interprets something that happened, it's News & Insights.

**0.3 Disposition** each page as:
- **Retain & rewrite** into the new template
- **Merge** into another article (specify target)
- **Retire** (specify 301 target)
- **Move** (specify new slug)

**0.4 Gap analysis** — list evergreen questions with no existing counterpart that must be authored new (e.g., "What is a 503A pharmacy?", "How do I know if a provider is trustworthy?").

**0.5 Migration map** — one table:

```text
Existing route                                            → Engine       → Disposition       → New route
/library/what-are-peptides                                → Education    → Retain & rewrite  → /learn/education/what-are-peptides
/library/what-is-compounding                              → Education    → Retain & rewrite  → /learn/education/what-is-a-compounded-medication
/library/analysis/meaning-of-verification                 → Education    → Merge             → /learn/education/what-does-verified-mean
/library/analysis/2026-reclassification                   → News         → Retain & rewrite  → /learn/news/2026-compounding-reclassification
/education/basics                                         → —            → Retire            → 301 → /learn/education#basics
/education/guides                                         → —            → Retire            → 301 → /learn/education
/education/questions                                      → —            → Retire            → 301 → /learn/education
(new)                                                     → Education    → Create            → /learn/education/what-is-a-503b-pharmacy
...
```

**No new `/learn/*` routes are created until you approve the map.**

---

## Step 1 — Learn hub + two engine hubs

- `/learn` — parent hub with two clearly separated entry points and short framing for each.
- `/learn/education` — grouped by the four topics, question-first titles, template-driven.
- `/learn/news` — reverse-chronological feed grouped by category, dateline-first.

Layout, typography, and controls match the existing site (search, filter pills, `w-wide`, `BriefingHero`, `ArticleRow`, etc.).

## Step 2 — Two reusable templates

**Education article template** (evergreen):
1. Question headline
2. What this answers (one sentence)
3. Short answer (2–3 sentences)
4. Detailed explanation
5. Related questions
6. Related Source Standard resources

**News & Insights post template** (timely):
1. Dateline + category
2. Headline
3. Standfirst / lede
4. Body
5. Why this matters (Source Standard framing)
6. Related education articles + related product surfaces

## Step 3 — Execute the migration map

Rewrite retained pages into the correct template, merge where mapped, retire with 301s, create the gap articles. Consistency and internal linking over exhaustive depth — depth compounds over time.

Initial evergreen seed (Education):
- What are peptides?
- What is a compounded medication?
- What's the difference between compounded and FDA-approved medications?
- What is a 503A pharmacy?
- What is a 503B outsourcing facility?
- Who manufactures compounded medications?
- Why does sourcing matter?
- What does Verified mean?
- What does Greenlisted mean?
- What should I ask my provider?
- How do I know if a provider is trustworthy?
- What information should a transparent provider share?

Initial News & Insights seed: whatever qualifies from the current Analysis + Publications set after the audit. No net-new News posts required in Phase 1 beyond migrated ones.

## Step 4 — Internal linking

Cross-link from Vendor Registry, Vendor Profile, Facility Records, Status Definitions, and How Verification Works into Education. News posts link out to relevant Education articles and product surfaces. Every page closes with a next step — no dead ends.

## Step 5 — SEO foundation (baked into both templates)

- Consumer-question `<title>` (Education) / headline `<title>` (News)
- Meta descriptions
- Self-referencing canonicals
- `Article` + `FAQPage` JSON-LD on Education; `NewsArticle` JSON-LD on News
- Question-based slugs on Education; dated, descriptive slugs on News
- `CollectionPage` schema on both hubs
- Sitemap regenerated (`scripts/generate-sitemap.ts`)
- 301s for every retired route

---

## Execution order

1. Deliver the audit + migration map → **wait for your approval**
2. Build `/learn`, `/learn/education`, `/learn/news` hubs
3. Build both article templates
4. Execute the migration (rewrites, merges, retires, redirects, new pages)
5. Wire cross-links from product surfaces
6. Ship SEO foundation + sitemap
7. Summary of new routes and redirects → wait before Phase 2

## Execution rules

- Frontend / presentation / content only
- `/library/faq/*` (Tier D) is out of scope
- No changes to product schema, statuses, or refined Tiers A–D pages
- Consumer voice throughout — no operator methodology drift
- Every retired route gets a 301; no broken inbound links or sitemap entries

---

**Ship Step 0 (audit + migration map) first?**
