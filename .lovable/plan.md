

## DocJumpBar: Eliminate Horizontal Scroll Glitch During Morph

When the pill morphs into the full-width bar, a horizontal scrollbar flashes and the contents jitter sideways. Cause: as the outer `<nav>` width interpolates from 80% → 100%, the inner content's intrinsic width briefly exceeds the container, triggering overflow. The inner padding/layout isn't being scrubbed in lockstep with the outer geometry.

### Fix

Single file: `src/components/DocJumpBar.tsx`.

### Changes

1. **Clip overflow on the nav itself.** Add `overflow: hidden` to the nav's inline style. This guarantees no horizontal scrollbar can ever appear during the morph, regardless of transient inner width.

2. **Smoothly interpolate inner horizontal padding.** Currently `PillContents` receives a `paddingX` prop but the inner flex row uses fixed `gap` and item padding. Interpolate the inner gap and item horizontal padding alongside `progress`:
   - Gap: lerp from compact (e.g. `8px` at pill) → roomy (e.g. `24px` at full bar).
   - Item padding-x: lerp from `10px` → `16px`.
   - Apply via inline style on the flex container and each item, not className swaps.

3. **Stabilize the contents container width.** Set the inner flex row to `width: 100%` and `justify-content` interpolated from `flex-start` (pill, where contents hug left after the "Contents" label) to `space-between` or stay `flex-start` — actually keep `flex-start` throughout and let the gap interpolation handle the spread. Add `min-width: 0` to prevent flex children from forcing overflow.

4. **Remove any remaining className-based layout swap** in `PillContents` — everything geometric goes inline and scrubbed by `progress`.

### Result

- No horizontal scrollbar ever appears (clipped at nav level as a safety net).
- Inner items spread out continuously as the bar widens — gap and padding scrub with the same eased `progress` as the outer geometry.
- One unified morph: outer width, radius, shadow, border, padding, AND inner gap/item-padding all move together. No jitter, no scrollbar flash.

