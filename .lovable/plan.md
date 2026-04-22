

## Final Global Alignment — Articles, Glossary & Foundational Series

Roll the Medical Advisory Board (MAB) DNA — `RecordHeader` + alternating banded `§N` sections in a 12-col split with `meta` mono indices — across every remaining secondary page. Stop using the centered single-column `<Section>` primitive on these pages; introduce one shared `BoardSection` component so the chrome is identical everywhere and copy is preserved verbatim.

---

### 1 · New shared primitive — `BoardSection`

`src/components/BoardSection.tsx` (new):

```tsx
<section className={`border-b border-border ${muted ? 'bg-surface-muted' : 'bg-background'}`}>
  <div className="container-wide py-12 md:py-16 grid md:grid-cols-12 gap-10">
    <div className="md:col-span-4">
      <p className="meta mb-3">§{n} · {category}</p>
      <h2 className="h-section">{title}</h2>
      {rationale && <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">{rationale}</p>}
    </div>
    <div className="md:col-span-8 text-[14.5px] text-muted-foreground leading-relaxed space-y-4">
      {children}
    </div>
  </div>
</section>
```

Plus a co-located `BoardDefList` (MAB §3 chrome — `border border-border bg-background divide-y`, rows `grid-cols-12 px-5 py-5`, `col-span-2 meta text-primary` index, `col-span-10` body) and `BoardFooterNav` (back / next link bar in `border border-border bg-surface-muted` with hairline-divided cells) to replace every page's footer pattern.

### 2 · Rewrite every Library / FAQ / Analysis page to the new chrome

Same mechanical rewrite for all of these — RecordHeader stays (already correct, just confirm reference IDs use the per-series convention), inner `<Section>` + `<SectionLabel>` + `<DefList>` chains swap to `<BoardSection>` + `<BoardDefList>`, footer buttons swap to `<BoardFooterNav>`. Body copy, def-list items, links, ordering, IDs all preserved verbatim.

Files (15):
- `LibraryWhatArePeptides.tsx`
- `LibraryWhatIsCompounding.tsx`
- `LibraryInterpretingCoAs.tsx`
- `LibraryDualLayerDifference.tsx`
- `LibrarySterilePreparationIntegrity.tsx`
- `LibraryAsepticTechnique.tsx`
- `LibraryEndocrinologicalContext.tsx`
- `LibraryReferenceDosingRanges.tsx`
- `LibraryAnalysisMeaningOfVerification.tsx`
- `LibraryAnalysisUndocumentedSourcingSigns.tsx`
- `LibraryAnalysis2026Reclassification.tsx`
- `LibraryAnalysisQuestionsForYourClinic.tsx`
- `FaqLegalRegulatory.tsx`
- `FaqClinicalSafety.tsx`
- `FaqVerificationProcess.tsx`

For the three FAQ pages: keep the `<Accordion>` (the Q&A drawer is the right UI) but wrap it inside a `<BoardSection n={1} category="Category Overview" title="…">`. Footer becomes `<BoardFooterNav>`.

Reference-ID convention used in `RecordHeader` metadata (already in place across most files, normalize where missing):
- Foundational series → `SS-SERIES-NNN`
- Clinical guides → `SS-GUIDE-NNN`
- Analyses → `SS-ANALYSIS-NNN`
- FAQ categories → `SS-FAQ-CAT-NN`

### 3 · `StatusDefinitions.tsx` (Glossary) — adopt MAB roster pattern for terms

Reference box already correct (`SS-STATUS-2026.01`). The §2 standings list is currently a `divide-y` block — convert to the MAB roster grid: `<ul className="grid md:grid-cols-2 gap-px bg-border border-x border-b border-border">` with each standing as a bordered `bg-background p-6` cell carrying:

- `STANDING · NN` mono chip (top-left, mirrors `SEAT · 01`)
- Colored swatch + label
- `Definition / Public-record signal / Limits / Conditions of issuance / Conditions of revision` rendered as a tight `dl` with `meta` labels and `text-[14.5px]` bodies (locked to Board sizing — drop the current `text-[15px]`).

§1, §3, §4 wrap in `<BoardSection>` with alternating bands. §3 lifecycle `<ol>` adopts MAB §3 chrome (`border border-border divide-y`, `grid-cols-12` rows, `col-span-2 meta text-primary` `01..06` index, `col-span-10` body).

### 4 · `LibraryEntry.tsx` (placeholder dynamic page) — Board chrome

The "still writing this one" placeholder becomes a single `<BoardSection n={1} category="Status" title="In editorial review">` with the explainer text in the right rail, and the related-entries list rendered as a second `<BoardSection n={2} category="Related references">` using the MAB roster pattern (`gap-px bg-border` grid of bordered cells, `ENTRY · NN` mono chip + title + `Read →` link).

### 5 · Global style lock

- Body copy on all rewritten pages: `text-[14.5px] text-muted-foreground leading-relaxed`; emphasis lines `text-foreground font-medium`.
- Eyebrows: `meta mb-3` + `§N · CATEGORY`.
- Section titles: `h-section`.
- All section padding: `py-12 md:py-16`. Alternating `bg-background` ↔ `bg-surface-muted` per section.
- Dividers: `border-b border-border` only — no `/40` `/60` opacity drift.
- No icons, no `SourceCheck` bullets on any of these pages — `01..` mono prefixes or `·` dots only.
- Every page ends with the MAB-style cite footer band: `bg-surface-muted py-8`, mono `Cite as · {ID}` label.

---

### Files touched

**New**
- `src/components/BoardSection.tsx` — exports `BoardSection`, `BoardDefList`, `BoardFooterNav`, `BoardCiteFooter`.

**Rewritten (chrome only — copy/data verbatim)**
- All 12 `Library*.tsx` pages
- All 3 `Faq*.tsx` category pages
- `StatusDefinitions.tsx`
- `LibraryEntry.tsx`

### What stays the same

All routes, all written copy and def-list data, all reference IDs (where already correct), `RecordHeader`, `Section`/`SectionLabel` (still used by Privacy / Terms / Accountability / Disclaimer / Governance / About-adjacent pages), `Accordion` for FAQs, `Callout`, `RelatedDocs`, `StatusBadge`, `CategoryPill`, `AlertBadge`, every page already on the MAB DNA (Board, About, Education, HowItWorks, Greenlist/Vendors hero), tokens, dark-mode behavior. Presentational + structural realignment only.

