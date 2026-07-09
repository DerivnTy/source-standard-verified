## Change

Update the homepage so adjacent sections do not reuse the same contextual glyph.

### `src/pages/Index.tsx`

- **"How Does Source Standard Verify?"**: change `icon="search"` → `icon="shield-check"`.

- **"What Does the Registry Cover?"**: keep `icon="search"`.

The verification section represents the verification framework, while the registry section represents discovery and lookup. Their icons should communicate different purposes.

### `src/components/system/FeatureItem.tsx`

Extend the existing icon hierarchy documentation to define semantic usage rather than page-specific usage:

- `search` — discovery, lookup, registry browsing.
- `shield-check` — verification, trust, validation.
- `check` — checklist items or included attributes.
- `scale` — governance, standards, accountability.
- `graduation-cap` — education and learning resources.
- `handshake` — audiences, partners, collaboration.

Also document these general principles:

- Section glyphs provide context for the section, not decoration.
- Interactive elements use arrows or chevrons, not contextual glyphs.
- Checklist items use checkmarks only.
- Avoid repeating the same contextual glyph in adjacent sections unless the repeated meaning is intentional.

## Verification

- `bunx tsgo --noEmit`

- Playwright mobile screenshot covering:
  - "How Does Source Standard Verify?"
  - "What Does the Registry Cover?"

Confirm:
- Verification uses `shield-check`.
- Registry uses `search`.
- Adjacent sections no longer repeat the same glyph.
- No spacing or alignment regressions.

## Not in scope

No copy, layout, spacing, colors, or typography changes.