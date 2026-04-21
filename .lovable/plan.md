

## Centered Administrative Layout — Whitepaper / Regulatory Filing pass

Three coordinated changes turn every content-heavy page into a centered, single-column "legal filing" document while keeping the institutional metadata box and existing copy intact.

### 1 · `Section` + `SectionLabel` rebuild (`src/components/Section.tsx`)

The shared primitives already wrap every doc page (Terms, Privacy, VerificationDisclaimer, Accountability, StatusDefinitions, FAQ, ReportConcern, HowItWorks). Editing them once propagates the new look everywhere.

- **Centered single-column container.** `Section` swaps its three container variants for one centered prose container: `mx-auto w-full max-w-[920px] px-6 md:px-10`. The `container` prop is kept for back-compat but every value resolves to the centered 920px track. (Tables/grid pages can still override with their own width via `className`.)
- **Unified background.** Drop the `muted` alternation — every section renders on the page's `--background` (`#F8F9FA`). The `muted` prop is accepted but ignored, so we don't have to touch every consumer.
- **Unified vertical rhythm.** Density variants collapse to a single `py-14 md:py-16` so the page reads as one continuous filing, not stacked blocks.
- **Section divider.** Each section renders a 1px full-width hairline at its top (`border-t border-[#E5E7EB]`), except when it's the first section after the header (consumer can pass `bordered={false}` — already supported).
- **`SectionLabel` becomes the "filing header".** New layout:
  - `§N` rendered inline left of the title in `font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground` with a 12px right margin
  - title bumps to `text-[1.375rem] md:text-[1.5rem] font-semibold tracking-[-0.012em] text-foreground`
  - description sits below at `text-[15.5px] leading-[1.7] text-muted-foreground max-w-[68ch]`
  - the redundant `eyebrow` slot is removed (the `§N` chip replaces it)
- **Body prose width.** All inner `max-w-3xl` / `max-w-4xl` lists already cap at ~720–820px which sits comfortably inside the 920px container. No per-page edit required — they re-center naturally because the wrapping container is now centered.
- **`DocId` retired from the body.** The mono `Doc SS-… · §N · v2026.01` strip rendered above every section adds visual noise and duplicates the `§N` chip in `SectionLabel`. The `DocId` helper (defined inline in seven pages) becomes a no-op — replaced with a single `Doc SS-…` line at the very bottom of each page (already present as the "Cite as" footer).

### 2 · Doc-page consumers — minimal edits

For the seven pages that import `Section` + `SectionLabel` (Terms, Privacy, VerificationDisclaimer, Accountability, StatusDefinitions, FAQ, ReportConcern), the only change is removing the `<DocId section="§N" />` line above each `SectionLabel`. The existing `number="§N"` prop on `SectionLabel` already feeds the new inline chip. About 35 one-line deletions across seven files; no copy changes.

`HowItWorks.tsx` follows the same pattern — same edit.

### 3 · `About.tsx` — convert from custom 4/8 grid to shared `Section` primitive

About is the only page still using inline `<section><div className="container-wide"><div className="grid md:grid-cols-12">` with a left-side `md:col-span-4` header column. Rewrite all eight `§` blocks to use `Section` + `SectionLabel` with the existing copy:

- §1 Context, §2 Our Role, §3 Formation, §6 Stance, §8 Mission → straight prose, one `<SectionLabel>` + paragraph(s) below.
- §4 Beliefs → `<SectionLabel>` + the existing `beliefs.map` rendered as a clean numbered list (`§4.1 …`).
- §5 Scope → `<SectionLabel>` + the existing two-column "What we do / What we do not do" table kept as-is (full 920px width).
- §7 Stakeholders → `<SectionLabel>` + the existing two-column consumer/vendor block kept as-is.
- Final "Cite as" strip → `<Section density="tight">` matching the other doc pages.

Result: About reads exactly like Terms, Privacy, and the rest.

### 4 · `RecordHeader` — seamless transition into the filing

One small change so the header lands cleanly into the centered body:

- Header container width unchanged (still `container-wide` so the metadata box can sit at the right edge).
- The bottom border `border-b border-border/60` is kept, but its color drops to the same `#E5E7EB` token as the in-body section dividers, so the header → §1 transition reads as one continuous hairline rather than two competing rules.
- No structural change to the metadata "Reference" box — it stays top-right exactly as built.

### 5 · Bold-lead utility (typography polish)

Add a lightweight `.lede` helper in `index.css` consumers can apply to any paragraph: `font-medium text-foreground` for the first inline `<strong>` span. In practice, the existing pattern `<span className="font-semibold text-foreground">Limit of liability.</span> …` is already used in Terms §5 and Privacy §3. No new code required — but we apply the same pattern to the first paragraph of each §1 across Terms, Privacy, VerificationDisclaimer, and Accountability, so administrative scanners get a bolded 2-3 word lead on every section's opening sentence.

### Files touched

- `src/components/Section.tsx` — rewrite container + `SectionLabel` per §1.
- `src/index.css` — no new tokens; confirm body `line-height: 1.6` (already set) and `p { line-height: 1.6 }` (already set). No edit if values match.
- `src/components/RecordHeader.tsx` — bottom border color swap.
- `src/pages/Terms.tsx`, `src/pages/Privacy.tsx`, `src/pages/VerificationDisclaimer.tsx`, `src/pages/Accountability.tsx`, `src/pages/StatusDefinitions.tsx`, `src/pages/FAQ.tsx`, `src/pages/ReportConcern.tsx`, `src/pages/HowItWorks.tsx` — delete inline `<DocId section="§N" />` calls; remove the now-unused `DocId` helper from each file.
- `src/pages/About.tsx` — full rewrite from custom 4/8 grid to `Section` + `SectionLabel`, copy preserved verbatim.

### What stays the same

All routes; every page's headline, body copy, lists, and tables; the `RecordHeader` metadata box (top-right Reference panel); the homepage hero; the footer; the `Button`/`StatusBadge`/`Card` primitives; every data file. No new components, no new fonts, no new dependencies.

