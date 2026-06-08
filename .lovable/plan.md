
## Goal

Add a new top-level page **Partners & Infrastructure** that documents the verification infrastructure, partner network, research partnership with Open, and the source-vs-outcomes thesis. The page must read as institutional infrastructure documentation, not marketing, and must be designed mobile-first.

## Navigation

- Insert `{ to: "/partners", label: "Partners & Infrastructure" }` into the `nav` array in `src/components/SiteHeader.tsx`, positioned between **Verification Framework** (`/how-it-works`) and **About Source Standard** (`/about`). Mobile nav inherits this automatically via `mobileNav`.
- Register the route in `src/App.tsx` under the existing `SiteLayout` route group, lazy-loaded to match peer pages.

## New page: `src/pages/Partners.tsx`

Built from existing system primitives (`Section`, `PageShell`, `Eyebrow`, `PageTitle`, `SectionHeading`, `Lead`) so spacing, width tokens, typography, and dividers match the rest of the site automatically. No new tokens, no new colors, no gradients, no shadows, no animations beyond existing standards. Uses `PageMeta` for SEO.

### Page header
- Eyebrow: "Infrastructure"
- `PageTitle`: "Partners & Infrastructure"
- `Lead`: one sentence framing the page as public infrastructure documentation.

### Section 1 — Verification Infrastructure
- `SectionHeading`: "Independent Verification Infrastructure"
- Two body paragraphs verbatim from the brief.
- Laboratory partner cards rendered as a responsive grid: `grid-cols-1 md:grid-cols-2` (single column on mobile, two on tablet+, never cramped). Cards use the existing registry hairline style (1px border, no shadow, square corners) — visually consistent with `VendorRow` / `VendorAuditCard`.
- Card fields (each row a labeled hairline row using `t-utility-xs` label + `t-body-sm` value):
  - Laboratory Name (card title, `h-card`)
  - Testing Capabilities
  - Verification Status (rendered with existing `StatusBadge` where applicable)
  - Accreditation Information
  - Website Link (uppercase utility link, arrow glyph — no button styling)
- Seed with 2–3 placeholder labs (e.g. "Independent Laboratory — Placeholder A/B/C") clearly marked as placeholders so they can be swapped later. No fabricated accreditations.

### Section 2 — Verification Network
- `SectionHeading`: "Verification Network"
- Two body paragraphs verbatim from the brief.
- Process flow with five steps: **Intelligence Partners → Facility Verification → Independent Testing → Source Standard Registry → Ongoing Monitoring**.
  - **Mobile (default):** vertical stack. Each step is a hairline-bordered tile (full-width, 1px border, no fill). A thin 1px vertical connector line (`bg-border`) with a small downward chevron sits between tiles.
  - **Desktop (`lg:` breakpoint up):** five tiles laid out horizontally in a `flex` row with 1px horizontal connector lines and right-chevron glyphs between them. No layout shift below `lg` to avoid the cramped intermediate state.
  - Numbers (01–05) shown in mono eyebrow style above each step label for institutional feel.

### Section 3 — Research Infrastructure
- `SectionHeading`: "Research Infrastructure"
- Single full-width partner card for **Open**, styled identically to the laboratory cards (same border, padding, label/value rows):
  - Logo: the uploaded Open screenshot, brought in via `lovable-assets` from `/mnt/user-uploads/Screenshot_2026-05-22_at_3.07.00_AM.png` and imported as an asset pointer. Displayed at a restrained height (≤40px on mobile, ≤48px on desktop), left-aligned inside the card header. Alt: "Open".
  - Organization Name: "Open"
  - Classification: "Clinical Intelligence Partner"
  - Description: the four-paragraph block from the brief (Open's focus, the source-vs-response framing, the two complementary layers).
  - Website Link Placeholder: utility link reading "Website — Coming Soon" rendered as disabled-style muted text (no anchor) so no dead link ships.

### Section 4 — Source Integrity + Clinical Intelligence
- `SectionHeading`: "Source Integrity + Clinical Intelligence"
- Two-card split: `grid-cols-1 lg:grid-cols-2` with a 1px divider between them on `lg` (border-left on the second card) and stacked on mobile/tablet.
  - Left card: question "Was the source trustworthy?" + Source Standard answer.
  - Right card: question "What happened after it was used?" + Open answer.
  - Questions rendered as `t-section-title-sm` quoted; answers as `t-body-md` muted.
- Below the grid, a centered closing line in italic serif treatment matching existing editorial pull-quotes: *"Trust begins with verified sources. Progress depends on measurable outcomes."* Separated from the cards by a 1px hairline and the standard section rhythm.

### Dividers & rhythm
- Each `Section` uses `bordered` (existing 1px top hairline) so section separation is automatic and consistent with the rest of the site. No additional custom dividers.

## Mobile-first guarantees
- Default classes target mobile; `md:` and `lg:` only widen layouts.
- No `overflow-x` anywhere; process row uses `flex-wrap` fallback under `lg`.
- Partner cards always full-width on mobile, two-up only from `md`.
- Split section stacks until `lg`.
- Typography uses existing global tokens — no per-page font sizes.

## Sitemap
- Add `/partners` to `scripts/generate-sitemap.ts` so the page is indexed.

## Files touched

- `src/components/SiteHeader.tsx` — insert nav entry.
- `src/App.tsx` — register lazy route.
- `src/pages/Partners.tsx` — new page (only new component file).
- `src/assets/open-logo.png.asset.json` — Open logo asset pointer created via `lovable-assets` from the uploaded image.
- `scripts/generate-sitemap.ts` — add `/partners`.

No backend, no schema, no new dependencies.

## Success criteria
- New nav item appears between Verification Framework and About on desktop and in the mobile overlay.
- `/partners` renders the four sections with content matching the brief verbatim.
- On a 390px viewport: single column throughout, no horizontal scroll, vertical process flow, stacked split section.
- On `lg`+: lab cards two-up, process flow horizontal, split section two-up with hairline divider.
- Visual language indistinguishable from the rest of the site — same borders, same type scale, same spacing rhythm, no shadows/gradients/marketing flourishes.
