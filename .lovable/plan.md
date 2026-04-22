

## Hero — Strip back to the Tailored Navy Suit

Remove every decorative "official-looking" overlay added in the last pass. Keep the navy surface, the centered plaque, the typography, and the two ghost buttons. Nothing else.

---

### `src/components/BriefingHero.tsx` — navy branch only

**Remove:**
- The 96px overlay `HeroPattern` (second grid)
- All four registration lines (vertical at 8.33%, horizontal at 18%)
- All four corner crosshairs at the registration intersections
- Both vertical edge labels (`SS-FRAMEWORK-2026.01 · REV 01`, `PUBLIC REGISTRY · ACCESS TIER 0`)
- Both top-corner reference marker blocks (`COORD / PLATE ID`, `ISSUED / REV CYCLE`)
- The eight corner ticks framing the centered content group
- The `▌ PLATE 01 / 01 ▐` index line above the eyebrow
- The bottom 3-column institutional strip (`STATUS · ACTIVE`, `PROTOCOL`, `JURISDICTION`)
- The `▼ CONTINUE` scroll cue (and its `showCue` scroll listener / `useState` / `useEffect`)

**Soften:**
- Single remaining `HeroPattern` drops from `opacity={0.05}` → `opacity={0.02}` (near-invisible texture, not a visible grid)
- Keep the soft radial gradient (it adds depth without reading as "interface")

**Keep, untouched:**
- Navy background (`bg-[hsl(var(--navy-surface))]`)
- Centered plaque: eyebrow (`UNITED STATES PUBLIC REGISTRY`), H1 (`SOURCE STANDARD`), hairline divider, statement, two ghost-button actions
- All typography sizes, weights, tracking, and spacing
- Mobile rendering (already minimal — these removals only affect `md:` decorations)
- The `default` (non-navy) branch — completely untouched, used by every other page

### What stays the same

`BriefingHero` API (`tone`, `actions`, `category`, `title`, `statement`, etc.), `HeroPattern` component, `GlobalUtilityBar`, `Index.tsx` invocation, the navy color tokens, the cream/navy global accent system, every below-the-fold block on Index, and every other page on the site.

### Files touched

- `src/components/BriefingHero.tsx` — delete the decorative overlay JSX inside the `isNavy` branch; remove the now-unused `showCue` state and scroll listener; soften the remaining pattern opacity. Net result: the navy branch becomes roughly the same length as the default branch — a quiet centered plaque on a dark field.

