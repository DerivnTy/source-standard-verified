

## Footer overhaul + Education status-badge polish

Two scoped changes: rebuild `SiteFooter.tsx` into the four-column "Boring Bureau" institutional layout you specified, and tighten the Education page's status indicator into a small boxed badge to match. No route or data-model changes.

### 1 · SiteFooter.tsx — full rebuild

Replace the current 5-column `cols` array and footer markup with a four-column institutional layout. Each link row becomes a high-density entry: link label on the left, document ID in `font-mono` (JetBrains Mono via the existing IBM Plex Mono fallback already loaded — see below) on the right. 1px vertical dividers between columns.

**Top compliance strip (kept, tightened)**
- `Standard SS-FRAMEWORK-2026.01 · Active` (left)
- `Reviewed under Medical Advisory Board · Updated MM/DD/YY` (right)

**Brand column (left, spans full height of the 4-col grid)**
- `Logo` + one-line institutional description
- `Tampa, FL · Founded 2026`
- `Document anchor: SS-FRAMEWORK-2026.01`

**Column 1 · Registry & Intake**
- Verified Vendor Directory → `/verified-vendors` · `SS-REG-V`
- Upstream Greenlist → `/greenlist` · `SS-REG-G`
- Report a Concern → `/report-a-concern` · `SS-INTAKE-02`
- Primary CTA button: `Begin Verification (Step 1)` → `/apply` (rendered with the existing `Button` component, `variant="default"`, full-width, mt-5)

**Column 2 · Standards & Protocols**
- SOP: Audit Methodology → `/how-it-works` · `SS-FRAMEWORK`
- Status Definitions → `/status-definitions` · `SS-STATUS`
- Compliance & Enforcement → `/accountability` · `SS-ENFORCE-2026.01`
- Vendor Submission Standard → `/for-vendors` · `SS-INTAKE-01`

**Column 3 · Educational Library** *(new column — removed from Standards)*
- Foundational Sourcing → `/education#basics` · `SS-SERIES`
- Interpreting CoAs → `/education/how-to-read-a-certificate-of-analysis` · `SS-SERIES-002`
- Clinical Protocols (Sterile Handling) → `/education#guides` · `SS-GUIDE`
- Regulatory FAQ → `/education#questions` · `SS-FAQ`
- Video Library *(Forthcoming, muted)* → `/contact` · `SS-SUP-001`

**Column 4 · Governance & Legal**
- Medical Advisory Board (MAB) → `/medical-advisory` · `SS-MAB-2026.01`
- Organizational Neutrality → `/governance` · `SS-GOV-2026.01`
- Terms of Use → `/terms` · `SS-TERMS-2026.01`
- Privacy Policy → `/privacy` · `SS-PRIVACY-2026.01`
- Verification Disclaimer → `/verification-disclaimer` · `SS-DISCLAIMER-2026.01`

**Visual styling**
- Background: `bg-surface-muted/30` (very light architectural tint over the existing background — the token already exists in `index.css`).
- 4-column grid (`md:grid-cols-12`, brand col `md:col-span-3`, link cols `md:col-span-9` split into `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), with **1px dividers** between columns via `lg:divide-x lg:divide-border/60` and `lg:px-6` per column.
- Each link row: `flex items-baseline justify-between gap-3 py-1.5`. Label `text-[13.5px] text-muted-foreground hover:text-foreground transition-colors`. Doc ID right-aligned in `font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground/60 tabular-nums`. (Project already loads `IBM Plex Mono` in `index.css` — `font-mono` resolves to a JetBrains-Mono-equivalent monospace via Tailwind's stack. No font swap needed.)
- "Forthcoming" rows: append a small `[Forthcoming]` chip in `font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground/70 border border-border/60 px-1 py-px rounded-[2px]`.
- Column titles: `text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground mb-4` — institutional/bureau feel.
- Bottom legal block (kept): independent-auditing-body paragraph + copyright row, separated by the existing `border-t border-border/70`.

### 2 · Education.tsx — status pill polish

Single tweak in `SoftStatus` to render a boxed badge instead of the current bare uppercase mono text:

- From: `<span class="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground/70">Outlined</span>`
- To: `<span class="shrink-0 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground border border-border/70 px-1.5 py-px rounded-[2px] bg-background">Outlined</span>`

Apply the same boxed-badge style in the supplementary "Forthcoming" list at the bottom of the page so the visual language is consistent across the page and the footer.

The existing "Jump to" anchor row (Foundational Standards | Clinical Protocols | Regulatory FAQ | Archive index) is already in place — no change needed.

### Files touched

- `src/components/SiteFooter.tsx` — full rebuild per spec above.
- `src/pages/Education.tsx` — `SoftStatus` component + supplementary list status text restyled as boxed badges. No structural / copy changes.

### What stays the same

All routes, all data files (`src/data/library.ts`), the `RecordHeader` / `Section` / `AnchorHeader` primitives, design tokens, color palette, and every other page. No new components, no new fonts, no new dependencies.

