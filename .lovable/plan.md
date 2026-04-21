

## Compact Greenlist Profiles + Begin Public-Data Population

Two-part pass: (1) restructure the profile page so it reads as a tight technical brief instead of a long scaffolded scorecard, and (2) seed real, publicly verifiable data on a first batch of well-documented facilities. Empty fields collapse instead of taking equal weight as filled ones.

### Part 1 — Layout overhaul (`src/pages/GreenlistProfile.tsx`)

**Header (top of page) — denser, fewer pixels of vertical space**
- Reduce header `pt-6 pb-10` → `pt-4 pb-6`.
- H1 size: `2.125rem` → `1.625rem` (md), tighten leading.
- Drop the gap from `gap-10` → `gap-6` between title block and sidebar.
- Move website link inline next to the `{type} · {location}` meta line so it doesn't add a new row.
- Background paragraph uses `entry.focus` only when no real `profile.background` exists; when `background` is present, render that instead and skip `focus`.

**At-a-glance sidebar — smaller, condensed**
- Single bordered card, `text-[12px]` rows, `py-1.5` per row, `border-b border-border/30`.
- Show only fields that have values (designation, FDA/FEI, years in operation, location). No "Not disclosed" rows in the sidebar at all.

**Body — collapse 5 sections into 3 tighter blocks with two-column field grids**

Replace the five stacked `ScorecardSection` blocks with three:

1. **Regulatory & Quality** — combines old §01 + §02
2. **Capabilities** — old §03
3. **Background** — old §05

Drop the standalone "Source Standard audit data" section entirely from the public profile for now (those fields are not yet populated and are internal-leaning). When `ssReviewDate` exists, surface it in the sidebar; when `ssAuditDate` / `reviewNotes` exist, render them inline at the bottom of the Background block. The data model is unchanged — only the rendering changes.

**Field row redesign — half the height, 2-column grid**
- New `Field` component renders as a compact 2-col `<dl>` cell:
  - Label: `text-[11px] uppercase tracking-[0.06em] text-muted-foreground` on its own line above the value
  - Value: `text-[13px] text-foreground`
  - Cell padding: `py-2`, no per-row borders — sections use a single divider grid (`divide-y` only between rows on mobile; on `md+` use `grid grid-cols-2 gap-x-8 gap-y-3`)
- **Empty-field rule**: if value is missing, the entire cell is omitted from the DOM (not rendered as "Not disclosed"). This is the key change that removes the "long form template with placeholder rows" feel.
- Section padding: `px-4 py-4` (was `px-5` + per-row `py-3`).
- Section gap: `space-y-6` → `space-y-4`.
- Body padding: `py-10` → `py-6`.

**Empty-section rule**
- A section that ends up with zero filled fields renders nothing at all (returns `null`). Facilities with thin data show only filled blocks + the `focus` paragraph + footer.

**Mobile**
- 2-col grid collapses to single column under `md:`. Spacing stays tight.

**Footer disclosure** — unchanged copy, padding tightened to `px-4 py-3`, font `text-[11.5px]`.

### Part 2 — Public-data population (`src/data/greenlist.ts`)

Seed `profile` objects on facilities with publicly verifiable information from FDA registered-outsourcing-facility lists, state board pages, and disclosed corporate "About" pages. Fields used only when reasonably supportable; otherwise omitted (not guessed).

**First population batch (~12 entries with strong public footprint):**
- AnazaoHealth Corporation
- Apollo Care
- Assure Infusions, Inc.
- Fagron Sterile Services (Wichita)
- OurPharma LLC
- SCA Pharmaceuticals
- OSRX, Inc.
- QuVa Pharma, Inc.
- STAQ Pharma, Inc.
- Wedgewood Connect / Wedgewood Pharmacy
- Empower Pharmacy / Empower Pharma
- B. Braun

For each, populate only what's publicly documented:
- `designation` ("503B Outsourcing Facility" / "503A Compounding Pharmacy")
- `standards` (e.g., `["cGMP (503B)"]` for FDA-registered 503Bs; `["USP <797>", "USP <800>"]` for sterile 503As) — only when reasonably supportable from public posture
- `dosageForms` and `specializations` from disclosed "About" / capabilities pages
- `yearsInOperation` and `background` from disclosed corporate pages
- `facilityScale` only when explicitly disclosed (square footage on company site or press release)

Other 24 entries remain without `profile` and render the compact short-form view (header + focus paragraph + footer) — which is the desired "short tight profile when data is thin" behavior.

**Research method (during default-mode execution):**
- Use `fetch_website` against each facility's own disclosed pages and the FDA's public registered-outsourcing-facility listing to confirm fields before writing.
- No invented numbers, no estimates, no marketing copy.

### Out of scope

- Changes to the Greenlist registry table, filters, routing, or data schema.
- Source Standard internal audit fields (`ssAuditDate`, `labValidationLog`, `vendorCount`, `reviewNotes`) — kept in the type for future use; not surfaced unless populated.
- Verified Vendor profile changes.

### Files touched

- `src/pages/GreenlistProfile.tsx` — full rewrite of layout (compact rows, omit-empty rule, 3 sections, 2-col grid)
- `src/data/greenlist.ts` — add verified `profile` objects to ~12 entries

### Result

Greenlist profiles read as compact technical briefs. Facilities with strong public data show a richer block of regulatory/capabilities/background fields in a 2-column grid; facilities with thin data show a clean short-form page (header + summary + footer) instead of a wall of "Not disclosed" rows. Vertical scroll is roughly halved on populated profiles and significantly more on sparse ones.

