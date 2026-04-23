

## Verification Page — Exact Execution Rebuild

Rebuild `src/pages/HowItWorks.tsx` (route `/how-it-works`) into eight ordered sections using the exact wording provided. Mirror the institutional composition pattern established on the Medical Advisory Board page so this page reads as a published standard, not an enforcement manifesto. The current sticky `DocJumpBar` is replaced with the slim `SectionAnchorNav` used on the MAB page (matches the "small sticky page-position bar" referenced in the spec and stays exactly as-is from that page).

### Section-by-section

**§1 Hero** — Replace `BriefingHero` with the same restrained custom hero used on MAB. Eyebrow "Verification Framework", H1 "The Verification Standard", one supporting paragraph. No navy treatment, no decoration.

**§2 Statement of purpose (NEW)** — Sits between hero and contents nav. Eyebrow "Purpose", H2 "What this standard is designed to do", two body paragraphs exactly as specified. Single column, contained.

**§3 Contents navigation** — Replace `DocJumpBar` with `SectionAnchorNav` (the slim integrated bar). Four waypoints: `01 Audit`, `02 Surveillance`, `03 Disclosure`, `04 Boundaries`. Sticks to the top exactly like on MAB.

**§4 Audit** — 12-col split layout (left rail = `01` + "Audit" + intro line "How sourcing claims are reviewed against upstream records."; right = numbered ordered list of 4 clauses). Items use the exact new copy (Supply-chain substantiation, Registration cross-reference, Chain-of-custody review, Entity and standing review). Replaces all "forensic mapping / ghost supply" language.

**§5 Surveillance** — Same split composition. Eyebrow `02`, H2 "Surveillance", intro "How the framework monitors evidence beyond initial document review." Four clauses (Sample acquisition review, Third-party laboratory analysis, Analytical confirmation, Deficiency response). Replaces "silent purchase / immediate revocation" language.

**§6 Disclosure** — Same split composition. Eyebrow `03`, H2 "Disclosure", intro "How ongoing changes are expected to be reported and monitored." Four clauses (Change notification, Regulatory monitoring, Credential continuity, Status adjustment). Replaces "72-hour window / automated suspension" language.

**§7 Boundaries** — Eyebrow `04`, H2 "Boundaries", intro "What the framework does and does not claim." Render the four exact lines as a bordered divided list (matches MAB Scope & boundaries treatment). Single contained list, no callout decoration.

**§8 Closing statement (NEW)** — Eyebrow "Conclusion", H2 "Verification is a record standard.", one body paragraph as specified. Restrained closing, no border decoration beyond a subtle top hairline.

### Global cleanup

- Remove imports for `BriefingHero`, `DocJumpBar`, `BoardSection` — no longer used on this page.
- Add imports for `SectionAnchorNav` and `Link` is not needed (no in-text links here).
- Update `PageMeta` title to "Verification · Source Standard" and description to the new hero supporting paragraph.
- Update breadcrumb label from "Verification Standard" to "Verification".
- Every section: small mono number/eyebrow → visible H2 → optional intro line → body. No duplicate eyebrow/headline pairings.
- Spacing rhythm: `section-pad` with `border-b border-border/40` between sections; closing statement bottom border omitted.
- Strip every instance of "forensic mapping," "ghost supply," "silent purchase," "immediate status revocation," "72-hour," "automated suspension," "ISO-accredited," "DEA registrations," etc. — none survive the rewrite.

### Files touched

- `src/pages/HowItWorks.tsx` — full structural rebuild with exact copy.

### Out of scope

- `SectionAnchorNav` component internals
- Routing (route remains `/how-it-works`)
- Design tokens, breadcrumb component

