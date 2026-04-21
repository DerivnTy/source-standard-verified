

## Redesign Verification Page for Trust First, Process Second

Restructure `/how-it-works` (route stays the same; nav label remains "Verification") so the page leads with confidence and meaning, and treats procedure as supporting evidence — not the headline.

### New page flow (top to bottom)

1. **Hero — calm and confidence-building**
   - Title: `Verification`
   - Lead: "Source Standard verification is a structured review of vendor records, sourcing documentation, public claims, and applicable licensing. This page explains what is reviewed, how statuses are assigned, and what a published verification actually means."
   - Replace the heavy `RecordHeader` summary panel with a lighter inline header (h1 + lead + slim metadata strip showing only Updated · Scope · Standard ref). No four-cell summary box.

2. **Why this matters** — Trust-building section (new)
   - Short intro: why verification exists.
   - 3 compact statements, plain prose:
     - Sourcing records matter. Vendors are only as legitimate as the pharmacies and suppliers behind them.
     - Public claims should match documented reality. Verified status is assigned against evidence, not marketing language.
     - Verification is time-bound. Listings are reviewed against current records and renewed on a defined interval.

3. **What a verified listing means** — Moved up from §3
   - 2x2 grid of 4 plain blocks (no border-grid matrix feel):
     - What has been reviewed
     - What has not been reviewed
     - What a verified listing means
     - What it does not mean
   - Tight, prose-led, no reference IDs.

4. **Public statuses** — Moved up
   - Clean single-column list. Each row:
     - Status name (Verified · Unverified · Under Review · Suspended · Removed)
     - One-line meaning
     - "Tells the public:" short phrase
     - "Does not imply:" short phrase
   - Hairline dividers, no boxed grid.

5. **What we review** — Grouped, readable
   - Replace the flat 8-item bordered grid with 7 grouped cards in a 2-column layout:
     - Business identity
     - Licenses and registrations
     - Pharmacy and supplier records
     - Certificates and category records
     - Sourcing and invoice history
     - Public claims consistency
     - Renewal-related updates
   - Each card: group title + 1–2 sentence description of what's actually checked.

6. **Review lifecycle** — Simplified
   - Keep 6 steps, drop the 4-quadrant matrix per step. New per-step layout:
     - Step number + title (lead)
     - Short explanation (1–2 sentences)
     - "Reviewed at this stage:" one short line
     - "Possible result:" one short line
   - Vertical stack with hairline dividers between steps. No bordered grid cells.

7. **Renewal and monitoring** — Lighter
   - Short intro paragraph + clean bullet list of change triggers (no numbered grid rows).
   - Closing line about pause/suspend/re-review.

8. **What happens after verification** — New
   - 5 short bullets:
     - Public listing is created or updated
     - Status is shown publicly
     - Scope may be category-limited
     - Renewal obligations continue
     - Material changes can trigger re-review

9. **Why vendors apply** — New
   - 4 short value statements, written as plain prose, not sales copy:
     - Public registry presence
     - Category-specific review
     - Confidence signal for consumers
     - Claims supported by reviewed records
   - Closing CTA: small inline link to `/apply` ("Begin a verification application →"). No giant CTA panel.

10. **What this process is not** — Kept, simplified
    - Plain bulleted list, muted styling. Already exists in `notProcess` array.

11. **Footer reference strip** — Quiet
    - Small line: "Standard reference · SS-FRAMEWORK-2026.01 · Updated 04 / 21 / 2026" + links to `/status-definitions` and `/accountability`.

### Visual direction

- Eliminate the repeated bordered-grid look (`gap-px bg-border border border-border`) that made every section feel identical.
- Vary section rhythm: prose sections, hairline-divided lists, and only 1–2 places where cards make sense (What we review, What a verified listing means).
- Alternate `bg-background` and `bg-surface-muted` for breathing room, but use fewer total sections than today.
- Keep typography institutional (existing `meta`, `eyebrow`, container utilities) but reduce uppercase/mono density per section.
- No "§1 / §2" numbering in headers — replaces with quiet eyebrow labels (e.g. "Trust", "Scope", "Statuses", "Process", "After Review", "For Vendors", "Boundaries").

### What gets removed / reduced

- `RecordHeader` doc-style summary box (Lifecycle steps / Review basis / Public statuses / Renewal interval).
- Per-step 4-quadrant matrix (What happens / Documents / Outcomes / Status impact) — collapsed into prose + 2 short labeled lines.
- Standalone "Verification standards" section as a 7-card grid — its content is folded into "What we review" and the per-step explanations, so the page stops repeating the same idea three times.
- Numbered `gap-px bg-border` grids throughout.
- "§N — Section Name" eyebrows.

### Technical Details

- **File edited:** `src/pages/HowItWorks.tsx` (full rewrite of page body; data arrays restructured inline).
- **Header:** Drop `RecordHeader` import; build a lightweight inline `<header>` using existing utility classes (`container-wide`, `eyebrow`, `meta`).
- **Data refactor:** Replace the existing `steps` shape `{ n, t, happens, documents, outcomes, status }` with simplified `{ n, t, summary, reviewed, result }`. Introduce new arrays: `whyItMatters`, `meaningBlocks`, `reviewGroups`, `afterReview`, `vendorReasons`. Keep `statuses` and `notProcess`; drop `standards` and `reviewItems` (folded into `reviewGroups`); drop `changes` array structure but keep its content as a simple list under Renewal.
- **Components:** No new components. Reuse `Link` from `react-router-dom` for the small `/apply`, `/status-definitions`, `/accountability` links. No accordions — every section is readable inline at a glance.
- **No route changes**, no nav changes (label already "Verification"), no other files touched.

### Out of scope

- Building a separate `/status-definitions` redesign (link only).
- Adding visual diagrams or icons per step.
- Any backend or CMS wiring.
- Changes to header, footer, or other pages.

