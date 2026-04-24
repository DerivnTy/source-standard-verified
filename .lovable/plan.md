

## Upstream Registry Copy Rewrite

Rewrites text content only on the Upstream Registry page. No layout, components, styling, filter logic, routes, or database changes.

### Files Touched

1. **`src/pages/Greenlist.tsx`** — page metadata, header copy, horizon metric labels, search placeholder, status pill labels, bottom explainer section copy.
2. **`src/components/registry/GreenlistRow.tsx`** — row-level status label ("Authorized" → "Recognized", "Alert" → "Status Alert").

*Footer: already correct from prior pass — Standards column contains only Verification Protocol, Status Definitions, Compliance. No change needed.*

### Content Changes

**`src/pages/Greenlist.tsx`**

- **PageMeta**
  - Title: `Upstream Registry · Source Standard`
  - Description: `A public-reference list of upstream compounding facilities used for Source Standard sourcing review. Records are organized by facility type, location, public registration status, and review relevance.`

- **RegistryHeader**
  - `title`: `Upstream Registry`
  - `description`: `A public-reference list of upstream compounding facilities used for Source Standard sourcing review. Records are organized by facility type, location, public registration status, and review relevance.`
  - `indexNumber`: `02` (unchanged)

- **RegistryHorizon cells**
  - `Total Recognized` → `Total Records`
  - `503B Facilities` (unchanged)
  - `503A Facilities` (unchanged)

- **Search input**
  - `placeholder`: `Search facilities, locations, or facility type…`
  - `aria-label`: `Search Upstream Registry`

- **Status pills**
  - `Authorized` → `Recognized`
  - `Alert` → `Status Alert`
  - (Category pills `All / 503B / 503A / Other` unchanged)

- **EmptyState**
  - `eyebrow`: `No Records Found`
  - `body`: `No upstream facility matches these filters.`

- **Bottom explainer section**
  - Left eyebrow: `Two layers · One framework` → `Two layers. One review framework.`
  - Left body: `The Upstream Registry identifies facilities used as reference records during vendor sourcing review.`
  - Left sub: `Inclusion in the Upstream Registry does not verify that any vendor is actively sourcing from that facility.`
  - Right eyebrow: `The vendor layer` → `Vendor-level review`
  - Right body: `Vendor verification reviews whether submitted documentation supports the vendor's stated pharmacy relationships, sourcing claims, and chain-of-custody records.`
  - CTA `Open the Vendor Registry` (unchanged)

**`src/components/registry/GreenlistRow.tsx`**

- Row status label `Authorized` → `Recognized`
- Row status label `Alert` → `Status Alert`
- `aria-label` template unchanged structurally

### Out of Scope

- All filter logic, sorting, pagination, routing
- All component styles, colors, spacing, animations
- Database records (`src/data/greenlist.ts`) — facility names, states, types, and `regulatoryAlert` field unchanged
- Footer (already aligned)
- All other pages

