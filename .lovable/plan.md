

## Apply page — Simplified vendor-facing copy pass

A copy-only refinement of `src/pages/Apply.tsx`. Keeps the "Official Registry" chrome (mono labels, bordered panels, `SS-INTAKE-01` anchor) but rewrites all human-facing strings to plain, vendor-approachable language. No structural, routing, or component changes.

### Header (`UtilityHeader`)

- Eyebrow (kept, simplified): `Form SS-INTAKE-01 · Step 1 of 2`
- Title: → `Step 1: Registry Initialization.`
- Description: → `Submit this form to open your audit file. A Verification Officer will review your basic details and issue a secure portal link for Step 2 (document uploads and payment).`

### Sidebar — "Documentation required for Step 2"

- Header label: `Pre-audit evidentiary requirements · Step 2` → `Documentation required for Step 2`
- `checklist` array rewritten in plain terms (5 items, `§01–§05` markup preserved):
  1. Business licenses (state and federal registrations for your operating entity)
  2. Pharmacy invoices (records from the 503A / 503B pharmacies you work with)
  3. Certificates of Analysis (third-party lab results from ISO-accredited labs)
  4. Prescriber credentials (active licenses for any prescribing practitioners)
  5. Pharmacy service agreements (contracts with your 503A or 503B partners)
- Sidebar footnote (simplified): `You'll receive a secure upload link from your Verification Officer once Step 1 is acknowledged.`

### "Step 1 of 2" hook bar (above the form)

- Mono label kept: `STEP 1 OF 2 · REGISTRY INITIALIZATION`
- Body (simplified): `Tell us who you are. We'll open your audit file and email you a secure portal link for Step 2 (document uploads and payment) within 24 hours.`

### Form panel — header strip

- Line 1 (kept): `FORM SS-INTAKE-01 · PRELIMINARY ADMINISTRATIVE INTAKE`
- Line 2 (simplified): `Step 1 — Public business details only · Required fields marked`

### Form fields — section headings + labels (IDs unchanged)

PascalCase `id` attributes (`LegalName`, `BrandName`, `Website`, `Category`, `StateList`, `ContactName`, `ContactEmail`, `ContactPhone`) are preserved for backend mapping. Only visible text changes.

**§A · Business Profile**
- `Legal entity name` → `Legal business name`
- `Public-facing brand name` → `Brand name (as customers see it)`
- `Primary website` → `Website` (placeholder kept: `https://`)

**§B · Audit Scope**
- `Audit category requested` → `Verification category` (placeholder simplified: `e.g. TRT clinic, 503A pharmacy, 503B outsourcing facility`)
- `States of operation` → `States of operation` (kept; helper text simplified: `Use two-letter state codes, separated by commas.`)

**§C · Administrative Contact**
- `Authorized representative` → `Contact name`
- `Contact email of record` → `Business email`
- `Telephone of record` → `Business phone`

### Submit button

- Idle: `[ SS-INTAKE-01 ]  FILE DOCUMENT` → `[ SS-INTAKE-01 ]  SUBMIT INITIAL FILING`
- Submitting: `[ SS-INTAKE-01 ]  FILING…` → `[ SS-INTAKE-01 ]  SUBMITTING…`
- Reset (post-success): `[ SS-INTAKE-01 ]  FILE ANOTHER ENTITY` → `[ SS-INTAKE-01 ]  SUBMIT ANOTHER FILING`
- Styling unchanged.

### Administrative Notice (form footer strip)

- Mono label kept: `ADMINISTRATIVE NOTICE · SS-INTAKE-01`
- Body (simplified): `This is Step 1 of 2. Submitting this form opens your audit file with the Source Standard registry — it does not complete verification. Your Verification Officer will email a secure portal link for document uploads and payment (Step 2) within 24 hours.`

### Success state — in-panel confirmation

Logic unchanged. Copy simplified:
- Header strip line 2: `Status · Filing acknowledged · Awaiting Verification Officer` (kept)
- Mono label: `FILING RECEIVED · SS-INTAKE-01` (kept)
- Heading: `Filing Received.` (kept)
- Body (kept): `A Verification Officer is initializing your profile. You will receive an automated email within 24 hours to set up your secure portal access.`
- Reference line (kept): `Reference · SS-INTAKE-{YYYY}-{6-char id}`

### Footer — Official Citation (de-emphasized)

Keep the existing block but shrink and mute it so the technical codes read as a "Bureau" footer rather than a primary content card.

- Container: change `border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl mt-10` → `border-t border-border bg-background px-5 py-3 max-w-4xl mt-10`
- All text rendered in `text-muted-foreground`:
  - Mono label (10.5px → 10px): `OFFICIAL CITATION · SS-INTAKE-01`
  - Body (12.5px → 11.5px, muted): kept as-is — `Source Standard. Form SS-INTAKE-01 — Preliminary Administrative Intake. Governed by Vendor Submission Standard SS-VENDOR-STD-2026.01. Examined under SOP: Verification Protocol & Audit Methodology SS-FRAMEWORK-2026.01.`
  - Sub-line (kept, muted): `Controlled form · See Vendor Submission Standard · See SOP: Verification Protocol & Audit Methodology` with the existing `<Link>`s to `/for-vendors` and `/how-it-works`.

### Files touched

- `src/pages/Apply.tsx` only — `UtilityHeader` props, sidebar header + checklist + footnote, hook bar body, form-panel header strip line 2, all field labels + helper/placeholder text, submit button labels, Administrative Notice body, and footer Official Citation styling.

### What stays the same

All routes, the `UtilityHeader` / `Button` / `Input` / `Label` components, the 4 / 8 column grid, sticky sidebar behavior, the `filed` success-state logic and reference generation, all field `id`s for backend mapping, and all design tokens.

