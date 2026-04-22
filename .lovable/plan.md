

## New page: `/library/faq/verification-process`

Third regulatory FAQ category (FAQ-CAT-03). Mirrors `FaqClinicalSafety` / `FaqLegalRegulatory` exactly — same `RecordHeader`, 900px filing column, accordion treatment, pivot footer. Only difference: four Q&A items instead of three.

### 1 · New file: `src/pages/FaqVerificationProcess.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Regulatory FAQ`
  - Title: `FAQ: Verification Process`
  - Lead: `Details on the Source Standard auditing protocol, facility reconciliation, and the criteria for institutional verification.`
  - Reference box: Doc `FAQ-CAT-03` · Status `Public Record` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`:
  - `§1 Category Overview` — short framing line covering the four questions (verification stages, audit scope, status revocation, re-audit cadence).
  - `Accordion type="single" collapsible defaultValue="Q1"` with four items, identical mono `Q1–Q4` label + bold question + indented answer treatment used on FAQ-CAT-01/02:
    - **Q1** — Three-stage verification process
    - **Q2** — Auditing scope vs. primary lab testing
    - **Q3** — Causes for status revocation
    - **Q4** — Re-audit cadence (quarterly + 12-month)

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` outline `← Back to FAQ Index` → `/education#questions`.
  - Right: muted text link `Next Category: Consumer Diligence (FAQ-CAT-04) →` → `/library/faq/consumer-diligence` (placeholder route, wired for the next category).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route path="/library/faq/verification-process" element={<FaqVerificationProcess />} />` inside `SiteLayout`.

### 3 · Education category override: `src/pages/Education.tsx`

Extend the existing `CATEGORY_ROUTE_OVERRIDES` map with the FAQ-CAT-03 category key → `/library/faq/verification-process`, so the "Browse category" button routes to the new dedicated page instead of the default anchor.

### Files touched

- `src/pages/FaqVerificationProcess.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `CATEGORY_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, the `Accordion` primitive, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page element.

