## Goal
Make the body paragraphs in **§1 — Trust problem** and **§3 — Live registry** visually consistent with the rest of the homepage by wrapping each `<p className="home-lead">` in a white card matching the existing `DataStrip` treatment. Headings (H2) and eyebrows stay exactly as they are.

## What changes
Two edits in `src/pages/Index.tsx`:

1. **§1 — Trust problem (around line 535)** — wrap the body `<p>` in a white card div.
2. **§3 — Live registry (around line 607)** — wrap the body `<p>` in the same white card.

## Card spec (mirrors DataStrip)
Applied to a wrapping `<div>` around the existing `<p>`:
- Background: `bg-card`
- Border: `0.5px solid hsl(var(--border))`
- Border radius: `12px`
- Padding: `16px 18px`
- Top margin: `mt-4` (replaces the `mt-4` currently on the `<p>`)

Inside the card, the `<p>` keeps its current text classes/styles but loses its `mt-4` (now on the wrapper) so spacing stays identical.

## Out of scope
- No changes to H2, eyebrow, CTA pills, or section padding.
- No changes to other sections (02, 04–07).
- No changes to colors or typography tokens.

## Visual result
Section 01 and Section 03 body text reads inside a clean white pill card, matching the institutional card pattern already used for DataStrip rows in §2, §4, §5, §6, §7.