## Goal
Rewrite the Verification Framework page (HowItWorks.tsx) so it explains the purpose and principles of the framework rather than the internal mechanics of how Source Standard performs reviews.

Guiding principle: Show the framework. Protect the methodology.

## Scope
Single file: `src/pages/HowItWorks.tsx`
No structural or visual changes — existing ProtocolCard, ProtocolRow, BoundaryRow, SectionHeader, and ClauseStack components stay as-is. Only content (strings, arrays) is updated.

## Section-by-section changes

### 1. Hero Section
- Replace the `heroDescription` constant with:
  > "The Source Standard Verification Framework establishes the principles used to evaluate sourcing transparency and maintain consistent public-reference records."

### 2. Protocol Purpose
- Rewrite the ProtocolCard intro paragraphs to focus on creating a consistent, objective standard for evaluating sourcing transparency.
- Keep the existing disclaimer paragraph unchanged (not medical advice, regulatory approval, product certification, or guarantee of safety/outcomes).

### 3. Evidence Review
- Replace the `AUDIT_CLAUSES` array with 4 principle-based cards:
  - **Transparency** — Evaluate information within a consistent public framework.
  - **Consistency** — Apply the same standards across all reviewed organizations.
  - **Documentation** — Base determinations on information that can be reviewed and maintained.
  - **Independence** — Maintain objective and impartial evaluation standards.
- Update the `SectionHeader` intro text for this section to a principle-focused sentence.

### 4. Ongoing Monitoring
- Replace the `SURVEILLANCE_CLAUSES` array with 4 broader public-concept cards:
  - **Record Maintenance**
  - **Status Updates**
  - **Periodic Review**
  - **Public Information Updates**
- Keep body copy high-level so visitors understand records evolve without learning internal workflow.
- Update the `SectionHeader` intro text accordingly.

### 5. Vendor Responsibilities
- Replace the `DISCLOSURE_CLAUSES` array with 3 simplified responsibility cards:
  - **Maintain accurate public information.**
  - **Notify Source Standard of material changes affecting published records.**
  - **Cooperate with periodic review when applicable.**
- Remove the detailed operational requirements (material change reporting, documentation maintenance, review continuity, status adjustment).
- Update the `SectionHeader` intro text accordingly.

### 6. Review Boundaries
- No major changes. Keep the `BOUNDARIES` array and section substantially as-is.

### 7. Record Standard
- Retain the ProtocolCard structure.
- Simplify language to focus on the Verification Framework establishing a consistent public-reference standard for sourcing transparency.
- Remove references to organizing documentation, pharmacy/manufacturer relationships, and supporting evidence into a review process.

## Outcome
Visitors will understand:
- Why the framework exists
- What principles guide it
- What verification means and does not mean
- Why Source Standard provides value

They will not see internal review workflows, documentation categories, operational methodology, monitoring logic, or reassessment procedures.

## Verification
After edits, run `bun run build` to confirm no TypeScript or JSX errors.