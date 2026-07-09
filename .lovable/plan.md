## Root cause

The previous update edited the rule at `src/index.css:335`:

```css
.t-page-title.t-chapter-title.t-home-title.t-article-title.ss-hero-title { ... }
```

This is a class-chain (AND) selector. It only matches an element that carries all five classes at once. The hero H1s across the site (`BriefingHero`, `RegistryHeader`) use only `ss-hero-title`, so none of them match, and the H1 falls back to browser/Tailwind defaults. That's why the previous size change had no visible effect.

## Fix

Rewrite that rule (and its two responsive variants at lines 345 and 352) as a comma-separated selector list so `.ss-hero-title` alone (and each `.t-*-title` alone) receives the styles. Then set the new sizes per spec.

### Target sizes (H1 only)

- Mobile (base): `font-size: 40px`, `line-height: 1.1`, `font-weight: 700`, letter-spacing unchanged (`-0.03em`)
- `md` (≥768px): `font-size: 56px`, letter-spacing `-0.035em`
- `lg` (≥1024px): `font-size: 68px`

These represent roughly a 30–35% bump over the current rendered mobile size, keep the existing family/color/wrapping, and preserve responsive behavior.

Body copy (`.ss-lead`, `.t-hero-lead`) and metadata (`.t-utility-xs`, `.ss-eyebrow`) are not touched — the paragraph stays at its current 22px mobile size and the pill is unchanged.

## Files changed

- `src/index.css` — three rule blocks at lines 335, 345, 352. Change selector from class-chain to comma-separated list, and update the three `font-size` values.

## Scope guarantees

- One CSS token drives every hero on the site (`BriefingHero` used by How Verification Works, Learn, About, Governance, Partners, Advisory Board, Status Definitions, Facility Records, etc.) and `RegistryHeader` used by Vendor Registry. No component files need edits.
- Body paragraph and metadata rules are not modified.
- No changes to color, family, weight scale beyond H1, wrapping (`max-width` in `ch`), or layout.

## Technical notes

Current selector (class-chain, matches nothing on real markup):
```css
.t-page-title.t-chapter-title.t-home-title.t-article-title.ss-hero-title { … }
```

New selector (list, each class alone matches):
```css
.t-page-title,
.t-chapter-title,
.t-home-title,
.t-article-title,
.ss-hero-title { … }
```

Applied identically to the base rule and both `@media (min-width: 768px)` / `@media (min-width: 1024px)` overrides.
