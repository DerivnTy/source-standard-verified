

## Implementing approved Governance overhaul

Executing the previously approved plan on `src/pages/Governance.tsx` exactly as specified — no scope changes.

### Changes

1. **`RecordHeader`**: eyebrow → `Regulatory alignment`; title → `Regulatory Alignment & Oversight.`; lead rewritten to "Institutional framework…"; summary labels tightened (`Advisory body of record`, `Anchored authorities`, `Initial roster filing`, `Neutrality posture` / `Affirmed`).

2. **§1 Clinical Advisory of Record**: heading + description rewritten under licensed clinical oversight framing. Roster placeholder restyled as an administrative-filing notice with `border-l-2 border-l-foreground bg-surface-muted/40` block, mono `ADMINISTRATIVE NOTICE · SS-GOV-2026.01 · §1.A` label, body line "Initial advisory roster pending publication.", and Q1 2026 filing-window sub-line. Footer line rewritten to "issued under controlled revision…".

3. **§2 Statutory & Compendial Anchors**: heading/description rewritten ("evaluative mirror"). Column labels → `Anchor` / `Issuing authority` / `Statutory / compendial reference`. Add in-component `AUTHORITY_REFERENCE_OVERRIDES` map keyed by `Authority.code` for FDA (Section 501(a)(2)(B), 21 U.S.C. § 351(a)(2)(B)), PCAB, NSF, USP (Chapters <795>/<797>/<800>), STATE — render falls back to `a.references` when no override exists. `src/data/authorities.ts` untouched.

4. **§3 Organizational Neutrality & Ethical Boundaries**: heading → "Strict separation of interests." Both paragraphs replaced with "immune to commercial influence" and uniform-fee language.

5. **Footer citation**: restyled as official citation block — `border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl`, mono `OFFICIAL CITATION · SS-GOV-2026.01` label, full citation body, mono sub-line `Controlled copy · Subject to versioned revision under §1`.

### Files touched

- `src/pages/Governance.tsx` only.

### What stays the same

Routes, `RecordHeader` / `MetadataBar` components, `src/data/authorities.ts`, 5-authority order, section ordering, design tokens, container widths.

