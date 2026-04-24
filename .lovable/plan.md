## Terms of Use — Structural UI Pass

**File:** `src/pages/Terms.tsx` only.
**Route:** `/terms` (unchanged).

### What stays untouched
- `BriefingHero` (navy, "Terms of Use", "Registry User Agreement"), title, statement, `docId`.
- `PageMeta`, `Breadcrumb`.
- `SectionAnchorNav` and existing `WAYPOINTS` (`acceptance`, `citation`, `integrity`, `warranty`, `jurisdiction`, `related`).
- All clause data (`CITATION`, `INTEGRITY`, `WARRANTY`) and copy.
- All Acceptance, Jurisdiction, and Closing paragraphs (preserved verbatim).
- Existing `RELATED` routes (preserved as-is):
  - `/privacy` — Data Governance & Privacy Policy
  - `/verification-disclaimer` — Verification Disclaimer
  - `/accountability` — Compliance & Operating Boundaries
  - `/status-definitions` — Status Definitions
- Header, footer, hamburger, global CSS, shared components, all other pages.

### Local primitives (added inside the file, non-exported)

1. **TermsCard** — white card wrapper (`24px` padding, `12px` radius, `0.5px` border).
2. **TermsRow** — compact row (`14px 16px` padding) with title left + zero-padded `NN / TT` index right; muted description below at `13px / 1.55` with `6px` top margin.
3. **RelatedLinkRow** — flex link row matching About / Status Definitions / Compliance: card chrome, `padding 14px 16px`, `flex items-start justify-between gap-4`, text column `min-w-0`, `VIEW ›` self-centered, `11px uppercase font-semibold` primary navy with `ChevronRight` icon.
4. **SectionHeader** — mono index + `t-section-title-sm` heading + `13.5px / 1.55` muted intro.
5. **Eyebrow** — `font-mono uppercase 10px / 0.14em` muted label.

### Page composition

```text
Hero (BriefingHero, untouched)
SectionAnchorNav (preserved)

§1 Purpose                      [40px / 40px, border-b]
  TermsCard
    eyebrow: TERMS PURPOSE
    h2: How this agreement applies
    2 body paragraphs (verbatim, 13.5px / 1.6 muted, 14px gap)

§2 Registry Access & Acceptance [40px / 40px, border-b]   id="acceptance"
  TermsCard
    eyebrow: 01 · ACCEPTANCE
    h2: Registry Access & Acceptance
    intro line: What use of the registry means.
    3 body paragraphs (verbatim, 13.5px / 1.6 muted, 14px gap)

§3 Citation & Data Use          [40px / 40px, border-b]   id="citation"
  SectionHeader 02 / Citation & Data Use / intro
  Explanatory paragraph (13.5px / 1.55 muted, 16px margin-bottom)
  Stack of TermsRows (gap 10px) — 4 rows, indices 01/04 … 04/04

§4 Integrity & Prohibitions     [40px / 40px, border-b]   id="integrity"
  SectionHeader 03 / Integrity & Prohibitions / intro
  Stack of TermsRows (gap 10px) — 5 rows, indices 01/05 … 05/05

§5 Warranty & Liability         [40px / 40px, border-b]   id="warranty"
  SectionHeader 04 / Warranty & Liability / intro
  Stack of TermsRows (gap 10px) — 4 rows, indices 01/04 … 04/04

§6 Jurisdiction                 [40px / 40px, border-b]   id="jurisdiction"
  TermsCard
    eyebrow: 05 · JURISDICTION
    h2: Jurisdiction
    intro line: The governing law applied to this agreement.
    2 body paragraphs (verbatim, 13.5px / 1.6 muted, 14px gap)

§7 Related Policies             [40px / 40px, border-b]   id="related"
  SectionHeader 06 / Related Policies / intro
  Stack of RelatedLinkRows (gap 10px) — 4 links, existing routes preserved
    (each row gets a short muted description, labels exactly as in RELATED data)

§8 Closing                      [40px / 64px, no border]
  TermsCard
    eyebrow: PUBLIC ACCESS
    h2: Public access requires clear terms of use.
    body paragraph (verbatim, 13.5px / 1.6 muted)

Footer (untouched)
```

### Spacing & style
- Sections: `paddingTop: 40px`, `paddingBottom: 40px`, `border-bottom: 0.5px solid hsl(var(--border))`.
- Final section: `paddingBottom: 64px`, no bottom border.
- Cards: `12px` radius, `0.5px` border, `24px` interior padding.
- Rows: `12px` radius, `0.5px` border, `14px 16px` padding.
- Stacks: TermsRows `10px` gap, RelatedLinkRows `10px` gap.
- All indices zero-padded (`01`, `02 / 04`, etc.).

### Removed
- `SectionIndex`, `ClauseList`, `SplitSection` helpers.
- Sticky two-column 4/8 grid layout.
- `divide-y` / `border-y` ordered lists.
- `t-body-md` editorial slabs and `section-pad` usage.

### Acceptance
Page renders as: Hero → SectionAnchorNav → Purpose card → Registry Access & Acceptance card → Citation row stack → Integrity & Prohibitions row stack → Warranty & Liability row stack → Jurisdiction card → Related Policies link rows → Closing card → Footer. All copy preserved. Matches the institutional system used on Compliance, Status Definitions, About, Verification Protocol, Resource Library, and Advisory Board.
