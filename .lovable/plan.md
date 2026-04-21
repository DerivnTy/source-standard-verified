

## Update Homepage Hero — Plain, Neutral Tone

Revise only the first section of `src/pages/Index.tsx` (§1 Public statement). No other sections, files, or pages change.

### Changes

**Eyebrow label**
- From: `Public reference · Verification authority`
- To: `Public reference`

**Headline**
- From: "The public reference for verified vendors in peptide, TRT, and hormone optimization."
- To: `A public record of vendor verification and recognized sources.`

**Supporting paragraph**
- Replace existing copy with: "Source Standard was created to make vendor sourcing and verification easier to understand. The site allows visitors to review verified vendors, recognized upstream sources, and the standards used to evaluate documentation in peptide, TRT, and hormone optimization markets."

**Add three action buttons** (new — currently the hero has none)
- `Verified vendors` → `/verified-vendors` (primary)
- `Greenlist` → `/greenlist` (outline)
- `About` → `/about` (outline)
- Placed below the supporting paragraph, left-aligned, using the existing `Button` component with `size="lg"` to match the styling already used elsewhere on the page.

### Preserved as-is

- The right-hand "Standard at a glance" metadata card stays exactly as it is.
- The `MetadataBar` above the hero stays unchanged.
- All other sections (§2 through §8) untouched.
- Layout grid (`md:col-span-8` / `md:col-span-4`) preserved.

### File edited

- `src/pages/Index.tsx` — single section edit, lines covering the §1 left column only.

