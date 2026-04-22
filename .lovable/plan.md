

## Wide-Horizon container expansion

Two scoped changes: widen the site-wide anchor/registry container, and stretch the Education page rows to use that full width. The 900px filing column on legal/policy pages (Terms, Privacy, etc.) stays — that's a deliberate readability choice for prose, not a defect.

### 1 · `container-wide` → 1280px with breathing padding

`src/index.css` — single token, propagates to every page that uses `container-wide` (Education, Greenlist, VerifiedVendors, MAB, Index control strip, RecordHeader, AnchorHeader, footer, header):

```css
.container-wide {
  @apply mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14;
}
```

- `max-w-7xl` (1280px) is kept as the ceiling — sits in the requested 1200–1300px band.
- Padding ladder: 24 / 40 / 56px so content never kisses the viewport edge but still fills a 1440px screen.

Result everywhere automatically:
- **Hero (`AnchorHeader` / `RecordHeader`)** — headline (left, `md:col-span-8`) and Reference metadata box (right, `md:col-span-4`) anchor to the far edges of the new 1280px track.
- **Site header, footer, control strip, jump-to nav, archive index strip** — already wrapped in `container-wide`, all re-align to the same grid.

### 2 · Education page — fill the wider track + balanced row ends

`src/pages/Education.tsx`:

- Wrap the three section bodies (`#basics`, `#guides`, `#questions`) and the footer grid (`#archive`) in `container-wide` instead of the centered 900px `Section`. The `Section` primitive stays untouched (still serves the legal filings).
- Replace `<Section>…</Section>` calls in Education with a thin local wrapper: a top hairline (`border-t border-[#E5E7EB]`) + `container-wide` + `py-16 md:py-20`.
- `SimpleRow` already uses `flex items-start gap-5` with `id` mono-pill on the left and `SoftStatus` on the right via `justify-between` — at 1280px this naturally pushes the **Doc ID hard left** and **OUTLINED badge hard right**, matching the spec. No structural change to the row itself; it just stretches.
- Section description paragraphs: drop the `max-w-xl` cap (currently pinches lines) → `max-w-[78ch]` so prose breathes without becoming uncomfortably long.
- `#archive` footer grid: `md:grid-cols-2` columns redistribute evenly across the 1280px container — no change needed beyond the wider parent.

### 3 · Confirm the small ones

- **4px black buttons** — `src/components/ui/button.tsx` already renders `rounded-[4px] bg-foreground text-background`. No change.
- **"Tampa, FL" sweep** — already migrated in prior pass; data files (real vendor addresses) intentionally untouched. No change.
- **Filing pages stay at 900px** — `Section` primitive (Terms, Privacy, Disclaimer, About, etc.) keeps its centered serif column. Stretching legal prose to 1280px would *reduce* readability; this plan deliberately scopes the widen to anchor/registry/index pages where the user pointed (Education).

### Files touched

- `src/index.css` — `container-wide` width + padding tokens.
- `src/pages/Education.tsx` — swap `Section` wrappers for `container-wide` blocks; drop `max-w-xl` on section descriptions.

### What stays the same

`Section` / `SectionLabel` / `RecordHeader` / `AnchorHeader` components; the 900px filing column on Terms/Privacy/Disclaimer/About/Accountability/StatusDefinitions/FAQ/ReportConcern/HowItWorks; every route, every piece of copy, every data file, the footer link set, the homepage hero, and all other pages that already use `container-wide` (which now simply breathe wider).

