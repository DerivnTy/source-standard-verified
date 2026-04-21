

## Verified Vendors page — Public Ledger copy + stamp-style status badges

A copy pass on `src/pages/VerifiedVendors.tsx` plus a small visual change to `src/components/StatusBadge.tsx` so status labels read as official ledger stamps. No structural or routing changes.

### `src/pages/VerifiedVendors.tsx`

**Header (`AnchorHeader`)**
- Eyebrow: `Directory` → `Public ledger`
- Title: `Verified vendors.` → `Vendor Compliance Registry.`
- Lead: → `Public ledger of vendors assessed against the Source Standard framework. Every listing is anchored to a unique Audit ID.`

**Statistics tiles (`aside` dl)**
- `Total` → `Total Tracked Entities`
- `Verified` → `Compliant (Verified)`
- `Under review` → unchanged (kept for the fourth tile; the user did not request a change here)
- `Unverified` → `Non-Audited (Unverified)`

**Status legend descriptions (`STATUS_LEGEND_DESC`)**
- `verified` → `Documentation of upstream sourcing and clinical oversight has been audited and published.`
- `unverified` → `No documentation has been submitted for audit. Source Standard has not verified the chain of custody for this entity.`
- `suspended` → `Verification retracted pending investigation into supply-chain discrepancies.`
- `under-review` and `removed` left intact (no user-supplied copy).

**Registry note (paragraph beneath the legend grid)**
Replace the current "Note." paragraph with:
> An Unverified status indicates a lack of administrative transparency and documentation on file. It is an indicator of audit status, not a direct assessment of clinical safety.
Keep the existing `Read more →` link to `/how-to-read-the-directory` appended after the sentence.

**Section eyebrow**
- `How to read this directory` → `Registry note` (tightens to ledger language; still introduces the legend grid).

### `src/components/StatusBadge.tsx` — official-stamp treatment

Restyle the badge so it visually reads as a tag/stamp rather than a dot+label. New treatment:

- Outer: bordered pill, monospace, uppercase, +0.14em tracking, `px-2 py-[3px]`, subtle tinted background per status (e.g. `bg-verified/8 border-verified/40 text-verified` for verified; muted variants for others), `rounded-[3px]` for a square, official feel rather than fully rounded.
- Replace the small filled dot with a thin leading vertical bar (`w-[2px] h-3 bg-current`) — reads like an inspection-stamp rule.
- Sizes: `sm` → `text-[10px]`, `md` → `text-[11px]` (unchanged scale).
- Variants by status (background / border / text):
  - `verified` — verified tint, solid
  - `under-review` — pending tint
  - `suspended` — destructive tint
  - `unverified`, `removed` — muted tint, dashed border to signal absence of audit
- Accessibility: keep label text inside the badge (no icon-only). No `aria-label` change required.

This change is global — every page rendering `<StatusBadge />` (registry table, vendor profile, mobile cards) automatically picks up the stamp styling, which keeps the system consistent.

### What stays the same

All routes, filters, sort modes, pagination, table structure, mobile card layout, the data in `src/data/vendors.ts`, status keys, status sort order, the header padding/typography tokens, and the four-tile stats grid layout. Pure copy + badge restyle.

