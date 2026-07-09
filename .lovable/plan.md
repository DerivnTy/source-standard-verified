
## Change

Remove per-item icons from the two `FeatureItem variant="block"` sections on the homepage. The section-level glyph next to each heading already establishes context; repeating icons on every child item adds vertical space and visual noise without improving comprehension.

Affected sections in `src/pages/Index.tsx`:

- **"Who Is This For?"** — drop the icons on For consumers · For providers · For the industry.
- **"Who Stands Behind This?"** — drop the icons on Independent Governance · Advisory Board · Public Standards.

## Implementation

`FeatureItem` currently requires `icon`. Make it optional (`icon?: GlyphName`). When absent:
- `variant="block"`: skip the top icon slot entirely (no reserved space, no `margin-bottom` gap).
- `variant="row"`: skip the left gutter — title/desc fill the row.

Then in `Index.tsx`, drop the `icon` prop from the six items in those two sections. The Registry Fields checklist keeps its `check` icons (they carry meaning — "included in every listing").

## Verification

- `bunx tsgo --noEmit` clean.
- Playwright at 390×779 and 1280×1800: screenshot both sections. Confirm titles now sit flush at the left edge of the block, spacing feels tighter, and the section glyph still provides context in the heading row.
- Registry Fields checklist unchanged.

## Not in scope

Section headings, glyphs, copy, other sections, other pages.
