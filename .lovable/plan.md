# Desktop Polish Pass

The site is built mobile-first and looks tight on phones, but on desktop everything stays mobile-sized: small headings (22px), narrow text columns hugging the left edge, single-column card stacks, and shallow vertical spacing. On a 1336px screen this leaves huge empty gutters and makes the page feel like a phone screenshot stretched wide.

The fix is a *desktop tier* of styles — not a redesign. Mobile stays exactly as it is.

## What changes on desktop (≥1024px)

### 1. Hero (homepage)
- Lift the H1 ("Verify the source.") from current size to **64–72px** with tighter letter-spacing.
- Restore center alignment on desktop (currently it left-aligns at `lg:` — that was a mobile-leftover override).
- Center the supporting paragraph below at a comfortable **600px** measure.
- Center the two action pills and the Live Registry metrics block under them.
- Add a small amount of vertical breathing room so the hero fills the viewport without feeling crammed at the top.

### 2. Section headings (sections 1–7 on the homepage)
Each section currently uses 22px headings + 13px body — phone sizes. On desktop:
- Eyebrow (e.g. "01 · Problem"): 11px, slightly more letter-spacing.
- H2: **32px** at lg, **36px** at xl.
- Body paragraph: **15px**, line-height 1.7, max measure 65ch.
- Section vertical padding: **80px top/bottom** at lg (currently 36px everywhere).

### 3. Card grids (DataStrip rows)
- "How it works", "Function", "Reference", "Governance" stay in their grids but get more generous gap (24px) and slightly larger inner padding at lg.
- Card title 15px, body 14px on desktop.
- Keep the card style — just scale the type, don't redesign.

### 4. Centering vs. left-aligned
Each section content block stays inside the existing `w-standard` (1120px) container, centered on the page. We keep section *content* left-aligned within that column (that's the institutional/registry feel — Stripe and gov directories do the same). Only the hero is centered.

### 5. Other pages (light pass)
Apply the same desktop typography tier to:
- **Verified Vendors / Greenlist** — slightly larger header bar, more padding above the table.
- **About, How It Works, Medical Advisory, Education** — same heading + body scaling, same section padding bump.
- **Library articles** — already use a reading column; just verify desktop padding.

No layout restructuring on these — purely the desktop type/spacing tier.

## What does NOT change
- Mobile layout, sizing, and behavior — untouched.
- Brand colors, fonts, card styles, navigation, footer.
- Any backend, routing, or data.
- The password gate.

## Technical notes
- Add `lg:` and `xl:` Tailwind variants directly to the existing classes/inline styles in `src/pages/Index.tsx` and the shared section primitives.
- Where inline `style={{ fontSize: ... }}` is used for mobile, wrap a media query or replace with Tailwind responsive utilities so desktop can override.
- Bump `.section-pad` desktop value in `src/index.css` if it's currently low.
- Touch points: `src/pages/Index.tsx`, `src/components/BriefingHero.tsx` (cover variant lg branch), `src/components/PageHeader.tsx`, `src/components/system/Section.tsx`, plus a small responsive sweep on the registry/about/education pages.

After approval I'll implement, then walk through each major page at 1336px and confirm it reads naturally.
