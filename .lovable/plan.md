

## Homepage hero rebuild + unified architectural-gray background

Two coordinated changes: (1) shift the entire site to a single light architectural-gray surface, and (2) replace the homepage `AnchorHeader` with a custom institutional hero that includes the registry lookup field, metadata block, and rectangular CTAs.

### 1 · Global color profile — unified architectural gray

In `src/index.css` (`:root` only — dark mode untouched):

- `--background: 0 0% 100%` → `0 0% 96.9%` (≈ `#F7F7F7`).
- `--surface: 0 0% 100%` → `0 0% 100%` (kept — used for cards, search bar, dropdowns; lets white inputs/cards sit on the gray page).
- `--surface-muted: 210 22% 98.7%` → `0 0% 96.9%` (matches background — eliminates the section-banding effect).
- `--card`, `--popover` kept at white so cards remain "grounded" on the gray page.
- `--border: 215 20% 93%` → `0 0% 88%` (slightly stronger neutral border to define edges on gray).
- `--input` → `0 0% 80%` (the darker 1px border the search bar needs).

Effect: every page becomes one unified `#F7F7F7` plane. White cards, the hero search bar, and footer columns now read as deliberate, grounded panels rather than section bands. No per-section background swap — the existing `bg-surface-muted/40` stripes on Home, Education, etc. now read identically to the page background, removing the "alternating" feel without touching markup.

### 2 · Homepage hero — custom institutional rebuild

Replace the `<AnchorHeader … />` block at the top of `src/pages/Index.tsx` with a bespoke `<section>` (the existing `AnchorHeader` stays in place for every other page). The new hero, top to bottom:

**Master Control Strip (top, full-bleed band)**
- Single thin band, `border-b border-border`, white surface (`bg-surface`).
- Left: `MAINTAINED IN TAMPA, FL · PUBLIC REGISTRY`
- Right: `SS-FRAMEWORK-2026.01 · ACTIVE / OPERATIONAL · UPDATED 04/21/26`
- Both rendered in `font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/70` — slightly darker than muted, reading as a technical data header.
- Height: `h-9`, container `container-wide flex items-center justify-between`.
- Note: the existing site-wide utility strip in `SiteHeader.tsx` is suppressed on `/` only (small `useLocation` check) so the hero owns the top band on Home and there's no duplicate strip.

**Hero body**
- Container: `container-wide pt-10 md:pt-12 pb-12 md:pb-14` (this is the ~40% padding reduction vs. the current `py-16 md:py-24`).
- Left column (`md:col-span-8`):
  - Eyebrow: `Public registry · v2026.01` (`eyebrow` token, `mb-3`).
  - Headline (`display-1`, `mt-2`): **"Source Standard: The Public Registry for Compounded Supply-Chain Integrity."**
  - Subtext (`mt-3 max-w-[62ch] text-[15.5px] text-muted-foreground leading-[1.6]` — tightened from the current `mt-6` / `mt-8` rhythm to take ~40% off the gap): **"An independent auditing framework for the verification of 503A/503B pharmacy sourcing and clinical administrative protocols."**
  - **Registry Lookup terminal** (`mt-7`):
    - Tiny mono label above: `REGISTRY LOOKUP v2026.01` in `font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground mb-2`.
    - Search field: `<form>` wrapping a single `<input>` + submit button.
      - White background (`bg-surface`), `border border-input` (≈ `#CCCCCC`, the darker gray from the token tweak above), `rounded-[2px]`, `h-12`, full width up to `max-w-[640px]`.
      - Placeholder: `Search vendor, upstream source, or audit ID (e.g. SS-V-0142)`.
      - Trailing submit button inside the field: `font-mono text-[11px] uppercase tracking-[0.12em] px-4 h-10 bg-foreground text-background rounded-[2px]` — reads as a terminal "Lookup" affordance.
      - On submit: navigate to `/verified-vendors?q={value}` (no new search infra; the existing directory page already filters; if the page does not currently read `?q=`, it still lands the user on the directory — non-blocking, can be wired later).
    - Helper line below the field: `Cross-references vendor records against FDA-registered 503A/503B sources.` in `text-[12.5px] text-muted-foreground mt-2`.
  - **CTA row** (`mt-7 flex flex-wrap gap-3`):
    - Primary: `<Link to="/verified-vendors">View Verified Registry</Link>` — `bg-foreground text-background hover:bg-foreground/90 rounded-[2px] h-11 px-6 text-[13.5px] font-medium` (solid dark navy/near-black via the `--foreground` token, no gradient, no glow).
    - Secondary: `<Link to="/apply">Vendor Intake</Link>` — `bg-transparent border border-border-strong text-foreground hover:bg-foreground/[0.04] rounded-[2px] h-11 px-6 text-[13.5px] font-medium`.
    - Both are inline anchor tags styled directly (not the existing `Button` component) so the 2px radius and exact treatment are guaranteed without touching `button.tsx` (which is reused everywhere else).
- Right column / aside (`md:col-span-4`, `md:pl-6 md:border-l md:border-border md:self-end`):
  - Bottom-right institutional metadata block, right-aligned on desktop:
    - Small mono label `INSTITUTIONAL METADATA` (eyebrow tone, `mb-3`).
    - Two-row definition list:
      - `Standard` — `SS-FRAMEWORK-2026.01`
      - `Status` — `Active / Operational`
      - `Jurisdiction` — `Tampa, FL · US`
      - `Review cycle` — `Annual · MAB-reviewed`
    - Rows: `flex justify-between items-baseline py-1.5 border-b border-border/60 last:border-0`. Labels in `text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground`; values in `font-mono text-[12px] text-foreground tabular-nums`.

**Hero base rule**
- Single hairline `border-b border-border` under the hero — matches the rest of the page's section dividers.

### 3 · Spacing audit for the "snug up" requirement

Verified all three vertical gaps shrink ~40% vs. current values:
- Top strip → headline: `pt-10 md:pt-12` (was effectively `py-16 md:py-24` of the old `AnchorHeader`).
- Headline → subtext: `mt-3` (was `mt-3` inside `AnchorHeader`, but the previous hero compounded with internal `gap-10 lg:gap-16` grid spacing — that compounding is gone).
- Subtext → search terminal: `mt-7` (replaces what was previously a much larger `children` block gap).

### Files touched

- `src/index.css` — token values for `--background`, `--surface-muted`, `--border`, `--input` (and a small `--surface` clarification comment). `:root` only; `.dark` block untouched.
- `src/pages/Index.tsx` — replace the opening `<AnchorHeader …>` block (lines ~50–67) with the new hero `<section>` described above. Rest of the page (`§2`–`§8`) unchanged.
- `src/components/SiteHeader.tsx` — wrap the existing utility strip in a `useLocation().pathname !== "/"` check so the homepage hero owns the top band and there is no duplicate strip.

### What stays the same

All routes, every other page's `AnchorHeader`, the `Button` component (untouched — the homepage hero uses inline anchor styling for the 2px radius), the `SiteFooter` rebuild from the previous turn, the dark-mode palette, and all data files. No new components, no new fonts, no new dependencies — the search field uses native `<input>` + `<form>` with existing tokens.

