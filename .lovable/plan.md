

## About — Public Definition Restructure

Rebuild `src/pages/About.tsx` as the clearest public explanation of Source Standard. Strip the charter-style scaffolding (`§1–§8`, sticky contents nav, `Doc / Status / Jurisdiction` metadata strip, `Cite as` chip) and resequence the page so a first-time visitor understands what Source Standard is, why it exists, what it does not do, who it serves, and how it operates — in plain language, in that order.

---

### Section sequence

**1 · Hero (replace `BriefingHero` invocation)**
Match the navy hero used on Home / Greenlist / Verified Vendors / Medical Advisory / Education.
- `tone`: `navy`
- `category`: `About Source Standard`
- `title`: `About Source Standard`
- `statement`: `An independent verification and public-reference framework for vendor sourcing transparency in peptide, TRT, and hormone optimization markets.`
- Drop `docId`, `metadata`, `verifiedOn`. No actions.
- Remove the sticky `§1–§8` contents nav entirely (and the IntersectionObserver / `activeId` state).

**2 · Why this exists** (`bg-background`)
Centered `SectionHeader` (eyebrow `Why this exists`, title `Consumers shouldn't have to decode marketing claims.`, no `§1` chip), followed by two short plain paragraphs in a `max-w-3xl` column. Combines the current §1 + §3 substance into one cleaner statement: consumers are asked to rely on branding they can't verify; responsible operators are hard to distinguish from less transparent ones; Source Standard exists to make the landscape easier to interpret.

**3 · What Source Standard is** (`bg-surface-muted`)
Centered `SectionHeader` + a single editorial paragraph. Plain definition: a public reference and verification framework that publishes vendor verification status and recognized upstream sources, organized so the public can interpret sourcing and documentation more clearly. No bordered card.

**4 · What Source Standard is not** (`bg-background`)
Centered `SectionHeader` (`What Source Standard is not`). Below, a clean two-column list (single column on mobile) of six plain statements with hairline dividers — no numbered chips, no `§` codes, no surface tint:
- Does not prescribe treatment
- Does not provide medical advice
- Does not replace physician judgment
- Does not function as a regulator
- Does not market clinics or act as a promotional partner
- Does not guarantee medical outcomes, product safety, or treatment efficacy
Each item: bold lead phrase, no description needed. This is one of the most prominent sections on the page by virtue of its calm clarity, not by visual weight.

**5 · Operating principle** (`bg-surface-muted`)
Centered, intentionally spare. Single eyebrow (`Operating principle`), then the doctrine line rendered as a large pull-quote (`text-[20-22px]` serif or semibold sans, max-w-2xl, centered):
> If documentation is present and supports the published status, that status can be shown publicly. If it is not, it cannot.
Below, one muted line: `The role here is not to persuade. The role is to provide a clearer public reference.` No bordered card, no `§6` chip, no mono `Operating principle · §6` header.

**6 · Who this serves** (`bg-background`)
Centered `SectionHeader` (`Who this serves`). Below, a two-column row (single column on mobile) divided by a hairline. Each column has a small label (`For consumers` / `For responsible vendors`) and one short paragraph. No `§7.1 / §7.2` mono prefixes, no bordered card grid, no `gap-px bg-border` cell shell — just two clean columns.

**7 · Principles** (`bg-surface-muted`)
Centered `SectionHeader` (`Principles`, lede `Four ideas that shape the framework.`). Render the four `beliefs` as a clean numbered list (`01–04`) with hairline dividers, no `§4.N` mono codes, no bordered card. Each row: number eyebrow + statement on one line at `text-[15px]`.

**8 · Scope & boundaries** (`bg-background`)
Centered `SectionHeader` (`Scope & boundaries`, lede `What falls within the framework, and what falls outside it.`). Below, two side-by-side columns (single column on mobile) — left column heading `Within the framework` lists the four `weVerify` items as plain bullets; right column heading `Outside the framework` lists the four `weFlag` items as plain bullets. Hairline divider between the two columns. No `Ref / What we verify / What we flag` table header strip, no `§5.N` codes, no bordered table shell.

**9 · Mission** (`bg-surface-muted`)
Centered, spare. Eyebrow `Mission`. Below, the mission statement rendered as the closing thesis at `text-[20px] font-semibold`, max-w-2xl, centered:
> To bring greater clarity, consistency, and transparency to vendor sourcing and verification in peptide, TRT, and hormone optimization markets.
Single muted line beneath: `Source Standard exists to make the market easier to understand for the people moving through it.`

**10 · Continue reading — quiet bridge** (`bg-background`)
Replace the bordered "Read deeper" band. Small eyebrow `Continue reading`, then four quiet text links in a single row (or 2×2 on mobile), each a label + one-line description, hairline dividers between:
- `Governance & Oversight →` `/governance` — Clinical advisory and statutory anchors.
- `How verification works →` `/how-it-works` — Process, review, and renewal.
- `Status definitions →` `/status-definitions` — Glossary of regulatory standings.
- `Accountability & enforcement →` `/accountability` — Compliance protocol.

**11 · Footer**
Keep `DocSignature`. Remove the `Cite as · Source Standard, Organization Reference, SS-ORG-2026.01…` band entirely (the doc ID lives inside `DocSignature` already).

---

### Visual rules across the page

- No visible `§1 / §2 / §3 / §4 / §5 / §6 / §7 / §8` or `§N.M` codes anywhere.
- No sticky contents nav, no `IntersectionObserver`, no `activeId` state.
- No `CHARTER · SS-ORG` / `Doc / Status / Jurisdiction / Updated` metadata strip in the hero.
- Section eyebrows are plain phrases (`Why this exists`, `What Source Standard is`, `What Source Standard is not`, `Operating principle`, `Who this serves`, `Principles`, `Scope & boundaries`, `Mission`, `Continue reading`).
- Layout switches from the current 4/8 left-rail grid to centered `SectionHeader` + `max-w-3xl` content columns — matches `Education.tsx` rhythm.
- Surfaces alternate `bg-background` ↔ `bg-surface-muted` for rhythm only, no new tokens.
- Hairline dividers via existing `border-border`. No card shadows, no rounded corners introduced.
- Spacing uses existing `container-wide` + `py-12 md:py-16`.
- Typography hierarchy: section heading > body text > muted detail. Operating principle and Mission rendered as elevated pull-quotes for emphasis.

### Files touched

- `src/pages/About.tsx` — full body rewrite. Replace navy hero, remove sticky contents nav and IntersectionObserver, restructure into the 10 sections above, add new `What Source Standard is not` section, flatten Scope into a clean two-column list, elevate Operating principle + Mission as centered pull-quotes, replace Read deeper band with quiet bridge row, drop the Cite footer band.

### What stays the same

`BriefingHero`, `PageMeta`, `DocSignature`, the `beliefs` / `weVerify` / `weFlag` / `readDeeper` data arrays (substance preserved, presentation rebuilt), all routes, the navy/cream global accent system, and every other page on the site.

