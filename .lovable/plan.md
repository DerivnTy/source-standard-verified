

## Education Page — Restructure for New Visitors

Reframe `/education` so a first-time visitor (someone curious about peptides, TRT, or compounded medications) immediately understands what's here and where to start. Keep the underlying library data intact — change the surface so the expert "reference document" framing becomes a friendly, guided learning experience.

### The core problem
The current page reads like a regulatory index: monospace IDs (`SS-SERIES-001`), a four-lane taxonomy ("Lane I / II / III / IV"), status chips, and a citation footer. That works for someone auditing the library. It does not work for someone who just wants to know "what is a peptide and is it safe?"

### What changes

**1. Replace the reference header with a plain-English intro**
- New title: `Learn` (or `Education`) — drop "Clinical Reference Library" as the primary label.
- Lead paragraph in conversational tone: one or two sentences explaining "this is where you learn how compounded medications, peptides, and TRT actually work, and how to tell a trustworthy source from a risky one."
- Remove the document ID / "Reviewed under" metadata bar from the top. (It can move to the footer as a small credibility line.)

**2. Add a "Start Here" section above everything else**
A short, friendly block with 3 entry points for new visitors — the questions they actually arrive with:
- **New to peptides?** → links to a foundational explainer (e.g. "What are peptides?")
- **Trying to evaluate a clinic or vendor?** → links to "Questions to Ask Your Clinic" + the directory
- **Want to understand the rules?** → links to "The 2026 Compounding Reclassification" or a legality FAQ

These render as three large, plain cards with a one-line description each — not a table row.

**3. Reorganize the content by visitor intent, not by internal lane**
Drop the "Lane I / Lane II / Lane III / Lane IV" framing. Replace with three plainly-named sections in this order:

- **The Basics** — foundational explainers from the Series + selected Guides. The pieces a beginner should read first. (e.g. "What are peptides?", "How to Read a Certificate of Analysis", "The Dual-Layer Difference")
- **Practical Guides** — the clinical/practical guides (safe handling, sanitation, TRT science, dosing summaries). Framed as "how to do this safely" not "physician-reviewed reference material."
- **Common Questions** — the FAQ, but presented as one flat, searchable accordion grouped by plain headings ("Is this legal?", "Is it safe?", "How does verification work?", "What should I look for?") instead of the current taxonomy labels.

Each section gets a short, human one-liner above it — no eyebrows, no Roman numerals, no reference IDs in the row.

**4. Simplify each entry row**
Current row shows: reference ID · title · summary · "Reviewed by" · status chip.
New row shows: title (larger) · one-line summary · a small muted "Reviewed by Medical Advisory Board" line only where relevant. Status chips ("In Review", "Outlined") move to a subtle text label only on items not yet readable, or are hidden entirely on the index and only shown on the entry page itself.

Reference IDs (`SS-SERIES-001`) are removed from the public index. They stay in the data model and on the individual entry pages for citation purposes.

**5. Move "Supplementary Infrastructure" to a small footer block**
Video Library / Webinars / Integrity Reports become a single "Coming soon" strip near the bottom — three short lines, not a full section with cards. They're not what a new visitor needs.

**6. Remove the sticky lane index**
Replace with a quiet anchor row only if the page is long, using the new plain section names ("Start here · Basics · Guides · Questions").

**7. Soften the citation footer**
Keep the medical disclaimer (it matters), but drop the "Cite as SS-LIBRARY-2026.01" block from the public-facing page. Move credibility signals (Medical Advisory Board, Governance link) to a small "About this library" line.

### Files touched
- `src/pages/Education.tsx` — full restructure of the page surface as described above. No changes to data structure.
- `src/data/library.ts` — add a small `audience` or `level` hint (`"intro" | "intermediate"`) to a handful of entries so the "Basics" section can pick the right beginner pieces. Optionally add 1–2 new beginner-oriented entries ("What are peptides?", "What is compounding?") as outlined stubs so the Basics section has the right starting points.
- `src/pages/LibraryEntry.tsx` — minor: keep the reference ID visible here (it's appropriate on the detail page), but soften the "Outlined — full text forthcoming" state into friendlier language ("We're still writing this one. Here's what it will cover.").

### What stays the same
- All routes, all existing data, all entry slugs.
- The four content lanes still exist in the data — they're just not the navigation metaphor anymore.
- Medical Advisory Board attribution, disclaimers, and the LibraryEntry detail page structure.
- Header, footer, and every other page in the app.

### Result
A first-time visitor lands on `/education` and immediately sees: a friendly intro, three "start here" doors matched to why they came, and three plainly-named sections (Basics, Guides, Questions). The clinical reference rigor is still there in the data and on detail pages — it's just no longer the first thing a beginner has to decode.

