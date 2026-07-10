## Goal

Every Learn page follows the same rhythm — Hero → Editorial content → Related content → Continue reading — with no chip navigation, filter bars, or "Browse by…" controls between the hero and the content.

## Changes by page

### 1. News & Insights (`src/pages/LearnNews.tsx`)

- Remove the entire filter bar (the sticky-style strip with post count + `All / Industry / Regulatory / Scientific / Source Standard / Editorial` pills).
- Remove `useState`, the `Filter` type, the `FILTER_TABS` array, and all filter state / logic.
- Replace the single "Latest" `PageSection` with one `PageSection` per category, in this order (matching the user's example, aligned to `NEWS_CATEGORIES`):
  1. Regulatory Updates
  2. Industry News
  3. Scientific Research
  4. Source Standard Updates
  5. Editorial
- Within each section, render that category's articles sorted newest-first as `ArticleCard`s (same 2-column grid, same card props, no eyebrow since the section heading already carries the category).
- If a category has zero articles, omit the section entirely. If it has one, still render it as a section (no chrome added).
- Drop the intro copy that referenced filtering ("Newest first. Reporting, analysis, and platform updates.") — section headings speak for themselves.

### 2. Education (`src/pages/LearnEducation.tsx`)

- No topic pills currently remain, but confirm the page flows directly from `BriefingHero` into the first `EDUCATION_TOPICS` section. No changes needed beyond verification.

### 3. FAQ (`src/pages/LearnFaq.tsx`)

- Remove the `PageSection` wrapper's "Browse by topic" heading and intro copy, which frames the topics as a filter step.
- Render the four `FAQ_ENTRIES` cards directly under the hero as an editorial grid (same `ArticleCard` grid, wrapped in a plain `PageSection` with no title/intro, or a lightweight section container consistent with other Learn pages).

### 4. Learn landing (`src/pages/Learn.tsx`)

- Contains no chips or filters today. `Start Here`, `Browse by Resource` (NavCards), `Recent Updates`, and `Still Have Questions?` are editorial sections, not filter controls. No changes.

## Out of scope

- `ArticleCard`, `CategoryHeader`, `LearnShell`, `ContinueLearning`, and article templates are untouched.
- No data model changes in `src/data/learn`.
- Future Learn pages should not reintroduce filters or segmented controls; scrolling remains the navigation.

## Technical notes

- `LearnNews.tsx` becomes a pure render: import `NEWS_ARTICLES` and `NEWS_CATEGORIES`, precompute `articlesByCategory` with a single sort+group pass, then `NEWS_CATEGORIES.map` → `PageSection`.
- Remove now-unused imports (`useMemo`, `useState`, `NewsCategoryId`) in `LearnNews.tsx`.
- Keep `formatDate` for the card `meta` field.
- Update the `LearnFaq` JSON-LD/description unchanged; only the visible section header is removed.
