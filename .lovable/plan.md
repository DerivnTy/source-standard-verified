

## Integrate New Source Standard Logo

Replace the current SVG checkmark mark + wordmark with the new approved shield-S logo across the three brand touchpoints: header, footer, and homepage cover hero. Keep usage disciplined — three placements total, no decorative scattering.

---

### 1 · Add the logo asset

- Copy the uploaded image to `src/assets/source-standard-logo.png` (full lockup: shield + "Source Standard" wordmark, navy on transparent/white).
- Also save a shield-only crop as `src/assets/source-standard-mark.png` for compact contexts (used in the footer column where the wordmark would be redundant against the existing column copy — actually we'll use the full lockup; see below).
- For dark/navy backgrounds (homepage cover hero), generate a white/reversed version `src/assets/source-standard-logo-light.png` by recoloring the navy artwork to white. This keeps contrast clean against `--navy-surface` without restyling the mark.

### 2 · Refactor `src/components/Logo.tsx`

Replace the inline SVG (square + checkmark) and the adjacent text span with a single `<img>` of the full lockup. The wordmark is already part of the artwork, so the separate `<span>Source Standard</span>` is removed.

- Add a `variant?: "dark" | "light"` prop (default `"dark"`).
  - `"dark"` → loads `source-standard-logo.png` (navy mark, for light surfaces — header, footer).
  - `"light"` → loads `source-standard-logo-light.png` (white mark, for navy surfaces — homepage hero).
- Render: `<Link to="/"><img src={...} alt="Source Standard" className="h-7 md:h-8 w-auto" /></Link>`.
- Header height target: ~28–32px (fits the 64px nav row with breathing room, matches current visual weight).
- Preserve `aria-label`, hover opacity, and `className` passthrough.

### 3 · Header (`src/components/SiteHeader.tsx`)

No change to JSX — `<Logo />` already renders in the top-left. The new component output will scale correctly inside the existing `h-16` row. Verify spacing visually; if the lockup feels too tall, drop to `h-7` only.

### 4 · Footer (`src/components/SiteFooter.tsx`)

No change to JSX — `<Logo />` already sits at the top of the first footer column. The new lockup replaces the old mark + wordmark in the same slot. The "Source Standard · United States" caption beneath stays as supporting locality text (it's not a duplicate brand line — it adds geography).

### 5 · Homepage cover hero (`src/pages/Index.tsx` + `src/components/BriefingHero.tsx`)

The cover hero currently uses a `brandMark` prop that renders a large serif word ("Source Standard" or similar) above the H1 on the navy surface. Replace this typographic brandMark with the actual logo lockup so the homepage opens with the real mark, not a serif facsimile.

- In `BriefingHero.tsx`, in the cover-variant block (lines 88–96), swap the `<p>` rendering `{brandMark}` for `<img src={lightLogo} alt="Source Standard" className="mx-auto h-16 sm:h-20 md:h-24 w-auto mb-8" />`. Import the light-variant asset directly.
- The `brandMark` prop becomes unused in cover mode; keep the prop in the interface (non-breaking) but stop reading it on cover. Remove the `brandMark="..."` prop from `Index.tsx`'s `<BriefingHero variant="cover" ... />` call.
- Sizing: large enough to anchor the page (~80–96px tall on desktop), small enough to stay institutional, never larger than the H1 block beneath it. Maintains existing rhythm: eyebrow → logo → divider rule → H1 → statement → CTAs → scroll cue.

### 6 · What stays the same

- All other pages (chapter heroes, article headers, board pages) — no logo treatment added. The mark belongs to the navigation, footer, and homepage cover only.
- `Logo` component's link target (`/`), hover behavior, and accessibility label.
- Header layout, footer columns, and cover hero rhythm.
- No logo on policy pages, library articles, profile pages, or registry rows.

### Files touched

- **New assets:** `src/assets/source-standard-logo.png`, `src/assets/source-standard-logo-light.png` (white-recolored variant for navy surfaces).
- **Modified:** `src/components/Logo.tsx` (rewrite to image-based lockup with `variant` prop), `src/components/BriefingHero.tsx` (swap `brandMark` text for `<img>` in cover variant), `src/pages/Index.tsx` (drop `brandMark` prop from cover hero call).
- **Untouched:** `SiteHeader.tsx`, `SiteFooter.tsx` — they consume `<Logo />` and inherit the new artwork automatically.

### Outcome

The header and footer carry the real, approved Source Standard lockup at properly scaled, restrained sizes. The homepage cover opens with the actual logo above its H1 instead of a serif word — strengthening the institutional identity at the single moment it matters most. No other page gains decorative logo usage; the mark stays disciplined and authoritative.

