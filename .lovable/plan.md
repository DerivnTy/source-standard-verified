## Homepage Hero — Mobile Bottom Spacing Refinement

**File**: `src/components/BriefingHero.tsx` (only — `isNavy && isCover` branch, used solely by the homepage)

### Root cause
The cover hero forces `minHeight: "calc(100dvh - 84px)"` on both the outer `<section>` and the inner page-shell wrapper. On a 390×844 mobile viewport, this stretches the navy surface to fill the entire dynamic viewport, producing a large empty navy block below the second CTA.

### Change
1. **Outer `<section>`**: remove the inline `minHeight` style. Add `lg:min-h-[calc(100dvh-84px)]` so the full "book cover" effect is preserved on desktop only.
2. **Inner wrapper**: remove the inline `minHeight` style. Add `lg:min-h-[calc(100dvh-84px)]` so desktop layout is unchanged.
3. **paddingBottom**: change from `clamp(56px, 8vh, 88px)` to `clamp(64px, 8vh, 88px)` so mobile lands at ~64px navy breathing room below the final CTA (within the requested 56–72px range).
4. **paddingTop**: unchanged — preserves spacing above the H1.

### Preserved (no changes)
- Hero title, statement, live registry stats (`heroMetrics`), CTA labels and routes (`actions`), `heroMeta`
- All gaps between title → description → metrics → CTAs
- `chapter` and default (white) hero variants
- Header, hamburger menu, logo, footer, typography, colors, animations
- Desktop appearance (full dynamic-viewport "book cover" via `lg:min-h-[calc(100dvh-84px)]`)

### Result
On mobile, the navy hero ends ~64px below the second CTA instead of stretching to fill the viewport. Desktop is visually unchanged.