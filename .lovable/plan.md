
## Changes

### 1. Drop the hollow-circle glyph from "What Will I See in a Listing?"

In `src/pages/Index.tsx`, remove `icon="circle"` from the Registry Fields `PageSection`. The heading text sits alone; the checklist's `check` glyphs remain (they carry meaning: "included in every listing"). No conflicting iconography.

### 2. Confirm no duplicate section glyphs in Audience / Governance

The previous pass removed per-item icons from `FeatureItem variant="block"` in the Audience and Governance sections. Re-verify `src/pages/Index.tsx` renders `<FeatureItem title=... desc=... variant="block" />` with **no** `icon` prop for both sections. If any residual `icon={...}` prop remains, remove it. `FeatureItem` already skips the icon slot cleanly when `icon` is absent.

## Icon hierarchy (going forward)

Codify the rule in the `FeatureItem` and `PageSection` doc comments so future work respects it:

- Section headings: at most one contextual glyph, only if it improves recognition.
- Checklist items: `check` only.
- Navigation: chevrons/arrows only.
- Trust pillars: no repeated section glyphs.
- Never show the same icon twice within a section.

## Verification

- `bunx tsgo --noEmit` clean.
- Playwright at 390×779: screenshot Registry Fields, Audience, Governance sections. Confirm:
  - Registry Fields heading has no glyph; checklist keeps its checks.
  - Audience heading shows `handshake` once; child items have no icons.
  - Governance heading shows `scale` once; child pillars have no icons.

## Not in scope

Other sections, other pages, copy, colors, typography.
