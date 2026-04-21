

## Report a Concern — Investigative Bureau tone overhaul

A copy + light visual pass on `src/pages/ReportConcern.tsx`. No data file edits, no routing changes, no structural reordering. Tone shifts to formal compliance-reporting register; the email submission block restyles into a "secure submission point" panel.

### Header (`RecordHeader`)

- Eyebrow: `Process` → `Compliance reporting`
- Title: `Report a concern.` → `Reporting & Market Intelligence.`
- Lead: → `Intake channel for Registry discrepancies, supply-chain alignment concerns, and unauthorized attribution of Source Standard standings. Submissions are screened, triaged, and reconciled against the audit file.`
- Metadata items unchanged (`SS-REPORT-2026.01 / Active / 04/21/26 / FL/US`).

### §1 — In scope → "Investigative Scope"

- Title: `In scope` → `Investigative Scope.`
- Description: `Reports falling within the surveillance mandate of the Source Standard framework. The following categories are accepted for review against the audit file.`
- Item rewrites (`inScope`):
  1. `Sourcing concerns — claimed upstream supplier does not match documented chain-of-custody records on file.`
  2. `Marketing-Documentation Divergence — vendor's public-facing website, advertising, or claims contradict reviewed records within the declared examination scope.`
  3. `Upstream-supplier compromise — a disclosed manufacturing anchor has been delisted, suspended, or has lapsed FDA registration or state licensure.`
  4. `Listing accuracy — incorrect category, scope, jurisdiction, or contact information of record.`
  5. `Unauthorized Attribution — entity displaying, implying, or otherwise asserting a Source Standard standing it does not hold.`

### §2 — Out of scope → "Jurisdictional Boundaries"

- Title: `Out of scope` → `Jurisdictional Boundaries.`
- Description: `Source Standard is an Auditing Body, not a regulator, clinical authority, or court of competent jurisdiction. The following matters fall outside the surveillance mandate and must be directed to the appropriate authority.`
- Item rewrites (`outOfScope`):
  1. `Clinical or medical complaints — refer to FDA MedWatch or the appropriate state medical board.`
  2. `Pharmacy compounding complaints — refer to the relevant state board of pharmacy or FDA.`
  3. `Billing, refund, or payment disputes — pursue directly with the vendor or the originating payment processor.`
  4. `Personal disputes, employment matters, or non-public commercial disputes between private parties.`

### §3 — Lifecycle → forensic stage renames

- Title: `How submissions are reviewed` → `Submission lifecycle.`
- Above the lifecycle list, add a small mono label: `Controlled intake · Four-stage flow` (mono uppercase 10.5px, `text-foreground`, `mb-3`).
- `lifecycle` rewrites (titles + descriptions):
  1. `Administrative Acknowledgment` — `Submission is logged into the intake register and acknowledged. A reference identifier may be issued for follow-up correspondence.`
  2. `Credibility Screening` — `Submission is screened against scope, completeness, and credibility thresholds. Out-of-jurisdiction reports are referred to the appropriate authority.`
  3. `Evidentiary Reconciliation` — `In-scope submissions are reconciled against records on file. The relevant listing may be transitioned to Under Review pending the outcome.`
  4. `Disposition` — `Possible dispositions include no change, clarification request, scope reduction, Suspended standing, Removal (De-listing), or attachment of a public note. The reporter is not entitled to internal review details but may receive a status acknowledgment.`

### §4 — Confidentiality → "Confidentiality & Integrity Standards"

- Title: `Confidentiality and good faith` → `Confidentiality & Integrity Standards.`
- Description: `Reporter Anonymity is a controlling principle of the intake process. Reporter identity is treated as confidential within the review file and is never published. Submissions made in good faith — even those that do not result in a status change — are valued and contribute to the integrity of the registry. Knowingly false, harassing, or vexatious submissions are disregarded and may themselves be referred to the appropriate authority.`

### §5 — Submitting a report → "Secure submission point"

- Title: `Submitting a report` → `Submission channel.`
- Description: `A structured intake portal is forthcoming. In the interim, submissions are accepted at the secure address below. All correspondence is logged to the intake register.`
- Restyle the email card into a "secure submission point" panel:
  - Container: keep the existing `border border-border/70 rounded-[2px] bg-background p-5 max-w-2xl` but add a thin top accent (`border-t-2 border-t-foreground`) and a small mono header row at the top: `SECURE SUBMISSION POINT · SS-REPORT-INTAKE` (mono uppercase 10.5px, `text-muted-foreground`, with `SS-REPORT-INTAKE` rendered `text-foreground`).
  - Below that header row, render the existing `Email` label and `concerns@sourcestandard.org` mailto link unchanged in markup but with the link bumped to `text-[16px]` so it reads as the primary action.
  - Replace the helper paragraph: `Submissions should include: the listing or entity name, the nature of the discrepancy, supporting links or documents, and a means of follow-up correspondence should clarification be required. Mark sensitive material accordingly.`

### §6 — Read deeper / Cite

- Title: `Read deeper` → `Cross-references.`
- Link label tightening:
  - `Accountability & Enforcement →` → `Accountability & Enforcement — triggering events →`
  - `Status Definitions →` → `Glossary of Regulatory Standings →`
  - `Verification →` → `Verification Protocol & Audit Methodology →`
- Citation line: → `Cite as: Source Standard, Reporting & Market Intelligence, SS-REPORT-2026.01.`

### Implementation notes

- All copy rewrites applied directly to the four data arrays at the top of the file (`inScope`, `outOfScope`, `lifecycle`) and inline within the JSX. No new files, no new dependencies, no token changes.
- The "secure submission point" panel is a small markup tweak inside the existing §5 card — header row added above the existing label/link, helper text replaced.
- All section numbering (§1–§6), `RecordHeader`, `Section`, `SectionLabel`, and `Link` components remain in place.

### Files touched

- `src/pages/ReportConcern.tsx` — header copy, §1–§6 title/description rewrites, `inScope` / `outOfScope` / `lifecycle` array content rewrites, lifecycle mono label, secure-submission-point panel restyle, cross-reference label tightening, citation update.

### What stays the same

All routes, the `RecordHeader` / `Section` / `SectionLabel` components, the section ordering and numbering, the `concerns@sourcestandard.org` mailto target, design tokens, and container widths.

