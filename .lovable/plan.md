

## Architectural Realignment — Advisory Board as Design DNA

The Advisory Board page is the canonical pattern: tight 12-col rhythm, `§N` eyebrow + `h-section` title in a 4-col left rail, content/table in the 8-col right rail, hairline `border-border` dividers, alternating `bg-surface-muted` bands, `py-12 md:py-16` (not `py-20 md:py-28`), and `01/02` numbering instead of icon-checkmark bullets. Roll that DNA across Education, About, HowItWorks, and the Registry headers.

---

### 1 · Spacing strike — adopt Board cadence everywhere

Across `src/pages/Education.tsx`, `src/pages/About.tsx`, `src/pages/HowItWorks.tsx`:

- Replace every `py-20 md:py-28` and `section-band` with **`py-12 md:py-16`** (Board standard).
- Replace `gap-y-8 / gap-y-10` between section blocks with the Board's `mb-8` header → grid pattern.
- Drop the `card-elevated` floaty cards on Education in favor of the Board's flat `border border-border bg-background` tiles in a `gap-px bg-border` grid (visible hairline gutter, no shadows).
- Hero bands lose `text-center` + `display-2`. Adopt the Board's left-aligned `eyebrow → h-section → 60ch lead` block.

### 2 · Icon / checkmark audit

- Education: remove every `<SourceCheck>` from tile bodies, supplementary list, and "Reviewed by Medical Advisory" footers. Keep `SourceCheck` ONLY in the page-hero attribution line and on verified status surfaces (registry/profile seals — already done).
- Education FAQ category grid: remove the four lucide icons (`Scale / ShieldCheck / BadgeCheck / Compass`). Replace with `01–04` mono numbering left of the category label, mirroring the Board roster's `SEAT · 01` chip.
- Education "Forthcoming reference formats": replace the `SourceCheck` bullets with the Board's neutral `·` dot + numbered prefix (`01`, `02`, `03`).
- About: any decorative dot/icon retired in favor of `§N.M` mono refs (already partially in place — extend consistently).

### 3 · Page-specific realignments

**Education (`src/pages/Education.tsx`)**
- Hero: left-aligned, no `text-center`, no `display-2`. Use `eyebrow` + `h-section` + 60ch lead. Drop the centered SourceCheck attribution into a single muted line beneath.
- "Start Here" trio: keep three columns but reskin tiles to flat Board-style — `border border-border bg-background p-6`, `01 / 02 / 03` chip top-left mirroring `SEAT · 01`, no shadow, no chevron icon, "View →" uppercase mono link bottom-right (Board pattern).
- Section structure: every section becomes a Board 12-col split — left col (4): `§N · category` eyebrow + `h-section` title + short rationale; right col (8): the tile grid. Bands alternate `bg-background` / `bg-surface-muted` like the Board page.
- Library tiles (`LibraryTile`): flat border, no `card-elevated`, no `min-h-[260px]` floaty padding, 18px semibold title, 13.5px muted summary, "MAB-style" footer with `ENTRY · NN` mono ref left and `Read article →` uppercase link right. Drop the chevron lucide icon.
- FAQ category grid: 4 flat cells in a `gap-px bg-border` grid (Board roster pattern); `01–04` mono index, label, description, `Browse →` mono link. No icons, no per-card border-radius.
- Page padding: every section to `py-12 md:py-16`.

**About (`src/pages/About.tsx`)**
- Already uses `DocLayout` + `DocSection` with `§N` numbering — keep the framework but tighten the §4 "beliefs" list and §5 scope table to Board grid weights (`grid-cols-12 gap-4`, `meta` mono refs in col-2, content in col-10), matching the §4 Responsibilities table on the Board page exactly.
- §6 Callout retains red/notice tone but loses extra padding to match `px-5 py-5` Board cell density.
- §7 audience cards: drop `shadow-sm` + `rounded-lg` for flat hairline-bordered cells consistent with Board roster.

**HowItWorks / SOP (`src/pages/HowItWorks.tsx`)**
- Replace the plain text section pattern with the Board's 12-col split: each `§N` becomes `md:col-span-4` (eyebrow + `h-section` + lead) / `md:col-span-8` (content/tables/lists) — currently it's full-width and reads dull.
- §3 Determinations: convert to a Board-style bordered table card with header strip (`Code · Status · Public-record meaning · Does not imply`), `divide-y divide-border` rows, `meta` mono `STATUS · 01..05` index column. Same chrome as the Board "Key Responsibilities" table.
- §4 Examination domains: keep the card grid but reskin to flat `border border-border bg-background p-6` with `DOMAIN · NN` mono header (already partial — make uniform), no `rounded-[2px]` softness, sit them in a `gap-px bg-border` grid.
- §5 Lifecycle: convert to Board's `<ol>` pattern with `border border-border divide-y` and `grid-cols-12` rows (`col-span-2` mono `01` index in `text-primary`, `col-span-10` title + body), matching §3 of the Board page exactly.
- §6 Mandatory disclosure list: swap the `·` bullets for `01..06` mono prefixes (Board pattern).
- All `py-12 md:py-16` already present — verify uniformity, remove any drift.

**Registry hero (`src/pages/Greenlist.tsx` + `src/pages/VerifiedVendors.tsx`)**
- Reskin the page hero band to the Board header style: 12-col split — left (8): `Reference · Registry` eyebrow + clean title + 58ch muted lead; right (4): the existing stat strip rendered as a Board-style "Reference" metadata card (label/value rows, `font-mono` values, hairline divider, no large stat-card affordance). The dense data table chrome below stays exactly as it is — only the hero changes.
- Methodology accordion footer: tighten to Board "Read deeper" pattern (`border border-border bg-surface-muted` bar with hairline-divided link cells).

### 4 · Visual consistency lockdown

- Section dividers: standardize on `border-b border-border` (Board) — kill any `border-border/40 / /50 / /60` half-opacity drift on top-level sections.
- Backgrounds: alternate `bg-background` / `bg-surface-muted` per section (Board cadence). Remove `bg-surface-muted/40` half-tone variants.
- Eyebrows: every section header uses `meta mb-3` + `§N · label` text, not `eyebrow mb-2`.
- Titles: every section uses `h-section` (already a token). Page H1 uses `title-page` only inside `RecordHeader`; subsection H2 stays at `h-section`.
- Lists: replace bulleted `·` lists with the `01..` mono numbering whenever the list is an enumerable sequence (Board "Role in framework" pattern).
- No additional CSS / token changes — every class needed already exists.

---

### Files touched

- `src/pages/Education.tsx` — full reskin: hero, section spacing, tile chrome, FAQ category grid, supplementary list, padding.
- `src/pages/About.tsx` — tighten table grid + audience card chrome to Board weights.
- `src/pages/HowItWorks.tsx` — adopt 12-col Board split for every §, reskin §3 statuses + §5 lifecycle as bordered tables, swap §6 bullets for numbering.
- `src/pages/Greenlist.tsx` — replace hero band with Board-style split header (left title, right reference card); table chrome unchanged.
- `src/pages/VerifiedVendors.tsx` — same hero reskin; table chrome unchanged.

### What stays the same

All routes, all data, all filtering / sorting / pagination logic, the `RecordHeader` / `DocLayout` / `DocSection` primitives, `SourceCheck` (now scoped tighter), `StatusBadge`, `CategoryPill`, `AlertBadge`, `RegulatoryAlert` block on `GreenlistProfile`, the global token system, dark-mode behavior, the Advisory Board page itself (it's the reference). Presentational + structural realignment only.

