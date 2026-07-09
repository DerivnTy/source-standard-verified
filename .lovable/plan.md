
# Learn Experience Redesign

Turn `/learn`, `/learn/education`, `/learn/news`, `/learn/faq`, and every article into one continuous knowledge library. Purely presentational — no data model changes, no routing changes, no copy rewrites.

## Scope

**In:** shared Learn shell (breadcrumbs + secondary nav), article cards, article page structure, related content, category browsing, FAQ browsing pattern, News browsing pattern.

**Out:** new routes, IA changes, new content, backend, unrelated pages. Copy is preserved from existing `src/data/learn.ts`.

## What we build

### 1. `LearnShell` — persistent Learn frame
New wrapper applied to every `/learn/*` page. Provides the "you are inside Learn" signal that's currently missing.

- **Breadcrumb rail** (sticky under the site header, hairline bottom border, blur background): `Learn / Education / Verification / What Does Verified Mean?` — segments are links, last is current.
- **Secondary nav** (below breadcrumb on Learn landing + section landings, hidden on article pages to reduce chrome): pill row for `Education · FAQ · News & Insights`. Active pill = Navy/White per the design system.
- Mobile: breadcrumb collapses to `← Verification` (parent only). Secondary nav scrolls horizontally.

### 2. `ArticleCard` — replaces `FeatureLink` inside Learn
`FeatureLink` currently renders articles as underlined title + description rows, which reads like a document outline. Introduce a card:

- 1px hairline border, 12px radius, subtle bg shift on hover
- Title (serif, 17/24) · one-line description (muted) · meta row (reading time · topic) · trailing arrow
- Grid: 1 col mobile, 2 cols ≥768px
- Used on: Education landing (per topic), Category detail sections, FAQ topic pages, News landing, Related lists
- `FeatureLink` stays available for non-Learn surfaces

Reading time = derived at render from `article.sections` word count (~200 wpm), rounded up. No data changes.

### 3. Education landing (`/learn/education`)
Keep the four topic sections; replace the plain `<ul>` of `FeatureLink`s with an `ArticleCard` grid per topic. Add a compact topic index at the top (jump-links to each topic anchor) so the page reads as browsable.

### 4. Category headers (new lightweight component)
For each topic block on the Education landing, wrap the topic in a `CategoryHeader`:
- Small eyebrow (`Education`), topic title, one-line description, article count on the right (e.g., `8 articles`)
- Matches the eyebrow token rules already in place

### 5. Article page (`EducationArticleTemplate`, `NewsArticleTemplate`)
Give articles a real editorial layout:

```text
LearnShell breadcrumbs
ArticleHeader (existing)
KeyTakeaway (new, optional — renders when article.shortAnswer exists)
Article body sections (existing ArticleSection prose)
RelatedArticles (upgraded: cards, not list rows)
BrowseCategory strip: "More in Verification →"
BrowseLearn strip:    "Back to Education · All topics"
Footer
```

- `KeyTakeaway` = subtle bordered callout at the top of the body, single sentence pulled from `shortAnswer`. Serif, larger leading, muted "Key takeaway" eyebrow.
- Related articles: same `ArticleCard` component, up to 4. Uses existing `article.relatedQuestions`; if fewer than 3, fill with other articles from the same `topic` (excluding self and duplicates).
- Remove the current lone `EditorialBackLink to="/learn"` at the bottom — replaced by the two browse strips.

### 6. News landing (`/learn/news`)
Same treatment: category pills at the top (Industry / Regulatory / Scientific / Source Standard / Editorial), then a card grid grouped by category. Each card shows dateline + category.

### 7. FAQ browsing (`/learn/faq` + `/library/faq/*`)
- `/learn/faq`: topic cards (four topics) using `ArticleCard`.
- FAQ topic pages (`FaqVerificationProcess`, `FaqClinicalSafety`, `FaqLegalRegulatory`, `FaqConsumerDiligence`): wrap in `LearnShell`, add breadcrumbs, add a bottom "Related topics" strip linking to the other three FAQ topics, plus a "Back to FAQ" strip.

### 8. Cross-linking within Learn
Every Learn page ends with a consistent two-strip footer block:
1. **Continue in {category}** — 3–4 sibling article cards
2. **Browse Learn** — links to Education, News, FAQ

No page in Learn ends without at least one onward path.

## Files

**New**
- `src/components/learn/LearnShell.tsx` — breadcrumb + optional secondary nav wrapper
- `src/components/learn/LearnBreadcrumbs.tsx`
- `src/components/learn/ArticleCard.tsx`
- `src/components/learn/CategoryHeader.tsx`
- `src/components/learn/KeyTakeaway.tsx`
- `src/components/learn/RelatedArticles.tsx` (card grid, replaces the inline related list in `LearnArticleTemplate`)
- `src/components/learn/BrowseStrip.tsx` (the two footer strips)
- `src/lib/readingTime.ts` — pure util, `readingTimeMinutes(sections)`

**Edited**
- `src/pages/Learn.tsx` — wrap in `LearnShell`, add secondary nav
- `src/pages/LearnEducation.tsx` — `ArticleCard` grid + `CategoryHeader` + topic jump index
- `src/pages/LearnNews.tsx` — category pills + `ArticleCard` grid grouped by category
- `src/pages/LearnFaq.tsx` — topic cards
- `src/pages/FaqVerificationProcess.tsx`, `FaqClinicalSafety.tsx`, `FaqLegalRegulatory.tsx`, `FaqConsumerDiligence.tsx` — wrap in `LearnShell`, append browse strips
- `src/components/learn/LearnArticleTemplate.tsx` — add `LearnShell`, `KeyTakeaway`, use `RelatedArticles`, append `BrowseStrip` block

**Untouched**
- `src/data/learn.ts` (data model, copy, slugs, routes)
- `src/App.tsx` (no route changes)
- `ArticleHeader`, `ArticleSection`, `BriefingHero`, `PageSection`, `FeatureLink` (still used outside Learn)

## Design tokens

All new components use existing semantic tokens from `index.css` / `tailwind.config.ts`:
- Cards: `border-border/60`, hover `bg-muted/40`, radius `12px`, no drop shadows
- Breadcrumb bar: `backdrop-filter: blur(14px)`, `bg-background/70`, `border-b border-border/50`, hairline
- Category pills: 20px radius, 1px border, uppercase mono, Navy/White active per Core rules
- Motion: 300ms ease-out on hover state changes only; no snap

## Verification

Playwright screenshots at 390px and 1280px after build:
- `/learn`, `/learn/education`, `/learn/news`, `/learn/faq`
- One article of each type: `/learn/education/what-does-verified-mean`, `/learn/news/2026-compounding-reclassification`
- One FAQ topic: `/library/faq/verification-process`

Confirm: breadcrumb present, card grid renders, related section shows cards, two browse strips at the bottom, no dead ends.
