
# Phase 1 (revised) — Learn: three engines, consumer-first

Refines the previously approved plan to reflect the new principles: FAQ becomes a first-class pillar under Learn, article titles are rewritten as consumer questions, the Education topics match how consumers think, and every page ends with a next step — not an explanation of what the library is.

**One goal:** everything under Learn answers *"What do I need to know before choosing a provider?"*

---

## Information architecture

```text
/learn                          Learn hub — routes to three engines
│
├── /learn/education            Evergreen knowledge
│   ├── Learn the Basics
│   ├── Choosing a Provider
│   ├── Verification
│   └── Sourcing & Manufacturing
│   └── /learn/education/:slug
│
├── /learn/news                 Timely publication
│   ├── Industry News
│   ├── Regulatory Updates
│   ├── Scientific Research
│   ├── Source Standard Updates
│   └── Editorial & Analysis
│   └── /learn/news/:slug
│
└── /learn/faq                  Direct questions
    (surfaces the four existing Tier D FAQ pages, unchanged)
```

The four `/library/faq/*` pages (Tier D) stay put — the Learn hub links to them, they don't move.

---

## Step 0 — Migration map (already delivered, minor amendments)

The map in `docs/learn-migration-map.md` still stands. Amendments for the new FAQ pillar and consumer-question retitling:

**FAQ pillar wiring.** `/learn/faq` becomes an index that surfaces the four existing Tier D FAQ pages. No content changes to those four pages.

**Consumer-question retitles** — the new article `<h1>` and `<title>` for each retained page:

| New route | Retitle to |
|---|---|
| `/learn/education/what-is-a-compounded-medication` | What Is a Compounded Medication? |
| `/learn/education/what-are-peptides` | What Are Peptides? |
| `/learn/education/how-to-read-a-certificate-of-analysis` | How Do I Read a Certificate of Analysis? |
| `/learn/education/what-does-verified-mean` | What Does Verified Mean? |
| `/learn/education/why-does-sourcing-matter` | Why Does Sourcing Matter? |
| `/learn/education/what-is-sterile-compounding` | What Is Sterile Compounding? |
| `/learn/education/what-is-compounded-hormone-therapy` | What Is Compounded Hormone Therapy? |
| `/learn/education/what-information-should-a-transparent-provider-share` | What Information Should a Transparent Provider Share? |
| `/learn/education/what-happens-during-a-verification-review` | What Happens During a Verification Review? |
| `/learn/education/what-should-i-ask-my-provider` | What Should I Ask My Provider? |
| `/learn/education/how-do-i-know-if-a-provider-is-trustworthy` | How Do I Know If a Provider Is Trustworthy? |
| `/learn/news/2026-compounding-reclassification` | 2026 Compounding Reclassification |

Plus a new Education article: **Why Do Facility Records Matter?** at `/learn/education/why-do-facility-records-matter` (added to the gap list).

All redirects from the migration map remain as previously listed.

---

## Step 1 — Learn hub

`/learn` presents three clearly separated entry points — Education, News & Insights, FAQ — each with a one-line purpose and a link to the engine hub. Layout matches existing site conventions (`BriefingHero`, `w-wide`, hairline borders, filter pills).

## Step 2 — Engine hubs

- `/learn/education` — grouped by the four consumer topics (Basics, Choosing a Provider, Verification, Sourcing & Manufacturing). Question-first titles. Search + filter pills.
- `/learn/news` — reverse-chronological, filterable by the five news categories. Datelines first.
- `/learn/faq` — index that surfaces the four existing FAQ pages with short framing per topic.

## Step 3 — Two reusable article templates

**Education (evergreen):**
1. Question headline (`<h1>` matches `<title>`)
2. What this answers (one sentence)
3. Short answer (2–3 sentences)
4. Detailed explanation
5. Related questions
6. **Next step** (see Step 5)

**News & Insights (timely):**
1. Dateline + category
2. Headline
3. Standfirst / lede
4. Body
5. Why this matters
6. **Next step**

## Step 4 — Execute the migration

Rewrite retained pages into the correct template with consumer-question titles, merge where mapped, retire with redirects, create the gap articles (503A, 503B, who manufactures, compounded vs FDA-approved, Greenlisted, facility records). Consistency and internal linking over exhaustive depth.

## Step 5 — "Next step" closer replaces the current Conclusion

Every article and every engine hub ends with a **Still have questions?** block — not explanatory copy about what the library is. Standard next-step options, chosen per page for relevance:

- Search the Vendor Registry
- Explore Facility Records
- Learn How Verification Works
- Contact Source Standard

Per-article next-step matrix (examples, applied consistently):

| Article | Next step |
|---|---|
| What Are Peptides? | Search the Vendor Registry |
| What Does Verified Mean? | Learn How Verification Works |
| Why Do Facility Records Matter? | Explore Facility Records |
| What Should I Ask My Provider? | See a transparent provider listing |
| What Is a 503B Outsourcing Facility? | Explore Facility Records |
| How Do I Know If a Provider Is Trustworthy? | Search the Vendor Registry |

Also removes the current `Education.tsx` §7 "Editorial Pipeline" and §8 "A working reference, not a content feed" reference notes — replaced by the next-step closer.

## Step 6 — Cross-links from product surfaces

Vendor Registry, Vendor Profile, Facility Records, Status Definitions, and How Verification Works each link into the most relevant Education article(s). Presentation-only — no schema changes.

## Step 7 — SEO foundation

- Consumer-question `<title>` / meta / canonical / og:* per article via `react-helmet-async` (adopt if not already present; wire `HelmetProvider` in `main.tsx` and remove the static canonical from `index.html`)
- `Article` + `FAQPage` JSON-LD on Education; `NewsArticle` on News
- `CollectionPage` on all three hubs
- Question-based slugs on Education; dated, descriptive slugs on News
- `scripts/generate-sitemap.ts` regenerated with the new URLs
- Client-side `<Navigate replace>` redirects for every retired route

---

## Execution order

1. Confirm the amendments above (FAQ pillar, consumer-question titles, "Why Do Facility Records Matter?" added to gap list)
2. Build `/learn`, `/learn/education`, `/learn/news`, `/learn/faq` hubs
3. Build both article templates + next-step closer component
4. Execute the migration (rewrites, merges, retires, redirects, new pages)
5. Wire cross-links from product surfaces
6. Ship SEO foundation + regenerate sitemap
7. Summary of new routes and redirects → wait before Phase 2

## Execution rules

- Frontend / presentation / content only
- Tier D FAQ pages content unchanged; only their surfacing under `/learn/faq` changes
- No changes to product schema, statuses, or refined Tiers A–D pages
- Consumer voice throughout — no operator methodology drift
- Every retired route redirects; no broken inbound links or sitemap entries
- No page ends with explanatory copy about the library itself — always a next step

---

**Ship this revised plan?**
