

## Privacy Page — Exact Execution Rebuild

Rebuild `src/pages/Privacy.tsx` into nine ordered sections using the exact wording provided. Mirror the institutional composition pattern established on About / Accountability / Terms so this page reads as a serious public privacy standard rather than internal compliance jargon.

### Section-by-section

**§1 Hero** — Replace `BriefingHero` with the same restrained custom hero used on the rebuilt Terms / Accountability pages. Eyebrow "Data Governance Protocol", H1 "Data Governance & Privacy", one supporting paragraph exactly as specified. No `docId`, no metadata chips, no navy treatment.

**§2 Statement of purpose (NEW)** — Sits between hero and contents nav. Eyebrow "Purpose", H2 "How data is handled under the framework", two body paragraphs exactly as specified. Single contained column.

**§3 Contents navigation** — Replace `DocJumpBar` with `SectionAnchorNav` (matching Terms / Accountability). Five waypoints: `01 Partitioning`, `02 Collection`, `03 Retention`, `04 Processing`, `05 Inquiries`.

**§4 Partitioning** — `SplitSection`. Left rail: `01` + "Record Partitioning" + intro "How public registry information is separated from protected audit material." Right: `ClauseList` of 3 clauses (Public registry data, Protected audit material, Access restriction) with exact copy. Section IDs aligned to anchor: `id="partitioning"`.

**§5 Collection** — `SplitSection`. Eyebrow `02`, H2 "Scope of Collection", intro "What categories of data may be collected under the framework." Right: `ClauseList` of 4 clauses (Vendor intake, Surveillance data, Concern reports, Site analytics) with exact copy. `id="collection"`.

**§6 Retention** — `SplitSection`. Eyebrow `03`, H2 "Data Retention", intro "How long records are maintained under different conditions." Right: `ClauseList` of 4 clauses (Active records, Historical determinations, Withdrawn or denied applications, Secure disposal) with exact copy. `id="retention"`.

**§7 Processing** — `SplitSection` (paragraph-only, mirrors Terms §Acceptance / §Jurisdiction). Eyebrow `04`, H2 "Authorized Processing", intro "How data may be processed in support of the framework." Right: two body paragraphs exactly as specified. `id="processing"`.

**§8 Inquiries** — `SplitSection` (paragraph-based with contact line). Eyebrow `05`, H2 "Inquiries & Requests", intro "How privacy-related requests may be made." Right: two body paragraphs followed by a small, restrained contact line "Data Privacy Officer: privacy@sourcestandard.org" rendered as a `mailto:` link with quiet, non-decorative styling. `id="inquiries"`.

**§9 Closing statement (NEW)** — Eyebrow "Conclusion", H2 "Public transparency requires disciplined record handling.", one body paragraph exactly as specified. `border-t` only, no bottom border.

### Global cleanup

- Remove imports/usage: `BriefingHero`, `BoardSection`, `DocJumpBar`, the in-file `sections` / `waypoints` arrays in their current shape.
- Add imports: `SectionAnchorNav`. Reuse the inline `ClauseList` / `SplitSection` / `SectionIndex` patterns established in `Accountability.tsx` and `Terms.tsx`.
- `PageMeta` title becomes "Privacy"; description = the hero supporting paragraph.
- Breadcrumb stays `[{ label: "Legal" }, { label: "Privacy" }]`.
- Every section: small mono number/eyebrow → visible H2 → intro line → body. No duplicate eyebrow/headline pairings.
- Spacing rhythm: `section-pad` with `border-b border-border/40`; closing statement gets `border-t` only.
- Strip "PAM", "forensic protocol", and any whitepaper-flavored phrasing — copy is used verbatim from spec.

### Files touched

- `src/pages/Privacy.tsx` — full structural rebuild with exact copy.

### Out of scope

- `SectionAnchorNav` component internals
- Routing (route remains `/privacy`)
- Design tokens, breadcrumb component
- Other legal pages (Terms, Verification Disclaimer, Accountability)

