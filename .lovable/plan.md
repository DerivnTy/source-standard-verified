

## Greenlist Profile — Upstream Reference Restructure

Rebuild `src/pages/GreenlistProfile.tsx` so each Greenlisted facility page reads as a clean upstream reference record — supporting infrastructure, not a vendor-style trust product. Tighten the hero, lift interpretation up, drop empty data scaffolding, and consistently surface what Greenlisted means and does not mean.

---

### Section sequence

**1 · Top intro block** (`bg-background`)
Keep `ProfileHeader` but tighten it.
- Eyebrow: `Greenlist source` (or `Unverified facility` when `regulatoryAlert` is present).
- Title: facility `name`.
- Identity row (compact, one line): `Recognized` (or alert label) · `entry.type` · `entry.location`.
- Lead: one-sentence plain description — prefer `firstSentence(p.background)`, fall back to `entry.focus`. Trim to a single sentence; never paste the full multi-sentence background here.
- Drop the `Visit website ↗` outline button under the title (the website lives in the glance panel — removes redundancy and the stretched empty hero feel).
- Reduce hero vertical padding so the at-a-glance panel sits closer to the title.

**2 · At-a-glance panel** (right slot of hero — keep, refine)
Compact summary, restrained. Order:
- `Source type` — `entry.type`
- `Location` — `entry.location`
- `Status` — `Recognized` or alert label
- `Website` — hostname link, or `Not listed` (muted)
- `Last reviewed` — `April 21, 2026` (single shared review date)
- Optional, only when present: `States served` (from `p.statesServed`) and `FDA registration` (from `p.fdaRegistration`)
Filter out empty rows. Keep the bordered-card treatment used today.

**3 · What Greenlisted means** (`bg-surface-muted`, new — lifted to top)
The most important interpretive section. Centered `SectionHeader` (eyebrow `Interpretation`, title `What Greenlisted means`). Below, in a `max-w-3xl` column, four short plain bullets with hairline dividers:
- This facility appears in the upstream reference set used by the Source Standard framework.
- Greenlisted status means the facility meets the recognition criteria for upstream reference.
- Greenlisted status does not mean Source Standard is certifying every downstream vendor that claims to use it.
- Vendor verification requires a separate review of the vendor's own records.
This block renders on every Greenlisted profile, identical wording, so the interpretive frame is consistent across the registry.

**4 · Regulatory alert** (conditional, `bg-background`)
Only renders when `entry.regulatoryAlert` exists. Keep the existing alert block (status pill, `as of` date, reason, proof links) but reposition it directly under "What Greenlisted means" so unverified context is read before any standards data. Keep the unverified color treatment.

**5 · Regulatory & standards anchors** (`bg-background`)
Centered `SectionHeader` (`Regulatory & standards`, lede `The recognition basis for this facility.`). Render as a plain stacked definition list with hairline dividers in a `max-w-3xl` column — drop the 180px label-grid look. Show only fields with values:
- `Designation` (skip when it duplicates `entry.type`)
- `FDA registration`
- `Standards` (e.g. `cGMP (503B)`)
- `Cleanroom class`
- `States served`
- `Last inspection`
- `Inspection history`
- `Environmental monitoring`
- `Testing`
If fewer than 2 fields populate, render a single muted line instead: `Recognition basis: {entry.type} · public regulatory record.` — prevents the section from rendering as one lonely row.

**6 · Facility characteristics** (`bg-surface-muted`)
Centered `SectionHeader` (`Facility characteristics`, lede `What this facility is known to do.`). Same plain stacked list pattern, only populated fields shown:
- `Dosage forms`
- `Specializations`
- `Clinical focus` — `entry.focus`
- `API sourcing`
- `Years in operation`
- `Facility scale`
- `QA staffing`
- `Background` — full paragraph (`text-[14px] leading-[1.7] max-w-[68ch]`)
Same fallback behavior: if only `Background` and `Clinical focus` populate, render them as two short labeled paragraphs without the list chrome. Drop `Review notes` from the public view (internal-feeling, often empty).

**7 · Relationship to the Source Standard framework** (`bg-background`, new explicit section)
Centered `SectionHeader` (eyebrow `Within the framework`, title `How this page fits the dual-layer model`). One short paragraph in `max-w-3xl`:
> This facility is part of the upstream reference layer. Vendor verification requires a separate review of invoices, sourcing records, and other documentation to confirm that a listed vendor is actively sourcing from a recognized facility.
Replaces the small left-bordered footnote currently buried at the bottom — same idea, properly elevated.

**8 · Continue reading — quiet bridge** (`bg-surface-muted`)
Small eyebrow `Continue reading`, then three quiet text links in a single row (single column on mobile), hairline dividers between:
- `Back to Upstream Greenlist →` `/greenlist`
- `View Verified Vendors →` `/verified-vendors`
- `How Verification Works →` `/how-it-works`

**9 · Footer**
Keep `ProfileFootnote` as-is: `Listing` · `Updated` · `Jurisdiction` plus the no-payment / public-record note. No changes.

---

### Visual rules

- One consistent profile structure across every Greenlisted facility page.
- Centered `SectionHeader` rhythm + `max-w-3xl` content columns — matches About / Education / How Verification Works / Apply.
- Surfaces alternate `bg-background` ↔ `bg-surface-muted` between sections 3–8.
- Hairline dividers via `border-border`. No card shadows. Keep the existing bordered glance panel and the bordered alert block (those are intentional micro-cards).
- Drop the dense 180px label / value grid for Regulatory and Capabilities — replace with plain stacked rows so missing fields collapse cleanly instead of leaving the 180px column empty.
- Drop `Review notes` from public render. Drop the redundant hero `Visit website ↗` button.
- Tighten hero vertical padding so the page leads with information, not whitespace.
- No vendor-style trust language anywhere; no promotional phrasing about the facility.

### Files touched

- `src/pages/GreenlistProfile.tsx` — full body rewrite. Tighten hero, drop redundant website CTA, expand glance panel with optional `Last reviewed` / `States served` / `FDA registration` rows, add the new "What Greenlisted means" interpretive block (lifted to top, identical wording across all profiles), reposition the regulatory-alert block under it, replace the two dense `<dl>` grids with plain stacked rows that auto-collapse empty fields and degrade to a single muted line when sparse, add an explicit "How this page fits the dual-layer model" section, replace the bottom footnote band with a quiet 3-link continue-reading row, keep `ProfileFootnote`.

### What stays the same

`ProfileHeader`, `ProfileFootnote`, `Section`, `PageMeta`, `Breadcrumb`, the `getGreenlistEntry` data lookup, the `GreenlistEntry` / `GreenlistProfile` types, the regulatory-alert color treatment, the route `/greenlist/:slug`, every other page on the site, and the registry data in `src/data/greenlist.ts` (no schema changes).

