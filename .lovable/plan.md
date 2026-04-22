

## Registry pages — pivot to wide-dashboard / no-scroll

The Registry pages are professional lookup tools, not essays. Strip the About-style sticky rail, condense the four §-cards into one horizontal stat strip, and make the filter bar sticky so the table dominates the fold.

---

### 1 · Drop the sticky rail on Registry pages

`src/pages/VerifiedVendors.tsx` and `src/pages/Greenlist.tsx`:
- Remove `RegistryLayout` + `RegistrySection` wrappers entirely (no rail, no §-section spacing). Keep `RegistryLayout.tsx` in the codebase for now — unused but harmless; will be deleted in a follow-up if nothing else picks it up.
- Wrap content directly in `<section className="bg-background"><div className="container-wide py-8 md:py-10">…</div></section>` — full horizontal width returns to data.

### 2 · Horizontal "At-a-Glance" stat strip

Replace §01–§03 (Vendors) and §01–§04 (Greenlist) with a **single horizontal row of stat cards** directly under `AnchorHeader`.

Vendors — 6 compact cards in `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3`:
1. Total Tracked (large number)
2. Verified — leading `<SourceCheck size="sm">`, blue-tinted card
3. Under Review — pending dot
4. Unverified — muted dot
5. Suspended — destructive dot
6. Removed — neutral dot

Each card: `card-elevated p-4`, `eyebrow` label on top (`text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground`), large tabular number (`text-[1.75rem] font-semibold tabular-nums`), single-line subtitle. Total height ~96px so all 6 fit one row above the fold on ≥lg.

Greenlist — 4 cards (Total / 503B / 503A / Other) on the same template, same row.

The verbose status descriptions move into a small "?" popover/tooltip on each card (Radix `HoverCard`) — keeps the data-density without losing the legend.

### 3 · Sticky search/filter bar

The existing filter row becomes sticky as the user scrolls past the stat strip:
- Wrap the filter row in `<div className="sticky top-[57px] z-20 -mx-… px-… py-2 bg-background/85 backdrop-blur-md border-y border-border/60">` (offset matches the glass header height).
- Search input grows: `flex-1 min-w-[280px]`, slightly taller `h-10`, prominent placeholder.
- Selects shrink to `h-9` (current) and stay inline; reset chip stays at end.
- Result counter (`{N} of {Total}`) stays right-aligned.

### 4 · Denser table rows

In both pages' table sections:
- Row vertical padding `py-3` → `py-2`; header `py-2.5` → `py-2`.
- Row text `text-[14px]` → `text-[13px]`, line-height tightened.
- Page size constant `PAGE_SIZE = 25` → `25` (Vendors) stays / Greenlist stays — but the smaller row height means ~10 rows visible above the fold at 1056px viewport with the new dashboard header.
- `<SourceCheck size="xs">` stays as the verified badge in column 1 — small, professional, financial-terminal style.
- Mobile card variant gets the same density tightening (`p-4` → `p-3.5`).

### 5 · Methodology / Inclusion Standards — page footer

Both currently sit inside the rail flow. Move them to a single bottom band below the pagination:
- Compact `<details>` accordion (`<summary>` styled like a section eyebrow) titled "Methodology" / "Inclusion Standards", collapsed by default. Keeps the content available without consuming above-fold real estate.

### 6 · Other page layouts — preserve variety

Per directive, lock in the layout-per-purpose rule (no code change required, just confirmation):
- **Data pages** (Verified Vendors, Greenlist) → wide-dashboard (this pass).
- **Education / Library** → grid layout (already shipped).
- **Legal / About / Privacy / Terms / Disclaimer / Accountability / Governance** → asymmetric DocLayout sidebar (already shipped — no change).

---

### Files touched

- `src/pages/VerifiedVendors.tsx` — drop RegistryLayout, add stat strip, sticky filter, denser table, methodology details footer.
- `src/pages/Greenlist.tsx` — same treatment.

### What stays the same

All routes, all data, all filtering/sorting/pagination logic, every other page (Education / Library / FAQ / About / legal stack), `SourceCheck`, `AnchorHeader`, `DocLayout`, the global token system. `RegistryLayout.tsx` stays in the file tree (orphaned but no breakage). Presentational only.

