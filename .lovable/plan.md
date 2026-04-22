

## Institutional Absolute — Final Production Refinements

Layer six tracks of "regulatory chrome" across the platform without disturbing existing copy or routes. All additions are presentational + small utility components.

---

### 1 · Data Integrity & Document Metadata

**New `DocSignature` component** (`src/components/DocSignature.tsx`)
Renders below `BoardCiteFooter` on long-form pages:
```
AUTHORIZED BY · Source Standard Editorial Board
AUTH-ID · {hash}     DATA VERIFIED · 04 / 21 / 2026
```
Hash is deterministic — derived from the page's `docId` (e.g. `SS-ART-04` → `AUTH-04-XB12`). All-mono, hairline top divider, sits inside the cite band.

**`Data Verified` chip in `RecordHeader`**
Add a `verifiedOn` field to the Reference box rendered as `VERIFIED · 04 / 21 / 26` row, mono. Already present on most docs as `UPDATED` — split into `UPDATED` (last edit) and `VERIFIED` (last factual review). Applied to: every Library / FAQ / Analysis / Glossary / About page, and every `GreenlistProfile` / `VendorProfile`.

### 2 · Typography & Micro-Copy

**Mono accent lock** — audit pass: ensure registration numbers, FDA IDs, dates, version strings, and `§N` markers all use `font-mono` (most already do via `meta` / `tabular-nums`). Add a tiny `<Mono>` helper (`src/components/Mono.tsx`) for inline use in body copy: wraps in `font-mono text-[12.5px] tracking-[0.02em] text-foreground`.

**Footnote system** — new `<Footnote>` + `<FootnoteList>` primitives (`src/components/Footnotes.tsx`):
- `<Footnote n={1}>` → renders `<sup>1</sup>` superscript link to `#fn-1`
- `<FootnoteList items=[…]>` → bordered band at page bottom, mono `NOTES · §`, ordered list with backlinks
Wire into `LibraryEndocrinologicalContext`, `LibraryReferenceDosingRanges`, `LibraryAnalysis2026Reclassification`, `FaqLegalRegulatory` where claims need citation.

### 3 · Navigational Intelligence

**Contextual breadcrumb** — new `<Breadcrumb>` component (`src/components/Breadcrumb.tsx`, NOT the shadcn one — uses our `meta` mono style):
```
REGISTRY · 503B · {FacilityName}
```
Hairline bottom border, sits between `SiteHeader` and page header. Applied to:
- `GreenlistProfile` / `VendorProfile` → Registry > [503B|503A] > Name
- `LibraryEntry` and all `Library*` pages → Education > [Series] > Title
- `Faq*` pages → FAQ > [Category]
- `AdvisorProfile` → Medical Advisory > [Name]

**Download as PDF** — new `<DownloadPdfLink>` component, top-right of `RecordHeader` content rail. Phase 1: print-stylesheet-driven (`window.print()` with a `@media print` block in `index.css` that hides nav/footer and forces single-column). Adds `Download · PDF` mono link with a minimal lucide `Download` icon at 14px. Applied to all Library / FAQ / Analysis / About / Status pages.

### 4 · Visual Security Branding

**Faint logo watermark** — add to `BoardSection` an optional `watermark` band for long-form pages. Renders an oversized `Logo` SVG at `opacity-[0.025]` absolute-positioned bottom-right of the section, `pointer-events-none`, `select-none`. Enabled on `MedicalAdvisory`, `About`, `Governance`, `Accountability` only.

**Border discipline pass** — global audit:
- All cards/tables → `border border-border` with `rounded-[4px]` (containers) / `rounded-[2px]` (chips) / `rounded-[4px]` (buttons — already in `button.tsx`)
- Kill any remaining `rounded-lg` / `rounded-md` / `rounded-2xl` / opacity-drift borders (`border-border/40` etc.) on top-level surfaces. Confined to: `Education.tsx`, `HowItWorks.tsx`, `Greenlist.tsx`, `VerifiedVendors.tsx`, `Index.tsx`, `MetadataBar.tsx`.

### 5 · Semantic SEO & Accessibility

**Title tag standardization** — install `react-helmet-async` and add a `<PageMeta title="…" description="…" />` wrapper. Wire `Provider` into `App.tsx`. Format: `{Page Name} | Source Standard — The Clinical Transparency Framework`. Apply to every page (one-line addition each).

**Alt-text + aria audit** — pass over: `Logo.tsx` (add `aria-label`), every `<table>` (add `<caption className="sr-only">`), every status swatch / colored dot (add `role="img" aria-label="…"`), every icon-only button (add `aria-label`). Confined to existing components — no copy changes.

### 6 · Interactive Friction Fixes

**Glossary tooltips** — new `<GlossaryTerm term="aseptic">…</GlossaryTerm>` component using existing `tooltip.tsx`. Pulls from a new `src/data/glossary.ts` (~25 terms: aseptic, cGMP, OAI, 503A, 503B, CoA, USP, peptide, sterile, FDA, MOA, NDC, …). Renders the term with a dotted underline, hover/focus shows a 240px tooltip with definition + `Read full → /status-definitions#term`. Wired into the highest-density technical pages (`LibraryAsepticTechnique`, `LibrarySterilePreparationIntegrity`, `LibraryInterpretingCoAs`, `LibraryDualLayerDifference`, `Greenlist`, `VerifiedVendors`).

**Empty states** — `Greenlist.tsx` and `VerifiedVendors.tsx` filter result handlers: when zero rows, render a bordered `bg-surface-muted` block:
```
NO VERIFIED ENTITIES FOUND
Source Standard has not yet audited a facility matching these filters.
[ Suggest a Facility for Audit → /report-a-concern ]
```
Mono eyebrow, 14.5px body, mono CTA. Replaces current blank-tbody behavior.

---

### Files touched

**New components/data**
- `src/components/DocSignature.tsx`
- `src/components/Mono.tsx`
- `src/components/Footnotes.tsx`
- `src/components/Breadcrumb.tsx` (custom, not shadcn)
- `src/components/DownloadPdfLink.tsx`
- `src/components/PageMeta.tsx`
- `src/components/GlossaryTerm.tsx`
- `src/components/EmptyState.tsx`
- `src/data/glossary.ts`

**Modified primitives**
- `src/components/RecordHeader.tsx` — add `verifiedOn` row + `<DownloadPdfLink>` slot
- `src/components/BoardSection.tsx` — optional `watermark` prop
- `src/components/Logo.tsx` — `aria-label`
- `src/index.css` — `@media print` block, watermark utility

**Wired in**
- `src/App.tsx` — `HelmetProvider` wrap
- All Library / FAQ / Analysis / About / Status / Governance / Accountability pages — `<PageMeta>`, `<Breadcrumb>`, `<DocSignature>`, footnotes where applicable, glossary terms where applicable
- `GreenlistProfile.tsx` / `VendorProfile.tsx` / `AdvisorProfile.tsx` — `<PageMeta>` + `<Breadcrumb>` + verified timestamp
- `Greenlist.tsx` / `VerifiedVendors.tsx` — `<EmptyState>` for zero-result filters, glossary tooltips on column headers, border discipline pass
- `Education.tsx` / `HowItWorks.tsx` / `Index.tsx` — border discipline pass

**Dependencies**
- `react-helmet-async` (single dev dep)

### What stays the same

All routes, all written copy, all data, `RecordHeader` API (additive), `BoardSection` API (additive), `StatusBadge`, `CategoryPill`, `AlertBadge`, `RegulatoryAlert`, the entire MAB DNA layout, registry filtering/sorting/pagination logic, dark-mode behavior, design tokens. Strictly additive chrome + a11y/SEO hygiene.

