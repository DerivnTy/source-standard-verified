## Facility Records — Density & Hierarchy Pass (Phase 2, revised)

### Goal
Increase information density and refine visual hierarchy so the page feels faster and more efficient on mobile. Copy is done; this phase is about spacing, weight, color semantics, per-card information, and a **restrained** sticky behavior.

---

### 1. Shrink the Greenlisted Info Card (~50% shorter)
Target: ~80–100px tall.

- Reduce padding from `14px 16px` → `12px 14px`
- Two lines + link:
  - Primary (14px, medium): "Greenlisted facilities are currently recognized within the Source Standard framework."
  - Muted (12.5px): "Recognition is based on Source Standard's review and may change as new information becomes available."
  - Link: "Learn more →"
- Tighten inter-line gaps

### 2. Demote Status Definitions to a Compact Legend
Inline helper text style, not filter-weight.

- Eyebrow: `STATUS GUIDE` (10px, uppercase, 0.12em, muted)
- No hairline dividers
- Compact list with dot bullets:
  - `Greenlisted — Currently recognized`
  - `Monitoring — Under additional review`
  - `Status Alert — Additional information requires review`
- ~11.5px, muted, tight line-height (~1.4)
- Placement: directly beneath the Status pills

### 3. Add One More Info Line to Facility Cards
Modify `GreenlistRow.tsx` to surface `entry.type`.

- Inline on Row 2: `[Category Pill] · [Facility Type] · [Location]` with dot separators
- Style: 11px, `text-muted-foreground`, truncate on overflow
- Preserves card height

### 4. Recolor Status Indicators (Semantic Traffic-Light)
Replace the all-red pattern in `GreenlistRow.tsx`:

- **Greenlisted** → green `#22C55E`
- **Monitoring** → amber `#F59E0B`
- **Status Alert** → red `#FF3B30` (preserved as true alert)

Apply to both status label + live dot on the row, and to a small colored dot preceding each label in the Status Guide legend.

### 5. Sticky Behavior — Compact Bar Only (revised)
**Do NOT** make the full search + info card + filter stack sticky. That would consume too much vertical space on mobile.

Instead:

- Page layout scrolls normally by default.
- Observe the original search input with an `IntersectionObserver`. Once it scrolls out of view, render a **compact sticky bar** pinned to the top containing:
  - Compact search input (40px height, same styling)
  - A single `Filters` button (opens or scrolls back to the full filter stack — MVP: smooth-scrolls to the original controls; a full in-place filter sheet is out of scope for this phase)
- Sticky bar uses `position: fixed; top: 0; left: 0; right: 0; z-index: 40` with `backdrop-filter: blur(12px)` + `background-color: hsl(var(--background) / 0.85)` and a hairline bottom border.
- Slide-in transition (~200ms ease-out) when appearing/disappearing.
- The Greenlisted info card and full filter controls remain in normal document flow.
- Desktop: same behavior; the compact bar is still useful on longer result lists.

### 6. Simplify Hero Copy
Replace description in both `RegistryHeader` and `PageMeta`:
> "Search manufacturers and compounding pharmacies recognized within the Source Standard Registry."

### 7. Tighten Vertical Spacing
- Search → info card: `pt-3` → `pt-2`
- Info card → filters: `pt-4` → `pt-3`
- Between filter groups: `space-y-4` → `space-y-3`
- Filters → result list: `mt-5` → `mt-4`
- Net reduction: ~16–20px above filters

### 8. Preserve
- All existing filter logic and data flow
- `GreenlistRow` structural layout (only add one muted string + swap status color)
- Radius, hairlines, typography scale
- Institutional visual language

---

### Files to modify
- `src/pages/Greenlist.tsx` — info card shrink, legend restyle, compact sticky bar, hero copy, spacing
- `src/components/registry/GreenlistRow.tsx` — inline facility type, semantic status colors

### Outcome
The page becomes visibly denser and calmer: shorter info strip, quiet legend, richer cards (name + type + location + color-coded status), a lightweight sticky search bar that only appears after scrolling — preserving maximum results space on mobile — and less dead space between elements.