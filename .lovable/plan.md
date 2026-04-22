

## New page: `/library/faq/clinical-safety`

Second regulatory FAQ category (FAQ-CAT-02). Mirrors the established `FaqLegalRegulatory` page exactly — same `RecordHeader`, same 900px filing column, same accordion treatment, same pivot footer.

### 1 · New file: `src/pages/FaqClinicalSafety.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Regulatory FAQ`
  - Title: `FAQ: Clinical Safety`
  - Lead: `Sterility standards, handling integrity, and the clinical scope of use for compounded preparations.`
  - Reference box: Doc `FAQ-CAT-02` · Status `Public Record` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`:
  - `§1 Category Overview` — short description framing the three questions (cold-chain stability, BUDs under USP <797>, endotoxin testing).
  - `Accordion type="single" collapsible defaultValue="Q1"` with three items, identical mono `Q1/Q2/Q3` label + bold question + indented answer treatment used on FAQ-CAT-01:
    - **Q1** — Refrigeration / cold-chain stability
    - **Q2** — 28-day multi-dose vial BUD under USP <797>
    - **Q3** — Endotoxins and pyrogenic reactions

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` outline `← Back to FAQ Index` → `/education#questions`.
  - Right: muted text link `Next Category: Verification Process (FAQ-CAT-03) →` → `/library/faq/verification-process` (placeholder route, wired for the next category).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route path="/library/faq/clinical-safety" element={<FaqClinicalSafety />} />` inside `SiteLayout`.

### 3 · Education category override: `src/pages/Education.tsx`

Extend the existing `CATEGORY_ROUTE_OVERRIDES` map with the `clinical` key → `/library/faq/clinical-safety`, so the FAQ-CAT-02 "Browse category" button routes to the new dedicated page instead of the default anchor.

### Files touched

- `src/pages/FaqClinicalSafety.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `CATEGORY_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, the `Accordion` primitive, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page element.

