

## Readability & Polish Pass: Calmer Type, Easier Navigation, More Breathing Room

Keep the three-layer architecture and institutional tone established in prior passes. This pass fixes the *experience* layer — typography, spacing, navigation feel, and visual rhythm — so the site reads smoothly for a normal consumer while preserving authority.

The principle: **authority through clarity, not through stylization.** Less all-caps, less tracking, more whitespace, larger comfortable body text, softer borders, simpler nav.

---

### 1. Typography system rebuild

**Font family — switch primary to Inter, keep IBM Plex Mono for technical labels only.**

IBM Plex Sans is reading slightly mechanical at body sizes and contributing to the "stiff" feel. Inter is the standard for serious public information systems (used by GOV.UK-style and registry platforms), reads more naturally at small sizes, and has better hinting on Windows.

- `sans` (body + headings): **Inter**, weights 400 / 500 / 600
- `mono` (doc IDs, technical metadata only): **IBM Plex Mono**, 400
- Drop `serif` mapping to Plex (no serif used on the site)

**Body text — larger, calmer, wider line-height.**

| Token | Current | New |
|---|---|---|
| Body size | 15px | **16px** |
| Body line-height | 1.7 | **1.65** (tighter line-height with larger size reads calmer) |
| Body weight | 400 | 400 |
| Body letter-spacing | 0 | **-0.005em** (Inter benefits from a hair of negative tracking at 16px) |
| Paragraph max-width | varies | **65ch** default in `.prose-readable` utility |

**Headings — softer weights, more line-height, less compression.**

| Element | Current | New |
|---|---|---|
| h1 | 500, 1.2 | **600, 1.15, tracking -0.015em** |
| h2 | 500, 1.25 | **600, 1.2, tracking -0.01em** |
| h3 | 600, 1.35 | **600, 1.3** |
| h4 | 600, 1.35 | **600, 1.35** |

Heading sizes reduced one notch on the homepage hero so it stops feeling like a hero headline:
- Page title: `2.25rem → 2rem` desktop, `1.75rem → 1.625rem` mobile
- Section title (`SectionLabel`): `1.75rem → 1.5rem`
- Hero headline on Index: `~3rem → 2.25rem` desktop

**All-caps treatment — significantly softened.**

This is the single biggest "clunky" contributor. Rules:

- `.eyebrow`: **stays all-caps** but tracking `0.1em → 0.06em`, weight `500 → 600`, size `11px → 11.5px`. Used sparingly — one per section max.
- `.meta` and `.meta-label`: **drop all-caps** for descriptive labels. Become small-caps-like via `12px Inter, weight 500, tracking 0.01em, color muted-foreground`. Technical identifiers (doc IDs, version strings, status codes) stay uppercase in mono.
- Nav links: **drop all-caps entirely**. Switch to sentence case, `13.5px Inter, weight 500, tracking 0`.
- Footer column titles: **drop all-caps**. Sentence case, `13px, weight 600`.
- Button labels: **drop all-caps**. Sentence case, weight 500.
- Utility strip: keep small institutional text but drop tracking from `0.1em` to `0.02em` and switch to sentence-case phrasing.

Net effect: all-caps survives only where it earns its place — eyebrows, doc IDs, status codes, version strings. Everything else becomes naturally readable.

---

### 2. Navigation — calmer, sentence-case, fewer items

**Top nav refinements:**

- Switch all nav labels to sentence case (`Verified vendors`, `Greenlist`, `Education`, `Medical advisory`, `How it works`, `About`).
- Reduce nav font from `11px uppercase 0.14em` to `13.5px sentence-case 0`.
- Increase header height `h-14 → h-16` for breathing room.
- Increase gap between nav items `gap-6 → gap-7`.
- Active state: subtle weight bump (500 → 600) + 1px underline offset, no color shift.
- Apply button: sentence case "Apply for verification", height `h-9 → h-10`, regular weight not heavy.

**Utility strip:**
- Reduce visual weight: lighter background (use `bg-surface-sunken` instead of `bg-foreground` inverted), small sentence-case text in muted foreground. Currently the dark inverted strip reads aggressive.
- Copy: `Public reference · Document version 2026.01` (left), `Maintained in Tampa, FL` (right).

**Mobile nav:**
- Larger tap targets, sentence case, no uppercase tracking.

---

### 3. Visual rhythm — softer borders, more breathing room

**Borders:**
- Border color lightened slightly: `--border: 215 18% 84% → 215 16% 88%`
- Drop most heavy `border-y` blocks on metadata bars to a single `border-b border-border/60`
- Soften `MetadataBar`: change from full bordered strip to a quieter single bottom-border with reduced vertical padding `py-2.5 → py-3`, lighter background `bg-surface-muted → bg-surface-muted/50`

**Spacing:**
- Section vertical padding: `py-14 md:py-20 → py-16 md:py-24` (more air between sections)
- `RecordHeader` body: increase top/bottom internal padding by ~25%
- `PageHeader`: `py-12 md:py-16 → py-14 md:py-20`
- Card/box internal padding: existing `p-6` blocks → `p-7`; `p-8` blocks → `p-10`
- Footer columns: `gap-8 → gap-10`, footer top section `py-12 → py-16`

**Box / framed sections:**
- `FramedSection` border becomes `border-border/70`, header strip background lighter
- Add `rounded-[2px]` to framed sections (currently `--radius: 0.125rem` = 2px but not always applied) — keeps the squared institutional feel but removes the tense-knife-edge look on light backgrounds
- Numbered list rows (the §01, §02 patterns): increase row vertical padding, soften the divider from `border-border` to `border-border/60`

**Buttons:**
- Primary button: keep `rounded-none` is too stiff — switch to `rounded-[2px]` to match the system radius; sentence case; `h-10` default; comfortable horizontal padding `px-5`.
- Secondary/ghost buttons: same treatment.

---

### 4. Homepage clarity pass

The homepage carries the biggest "is this for me?" burden. Adjustments to make it land for a consumer in under five seconds:

**Hero:**
- Headline becomes shorter and more direct. Two lines max. Sentence case. Weight 600 not 500.
- Drop the second eyebrow/lead paragraph density — lead becomes a single sentence: *"The public reference for verifying vendors in peptide, TRT, and hormone optimization."*
- Two CTAs: **Look up a vendor** (primary, filled) and **How verification works** (secondary, outline). Both sentence case, comfortable size, generous padding.
- Right-side "Framework Snapshot" data block: simplify from a tracked-out uppercase data table to a cleaner three-row block with sentence-case labels + mono values. Less visual weight, easier to scan.

**Section §1 "Authority Pillars":**
- Title softened from "Authority pillars" eyebrow + dense subhead to a single sentence-case h2: *"How Source Standard is anchored."*
- Each pillar card: bigger icon-less title (Inter 18px, 600), one-sentence body in 16px, single "Read more →" link.

**Section §2 "Check a vendor":**
- Most prominent block on the homepage after the hero. Simple two-row layout: short heading + short body + filled button to /verified-vendors.

**Sections §3–§7:**
- Same content, larger headings, more space between rows, sentence-case eyebrows, fewer all-caps labels.

---

### 5. Cross-page consistency

Apply the same treatment everywhere automatically via global CSS changes:
- All page `RecordHeader` titles inherit new h1 size + weight
- All `SectionLabel` instances inherit new h2 size + weight
- All `.meta` / `.meta-label` instances inherit new sentence-case treatment
- All `MetadataBar` instances inherit softer border + background

Per-page files mostly don't need edits — the global CSS + Tailwind config + a few component tweaks cascade everywhere.

---

### 6. Files touched

**Edit:**
- `tailwind.config.ts` — switch `sans` to Inter, keep mono as Plex Mono
- `src/index.css` — Google Fonts import (Inter), update body size/line-height/letter-spacing, update heading scale, rewrite `.eyebrow` / `.meta` / `.meta-label`, lighten `--border`, add `.prose-readable` utility, increase `.section` padding
- `src/components/SiteHeader.tsx` — sentence case nav, larger nav font, taller header, softer utility strip, sentence case button
- `src/components/SiteFooter.tsx` — sentence case column titles + links, more spacing
- `src/components/MetadataBar.tsx` — softer border, lighter background, more padding
- `src/components/RecordHeader.tsx` — more internal padding, sentence-case treatment for non-ID fields
- `src/components/PageHeader.tsx` — larger vertical padding, smaller h1
- `src/components/Section.tsx` — larger section padding, smaller `SectionLabel` h2, sentence-case eyebrow handling
- `src/components/ui/button.tsx` — sentence case default, `rounded-[2px]`, `h-10`, weight 500
- `src/pages/Index.tsx` — hero rewrite (shorter headline, sentence case, simpler lead, simplified Framework Snapshot block); all section eyebrows/titles updated to new sentence-case pattern; CTAs updated

No new files. Placeholder pages and other Layer-2/3 pages inherit the typography automatically.

---

### Outcome

The site keeps its institutional architecture but loses the mechanical, over-tracked, all-caps-heavy feel. Body copy reads at a comfortable 16px with natural Inter spacing. Headings carry weight without compression. Nav is sentence-case and immediately scannable. Borders and metadata bars breathe. The homepage hero communicates what Source Standard is in under five seconds and points the consumer straight to "Look up a vendor." Authority remains; awkwardness is gone.

