

## Match Verified Vendors Legend To Greenlist Style

Update the "How to read this directory" section on `src/pages/VerifiedVendors.tsx` so it visually mirrors the Greenlist registry legend — a bold heading followed by a hairline-separated grid of white cards, one per status, each with a color-coded mono badge and a short description.

### File edited

- `src/pages/VerifiedVendors.tsx` — legend block only (lines ~183–209). No data, routing, or component-library changes.

### What changes

**Replace the current quiet dot-strip legend with a Greenlist-style card grid.**

Container (unchanged shell):
- `bg-surface-muted border-b border-border`
- `container-wide py-6` (was `py-3`) — matches Greenlist's vertical rhythm.

Heading:
- `<p className="meta-label text-foreground mb-3">How to read this directory</p>` — same bold label treatment Greenlist uses (was just a plain row).

Grid:
- `grid md:grid-cols-5 gap-px bg-border border border-border` — five equal cells at `md+`, collapsing to `grid-cols-2` on small screens, matching Greenlist's hairline-divider technique.
- Each cell: `bg-background p-3` (white card on muted strip — the look the user is asking for).

Cell content (per status):
- Line 1: existing `<StatusBadge status={s} />` — already renders the color square + uppercase mono label, parallel to Greenlist's `CategoryPill`.
- Line 2: `text-[12px] text-muted-foreground leading-relaxed` short description from a local `STATUS_LEGEND_DESC` map.

New short descriptions (slightly fuller than the current one-word labels, to match Greenlist's two-line card density without re-introducing the old long copy):

```ts
const STATUS_LEGEND_DESC: Record<VendorPublicStatus, string> = {
  verified: "Source Standard verification has been completed and published.",
  "under-review": "An active Source Standard review is currently in progress.",
  unverified: "No Source Standard verification is currently published.",
  suspended: "A previously published verification is temporarily paused.",
  removed: "Listing has been removed from the public directory.",
};
```

The existing `STATUS_LEGEND_SHORT` and `STATUS_DOT_COLOR` constants are removed (no longer needed — `StatusBadge` provides the color marker).

Footer link (kept, lightly restyled to match Greenlist's "Note on scope" treatment):
- A single muted line below the grid, `mt-3 text-[12px] text-muted-foreground leading-relaxed max-w-3xl`:
  > **Note.** "Unverified" means no Source Standard verification is currently published — it does not by itself indicate that a vendor is unsafe or noncompliant. [Read the full directory guide →](/how-to-read-the-directory)

This preserves the link to the full `/how-to-read-the-directory` page while adopting Greenlist's "Note on scope" visual pattern.

### Result

```text
container-wide, py-6

  How to read this directory                          ← bold meta-label

  ┌────────┬────────┬────────┬────────┬────────┐
  │ ■ VER. │ ■ UND. │ ■ UNV. │ ■ SUS. │ ■ REM. │     ← white cards on muted bg,
  │ short  │ short  │ short  │ short  │ short  │       hairline separators
  │ desc.  │ desc.  │ desc.  │ desc.  │ desc.  │
  └────────┴────────┴────────┴────────┴────────┘

  Note. "Unverified" means…  Read the full directory guide →
```

Side-by-side, `/verified-vendors` and `/greenlist` will now share the same legend system: bold heading → hairline grid of white cards → short note beneath.

### Files NOT touched

- `src/pages/Greenlist.tsx`
- `src/pages/HowToReadTheDirectory.tsx`
- `src/components/StatusBadge.tsx`
- `src/data/vendors.ts`
- Routing, header, footer.

