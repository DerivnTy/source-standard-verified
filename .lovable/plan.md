

## New page: `/library/analysis/questions-for-your-clinic`

Second Clinical Analysis whitepaper (SS-SERIES-004). Mirrors `LibraryAnalysis2026Reclassification` exactly — same `RecordHeader`, 900px filing column via `Section` + `SectionLabel`, hairline pivot footer.

### 1 · New file: `src/pages/LibraryAnalysisQuestionsForYourClinic.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Clinical Analysis`
  - Title: `Questions to Ask Your Clinic`
  - Lead: `A neutral, evidence-based checklist consumers can use to evaluate a clinic's sourcing, documentation, and clinical practices.`
  - Reference box: Doc `SS-SERIES-004` · Status `Analysis / Public Record` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column, three numbered sections:
  - `§1 The Informed Consumer` — single prose paragraph framing transparency as the primary safety indicator.
  - `§2 The "Source Five" Checklist` — short framing sentence, then five numbered question blocks. Each block: mono `Q1`–`Q5` label, the bold question in quotes, and an indented `Why it matters:` answer (same visual treatment used on the FAQ pages, but ordered/numeric since these are checklist items, not collapsible).
  - `§3 Evaluating the Responses` — short intro, then a `DefList` (the same helper used on SS-SERIES-001) with three terms: **Green Flag**, **Yellow Flag**, **Red Flag**. Each term gets a small color-coded dot (emerald / amber / rose) inline with the label to read as a status legend without breaking the filing aesthetic.

- **Pivot footer** (hairline-top bar inside the 900px column):
  - Left: `Button` outline `← Back to Education Hub` → `/education`.
  - Right: muted text link `Next Analysis: What Verification Actually Means (SS-SERIES-005) →` → `/library/analysis/what-verification-actually-means` (placeholder for the next analysis page).

### 2 · Route registration: `src/App.tsx`

One import + one `<Route path="/library/analysis/questions-for-your-clinic" element={<LibraryAnalysisQuestionsForYourClinic />} />` inside `SiteLayout`.

### 3 · Wire the SS-SERIES-004 card: `src/pages/Education.tsx`

`SS-SERIES-004` ships in `library.ts` with slug `questions-to-ask-your-clinic`. Add one new key to `SLUG_ROUTE_OVERRIDES` so its "Read more" button (already routed through the override map) points at the new page:

```ts
"questions-to-ask-your-clinic": "/library/analysis/questions-for-your-clinic",
```

This automatically wires both the analysis grid `Read more` button and any `SimpleRow` reference to the new dedicated page. No other edits to `Education.tsx`.

### 4 · Fix the SS-SERIES-001 forward link

In `src/pages/LibraryAnalysis2026Reclassification.tsx`, the existing `Next Analysis →` link points to `/library/analysis/questions-to-ask-your-clinic` (a 404 today). Update it to the new approved route `/library/analysis/questions-for-your-clinic` so the chain is live.

### Files touched

- `src/pages/LibraryAnalysisQuestionsForYourClinic.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new `SLUG_ROUTE_OVERRIDES` key
- `src/pages/LibraryAnalysis2026Reclassification.tsx` — update one `to=` value on the forward pivot link

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, `Button`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page card.

