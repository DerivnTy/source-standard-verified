

## Institutional Modern reskin — site-wide visual overhaul

A tokens-first refresh so the new aesthetic propagates to every page without rewriting them. Three files do most of the work (`index.css`, `tailwind.config.ts`, plus a small `HeroPattern` component); a handful of structural touches harmonize the header, cards, and hero bands.

---

### 1 · Color system — Authority navy + Clinical teal

Rewrite the design tokens in `src/index.css`. Same variable names so every existing component picks up the change automatically.

- **Background**: warmer near-white `0 0% 98.5%` with a subtle cool cast on sunken surfaces (`210 24% 96%`) so cards feel elevated.
- **Foreground / Authority**: deep institutional navy `216 45% 12%` (replaces near-black). Used for headings, primary buttons, the dark FAB, and structural bars.
- **Primary / Clinical action**: confident teal-blue `198 78% 36%` with `198 78% 30%` hover. This is the "Safety/Action" tone — applied to active nav, CTAs, links, and verification chips.
- **Verified**: keep green but cooler/cleaner (`158 52% 30%`), softer tint background.
- **Borders**: lighter, cooler hairlines (`215 22% 90%`) plus a stronger variant for dividers.
- **Shadows**: replace the near-flat shadows with a real elevation ladder — `sm` for resting cards (`0 1px 2px / 0.04`), `md` for hover (`0 6px 20px -8px navy / 0.10`), `lg` for floating panels (`0 16px 40px -12px navy / 0.14`). Tinted with the navy hue, not pure black, so depth reads "institutional," not "Material."
- **Dark mode**: matched palette (deeper navy background, brighter teal primary).

### 2 · Geometry & radius

- `--radius` lifted from `0.25rem` → `0.625rem` (10px). Tailwind's `rounded-md/lg/xl` all inherit this through the existing config, instantly softening every card, input, button, badge, dialog, and dropdown across the site.
- Buttons and inputs get a consistent height (`h-10`/`h-11`) and the new radius reads as accessible-precise rather than sharp-technical.

### 3 · Typography — geometric sans + tighter headings

- Swap the global font from Inter → **Geist** (with Inter fallback), loaded from Google Fonts. Geist is the 2026 institutional-tech default — geometric, neutral, headline-ready.
- Headings (`h1`/`.display-1`/`.title-page`) bumped to `font-weight: 600` with tighter tracking (`-0.025em` on display, `-0.018em` on h1) for the "headline-news" feel requested.
- Body stays 16/1.6; helper text 13/1.55. Mono remains IBM Plex Mono for the few legitimate technical IDs (Doc IDs in metadata bars).

### 4 · Hero pattern — faint geometric mesh

New file `src/components/HeroPattern.tsx`: a presentational `<div>` rendering an inline SVG grid (8% opacity navy lines on a 32px square, with a soft radial-gradient mask that fades it to transparent at the edges). Pure CSS/SVG, no images, no perf cost.

Mounted as an absolutely-positioned background layer in:
- The homepage hero (`Index.tsx`, inside the `<section>` that wraps the display-1 block).
- The `AnchorHeader` component (so every anchor page — Verified Vendors, Greenlist, Education, etc. — inherits the same texture in its header band).
- The Source Standard Assistant header strip.

This delivers the requested "abstract data-grid map" signal everywhere headers appear, with one component edit.

### 5 · Card & surface depth

A small set of utility classes added to `index.css` that pages already use indirectly via tokens:

- `.card-elevated` — `bg-surface border border-border/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200`. The existing `LibraryTile`, FAQ category cards, and analysis cards on Education already match this shape, so they just inherit the new tokens. The Greenlist/Vendor table rows stay tabular (registries should look like registries) but get the new border + radius.
- `.surface-band` — soft `bg-surface-sunken/60` band used for section separators, replacing several `bg-muted` strips that currently read as flat gray.
- Increased default vertical rhythm: `.space-section` → `py-20 md:py-28`, `.space-section-tight` → `py-12 md:py-16`. Content breathes more without per-page edits.

### 6 · Header polish (`SiteHeader.tsx`)

- Sticky header gets a faint backdrop blur (`backdrop-blur-md bg-background/85`) and a hairline shadow on scroll-feel — matches the modern fintech-portal cue.
- Active nav underline switches from primary slate to the new clinical-teal primary (already automatic via tokens) and thickens slightly.
- "Apply for verification" CTA moves to the navy `bg-foreground` treatment with the new radius — same dark button language as the chat FAB, so the two read as a paired system.
- Mobile menu sheet picks up the new radius + shadow tokens automatically.

### 7 · Education page — final cleanup per brief

The brief reiterates "remove the search bar from the header of the Education page." That was done in the previous round; this plan **confirms** it stays gone and verifies no stray search input remains at the top of `src/pages/Education.tsx`.

### 8 · Source Bot — already shipped, light polish

The "Clinical Assistant" FAB + chat window already exist site-wide via `SiteLayout`. Minor polish to align with the new system:
- Rename header label to **"Clinical Assistant"** (per brief copy).
- FAB picks up new shadow-lg token automatically.
- Chat window header gets the `HeroPattern` overlay at very low opacity for the "tech signal" without clutter.
- Bubble radius inherits the new `--radius` for consistency.

---

### Files touched

- `src/index.css` — full token rewrite (palette, radius, shadows, typography, new utility classes, vertical rhythm).
- `tailwind.config.ts` — `fontFamily.sans` switched to Geist (Inter fallback); no other structural changes required since colors/shadows/radii flow through CSS vars.
- `src/components/HeroPattern.tsx` — **new**, faint SVG mesh background.
- `src/components/SiteHeader.tsx` — backdrop blur + CTA restyle + mount `HeroPattern` in non-home utility band.
- `src/components/AnchorHeader.tsx` — mount `HeroPattern` behind the eyebrow/title block.
- `src/pages/Index.tsx` — mount `HeroPattern` in the institutional hero section.
- `src/components/SourceBot.tsx` — relabel to "Clinical Assistant," add subtle pattern in header, inherit new tokens.
- `src/pages/Education.tsx` — confirm/remove any residual search input at the top.

### What stays the same

Every route, every data file, all page logic, every component API. Because the change is driven by CSS variables + the existing Tailwind token mapping, the new look propagates to dialogs, dropdowns, sheets, popovers, badges, tables, forms, and every existing card without per-component edits.

