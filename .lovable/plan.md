

## About page → Advisory Board DNA rewrite

Strip `DocLayout` + sidebar. Rebuild `src/pages/About.tsx` as a stack of full-width `§N` sections in a 12-col split, mirroring `MedicalAdvisory.tsx` chrome exactly. Sticky horizontal jump-bar replaces the rail.

---

### Structure

1. **`RecordHeader`** — kept as-is. Reference box (DOC `SS-ORG-2026.01`, VERSION `2026.01`, STATUS `Active`, UPDATED `04 / 21 / 2026`) sits top-right as the first eye-stop.

2. **Sticky Contents bar** — directly under header:
   - `border-b border-border bg-background sticky top-0 z-30`
   - `container-wide flex gap-x-6 overflow-x-auto py-2.5`
   - Each link: `meta` mono, format `§1 · Why this exists` → `#why`
   - Active section tracked via inline `IntersectionObserver` (lifted from `DocLayout`).

3. **§1–§8 sections** — every section:
   - Full-width `<section>` with alternating `bg-background` / `bg-surface-muted` bands
   - `border-b border-border`, `py-12 md:py-16`
   - `container-wide grid md:grid-cols-12 gap-10`
   - Left rail (`md:col-span-4`): `meta mb-3` eyebrow `§N · CATEGORY` + `h-section` title + short rationale
   - Right rail (`md:col-span-8`): content
   - Body text locked to `text-[14.5px] text-muted-foreground leading-relaxed`; emphasis lines use `text-foreground font-medium`

### Per-section content (verbatim copy preserved)

| § | Title | Right rail format |
|---|---|---|
| §1 | Why this exists | Single paragraph |
| §2 | A public reference for vendor verification | Two paragraphs |
| §3 | Information gap | Two paragraphs, last line bold |
| §4 | Four beliefs | `<ol>` Board chrome: `border border-border bg-background divide-y`, rows `grid-cols-12 px-5 py-5`, `col-span-2 meta text-primary` index `§4.1`–`§4.4`, `col-span-10` body |
| §5 | Scope of the framework — verified vs. flagged | Two-column "What we verify / What we flag" table; MAB §4 chrome (`bg-surface-muted` header strip, `divide-y` rows, `meta` mono refs `§5.1.x` / `§5.2.x`). Tone reframed as legal definition of audit boundary, reinforcing Source Standard as census of verified vs. unverified |
| §6 | Operating principle | Bordered card `border border-border bg-surface-muted px-6 py-6`; mono eyebrow `OPERATING PRINCIPLE · §6`; principle as `text-[15px] font-medium`; hairline divider; secondary line muted. No red/notice tone — institutional |
| §7 | Who this serves | 2-cell `gap-px bg-border border` grid; each cell `bg-background p-6` with `§7.1 / §7.2` mono index, label, paragraph. No shadow, no rounded corners |
| §8 | Mission | Mission statement (17–18px bold), follow-up paragraph, governance link, then a Board-style "Read deeper" bar (`border border-border bg-surface-muted` with hairline-divided link cells: Governance / How verification works / Status definitions / Accountability) — replaces `RelatedDocs` |

4. **Cite footer** — MAB-style bottom band: `bg-surface-muted py-8`, mono `Cite as ·` label, then full citation string.

### Cleanup

- Remove imports: `DocLayout`, `DocSection`, `Callout`, `RelatedDocs`
- Remove `prose-filing` wrappers entirely — use raw grid spacing
- No new tokens, no CSS edits — every class already exists in `index.css` / Tailwind config

---

### Files touched

- `src/pages/About.tsx` — full rewrite of section stack; `RecordHeader` retained.

### Unchanged

All routes, all copy (verbatim, with §5 reframed only in the rail header to "verified vs. flagged"), `RecordHeader`, `DocLayout`/`DocSection` (still used by Privacy / Terms / Disclaimer / Governance), `Callout` and `RelatedDocs` (used elsewhere), every other page, tokens, dark-mode behavior.

