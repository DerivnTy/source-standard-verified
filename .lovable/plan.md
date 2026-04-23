

## DocJumpBar: Scroll-Linked Width Morph

Replace the binary "resting → docked" snap with a **continuous, scroll-linked width interpolation**. The pill smoothly widens as the user scrolls past the seam zone, and narrows back as they scroll up. No vertical fly-in, no sudden state swap — just width and radius easing in lockstep with scroll position.

### What changes

Single file: `src/components/DocJumpBar.tsx`.

### 1. Kill the "fly-in" transition

The current jarring motion comes from the element switching between `absolute` (inside the seam) and `fixed` (top of viewport) — that positional jump is what looks like "flying up from the bottom." Even with a CSS transition, going from `absolute top-1/2` to `fixed top-64px` cannot tween cleanly because they're different layout systems.

**Fix:** Keep the nav element in **one positioning system the entire time** — `sticky top-[64px]` (or `top-0` when header is hidden). Sticky elements naturally stay in document flow until they hit the top, then stick — no positional jump, no fly-in.

### 2. Scroll-linked width (the "slow widening")

Compute a `progress` value from `0` to `1` based on how far the user has scrolled through a defined range (the seam zone + a short runway, e.g. 200px).

```text
progress = clamp(scrollY / 200, 0, 1)
```

Then interpolate geometry directly from `progress`:

| Property      | progress = 0 (resting pill) | progress = 1 (full bar) |
|---------------|------------------------------|--------------------------|
| width         | 80%                          | 100%                     |
| max-width     | 1200px                       | none (100vw)             |
| border-radius | 9999px                       | 0px                      |
| box-shadow    | shadow-lg                    | none                     |
| border-bottom | 0                            | 1px hairline             |

Apply via inline `style={{ width, borderRadius, boxShadow, ... }}` computed each scroll frame. Because the values are tied directly to `scrollY`, the pill widens *as* the user scrolls and narrows back *as* they scroll up — a true 1:1 scrubbed animation, not a triggered transition.

### 3. Implementation details

- Remove the `docked` boolean state and the `restingClasses` / `dockedClasses` swap.
- Remove the 500ms `transition-all` — we no longer need CSS easing because scroll itself drives the motion.
- Add `useState<number>(0)` for `progress`, updated in the scroll handler via `requestAnimationFrame` for smoothness.
- Nav element: `sticky top-[64px]` (or `top-0` when `!headerVisible`), `mx-auto`, with computed inline styles.
- Seam zone wrapper retains its 44px height + navy/white gradient so the pill still visually straddles the seam at rest.
- Border-bottom opacity is also tied to `progress` (0 → 1) so the hairline fades in as the bar widens.

### Result

```text
scrollY = 0          scrollY = 100         scrollY = 200+
┌──────────────┐     ┌──────────────────┐  ┌────────────────────┐
│ ░navy░░░░░░░ │     │ ░navy░░░░░░░░░░░ │  │ ░navy (gone)░░░░░░ │
│  ╭────────╮  │  →  │ ╭──────────────╮ │ →│════════════════════│  ← full bar
│  │ pill   │  │     │ │  wider pill  │ │  │ Contents · 01 …    │
│  ╰────────╯  │     │ ╰──────────────╯ │  │ ░white body░░░░░░░ │
│ white body   │     │ white body       │  │                    │
└──────────────┘     └──────────────────┘  └────────────────────┘
```

One element, one positioning system, geometry scrubbed by scroll. Simple, clean, reversible.

