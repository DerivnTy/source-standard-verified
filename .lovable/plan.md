

## About Page — Exact Execution Rebuild

Rebuild `src/pages/About.tsx` into nine ordered sections using the exact wording provided. Mirror the institutional composition pattern established on the Medical Advisory Board and Verification pages so this page reads as the official institutional definition of Source Standard.

### Section-by-section

**§1 Hero** — Replace `BriefingHero` with the same restrained custom hero used on MAB/Verification. Eyebrow "Organization & Mandate", H1 (the long headline as specified), one supporting paragraph. No navy tone, no decoration.

**§2 Statement of purpose (NEW)** — Sits between hero and contents nav. Eyebrow "Purpose", H2 "What Source Standard exists to do", two body paragraphs exactly as specified. Single contained column.

**§3 Contents navigation** — Replace `DocJumpBar` with the slim `SectionAnchorNav` used on MAB/Verification. Five waypoints: `01 Context`, `02 Boundaries`, `03 Objectives`, `04 Scope`, `05 Related Pages`.

**§4 Context** — 12-col split layout. Left rail = `01` + "Context" + intro "Why this framework exists." Right = single body paragraph as specified (paragraph-driven per spec).

**§5 Boundaries** — Same split composition. Eyebrow `02`, H2 "Operational Boundaries", intro "What the organization does not do." Right side renders the five exact lines as a clean bordered divided list (matches MAB Scope & boundaries treatment) — no callout decoration.

**§6 Objectives** — Same split composition. Eyebrow `03`, H2 "Strategic Objectives", intro "Who the framework is designed to serve." Two numbered clauses (For Consumers, For Operators) using the exact copy.

**§7 Scope** — Same split composition. Eyebrow `04`, H2 "Defined Scope", intro "What the framework is built to maintain and publish." Four numbered clauses (Public registry, Upstream reference layer, Educational reference, Ongoing review) using the exact copy.

**§8 Related pages** — Same split composition. Eyebrow `05`, H2 "Related Pages", intro "Further reading on oversight, standards, and verification methodology." Right side: clean bordered divided list of four `Link` rows (Governance & Oversight → /governance, Verification Protocol → /how-it-works, Status Definitions → /status-definitions, Enforcement → /accountability) with supporting line and quiet "View" affordance per row. Lighter than core sections, no oversized cards.

**§9 Closing statement (NEW)** — Eyebrow "Conclusion", H2 "A public-reference system with defined limits.", one body paragraph as specified. Restrained closing with subtle top hairline, no bottom border.

### Global cleanup

- Remove imports: `BriefingHero`, `BoardSection`, `DocJumpBar`.
- Add imports: `SectionAnchorNav`, `Link` (kept for §8).
- Update `PageMeta` title to "About" and description to the new hero supporting paragraph.
- Update breadcrumb label remains "About".
- Every section: small mono number/eyebrow → visible H2 → optional intro line → body. No duplicate eyebrow/headline pairings.
- Spacing rhythm: `section-pad` with `border-b border-border/40`; closing statement gets `border-t` only.
- Drop arrow glyphs from "View" affordances per the global restraint pass.

### Files touched

- `src/pages/About.tsx` — full structural rebuild with exact copy.

### Out of scope

- `SectionAnchorNav` component internals
- Routing
- Design tokens, breadcrumb component

