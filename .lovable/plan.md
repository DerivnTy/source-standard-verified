

## Homepage restructure — Public Trust Front Door

Rebuild `src/pages/Index.tsx` from a 3-block administrative archive into an 8-section public-facing narrative. Hero stays navy and restrained; below-the-fold loses the heavy `§I / §II / §III` framework labeling and reads as a national trust standard, sequenced for consumers first, vendors second.

---

### Section sequence (replaces current Block I / II / III)

**1 · Hero** — `BriefingHero` (navy, untouched component)
- eyebrow: `United States Public Registry`
- title: `The public standard for documented peptide sourcing`
- statement: `Source Standard verifies whether clinics and vendors can substantiate their sourcing through licensed upstream pharmacies and documented records.`
- actions: `Access Vendor Registry` → `/directory` (primary) · `Begin Verification` → `/apply` (secondary)
- both actions remain ghost-buttons; primary gets a slightly stronger border weight to distinguish from the secondary (no color change)

**2 · Why this exists** — three short statements on a white surface
- Eyebrow: `Why this exists`
- 3-up grid, no cards, hairline dividers between columns:
  1. `Claims are easy to make.` — body: in this market, any clinic can describe its sourcing in marketing language.
  2. `Documentation is harder to verify.` — body: licensed pharmacy relationships, invoices, and accreditation records rarely reach the public.
  3. `Source Standard makes that difference visible.` — body: the registry publishes which vendors can substantiate their sourcing and which cannot.
- Tight, no `§` codes, no reference IDs.

**3 · How the framework works** — three numbered steps on a muted surface
- Eyebrow: `How it works`
- 3-up grid with quiet numerals (`01 / 02 / 03`):
  1. `Upstream sources are reviewed.` — FDA registration, state licensure, and accreditation records of 503A and 503B pharmacies.
  2. `Vendors are assessed against those sources.` — clinic relationships, invoices, and supply chain are reconciled against the upstream record.
  3. `Status is published in the public registry.` — verified, pending, suspended, or removed — with the date of the most recent review.
- No internal section codes. Plain typographic rhythm.

**4 · What the registry shows** — tangible field list on a white surface
- Eyebrow: `What you can verify`
- Left rail (4 cols): short paragraph framing the registry as a working utility.
- Right rail (8 cols): 6-item list (2 cols × 3 rows) of fields a public visitor sees on each listing:
  - Verification status · City and state · Clinical focus · Upstream source relationships · Last review date · Status changes
- Each item is a single line, label + one-sentence description. Single CTA below: `Open the registry →` to `/directory`.
- Replaces the current category-strip + greenlist preview density.

**5 · Why verification matters** — three audience framings on a muted surface
- Eyebrow: `Why verification matters`
- 3-up grid:
  - `For consumers` — a documented reference point beyond marketing claims.
  - `For responsible vendors` — a public trust signal tied to reviewed records.
  - `For the market` — a clearer line between documented and undocumented sourcing.
- Calm, factual, no sales verbs. No CTA in this section — the bridge is the closing split CTA in §8.

**6 · Governance & standards** — distilled, lower on the page
- Eyebrow: `Governance & standards`
- Two-column row (white surface):
  - Left (5 cols): single paragraph — the framework is reviewed under medical oversight and anchored to recognized regulatory and compendial records. Link: `Medical Advisory Board →` `/medical-advisory`.
  - Right (7 cols): a quiet inline row of four anchor labels — `FDA · USP · PCAB · NSF` — each with a single-line description. No bordered card grid, no `§II.A` codes. Link below: `Governance & oversight →` `/governance`.
- Significantly tighter than the current MAB record + anchors block.

**7 · Resource Library entry** — curated 4-up
- Eyebrow: `Start with the basics`
- 4 tiles, each linking to its existing page:
  - `What verification actually means` → `/library/what-source-standard-verification-actually-means` (or `/education` fallback)
  - `503A vs 503B` → `/library/what-is-compounding`
  - `How to read a CoA` → `/library/how-to-read-a-certificate-of-analysis`
  - `Questions to ask your clinic` → `/library/questions-to-ask-your-clinic`
- Tiles carry only title + one-line summary. No `REF-101`, no `§III.A.01`. Single closing link: `Resource Library →` `/education`.

**8 · Final split CTA** — full-width navy band, mirrors hero tone
- Two-column grid on `bg-[hsl(var(--navy-surface))]`, cream typography:
  - Left: `For consumers` · headline `Search the Registry` · single ghost button → `/directory`
  - Right: `For vendors` · headline `Apply for Verification` · supporting line `A public listing is a trust asset, not just a status marker.` · single ghost button → `/apply`
- One subtle vertical divider between columns. Full-bleed, generous vertical padding, no decorative overlays.

### Visual rules across the new sections

- Drop all `§I.A`, `§III.A.01`, `REF-XXX`, `Reference · SS-MAB-2026.01` notation from the homepage. Internal IDs stay on deeper pages.
- Section eyebrows use the existing `font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground` pattern but without `Block I / II / III` prefixes.
- Surfaces alternate `bg-background` ↔ `bg-surface-muted/30` for rhythm — no new tokens.
- All borders/dividers are existing `border-border` hairlines. No card shadows, no rounded corners introduced.
- Spacing uses existing `container-wide` and `py-16 md:py-20`.

### Files touched

- `src/pages/Index.tsx` — full rewrite of the body. Hero invocation updated (new title/statement/actions). Replace the three `<section>` blocks with the eight sections above. Drop `mabRows`, `anchors`, `eduPreview`, `procedural`, `registries`, and the greenlist category strip from this file (they are not deleted from `src/data/*` — other pages still consume them).
- No other files change. `BriefingHero`, `HeroPattern`, `index.css`, all data files, all routes, and every other page stay exactly as today.

### What stays the same

The navy hero treatment from the last pass, the global navy/cream accent system, the site header and footer, every route, every below-the-fold page, every data source, and every component API.

