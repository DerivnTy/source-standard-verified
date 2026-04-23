

## Terms Page — Exact Execution Rebuild

Rebuild `src/pages/Terms.tsx` into ten ordered sections using the exact wording provided. Mirror the institutional composition pattern established on About / Verification / Status Definitions / Enforcement so this page reads as a serious, readable public user agreement rather than pasted boilerplate.

### Section-by-section

**§1 Hero** — Replace `BriefingHero` with the same restrained custom hero used across the rebuilt institutional pages. Eyebrow "Registry User Agreement", H1 "Terms of Use", one supporting paragraph exactly as specified. No `docId`, no metadata chips, no navy treatment.

**§2 Statement of purpose (NEW)** — Sits between hero and contents nav. Eyebrow "Purpose", H2 "How this agreement applies", two body paragraphs exactly as specified. Single contained column.

**§3 Contents navigation** — Replace `DocJumpBar` with the slim `SectionAnchorNav` used on Enforcement. Six waypoints: `01 Acceptance`, `02 Citation`, `03 Integrity`, `04 Warranty`, `05 Jurisdiction`, `06 Related Policies`.

**§4 Acceptance** — `SplitSection` layout (mirrors Enforcement §8 Re-entry — paragraph-only). Left rail: `01` + "Registry Access & Acceptance" + intro "What use of the registry means." Right: three body paragraphs exactly as specified.

**§5 Citation** — `SplitSection`. Eyebrow `02`, H2 "Citation & Data Utilization", intro "How registry entries may be referenced publicly." Right: lead body paragraph followed by `ClauseList` of 4 clauses (Audit ID, Status date, Attribution, Citation integrity) with exact copy.

**§6 Integrity** — `SplitSection`. Eyebrow `03`, H2 "Integrity & Prohibitions", intro "Conduct that is not permitted in connection with the registry or its published materials." Right: `ClauseList` of 5 clauses (Bulk extraction, Status misrepresentation, Unauthorized use of marks, Registry interference, Related enforcement) with exact copy.

**§7 Warranty** — `SplitSection`. Eyebrow `04`, H2 "Warranty & Liability", intro "How registry information should be understood and relied upon." Right: `ClauseList` of 3 clauses (Reference basis, As-is publication, Reliance limits) with exact copy.

**§8 Jurisdiction** — `SplitSection` (paragraph-only, mirrors §4). Eyebrow `05`, H2 "Jurisdiction", intro "The governing law applied to this agreement." Right: two body paragraphs exactly as specified.

**§9 Related Policies** — `SplitSection`. Eyebrow `06`, H2 "Related Policies", intro "Further reading on privacy, verification scope, enforcement, and public status meanings." Right: bordered divided list of 4 `Link` rows (title + quiet "View" affordance, no arrow glyph):
- Data Governance & Privacy Policy → `/privacy`
- Verification Disclaimer → `/verification-disclaimer`
- Accountability & Enforcement → `/accountability`
- Status Definitions → `/status-definitions`

**§10 Closing statement (NEW)** — Eyebrow "Conclusion", H2 "Public access requires clear terms of use.", one body paragraph as specified. `border-t` only, no bottom border.

### Global cleanup

- Remove imports/usage: `BriefingHero`, `BoardSection`, `DocJumpBar`, the in-file `sections` / `relatedPolicies` / `waypoints` arrays in their current shape.
- Add imports: `SectionAnchorNav`. Reuse the `ClauseList` / `SplitSection` / `SectionIndex` patterns from `Accountability.tsx` (defined inline in this page; no new shared component).
- `PageMeta` title becomes "Terms"; description = the hero supporting paragraph.
- Breadcrumb stays `[{ label: "Legal" }, { label: "Terms" }]`.
- Every section: small mono number/eyebrow → visible H2 → optional intro line → body. No duplicate eyebrow/headline pairings.
- Spacing rhythm: `section-pad` with `border-b border-border/40`; closing statement gets `border-t` only.
- No arrow glyphs on "View" affordances.
- No threatening or theatrical phrasing — copy is used verbatim from spec.

### Files touched

- `src/pages/Terms.tsx` — full structural rebuild with exact copy.

### Out of scope

- `SectionAnchorNav` component internals
- Routing (route remains `/terms`)
- Design tokens, breadcrumb component
- Other legal pages (Privacy, Verification Disclaimer)

