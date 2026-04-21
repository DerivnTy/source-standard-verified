

## Library Entry Page — Beginner-Friendly Article View

The individual article page (e.g. `/education/what-are-peptides`, `/education/the-dual-layer-difference`) currently reads like an internal record card: monospace reference IDs, "Lane" metadata, a "We're still writing this one" eyebrow, and "Related entries" rendered as a code-style table with `SS-SERIES-003` IDs in a left column. That's the same expert-document framing we already removed from `/education`. This brings the entry page in line with the friendlier landing page.

### What changes

**1. Replace the RecordHeader with a plain `PageHeader`**
- Drop the metadata bar entirely (no `Reference`, no `Lane`, no `Status`, no `Reviewed by` chips at the top).
- Use a soft eyebrow with a friendly category label instead of "SOURCE STANDARD SERIES" — e.g. `The Basics`, `Practical Guide`, or `Reference`. Map lane → friendly label.
- Keep the title and summary lead — they're the only things a new visitor needs at the top.
- If the entry has `reviewedBy`, show a small muted line under the lead: `Reviewed by Medical Advisory Board` — single line, no chip.

**2. Rewrite the "still writing" placeholder in plain language**
Replace the bordered card / eyebrow / Reference-ID block with a calmer, friendlier message:

> **This article is coming soon.**
> We're still writing it. Here's what it will cover:
> *(summary in normal prose)*
>
> In the meantime, you can browse other reads below or head back to Learn.

No bordered card chrome, no eyebrow caps, no monospace ID. Just two short paragraphs of normal text in a comfortable reading width (`max-w-2xl`, normal body size). The reference ID gets removed from the public view here too — it stays in the data and can resurface later if/when we add a real "cite as" footer.

**3. Friendlier "Related entries" list**
- Rename the heading from `Related entries` (eyebrow caps) to `Keep reading` (normal sentence-case section heading).
- Remove the left-column monospace ID. Each row is just: **Title** → with a one-line summary underneath in muted text.
- Pull related items from the *same lane* as today, but show 3 instead of 4 to keep it tight.
- For FAQ entries (lane `faq`) — which currently have no detail page — this section is skipped naturally since they're not in `librarySeries`/`libraryGuides`.

**4. Better back-navigation**
- Move "← Back to Learn" to the top of the page (above the title, small and muted), not buried at the bottom. This is the pattern visitors expect on a content page.
- Also keep a softer footer link at the bottom: `Browse all of Learn →`.
- Where it makes sense, deep-link back to the section the entry came from (`/education/basics` for series intro pieces, `/education/guides` for guides) instead of just `/education`. Determined by lane + level.

**5. When an article *does* have body content (future-proofing)**
Currently no entries have a `body` field populated, but the data model supports it. Update the page so:
- If `entry.body` exists → render it inside an article container (`max-w-2xl`, prose styling, comfortable line-height).
- If not → render the friendly "coming soon" block from step 2.

This way as real article content gets written, it drops in cleanly without another refactor.

**6. Not-found state**
Soften the current "Entry not found / No library entry matches this reference" copy to something a confused visitor understands:

> **We couldn't find that article.**
> It may have moved or been renamed. Head back to Learn to find what you're looking for.

### Files touched
- `src/pages/LibraryEntry.tsx` — full surface rewrite per above. No changes to data or routing.

### What stays the same
- All routes, all data, all slugs.
- Reference IDs remain in `src/data/library.ts` for internal/citation use.
- The `/education` landing page and the three index pages (`/education/basics`, `/education/guides`, `/education/questions`) already shipped — untouched.
- Header, footer, every other page.

### Result
Clicking any article from the Learn page lands a new visitor on a clean, readable article view: a friendly category label, the title, the summary, a calm "coming soon" note (until real content is written), and a short "Keep reading" list of related pieces in plain language. No reference IDs, no lane jargon, no record-card chrome — it reads like a learning resource, not an audit log.

