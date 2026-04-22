

## Medical Advisory Board — Public Oversight Layer

Reframe `src/pages/MedicalAdvisory.tsx` from an internal charter file into a public-facing oversight page. Strip the dominant `§1 / §2 / SEAT-NN / R-NN` administrative scaffolding, sequence the page around credibility (existence → role → roster → boundaries → responsibilities → bridge), and let the board's authority come from clarity, not coding.

---

### Section sequence

**1 · Hero (replace `BriefingHero` invocation)**
Match the navy hero used on Home / Greenlist / Verified Vendors for tonal consistency.
- `tone`: `navy`
- `category`: `Governance & Oversight`
- `title`: `Medical Advisory Board`
- `statement`: `The Source Standard framework is reviewed under independent medical and legal oversight. The Board governs the standards behind every public determination — it does not produce listings, market clinics, or treat patients.`
- Drop `docId`, `metadata`, `verifiedOn`. No actions.

**2 · "Why this Board exists" — short three-statement row**
Light surface, no cards, hairline dividers between columns:
1. `Public determinations need a framework` — Source Standard publishes verification status, not opinion. Those determinations follow a defined framework.
2. `Frameworks need governance` — the Board reviews, ratifies, and maintains that framework on a recurring cadence.
3. `Governance is bounded` — the Board does not produce listings, market clinics, or evaluate patients. It governs the logic by which listings are created.

**3 · Role in the framework — four numbered functions**
Muted surface. Replace the existing §3 layout with a quieter `dl`-style block, no left-rail title column dominating:
- `01 · Defines scope` — establishes what the framework does and does not verify.
- `02 · Ratifies criteria` — approves the criteria used to evaluate vendors, pharmacies, and upstream sources.
- `03 · Reviews determinations` — spot-checks recorded determinations against underlying evidence on a recurring cadence.
- `04 · Authorizes revisions` — signs off on versioned framework changes and records rationale.
Render as a clean numbered list with hairline dividers, no `§` prefix, no bordered card shell.

**4 · Board roster — editorial member cards**
Light surface. Keep all six members and `View profile →` links, but rebuild the card to feel distinguished, not coded:
- Remove the top `Roster · SS-MAB-2026.01 · 06 appointed seats · Active` strip.
- Remove `SEAT · 01` mono labels under each photo.
- Remove the `MAB-01` footer mono code on each card.
- Apply `BOARD_TITLE_OVERRIDES` (already defined) so chair / USP / regulatory titles read as oversight roles, not generic seats.
- Card layout: portrait left (`h-20 w-20`, square with hairline border, unchanged), then name + credentials as the dominant anchor, board title in primary weight beneath, specialization in muted text, then a single muted line combining `jurisdiction · years practicing` (not a dl grid). Below the divider, the `shortSummary` reads as the rationale for inclusion. `View profile →` stays as a quiet text link, right-aligned.
- 2-up grid on desktop, single column on mobile. Hairline dividers between cards via `gap-px bg-border` (existing pattern), no shadows, no rounded corners.

**5 · Scope & boundaries — new dedicated section**
Muted surface. Two-column layout: short left-rail heading `Scope & boundaries`, right rail four plain statements as a short list (no numbering, no codes):
- The Board governs the framework.
- The Board does not evaluate or treat patients.
- The Board does not provide individualized medical advice through Source Standard.
- The Board's mandate is limited to criteria, review logic, scope, and oversight of public determinations.
This replaces the current §2 paragraph block and elevates the boundary statement to its own dedicated section — it is one of the most important trust elements on the page.

**6 · Responsibilities — simplified list**
Light surface. Keep the seven `responsibilities` from `src/data/advisoryBoard.ts` and continue using `RESPONSIBILITY_TITLE_OVERRIDES` for human-readable titles, but:
- Drop the `Code / Responsibility / Description` table header strip.
- Drop the visible `R-01 / R-02` code column.
- Render as a plain `dl` definition list: bold title (`Confirms audit determinations`) on one line, muted description beneath. Hairline dividers between rows. No bordered card shell, no surface tint.

**7 · Bridge — relationship to the rest of the site**
Light surface, calmer than the current "Read deeper" bordered band. Three quiet text links in a single row (or stacked on mobile), each with a short one-line description:
- `How verification works →` `/how-it-works` — the protocol the Board governs.
- `Accountability & enforcement →` `/accountability` — what happens when verification fails.
- `About Source Standard →` `/about` — the organization the Board oversees.

**8 · Footer — flat citation only**
Keep `DocSignature` (it's the global signature, fine to retain). Replace the current `Cite as · Source Standard, Medical Advisory Board, SS-MAB-2026.01…` band with a single muted line at the bottom — no surface tint, no `meta-label` mono prefix. The internal doc ID can stay inside the citation sentence (deeper context), just not as a styled chip.

### Visual rules across the page

- No visible `§1 / §2 / §3 / §4` section codes anywhere on the page.
- No visible `SEAT · NN`, `MAB-NN`, `R-NN`, `Roster · SS-MAB-2026.01` chips.
- Section eyebrows use the existing muted mono pattern but read as plain phrases (`Why this Board exists`, `Role in the framework`, `Scope & boundaries`, `Responsibilities`, `Continue reading`).
- Surfaces alternate `bg-background` ↔ `bg-surface-muted` for rhythm, no new tokens.
- All borders/dividers are existing `border-border` hairlines. No card shadows, no rounded corners introduced.
- Spacing uses existing `container-wide` and `py-12 md:py-16`.

### Files touched

- `src/pages/MedicalAdvisory.tsx` — rewrite the page body. Replace navy hero invocation, add "Why this Board exists" 3-up, restructure role section without `§` prefixes, rebuild roster cards (remove SEAT / MAB codes, keep portraits + `View profile →`), add dedicated Scope & boundaries section, simplify Responsibilities into a plain `dl` list (no R-codes), replace Read deeper band with three quiet bridge links, flatten the Cite line.

### What stays the same

`BriefingHero`, `Breadcrumb`, `PageMeta`, `DocSignature`, every member in `src/data/advisoryBoard.ts`, every responsibility in `responsibilities`, both override maps already defined in the page, all routes (`/medical-advisory/:slug`, `/governance`, `/about`, `/accountability`, `/how-it-works`), the navy/cream global accent system, and every other page on the site.

