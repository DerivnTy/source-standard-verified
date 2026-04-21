

## Library page — Public Education & Standards overhaul

A copy + light visual pass on `src/pages/Education.tsx`. No data file edits, no routing changes, no changes to `/education/basics`, `/education/guides`, `/education/questions`, or entry detail pages. All overrides for titles/labels are applied at render time inside the component so `src/data/library.ts` stays the single source of truth.

### Header (`AnchorHeader`)

- Eyebrow: `Library` → `Public education & standards`
- Title: `Learn the landscape.` → `Clinical Reference & Standards Library.`
- Lead: → `Reference materials covering the administrative and clinical protocols that govern compounded medication sourcing, handling, and verification under the Source Standard framework.`

### Anchor row (jump-to)

Update labels to match new section names:
- `The Basics` → `Foundational Standards`
- `Practical Guides` → `Clinical Protocols`
- `Common Questions` → `Regulatory FAQ`
- Add: `Archive index` (new — see below)

### Archive index strip (new, ledger-style)

Directly under the anchor row, add a compact metadata strip matching the registry pages:
- Left: `Archive index · SS-LIB-2026.01`
- Right: `Maintained · Active`
Small mono uppercase 10px, divider underneath. Sets the "official archive" tone.

### Reference ID display (general)

Update `SimpleRow` so each entry visibly leads with its reference code:
- Add a fixed-width left column: `font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground tabular-nums w-28 shrink-0` showing `entry.id` (e.g. `SS-SERIES-002`).
- Title and summary stay to the right; layout becomes a 2-column row that scans like an archive entry.
- `SoftStatus` keeps its right-side placement as a small mono pill.

### §1 — Foundational Sourcing Standards (was "The Basics")

- Section heading: `Foundational Sourcing Standards`
- Lead: `Foundational reference material on compounded medications, sourcing chains, and the documentation that distinguishes a regulated source from an unregulated one.`
- Per-entry display title override (slug-keyed map applied only on this page; data file unchanged):
  - `how-to-read-a-certificate-of-analysis` → `Audit Protocols: Interpreting CoAs and Detecting Discrepancies`
- `See all foundational reads` → `View full foundational index →`

### §2 — Clinical Handling & Aseptic Protocols (was "Practical Guides")

- Section heading: `Clinical Handling & Aseptic Protocols`
- Lead: `Technical reference for sterile preparation integrity, aseptic technique, storage and stability, and endocrinological context. Reviewed by the Medical Advisory Board. Not a substitute for individualized clinical advice.`
- Slug-keyed display title overrides:
  - `safe-peptide-handling-and-reconstitution` → `Sterile Preparation Integrity: Handling & Reconstitution Protocol`
  - `sanitization-and-aseptic-technique-fundamentals` → `Aseptic Technique: Sanitization Fundamentals`
  - `the-science-of-aging-and-trt` → `Endocrinological Context: Age-Related Hormonal Change & TRT`
  - `dosing-guidance-summaries-for-common-compounds` → `Reference Dosing Ranges: Selected Compounds`
- `See all clinical guides` → `View full clinical protocol index →`

### §3 — Public Inquiry & Regulatory FAQ (was "Common Questions")

- Section heading: `Public Inquiry & Regulatory FAQ`
- Lead: `Plain-record answers on legal distinction, regulatory status, verification methodology, and consumer due diligence.`
- Rename FAQ buckets (display labels only — `FAQ_BUCKETS` array literal):
  - `Is this legal?` → `Legal Distinction & Access`
  - `Is it safe?` → `Regulatory Status & Safety Scope`
  - `How does verification work?` → `Verification Methodology`
  - `What should I look for?` → `Consumer Due Diligence`
- `See all questions` → `View full regulatory FAQ →`

### §4 — Coming soon (rename + edit one entry)

- Eyebrow: `Coming soon` → `Forthcoming reference formats`
- Render `librarySupplementary` with a small slug-keyed override applied at render time:
  - `SS-SUP-003` (`Integrity Report Feed`) displayed as `Annual Integrity Ledger` with description override: `Annual published summary of audit findings, status changes, and methodological revisions across the directory.`
  - Other two entries unchanged.
- Each list item now leads with its `id` in mono (`SS-SUP-001` etc.) to match the archive treatment.

### §5 — Footer disclaimer (high-authority medical-legal phrasing)

Replace the current "Everything here is informational only…" paragraph with a distinct, bordered notice block:
- Container: `mt-6 border-l-2 border-foreground/40 bg-surface-muted/40 px-4 py-3 rounded-[2px]`
- Eyebrow inside: `Notice · Informational use only` (mono uppercase 10px)
- Body (small foreground text, not muted-into-invisibility):
> The materials in this library are published for public reference and educational purposes only. They do not constitute medical advice, diagnosis, prescription, or treatment, and they do not establish a clinician–patient relationship. Clinical decisions regarding compounded medications must be made in consultation with a qualified, licensed healthcare provider. Reliance on any information contained herein is solely at the reader's own risk.

The "About this library" paragraph (Medical Advisory Board / governance link) is preserved above the notice block.

### Files touched

- `src/pages/Education.tsx` — header copy, anchor labels, new archive-index strip, `SimpleRow` restyle to surface reference IDs, three section renames + leads, slug-keyed title overrides for foundational + clinical entries, FAQ bucket label rename, supplementary entry override for `SS-SUP-003`, new bordered medical-legal notice block.

### What stays the same

All routes, the data in `src/data/library.ts`, the per-entry detail pages and "see all" index pages, the `Section` / `AnchorHeader` / `Accordion` components, all design tokens, and existing focus/hover behaviors.

