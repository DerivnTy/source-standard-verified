

## Enforcement Page — Exact Execution Rebuild

Rebuild `src/pages/Accountability.tsx` (route `/accountability`) into ten ordered sections using the exact wording provided. Mirror the institutional composition pattern established on About, Verification, Medical Advisory, and Status Definitions pages so this page reads as a published compliance standard, not a punitive notice.

### Section-by-section

**§1 Hero** — Replace `RecordHeader` with the same restrained custom hero used across the rebuilt institutional pages. Eyebrow "Governance & Oversight", H1 "Compliance Monitoring & Enforcement Protocols", one supporting paragraph. No `DOC_ID`, no `verifiedOn`, no metadata chips.

**§2 Statement of purpose (NEW)** — Sits between hero and contents nav. Eyebrow "Purpose", H2 "How compliance is maintained after verification", two body paragraphs exactly as specified. Single contained column.

**§3 Contents navigation** — Replace `DocJumpBar` with the slim `SectionAnchorNav`. Six waypoints: `01 Attestations`, `02 Disclosure`, `03 Triggers`, `04 Actions`, `05 Re-entry`, `06 Related Documents`.

**§4 Attestations** — 12-col split layout. Left rail = `01` + "Attestations" + intro "The continuing representations accepted when a Verified standing is issued." Right = numbered ordered list of 4 clauses (Integrity of submission, Supply-chain transparency, Renewal and review cooperation, Public-claims alignment) with exact copy.

**§5 Disclosure** — Same split composition. Eyebrow `02`, H2 "Disclosure", intro "Events that must be reported to the framework when they materially affect the published record." Right side: lead body paragraph (containing the 72-hour expectation as plain prose, not a `Callout` badge), followed by 6 numbered clauses (Change in supplier or upstream source, Change in licensure status, Change in ownership or operating control, Change in reviewed category scope, Change in public-facing claims, Regulatory action).

**§6 Triggers** — Same split composition. Eyebrow `03`, H2 "Triggers", intro "Events that may reopen review of an existing listing, regardless of its renewal cycle." Right = 6 numbered clauses (Consumer and clinician reports, Upstream-source removal or suspension, Regulatory action, Claims divergence, Non-response, Credential lapse).

**§7 Actions** — Same split composition. Eyebrow `04`, H2 "Actions", intro "How the framework responds when a reviewed record no longer supports the published status." Right = 5 numbered clauses (Administrative inquiry, Scope reduction, Suspension, Removal, Public note). Equal, restrained treatment — no punitive styling.

**§8 Re-entry** — Same split composition. Eyebrow `05`, H2 "Re-entry", intro "How a listing may return after suspension or removal." Right = two body paragraphs as specified. No `Callout` badge, no "permanent record" decoration.

**§9 Related documents** — Same split composition. Eyebrow `06`, H2 "Related Documents", intro "Further reading on the framework, public statuses, and reporting logic." Right side: bordered divided list of 4 `Link` rows:
- Verification Protocol & Audit Methodology → `/how-it-works`
- Status Definitions → `/status-definitions`
- Reporting & Market Intelligence → `/report-a-concern`
- Regulatory Alignment & Oversight → `/governance`

Each row shows title + quiet "View" affordance (no arrow glyph).

**§10 Closing statement (NEW)** — Eyebrow "Conclusion", H2 "Verification requires continuing record support.", one body paragraph. Restrained closing with `border-t` only, no bottom border.

### Global cleanup

- Remove imports: `RecordHeader`, `BoardSection`, `BoardCiteFooter`, `DocJumpBar`, `Callout`, `DOC_ID`/`VERIFIED_ON` constants, and the `BoardCiteFooter` block at the end.
- Add imports: `SectionAnchorNav`. Keep `Link` for §9.
- Update `PageMeta` title to "Enforcement" and description to the hero supporting paragraph.
- Update breadcrumb: `[{ label: "About", to: "/about" }, { label: "Enforcement" }]`.
- Every section: small mono number/eyebrow → visible H2 → optional intro line → body. No duplicate eyebrow/headline pairings.
- Spacing rhythm: `section-pad` with `border-b border-border/40`; closing statement gets `border-t` only.
- Drop arrow glyphs from "View" affordances per the global restraint pass.
- Strip the `72h` callout badge — the seventy-two hour expectation lives in the prose intro of §5 only.

### Files touched

- `src/pages/Accountability.tsx` — full structural rebuild with exact copy.

### Out of scope

- `SectionAnchorNav` component internals
- Routing (route remains `/accountability`)
- Design tokens, breadcrumb component

