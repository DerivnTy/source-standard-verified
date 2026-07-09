## Objective
Rebalance the mobile vertical rhythm of every dark navy hero so the larger H1 feels intentional rather than stretched. Tighten padding and inter-element gaps while preserving the new title size, description size, metadata pill size, colors, typography, and desktop behavior.

## Scope
Two components share the dark navy hero treatment and both need the same spacing pass:

1. **BriefingHero** (navy `chapter` variant) — used on content pages such as How It Works, About, Learn, Governance, Partners, Advisory Board, Status Definitions.
2. **RegistryHeader** — used on registry/data surfaces such as Verified Vendors, Greenlist, and Facility Records. This is the component that renders the metadata pill (Live, date, record count) and sits directly above the floating stats card.

## Proposed changes

### 1. BriefingHero — navy chapter variant
- Replace the generic `page-shell section-pad` container with hero-specific padding so the section can be tightened without affecting `.section-pad` elsewhere.
- **Mobile top padding:** reduce from 80px (`.section-pad`) to ~56px.
- **Mobile bottom padding:** reduce from 32px (`.section-pad`) to ~12px.
- **H1 → description gap:** add an explicit `mt-3` (12px) to the description paragraph, overriding any browser heading margin that currently enlarges the gap.
- **Description → actions gap:** if actions are present, reduce from `mt-8` (32px) to `mt-6` (24px).
- **Desktop:** keep current `md`/`lg` padding values or scale them modestly; do not shrink the desktop hero.

### 2. RegistryHeader
- **Mobile top padding:** reduce from `clamp(72px, 9vh, 96px)` to `clamp(48px, 7vh, 72px)`.
- **Mobile bottom padding:** reduce from `clamp(40px, 5vh, 56px)` to `clamp(20px, 3vh, 32px)`.
- **H1 → description gap:** add an explicit `mt-3` (12px) to the description paragraph, overriding browser defaults.
- **Description → metadata pill gap:** on mobile the pill sits below the text block in a flex column with `gap-4` (16px). After tightening the description margins, adjust the flex gap to `gap-5` or `gap-6` (20–24px) so the total spacing lands in the 22–28px target.
- **Floating stats card:** the card is rendered in the next section on registry pages. It uses a 50%/50% linear-gradient overlay to straddle the hero boundary. Ensure the reduced bottom padding does not break that visual continuity; the card position should remain consistent.
- **Compact mode:** apply the same proportional reductions to the `compact={true}` path used on some registry pages.

### 3. No changes to
- H1 font size, weight, color, letter-spacing, or line-height
- Description font size, weight, color, or line-height
- Metadata pill size, shape, color, or typography
- Desktop breakpoints (≥768px, ≥1024px) beyond modest proportional scaling
- Floating stats card structure, border radius, or internal padding
- Any non-hero `.section-pad` usage on the rest of the site

## Verification
After implementation, visually inspect on mobile (390px viewport):
- Verified Vendors page: hero title dominates, metadata pill sits closer, stats card transition feels tight.
- How It Works page: hero title dominates, description sits closer, no awkward empty space before the first body section.
