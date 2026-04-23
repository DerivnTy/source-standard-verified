

## Medical Advisory: Rewrite Sections 01 and 02 Copy

Update the copy in `src/pages/MedicalAdvisory.tsx` for the first two sections. Structure, layout, and styling stay identical — only text content changes.

### Section 01 — "Transparency" → "Institutional Mandate"

Replace the `WHY_ITEMS` array (3 cards) with 4 statements, and update the section headline.

- **Headline**: `Transparency requires accountability.` → `Institutional Mandate`
- **Body**: Replace the 3-card `WHY_ITEMS` grid with 4 statements:
  1. The Medical Advisory Board provides independent clinical oversight of the verification framework.
  2. Audit determinations are findings of record based on documented pharmacy sourcing, licensure, and regulatory standing.
  3. The Board maintains the integrity of the standard through the periodic review of forensic audit criteria.
  4. To ensure objective distance, Board members do not participate in individual vendor approvals or commercial activities.

Layout adjustment: switch the 3-column `md:grid-cols-3` divided grid to a 4-statement layout. Cleanest fit at this width: a 2×2 grid (`md:grid-cols-2`) with divider treatment matching the rest of the page, or a stacked numbered list. Recommendation: **2×2 grid with hairline dividers** to preserve the institutional rhythm of the existing design. Each statement renders as `t-body-md` foreground text (no separate title/body split since these are single declarative statements).

### Section 02 — "Verification Chain" → "Governance Framework"

Replace the `ROLE_FUNCTIONS` array (4 items) and update the headline + supporting paragraph. The existing left-rail / right-list 12-column structure is preserved.

- **Headline**: `The verification chain` → `Governance Framework`
- **Supporting paragraph** (left rail): remove or replace with a brief framing line. Recommendation: remove the existing "The Board sits above the operational registry…" paragraph entirely since the new content is self-contained, OR replace with a single sentence. Recommendation: **remove** to let the four-item list carry the section.
- **Update `ROLE_FUNCTIONS`** (keep `01`–`04` numbering, title + description shape):
  1. **Regulatory Thresholds** — Establishing the clinical and statutory requirements for pharmaceutical sourcing verification.
  2. **Supplier Validation** — Defining the criteria for the recognition of greenlisted upstream pharmacy partners.
  3. **Administrative Audits** — Conducting randomized reviews of vendor records to ensure consistency with pharmacy-of-record data.
  4. **Protocol Evolution** — Authorizing updates to the Source Standard in alignment with evolving FDA and state regulatory guidelines.

### Waypoint Labels (DocJumpBar)

Update the `WAYPOINTS` array to reflect the new section names so the sticky pill bar matches:
- `01 Transparency` → `01 Mandate`
- `02 Verification Chain` → `02 Governance`

(Sections 03 Members, 04 Scope, 05 Responsibilities remain unchanged.)

### Files Edited

- `src/pages/MedicalAdvisory.tsx`

