

## Education Page UX Overhaul — "Clinical Magazine" feel

Single-page rework of `src/pages/Education.tsx`. No data file changes, no route changes, no other pages touched. All existing slug overrides and FAQ category logic stay intact.

### 1 · Hero — centered, no reference box

Replace `AnchorHeader` with an inline centered hero block:

- Center-aligned eyebrow `Public education & standards`
- Center-aligned `h1`: **Clinical Reference & Standards Library**
- Center-aligned lead (new copy): *"Your guide to the science, safety, and standards of compounded medicine. Empowering patients with clinical transparency."*
- The gray Reference box is removed entirely.
- Generous vertical padding (`py-20 md:py-28`).

### 2 · Search bar — softer

Keep the existing controlled `query` state and `useMemo` filters. Restyle the input only:
- Centered, `max-w-[560px]`, `mx-auto`
- `rounded-full`, `border-border/60`, `shadow-sm`, taller (`h-12`), larger placeholder, search icon prefix.
- Eyebrow label removed; placeholder reads `Search the library by topic, doc ID, or keyword…`

### 3 · "Highly Recommended" featured trio

New section directly below the search bar. Three larger cards in a `grid-cols-1 md:grid-cols-3 gap-6` with a subtle clinical-blue tint (`bg-[hsl(var(--surface-muted))]/60` with a faint blue cast via `bg-blue-50/40 dark:bg-blue-950/10` — sampled from existing `--surface-muted` token first, falls back to a soft blue tint).

Hardcoded by slug (so we do not depend on data ordering):
- `what-are-peptides` → "What Are Peptides?"
- `what-is-compounding` → "What Is Compounding? (503A vs 503B)"
- `questions-to-ask-your-clinic` → "Questions to Ask Your Clinic"

Each card:
- Small eyebrow `Start Here · 01 / 02 / 03`
- Large title (`text-[20px] font-semibold leading-snug`)
- Two-line description with relaxed leading
- Subtle bottom-right arrow that animates on hover; full card is the link
- Soft hover shadow (`hover:shadow-md`) and faint border darkening

### 4 · Library tiles — Foundational Standards & Clinical Protocols

Convert both `SimpleRow` lists into a shared `LibraryTile` card component rendered in a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

Each tile:
- White card, `rounded-lg`, `border-border/60`, `p-6`, flex column, `min-h-[240px]`
- Title first (`text-[17px] font-semibold leading-snug text-foreground`) — the visual hero
- Description with `leading-[1.7]` for readability
- Optional `Reviewed by …` line in muted micro-text
- Footer row pushed to bottom: tiny muted Doc ID (`font-mono text-[10px] text-muted-foreground/70`) on the left, soft published/forthcoming chip on the right
- Whole card is a `<Link>`; hover lifts via `hover:shadow-md hover:border-foreground/30 transition-all`
- The "Read full article →" CTA text is removed; the entire card is the click target

The existing `SimpleRow` is kept only if any other page imports it; here it is no longer rendered. (Quick search confirmed it is local to this file.)

### 5 · FAQ category grid — simplified

Same 4-up grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), but each card is cleaner:
- `FAQ-CAT-0X` code label removed
- Small lucide icon at top (`Scale` / `ShieldCheck` / `BadgeCheck` / `Search`) sized `h-6 w-6` in muted foreground
- Larger heading (`text-[18px] font-semibold`)
- Description with relaxed leading
- Prominent CTA at the bottom: full-width outline button `Browse Category →` (using existing `Button variant="outline" size="sm"`)
- Soft hover shadow + border darken

The per-category "{count} entries" pill is moved to a small muted line above the title (`12 entries` style), not a boxed chip — keeps the visual lighter.

### 6 · Latest Clinical Analysis — same tile language

Reuse the new `LibraryTile` so analysis cards match Foundational/Clinical visually. Doc ID stays at the bottom; "Read more →" button is removed in favor of full-card click.

### 7 · Visual polish — global

- Section vertical padding bumped to `py-20 md:py-28` everywhere on this page.
- Universal hover for all cards on this page: `transition-all duration-200 hover:shadow-md hover:-translate-y-px hover:border-foreground/30`.
- Search bar: rounded-full, soft border, `shadow-sm`.
- Sticky jump bar kept (it is genuinely useful given the page length) but lightened: thinner border, subtler text.
- Archive index strip + Forthcoming/About footer preserved as-is — they read as the editorial colophon.

### Files touched

- `src/pages/Education.tsx` — hero replaced, search restyled, new "Highly Recommended" section added, `SimpleRow` usages replaced with new local `LibraryTile`, FAQ category cards redesigned, vertical rhythm increased.

### What stays the same

- All routes, all slug overrides, all data in `src/data/library.ts`.
- `AnchorHeader`, `RecordHeader`, `Section`, `Button`, every other page.
- Search filter logic (`useMemo` blocks) and FAQ category mapping logic.
- Sticky jump bar anchors (`#basics`, `#guides`, `#questions`, `#analysis`, `#archive`).
- Forthcoming reference formats + About this library footer block.

