

## New page: `/library/analysis/meaning-of-verification`

Third Clinical Analysis whitepaper (SS-SERIES-005). Mirrors `LibraryAnalysis2026Reclassification` and `LibraryAnalysisQuestionsForYourClinic` exactly — same `RecordHeader`, 900px filing column via `Section` + `SectionLabel`, hairline pivot footer, same `DefList` helper.

### 1 · New file: `src/pages/LibraryAnalysisMeaningOfVerification.tsx`

- **Header** — `RecordHeader`
  - Eyebrow: `Source Standard · Clinical Analysis`
  - Title: `What Source Standard Verification Actually Means`
  - Lead: `A disclosure of the scope, limits, and reviewable evidence behind a verified listing in the Source Standard registry.`
  - Reference box: Doc `SS-SERIES-005` · Status `Analysis / Public Record` · Jurisdiction `United States` · Updated `April 21, 2026`

- **Body** — 900px centered column, four numbered sections:
  - `§1 Defining the Standard` — single prose paragraph framing the badge as a point-in-time attestation.
  - `§2 What We Verify` — short framing sentence + `DefList` with four terms: **Documented Procurement**, **Facility Standing**, **Credential Authenticity**, **CoA Reconciliation**.
  - `§3 What We Do Not Do (The Limits of Scope)` — short framing sentence + `DefList` with three terms: **No Medical Endorsement**, **No Primary Lab Testing**, **No Financial Interest**.
  - `§4 The 'Active' Nature of Verification` — closing prose paragraph on dynamic verification state and real-time registry updates.

- **Pivot footer** (hairline-top bar inside the 900px column):
  - Left: `Button` outline `← Back to Education Hub` → `/education`.
  - Right: muted text link `Final Analysis: Warning Signs of Undocumented Sourcing (SS-SERIES-006) →` → `/library/analysis/warning-signs-undocumented-sourcing` (placeholder for the next analysis page).

### 2 · Route registration: `src/App.tsx`

One import + one `<Route path="/library/analysis/meaning-of-verification" element={<LibraryAnalysisMeaningOfVerification />} />` inside `SiteLayout`.

### 3 · Wire the SS-SERIES-005 card: `src/pages/Education.tsx`

Add one new key to `SLUG_ROUTE_OVERRIDES` matching the SS-SERIES-005 slug shipped in `library.ts` so its "Read more" button (already routed through the override map) points at the new page:

```ts
"what-source-standard-verification-actually-means": "/library/analysis/meaning-of-verification",
```

This automatically wires both the analysis grid `Read more` button and any `SimpleRow` reference. No other edits to `Education.tsx`.

### 4 · Fix the SS-SERIES-004 forward link

In `src/pages/LibraryAnalysisQuestionsForYourClinic.tsx`, the existing `Next Analysis →` link points to `/library/analysis/what-verification-actually-means` (a 404 today). Update it to the new approved route `/library/analysis/meaning-of-verification` so the chain stays live.

### Files touched

- `src/pages/LibraryAnalysisMeaningOfVerification.tsx` — new
- `src/App.tsx` — one import + one `<Route>`
- `src/pages/Education.tsx` — one new `SLUG_ROUTE_OVERRIDES` key
- `src/pages/LibraryAnalysisQuestionsForYourClinic.tsx` — update one `to=` value on the forward pivot link

### What stays the same

`RecordHeader`, `Section`/`SectionLabel`, `DefList`, `Button`, the global layout, the 900px filing column, `library.ts`, every other route, and every other Education page card.

