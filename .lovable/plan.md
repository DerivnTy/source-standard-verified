

## Resource Library — Exact Execution Rebuild

Rebuild `src/pages/Education.tsx` into eight ordered sections using the exact wording provided. Match the restrained institutional aesthetic established on About / Verification / Status Definitions / Enforcement so this page reads as a serious reference library, not a content hub. Per spec, the small sticky page-position bar (the filter tabs row) is preserved as the in-page sticky control.

### Section-by-section

**§1 Hero** — Replace `BriefingHero` (and the floating peer-review badge) with the same restrained custom hero used across the rebuilt institutional pages. Eyebrow "Reference Library", H1 "Resource Library", one supporting paragraph exactly as specified, plus one short supporting line beneath: "All content peer-reviewed by the Medical Advisory Board" — rendered as small muted text, not a chip. No navy treatment, no decoration.

**§2 Library controls (sticky bar — preserved)** — Keep the existing sticky control structure, restyle to a quieter, product-like row. Three elements in order:
- Search input with placeholder `Search library…`
- Results count `{n} results` (live)
- Filter tabs in this exact order: `All`, `Regulation`, `Clinical`, `Consumer`. Tab labels updated from current `c.short` to use the precise words above (Regulation/Clinical/Consumer). Tabs scroll-jump to the matching category section as today. Restyle to sharp, quiet underline-style tabs (no oversized chips). The wrapper becomes `sticky top-[nav-offset] z-20` with a subtle border so it behaves as the "small sticky page-position/header bar" referenced in the spec.

**§3 Category one — Sourcing & Regulation** — Standardized category block. Header carries:
- Eyebrow `Regulation`
- H2 `Sourcing & Regulation`
- Supporting paragraph `Statutory framework, facility classifications, and verification methodology.`
- Count line `4 entries`

Body: vertical divided list of the 4 entries (title + description + meta) using `ArticleRow`. Bottom row link: `View all Sourcing & Regulation entries` → `/library/sourcing` (no arrow glyph). Entry copy in `src/data/resourceLibrary.ts` already matches the spec for §3.

**§4 Category two — Clinical Handling** — Identical structural pattern to §3.
- Eyebrow `Clinical`
- H2 `Clinical Handling`
- Supporting paragraph `Sterile technique, stability, and clinical context reviewed under the Medical Advisory Board.`
- Count line `4 entries`
- Bottom link: `View all Clinical Handling entries` → `/library/clinical`

Update one description in `resourceLibrary.ts`: Clinical entry 2 currently titled "Stability Fundamentals" has the right title but its source slug `sanitization-and-aseptic-technique-fundamentals` keeps its existing route override — no route change.

**§5 Category three — Consumer Due Diligence** — Identical structural pattern.
- Eyebrow `Consumer`
- H2 `Consumer Due Diligence`
- Supporting paragraph `Patient-facing checklists and signal interpretation for evaluating clinics and sources.`
- Count line `4 entries`
- Bottom link: `View all Consumer Due Diligence entries` → `/library/consumer`

Update three Consumer blurbs in `resourceLibrary.ts` to match the spec exactly:
- "The Clinic Checklist" → `Five essential questions to ask a clinic about sourcing.`
- "Warning Signs" → `Identifying undocumented vendors and unsupported sourcing claims.`
- "Verification Scope" → `What a Verified listing establishes and what it does not establish.`
- "Sterile Injection Guide" → `Safe handling and disposal guidance for injectable preparations.`

Also update the `CATEGORIES[1].description` (Clinical Handling) in `resourceLibrary.ts` to the new wording so the same string drives both the hub page and the dedicated category sub-page.

**§6 Common Inquiries** — Restyled as a lighter navigation block (not the current heavy 2x2 card grid). Eyebrow `Reference Questions`, H2 `Common Inquiries`, supporting paragraph as specified. Right-rail composition matching the institutional "Related documents" treatment used on About / Enforcement: a clean bordered, divided list of 4 `Link` rows (title + supporting line + quiet "View" affordance, no arrow glyph):
- `Legal` — Statutory framework, federal scheduling, and lawful access. → `/library/faq/legal-regulatory`
- `Safety` — Sterility, handling integrity, and clinical-use scope. → `/library/faq/clinical-safety`
- `Verification` — How clinics and upstream pharmacies are reviewed. → `/library/faq/verification-process`
- `Diligence` — Public-facing checks before engaging any source. → `/education/questions#due-diligence`

**§7 Editorial Pipeline** — Replace the current thin ticker strip with a small, quiet section. Eyebrow `Forthcoming`, H2 `Editorial Pipeline`, body paragraph: `Additional reference formats are in development, including video explainers, Board webinars, and the 2026 Integrity Ledger.` Single contained column, restrained spacing.

**§8 Closing statement (NEW)** — Eyebrow `Conclusion`, H2 `A working reference, not a content feed.`, one body paragraph as specified. Subtle `border-t` only, no bottom border.

### Global cleanup

- Remove imports/usage: `BriefingHero`, `ShieldCheck` chip, the arrow-glyph FAQ cards, the ticker strip.
- Keep imports: `Search` icon (search field), `Link`, `ArticleRow`, `PageMeta`, `Breadcrumb`, data from `resourceLibrary`.
- Update `PageMeta` title to `Resource Library` (PageMeta wraps with the Source Standard suffix automatically) and description to the new hero supporting paragraph.
- Breadcrumb stays `[{ label: "Resource Library" }]`.
- Filter tab labels become the exact specified words (`All`, `Regulation`, `Clinical`, `Consumer`); category-section anchor IDs unchanged so existing scroll behaviour and `#regulation|#clinical|#consumer` deep links keep working.
- Category section markup drops the heavy card chrome (`rounded-md border bg-card shadow-sm`) in favour of the institutional pattern: an eyebrow + H2 + intro-line + count, then a bordered divided `ul` of `ArticleRow`s, then a single quiet "View all" link below. Even spacing, no inflated card framing.
- `PREVIEW_LIMIT` raised to 4 (matches "4 entries" requirement; no fifth row hidden).
- Strip every casual phrase ("start here", "popular", "browse", "tips") — none remain.
- Remove the existing per-category `View all … entries →` arrow glyph; replace with plain text per the global restraint pass.

### Files touched

- `src/pages/Education.tsx` — full structural rebuild with exact copy.
- `src/data/resourceLibrary.ts` — copy-only updates: `CATEGORIES[1].description` and 4 Consumer-category `blurb` strings to match spec exactly. No type/route changes.

### Out of scope

- `ArticleRow` component internals (reused as-is)
- Routing (route remains `/education`; category sub-pages and article routes unchanged)
- Design tokens, breadcrumb component, sticky-bar offset variable

