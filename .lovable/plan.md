

## FAQ → Registry FAQs & Interpretations

A copy-only refinement of `src/pages/FAQ.tsx`. Keeps the existing accordion layout, `RecordHeader`, `Section`/`SectionLabel` chrome, and document-anchor `SS-FAQ-2026.01`. Tone aligned with the Governance / Accountability / How-It-Works / Apply overhauls. No structural, routing, or component changes.

### Header (`RecordHeader`)

- Eyebrow: `Reference` → `Reference · Administrative briefing`
- Title: `Frequently asked questions.` → `Registry FAQs & Interpretations.`
- Lead: → `Direct, time-bound interpretations of the registry's verification protocols, greenlist scope, and permitted public use. Issued by the auditing body for reference; not a substitute for the controlling source documents cited in each answer.`
- Metadata row kept (`SS-FAQ-2026.01`, `Active`, `04/21/26`, `FL/US`).

### Section headers (4 categories, consolidated from 7)

The seven existing groups collapse into the four requested categories. All Q&A items are preserved (no deletions); a few are re-homed and rewritten in plainer-but-official language.

- §1 — `The Organization` (formerly "About Source Standard")
- §2 — `Verification Protocols` (merges "Verification" + "Public statuses" + "Limits and disclaimers" items that pertain to verification scope)
- §3 — `The Greenlist` (kept)
- §4 — `Public & Consumer Use` (merges "For Consumers" + "For Vendors" + remaining "Limits and disclaimers" items)

A trailing §5 — `Read deeper` reference list is kept and re-pointed (see Linking below).

### Q&A rewrite — full text

Language is direct and "boring." Marketing phrasing removed. Terms standardised: `auditing body`, `regulatory anchors`, `time-bound determination`, `controlling document`, `Verification Officer`, `controlled record`.

**§1 · The Organization**

1. **What is Source Standard?**
   Source Standard is an auditing body that maintains a public registry of medical and health vendors reviewed against documented sourcing, licensing, and public-claims criteria. The registry is a reference layer; it is not a clinic, pharmacy, or manufacturer.
   _Read more — About Source Standard →_ `/about`

2. **Is Source Standard a regulator?**
   No. Source Standard is not a regulator. It references existing regulatory anchors (FDA, state boards of pharmacy, PCAB, NSF, USP) and publishes time-bound determinations against those anchors.
   _Read more — Governance →_ `/governance`

3. **Who oversees the framework?**
   An internal review function and a medical advisory body. Authority references are drawn from FDA, state boards of pharmacy, PCAB, NSF, and USP standards.
   _Read more — Medical Advisory →_ `/medical-advisory`

**§2 · Verification Protocols**

1. **What does "Verified" mean?**
   A time-bound determination by the auditing body that the entity has produced records of identity, licensing, sourcing, and public claims sufficient to satisfy the verification protocol (`SS-FRAMEWORK-2026.01`) at the date of issue.
   _Read more — Verification protocol →_ `/how-it-works`

2. **What is examined during verification?**
   Business identity; jurisdictional licenses and registrations; pharmacy and supplier records; certificates of analysis and category records; procurement and invoice history; consistency of public claims; and renewal-related updates.
   _Read more — What we review →_ `/how-it-works`

3. **How long does a determination last?**
   Determinations are time-bound and reviewed on a defined renewal interval. Material changes can trigger an out-of-cycle re-review at any time.
   _Read more — Accountability & Enforcement →_ `/accountability`

4. **What does "Verified" not mean?**
   It is not a clinical endorsement, not a guarantee of product safety, not a warranty of future conduct, and not a substitute for professional medical judgment.
   _Read more — Verification Disclaimer →_ `/verification-disclaimer`

5. **What public statuses exist?**
   Verified, Pending Review, Under Review, Suspended, Removed, Greenlisted, and Not Listed. Each is defined in the controlling reference.
   _Read more — Status Definitions →_ `/status-definitions`

6. **What does "Suspended" mean?**
   A previously Verified determination has been temporarily withdrawn pending clarification. It does not constitute a finding of wrongdoing.
   _Read more — Status Definitions →_ `/status-definitions`

7. **What does an audit cost?**
   Audit fees are disclosed during Step 2 of the application process and vary by category.
   _Read more — Vendor Submission Standard →_ `/for-vendors`

**§3 · The Greenlist**

1. **What is the Greenlist?**
   The Greenlist is a registry of upstream sources — primarily 503A compounding pharmacies, 503B outsourcing facilities, and other qualified suppliers — documented as legitimate operating entities under recognized regulatory categories.
   _Read more — Greenlist →_ `/greenlist`

2. **Does "Greenlisted" mean Source Standard endorses the supplier?**
   No. Greenlisted indicates the source is documented and registered under a recognized regulatory category. It does not imply contract, affiliation, or endorsement of any specific product.
   _Read more — Status Definitions →_ `/status-definitions`

**§4 · Public & Consumer Use**

1. **How should I use the registry?**
   As a structured reference to check whether a vendor has been reviewed under the framework, what scope was reviewed, and the current public status. The registry does not replace consultation with a licensed clinician.

2. **What if a vendor is "Not Listed"?**
   Not Listed means the entity does not appear in the registry. It is not a finding against the entity; the entity may simply not have entered the verification process.
   _Read more — Status Definitions →_ `/status-definitions`

3. **I have a concern about a listed vendor — what do I do?**
   Submit a report through the Report a Concern channel. Reports are reviewed under the framework's triage process and may trigger an out-of-cycle re-review.
   _Read more — Report a Concern →_ `/report-a-concern`

4. **How does a vendor apply?**
   Step 1 is a public-data registry initialization (Form `SS-INTAKE-01`). Step 2, issued by a Verification Officer, covers controlled document uploads and payment.
   _Read more — Begin a filing →_ `/apply`

5. **What changes must a verified vendor report?**
   Supplier changes, license changes, ownership changes, product category additions or removals, public claim changes, and any regulatory action.
   _Read more — Reportable changes →_ `/accountability`

6. **How is my data handled?**
   Vendor application materials, contact submissions, and concern reports are handled under the Privacy Policy. Public listing content is published; internal records are retained only for review purposes.
   _Read more — Privacy Policy →_ `/privacy`

7. **Can I cite a Source Standard listing?**
   Yes. Public registry entries may be cited and referenced. Reuse is governed by the Terms of Use.
   _Read more — Terms of Use →_ `/terms`

### §5 · Read deeper (re-pointed)

Replace the current three links with the high-authority set:

- `Accountability & Enforcement →` `/accountability`
- `Status Definitions →` `/status-definitions`
- `SOP: Verification Protocol & Audit Methodology →` `/how-it-works`
- `Governance →` `/governance`
- `Verification Disclaimer →` `/verification-disclaimer`

Footer cite line kept: `Cite as: Source Standard FAQ, SS-FAQ-2026.01.`

### Visual style

- Existing accordion layout retained (single-open, collapsible) — already matches a "clean, organized list of documents."
- `Section` alternating muted backgrounds preserved.
- Q text: `text-[15px] font-medium text-foreground` (kept).
- A text: `text-[15px] text-muted-foreground leading-relaxed` (kept).
- "Read more" link styling kept (`text-foreground underline-offset-4 hover:underline`).
- No new tokens, no new components, no color changes.

### Files touched

- `src/pages/FAQ.tsx` only — `RecordHeader` props, `groups` array (4 categories with rewritten Q&A), and the §5 "Read deeper" link list.

### What stays the same

All routes, the `RecordHeader` / `Section` / `SectionLabel` / `Accordion*` components, the single-open accordion behavior, container widths, the document anchor `SS-FAQ-2026.01`, the citation footer line, and all design tokens.

