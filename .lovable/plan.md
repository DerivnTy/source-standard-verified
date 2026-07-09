## Site-Wide Editorial Refinement Pass

Nine principles from the brief, applied page by page. Homepage is polish-only; internal pages get real editorial recomposition. No new components, no branding changes, no new hero concepts.

---

## Global rules (applied to every edited page)

1. **One primary action per page.** Everything else is an inline cross-reference (underlined text link with the same body-color, not a pill, not a filled button).
2. **Buttons to remove sitewide** (replace with inline "See how verification works ›" style links, or delete outright when the same link already exists in nav): "See How Verification Works", "Search the Registry" (kept only in the hero), "Open the Registry", "Browse Learn", "Explore Governance", any duplicate "Read more" CTAs.
3. **Break the PageSection rhythm.** A page should not consist of N identically-shaped `PageSection`s. Vary: prose-only, heading+list, definition list, comparison block, navigation strip, footer sentence. `PageSection` becomes one tool among several, not the default answer.
4. **Emphasis budget.** On any given page: one H1, at most three H2s, minimal bold, no pills unless status-bearing, no icons on section headings, no eyebrow labels unless they carry document structure (chapter number, doc id).
5. **Delete anything decorative.** Any glyph, chip, divider, or eyebrow that doesn't aid comprehension is cut. Dividers only at true section boundaries, never as intra-section decoration.
6. **Spacing is intentional, not defaulted.** Sections don't inherit uniform vertical padding; padding follows role. Lead sections breathe; reference sections tighten.
7. **Document register.** Every consumer page carries a light metadata line (last reviewed · doc id) in the same place, quietly. Signals institution without adopting full `RecordHeader` chrome.

---

## Page-by-page

### Homepage (`Index.tsx`) — polish only

- Delete "Where Can I Learn More?" section. Redundant with `/learn` in nav.
- Merge "Why Does This Exist?" and "Claims Are Not Verification" into one section with two paragraphs. They argue the same point.
- Remove section CTAs: "See How Verification Works", "Search the Registry", "Open the Registry", "Browse Learn", "Explore Governance". The registry search input in the hero is the page's one primary action. Section navigation becomes inline cross-references ("More on the protocol ›").
- Remove the three trust-chip pills under the search ("Independent Verification · Public Reference Registry · Evidence-Informed"). They read as marketing badges.
- Tighten vertical rhythm ~20% between sections; keep the mission section spacious as the lead.
- Keep: hero, registry search, registry NavCard pair, process steps, listing checklist, "Who Is This For?" (converted from tiles to inline prose naming the three audiences), Governance trust pillars.

### About (`About.tsx`)

Recompose as four movements, not six sections:

1. **Opening statement (no section heading).** Merge the current "Why Source Standard exists" and the trailing "A transparency framework with defined limits" into a single 2–3 paragraph lead directly under the hero. Foreground body text, not muted intro-tone.
2. **Scope (one section, two labeled columns).** Left = what Source Standard does (current SCOPE items). Right = what it does not do (current BOUNDARIES items). Rendered as definition-list rows (term — one-line definition, hairline separators). No checkmark or minus glyphs — column labels carry semantics. This is the page's central artifact.
3. **Context (one section, prose).** CONTEXT list becomes a short numbered paragraph list (four short numbered items, each one sentence). OBJECTIVES 3-up block becomes one sentence inline naming consumers, providers, and industry as the three audiences.
4. **Principles (numbered list).** Four items with mono ordinals (01–04) in the margin, one-line title, one-line definition. No icons, no grid, no eyebrow.

`SectionAnchorNav` collapses from 5 to 4 waypoints. Add a metadata line below the hero: `Last reviewed · Document ID · Version`.

### How Verification Works (`HowItWorks.tsx`)

Recompose as three movements:

1. **Definition (no heading).** Open with a dictionary-style paragraph: **Verification** — its definition sentence, then a second sentence stating what it is not. Replaces the current "What Is Verification?" `PageSection`.
2. **Protocol.** `ProcessSteps` carries the section without an H2 above it. A small margin label ("Protocol") replaces the heading.
3. **What verification means.** One heading, two labeled columns: "Means" (MEANS list) and "Does not mean" (DOES_NOT_MEAN list). Definition rows with hairline separators. Drop icons on both sides.

Delete the closing "Why Does This Matter?" section. Fold its useful sentence into the disclaimer paragraph at the bottom of the "Means" block.

### Partners (`Partners.tsx`)

Recompose as three movements:

1. **Statement (no heading).** One paragraph, body-foreground, wide margin. Combines the current opening rationale and the trailing "Two Different Questions" framing.
2. **Categories.** One small heading. PARTNER_CATEGORIES rendered as a vertical definition list, not a 2-column feature grid.
3. **Open (partner spotlight).** Remove the bordered card around the logo. Logo mark inline at editorial size, one paragraph on the relationship, one small quiet cross-reference link. Delete the entire "Two Different Questions" section — it paraphrases the paragraph directly above it.

### Learn (`Learn.tsx`)

Learn is a directory. Compose it as one:

1. **Directory (no heading).** The current "Where do you want to start?" NavCard row moves directly under the hero. It *is* the page's primary nav.
2. **Education topics.** Keep the heading. Render EDUCATION_TOPICS as a single-column definition list with hairline separators — not a 2-column feature grid.
3. **Recent updates.** Keep as chronological list. Small tightening: dateline in mono margin, headline as underlined link, one-line dek.
4. **Footer sentence.** "Still have questions?" collapses from a section into one sentence with two inline underlined links (`FAQ` and `Contact`). No NavCard pair, no section heading.

`NextStep` remains at the bottom.

---

## Registry and profiles

Explicitly deferred. Handled in a separate pass after the four consumer pages land. Target register: modern public records, not directory listings. Not scoped here.

---

## Not doing

- No color, type, logo, or component-library changes.
- No new components. Definition lists and comparison blocks render inline with `dl`/`dt`/`dd` and hairline rules. If a pattern repeats across pages later, extract then — not now.
- No new hero concepts.
- No route changes.
- No copy rewrites beyond removing repetition and demoting marketing tone.

---

## Verification (per page, then whole-site read-through)

1. `bunx tsgo --noEmit` after each page's edits.
2. Mobile 390 + desktop 1280 screenshots per edited page. View them against the pre-pass captures.
3. **First-time-visitor read-through.** For each page, read top to bottom asking: does this read as one composed document, or as N stacked components? If the latter, demote or delete the section that breaks it and re-verify. Do not stop because components are consistent; stop when the page feels effortless.
