

## Homepage Rebuild — Exact Execution Draft

Rebuild `src/pages/Index.tsx` below the hero in the exact 8-section order with the exact copy provided. The sticky `SiteHeader` (rendered by `SiteLayout`) is untouched. The `BriefingHero` cover variant is preserved as-is, with a small quiet "Continue" cue added at the bottom.

### Section-by-section changes

**Hero (§1)** — Keep as-is. Add a small, quiet "Continue" continuation cue at the bottom of the hero (subtle muted text + thin downward chevron, no button styling). All existing hero props (category, title, statement, navy tone, HeroActions) remain.

**§2 Trust problem** — Already matches direction. Update body copy to the new exact wording ("...marketing claims are easy to make and difficult to prove. Most consumers are left to rely on trust signals, presentation, and website language. Source Standard exists to shift that standard back to records...").

**§3 How it works** — Replace the three step blurbs with the new exact copy:
- 01 Map the facilities. — "We track licensed 503A and 503B compounding pharmacies in the United States and organize them into an upstream reference layer."
- 02 Audit the vendors. — "Clinics and online vendors are asked to substantiate their sourcing with documentation tied to those pharmacy relationships."
- 03 Publish the record. — "The outcome is published in a public registry. If sourcing cannot be substantiated, the listing remains Unverified."
- Promote the visually-hidden h2 to a visible "How Source Standard works" headline under the eyebrow to match the spec.

**§4 Live registry** — Update body to "Our database tracks the peptide economy as a live public-reference system." Keep both CTAs (Search Verified Vendors → /directory, Explore Greenlist → /greenlist). No stat strip added (spec says "if displayed" — keeping clean).

**§5 Registry fields** — Update headline body to "Every listing in the registry provides a structured snapshot of public sourcing status and operating profile." Update the four field descriptions to the new exact copy. Change link to read "Open the registry" (drop the arrow-only treatment, keep underline style).

**§6 Function of the framework** — Promote hidden h2 to visible "Function of the framework" headline. Update the three column bodies to the new exact copy (consumers / vendors / doctors).

**§7 Foundational reference** — Promote hidden h2 to visible "Foundational reference" headline. Add the new body paragraph beneath it. Keep the three existing cards (titles already match exactly). Update card bodies to match exact copy. Bottom link text becomes "Browse Resource Library".

**§8 Governance and standards** — Promote hidden h2 to visible "Governance and standards" headline. Body copy already matches. Keep the three-row link list (Advisory Board, Audit Methodology, Status Definitions) with "View" affordance.

### Global cleanup
- Every section gets: eyebrow (broad), visible headline (specific), then body. No more `sr-only` h2s where the spec calls for a visible headline.
- Remove any arrow glyphs from headline-area links where the spec gives plain text (e.g., "Open the registry", "Browse Resource Library") — keep the underline-on-hover treatment for restraint.
- Section order is already correct; no reordering needed.
- No new sections, no removed sections.

### Files touched
- `src/pages/Index.tsx` — copy + structural edits only. No new components, no new dependencies, no styling system changes.

### Out of scope
- `SiteHeader`, `SiteLayout`, `BriefingHero` internals, design tokens, routing.

