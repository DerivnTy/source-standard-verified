## Global editorial harmony pass on subpages

Bring older subpages into the same restrained editorial system used on the homepage and article templates. No branding, color, or typography redesign — a consistency pass only.

### Editorial rules (applied uniformly)

**Prose sections (default):**
- Plain text on the page background — no card chrome
- Body: `text-foreground`, ~16px, line-height 1.6–1.65, `max-width: 68ch`
- Paragraph spacing via `p + p { margin-top: 1.1em }` (already available via `.t-article-prose`)
- Section headings guide the reader; no oversized restart bars
- Hairline separators (`0.5px solid hsl(var(--border))`) between major sections when a divider is needed

**Cards allowed ONLY for:**
- Navigation cards (page → page)
- Related-links blocks
- Definition/glossary blocks (subtle bordered list, not one card per item)
- Warning/callout blocks
- Comparison blocks
- Registry / listing records

**Removed patterns:**
- `01 / 04` numbered counters on prose sections
- One-card-per-paragraph stacks
- Oversized muted body text
- Landing-page module rhythm inside institutional docs
- Local `cardChrome` primitives around every clause

**Reused primitives:**
- `ArticleHeader` (masthead path — `category` prop) for page headers
- `ArticleSection variant="prose"` for body sections
- `ArticleSection variant="callout"` for genuine callouts / related links
- `BoardDefList` for term/description lists where appropriate

### Pages in scope (phased)

**Phase 1 — Legal / policy (highest priority, worst offenders):**
- `src/pages/Privacy.tsx`
- `src/pages/Terms.tsx`
- `src/pages/VerificationDisclaimer.tsx`

**Phase 2 — Institutional:**
- `src/pages/Governance.tsx`
- `src/pages/Accountability.tsx`
- `src/pages/MedicalAdvisory.tsx`
- `src/pages/About.tsx`

**Phase 3 — Operational / informational:**
- `src/pages/HowItWorks.tsx`
- `src/pages/StatusDefinitions.tsx`
- `src/pages/ForVendors.tsx`
- `src/pages/Partners.tsx`
- `src/pages/ReportConcern.tsx`
- `src/pages/Contact.tsx`

Out of scope for this pass: Home, Learn index/article/news/FAQ pages (already aligned), Registry / Greenlist / Vendor / Advisor / Library-article pages (those have their own record/listing chrome and are correct).

### Recomposition template (illustrated with Privacy)

Current: `BriefingHero` + `SectionAnchorNav` + per-clause `PrivacyRow` cards + `01 / 04` counters + local `SectionHeader` with muted intro.

New:
```
ArticleHeader
  category = "Policy · Privacy"
  title    = "Privacy"
  lead     = <one-sentence purpose>

ArticleSection variant="prose"
  <intro paragraphs, plain>

ArticleSection variant="prose" title="What information we maintain"
  <lead paragraph>
  <BoardDefList items=PARTITIONING>   // term/description, no card-per-row

ArticleSection variant="prose" title="How records are collected"
  <BoardDefList items=COLLECTION>

ArticleSection variant="prose" title="Retention"
  <BoardDefList items=RETENTION>

ArticleSection variant="prose" title="Access and use">
  <prose>

ArticleSection variant="callout" title="Data requests or questions">
  <contact lines>

<Back to Home>  // optional quiet link, same pattern as article footer
```

Drop: `WAYPOINTS` / `SectionAnchorNav` (not needed on a linear editorial doc), `Eyebrow`, `SectionHeader`, `PrivacyCard`, `PrivacyRow`, `cardChrome`, all `n:` counter fields (unused after refactor — leave the data shape as `{ t, d }`).

Apply the same recomposition pattern page-by-page across Phase 1–3. Where a page already has a legitimate content object (e.g. AdvisoryBoard member cards, StatusDefinition status legend), keep the card — that's a "genuine object" per the rules.

### Verification
- `bunx tsgo --noEmit` passes after each phase.
- Visual spot-check at 390×844 and 1280×800 for one page per phase (Privacy, Governance, HowItWorks) to confirm: plain prose on bg, no `01/04` counters, no boxed paragraphs, callouts only where semantically real.
- No route or SEO changes; `PageMeta` retained.

### Delivery
Ship in three PR-sized commits (one per phase) so review is tractable, but execute end-to-end in this session unless the user pauses.

### Explicitly not changed
- Design tokens, colors, fonts
- Component APIs of `ArticleHeader` / `ArticleSection` / `BoardDefList`
- Routes, data models, or copy (only trimming counter fields no longer rendered)
- Registry, Greenlist, Vendor, Advisor, Library-article pages
