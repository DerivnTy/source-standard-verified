

## Make Greenlist Profiles More Consumer-Readable

Refine the Greenlist facility profile so a non-technical visitor can grasp what the facility is, where it is, and how to reach its website within seconds — while preserving the authoritative technical scorecard underneath.

### File touched
- `src/pages/GreenlistProfile.tsx`

### 1. Hero / top section — clearer, more scannable

**Layout (header block):**
- Keep the 12-column grid but rebalance: `md:col-span-7` for content, `md:col-span-5` for the At-a-glance card so the panel reads as a real summary, not a sidebar afterthought.
- Slightly increase H1 size (`1.625rem` → `1.75rem` md) and tighten its leading.
- Add a small Greenlisted status pill directly under the eyebrow (green dot + "Greenlisted") so the verification status is visible without scanning to the sidebar.

**Meta line — strip the website out of it:**
- Reduce the meta row to just `{type} · {location}` in mono.
- Remove the inline `Website ↗` from this line entirely.

**Background sentence:**
- Render `profile.background` (or fall back to `entry.focus`) as a single, slightly larger consumer-readable paragraph: `text-[15px] text-foreground/85 leading-relaxed max-w-[58ch]`.
- Cap to a clean one- or two-sentence feel (no change to data, just typography + measure).

**Primary CTA — "Visit website" button:**
- Directly under the background paragraph, render a real button-styled link when `entry.website` exists:
  - Uses the existing `Button` component, `variant="outline"`, `size="sm"`.
  - Label: `Visit website ↗`
  - Opens in new tab (`target="_blank" rel="noopener noreferrer"`).
- When no website is on file, render a muted `Official website not listed` line in its place.

### 2. "At a glance" panel — promoted to a real summary card

Restructure into a denser, higher-signal card on the right:

- Header strip stays (green dot + "Greenlisted").
- Rows (only render when value exists, omit-empty rule preserved):
  - Source type
  - Location
  - **Website** — new row; renders `entry.website` hostname as a link (`Visit ↗`), or `Not listed` in muted text when absent. This is the second, redundant-by-design surface for the website so it's impossible to miss.
  - Designation
  - FDA registration / FEI
  - Years in operation
  - SS review date

Row styling: label `text-[11px] uppercase tracking-[0.06em] text-muted-foreground`, value `text-[13px] text-foreground`, `py-1.5`, hairline `border-b border-border/40` between rows (last row no border).

### 3. Body sections — easier to scan, same data

Keep the three existing sections (Regulatory & Quality / Capabilities / Background) and the omit-empty + omit-empty-section rules. Adjustments are typographic only:

- Section header: keep eyebrow, bump title to `text-[15px] font-semibold`, add a one-line plain-language subtitle under each section title:
  - Regulatory & Quality → "Licensure, inspections, and quality systems."
  - Capabilities → "What this facility makes and specializes in."
  - Background → "Operational history and review notes."
- Field cell: increase label-to-value spacing (`mt-1` → `mt-1.5`), value `text-[13.5px] leading-[1.45]`, cell `py-2`.
- Grid: keep `md:grid-cols-2 gap-x-10 gap-y-2` for cleaner column rhythm and longer comfortable line length on values.
- Add a subtle background contrast: section card stays `bg-background`; section body wrapper stays on `bg-surface-muted/30` so cards pop.

### 4. Footer disclosure
- Unchanged copy. Slight padding bump (`px-4 py-3.5`) and `text-[12px]` for legibility.

### Out of scope
- Greenlist registry table, routing, filters.
- Data model and `src/data/greenlist.ts` content.
- Verified Vendor profile pages.

### Result
A visitor lands on the profile and immediately sees: facility name, source type, location, a one-paragraph plain-language summary, a clearly styled **Visit website** button, and a redundant Website row in the At-a-glance card. The technical scorecard remains directly below — fully intact — but no longer dominates the first impression.

