

## Remove Pseudo-Official Chrome Sitewide

Strip the decorative bureaucracy — `DocSignature` bands ("Authorized by · Auth-ID · Data Verified"), the `SS-FRAMEWORK-2026.01 · Active` footer strip, and similar coded metadata theater — and replace the closing language with one disciplined, real statement that does the actual legal/scope work.

---

### 1 · Delete `DocSignature` everywhere

The "Authorized by · Source Standard Editorial Board · AUTH-XX-YY## · Data Verified · 04/21/2026" band is exactly the document-cosplay the user is calling out. It appears at the bottom of ~25 pages.

- Remove the `<DocSignature ... />` render and its `import { DocSignature } from "@/components/DocSignature"` line from every page that uses it: `Accountability`, `Privacy`, `Terms`, `VerificationDisclaimer`, `Governance`, `MedicalAdvisory`, `About`, `HowItWorks`, `StatusDefinitions`, `ForVendors`, `FAQ`, `FaqClinicalSafety`, `FaqLegalRegulatory`, `FaqVerificationProcess`, and the 13 Library article pages (`LibraryWhatArePeptides`, `LibraryWhatIsCompounding`, `LibraryDualLayerDifference`, `LibraryEndocrinologicalContext`, `LibraryAsepticTechnique`, `LibrarySterilePreparationIntegrity`, `LibraryInterpretingCoAs`, `LibraryReferenceDosingRanges`, `LibraryAnalysisMeaningOfVerification`, `LibraryAnalysisQuestionsForYourClinic`, `LibraryAnalysisUndocumentedSourcingSigns`, `LibraryAnalysis2026Reclassification`, `LibraryEntry`).
- Delete the file `src/components/DocSignature.tsx` once unreferenced.
- No empty space replaces it — the existing `ArticleFooter` / `BoardCiteFooter` / page bottoms already terminate cleanly. The `SiteFooter` immediately follows.

### 2 · Strip the top-of-footer "Standard SS-FRAMEWORK-2026.01 · Active" bar

In `src/components/SiteFooter.tsx`, remove the entire top strip (lines 65–74): the `<div className="border-b border-border/60 bg-surface-muted/60">` block containing `Standard SS-FRAMEWORK-2026.01 · Active` and `Reviewed under Medical Advisory Board · Updated 04/21/26`. This is the most visible piece of fake-bureaucracy on every page.

### 3 · Replace the footer closing statement

In `src/components/SiteFooter.tsx`, replace the existing centered paragraph (lines 110–116) with the user's recommended statement, lightly polished for rhythm:

> Source Standard is an independent public-reference and verification framework. Listings reflect documentation reviewed within a defined scope and at a defined point in time. Verification does not constitute medical advice, regulatory approval, or a guarantee of safety, efficacy, or outcome.

Same typography (`text-[12px] text-muted-foreground leading-relaxed`, centered, `max-w-[900px]`). The `© / All rights reserved` row beneath is kept as-is.

### 4 · Remove residual coded-metadata phrasing in body copy

Light, surgical edits — only where the phrase reads as ornamental, not where it's a real reference:

- `src/pages/ForVendors.tsx` line 59 and line 161 — drop the parenthetical `(SS-FRAMEWORK-2026.01)` mentions; the surrounding sentences carry the meaning without the code suffix.
- `src/pages/FAQ.tsx` line 45 — drop the `(SS-FRAMEWORK-2026.01)` parenthetical from the "What does Verified mean?" answer.
- `src/pages/Privacy.tsx` line 28 — drop "Published under SS-FRAMEWORK-2026.01." trailing sentence.
- `src/pages/Terms.tsx` line 17 — keep the citation-format definition (this one is functional: it tells the reader what to write when citing the registry), but tighten to a single document name without the policy-anchor enumeration.
- `src/pages/Index.tsx` `docId` prop on the cover hero — remove the `docId="SS-FRAMEWORK-2026.01"` prop usage so the cover hero stops surfacing a code as a label. (If `BriefingHero` requires it, pass an empty string and conditionally hide.)

`BoardCiteFooter` / `ArticleFooter` "Cite as · …" lines are kept — these are real, useful citation references, not theater.

### 5 · What stays

- `Doc · SS-…` chips in `RecordHeader` / `ArticleHeader` metadata strips — these are actual document identifiers, restrained, useful for citation.
- "Cite as · Source Standard, …" lines in article and board footers — real attribution.
- All `DOC_ID` constants in page files (still consumed by headers and citations).
- `SiteFooter` columns, logo block, copyright row — untouched.
- Page structure, copy elsewhere, all hero / chapter / article systems.

### Files touched

- **Modified:** `src/components/SiteFooter.tsx` (strip top bar + replace closing paragraph), `src/pages/Index.tsx`, `src/pages/ForVendors.tsx`, `src/pages/FAQ.tsx`, `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, plus all ~25 pages that import/render `DocSignature` (mechanical 2-line removal per file).
- **Deleted:** `src/components/DocSignature.tsx`.

### Outcome

The bottom of every page loses its fake-official chrome. There's no more `AUTH-XX-YY##`, no more "Authorized by · Source Standard Editorial Board," no more `SS-FRAMEWORK-2026.01 · Active` strip riding above the footer on every route. In their place, one disciplined sentence in the global footer carries the real scope/disclaimer weight — and that sentence is now the only closing legal statement the site needs.

