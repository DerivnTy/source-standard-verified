

## Simplify Website Filter — Greenlist

Convert the website facet from a 3-state segmented control (Any / Listed / No site) to a 2-button toggle group where unselected = all records.

### Behavior

- Two buttons side-by-side: **Website listed** · **No website**
- Neither pressed = show all records (the implicit default)
- Click an active button to deselect it (returns to "all")
- Mutually exclusive — clicking one deselects the other
- Internal state stays `WebsiteFilter = "all" | "yes" | "no"`; "all" is just no button pressed

### Visual

- Same 40px height, same border treatment, same rounded-[2px] as other facets in the QueryBar
- Inactive: `bg-background text-muted-foreground hover:text-foreground`
- Active: `bg-foreground text-background` (matches existing segmented control active state)
- Two separate buttons with `gap-1.5` between them — not a connected segmented group, since there's no "default" segment to anchor against
- `aria-pressed` on each for screen readers

### Active filter chip

- When "yes" → chip reads `Website listed ×`
- When "no" → chip reads `No website ×`
- When "all" → no chip (already correct)

### Files touched

- `src/pages/Greenlist.tsx` — replace the `FacetSegmented` website control with a small inline two-button toggle. Remove the `{ value: "all", label: "Any site" }` option. Chip logic already handles the `!== "all"` case correctly, no change needed there.
- `src/components/registry/QueryBar.tsx` — no changes. `FacetSegmented` stays available for future genuine 3+ state facets; we just stop using it for this binary case.

### Standard going forward

Noted as a registry design rule: if a control's default state already represents "all," do not add an explicit "all" option. Apply to Verified Vendors and any future facet during the upcoming rebuild.

