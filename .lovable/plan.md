

## Page Headers — Differentiate by Page Type

Right now nearly every page opens the same way: a `MetadataBar` (Doc / Status / Version / Updated) followed by an oversized bold semibold headline, an eyebrow, a paragraph of body text, and (sometimes) a four-line "Summary" rail on the right. This is `RecordHeader` and `PageHeader` applied to everything — homepage, governance docs, advisor profiles, the directory, the Education library, contact forms. The result reads as a template, not a designed site.

The fix is not "make the headline smaller." The fix is **to stop using one header pattern for fundamentally different kinds of pages**, and to give each page-type a header treatment that matches its weight and purpose.

### The four page types on this site

1. **Anchor pages** — Home, Verified Vendors, Greenlist, Education
   These are the front doors. They should feel composed and confident, not like a document.
2. **Regulatory / policy documents** — Governance, Accountability, Terms, Privacy, Verification Disclaimer, Status Definitions, How It Works, How to Read the Directory, For Vendors, Medical Advisory, Report a Concern
   These are the pages where the "document with metadata bar + summary rail" pattern actually belongs. It earns its weight here. But it's currently *over-applied* even within this group.
3. **Profile / record pages** — Vendor Profile, Greenlist Profile, Advisor Profile, Library Entry
   These are records about a single entity. The header should lead with **who/what this is**, not with a doc ID.
4. **Utility pages** — Apply, Contact, Report a Concern (form portion), 404
   Forms and short utility pages don't need a heavyweight header at all.

### What each tier becomes

**Tier 1 — Anchor pages**
A new `AnchorHeader` component. No `MetadataBar` above it. The headline is set in a tighter, more editorial weight (medium, not semibold) at the existing size, with a single short eyebrow line and a lead paragraph that sits in a deliberately narrow column (≈58ch). Optional right-side element is a single contextual stat or call to action, not a four-row summary rail. The visual structure is asymmetric and quiet — it should feel like the front of a section, not a page of a manual.

- **Home**: keep the current two-CTA row but lose the metadata bar at the very top of the page; move the framework metadata into a quiet inline strip at the *bottom* of the hero or into the existing footer credibility line.
- **Verified Vendors / Greenlist / Education**: same `AnchorHeader`, no metadata bar, the existing filter/anchor row sits directly below.

**Tier 2 — Regulatory / policy documents**
Keep `RecordHeader` *only here* — this is what it was actually designed for. Refinements:
- Drop the headline weight from `font-semibold` to `font-medium`, and reduce size one notch (`1.5rem → 1.875rem` desktop). Combined with the existing tracking, this reads as a serious document title rather than a marketing H1.
- The "Summary" rail on the right becomes optional and is reserved for documents where those facts genuinely add information (Governance, Accountability, Verification Disclaimer). On documents where the summary just restates the metadata bar (Terms, Privacy, How It Works), drop the rail and let the lead paragraph breathe across more of the column.
- The metadata bar stays — it belongs on policy docs.

**Tier 3 — Profile / record pages**
A new `ProfileHeader` component. Structure leads with the entity, not a doc ID:
- Small eyebrow ("Verified Vendor" / "Greenlist Source" / "Medical Advisor" / "Library Entry").
- Entity name as the headline, in `font-medium`, slightly smaller than anchor pages.
- A compact identity row directly underneath (status badge, location, credential, or category) — not a metadata bar.
- The doc ID / version / updated date moves to a small *footer* strip on the record, where citations belong, not the top.
- Advisor profiles get their photo aligned beside the name in the header instead of below in the body.

**Tier 4 — Utility pages**
A new lightweight `UtilityHeader` — just a small eyebrow, a one-line title at body-large size (no oversized H1), and a single sentence of supporting copy. No metadata bar, no summary rail. Apply, Contact, and the form portion of Report a Concern use this. The page gets to the form fast, which is the point.

### Type system changes (the root cause of the "bold lettering everywhere")

In `src/index.css`:
- Headings drop from `font-weight: 600` (semibold) to `font-weight: 500` (medium) at the H1/H2 level. Semibold is reserved for short labels, not long titles. This single change is what removes the "DIY website" feel more than any structural fix.
- Tighten H1 letter-spacing slightly (`-0.018em`) and add a defined display-size variant (`.display-1`, `.display-2`) so anchor pages and document pages can use *different* type scales rather than all converging on the same H1 size.
- Add a `.title-record` utility (medium weight, sentence case, slightly smaller) used only by `ProfileHeader` so record pages visually read as records, not as marketing pages.

### Files touched
- `src/index.css` — heading weight, new display + title utilities.
- `src/components/RecordHeader.tsx` — lighter weight, optional summary rail, refined spacing.
- `src/components/PageHeader.tsx` — repurposed/replaced; most existing callers move to `AnchorHeader` or `UtilityHeader`.
- `src/components/AnchorHeader.tsx` *(new)* — Tier 1.
- `src/components/ProfileHeader.tsx` *(new)* — Tier 3.
- `src/components/UtilityHeader.tsx` *(new)* — Tier 4.
- Page wiring (swap header component, no other changes):
  - Tier 1: `src/pages/Index.tsx`, `VerifiedVendors.tsx`, `Greenlist.tsx`, `Education.tsx`
  - Tier 2 (keep `RecordHeader`, drop optional summary on the lighter-weight ones): `Governance.tsx`, `Accountability.tsx`, `Terms.tsx`, `Privacy.tsx`, `VerificationDisclaimer.tsx`, `StatusDefinitions.tsx`, `HowItWorks.tsx`, `HowToReadTheDirectory.tsx`, `ForVendors.tsx`, `MedicalAdvisory.tsx`, `About.tsx`, `FAQ.tsx`, `ReportConcern.tsx` (doc portion)
  - Tier 3: `VendorProfile.tsx`, `GreenlistProfile.tsx`, `AdvisorProfile.tsx`, `LibraryEntry.tsx`, the `*Template.tsx` stubs
  - Tier 4: `Apply.tsx`, `Contact.tsx`, `NotFound.tsx`, and the form portion of `ReportConcern.tsx`
- The Education sub-index pages (`EducationBasics`, `EducationGuides`, `EducationQuestions`) move from `PageHeader` → `UtilityHeader` so they read as sub-pages, not new sections.

### What stays the same
- All routes, data, copy on each page, and the existing `MetadataBar` component (it just appears on fewer pages).
- Color tokens, container widths, and section spacing.
- Footer and `SiteHeader`.

### Result
Anchor pages feel like front doors. Regulatory documents read as documents (and there are now visibly *fewer* of them dressed up as documents). Profiles lead with the entity, not the citation. Forms get out of the way. The page-to-page rhythm of the site stops looking like one template repeated 25 times — which is the actual problem.

