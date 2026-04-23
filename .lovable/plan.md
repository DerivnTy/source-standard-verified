

## Global Change 01 — Unify First-Section Hero Treatment to Navy

Make every main institutional page open with the same deep navy hero surface as the homepage. The component to standardize on already exists: `BriefingHero` with `tone="navy" variant="chapter"` (see `src/components/BriefingHero.tsx` lines 140–175). It renders the navy surface, the `HeroPattern` overlay, the eyebrow, the H1, and the supporting paragraph in the exact rhythm used by the homepage cover, just at chapter weight.

This pass is background-treatment only. No copy, no structure, no waypoint nav, no "Statement of purpose" §2 block changes.

### What changes per page

For each page below, replace the hand-rolled white `§1 Hero` `<section>` with a single `<BriefingHero tone="navy" variant="chapter" category={eyebrow} title={h1} statement={leadParagraph} docId="" />`. Keep the existing `Breadcrumb` and `PageMeta` above it. Keep everything from `§2` onward exactly as-is.

| Page | File | Eyebrow → `category` | H1 → `title` | Lead → `statement` |
|---|---|---|---|---|
| About | `src/pages/About.tsx` | "Organization & Mandate" | existing H1 | existing `heroDescription` |
| Verification | `src/pages/HowItWorks.tsx` | existing eyebrow | existing H1 | existing `heroDescription` |
| Medical Advisory | `src/pages/MedicalAdvisory.tsx` | "Medical Advisory Board" | "Clinical Oversight" | existing lead paragraph |
| Resource Library | `src/pages/Education.tsx` | existing eyebrow | existing H1 | existing `HERO_DESCRIPTION` |
| Terms | `src/pages/Terms.tsx` | "Registry User Agreement" | "Terms of Use" | existing `heroDescription` |
| Privacy | `src/pages/Privacy.tsx` | existing eyebrow | existing H1 | existing `heroDescription` |
| Status Definitions | `src/pages/StatusDefinitions.tsx` | existing eyebrow | existing H1 | existing `heroDescription` |
| Enforcement | `src/pages/Accountability.tsx` | existing eyebrow | existing H1 | existing `heroDescription` |
| Verification Disclaimer | `src/pages/VerificationDisclaimer.tsx` | existing eyebrow | existing H1 | existing `heroDescription` |

The homepage (`Index.tsx`) is already correct (`variant="cover" tone="navy"`) — no change.

### What does NOT change

- `Breadcrumb` placement and content.
- The `§2 Statement of purpose` white block on each page — it stays white. This change unifies the **opening surface only**, not subsequent sections.
- `SectionAnchorNav` placement and behavior.
- All `SplitSection` / `ClauseList` content blocks.
- Typography tokens, spacing tokens, page widths.
- Routing.

### Explicitly excluded from this pass (per the user's stated exception)

- Registry / database surfaces: `VerifiedVendors.tsx`, `Greenlist.tsx`, `VendorProfile.tsx`, `GreenlistProfile.tsx`, `AdvisorProfile.tsx`, `LibraryEntry.tsx` and the per-article library pages, `LibraryCategory.tsx`, `Apply.tsx`, `Contact.tsx`, `ReportConcern.tsx`, FAQ category interiors. These are product/database/intake/article surfaces and already use the right treatment for their function (some already use `BriefingHero tone="navy"`, others are intentionally form/article-flavored). Out of scope for this pass.

### Files touched

- `src/pages/About.tsx`
- `src/pages/HowItWorks.tsx`
- `src/pages/MedicalAdvisory.tsx`
- `src/pages/Education.tsx`
- `src/pages/Terms.tsx`
- `src/pages/Privacy.tsx`
- `src/pages/StatusDefinitions.tsx`
- `src/pages/Accountability.tsx`
- `src/pages/VerificationDisclaimer.tsx`

No component changes — `BriefingHero` already supports the target rendering exactly.

### Result

Moving between Home → About → Verification → Medical Advisory → Resource Library → Terms → Privacy → Status Definitions → Enforcement → Verification Disclaimer, every page opens on the same deep navy institutional surface with the same eyebrow/H1/lead rhythm. The §2 white "Purpose" block becomes the first transition into reading-density content on each page, creating a consistent navy → white → structured-sections cadence sitewide.

