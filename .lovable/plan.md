

## Centered Whitepaper Layout — corrective pass

The previous pass already moved every doc page into a centered 920px column via `Section`. This pass tightens that work to match the spec exactly: confirmed 900px column, serif body, larger section gaps, restored bold `§N Title` header on a single line, and a clean hero→body divider. Plus the small site-wide checks (buttons, jurisdiction, footer).

### 1 · `Section` primitive — tighten to 900px + bigger chapter gaps

- `src/components/Section.tsx`: `max-w-[920px]` → `max-w-[900px]`. Vertical padding `py-14 md:py-16` → `py-16 md:py-20` so each `§` reads as a distinct chapter.
- Keep the 1px `border-t border-[#E5E7EB]` hairline between sections (already in place).

### 2 · `SectionLabel` — bold `§N Title` on one line

- `src/components/Section.tsx` (`SectionLabel`): render the section number and title as a single bold heading: `§1  Acceptance of Terms` in `text-[1.5rem] md:text-[1.625rem] font-semibold tracking-[-0.012em] text-foreground`. The `§N` keeps mono styling inline (`font-mono text-[0.85em] text-muted-foreground mr-2`) but lives inside the `<h2>` so it wraps as one unit.
- Description sits directly below at full 900px width (drop the `max-w-[68ch]` cap so body spans the container as requested).

### 3 · Serif body type for filings

- `src/index.css`: add a `.prose-filing` utility that swaps body paragraphs/lists inside `Section` to a serif stack (`'Source Serif Pro', 'Charter', Georgia, serif`) at `text-[16px] leading-[1.7]`. Headings stay Inter (sans).
- `src/components/Section.tsx`: wrap the `Section` inner container with `className="prose-filing"` so every doc page gets serif body automatically — no per-page edits.
- Add the Source Serif 4 Google Font import alongside the existing Inter/IBM Plex Mono import in `index.css`.

### 4 · Hero → body divider

- `src/components/RecordHeader.tsx`: confirm the bottom border is a single 1px `border-b border-[#E5E7EB]` (already set in the previous pass) and that the first `Section` after the header renders with `bordered={false}` so the hero divider is the only line between hero and §1. Audit Terms/Privacy/About/Disclaimer/Accountability/StatusDefinitions/FAQ/ReportConcern/HowItWorks for the `bordered={false}` flag on their first section and add it where missing.

### 5 · Site-wide functionality checks

- **Buttons**: `src/components/ui/button.tsx` already renders `rounded-[4px]` with `bg-foreground text-background` (off-black). Confirm and leave as-is.
- **"Tampa, FL" sweep**: re-grep the repo (excluding `src/data/vendors.ts` and `src/data/greenlist.ts`, which hold real vendor addresses). Replace any remaining branding instances with `United States`. Most have already been migrated; this is a verification pass.
- **Footer columns**: `src/components/SiteFooter.tsx` already uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-10 items-start` with no `truncate`. Confirm no link wraps awkwardly at 1024–1280px; if any column crowds, bump `gap-x-12` → `gap-x-14` and tighten the brand column with `pr-2`.

### Files touched

- `src/components/Section.tsx` — width, padding, single-line bold `§N Title`, serif wrapper class.
- `src/index.css` — Source Serif font import + `.prose-filing` utility.
- `src/components/RecordHeader.tsx` — verify hairline color (no change expected).
- `src/pages/Terms.tsx`, `src/pages/Privacy.tsx`, `src/pages/VerificationDisclaimer.tsx`, `src/pages/Accountability.tsx`, `src/pages/StatusDefinitions.tsx`, `src/pages/FAQ.tsx`, `src/pages/ReportConcern.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/About.tsx` — add `bordered={false}` to the first `Section` only where missing.
- `src/components/SiteFooter.tsx` — gutter tweak only if needed after visual check.

### What stays the same

All routes; every page's copy, lists, tables; the `RecordHeader` hero with the right-aligned Reference metadata box; the homepage; the footer structure and link set; `Button`/`StatusBadge`/`Card` primitives; every data file. No new components, no route changes.

