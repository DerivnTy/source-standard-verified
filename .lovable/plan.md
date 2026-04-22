

## New page: `/library/analysis/undocumented-sourcing-signs`

Final Clinical Analysis whitepaper (SS-SERIES-006). Mirrors the existing analysis pages — same `RecordHeader`, 900px filing column via `Section` + `SectionLabel`, hairline pivot footer, same `DefList` helper.

### 1 · New file: `src/pages/LibraryAnalysisUndocumentedSourcingSigns.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Clinical Analysis`
  - Title: `Warning Signs of Undocumented Sourcing`
  - Lead: `Identifying the patterns, disclosures, and behaviors that indicate a clinic may be operating outside of regulated sourcing channels.`
  - Reference box: Doc `SS-SERIES-006` · Status `Analysis / Public Record` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column, five numbered sections:
  - `§1 The "Grey Market" Incursion` — single prose paragraph framing the grey-market context.
  - `§2 Red Flag: Label Anonymity` — short framing sentence + `DefList` with two terms: **Generic Branding**, **Handwritten Details**.
  - `§3 Red Flag: The "Proprietary Blend" Defense` — short framing sentence + `DefList` with one term: **The Truth**.
  - `§4 Red Flag: Payment and Shipping Anomalies` — short framing sentence + `DefList` with two terms: **Non-Traditional Payments**, **Residential Return Addresses**.
  - `§5 Conclusion: The Cost of Low Transparency` — closing prose paragraph on accountability.

- **Pivot footer** (hairline-top bar inside the 900px column):
  - Left: `Button` outline `← Back to Education Hub` → `/education`.
  - Right: muted text link `Search the Verified Registry →` → `/directory`.

### 2 · Route registration: `src/App.tsx`

One import + one `<Route path="/library/analysis/undocumented-sourcing-signs" element={<LibraryAnalysisUndocumentedSourcingSigns />} />` inside `SiteLayout`.

### 3 · Wire the SS-SERIES-006 card: `src/pages/Education.tsx`

Add one new key to `SLUG_ROUTE_OVERRIDES` matching the SS-SERIES-006 slug shipped in `library.ts` so its "Read more" button (already routed through the override map) points at the new page:

```ts
"warning-signs-of-undocumented-sourcing": "/library/analysis/undocumented-sourcing-signs",
```

(Exact key will match the slug declared in `src/data/library.ts` for SS-SERIES-006.)

### 4 · Fix the SS-SERIES-005 forward link

In `src/pages/LibraryAnalysisMeaningOfVerification.tsx`, the existing `Final Analysis →` link points to `/library/analysis/warning-signs-undocumented-sourcing` (a 404 today). Update it to `/library/analysis/undocumented-sourcing-signs` so the chain stays live.

### Files touched

- `src/pages/LibraryAnalysisUndocumentedSourcingSigns.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new `SLUG_ROUTE_OVERRIDES` key
- `src/pages/LibraryAnalysisMeaningOfVerification.tsx` — update one `to=` value on the forward pivot link

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, `Button`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page card.

