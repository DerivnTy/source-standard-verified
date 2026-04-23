

## DocJumpBar: Eliminate the Final Snap

The remaining "snap" is because `PillContents` has a hard className swap at `progress > 0.95`:

```tsx
flush ? "container-wide py-2" : "px-6 py-2"
```

At 95% progress, the inner padding/container instantly switches — that's the visible jolt right before the bar finishes widening. Geometry on the outer `<nav>` is already smooth; the inner content just isn't.

### Fix

Single file: `src/components/DocJumpBar.tsx`. Two small changes.

### 1. Remove the binary `flush` swap

Drop the `flush` prop and the `container-wide` / `px-6` ternary. Replace with **interpolated horizontal padding** driven by the same `progress` value already powering width and radius.

- At `progress = 0` (resting pill): `paddingLeft / paddingRight = 24px` (matches today's `px-6`).
- At `progress = 1` (full bar): `paddingLeft / paddingRight = max((viewportWidth - 1200) / 2, 24)` — i.e. the inner content aligns with the site's `container-wide` max-width, but reached by smooth interpolation rather than a class swap.

Apply as inline style on the inner flex row so it eases continuously alongside the outer geometry.

### 2. Tighten the runway and easing

Right now `RUNWAY = 200px` of scroll drives the morph, but the inner-padding jump made the last 5% feel abrupt. With padding now interpolated:

- Keep `RUNWAY = 200`.
- Apply a gentle ease curve to `progress` before interpolating geometry: `eased = progress * progress * (3 - 2 * progress)` (smoothstep). This softens both ends so the morph eases in from rest and eases out into the docked state instead of arriving linearly.
- Use `eased` for width, radius, shadow, border opacity, padding, and the negative top margin — every interpolated value gets the same curve, so they stay in lockstep.

### Result

- Outer width, radius, shadow, border: continuous (already working).
- Inner padding: now also continuous — no class swap at 95%.
- Smoothstep easing: motion settles gracefully at both endpoints instead of snapping into place.

One consistent, scrubbed morph from pill to bar with no remaining discontinuities.

