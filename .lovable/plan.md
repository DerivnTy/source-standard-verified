

## Resource Library — Curated Editorial Restructure

Rebuild `src/pages/Education.tsx` as a disciplined editorial library: navy hero, one elevated "Start here" trio, four clearly-differentiated category sections sharing one consistent system, a quieter FAQ utility row, a small "Latest analysis" strip, a de-emphasized archive, and a calm closing notice. Strip the repeated `ENTRY · NN`, `START · NN`, `CAT · NN`, `SS-LIB`, and `§1–§6` chips that currently make the page feel coded and noisy.

---

### Section sequence

**1 · Hero (replace `BriefingHero` invocation)**
Match the navy hero used on Home / Greenlist / Verified Vendors / Medical Advisory.
- `tone`: `navy`
- `category`: `Resource Library`
- `title`: `Resource Library`
- `statement`: `A curated reference library for sourcing, compounding, verification, and public due diligence. Reviewed under independent medical oversight.`
- Drop `docId`, `metadata`, `verifiedOn`. No actions.

**2 · Start here — featured trio, elevated**
Light surface, generous spacing. Single section heading + short lede above a 3-column row of featured entries.
- Section eyebrow: `Start here` (plain text, no `§` prefix).
- Lede: `Three short reads that frame everything else in the library.`
- Cards: `What Are Peptides?`, `What Is Compounding? (503A vs 503B)`, `Questions to Ask Your Clinic`. Rebuild card: numbered eyebrow `01 / 02 / 03` (no `START · NN` chip, no `SS-LIB` chip), title as the dominant anchor (`text-[19px] font-semibold`), one-line blurb, single quiet `Read →` text link. Hairline dividers via existing `gap-px bg-border` pattern. No `border-t` action footer.

**3 · Library — four category sections sharing one system**
One consistent layout repeated four times so every category reads the same way. Each section has: section heading (no `§`), one-sentence description, a clean entry list, and one quiet `View full section →` link. Surfaces alternate `bg-background` ↔ `bg-surface-muted` for rhythm only.

Each entry row inside a category uses the **same** simplified pattern (replaces `LibraryTile`):
- No `ENTRY · NN` mono chip.
- Title (`text-[16px] font-semibold text-foreground`) — the visual anchor.
- One-line muted summary beneath.
- Optional `Reviewed by Medical Advisory Board` micro-note (guides only), muted.
- Whole row is the link; hover tints background. Hairline divider between rows.

The four categories:

- **Foundational sourcing** (`bg-surface-muted`) — entries from `librarySeries.filter(level === "intro")` (compounding/peptides foundations). Footer link → `/education/basics`.
- **Clinical handling & sterile reference** (`bg-background`) — `libraryGuides.slice(0, 6)`. Footer link → `/education/guides`.
- **Verification & due diligence** (`bg-surface-muted`) — series entries about verification meaning, dual-layer, undocumented sourcing signs, questions to ask (drawn from `librarySeries`, excluding the intro pair). Footer link → `/education/questions` (or analysis index).
- **Latest analysis** (`bg-background`) — see §5 below; smaller treatment, distinct from the four foundational categories.

(If only three foundational categories are needed for clarity, "Verification & due diligence" can be promoted while leaving the FAQ row to handle quick answers — see §4.)

**4 · Regulatory FAQ — navigational utility row**
Light surface. Reframe as a quiet four-column nav row, not a card grid.
- Section eyebrow: `Regulatory FAQ`.
- Lede: `Plain-record answers, organized by inquiry category.`
- Render the four categories (`Legal`, `Safety`, `Verification`, `Diligence`) as a horizontal row of four equal-width plain links separated by hairline dividers (`divide-x divide-border`). No card backgrounds, no `CAT · NN` chips, no `FAQ` chips, no `Browse →` action footer. Each column: category label (`text-[15px] font-semibold`), one-line description, route to its FAQ page.
- Single quiet `Browse the full FAQ archive →` text link below, right-aligned.

**5 · Latest analysis — smaller, recent-additions strip**
Muted surface, intentionally lighter weight than the foundational categories.
- Section eyebrow: `Latest analysis`.
- Lede: `Recent additions to the analysis series.`
- Render as a simple two-column list of titles + one-line summaries (no card grid, no numbered chips). Source: `librarySeries.filter((e) => !basicSlugs.has(e.slug))`.
- Quiet `View archive →` link.

**6 · Forthcoming formats — de-emphasized archive**
Light surface, single tight block, deliberately quieter than everything above.
- Section eyebrow: `Forthcoming formats`.
- Lede: `Future extensions of the library.`
- Render `librarySupplementary` as a plain bulleted list (one row each: bold title — muted description). No numbered ref column, no card. This makes it clearly secondary.

**7 · Library notice — clean closing reference block**
Muted surface, full-width, single editorial paragraph, no left border accent, no `Notice · Informational use only` mono label.
- Heading: `About this library` (small, muted).
- One paragraph combining: reviewed under Medical Advisory Board (link), informational use only, not medical advice, no clinician–patient relationship created. Plain typography, no boxed callout.

---

### Visual rules across the page

- No visible `§1 / §2 / §3 / §4 / §5 / §6` codes anywhere.
- No visible `ENTRY · NN`, `START · NN`, `CAT · NN`, `SS-LIB`, `FAQ` mono chips.
- Section headings use plain phrases (`Start here`, `Foundational sourcing`, `Clinical handling & sterile reference`, `Verification & due diligence`, `Regulatory FAQ`, `Latest analysis`, `Forthcoming formats`, `About this library`).
- One consistent rhythm: every section uses `container-wide` + `py-12 md:py-16`, hairline dividers, no card shadows, no rounded corners.
- One consistent action style: `View full section →` / `Read →` / `Browse →` all rendered as quiet muted text links, no uppercase/tracking treatment.
- Typography hierarchy is strict: section heading > entry title > description > metadata. Section headings are `text-[24-28px]`, entry titles `text-[16-19px]`, descriptions `text-[13.5px] text-muted-foreground`.
- Surfaces alternate `bg-background` ↔ `bg-surface-muted` for rhythm, no new tokens, no blue tag highlights.

---

### Files touched

- `src/pages/Education.tsx` — full body rewrite: replace hero invocation; remove `LibraryTile` and `SectionRail` helpers in favor of two simpler shared helpers (`FeatureCard` for Start here, `EntryRow` for category lists); restructure the page into the seven sections above; strip every `§NN`, `ENTRY · NN`, `START · NN`, `CAT · NN`, `SS-LIB`, `FAQ` chip; flatten the closing notice.

### What stays the same

`BriefingHero`, `Breadcrumb`, `PageMeta`, all data and routes in `src/data/library.ts`, the `TITLE_OVERRIDES` / `FEATURED_OVERRIDES` / `SUPPLEMENT_OVERRIDES` / `SLUG_ROUTE_OVERRIDES` / `CATEGORY_ROUTE_OVERRIDES` maps, every linked target page, the navy/cream global accent system, and every other page on the site.

