

## DocJumpBar: Lock to Pill Shape

Drop the morph entirely. The bar stays a pill at all times — at its widest/most-extended form (80% width, fully rounded, with shadow). Scrolling no longer changes shape, only sticky position.

### Changes (`src/components/DocJumpBar.tsx`)

1. Remove `progress`, `eased`, `lerp`, all interpolated geometry, and the scroll listener that drives them.
2. Keep: `headerVisible` for sticky `top`, `IntersectionObserver` for `activeId`, seam zone for visual split.
3. Nav style becomes static: `width: 80%`, `maxWidth: 1200px`, `borderRadius: 9999px`, fixed shadow, fixed border, fixed negative top margin to straddle seam.
4. `PillContents` gets fixed `paddingX`, `gap`, `itemPaddingX` — no props needed for interpolation.
5. Keep `top` CSS transition (200ms ease-out) so header reveal still slides smoothly.

Result: one consistent pill shape, no morph, perfectly smooth sticky behavior.

