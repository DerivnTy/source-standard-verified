

## Greenlist Rebuild — Upstream Source Intelligence Surface

A focused, product-grade rebuild of `/greenlist`. The institutional system stays intact across the rest of the site; this page becomes denser, more interactive, and clearly product. Quieter than the upcoming Verified Vendors rebuild, but a real registry interface.

### 1. Page identity (compact, product framing)

Replace the current `BriefingHero` + 3-column "Why this page exists" block with a **tight registry header**:

- Eyebrow: `UPSTREAM REFERENCE LAYER · LIVE REGISTRY`
- Title: `Greenlist` (page-title, not chapter-hero — keeps it quieter than Vendors)
- One-line product description (~20 words) explaining: recognized upstream compounding facilities used inside the framework.
- A single restrained line clarifying scope: *"Inclusion supports upstream reference. Vendor verification is a separate layer →"* (the arrow links to `/directory`).
- Right-aligned freshness chip: `Updated MM/DD/YYYY · N records`.

Removes ~120px of editorial chrome. The data starts higher.

### 2. Live summary strip (rebuilt)

Replace the current 5-cell stat row with a **denser, signal-rich strip** sitting directly under the header on the same surface (no section gap):

```text
┌───────────────────────────────────────────────────────────────────────┐
│ TOTAL RECOGNIZED   503B    503A    OTHER   NOT RECOGNIZED   STATES   │
│        184          62      109      13          7            42     │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔     ▔▔▔     ▔▔▔     ▔▔▔        ▔▔▔            ▔▔▔     │
└───────────────────────────────────────────────────────────────────────┘
```

- 6 cells, divided, mono numerals at the locked 20/28 weight-500 (per the constitution — no oversized numerals).
- Each cell: 2px tick swatch (category color) + utility-xs label + number + tiny share bar showing % of total.
- Uses existing `Stat` / `StatRow` primitives. New: tiny share-bar sub-element.
- "States represented" computed from `getGreenlistStates().length`.
- "Not currently recognized" = `entries.filter(e => e.regulatoryAlert).length`.

Feels alive without inventing new chrome.

### 3. Query interface (real filter rail)

Replace the loose row of selects with a **two-row controlled query bar** in its own bordered surface:

**Row 1 — primary search:**
- Full-width search input, larger (h-11), with leading icon and a subtle `⌘K` hint chip on desktop.
- Right side: live result count (`N of 184 records`) + sort select.

**Row 2 — facets:**
- Source type · State · Focus · Website (segmented control instead of select for the 3-state Website filter).
- Reset link appears only when filters are active.

**Active filter chips row** (appears only when filters active):
- Each active filter rendered as a removable chip (`503B ×`, `Texas ×`, etc.) directly under the bar. Click `×` clears that one facet.
- Mirrors how Stripe/Linear surface query state.

All controls share one border treatment, one height (40px), and one focus state. The whole bar reads as a single instrument, not five floating dropdowns.

### 4. Record table (stronger hierarchy)

Rebuild the desktop table with denser, more confident records:

```text
FACILITY                           SOURCE TYPE     LOCATION         FOCUS                       
──────────────────────────────────────────────────────────────────────────────────────────────
Empower Pharmacy                   ▎ 503B          Houston, TX      Sterile injectables · GLP-1   →
empowerpharmacy.com                  Outsourcing     +2 locations
──────────────────────────────────────────────────────────────────────────────────────────────
Olympia Pharmaceuticals            ▎ 503B          Orlando, FL      Hormone therapy · Peptide     →
no public site                       Outsourcing
──────────────────────────────────────────────────────────────────────────────────────────────
Defunct Compounding Co.            ▎ NOT RECOGNIZED  Multi-state    Shut down — see notice        →
                                     503A (former)
```

- **Column widths**: Facility 5 / Type 2 / Location 2 / Focus 3 (drop the dedicated "View" column; the row affordance carries it).
- **Facility cell**: name at 15px/22px weight-600, secondary line (website domain or "no public site") at t-utility-xs muted underneath. `+N locations` sub-label when `additionalLocations` exists.
- **Source-type cell**: 2px vertical tick swatch + 2-line treatment (category on top, type detail below in muted 11px). Not a pill. Reads like a record field, not a badge.
- **Not-recognized rows**: tick swatch turns destructive, type cell shows `NOT RECOGNIZED` + the short alert reason. Row left border becomes 2px destructive on hover.
- **Row interaction**: full-row link (already is), but with stronger hover — background shifts to surface-muted, left edge gets a 2px foreground accent, trailing `→` arrow slides 2px right. Whole row gets `cursor-pointer` and `aria-label`.
- **Row height**: 64px desktop (vs. current ~52px) — gives the secondary metadata room.
- **Mobile**: keep stacked card pattern but match the new hierarchy (name, type tick + label, location, focus).

### 5. Source-type treatment (locked language)

A new shared inline component `<SourceTypeCell category type alert />`:

- 2px tick + uppercase 11px tracking-wide category label (`503B` / `503A` / `OTHER` / `NOT RECOGNIZED`).
- Type detail line in 11px muted (`Outsourcing facility`, `Compounding pharmacy`, `Network`, etc.).
- Alert state overrides color tokens to destructive.

Used in the table now, reused in the upcoming profile-page rebuild. One source of truth for how source type renders sitewide.

### 6. Pagination (product-grade)

Replace the current Prev/numbers/Next strip with a cleaner registry footer:

- Left: `Showing 1–25 of 184 · Page 2 of 8`
- Right: `‹ Prev   1  …  4  5  6  …  8   Next ›`
- All controls 36px, single border style, current page filled foreground/background, hover only on inactive.
- Add a small "Page size: 25 / 50 / 100" select on the right, useful for power users scanning the registry.

### 7. Bridge block (refined)

Rebuild the closing "Two layers, one framework" section as a **two-column institutional bridge** at standard width:

```text
┌─────────────────────────────────────┬────────────────────────────────┐
│ TWO LAYERS · ONE FRAMEWORK          │  THE VENDOR LAYER              │
│                                     │                                │
│ Greenlist establishes the upstream  │  Verification assesses whether │
│ reference set — the recognized      │  a clinic can substantiate its │
│ facilities a vendor may legitimately│  sourcing through licensed     │
│ source from.                        │  upstream pharmacies.          │
│                                     │                                │
│ Inclusion in the Greenlist is not   │  [ Open the Vendor Registry → ]│
│ a vendor verification.              │                                │
└─────────────────────────────────────┴────────────────────────────────┘
```

- Left column: explanatory copy at body-md, eyebrow at top.
- Right column: shorter framing + a real `button-md` outline CTA pointing to `/directory`.
- Same width as the registry table above (no awkward narrow centered block).
- Section sits on `surface-muted/30` to softly demarcate from the table.

### 8. Density & motion polish

- Whole page gets a slightly tighter vertical rhythm than institutional pages: 48px between major blocks instead of 80px.
- Filter bar and table share one container so they read as one instrument.
- Subtle 120ms transitions on row hover, chip removal, and pagination — alive but not animated.

### Files touched

- **Rewrite** `src/pages/Greenlist.tsx` — full rebuild against the structure above.
- **New** `src/components/registry/RegistryHeader.tsx` — compact title + freshness + scope line.
- **New** `src/components/registry/RegistrySummaryStrip.tsx` — 6-cell strip with share bars.
- **New** `src/components/registry/QueryBar.tsx` — 2-row search + facets + active chips.
- **New** `src/components/registry/SourceTypeCell.tsx` — locked source-type rendering.
- **New** `src/components/registry/RegistryPagination.tsx` — product-grade pager + page size.
- **Extend** `src/data/greenlist.ts` — add `getGreenlistCounts()` to also return `statesRepresented` and `notRecognized` (or compute inline; tiny change).
- **No changes** to the global token system, `system/` primitives, or any other page. The new `registry/` namespace is the product-side vocabulary; institutional pages stay untouched.

### Out of scope (next pass)

- Facility profile page polish — explicitly deferred per your message.
- Verified Vendors rebuild — comes after this lands.

