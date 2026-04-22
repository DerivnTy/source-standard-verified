

## Restore category-coded badges + table polish

The current pills are flat Safety-Blue, which collides with the Safety-Blue used for interactive accents. Restore the assigned green (503B) and gold/amber (503A) using the existing `--src-*` tokens, applied as soft badges (faint tinted bg + full-strength text + matching dot).

---

### 1 · CategoryPill — soft badge with assigned colors

`src/pages/Greenlist.tsx` — replace `CATEGORY_PILL` and `CategoryPill`:

```tsx
const CATEGORY_PILL: Record<GreenlistCategory, { wrap: string; dot: string }> = {
  "503B": {
    wrap: "bg-[hsl(var(--src-503b-soft))] text-[hsl(var(--src-503b))] ring-1 ring-[hsl(var(--src-503b))]/20",
    dot:  "bg-[hsl(var(--src-503b))]",
  },
  "503A": {
    wrap: "bg-[hsl(var(--src-503a-soft))] text-[hsl(var(--src-503a))] ring-1 ring-[hsl(var(--src-503a))]/20",
    dot:  "bg-[hsl(var(--src-503a))]",
  },
  Other: {
    wrap: "bg-[hsl(var(--src-other-soft))] text-[hsl(var(--src-other))] ring-1 ring-[hsl(var(--src-other))]/20",
    dot:  "bg-[hsl(var(--src-other))]",
  },
};
```

`CategoryPill` renders `inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.1em] tabular-nums` with a `1.5×1.5` rounded-full dot before the label. Faint tinted background, full-strength dot + text — soft badge, not heavy pill. Uses existing `--src-503b/503a/other` + `-soft` tokens (green / amber / slate), so dark mode is automatically correct.

### 2 · Table typography polish

In the desktop row (Greenlist + the equivalent vendor cell in `VerifiedVendors.tsx`):
- Facility / Vendor name: `font-medium` → `font-semibold`, color stays `text-foreground`. Anchor weight for the eye.
- Location, Focus, secondary cells: stay `text-[13px] text-muted-foreground`, weight `font-normal` (already).
- Confirm `font-sans` (Geist/Inter) inheritance — no serif leak. The body already uses Tailwind `font-sans` mapped to Geist/Inter via `tailwind.config.ts`; no class change needed but we add an explicit `font-sans` on the table wrapper as a defensive lock.
- Mobile card: same `font-semibold` on the name.

### 3 · "View →" — subtle muted link

Right-most cell:
- Before: `text-[11px] font-medium uppercase tracking-[0.12em] text-foreground hover:text-primary`
- After:  `text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70 hover:text-primary transition-colors`

Reads as a quiet affordance; lights up Safety Blue only on hover. The whole row is already `cursor-pointer` + hover-tinted, so the link doesn't need to shout.

### 4 · Container — keep what's working

No change to:
- `rounded-[12px]` table wrapper
- Soft layered shadow `shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]`
- Hairline row dividers `border-border/40`
- Sticky filter bar styling
- Stat strip at top
- Methodology accordion at bottom

### 5 · Verified Vendors — typography parity

`src/pages/VerifiedVendors.tsx` only needs:
- Vendor-name cell: `font-medium` → `font-semibold`.
- "View →" cell: same muted-gray → primary-on-hover treatment.

Status pills there already use the verified/pending/destructive token system (correct), no color change needed.

---

### Files touched

- `src/pages/Greenlist.tsx` — `CATEGORY_PILL` + `CategoryPill` reskin, name `font-semibold`, "View →" muted.
- `src/pages/VerifiedVendors.tsx` — name `font-semibold`, "View →" muted.

### What stays the same

All routes, all data, filtering / sorting / pagination, stat strip, sticky filter bar, methodology accordion, container chrome, dark-mode behavior, every other page. Presentational only.

