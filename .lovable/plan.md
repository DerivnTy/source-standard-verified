

## Typography refinement — Source Serif 4 for headings, Geist for everything else

A controlled, site-wide pass that introduces Source Serif 4 as the institutional serif voice for major headings while keeping Geist as the working font for body, UI, and all database/profile surfaces. No reinvention. Token-level changes only — pages inherit automatically.

### What changes

**1 · Load Source Serif 4**

Add the Google Fonts link in `index.html` alongside the existing Geist load:
- Source Serif 4, weights 400 / 500 / 600, optical size enabled.
- Preconnect to `fonts.gstatic.com` to keep first paint clean.

**2 · Tailwind font families** (`tailwind.config.ts`)

Add a second family alongside the existing `sans`:
```
sans:  ['Geist', 'Inter', system stack…]   // unchanged
serif: ['"Source Serif 4"', 'Source Serif Pro', 'Georgia', 'serif']
```
No other config changes. `mono` stays as IBM Plex Mono.

**3 · Token routing** (`src/index.css`)

Switch the heading tokens to serif. Keep everything else on Geist.

| Token | Family | Tracking | Weight | Use |
|---|---|---|---|---|
| `.t-home-title` (72/76) | **serif** | -0.02em | 500 | Homepage hero only |
| `.t-chapter-title` (56/64) | **serif** | -0.02em | 500 | BriefingHero chapter variant |
| `.t-page-title` (48/56) | **serif** | -0.015em | 500 | Every internal page H1 |
| `.t-article-title` (alias of page-title) | **serif** | -0.015em | 500 | Library articles |
| `.t-section-title-md` (36/44) | **serif** | -0.01em | 500 | Major H2 moments |
| `.t-section-title-sm` (30/38) | **sans (Geist)** | -0.005em | 600 | Standard section H2s — kept on sans for product/database pages |
| `.t-h3` (24/32) | sans | normal | 600 | unchanged |
| `.t-h4` (20/28) | sans | normal | 600 | unchanged |
| `.t-body-lg / md / sm` | sans | normal | 400 | unchanged |
| `.t-body-strong` | sans | normal | 600 | unchanged |
| `.t-eyebrow-sm / utility-xs / label-sm` | sans | uppercase tracking already set | 500 | unchanged |
| Mono numerals (Stat, registry tables) | mono | unchanged | unchanged |

Rationale: serif appears only at the four largest title scales (36px and up). Standard section titles, all body, all UI, all metadata, all stats stay Geist — keeps Verified Vendors, Greenlist, and profile pages product-grade.

**4 · Text color** (`src/index.css` design tokens)

- `--foreground`: shift from current near-black to deep charcoal `222 14% 12%` (≈ #1A1B1E). Applies globally because every text class uses `text-foreground`.
- `--muted-foreground`: keep current value (already a controlled secondary tone — not washed out).
- No change to surface, border, or status colors.

**5 · Heading letter-spacing**

Bake into the tokens above (-0.02em on the largest, -0.015em on page-title, -0.01em on section-title-md, -0.005em on section-title-sm). Subtle, intentional, no further per-page tweaks needed.

### What does NOT change

- No serif on body copy, lists, tables, filters, breadcrumbs, buttons, badges, metadata, callouts, footnotes, glossary terms, breadcrumbs, captions, or any UI control.
- No changes to `Verified Vendors`, `Greenlist`, `VendorProfile`, `GreenlistProfile`, `RegistryHeader`, `QueryBar`, `Stat`, or any registry/profile component — these inherit the new `--foreground` color and that's it. Their headings are already on `t-section-title-sm` (sans).
- No font-weight inflation on body text.
- No changes to spacing, sizing, hierarchy logic, or component structure.
- No new tokens, no removed tokens, no class renames.

### Files touched

1. `index.html` — add Source Serif 4 `<link>` + preconnect.
2. `tailwind.config.ts` — add `serif` family.
3. `src/index.css` — switch four title tokens to `font-serif`, set tracking, update `--foreground`.

Three files. Site-wide effect through token inheritance. No page rewrites needed in this pass.

### QA checklist (post-implementation)

- Homepage hero renders Source Serif 4 at 72/76, charcoal not pure black.
- Internal page H1s (About, Governance, Education, MedicalAdvisory, Apply, FAQ, etc.) render serif at 48/56.
- Section H2s on policy/governance pages may render serif at 36/44 where `t-section-title-md` is used; standard section H2s stay sans.
- Verified Vendors, Greenlist, and profile pages: zero serif anywhere except the page H1.
- All body, tables, filters, buttons, badges, mono numerals: unchanged Geist / IBM Plex Mono.

