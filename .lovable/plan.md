

## Site-Wide UI Refinement Pass — Soften, Modernize, Breathe

A foundation-level pass that updates design tokens and a small set of shared components so every page benefits at once, plus targeted edits to the two highest-traffic pages (Verified Vendors, Greenlist) and the homepage. No content, routing, or data changes.

### 1. Design tokens — `src/index.css`

The cheapest, highest-leverage move. Updating tokens softens every page that uses them.

- **Border radius**: raise `--radius` from `0.125rem` (square) to `0.375rem`. Soft, modern, still restrained. Inputs, cards, buttons, badges all soften at once.
- **Border color**: lighten `--border` from `215 16% 88%` → `215 16% 92%`; keep `--border-strong` for tables/dividers that need definition.
- **Surface tones**: brighten `--surface-muted` `97.5%` → `98.5%` so panel contrast becomes a whisper rather than a band.
- **Shadows**: keep, but introduce them sparingly via component-level changes below — no global glow added.
- **Typography utilities** (in `@layer components`):
  - `.eyebrow` — drop tracking from `0.06em` to `0.04em` (less mechanical), keep weight.
  - New `.section-heading` utility: `text-[1.625rem] md:text-[1.875rem] font-semibold tracking-[-0.012em] leading-[1.2]`. Used by section H2s site-wide.
  - `.meta` / `.meta-label` — slightly lighter color (`text-muted-foreground/90`) for less stamp-like feel.
- **Section rhythm utility**: tighten `.section` to `py-14 md:py-20` (was `py-16 md:py-24`) — more breathing room without wasted scroll.

### 2. Shared component refinements

**`src/components/RecordHeader.tsx`**
- Remove the boxed-summary panel border. Replace with a borderless right column: a small uppercase eyebrow ("Summary"), a thin top hairline, then the dl with `divide-y divide-border/60`. Drops the "framed inside a frame" feeling under the metadata bar.
- Reduce header vertical padding from `py-14 md:py-20` → `py-12 md:py-16`.
- Slightly larger H1 (`md:text-[2.125rem]`) for a more confident hierarchy.

**`src/components/MetadataBar.tsx`**
- Keep the strip but reduce visual weight: `bg-surface-muted/40` (was `/50`), `border-border/40` (was `/60`), gap `gap-x-10`. Reads more like a quiet caption than a banded header.

**`src/components/StatusBadge.tsx`**
- Replace the unicode `■` glyph with a real `inline-block w-1.5 h-1.5 rounded-full bg-current` dot. Cleaner, aligns properly across browsers, less "terminal", more "status indicator".
- Keep mono label but reduce tracking from `0.16em` → `0.12em`.

**`src/components/SiteHeader.tsx`**
- Soften the utility strip: drop `bg-surface-sunken` to `bg-surface-muted/60`, lighten its bottom border. Less of a "compliance ribbon" feel.
- Header bottom border: `border-border/60` (lighter).

### 3. Verified Vendors + Greenlist — shared registry shell

Both pages share the same scaffold; update them in parallel for visual parity.

**Legend strip** (currently a hairline grid of white cards on muted bg):
- Replace `gap-px bg-border border border-border` with a softer container: a single rounded panel `rounded-lg border border-border/60 bg-background`, internal cells separated by `divide-x divide-y divide-border/40` (or `border-t`/`border-l` per cell at md+). Less "pixel grid", more "segmented panel".
- Cell padding `p-3` → `p-4`. Heading `mb-3` → `mb-4`.
- Outer section padding `py-6` → `py-8`.

**Sticky filter bar**:
- Change container border from `border-b border-border` → `border-b border-border/60` and add `backdrop-blur-sm bg-background/95` so it feels like a modern toolbar, not an admin panel.
- Inputs/selects: replace inline `h-8 border border-border` styling with a shared lightweight class set:
  - `h-9 px-3 rounded-md border border-border/70 bg-background text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-foreground`
  - Search input: same height, search icon at `left-3`, padding `pl-9`, subtle focus ring.
- Reset button: matching `h-9 rounded-md` with hover bg.
- Bar internal padding `py-3` → `py-3.5`, `gap-2` → `gap-2.5`.

**Registry table**:
- Wrapper: drop `border border-border` hard frame. Use a single `rounded-lg border border-border/60 bg-background overflow-hidden` so the table reads as one calm surface.
- Header row: `bg-surface-muted/60` (lighter), `meta-label` text already fine.
- Row dividers: `border-border/50` (softer); row hover `hover:bg-surface-muted/40`.
- Row vertical padding `py-2` → `py-3` for breathing room.
- Mobile cards: `rounded-md border-border/60 p-4` and `space-y-2` → `space-y-3`.

**Pagination**:
- Buttons inherit the new `h-9 rounded-md` input style; current page indicator gets `bg-foreground text-background rounded-md`. Cleaner active state than the current bordered look.
- Top divider `border-t border-border` → `border-border/50`, `pt-3` → `pt-4`.

**Section spacing**: change the table section's `py-6` → `py-8` so it sits more comfortably below the filter bar.

### 4. Homepage — `src/pages/Index.tsx`

Targeted softening; no content changes.

- All `border border-border/70 rounded-[2px]` boxes (§1 standard panel, §2 lookup cards, §3 advisory dl, §4 greenlist panel, §5 anchors, §6 education list) → `border border-border/60 rounded-lg`. The new `--radius` handles most of this automatically; the remaining hardcoded `rounded-[2px]` instances get replaced.
- §2 lookup cards: padding `p-7` → `p-8`, drop the "Layer A/B" mono eyebrow line — keep just the uppercase label, the title, and the body. Less archival, more current.
- §7 procedural grid: replace the `gap-px bg-border` hairline grid with a 4-up grid of `rounded-lg border border-border/60` cards with `gap-4`. Less "sheet of cells", more "set of cards".
- Section dividers: change every `border-b border-border` between sections to `border-b border-border/50`. Keep the alternating `bg-background` / `bg-surface-muted/40` rhythm — it's the right pattern, just softer.
- Section vertical padding pass: `py-16 md:py-24` → `py-14 md:py-20` site-wide on Index for tighter, more confident rhythm.

### 5. Buttons

- `src/components/ui/button.tsx` — only change: ensure default and outline variants pick up the new `--radius` (they already use `rounded-md` from the variant system, so this is automatic). The header CTA's hardcoded `rounded-[2px]` in `SiteHeader.tsx` is changed to `rounded-md` so it matches.

### Out of scope (this pass)

- No changes to content, copy, routes, navigation structure, or data files.
- No changes to the dedicated `/how-to-read-the-directory`, `/status-definitions`, or other secondary pages — they inherit the token + component refinements automatically and can be reviewed in a follow-up pass if needed.
- No changes to dark-mode tokens (preserved as-is).
- No new dependencies, no animations, no gradients.

### Files touched

- `src/index.css` — tokens + utility refinements
- `src/components/RecordHeader.tsx`
- `src/components/MetadataBar.tsx`
- `src/components/StatusBadge.tsx`
- `src/components/SiteHeader.tsx`
- `src/pages/VerifiedVendors.tsx` — legend, filter bar, table, pagination
- `src/pages/Greenlist.tsx` — same edits, parallel
- `src/pages/Index.tsx` — panel softening, section rhythm, §7 card grid

### Result

The whole site becomes lighter, more spacious, and visually unified without losing institutional weight. Borders become whispers instead of fences; corners go from square to gently rounded; filter rows feel like modern toolbars rather than legacy admin headers; tables feel like one calm surface rather than a stack of hard-edged frames. Authority intact; clunkiness gone.

