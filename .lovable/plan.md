# Typography Standardization Pass

## Goal
One typography system across every page, section, card, registry, modal, footer, and nav — driven entirely by the canonical `t-*` tokens already defined in `src/index.css`. No page should declare its own font sizes, weights, line-heights, or letter-spacing inline.

## Visual success criteria (non-negotiable)
- Every page must feel like it was designed by the same team.
- Users must never perceive a font change when navigating between Home, Vendor Registry, Vendor Profiles, Facility Registry, Facility Profiles, Verification Framework, Governance, Advisory Board, Resource Library, and About.
- Typography must feel institutional, documentation-first, and systemized.
- The platform must resemble a single registry system — not multiple independent microsites.

## Visual output wins (overrides technical compliance)
If a component technically uses the correct token but visually appears inconsistent due to:
- Inherited styles
- Component overrides
- Spacing interactions
- Opacity differences
- Weight stacking (e.g. `font-semibold` on top of an already-bold token)
- Rendering behavior (font smoothing, line-height collapse, container width)

…then adjust the component until the visual result matches the platform standard. **Visual consistency takes precedence over technical token compliance.** "Tokens are correct" is not an acceptable answer if the UI still looks different.

## Current state
The token system is already strong and complete:

| Token | Role |
|---|---|
| `t-page-title` / `t-chapter-title` / `t-home-title` / `t-article-title` | H1 — hero / page / chapter / article titles |
| `t-section-title-sm` / `t-section-title-md` | H2 — major section titles |
| `t-h3` | H3 — card, profile, registry-content titles |
| `t-h4` | H3 (compact variant) — list items, sub-cards |
| `t-body-lg` / `t-section-intro` | Section intro and long-form lead |
| `t-body-md` | Default body |
| `t-body-sm` | Compact body (cards, dense rows) |
| `t-body-strong` | Emphasized body |
| `t-article-body` / `.prose-article` | Long-form publications, FAQ, library |
| `t-label-sm` | Form labels, small labels |
| `t-eyebrow-sm` | Eyebrows above section titles |
| `t-utility-xs` / `t-micro` | Status, tags, registry IDs, section numbers |
| `t-meta` / `t-nav` / `ss-card-meta` | Dates, supporting metadata, nav |

But the codebase drifts from these tokens. A scan finds:
- **43** instances of `text-[Npx]` arbitrary sizes (Footer, QueryBar, Education, button, LibraryCategory, VerifiedVendors, MedicalAdvisory, VendorAuditCard, FilterBottomSheet, etc.).
- **~50** instances of raw Tailwind sizes (`text-xs`/`sm`/`base`/`lg`/`xl`/`2xl`/`3xl`) in app pages plus shadcn primitives that surface user-visible text.
- **504** inline style typography declarations (`fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`) across ~50 pages and components — the single biggest source of drift.
- Mixed weights — `font-semibold`/`font-bold` stacked on top of tokens that already set weight.

These are why pages "feel" different even when nominally using the same tokens.

## Plan

### 1. Lock the canonical scale (no spec change)
Confirm and document the mapping above as the single source of truth. Add a short header comment block at the top of the typography section in `src/index.css` listing exactly which token to use for H1 / H2 / H3 / body / metadata / labels / buttons / nav / footer. No new tokens; no value changes.

### 2. Normalize shared chrome first (highest visual impact)
These touch every page, so fixing them propagates instantly:
- `src/components/SiteHeader.tsx` — nav links → `t-nav`; utility items → `t-utility-xs`.
- `src/components/SiteFooter.tsx` — column titles → `t-utility-xs` uppercase, links → `t-body-sm`, legal row → `t-meta`. Remove the 8 `text-[Npx]` and inline `fontSize` declarations.
- `src/components/GlobalUtilityBar.tsx` — `t-utility-xs`.
- Breadcrumbs / `DocJumpBar` / section-nav bar — `t-utility-xs` uppercase.
- `src/components/ui/button.tsx` — default `t-label-sm`, small `t-utility-xs`. Remove the 4 `text-[Npx]` variants.
- Dialog / Sheet / Drawer / AlertDialog / Tooltip / Toast titles → `t-h4`; descriptions → `t-body-sm`. Update once, all modals inherit.

### 3. Registry & cards
- `VendorRow`, `GreenlistRow`, `VendorAuditCard`, `RegistrySummaryStrip`, `FocusFilter`, `QueryBar`, `FilterBottomSheet` — card titles → `t-h3`/`t-h4`, body → `t-body-sm`, status pills / IDs / counts → `t-utility-xs`, dates → `t-meta`. Strip every `text-[Npx]` and inline `fontSize`/`fontWeight`.
- `BoardSection`, `BriefingHero`, `ArticleHeader`, `ArticleSection`, `ArticleRow` — same treatment.

### 4. Page-by-page sweep
Replace ad-hoc text sizes, inline `fontSize`/`fontWeight`/`lineHeight`/`letterSpacing`, and raw Tailwind sizes with the correct token. Keep colors and layout untouched.

- Home — `src/pages/Index.tsx`
- Vendor Registry — `src/pages/VerifiedVendors.tsx`
- Vendor Profile — `src/pages/VendorProfile.tsx`
- Facility Registry / Profile — `src/pages/Greenlist.tsx`, `src/pages/GreenlistProfile.tsx`
- Verification Framework — `src/pages/HowItWorks.tsx`, `src/pages/VerificationDisclaimer.tsx`
- Advisory Board — `src/pages/MedicalAdvisory.tsx`, `src/pages/AdvisorProfile.tsx`
- Resource Library — `src/pages/Education.tsx`, `LibraryCategory.tsx`, `LibraryEntry.tsx`, `LibraryPublications.tsx`, `LibraryAnalysisQuestionsForYourClinic.tsx`, `src/components/library/FaqPage.tsx`
- About — `src/pages/About.tsx`
- Clinical Oversight (within MedicalAdvisory)
- Governance / Accountability / Privacy / Terms / Status Definitions / Report Concern / For Vendors
- Greenlisted pages
- Site access gate, Source Bot, `Stat` and other system components

### 5. Guardrail
Brief comment block in `src/index.css` listing the canonical tokens and a `do-not-use` note (no `text-[Npx]`, no inline `fontSize`/`fontWeight`/`lineHeight`/`letterSpacing` in app pages or components).

### 6. Final visual audit (gate to "done")
Before closing this task, perform a page-by-page visual audit at both desktop (1440) and mobile (390). Verify:
- **H1s look identical** across Home, Vendor Registry, Vendor Profile, Facility Registry, Facility Profile, Verification Framework, Advisory Board, Resource Library, About, Governance.
- **H2s look identical** across all major pages.
- **Body text looks identical** across all major pages (size, weight, line-height, color).
- **Metadata, dates, tags, registry IDs, status labels, and utility text look identical** across all major pages.
- **Navigation, footer, cards, modals, and dialogs use the same typography language.**

Spot-check at least one modal/dialog, one card grid, one registry row, one profile, and one long-form article during the audit.

**Do not mark complete until visual consistency is verified across the entire platform.** If anything visually drifts despite using the correct token, fix the component (per the Visual Output Wins rule) and re-audit.

## Out of scope
- No changes to colors, layout, spacing, or component structure.
- No changes to mobile breakpoints or container widths.
- No changes to the token values themselves — only how they're applied.
- No edits to `src/integrations/supabase/*`.

## Technical notes
- Prefer adding the token class and removing the override; only fall back to a custom class when a token cannot express the need (rare).
- Where a heading currently uses `font-semibold`/`font-bold` on top of a token, drop the extra weight class — tokens already set weight.
- Shadcn UI files remain stock except for `button.tsx`, dialog/sheet/drawer/alert-dialog title+description, and tooltip/toast — these surface user-visible app text.
- Estimated edit surface: ~50 files. Executed in batched parallel edits grouped by section (chrome → registry → pages A–F → pages G–Z → audit).
