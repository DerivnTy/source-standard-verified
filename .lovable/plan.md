

## Index.tsx — BriefingHero "Modular Terminal Summary"

The current `BriefingHero` is a centered single-column plaque. For the home page, we override it with a denser **two-rail terminal layout** that fills the 100vh band with institutional facts on both sides of the vertical horizon. All other pages keep the minimalist `BriefingHero` API unchanged.

---

### 1 · New variant: `BriefingHero` `dense` mode

Extend `src/components/BriefingHero.tsx` with an optional `rightRail?: ReactNode` prop. When provided, the component renders a 12-col grid (left col-span-7 / right col-span-5) instead of the single centered column. When omitted, behavior is identical to today (used by all other pages).

- Left rail keeps eyebrow + H1 + statement, plus a new optional thin-bordered **rationale chit** below the statement.
- Right rail receives arbitrary children — used only by Index.tsx.
- 14.5px body lock, 10.5px mono labels, hairline `border-border` everywhere, no heavy bars.

### 2 · Index.tsx — Left Rail content

- Eyebrow: `SOURCE STANDARD · SS-FRAMEWORK-2026.01`
- H1: `SYSTEM ACCESS.`
- Statement (unchanged, 14.5px muted, max-w-[58ch]).
- **Rationale chit** (new) — thin `border border-border p-3` block, 14.5px:
  > "Vendor compliance records are continuously cross-referenced against FDA Drug Establishment Registration, state pharmacy licensure, and PCAB / NSF accreditation files. No listing is published without a documented upstream chain."

### 3 · Index.tsx — Right Rail (three stacked data blocks)

Vertical stack, each block separated by a hairline. All blocks use `border border-border` cards with a 10.5px mono header strip and 14.5px body.

**Block A · `REGISTRY METRICS`** — 2-col grid of figures:
```
VENDORS UNDER REVIEW   VENDORS LISTED
        24                    11
UPSTREAM SOURCES       JURISDICTIONS
        18                     9
```
Numbers derived from `greenlistEntries.length` + static placeholders for vendor counts (kept as constants in `Index.tsx`, easy to wire to live data later).

**Block B · `GOVERNANCE`** — flat `<dl>`, 4 rows:
```
BOARD STATUS    Active · ratified 2026.02
SEATS FILLED    6 / 7
REVIEW CYCLE    Annual · interim flags
CONFLICT POLICY Disclosed · public
```

**Block C · `ACCESS PORTALS`** — vertical list of three tactical navigation chits (`Link`, full-width, hairline divider between, mono ref code on left + label + small `→`):
```
§I.A   VENDOR REGISTRY        →
§I.B   UPSTREAM REGISTRY      →
§IV.C  AUDIT REQUEST          →   (routes to /apply)
```
14.5px text, hover swaps `bg-muted/40`, no buttons — these read as terminal entries.

### 4 · Vertical alignment

Both rails use the same `flex flex-col justify-center` so the block stack on the right and the title group on the left share a vertical centerline. On viewports < md the right rail collapses below the left rail; both fit comfortably inside `min-h-[100svh]`.

### 5 · Below-the-fold

Sections §I, §II, §III on `Index.tsx` are unchanged — already at the density target from the previous pass.

---

### Files touched

- `src/components/BriefingHero.tsx` — add optional `rightRail` prop + dense-grid branch + optional rationale chit support (`rationale?: string`).
- `src/pages/Index.tsx` — pass `rationale` and `rightRail={<…three blocks…>}` to `BriefingHero`. Add a small constants block for metrics so the right rail stays declarative.

### What stays the same

`BriefingHero` API for all other pages (Verified Vendors, Greenlist, MAB, Resource Library, Protocol, About) — they pass no `rightRail` and render exactly as today. `GlobalUtilityBar`, smart header, scroll restoration, all routes, all data, all below-fold blocks on Index.

