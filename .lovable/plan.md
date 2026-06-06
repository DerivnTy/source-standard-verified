## Goal

Make the Home page's typography the single source of truth across the platform. Today, `Index.tsx` uses inline-styled custom classes (`home-eyebrow`, `home-h2`, `home-lead`, plus `PillPrimary` / `PillSecondary`). Other pages use ad‑hoc Tailwind sizes (`text-3xl`, `text-2xl`, `text-base`, etc.). This pass turns the Home patterns into reusable utilities and applies them everywhere.

## Standard (extracted from `Index.tsx`)

- **Section label (eyebrow)** — `font-mono uppercase text-muted-foreground`, `10px`, `letter-spacing 0.08em`. Format: `01 · Methodology`.
- **Section title** — `font-sans font-semibold text-foreground`, `22px`, `line-height 1.25`, `letter-spacing -0.01em`, `mt-3` after eyebrow.
- **Body / lead** — `text-muted-foreground`, `13px`, `line-height 1.65`, `mt-4`. Optional "lead-card" wrapper: white card, `0.5px` border, `12px` radius, `8px 18px 12px` padding.
- **Card title (DataStrip pattern)** — sans semibold `15px`, tight leading; subtitle `13px` muted.
- **Buttons** — `PillPrimary` / `PillSecondary` (already shared components). Single-word or short verb labels, no all‑caps.
- **Section spacing** — `paddingTop/Bottom: 24px` on the `<section>`, `mt-5` between title block and content grid, `mt-3` for trailing CTA.

## Step 1 — Codify in `index.css`

Add semantic utility classes that map 1:1 to the Home inline styles, then update `Index.tsx` to use them (no visual change, just removes inline `style={{...}}`):

```
.ss-eyebrow      → mono 10px uppercase, tracking 0.08em, muted
.ss-section-title → sans 22px / 1.25 / -0.01em, semibold
.ss-lead         → 13px / 1.65, muted
.ss-lead-card    → white card, 0.5px border, 12px radius, 8/18/12 padding
.ss-card-title   → sans semibold 15px / 1.3
.ss-card-meta    → mono 11px uppercase 0.06em muted
.ss-section      → py-6 (24px top/bottom), border-b border-border
```

These live alongside the existing `.home-*` classes (kept as aliases) so nothing on Home regresses.

## Step 2 — Apply to listed pages

For each page below, swap ad‑hoc heading/body/eyebrow styling for the new `ss-*` utilities. Layout, colors, spacing scale, and functionality stay untouched.

1. `VerifiedVendors.tsx` (Vendor Registry) — page header + section blocks.
2. `Greenlist.tsx` (Facility Registry) — page header + section blocks.
3. `MedicalAdvisory.tsx` (Advisory Board) — section titles, member card titles, body copy.
4. `Education.tsx` + `EducationBasics.tsx` / `EducationGuides.tsx` / `EducationQuestions.tsx` (Resource Library) — section titles, card titles, body.
5. `HowItWorks.tsx` (Verification Framework) — step titles, body, eyebrows.
6. `About.tsx` (About Source Standard) — section titles, body.
7. `VendorProfile.tsx` and `GreenlistProfile.tsx` — profile section headers, field labels, body.
8. `StatusDefinitions.tsx` and `Governance.tsx` — already linked from nav, included for consistency.

Registry **row/card** components (`VendorRow.tsx`, `GreenlistRow.tsx`) are already aligned from prior passes — I'll verify their title/meta sizes match `ss-card-title` / `ss-card-meta` and adjust only if they drift.

Library long-form entry pages (`Library*.tsx`) are out of scope unless you want them included — they currently use a prose-style hierarchy that's intentionally different from registry/section pages. **Confirm if you'd like those included.**

## Step 3 — QA

- Build passes.
- Spot-check Home, Vendor Registry, Facility Registry, Advisory, Resource Library, Verification Framework, About at 390×844 (current viewport) and desktop.
- Confirm eyebrows, section titles, body, and buttons render identically across pages.

## Out of scope

- No layout changes, no color changes, no filtering/functionality changes.
- No redesign of card structures — only the typography inside them.
- Long-form library entry pages unless you confirm.

## Confirm before I start

1. Include the long-form `Library*.tsx` entry pages, or skip them?
2. OK to introduce the `ss-*` utility classes in `index.css` (keeping `home-*` as aliases so Home is byte-identical)?
