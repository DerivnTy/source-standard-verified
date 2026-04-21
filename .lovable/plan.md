

## Accountability page — Compliance & Sanctions overhaul

A copy + light visual pass on `src/pages/Accountability.tsx`. No data file edits, no routing changes, no structural reordering. Tone shifts to a firm, clinical compliance-and-sanctions register that aligns with the Governance, Status Definitions, and Report-a-Concern overhauls.

### Header (`RecordHeader`)

- Eyebrow: `Process` → `Compliance & sanctions`
- Title: `Accountability and enforcement.` → `Compliance Monitoring & Enforcement Protocols.`
- Lead: → `Attestations accepted by Verified entities, Mandatory Disclosure Events, audit re-opening triggers, and the graduated enforcement actions available to the framework when compliance obligations are not met.`
- Metadata items unchanged (`SS-ENFORCE-2026.01 / Active / 04/21/26 / FL/US`).

### §1 — Vendor commitments → "Attestations of Continuous Compliance"

- Section label title: `Vendor commitments at verification` → `Attestations of Continuous Compliance.`
- Description: `Upon assignment of a Verified standing, the entity formally accepts the following standing attestations. These attestations form the controlling basis on which the public listing is issued, maintained, and renewed.`
- `commitments` array rewrites (titles + descriptions):
  1. `Integrity of Submission` — `All records, claims, and category descriptions submitted at intake are accurate as of the date of submission and remain accurate throughout the verification term. Material inaccuracies discovered post-issuance are treated as a Mandatory Disclosure Event under §2.`
  2. `Supply-Chain Transparency` — `All upstream pharmacies, outsourcing facilities, and qualified suppliers used to fulfill listed product categories are disclosed in full and supported by documentation retained in the audit file.`
  3. `Renewal & Examination Cooperation` — `The entity will respond to renewal requests, clarification requests, and re-examination notices within published timelines and will produce updated records when requested.`
  4. `Public-Claims Alignment` — `Public-facing representations (website, advertising, intake materials, third-party listings) remain consistent with the records reviewed during verification for the duration of the verification term.`

### §2 — Reportable changes → "Mandatory Disclosure Events (MDE)"

- Section label title: `Reportable changes` → `Mandatory Disclosure Events (MDE).`
- Description: `The following events are designated Mandatory Disclosure Events and must be reported to the framework within seventy-two (72) hours of occurrence. Failure to report within the disclosure window does not invalidate the underlying event and is itself an audit re-opening trigger under §3.`
- Above the numbered list, add a small mono advisory bar:
  - Container: `border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3 max-w-3xl mb-5`
  - Mono uppercase 10.5px label (`text-muted-foreground`): `DISCLOSURE WINDOW · 72 HOURS · SS-ENFORCE-2026.01 · §2` (the `72 HOURS` and code rendered `text-foreground`).
- `reportable` array rewrites (kept as a 6-item numbered list, existing `01–06` markup preserved):
  1. `Change in supplier or upstream source for any reviewed product category, including substitution, addition, or termination of a disclosed manufacturing anchor.`
  2. `Change in licensure status of the entity or any disclosed upstream source, including suspension, lapse, voluntary surrender, or jurisdictional change.`
  3. `Change in business ownership, controlling interest, operating entity, or registered agent of record.`
  4. `Addition or removal of a reviewed product category, or material change to the scope of an existing category.`
  5. `Material change to public-facing claims regarding sourcing, credentials, accreditation, or examination scope.`
  6. `Notice of regulatory action by the FDA, a State Board of Pharmacy, a State Medical Board, or any comparable authority of competent jurisdiction.`

### §3 — Review triggers → "Audit Re-opening Triggers"

- Section label title: `Review triggers` → `Audit Re-opening Triggers.`
- Description: `Any of the following constitutes an audit re-opening trigger and may open a re-examination of an existing Verified listing, regardless of the listing's position in the renewal cycle. Consumer and clinician reports submitted through the public reporting channel are a primary source of data for this surveillance function.`
- `triggers` array rewrites:
  1. `Consumer Reports — submissions from consumers, clinicians, or third parties received through the public reporting channel and screened as in-scope under the Reporting & Market Intelligence protocol.`
  2. `Delisting, suspension, voluntary surrender, or removal of a disclosed upstream source or manufacturing anchor.`
  3. `Public regulatory action against the entity or any disclosed supplier by an authority of competent jurisdiction.`
  4. `Divergence between public-facing claims and the records on file under the audit register.`
  5. `Failure to respond to a renewal notice, clarification request, or Mandatory Disclosure Event acknowledgment within the published response window.`
  6. `Lapse of any required licensure, registration, or accreditation held by the entity or a disclosed upstream source.`

(Note: a sixth item is added to round out the trigger list — kept stylistically uniform with the existing five.)

### §4 — Enforcement actions → "Graduated Administrative Actions"

- Section label title: `Enforcement actions` → `Graduated Administrative Actions.`
- Description: `When a re-examination identifies non-compliance, the framework applies a graduated set of administrative actions scaled to the nature, severity, and recurrence of the underlying conduct. Actions are recorded in the audit file and, where applicable, reflected in the public listing.`
- Restyle each action row as a "sanction card" within the existing `divide-y` container: keep the 12-col grid, but render the title as a bold uppercase mono code + name pair so each sanction reads like a numbered clause.
  - Title cell (md:col-span-3): mono uppercase 10.5px code `ACTION · NN` (`text-muted-foreground`) on top, name in `h-card` style below — name strings updated as listed.
- `actions` array rewrites (titles + descriptions, in current order):
  1. `Administrative Inquiry` — `A formal written request for documentation, records, or explanation, issued to the entity of record. The listing remains in its current standing during the response window. Failure to respond within the published window is itself an audit re-opening trigger under §3.`
  2. `Scope Reduction` — `The verified examination scope is narrowed to only those categories that remain supported by current records. Categories no longer supported are withdrawn from the public listing and recorded in the audit file.`
  3. `Status Revocation (Suspension)` — `The Verified standing is administratively withdrawn pending evidentiary clarification. The listing publicly displays Suspended for the duration of the hold. The entity remains in the registry but does not carry an affirmative standing.`
  4. `Registry Expulsion (Removal)` — `The listing is withdrawn from the registry under a Removed standing. Reinstatement requires a new application and a fresh examination cycle under §5. Prior audit history is retained in the registry of record.`
  5. `Public Note` — `A short, factual notation attached to the public listing where public clarification is administratively warranted. Public notes are limited to verifiable, non-speculative statements and are recorded in the audit file with rationale.`

### §5 — Reinstatement → "Re-entry Protocol"

- Section label title: `Reinstatement` → `Re-entry Protocol.`
- Description (replace): `An entity under Status Revocation (Suspension) may return to Verified once the underlying matter is resolved and documented in the audit file. An entity under Registry Expulsion (Removal) may apply for re-entry only by submitting a new application and undergoing a fresh examination cycle in full. Prior audit history — including the original determination, the triggering events, and the disposition — is retained on the permanent record of the entity and is referenced in any subsequent examination. Re-entry is not granted on the basis of time elapsed alone.`
- Add a small mono advisory bar above this paragraph (matches §2 styling):
  - `border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3 max-w-3xl mb-5`
  - Mono label: `PERMANENT RECORD · PRIOR HISTORY RETAINED · SS-ENFORCE-2026.01 · §5` (`PERMANENT RECORD` and code rendered `text-foreground`).

### §6 — Read deeper → "Cross-references" + official citation footer

- Section label title: `Read deeper` → `Cross-references.`
- Link label tightening:
  - `Verification — what is reviewed and how →` → `Verification Protocol & Audit Methodology →`
  - `Status Definitions — what each status means →` → `Glossary of Regulatory Standings →`
  - `Report a Concern — how to submit a triggering report →` → `Reporting & Market Intelligence — submitting a triggering event →`
- Replace the single-line `Cite as:` paragraph with an official-citation block (matches Governance footer):
  - Container: `border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl mt-8`
  - Top mono label (10.5px uppercase, `text-muted-foreground`): `OFFICIAL CITATION · SS-ENFORCE-2026.01`
  - Body (12.5px, `text-foreground`, leading-relaxed): `Source Standard. Compliance Monitoring & Enforcement Protocols. Document SS-ENFORCE-2026.01. Issued 04 / 21 / 2026. On file with the issuing organization.`
  - Sub-line (11px mono uppercase, `text-muted-foreground`): `Controlled copy · Subject to versioned revision under §1`

### Implementation notes

- All copy rewrites applied directly to the four data arrays at the top of the file (`commitments`, `reportable`, `triggers`, `actions`) and inline within the JSX. No new files, no new dependencies, no token changes.
- §2 and §5 mono advisory bars and §4 per-action mono code header are small markup additions inside existing section containers.
- All section numbering (§1–§6), the `RecordHeader` / `Section` / `SectionLabel` components, and all current containers, dividers, and grid structures remain in place.

### Files touched

- `src/pages/Accountability.tsx` — header rewrites, §1–§6 title/description rewrites, `commitments` / `reportable` / `triggers` / `actions` array content rewrites (incl. one added trigger item), §2 + §5 advisory bars, §4 per-sanction mono code header, §6 cross-reference label tightening and official-citation footer block.

### What stays the same

All routes, the `RecordHeader` / `Section` / `SectionLabel` components, the section ordering and numbering, design tokens, container widths, and the existing color/swatch system.

