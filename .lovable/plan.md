

## Rebuild Education Page as a Consumer Knowledge Center

Restructure `/education` around how real visitors learn — featured articles, browsable categories, and an expandable FAQ — while pushing reference IDs to a quiet secondary layer.

### New page structure (top to bottom)

1. **Hero** — Simple, consumer-facing
   - Title: `Education`
   - Lead: "Learn more about peptide sourcing, TRT, hormone optimization, verification, storage, and what consumers should understand before buying from any clinic or vendor."
   - Short disclaimer line: "Educational material is informational only and is not medical advice."
   - Replace the heavy `RecordHeader` metadata strip with a lighter header — keep one slim metadata line (Updated / Status) but drop the doc-style summary panel.

2. **Featured Articles** — First real content area
   - Section title: `Featured Articles`
   - Grid of 6 article cards (2–3 columns). Each card:
     - Category chip (small)
     - Title (lead element)
     - 1–2 sentence description
     - Status pill if not yet published (e.g. "Coming soon")
     - `Read more →` link
   - Initial articles:
     - What 503B registration actually means (Sourcing)
     - How to read a peptide CoA (Certificates of Analysis)
     - What Source Standard verification means (Verification)
     - Five questions to ask before buying (Consumer Safety)
     - Warning signs of undocumented sourcing (Consumer Safety)
     - Storage and reconstitution basics (Storage and Handling)

3. **Browse by Category** — Topic-first, not filing-bucket
   - Section title: `Browse by Topic`
   - Clean tile grid (4 columns desktop, 2 mobile). Each tile: category name + 1-line description + article count.
   - Categories: Sourcing · Verification · Certificates of Analysis · Licensing · Consumer Safety · Storage and Handling · TRT and Hormone Optimization · Peptide Basics
   - Tiles are visual only for now (no individual category pages yet) — non-clickable, styled as a topic map.

4. **Frequently Asked Questions** — Expandable, every item readable inline
   - Section title: `Frequently Asked Questions`
   - Use the existing `Accordion` component (`src/components/ui/accordion.tsx`) so each item expands inline with a short answer.
   - Each item also includes a `Read more →` link at the end of the expanded answer (for now points to `#` placeholder or the related article — see Technical Details).
   - Questions:
     - What does "verified" mean?
     - What does "unverified" mean?
     - What is a 503B facility?
     - What is a certificate of analysis?
     - Does Source Standard verify safety?
     - How should peptides be stored?
     - What should I ask before buying from a clinic?
     - Does a professional website mean a clinic is legitimate?
     - What records actually matter when evaluating a vendor?

5. **Reference Notes** — Secondary, quiet
   - Section title: `Reference Notes`
   - Small one-line entries listing internal citation IDs (e.g. `SS-EDU-101.2026 — 503B registration`) in a compact list, muted styling. No cards, no tables. Visually de-emphasized so it does not dominate.

6. **Read deeper** — Keep existing footer panel linking to `/medical-advisory` and `/governance`.

### What gets removed / reduced

- Doc-style `RecordHeader` summary metadata block (Doc / Version / Status / Updated grid)
- "Popular questions" numbered grid (replaced by Featured Articles + FAQ)
- "Learning topics" sidebar (replaced by Browse by Topic tiles)
- "Upcoming Guides" two-column grid with prominent REF / SS-EDU citation footers
- REF-XXX labels as primary metadata on every item
- "Cite as" institutional footer line under guides

### Tone & visual direction

- Cards lead with title and description; category as small chip, status as small pill — never dominant.
- FAQ items clearly separated with hairline dividers; expanded answers in readable prose, not citation format.
- Category tiles use plain typography, no reference numbers.
- Reference Notes section sits in muted-foreground tone, single-column compact list.

### Technical Details

- **File edited:** `src/pages/Education.tsx` (full rewrite of the page body; no other files touched).
- **Components reused:**
  - `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` from `@/components/ui/accordion` for the FAQ.
  - `Link` from `react-router-dom` for "Read more" links (point to `#` placeholders for now since no article detail routes exist; FAQ "Read more" links to `#` anchors).
  - Keep `container-wide`, `meta`, `meta-label` utility classes from `src/index.css` for visual consistency with the rest of the site.
- **Header treatment:** Replace `RecordHeader` import/usage with a lightweight inline header section (h1 + lead + small metadata strip showing only "Updated · Regularly" and "Informational only"). This keeps the page consistent with a learning-center feel rather than a document record.
- **Data shape:** Three local arrays inside the page — `featuredArticles`, `categories`, `faqs` — each typed inline so future swaps to a CMS or data file are trivial.
- **No new routes** added; article and category detail pages are out of scope for this pass. Placeholder `Read more` links use `#` and can be wired up when article pages are built.
- **Disclaimer:** Single short line under the hero, plus the existing `border-b bg-surface-muted` strip is removed (consolidated into the hero area).

### Out of scope

- Building individual article detail pages
- Building category landing pages
- Adding a search bar
- CMS or backend wiring
- Any changes to navigation, header, or other pages

