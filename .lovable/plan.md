

## New article page: `/library/dual-layer-difference`

Fourth whitepaper. Mirrors the established `LibraryInterpretingCoAs` / `LibraryWhatArePeptides` / `LibraryWhatIsCompounding` pattern exactly.

### 1 · New file: `src/pages/LibraryDualLayerDifference.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Foundational Philosophy`
  - Title: `The Dual-Layer Difference`
  - Lead: `Understanding the symbiotic verification of both the clinical entity and the upstream pharmacy provider.`
  - Reference box: Doc `SS-SERIES-003` · Status `In Review / Public Reference` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`, `prose-filing` serif:
  - `§1 The "Single-Point" Failure` — single paragraph as supplied.
  - `§2 Layer One: The Clinical Entity` — intro paragraph + `DefList` (`Medical Oversight`, `Prescribing Integrity`, `Transparency`).
  - `§3 Layer Two: The Upstream Pharmacy` — intro paragraph + `DefList` (`Licensure Reconciliation`, `Facility Classification`, `Evidence of Sourcing`).
  - `§4 The Symbiotic Result` — single paragraph as supplied.

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` `← Back to Clinical Library` → `/education`.
  - Right: muted text link `Next: Clinical Handling & Aseptic Protocols (SS-GUIDE-001) →` → `/library/aseptic-protocols` (placeholder route, wired for the next article).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route path="/library/dual-layer-difference" element={<LibraryDualLayerDifference />} />` inside `SiteLayout`.

### 3 · Education link override: `src/pages/Education.tsx`

Extend `SLUG_ROUTE_OVERRIDES` with the SS-SERIES-003 entry's slug → `/library/dual-layer-difference`.

### Files touched

- `src/pages/LibraryDualLayerDifference.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `SLUG_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page element.

