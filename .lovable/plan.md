

## Align stats panels — vertical, ledger-style, both pages matching

Make the stats aside on **Vendor Compliance Registry** and **Upstream Facility Registry** look like the same component: vertical list, numbers right-aligned on a shared column, labels left-aligned on a shared column, identical type scale and spacing. Cleaner, denser, government-ledger feel.

### Shared spec (applied to both pages)

Container:
- `rounded-md border border-border/60 bg-surface-muted/40 overflow-hidden`
- `min-w-[280px] md:min-w-[300px]` so labels never wrap
- Header strip: `Registry index` (left, mono uppercase 10px) · `Live` (right, muted 9.5px), divider underneath

Rows (vertical stack on `bg-background`, separated by `divide-y divide-border/50`):
- Row layout: `flex items-center gap-3 px-3.5 py-2.5`
- Leading 3px tall colored bar (`w-[3px] h-4`) — category/status color
- Label: `flex-1 text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground` (single line, no wrap)
- Value: fixed-width right column `w-10 text-right text-[18px] font-mono font-medium tabular-nums leading-none text-foreground`, two-digit `padStart(2,"0")`

This guarantees every number sits on the same vertical axis on both pages.

### `src/pages/VerifiedVendors.tsx` (lines ~164–186)

Keep current 4 rows, just retune to the shared spec (widen container, fixed value column, tighter row padding, `h-4` bar):
- Total Tracked Entities — `bg-border`
- Compliant (Verified) — `bg-verified`
- Under review — `bg-pending`
- Non-Audited (Unverified) — `bg-muted-foreground/40`

### `src/pages/Greenlist.tsx` (lines ~216–236)

Replace the current 4-column grid with the same vertical-stack pattern:
- Total — `bg-border`
- 503B — `bg-[hsl(var(--src-503b))]`
- 503A — `bg-[hsl(var(--src-503a))]`
- Other — `bg-[hsl(var(--src-other))]`

Header strip text remains `Registry index` / `Live` to match the Vendor page exactly.

### Result

Both first sections now show an identical ledger-index card: numbers vertically aligned on a single right-edge column, labels aligned on a single left column, identical row height, identical typography. The two pages read as one system.

