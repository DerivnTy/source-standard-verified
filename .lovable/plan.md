

## New article page: `/library/interpreting-coas`

Third whitepaper in the series. Mirrors the `LibraryWhatArePeptides` / `LibraryWhatIsCompounding` pattern exactly.

### 1 · New file: `src/pages/LibraryInterpretingCoAs.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Audit Protocols`
  - Title: `Audit Protocols: Interpreting CoAs and Detecting Discrepancies`
  - Lead: `A guide to understanding Certificates of Analysis, verifying laboratory authenticity, and identifying common red flags in pharmaceutical testing.`
  - Reference box: Doc `SS-SERIES-002` · Status `Active / Public Reference` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`, `prose-filing` serif:
  - `§1 What is a CoA?` — single paragraph as supplied.
  - `§2 The Anatomy of a Verified CoA` — intro paragraph + `DefList` (`Identity`, `Potency (Assay)`, `Purity`, `Sterility & Endotoxins`).
  - `§3 Common Red Flags & Discrepancies` — intro paragraph + `DefList` (`Mismatched Lot Numbers`, `Opaque Lab Identity`, `Missing Dates`, `Photoshop Artifacts`).
  - `§4 The Source Standard Verification Protocol` — single paragraph as supplied.

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` `← Back to Clinical Library` → `/education`.
  - Right: muted text link `Next: The Dual-Layer Difference (SS-SERIES-003) →` → `/library/dual-layer-difference` (placeholder route, wired for the next article).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route path="/library/interpreting-coas" element={<LibraryInterpretingCoAs />} />` inside `SiteLayout`.

### 3 · Education link override: `src/pages/Education.tsx`

Extend `SLUG_ROUTE_OVERRIDES` with the SS-SERIES-002 entry's slug → `/library/interpreting-coas`.

### Files touched

- `src/pages/LibraryInterpretingCoAs.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `SLUG_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page element.

