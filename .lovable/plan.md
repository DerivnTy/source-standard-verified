

## Terms of Use Page Copy Rewrite

Text-only changes to `src/pages/Terms.tsx`. No layout, components, styling, routes, navigation, footer, or animation changes. All anchor IDs (`acceptance`, `citation`, `integrity`, `warranty`, `jurisdiction`, `related`) preserved.

### Files Touched

1. **`src/pages/Terms.tsx`** — hero, purpose statement, all six section titles/intros/clauses, related policies labels, closing statement.

*Footer: already aligned from prior passes — no change.*

### Content Changes

**`heroDescription`**
→ `The governing terms for access to, citation of, and use of the Source Standard public registry and associated framework materials.`

**`PageMeta`** — title `Terms of Use`, description = heroDescription.

**`BriefingHero`**
- `category`: `Registry User Agreement` (unchanged)
- `title`: `Terms of Use`
- `statement`: heroDescription

**Purpose section ("How this agreement applies")** — replace two paragraphs:
1. `These terms govern public access to the Source Standard registry and the related public-reference materials published under the framework.`
2. `They define the conditions of access, rules for citation and use, prohibited conduct, and the legal boundaries that apply to reliance on registry information.`

**§01 Acceptance**
- Title: `Registry Access & Acceptance`
- Intro: `What use of the registry means.`
- Body (3 paragraphs):
  1. `Access to the Source Standard public registry constitutes acceptance of these terms and the related policies referenced on this page.`
  2. `If a user does not accept these terms, use of the registry and associated framework materials should be discontinued.`
  3. `Continued access signifies acceptance of the jurisdictional, liability, and use limitations defined below.`

**§02 Citation**
- Title: `Citation & Data Use`
- Intro: `How registry records may be referenced publicly.`
- Lede: `Registry records may be cited in journalistic, academic, clinical, or commercial contexts provided the citation preserves enough detail for the reader to identify the referenced record accurately.`
- `CITATION` array (4 items):
  - 01 `Source Standard ID` / `Include the unique registry identifier associated with the listing, where applicable.`
  - 02 `Status date` / `Include the date the referenced status was published or last updated.`
  - 03 `Attribution` / `Provide a direct link to the source registry page so the current public record can be reviewed.`
  - 04 `Citation integrity` / `Citations that omit identifying details may misstate the status, scope, or timing of the published record.`

**§03 Integrity**
- Title: `Integrity & Prohibitions`
- Intro: `Conduct that is not permitted in connection with the registry or its published materials.`
- `INTEGRITY` array (5 items):
  - 01 `Bulk extraction` / `No automated scraping, crawling, or indexing of registry data for resale or creation of derivative datasets without authorization.`
  - 02 `Status misrepresentation` / `No display or implication of Verified status for any entity not currently published under that status in the registry.`
  - 03 `Unauthorized use of marks` / `No use of Source Standard names, marks, or badge artwork in a way that implies an uncontracted partnership, endorsement, verified status, or formal relationship.`
  - 04 `Registry interference` / `No activity intended to disrupt, falsify, manipulate, or degrade the integrity of public records or related framework materials.`
  - 05 `Policy response` / `Confirmed violations may be addressed under the applicable Source Standard operating policies, registry access controls, badge-use rules, or legal remedies.`

**§04 Warranty**
- Title: `Warranty & Liability`
- Intro: `How registry information should be understood and relied upon.`
- `WARRANTY` array (4 items — adds 1):
  - 01 `Reference basis` / `The registry reflects Source Standard's review of submitted documentation, public records, pharmacy relationship evidence, and related materials within a defined scope and at a defined point in time.`
  - 02 `As-is publication` / `Registry data is provided as a public reference only and is not warranted as fit for any specific medical, legal, commercial, regulatory, or investment purpose.`
  - 03 `Reliance limits` / `Use of registry data is at the user's discretion. Medical decisions should be made with licensed clinicians and not on the basis of registry information alone.`
  - 04 `No guarantee` / `Source Standard does not guarantee product safety, treatment effectiveness, clinical outcomes, vendor quality, regulatory compliance, or the completeness of third-party information.`

**§05 Jurisdiction** — title and intro unchanged; body unchanged (already compliant).

**§06 Related Policies**
- Title: `Related Policies`
- Intro: `Further reading on privacy, verification scope, operating boundaries, and public status meanings.`
- `RELATED` array (routes preserved):
  - `/privacy` → `Data Governance & Privacy Policy`
  - `/verification-disclaimer` → `Verification Disclaimer`
  - `/accountability` → `Compliance & Operating Boundaries`
  - `/status-definitions` → `Status Definitions`

**Closing statement**
- H2: `Public access requires clear terms of use.` (unchanged)
- Body: `These terms exist to preserve the integrity of the registry, support accurate public citation, and clarify the limits under which Source Standard information is published and used.`

### Out of Scope

- All layout, components, styling, spacing, colors, animations
- Anchor IDs and routes preserved
- Footer (already aligned)
- All other pages

