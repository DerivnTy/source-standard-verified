

## Verified Vendor Profile Rebuild — Premium Trust Record

A full structural rebuild of `/verified-vendors/:slug` (`src/pages/VendorProfile.tsx`). Same data shape, same backward compatibility, but reorganized into a layered trust record that scales across all five status states.

### Page architecture (top → bottom)

**1. Trust Header (status-toned)**
- Back link → Directory
- Eyebrow: vendor category
- H1: vendor name (`break-words max-w-[24ch]` for clean wrap)
- Identity row: `StatusBadge` + `VerificationShield` (when verified) · location · fulfillment label · clinical focus[0]
- Right slot: "Visit website" CTA (single, primary)
- Status-tinted top accent bar (verified=green, pending=amber, suspended=red, etc.)

**2. At-a-glance trust strip**
A dense, mono-tagged 6-cell strip directly below the header. Always visible, always scannable:
- Status · Fulfillment · Source type · Location · Clinical focus · Last reviewed
- Cells use `t-utility-xs` labels + `t-body-sm` values, mono where appropriate
- This is the "decision in 5 seconds" surface

**3. Verified Scope block** (verified only)
- Header: "Verified Scope" + scope review date
- Description sentence framing what verification covers in this context
- Grouped compound list (uses existing `verifiedScopeGroups` / `verifiedCompounds` / `verifiedCategories` fallback chain)
- Closing line: "Verification applies only to the products listed. Other products offered by this vendor are not within the published scope."

**4. Not Covered by This Verification block** (verified only)
- Bulleted list, calm/clarifying tone (not defensive):
  - Individual treatment outcomes
  - Products or categories outside the reviewed scope
  - Future conduct beyond the audit date
  - Source relationships not disclosed in the reviewed record
  - Medical efficacy or safety guarantees

**5. Status posture block** (non-verified statuses)
Replaces blocks 3+4 when status ≠ verified. Uses `Callout` with appropriate tone:
- `under-review` → info: "An application is under review under SS-FRAMEWORK-2026.01."
- `unverified` → notice: existing `VENDOR_STATUS_DISCLOSURE.unverified`
- `suspended` → warning: existing suspended disclosure
- `removed` → notice: existing removed disclosure

**6. Structured Record card**
Two-column dense `<dl>` (single-col on mobile). Same `Row` primitive, but reorganized into clear groups separated by subhead rules:
- **Identity** — Public name, Medical director, Category
- **Service** — Fulfillment, Clinical focus, Location, States served (when serviceArea present)
- **Source** — Source type (placeholder "503A / 503B / Retail" when not modeled), Verified scope summary
- **Verification record** (verified only) — Review ID (mono), Last review date, Scope reviewed
- **Public** — Website

**7. Footer micro-line**
- "Public record · Updated {reviewDate} · No payment influences inclusion or status."

### Status-driven theming

Per-status `theme` object controls:
- Header top-border color
- At-a-glance strip border accent
- Status-block tone (Callout tone)

| Status | Accent | Block tone |
|---|---|---|
| verified | `border-verified` | scope+exclusions blocks |
| under-review | `border-pending` | Callout info |
| unverified | `border-muted-foreground/40` | Callout notice |
| suspended | `border-destructive` | Callout warning |
| removed | `border-muted-foreground/40` | Callout notice |

### Mobile

- Header CTA stacks below identity (already conditional)
- At-a-glance strip becomes 2-col then 1-col grid via `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`
- Record card collapses to single column `dl`
- Long vendor names wrap via `break-words`

### Files touched

- **`src/pages/VendorProfile.tsx`** — full rewrite. Keeps `getVendor`, `StatusBadge`, `Breadcrumb`, `PageMeta`. Adds imports for `VerificationShield`, `Callout`, `getVendorFulfillment`, `VENDOR_FULFILLMENT_LABEL`, `VENDOR_STATUS_DISCLOSURE`.
- No data changes. No new components. No token changes. No impact on registry page or any other surface.

### Out of scope

- Map/geo on profile (deferred with registry-side geo work)
- NPI field (not in current data model — show only when populated; otherwise omitted)
- Failed/Flagged status (not in current type union)

