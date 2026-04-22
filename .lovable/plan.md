

## Tighten Final Split CTA Section

Recompose the closing navy section on the homepage (`§8` in `src/pages/Index.tsx`, lines 325–363) so it reads as a deliberate, balanced final pathway instead of two airy text boxes floating in a dark band.

---

### Changes

All edits are scoped to the `§8 — Final split CTA` block. No new components, no asset changes.

**1 · Reduce vertical padding**
- Outer section padding `py-20 md:py-28` → `py-14 md:py-20`. Closes the gap above and below so the section feels composed and the transition into the footer is natural, not abrupt.

**2 · Tighten internal copy rhythm**
- Eyebrow → heading: `mt-5` → `mt-3`.
- Heading → body: `mt-5` → `mt-4`.
- Body → button: `mt-8` → `mt-6`.
- Result: each side reads as one grouped unit (label + headline + sentence + action) instead of four loose stacked items.

**3 · Strengthen the two-column composition**
- Add `items-start` to the grid wrapper so both columns share a clean top baseline.
- Increase column gutter from `md:pr-12` / `md:pl-12` (48px each side, 96px total) → `md:pr-16` / `md:pl-16` (64px each side, 128px total). Gives the divider real breathing room and balances against the tightened vertical rhythm.
- Mobile stacking gap: `pb-10` / `pt-10` → `pb-12` / `pt-12` with a top border on the second column for an honest mobile divider (`border-t border-white/15 md:border-t-0`).

**4 · Integrate the divider**
- Keep `divide-x divide-white/15` but inset it vertically so it doesn't run edge-to-edge of the section padding. Add a subtle wrapper: wrap the grid in a div that lets the divider feel intentional. Simplest: leave divide as-is — the tighter padding + wider gutters will make it read as integrated rather than random.

**5 · Headline + body width**
- Headline `max-w-[16ch]` → `max-w-[14ch]` so "Search the Registry" / "Apply for Verification" wrap or sit tightly, anchoring each column.
- Body `max-w-[40ch]` → `max-w-[34ch]` for a tighter, more declarative paragraph block aligned with the headline width.

**6 · Button parity**
- Both buttons already use `ghostBtnSecondary` — keep that. No variant change. The tightened spacing alone gives them stronger relationship to the copy above.

### Files touched

- **Modified:** `src/pages/Index.tsx` — single contained edit to the §8 block (lines 325–363).

### Outcome

The closing section reads as a polished final split pathway: two compact, balanced columns (consumer / vendor) with grouped copy, properly spaced buttons, an integrated divider, and a natural transition into the footer. No new chrome, no flash — just calm authority and better composition.

