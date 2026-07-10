
# Tablet & Desktop Optimization Pass

Mobile is locked. This work only adds `md:` (≥768px) and `lg:` (≥1024px) / `xl:` (≥1280px) modifiers on top of existing classes — no mobile class is edited, no copy changes, no components restyled, no colors/typography tokens changed. All existing semantic tokens, spacing scale, and component variants stay exactly as they are.

## Approach

Rather than rewrite each page, we standardize four shared layout primitives first, then sweep pages to opt into them at breakpoints. This keeps the mobile DOM identical and confines desktop behavior to a small surface.

### 1. Shared layout primitives (additive only)

- **`Section.tsx`** — extend `container` prop so `tight | narrow | wide` map to responsive max widths:
  - tight: `max-w-[680px]` (editorial reading)
  - narrow: `md:max-w-[860px] lg:max-w-[960px]`
  - wide: `md:max-w-[1080px] lg:max-w-[1240px] xl:max-w-[1320px]`
  Add responsive vertical rhythm: `py-12 md:py-16 lg:py-24` where currently a single mobile value is used. Horizontal padding: `px-5 md:px-8 lg:px-12`.
- **`SiteHeader.tsx`** — widen inner container `md:px-8 lg:px-12`, allow nav row to breathe at `lg:` (increase gap between links); mobile menu untouched.
- **`SiteFooter.tsx`** — already has `md:` row; add `lg:max-w-[1240px]` and `lg:px-12` on the outer container, `lg:grid-cols-4` for the link columns if currently stacked.
- **`BriefingHero.tsx` / `PageHeader.tsx`** — hero title scales via `md:text-[…] lg:text-[…]` using the existing `ss-hero-title` size ladder (add a `lg:` step only — no new token). Lead paragraph max width bumps to `lg:max-w-[72ch]`. Hero vertical padding grows `md:py-20 lg:py-28`.

### 2. Grid / card sweeps

For pages listing cards or records, add responsive grid columns only:
- `Learn.tsx`, `Education*.tsx`, `LibraryPublications.tsx`, `LibraryCategory.tsx`, `LearnNews.tsx`, `LearnFaq.tsx`, `MedicalAdvisory.tsx`, `BoardSection.tsx` → `md:grid-cols-2 lg:grid-cols-3` (or `lg:grid-cols-2` for wider editorial cards).
- `VerifiedVendors.tsx` / `Greenlist.tsx` registry rows → keep single-column table feel; widen container to `lg:max-w-[1240px]` and let the query bar spread with `lg:grid-cols-[1fr_auto_auto]`.
- `Index.tsx` hero + feature strip → 2-up on `md`, 3-up on `lg` where currently stacked.

### 3. Editorial pages (guides, articles, library entries, docs)

`LearnGuide.tsx` + `LearnGuideTemplate.tsx`, `ArticleSection.tsx`, `LibraryEntry.tsx`, `LibraryAnalysis*`, `DocLayout.tsx`, `HowItWorks.tsx`, `HowToReadTheDirectory.tsx`, `Governance.tsx`, `Accountability.tsx`, `StatusDefinitions.tsx`, `VerificationDisclaimer.tsx`, `Terms.tsx`, `Privacy.tsx`, `About.tsx`:
- Body text column: `lg:max-w-[720px]` centered.
- On `lg:`, `LearnGuideTemplate` and `DocLayout` switch to a two-column shell with sticky TOC:
  `lg:grid lg:grid-cols-[220px_minmax(0,720px)] lg:gap-16 xl:grid-cols-[240px_minmax(0,760px)_1fr]`
  Mobile keeps current single-column inline TOC.
- Callouts, footnotes, `MetadataBar`, `KeyTakeaway` inherit the same reading column width.

### 4. Profile & record pages

`VendorProfile.tsx`, `GreenlistProfile.tsx`, `AdvisorProfile.tsx`, `RecordHeader.tsx`, `ProfileHeader.tsx`:
- `lg:` two-column shell: primary column `minmax(0,780px)` + right rail `320px` for status badges / integrity summary that currently stack below on mobile.
- Widen `RegistryLayout` container at `lg:` and `xl:`.

### 5. Forms & utility pages

`Apply.tsx`, `Contact.tsx`, `ReportConcern.tsx`, `Unsubscribe.tsx`, `FAQ.tsx`, `Faq*` subpages:
- Center form at `md:max-w-[640px] lg:max-w-[720px]`.
- FAQ list gets `lg:grid-cols-[240px_minmax(0,760px)]` with a sticky category rail; on mobile the rail hides (existing behavior).

### 6. Verification pass

For each of Mobile / Tablet (768, 1024-adjacent) / Desktop (1280, 1440) we visually verify with Playwright screenshots on: `/`, `/verified`, `/greenlist`, a vendor profile, `/learn`, a `/learn/:topic` guide, a library entry, `/apply`, `/contact`, `/how-it-works`, `/status-definitions`, `/about`, `/faq`. Mobile must be pixel-identical to current output; tablet and desktop show the new breathing room and grids.

## Non-goals

- No copy edits, no new sections, no icon or color changes.
- No changes to `index.css` tokens beyond (optionally) adding one `lg:` step to the existing hero size utility.
- No refactor of components' internal structure — only class list additions gated by `md:` / `lg:` / `xl:`.
- Mobile menu, mobile hero, mobile nav, mobile card stack all untouched.

## Rollout order

1. Primitives: `Section`, `SiteHeader`, `SiteFooter`, `BriefingHero`, `PageHeader`, `DocLayout`, `RegistryLayout`.
2. Home + directory pages (`Index`, `VerifiedVendors`, `Greenlist`, profile pages).
3. Editorial system (`LearnGuideTemplate`, `ArticleSection`, `LibraryEntry`, library analyses).
4. Learn hub + news + FAQ.
5. Forms + policy pages.
6. Full multi-viewport Playwright sweep, then fix regressions.
