

## Separate Status From Source Type On The Greenlist Page

Rework the Greenlist page so "Greenlisted" reads clearly as the **status** applied to recognized upstream sources, while 503B, 503A, and Other read as **source types** those sources fall into. No data or routing changes — just the legend panel, a couple of labels, and light wording updates in `src/pages/Greenlist.tsx`.

### 1. Rename the legend section

- Heading: `"How to read this registry"` → `"How Greenlist status works"`.
- Remove the single 4-up grid that mixes Greenlisted with 503B/503A/Other.

### 2. New two-tier legend layout

Replace the current `grid-cols-2 md:grid-cols-4` panel with two stacked groups inside the same softened container style:

**Group A — Status** (full-width row, one card)
- Small eyebrow above the card: `STATUS`
- Card content:
  - Mono pill in green: `● GREENLISTED`
  - Body: "A Source Standard designation indicating an upstream source is recognized within the Greenlist framework. Greenlisted is a status, not a facility type."

**Group B — Source types** (3-up grid beneath Group A)
- Small eyebrow above the grid: `SOURCE TYPES IN THIS REGISTRY`
- Three cards (503B / 503A / Other), each in their own neutral mono pill color (`text-foreground` for all three — drop the green/amber coding here so green stays bound to the Greenlisted status pill only):
  - **503B Outsourcing Facility** — unchanged body copy.
  - **503A Compounding Pharmacy** — unchanged body copy.
  - **Other Qualified Source** — unchanged body copy.

Both groups share the refined `rounded-lg border border-border/60 bg-background` panel treatment already in place, with `divide-y` / `divide-x` hairlines between source-type cards.

### 3. Replace the scope note

Current note talks about vendor verification. Tighten it to the distinction the user asked for, keeping the existing vendor-directory cross-link:

> **Scope note.** Greenlisted is a Source Standard status for recognized upstream sources — not a facility type. Source types on this page include 503B outsourcing facilities, 503A compounding pharmacies, and other qualified source categories. Vendor verification is tracked separately on the [Verified Vendors directory](/verified-vendors).

### 4. Table & row changes (reinforce the distinction)

In the desktop table header and mobile cards:

- Rename the `"Category"` column → `"Source Type"`.
- Under each facility name, keep the full `e.type` subtitle (already there) — it reads as the source type.
- Add a small `STATUS` column inline with source type on desktop: each row shows a compact green `● GREENLISTED` pill next to the source-type pill. Since every entry on this page is by definition Greenlisted, this reinforces that status is the umbrella, not the type. Implementation: a single static `StatusPill` component reused across rows.
  - Layout adjustment: `grid-cols-12` splits become `col-span-3` (Facility/Brand) / `col-span-2` (Status) / `col-span-2` (Source Type) / `col-span-2` (Location) / `col-span-2` (Focus) / `col-span-1` (Website).
- Mobile cards: show `GREENLISTED` pill + source-type pill on the same top row, stacked cleanly above name.

### 5. Filter label tweak

- The "All categories" filter dropdown label → "All source types" (the underlying `category` state stays the same — pure wording).
- Actually simpler: the existing `type` filter already covers source type granularly, and `category` duplicates it. Leave `category` in place but relabel its `<option>` text from `"All categories"` → `"All source groups"` and keep the rest unchanged to avoid filter-UX regressions.

### 6. RecordHeader lead copy

Minor clarification so the header mirrors the new framing:

- Lead becomes: "Source Standard maintains a public registry of upstream sources that carry **Greenlisted** status — recognized within the framework across source types including 503B outsourcing facilities, 503A compounding pharmacies, and other qualified source categories."

### Files touched

- `src/pages/Greenlist.tsx` — legend restructure, scope note rewrite, table column rename + inline status pill, small filter/header wording.

### Out of scope

- No changes to `src/data/greenlist.ts` (types, categories, entries all preserved).
- No changes to routing, other pages, or shared components.
- No visual system changes (reuses existing `rounded-lg border-border/60`, `bg-surface-muted/60`, mono pill, and `.eyebrow` / `.meta-label` patterns already on the page).

### Result

Visitors immediately see two distinct ideas on the page:

```text
STATUS
● GREENLISTED — recognized upstream source

SOURCE TYPES IN THIS REGISTRY
503B Outsourcing Facility  │  503A Compounding Pharmacy  │  Other Qualified Source
```

The table then shows each row carrying Greenlisted status and a specific source type, so status and type never look like peers again.

