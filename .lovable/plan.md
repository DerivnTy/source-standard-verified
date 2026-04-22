

## Rebuild the homepage below the hero

Replace the existing six sections under the hero with a tighter, sequenced institutional layout: **Problem → Method → Proof → Utility → Why it matters → Start here → Governance**. Same visual language already locked across the site (eyebrows, page-shell, w-standard, hairline dividers, alternating background/surface-muted bands). No new components, no token changes.

### Page sequence (below the existing `<BriefingHero>`)

```text
§1  The trust problem            (background)
§2  How Source Standard works    (surface-muted)   01 / 02 / 03
§3  Live registry proof          (background)      stats strip + 2 CTAs
§4  What you can verify          (surface-muted)   6-field utility list
§5  Why this matters             (background)      3-column positioning
§6  Start here                   (surface-muted)   3 foundational articles
§7  Governance & standards       (background)      3 institutional links
```

Hero stays exactly as it is. Footer stays exactly as it is.

### Section specs

**§1 — The trust problem**
- Eyebrow: `The trust problem`
- Heading (h2, `t-section-title-sm`): *Marketing claims are easy. Documentation is harder to verify.*
- Single supporting paragraph (`t-body-md`, max ~70ch): *Consumers and clinicians are often asked to rely on branding, website language, and trust signals without clear public visibility into sourcing and documentation. Source Standard exists to make those records easier to interpret.*
- Centered/left-aligned single column inside `w-standard`. No 3-column split here — this is the institutional statement, not a grid.

**§2 — How Source Standard works**
- Eyebrow: `How it works`
- Three numbered columns (01 / 02 / 03), same visual treatment as the current "How it works" block (numeric eyebrow, 8px hairline, h4 title, body-sm description).
- Content:
  1. **Upstream sources are reviewed** — Public records, registration data, and facility information are gathered into the upstream reference layer.
  2. **Vendors are assessed against those sources** — Public claims, sourcing relationships, and documentation are reconciled against the reviewed record.
  3. **Status is published in the public registry** — The registry records whether verification is on file, under review, or not currently published.

**§3 — Live registry proof**
- Eyebrow: `Live registry`
- Short heading (`t-section-title-sm`): *An active public reference, updated on a published cadence.*
- Stats strip using the existing `Stat` / `StatRow` primitives from `src/components/system/Stat.tsx` (mono numerals, 6 cells, hairline dividers — same pattern as registry pages):
  - Vendors tracked · Verified · Under review · Facilities recognized · States represented · Last updated
- Values derived at render time from `vendors` and `greenlist` data (counts) so the numbers are real, not hard-coded. `Last updated` shown as a short date string (today's build date or most recent `lastReviewed` across vendors — pick the latter for honesty).
- Two primary actions below the strip, same ghost-button pattern as the hero but in dark-on-light:
  - `Search Verified Vendors` → `/directory`
  - `Explore Greenlist` → `/greenlist`

**§4 — What you can verify**
- Eyebrow: `What you can verify`
- Left column (4/12): short heading (`t-section-title-sm`, max ~18ch) — *A working public utility, not a concept.* + one-line `t-body-sm` lede + `Open the registry →` link.
- Right column (8/12): 2-col grid of 6 fields (label `t-body-sm` semibold + description `t-body-sm` muted):
  - Verification status · City and state · Fulfillment model · Clinical focus · Upstream source relationships · Last review date
- Reuses the exact layout already in the current §4. Replace "Upstream source relationships" copy slightly to match the new wording; swap "Status changes" out for "Fulfillment model" per your spec.

**§5 — Why this matters**
- Eyebrow: `Why this matters`
- Three columns with `md:divide-x` (same pattern as current §5):
  - **For consumers** — A documented reference point beyond marketing claims.
  - **For responsible vendors** — A public trust signal tied to reviewed records.
  - **For the market** — A clearer line between documented and undocumented sourcing.

**§6 — Start here**
- Eyebrow: `Start here`
- 3-card grid (not 4) using the existing card treatment (bordered, hairline gaps, hover surface-muted). Cards:
  1. *What verification actually means* → `/library/what-source-standard-verification-actually-means`
  2. *What is compounding* → `/library/what-is-compounding`
  3. *Questions to ask your clinic* → `/library/questions-to-ask-your-clinic`
- Secondary link below: `Browse Resource Library →` → `/education`

**§7 — Governance & standards**
- Eyebrow: `Governance & standards`
- One short lede line (`t-body-md`, max ~60ch): *The framework operates under published standards, recurring review, and medical advisory oversight.*
- Three-link institutional row (hairline-separated list, same `divide-y` pattern as current §6 anchors block, but values are links not descriptions):
  - **Advisory Board** → `/medical-advisory`
  - **Audit Methodology** → `/governance`
  - **Status Definitions** → `/status-definitions`

### Removed from current homepage

- Current §2 "Why this exists" (3-card claims/documentation/visibility block) — folded into the new §1 single-statement section.
- Current §6 anchors block (FDA / USP / PCAB / NSF) — removed from homepage. (Still lives on `/governance` and `/about` where it belongs. Homepage governance section now points to internal authority pages, not external standards bodies — cleaner positioning.)
- The 4th basics card ("How to read a CoA") — homepage drops to 3 foundational articles per spec; the CoA article remains accessible from `/education`.

### Files touched

- `src/pages/Index.tsx` — rewrite everything below `<BriefingHero>`. Hero block and `HeroActions` stay untouched.
- No other files modified. `Stat` / `StatRow` imported from `src/components/system/Stat.tsx`. Vendor and greenlist counts computed inline from `src/data/vendors.ts` and `src/data/greenlist.ts`.

### Typography & spacing rules (locked)

- Eyebrows: `t-eyebrow-sm text-muted-foreground`
- Section titles: `t-section-title-sm text-foreground`
- Body: `t-body-md` for ledes, `t-body-sm` for descriptions and grid cells
- Numeric stats: existing `Stat` primitive (mono 20/28, weight 500)
- Section padding: existing `section-pad` utility, alternating `bg-background` and `bg-surface-muted/30`, all bordered with `border-b border-border`

### Out of scope

- Hero changes
- Footer changes
- Any new components, tokens, or color changes
- Any data-model changes (counts read from existing arrays)
- Routes (all destination URLs already exist)

