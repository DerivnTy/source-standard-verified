

## Site-wide typography consistency pass

A focused pass to lock the type system so every internal page opens with the same hierarchy, and every recurring element (eyebrow, lead, body, meta, table header, link) uses the same token everywhere. Home stays one step louder — that's the only intentional deviation.

### 1 — The locked type ladder

| Token | Size (mobile / desktop) | Weight | Used for |
|---|---|---|---|
| `.display-1` | 34 / 42 px | 500 | **Home only** |
| `.display-2` | 30 / 36 px | 500 | *(retired from page H1 use — kept only as alias for legacy)* |
| `.title-page` *(new, single internal-page H1)* | 26 / 30 px | 500 | **Every non-Home page H1** — replaces `.title-doc`, `.title-record`, and the bespoke utility H1 |
| `.h-section` | 20 / 22 px | 500 | In-page section H2 (unchanged) |
| `.h-sub` | 15 / 16 px | 600 | Sub-section H3 (unchanged) |
| `.h-card` | 14 / 15 px | 600 | Card / panel title (unchanged) |
| `.eyebrow` | 11 px, +0.08em, uppercase | 500 | Page label, section eyebrow |
| body / lead | 15 px, 1.65 line-height | 400 | All hero leads + body prose |
| `.text-helper` *(new)* | 13 px, 1.55 | 400 | Field helper, table cell, identity row |
| `.meta` | 12.5 px | 500 | Metadata strips, footnotes |
| `.meta-mono` | 11.5 px Plex Mono | 400 | Doc IDs, version strings (unchanged) |
| Table header | 11 px, +0.08em, uppercase, weight 600 | — | Locked everywhere |
| Link (inline) | inherit size, `.link-accent` | 400 | Underline-on-hover, accent color |

**The rule:** all four headers (`AnchorHeader` for non-Home, `RecordHeader`, `ProfileHeader`, `UtilityHeader`) render their H1 using the same `.title-page` class. Home is the only `display-1`. Today these four headers use four different sizes — that's the root of the inconsistency.

### 2 — Locked first-section structure (every internal page)

```text
[ eyebrow            ]   ← .eyebrow, mb-3
[ Page title         ]   ← .title-page
[ Lead sentence      ]   ← mt-3, 15px, max-w-[58ch]
[ optional children  ]   ← mt-6
```

- Eyebrow → title gap: `mb-3` (locked)
- Title → lead gap: `mt-3` (locked)
- Lead max-width: `58ch` (locked, was 56/60/64ch across the four headers)
- Header band padding: `py-14 md:py-20` for `AnchorHeader` (non-Home), `RecordHeader`, `ProfileHeader`. Home keeps `py-16 md:py-24`. Utility keeps `pt-5 pb-10 md:pb-12`.

### 3 — Component changes

- **`src/index.css`** — add `.title-page` and `.text-helper`. Keep `.title-doc` / `.title-record` aliased to `.title-page` so any stragglers don't break. Keep `.display-2` as-is but stop using it on internal pages.
- **`AnchorHeader.tsx`** — when `size="default"`, render H1 with `.title-page` instead of `.display-2`. When `size="lg"` (Home), keep `.display-1`. Padding becomes `py-14 md:py-20` for default, `py-16 md:py-24` for `lg`. Lead max-width → `58ch`.
- **`RecordHeader.tsx`** — H1 class `.title-doc` → `.title-page`. Title→lead gap `mt-4` → `mt-3`. Lead max-width `64ch` → `58ch`. Padding `py-12 md:py-16` → `py-14 md:py-20`.
- **`ProfileHeader.tsx`** — H1 class `.title-record` → `.title-page`. Identity row class → `.text-helper`. Title→identity gap stays `mt-2`. Lead max-width `60ch` → `58ch`. Lead → `mt-3`. Padding `pt-5 pb-12 md:pb-16` → `pt-5 pb-14 md:pb-20`.
- **`UtilityHeader.tsx`** — replace bespoke H1 styling with `.title-page`. Description → 15 px / `mt-3` / `max-w-[58ch]` (was 14 px / `mt-2`). Eyebrow gap `mb-2` → `mb-3`.

### 4 — Global recurring-element pass

Single mechanical sweep across the codebase to remove the random-variation feeling:

- **Table headers** — every `<thead> <th>` standardized to `text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground px-5 py-2.5`.
- **Table body cells** — `text-[13px] text-foreground px-5 py-3` (matches `.text-helper`).
- **Field labels** (forms + profile dl) — `text-[12px] font-medium uppercase tracking-[0.06em] text-muted-foreground/80`.
- **Field helper text** (under inputs) — `text-[12.5px] text-muted-foreground mt-1.5`.
- **Notes / disclaimers** (cite-as strips, footnotes) — `text-[12px] text-muted-foreground leading-[1.6]`.
- **Inline links inside body prose** — replace bespoke underline styles with `.link-accent`.
- **Section eyebrows** — every section-level eyebrow uses `.eyebrow` (no per-page tracking/opacity overrides).

### 5 — Per-page audit (typography only)

No copy changes. Mechanical class swaps to bring every page onto the new tokens:

- **Anchor pages** — `Index.tsx` (Home) keeps `size="lg"`. `VerifiedVendors.tsx`, `Greenlist.tsx`, `Education.tsx` already pass `size="default"` → automatically pick up `.title-page` from the component change. No per-page edits needed.
- **Doc pages** (13) — automatic via `RecordHeader` change. Spot-fix any pages that hand-rolled an H1 instead of using `RecordHeader` (`HowItWorks.tsx` already migrated; verify the rest).
- **Profile pages** (4) — automatic via `ProfileHeader` change. In `VendorProfile.tsx` and `GreenlistProfile.tsx`, change profile dl labels to the locked field-label style.
- **Utility pages** (6) — automatic via `UtilityHeader` change.
- **All pages with tables** — `VerifiedVendors.tsx`, `Greenlist.tsx`, `MedicalAdvisory.tsx` rosters, profile field rows: apply locked table header + body cell classes.

### 6 — What stays the same

All copy. All routes. All colors. All spacing tokens (`.space-section*`). Card padding. The `MetadataBar`, footer, `SiteHeader`. Home's hero size (still `.display-1`, still one step louder than the rest). The tier system itself — same four headers, just speaking the same typographic language now.

### Files touched

- `src/index.css` — add `.title-page`, `.text-helper`; alias `.title-doc` and `.title-record` to `.title-page`.
- `src/components/AnchorHeader.tsx`, `RecordHeader.tsx`, `ProfileHeader.tsx`, `UtilityHeader.tsx` — apply `.title-page`, lock gaps and padding.
- `src/pages/VerifiedVendors.tsx`, `Greenlist.tsx`, `MedicalAdvisory.tsx`, `VendorProfile.tsx`, `GreenlistProfile.tsx` — table headers, body cells, field labels onto locked tokens.
- Spot-check + normalize any inline link / eyebrow / helper-text overrides surfaced during the sweep.

### Result

Every internal page opens at exactly the same H1 size, the same eyebrow tone, the same lead size and width, and the same vertical rhythm. Home is the single intentional outlier — one type step larger. Tables, field labels, helper text, links, and metadata read identically across every page. The system finally looks like one design language instead of twenty-five.

