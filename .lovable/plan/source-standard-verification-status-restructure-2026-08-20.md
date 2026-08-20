# Source Standard Verification Status Restructure

Precise, defensible status language across the directory, profiles, and a dedicated explainer page. Nothing implies a clinic failed or has questionable sourcing.

## 1. Vendor (clinic) status language

Two statuses drive nearly every record today: `verified` and `unverified`. Both get renamed and re-worded.

**Source Standard Verified** (was "Verified")
- Short: "This clinic has voluntarily completed Source Standard's independent sourcing verification process."
- Profile: "Source Standard has reviewed evidence supporting defined sourcing claims for this clinic. Verification is time-bound, limited to the reviewed scope, and tied to a public Review ID. It is not an endorsement, a product approval, or a guarantee of safety."

**Not Source Standard Verified** (was "Unverified")
- Short: "This clinic has not completed Source Standard's independent sourcing verification process."
- Profile: "This clinic has not completed Source Standard's independent sourcing verification process. This status does not indicate that Source Standard has evaluated or reached a conclusion regarding the clinic's sourcing, product quality, or safety."
- Never rendered in a negative/destructive color. Neutral grey token, no warning icon.

**Participation-only statuses** (apply only to organizations that entered the program):
- Under Review — "This clinic has applied and its submission is currently under review. No conclusion has been reached."
- Active — "Verification is current and in good standing."
- Suspended — "A previously issued verification is temporarily withdrawn pending clarification. This is not a final finding."
- Expired — "A previously issued verification has lapsed and has not been renewed."
- Removed — "This record has been withdrawn from active verification."

## 2. Facility (Greenlist) language — kept separate

- Greenlisted — "This facility has completed the applicable Source Standard evaluation process and met our defined criteria."
- Monitoring — "This facility is tracked against public records. No evaluation conclusion is implied."
- Status Alert — "Public records indicate further review is warranted before status can be confirmed."
- Explicit line wherever evaluation is described: "Fees cover the evaluation process only. Payment never guarantees Greenlist status or a favorable outcome."

## 3. Directory + profile design

- Directory rows: verified records carry the shield mark and "Source Standard Verified". Non-participants show a plain neutral "Not Source Standard Verified" label — same weight as a data field, not an alert.
- Vendor profile: a status block directly under the record header showing the status label, the one-paragraph explanation above, and (for verified records) Review ID, review date, and reviewed scope. Non-verified profiles show the explanation plus a neutral "Apply for verification" link.
- Filter labels in the registry updated to the new wording.

## 4. Status explainer page

Rewrite `/status-definitions` as the canonical page: what verification involves, the Verified vs. Not Verified distinction stated plainly side by side, the participation-only statuses, the separate facility Greenlist section, and a "What payment does and does not buy" section. Linked from the directory header, every vendor profile, and the apply pages.

## Technical notes

- `src/data/vendors.ts`: extend `VendorPublicStatus` with `active` and `expired`; rewrite `VENDOR_STATUS_LABEL`, `VENDOR_STATUS_SHORT`, `VENDOR_STATUS_DISCLOSURE`, `VENDOR_STATUS_PROFILE_NOTE` with the copy above. No record data changes — existing `unverified` records simply render the new label.
- `src/components/system/StatusPill.tsx`, `src/components/StatusBadge.tsx`, `src/components/registry/VendorAuditCard.tsx`, `src/components/registry/VerificationShield.tsx`: new labels + neutral variants for the added statuses.
- `src/pages/StatusDefinitions.tsx`, `src/pages/VendorProfile.tsx`, `src/pages/VerifiedVendors.tsx`, `src/pages/HowToReadTheDirectory.tsx`, `src/pages/FaqVerificationProcess.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/Greenlist.tsx`, `src/pages/Apply.tsx`, `src/pages/ForVendors.tsx`: copy updates to match.
- No color-token changes; "not verified" stays on the existing neutral foreground token.

## Review step

After implementation I will capture the updated directory row, a verified profile, a not-verified profile, and the status page, and send them for your sign-off before anything is published.
