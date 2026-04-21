

## Education → Clinical Reference Library

Reposition `/education` from a blog-style page into a structured Clinical Reference Library organized around four content lanes, with architecture that anticipates video, webinars, and an integrity report feed.

### Files touched
- `src/data/library.ts` *(new)* — typed content models for articles, FAQs, and supplementary formats; canonical lane taxonomy.
- `src/pages/Education.tsx` — full rebuild around the four lanes + future-format scaffolding.
- `src/App.tsx` — add stub routes for individual library entries (so cards link somewhere coherent even before content is fully written).
- `src/pages/LibraryEntry.tsx` *(new, optional stub)* — generic article shell that reads from `library.ts`; renders a "Forthcoming — outlined" state for entries without body copy yet.

No changes to navigation label ("Education" stays in the header), Greenlist, Verified Vendors, Advisory Board, or any other page.

---

### Page architecture (`/education`)

Replaces the current hero + featured + topics + FAQ + reference notes layout with this structure:

**1. Reference Header (RecordHeader pattern)**
- Eyebrow: `Clinical Reference Library`
- Title: `Clinical Reference Library`
- Lead: One paragraph framing the library as a neutral, structured reference resource — not editorial content.
- Metadata bar: `SS-LIBRARY-2026.01 · Active · Reviewed under Medical Advisory Board · Updated regularly`
- Summary sidebar: lane counts (Source Standard Series, Clinical Guides, FAQ entries, Supplementary formats).

**2. Lane index (sticky table-of-contents row)**
A thin horizontal index linking to the four lane sections below. Quiet, institutional — no card chrome.

**3. Lane I — The Source Standard Series**
Framing line: explains these are framework/landscape pieces authored by Source Standard.
Entry list (rendered as a clean, bordered list — not blog cards):
- The 2026 Compounding Reclassification
- How to Read a Certificate of Analysis
- The Dual-Layer Difference
- Questions to Ask Your Clinic
- What Source Standard Verification Actually Means
- Warning Signs of Undocumented Sourcing

Each row: reference ID (e.g. `SS-SERIES-001`), title, one-line description, status chip (`Published` / `In review` / `Outlined`).

**4. Lane II — Clinical & Practical Guides**
Framing line: notes these are reviewed under the Medical Advisory Board and intended as practical reference, not personalized medical advice.
Entries:
- Safe peptide handling and reconstitution
- Sanitization and aseptic-technique fundamentals
- The science of aging and TRT
- Dosing-guidance summaries for common compounds (high-level)
- Storage and stability fundamentals
- Sterile injectable handling for consumers

Each row carries a `Reviewed by` slot (Medical Advisory Board) and a status chip.

**5. Lane III — Unbiased FAQ**
Accordion, grouped into four subsections:
- Legality & access (e.g., "Is it legal to buy peptides online?")
- Verification & status (e.g., "Why are some vendors listed as Unverified?", "Does Source Standard guarantee product safety?")
- Methodology (e.g., "What is blind purchase testing?", "What does a Certificate of Analysis actually prove?")
- Consumer due diligence

Tone: short, restrained, transparent. Each answer ends with an optional "Read deeper →" link to the relevant Series or Guide entry.

**6. Lane IV — Supplementary Infrastructure (forward-built)**
Three-column grid of placeholder modules with `Forthcoming` chips:
- **Video Library** — short clinical explainers and walkthroughs.
- **Live Monthly Webinars** — registration + archive structure.
- **Integrity Report Feed** — periodic published reports on directory-wide findings.

Each module has a title, one-paragraph description, and a "Notify me" / "Coming 2026" affordance — wired to the contact route, not a backend.

**7. Reference & citations footer**
- Cite-as line for the library as a whole.
- Cross-links: Governance, Medical Advisory Board, Status Definitions, How to Read the Directory.
- Final disclosure: educational material is informational only; not medical advice.

---

### Data model (`src/data/library.ts`)

```ts
type Lane = "series" | "guide" | "faq" | "supplementary";
type EntryStatus = "published" | "in-review" | "outlined" | "forthcoming";

type LibraryEntry = {
  id: string;            // SS-SERIES-001, SS-GUIDE-001, etc.
  slug: string;
  lane: Lane;
  title: string;
  summary: string;       // one-line
  status: EntryStatus;
  reviewedBy?: string;   // "Medical Advisory Board"
  body?: ReactNode;      // optional; absent => "Forthcoming — outlined" state
};

type FAQEntry = {
  id: string;
  group: "legality" | "verification" | "methodology" | "due-diligence";
  q: string;
  a: string;
  relatedSlug?: string;
};

type SupplementaryFormat = {
  id: string;
  title: string;
  description: string;
  status: "forthcoming" | "active";
  cta?: { label: string; to: string };
};
```

Three exported arrays: `librarySeries`, `libraryGuides`, `libraryFaqs`, `librarySupplementary`. The page reads from these so future content additions are pure data edits.

---

### Routing

- Keep `/education` as the library landing page.
- Add `/education/:slug` → `LibraryEntry` (generic shell). For entries without `body`, the shell renders a structured "Outlined — full text forthcoming" view (title, summary, lane, reference ID, status, related entries) rather than a 404. This keeps cross-links honest as content is filled in.

---

### Visual & tone constraints
- Reference-document aesthetic: hairline rules, tabular type, monospace IDs, restrained spacing — same system already used on Greenlist / How to Read the Directory.
- No card shadows, no marketing CTAs, no hero imagery, no emojis.
- Status chips reuse the existing `meta`/border-only treatment — not colored badges.
- All language neutral and clinical; no promotional phrasing anywhere on the page.

### What stays the same
- Header navigation, footer, MetadataBar, RecordHeader, Section, Accordion, StatusBadge components — all reused.
- All other routes and pages.
- `src/data/greenlist.ts`, `src/data/vendors.ts`, `src/data/authorities.ts`, `src/data/advisoryBoard.ts`.

### Result
`/education` becomes a structured, four-lane Clinical Reference Library that reads like a regulatory/medical reference resource. The data layer and routing are built so the Series, Guides, FAQ, video, webinar, and integrity-report tracks can all expand without re-architecting the page.

