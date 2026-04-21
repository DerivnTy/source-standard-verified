

## Align Greenlist Page With Verified Vendors Visual System

Restructure `src/pages/Greenlist.tsx` so it mirrors the structural logic of `VerifiedVendors.tsx`. Same hierarchy, same component vocabulary, same registry feel — different content.

### New page structure (top to bottom)

**1. Hero — `RecordHeader` (replaces current §1 intro)**

Drop the custom inline hero. Use the same `RecordHeader` component used by Verified Vendors, with matching metadata, eyebrow, title, lead, and right-side summary panel.

- Metadata row: `Doc SS-GREENLIST-2026.01` · `Version 2026.01` · `Status Active` · `Updated April 21, 2026` · `Jurisdiction US`
- Eyebrow: `Public Registry · Recognized Sources`
- Title: `Public registry of recognized upstream sources.`
- Lead: "Source Standard maintains a public registry of recognized upstream sources used in vendor review — including 503B outsourcing facilities, 503A compounding pharmacies, and other qualified source categories."
- Summary panel (mirrors Verified Vendors' four-stat panel):
  - Total entries · `XX`
  - 503B facilities · `XX`
  - 503A pharmacies · `XX`
  - Other sources · `XX`

**2. "How to read this registry" explainer (mirrors Verified Vendors status legend)**

Same `bg-surface-muted border-b` strip, same `meta-label` heading, same `grid gap-px bg-border` card grid. Instead of five status definitions, render four definition cards:

- **Greenlisted** — what inclusion means (recognized as a qualified upstream source under the framework).
- **503B Outsourcing Facility** — FDA-registered, large-scale sterile compounding for office stock.
- **503A Compounding Pharmacy** — patient-specific compounding under state board of pharmacy oversight.
- **Other Qualified Source** — additional categories recognized within the framework.

Below the grid, a `max-w-3xl` clarifying note matching the "Note on Unverified" pattern:

> **Note on scope.** Greenlist status applies to upstream sources, not to vendors or clinics. A vendor's verification status is determined separately on the [Verified Vendors directory](/verified-vendors) and depends on documented purchasing from recognized sources.

**3. Filter row (rebuilt to match Verified Vendors exactly)**

Replace the current `Input` + shadcn `Select` controls with the same plain native `<input>` and `<select>` elements used by Verified Vendors. Same sticky positioning, same `h-8`, same `text-[12px/13px]`, same border treatment, same right-aligned record count.

Filters:
- Search: `Search by facility, pharmacy, or brand name`
- Category: All / 503B / 503A / Other
- Type: existing `GREENLIST_TYPES`
- Location: existing `getGreenlistLocations()`
- Focus: existing `FOCUS_TAGS`
- Sort: Name A→Z (default) / Name Z→A / Category / Location
- Reset button (only when filters active)
- Right-aligned `pageStart–pageEnd of total` count

**4. Registry table (rebuilt to match Verified Vendors structure)**

Remove the `Tabs` system. Render a single unified table — same as the vendor directory — with category exposed as a column and pagination at the bottom. Same `container-wide py-6`, same border treatment, same hover state, same mobile card fallback, same compact pagination.

Desktop columns (`grid-cols-12`):
- col-4: Facility / Brand
- col-2: Category badge (`503B` / `503A` / `Other`) — small mono pill matching the visual weight of `StatusBadge`
- col-2: Location
- col-3: Focus (truncated)
- col-1: Website (right-aligned `Visit →` mono link, or `—`)

Mobile cards mirror the vendor mobile card layout: name + small category pill on top, location, focus, then `Visit website →` mono link.

Pagination: same component pattern (`PAGE_SIZE = 25`, Prev/Next + numeric range with ellipses), same styling.

**5. Cite-as / disclaimer footer (kept, lightly trimmed)**

Same two-line `Cite as` + `Disclaimer` block already on the page. Update Doc ID to `SS-GREENLIST-2026.01`.

### What gets removed from the current page

- Current custom inline §1 hero block and metadata strip (replaced by `RecordHeader`).
- The `Tabs` / `TabsList` / `TabsContent` system (replaced by a unified table with Category as a column + Category filter in the toolbar).
- `Input` + shadcn `Select` filter controls (replaced by native inputs/selects matching Verified Vendors).
- The §4 "How Greenlist entries are used" prose block (its key idea — "Greenlist is upstream, vendor verification is separate" — is folded into the §2 explainer note instead). Keeps the page tight and parallel to Verified Vendors, which has no equivalent prose tail.

### Small data-layer additions

Inside `Greenlist.tsx` only — no changes to `src/data/greenlist.ts`:

- Add a small inline `CategoryPill` sub-component (visual sibling to `StatusBadge`, three variants for `503B` / `503A` / `Other`, using existing `--verified` / `--pending` / `border` tokens).
- Add `SortMode` type and sort logic (parallels `VerifiedVendors.tsx`).
- Add pagination state + the same compact pagination renderer.

### Files

- **Edit:** `src/pages/Greenlist.tsx` (full rewrite of layout; data imports from `@/data/greenlist` unchanged)

### Files NOT touched

- `src/data/greenlist.ts`
- `src/pages/VerifiedVendors.tsx`
- `src/components/RecordHeader.tsx`, `StatusBadge.tsx`, `MetadataBar.tsx`
- No routing, nav, header, or footer changes.

### Result

Visiting `/verified-vendors` and `/greenlist` back-to-back will feel like two views of the same registry system — same hero shape, same explainer strip, same sticky toolbar, same table, same pagination. The only differences will be the content domain (vendors vs. upstream sources) and the column set appropriate to each.

