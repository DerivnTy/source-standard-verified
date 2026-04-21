

## Minimize Directory Legend + Add Dedicated "How to Read" Page

Reduce the `VerifiedVendors` legend to a quiet single-row orientation strip, and create a new dedicated page that holds the full explanation.

### 1. Slim the legend on `src/pages/VerifiedVendors.tsx`

Replace the current card-grid legend block (lines 175–195) with a much lighter strip:

- Container: `bg-surface-muted border-b`, `container-wide py-3` (down from `py-5`).
- Single horizontal row of 5 minimal items, `flex flex-wrap items-center gap-x-5 gap-y-2`.
- Each item: a small color marker dot (reusing the `StatusBadge` color tokens via a tiny inline marker) + status label + `—` + one-word descriptor. Compact mono label, `text-[12px]`.
- Copy:
  - Verified — published
  - Under Review — in progress
  - Unverified — not published
  - Suspended — paused
  - Removed — removed
- Below the row, a single small link line: `Read more about how to read this directory →`, linking to `/how-to-read-the-directory`. Mono, `text-[12px]`, muted with hover to foreground.
- Remove the longer "Note on Unverified" paragraph entirely from this page.

No card boxes, no hairline grid, no second descriptor line. Quiet orientation strip only.

### 2. New page: `src/pages/HowToReadTheDirectory.tsx`

Create a new full page using the existing institutional design system (`RecordHeader` + numbered `Section`s, same rhythm as `StatusDefinitions.tsx` and `HowItWorks.tsx`).

- `RecordHeader`:
  - Doc `SS-DIR-GUIDE-2026.01` · Version `2026.01` · Status `Active` · Updated `April 21, 2026` · Jurisdiction `US`
  - Eyebrow: `Public Reference · Directory Guide`
  - Title: `How to read the directory.`
  - Lead: short framing sentence about how vendor listings and statuses should be interpreted.

- Section scaffold (content to be written separately by the user — placeholder prose for now):
  - §1 — What this directory shows
  - §2 — How vendor listings are structured
  - §3 — Status definitions (full version of the 5 statuses with longer meaning, what each tells the public, what it does not imply)
  - §4 — What "Unverified" does and does not mean (the full note that previously lived on the directory page)
  - §5 — How review status works (what triggers Under Review, what completion looks like)
  - §6 — Suspended vs. Removed (what each indicates and what changed)
  - §7 — What a consumer should and should not infer from status alone
  - §8 — Cross-links: `/verified-vendors`, `/status-definitions`, `/verification-disclaimer`, `/accountability`

- Cite-as footer strip matching other reference pages.

Each section uses the same 4-col / 8-col grid (eyebrow + heading left, prose right), alternating `bg-background` / `bg-surface-muted`, hairline dividers — identical to `About.tsx` and `HowItWorks.tsx`.

### 3. Routing — `src/App.tsx`

- Import `HowToReadTheDirectory`.
- Add `<Route path="/how-to-read-the-directory" element={<HowToReadTheDirectory />} />` inside the `SiteLayout` route group.

### Files

- **Edit:** `src/pages/VerifiedVendors.tsx` (legend block only, lines ~175–195)
- **Edit:** `src/App.tsx` (one import + one route)
- **Create:** `src/pages/HowToReadTheDirectory.tsx`

### Files NOT touched

- `src/data/vendors.ts`, `src/components/StatusBadge.tsx`, `RecordHeader.tsx`, header/nav/footer.
- Greenlist page (parallel update can be requested next if desired).
- `StatusDefinitions.tsx` (remains as the formal status reference; new page is the consumer-facing reading guide and links to it).

### Result

The directory page becomes a clean registry view with a quiet one-line legend and a single link out to the full guide. The new `/how-to-read-the-directory` page absorbs all the longer explanatory content, keeping the directory minimal while preserving public access to the full interpretation guidance.

