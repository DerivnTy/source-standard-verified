

## Redesign §8 — Final Split CTA as a Structured Pathway Panel

The current block reads as two text columns floating in a tall navy band. Replace it with a compact, gridded "split-decision panel" that reads as one finished object — clear hierarchy, anchored copy, integrated structure, and a tight handoff into the footer.

---

### Design

```text
┌──────────────────────────────────────────────────────────────────┐
│  CHOOSE YOUR PATH ───────────────────────────────────────────    │  ← micro-eyebrow band
├──────────────────────────────┬───────────────────────────────────┤
│  01 / FOR CONSUMERS          │  02 / FOR VENDORS                 │
│                              │                                   │
│  Search the Registry         │  Apply for Verification           │
│  Look up a clinic and see    │  A public listing is a trust      │
│  what its public record      │  asset, not just a status         │
│  actually documents.         │  marker.                          │
│                              │                                   │
│  ▸ Open the Registry         │  ▸ Begin Verification             │
└──────────────────────────────┴───────────────────────────────────┘
```

Each column is a self-contained, framed cell with a numbered label, headline, body, and CTA stacked tightly as one unit. The eyebrow band at the top anchors the section as a deliberate "split decision" rather than two loose boxes.

---

### Changes (single edit, `src/pages/Index.tsx` lines 325–363)

**1 · Compact the band**
- Outer `py-14 md:py-20` → `py-12 md:py-14`. Closes the dead air above and below.
- Wrap content in `container-wide` but cap the inner panel at `max-w-[1080px] mx-auto` so the two columns sit at a comfortable reading rhythm rather than spanning edge-to-edge.

**2 · Add an eyebrow header band**
- Above the grid: a single thin row with `font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/45` reading **"Choose your path"**, separated from the grid by `border-b border-white/10 pb-4 mb-10`. Anchors the section, signals intent, and gives the divider/structure a reason to exist.

**3 · Convert columns to framed cells**
- Wrap the grid in `border border-white/10 rounded-[2px]` and use internal `divide-x divide-white/10` between columns (mobile: `divide-y divide-x-0`).
- Each column: `p-8 md:p-10` so copy sits inside a real container instead of floating on the band.
- Drop `items-start` ambiguity — uniform padding makes both cells visually equal-weight.

**4 · Numbered labels + tighter copy stack**
- Eyebrow becomes `01 / For consumers` and `02 / For vendors` (mono, `text-white/50`). The numbering implies sequence/parity and gives each side a stronger anchor than a bare label.
- Heading: keep size, drop `max-w-[14ch]` (cell padding now constrains width naturally).
- Stack rhythm: eyebrow → `mt-4` heading → `mt-3` body → `mt-7` CTA. Tighter copy grouping; CTA gets a touch more breathing room so it reads as the action, not another paragraph.

**5 · CTA treatment — integrated, not dropped in**
- Replace `ghostBtnSecondary` with an inline arrow link style for both:
  `inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.18em] text-white border-b border-white/40 hover:border-white pb-1`
- Trailing `→`. Reads as a deliberate next-step affordance integrated with the copy block, matching the inline-arrow link pattern used elsewhere on the homepage (e.g. "Resource Library →" at line 319). Removes the visual weight of two boxed buttons sitting in a dark band.

**6 · Divider becomes structural, not arbitrary**
- The `divide-x` now lives inside a bordered frame, so it reads as a panel seam rather than a floating vertical line. Mobile fallback: `divide-y` for the same logic stacked.

**7 · Footer handoff**
- Bottom padding of the section (`py-12 md:py-14`) plus the framed inner panel gives the navy band a defined edge instead of feeling like it bleeds into the footer. No extra spacer needed — the panel's bottom border + reduced section padding does the work.

---

### Files touched

- **Modified:** `src/pages/Index.tsx` — replace the §8 block (lines 325–363) with the panel composition above. No new components, no asset changes, no impact on any other section.

### Outcome

A compact, structured split-decision panel with an eyebrow header, two framed cells, numbered labels, tightly grouped copy, integrated arrow-link CTAs, and a clean transition into the footer. Reads as the homepage's deliberate closing move rather than a placeholder layout.

