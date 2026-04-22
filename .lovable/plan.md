

## Modernize the registry table chrome

Lift the Greenlist + Verified Vendors tables out of the "spreadsheet" look without changing any data, layout, or behavior. Soften the container, refine the header, modernize source-type badges, add row hover affordance, and polish the search/filter inputs.

---

### 1 · Soften the table container

In both `src/pages/Greenlist.tsx` and `src/pages/VerifiedVendors.tsx`, the desktop table wrapper changes:

```text
before:  rounded-xl  border border-border/60  bg-surface  shadow-sm
after:   rounded-[12px]  border border-border/40  bg-card
         shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]
```

- No vertical column dividers anywhere (none exist today — confirmed; just locking the rule).
- Row separators thinned: `border-b border-border/50` → `border-b border-[hsl(var(--border))/0.6]` rendered as a 1px hairline using the existing `--border` token (matches `#F1F5F9` family in light mode, theme-aware in dark mode — we won't hardcode `#F1F5F9` so dark mode survives).
- Last row keeps `last:border-b-0`.

### 2 · Clean header row

Header strip restyled in both pages:
- Background: `bg-surface-muted/60` → `bg-transparent` with a single `border-b border-border/50` underline (no filled bar).
- Padding: `py-2` → `py-3` for breathing room.
- Label typography: `text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground` → `text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70` — tighter weight, wider tracking, muted-navy tone (uses `foreground` at 70% so it reads as professional terminal navy in light, soft slate in dark).

### 3 · Interactive rows

Row className updates (both pages):
- Add `cursor-pointer` (rows already navigate via inner `<Link>`; the cursor change makes the whole row feel actionable).
- Hover: `hover:bg-surface-muted/50` → `hover:bg-primary/[0.04]` — very faint Safety-Blue wash.
- Keep `transition-colors`.
- Padding stays at `py-2` (density preserved per prior directive).

### 4 · Modern Source-Type pills (Greenlist)

`CategoryPill` in `Greenlist.tsx` (lines 54-62) becomes a true pill, not a dot+text label:

```tsx
const CATEGORY_PILL: Record<GreenlistCategory, string> = {
  "503B": "bg-primary/10 text-primary ring-1 ring-primary/15",
  "503A": "bg-surface-muted text-foreground/80 ring-1 ring-border/60",
  Other:  "bg-[hsl(var(--src-other))]/12 text-foreground/80 ring-1 ring-border/60",
};
```

Rendered as `inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.1em]`. The colored dot is removed from the pill (the tinted background carries the category cue).

The legend `dot` swatches in the stat-card top row are unchanged — dots still serve as the legend; pills serve as the in-row scanner.

`VerifiedVendors.tsx` keeps its existing `<StatusBadge>` (already pill-shaped); no change needed there.

### 5 · Refined search + filter UI

Search input (both pages) — the magnifying glass already exists; just refresh chrome:

```text
before:  border border-border/70  hover:border-border-strong
         focus-visible:ring-[3px] focus-visible:ring-primary/20
         focus:border-primary/60   h-10 rounded-md
after:   border border-border/50  bg-card
         hover:border-border-strong
         focus:border-primary  focus-visible:ring-[3px] focus-visible:ring-primary/15
         h-10 rounded-[10px]   shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]
```

Selects + Reset button get the matching softer treatment: `border-border/50`, `rounded-[10px]`, `bg-card`, `focus:border-primary`. Heights stay at `h-9` for compactness.

Sticky filter-bar wrapper background lightens slightly: `bg-background/85` → `bg-background/90` and gains a tiny `shadow-[0_1px_0_hsl(var(--border)/0.6)]` instead of the current `border-y` to reduce visual weight (single hairline beneath only).

### 6 · Mobile cards — same visual language

Mobile `card-elevated` cards in both pages get:
- `rounded-[12px]` (already close, lock it).
- Same hover: `hover:bg-primary/[0.04]`.
- `cursor-pointer` (they're already `<Link>`s; explicit class for consistency).

---

### Files touched

- `src/pages/Greenlist.tsx` — container chrome, header row, row hover, `CategoryPill` reskin, search/filter polish, mobile card alignment.
- `src/pages/VerifiedVendors.tsx` — container chrome, header row, row hover, search/filter polish, mobile card alignment.

### What stays the same

All routes, all data, all filtering / sorting / pagination logic, the at-a-glance stat strip, the methodology accordion, every other page, `SourceCheck`, `StatusBadge`, `AnchorHeader`, `HoverCard`, the global token system, dark-mode behavior. Presentational only.

