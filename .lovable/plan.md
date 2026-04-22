

## Article & Education Page Layout Refinement

A focused, sitewide pass on the Library/Article template. Two shared components drive every article page (`ArticleHeader`, `ArticleSection` + `ArticleFooter`), so almost all changes land in three files and propagate everywhere automatically.

### 1. Widen the editorial column

The current `max-w-[760px]` reading column feels constrained against the rest of the site's `container-wide` system. Widen to a more standard editorial measure that still preserves comfortable line length.

- `ArticleHeader`: `max-w-[760px]` → `max-w-[880px]`
- `ArticleSection`: `max-w-[760px]` → `max-w-[880px]`
- `ArticleFooter`: `max-w-[760px]` → `max-w-[880px]`
- Lead paragraph max width: `max-w-[58ch]` → `max-w-[68ch]`
- H1 max width: `max-w-[22ch]` → `max-w-[26ch]`

Result: ~16% wider reading area, still well under full container width, aligns better with the rest of the site.

### 2. Reduce article typography scale

Bring article type closer to the rest of the site's hierarchy.

| Element | Before | After |
|---|---|---|
| Body text | `text-[16.5px] leading-[1.75]` | `text-[15.5px] leading-[1.7]` |
| H1 | `text-[34px] md:text-[44px]` | `text-[30px] md:text-[38px]` |
| Lead deck | `text-[18px] leading-[1.6]` | `text-[16.5px] leading-[1.55]` |
| Section H2 | `text-[24px] md:text-[26px]` | `text-[20px] md:text-[22px]` |
| Body paragraph spacing | `space-y-5` | `space-y-4` |

### 3. Inline section labels with headings

Replace the stacked `§N` eyebrow + H2 break with a single inline heading that reads as one natural line. The mono `§` label sits inline with the serif title, separated by a small gap, with a slightly muted treatment so the hierarchy still reads.

Before:
```
§3
The shift back to 503A pharmacies.
```

After:
```
§3  The shift back to 503A pharmacies.
```

Implementation in `ArticleSection`: the header becomes a single `<h2>` with an inline `<span>` for the section number (mono, muted, slightly smaller) followed by the title (serif). Spacing collapses from `mt-12 mb-5` to `mt-10 mb-4`.

### 4. Tighten vertical rhythm

- Header padding: `py-12 md:py-16` → `py-10 md:py-14`
- Back link margin: `mb-10` → `mb-8`
- Eyebrow margin: `mb-4` → `mb-3`
- H1 → lead margin: `mb-6` → `mb-5`
- Metadata strip top spacing: `mt-8 pt-5` → `mt-7 pt-4`
- Section header → body gap reduced via the change in §3 above
- Footer top margin: `mt-12` → `mt-10`, internal padding `py-8` unchanged

### 5. Small editorial refinements

- `LibraryEntry.tsx` "Adjacent entries" grid: replace the boxed `gap-px bg-border border` tile grid with a flatter `divide-y sm:divide-y-0 sm:divide-x divide-border/60 border-y border-border` row layout, matching the editorial direction used recently on the Advisory Board page. No content changes.
- `LibraryEntry.tsx` inline labels currently using the middot (e.g. `Reference ID ·`) switch to a colon for clearer label/value semantics: `Reference ID:`. Same for `Here's what it will cover ·` → `Here's what it will cover:`.

### 6. Files modified

- `src/components/ArticleHeader.tsx` — width, type scale, spacing.
- `src/components/ArticleSection.tsx` — width, type scale, inline `§N + title` heading, spacing.
- `src/pages/LibraryEntry.tsx` — adjacent-entries de-boxing, label punctuation.

No individual library article page (`LibraryAnalysis*`, `LibraryWhat*`, `LibrarySterile*`, `LibraryAseptic*`, `LibraryDualLayer*`, `LibraryEndo*`, `LibraryInterpreting*`, `LibraryReference*`) needs to be touched. They all consume the shared primitives, so every Resource Library, Education, Analysis, and Guide page picks up the refined width, type scale, and inline heading format automatically.

### Outcome

Articles read with a more natural editorial measure, typography sits in the same hierarchy as the rest of the site rather than feeling oversized, section headings present as one clean line, and vertical rhythm tightens without becoming cramped. No content or substance changes.

