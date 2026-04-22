

## Education page — final precision pass

A surgical cleanup of `src/pages/Education.tsx`. No new components, no data changes, no route changes.

### 1 · Remove the redundant FAQ accordion

Currently the FAQ section renders the 4 category cards AND an active-category accordion below them. Per spec, navigation should be **solely through the category cards**.

- Delete the entire "Active category accordion" block (lines ~366–399), the `activeCategory`/`setActiveCategory` state, the `activeCat`/`activeFaqs` derivations, and the `Accordion*` imports.
- Each category card already exposes a "View on full FAQ page →" link to `/education/questions#<anchor>` — that becomes the sole click target for inquiry browsing.
- Replace the per-card secondary link wording with a single bottom-right CTA on each card that uses the same chevron affordance for visual consistency: `Browse category →`.

### 2 · Promote the FAQ category grid to 4 columns

Spec says "4-column 'Category Cards'." Update the grid:
- `grid-cols-1 md:grid-cols-2 gap-4` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- Cards remain bordered, 4px radius, with hover lifting border to `foreground/40` and a subtle `hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04)]`.

### 3 · Search field — institutional monospace placeholder

`src/pages/Education.tsx` (search input):
- Placeholder text → `FILTER BY DOC ID OR KEYWORD…`
- Uppercase + `tracking-[0.08em]` on the placeholder via class additions; field already uses `font-mono`. The label "Search the library" stays.
- Field aligned inside `container-wide` (already correct) — no width drift.

### 4 · Sticky jump bar + search alignment

Confirmed both already wrap in `container-wide`. No change needed; verify visually they share the same left/right gutter as the section content below.

### 5 · Row affordance — vertically center the "Read full article" link

Currently the right column of `SimpleRow` stacks the status badge above the chevron link (`flex-col items-end`). Spec says the chevron link should be **vertically centered and anchored to the far right**. Restructure the row:

```text
[ DOC-ID ]  [ Title + summary (flex-1) ]   [ Status badge ]   [ Read full article › ]
                                                                  (vertically centered)
```

- Outer row: `flex items-center gap-5` (was `items-start`).
- Title column stays `flex-1 min-w-0` with description.
- Status badge: own column, `self-center`.
- "Read full article" + chevron: separate rightmost column, `self-center`, `pl-2 border-l border-border/40` for a subtle separator.
- Row padding bumped slightly to `px-6 py-5` for vertical breathing room. Rows continue to span the full `container-wide` (1280px) by virtue of their parent.

### 6 · §2 Clinical Protocols — full-width Pivot Bar

Replace the existing inline "View full clinical protocol index" + outline FAQ button with a **full-width pivot bar** beneath the rows:

```text
┌──────────────────────────────────────────────────────────────────┐
│  Seeking regulatory clarity?                  [Browse FAQ Categories →] │
└──────────────────────────────────────────────────────────────────┘
```

- Container: full-width inside `container-wide`, `mt-8`, `border border-border/70 bg-background rounded-[4px] px-6 py-5 flex items-center justify-between gap-6`.
- Left: bold `text-[15px]` "Seeking regulatory clarity?" with a muted subline "Browse the FAQ categories grouped by topic."
- Right: `Button` (default — 4px black) labelled **Browse FAQ Categories** with `onClick` that calls `document.getElementById('questions')?.scrollIntoView({ behavior: 'smooth', block: 'start' })`. Falls back to `#questions` href.
- The smaller "View full clinical protocol index →" link moves above the pivot bar as a quiet trailing link (`mt-6 text-[13px] muted`).

The §1 Foundational pivot stays as-is (already meets spec).

### 7 · §4 Latest Clinical Analysis — card hover polish

- Card class today: `border border-border/70 ... hover:border-foreground/30`.
- Add subtle interactive cue: `transition-[border-color,box-shadow] duration-150 hover:shadow-[0_2px_0_0_rgba(0,0,0,0.06)] hover:border-foreground/40`.
- Grid layout already 3-column responsive; no change.

### 8 · Global verification

- **"Tampa, FL" sweep**: confirmed remaining matches are all in `src/data/vendors.ts` (real vendor city/state records — intentionally preserved as factual business data per the project's "regulatory directory" purpose). No copy/branding instances remain. Documented as verified, no edits.
- **Jurisdiction "United States"**: `AnchorHeader` reference badge, archive index strip ("Archive index · SS-LIB-2026.01 · United States"), and footer monospace bar all confirmed. No edits.

### Files touched

- `src/pages/Education.tsx` — remove accordion + state, 4-col category grid, monospace placeholder, row restructure, §2 pivot bar, card hover.

### What stays the same

`AnchorHeader`, `Section`, the global `SiteHeader`/`SiteFooter`, every route, `library.ts`, the `Button` primitive, the `container-wide` token, the sticky nav structure, the archive footer grid, and `src/data/vendors.ts` (real vendor records).

