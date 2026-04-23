

## Verification Disclaimer Page — Exact Execution Rebuild

Rebuild `src/pages/VerificationDisclaimer.tsx` into eight ordered sections plus a closing return link, using the exact wording provided. Mirror the institutional composition pattern established on Terms / Privacy / Accountability so this page reads as a clear public boundary statement rather than a legal scare page.

### Section-by-section

**§1 Hero** — Replace `BriefingHero` with the same restrained custom hero used across the rebuilt legal pages. Eyebrow "Verification Disclaimer", H1 "Verification Disclaimer", one supporting paragraph exactly as specified. No `docId`, no metadata chips, no navy treatment.

**§2 Statement of purpose (NEW)** — Sits between hero and contents nav. Eyebrow "Purpose", H2 "What a Source Standard determination means", two body paragraphs exactly as specified. Single contained column.

**§3 Contents navigation** — Replace `DocJumpBar` with `SectionAnchorNav` (matching Terms / Privacy). Four waypoints: `01 Scope`, `02 Exclusions`, `03 Boundaries`, `04 Liability`.

**§4 Scope** — `SplitSection`. Left rail: `01` + "Administrative Attestation Scope" + intro "What a determination is designed to reflect." Right: lead body paragraph followed by `ClauseList` of 4 clauses (Documented identity, Regulatory standing, Upstream sourcing, Record basis) with exact copy. `id="scope"`.

**§5 Exclusions** — `SplitSection`. Eyebrow `02`, H2 "Matters Outside the Scope of Attestation", intro "What a determination does not establish." Right: `ClauseList` of 4 clauses (Clinical outcomes, Product suitability, Safety and efficacy, Future conduct) with exact copy. `id="exclusions"`.

**§6 Boundaries** — `SplitSection`. Eyebrow `03`, H2 "Regulatory & Professional Boundaries", intro "What Source Standard is not." Right: `ClauseList` of 4 clauses (Not a statutory body, Not a clinical practice, Not a manufacturer, Not a guarantor) with exact copy. `id="boundaries"`.

**§7 Liability** — `SplitSection`. Eyebrow `04`, H2 "Limitation of Liability", intro "How registry information should be relied upon." Right: `ClauseList` of 3 clauses (User discretion, Professional consultation, Liability boundary) with exact copy. `id="liability"`.

**§8 Closing statement (NEW)** — Eyebrow "Conclusion", H2 "A determination is a record finding, not a medical guarantee.", one body paragraph exactly as specified. `border-t` only, no bottom border on the section itself.

**Return link** — Keep the existing understated "← Return to Resource Library" link block at the very bottom, with the same restrained styling.

### Global cleanup

- Remove imports/usage: `BriefingHero`, `BoardSection`, `DocJumpBar`, the in-file `sections` / `waypoints` arrays in their current shape.
- Add imports: `SectionAnchorNav`. Reuse the inline `SectionIndex` / `ClauseList` / `SplitSection` patterns established in `Accountability.tsx` / `Terms.tsx` / `Privacy.tsx`.
- `PageMeta` title stays "Verification Disclaimer"; description = the hero supporting paragraph.
- Breadcrumb stays `[{ label: "Legal" }, { label: "Verification Disclaimer" }]`.
- Every section: small mono number/eyebrow → visible H2 → intro line → body. No duplicate eyebrow/headline pairings.
- Spacing rhythm: `section-pad` with `border-b border-border/40`; closing statement gets `border-t` only.
- Strip "auditing mirror", "binding acknowledgment", "exempt from liability", and any defensive-sounding phrasing — copy is used verbatim from spec.

### Files touched

- `src/pages/VerificationDisclaimer.tsx` — full structural rebuild with exact copy.

### Out of scope

- `SectionAnchorNav` component internals
- Routing (route remains `/verification-disclaimer`)
- Design tokens, breadcrumb component
- Other legal pages (Terms, Privacy, Accountability)

