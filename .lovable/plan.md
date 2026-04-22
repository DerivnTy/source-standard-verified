

## New article page: `/library/aseptic-technique`

Sixth whitepaper. Mirrors the established `LibrarySterilePreparationIntegrity` / `LibraryDualLayerDifference` pattern exactly.

### 1 · New file: `src/pages/LibraryAsepticTechnique.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Clinical Guide`
  - Title: `Aseptic Technique: Sanitization Fundamentals`
  - Lead: `Foundational principles of aseptic handling for clinicians and patients to minimize the risk of microbial introduction during medication administration.`
  - Reference box: Doc `SS-GUIDE-002` · Status `MAB Reviewed / Active` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`, `prose-filing` serif:
  - `§1 Defining the Aseptic Field` — single paragraph as supplied.
  - `§2 Hand Hygiene & Barrier Protection` — intro paragraph + `DefList` (`Mechanical Cleaning`, `Gloves`).
  - `§3 The 'Swab and Wait' Protocol` — intro paragraph + `DefList` (`Septum Sanitization`, `The 10-Second Rule`, `Single Use`).
  - `§4 'Critical Sites' Safety` — intro paragraph + `DefList` (`The Needle`, `The Syringe Hub`, `The Vial Septum`) + closing sentence about compromised equipment.

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` `← Back to Clinical Library` → `/education`.
  - Right: muted text link `Next: Endocrinological Context (SS-GUIDE-003) →` → `/library/endocrinological-context` (placeholder route, wired for the next article).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route path="/library/aseptic-technique" element={<LibraryAsepticTechnique />} />` inside `SiteLayout`.

### 3 · Education link override: `src/pages/Education.tsx`

Extend `SLUG_ROUTE_OVERRIDES` with the SS-GUIDE-002 entry's slug → `/library/aseptic-technique`.

### Files touched

- `src/pages/LibraryAsepticTechnique.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `SLUG_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page element.

