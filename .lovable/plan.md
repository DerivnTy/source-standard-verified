## Objective

Recompose the article templates so a Learn page (education article, news article, and long-form FAQ answer) reads as one continuous editorial document, not a stack of bordered cards.

No color, type, or branding changes. Purely editorial architecture.

---

## Diagnosis

Three components jointly produce the "stacked cards" feeling:

- `src/components/ArticleHeader.tsx` — wraps the headline + lead in a bordered card, physically separated from the body.
- `src/components/ArticleSection.tsx` — wraps *every* section (including single-paragraph body sections in news articles) in a bordered card with a `§N` mono index, breaking reading rhythm.
- `src/components/learn/LearnArticleTemplate.tsx` — duplicates metadata (renders "Updated" in the header card, then a second mono line — "Education · Topic" or "Date · Location · Category" — outside the card), splits every news body paragraph into its own `ArticleSection` card, and closes with a promotional `NextStep` block that reads as a marketing CTA.
- `src/components/library/FaqPage.tsx` — long-form FAQ answers use accordion Q&A cards inside a bordered header; same pattern, same problem.

---

## Approach

Convert the article surface to a single continuous editorial column with strong section headings and *no default card chrome*. Cards become opt-in for genuinely different content (definitions, key takeaways, warnings, comparisons, callouts).

### 1. `ArticleHeader.tsx` — continuous masthead

Remove the bordered card entirely. Render on the plain page background:

- Small "← Back to …" utility link (as today), then
- Category · Date line in mono uppercase (single metadata line, established once)
- `<h1>` headline in the existing `t-page-title` treatment
- Standfirst / lead paragraph at ~17px / 1.55 line-height, muted foreground
- A 0.5px hairline separator below the standfirst that visually continues into the body — no gap, no card edge

Accept an optional `category` prop so the template can pass "Education · <Topic>" or "<Date> · <Location> · <Category>" into the masthead instead of rendering a second mono row below.

**If no category metadata is passed, omit the metadata line entirely rather than rendering an empty line.**

Keep the existing prop signature (add optional `category`) so no page needs to change beyond the two template files.

### 2. `ArticleSection.tsx` — plain-body default, callout variant

Rewrite so the default rendering is a plain editorial section on the page background:

- No border, no card, no `§N` ordinal.
- Heading (`t-section-title-sm`) sits directly above prose with ~10px margin, section stacks at ~28px rhythm.
- Body prose column constrained to `w-reading-wide` / `max-w-[68ch]`, ~15.5px / 1.65 line-height, foreground for lead paragraphs, muted for continuation.
- Paragraphs separated by natural margin, not by flex-gap between blocks.

Add an opt-in `variant` prop for the *only* remaining card use case:

- `variant="callout"` (default `"prose"`) — renders a small bordered/hairline callout with an eyebrow label ("Definition", "Key takeaway", "Warning", etc.) passed via a new optional `kind` prop. Used sparingly. Not applied automatically.

Preserve the existing named export `BoardDefList` re-export.

### 3. `LearnArticleTemplate.tsx` — editorial composition

**Education article template:**

- Pass `category={`Education · ${topic.label}`}` into `ArticleHeader`; delete the separate mono topic-tag row below the header.
- Remove the `"What this answers"` section wrapper. If needed, absorb `answersFor` into the standfirst area (or drop — it duplicates `shortAnswer` in most articles). Recommend: drop from render; keep in data.
- Remove the `"Short answer"` section. It duplicates the standfirst already in the header. Drop from render.
- Render each `article.sections[i]` as a plain `ArticleSection` (no `n` ordinal, real `title`) — one section per authored section, all paragraphs inside the same section.
- Related-questions block: keep, but render as a bordered *"Continue reading"* editorial block, not a promotional CTA row. Title becomes **Related education**. List items keep `FeatureLink`.
- Replace the closing `NextStep` block with a single **Continue Learning** section that lists three quiet inline links: the article's `nextStep` label, plus Verification Framework, Facility Records, Vendor Registry (deduped). No pill CTA, no eyebrow card.

**News article template:**

- Pass `category={`${dateLabel} · ${article.location ?? ""} · ${category.label}`}` (cleaned of empty segments) into `ArticleHeader`; delete the redundant mono row below the header.
- Render `article.body` as *one* `ArticleSection` (no title, no ordinal) with each paragraph as a `<p>`. This is the fix for "every paragraph inside its own card".
- If the news article gains authored section headings later, they'll slot in as additional `ArticleSection` titles. For now, the body renders as one continuous prose block.
- `"Why this matters"` stays as its own titled `ArticleSection` — this is a legitimate editorial break.
- Related education block: same treatment as education template.
- Replace closing `NextStep` with the same **Continue Learning** editorial closer.

Remove `ArticleFooter` from both templates — the Back link now lives in the header and the Continue Learning block naturally closes the page.

### 4. `FaqPage.tsx` — one continuous document

- Remove the bordered card chrome around the header. Keep the serif title, intro, and back link but let them sit on the page background with a hairline separator below the intro.
- Replace the accordion with a flat editorial list: each question as an `<h2>` (t-section-title-sm), each answer as a prose paragraph directly beneath. No expand/collapse — long-form FAQ answers are meant to be read.
- Keep the Dialog contact CTA at the bottom but demote it to a single-sentence closer matching the Learn page's "Still have questions?" pattern, followed by the same **Continue Learning** editorial closer used by articles (extract as a small local `ContinueLearning` block, or reuse if promoted to shared).

---

## Out of scope

- Index pages: `LearnEducation`, `LearnNews`, `LearnFaq`, `Learn`. Not touched.
- The `NextStep` component itself is not deleted (still used on index pages); it is simply no longer called from article templates.
- No changes to `data/learn.ts`, article copy, routing, or SEO metadata.
- No new visual language — everything uses existing tokens (`text-foreground`, `text-muted-foreground`, `hsl(var(--border))`, `t-page-title`, `t-section-title-sm`, `w-reading-wide`).
- No changes to any non-article page.

---

## Files touched

- `src/components/ArticleHeader.tsx` — remove card chrome, add optional `category` prop, single metadata line.
- `src/components/ArticleSection.tsx` — plain-prose default, opt-in `variant="callout"` with `kind` label.
- `src/components/learn/LearnArticleTemplate.tsx` — remove `"What this answers"` / `"Short answer"` sections; collapse news body into one section; replace `NextStep` with inline **Continue Learning** block; drop `ArticleFooter`; wire `category` through header.
- `src/components/library/FaqPage.tsx` — remove card chrome, flatten accordion to prose Q&A, add **Continue Learning** closer.

## Verification

- `bunx tsgo --noEmit`.
- Playwright screenshots at 390 and 1280 of one representative page from each template:
  - `/learn/news/2026-compounding-reclassification` (news)
  - one `/learn/education/<slug>` (education)
  - one long-form FAQ page (if a route exists that uses `FaqPage`).
- Read each top-to-bottom and confirm: (a) metadata appears once; (b) prose flows without box interruptions; (c) headings—not borders—provide the hierarchy; (d) the closer reads as a continuation, not a CTA.
