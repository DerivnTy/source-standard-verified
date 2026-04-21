

## Restore Structured Status Legend — Compact Card Row

Replace the flattened single-line legend on `src/pages/VerifiedVendors.tsx` with a clean, segmented 5-card row. Lighter than the original boxy version, more structured than the current run-on layout.

### Edit scope

- **File:** `src/pages/VerifiedVendors.tsx` only
- **Section:** lines 175–195 (the "Status legend — compact" block)
- Nothing else changes — copy strings in `STATUS_LEGEND_SHORT` are reused as-is, and the surrounding `bg-surface-muted border-b` strip stays.

### New structure

```text
container-wide, py-5

  meta-label "How to read this directory"

  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  (gap-px on bg-border, cells bg-surface-muted)
    ┌──────────┬──────────┬──────────┬──────────┬──────────┐
    │ ■ VERIFIED│ ■ UNDER R.│ ■ UNVERIF│ ■ SUSPEND│ ■ REMOVED│
    │ published │ in        │ none      │ paused    │ delisted │
    │ verifica. │ progress  │ published │           │          │
    └──────────┴──────────┴──────────┴──────────┴──────────┘

  Single small note row beneath the grid (max-w-3xl, text-[12px])
```

### Card specifics

- One row of **5 equal-width cells** at `lg`, collapsing to 3 then 2 on smaller widths.
- Each cell: `px-3 py-2.5`, `bg-surface-muted`, separated by 1px hairlines via the `gap-px on bg-border` pattern (same technique already used elsewhere on the site).
- Cell content (two lines, tight):
  - Line 1: existing `<StatusBadge status={s} />` (color marker + uppercase mono label)
  - Line 2: very short description, `text-[12px] text-muted-foreground leading-snug`
- Equal heights guaranteed by the grid + identical padding + 1-line description target.

### Shorter copy (replaces current `STATUS_LEGEND_SHORT`)

```ts
const STATUS_LEGEND_SHORT: Record<VendorPublicStatus, string> = {
  verified: "published verification",
  "under-review": "review in progress",
  unverified: "no published verification",
  suspended: "verification paused",
  removed: "listing removed",
};
```

### Note row (kept, moved beneath the grid)

A single muted line, `mt-3`, `max-w-3xl`, `text-[12px] text-muted-foreground leading-snug`:

> **Note.** "Unverified" means Source Standard verification is not currently published for this vendor. It does not by itself indicate that the vendor is unsafe, noncompliant, or illegitimate.

### Spacing

- Section padding: `py-5` (down from the original boxy version, slightly up from the current `py-3`).
- Heading-to-grid gap: `mt-2`.
- Grid-to-note gap: `mt-3`.
- Net result: section is taller than the current flattened row, but markedly shorter than the original card grid — and visually structured.

### Out of scope

- Greenlist legend (parallel update can be requested next if desired).
- Any other section, file, route, or data change.

