

## Status Definitions — Glossary of Regulatory Standings overhaul

A copy + light visual pass on `src/pages/StatusDefinitions.tsx`. No data file edits, no routing changes. Tone shifts to "Administrative Code" / regulatory glossary; the status list restyles into a denser tabular reference layout.

### Header (`RecordHeader`)

- Eyebrow: `Reference` → `Administrative code`
- Title: `Status definitions.` → `Glossary of Regulatory Standings.`
- Lead: → `Controlled glossary of public standings assigned to entities under the Source Standard framework. Each standing reflects the disposition of the audit file at the time of last update and is governed by continuous surveillance.`
- Metadata: keep `SS-STATUS-2026.01`, `Active`, `04/21/26`, `FL/US`. Add summary cell rename: `Set by` → `Issued by`, `Cycle` → `Surveillance cycle`.

### §1 — Why public statuses exist → "Purpose of the controlled glossary"

- Eyebrow stays `§1`; title → `Purpose of the controlled glossary.`
- Description (replace): `A regulatory standing is a short, controlled label affixed to every entity in the registry. It enables consumers, clinicians, and licensed entities to read the registry consistently without interpreting individual audit files. Standings are issued against reviewed evidence — never against marketing language or self-declaration.`

### §2 — Status definitions (tabular reference restyle + copy overhaul)

Eyebrow: `§2` title → `Glossary of standings.`

Add a thin header row above the entries (matches the registry ledger panels):
- Left mono uppercase 10.5px: `Code · SS-STATUS-2026.01 · §2`
- Right mono uppercase 10.5px: `07 controlled standings · Continuously surveilled`

Restyle each status entry as a reference-manual row inside the existing `divide-y` container:
- Left column (md:col-span-3): swatch + label as today, plus a mono code line beneath: `STANDING · 01`–`07` (`text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground mt-2`).
- Right column (md:col-span-9): keep the 5-row `<dl>` but tighten label tokens to look like field rows in a technical manual:
  - Render each `dt` as `meta-label` with a fixed-width treatment (`md:w-44 shrink-0`) and the `dd` beside it (`md:flex md:gap-6` per row) so all labels align vertically across rows like a spec sheet.
  - Row `dt` text overrides: `Meaning` → `Definition`, `Tells the public` → `Public-record signal`, `Does not imply` → `Limits / does not imply`, `When assigned` → `Conditions of issuance`, `When it changes` → `Conditions of revision`.

Per-status text overrides (data file untouched — overrides applied via two slug-keyed maps inside the component, then merged with the existing `statuses` array at render):

**Verified**
- Definition: `Positive determination of record consistency. The entity has completed a documented examination against the Source Standard evidentiary rubric, and the listing reflects records reviewed at the time of publication.`
- Public-record signal: `Records, regulatory credentials, and supply-chain documentation have been Reconciled with public claims within the declared examination scope.`
- Limits / does not imply: `Does not constitute endorsement of clinical outcomes, individual prescriptions, or product safety guarantees.`
- Conditions of issuance: `Issued upon successful completion of intake, evidentiary review, supply-chain reconciliation, and category-scope confirmation.`
- Conditions of revision: `Revised upon lapse of renewal, occurrence of a Mandatory Disclosure Event (MDE), or initiation of a triggered re-examination.`

**Pending Review**
- Definition: `Application received; audit file opened but examination has not yet commenced.`
- Public-record signal: `The entity has formally entered the verification pipeline.`
- Limits / does not imply: `Does not imply that any portion of the evidentiary review has been conducted.`
- Conditions of issuance: `Issued at intake when the application package is received and acknowledged.`
- Conditions of revision: `Revised when examination commences (Under Review) or upon withdrawal of the application.`

**Under Review**
- Definition: `Active examination in progress. Records, regulatory credentials, and supply-chain documentation are being examined against the rubric.`
- Public-record signal: `The audit file is currently open and undergoing examination.`
- Limits / does not imply: `Does not imply any conclusion regarding the entity's records, sourcing, or compliance posture.`
- Conditions of issuance: `Issued at the commencement of evidentiary review, or upon re-opening of a Verified file following a triggering event.`
- Conditions of revision: `Revised to Verified, Suspended, or Removed upon conclusion of the examination.`

**Suspended**
- Definition: `Administrative hold pending evidentiary clarification. A previously Verified standing is temporarily withdrawn.`
- Public-record signal: `An open question, undisclosed Mandatory Disclosure Event (MDE), or unresolved discrepancy prevents the Verified standing from being maintained.`
- Limits / does not imply: `Does not constitute a finding of misconduct, fraud, or regulatory enforcement action by any governmental body.`
- Conditions of issuance: `Issued upon failure to renew on schedule, failure to respond to a clarification request, or surfacing of material discrepancies.`
- Conditions of revision: `Revised back to Verified upon resolution; revised to Removed (De-listed) if the matter remains unresolved.`

**Removed**
- Label override: `Removed (De-listed)`
- Definition: `De-listing. The entity has been withdrawn from the public registry and the audit file is no longer maintained.`
- Public-record signal: `The entity is no longer represented in the registry under the Source Standard framework.`
- Limits / does not imply: `Does not constitute a specific finding of misconduct unless explicitly stated in an attached public note.`
- Conditions of issuance: `Issued where the entity has Defaulted on compliance obligations through sustained non-response, voluntary withdrawal, sustained material misrepresentation, or upstream-supplier delisting that cannot be remediated.`
- Conditions of revision: `Reinstatement requires submission of a new application and a fresh examination cycle.`

**Greenlisted**
- Label override: `Greenlisted (Qualified Upstream Designation)`
- Definition: `Qualified Upstream Designation. An upstream source — 503A pharmacy, 503B outsourcing facility, or qualified supplier — recognized as a documented, FDA-registered or state-licensed manufacturing anchor from which Verified vendors may legitimately source.`
- Public-record signal: `The upstream source is documented, traceable, and operates within recognized regulatory categories as a manufacturing anchor of the supply chain.`
- Limits / does not imply: `Does not imply contract, endorsement, or affiliation with Source Standard, and does not certify every product manufactured by the source.`
- Conditions of issuance: `Issued upon confirmation of registration, licensing category, and operating record.`
- Conditions of revision: `Revised upon lapse of registration, withdrawal of licensing, or removal of the source by the relevant regulator.`

**Not Listed**
- Label override: `Not Listed (Null Standing)`
- Definition: `Null Standing. The entity is outside the surveillance scope of the Source Standard framework. It has not applied, has not been examined, or has been previously De-listed.`
- Public-record signal: `No public record exists under the Source Standard framework for this entity.`
- Limits / does not imply: `Does not imply that the entity is illegitimate, unsafe, or non-compliant under any external regulatory regime. It indicates only the absence of a Source Standard record.`
- Conditions of issuance: `Default standing for any entity that has not entered the registry.`
- Conditions of revision: `Revised only upon entry into the verification or Greenlist examination process.`

### §3 — Status lifecycle → "Temporal Nature of Determinations"

- Eyebrow `§3`; title → `Temporal Nature of Determinations.`
- Description (replace): `No standing is permanent. Every audit file moves through the same controlled flow under continuous surveillance, and every Verified determination is bounded by a renewal interval.`
- Above the `<ol>`, add a small mono label `Continuous surveillance · Standard flow` (mono uppercase 10.5px, `text-foreground`, `mb-3`).
- Lifecycle list items rewritten in administrative register:
  1. `Application received → Pending Review`
  2. `Examination commences → Under Review`
  3. `Examination concludes → Verified or Removed (De-listed)`
  4. `Renewal interval reached → Under Review (renewal cycle)`
  5. `Triggering event (public report, supply-chain change, claims divergence, MDE) → Under Review or Suspended`
  6. `Resolution → Verified, Suspended, or Removed (De-listed)`

### §4 — Read deeper / Cite

- Eyebrow stays `§4`; title `Read deeper` → `Cross-references.`
- Link labels tightened:
  - `Verification — how reviews are conducted` → `Verification Protocol & Audit Methodology →`
  - `Accountability & Enforcement — what triggers status changes` → `Accountability & Enforcement — triggering events →`
  - `Verification Disclaimer — scope and boundaries` → `Verification Disclaimer — scope of attestation →`
- Citation line: → `Cite as: Source Standard, Glossary of Regulatory Standings, SS-STATUS-2026.01.`

### Implementation notes

- All text changes applied at render time via two small maps inside the component:
  - `STATUS_LABEL_OVERRIDES: Record<string, string>` for the three labels that gain parenthetical codes.
  - `STATUS_COPY_OVERRIDES: Record<string, { meaning; tells; notImply; assigned; changes }>` for the per-row copy.
- Field-row labels live in a constant `FIELD_LABELS` object so the `<dl>` can render the new label set without touching individual entries.
- A `STANDING · NN` index is computed from the array order at render.
- No new dependencies, no new files, no token changes.

### Files touched

- `src/pages/StatusDefinitions.tsx` — header copy, `§1`/`§2`/`§3`/`§4` heading + lead rewrites, new ledger header strip above the glossary, restyled tabular rows with aligned field labels and `STANDING · NN` codes, slug-keyed label and copy overrides for all 7 standings, lifecycle list rewrite + continuous-surveillance label, cross-reference label tightening, citation update.

### What stays the same

All routes, the `RecordHeader` / `Section` / `SectionLabel` components, the swatch color tokens (`text-verified`, `text-pending`, `text-destructive`, `text-muted-foreground`), the 7-status order, the `divide-y` container structure, and all design tokens and container widths.

