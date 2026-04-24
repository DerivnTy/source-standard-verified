## Compliance Monitoring & Record Maintenance — Structural UI Pass

**File:** `src/pages/Accountability.tsx` only.
**Route:** `/accountability` (unchanged).

### What stays untouched
- `BriefingHero` (navy, "Compliance Monitoring & Record Maintenance"), hero category, statement, `docId`.
- `PageMeta`, `Breadcrumb`.
- `SectionAnchorNav` and existing `WAYPOINTS` (`attestations`, `disclosure`, `triggers`, `actions`, `reentry`, `related`).
- All `ATTESTATIONS`, `DISCLOSURE`, `TRIGGERS`, `ACTIONS`, `RELATED` data and copy.
- All re-entry and closing paragraphs (preserved verbatim).
- Existing `RELATED` routes:
  - `/how-it-works` — Verification Protocol
  - `/status-definitions` — Status Definitions
  - `/report-a-concern` — Reporting & Registry Review
  - `/governance` — Compliance & Operating Boundaries
- Header, footer, hamburger, global CSS, shared components, all other pages.

Note: existing Re-entry section ID is `reentry` (not `re-entry`). I will preserve `reentry` to avoid breaking the WAYPOINTS anchor.

### Local primitives (added inside the file, non-exported)

1. **ComplianceCard** — white card wrapper (`24px` padding, `12px` radius, `0.5px` border).
2. **ComplianceRow** — compact row (`14px 16px` padding) with title left + zero-padded `NN / TT` index right; description below in muted `13px / 1.55`.
3. **StatementRow** — slim row (`12px 14px`) with mono index left + statement text right (declared but only used if needed; not required by spec sections — will be omitted if every section uses `ComplianceRow`).
4. **RelatedLinkRow** — flex link row matching About / Status Definitions: card chrome, `padding 14px 16px`, `flex items-start justify-between gap-4`, text column `min-w-0`, `VIEW ›` self-centered, `11px uppercase font-semibold` primary navy with `ChevronRight` icon.
5. **SectionHeader** — mono index + `t-section-title-sm` heading + `13.5px / 1.55` muted intro.
6. **Eyebrow** — `font-mono uppercase 10px / 0.14em` muted label.

### Page composition

```text
Hero (BriefingHero, untouched)
SectionAnchorNav (preserved)

§1 Purpose             [40px / 40px, border-b]
  ComplianceCard
    eyebrow: RECORD MAINTENANCE
    h2: How compliance is maintained after verification
    3 body paragraphs (verbatim, 13.5px / 1.6 muted, 14px gap)

§2 Attestations        [40px / 40px, border-b]   id="attestations"
  SectionHeader 01 / Attestations / intro
  Stack of ComplianceRows (gap 10px) — 4 rows, indices 01/04 … 04/04

§3 Disclosure          [40px / 40px, border-b]   id="disclosure"
  SectionHeader 02 / Disclosure / intro
  Explanatory paragraph (13.5px / 1.55 muted, 16px margin-bottom)
  Stack of ComplianceRows (gap 10px) — 6 rows, 01/06 … 06/06

§4 Triggers            [40px / 40px, border-b]   id="triggers"
  SectionHeader 03 / Triggers / intro
  Stack of ComplianceRows (gap 10px) — 6 rows, 01/06 … 06/06

§5 Actions             [40px / 40px, border-b]   id="actions"
  SectionHeader 04 / Actions / intro
  Stack of ComplianceRows (gap 10px) — 5 rows, 01/05 … 05/05

§6 Re-entry            [40px / 40px, border-b]   id="reentry"
  ComplianceCard
    eyebrow: 05 · RE-ENTRY
    h2: Re-entry
    intro line: How a listing may return after suspension or removal.
    3 body paragraphs (verbatim, 13.5px / 1.6 muted, 14px gap)

§7 Related Documents   [40px / 40px, border-b]   id="related"
  SectionHeader 06 / Related Documents / intro
  Stack of RelatedLinkRows (gap 10px) — 4 links, existing routes preserved
    (each row gets a short muted description derived from the link's purpose;
     labels remain exactly as in RELATED data)

§8 Closing             [40px / 64px, no border]
  ComplianceCard
    eyebrow: CONTINUING SUPPORT
    h2: Verification requires continuing record support.
    body paragraph (verbatim, 13.5px / 1.6 muted)

Footer (untouched)
```

### Spacing & style
- Sections: `paddingTop: 40px`, `paddingBottom: 40px`, `border-bottom: 0.5px solid hsl(var(--border))`.
- Final section: `paddingBottom: 64px`, no bottom border.
- Cards: `12px` radius, `0.5px` border, `24px` interior padding.
- Rows: `12px` radius, `0.5px` border, `14px 16px` padding.
- Stacks: ComplianceRows `10px` gap, RelatedLinkRows `10px` gap.
- All indices zero-padded (`01`, `02 / 06`, etc.).

### Removed
- `SectionIndex`, `ClauseList`, `SplitSection` helpers.
- Sticky two-column 4/8 grid layout on every section.
- `divide-y` / `border-y` ordered lists.
- `t-body-md` editorial slabs and `section-pad` usage.

### Acceptance
Page renders as: Hero → SectionAnchorNav → Purpose card → Attestations row stack → Disclosure intro + row stack → Triggers row stack → Actions row stack → Re-entry card → Related Documents link rows → Closing card → Footer. All copy preserved. Matches the institutional system used on Advisory Board, Resource Library, Verification Protocol, About, and Status Definitions.
