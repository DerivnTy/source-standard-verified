## Batch 2 — Learn & Knowledge System

Rebuild the `/learn` universe onto the Batch 1 shared design system (`PageSection`, `FeatureItem`, `NavCard`, `ProcessSteps`) so the Learn hub becomes the public knowledge center. Consumer Mode throughout. Routes, data, article slugs, and SEO/JSON-LD preserved.

---

### 1. Learn hub — `src/pages/Learn.tsx`

Replace the local `PillarCard` grid with shared primitives, then extend the page with guidance sections it currently lacks.

Structure:
1. `BriefingHero` (kept, copy unchanged).
2. **Three destinations** — `PageSection` wrapping a 3-up grid of `NavCard`s for Education / News & Insights / FAQ. Meta strings (`{n} articles`, etc.) become the `NavCard` eyebrow, no bordered pillar cards.
3. **Featured educational categories** — `PageSection titled "Start with the basics"` containing a 2×2 grid of `FeatureItem` blocks, one per `EDUCATION_TOPICS` entry (title = topic label, desc = topic description), each wrapped in a `Link` to `/learn/education#<id>`. Icon glyph limited to one per section — omit glyphs on the cards themselves per doctrine.
4. **Featured recent updates** — `PageSection titled "Recent updates"` listing the 3 newest `NEWS_ARTICLES` as `FeatureItem` rows (title = headline, desc = standfirst, meta line for date · category). Link each to its article.
5. **Still have questions?** — `PageSection` linking to `/learn/faq` and `/contact` via two side-by-side `NavCard`s.
6. `NextStep primary="vendor-registry"` (kept).

Removes bordered pillar tiles, adds real guidance — no article walls.

---

### 2. Education hub — `src/pages/LearnEducation.tsx`

Keep search + filter tabs (they are real navigation and already match the pill spec). Rebuild results.

- Wrap controls in the same sticky, backdrop-blurred filter bar pattern used elsewhere; keep pill styling.
- Replace each topic block:
  - Section frame becomes a `PageSection` (title = topic label, intro = topic description).
  - Article list becomes stacked `FeatureItem` rows (title = question, desc = `answersFor`), each wrapped in a `Link` to `/learn/education/<slug>`. No individual bordered `ArticleRow` cards.
- Empty state stays as a single muted line, no card.
- Preserve `#topic-id` deep links, hashchange handler, and JSON-LD.

---

### 3. News hub — `src/pages/LearnNews.tsx`

Feels like a publication — chronological, compact, no giant cards.

- Keep sticky filter chip bar and post count.
- Replace `NewsRow` bordered cards with a compact list: each item is a link containing a dateline · category meta line, headline, and standfirst, separated by hairline `border-b border-border/40` dividers rather than boxed cards. Rendered inside a single `PageSection` wrapper for spacing.
- Empty state as a plain muted line.
- Keep `NextStep primary="learn-education"` and JSON-LD.

---

### 4. FAQ hub — `src/pages/LearnFaq.tsx`

- Replace `FaqRow` bordered cards with a `PageSection` containing `FeatureItem` rows (title = label, desc = description), each wrapped in a `Link` to the four Tier D FAQ pages.
- Preserve routes, order, and JSON-LD.
- Keep `NextStep primary="contact"`.

---

### 5. Article templates — `src/components/learn/LearnArticleTemplate.tsx`

Small refinements only; do not restructure the article body or break `ArticleHeader` / `ArticleSection`.

- **Related questions** and **Related education** blocks: replace the bare `<ul>` of chevron links with a stacked group of `FeatureItem` rows (title = question, no desc) wrapped in `Link`s, matching sibling hubs. Keep them inside `ArticleSection` so anchor jumps and typography stay intact.
- No changes to Article/NewsArticle JSON-LD, headers, section numbering, or `NextStep` placement.

Education article body order stays: What this answers → Short answer → Detailed sections → Related questions → Next step. News stays: dateline/category strip → body → Why this matters → Related education → Next step. Both already end on an intentional next step via `NextStep`.

---

### 6. Preserve (non-negotiable)

- Routes: `/learn`, `/learn/education`, `/learn/education/:slug`, `/learn/news`, `/learn/news/:slug`, `/learn/faq`, all legacy `/library/*` and `/education/*` redirects in `src/App.tsx`.
- All article slugs, deep-link hashes (`#basics`, `#choosing-a-provider`, `#verification`, `#sourcing-and-manufacturing`), Tier D FAQ pages and their content.
- All `PageMeta` inputs and JSON-LD (`CollectionPage`, `Article`, `NewsArticle`, `FAQPage`), canonical URLs, breadcrumbs.
- Verification logic, status definitions, `NextStep` targets, legal disclaimers.
- Data files under `src/data/learn.ts` — content only consumed, not rewritten.

Out of scope: Tier D FAQ page interiors (Batch content freeze), Batch 3 pages, copy rewrites beyond minor clarity fixes on hub intros.

---

### Technical details

- Use only `PageSection`, `FeatureItem`, `NavCard`, `ProcessSteps`, and existing typography tokens from `@/components/system`. Add `Link` wrappers around `FeatureItem`/`NavCard` where interactivity is needed; do not fork the components.
- No hardcoded colors — HSL semantic tokens only.
- Sticky filter bars: `sticky top-<nav-offset>` + `backdrop-blur-md` + `bg-background/80`, matching the pattern already used for other filter stacks (per core memory).
- No new decorative glyphs. `NavCard` glyph slot used only where it communicates meaning (e.g., `check` for verification destination) — not blanketed.
- No new dependencies. No route additions.

### Verification

- `bunx tsgo --noEmit`.
- Playwright mobile screenshots (390×1800) of `/learn`, `/learn/education`, `/learn/news`, `/learn/faq`, plus one education and one news article, confirming: shared primitives applied, no leftover bordered card stacks on hubs, deep-link hashes still scroll correctly on `/learn/education`, and every hub ends with an intentional next action.
