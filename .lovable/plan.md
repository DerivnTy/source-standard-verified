

## Refine Brand Blue — Lighter, Softer, More Medical

A token-only adjustment to `src/index.css`. No component edits, no structural changes — just a more refined shade for `--primary` and its supporting tokens. The decoupling from green status colors stays intact.

### The shift

Current `--primary` is `215 38% 28%` — a deep slate-navy. It reads heavy and slightly corporate-tech. The refined value moves it lighter, cooler, and slightly less saturated to land in a "muted medical blue" register — closer to what you'd see on a high-end clinical interface than a SaaS dashboard.

### Token changes — `src/index.css` `:root`

- `--primary: 212 32% 42%;` — a lifted slate-blue. Lighter (42% vs 28%), slightly cooler hue (212 vs 215), gently desaturated (32% vs 38%). Reads calm, medical, elevated — not navy, not electric, not pastel.
- `--primary-hover: 212 34% 36%;` — one step deeper for hover; still lighter than the current resting state.
- `--primary-foreground: 0 0% 100%;` — unchanged. White text remains AA-compliant on the new shade (contrast ratio ~5.1, above 4.5 threshold for normal text and 3.0 for UI components).
- `--ring: 212 32% 42%;` — matches new primary so focus halos shift in lockstep.
- `--accent-soft: 212 30% 96.5%;` — barely-there cool tint for nav hover / list-row hover; softer and a touch cooler than the current `215 36% 96%`.

### What stays exactly as-is

- All green status tokens (`--verified`, `--verified-soft`, `--verified-foreground`) — green continues to mean Verified / Greenlisted / Active only.
- `--pending`, `--destructive`, `--border`, `--surface-muted`, `--foreground`, `--background` — untouched.
- All component code, all page code, all utility classes (`.link-accent`, `.eyebrow`, etc.) — untouched. They reference `--primary` via tokens, so they pick up the new shade automatically.
- Dark-mode primary stays its current lighter green (out of scope until light mode is signed off).

### Where the new blue shows up automatically

- Primary buttons (header CTA, hero CTAs, Apply buttons)
- Active nav underline bar in `SiteHeader`
- Inline link arrows on Index §3/§5/§6
- Filter input focus halos on Verified Vendors + Greenlist
- Pagination active-page background
- `.link-accent` inline links

### Files touched

- `src/index.css` — five token value changes inside `:root`. Nothing else.

### Result

The interface accent moves from a heavier slate-navy to a calmer, lighter medical-leaning blue. The system feels more elevated and breathable without losing institutional weight. Green status meaning becomes even more legible against the cooler, lighter brand color.

