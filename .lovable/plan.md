

## New article page: `/library/what-is-compounding`

A new whitepaper-style article page using the established 900px centered filing layout, plus a route registration and one link update on the Education page.

### 1 · New file: `src/pages/LibraryWhatIsCompounding.tsx`

Standard whitepaper structure mirroring the existing filing pages (About, Terms, etc.):

- **Header**: `RecordHeader` (split-header with right-aligned Reference metadata box)
  - Eyebrow: `Source Standard · Foundational Series`
  - Title: `What Is Compounding?`
  - Lead: `An overview of pharmacy compounding, the 503A vs. 503B regulatory framework, and supply-chain implications.`
  - Reference box:
    - Doc: `SS-SERIES-000B`
    - Status: `Active / Public Reference`
    - Jurisdiction: `United States`
    - Updated: `April 21, 2026`

- **Body**: 900px centered column via the `Section` + `SectionLabel` primitives (the established whitepaper pattern). Four sections:
  - `§1 Overview` — two paragraphs as supplied.
  - `§2 503A Pharmacies: Patient-Specific` — intro paragraph + a definition list (`Requirement`, `Standards`, `Oversight`) styled as the existing institutional `<dl>` (mono term, serif description) used elsewhere.
  - `§3 503B Pharmacies: Outsourcing Facilities` — same pattern: intro + definition list.
  - `§4 Clinical Implications` — single paragraph as supplied.
  - Body uses the established `prose-filing` serif treatment (Source Serif 4) at ≥16px / 1.7 line-height.

- **Pivot footer** (inside the centered column, above the page bottom): horizontal bar with a hairline top border.
  - Left: `Button` (default — 4px black) `← Back to Clinical Library` linking to `/education`.
  - Right: muted text link `Next: What Are Peptides? (SS-SERIES-000A) →` linking to `/library/what-are-peptides` (placeholder route — page not built in this pass; link is wired so the next article slots in cleanly).

### 2 · Route registration: `src/App.tsx`

Add one route inside the existing `SiteLayout` block:
```tsx
<Route path="/library/what-is-compounding" element={<LibraryWhatIsCompounding />} />
```
Plus the matching import.

### 3 · Link the Education row: `src/pages/Education.tsx`

In the §1 Foundational Sourcing Standards rows, the entry whose `id === "SS-SERIES-000B"` currently links to `/education/<slug>`. Override that single row's destination to `/library/what-is-compounding` so the row card and the right-edge "Read full article ›" affordance both navigate to the new page. All other rows untouched.

### Files touched

- `src/pages/LibraryWhatIsCompounding.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — conditional `to` for the `SS-SERIES-000B` row only

### What stays the same

`AnchorHeader`, `RecordHeader`, `Section`, the global `SiteHeader`/`SiteFooter`, the 900px filing column, the `container-wide` token, the `Button` primitive, `library.ts`, every other route, and every other Education page element (search, sticky nav, FAQ grid, Clinical Analysis cards, archive footer).

