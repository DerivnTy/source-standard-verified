## Vendor Profile — Phase 4 Polish (approved)

Refine `src/pages/VendorProfile.tsx` only. Preserve data, routing, JSON-LD, verification logic, colors, and typography scale. Density + framing + forward-compat for verified profiles.

### 1. Hero density
- `LogoBlock` size 36 → 44.
- Card padding `16px 14px 14px` → `14px 14px 12px`.
- Tighten inner margins (`mt-3.5` icon row → `mt-2.5`).

### 2. Quick Facts → compact summary table
Vertical `<dl>`, one row per fact, label left / value right, 0.5px hairline dividers, no card chrome. Rows: Provider Type · Location · Verification · Profile · Last Reviewed.

### 3. Rename "Profile Completeness" → "About This Profile"
Label change only; body copy and conditional visibility unchanged (hidden when verified).

### 4. Shrink Verification Status card
Default state = heading + one-line status + "Learn how verification works →" toggle. Reduce paragraph to 15px / lh 1.55 and tighten margins. Expanded detail unchanged.

### 5–7. Contact / About / Clinical Leadership
Unchanged.

### 8. Claim Your Profile — visual distinction
Distinct surface: `hsl(var(--foreground) / 0.04)` background, `borderRadius: 16px`, `padding: 24px`, `mt-6`. Eyebrow "For Providers" above the heading. Larger primary button (`padding: 14px 22px`, `fontSize: 12px`).

### 9. Activity timeline (new, compact)
Insert between Clinical Leadership and Claim Your Profile.
- Only render rows that have real data OR are core lifecycle events.
- Render logic: build the row list first; if fewer than 2 rows have real dates, use a single-line compact variant ("Activity — Not yet reviewed") instead of the full section, so it never feels empty.
- Core rows (when data present): Profile Created, Last Reviewed, Verification Status Issued, Last Updated.
- Uses only optional vendor fields; missing fields render muted "—" only inside the full variant.

### 10. Verified profile enrichment (additive, guarded)
Same skeleton, richer when `isVerified`:
- **Quick Facts:** append "Verification Period" row only when both `vendor.reviewDate` and `vendor.nextReviewDate` are present.
- **Verification Status:** append "Verified Manufacturer(s)" line only when `vendor.verifiedManufacturers?.length`. No fallback to `scopeCompounds`.
- **"✓ Verified" micro-labels:** only render when the specific field has an explicit truthy verification flag (e.g. `vendor.verifiedFields?.phone === true`). No inference. If the data source doesn't provide field-level flags, no labels render — never imply verification.
- **Activity:** verified profiles naturally populate more rows.

### Section order (final)
Hero · Status Summary · Quick Facts · About This Profile · Verification Status · Contact · Services · About This Vendor · Clinical Coverage · Providers · Facility · Activity · Claim Your Profile.

### Technical notes
- Single file: `src/pages/VendorProfile.tsx`.
- New local components: `QuickFactsTable`, `Activity`. Rename `ProfileCompletenessCard` → `AboutThisProfileCard`.
- Optional fields (`profileCreatedDate`, `lastUpdatedDate`, `nextReviewDate`, `verifiedManufacturers`, `verifiedFields`) read defensively; extend `Vendor` type only if TS requires it — all as optional.
- Typecheck + spot-check the current unverified route.

### Out of scope
- Seeding real timeline data.
- New pages/routes/shared components.
- Facility Records / Greenlist changes.
