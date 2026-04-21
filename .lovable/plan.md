

## Footer cleanup — de-clutter, balance, standardize

A focused rebuild of `src/components/SiteFooter.tsx`. No other files touched. No route or data changes. The top metadata strip and bottom legal block stay in place; only typography/width tweaks.

### 1 · De-clutter link rows

- Drop the per-row `docId` rendering entirely. Each link becomes a single line with just the page title (e.g. `Verified Vendor Directory`).
- Drop the `forthcoming` chip on the Video Library row (or keep the row out — see §2). No more right-aligned mono codes inside columns. This eliminates all `...` truncation and the visual clutter.
- Internally the `LinkRow` type is simplified to `{ to: string; label: string }`.

### 2 · Refined 5-column content (exact mapping requested)

- **Col 1 — Brand**: `Logo`, single muted line `Maintained in Tampa, FL`. Remove the long descriptive paragraph, the "Founded 2026" line, and the `Document anchor · SS-FRAMEWORK-2026.01` line (that anchor already lives in the strip above the footer).
- **Col 2 — Registry**: Verified Vendors → `/verified-vendors`; Greenlist → `/greenlist`; Report a Concern → `/report-a-concern`; **Begin Verification → `/apply`** (rendered as the last link in the column, see §3).
- **Col 3 — Standards**: Audit Methodology → `/how-it-works`; Status Definitions → `/status-definitions`; Compliance → `/accountability`.
- **Col 4 — Library**: Foundational Sourcing → `/education#basics`; Interpreting CoAs → `/education/how-to-read-a-certificate-of-analysis`; Protocols → `/education#guides`; FAQ → `/education#questions`.
- **Col 5 — Governance**: Advisory Board → `/medical-advisory`; Terms → `/terms`; Privacy → `/privacy`; Disclaimer → `/verification-disclaimer`.

### 3 · "Begin Verification" demoted to a clean action link

- Replace the existing full-width `<Button>` in the Registry column with an inline action link: `Begin Verification →` styled as `text-[14px] font-medium text-foreground hover:text-foreground/70 inline-flex items-center gap-1` with a small chevron/arrow glyph. Sits as the last item in Col 2's link list (no extra padding, no separate block).

### 4 · Grid, typography, spacing

- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-10 items-start` (gutter bumped from `gap-x-8` to `gap-x-12` so columns never crowd).
- Each column wrapped with `items-start` to guarantee top alignment.
- Column heading (e.g. `Registry`) kept at `text-[12px] uppercase tracking-[0.14em] font-semibold mb-4`.
- Link rows: `text-[14px] leading-[1.8] text-muted-foreground hover:text-foreground transition-colors block` — stacked as a simple `<ul class="space-y-0">` (the 1.8 line-height alone provides the rhythm).

### 5 · Institutional metadata bar (above footer)

- Already in place at the top of the footer; confirm its inner spans use `font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground` (current is `text-[10.5px]` — bumped to `11px` per spec). Container width unchanged (`container-wide`).
- Content unchanged: `Standard SS-FRAMEWORK-2026.01 · Active` left, `Reviewed under Medical Advisory Board · Updated 04/21/26` right. This is now the only place document codes appear in the footer.

### 6 · Bottom legal block

- The disclaimer paragraph: `max-w-[900px] mx-auto text-center text-[12px] text-muted-foreground leading-relaxed`.
- The `© … SourceStandard.org` and `All rights reserved` row stays as a single justified row below the disclaimer, also centered, `text-[12px]`.

### Files touched

- `src/components/SiteFooter.tsx` — full rebuild per above.

### What stays the same

All routes, the surrounding `SiteLayout`, every other page, the `Logo` component, the `Button` component (no longer referenced from the footer), all design tokens, and the metadata strip's container alignment.

