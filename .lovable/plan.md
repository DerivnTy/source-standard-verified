

## New article page: `/library/sterile-preparation-integrity`

Fifth whitepaper. Mirrors the established `LibraryDualLayerDifference` / `LibraryInterpretingCoAs` / `LibraryWhatArePeptides` / `LibraryWhatIsCompounding` pattern exactly.

### 1 · New file: `src/pages/LibrarySterilePreparationIntegrity.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Clinical Guide`
  - Title: `Sterile Preparation Integrity: Handling & Reconstitution Protocol`
  - Lead: `Clinical standards for the handling, reconstitution, and storage of compounded sterile preparations to ensure therapeutic efficacy and microbial safety.`
  - Reference box: Doc `SS-GUIDE-001` · Status `MAB Reviewed / Active` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`, `prose-filing` serif:
  - `§1 The Importance of Sterile Integrity` — single paragraph as supplied.
  - `§2 Reconstitution Standards` — intro paragraph + `DefList` (`Diluent Verification`, `The 'Gentle Swirl' Rule`, `Pressure Equalization`).
  - `§3 Storage & Stability` — intro paragraph + `DefList` (`Cold Chain Maintenance`, `Light Sensitivity`, `Beyond-Use Date (BUD)`).
  - `§4 Clinical Best Practices` — single paragraph as supplied.

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` `← Back to Clinical Library` → `/education`.
  - Right: muted text link `Next: Aseptic Technique Fundamentals (SS-GUIDE-002) →` → `/library/aseptic-technique-fundamentals` (placeholder route, wired for the next article).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route path="/library/sterile-preparation-integrity" element={<LibrarySterilePreparationIntegrity />} />` inside `SiteLayout`.

### 3 · Education link override: `src/pages/Education.tsx`

Extend `SLUG_ROUTE_OVERRIDES` with the SS-GUIDE-001 entry's slug → `/library/sterile-preparation-integrity`.

### Files touched

- `src/pages/LibrarySterilePreparationIntegrity.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `SLUG_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page element.

