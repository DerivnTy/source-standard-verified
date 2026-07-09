## Final article template cleanup

### 1. Remove location from news metadata
**File:** `src/components/learn/LearnArticleTemplate.tsx` (`NewsArticleTemplate`)

Drop `article.location` from the `metaParts` array so the masthead category line reads `April 13, 2026 · Regulatory Updates` instead of `April 13, 2026 · Washington, D.C. · Regulatory Updates`. Applies globally to all news articles.

```ts
const metaParts = [dateLabel, category?.label].filter(Boolean);
```

Leave the underlying `location` field in the data model untouched — just don't render it in the masthead.

### 2. Remove `ContinueLearning` from article pages
**File:** `src/components/learn/LearnArticleTemplate.tsx`

- Delete the `<ContinueLearning />` render call from both `EducationArticleTemplate` and `NewsArticleTemplate`.
- Remove the `ContinueLearning` component definition and its `NEXT_STEPS`/`Link` imports if unused after removal.
- Keep the `Related Education` (`variant="callout"`) block as the primary continuation.

Note: `NEXT_STEPS` and `article.nextStep` remain in the data layer untouched (may still be referenced elsewhere); we're only removing the render.

### 3. Add quiet "Back to Learn Library" text link
**File:** `src/components/learn/LearnArticleTemplate.tsx`

After the `Related Education` block (and unconditionally, even when there is no related content), render a small editorial footer link inside a `page-shell` + `w-reading-wide` wrapper with generous bottom padding (~80px) to preserve the current end-of-article breathing room previously provided by `ContinueLearning`.

Styling (mirrors the existing masthead back link):
- `<Link to="/learn">` with `← Back to Learn Library`
- `font-mono uppercase`, `fontSize: 11px`, `letter-spacing: 0.08em`
- `text-muted-foreground hover:text-foreground`
- Arrow nudges left on hover (`group-hover:-translate-x-0.5`)
- No border, no card, no button chrome

Applied to both `EducationArticleTemplate` and `NewsArticleTemplate` so the end-of-article rhythm is:

```
Article body
Why this matters (news only)
Related Education
← Back to Learn Library
```

### Verification
- `bunx tsgo --noEmit` passes.
- Check `/learn/news/2026-compounding-reclassification`: masthead reads `April 13, 2026 · Regulatory Updates`, no `Continue Learning` section, quiet back link at bottom.
- Check an education article: same end-of-article pattern.

### Out of scope
Data model changes, FAQ template, library pages, index pages, copy edits.
