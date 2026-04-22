

## Logo Sizing Refinement Pass

Calibrate the new Source Standard lockup across its three placements — header, homepage hero, footer — so each feels confident and intentional without becoming loud. Pure sizing/spacing adjustments, no structural changes.

---

### 1 · Header (`src/components/Logo.tsx`)

Bump the default render height so the lockup reads cleanly at a glance inside the 64px nav row.

- Change `className` on the `<img>` from `h-7 md:h-8 w-auto` → `h-9 md:h-10 w-auto`.
- The header row stays at `h-16` (64px), giving the logo ~16px of vertical breathing room top/bottom — enough to feel anchored, not cramped.
- No JSX changes in `SiteHeader.tsx`; the larger lockup will naturally push the nav slightly without breaking alignment.

### 2 · Homepage hero (`src/components/BriefingHero.tsx`)

Increase the cover-variant logo so it acts as a real identity anchor above the H1 instead of a small stamp.

- In the cover-variant block (currently `h-16 sm:h-20 md:h-24`), bump to `h-24 sm:h-28 md:h-36 w-auto`.
- Tighten the spacing rhythm so the larger logo doesn't drift: keep `mb-8` below the logo and `mb-7` on the eyebrow above. The proportions still read: eyebrow → logo (anchor) → divider → H1 → statement → CTAs.
- Logo remains smaller than the H1 block beneath it, preserving institutional restraint.

### 3 · Footer (`src/components/Logo.tsx` consumers)

The default refactor in step 1 already lifts the footer logo to `h-9 md:h-10`, which lands proportionally against the footer column copy. No additional override needed — the footer inherits the new default and reads as a real brand anchor.

### 4 · Optical consistency

The three placements form a coherent scale:
- Header: `h-9 md:h-10` (~36–40px) — navigation identity.
- Footer: same default — closing identity, matches header weight.
- Hero: `h-24 → h-36` (~96–144px) — single hero anchor moment, larger but still subordinate to the H1.

All three use the same lockup at the same proportions; only scale differs. No restyling, no stretching, no decorative repetition elsewhere.

### Files touched

- **Modified:** `src/components/Logo.tsx` — bump default `<img>` height classes from `h-7 md:h-8` to `h-9 md:h-10`.
- **Modified:** `src/components/BriefingHero.tsx` — bump cover-variant logo height from `h-16 sm:h-20 md:h-24` to `h-24 sm:h-28 md:h-36`.
- **Untouched:** `SiteHeader.tsx`, `SiteFooter.tsx`, `Index.tsx` — they consume the components above and inherit the new sizing automatically.

### Outcome

Header and footer carry a clearly legible, confidently scaled lockup with proper breathing room. The homepage hero opens with a logo that meaningfully anchors the composition rather than floating timidly above the headline. The system reads as one coherent identity treatment at three intentional scales.

