

## Vendor Profile — Navigation Cleanup + Verified Drug Scope

Refine `src/pages/VendorProfile.tsx`. Strip vendor-facing CTAs and competing nav, add a single quiet "Back to Directory" link above the vendor name, and introduce a precise **Verified Drug Scope** section inside the existing profile card.

---

### Navigation changes

**Remove:**
- Top-right desktop `← Directory` link in the identity row
- Bottom action-row `← Vendor Registry` link
- Bottom action-row `Begin Verification →` link (vendor-facing — does not belong on a consumer page)

**Add:**
- A single small `← Back to Directory` link rendered above the vendor name (left-aligned, sits between the `Breadcrumb` and the `h1`). Style: `text-[12px] text-muted-foreground hover:text-foreground mb-3 inline-block`. This becomes the only directory-return path on the page.

**Action area (inside card, right-aligned, after hairline divider):**
- Only `Visit website ↗` remains (when `vendor.website` exists). For all statuses. If no website exists, the action row collapses entirely (no empty divider).

### New section: Verified Drug Scope

Render **inside the same profile card**, immediately after the 2-column metadata grid and before the action divider. Full-width within the card (spans both columns). Treated as a core record field, not a separate visual block — same border-bottom rhythm as the grid rows above.

Structure:
- Label row: small uppercase eyebrow `Verified drug scope` (matches the `Row` label style — `text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground`).
- Body, status-aware:

**Verified vendors:**
- If `vendor.verifiedCompounds` exists (new optional field — see data note below): render as a clean list. Group by category when `vendor.verifiedScopeGroups` is provided (object: `{ [category: string]: string[] }`); otherwise render a flat list of compound names. Each compound on its own line, `text-[14px] text-foreground/90 leading-[1.7]`. Categories rendered as small label rows above their compound list.
- Fallback when only `verifiedCategories` exists (no compound-level data yet): render the categories as the scope, prefixed by a small note: `Verified at category level. Specific compound list pending publication.`
- Below the list, a single muted disclosure line: `Verification applies only to the products listed above. Other products offered by this vendor are not within the published scope.`
- When a per-scope review date exists (`vendor.scopeReviewDate`, optional), render below the disclosure: `Scope reviewed {date}.`

**Non-verified vendors (unverified / under-review / suspended / removed):**
- Single muted line: `No verified drug scope is currently published.`
- No list, no disclosure tail.

### Data note (additive, no breaking changes)

Extend the `Vendor` type in `src/data/vendors.ts` with three optional fields:
- `verifiedCompounds?: string[]` — flat list of specific reviewed compounds
- `verifiedScopeGroups?: Record<string, string[]>` — optional grouping by category (e.g. `{ "Peptides": ["BPC-157", "TB-500"], "Hormones": ["Testosterone Cypionate"] }`)
- `scopeReviewDate?: string` — optional per-scope review date

No existing data needs to change. The page renders correctly whether these fields are populated or absent (graceful degradation: groups → flat list → categories → muted note).

### Updated card field order

Inside the 2-column grid (unchanged from current):
Public status · Legal name · Location · Website · Medical director · Category · Clinical focus · State · Verified scope (header-level, verified only) · Last review date · Review ID · Upstream source summary (verified+publicNote, spans columns) · Non-verified status note (non-verified, spans columns)

Then **new**: Verified Drug Scope block (full-width inside card, spans both columns).

Then: hairline divider → action area (Visit website only, or omitted) → footer micro-line outside card (unchanged).

### Visual rules

- Stays one section, one card. No new bands or sections outside the card.
- New scope block uses the same border-bottom hairline + label/value rhythm as existing `Row`s — feels native to the card, not bolted on.
- Status-tinted top border on the card unchanged.
- No pills, no badges in the compound list — plain typography, one compound per line, optional category sublabels.
- Keep `PageMeta`, `Breadcrumb`, `StatusBadge`, `getVendor`, `CAPSULE_BORDER`, `NON_VERIFIED_NOTE`, `hostname`, `formatLocation`, `Row` primitive.

### Files touched

- `src/pages/VendorProfile.tsx` — remove top-right `← Directory`, remove bottom `← Vendor Registry` and `Begin Verification` links, add `← Back to Directory` above the `h1`, add the `VerifiedScope` block inside the card after the grid.
- `src/data/vendors.ts` — extend the `Vendor` type with three new optional fields (`verifiedCompounds`, `verifiedScopeGroups`, `scopeReviewDate`). No existing data modified.

### What stays the same

`StatusBadge`, `PageMeta`, `Breadcrumb`, `getVendor`, the `Vendor` core fields, `VENDOR_STATUS_LABEL`, the `CAPSULE_BORDER` map, the route `/directory/:slug`, the 2-column grid layout, the footer micro-line, all existing vendor data, every other page on the site.

