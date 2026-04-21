

## Rewrite About Page Around Provided Copy

Restructure `src/pages/About.tsx` to use the user-provided narrative content while keeping the institutional design system (RecordHeader, numbered §-sections, hairline dividers, prose-led layout) consistent with `HowItWorks` and `Education`.

### New page structure

1. **RecordHeader** (kept, lightly revised)
   - Doc: `SS-ORG-2026.01` · Version `2026.01` · Status `Active` · Updated `04 / 21 / 2026`
   - Eyebrow: `About · Organization Reference`
   - Title: `About Source Standard.`
   - Lead: "Source Standard was created to bring more clarity to a market where sourcing claims are often easy to make and difficult to evaluate."
   - Summary panel: Founded `2026` · Headquarters `Tampa, FL` · Jurisdiction `FL · US` · Model `Documentation-first`

2. **§1 — Context** (new — opening narrative)
   - Eyebrow + heading: "Why this exists."
   - Two paragraphs from the draft about the market landscape (peptide / TRT / hormone optimization), and the line "Source Standard exists to make that landscape easier to understand."

3. **§2 — Our role** (new)
   - Heading: "A public reference for vendor verification."
   - Prose: serves as a public reference for vendor verification and recognized upstream sources; not here to market clinics, promote treatments, or influence care decisions.

4. **§3 — Why we formed** (new)
   - Heading: "Formed to address an information gap."
   - Three short paragraphs from the draft. Closes with: "We did not form to control the market. We formed to make it more legible."

5. **§4 — What we believe** (replaces "Principles" section, reuses the same hairline-row layout)
   - Heading: "Four beliefs that shape the framework."
   - Rows:
     - "Consumers deserve more than marketing language when evaluating a vendor."
     - "Vendors who operate with transparency should be easier to distinguish."
     - "Public clarity helps everyone understand the landscape more accurately."
     - "Documentation matters."

6. **§5 — What we do / What we do not do** (replaces "Role Boundaries" table; same two-column "Is / Is not" structure)
   - Heading: "Scope of the framework."
   - Left column ("We do"): maintain a public system to review verified vendors; recognized upstream sources; verification definitions; educational material on sourcing, documentation, storage, and due diligence.
   - Right column ("We do not"): prescribe treatment; endorse specific medical protocols; replace medical advice, physician judgment, or regulatory oversight; function as a marketing arm for any clinic or vendor.

7. **§6 — Our stance** (new — visually distinct pull-quote block)
   - Heading: "A single operating principle."
   - Bordered block, slightly larger type:
     "If documentation is present and supports the published status, that status can be shown publicly. If it is not, it cannot."
   - Closing line: "Our role is not to persuade. Our role is to provide a clearer public reference."

8. **§7 — Why this matters** (new — two-column)
   - Heading: "Who this serves."
   - Left: "For consumers." — paragraph from the draft.
   - Right: "For responsible vendors." — paragraph from the draft.

9. **§8 — Mission** (new — quiet closing block)
   - Eyebrow: "Mission"
   - Single sentence, larger type: "To bring greater clarity, consistency, and transparency to vendor sourcing and verification in peptide, TRT, and hormone optimization markets."
   - Followed by the closing line: "Source Standard exists to make the market easier to understand for the people moving through it."
   - Inline link to `/governance` for medical advisory and standards authorities (preserving the existing cross-link).

10. **Cite-as footer strip** (kept)
    - "Source Standard, Organization Reference, SS-ORG-2026.01. Last updated 04 / 21 / 2026."

### Visual conventions

- Reuse the existing left-column eyebrow + section heading / right-column content rhythm from the current `About.tsx` (4-col / 8-col grid).
- Alternate `bg-background` and `bg-surface-muted` between sections for breathing room.
- Hairline dividers for list rows (§4) and the two-column "Is / Is not" block (§5), matching current styling.
- §6 "Stance" block uses a bordered pull-quote container to give the operating principle visual weight.
- No icons, no badges, no marketing flourishes.

### Files edited

- `src/pages/About.tsx` — full rewrite of the page body. Header component, layout primitives, and Tailwind utility classes already in use are preserved.

### Files NOT touched

- No other pages, components, routes, or nav changes.

