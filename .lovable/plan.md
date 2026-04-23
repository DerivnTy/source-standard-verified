

## Clinical Oversight: Elevate Sections 01 & 02 to Registry-Grade Authority

The current Sections 01 and 02 read as plain marketing copy in undifferentiated grids. To match the institutional gravitas of the rest of the site (Stripe-meets-government-registry), we restructure both into the same canonical "filing" pattern used elsewhere: monospace clause numbering, a left-rail headline + meta block, a hairline-divided ledger of statements on the right, and quiet typographic discipline.

### Section 01 — Institutional Mandate

Current: a 2×2 grid of equal-weight sentences. Reads soft.

New: **two-column filing layout** matching Section 02's existing rhythm.

```text
01                                                     |  CLAUSE 01.A   The Medical Advisory Board provides
                                                       |                independent clinical oversight of the
INSTITUTIONAL                                          |                verification framework.
MANDATE                                                |  ─────────────────────────────────────────────────
                                                       |  CLAUSE 01.B   Audit determinations are findings of
Issued under SS-MAB-2026.01                            |                record based on documented pharmacy
Effective: current registry cycle                      |                sourcing, licensure, and regulatory
                                                       |                standing.
                                                       |  ─────────────────────────────────────────────────
                                                       |  CLAUSE 01.C   The Board maintains the integrity of
                                                       |                the standard through periodic review
                                                       |                of forensic audit criteria.
                                                       |  ─────────────────────────────────────────────────
                                                       |  CLAUSE 01.D   To ensure objective distance, Board
                                                       |                members do not participate in vendor
                                                       |                approvals or commercial activities.
```

- Left rail (`md:col-span-5`): mono `01` index, large `t-section-title-sm` headline, then a small meta block in `t-utility-xs` muted (Issued under / Effective).
- Right column (`md:col-span-7`, hairline left border): an `<ol>` of four clauses, each row: `CLAUSE 01.A` mono label (col-span-3) + statement body (col-span-9), separated by `divide-y divide-border/60`.
- Statement body uses `t-body-md text-foreground` with comfortable leading; first sentence-fragment of each clause stays bold-foreground (none here, since these are single statements).

### Section 02 — Governance Framework

Current: clean ledger but still feels light because rows have only `01 / Title / desc`. We tighten and dignify it without breaking the structure.

- Keep the left-rail / right-list 12-col grid.
- Add a meta block under the headline mirroring Section 01: `Authority: Medical Advisory Board` / `Reference: §02 of SS-MAB-2026.01`.
- In the right column, prepend a tiny ledger header row: `FUNCTION` (left) · `STATUTORY BASIS` (right), in `t-utility-xs uppercase tracking-wide text-muted-foreground`, divider beneath. This single header transforms the list from "bullet points" into "registry schedule".
- Each row becomes: `01` mono · Title (semibold foreground) · description (muted), with the title and description stacked tightly. Increase `py-6` for breathing room; hairline divider stays.
- Add a closing footer line under the list: small mono caption — `End of Schedule §02 · 4 functions enumerated` — muted, right-aligned. This is the single move that pushes the section from "list" to "filed instrument".

### Shared Discipline (both sections)

- Replace the existing `<SectionIndex n="01" />` floating number with the integrated left-rail mono index used in Section 02's pattern (consistency).
- Add a thin top hairline rule (`border-t border-border/60`) at the start of each section's content area below the headline rail to formalize the "document opens here" feel.
- Keep `section-pad` and `border-b border-border/40` between sections — already correct.
- All numerals/labels use `font-mono tabular-nums` so figures align like a ledger.

### Why this reads as authority

1. **Numbered clauses with formal labels** (`CLAUSE 01.A`) signal a filed standard, not a webpage.
2. **Left-rail headline + issuance metadata** is the visual grammar of legal/regulatory documents.
3. **Schedule header + footer caption** in Section 02 frames the list as an enumerated instrument.
4. **Mono tabular labels** + hairline rules = registry typography, not marketing copy.

### Files Edited

- `src/pages/MedicalAdvisory.tsx` (Sections 01 and 02 only; rest of page untouched)

