

## Vendor Reference → Vendor Submission Standard

A copy + light visual pass on `src/pages/ForVendors.tsx`. No routing, no new components, no token changes. Tone aligned with the Governance / Accountability / How-It-Works overhauls. Document anchor: `SS-VENDOR-STD-2026.01`.

### Header (`RecordHeader`)

- Eyebrow: `Reference` → `Submission standard`
- Title: `Vendor reference.` → `Vendor Submission Standard.`
- Lead: → `Technical specifications for the records, credentials, and procurement evidence required at intake. Submitted materials are entered into the controlled audit file and examined under the forensic review protocol (SS-FRAMEWORK-2026.01).`
- Metadata Doc ID: `SS-VENDOR-GUIDE-2026.01` → `SS-VENDOR-STD-2026.01`. Other metadata kept (Version `2026.01`, Status `Active`, Updated `04 / 21 / 2026`).

### §1 — Documentation Required → "Mandatory Evidentiary Inventory"

- Section eyebrow: `§1 — Documentation Required` → `§1 · Mandatory evidentiary inventory`
- H2: → `Records entered into the controlled audit file.`
- `docs` array rewritten to clinical/administrative tone (titles + descriptions, order preserved):
  1. **Jurisdictional Registrations** — Active state and federal registrations applicable to the operating entity, including any Board of Pharmacy, Department of Health, or DEA registrations of competent jurisdiction.
  2. **Procurement Nodes & Supplier Records** — Itemized disclosure of upstream procurement nodes — pharmacies, outsourcing facilities, qualified suppliers — supporting each reviewed product category, with corresponding records retained in the audit file.
  3. **Certificates of Analysis (ISO-Accredited Laboratories)** — Independent third-party analytical records for relevant lots or batches, issued by ISO/IEC 17025-accredited laboratories where applicable to the category under review.
  4. **Prescriber Credentials of Record** — For clinical operating models, current licensure and credentialing records for prescribing practitioners associated with the entity.
  5. **503A / 503B Pharmacy Partnerships** — Documentation evidencing the relationship between the entity and any 503A compounding pharmacy or 503B outsourcing facility relied upon to fulfill listed categories.
- Table column headers: `Ref` / `Document` / `Description` → `Ref` / `Evidentiary record` / `Specification`
- Footnote line below table: → `Required records vary by operating model. The reviewer of record may identify additional materials during intake; all such requests are logged to the controlled audit file.`

### Sidebar — "Submission Checklist"

- Header label: `Submission Checklist` → `Submission Checklist · SS-VENDOR-STD-2026.01`
- CTA preserved (`Begin application →`, links to `/apply`).

### §2 — Issued Upon Verification → "Registry Deliverables & Attribution"

- Section eyebrow: `§2 — Issued Upon Verification` → `§2 · Registry deliverables & attribution`
- H2: → `Public record issued upon verification.`
- `issued` array rewritten:
  1. A public Verified profile entered in the Source Standard Registry of record.
  2. A unique **Audit ID** (format `SS-AUD-YYYY-NNNNN`) that may be cited and independently confirmed against the registry.
  3. A **Verification Transcript** — the itemized public record of documentation reviewed, examination domains covered, and the standing issued.
  4. A verification badge for use on vendor-controlled surfaces, governed by the framework's attribution terms.

### §3 — Submission strip → "Administrative Notice"

Replace the existing single-line strip with a mono advisory bar matching the Governance / Accountability / How-It-Works pattern.

- Container: `border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3`
- Mono label (10.5px uppercase, muted): `ADMINISTRATIVE NOTICE · SS-VENDOR-STD-2026.01 · §3`
- Body (13px, foreground, leading-relaxed): `Initial intake is an administrative submission step and takes approximately fifteen minutes to complete. Intake does not constitute forensic review. Submitted materials are entered into the controlled audit file and examined under the verification protocol (SS-FRAMEWORK-2026.01) prior to any determination of standing.`
- CTA preserved (`Begin application →`, links to `/apply`), placed to the right of the notice on `md:`+ widths.

### Footer — Official citation block

Append below §3 (matches Governance / Accountability / How-It-Works):

- Container: `border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl mt-8`
- Top mono label: `OFFICIAL CITATION · SS-VENDOR-STD-2026.01`
- Body (12.5px, foreground): `Source Standard. Vendor Submission Standard. Document SS-VENDOR-STD-2026.01. Issued 04 / 21 / 2026. Revision 2026.01. Controlled copy on file with the issuing organization.`
- Sub-line (mono, 11px uppercase, muted): `Controlled standard · See SOP: Verification Protocol & Audit Methodology · See Compliance Monitoring & Enforcement Protocols` — with inline `<Link>`s to `/how-it-works` and `/accountability`.

### Visual style

- Reinforce the "boring bureau" aesthetic by:
  - Using mono uppercase 10.5px labels (`font-mono tracking-[0.08em]`) for every section eyebrow and the new `ADMINISTRATIVE NOTICE` / `OFFICIAL CITATION` labels.
  - Keeping the existing 12-col bordered grid for §1 and the bordered sidebar checklist (already monochromatic).
  - No new colors, no new borders beyond what's already used elsewhere — strictly `border-border` and `bg-surface-muted` tokens.

### Files touched

- `src/pages/ForVendors.tsx` only — `RecordHeader` props, `docs` array, §1 column labels + footnote, sidebar header, `issued` array, replacement of the §3 strip with the Administrative Notice block, and appended Official Citation footer.

### What stays the same

All routes, the `RecordHeader` component, container widths, the 12-col §1 grid, the sticky sidebar, the `Begin application →` CTA targets, and all design tokens.

