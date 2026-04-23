

## SiteHeader: Require Stronger Scroll-Up Intent

Currently `SiteHeader` re-appears after just `delta < -8` pixels of upward scroll — so any small upward nudge (trackpad inertia, reading rhythm) reveals it. That feels twitchy and pulls the DocJumpBar down with it.

### Fix

Single file: `src/components/SiteHeader.tsx`. Change the reveal trigger from a per-frame delta check to an **accumulated upward-scroll distance** that must exceed a meaningful threshold before the header shows.

### Logic change

Replace the current `delta < -8` instant trigger with an accumulator:

- Track `upwardAccum` across scroll events.
- On downward scroll (`delta > 0`): reset `upwardAccum = 0` and hide if past `y > 120`.
- On upward scroll (`delta < 0`): add `-delta` to `upwardAccum`. Only call `setVisible(true)` once `upwardAccum > 400` (roughly half a viewport section — a clear "I want to navigate away" gesture, not a reading micro-correction).
- At `y <= 0` (top of page): always visible, reset accumulator.

### Result

- Small upward scrolls during reading: header stays hidden, DocJumpBar stays docked at `top: 0`. No twitch.
- Sustained upward scroll (~400px, roughly half a section): header slides in, DocJumpBar eases down with it via the existing 200ms `top` transition.
- Scroll-to-top: header always visible at `y = 0`.

Threshold of 400px is tunable — that's "user is clearly reversing direction to leave," not "user paused."

### No other files touched

DocJumpBar already eases its `top` via CSS transition, so it inherits the smoother behavior automatically.

