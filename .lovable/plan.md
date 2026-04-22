

## Widen Closing Explanatory Sections to Match Site Layout Grid

The Greenlist bottom block uses `max-w-[760px]` — the editorial reading-column measure intended for Library article pages (`ArticleHeader`, `ArticleSection`, `BriefingHero`). On data/registry pages it reads as a narrow leftover because the table/content above spans the full `container-wide` (1280px). Bring closing/explanation/note blocks on non-article pages up to a structured wider measure that aligns with the page's primary content grid, without going full-bleed.

### Target measure

- **Closing/explanatory sections on registry & index-style pages → `max-w-[1040px]`** (matches the visual rhythm of the data above, leaves disciplined side gutters inside `container-wide`).
- **Article/library reading pages → keep `max-w-[760px]`** (intentional 65–75ch reading measure; do not touch).

### Changes

**1 · `src/pages/Greenlist.tsx` (line 564)**
- `max-w-[760px] mx-auto` → `max-w-[1040px] mx-auto` on the "Two layers, one framework" closing block.
- Inner Note paragraph keeps `max-w-[68ch]` so the disclaimer text retains a readable measure even inside the wider container — this preserves legibility while the framing aligns to the page grid.
- Optional: switch the `<p>` body explanation to `max-w-[78ch]` so the long sentence doesn't stretch edge-to-edge and stays comfortable to read inside the wider container.

**2 · `src/pages/Education.tsx` (lines 451–470)** — "About this library" closing notice
- Already uses `container-wide` directly with `max-w-3xl` (~768px) on the body paragraph. Bring it in line with the new pattern: wrap content in `max-w-[1040px] mx-auto`, keep the body paragraph clamped to `max-w-[78ch]` for legibility. Same visual system as Greenlist.

**3 · No changes** to:
- `src/components/ArticleHeader.tsx`, `src/components/ArticleSection.tsx`, `src/components/BriefingHero.tsx` — these are the editorial reading column for Library/article pages. Their 760px is correct.
- All `Library*` pages — they consume `ArticleSection` and inherit the correct reading measure.

### Pattern going forward

- **Reading pages (Library/articles)** → `max-w-[760px]` editorial column.
- **Registry / index / data pages** closing or explanatory blocks → `max-w-[1040px]` outer frame, with inner long-form paragraphs clamped to `max-w-[78ch]` (body) or `max-w-[68ch]` (notes/disclaimers) for legibility.

### Files touched

- `src/pages/Greenlist.tsx` — widen closing block container, clamp inner paragraphs for legibility.
- `src/pages/Education.tsx` — same pattern applied to "About this library" notice.

### Outcome

Closing and explanatory blocks on non-article pages now align to the site's wider content grid instead of borrowing the narrow article reading measure. Long-form paragraphs inside still respect a comfortable reading width, so the section feels structurally aligned with the page above without becoming awkwardly wide.

