

## Zero-Tolerance Alignment — Site-Wide Hard Reset

Final pass. Three concrete deliverables: (1) smart hide-on-scroll header, (2) typographic lock to 14.5px on every remaining body surface, (3) elimination of every heavy black bar still present. Scroll restoration is already in place via `ScrollToTop` + `useHashScroll` — confirmed working.

---

### 1 · Smart Header (hide on scroll-down / show on scroll-up)

`src/components/SiteHeader.tsx` — add a `useEffect` that tracks `window.scrollY` deltas. When user scrolls **down past 120px**, slide the entire `<header>` up via `-translate-y-full`. When user scrolls **up by ≥ 8px**, slide it back down. Always show at the absolute top. Transition `transform 200ms ease-out`. Leaves the existing sticky `top-0 z-40` intact.

Side-effect: `DocJumpBar` (`sticky top-[64px]`) needs to follow the header. Add a matching transform binding driven by the same scroll state — easiest via a small Zustand-free pattern: export a `useHeaderVisible()` hook from `SiteHeader.tsx`, consume it in `DocJumpBar` to toggle `top-[64px]` ↔ `top-0`.

### 2 · Typographic Lock — 14.5px Body Standard

Surgical downsizing pass. Every body paragraph drops to `text-[14.5px]`; every lead/intro to `text-[15px]` max; component-level fixes:

**Components**
- `src/components/RecordHeader.tsx` — lead `text-[15px]` → `text-[14.5px]`
- `src/components/AnchorHeader.tsx` — both leads `text-[15px]/[16px]` → `text-[14.5px]`
- `src/components/UtilityHeader.tsx` — description `text-[15px]` → `text-[14.5px]`
- `src/components/ProfileHeader.tsx` — lead `text-[15px]` → `text-[14.5px]`
- `src/components/Callout.tsx` — `CalloutTitle` `text-[15px]` → `text-[14.5px]`
- `src/components/PlaceholderSection.tsx` — `text-[15px]` → `text-[14.5px]`
- `src/components/Logo.tsx` — wordmark `text-[15.5px]` → `text-[14.5px]` (header chrome)
- `src/components/SiteHeader.tsx` — mobile nav `text-[15px]` → `text-[14.5px]`

**Pages with stray oversized prose**
- `src/pages/Index.tsx` — hero lead `text-[16px]` → `text-[14.5px]`; the `text-[15px]` cluster (lines 166-180, 209+) → `text-[14.5px]`
- `src/pages/About.tsx` — §6 callout `text-[15px]` → `text-[14.5px]`; mission block `text-[17px] md:text-[18px]` → `text-[15px]` (kept slightly larger for the single hero quote, still institutional)
- `src/pages/Apply.tsx` — filing card `text-[16px]/[13px]` → `text-[14.5px]`

### 3 · Kill remaining heavy black bars

- `src/pages/ReportConcern.tsx` line 102 — `border-t-2 border-t-foreground` → `border border-border`
- `src/pages/ForVendors.tsx` line 176 — `border-t-2 border-t-foreground bg-background` → wrap into a `BoardCiteFooter`-style band (`border-t border-border bg-surface-muted`)

### 4 · Sub-page audit — confirm coverage

Spot-check confirms every Library / FAQ / Analysis / Glossary / Legal / Protocol / About page already carries `RecordHeader` + `Breadcrumb` + `PageMeta` + `BoardSection` 12-col + `DocSignature` + MAB-style `bg-border gap-px` cross-reference grid. No further structural rebuilds required.

Two pages still on `Section`/`SectionLabel` chrome (acceptable — they're transactional, not records): `Apply.tsx`, `ReportConcern.tsx`, `Contact.tsx`, `ForVendors.tsx`. These get the typographic lock + bar-removal pass only — full MAB conversion would require a copy rewrite outside the scope of this retouch.

### 5 · Scroll restoration (confirmed in place)

`<ScrollToTop />` mounted in `App.tsx` already fires `window.scrollTo(0,0)` on every `pathname` change. `useHashScroll` handles smooth `#anchor` jumps. No changes.

---

### Files touched

**Modified primitives**
- `src/components/SiteHeader.tsx` — hide/show on scroll, expose `useHeaderVisible()`, typographic fix
- `src/components/DocJumpBar.tsx` — bind sticky offset to header visibility
- `src/components/RecordHeader.tsx`, `AnchorHeader.tsx`, `UtilityHeader.tsx`, `ProfileHeader.tsx`, `Callout.tsx`, `PlaceholderSection.tsx`, `Logo.tsx` — 14.5px lock

**Pages**
- `src/pages/Index.tsx` — hero + cluster downsize
- `src/pages/About.tsx` — §6 + mission downsize
- `src/pages/Apply.tsx` — filing card downsize
- `src/pages/ReportConcern.tsx` — kill black bar
- `src/pages/ForVendors.tsx` — kill black bar, normalize citation footer

### What stays the same

All routes, all written copy, all data, all MAB DNA layout, `BoardSection` / `RecordHeader` / `DocSignature` / `Breadcrumb` / `PageMeta` / `DocJumpBar` / `Footnote` / `GlossaryTerm` APIs, design tokens, dark mode, registry filtering, `ScrollToTop` + `useHashScroll`. Strictly typographic + chrome alignment + one new scroll behavior.

