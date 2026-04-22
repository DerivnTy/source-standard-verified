

## Registry tables — remove inline trust glyphs

The `<SourceCheck>` glyph appears in every row of both registries — redundant since presence on the registry already implies vetting. Strip them from row-level data and reserve the glyph for high-impact moments (headers, hero, profile seals, stat-card label).

---

### 1 · Greenlist table — remove inline check

`src/pages/Greenlist.tsx`:
- **Desktop table** — Facility / Brand cell currently renders `<SourceCheck size="xs">` next to each name. Remove the glyph; keep the name as the lead element. Drop the surrounding flex wrapper so the name aligns flush left.
- **Mobile card variant** — same removal in the per-card facility line.
- **Source Type column** stays as the at-a-glance categorizer (existing colored dot + `503B / 503A / Other` label is the primary visual key).
- **Stat strip** — keep `<SourceCheck size="sm">` on the "Total" or "503B" stat card (single, header-level placement) per the new "high-impact only" rule.

### 2 · Verified Vendors table — remove inline check

`src/pages/VerifiedVendors.tsx`:
- **Desktop table** — Vendor cell currently leads with `<SourceCheck size="xs">` for verified rows. Remove. Status is already encoded by the existing `StatusBadge` in the Status column, so no information is lost.
- **Mobile card variant** — same removal.
- **Stat strip** — keep `<SourceCheck size="sm">` on the "Verified" stat card only (single high-impact placement at the dashboard summary level).

### 3 · Where SourceCheck stays (high-impact only)

Locked-in policy, applied consistently:
- **Hero / header trust lists** (About, How It Works, Apply) — kept.
- **Stat cards** at the top of registries — kept on the verified/total card only.
- **Profile pages** (`VendorProfile`, `GreenlistProfile`, `AdvisorProfile`) — kept as the single "Seal of Trust" on the meta panel when status is verified.
- **Status badge** ("Verified" pill) — kept; this is the canonical trust pill.

Removed everywhere else: row-level cells, dense list bullets inside data tables.

### 4 · Density preserved

No changes to row padding, font sizes, sticky filter bar, stat strip, or methodology accordion. The removal is purely additive to readability — the Facility / Vendor column gets back ~20px of horizontal space and a cleaner left edge for fast scanning.

---

### Files touched

- `src/pages/Greenlist.tsx` — remove inline `<SourceCheck>` from desktop table cell + mobile card.
- `src/pages/VerifiedVendors.tsx` — remove inline `<SourceCheck>` from desktop table cell + mobile card.

### What stays the same

All routes, all data, filtering / sorting / pagination, stat strip, sticky filter bar, methodology accordion, every other page, `SourceCheck` component itself, `StatusBadge`, `AnchorHeader`, the global token system. Presentational only.

