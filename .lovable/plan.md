

## New page: `/library/analysis/2026-reclassification`

First Clinical Analysis whitepaper (SS-SERIES-001). Mirrors the existing FAQ/clinical-guide pattern — `RecordHeader`, 900px filing column via `Section` + `SectionLabel`, hairline pivot footer.

### 1 · New file: `src/pages/LibraryAnalysis2026Reclassification.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Clinical Analysis`
  - Title: `The 2026 Compounding Reclassification`
  - Lead: `Background and implications of the recent regulatory shifts across 503A and 503B compounding categories.`
  - Reference box: Doc `SS-SERIES-001` · Status `Analysis / Public Record` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column, four numbered sections:
  - `§1 The Regulatory Catalyst` — single prose paragraph on the FDA / state-board update to the Bulk Drug Substances lists.
  - `§2 Key Changes in 503B Availability` — short framing sentence, then a `DefList` (same helper used across the clinical guide pages) with two terms: **Enhanced Stability Requirements**, **Batch-Size Limitations**.
  - `§3 The 'Trickle-Down' to 503A Pharmacies` — short framing sentence, then a `DefList` with two terms: **Individual Prescription Necessity**, **Verification Necessity**.
  - `§4 Looking Ahead` — closing prose paragraph on legal/safety liability and state-level enforcement.

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` outline `← Back to Education Hub` → `/education`.
  - Right: muted text link `Next Analysis: Questions to Ask Your Clinic (SS-SERIES-004) →` → `/library/analysis/questions-to-ask-your-clinic` (placeholder for the next analysis page).

### 2 · Route registration: `src/App.tsx`

One import + one `<Route path="/library/analysis/2026-reclassification" element={<LibraryAnalysis2026Reclassification />} />` inside `SiteLayout`.

### 3 · Wire the SS-SERIES-001 card: `src/pages/Education.tsx`

In the `Latest Clinical Analysis` grid (around line 407), the `Read more →` button currently always points to `/education/${entry.slug}`. Replace that with the existing `SLUG_ROUTE_OVERRIDES[entry.slug] ?? \`/education/${entry.slug}\`` pattern already used by `SimpleRow`, then add one new key:

```ts
"the-2026-compounding-reclassification": "/library/analysis/2026-reclassification",
```

This keeps every other series card on its current behavior and only redirects SS-SERIES-001 to the new dedicated page.

### Files touched

- `src/pages/LibraryAnalysis2026Reclassification.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new `SLUG_ROUTE_OVERRIDES` key + apply the override map to the analysis grid's `Read more` button

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, `Button`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page card.

