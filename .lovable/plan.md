

## Populate All Placeholder Reference Pages

Seven pages currently render the `PlaceholderSection` ("Section in development") component. They are linked from the homepage, footer, Verification page, and elsewhere — every "Read more" trail eventually lands on one of these. This plan fully writes each page in the same institutional, documentation-first tone used across `About`, `HowItWorks`, and `Education`.

### Pages to populate

| Page | Route | Doc ID | Linked from |
|---|---|---|---|
| Status Definitions | `/status-definitions` | SS-STATUS-2026.01 | Footer, Home §7, Verification |
| Accountability & Enforcement | `/accountability` | SS-ENFORCE-2026.01 | Footer, Home §7, Verification |
| FAQ | `/faq` | SS-FAQ-2026.01 | Footer |
| Report a Concern | `/report-a-concern` | SS-REPORT-2026.01 | Footer |
| Verification Disclaimer | `/verification-disclaimer` | SS-DISCLAIMER-2026.01 | Footer, Verification |
| Privacy Policy | `/privacy` | SS-PRIVACY-2026.01 | Footer |
| Terms of Use | `/terms` | SS-TERMS-2026.01 | Footer |

### Content outline per page

**1. Status Definitions** — The canonical reference for every public status badge.
- Hero: what a public status is and why it is assigned.
- Definition rows for: `Verified`, `Pending Review`, `Under Review`, `Suspended`, `Removed`, `Greenlisted`, `Not Listed`. Each with: meaning, what it tells the public, what it does not imply, when it is assigned, when it changes.
- Status lifecycle diagram (text-based vertical flow).
- Visual treatment: small status badge swatch beside each definition.

**2. Accountability & Enforcement** — Vendor obligations and consequences.
- Vendor commitments at time of verification (truthful representation, supplier disclosure, renewal cooperation).
- Reportable changes that require notification (supplier change, license change, ownership change, product category change, public claims change).
- Review triggers (consumer reports, supplier delisting, regulatory action, public claim divergence).
- Enforcement actions (clarification request, scope reduction, suspension, removal, public note).
- Reinstatement pathway.

**3. FAQ** — Grouped consumer + vendor questions, expandable accordion.
- Sections: About Source Standard · Verification · The Greenlist · For Consumers · For Vendors · Public statuses · Limits and disclaimers.
- ~18–22 questions total. Each answer includes a cross-link to the relevant deeper page.
- Uses existing `Accordion` component.

**4. Report a Concern** — Public submission pathway.
- What is in scope (sourcing concerns, claims divergence, supplier issues, listing accuracy).
- What is out of scope (medical complaints → FDA/state board, billing disputes, personal disputes).
- How submissions are reviewed (intake → triage → review → outcome).
- What happens after submission (acknowledgment, possible follow-up, status updates).
- Confidentiality and good-faith reporting.
- Email-based submission instructions (no live form yet — `mailto:` link to a placeholder address `concerns@sourcestandard.org`, with note that a structured form is forthcoming).

**5. Verification Disclaimer** — Trust + boundaries.
- What verification covers (records reviewed, sourcing alignment, license confirmation, claims consistency).
- What verification does not cover (clinical outcomes, individual prescriptions, product safety guarantees, future conduct).
- Role boundaries (not a regulator, not a clinic, not a manufacturer).
- Time-bound nature of verification.
- Liability framing.

**6. Privacy Policy** — Data handling.
- What data is collected (vendor application materials, contact form submissions, concern reports, basic site analytics).
- How data is used (verification review, communication, public listing publication).
- What is published vs. what stays internal.
- Third-party processors (hosting, email).
- Consumer rights (access, correction, deletion requests).
- Contact for privacy inquiries.

**7. Terms of Use** — Site terms.
- Acceptance of terms.
- Permitted use of public registry information (citation, reference, non-commercial reproduction).
- Restrictions (no scraping for resale, no misrepresentation of status, no derivative listings).
- Intellectual property (Source Standard name, framework documents).
- Disclaimer of warranties, limitation of liability.
- Governing law (Florida, US).
- Changes to terms.

### Visual & structural conventions (consistent across all 7)

- Reuse existing `RecordHeader` for the document-style header (already in place).
- Replace `<PlaceholderSection />` with real content sections built from the existing `Section` + `SectionLabel` components in `src/components/Section.tsx`.
- Each page uses the same rhythm: numbered eyebrow sections (§1, §2, …), prose lead, structured content blocks (definition rows, grouped lists, hairline-divided tables).
- Footer "Cite as" line on every page matching existing pattern.
- Cross-links: every page links to 2–3 related pages at the bottom under a "Read deeper" block.
- FAQ uses the existing `Accordion` UI primitive.
- Promote each page status from `Draft` to `Active` in the metadata header now that content exists.

### Files edited

- `src/pages/StatusDefinitions.tsx` — full rewrite
- `src/pages/Accountability.tsx` — full rewrite
- `src/pages/FAQ.tsx` — full rewrite
- `src/pages/ReportConcern.tsx` — full rewrite
- `src/pages/VerificationDisclaimer.tsx` — full rewrite
- `src/pages/Privacy.tsx` — full rewrite
- `src/pages/Terms.tsx` — full rewrite

### Files NOT touched

- `src/components/PlaceholderSection.tsx` — kept in place but no longer used by any route. Left as a utility for future stub pages.
- No routing changes, no nav changes, no other pages affected.
- Homepage (`Index.tsx`) links already point to the correct routes — the destinations now have real content.

### Tone

Same documentation-first, institutional tone established by `About`, the rebuilt `HowItWorks`, and `Governance`. Calm, exact, trust-building. No marketing language, no business-strategy framing. Written so a clinician, vendor, or skeptical consumer can read any page top-to-bottom and understand exactly what the framework does and does not do.

### Out of scope

- Backend forms (Report a Concern uses `mailto:` for now).
- Per-status badge component refactor (statuses rendered with simple existing styling).
- Legal review of Privacy/Terms text — content is drafted in plain, reasonable terms but should be reviewed by counsel before public launch (a short footer note will indicate this).

