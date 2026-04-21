

## Apply → Preliminary Administrative Intake

A copy + light visual pass on `src/pages/Apply.tsx`. No routing, no new components, no token changes. Tone aligned with the Governance / Accountability / How-It-Works / Vendor Submission Standard overhauls. Document anchor: `SS-INTAKE-01`, governed by `SS-VENDOR-STD-2026.01` and `SS-FRAMEWORK-2026.01`.

### Header (`UtilityHeader`)

- Eyebrow: `Apply` → `Form SS-INTAKE-01 · Preliminary intake`
- Title: `Begin a Source Standard application` → `Preliminary Administrative Intake.`
- Description: → `Submission of Form SS-INTAKE-01 opens an administrative file with the Source Standard registry. A Verification Officer of record will acknowledge receipt within five business days. Intake does not constitute forensic review and does not establish any standing.`

### Sidebar — "Pre-Audit Evidentiary Requirements"

- Aside header label: `Before You Begin` → `Pre-audit evidentiary requirements`
- `checklist` array rewritten (5 items, `§01–§05` markup preserved):
  1. Active jurisdictional registrations of the operating entity
  2. Upstream supply-chain records (procurement nodes & supplier disclosures)
  3. Analytical lot documentation (ISO/IEC 17025-accredited certificates of analysis)
  4. Prescriber credentials of record (clinical operating models)
  5. Compounding pharmacy service agreements (503A / 503B partnerships)
- Footer note (replace existing): `Document upload protocols are initiated via secure transmission link issued by the Verification Officer of record upon acknowledgment of this filing.`

### Form panel — header strip

- Header label: `Form SS-INTAKE-01 · Required Fields` → keep, but split into a two-line mono strip:
  - Line 1 (mono uppercase 10.5px, foreground): `FORM SS-INTAKE-01 · PRELIMINARY ADMINISTRATIVE INTAKE`
  - Line 2 (mono uppercase 10px, muted): `Governed by SS-VENDOR-STD-2026.01 · Examined under SS-FRAMEWORK-2026.01 · Required fields`

### Form fields — relabeling

Current labels → new labels (no layout change, all `meta-label` styling kept):

- `Vendor / Clinic Name` → `Entity of record`
- `Primary Contact` → `Authorized representative`
- `Email` → `Email of record`
- `Phone` → `Telephone of record`
- `Vendor Category` → `Audit category requested` (placeholder: `e.g. TRT clinic, 503A compounding pharmacy, 503B outsourcing facility`)
- `State of Operation` → `Jurisdiction of operation`
- `Operating Summary` → `Operational scope statement` (placeholder: `Provide a concise statement of operating model, jurisdictional registrations held, and the categories of evidentiary documentation available for examination.`)

### Form panel — footer / submit

Replace the current footer strip with an Administrative Notice block + filing action.

- Container retained (`border-t border-border bg-surface-muted`) but layout switched to a stacked, full-width notice with the action button on its own row right-aligned on `sm:`+.
- Mono notice label (10.5px uppercase, muted): `ADMINISTRATIVE NOTICE · SS-INTAKE-01`
- Notice body (12.5px, foreground, leading-relaxed): `Submissions are entered into the controlled audit file in the order received. Any subsequent determination of standing is contingent upon the authenticity, completeness, and verifiability of the records produced under the verification protocol (SS-FRAMEWORK-2026.01). Intake does not constitute review and does not confer standing.`
- Submit button:
  - Label: `Submit application` → `File document`
  - Submitting state: `Submitting…` → `Filing…`
  - Class additions: keep existing `rounded-none` mono-uppercase styling; add a leading mono prefix span inside the button — `[ SS-INTAKE-01 ]  FILE DOCUMENT` — rendered with `font-mono tracking-[0.14em]`.
- Toast on submit:
  - Title: `Application received` → `Filing acknowledged · SS-INTAKE-01`
  - Description: → `A Verification Officer of record will acknowledge receipt within five business days. Document upload protocols are initiated via secure transmission link upon acknowledgment.`

### Footer — Official citation block

Append below the form grid (matches Governance / Accountability / How-It-Works / Vendor Submission Standard):

- Container: `border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl mt-10`
- Top mono label (10.5px uppercase, muted): `OFFICIAL CITATION · SS-INTAKE-01`
- Body (12.5px, foreground): `Source Standard. Form SS-INTAKE-01 — Preliminary Administrative Intake. Governed by Vendor Submission Standard SS-VENDOR-STD-2026.01. Examined under SOP: Verification Protocol & Audit Methodology SS-FRAMEWORK-2026.01.`
- Sub-line (mono, 11px uppercase, muted): `Controlled form · See Vendor Submission Standard · See SOP: Verification Protocol & Audit Methodology` — with inline `<Link>`s to `/for-vendors` and `/how-it-works`.

### Visual style

- High-density monochromatic grid kept (existing `border-border` + `bg-surface-muted` tokens; no new colors).
- All eyebrows, notice labels, and the new citation label rendered with `font-mono uppercase tracking-[0.08em] text-[10.5px]` for typographic consistency with the other compliance documents.
- Submit button reads as a "File document" action via the bracketed mono `[ SS-INTAKE-01 ]` prefix; no shape/color changes to the button itself.

### Files touched

- `src/pages/Apply.tsx` only — `UtilityHeader` props, `checklist` array + sidebar header + sidebar footnote, form-panel header strip (two-line), all six field labels + two placeholders, footer Administrative Notice + filing button, toast copy, and appended Official Citation block.

### What stays the same

All routes, the `UtilityHeader` / `Button` / `Input` / `Textarea` / `Label` components, the 4 / 8 column grid, sticky sidebar behavior, form validation, and all design tokens.

