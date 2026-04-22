

## Refine Greenlist Bottom Section — Tightened Closing Block

Restructure the bridge-to-vendor-registry section at the end of `/greenlist` so the eyebrow, explanation, CTA, and disclaimer read as one unified closing block instead of three loose pieces.

---

### Design

```text
TWO LAYERS, ONE FRAMEWORK ──────────────────────────────

The Greenlist establishes the upstream reference set —
the recognized facilities a vendor may legitimately
source from. Vendor verification is the second layer:
it assesses whether a specific clinic can substantiate
its sourcing through licensed upstream pharmacies and
documented records.

▸ Open the Vendor Registry
─────────────────────────────────────────────────────────
Note · Source Standard does not accept payment from
facilities for inclusion in the Greenlist. Information
is derived from public regulatory filings…
```

CTA sits directly under the explanation as a natural continuation. Disclaimer is anchored beneath a thin rule with a "Note ·" lead-in so it reads as integrated supporting copy, not an afterthought.

---

### Changes (single edit, `src/pages/Greenlist.tsx` lines 562–590)

**1 · Compact the band**
- `py-14 md:py-16` → `py-10 md:py-12`. Removes dead vertical space.
- Cap inner content at `max-w-[760px]` (single editorial column) so the explanation, CTA, and note share one anchored measure.

**2 · Stronger eyebrow**
- `text-[10.5px] text-muted-foreground mb-6` → `text-[11px] text-foreground/70 mb-4`. Slightly more presence; tracking unchanged.

**3 · Collapse the 12-col split into a single editorial stack**
- Drop the `grid md:grid-cols-12` two-column layout entirely. Explanation paragraph stays as the primary weight.
- Remove the secondary "To see who is currently verified…" line (now redundant — the CTA itself communicates it).
- CTA moves directly beneath the paragraph: `mt-6 inline-flex` arrow link, same styling as today (`text-[14px] font-medium text-foreground hover:text-primary`, trailing `→`). Reads as a continuation of the sentence rather than a floating right-side button.

**4 · Integrated disclaimer block**
- Replace the loose `mt-10 pt-6 border-t` paragraph with a tighter framed note:
  - `mt-8 pt-5 border-t border-border/50`
  - Lead-in: small mono label `Note` in `font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground` on its own line.
  - Body: `mt-2 text-[12.5px] leading-[1.65] text-muted-foreground` — same copy, slightly tighter measure (`max-w-[68ch]` aligned to the editorial column).
- Reads as a labelled supporting note, not a stranded paragraph.

**5 · Hierarchy lock**
- Eyebrow (`Two layers, one framework`) — overline.
- Body paragraph — primary weight, `text-[15px] text-foreground/85`.
- CTA — secondary, inline arrow link with underline-offset hover.
- Note — tertiary, mono-labelled, smaller and dimmer.

---

### What stays the same

- Section background (`bg-surface-muted/30`), top border separating it from the table, copy content, CTA destination (`/directory`), disclaimer wording.

### Files touched

- **Modified:** `src/pages/Greenlist.tsx` — replace lines 562–590 with the unified single-column composition above.

### Outcome

A compact, editorial closing section: clear overline, one substantive paragraph, an arrow CTA that reads as the next sentence's natural step, and a properly labelled disclaimer note beneath a thin rule. No floating right-side button, no awkward whitespace between pieces.

