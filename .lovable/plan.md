# Vendor Profile Template Refinement

Surgical refinement of `src/pages/VendorProfile.tsx` only. No other files, components, routes, data, or global styles change.

## Files Touched

1. **`src/pages/VendorProfile.tsx`** — back link label, status anchor, metadata fields, status-meaning + review-boundary blocks.

## Changes

### 1. Back link
- Rename `← Back to Directory` → `← Back to Registry`.
- Destination unchanged.

### 2. Status anchor (top-right of profile card)
Uppercase, compact, monospace label aligned to the registry-card status system. Color map:

| Status | Label | Color |
|---|---|---|
| `verified` | `VERIFIED` | existing verified token |
| `unverified` | `UNVERIFIED` | `#FF3B30` |
| `under-review` | `UNDER REVIEW` | `#FF9500` |
| `suspended` | `SUSPENDED` | existing suspended token |
| `removed` | `REMOVED` | muted |

Note: `under-review` is rendered as **UNDER REVIEW**, never "PENDING". Site-wide registry consistency.

### 3. Metadata fields (Unverified path)
Replace current confusing fields with this clean set:

- **Vendor Type** — mapped from `getVendorFulfillment(vendor)`:
  - `in-person` → `Physical Clinic`
  - `online` → `Online Vendor`
  - `hybrid` → `Hybrid`
- **Therapy Category** — primary `clinicalFocus[0]` or `vendor.category`
- **Location** — `formatLocation(vendor)` or `Online` for online-only
- **Review Status** — `No sufficient documentation reviewed`
- **Website** — existing website link if present (omit if absent)

Removed for Unverified: `Source Type` (503A/503B/Retail), `License / ID`, `Verification Date` (omit when blank rather than render empty).

### 4. Status Meaning block
Inside the card, below metadata grid, separated by a hairline top border + spacing.

- Eyebrow: `STATUS MEANING`
- Body: `No sufficient documentation has been reviewed by Source Standard to support the stated sourcing claim within the registry framework.`

### 5. Review Boundary block
Below Status Meaning, separated by hairline top border + spacing.

- Eyebrow: `REVIEW BOUNDARY`
- Body: `Unverified status does not imply that the vendor is unsafe, unlawful, fraudulent, or clinically inappropriate. It reflects only the absence of sufficient reviewed documentation within the Source Standard framework.`

### 6. Visual system
- Single white card, ~600px max width, left-aligned.
- 1px hairline border using existing border token.
- 11px uppercase eyebrows, `0.08em` letter-spacing, muted.
- Values in restrained body sans, near-navy.
- No icons, no gradients, no shadows, no decorative graphics.
- Controlled bottom spacing before footer (48–72px).

## Technical Notes

- Status anchor extracted into a small inline component within the file so it's reusable across status types — only Unverified content blocks render this pass; other statuses continue to render existing fields unchanged.
- `under-review` label string is hard-coded as `UNDER REVIEW` in the anchor map, not derived from any "pending" alias.
- No changes to `vendors.ts`, `StatusBadge.tsx`, registry list, filters, or routes.

## Out of Scope

- Verified profile field expansion (next pass).
- Source Standard ID / shield logic.
- Any registry list, filter, header, footer, or global style changes.
