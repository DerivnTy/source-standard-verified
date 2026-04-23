

## DocJumpBar: Smooth Header-Reveal Transition

When the main `SiteHeader` re-appears on scroll-up, the DocJumpBar's `top` value snaps from `0px` → `64px` instantly because `headerVisible` is a boolean state change with no easing. The bar visibly jumps down 64px in a single frame.

### Fix

Single file: `src/components/DocJumpBar.tsx`. One small change.

### Animate the `top` offset

Instead of binding `top` directly to `headerVisible`, interpolate it through a local `headerOffset` value that eases between `0` and `64` whenever `headerVisible` flips.

Two viable approaches — going with **CSS transition** since it's the simplest and matches the header's own 200ms ease-out timing:

- Move `top` off inline style and onto a CSS transition: add `transition: top 200ms ease-out` to the nav's style.
- Keep `top` driven by `headerVisible` (`64px` when visible, `0px` when hidden), but because the property now has a transition, the change tweens instead of snapping.
- Match `SiteHeader`'s existing `transition-transform duration-200 ease-out` so the bar slides down in lockstep with the header sliding in — they move as one unit.

### Also: keep scroll-linked geometry untouched

Width, radius, shadow, border opacity, padding, and negative margin all stay as scroll-scrubbed inline styles with no CSS transition. Only `top` gets the 200ms ease — that's the only property that changes via discrete state rather than scroll position, so it's the only one that needs CSS easing.

### Result

- Scroll up past threshold → `SiteHeader` slides down (200ms) and DocJumpBar's `top` eases from `0` → `64px` over the same 200ms. They move together, no jump.
- Scroll down past threshold → header slides up, DocJumpBar eases from `64` → `0`. Same smooth choreography in reverse.
- Pill ↔ bar morph remains scroll-scrubbed and unaffected.

