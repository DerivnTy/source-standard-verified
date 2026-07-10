## Change

Reduce the shared hero → first-section top padding from 32px mobile / 40px desktop to **24px mobile / 32px desktop**. Bottom padding of the first section stays at 32/40 so it doesn't crowd the next section.

## Where

Single source of truth already exists via the `first` prop on `PageSection` and `ArticleSection`. Only two lines change.

### 1. `src/components/system/PageSection.tsx`
- `firstClass`: `pt-8 md:pt-10` → `pt-6 md:pt-8`
- Keep `firstBottomClass` at `pb-8 md:pb-10` (unchanged).

### 2. `src/components/ArticleSection.tsx`
- `firstClass`: `pt-8 md:pt-10` → `pt-6 md:pt-8` (applies to `card`, `prose`, and `callout` variants).

### 3. `src/pages/LearnEducation.tsx`
- The hand-rolled first `<section>` currently uses `pt-8 pb-8 md:pt-10 md:pb-10`. Change top only → `pt-6 pb-8 md:pt-8 md:pb-10` to match the shared rule.

No other files change. Heroes still end at `padding-bottom: 0`. No per-page overrides. No heading/paragraph margin edits.

## Verification

Playwright at 390px and 1280px on:
`/how-it-works`, `/medical-advisory`, `/learn`, `/learn/education`, `/learn/news`, `/learn/faq`, `/privacy`, `/verification-disclaimer`, one Education article, one News article.

Confirm the distance from the hero's bottom edge to the first heading/paragraph is exactly 24px on mobile and 32px on desktop, identical across every page.
