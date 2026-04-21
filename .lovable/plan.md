

## Medical Advisory Board — restructure to roster-first, Clinical Governance tone

A copy + reorder pass on `src/pages/MedicalAdvisory.tsx`. No data file edits, no routing changes. The roster moves to the top; mandate and responsibilities follow it.

### New section order

1. `RecordHeader` (hero)
2. **§1 — Current Board Appointments** (was §4 — Board Members)
3. **§2 — Regulatory Mandate & Scope** (was §1 — Board Mandate)
4. **§3 — Role in the Source Standard Framework** (unchanged content, renumbered)
5. **§4 — Key Responsibilities** (was §3, verbs tightened)
6. Read deeper
7. Cite

### Header (`RecordHeader`)

- Title: `Medical Advisory Board.` → `Medical Advisory Board (MAB).`
- Lead: → `The governing clinical body for the Source Standard framework. The MAB ratifies evaluation logic, authorizes versioned revisions, and confirms that public determinations are administratively defensible.`
- Metadata: keep existing; ensure `Doc: SS-MAB-2026.01` (already present).

### §1 — Current Board Appointments (moved up)

Section eyebrow: `§1 — Current Board Appointments`
Heading: `Appointed members of the Medical Advisory Board.`
Top-right meta strip becomes a faculty-directory header bar instead of a free paragraph:
- Left: `Roster · SS-MAB-2026.01`
- Right: `06 appointed seats · Active`
Both rendered as small mono uppercase labels with a thin divider, matching the ledger panels on the registry pages.

Card restyle (faculty-directory feel, still inside the existing 2-column `gap-px` grid):
- Photo column: square `h-20 w-20 rounded-[2px]`, with a small mono `SEAT · 01`–`06` badge underneath the photo.
- Right column inside the card header: name + credentials on top, board title below in primary color, specialization in muted.
- Move `jurisdiction · years practicing` into a 2-cell metadata strip directly under the name (instead of the footer), styled as `font-mono uppercase tracking-[0.1em]`:
  - `JURISDICTION · FL / US`
  - `YEARS PRACTICING · 20+`
- Short summary stays as the body paragraph.
- Footer keeps the `View profile →` link, plus a left-side small mono tag for the slug (e.g. `MAB-01`).

This makes each card scan as an appointment record rather than a marketing bio.

### §2 — Regulatory Mandate & Scope (moved down, retitled)

Eyebrow: `§2 — Regulatory Mandate & Scope`
Heading: `Governing clinical body for the framework.`
Body (replace existing 3 paragraphs):
> The Medical Advisory Board governs the evaluation logic of the Source Standard framework. It ratifies criteria, authorizes versioned revisions, and confirms that every public determination is grounded in current clinical practice and administratively defensible to a reviewing physician.
>
> The Board does not evaluate or treat patients through the framework. Its mandate is restricted to the rubric by which vendors, pharmacies, and upstream sources are assessed, and to the procedural discipline by which those assessments are recorded.
>
> Determinations published under this framework are the product of a structured review process governed by this Board — not an editorial position of the organization.

### §3 — Role in the Source Standard Framework

Renumber only. Keep the existing 4-step ordered list as-is (already uses `Defines / Ratifies / Reviews / Authorizes` verbs, which match the requested clinical tone).

### §4 — Key Responsibilities (verb tightening)

Eyebrow: `§4 — Key Responsibilities`
Heading: `What the Board is accountable for.`
Update titles in `responsibilities` rendering only — the data file is not edited; we override the displayed title via a small in-component map keyed by code so the source data stays placeholder-safe:

- R-01 Audit oversight → `Confirms audit determinations`
- R-02 Greenlist review → `Authorizes Greenlist inclusion`
- R-03 Policy refinement → `Ratifies policy revisions`
- R-04 Standard evolution → `Authorizes versioned standards`
- R-05 Educational review → `Confirms reference accuracy`
- R-06 Clinical guidance → `Ratifies clinical scope`
- R-07 Sourcing & patient-safety perspective → `Confirms sourcing posture`

Description text from the data file is preserved.

### Clinical-tone updates inside cards (display overrides)

Three members get an override to the displayed `boardTitle` only (data file unchanged; map by slug inside the page component):

- `advisor-01` (Chair, MD): `Chair · Evidentiary Standards & Framework Review`
- `advisor-04` (PharmD): `Member · USP Sterile Compounding Standards`
- `advisor-06` (MD/JD): `Member · Regulatory Posture & Ethical Boundaries`

Other three members keep their existing board titles. Bios, credentials, jurisdictions are not edited.

### Files touched

- `src/pages/MedicalAdvisory.tsx` — section reorder, copy updates in header / mandate / responsibilities, faculty-directory card restyle, slug-keyed display overrides for 3 board titles, code-keyed display overrides for 7 responsibility titles.

### What stays the same

All routes, the `RecordHeader` / `Read deeper` / `Cite` blocks, the `advisoryBoard` and `responsibilities` data files, profile detail pages at `/medical-advisory/:slug`, all design tokens and container widths.

