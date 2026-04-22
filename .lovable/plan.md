

## Education page → "Clinical Knowledge Hub"

A focused rebuild of `src/pages/Education.tsx`. Adds sticky in-page nav, library search, clearer row affordances, an FAQ category grid, a new "Latest Clinical Analysis" card archive, and pivot CTAs between sections. No new routes, no data-shape changes.

### 1 · Sticky jump bar + library search

- Wrap the existing "Jump to:" strip in `sticky top-0 z-30 bg-background/95 backdrop-blur border-y border-border/60`. (It sits below the global `SiteHeader`; on this page the local strip becomes the sticky in-page nav. Adequate per the spec — the global header is already its own sticky element.)
- Below the `AnchorHeader`, before the sticky strip, add a **Search the Library** input row inside `container-wide`:
  - Plain `<input>` styled as a 4px-radius bordered field, full-width up to `max-w-[640px]`, monospace placeholder `Search standards, FAQs, and articles…`.
  - Local `useState` filter string. Filtering applies to `basics`, `guidesPreview`, `FAQ_BUCKETS` items, and the new article archive — case-insensitive match on `id`, title, and summary/question/answer.
  - When the query is non-empty, sections render only matching rows; empty sections collapse to a one-line "No matches in this section" note.

### 2 · §1 Foundational Sourcing Standards — clickable card rows

Reuse the existing `SimpleRow` `<Link>` (already a full clickable row), with two visual additions:

- Add a right-edge **"Read full article →"** text link inside each row, sitting next to the `SoftStatus` badge. Stacked vertically on the right: badge on top, link beneath. The whole row remains the click target; the inner link is `pointer-events-none` cosmetics so we don't nest interactive elements.
- Hover state already shifts background; bump to `hover:border-foreground/30` on the outer card border and add a subtle right-side chevron.
- Rows already span `container-wide` (1280px) — no width change.

Pivot CTA at section bottom (replaces `SeeMore`):
- Left: existing "View full foundational index" link.
- Right: new outline button **"Have a specific question? View the Regulatory FAQ →"** (4px radius, bordered, anchors to `#questions`).

### 3 · §2 Clinical Protocols — same row treatment

Apply identical row enhancements (right-side "Read full article" + chevron) to the `guidesPreview` rows. Pivot CTA at bottom: keep the existing "View full clinical protocol index" + add an outline button **"Looking for safe-handling answers? Jump to FAQ →"** anchored to `#questions`.

### 4 · §3 Public Inquiry — FAQ category grid

Replace the four inline accordion buckets with a **2-column category grid** above a single accordion:

```text
┌──────────────────────────┬──────────────────────────┐
│ [Legal & Regulatory]     │ [Clinical Safety]        │
├──────────────────────────┼──────────────────────────┤
│ [Verification Process]   │ [Consumer Diligence]     │
└──────────────────────────┴──────────────────────────┘
```

- Four large bordered category buttons (1px border, 4px radius, hover lifts border to foreground). Each shows: monospace category code (e.g. `FAQ-CAT-01`), bold label, one-line description, count badge ("4 entries").
- Mapping:
  - **Legal & Regulatory** → `SS-FAQ-001`, `SS-FAQ-002`
  - **Clinical Safety** → `SS-FAQ-004`, `SS-FAQ-007`
  - **Verification Process** → `SS-FAQ-003`, `SS-FAQ-005`, `SS-FAQ-006`, `SS-FAQ-008`
  - **Consumer Diligence** → `SS-FAQ-009`, `SS-FAQ-010`
- Clicking a category sets local `activeCategory` state and reveals an accordion below the grid populated only with that category's questions. Default category on load: Legal & Regulatory. Each button also exposes a "View on full FAQ page →" link to `/education/questions#<group>`.
- Pivot CTA at section bottom: black 4px-radius button **"Browse the full Regulatory FAQ archive →"** linking to `/education/questions`.

### 5 · §4 Latest Clinical Analysis (new section)

New section between FAQ and the Forthcoming/About footer. Pulls from existing `librarySeries` entries that are not in `basics` (the non-intro Source Standard series — 5 entries: 2026 Reclassification, Dual-Layer, Questions to Ask, What Verification Means, Warning Signs).

- Header: `h-section` "Latest Clinical Analysis" + 78ch description "Newest entries from the Source Standard analysis series. Reviewed under the Medical Advisory framework."
- Layout: 3-column responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
- Card style: white background, 1px `border-border/70`, 4px radius, `p-6`, hover lifts border to `foreground/30`. Card content top→bottom:
  1. **Category label** — monospace, uppercase, tracking-wide, muted (e.g., `SS-SERIES · ANALYSIS`).
  2. **Title** — bold, `text-[16px]`, two-line clamp.
  3. **Summary** — `text-[13.5px]` muted, three-line clamp.
  4. **Status chip** + **"Read more"** button on the same row at card bottom (`mt-auto`). Button uses the standard `Button` primitive (default variant — 4px radius, off-black) linking to `/education/<slug>`.
- Pivot CTA at section bottom: outline button **"View the full standards archive →"** anchored to `#archive`.

### 6 · Footer / Archive section — keep, with monospace touch-up

- Section heading "Archive index" stays.
- Add a row of monospace metadata above the two-column grid: `ARCHIVE · SS-LIB-2026.01 · UNITED STATES · MAINTAINED ACTIVE · UPDATED 04/21/26` — single line, `font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground border-t border-b border-border/40 py-2`. Reinforces the institutional credibility with no copy bloat.
- Two-column grid (Forthcoming + About) untouched.

### 7 · Cleanup

- All "Tampa, FL" already removed in earlier passes; reconfirm the new strings (search placeholder, archive monospace bar, card category labels) use **United States** / **National** language only.
- Status badges and archive monospace metadata both use `font-mono` (already established).
- All new buttons use the existing `Button` primitive (4px radius, off-black) — no new variants.

### Files touched

- `src/pages/Education.tsx` — full rewrite of the page body (sticky nav + search, row affordances, FAQ grid, new article archive, pivot CTAs, monospace archive bar). All other site components and data files untouched.

### What stays the same

`AnchorHeader`, `Section`, `RecordHeader`, the global `SiteHeader`/`SiteFooter`, every route, every other page, the `library.ts` data file, the `Button`/`Accordion`/`StatusBadge` primitives, the 1280px `container-wide` token, and the 900px filing column on legal/policy pages.

