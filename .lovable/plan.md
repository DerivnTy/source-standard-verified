## Facility Records — Consumer Experience Refinement (Phase 1)

### Problem
The Facility Records page buries search beneath a tall explanatory card. Users must scroll through framework definitions before they can interact. But unlike the Vendor Registry, most consumers don't know what "Greenlisted", "503A", or "503B" mean — so the explanation cannot be hidden behind a link. The goal is to compress context, not remove it.

### Solution
Apply the Vendor Registry hierarchy (search-first, tight spacing, styled filters) to `Greenlist.tsx`, but retain a **compact** Greenlisted context strip and inline status definitions. Preserve all existing typography, colors, and institutional styling.

---

### 1. Update Hero Description
Replace the paragraph in `<RegistryHeader description={...}>` with:
> "Search the Source Standard Registry to learn more about manufacturers, compounding pharmacies, and other upstream organizations within the peptide supply chain."

### 2. Move Search Above Everything
After the hero, search becomes the first interactive element.

New hierarchy:
- Hero
- Search
- Compact Greenlisted Status info strip
- Filters (Status → Facility Type → State)
- Inline Status Definitions (beneath Status pills)
- Results

Search input matches the Vendor Registry:
- 52px height, 24px radius, white bg, hairline border
- Left-aligned `Search` icon
- Placeholder: `Search manufacturer, pharmacy, or facility...`

### 3. Remove the Large Greenlisted Explanatory Card
Delete the tall white card (current lines ~131–189).

### 4. Replace with a Compact Greenlisted Information Block
Placed immediately beneath the search field. Approx 80–100px tall.

Structure:
- Eyebrow: `GREENLISTED STATUS` (11px, uppercase, 0.12em, muted)
- Primary line (15px, medium): "Greenlisted facilities are organizations currently recognized within the Source Standard framework."
- Muted supporting line (13.5px, muted): "Greenlisted status is based on Source Standard's review within a defined scope and may change as new information becomes available."
- Text link: `Learn more about Greenlisted Status →` linking to `/how-it-works`

Uses hairline border, 16–20px radius, white background — visually calm, not a hero card.

### 5. Simplify & Reorder Filters
Reuse the existing `SoftPill`. Port the `FilterSelect` component from `VerifiedVendors.tsx` (either inline-duplicated or lifted to `src/components/registry/FilterSelect.tsx` — implementation detail).

Filter order:
1. **Status** — All | Greenlisted | Monitoring | Status Alert (pills, 2×2 mobile, 4-col desktop) — already exists
2. **Facility Type** — All | 503A Pharmacy | 503B Outsourcing Facility | Manufacturer (pills, same style)
3. **State** — `FilterSelect` dropdown driven by `getGreenlistStates()`

Facility Type mapping:
- `503A Pharmacy` → `category === "503A"`
- `503B Outsourcing Facility` → `category === "503B"`
- `Manufacturer` → `category === "Other"` OR `type` contains "Manufacturer"

### 6. Inline Status Definitions (Replaces Bottom Card)
Directly beneath the Status filter pills, add three concise lines:

- **Greenlisted** — Currently recognized within the Source Standard framework.
- **Monitoring** — Currently under additional review.
- **Status Alert** — Additional information requires further review.

Small type (12–13px), muted, hairline-separated. Remove the "Removed" definition. Delete the large bottom Status Definitions section entirely.

### 7. Reduce Vertical Spacing
- Trim `page-shell` padding under the hero
- Tighten padding between search, info strip, filters, and results
- Removing the bottom definitions section eliminates the largest scroll gap

### 8. Navigation Label — Exploration Only (No Code Change This Phase)
"Facility Records" tests poorly with first-time visitors. Candidate labels to evaluate in a follow-up:
- Manufacturers
- Manufacturers & Pharmacies
- Supply Chain
- Upstream Facilities

This phase does NOT change the nav label or page title. It's flagged for a subsequent decision so language can be validated before rollout across nav, breadcrumbs, footer, and internal links.

### 9. Preserve
- Navy hero (`RegistryHeader`)
- Existing typography, borders, pill styling
- `GreenlistRow` card styling
- All existing filter/search logic and data
- `PageMeta` + JSON-LD
- Institutional visual language

---

### Files to modify
- `src/pages/Greenlist.tsx` — layout, search placement, compact info block, Facility Type filter, State `FilterSelect`, inline status definitions, spacing

### Optional
- Extract `FilterSelect` from `VerifiedVendors.tsx` into `src/components/registry/FilterSelect.tsx` for reuse (implementation detail; can also inline-duplicate to keep the change scoped)

### Outcome
Consumers land on the page, see the hero, search immediately, get just enough context to interpret Greenlisted status without hunting for it, and reach results with dramatically less scrolling — while preserving the trust cues that make this page credible.