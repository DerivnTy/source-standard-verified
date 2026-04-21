

## Modern Institutional aesthetic — global polish pass

Five coordinated changes that lock the "high-end secure platform" feel across every page. No new components, no route changes, no data changes. Existing primitives (`AnchorHeader`, `RecordHeader`, `Button`, `Section`, `Card`, the homepage hero) are tuned in place so the look propagates everywhere automatically.

### 1 · Global tokens (`src/index.css`, `:root` only)

- `--background: 0 0% 96.9%` → `0 0% 97.6%` (≈ `#F8F9FA` — the requested architectural gray, very slightly lighter than current).
- `--surface-muted: 0 0% 96.9%` → `0 0% 97.6%` (kept matching `--background` so the section-banding is gone — every page reads as one continuous document).
- `--surface: 0 0% 100%` (kept — the white "service card" surface).
- `--border: 0 0% 88%` → `0 0% 89%` (one shade softer for the "1px subtle" feel; still defined enough on `#F8F9FA`).
- `--input: 0 0% 80%` → `0 0% 84%` (softer search-bar border per the "no heavy lines" note).
- `--radius: 0.375rem` → `0.25rem` (4px — the "modern premium" corner the spec calls for; cascades to every `rounded-md` / `rounded-lg` token-bound class via the existing radius scale).
- `--shadow-sm/md/lg`: shadow opacities cut roughly in half (`0.04 → 0.02`, `0.05 → 0.03`, `0.08 → 0.04`) — shadows still hint at elevation but the "AI gradient/glow" feel is gone.
- `.dark` block untouched.

### 2 · Buttons — kill the blue, lock the charcoal (`src/components/ui/button.tsx`)

- `default` variant: `bg-primary text-primary-foreground hover:bg-primary-hover` → `bg-foreground text-background hover:bg-foreground/85` (deep charcoal `#1A1A1A` via `--foreground`, lightens on hover — matches the "subtle transition" requirement).
- `outline` variant: `border-border-strong` → `border-border hover:border-foreground/40 hover:bg-transparent` (thin border that darkens on hover — replaces the current `hover:bg-accent` fill so the secondary CTA reads as a true outline button).
- `rounded-[2px]` → `rounded-[4px]` on the base class (the 4px corner the spec mandates; overrides any per-call `rounded-md` since base wins on this token).
- Sizes kept; transition expanded to `transition-[background-color,border-color,color] duration-150`.

This single edit propagates the charcoal + 4px + soft hover treatment across every `<Button>` in the app — there are no per-page button colour overrides to worry about.

### 3 · Homepage hero — match the new system (`src/pages/Index.tsx`)

The hero is mostly already on-spec; three small refinements:

- **Search bar**: `border border-input` → `border border-border` (lighter "1px subtle" border per the spec); `rounded-[2px]` → `rounded-[4px]`; placeholder copy → **"Search by clinic name, state, or pharmacy…"** (consumer-friendly per the spec); helper line tightened to `text-muted-foreground/80`. Inner submit button keeps `bg-foreground text-background` and shifts to `rounded-[4px]`.
- **CTA buttons**: switch from inline anchors to the upgraded `<Button>` component now that it's on-spec. `View Verified Registry` → `<Button asChild size="lg">`, `Vendor Intake` → `<Button asChild size="lg" variant="outline">`. Removes the parallel inline-styled chrome and keeps a single source of truth.
- **Master Control Strip**: text colour `text-foreground/70` → `text-muted-foreground/85` (smaller visual weight, "seal of authenticity" rather than data-bar). `bg-surface` → `bg-background` (so the strip blends into the unified gray plane and reads as a thin top frame, not a white band).

### 4 · Page Header Standard — split-header on every page

The split-header (left: headline + plain-English lead, right: small Reference Box) is the spec for **every page**. Two surgical edits make this universal:

**`src/components/RecordHeader.tsx` (used on every doc/policy page — the 13 reg pages)**
- The current layout puts the `MetadataBar` as a full-bleed strip BELOW the title block. Replace that with a true right-rail Reference Box on `md:col-span-4` (mirroring the Summary rail layout, but always rendered):
  - Small mono label `Reference` above.
  - Stacked rows for the existing `metadata` items (Doc, Status, Updated, Jurisdiction) — labels in `text-[11px] uppercase tracking-[0.08em] text-muted-foreground`, values in `font-mono text-[12px] text-foreground tabular-nums`.
  - Visual treatment: white `bg-surface` panel, `border border-border rounded-[4px] p-4` — the "white service card housing the data" the spec calls for.
- When `summary` is also passed, the Summary stacks below the Reference Box in the same right column (no layout regression on Governance / Accountability / Verification Disclaimer / Status Definitions).
- Remove the `<MetadataBar>` render at the bottom of the header (data has moved into the right rail). Keep the `MetadataBar` component file (used by `ProfileFootnote` etc.) — only the `RecordHeader` call site is removed.

**`src/components/AnchorHeader.tsx` (used on Verified Vendors, Greenlist, Education)**
- Same upgrade: when no `aside` is passed, render a default Reference Box on the right with a doc identifier + status pulled from a small new optional prop `reference?: { docId: string; status: string; updated: string }`. Pages that already pass a custom `aside` (e.g. Verified Vendors filter strip) keep their existing aside untouched.
- Result: the three anchor pages without a custom aside (Greenlist, Education, etc.) automatically gain the same Reference Box that the doc pages now show — single visual standard across the site.

**Per-page wiring**: `Greenlist.tsx`, `Education.tsx`, `Apply.tsx`, `MedicalAdvisory.tsx`, `HowItWorks.tsx`, etc. that already pass an `aside` keep working unchanged. Pages that don't pass an `aside` get a small `reference={{ docId: "SS-…", status: "Active", updated: "04/21/26" }}` prop added in a single small pass — only the doc IDs need filling in (already exist on each page's existing metadata). No layout work needed downstream.

### 5 · `SiteHeader.tsx` utility strip — "seal of authenticity"

- Strip background `bg-surface-muted/60` → `bg-background` (blends into unified gray).
- Text size `text-[12px] text-muted-foreground` → `text-[11px] text-muted-foreground/75`.
- Border `border-b border-border/40` kept — thin, consistent with the rest of the page dividers.
- Result: the strip is still legible on every non-home page but recedes — exactly the "seal not distraction" treatment the spec describes. The home page already suppresses it (the hero Master Control Strip handles that band).

### Section banding cleanup (passive — no markup changes)

The existing `bg-surface-muted/40` stripes on Home (§2, §4, §6, §8), Education, Apply, etc. now resolve to `#F8F9FA` over `#F8F9FA` — no visible band. The "single continuous document" feel falls out of the token change automatically without touching markup. Section borders (`border-b border-border/50`) become the only structure — the "thin dividers" the spec asks for.

### Files touched

- `src/index.css` — token values for `--background`, `--surface-muted`, `--border`, `--input`, `--radius`, and the three `--shadow-*` tokens. `:root` only.
- `src/components/ui/button.tsx` — `default` + `outline` variants and base `rounded` token.
- `src/components/RecordHeader.tsx` — replace bottom `<MetadataBar>` with right-rail Reference Box.
- `src/components/AnchorHeader.tsx` — add optional `reference` prop that renders the same Reference Box when no `aside` is supplied.
- `src/pages/Index.tsx` — search-bar border + radius + placeholder + helper, CTA row migrated to `<Button>`, control strip background tweak.
- `src/components/SiteHeader.tsx` — utility-strip background + text-size tweaks.
- One small additive pass on the 6–8 anchor pages without a custom `aside`, adding the `reference={…}` prop with their existing doc IDs.

### What stays the same

All routes, every page's headline copy and structure, the `Section` / `Card` / `MetadataBar` / `ProfileHeader` / `ProfileFootnote` primitives, every data file, the dark-mode palette, the homepage hero structure, the footer rebuild from the previous turn, the Education badge polish, and the existing search-on-submit behaviour. No new components, no new fonts, no new dependencies.

