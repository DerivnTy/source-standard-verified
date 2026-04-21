

## Disclaimer → Verification Disclaimer & Attestation Scope

A copy and light-structure refinement of `src/pages/VerificationDisclaimer.tsx`. Keeps the `RecordHeader` + `Section`/`SectionLabel` chrome, the `SS-DISCLAIMER-2026.01` anchor, and all existing layout primitives. Tone aligned with the Privacy / Terms / Governance overhauls.

### Header (`RecordHeader`)

- Eyebrow: `Disclaimer` → `Disclaimer · Formal regulatory attestation`
- Title: `Verification disclaimer.` → `Verification Disclaimer & Attestation Scope.`
- Lead: → `The formal attestation document of the auditing body. Defines the scope, boundaries, time-bound nature, and liability framing of every Source Standard verification determination. Issued under document SS-DISCLAIMER-2026.01.`
- Metadata row kept (`SS-DISCLAIMER-2026.01`, `Active`, `04/21/26`, `FL/US`).

### Per-section document identifier (version-controlled header)

Mirroring the Privacy and Terms pages, add a small mono identifier line above each `SectionLabel`:

`Doc SS-DISCLAIMER-2026.01 · §N · v2026.01`

Implemented as `<p className="meta-mono text-muted-foreground mb-3">` placed inside each `<Section>` immediately before its `<SectionLabel>`. Small local `DocId` helper, mirroring the Privacy/Terms pattern.

### Numbered administrative clause format

Each list item rendered as a numbered clause (`1.01`, `1.02`, …) using the existing `meta-mono` token in the left gutter, replacing the current `·` bullet. No new components or tokens — just swap the `<span>` content and widen the gutter slightly within existing `w-` classes. This reinforces the "administrative clause" feel.

### §1 · Boundaries of Administrative Attestation (renamed, expanded)

Section title: `What verification covers` → `Boundaries of Administrative Attestation`

Description (new): `A Source Standard verification is an Attestation of Record Consistency. It is an administrative finding that an entity's documented records — as submitted, as cross-checked against third-party regulatory and supplier data, and as reviewed at a fixed point in time — are internally consistent and consistent with the public claims associated with the entity. The registry operates as an auditing mirror of third-party records and does not produce, replace, or supersede those records.`

Numbered clauses (rewritten, kept at 5):
- `1.01` — Documented business identity, registration, and operating records of the entity.
- `1.02` — Licensing, registration, and standing with applicable regulatory authorities, as evidenced by third-party records.
- `1.03` — Disclosed upstream sources, including pharmacy, supplier, and laboratory documentation submitted under the Vendor Submission Standard.
- `1.04` — Sourcing and invoice records supporting the product categories within the reviewed scope.
- `1.05` — Consistency between the entity's public claims and the records on file with the auditing body.

### §2 · Items outside the attestation (kept, renumbered, tightened)

Section title: `What verification does not cover` → `Items outside the attestation`

Description (new): `The following matters are explicitly outside the scope of any Source Standard attestation and shall not be inferred from a Verified determination.`

Numbered clauses (kept at 5):
- `2.01` — Clinical outcomes for any individual patient.
- `2.02` — Suitability of any product, formulation, or protocol for a specific person.
- `2.03` — Product safety, efficacy, sterility, or potency. The auditing body does not test, assay, or otherwise analyse any product.
- `2.04` — Future conduct of the entity beyond the records reviewed at the time of the determination.
- `2.05` — Activities, product lines, or jurisdictions outside the reviewed scope or category.

### §3 · Institutional Limitations (renamed, expanded)

Section title: `Role boundaries` → `Institutional Limitations`

Description (new): `Source Standard occupies a defined position within the broader medical, pharmaceutical, and regulatory ecosystem. The following limitations are material to the interpretation of any registry entry.`

Two-column rows kept; left column rewritten as bolded lead clauses, right column tightened. Five rows (one added):

- **Not a Statutory Body.** `Source Standard is not a regulator, accreditor, or statutory body. It holds no enforcement authority. Statutory authority rests with the FDA, state boards of pharmacy, state medical boards, attorneys general, and other competent regulatory bodies, whose determinations supersede any registry entry.`
- **Not a clinic.** `Source Standard does not provide clinical care, diagnose, prescribe, dispense, or otherwise practise medicine, pharmacy, or any other licensed health profession.`
- **Not a manufacturer or pharmacy.** `Source Standard does not manufacture, compound, repackage, distribute, or sell any product. It references upstream sources operated by independently licensed third parties.`
- **Not a laboratory.** `Source Standard does not test products and does not issue certificates of analysis. It reviews certificates produced by independent laboratories as part of the documentary record.`
- **Not a guarantor.** `A Verified determination is an administrative finding at a fixed point in time. It is not a warranty, guarantee, indemnity, or insurance of any future state of affairs concerning the entity, its operations, or any product or service it provides.`

### §4 · Time-bound nature (kept, expanded)

Description rewritten:
`Every Source Standard determination is a Snapshot of Record Consistency. It reflects the records reviewed and the regulatory checks performed within a defined review window and remains valid only until the next scheduled renewal or until a Mandatory Disclosure Event triggers earlier reopening under SS-ENFORCE-2026.01. A current Verified status today does not warrant the same status at any future date and is not a representation regarding the entity's future conduct.`

### §5 · Limitation of Liability & User Discretion (renamed, expanded, prominent)

Section title: `Liability framing` → `Limitation of Liability & User Discretion`

Two prominent paragraphs, each preceded by a bolded lead clause:

- **No warranty; reliance at user discretion.** `The registry is provided as a public reference. The auditing body makes no warranty, express or implied, regarding any vendor, upstream source, product, or determination. Reliance on registry content is at the user's sole discretion. Users should consult a licensed clinician for clinical matters and the applicable regulatory authority for matters within statutory jurisdiction.`
- **Acknowledgment and exemption from liability.** `Access to or use of the registry constitutes the user's acknowledgment that Source Standard is exempt from liability for any direct, indirect, incidental, consequential, special, or exemplary damages arising from any decision made, action taken, or action not taken on the basis of a registry entry, including any decision to engage or not to engage with a listed entity. This acknowledgment is a material condition of access under the User Agreement & Registry Terms (SS-TERMS-2026.01).`

### §6 · Read deeper (renumbered, re-pointed)

Replace the existing three links with the high-authority set:
- `Verification — process and review →` `/how-it-works`
- `Status Definitions →` `/status-definitions`
- `Accountability & Enforcement →` `/accountability`
- `User Agreement & Registry Terms →` `/terms`
- `Governance →` `/governance`

Citation footer rewritten:
`Cite as: Source Standard Verification Disclaimer & Attestation Scope, SS-DISCLAIMER-2026.01.`

### Visual style

- All existing tokens kept: `meta-mono`, `meta-label`, alternating `muted` `Section` backgrounds, `divide-y divide-border/70 border-y border-border/70 bg-background`, `h-card`, `space-y-3 max-w-3xl` lists.
- Section densities preserved (`doc` / `tight`).
- Bolded lead clauses use existing `font-semibold text-foreground` — no new tokens.
- New per-section identifier and numbered `1.01`-style clause keys both use existing `meta-mono` token — no new CSS, no new components, no color changes, no layout primitives added.

### Files touched

- `src/pages/VerificationDisclaimer.tsx` only — `RecordHeader` props, the `covers` / `doesNotCover` arrays (rewritten as numbered clauses), the `boundaries` array (expanded to 5 with bolded leads), the merged §5 liability block, and the §6 "Read deeper" link list. Add the small per-section `Doc SS-DISCLAIMER-2026.01 · §N · v2026.01` identifier above each `SectionLabel` (small local `DocId` helper).

### What stays the same

All routes, the `RecordHeader` / `Section` / `SectionLabel` components, container widths, the document anchor `SS-DISCLAIMER-2026.01`, and all design tokens.

