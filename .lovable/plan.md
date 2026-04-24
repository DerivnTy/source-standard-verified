

## About Page Copy Rewrite

Text-only changes to `src/pages/About.tsx`. No layout, components, styling, routes, navigation, footer, or animation changes. All anchor IDs (`context`, `boundaries`, `objectives`, `scope`, `related`) preserved.

### Files Touched

1. **`src/pages/About.tsx`** — hero copy, purpose statement, Context body, Boundaries list, Objectives clauses, Scope clauses, Related Pages descriptions, closing statement.

*Footer: already correct from prior passes — no change.*

### Content Changes

**`heroDescription`**
→ `Source Standard exists to make vendor sourcing claims easier to interpret through submitted records, public documentation, structured review, and status-based registry standards.`

**`PageMeta`** — title `About`, description = heroDescription.

**`BriefingHero`**
- `category`: `Organization & Mandate` (unchanged)
- `title`: `An independent verification and public-reference framework for compounded therapy vendor sourcing claims.`
- `statement`: heroDescription

**Purpose section ("What Source Standard exists to do")** — replace with four paragraphs:
1. `Source Standard is an independent verification and public-reference framework designed to improve transparency around compounded therapy vendor sourcing claims.`
2. `Its role is to help the public identify whether vendor claims are supported by submitted documentation, pharmacy relationship evidence, public records, and review timestamps.`
3. `The organization does not market vendors, promote treatment protocols, provide medical advice, or function as a substitute for federal or state oversight.`
4. `Its purpose is narrower and more disciplined: to organize vendor records, sourcing documentation, verification status, and public-reference materials into a system that can be reviewed with greater clarity.`

**§01 Context** body (replaces single paragraph with three short paragraphs):
- `In compounded therapy markets, consumers are often asked to evaluate vendors through branding, testimonials, claims, and presentation.`
- `Those signals are difficult to verify independently.`
- `Source Standard was established to create a clearer relationship between vendor sourcing claims and documentation that can be reviewed, time-stamped, and assigned a public status.`

**§02 Operational Boundaries** — replace `BOUNDARIES` array with:
1. `Source Standard does not provide medical advice or prescribe treatment protocols.`
2. `It does not substitute for physician judgment or federal or state regulatory oversight.`
3. `It does not function as a marketing partner or promotional arm for any vendor.`
4. `It does not guarantee clinical outcomes, treatment effectiveness, biological response, product quality, potency, sterility, or individual product safety.`
5. `Its mandate is limited to documentation review, sourcing-claim review, public-record organization, and status-based registry publication.`

**§03 Strategic Objectives** — replace `OBJECTIVES`:
- 01 `For Consumers` / `Providing a structured public reference so vendor sourcing claims can be evaluated through documentation status, review scope, and last-reviewed dates.`
- 02 `For Vendors` / `Providing a documentation-based review pathway for vendors that want their sourcing claims evaluated within a defined public-reference framework.`

**§04 Defined Scope** — replace `SCOPE`:
- 01 `Vendor registry` / `Maintenance of a public registry containing verified, unverified, under-review, suspended, and removed vendor records.`
- 02 `Upstream registry` / `Publication of upstream facility records used as reference points during vendor sourcing review.`
- 03 `Educational reference` / `Publication of educational material covering sourcing claims, pharmacy categories, public records, documentation boundaries, and consumer due diligence.`
- 04 `Status maintenance` / `Periodic review of vendor records, documentation status, review scope, and public-facing status definitions within the limits of the framework.`

**§05 Related Pages** — replace `RELATED` (routes preserved):
- `/governance` → `Governance & Oversight` / `Advisory oversight, review boundaries, and framework discipline.`
- `/how-it-works` → `Verification Protocol` / `Documentation review, monitoring, disclosure, and status-response process.`
- `/status-definitions` → `Status Definitions` / `Definitions for every public registry status.`
- `/accountability` → `Compliance` / `Legal posture, operating boundaries, and public-reference limitations.`

**Closing statement**
- H2: `A public-reference system with defined limits.` (unchanged)
- Body: `Source Standard is designed to make compounded therapy vendor sourcing claims easier to interpret. It does not replace clinical judgment, regulatory oversight, or individual medical decision-making. Its role is to provide a disciplined public reference for a market where documentation is often harder to evaluate than presentation.`

### Out of Scope

- All layout, components, styling, spacing, colors, animations
- Anchor IDs and routes preserved
- Footer (already aligned)
- All other pages

