

## Institutional Modern v2 — palette realignment + homepage de-database

The previous pass already shipped the global font (Geist), 10px radius, navy-tinted shadow ladder, `HeroPattern`, Clinical Assistant FAB, and Education page cleanup. This pass closes the remaining gaps the brief calls out.

---

### 1 · Palette realignment (`src/index.css`)

Snap tokens to the exact values requested:

- `--background` → **Cool Gray `210 40% 98%`** (the requested `#F8FAFC`). Page no longer reads as pure white, so white cards visibly float.
- `--surface` stays `0 0% 100%` (white) — cards/inputs/dropdowns now have real contrast against the new cool-gray page.
- `--foreground` → **Authority Navy `222 47% 11%`** (the requested `#0F172A`). Used for headings, CTAs, FAB.
- `--primary` → **Safety Blue `199 89% 48%`** (the requested `#0EA5E9`) with `199 89% 42%` hover. Replaces the teal across links, active nav underline, primary buttons, focus rings, verification accents.
- `--ring` follows `--primary`.
- `--border` lightened to `214 32% 91%` so hairlines read as soft, not structural.
- Dark mode palette adjusted to match (deeper navy bg, brighter sky-blue primary).

Every page picks this up automatically via existing token references. No per-page color edits required.

### 2 · Homepage — kill the database aesthetic (`src/pages/Index.tsx`)

The home is the loudest "1990s database" offender. Surgical structural changes:

- **Remove the `<aside>` Institutional Metadata box** in the hero. Hero becomes a single centered column: eyebrow → `display-1` headline → lead → Registry Lookup → CTA row. Headline and lead center-aligned, lookup + CTAs centered under them. `HeroPattern` already mounted stays.
- **§4 Greenlist categories** — convert the long `<ul>` row list into a 3-column responsive grid of elevated cards (one per category: name + short description + small "Active" chip). Doc IDs / `§N` numbering removed from the public face.
- **§5 Standards anchoring** — convert the divided `<ul>` into a 2×2 grid of elevated cards (FDA / PCAB / NSF / USP, each with a one-line description). The mono `K` codes stay as a small label inside each card — they're recognized acronyms, not internal IDs.
- **§6 Education preview** — convert the divided row list into a 3-column card grid; drop the `REF-XXX` mono codes from the public view (kept inside article pages).
- **§2 Public lookups** — already two cards; bump to the new `card-elevated` chrome (`rounded-xl shadow-sm hover:shadow-md hover:-translate-y-px`) so they match the rest.

All four converted sections use the same card chrome: `bg-surface border border-border/60 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200`.

### 3 · Anchor pages — drop the Reference box default (`src/components/AnchorHeader.tsx`)

The brief calls out hiding "Doc IDs / Status codes" from front-facing views. The anchor header's default `reference` block (Doc / Status / Updated mono panel) currently shows on Verified Vendors, Greenlist, Education, etc.

- Remove the auto-rendered Reference Box. The `aside` slot stays (pages can still pass custom asides like status legends), but the default mono Doc/Status/Updated panel is gone.
- When no `aside` is passed, the title block centers and stretches full width with a wider lead column. This is the single change that "centers the headline" across every anchor page in one shot.
- Eyebrow + `h1` get a touch more weight (`font-semibold` already, but tighter tracking) so they read as headline-news.

The `RecordHeader` (used on policy/whitepaper documents like How It Works, For Vendors) keeps its metadata bar — those pages are explicitly documents and the metadata is editorially appropriate there.

### 4 · Card hover — universal lift

The shared `.card-elevated` utility in `index.css` already exists. Add `hover:-translate-y-0.5` to its hover state so every card on the site (homepage, Education tiles, FAQ tiles, vendor cards) gets the subtle lift the brief asks for, without touching individual components.

### 5 · Navbar — confirm transparency + blur

`SiteHeader` already has `bg-background/85 backdrop-blur-md` from the prior pass. Confirmed in place; no change needed. With the new cool-gray background the blur effect now reads correctly.

### 6 · Chat FAB — confirm in place

`SourceBot` (Clinical Assistant) is already mounted globally via `SiteLayout`, branded navy, with the requested `ShieldCheck` icon and the seed message. New palette flows through automatically. No change needed.

### 7 · Education search — confirm absent

Verified: the Education page has no search input. Brief item satisfied; no change needed.

---

### Files touched

- `src/index.css` — palette values realigned to `#F8FAFC` / `#0F172A` / `#0EA5E9`; card-elevated hover gets `-translate-y-0.5`.
- `src/pages/Index.tsx` — hero centered + Reference aside removed; §4/§5/§6 converted from row lists to elevated card grids; §2 lookups pick up unified card chrome.
- `src/components/AnchorHeader.tsx` — default Reference box removed; title block centers when no aside is provided.

### What stays the same

Every route, every data file, all other pages, `RecordHeader`, `SiteHeader`, `SourceBot`, `HeroPattern`, the Education page layout, the Greenlist/Vendor registry tables (registries should look like registries), and every component API. The reskin propagates through tokens.

