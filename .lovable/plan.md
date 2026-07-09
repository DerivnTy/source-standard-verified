## Batch 1 — Trust Foundation rollout

Migrate four consumer-facing pages onto the homepage's shared design system. Establish the two-mode doctrine (Consumer vs Reference) so later batches inherit it cleanly.

### Design doctrine (locked for all batches)

**Consumer Mode** — About, How Verification Works, Partners (this batch); Learn, Homepage
- Built from `PageSection`, `FeatureItem`, `NavCard`, `ProcessSteps`
- No bordered card stacks by default
- One contextual glyph per section max, following the homepage icon semantics

**Reference Mode** — Governance (this batch); later Status Definitions, Vendor Profiles, Facility Records
- Preserves `RecordHeader`, `DocJumpBar`, doc metadata, `§`-numbered anchors, `BoardCiteFooter`
- Interior content adopts the new patterns: `FeatureItem` rows replace repeated bordered cards, `ProcessSteps` for workflows, `NavCard` only for real navigation
- The document chrome stays; the boxed-card interior goes

Presentation-to-purpose mapping (applied throughout):
- Processes → `ProcessSteps`
- Navigation → `NavCard`
- Checklists → `FeatureItem` rows with `check` glyph
- Trust pillars / audiences → `FeatureItem` blocks
- Reference metadata → RecordHeader / DataStrip
- Prose → plain paragraphs inside a reading column, never wrapped in a card

### Page-by-page changes

**1. About (`src/pages/About.tsx`) — Consumer Mode**
- Keep: `BriefingHero`, breadcrumb, `SectionAnchorNav`, all copy, all waypoint IDs (`context`, `boundaries`, `objectives`, `scope`, `principles`)
- Remove local primitives: `AboutCard`, `AboutRow`, `AboutStatementRow`, `AboutLinkRow`, local `Eyebrow`, `SectionHeader`
- Rebuild each numbered section as a `PageSection` with the existing question-form heading, intro, and the clause list rendered as `FeatureItem` rows (no borders, no `01 / 04` counters, no per-row cards)
- §3 Purpose and §9 Institutional Role: unwrap from `AboutCard` into prose paragraphs inside a `PageSection`
- Principles section keeps its 2-column layout using a plain grid of `FeatureItem` blocks

**2. How Verification Works (`src/pages/HowItWorks.tsx`) — Consumer Mode**
- Keep: `BriefingHero`, breadcrumb, `PageMeta`, all copy, disclaimer footer
- Remove local primitives (`Eyebrow`, `SectionTitle`, `Prose`, `SectionDivider`) and the ad-hoc 4-column step grid
- What Is Verification / Why It Matters → `PageSection` with prose intro
- 4-step flow → `ProcessSteps` (already the homepage pattern)
- "What verified means" → `PageSection` with `FeatureItem` rows using `check` glyph
- "What verified does not mean" → `PageSection` with plain rows using `minus` glyph (semantic contrast, not decorative)
- Section dividers come from `PageSection`'s built-in `bordered` prop; delete the manual hairlines

**3. Partners (`src/pages/Partners.tsx`) — Consumer Mode**
- Keep: `BriefingHero`, `PageMeta`, all copy, Open logo asset
- Replace all four `Section`+`SectionHeading` blocks with `PageSection`
- "Why partners?" → `PageSection` with prose intro only
- Partner categories → `PageSection` with `FeatureItem` blocks (2-col grid), removes the current `border border-border ... p-6` cards
- Featured Partner (Open) → `PageSection` keeps the logo + prose; the outer bordered container becomes a lightweight framed block only around the logo (destination-worthy content), prose sits below without card chrome
- "Two Different Questions" → `PageSection` with two `FeatureItem` blocks side by side, no card borders

**4. Governance (`src/pages/Governance.tsx`) — Reference Mode**
- Keep intact: `RecordHeader`, `DocJumpBar`, `BoardSection`, `BoardCiteFooter`, `PageMeta`, breadcrumb, waypoint IDs, doc IDs, `Callout`, all statutory copy and citations, the authorities table structure
- §1 Advisory: the roster placeholder table stays as a reference table (institutional data)
- §2 Anchors: statutory table stays as a reference table (institutional data)
- §3 Neutrality: prose stays as prose in `BoardSection` — no change
- §4 Read deeper: replace the bordered grid of link tiles with `NavCard`s (navigation → navigation pattern) inside the existing `BoardSection`
- Icon audit: remove any decorative glyphs inside `BoardSection` bodies; keep `§`-numbering as the reference identifier

### Shared primitives (no new components this batch)

The current `src/components/system/` primitives already cover Batch 1. If Batches 2–3 surface recurring patterns (verification timeline, evidence panel, facility relationship), they'll be promoted then — not speculatively now.

Update `src/components/system/FeatureItem.tsx` doc comment to add the two-mode doctrine so it's the single source of truth future pages read from.

### Preserve (non-negotiable)

Colors, fonts, routes, verification logic, legal disclaimers, all statutory citations, every waypoint ID (deep links must not break), all breadcrumb structure, all `PageMeta`/JSON-LD.

### Verification

- `bunx tsgo --noEmit`
- Playwright mobile screenshots (390×1800) of `/about`, `/how-it-works`, `/partners`, `/governance`; verify:
  - Consumer pages read like the homepage (no bordered card stacks, no `01/04` counters)
  - Governance retains RecordHeader + DocJumpBar + §-numbering
  - No spacing/alignment regressions
  - Anchor jumps still land correctly

### Out of scope (this batch)

Batches 2 (Learn / Status Definitions / education) and 3 (Vendor Profiles / Facility Records / Registry details). Copy rewrites beyond minor clarity fixes. Any homepage changes.
