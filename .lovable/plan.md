

## Clinical Oversight: Find the Middle Ground for Sections 01 & 02

The current sections swing too plain — undifferentiated text rows that read like a Wix template. The previous "registry filing" version overcorrected into bureaucratic theatre. The fix is **formatting**, not more chrome: give each statement structural weight through indexing, hierarchy, and rhythm, while keeping the language consumer-readable.

### Section 01 — Institutional Mandate

Convert the flat divided list into a **numbered statement list with a lead phrase + supporting clause** structure. Each clause gets a small mono index and the first phrase is bolded as a "headline" for the statement, with the rest as supporting text. This is the pattern Stripe and the FDA both use for principle statements.

```text
01                          ―                    
                                                  01   Independent clinical oversight.
Institutional                                          The Medical Advisory Board provides independent
Mandate                                                oversight of the verification framework.
                                                  
                                                  02   Findings of record.
                                                       Audit determinations are based on documented
                                                       pharmacy sourcing, licensure, and regulatory
                                                       standing.
                                                  
                                                  03   Periodic review.
                                                       The Board maintains the integrity of the standard
                                                       through periodic review of forensic audit criteria.
                                                  
                                                  04   Objective distance.
                                                       Board members do not participate in vendor approvals
                                                       or commercial activities.
```

- Keep the existing 12-col grid (`md:col-span-5` rail / `md:col-span-7` content).
- Each row: `01` mono index (col-span-2, muted, tabular-nums) · stacked title + body (col-span-10).
- **Title line**: short noun phrase, `t-body-md font-semibold text-foreground` — gives each clause a scannable anchor.
- **Body**: `t-body-md text-muted-foreground leading-relaxed` — readable, calm.
- Hairline `divide-y divide-border/60` between rows, `py-6` for breathing room.

### Section 02 — Governance Framework

Already has the title + description structure. The fix is **alignment and rhythm** to match Section 01:

- Same 12-col grid (already correct).
- Same `01` mono index column (col-span-2).
- Same title/body typography pair as Section 01 — currently uses it; just unify spacing to `py-6` and confirm `items-baseline` so the mono index sits on the title's baseline.
- No header row, no footer caption, no metadata block. Just the clean numbered ledger.

### Why This Works

1. **Numbered indices** give the content structural authority without screaming "legal document".
2. **Title + supporting line per item** is the universal pattern for both consumer documentation (Stripe) and institutional documentation (FDA guidance) — scannable but substantive.
3. **Consistent rhythm across both sections** makes the page feel composed rather than assembled.
4. **No mono labels, no metadata blocks, no footer captions** — keeps it readable, not theatrical.

### Files Edited

- `src/pages/MedicalAdvisory.tsx` (Sections 01 and 02 only)

