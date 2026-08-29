# Site-wide institutionalization pass

Scope is the whole public site (~50 routes). Doing it as one undifferentiated sweep would produce shallow edits everywhere, so it runs in five phases, each shipped and reviewable on its own. No invented facts anywhere: missing data renders as "Not independently established by Source Standard".

## Phase 1 — Density system + shared institutional modules

The foundation everything else uses. Without this, later pages just re-invent spacing.

- Retune vertical rhythm tokens in `index.css` / `PageSection`: cut oversized section padding (desktop and mobile separately), so whitespace marks hierarchy instead of emptiness.
- Mobile-specific scale: cap hero/H1 sizes so a heading never eats the first screen; tighten stacked-card gutters.
- New reusable modules in `src/components/system`:
  - `KeyFacts` — labelled fact grid, 2–3 col desktop / stacked mobile
  - `EvidencePanel` — sourced claims with citation lines
  - `DefinitionCallout` — inline term explainer (503A, 503B, COA, endotoxin…)
  - `DataTable` — responsive table that becomes labelled rows on mobile
  - `Timeline` — dated regulatory/inspection events
  - `RelatedRail` — contextual next-steps module
  - `MethodologyNote` — what this does and does not mean
- A single glossary source (`src/data/glossary.ts`, already present) wired to `DefinitionCallout` so every term explanation is consistent sitewide.

## Phase 2 — Entity pages (clinics, facilities)

Highest traffic and highest credibility stakes.

- Restructure `VendorProfile` and `GreenlistProfile` into a desktop two-column system: main record column + sticky contextual sidebar (status, key facts, related entities, methodology links, last reviewed).
- Section order: Overview → Source Standard status → What this status means → Provider/facility information → Sourcing → Verification evidence → Testing → Regulatory/inspection → Documentation → Related facilities → Related intelligence → Sources → Last reviewed.
- Every section renders explicitly when data is absent, with the neutral "not independently established" line rather than being hidden — so profiles read as records, not stubs.
- Mobile: status module stays above the fold, sidebar content interleaves at meaningful points instead of dumping at the bottom.

## Phase 3 — Intelligence and article system

- Upgrade `EditorialPage` / `ArticlePage` into a research-publication template: category, deck, published + updated, source attribution, key takeaways, primary-source reference block, related entities, related articles, relevant methodology, "why this matters" context.
- Desktop: article body + persistent right rail (contents, sources, related entities). Mobile: contents collapse inline, sources and related render as full-width modules.
- `/intelligence` hub gains per-category descriptions and denser listing rows (date, category, source, one-line summary) instead of sparse cards.

## Phase 4 — Homepage, hubs, and directories

- Homepage rebuilt as an institutional overview with real pathways: what Source Standard is, the supply-chain problem, how the chain works, what is evaluated, evidence types, upstream sourcing, latest intelligence, provider/facility discovery, participation, methodology, independence, FAQ.
- Cluster/topic pages, `/clinics`, `/facilities`, `/learn`, `/faq`, `/about`: add explanatory lead-ins, denser result rows, and cross-links so no page dead-ends.

## Phase 5 — Cross-linking pass and full QA

- Bidirectional links: term → explainer, article → entity, entity → methodology and intelligence, facility type → registration explainer.
- Playwright sweep of every public route at 1440px, 1280px, and 390px: screenshot, check horizontal overflow, empty sections, wrapping, stacking, typography consistency. Fix what the screenshots show, not what the components claim.

## Technical notes

- All spacing and color stays tokenized in `index.css` / `tailwind.config.ts`; no hardcoded color utilities in components.
- New modules are typed primitives exported from `src/components/system/index.ts`, so future entities and articles inherit density automatically.
- No content is deleted to make layouts cleaner; existing substantive copy is relocated, not dropped.

## Deliverable per phase

Each phase ends with mobile + desktop screenshots of the affected routes so you can review before the next phase starts.
