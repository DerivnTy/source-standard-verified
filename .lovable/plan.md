## Vendor Profile — Consumer Trust & Transparency Refinement (v2)

Refine `src/pages/VendorProfile.tsx` so each profile reads as a public transparency record. Preserve existing colors, typography, spacing, routing, verification logic, status badges, and profile data. Hierarchy + copy + missing-state pass — no data model changes.

### 1. Hero status summary
Directly beneath the hero identity block, add one plain-language line:
- Verified: "This provider has completed the Source Standard verification process and currently maintains Verified status."
- Unverified: "This provider has not completed the Source Standard verification process."
- Under review: "This provider is currently under Source Standard review."
- Suspended / removed: reuse `VENDOR_STATUS_LABEL` phrasing in one sentence.
Styling: `t-body` muted, no card.

### 2. Quick Facts (new, compact)
Immediately under the status summary, a tight 2×2 (mobile) / 4-col (desktop) fact grid — the first thing users scan:
- Provider Type — In-Person / Online / Hybrid (from `getVendorFulfillment`)
- Location — `formatLocation(vendor)`
- Verification — Verified / Unverified / Under Review / Suspended
- Profile — Claimed / Unclaimed
Uses existing eyebrow-label + value styling (mirror `Cell`), no card chrome, hairline dividers only.

### 3. Last Reviewed (new, in hero band)
Small mono field near the hero (adjacent to Quick Facts or beneath status pill):
- Verified with `reviewDate`: "Last Reviewed — {reviewDate}"
- Otherwise: "Review Status — Not yet reviewed"
Reuses existing mono/tabular styling from status area.

### 4. Profile Completeness card (conditional)
Insert immediately beneath hero band, above Verification Status:
- Unclaimed: "This provider has not yet claimed or completed their Source Standard profile. Some information displayed on this page has not been provided to Source Standard and therefore cannot currently be verified."
- Claimed but unverified: shortened variant acknowledging claim without verification.
- Verified: **do not render** the card at all.
Uses existing `CARD` style.

### 5. Unified missing-info treatment
Replace the italic "Information Not Submitted" in `Cell` (line ~248) with a consistent, non-italic, muted label: **"Not provided to Source Standard"**. Apply everywhere a field is absent across Contact, Providers, and Clinical Leadership. Empty fields remain visible — never hidden.

### 6. Rename "Verification Record" → "Verification Status"
- Rename heading.
- Unverified copy: "This provider has not yet participated in the Source Standard verification process."
- CTA: "View Verification Details" → "Learn how verification works →" (preserve existing target route).
- Verified path unchanged (expandable scope details stay).

### 7. Contact section hierarchy
Reorder to: Website, Phone, Address, Instagram, LinkedIn. Missing rows use the unified transparency label. Keep social icons in hero as-is.

### 8. Services & Clinical Focus
Keep section. Render `serviceBadges` (already computed) as existing `Tag` chips in a wrap. No structural change.

### 9. About This Vendor — clamp with Read More
Wrap About/summary in a collapsible:
- Collapsed via `line-clamp-6` (~4–6 lines).
- Text-only "Read More" / "Read Less" toggle, only when overflow exists.
- No layout change for short content.

### 10. Providers & Clinical Leadership — always render
Keep section visible even when `hasProvider` is false. Medical Director, Credentials, Clinical Leadership, Additional Providers each render with the unified "Not provided to Source Standard" treatment when absent.

### 11. Claim Your Profile
Bottom claim block:
- Heading: **"Claim Your Profile"** (speaking directly to the vendor).
- Body: "Claiming this profile allows your organization to submit additional information, maintain public profile details, and begin the Source Standard verification process."
- Primary CTA: "Claim Profile" (existing link target preserved).
- Hide entire block when `claimed === true`.

### 12. Section order (mobile + desktop DOM order)
1. Hero (name, status pill, type, city/state, socials)
2. Status summary (§1)
3. Quick Facts (§2)
4. Last Reviewed (§3) — may sit inside the Quick Facts band
5. Profile Completeness card (§4, conditional)
6. Verification Status (§6) — kept above Contact; this is why users are here
7. Contact (§7)
8. Services & Clinical Focus (§8)
9. About This Vendor (§9)
10. Providers & Clinical Leadership (§10)
11. Claim Your Profile (§11)

Desktop grid preserved; mobile is a single column in this order.

### Technical notes
- Single file touched: `src/pages/VendorProfile.tsx`.
- New local components: `StatusSummary`, `QuickFacts`, `ProfileCompletenessCard`, `ReadMore`. All colocated.
- `Cell` empty-state string is the single source of the "Not provided…" label.
- No changes to `data/vendors.ts`, routing, JSON-LD, or verification/status logic.
- Verify via typecheck + spot-check on one verified and one unverified vendor route.

### Out of scope
- Completeness percentage/meter
- New data fields or schema changes
- Changes to Facility Records or shared components
