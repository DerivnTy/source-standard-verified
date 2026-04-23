

## Medical Advisory Board — Exact Execution Rebuild

Rebuild `src/pages/MedicalAdvisory.tsx` below the sticky `SectionAnchorNav` (kept intact) into nine ordered sections with the exact copy provided. The hero is replaced with a restrained custom hero (no `BriefingHero` decoration, no `docId` chip), a new Statement of Purpose section is inserted between hero and contents nav, and a new Closing Statement section is appended after Responsibilities.

### Section-by-section

**§1 Hero** — Replace `BriefingHero` with a quieter custom hero block (single eyebrow "Medical Advisory Board", H1 "Clinical Oversight", one supporting paragraph). Removes `docId`, navy treatment, and statement framing — pure restraint per spec.

**§2 Statement of purpose (NEW)** — New section sitting between hero and the SectionAnchorNav. Eyebrow "Purpose", headline "Why the Board exists", two body paragraphs exactly as specified. Single column, contained, no decoration.

**§3 Contents navigation** — Keep `SectionAnchorNav` with the existing 5 waypoints (Mandate, Governance, Members, Scope, Responsibilities). It already renders as a slim integrated bar, anchored after the statement of purpose. No internal changes — the component already matches the "slim, quiet, integrated" direction.

**§4 Mandate** — Keep current 12-col split layout. Replace eyebrow text with `01` (matching Governance pattern), keep visible H2 "Institutional Mandate", intro line "The governing terms under which the Board operates." Body items already match exact copy — no change.

**§5 Governance** — Same structure as Mandate. Eyebrow `02`, H2 "Governance Framework", intro "The recurring functions the Board performs to maintain the standard." Items already match exact copy — no change.

**§6 Members** — Eyebrow `03`, H2 "Appointed members", add the new intro line "Independent clinicians and regulatory reviewers appointed to oversee framework standards, sourcing criteria, and public-reference integrity." Update `BOARD_TITLE_OVERRIDES` to match exact role lines. Update `advisoryBoard` data file: rename advisor-02's boardTitle to "Vice Chair · Pharmacy Sourcing Review", advisor-03 to "Member · Patient Safety & Public Clarity", advisor-04 to "Member · Pharmacy Compliance (USP Standards)", advisor-05 to "Member · Medical Reference Review", advisor-06 to "Member · Regulatory Policy & Ethics" so detail pages stay consistent. Card visual treatment stays restrained (current design already meets the "no startup team page" direction). CTA text "View profile" (drop the trailing arrow per global restraint pattern set on homepage).

**§7 Scope & boundaries** — Eyebrow `04`, H2 "Scope & boundaries". Use the four exact lines as a clean divided list (already matches). Keep current restrained layout, drop the left/right grid asymmetry — render as a single contained bordered list to feel more like a boundary statement and less like a featured callout.

**§8 Responsibilities** — Eyebrow `05`, H2 "Responsibilities", intro "Each responsibility maps to a recurring oversight activity recorded under the registry's maintenance log." Four items match exact copy. Remove the tinted `bg-surface-muted/60` band and the full-bleed negative margins — render flush on the standard background to match the "operational closing, no decorative overstatement" direction. Drop the `ShieldCheck` icon (decorative). Equal two-col grid retained.

**§9 Closing statement (NEW)** — New final section. Eyebrow "Conclusion", headline "Public trust requires independent oversight.", single body paragraph as specified. Centered single-column treatment, restrained, no border decoration beyond a top hairline.

### Global cleanup

- Every section uses: small mono number/eyebrow → visible H2 → optional intro line → body. No duplicate eyebrow/headline pairings.
- Drop trailing arrow glyphs from in-text links ("View profile" instead of "View profile →") to match the homepage restraint pass.
- Remove `ShieldCheck` import; no decorative icons in Responsibilities.
- Spacing rhythm: every section uses `section-pad` with `border-b border-border/40`; closing statement gets `border-t` only, no bottom border.
- The sticky `SectionAnchorNav` is untouched — same 5 waypoints, same component, same sticky behavior.

### Files touched

- `src/pages/MedicalAdvisory.tsx` — full structural rebuild with exact copy.
- `src/data/advisoryBoard.ts` — update 5 `boardTitle` strings so member detail pages display the same role lines published on the index. No other field changes.

### Out of scope

- `SectionAnchorNav` component internals
- `AdvisorProfile` page
- Design tokens, routing, breadcrumb component

