

## Article-Page Editorial System

The 13 Library article pages currently inherit the same heavy regulatory chrome the policy/about pages use: a 4/8 split `RecordHeader` and a `BoardSection` grid where every section title sits in a cold left meta column with `§N · CATEGORY` overhead. That treatment is correct for governance docs but wrong for public educational reading. This task introduces a dedicated **article** layer — same family, calmer rhythm — and routes every Library article through it. No copy changes.

---

### 1 · New `ArticleHeader` component

`src/components/ArticleHeader.tsx` — replaces `RecordHeader` on article pages.

Composition (single centered editorial column, max-w-[760px]):
- **Back link** at top — `← Back to Resource Library` (or label override). Small, muted, `text-[12px]`, with subtle underline-on-hover. Sits above the eyebrow with `mb-8` air. Restrained editorial nav, not a button.
- **Eyebrow** — `.eyebrow` token, sentence-cased category (e.g. "Foundational Series").
- **H1 title** — `.title-page`, left-aligned, `max-w-[22ch]` for tight wrapping.
- **Lead** — `text-[18px] leading-[1.6] text-muted-foreground max-w-[58ch]`, slightly larger than body so it reads as an editorial deck.
- **Meta strip** — single horizontal row beneath the lead: `Updated · 04 / 21 / 2026  ·  Reviewed by [reviewer]  ·  Doc · SS-SERIES-000A`. Mono `text-[11.5px] text-muted-foreground`, separated by hairline middots. No download CTA, no service-card panel, no Reference box. Quiet.
- Hairline divider beneath the strip transitioning into the article body.

Container: `container-wide py-12 md:py-16`, content centered in the 760px column.

### 2 · New `ArticleSection` component

`src/components/BoardSection.tsx` gets a sibling primitive `ArticleSection` (or new `src/components/ArticleSection.tsx`) — replaces `BoardSection` inside articles.

Composition (single column, no left meta rail):
- Wraps content in the same 760px centered column.
- **H2** — `.h-section`, left-aligned, `mt-12 mb-5` (vertical rhythm between sections, not a section band).
- Optional small `§N` index above the H2 in mono `text-[11px] text-muted-foreground tracking-[0.14em]` — preserves reference credibility without dominating.
- **Body** — `text-[16.5px] leading-[1.75] text-foreground/85`, `space-y-5`. Crucial: this is the standard editorial body size (not the 14.5px muted body used on policy pages).
- No background bands, no `border-b` between sections — sections are separated by typographic rhythm, not by full-width hairline rules.
- `BoardDefList` keeps its current chrome (it's the right register for ordered reference items inside an article) but is rendered inside the 760px column with `my-8`.

The `category` chip is dropped on article pages — `eyebrow` belongs in the header, not on every section.

### 3 · `ArticleFooter` — quiet next/prev + cite

`src/components/ArticleFooter.tsx` (or extension to `BoardSection.tsx`):
- **Prev / Next pair** — two-up layout inside the 760px column. Each cell shows mono `← PREVIOUS` / `NEXT →` overhead and the article title beneath in `text-[15px] text-foreground`. Hairline border-top, no full bordered card, no surface-muted fill.
- **Cite-as line** — single line beneath the prev/next, `text-[12px] text-muted-foreground/80`, mono `Cite as ·` prefix preserved.
- `DocSignature` stays as-is.

### 4 · Route every Library page through the new system

The 13 article pages get a mechanical refactor — same imports swap, same props passed:

- `LibraryWhatArePeptides`, `LibraryWhatIsCompounding`, `LibraryDualLayerDifference`, `LibraryEndocrinologicalContext`, `LibraryAsepticTechnique`, `LibrarySterilePreparationIntegrity`, `LibraryInterpretingCoAs`, `LibraryReferenceDosingRanges`, `LibraryAnalysisMeaningOfVerification`, `LibraryAnalysisQuestionsForYourClinic`, `LibraryAnalysisUndocumentedSourcingSigns`, `LibraryAnalysis2026Reclassification`, `LibraryEntry`.

For each:
- Replace `RecordHeader` with `ArticleHeader` (props mapped: `eyebrow`, `title`, `lead`, `metadata` → flattened into the meta strip, `backHref="/education"`, `backLabel="Back to Resource Library"`).
- Replace `BoardSection` with `ArticleSection`. Pass `n` as the small index above the H2; drop `category` (it lives in the header eyebrow); drop `muted` (no alternating bands).
- Replace `BoardFooterNav` + `BoardCiteFooter` with `ArticleFooter` (same prev/next/citation props).
- `DocSignature` unchanged.
- `Breadcrumb` unchanged (already correct for editorial nav above the article).
- `BoardDefList` unchanged — re-exported alongside `ArticleSection`.

### 5 · What stays the same

- All copy on every article page.
- `Breadcrumb`, `DocSignature`, `BoardDefList` chrome.
- All routes, all `DOC_ID`s, all `verifiedOn` values.
- Policy/about pages (`Privacy`, `Terms`, `VerificationDisclaimer`, `Governance`, `Accountability`, `MedicalAdvisory`, `About`, `HowItWorks`, `StatusDefinitions`) — they keep `BriefingHero` + `BoardSection` because they're regulatory documents, not editorial articles. Untouched.
- Education hub (`Education.tsx`), basics/guides indexes, FAQ pages — untouched (they're indexes, not articles).
- Homepage cover and chapter hero system — untouched.

### Files touched

- `src/components/ArticleHeader.tsx` — new.
- `src/components/ArticleSection.tsx` — new (exports `ArticleSection`, `ArticleFooter`; re-exports `BoardDefList` from `BoardSection`).
- `src/pages/LibraryWhatArePeptides.tsx`, `LibraryWhatIsCompounding.tsx`, `LibraryDualLayerDifference.tsx`, `LibraryEndocrinologicalContext.tsx`, `LibraryAsepticTechnique.tsx`, `LibrarySterilePreparationIntegrity.tsx`, `LibraryInterpretingCoAs.tsx`, `LibraryReferenceDosingRanges.tsx`, `LibraryAnalysisMeaningOfVerification.tsx`, `LibraryAnalysisQuestionsForYourClinic.tsx`, `LibraryAnalysisUndocumentedSourcingSigns.tsx`, `LibraryAnalysis2026Reclassification.tsx`, `LibraryEntry.tsx` — swap `RecordHeader`/`BoardSection`/`BoardFooterNav`/`BoardCiteFooter` imports for the new article primitives. Mechanical refactor; no copy or structural changes inside sections.

### Outcome

Article pages stop looking like internal regulatory exports. They open with a clear back link, an editorial eyebrow + headline + deck, and a quiet metadata strip — then drop into a single 760px reading column with comfortable 16.5px body text and typographic section rhythm. Reference credibility (small `§N` indices, mono cite-as line, doc signature, def-list chrome) is preserved. Policy and about pages retain their heavier regulatory chrome — the hierarchy now reads as: home cover → chapter pages (policy/about/governance) → editorial articles (Library).

