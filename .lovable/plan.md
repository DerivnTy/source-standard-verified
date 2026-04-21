

## Terms → User Agreement & Registry Terms

A copy and light-structure refinement of `src/pages/Terms.tsx`. Keeps the `RecordHeader` + `Section`/`SectionLabel` chrome, the `SS-TERMS-2026.01` anchor, and all existing layout primitives. Tone aligned with the Privacy / Governance / Accountability overhauls.

### Header (`RecordHeader`)

- Eyebrow: `Policy` → `Policy · Registry user agreement`
- Title: `Terms of use.` → `User Agreement & Registry Terms.`
- Lead: → `The binding user agreement governing access to the Source Standard public registry and any reproduction, citation, or downstream use of its contents. Issued by the auditing body as a version-controlled legal instrument under document SS-TERMS-2026.01.`
- Metadata row kept (`SS-TERMS-2026.01`, `Active`, `04/21/26`, `FL/US`).

### Per-section document identifier (version-controlled header)

Mirroring the Privacy page, add a small mono identifier line above each `SectionLabel`, rendered as:

`Doc SS-TERMS-2026.01 · §N · v2026.01`

Implemented as `<p className="meta-mono text-muted-foreground mb-3">` placed inside each `<Section>` immediately before its `<SectionLabel>`. Reinforces the "controlled legal document" feel.

### §1 · Acceptance of terms (kept, tightened)

Description rewritten:
`Access to or use of this site, the public registry, or any associated framework document constitutes binding acceptance of this User Agreement together with the Data Governance & Privacy Policy (SS-PRIVACY-2026.01) and the Verification Disclaimer. If any term is not accepted, the user must discontinue use of the site and the registry.`

### §2 · Authorized Citation & Data Utilization (renamed + expanded)

Section title: `Permitted use of public content` → `Authorized Citation & Data Utilization`

Description (new): `Public registry entries may be cited in clinical, journalistic, academic, and consumer contexts. To preserve the integrity of every citation, the auditing body requires the following identifiers to accompany any reference.`

Mandatory citation elements — rendered as a labelled list (eyebrow `Required citation elements`):
1. `Audit ID` — the registry record identifier of the entity cited (e.g. `SS-V-####` for vendors, `SS-G-####` for greenlist sources).
2. `Status Date` — the issue date of the determination being cited (status as of `MM/DD/YY`).
3. `Document anchor` — the controlling framework document (`SS-FRAMEWORK-2026.01`) and, where the citation depends on it, the relevant policy anchor (`SS-PRIVACY-2026.01`, `SS-ENFORCE-2026.01`, etc.).
4. `Attribution` — an attribution line naming Source Standard as the auditing body, with a link to the source registry page.

Permitted use list (kept, tightened to three items):
- Citation of public registry entries in clinical, journalistic, academic, and consumer contexts, accompanied by the required citation elements above.
- Reference to vendor or upstream-source statuses with accurate attribution to Source Standard and the corresponding `Status Date`.
- Non-commercial reproduction of short excerpts with attribution and a link to the source page.

Citations that omit the `Audit ID` or `Status Date` are considered non-conforming and may be treated under §3.

### §3 · Prohibited Activity & Registry Integrity (renamed, made bold/prominent)

Section title: `Restrictions` → `Prohibited Activity & Registry Integrity`

Description (new, rendered prominently): `The following activities are prohibited. They compromise the integrity of the registry, mislead the public, or misappropriate the auditing body's identifiers. Unauthorized use of any Source Standard mark, document anchor, or status indicator will result in administrative action under SS-ENFORCE-2026.01, including a public registry note and, where appropriate, referral to counsel and to applicable regulatory authorities.`

Prohibition list (rewritten and expanded — five items, each rendered with a bolded lead clause so the section is impossible to miss):
1. **No bulk extraction.** No bulk scraping, crawling, indexing, or extraction of registry data for resale, redistribution, or assembly into any derivative dataset.
2. **No status misrepresentation.** No display, implication, or transmission of a `Verified`, `Pending Review`, `Greenlisted`, or any other Source Standard status for an entity that does not currently hold that status, or as of a date other than the published `Status Date`.
3. **No derivative or mirror registries.** No reproduction of Source Standard registry content as if independently maintained, audited, or determined.
4. **No unauthorized use of identifiers.** No use of the Source Standard name, marks, framework document anchors, badge artwork, or status indicators in a manner that implies affiliation, partnership, accreditation, endorsement, or any contractual relationship that does not exist.
5. **No interference with the registry.** No automated activity, attack, or circumvention intended to disrupt, falsify, or otherwise compromise the integrity of the public registry or its underlying records.

Closing line: `Confirmed violations are subject to administrative action under the Accountability & Enforcement protocol (SS-ENFORCE-2026.01).`

### §4 · Intellectual property (kept, tightened)

Description rewritten:
`The Source Standard name, framework document anchors (including all SS- identifiers), site design, badge artwork, status indicators, and original written content are the property of the auditing body. References to third-party regulatory authorities (FDA, state boards of pharmacy, PCAB, NSF, USP, and others) remain the property of those bodies and are reproduced here for reference only.`

### §5 · Warranty Disclaimer & Limit of Liability (renamed, merged §5 + §6, made prominent)

Section title: `Disclaimer of warranties` and `Limitation of liability` → merged into `Warranty Disclaimer & Limit of Liability`

Two prominent paragraphs, each preceded by a bolded lead clause:

- **Auditing mirror; no warranty.** `The site and the public registry operate as an auditing mirror of third-party records — licensing, supplier, certificate, and regulatory data produced or maintained by third parties. The site and registry are provided on an as-is and as-available basis. The auditing body makes no warranties, express or implied, regarding the accuracy, completeness, currency, or fitness for any particular purpose of any registry entry, status, or associated metadata.`
- **Limit of liability.** `To the fullest extent permitted by law, the auditing body is not liable for any direct, indirect, incidental, consequential, special, or exemplary damages arising from access to the site or reliance on registry content. Reliance on registry information is at the user's discretion. Users should consult licensed clinicians and the applicable regulatory authorities for matters within those domains.`

### §6 · Jurisdictional Governance (renamed)

Section title: `Governing law` → `Jurisdictional Governance`

Description rewritten:
`This User Agreement is governed by the laws of the State of Florida, United States, without regard to conflict-of-law principles. Any dispute arising under or in connection with this Agreement is subject to the exclusive jurisdiction of the state and federal courts located in Florida, which the user accepts as the sole and exclusive venue.`

### §7 · Changes to terms (kept, renumbered)

Description rewritten:
`This User Agreement may be revised. Material changes are issued as a new version under the SS-TERMS series (e.g., SS-TERMS-2026.02). The current version is identified in the header of every section. Continued use of the site or registry after a revision constitutes binding acceptance of the updated Agreement.`

Counsel-review footnote kept and rewritten:
`This Agreement is provided in plain, controlled legal terms and is reviewed by counsel.`

### §8 · Read deeper (renumbered, re-pointed)

Replace the existing three links with the high-authority set:
- `Data Governance & Privacy Policy →` `/privacy`
- `Verification Disclaimer →` `/verification-disclaimer`
- `Accountability & Enforcement →` `/accountability`
- `Status Definitions →` `/status-definitions`
- `Governance →` `/governance`

Citation footer rewritten:
`Cite as: Source Standard User Agreement & Registry Terms, SS-TERMS-2026.01.`

### Visual style

- All existing tokens kept: `meta-mono`, `meta-label`, alternating `muted` `Section` backgrounds, `space-y-3 max-w-3xl` lists, `text-foreground` underline-offset link styling.
- Section densities preserved (`doc` / `tight`).
- Bolded lead clauses use existing `font-semibold text-foreground` — no new tokens.
- New per-section `Doc SS-TERMS-2026.01 · §N · v2026.01` identifier uses existing `meta-mono` token — no new CSS, no new components.
- No color changes, no new layout primitives.

### Files touched

- `src/pages/Terms.tsx` only — `RecordHeader` props, the `permitted` and `restrictions` arrays (rewritten + expanded), a new `citationElements` array for §2, the merged §5 disclaimer/liability block, the renamed §6 jurisdiction block, and the §8 "Read deeper" link list. Add a small per-section `Doc SS-TERMS-2026.01 · §N · v2026.01` identifier above each `SectionLabel` (small local `DocId` helper, mirroring the Privacy page pattern).

### What stays the same

All routes, the `RecordHeader` / `Section` / `SectionLabel` components, container widths, the document anchor `SS-TERMS-2026.01`, the `mailto`-free structure of the page, and all design tokens.

