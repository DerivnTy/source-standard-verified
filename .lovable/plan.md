

## Global Change 03 — Lock Site to One Type Hierarchy

The token system in `src/index.css` already defines most of the right sizes, but it has three problems that break the user's locked spec:

1. **Two oversized title tokens exist that violate the "page title = 48/56" rule:**
   - `t-home-title` renders 72/80 on desktop (homepage hero only)
   - `t-chapter-title` renders 56/64 on desktop (interior `BriefingHero` heroes)
2. **`t-h3` and `t-h4` are undersized at mobile** (22/30 and 18/26) and only hit spec at ≥768px. They need to be 24/32 and 20/28 at every breakpoint.
3. **One-off `text-[Npx]` overrides** (84 occurrences) create the "different system per page" feeling the user is calling out — most are 11–14px utility/meta text that should map to existing tokens.

This pass enforces the user's locked hierarchy by **fixing the tokens** and **removing the off-spec class overrides**, not by editing copy or restructuring pages.

### Locked hierarchy (final spec)

| Token | Size / Line | Maps to |
|---|---|---|
| `t-page-title` | 48 / 56 | H1 — every page including homepage |
| `t-section-title-md` | 36 / 44 | Large section title |
| `t-section-title-sm` | 30 / 38 | Standard section title |
| `t-h3` | 24 / 32 | Subsection heading |
| `t-h4` | 20 / 28 | Smaller support heading |
| `t-body-lg` | 19 / 32 | Body large (long-form) |
| `t-body-md` | 18 / 30 | Body default |
| `t-body-sm` | 16 / 28 | Body small |
| `t-eyebrow-sm` / `t-utility-xs` | 13 / 20 / 12 / 18 | Eyebrow + meta |
| `t-micro` (new) | 12 / 18 | Micro labels (non-uppercase variant) |

### Changes to `src/index.css` (token layer)

1. Update `t-h3`: drop the responsive bump — set `font-size: 24px; line-height: 32px;` at base, remove the `@media (min-width: 768px)` override.
2. Update `t-h4`: same pattern — `font-size: 20px; line-height: 28px;` at base.
3. Update `t-eyebrow-sm` line-height `18px → 20px` to match spec (13/20). Update `t-utility-xs` line-height `16px → 18px` to match spec (12/18).
4. Update `t-body-sm` line-height `26px → 28px` to match spec (16/28).
5. Retire the oversized title tokens: redefine `t-home-title` and `t-chapter-title` to be exact aliases of `t-page-title` (48/56). This keeps every existing call-site working without touching components, and brings the homepage hero and every navy `BriefingHero chapter` interior page in line with the locked H1 size.
6. Add `.t-micro { font-size: 12px; line-height: 18px; font-weight: 500; }` (non-uppercase variant for small labels that aren't eyebrows — e.g. footer legal text, status pill labels).

### Changes to component layer (collapse off-spec overrides)

Replace the off-spec raw `text-[Npx]` classes in **shared chrome only** (the surfaces that bleed across every page), so per-page consistency improves without touching content pages:

- `src/components/SiteFooter.tsx` — `text-[14px]` link/desc → `t-body-sm`; `text-[12px]` legal/disclaimer → `t-micro` or `t-utility-xs` where uppercase; `text-[11px] uppercase` column headers → `t-utility-xs`.
- `src/components/SiteHeader.tsx` — `text-[13px]` nav links → keep size but route through a `t-nav` alias added to `index.css` (`13/20, 500`) so the nav's typography is governed.
- `src/components/StatusBadge.tsx`, `registry/SourceTypeCell.tsx`, `registry/VerificationShield.tsx` — pin `text-[10px]/[11px]` to `t-utility-xs` (12/18). Badges become slightly larger and consistent; this is a small, intentional tightening, not a redesign.
- `src/components/EmptyState.tsx`, `DocJumpBar.tsx`, `RegistryLayout.tsx`, `DocLayout.tsx`, `registry/QueryBar.tsx`, `registry/RegistryPagination.tsx`, `registry/SectionAnchorNav.tsx`, `library/ArticleRow.tsx` — replace `text-[11px]/[12px]/[13px]` chrome strings with `t-utility-xs` (when uppercase) or `t-micro` / `t-body-sm` (when not).
- `src/components/BriefingHero.tsx` line 108 statement — replace the responsive `text-[15px] sm:text-[16px] md:text-[17px]` mono ladder with a single `t-body-sm` (16/28). One size, one rule.

### Explicitly out of scope this pass

- **Per-page raw text overrides inside content blocks** (e.g. `Education.tsx`, `Greenlist.tsx`, `About.tsx` numbered lists). These are next-pass cleanup. This pass governs the token layer + every shared chrome surface, which is what produces the "feels like a different system per page" effect the user is calling out.
- Numeric/data display tokens (`Stat.tsx`, `RegistrySummaryStrip.tsx`, `RegistryHorizon.tsx`) — those are tabular numerals tuned for the registry product and are governed by their own data-readout rule, not the prose hierarchy.
- Tailwind primitive `text-xs/text-sm/...` inside `src/components/ui/*` (shadcn primitives) — they're internal to controls (dialog title, calendar cells, etc.) and don't read as page typography. Leaving them avoids a destabilizing pass through every form/dialog primitive.
- Font families. No serif↔sans changes.
- Spacing tokens, layout, copy.

### Files touched

- `src/index.css` — token rewrites + new `t-micro` + `t-nav` aliases (single hunk in the type-token block).
- `src/components/SiteFooter.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/BriefingHero.tsx` (statement line only)
- `src/components/StatusBadge.tsx`
- `src/components/EmptyState.tsx`
- `src/components/DocJumpBar.tsx`
- `src/components/DocLayout.tsx`
- `src/components/RegistryLayout.tsx`
- `src/components/registry/QueryBar.tsx`
- `src/components/registry/RegistryPagination.tsx`
- `src/components/registry/SectionAnchorNav.tsx`
- `src/components/registry/SourceTypeCell.tsx`
- `src/components/registry/VerificationShield.tsx`
- `src/components/library/ArticleRow.tsx`

### Result

- Every H1 across the site renders at 48/56 — homepage and every interior chapter hero now match the rest of the system.
- H3/H4 stop shrinking on mobile; subsection hierarchy is visible at every breakpoint.
- Eyebrows, meta strips, badges, footer text, nav links, and registry chrome all collapse onto four governed tokens instead of fourteen one-off `text-[Npx]` strings.
- No copy, no structure, no font families, no layout changes. The site visibly settles into one typographic constitution.

