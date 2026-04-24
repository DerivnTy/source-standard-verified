

# Final Surgical Pass — Homepage + VendorProfile

Bring the two remaining high-traffic surfaces into the same density, typography, and "Public Record" architecture already locked in for Greenlist and the Vendor Directory.

## 1. Homepage (`src/pages/Index.tsx`)

Goal: stop feeling like a marketing landing page, start feeling like the cover of a regulatory dossier.

- **LiveDashboard strip** — tighten to a single hairline-bordered row of 3 cells (Total Sources / States Covered / Verified). 14px Inter Semi-bold value, 10px Geist Mono uppercase label, 0.5px dividers between cells, no card shadows.
- **Section rhythm** — collapse vertical padding from current `py-24`-style blocks down to ~48px top/bottom. Remove decorative empty space between sections.
- **"How it works / Fields / Why it matters / Basics / Governance" lists** — convert each from prose blocks into the same 2-row Data Strip used in registries:
  - Row 1: short title (14px) + Geist Mono index (e.g. `01 / 05`)
  - Row 2: one-line description + `VIEW ›` link where it routes somewhere
- **CTAs** — replace the 4 ghost/dark button variants with a single pill button style (32px height, 20px radius, 1px hairline, navy primary / white secondary) to match filter pills.
- **HeroPattern / BriefingHero** — keep content, but cap hero height, drop any blur/shadow, ensure pure white background continues edge-to-edge under the Smart Reveal header.

## 2. VendorProfile (`src/pages/VendorProfile.tsx`)

Goal: same one-screen "Public Record" treatment Greenlist now has.

- **600px centered record card**, 0.5px hairline border, 24px internal padding, white background.
- **Authority header**: vendor name (18px Inter Semi-bold) left, surgical green `VERIFIED` / amber `PENDING` / muted `UNVERIFIED` text right (no badge boxes). Below: navy category pill + Geist Mono vendor ID.
- **Single Public Record grid** (2 columns, label 10px muted caps / value 12px navy Inter):
  - Category, Source Type, Location, License / ID, Verification Date, Website (underlined hostname link)
  - When `status === "verified"`, append a second hairline-separated grid for verified scope fields (audit date, scope, upstream sources) using the same Cell pattern.
- **Delete**: standalone "About" prose block, "Trust Record" duplicate section, large "Visit Website" CTA, redundant location icons. Keep `<Breadcrumb />` and `<PageMeta />` above the card.
- **Back link** styled identically to Greenlist's `← Back to Directory` (10px caps, muted → foreground on hover), sitting outside the card.

## 3. Consistency sweep (small)

- Ensure all remaining `border-color` usages on cards/pills route through `hsl(var(--border))` so no hard-coded `#E5E5EA` slips through.
- Verify Index, Directory, Greenlist, Education, Profiles all share: Smart Reveal header, white page background, identical pill/filter geometry.

## Files to touch

- `src/pages/Index.tsx` — section density + Data Strip lists + LiveDashboard tightening + unified CTA pill
- `src/components/BriefingHero.tsx` — hero height cap + remove decorative depth (read first to confirm scope)
- `src/pages/VendorProfile.tsx` — full refactor to Public Record card mirroring `GreenlistProfile`
- (Read-only check) `src/components/HeroPattern.tsx`, `src/components/system/Stat.tsx` to reuse where possible

## Out of scope

- No content/copy changes
- No data model changes
- No new routes
- Auth, backend, analytics — untouched

