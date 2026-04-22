

## Deep-Link Polish — Scroll, Smooth Anchors, Coverage Gaps

Most of this directive is already in place: every Library / FAQ / Analysis / Glossary / About page already carries `RecordHeader` + Reference box + 12-col `BoardSection` split + 14.5px lock + mono accents + `verifiedOn` in `DocSignature` + `Breadcrumb` + `PageMeta` + footnote primitive. This pass closes the four remaining gaps.

---

### 1 · Scroll restoration on route change

New `src/components/ScrollToTop.tsx` — a route listener that fires `window.scrollTo({ top: 0, left: 0, behavior: "instant" })` on every `location.pathname` change, **unless** the URL carries a `#hash` (in which case it defers to the smooth-anchor handler below).

Wired into `App.tsx` as the first child of `<BrowserRouter>`, above `<Routes>`. Zero visual footprint.

### 2 · Smooth anchor jumps (500–800ms)

- Add `html { scroll-behavior: smooth; scroll-padding-top: 96px; }` to `src/index.css` (the padding accounts for `SiteHeader` + sticky `Breadcrumb`/contents bar so anchored sections don't sit under fixed chrome).
- New `src/hooks/useHashScroll.ts` — on mount and on `location.hash` change, if hash present, `requestAnimationFrame` → `document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" })`. Mounted once inside `SiteLayout` so it covers every route.
- Harden `Breadcrumb` and any in-page jump links: the existing `<a href="#…">` markup already works with `scroll-behavior: smooth`; no per-page edits required.

### 3 · `Verified` row in the Reference box (RecordHeader)

`RecordHeader` already accepts `verifiedOn` (added in the prior phase). Audit pass: every page that passes `verifiedOn` to `DocSignature` should also pass it to `RecordHeader` so the chip shows in the right rail at the top, not only at the bottom. Apply to all 18 pages currently using `RecordHeader` + `DocSignature`. One-line edit each — no copy or layout change.

### 4 · Breadcrumb + PageMeta coverage on remaining deep-link pages

The technical library is covered. Add `<Breadcrumb>` + `<PageMeta>` (and surface `verifiedOn` where the doc has a verified date) on:

- `Governance.tsx` → `About > Governance`
- `Accountability.tsx` → `About > Accountability`
- `FAQ.tsx` → `Education > FAQ`
- `HowToReadTheDirectory.tsx` → `Registry > How to Read`
- `VendorProfile.tsx` → `Registry > Verified Vendors > {Name}`
- `MedicalAdvisory.tsx` → `About > Medical Advisory`
- `AdvisorProfile.tsx` → already has `PageMeta`; confirm and add `Breadcrumb` if missing → `About > Medical Advisory > {Name}`
- `Privacy.tsx`, `Terms.tsx`, `VerificationDisclaimer.tsx` → `Legal > {Doc}`
- `Apply.tsx`, `Contact.tsx`, `ReportConcern.tsx`, `ForVendors.tsx` → `Vendors > {Action}`
- `Education.tsx`, `EducationBasics.tsx`, `EducationGuides.tsx`, `EducationQuestions.tsx` → `Education > {Hub}`

All breadcrumbs use the existing custom `<Breadcrumb>` (mono, hairline-bottom). All `<PageMeta>` follow the standard format `{Page} | Source Standard — The Clinical Transparency Framework`.

---

### Files touched

**New**
- `src/components/ScrollToTop.tsx`
- `src/hooks/useHashScroll.ts`

**Modified primitives**
- `src/App.tsx` — mount `<ScrollToTop />` inside `<BrowserRouter>`
- `src/components/SiteLayout.tsx` — call `useHashScroll()` once
- `src/index.css` — add `html { scroll-behavior: smooth; scroll-padding-top: 96px; }`

**Wired in (additive only — copy/layout unchanged)**
- 18 pages: pass `verifiedOn` into `RecordHeader` alongside `DocSignature`
- ~14 supporting pages: add `<PageMeta>` + `<Breadcrumb>` headers

### What stays the same

All routes, all written copy, all data, the entire MAB DNA layout, registry filtering / sorting / pagination logic, the existing `RecordHeader` / `BoardSection` / `DocSignature` / `Footnote` / `GlossaryTerm` APIs, dark-mode behavior, design tokens. Strictly additive — scroll mechanics + remaining a11y/nav coverage.

