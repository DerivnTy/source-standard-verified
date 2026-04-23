

## Global Change 02 — Tighten Closing Space Above Footer

Reduce the dead zone between the last content section and the footer site-wide. Today three things stack up to create a large empty band:

1. The last `<section>` on most pages uses `section-pad` (= 64px bottom on lg).
2. `SiteFooter` adds `mt-20` (= 80px top margin).
3. `SiteFooter` then adds `py-16` (= 64px top padding inside).

Total gap on desktop: ~208px of empty space. That's the "dropped footer" feeling.

### Fix — single point of control

Make the footer own the closing rhythm. Remove the page-side margin entirely, and run one tighter, governed top pad inside the footer. The last section's natural bottom padding stays as-is so it doesn't feel cramped.

**In `src/components/SiteFooter.tsx`:**

- Change `<footer className="border-t border-border bg-surface-muted/30 mt-20">` → remove `mt-20`.
- Change inner `<div className="page-shell py-16">` → `py-12 md:py-14` for the top/bottom of the footer interior.
  - Net result: closing transition is now ~64px (last section's own `pb`) + ~56px (footer top pad) = ~120px on desktop, down from ~208px. Mobile: ~32 + 48 = ~80px, down from ~144px.

That's the entire change. One file. No per-page edits.

### Why this approach (not per-page)

- Every main institutional page already routes through `SiteLayout` → `<main><Outlet/></main>` → `SiteFooter`. The `mt-20` on the footer is the single sitewide source of the gap.
- Removing it normalizes every page in one move and guarantees consistency — the user's stated goal ("end of each page should feel governed by one rule, not random per-page spacing").
- The last section keeps its `section-pad` so reading-density pages (Terms, Privacy, Status Definitions, Accountability, Verification Disclaimer) still breathe. We're only removing the *added* void, not the section's own bottom padding.

### Verification (mental walk)

- Terms / Privacy / Status Defs / Accountability / Disclaimer: last `SplitSection` ends with `section-pad` + `border-b` → footer `border-t` sits cleanly ~120px below the last clause line.
- About / Verification / Medical Advisory / Education: same — last section closes with its own pad, footer follows.
- Library articles (`ArticleFooter`) already render their own closing rule and citation strip, then the site footer; tightening the top pad makes that transition feel deliberate rather than dropped.
- Registry / profile pages (`VerifiedVendors`, `Greenlist`, `VendorProfile`, etc.): they end with table footers or related-records strips; same improvement applies and is desired.

### Files touched

- `src/components/SiteFooter.tsx` — two-line change (remove `mt-20`, tighten inner `py-16` → `py-12 md:py-14`).

### Out of scope

- Inter-section spacing (`section-gap`, `section-pad`) — that's the next pass the user already flagged.
- Footer content, columns, copy, or layout.
- Hero spacing.
- No per-page edits.

