

## Greenlist Facility Profile — Final Polish Pass

A non-structural refinement of `/greenlist/:slug`. Same architecture, same sections, same content — tightened so the page reads as fully finished.

### 1. Title block

- Add `break-words` and `max-w-[42ch]` to the `<h1>` so very long facility names wrap on a natural measure instead of running edge-to-edge.
- Drop title size one notch on small screens (`t-section-title-sm` mobile → `t-section-title-md` ≥md) so two-line names don't dominate the viewport.
- Tighten the meta line spacing under the title from `mt-2` → `mt-3`, swap the `·` separators from `text-border` to `text-muted-foreground/40` so they sit visually behind the values rather than competing with them.
- Add `gap-y-1.5` so the meta line wraps cleanly on tablet/mobile without losing rhythm.

### 2. Status presentation

- Keep the recognized treatment, but tone the dot from solid `bg-[hsl(var(--verified))]` to the same hue at slightly reduced saturation so it reads premium rather than app-y. Match the top card border tick to the same tone.
- Lock the dot at `w-1.5 h-1.5` and align baseline-center with the uppercase label (currently slightly off on some line-heights — use `items-baseline` swap to `items-center` with explicit `translate-y` is unnecessary; just confirm `inline-flex items-center`).
- Ensure the alert variant uses the same sizing/structure, only the color token changes.

### 3. CTA — Visit website

- Reduce visual weight so it supports the title rather than competing:
  - `px-4 py-2` → `px-3.5 py-1.5`
  - Drop to `t-utility-xs` (already), confirm `font-medium` (not bold).
  - Add subtle `border border-foreground` so the dark fill reads intentional at the smaller scale.
- Move it to `self-start` within the flex row so it aligns to the top of the title block, not the meta line.
- Remove the duplicate CTA at the bottom of the card (lines ~333–346). One CTA in the header is enough; the bottom one creates redundant weight and the awkward bottom band.

### 4. Profile card spacing

- Card padding: `p-8 md:p-10` → `p-7 md:p-9` for a slightly tighter, more deliberate feel.
- Row vertical padding: `py-3` → `py-3.5` and switch divider from `border-border/50` to `border-border/40` — more breathing room per row, lighter rule, better rhythm.
- Column gap: `gap-x-12` → `gap-x-10` so left/right columns balance better at the standard width and long values on the right don't visually outweigh the left column.
- Last row in the dl loses its bottom border (`last:border-b-0`) so the card closes cleanly.

### 5. Label hierarchy

- Standardize all `<dt>` to one spec: `t-utility-xs uppercase tracking-[0.09em] text-muted-foreground font-medium`. Currently the Sourcing/Dosage forms sub-labels use `tracking-[0.06em]` — unify to `0.09em` for consistency.
- Value gap: `mt-1` → `mt-1.5` across all rows so labels feel anchored to their values without crowding.
- Confirm `<dd>` is always `t-body-sm text-foreground/90 leading-[1.55]`; remove the conditional `font-mono t-body-sm` double-class (the `mono` flag is unused on this page — drop the param to simplify).

### 6. Long-content handling

- `Background`, `Clinical focus`, `Inspection history`: cap reading measure with `max-w-[68ch]` so long paragraphs don't run the full card width and lose readability.
- `Sourcing & capability scope` lists: switch `<ul>` to `list-disc list-outside pl-5` with `marker:text-border` so multi-item lists scan as lists, not concatenated lines. Increase inter-item spacing (`space-y-1`).
- The footnote paragraph below the scope ("Recognition reflects…") gets a subtle top divider (`border-t border-border/30 pt-3 mt-4`) so it reads as a clarifier, not a continuation of the list.

### 7. Column rhythm

- Move the long full-width fields (Inspection history, Clinical focus, Background, Sourcing & capability scope) to render *after* all paired rows in a deterministic order — they already do, just confirm the JSX order matches that intent and that `<Row span>` items don't accidentally interrupt the 2-col flow mid-grid.
- Add `align-self-start` semantics by ensuring `<dl>` rows aren't stretching — already the case, just verify with the row padding changes.

### 8. Footer transition

- Remove the duplicate bottom CTA block (see §3).
- The "Public registry record · Upstream reference layer…" micro-line: tighten `mt-6 pb-12` → `mt-5 pb-10` and reduce to `t-utility-xs text-muted-foreground/80` so it sits gracefully into the footer instead of leaving a dead band.
- Section wrapper: `pt-8 pb-4` → `pt-6 pb-2` to remove the extra air before the global footer.

### 9. Responsive QA pass

After the edits, verify at 1920 / 1366 / 1024 / 820 / 414 / 375:

- Long facility names wrap on 2 lines max, never clip.
- Meta line wraps gracefully without orphaned separators (the `·` chars sit between values, never at line start/end — use `whitespace-nowrap` on each pair if needed).
- Visit website button stays right-aligned ≥md, full-width-with-border <md (currently hidden <md — confirm we want it visible on mobile; if yes, render it full-width below the meta line on `<md`).
- Card padding scales: `p-6` mobile, `p-7` md, `p-9` lg.
- Two-column dl collapses cleanly to single column <md (already does — verify row dividers don't double up).

### Files touched

- `src/pages/GreenlistProfile.tsx` — only file changed. All edits are local: title classes, meta line, CTA sizing, card padding, row padding, label tracking, list rendering, removal of duplicate bottom CTA, footer micro-line spacing, responsive button visibility.
- No new components, no token changes, no data changes, no impact on `/greenlist` or any other registry surface.

