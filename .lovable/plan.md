

## DocJumpBar: Slimmer Pill + Smoother, Delayed Dock

Three calibrations to the existing `src/components/DocJumpBar.tsx`. No other files touched.

### 1. Slimmer resting pill

Reduce vertical weight and typography so the pill reads as a refined index tab instead of a banner.

- Seam zone height: `64px` → `44px` (pill stays centered on the navy/white seam, just thinner).
- Resting pill padding: `px-8 py-4` → `px-6 py-2`.
- Docked bar padding: `py-3` → `py-2`.
- Chip text: `text-[14px]` → `text-[12px]`, padding `px-3.5 py-1.5` → `px-3 py-1`.
- "Contents ·" label: `text-[12px]` → `text-[11px]`.
- Pill width unchanged (`w-[80%] max-w-[1200px]`).

### 2. Delayed dock trigger

Currently docks at `scrollY > 220`, which fires before the user has scrolled past the pill itself. Replace the hard pixel threshold with a measurement of the seam zone's own position so the morph only triggers once the pill would otherwise scroll out of view.

- Add a `ref` on the seam zone wrapper.
- In the scroll handler, compute `seamRef.current.getBoundingClientRect().bottom` and set `docked = bottom < headerOffset` (where `headerOffset` is `64` when header visible, `0` when hidden).
- This guarantees the pill stays in its resting position until the user has actually scrolled past it, then docks exactly as it would leave the viewport — no premature snap.

### 3. Smooth pill → bar morph

Today the resting pill and docked bar are two separately-mounted elements (`{!docked && …}` / `{docked && …}`), so React swaps them instantly — that's the "snap." Render a single persistent element whose classes change based on `docked`, so the existing 500ms cubic-bezier transition on `width`, `border-radius`, and `box-shadow` actually animates.

Approach:

- Always render one `<nav>` element. Its className toggles between two states:
  - **Resting**: `absolute` inside the seam zone, `w-[80%] max-w-[1200px]`, `rounded-full`, `shadow-lg`, centered.
  - **Docked**: `fixed inset-x-0 top-[64px]` (or `top-0`), `w-full max-w-none`, `rounded-none`, `shadow-none`, `border-b`.
- Keep the `transition-all duration-500 cubic-bezier(0.4,0,0.2,1)` on the element so the geometry change tweens.
- Add a brief opacity/translate fade on the docked-state border-bottom (appears via transition once docked) so the hairline doesn't pop in.
- The seam zone keeps a fixed height reservation so the body doesn't jump when the pill detaches into `fixed` positioning.

### Result

```text
Resting (slim pill on seam)        After scrolling past pill (smooth morph)
┌──────────────────────────┐       ┌────────────────────────────────────┐
│ ░░░ navy hero ░░░░░░░░░░ │       │ ░░░ navy hero (off-screen) ░░░░░░░ │
│ ┌──────────────────────┐ │  →    ╞════════════════════════════════════╡  ← full-width docked bar
│ │CONTENTS · 01 · 02 …  │ │       │ CONTENTS · 01 · 02 · 03 · 04 · 05  │     thin, hairline border
│ └──────────────────────┘ │       │ ░░░ white body ░░░░░░░░░░░░░░░░░░░ │
│ white body               │       │                                    │
└──────────────────────────┘       └────────────────────────────────────┘
```

Slimmer, calmer, and the morph is one continuous 500ms motion instead of an instant swap.

