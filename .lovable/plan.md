

## DocJumpBar: Re-introduce Smooth Pill Morph (Subtle)

Bring back the scroll-scrubbed morph, but keep it pill-shaped throughout — only width, height, and inner spacing change. No square-bar transformation.

### Changes (`src/components/DocJumpBar.tsx`)

1. **Restore scroll-progress tracking**: re-add `progress`/`eased` state, scroll listener with rAF, seam-based computation over a ~200px runway.

2. **Interpolated geometry (subtle, pill always)**:
   - `width`: 86% → 96%
   - `maxWidth`: 1200px → 1360px
   - `paddingY` (chip vertical): 6px → 3px (vertical minimize)
   - `nav` vertical padding: lerp inner py 8px → 4px
   - `borderRadius`: stays `9999px` (always pill)
   - `boxShadow`: stays constant
   - `gap` between items: 8px → 14px
   - `itemPaddingX`: 10px → 14px
   - `justifyContent`: items slide toward center via `marginLeft: auto` on the `<ul>` interpolating from 0 → auto effect — implement by lerping a left-margin push, OR simpler: interpolate `justify-content` by using `marginLeft` on ul from `0` (flex-start, hugs "Contents ·") to a computed value that centers the ul within remaining space. Cleanest approach: wrap with `justify-content: flex-start` always, but add a spacer that grows — or use `marginLeft: lerp(0, auto-equivalent)`. **Simplest**: set ul `marginLeft` to `lerp(0, (containerWidth - contentsLabelWidth - ulWidth) / 2, eased)` — too complex. **Use this instead**: keep flex-start but increase `gap` between the "Contents ·" label and the `<ul>` via interpolation from 14px → a larger value that effectively pushes the ul rightward toward visual center. Actually the cleanest: change the outer flex container's `justifyContent` from `flex-start` to `center` via... we can't lerp justify-content. 
   
   **Final approach for centering**: Use `marginLeft: auto` on the `<ul>` always, with a `marginRight: lerp(0, auto-equivalent)`. Even simpler: give the ul `margin-left: auto` and the "Contents ·" label `margin-right: auto` when expanded. Best: interpolate a `marginLeft` value on the ul from `0` to a large fixed push (e.g., `lerp(0, 80, eased)` px) to slide it toward center as the bar widens.

3. **Keep**: `headerVisible` sticky `top` with 200ms transition, IntersectionObserver for active state, seam zone.

### Result

- At rest: pill at 86% width, comfortable vertical padding, items left-aligned after "Contents ·".
- On scroll: pill smoothly widens to 96%, slims vertically, items spread (larger gap) and slide rightward toward visual center.
- Always pill-shaped, always shadowed, no square-bar morph, no scrollbar flash (overflow hidden retained).

