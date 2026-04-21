

## How It Works (SOP) — Forensic Audit tone overhaul

A copy + light visual pass on `src/pages/HowItWorks.tsx`. No data file edits, no routing changes, no structural reordering. Tone aligned with the just-completed Governance, Accountability, Status Definitions, and Report-a-Concern overhauls. Document-ID `SS-FRAMEWORK-2026.01` becomes the visual anchor.

### Header (`RecordHeader`)

- Eyebrow: `Standard operating procedure` → `SOP · Forensic audit methodology`
- Title: `Verification Protocol & Audit Methodology.` → `SOP: Verification Protocol & Audit Methodology.`
- Lead → `Forensic examination of supply-chain records, regulatory credentials, and public-facing claims against a controlled evidentiary standard. Determinations are issued under a defined scope and time window and remain subject to continuous surveillance.`
- Metadata unchanged.

### Document header strip (existing mono bar under header)

- Add a third mono cell to make the strip feel like an SOP cover page:
  - `Document · SS-FRAMEWORK-2026.01`
  - `Issued 04/21/2026 · Revision 2026.01 · Controlled copy`
  - New: `Classification · Public · Controlled standard`

### §1 — Audit principles → "Governing Principles of Forensic Examination"

- Eyebrow: `Audit principles` → `§1 · Governing principles`
- H2: → `Governing Principles of Forensic Examination.`
- Lead: → `The verification protocol prioritizes the source over the storefront. Every examination is conducted against a consistent evidentiary rubric, independent of marketing presentation, under the three principles below.`
- `PRINCIPLE_TITLES` already forensic — keep.
- Tighten `whyItMatters[0].d` → `Vendors carry no greater legitimacy than the pharmacies and upstream suppliers behind them. The protocol prioritizes the source over the storefront and examines the chain of custody as the primary evidentiary record.`

### §2 — Scope of attestation (kept; light tone tightening)

- Eyebrow: `Scope of attestation` → `§2 · Scope of attestation`
- H2: `Attestation of Record Consistency.` (kept).

### §3 — Public determinations (kept; numbered)

- Eyebrow: `Public determinations` → `§3 · Registry determinations`

### §4 — Examination domains → "Administrative Examination Domains"

- Eyebrow: `Examination domains` → `§4 · Examination domains`
- H2: → `Administrative Examination Domains.`
- Lead: → `Each domain is examined against the evidentiary standard for the requested verification category. All findings are logged to the controlled audit file under document SS-FRAMEWORK-2026.01.`
- Update `SCOPE_TITLES` map values:
  - `Certificates and category records` → `Analytical & Lot Record Validation`
  - `Sourcing and invoice history` → `Procurement & Invoice Reconciliation`
  - `Pharmacy and supplier records` → `Upstream Supply-Chain Verification`
  - `Public claims consistency` → `Public-Claims Reconciliation`
  - `Business identity` → `Entity Identification & Registration`
  - `Licenses and registrations` → `Regulatory Credentials Verification`
  - `Renewal-related updates` → `Renewal-Cycle Delta Examination`
- Add a small mono code label above each domain card title: `DOMAIN · NN` (`text-muted-foreground`, mono uppercase 10.5px).

### §5 — Audit lifecycle → "Standardized Review Lifecycle"

- Eyebrow: `Audit lifecycle` → `§5 · Standardized review lifecycle`
- H2: → `Standardized Review Lifecycle.`
- Lead: → `Every verification proceeds through six controlled stages of forensic examination. A file may be paused at any stage when records are incomplete, inconsistent, or require evidentiary clarification.`
- `STEP_TITLES` already includes `Regulatory Cross-Referencing` (03). Adjust 04 → `Discrepancy Analysis & Claims Reconciliation` to make "Discrepancy Analysis" explicit.

### §6 — Continuous surveillance → "Post-Audit Surveillance & Mandatory Disclosure"

- Eyebrow: `Continuous surveillance` → `§6 · Post-audit surveillance`
- H2: → `Post-Audit Surveillance & Mandatory Disclosure.`
- Lead: → `A determination is a snapshot in time. Verified files are subject to continuous surveillance and are re-examined at a defined renewal interval and upon any reported material change. Entities of record are bound to disclose the following Mandatory Disclosure Events within seventy-two (72) hours of occurrence.`
- Add a mono advisory bar above the MDE list (matches Accountability §2): `border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3 max-w-3xl mb-5`, label `DISCLOSURE WINDOW · 72 HOURS · SS-FRAMEWORK-2026.01 · §6`.

### §7 — Post-determination (kept; numbered)

- Eyebrow: `Post-determination` → `§7 · Post-determination handling`
- H2: → `Post-Determination Record Handling.`

### §8 — Applicant rationale (kept; numbered)

- Eyebrow: `Applicant rationale` → `§8 · Applicant rationale`

### §9 — Boundaries → "Jurisdictional Limitations"

- Eyebrow: `Boundaries` → `§9 · Jurisdictional limitations`
- H2: → `Jurisdictional Limitations.`
- Lead (new short paragraph above the list): `The following limitations are administrative boundaries of the verification framework. They define what the SOP does not constitute as a matter of legal scope, and may not be inferred or extended by reading.`

### Footer reference strip → Official citation block

Replace the current single-line strip with a citation block matching Governance / Accountability:
- Container: `border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl`
- Top mono label: `OFFICIAL CITATION · SS-FRAMEWORK-2026.01`
- Body: `Source Standard. SOP: Verification Protocol & Audit Methodology. Document SS-FRAMEWORK-2026.01. Issued 04 / 21 / 2026. Revision 2026.01. Controlled copy on file with the issuing organization.`
- Sub-line (mono, 11px uppercase, muted): `Controlled standard · Subject to versioned revision · See Status Definitions · See Accountability` (with the two existing `<Link>` elements rendered inline within the sub-line).

### Files touched

- `src/pages/HowItWorks.tsx` only — header, document strip, §1–§9 eyebrows / titles / leads, `SCOPE_TITLES` + `STEP_TITLES` value tweaks, `whyItMatters[0]` description tightening, §4 per-domain mono code label, §6 mono advisory bar, footer citation block.

### What stays the same

All routes, the `RecordHeader` component, all data array shapes, section ordering, the 5-status determination table, the 6-step lifecycle, design tokens, and container widths.

