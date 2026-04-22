

## New article page: `/library/what-are-peptides`

A second whitepaper page mirroring the `What Is Compounding?` pattern exactly, plus one route registration and one Education-row link override.

### 1 · New file: `src/pages/LibraryWhatArePeptides.tsx`

Same structure as `LibraryWhatIsCompounding.tsx`:

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Foundational Series`
  - Title: `What Are Peptides?`
  - Lead: `A plain-language introduction to peptides, their clinical utility, and the critical importance of sourcing integrity.`
  - Reference box: Doc `SS-SERIES-000A` · Status `Active / Public Reference` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column via `Section` + `SectionLabel`, `prose-filing` serif:
  - `§1 The Biological Blueprint` — single paragraph as supplied.
  - `§2 Clinical Utility` — intro paragraph + a definition list (`Regulate Metabolic Function`, `Support Tissue Repair`, `Optimize Hormonal Balance`) using the established `DefList` (mono term / serif description), then the closing paragraph beneath the list.
  - `§3 The Sourcing Crisis` — intro paragraph + a definition list (`Research Use Only (RUO)`, `The Source Standard Goal`), then the closing paragraph beneath the list.

- **Pivot footer** (hairline-top bar inside the centered column):
  - Left: `Button` (default — 4px black) `← Back to Clinical Library` → `/education`.
  - Right: muted text link `Next: Interpreting CoAs (SS-SERIES-002) →` → `/library/interpreting-coas` (placeholder route, wired for the next article).

### 2 · Route registration: `src/App.tsx`

Add one import and one `<Route>` inside `SiteLayout`:
```tsx
<Route path="/library/what-are-peptides" element={<LibraryWhatArePeptides />} />
```

### 3 · Education link override: `src/pages/Education.tsx`

Extend the existing `SLUG_ROUTE_OVERRIDES` lookup with the SS-SERIES-000A entry's slug → `/library/what-are-peptides`. The row card and right-edge "Read full article ›" both navigate to the new page. All other rows untouched.

### Files touched

- `src/pages/LibraryWhatArePeptides.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new key in `SLUG_ROUTE_OVERRIDES`

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, the global `SiteHeader`/`SiteFooter`, the 900px filing column, the `Button` primitive, `library.ts`, every other route, and every other Education page element.

