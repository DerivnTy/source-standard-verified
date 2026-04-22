

## Verification Protocol — Public Standard Restructure

Rebuild `src/pages/HowItWorks.tsx` from a coded SOP into a clear public explanation of how Source Standard verification works. Strip the `§1–§9`, `STATUS · NN`, `DOMAIN · NN`, `ATTESTATION · NN`, `RATIONALE · NN`, `LIMIT · NN`, `EVENT · NN`, and `DISCLOSURE WINDOW · 72 HOURS · SS-PROTO-2026.01 · §6` chips, replace the 12-col left-rail layout with the same centered editorial rhythm now used on About / Education / Medical Advisory, and re-sequence so verification meaning lands before deep process detail.

---

### Section sequence

**1 · Hero** (replace `BriefingHero` invocation)
Match navy hero used sitewide.
- `tone`: `navy`
- `category`: `How Verification Works`
- `title`: `How Verification Works`
- `statement`: `The review standard, what the process examines, how status is assigned, and what a determination means.`
- Drop `docId`, `metadata`, `verifiedOn`. No actions.
- Remove `DocJumpBar` entirely (and the `jumpWaypoints` array).

**2 · What verification means** (`bg-background`)
Centered `SectionHeader` (eyebrow `What verification means`, title `Verified means records were reviewed and support the published scope at the time of review.`). Below, two stacked muted lines in a `max-w-3xl` column:
- `It is not a medical endorsement, and not a guarantee of safety, efficacy, or outcome.`
- `It reflects documented consistency within the reviewed scope — nothing more, nothing less.`
Lifted to the top so it lands before any process detail. No bordered card, no `§` label.

**3 · Core principles** (`bg-surface-muted`)
Centered `SectionHeader` (`Core principles`, lede `Three ideas the framework operates from.`). Render `whyItMatters` (3 items) as a clean numbered list (`01–03`) with hairline dividers, plain phrasing (use the simpler `t` field, not the `PRINCIPLE_TITLES` overrides). Each row: number eyebrow + bold lead + one-line muted explanation. No bordered card.

**4 · What falls inside and outside the review** (`bg-background`)
Centered `SectionHeader` (`Scope of the review`, lede `What falls within the review, and what falls outside it.`). Below, two side-by-side columns (single column on mobile) divided by a hairline:
- Left: `Within scope` — five plain bullets (business identity; applicable licenses and registrations; pharmacy and supplier records; certificates and lot records within the reviewed category; consistency of public-facing claims).
- Right: `Outside scope` — five plain bullets (clinical outcomes; patient experiences; pricing; marketing channels; anything outside the documented verified category).
No `ATTESTATION · NN` chips, no `gap-px bg-border` cell shell, no bordered table.

**5 · Status definitions** (`bg-surface-muted`)
Centered `SectionHeader` (`Status definitions`, lede `Each registry entry carries one of these standings.`). Replace the 12-col coded table with a clean stacked list of 5 status blocks separated by hairline dividers. Each block:
- `StatusBadge` + status name as the dominant anchor.
- One-line `meaning` paragraph (`text-[15px] text-foreground`).
- Two micro-rows: `Tells — …` and `Does not imply — …` (`text-[13.5px] text-muted-foreground`, plain inline labels, no mono uppercase).
No `STATUS · NN` chips, no `Code / Status / Public-record meaning` header strip. Quiet `Full status definitions →` link to `/status-definitions` below the list.

**6 · What the review looks at** (`bg-background`)
Centered `SectionHeader` (`What the review looks at`, lede `Seven areas examined against the standard for the requested category.`). Render `reviewGroups` (7 items) as a clean numbered list (`01–07`) with hairline dividers — number eyebrow + plain `t` (not `SCOPE_TITLES` overrides) as bold lead + one-line muted `d`. No `DOMAIN · NN` chips, no bordered card.

**7 · Review lifecycle** (`bg-surface-muted`)
Centered `SectionHeader` (`Review lifecycle`, lede `Six stages from application to publication.`). Render `steps` (6 items) as a clean numbered timeline. Each step:
- Large `01–06` numeral on the left.
- Plain `t` (not `STEP_TITLES` overrides) as bold title.
- `summary` as one paragraph beneath.
- Flatten the `Examined / Disposition` micro-labels into a single muted line: `Examined: … · Result: …` rendered in `text-[12.5px] text-muted-foreground`, no mono uppercase chips.
Hairline dividers between steps. No bordered card.

**8 · Ongoing surveillance and change disclosure** (`bg-background`)
Centered `SectionHeader` (`Ongoing surveillance`, lede `Verification is a snapshot in time. Files are monitored, renewed, and re-reviewed when material changes occur.`). Below, a single calm sentence: `Material changes must be disclosed within 72 hours and may trigger re-review or a Suspended status.` Then `changes` (6 items) rendered as a plain two-column bullet list (single column on mobile) with hairline dividers — no `EVENT · NN` chips, no `DISCLOSURE WINDOW · 72 HOURS · SS-PROTO-2026.01 · §6` mono band.

**9 · After a determination** (`bg-surface-muted`)
Centered `SectionHeader` (`After a determination`). Render `afterReview` (5 items) as a plain numbered list (`01–05`) with hairline dividers — single line per item, no bordered card.

**10 · Why entities apply** (`bg-background`)
Centered `SectionHeader` (`Why entities apply`). Render `vendorReasons` (4 items) as a clean 2×2 grid (single column on mobile) with hairline dividers — bold title + one-line muted description, no `RATIONALE · NN` chips. Single quiet `Begin a verification application →` link to `/apply` below, right-aligned.

**11 · Jurisdictional limitations** (`bg-surface-muted`)
Centered `SectionHeader` (`Jurisdictional limitations`, lede `Boundaries of the verification framework.`). Render `notProcess` (4 items) as plain bulleted list with hairline dividers — no `LIMIT · NN` chips, no bordered table shell.

**12 · Footer**
Keep `DocSignature`. Remove `BoardCiteFooter` band; if a citation is needed, render a single muted inline line beneath in plain prose.

---

### Visual rules across the page

- No visible `§1 / §2 / §3 / §4 / §5 / §6 / §7 / §8 / §9` codes anywhere.
- No visible `STATUS · NN`, `DOMAIN · NN`, `ATTESTATION · NN`, `RATIONALE · NN`, `LIMIT · NN`, `EVENT · NN`, `DISCLOSURE WINDOW`, `PROTOCOL · SS-PROT` chips.
- No `DocJumpBar`, no `Rail` 12-col layout, no `MEANING_TITLES / SCOPE_TITLES / STEP_TITLES / PRINCIPLE_TITLES` override maps (use the simpler plain `t` fields directly).
- Section eyebrows are plain phrases.
- Centered `SectionHeader` (eyebrow + title + lede) + `max-w-3xl` content columns or two-column splits — matches About/Education rhythm.
- Surfaces alternate `bg-background` ↔ `bg-surface-muted`. Hairline dividers via `border-border`. No card shadows, no rounded corners, no `gap-px bg-border` table shells.
- Spacing uses existing `container-wide` + `py-12 md:py-16`.
- Strict typography hierarchy: section heading > entry title > body > muted detail.
- Reuse existing `StatusBadge` for status section so the visual language matches the directory.

### Files touched

- `src/pages/HowItWorks.tsx` — full body rewrite. Replace navy hero, remove `DocJumpBar` + `jumpWaypoints` + `Rail` helper + 4 override-title maps, restructure into the 12 sections above, lift "What verification means" to position 2, flatten domains/lifecycle/surveillance/limits into clean lists, swap status table for `StatusBadge` blocks, drop `BoardCiteFooter`.

### What stays the same

`BriefingHero`, `Breadcrumb`, `PageMeta`, `DocSignature`, `StatusBadge`, every data array (`whyItMatters`, `meaningBlocks`, `statuses`, `reviewGroups`, `steps`, `changes`, `afterReview`, `vendorReasons`, `notProcess`) — substance preserved, presentation rebuilt, all routes (`/status-definitions`, `/apply`), the navy/cream global accent system, and every other page on the site.

