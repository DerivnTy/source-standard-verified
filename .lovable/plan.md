

## Sources page — Public Regulatory Registry tone + dashboard-style stats

A copy + light-visual pass on `src/pages/Greenlist.tsx`. No structural, routing, filter, or data changes.

### Header (`AnchorHeader`)
- Eyebrow: `Sources` → `Public regulatory registry`
- Title: `Recognized upstream sources.` → `Upstream Facility Registry.`
- Lead: → `Compounding facilities recognized under the framework on the basis of federal registration and state licensure. Inclusion is documentary; it is not a clinical endorsement.`

### Stats tiles (`aside` dl) — dashboard treatment
Restyle from a flat 4-cell strip into a data-dashboard panel:
- Wrap the grid in a titled panel: small uppercase header `Registry index` (`text-[10px] tracking-[0.1em] font-mono text-muted-foreground`) with a thin divider rule.
- Each cell:
  - Label on top: `text-[9.5px] font-mono uppercase tracking-[0.12em] text-muted-foreground/70`
  - Number larger and monospaced: `text-[22px] font-mono font-medium tabular-nums text-foreground`
  - A status colour rule above the number for category cells (2px tall, full width, in `--src-503b/--src-503a/--src-other`); the Total cell uses `--border`.
- Background: `bg-surface-muted/40` panel, `border-border/60`, internal grid lines via `bg-border/40` (already present).
- Labels stay: `Total`, `503B`, `503A`, `Other` (numerals keep `padStart(2,"0")` for "37/21" tabular feel).

### Status section (currently "How Greenlist status works")
- Eyebrow: `How Greenlist status works` → `Registry inclusion standards`
- Body paragraph → :
> A maintained index of compounding facilities recognized under federal registration, state licensure, and accredited credentialing. Inclusion in this registry is the mandatory foundation for any vendor compliance assessment; a vendor cannot be listed in the Vendor Compliance Registry until each declared upstream source is present here.

### Source types (`SOURCE_TYPE_DEF`)
Replace the three definitions with technical, citation-style text:

- **503B Outsourcing Facility** — `Facility registered with the U.S. Food and Drug Administration under Section 503B of the Federal Food, Drug, and Cosmetic Act. Subject to current good manufacturing practice (cGMP) requirements and routine FDA inspection.`
- **503A Compounding Pharmacy** — `Pharmacy operating under Section 503A of the Federal Food, Drug, and Cosmetic Act. Licensed by the applicable state board of pharmacy and required to compound in accordance with United States Pharmacopeia (USP) standards, including USP <795>, <797>, and <800>.`
- **Other Qualified Source** — `Additional recognized facility categories, including NSF-certified facilities, ISO-accredited laboratories, hospital-system suppliers, and multi-location compounding networks operating under documented accreditation.`

### Scope note → Technical note
- Section eyebrow above the paragraph (new): `Technical note` (`eyebrow` class).
- Replace the existing "Scope note." paragraph with:
> Greenlisted is an audit-framework status used to determine documentation eligibility for upstream sources. It records that a facility's federal registration, state licensure, or recognized accreditation has been verified for inclusion in this registry. It is not a clinical endorsement and does not assess product safety or therapeutic efficacy. Vendor-level audit status is tracked separately on the [Vendor Compliance Registry](/verified-vendors).
- Keep the inline link to `/verified-vendors`.

### What stays the same
All routes, filter/sort/pagination logic, data in `src/data/greenlist.ts`, table and mobile card layouts, category color tokens, focus-tag mapping, the `CategoryPill` component, and all typography tokens introduced in the previous consistency pass.

### Files touched
- `src/pages/Greenlist.tsx` — copy updates in `AnchorHeader`, `SOURCE_TYPE_DEF`, the explanatory section, the scope/technical note; restyle of the stats `aside` into a dashboard panel.

