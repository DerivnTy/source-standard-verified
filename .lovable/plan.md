

## Index.tsx — Hero "Institutional Framework" pass

Add structural detail to the navy 100vh hero so the empty space reads as engineered system, not absence. No new copy. All additions are scoped to the navy `tone` branch of `BriefingHero`; default white plaque used by other pages is untouched.

---

### 1 · Background framework (subtle blueprint)

In `src/components/BriefingHero.tsx` navy branch, layer behind the content:

- **Strengthen `HeroPattern`** opacity from `0.03` → `0.05`, and overlay a second, larger 96px-cell grid at opacity `0.04` for a "nested coordinate" feel (drafting-paper effect). Both white-stroked.
- **Two faint vertical registration lines** at `left: 8.33%` and `right: 8.33%` (1/12 col gutters), `bg-white/[0.06]`, full-height, `w-px`. Reads as panel boundaries.
- **Two faint horizontal registration lines** at `top: 18%` and `bottom: 18%`, `h-px bg-white/[0.06]`, full-width. Frames the centered plaque zone.
- **Four corner crosshair ticks** (12px L-shapes, `border-white/25`, 1px) at the intersections of the registration lines — defines an "active plate" rectangle around the headline group without drawing a visible box.

### 2 · Edge labels (system notation on the side rails)

Inside the navy section, absolutely positioned vertical mono labels on the outer rails (hidden below `md`):

- **Left edge** (`left-6`, vertically centered, `rotate-180`, `writing-mode: vertical-rl` via inline style): `SS-FRAMEWORK-2026.01 · REV 01`
- **Right edge** (`right-6`, vertically centered, `writing-mode: vertical-rl`): `PUBLIC REGISTRY · ACCESS TIER 0`

Both at `font-mono text-[10px] tracking-[0.28em] text-white/40 uppercase`. Pure environmental cues.

### 3 · Top corner reference markers

Two small mono blocks pinned just under the top registration line (`top-[18%]`, hidden below `md`):

- **Top-left** (`left-[8.33%]` + small offset): two stacked lines
  ```
  COORD          N 38.9072° · W 77.0369°
  PLATE ID       SS · 01 / 01
  ```
- **Top-right** (`right-[8.33%]`, right-aligned): two stacked lines
  ```
  ISSUED         2026.01.15
  REV CYCLE      ANNUAL · INTERIM FLAGS
  ```

`font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase`, label in `text-white/30`, value in `text-white/55`. Each row is `flex gap-4` with the label fixed-width so columns align.

### 4 · Center plate framing

Tighten the centered content group:

- Wrap eyebrow + H1 + divider + statement + actions in a `relative` group with `max-w-[640px]` and add a barely-visible inset frame: `before:` and `after:` pseudo-elements drawn with 4 absolutely-positioned `1px × 14px` and `14px × 1px` ticks at each corner of the group (white/25). Same crosshair language as the background corners but tighter and on the content itself — anchors the plate.
- Add a single `font-mono text-[10px] tracking-[0.22em] text-white/35` line directly above the eyebrow: `▌  PLATE 01 / 01  ▐` (uses the existing eyebrow stack but adds a thin index line above it).

### 5 · Bottom institutional strip (inside hero, above scroll cue)

Replace the lone `▼ CONTINUE` cue with a 3-column mono strip pinned at `bottom-12` spanning the inner `container-wide`. Hairline `border-t border-white/10`, `pt-4`, `font-mono text-[10px] tracking-[0.22em] text-white/45 uppercase`:

```
STATUS · ACTIVE     │     PROTOCOL · SS-FRAMEWORK-2026.01     │     JURISDICTION · UNITED STATES
```

Three `<div>`s in a `grid grid-cols-3`, left/center/right aligned. The `▼ CONTINUE` cue moves to `bottom-4`, sits beneath this strip, smaller (`text-[9.5px]`).

### 6 · Behavior / responsive

- All edge labels, corner markers, and bottom strip are `hidden md:block` (or `md:grid`). On mobile the hero stays exactly as today — only desktop gains the framework density.
- No layout shift to the centered title/statement/actions group. Z-ordering: pattern (z-0) → registration lines + crosshairs (z-10) → edge labels + corner markers + bottom strip (z-20) → centered plate (z-30).
- All colors via `text-white/XX` and `border-white/XX` opacity tokens — no new CSS variables needed.

---

### Files touched

- `src/components/BriefingHero.tsx` — navy branch only: add background registration lines, corner crosshairs, vertical edge labels, top-corner reference markers, center-plate corner ticks, and bottom institutional strip. Default branch unchanged.
- `src/components/HeroPattern.tsx` — accept optional `cellSize?: number` prop (default `32`) so the hero can render a second 96px overlay grid using the same component. No breaking changes.

### What stays the same

`BriefingHero` API for all other pages, all copy on the home hero, the two ghost-button actions, the navy color palette, `GlobalUtilityBar`, every block below the fold on Index, and the mobile rendering of the hero.

