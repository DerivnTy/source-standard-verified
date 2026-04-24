

## Resource Library Page Copy Rewrite

Text-only changes to the Education (Resource Library) page. No layout, components, styling, filters, routes, or article-card structure changes. Article titles/blurbs in the data file are updated to reflect the broader compounded-therapy scope.

### Files Touched

1. **`src/pages/Education.tsx`** — hero description, Common Inquiries copy, Editorial Pipeline copy, closing-statement copy.
2. **`src/data/resourceLibrary.ts`** — `CATEGORIES` labels/descriptions and a subset of `ARTICLES` titles/blurbs. Slugs, routes, dates, categories, and `meta` strings preserved exactly.

*Footer: already correct from prior pass — no change.*

### Content Changes

**`src/pages/Education.tsx`**

- `HERO_DESCRIPTION` → `Clinical, regulatory, and documentation reference for compounded therapy sourcing, pharmacy standards, and consumer due diligence. Materials are reviewed for accuracy, scope, and public-reference clarity.`
- `BriefingHero` `category` stays `Reference Library`; `title` stays `Resource Library`.
- `COMMON_INQUIRIES` descriptions:
  - Legal: `Statutory framework, public records, vendor contracts, and lawful access boundaries.`
  - Safety: `How Source Standard discusses handling, documentation, and product claims without guaranteeing outcomes.`
  - Verification: `How vendors, documentation trails, and upstream facility records are reviewed.`
  - Diligence: `Public-facing checks before relying on a vendor sourcing claim.` (route unchanged)
- Editorial Pipeline body: `Additional reference formats are in development, including video explainers, Board-reviewed articles, and the 2026 Integrity Ledger.`
- Closing H2: `A working reference, not a content feed.` (unchanged)
- Closing body: `The Resource Library helps consumers, clinicians, and listed entities understand sourcing claims, pharmacy categories, documentation review, and verification limits through a consistent public-reference standard. It is maintained as part of the broader Source Standard framework, not as a standalone publishing channel.`

**`src/data/resourceLibrary.ts`** — labels, descriptions, and article copy only. Slugs, `path`, `meta`, `publishedAt`, `category` preserved.

- `CATEGORIES`:
  - `regulation` → `label: "Sourcing & Regulation"`, `short: "Regulation"`, `description: "Statutory framework, facility classifications, pharmacy sourcing, and verification methodology."`
  - `clinical` → `label: "Clinical Context"`, `short: "Clinical"`, `description: "Clinical terminology, handling context, and category-specific reference reviewed within Source Standard's non-treatment scope."`
  - `consumer` → `label: "Consumer Due Diligence"`, `short: "Consumer"`, `description: "Consumer-facing reference for understanding vendor status, sourcing claims, and documentation boundaries."`

- `ARTICLES` (title / blurb only, slugs preserved):
  - `what-is-compounding` → `What is Compounding?` / `The difference between 503A pharmacies, 503B outsourcing facilities, and vendor-level sourcing claims.`
  - `the-2026-compounding-reclassification` → `The 2026 Regulatory Shift` / `How recent compounding and enforcement developments affect public sourcing review.`
  - `how-to-read-a-certificate-of-analysis` → `Interpreting CoAs` / `How certificates of analysis are used in documentation review and where their limits begin.`
  - `the-dual-layer-difference` → `The Dual-Layer Review` / `Why Source Standard separates upstream facility records from vendor-level sourcing verification.`
  - `safe-peptide-handling-and-reconstitution` → `Sterile Handling Context` / `General reference on sterile preparation concepts, storage considerations, and documentation relevance.`
  - `sanitization-and-aseptic-technique-fundamentals` → `Stability Fundamentals` / `How temperature, light, time, and storage records can affect review context for compounded products.`
  - `the-science-of-aging-and-trt` → `Hormone Therapy Context` / `Reference terminology for TRT, HRT, and related compounded therapy categories.`
  - `dosing-guidance-summaries-for-common-compounds` → `Scope of Clinical References` / `How Source Standard separates public education from individualized medical advice or treatment guidance.`
  - `questions-to-ask-your-clinic` → `The Vendor Checklist` / `Questions consumers can ask about sourcing, pharmacy relationships, documentation, and review status.`
  - `warning-signs-of-undocumented-sourcing` → `Warning Signs` / `Common patterns in unsupported sourcing claims and undocumented vendor presentations.`
  - `what-source-standard-verification-actually-means` → `Verification Scope` / `What a Verified listing establishes and what it does not establish.`
  - `what-are-peptides` → `Handling Claims vs. Documentation` / `How to distinguish general product claims from reviewable sourcing documentation.`

### Out of Scope

- All article detail pages (article-body content unchanged; only index titles/blurbs)
- Filter logic, routes, slugs, sort ordering, animations
- All component styles, colors, spacing
- Footer (already aligned)

