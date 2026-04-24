

## Status Definitions Page Copy Rewrite

Text-only changes to `src/pages/StatusDefinitions.tsx`. No layout, components, styling, routes, navigation, footer, or animation changes. All anchor IDs (`purpose`, `statuses`, `lifecycle`, `related`) preserved.

### Files Touched

1. **`src/pages/StatusDefinitions.tsx`** — hero, purpose section, statuses list (now 8 entries), lifecycle steps, related documents labels, sidebar copy, closing statement.

*Footer: already aligned from prior passes — no change.*

### Content Changes

**`PageMeta`** — title `Status Definitions`, description = heroDescription below.

**`heroDescription`**
→ `Public statuses assigned to records within the Source Standard registry. Each status reflects the state of the record at the time of last update and may change through review, renewal, disclosure, or record correction.`

**`BriefingHero`**
- `category`: `Registry Standards` (unchanged)
- `title`: `Status Definitions` (replaces "Glossary of Regulatory Standings")
- `statement`: heroDescription

**§1 Purpose section** — H2 stays `Why these statuses exist`. Replace two paragraphs:
1. `Status labels help consumers, clinicians, and listed entities interpret registry records consistently without needing to review the underlying documentation file.`
2. `Each status has a defined public meaning and a defined limit. A status indicates the current documentation review state. It does not imply clinical recommendation, vendor approval, product approval, or regulatory endorsement.`

**§2 Statuses sidebar**
- H2: `Public Statuses` (replaces "Controlled standings")
- Sidebar lede: `Each status has a public meaning, a limitation, and a defined path for assignment or revision.`

**`STATUSES` array** — replace with 8 entries (was 7):

- 01 `Verified` — definition: `Documentation review is complete for the defined scope. The published record reflects the documentation, public records, and pharmacy relationship evidence reviewed at the time of publication.` / meaning: `Submitted documentation, public records, and sourcing evidence supported the stated vendor claim within the reviewed scope.` / notImply: `It does not imply vendor approval, product approval, clinical recommendation, treatment effectiveness, product safety, or outcome guarantee.` / issued: `Assigned after completion of documentation review, pharmacy relationship review, chain-of-custody review, and scope confirmation.` / revised: `Revised after renewal lapse, material disclosure event, documentation expiration, unresolved discrepancy, or reopening of the review file.`

- 02 `Pending Review` — definition: `An application or review request has been received, but documentation review has not yet begun.` / meaning: `The entity has entered the Source Standard review pipeline.` / notImply: `It does not imply that documentation has been reviewed or that any sourcing claim has been supported.` / issued: `Assigned when an application, request, or submission package is received and acknowledged.` / revised: `Revised when documentation review begins, the request is withdrawn, or the submission is closed.`

- 03 `Under Review` — definition: `An active documentation review is in progress. Records, public data, sourcing claims, and submitted materials are being evaluated against the Source Standard framework.` / meaning: `The review file is open and being evaluated.` / notImply: `It does not imply any conclusion about the vendor, sourcing claim, documentation quality, or compliance posture.` / issued: `Assigned at the start of documentation review or when a previously published record is reopened.` / revised: `Revised to Verified, Unverified, Suspended, or Removed when the current review cycle concludes.`

- 04 `Unverified` *(new)* — definition: `No sufficient documentation has been reviewed to support the stated sourcing claim within the Source Standard framework.` / meaning: `The registry does not currently contain sufficient reviewed documentation to support the vendor's stated sourcing claim.` / notImply: `It does not imply that the vendor is unsafe, unlawful, fraudulent, or clinically inappropriate.` / issued: `Assigned when a vendor record exists but no sufficient documentation review is on file.` / revised: `Revised when the vendor enters review, submits documentation, withdraws, or a status update is required.`

- 05 `Suspended` — definition: `A previously published status is temporarily inactive pending additional documentation, renewal, or review of an unresolved record issue.` / meaning: `The record cannot currently support continuation of the prior published status.` / notImply: `It does not constitute a finding of misconduct, fraud, medical risk, or regulatory enforcement action.` / issued: `Assigned after missed renewal, non-response to documentation requests, expired documentation, or unresolved material discrepancy.` / revised: `Revised back to Verified if resolved, to Unverified if documentation no longer supports verification, or to Removed if the record is closed.`

- 06 `Removed` — definition: `The record has been removed from active registry display or active verification status due to failed review, expired documentation, unresolved discrepancy, voluntary withdrawal, or closure of the review file.` / meaning: `The entity is no longer maintained as an active verified or reviewable record under the Source Standard framework.` / notImply: `It does not imply a specific finding of misconduct unless a public note states a documented record basis.` / issued: `Assigned when the review file is closed, the entity withdraws, documentation cannot be reconciled, renewal remains unresolved, or a material discrepancy is not resolved.` / revised: `Reinstatement requires a new submission and a new review cycle.`

- 07 `Recognized Upstream Record` *(replaces "Greenlisted")* — definition: `An upstream 503A pharmacy, 503B outsourcing facility, or other facility record used as a reference point during vendor sourcing review.` / meaning: `The upstream record may be used as a reference point when reviewing vendor sourcing documentation.` / notImply: `It does not imply endorsement, affiliation, vendor verification, product approval, product safety, or certification of every product associated with that facility.` / issued: `Assigned when facility identity, public registration category, license status, or review relevance is recorded within the Upstream Registry.` / revised: `Revised when public registration status, license status, review relevance, or Source Standard classification changes.`

- 08 `Not Listed` — definition: `No public Source Standard record exists for the entity.` / meaning: `The entity is not currently maintained as a public record within the Source Standard registry.` / notImply: `It does not imply that the entity is unsafe, unlawful, illegitimate, non-compliant, or clinically inappropriate. It reflects only the absence of a Source Standard record.` / issued: `This is the default condition for any entity that does not have a registry record.` / revised: `Revised only if the entity enters the registry, submits documentation, or is added as a public-reference record.`

**§3 Lifecycle**
- Sidebar lede: `No status is permanent. Public records may move through review, renewal, correction, suspension, removal, or reinstatement over time.`
- `LIFECYCLE` array:
  - 01 `Application received → Pending Review`
  - 02 `Documentation review begins → Under Review`
  - 03 `Review concludes → Verified or Unverified`
  - 04 `Renewal interval reached → Under Review`
  - 05 `Disclosure event or material change → Under Review or Suspended`
  - 06 `Resolution → Verified, Unverified, Suspended, or Removed`

**§4 Related Documents**
- Sidebar lede: `Further reading on the framework, review process, and operating boundaries.`
- `RELATED` array (routes preserved):
  - `/how-it-works` → `Verification Protocol`
  - `/accountability` → `Compliance & Operating Boundaries`
  - `/verification-disclaimer` → `Verification Disclaimer`

**Closing statement** — H2 unchanged: `A shared public language for the registry.`
- Body: `The purpose of these status definitions is to ensure that public records can be interpreted consistently, without overstatement and without requiring users to infer more than the record supports.`

### Out of Scope

- All layout, components, styling, spacing, colors, animations
- Anchor IDs (`purpose`, `statuses`, `lifecycle`, `related`) preserved
- Footer (already aligned)
- All other pages

