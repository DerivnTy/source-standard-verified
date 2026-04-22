

## Clinical Fact Realignment — BriefingHero with Audit-Report Language

Same `BriefingHero` primitive as previously approved, with mission strings rewritten to functional/regulatory language. No marketing tone, no metaphors, no PDF button, no summary.

---

### 1 · `BriefingHero` primitive (unchanged structure)

`src/components/BriefingHero.tsx` — single 100vh institutional plaque.

- `<section min-h-[100svh] border-b border-border bg-background relative>` with low-opacity `HeroPattern`.
- Inner `container-wide`, flex column `justify-center`.
- 12-col grid, `items-end` so H1 baseline and Reference Box top align on a shared horizon line:
  - **Left (md:col-span-7):** mono eyebrow `CATEGORY · SS-XX` (10.5px tracking-[0.14em]); H1 `title-page`; one-line statement `text-[14.5px] text-muted-foreground max-w-[60ch]`.
  - **Right (md:col-span-4 md:col-start-9):** Reference Box — `border border-border bg-background p-4`, mono header `REFERENCE · {DOC_ID}`, flat `<dl>` of metadata rows in mono tabular-nums. **No PDF link. No Summary box. No `children`.**
- Absolute `bottom-8` centered scroll cue: `▼  CONTINUE` in `text-[10.5px]` muted, fades after 80px scroll.

**Props**
```ts
{ category: string; docId: string; title: string;
  statement: string; metadata: MetadataItem[]; verifiedOn?: string }
```

API enforces minimalism — no lead, no children, no PDF, no summary.

### 2 · Cut-and-dry hero copy (locked)

| Page | category | docId | H1 | statement |
|---|---|---|---|---|
| `VerifiedVendors.tsx` | `REGISTRY` | `SS-01` | `REGISTRY` | "The current record of facilities and vendors meeting the Source Standard verification criteria." |
| `Greenlist.tsx` | `REGISTRY · UPSTREAM` | `SS-02` | `UPSTREAM REGISTRY` | "Technical data and registration status for pharmaceutical compounding and manufacturing facilities." |
| `MedicalAdvisory.tsx` | `GOVERNANCE` | `SS-GOV` | `GOVERNANCE` | "Independent medical and legal oversight responsible for framework maintenance and facility ratification." |
| `Education.tsx` | `RESOURCE LIBRARY` | `SS-EDU` | `RESOURCE LIBRARY` | "Technical documentation, regulatory references, and foundational analysis regarding the industry." |
| `HowItWorks.tsx` | `PROTOCOL` | `SS-PROT` | `VERIFICATION PROTOCOL` | "The active auditing requirements and clinical criteria utilized for third-party validation." |
| `About.tsx` | `CHARTER` | `SS-ORG` | `ABOUT` | "The organizational structure and operational intent of the Source Standard framework." |

H1 rendered uppercase via `title-page` class (kept lowercase in source for accessibility — `text-transform: uppercase` in CSS).

### 3 · Page wiring

Each page swaps its current hero `<section>` (and any right-rail Stats/Summary card living inside the hero) for one `<BriefingHero>`. Below-the-fold content (filter bar, registry table, board roster, jump bar, §-sections) is untouched and begins immediately after the 100vh band.

Status-counts dashboards on `VerifiedVendors` / `Greenlist` (currently in the hero right rail) relocate to a flat `bg-border gap-px` 6-up strip directly below the 100vh band — preserves the data, off the briefing surface.

### 4 · Nomenclature: Education → Resource Library (label only)

Routes/slugs unchanged. Pure string swap:
- `SiteHeader.tsx` + `SiteFooter.tsx` nav
- `Breadcrumb` strings on `Education*`, `Library*`, `Faq*` pages
- `PageMeta` titles
- `Index.tsx` references to "Education Hub"

### 5 · Already in place — no changes

14.5px body lock, smart hide-on-scroll header, hairline borders, `ScrollToTop` + `useHashScroll` + `scroll-padding-top: 144px`. `RecordHeader` keeps its PDF affordance for Library / Legal / Foundational document pages — only `BriefingHero` omits it.

---

### Files touched

**New**
- `src/components/BriefingHero.tsx`

**Hero swap**
- `src/pages/VerifiedVendors.tsx`
- `src/pages/Greenlist.tsx`
- `src/pages/MedicalAdvisory.tsx`
- `src/pages/Education.tsx`
- `src/pages/HowItWorks.tsx`
- `src/pages/About.tsx`

**Nomenclature rename (label only)**
- `src/components/SiteHeader.tsx`, `SiteFooter.tsx`
- `src/pages/Index.tsx`
- `Education.tsx`, `EducationBasics.tsx`, `EducationGuides.tsx`, `EducationQuestions.tsx`
- `FAQ.tsx`, `FaqClinicalSafety.tsx`, `FaqLegalRegulatory.tsx`, `FaqVerificationProcess.tsx`
- `Library*.tsx` (12 files — `Breadcrumb` + `PageMeta` strings only)

### What stays the same

All routes, all slugs, all data, all body copy below the hero, every MAB DNA section, registry filtering / sorting / pagination, `RecordHeader` (kept on document pages), `DocJumpBar`, `DocSignature`, `Breadcrumb`, `PageMeta`, design tokens, dark mode, smart header, scroll restoration, smooth anchors. One new primitive + six hero swaps + a label rename.

