

## Tighten Greenlist Profile Body Sections

Reduce wasted vertical space in the three stacked profile cards (Regulatory & Quality, Capabilities, Background) and footer note. Header and At-a-glance card are out of scope.

### File touched
- `src/pages/GreenlistProfile.tsx`

### Changes

**Section card header (the `<header>` strip inside each `Section`)**
- Padding: `px-4 py-3` → `px-4 py-2.5`.
- Eyebrow → title gap: title currently sits directly under eyebrow; tighten with explicit `leading-tight` and remove default margin.
- Subtitle: `mt-0.5` → `mt-0` and `leading-snug` → `leading-tight`; reduce to `text-[12px]`.
- Result: header strip becomes one tight 3-line block instead of an airy stack.

**Section card body (the `<dl>` grid)**
- Padding: `px-4 py-3` → `px-4 py-2.5`.
- Grid row gap: `gap-y-2` → `gap-y-1.5`.
- Column gap unchanged (`gap-x-10`) — preserves readable line length.

**Field cell**
- Cell padding: `py-2` → `py-1`.
- Label → value gap: `mt-1.5` → `mt-1`.
- Value line-height: `leading-[1.45]` → `leading-[1.4]`.

**Inter-section spacing**
- Section stack: `space-y-4` → `space-y-3`.
- Outer body wrapper: `py-6` → `py-5`.

**Footer disclosure note**
- Padding: `px-4 py-3.5` → `px-4 py-2.5`.
- Line-height: `leading-relaxed` → `leading-snug`.

### What stays the same
- Omit-empty rules for fields and sections.
- 2-column grid on `md+`, single column on mobile.
- Card borders, radius, surface colors, eyebrow styling, font sizes for values.
- Header hero block and At-a-glance sidebar — untouched.

### Result
Each profile card reads as one cohesive block: tight header → immediately the content. Sparse sections (one or two tags) no longer look like oversized empty panels, and the three cards plus footer collapse into a noticeably shorter, denser column without feeling cramped.

