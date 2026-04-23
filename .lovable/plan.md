

## Global Change 04 — Remove All Section-Headline Eyebrows Sitewide

Eyebrow text (small uppercase label sitting above an H2) is removed across the site. The only element permitted above a section headline is the Geist Mono index number (e.g. `01`, `02`, `§3`). H1 page-title eyebrows are ALSO removed — the page title stands on its own.

### Rule (locked)

- Above any section headline (`<h2>`): **nothing** except an optional `01` / `§N` Geist Mono index number.
- Above any page title (`<h1>`): **nothing**. The H1 stands alone.
- Inline uppercase chips (status badges, table column headers, registry meta strips, breadcrumbs, "Read →" link affordances) are NOT eyebrows — they stay.
- Hero "category" line on `BriefingHero` (the small label above the homepage / chapter H1) is removed in this pass — it functions as an eyebrow above the H1.

### Component layer (single-point fixes)

These are shared primitives. Editing them removes eyebrows from every page that uses them in one move.

1. **`src/components/ArticleHeader.tsx`** — drop the `{eyebrow && <p class="t-eyebrow-sm">…</p>}` block (lines 41–45). Keep `eyebrow` in the prop signature so existing call sites don't break; just stop rendering it.
2. **`src/components/RecordHeader.tsx`** — remove the eyebrow render on line 77. Same prop-preserved approach.
3. **`src/components/AnchorHeader.tsx`** — remove the eyebrow render in both the split (`aside`) branch and the centered branch.
4. **`src/components/ProfileHeader.tsx`** — remove the eyebrow render block.
5. **`src/components/UtilityHeader.tsx`** — remove the eyebrow render block.
6. **`src/components/PageHeader.tsx`** — remove the eyebrow render block.
7. **`src/components/registry/RegistryHeader.tsx`** — remove the eyebrow render block.
8. **`src/components/BriefingHero.tsx`** — remove the `category` render in all three branches (cover hero ~lines 159–164, chapter ~lines 197–202, default ~lines 226–231). `category` stays in the prop signature; it just no longer renders above the H1.
9. **`src/components/Section.tsx` → `SectionLabel`** — already ignores its `eyebrow` prop. No change needed.
10. **`src/components/Callout.tsx`** — eyebrow here labels a callout block, NOT a section headline. **Keep**.
11. **`src/components/EmptyState.tsx`** — eyebrow is the empty-state message itself, not a section eyebrow. **Keep**.
12. **`src/components/BoardSection.tsx`** (`hideEyebrow` flag) — already opt-outable; no change needed beyond verifying it's not stamping eyebrows above board H2s. (It isn't.)

### Page-level cleanup (inline `<p class="t-eyebrow-sm">…</p>` above H2s)

These are pages that hand-roll the eyebrow inline rather than going through a header primitive. Remove the eyebrow `<p>` and its surrounding `mt-4` rhythm-correction on the H2 (drop `mt-4` so the H2 becomes the top of the block).

- `src/pages/Index.tsx` — remove the `Eyebrow` atom (line 108–110) and every `<Eyebrow>…</Eyebrow>` instance above an H2 (§2 trust problem, §3 how it works, §4 live registry, §5 registry fields, §6 function, §7 foundational reference, §8 governance). Drop the `mt-4` on each H2 that follows.
- `src/pages/About.tsx` — remove "Purpose" and "Conclusion" eyebrows above their H2s.
- `src/pages/Accountability.tsx` — same (Purpose).
- `src/pages/HowItWorks.tsx` — same (Purpose, Conclusion).
- `src/pages/MedicalAdvisory.tsx` — same (Purpose, Conclusion).
- `src/pages/Privacy.tsx` — same (Purpose, Conclusion).
- `src/pages/StatusDefinitions.tsx` — same (Purpose, Conclusion).
- `src/pages/Terms.tsx` — same (Purpose, Conclusion).
- `src/pages/VerificationDisclaimer.tsx` — same (Purpose, Conclusion).
- `src/pages/Education.tsx` — remove the `EYEBROW_BY_CATEGORY` mono label rendered above each category H2 (lines 78–81 + the const map at 56).
- `src/pages/GreenlistProfile.tsx` — in the local `SectionHeading` helper, drop the eyebrow render (lines 184–186). Keep the `eyebrow` prop accepted but unused so call sites continue to work. Inline registry-meta `t-eyebrow-sm` chips on lines 333–339 are inline meta strips, NOT section eyebrows — **keep**.
- `src/pages/NotFound.tsx` — remove the `<p class="eyebrow">Error 404</p>` line above the H1.

### Out of scope (intentional keeps)

- `Callout` eyebrows (rationale labels inside framed call-out blocks).
- `EmptyState` eyebrow (it's the empty-state message itself).
- `MetadataBar`, `RegistryHorizon`, table column headers, breadcrumbs, status badges, "Read →" link affordances, footnote refs — inline uppercase utility text, not section eyebrows.
- Library article `<ArticleSection n={N} title="…">` already renders the §N Geist Mono index inline-left of the H2 with no eyebrow. **No change.**
- `t-eyebrow-sm` token itself remains in `index.css` for the legitimate utility cases above. We are removing usages above headlines, not deleting the token.

### Files touched

Components (8): `ArticleHeader.tsx`, `RecordHeader.tsx`, `AnchorHeader.tsx`, `ProfileHeader.tsx`, `UtilityHeader.tsx`, `PageHeader.tsx`, `registry/RegistryHeader.tsx`, `BriefingHero.tsx`.

Pages (12): `Index.tsx`, `About.tsx`, `Accountability.tsx`, `HowItWorks.tsx`, `MedicalAdvisory.tsx`, `Privacy.tsx`, `StatusDefinitions.tsx`, `Terms.tsx`, `VerificationDisclaimer.tsx`, `Education.tsx`, `GreenlistProfile.tsx`, `NotFound.tsx`.

### Result

Every page across the site renders headlines with nothing above them except, where present, a Geist Mono index number. Hero H1s, section H2s, and policy-page split-section H2s all settle into a single, document-grade hierarchy with no competing labels. No copy rewrites, no structural changes, no token deletions.

