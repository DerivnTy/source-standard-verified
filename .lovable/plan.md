## Status Definitions — Structural UI Pass

**File:** `src/pages/StatusDefinitions.tsx` only.
**Route:** `/status-definitions` (unchanged).

### What stays untouched
- `BriefingHero` and all hero copy (title, category, statement).
- `PageMeta`, `Breadcrumb`.
- `SectionAnchorNav` and existing `WAYPOINTS` (`purpose`, `statuses`, `lifecycle`, `related`).
- All status copy (definitions, public meaning, does-not-imply, issued-when, revised-when).
- All lifecycle strings, related document labels, and link routes (`/how-it-works`, `/accountability`, `/verification-disclaimer`).
- Closing statement copy.
- Header, footer, hamburger, global CSS, shared components, all other pages.

Note: status `08` in the current file is labeled "Not Listed" — I will rename its title to **"No Public Record"** to match the approved spec. Its body fields are already correct.

### Local primitives (added inside the file, non-exported)

1. **StatusCard** — white wrapper.
   - `bg: hsl(var(--card))`, `border: 0.5px solid hsl(var(--border))`, `radius: 12px`, `padding: 24px`.

2. **StatusField** — stacked label + body.
   - Label: `font-mono uppercase`, `10px`, `letter-spacing 0.14em`, muted-foreground.
   - Body: `13px`, `line-height 1.55`, muted-foreground.
   - Every field after the first: `border-top: 0.5px solid hsl(var(--border))`, `padding-top: 14px`, `margin-top: 14px`.

3. **StatusDefinitionCard** — used per status.
   - Top row: zero-padded mono index (left, muted) + status title (~22px mobile, `font-semibold`).
   - Short definition: `14px`, `line-height 1.55`, foreground.
   - Then 4 `StatusField`s: `PUBLIC MEANING`, `DOES NOT IMPLY`, `ISSUED WHEN`, `REVISED WHEN`.
   - Same card chrome as `StatusCard`.

4. **LifecycleRow** — compact horizontal row.
   - Card chrome with `padding: 12px 14px`.
   - Mono index left, process text middle (`13px`, line-height 1.5, foreground). Arrows kept as plain text.

5. **RelatedLinkRow** — flex link row matching About page.
   - Card chrome, `padding: 14px 16px`.
   - Flex `items-start justify-between gap-4`; text column `min-w-0` with `paddingRight: 72px` safety.
   - `VIEW ›` on the right, `self-center`, `11px uppercase font-semibold` in primary navy with `ChevronRight` icon.

### Page composition

```text
Hero (BriefingHero, untouched)
SectionAnchorNav (preserved)

§1 Purpose      [40px / 40px, border-b]
  StatusCard
    eyebrow: STATUS PURPOSE
    h2: Why these statuses exist
    2 body paragraphs (preserved verbatim, 13.5px / 1.6 muted, 14px gap)

§2 Public Statuses [40px / 40px, border-b]   id="statuses"
  Header: 02 / Public Statuses / intro
  Stack of StatusDefinitionCards (gap 12px) — 8 statuses in current order

§3 Lifecycle [40px / 40px, border-b]   id="lifecycle"
  Header: 03 / Lifecycle / intro
  Stack of LifecycleRows (gap 8px) — 6 steps

§4 Related Documents [40px / 40px, border-b]   id="related"
  Header: 04 / Related Documents / intro
  Stack of RelatedLinkRows (gap 10px) — 3 links

§5 Closing [40px / 64px, no border]
  StatusCard
    eyebrow: PUBLIC LANGUAGE
    h2: A shared public language for the registry.
    body paragraph (preserved verbatim, 13.5px / 1.6 muted)

Footer (untouched)
```

### Spacing rules applied
- Sections: `paddingTop: 40px`, `paddingBottom: 40px`, bottom-border `0.5px`.
- Final section: `paddingBottom: 64px`, no bottom border.
- Card chrome: `12px` radius, `0.5px` border, `24px` interior padding.
- Stacks: status cards `12px`, lifecycle `8px`, related links `10px`.
- All indices rendered zero-padded (`01`, `02`, …, `08`).

### Removed
- `SectionIndex` helper, `FieldRow` helper, `divide-y` ordered lists, sticky two-column 4/8 grid, `t-body-md` editorial slabs, current oversized `pt-14 md:pt-20 lg:pt-24` slab. All replaced by the card/row primitives above.

### Acceptance
Page renders as: Hero → Purpose card → 8 status definition cards → Lifecycle row stack → Related link row stack → Closing card → Footer. All copy preserved. Matches the institutional system used on Advisory Board, Resource Library, Verification Protocol, About.
