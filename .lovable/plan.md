

## Privacy → Data Governance & Privacy Policy

A copy and light-structure refinement of `src/pages/Privacy.tsx`. Keeps the `RecordHeader` + `Section`/`SectionLabel` chrome, the `SS-PRIVACY-2026.01` anchor, and all existing layout primitives. Tone aligned with Governance / Accountability / How-It-Works overhauls.

### Header (`RecordHeader`)

- Eyebrow: `Policy` → `Policy · Data governance protocol`
- Title: `Privacy policy.` → `Data Governance & Privacy Policy.`
- Lead: → `The data governance protocol of the auditing body. Defines what information Source Standard collects, how it is partitioned between public registry content and Protected Audit Material, the infrastructure partners that process it, retention and disposal rules, and the rights of individuals whose data is held.`
- Metadata row kept (`SS-PRIVACY-2026.01`, `Active`, `04/21/26`, `FL/US`).

### Per-section document identifier

Add a small mono identifier line above each `SectionLabel`, rendered as:

`Doc SS-PRIVACY-2026.01 · §N`

Implemented as a `<p className="meta-mono text-muted-foreground mb-3">` placed inside each `<Section>` immediately before its `<SectionLabel>`. Reinforces the "controlled document" feel without altering layout.

### §1 · Data collected (kept, language tightened)

Same four-row structure. Term tweaks only:
- `Vendor application materials` description: → `Business identity, licensing records, supplier disclosures, certificates of analysis, invoice samples, and category documentation submitted under Form SS-INTAKE-01 and during subsequent audit cycles.`
- `Contact submissions` (kept).
- `Concern reports` (kept).
- `Site analytics` (kept; reaffirm "no advertising trackers, no cross-site identifiers").

### §2 · How data is used (kept, tightened)

Bulleted list re-worded to four uses:
1. Conducting time-bound verification reviews and renewal cycles.
2. Communicating with applicants, vendors, and reporters about active matters of record.
3. Publishing public registry entries within the scope each entity has consented to under the Vendor Submission Standard.
4. Maintaining the integrity of the framework, its documentation, and the public site.

### §3 · Information Partitioning (renamed + expanded)

Section title: `Published vs. internal` → `Information Partitioning`

Description (new): `A documented separation governs every record held by the auditing body. Public registry fields are published; Protected Audit Material (PAM) is retained internally for review purposes only and is never published or shared outside the audit function.`

Two-row table preserved, relabelled and expanded:

| Class | Contents |
|---|---|
| `Public registry data` | Business name, location, scope categories, current status, status date, public references, and any attached public note. Published under `SS-FRAMEWORK-2026.01`. |
| `Protected Audit Material (PAM)` | Application materials, licensing records, supplier and pharmacy invoices, certificates of analysis, prescriber credentials, internal review notes, reporter identity, and unredacted contact submissions. Retained internally; not published; not shared outside the audit function except as required by lawful process. |

### §4 · Infrastructure Partners (renamed)

Section title: `Third-party processors` → `Infrastructure Partners`

Description (new): `A small number of infrastructure partners process data on the auditing body's behalf under written non-disclosure and privacy-preserving protocols. Partners are limited to the minimum data required to perform their function and are not authorised to use or disclose data for any other purpose.`

List rewritten to three items:
1. Hosting and content delivery infrastructure for the public registry.
2. Transactional email delivery for applicant, vendor, and reporter correspondence.
3. Privacy-respecting site analytics (aggregate, non-identifying signals only).

### §5 · Retention & Disposal (new section)

Title: `Retention & Disposal`

Description: `Audit records are retained for the period necessary to maintain the integrity of the public registry. Disposal follows a documented schedule.`

Body — bulleted rules:
- `Active standing` — Protected Audit Material is retained for the full duration the entity holds an active determination (Verified, Pending Review, Under Review, Suspended) and through any subsequent renewal or re-review cycle.
- `Historical record` — Public registry fields and the determination history are retained as a permanent record of the framework. Status transitions remain visible after Removed status.
- `Withdrawn applications` — PAM associated with a withdrawn or denied application is retained for a defined administrative window, after which it is securely disposed of in accordance with the disposal schedule.
- `Concern reports` — Submission content is retained for the duration of the matter and the reference period required to detect repeat patterns; reporter identity is segregated and access-controlled.
- `Disposal` — Disposal of PAM follows controlled deletion procedures with audit logging. Aggregate, non-identifying analytics are retained without time limit.

Renumbering: the new §5 pushes the remainder down — Your rights → §6, DPO contact → §7, Read deeper → §8.

### §6 · Your rights (kept content, renumbered)

List unchanged.

### §7 · Data Privacy Officer (DPO) (renamed)

Section title: `Contact for privacy inquiries` → `Data Privacy Officer (DPO)`

Description (new): `Privacy inquiries, data-subject requests, and lawful-process correspondence are handled by the Data Privacy Officer.`

Contact card kept (`privacy@sourcestandard.org`), with the small footnote rewritten:
`This protocol is provided in plain, controlled terms and is reviewed by counsel. Material updates are issued as a new document version under the SS-PRIVACY-2026.01 series.`

### §8 · Read deeper (renumbered, re-pointed)

Replace existing three links with the high-authority set:
- `Governance →` `/governance`
- `Accountability & Enforcement →` `/accountability`
- `Verification Disclaimer →` `/verification-disclaimer`
- `Terms of Use →` `/terms`
- `Report a Concern →` `/report-a-concern`

Citation footer kept: `Cite as: Source Standard Data Governance & Privacy Policy, SS-PRIVACY-2026.01.`

### Visual style

- All existing tokens kept: `divide-y divide-border/70 border-y border-border/70 bg-background`, `meta-label`, `meta-mono`, `h-card`, muted-foreground body text.
- Section densities preserved (`doc` / `tight`), alternating `muted` backgrounds preserved.
- New per-section `Doc SS-PRIVACY-2026.01 · §N` identifier uses existing `meta-mono text-muted-foreground` token — no new CSS.
- No new components, no color changes, no layout primitives added.

### Files touched

- `src/pages/Privacy.tsx` only — `RecordHeader` props, the four data arrays (`collected`, `uses`, `publishedVsInternal` → `partitioning`, `processors` → `partners`), a new `retention` array + section, the renamed DPO section, and the §8 "Read deeper" link list. Add the small per-section `Doc SS-PRIVACY-2026.01 · §N` identifier above each `SectionLabel`.

### What stays the same

All routes, the `RecordHeader` / `Section` / `SectionLabel` components, container widths, the document anchor `SS-PRIVACY-2026.01`, the citation footer line pattern, the `mailto:privacy@sourcestandard.org` contact, and all design tokens.

