

## Advisory Board Page Copy Rewrite

Rewrites text content only on the Medical Advisory page. No layout, components, styling, routes, member data, images, or animations change.

### Files Touched

1. **`src/pages/MedicalAdvisory.tsx`** — page meta, hero copy, purpose statement, mandate clauses, governance functions, members lead, scope/boundaries, responsibilities, closing statement.
2. **`src/data/advisoryBoard.ts`** — only the `shortSummary` field on each of the 6 members (names, credentials, titles, photos, slugs, and all other fields preserved).

*Footer: already correct from prior pass — Standards column contains only Verification Protocol, Status Definitions, Compliance. No change needed.*

### Content Changes

**`src/pages/MedicalAdvisory.tsx`**

- **PageMeta**
  - Title: `Clinical Oversight · Source Standard`
  - Description: `Independent medical, pharmacy, and legal advisors supporting the integrity of the Source Standard framework. The Board reviews standards, terminology, evidence boundaries, and public-facing education.`

- **BriefingHero**
  - `category`: `Medical Advisory Board` (unchanged)
  - `title`: `Clinical Oversight`
  - `statement`: `Independent medical, pharmacy, and legal advisors supporting the integrity of the Source Standard framework. The Board reviews standards, terminology, evidence boundaries, and public-facing education. It does not treat patients, market vendors, approve clinics, or participate in promotional activity.`

- **Purpose section ("Why the Board exists")**
  - Para 1: `The Advisory Board exists to support the neutrality, clinical restraint, and procedural discipline of the Source Standard framework.`
  - Para 2: `Its role is to provide advisory input on review standards, documentation boundaries, public language, and education materials used across the registry.`
  - Para 3 (new): `The Board does not represent vendors, compound distributors, medical clinics, or pharmacy partners. It does not make individual vendor status determinations. It serves as an independent advisory layer for the standards behind the public reference system.`

- **§1 Institutional Mandate**
  - Section lead: `The operating boundaries under which the Board supports the framework.`
  - Clause 01: `Independent advisory oversight.` / `The Advisory Board provides clinical, pharmacy, legal, and procedural input on the Source Standard verification framework.`
  - Clause 02: `Documentation-based standards.` / `Status determinations are based on submitted documentation, public records, pharmacy relationship evidence, and defined review criteria.`
  - Clause 03: `Periodic review.` / `The Board supports periodic review of standards, terminology, evidence thresholds, and educational materials.`
  - Clause 04: `Objective distance.` / `Board members do not participate in vendor sales, promotional activity, or individual vendor status decisions.`

- **§2 Governance Framework**
  - Section lead: `The recurring advisory functions used to preserve consistency across the framework.`
  - 01: `Review boundaries` / `Defining what Source Standard reviews, what it does not review, and how those limits are communicated publicly.`
  - 02: `Upstream reference criteria` / `Providing advisory input on the criteria used to classify upstream compounding facilities within the registry.`
  - 03: `Documentation standards` / `Reviewing the evidence categories used in sourcing-claim evaluation, including pharmacy relationship records, chain-of-custody documentation, and public records.`
  - 04: `Protocol maintenance` / `Supporting updates to Source Standard terminology, public explanations, and review boundaries as regulatory and documentation practices evolve.`

- **§3 Appointed members**
  - Lead: `Independent clinicians, pharmacy reviewers, and legal advisors appointed to support framework standards, documentation boundaries, and public-reference integrity.`
  - Member cards: names, credentials, titles, jurisdiction, photos, profile links unchanged. Only `shortSummary` (the description body) updated — see data file changes below.

- **§4 Scope & boundaries**
  - Replace `BOUNDARIES` array with:
    1. `The Board supports the standards behind public determinations.`
    2. `The Board does not evaluate or treat patients.`
    3. `The Board does not provide individualized medical advice through Source Standard.`
    4. `The Board does not approve vendors, clinics, pharmacies, or products.`
    5. `The Board does not make individual vendor status determinations.`
    6. `The Board does not participate in sales, marketing, or promotional activity.`

- **§5 Responsibilities**
  - Lead: `Each responsibility maps to a recurring advisory activity recorded under Source Standard's framework maintenance process.`
  - R-01: `Standards review` / `Reviews framework standards, review boundaries, and evidence categories used in documentation-based status assignment.`
  - R-02: `Upstream criteria` / `Provides advisory input on the criteria used to classify 503A and 503B facilities as upstream reference records.`
  - R-04: `Regulatory awareness` / `Supports review of public terminology and documentation boundaries as FDA, state board, and pharmacy practice standards evolve.`
  - R-05: `Education review` / `Reviews educational materials for clinical accuracy, neutral language, and appropriate scope.`

- **Closing statement**
  - H2: `Public trust requires disciplined oversight.`
  - Body: `The Advisory Board exists to preserve neutrality, clinical seriousness, and evidentiary restraint within the Source Standard framework. Its role is to support the standards behind the registry, not to promote vendors, recommend treatment, or replace regulatory review.`

**`src/data/advisoryBoard.ts`** — `shortSummary` rewrites only:

- `advisor-01` (Eleanor Whitfield): `Board chair supporting clinical oversight of framework standards, evidence boundaries, and renewal terminology across the Source Standard registry.`
- `advisor-02` (Anand Krishnamurthy): `Provides pharmacy-side input on upstream sourcing criteria and documentation categories used in 503A and 503B review.`
- `advisor-03` (Marcia Okonkwo): `Reviews public-facing framework language with emphasis on accuracy, restraint, and informed-consumer clarity.`
- `advisor-04` (Daniel Park): `Provides pharmacy compliance input related to sterile compounding standards, pharmacy documentation, and public-record review boundaries.`
- `advisor-05` (Camila Reyes): `Reviews educational reference material to support clinical accuracy, clear terminology, and appropriate scope.`
- `advisor-06` (Richard Halloran): `Provides physician-attorney input on legal posture, ethical boundaries, and public status language used within the framework.`

All other fields (`name`, `credentials`, `boardTitle`, `specialization`, `biography`, `background`, `accomplishments`, `whyTheyCare`, `contribution`, `clinicalFocus`, `philosophy`, `jurisdiction`, `yearsPracticing`, `photo`) preserved exactly as-is.

### Out of Scope

- All layout, components, styling, spacing, colors, animations
- Member photos, names, credentials, titles, profile routes
- Footer (already aligned)
- Per-advisor profile pages (`/medical-advisory/:slug`)
- All other pages

