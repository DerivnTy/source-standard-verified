

## Remove Redundant Bottom-of-Page Citation Lines Sitewide

The "Cite as · Source Standard, …, Last updated …" line that sits above the footer on most pages duplicates the doc-ID and updated-date that already appear in each page's top metadata bar. Remove it sitewide with primitive-level edits (so we don't have to touch ~24 page files), plus a few targeted removals where pages render the cite line by hand.

---

### Strategy

Suppress at the source. Two shared primitives render the bulk of these lines:

1. **`ArticleFooter`** in `src/components/ArticleSection.tsx` (used by all `Library*` article pages)
2. **`BoardCiteFooter`** in `src/components/BoardSection.tsx` (used by Governance, Privacy, Terms, VerificationDisclaimer, StatusDefinitions, and the FAQ category pages)

By dropping the cite block from these two components, every consuming page is cleaned in one shot — no churn across page files, no risk of missing one.

Then handle the small set of pages that render their own bespoke cite line.

---

### Changes

**1 · `src/components/ArticleSection.tsx` — `ArticleFooter`**
- Remove the `{citation && (...)} ` block (the `<p className="mt-10 pt-6 border-t border-border …">…Cite as ·…</p>`).
- Keep the `citation` prop in the type signature (optional, ignored) so the dozens of call sites don't need edits and don't break TypeScript.
- Tighten footer top margin: `mt-16` → `mt-12`, and inner `py-10` → `py-8`, so the prev/next block doesn't leave a visual void where the cite used to be.

**2 · `src/components/BoardSection.tsx` — `BoardCiteFooter`**
- Replace the component body with `null` (return `null`). Keep the named export and `citation` prop so all consuming pages continue to compile unchanged.
- This removes the entire `bg-surface-muted py-8` band sitewide for Board-style pages, letting them transition directly into the global `SiteFooter` cleanly.

**3 · Bespoke cite lines on individual pages**
Remove the hand-rolled cite blocks (and any wrapper section that exists only to host them):

- `src/pages/MedicalAdvisory.tsx` — delete the trailing `{/* Cite */}` `<section>` (lines ~303–310).
- `src/pages/AdvisorProfile.tsx` — delete the cite paragraph in the trailing `<div className="container-wide py-8">` block (lines ~252–262 area); if the surrounding section exists only for this paragraph, remove the whole section.
- `src/pages/ForVendors.tsx` — delete the `<div className="border-t border-border bg-surface-muted px-5 py-6 max-w-4xl mt-8">` cite block (lines ~176–182).
- `src/pages/ReportConcern.tsx` — delete the `<p className="mt-8 meta-label">Cite as: …</p>` (lines ~126–128).
- `src/pages/FAQ.tsx` — delete the `<p className="mt-8 meta-label">Cite as: …</p>` (lines ~210–212).
- `src/pages/HowToReadTheDirectory.tsx` — delete the trailing `<Section density="tight">` containing the cite paragraph (lines ~290–295).

**4 · Shared placeholder primitive**
- `src/components/PlaceholderSection.tsx` — remove the `Cite as: …` paragraph (lines ~12–14). This component is used as scaffolding for stub pages; the cite line is the same redundant pattern.

---

### What stays untouched

- All page files that consume `ArticleFooter` / `BoardCiteFooter` — they keep passing `citation={…}`; the prop is silently ignored. Zero edits to ~22 page files.
- `SiteFooter`, `SiteHeader`, `RecordHeader`, the top metadata bars — the doc-ID + updated-date remain visible at the top of every page where they belong.
- Prev/next navigation in `ArticleFooter` and link grids elsewhere — preserved.

### Files touched

- **Modified:** `src/components/ArticleSection.tsx` — strip cite block from `ArticleFooter`, tighten spacing.
- **Modified:** `src/components/BoardSection.tsx` — `BoardCiteFooter` returns `null`.
- **Modified:** `src/components/PlaceholderSection.tsx` — remove cite paragraph.
- **Modified:** `src/pages/MedicalAdvisory.tsx` — remove trailing cite section.
- **Modified:** `src/pages/AdvisorProfile.tsx` — remove trailing cite block.
- **Modified:** `src/pages/ForVendors.tsx` — remove cite block.
- **Modified:** `src/pages/ReportConcern.tsx` — remove cite paragraph.
- **Modified:** `src/pages/FAQ.tsx` — remove cite paragraph.
- **Modified:** `src/pages/HowToReadTheDirectory.tsx` — remove trailing cite section.

### Outcome

Every page ends on its real closing content (prev/next nav, related links, or final body section) and flows directly into the global site footer. The doc-ID and "last updated" still live in the page's top metadata bar where they belong — no information loss, just a disciplined, less-cluttered lower page composition sitewide.

