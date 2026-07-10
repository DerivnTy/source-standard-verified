## Goal

Rework desktop (and `xl:`) spacing so it feels editorial and dense like Stripe/Linear/Vercel — not an enlarged mobile layout. Mobile stays pixel-identical. No changes to typography, colors, components, or copy.

## Where the excess comes from

The last pass grew every `lg:`/`xl:` padding token upward (heroes to `lg:pt-20 lg:pb-16`, sections to `lg:!py-20`, `section-pad` to `py-72` at xl, chapter heroes doubling), and content containers stayed narrow (`w-standard` 1120 / `w-reading-wide` ~720). Net effect on desktop: tall heroes, huge gaps between sections, narrow prose columns.

The fix is to pull those `lg:`/`xl:` values back down and slightly widen the content containers — all in shared primitives so every page benefits from one edit.

## Changes

### 1. Vertical rhythm (tighten desktop, keep mobile)

- `src/components/system/PageSection.tsx`
  - `first` block: `pt-10 md:pt-14 lg:pt-20 pb-10 md:pb-12 lg:pb-16` → `pt-10 md:pt-12 lg:pt-14 pb-10 md:pb-10 lg:pb-12`
  - Default non-first: `md:!py-12 lg:!py-20` → `md:!py-10 lg:!py-14`
  - Compact non-first: `md:!py-10 lg:!py-14` → `md:!py-8 lg:!py-10`

- `src/components/BriefingHero.tsx` (navy chapter hero)
  - `pt-6 pb-6 md:pt-12 md:pb-10 lg:pt-20 lg:pb-16` → `pt-6 pb-6 md:pt-10 md:pb-8 lg:pt-14 lg:pb-10`

- `src/components/PageHeader.tsx`
  - Inline `paddingTop: clamp(44px, 5vh, 64px)` and `paddingBottom: 24px` → add `lg:` cap so hero never exceeds ~72px top / 28px bottom on desktop.

- `src/index.css`
  - `.section-pad` at `xl`: `py-72 px-56` → `py-56 px-48` (roughly 96px vertical instead of 120px).
  - `.section-pad` at `lg`: reduce ~15%.

- `src/components/DocLayout.tsx` / `RegistryLayout.tsx`
  - Drop `xl:py-24` back to `xl:py-16`.

### 2. Content width (widen desktop reading measure)

- `src/index.css`
  - `w-standard`: keep 1120 at `lg`, 1240 at `xl` (unchanged).
  - `w-reading-wide`: raise from ~720px to `820px` at `lg` and `860px` at `xl`. This is the editorial column used by Library/Learn prose.
  - `w-hero`: raise hero text max-width so headings can occupy 60–72ch on desktop instead of wrapping like mobile.

### 3. Header/footer compaction

- `src/components/SiteHeader.tsx`
  - Reduce `lg:` vertical padding by one step; tighten nav-item gap (`lg:gap-6` → `lg:gap-4`).

- `src/components/SiteFooter.tsx`
  - `pt-10 md:pt-14 lg:pt-16 pb-6 md:pb-12 lg:pb-10` → `pt-10 md:pt-12 lg:pt-12 pb-6 md:pb-8 lg:pb-8`.
  - Row gap: `gap-y-10 md:gap-y-14` → `gap-y-10 md:gap-y-10`.
  - Legal band: `mt-9 md:mt-14 pt-5 md:pt-6` → `mt-8 md:mt-10 pt-5`.

### 4. Hero shape

Consumer/homepage cover hero already uses `clamp()` so it stays fine. Chapter heroes are the main offender and are handled in §1. No copy/structure changes.

## Non-goals

- No copy, colors, component structure, or typography changes.
- No mobile changes — every edit is gated behind `md:`/`lg:`/`xl:` or applies to values that were only introduced for those breakpoints.
- No new components; only edits to shared primitives + `index.css` + header/footer.

## Verification

Playwright screenshots at 390 / 1024 / 1440 / 1680 on: `/`, `/about`, `/verified`, `/learn`, `/library/faq/verification-process`, a vendor profile, `/apply`. Confirm:

- Mobile (390) diff = 0 against current.
- Desktop hero height drops ~30%.
- Gap between hero and first section drops ~40%.
- Prose column widens to ~820–860px on desktop.
- Footer height drops ~25%.

## Rollout order

1. `PageSection` + `BriefingHero` + `PageHeader` (biggest visible win).
2. `index.css` tokens (`.section-pad`, `w-reading-wide`, `w-hero`).
3. `SiteHeader` + `SiteFooter`.
4. `DocLayout` / `RegistryLayout` xl trim.
5. Playwright sweep at 4 viewports.
