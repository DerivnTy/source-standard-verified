## Governance final cleanup — editorial rewrite

Bring `/governance` in line with the rest of the site: public editorial voice, no fake document chrome, no empty tables.

### 1. Hero — strip document metadata (`src/pages/Governance.tsx`)
Replace `RecordHeader` with `PageHeader` (same primitive used elsewhere).

- Eyebrow: `GOVERNANCE & OVERSIGHT`
- Title: `Who Oversees Source Standard?`
- Description: `How Source Standard stays independent, objective, and accountable.`

Remove:
- `DOC_ID`, `VERIFIED_ON` constants
- The `metadata` array (Doc, Version, Status, Updated)
- The `summary` table (Advisory body of record, Anchored authorities, Initial roster filing, Neutrality posture)
- `DocJumpBar` and its `waypoints` array (jump bar reinforces the "filing" feel)
- `BoardCiteFooter` at the bottom (controlled-copy citation line)

### 2. Advisory (§1) — rewrite as prose
Delete the `Callout` administrative notice and the `ROSTER UPDATES…` mono line. Replace `BoardSection` (which prints numbered filing eyebrows + "Rationale") with `PageSection` used across other consumer pages.

- Title: `Framework criteria maintained under clinical oversight`
- Paragraph 1: "Licensed clinicians and advisors help review the scope definitions, evidence standards, and renewal intervals used by the Source Standard framework. Advisory participation supports the integrity of the framework, but does not turn Source Standard into a medical provider."
- Paragraph 2: "Advisors do not diagnose, treat, prescribe, or evaluate individual patients through Source Standard."

### 3. Anchored standards (§2)
Convert to `PageSection`. Keep the responsive stacked-record `<ul>` (mobile stack, `md:` 12-col grid) as-is — that structure works. Soften wording of the header row from `STATUTORY / COMPENDIAL REFERENCE` intact (already public-facing). Remove the `n="2"` filing number and `rationale` prop by dropping `BoardSection`; use plain intro text: "Source Standard does not originate criteria. Each framework requirement is anchored to a statutory provision or compendial standard issued by the public authorities listed below."

### 4. Organizational neutrality (§3)
Convert to `PageSection`. Title: `Organizational neutrality`. Keep both existing paragraphs verbatim. Drop the "Strict separation of interests" rationale line.

### 5. Independent organizations supporting the framework (§4)
Convert to `PageSection`. Title unchanged. Keep the `<dl>` with the three categories (Independent laboratories, Healthcare organizations, Research partners). No Open, no Compounding Facilities, no Medical Advisors.

### 6. Read deeper (§5)
Convert to `PageSection` titled `Read deeper`. Keep the existing `NavCard` grid with the five cross-references.

### 7. Footer
End with `EditorialBackLink to="/" label="Back to Home"`. Remove `BoardCiteFooter`.

### Files touched
- `src/pages/Governance.tsx` — full rewrite of composition (imports, constants, JSX)

### Out of scope
- No changes to `SiteHeader`, `PageHeader`, `PageSection`, `BoardSection`, or any shared primitive
- No route, SEO metadata, or authority-data changes
- No changes to Advisory Board, About, or other pages
