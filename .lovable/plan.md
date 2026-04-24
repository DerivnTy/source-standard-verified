

## Verification Disclaimer Page Copy Rewrite

Text-only changes to `src/pages/VerificationDisclaimer.tsx`. No layout, components, styling, routes, navigation, footer, or animation changes. All anchor IDs (`scope`, `exclusions`, `boundaries`, `liability`) preserved.

### Files Touched

1. **`src/pages/VerificationDisclaimer.tsx`** — hero description, purpose statement, all four section titles/intros/clauses, closing statement. Return link preserved.

*Footer: already aligned from prior passes — no change.*

### Content Changes

**`heroDescription`**
→ `The formal boundaries, jurisdictional limits, and liability framework governing Source Standard verification status and registry records.`

**`PageMeta`** — title `Verification Disclaimer`, description = heroDescription.

**`BriefingHero`**
- `category`: `Verification Disclaimer` (unchanged)
- `title`: `Verification Disclaimer` (unchanged)
- `statement`: heroDescription

**Purpose section** — replace H2 to `What Source Standard verification means`. Replace two paragraphs:
1. `Source Standard verification is a public-reference finding based on reviewed records within a defined scope and at a defined point in time.`
2. `This page explains what verification status does and does not establish, the limits of the framework, and the boundaries under which registry information should be interpreted.`

**§01 Scope**
- Title: `Record Review Scope` (replaces "Administrative Attestation Scope")
- Intro: `What verification status is designed to reflect.`
- Lede: `Source Standard verification reflects whether a vendor's submitted documentation, pharmacy relationship evidence, public records, and operating information support its stated sourcing claim within the declared review scope.`
- `SCOPE` array (4 items):
  - 01 `Documented identity` / `Review of business registration, operating identity, vendor type, and related credentials tied to the entity under review.`
  - 02 `Public-record consistency` / `Cross-reference of relevant licensing, registration, and public records against available federal and state sources at a fixed point in time.`
  - 03 `Upstream sourcing evidence` / `Review of disclosed pharmacy relationships, upstream facility references, and supporting documentation submitted within the review process.`
  - 04 `Record basis` / `The registry reflects Source Standard's review of available records and does not replace, supersede, or guarantee the accuracy of the original third-party records on which the review depends.`

**§02 Exclusions**
- Title: `Matters Outside the Review Scope` (replaces "Matters Outside the Scope of Attestation")
- Intro: `What verification status does not establish.`
- `EXCLUSIONS` array (4 items):
  - 01 `Clinical outcomes` / `No finding is made regarding the medical result for any individual patient.`
  - 02 `Product suitability` / `The framework does not evaluate whether any formulation, therapy, vendor, or protocol is appropriate for a specific person.`
  - 03 `Safety and efficacy` / `Source Standard verification does not certify product safety, sterility, potency, quality, treatment effectiveness, or therapeutic efficacy.`
  - 04 `Future conduct` / `A published status reflects the records reviewed at a fixed point in time and is not a warranty of future performance, future documentation accuracy, or future regulatory compliance.`

**§03 Boundaries**
- Title: `Regulatory & Professional Boundaries` (unchanged)
- Intro: `What Source Standard is not.`
- `BOUNDARIES` array (4 items):
  - 01 `Not a regulator` / `Source Standard is a private public-reference and verification framework. It does not hold governmental enforcement authority.`
  - 02 `Not a clinical practice` / `The organization does not diagnose, prescribe, dispense, treat patients, or practice medicine or pharmacy.`
  - 03 `Not a manufacturer` / `Source Standard does not compound, repackage, distribute, handle, store, or supply pharmaceutical products.`
  - 04 `Not a guarantor` / `Verified status is a documentation-based registry status. It is not a warranty, indemnity, insurance-like guarantee, product approval, vendor approval, or clinical recommendation.`

**§04 Liability**
- Title: `Limitation of Liability` (unchanged)
- Intro: `How registry information should be relied upon.`
- `LIABILITY` array (3 items):
  - 01 `User discretion` / `The registry is a public reference tool. Reliance on any published status or registry record is at the user's discretion.`
  - 02 `Professional consultation` / `Users should consult licensed clinicians for medical matters and appropriate regulatory authorities for regulatory or legal matters.`
  - 03 `Liability boundary` / `Registry access and use are subject to the framework's published terms, disclaimers, and jurisdictional limits. Source Standard does not accept liability for decisions made solely on the basis of registry content.`

**Closing statement**
- H2: `Verification is a record review, not a medical guarantee.` (replaces "A determination is a record finding, not a medical guarantee.")
- Body: `The purpose of this disclaimer is to ensure that Source Standard verification status is interpreted within its actual scope. The framework exists to improve public understanding of documented sourcing claims, not to replace medical judgment, regulatory oversight, or individualized clinical decision-making.`

**Return link** — `← Return to Resource Library` (unchanged, preserved).

### Out of Scope

- All layout, components, styling, spacing, colors, animations
- Anchor IDs and routes preserved
- Footer (already aligned)
- All other pages

