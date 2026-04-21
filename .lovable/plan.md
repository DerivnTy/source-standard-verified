

## Process page — Technical SOP / forensic-audit tone overhaul

A copy + light visual pass on `src/pages/HowItWorks.tsx`. No data file edits, no routing changes, no structural section reordering. All content stays in place; tone, headers, and a few step labels are rewritten for SOP/forensic-audit register, and the document metadata is visually emphasized as an official header.

### Header (`RecordHeader`)

- Eyebrow: `Process` → `Standard operating procedure`
- Title: `How verification works.` → `Verification Protocol & Audit Methodology.`
- Lead: → `Examination of supply-chain records, regulatory credentials, and public-facing claims against the Source Standard evidentiary rubric. Determinations are recorded against a defined scope and time window.`
- Metadata items unchanged (`Doc / Status / Updated / Scope`) but visually emphasized — see "Document header strip" below.

### Document header strip (visual emphasis)

Directly under `RecordHeader`, add a thin full-width bar:
- Container: `border-b border-border bg-surface-muted/40`
- Inside `container-wide`, `flex items-center justify-between py-2.5`
- Left: mono uppercase 10.5px → `Document · SS-FRAMEWORK-2026.01`
- Right: mono uppercase 10.5px → `Issued 04/21/2026 · Revision 2026.01 · Controlled copy`
- Both `font-mono tracking-[0.1em] text-muted-foreground`, with the codes themselves rendered `text-foreground` so the identifier reads as the official artifact.

### §1 — Trust → "Audit Principles" (header + 3 cards)

- Eyebrow: `Trust` → `Audit principles`
- Heading: `Why this matters` → `Governing principles of the verification protocol.`
- Lead (replace): `Verification examines the records behind a vendor — not their public presentation — against a consistent evidentiary standard. Three principles govern conduct of every review.`
- Per-card title overrides (descriptions retained):
  - `Sourcing records matter` → `Chain-of-Custody Primacy`
  - `Public claims should match documented reality` → `Evidentiary Reconciliation`
  - `Verification is time-bound` → `Time-Bounded Determination`

### §2 — Meaning → "Audit scope & attestation"

- Eyebrow: `Meaning` → `Scope of attestation`
- Heading: `What a verified listing means` → `Attestation of Record Consistency.`
- Per-card title overrides (descriptions retained):
  - `What has been reviewed` → `Records within examination scope`
  - `What has not been reviewed` → `Records outside examination scope`
  - `What a verified listing means` → `Effect of a Verified determination`
  - `What it does not mean` → `Limits of the determination`

### §3 — Statuses

- Eyebrow: `Statuses` → `Public determinations`
- Heading: `Public statuses` → `Registry determinations.`
- Lead: `Each registry entry carries one of the following determinations. The determination reflects the state of the audit file at the time of last update.`
- Row label override (rendering only): `Tells the public:` → `Public-record meaning:`
- Status row labels themselves (`Verified`, `Unverified`, etc.) are unchanged — they map to status-definitions canon.

### §4 — Scope ("What we review")

- Eyebrow: `Scope` → `Examination domains`
- Heading: `What we review` → `Examination domains under audit.`
- Lead: `Each domain is examined against the evidentiary standard for the requested verification category. Findings are logged to the audit file.`
- Card title overrides (descriptions retained):
  - `Business identity` → `Entity identification & registration`
  - `Licenses and registrations` → `Regulatory credentials`
  - `Pharmacy and supplier records` → `Upstream supply-chain records`
  - `Certificates and category records` → `Analytical certificates & lot records`
  - `Sourcing and invoice history` → `Procurement & invoice ledger`
  - `Public claims consistency` → `Public-claims reconciliation`
  - `Renewal-related updates` → `Renewal-cycle delta review`

### §5 — Process → "Review lifecycle" (forensic-audit step renames)

- Eyebrow: `Process` → `Audit lifecycle`
- Heading: `Review lifecycle` → `Audit lifecycle.`
- Lead: `Every verification proceeds through six controlled stages. A file may be paused at any stage when records are incomplete or require clarification.`
- Step row labels:
  - `Reviewed at this stage:` → `Examined:`
  - `Possible result:` → `Disposition:`
- Step `t` overrides (rendering only — `summary / reviewed / result` text retained):
  - 01 `Application` → `Intake & Scope Declaration`
  - 02 `Document intake` → `Evidentiary Collection`
  - 03 `Standards review` → `Regulatory Cross-Referencing`
  - 04 `Public claims check` → `Claims-Documentation Reconciliation`
  - 05 `Status determination` → `Determination & Scope Recordation`
  - 06 `Publication and monitoring` → `Publication & Continuous Surveillance`

### §6 — Maintenance ("Renewal and monitoring")

- Eyebrow: `Maintenance` → `Continuous surveillance`
- Heading: `Renewal and monitoring` → `Continuous Surveillance & Renewal Obligations.`
- Lead (replace): `Verified files are re-examined at a defined renewal interval and upon any reported material change. Vendors are bound to disclose the following Mandatory Disclosure Events without delay.`
- Above the `<ul>`, add a small mono label: `Mandatory Disclosure Events` (mono uppercase 10.5px, `text-foreground`, `mb-3`).
- List items in `changes[]` retained verbatim.
- Closing paragraph (replace): `A disclosed event may result in a continued determination, a Suspended status pending re-examination, or a re-review limited to the affected scope.`

### §7 — After Review / §8 — For Vendors / §9 — Boundaries

Tone-only header tightening; bodies preserved:
- §7 eyebrow `After Review` → `Post-determination`; heading `What happens after verification` → `Post-determination record handling.`
- §8 eyebrow `For Vendors` → `Applicant rationale`; heading `Why vendors apply` → `Why entities submit to audit.` (Card titles in `vendorReasons` retained.)
- §9 (boundaries / `notProcess`) — keep current eyebrow/heading; no copy change. Items already SOP-toned.

### Implementation notes

- All title/label overrides applied at render time inside the component via small slug-keyed maps (`PRINCIPLE_TITLES`, `MEANING_TITLES`, `SCOPE_TITLES`, `STEP_TITLES`). Underlying arrays at the top of the file are not edited.
- Document header strip is a new sibling element rendered immediately after `<RecordHeader … />` and before the first `<section>`.
- No new dependencies, no new files, no token changes.

### Files touched

- `src/pages/HowItWorks.tsx` — header copy, new document-header strip, section-eyebrow/heading rewrites, render-time title/label overrides for principles, meaning blocks, scope cards, and lifecycle steps, copy update for renewal lead + closing paragraph, mandatory-disclosure label.

### What stays the same

All routes, the `RecordHeader` / `MetadataBar` components, the data arrays in this file (descriptions and bodies preserved verbatim), `/status-definitions` link, `/apply` link, design tokens, container widths, and section ordering.

