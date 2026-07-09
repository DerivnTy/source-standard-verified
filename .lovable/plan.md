## Partners Page — Consumer-First Rewrite

Rewrite `src/pages/Partners.tsx` to reframe every section around one consumer question. Preserve the existing visual system, components, and spacing exactly.

### Hero
- Update `BriefingHero` props:
  - **title:** "Who Helps Keep Source Standard Independent?"
  - **statement:** "Learn about the independent organizations, laboratories, physicians, and partners that support the Source Standard verification ecosystem."
- Keep navy chapter variant, category label, and existing metadata.

### Section 1 — Why does Source Standard have partners?
- **Eyebrow:** remove "Section 01" entirely (or replace with a short phrase if the component requires one; otherwise remove).
- **Heading:** "Why does Source Standard have partners?"
- **Body:** 2–3 short paragraphs in plain language explaining that transparency is stronger when multiple independent parties contribute. Cover that lab testing, clinical guidance, and infrastructure are intentionally independent to preserve objectivity.
- Keep using the same `<Section>` wrapper, spacing, and text styles as other content pages.

### Section 2 — Who are Source Standard's partners?
- **Eyebrow:** remove "Section 02".
- **Heading:** "Who are Source Standard's partners?"
- **Body:** a brief 1-sentence intro.
- **Cards:** replace the current numbered horizontal/vertical flow with clean cards (same card style used elsewhere on the site, e.g. `<AboutCard>` or equivalent bordered card component) for each category:
  1. Independent Laboratories
  2. Healthcare Organizations
  3. Compounding Facilities
  4. Medical Advisors
  5. Research Partners
- Each card heading is the category name. Each card body is one short sentence answering: "What role does this partner type play?"
- Preserve existing card border, radius, and padding tokens.

### Section 3 — Featured Partner: Open
- **Eyebrow:** remove "Section 03".
- **Heading:** "Open"
- **Subtitle line (or card label):** "Clinical Intelligence Partner"
- Keep the Open logo image asset.
- Replace the current `<FieldRow>` table with a single bordered card containing 2–3 short paragraphs in consumer language:
  - Source Standard verifies where therapies come from.
  - Open studies what happens after they're used.
  - Together they provide different layers of transparency.
- No internal architecture language (e.g. "source layer," "response layer").

### Section 4 — Two Different Questions
- **Eyebrow:** remove "Section 04".
- **Heading:** "Two Different Questions"
- Replace the current split-card layout with two side-by-side cards (same card component) answering:
  1. **"Can I trust where it came from?"** — Source Standard provides independent verification and sourcing transparency.
  2. **"What happened after it was used?"** — Open helps healthcare professionals better understand clinical outcomes and response patterns.
- Below the two cards, add one short closing sentence about how both organizations provide different layers of transparency.
- Remove the italic closing line and its top-border container.

### Removals
- Delete the `PROCESS` array and the horizontal/vertical numbered flow markup.
- Delete all `<Eyebrow>Section 0X</Eyebrow>` labels.
- Remove the `<FieldRow>` local component (or simplify if still needed for Open).
- Strip all internal infrastructure language: "source layer / response layer," "infrastructure," "framework," and organizational-chart phrasing.

### Preservation checklist
- Keep `<BriefingHero>`, `<Section>`, `<PageMeta>`, `<SectionHeading>`, `<Lead>`, `<Eyebrow>` usage exactly as styled.
- Keep existing CSS tokens: border, bg-background, text sizes, padding, margins.
- Keep Open logo import and lazy-loading.
- Do not touch `index.css`, Tailwind config, or any other page.

### Outcome
A visitor landing on `/partners` should immediately read "Who Helps Keep Source Standard Independent?" and, within 30 seconds, see that independent organizations — labs, healthcare groups, advisors, and Open — are what make the verification trustworthy.