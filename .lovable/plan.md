

## Sitewide Institutional Modern rollout — execution plan

Executes the previously-approved rollout. Adds the three new directives: SourceCheck as primary trust anchor, Inclusion Standards demoted to registry footer, and final confirmations on header/search.

---

### 1 · Foundation — universal polish

**`src/components/SourceCheck.tsx`** (new)
- SVG glyph: Safety-Blue (`hsl(var(--primary))`) filled circle + white check.
- Sizes: `xs` (12px), `sm` (16px), `md` (20px), `lg` (28px).
- Variants: `solid` (default, filled circle) and `outline` (ring only, for dense lists).
- Used everywhere trust is asserted: status badges, "Reviewed by Medical Advisory" labels, list bullets in About / How It Works / Apply, verified-state rows in registries, registry summary cards.

**`src/index.css`**
- Lock typography: remove IBM Plex Mono fallback in `.meta-mono`; remap to Geist sans at `text-[11px] tracking-[0.14em] uppercase` so "technical" labels stay legible without the typewriter texture.
- Remove `font-mono` from `RecordHeader`, `MetadataBar`, registry ID columns — replaced by sans-at-smaller-size.
- New utility `.section-band { @apply py-24 md:py-28 lg:py-32; }` for ~100px+ vertical rhythm.
- New utility `.trust-list` — `<ul>` resets bullets and inlines `<SourceCheck size="sm">` via marker styling for the About / Apply / How It Works trust lists.

### 2 · New layout primitives

**`src/components/RegistryLayout.tsx`** (new) — DocLayout wrapper for data pages. AnchorHeader on top, then a 12-col grid: `aside col-span-3 sticky top-24` rail + `main col-span-9` content. Rail entries auto-render with active-section highlighting.

**`src/components/ArticleLayout.tsx`** (new) — DocLayout wrapper for library articles. RecordHeader stays on top. Same rail + content grid. Auto-builds rail from a `sections` prop.

**`src/components/ArticleNav.tsx`** (new) — prev/next card pair (replaces the current text link footer on every Library page).

### 3 · Registry pages — rail + cards, Inclusion Standards demoted

```text
┌── AnchorHeader (no aside) ─────────────────────────────────┐
│ ┌── Sticky rail ─┐  ┌── Wide content ───────────────────┐  │
│ │ 01 Total       │  │ Status summary card grid          │  │
│ │ 02 Verified    │  │ (5 elevated cards w/ SourceCheck) │  │
│ │ 03 Under review│  │ ───────────────────────────────── │  │
│ │ 04 Browse      │  │ Sticky filter row                 │  │
│ │ 05 Methodology │  │ Table / cards + pagination        │  │
│ └────────────────┘  │ ───────────────────────────────── │  │
│                     │ Methodology / Inclusion Standards │  │
│                     │ (footer band, demoted)            │  │
│                     └───────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

- **`src/pages/VerifiedVendors.tsx`** — drop legend `aside`. Status legend → 5-card elevated grid (Verified card carries `<SourceCheck size="md">`, others use tone dots). Rail anchors: 01 Total Tracked, 02 Verified, 03 Under Review, 04 Browse Registry, 05 Methodology. Methodology section moved to bottom of right column inside its own `section-band` with `border-t`.
- **`src/pages/Greenlist.tsx`** — same shell. Source-type cards (503B / 503A / Other) replace the divided strip. Rail: 01 Total, 02 503B, 03 503A, 04 Other, 05 Browse Registry, 06 Inclusion Standards. Inclusion Standards explicitly placed in the footer position per directive.

### 4 · Education Hub

**`src/pages/Education.tsx`**
- Hero raised to `section-band`, `font-semibold tracking-[-0.02em]`.
- **Confirm + remove**: any residual "Search Library" input (current page has none — directive satisfied; verified during exploration).
- Start Here trio = premium `card-elevated` with Safety-Blue numbered chip ("01 / 02 / 03"), `<SourceCheck size="sm">` next to "Reviewed by Medical Advisory", `min-h-[300px]`, `text-[22px]` headline.
- Wrap §1–§4 in `DocLayout` rail: 01 Foundational, 02 Clinical Protocols, 03 Regulatory FAQ, 04 Latest Analysis, 05 Archive.
- `LibraryTile` reskinned to `card-elevated` with hover lift; sticky jump bar removed (rail replaces it).
- Archive footer → 2-col `card-elevated` block (drops the mono band).

### 5 · Library articles (13 pages)

Migrate to `<ArticleLayout sections={[…]}>`: `LibraryWhatIsCompounding`, `LibraryWhatArePeptides`, `LibraryInterpretingCoAs`, `LibraryDualLayerDifference`, `LibrarySterilePreparationIntegrity`, `LibraryAsepticTechnique`, `LibraryEndocrinologicalContext`, `LibraryReferenceDosingRanges`, `LibraryAnalysis2026Reclassification`, `LibraryAnalysisQuestionsForYourClinic`, `LibraryAnalysisMeaningOfVerification`, `LibraryAnalysisUndocumentedSourcingSigns`, `LibraryEntry`. RecordHeader stays. Footer Back/Next → `<ArticleNav>`.

### 6 · FAQ + secondary documents

`DocLayout` migration (variant `default`):
- `FAQ.tsx`, `FaqLegalRegulatory.tsx`, `FaqClinicalSafety.tsx`, `FaqVerificationProcess.tsx`, `EducationQuestions.tsx`, `EducationBasics.tsx`, `EducationGuides.tsx` — rail = FAQ categories; accordion stays.
- `HowItWorks.tsx`, `ForVendors.tsx`, `HowToReadTheDirectory.tsx`, `StatusDefinitions.tsx`, `MedicalAdvisory.tsx`, `ReportConcern.tsx` — rail = section anchors. Trust lists swap bullets for `<SourceCheck>`.

### 7 · Forms, profiles, NotFound

- **`Apply.tsx` / `Contact.tsx`** — `card-elevated` form panel, Safety-Blue focus rings (`focus-visible:ring-primary`), single navy submit. No rail (forms don't need waypoints).
- **`VendorProfile.tsx` / `GreenlistProfile.tsx` / `AdvisorProfile.tsx`** — 2-col asymmetric: sticky meta panel left (status + ID + last audit + `<SourceCheck size="lg">` trust seal when verified), profile body right.
- **`NotFound.tsx`** — centered `card-elevated`, navy headline, Safety-Blue link home.

### 8 · Header / chat — confirmation only

- "Home" link removed from header — confirmed in current `SiteHeader.tsx` (no `/` entry in `nav`).
- Glassmorphism `bg-background/70 backdrop-blur-xl backdrop-saturate-150` — confirmed.
- `SourceBot` Clinical Assistant FAB globally mounted via `SiteLayout` — confirmed; serves as the search replacement per directive.

### 9 · GitHub commit + Pre-Launch posture

GitHub sync is bidirectional and automatic once Connectors → GitHub is linked: every file written in this rollout commits to the connected repo's default branch in real time. No manual push required. The work itself is presentational only — no auth, telemetry, or data exposure changes — so the "Pre-Launch / Private" posture is unaffected. Locked-down feel comes from the institutional palette, hairline borders, and certificate tints already shipped.

---

### Files touched

**New (4)**
- `src/components/SourceCheck.tsx`
- `src/components/RegistryLayout.tsx`
- `src/components/ArticleLayout.tsx`
- `src/components/ArticleNav.tsx`

**Edited (~28)**
- `src/index.css` — typography lock, `.section-band`, `.trust-list`.
- `src/components/RecordHeader.tsx`, `src/components/MetadataBar.tsx` — drop mono.
- `src/pages/VerifiedVendors.tsx`, `src/pages/Greenlist.tsx` — RegistryLayout + status cards + Inclusion Standards demoted.
- `src/pages/Education.tsx` — DocLayout shell + premium Start Here.
- 13 `Library*.tsx` pages — ArticleLayout migration.
- 7 FAQ / Education-sub pages — DocLayout migration.
- 6 secondary doc pages (`HowItWorks`, `ForVendors`, `HowToReadTheDirectory`, `StatusDefinitions`, `MedicalAdvisory`, `ReportConcern`) — DocLayout migration.
- `Apply.tsx`, `Contact.tsx` — form reskin.
- `VendorProfile.tsx`, `GreenlistProfile.tsx`, `AdvisorProfile.tsx` — 2-col asymmetric.
- `NotFound.tsx` — reskin.

### What stays the same

All routes, all data files, all data shapes, every page's copy, `SiteHeader`, `SiteFooter`, `SourceBot`, `HeroPattern`, `Logo`, `Button`, `Callout`, `RelatedDocs`, `DocLayout`, `Section` (legacy export retained), the global token system, and registry filtering/sorting/pagination logic. Presentational only — no behavior is altered, no data exposed.

