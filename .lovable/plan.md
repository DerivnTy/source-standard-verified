

## Verified Vendors — Refined Registry Summary

Replace the awkward two-tier summary (mono count strip + oversized "0 Verified vendors…" line) with a single disciplined record-summary block. Same six numbers, restrained institutional presentation, no dashboard energy.

---

### The change

In `src/pages/VerifiedVendors.tsx`, replace the entire `{/* Refined status summary */}` section (lines 200–225) with one unified band:

- **Eyebrow row** — small mono label `REGISTRY SUMMARY · AS OF [date]` on the left, paired on the right with a quiet `Total tracked · 000` mono pill. Sets context as a public-record summary, not analytics.
- **Six-column count grid** — one row, evenly distributed, divided by hairline vertical rules (`md:divide-x divide-border/60`). Order: **Verified · Under review · Unverified · Suspended · Removed · Total tracked**. Each cell:
  - Uppercase mono label `text-[10.5px] tracking-[0.14em] text-muted-foreground` (e.g. `VERIFIED`).
  - Count beneath in `font-mono text-[22px] tabular-nums text-foreground` — present and scannable, but no theatrical 44–52px numerals.
  - A 2px wide × 10px tall colored "stamp tick" to the left of each label using the existing status color tokens (`bg-verified`, `bg-pending`, `bg-muted-foreground`, `bg-destructive`, `bg-muted-foreground/60`, and a neutral `bg-foreground/40` for Total) — ties each cell back to the `StatusBadge` system already used on the page without repeating the badge chrome.
- Stacks to a 2-column grid on mobile (`grid-cols-2 md:grid-cols-6`), no vertical dividers on mobile.
- Container framing kept consistent with surrounding bands: `border-b border-border bg-background`, `container-wide py-8 md:py-10`. Slightly tighter vertical rhythm than the current `py-10` so the summary reads as a metadata strip between the "Why this page matters" band above and the filter bar below.

### What stays the same

- All six counts (`vendors.length`, `counts.verified`, `counts["under-review"]`, `counts.unverified`, `counts.suspended`, `counts.removed`).
- The "Why this page matters" three-statement band above (lines 174–198) — untouched.
- The legend section further down the page — untouched.
- `BriefingHero`, filter bar, table, pagination, all data logic.

### Visual hierarchy

```text
REGISTRY SUMMARY · AS OF 04/22/2026                  Total tracked · 248
─────────────────────────────────────────────────────────────────────────
| VERIFIED  | UNDER REVIEW | UNVERIFIED | SUSPENDED |  REMOVED  |  TOTAL |
|    12     |      3       |    230     |     2     |     1     |   248  |
```

Quiet, evenly weighted, scannable in one pass. Reads as registry metadata, not as a stat widget.

### Files touched

- `src/pages/VerifiedVendors.tsx` — replace lines 200–225 only.

### Outcome

The oversized single-numeral treatment is gone. The page now opens (after the chapter hero and the three-statement explainer) into a single restrained six-cell registry summary that matches the institutional voice of the rest of the site — same family as the metadata strips on the article and policy pages, no dashboard styling.

