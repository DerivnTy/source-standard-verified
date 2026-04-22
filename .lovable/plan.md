

## New article page: `/library/reference-dosing-ranges`

Final clinical-series whitepaper (SS-GUIDE-004). Mirrors the established `LibraryEndocrinologicalContext` / `LibraryAsepticTechnique` pattern, with one new primitive: a reference table inside the 900px filing column.

### 1 · New file: `src/pages/LibraryReferenceDosingRanges.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Clinical Guide`
  - Title: `Reference Dosing Ranges: Selected Compounds`
  - Lead: `A high-level summary of literature-based dosing ranges for common compounded medications.`
  - Reference box: Doc `SS-GUIDE-004` · Status `MAB Reviewed / Active` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`, `prose-filing` serif:
  - `§1 Critical Disclaimer` — single paragraph, rendered inside a hairline-bordered callout (muted surface) so the disclaimer reads as a regulatory notice rather than body copy.
  - `§2 Purpose of Standardization` — single paragraph as supplied.
  - `§3 Selected Compound Reference Table` — short intro line + a four-row reference table (`Compound Category` · `Common Clinical Frequency` · `Typical Reference Range`). Mono tabular figures, hairline row dividers, sticky-feel header. Built inline (no new shared component) to keep this consistent with the other library pages.
  - `§4 Understanding Concentration vs. Volume` — intro paragraph + `DefList` (`The Calculation`, `Example`, `Verification Check`).
  - `§5 Conclusion on Clinical Oversight` — single paragraph as supplied.

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` `← Back to Clinical Library` → `/education`.
  - Right: muted text link `Proceed to Regulatory FAQ Categories →` → `/education#faq` (jumps to the existing FAQ category grid on the Education page).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route path="/library/reference-dosing-ranges" element={<LibraryReferenceDosingRanges />} />` inside `SiteLayout`.

### 3 · Education link override: `src/pages/Education.tsx`

Extend `SLUG_ROUTE_OVERRIDES` with the SS-GUIDE-004 entry's slug → `/library/reference-dosing-ranges`. (Will read `library.ts` to use the exact slug the SS-GUIDE-004 entry ships with.)

### Files touched

- `src/pages/LibraryReferenceDosingRanges.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `SLUG_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page element. The reference table is implemented inline within the new page only.

