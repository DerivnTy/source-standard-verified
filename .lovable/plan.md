## Simplify the Education index

Remove search and filter controls from `/learn/education` so the page reads as a curated editorial table of contents.

### `src/pages/LearnEducation.tsx`

1. Remove the entire sticky controls block (search input, article count, topic filter pills).
2. Remove all state and handlers that become unused:
   - `useState` for `query` and `filter`
   - `useMemo` for `filtered`
   - `useEffect` for hash-change listener
   - `handleTabClick`
   - `initialHash` / `initialFilter`
3. Remove unused imports and helper types:
   - `useEffect`, `useMemo`, `useState`
   - `EducationTopicId`
   - `EDUCATION_ARTICLES`
   - `FILTER_TABS` constant
4. Replace `NextStep` with `<EditorialBackLink to="/learn" label="Back to Learn" />` at the bottom of the page.
5. Render topic sections directly from `EDUCATION_TOPICS` with `educationArticlesByTopic`, no filtering or empty-state logic.
6. Insert a compact 32px spacer between the `BriefingHero` and the first `PageSection` so the page opens directly into content without dead space.

### Verification

- `bunx tsgo --noEmit`
- Confirm 17 articles remain visible under their four existing topic headings.
- Confirm no controls or dead space beneath the hero.
