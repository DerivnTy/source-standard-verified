

## Index.tsx — "Sovereign Plaque" Navy Hero

Revert the home page 100vh band from the dense terminal layout to a centered, deep-navy institutional plaque. Below-the-fold blocks (§I Registries, §II Authority, §III Reference) remain on the white surface, untouched.

---

### 1 · `BriefingHero` — add navy variant

`src/components/BriefingHero.tsx` gains one optional prop: `tone?: "default" | "navy"` (default = today's white surface).

When `tone="navy"`:
- Section background swaps to a fixed deep-navy token (`#0A1128`), with a soft radial gradient on top and the existing `HeroPattern` rendered at very low opacity (~3%) using a white stroke instead of foreground.
- All text inside the hero forces pure white / white-muted: eyebrow + scroll cue at `text-white/55`, H1 at `text-white`, statement at `text-white/75`, hairline divider at `bg-white/20`.
- Bottom border becomes `border-white/10` so the transition into the white registry surface below is a crisp horizon line.
- `rightRail` and `rationale` are ignored in navy mode (force the centered "Sovereign Plaque" layout regardless).

A new optional `actions?: ReactNode` slot renders directly below the statement, centered, with `mt-10`. Used only by Index for the two ghost buttons.

### 2 · Tokens

Add two CSS variables to `src/index.css` `:root` for the navy surface so we keep design-token discipline (no raw hex in components):
```
--navy-surface: 222 47% 11%;     /* ~#0A1128 */
--navy-surface-2: 222 40% 16%;   /* gradient stop */
```
Reference via `bg-[hsl(var(--navy-surface))]`. Dark-mode values mirror the same navy (the plaque looks identical in both themes).

### 3 · Index.tsx hero content

Replace the current dense `BriefingHero` invocation with:

- `category`: `UNITED STATES PUBLIC REGISTRY`
- `docId`: `SS-FRAMEWORK-2026.01` (still surfaced via `GlobalUtilityBar`, kept on the prop for API symmetry)
- `title`: `SOURCE STANDARD`
- `statement`: "The definitive auditing framework for compounded supply-chain integrity. We verify 503A and 503B pharmacy sourcing to ensure clinical transparency."
- `tone`: `"navy"`
- `actions`: two side-by-side ghost buttons:
  - `[ ACCESS VENDOR REGISTRY ]` → `/directory`
  - `[ VIEW UPSTREAM GREENLIST ]` → `/greenlist`

Buttons use a local inline class set (no `Button` variant change) to guarantee white-on-navy contrast: `border border-white/40 text-white px-6 py-2.5 text-[13.5px] font-medium tracking-[0.04em] uppercase hover:bg-white/10 hover:border-white transition-colors`. Side-by-side with `gap-3`, wrap to stacked on `< sm`.

Remove from Index hero: `HeroRightRail` (Registry Metrics / Governance / Access Portals) and the `rationale` chit. The metrics and access-portal data are already represented in the §I–§III blocks below the fold, so no information is lost.

### 4 · GlobalUtilityBar — navy-aware

`src/components/GlobalUtilityBar.tsx` reads `useLocation().pathname`. When pathname is `"/"`, render with `bg-[hsl(var(--navy-surface))] text-white/70 border-white/10` so the strip reads as a frame for the navy plaque. All other routes stay on the existing light surface. No structural changes — only conditional class swap.

### 5 · Below-the-fold

Sections §I, §II, §III in `Index.tsx` remain exactly as they are today (white surface, hairline grids). The transition is a single horizontal seam between the navy plaque (ends at exactly `100svh`) and the white registry density below.

---

### Files touched

- `src/components/BriefingHero.tsx` — add `tone` and `actions` props; navy branch with white typography + radial gradient + low-opacity pattern.
- `src/components/HeroPattern.tsx` — accept optional `stroke` prop (`"foreground" | "white"`) so the navy variant can use a white grid.
- `src/components/GlobalUtilityBar.tsx` — conditional navy styling on `"/"`.
- `src/index.css` — add `--navy-surface` / `--navy-surface-2` tokens.
- `src/pages/Index.tsx` — replace dense hero invocation with navy plaque + two ghost-button actions; delete unused `HeroRightRail` block and rationale string.

### What stays the same

`BriefingHero` API for all other pages is unchanged (they don't pass `tone`, so they keep today's white plaque). `GlobalUtilityBar` signatures, smart header, scroll restoration, all routes, all data, and every below-the-fold block on Index. No new dependencies.

