

## Verification Protocol Page Copy Rewrite

Text-only changes to `src/pages/HowItWorks.tsx`. No layout, components, styling, routes, navigation, footer, or animation changes.

### Files Touched

1. **`src/pages/HowItWorks.tsx`** — page meta, hero, purpose statement, waypoint labels, all four section titles/intros/clauses, boundaries list, closing statement.

*Footer: already correct from prior pass — no change.*

### Content Changes

**`PageMeta`**
- Title: `Verification Protocol · Source Standard`
- Description: `An independent review framework for compounded therapy vendor sourcing claims, pharmacy relationship evidence, submitted documentation, and public-record consistency.`

**`BriefingHero`**
- `category`: `Verification Framework` (unchanged)
- `title`: `The Verification Protocol`
- `statement`: same as PageMeta description above.

**Purpose section**
- H2: `What this protocol is designed to do`
- Para 1: `The Verification Protocol defines how Source Standard reviews whether a vendor's public sourcing claims are supported by submitted documentation, pharmacy relationship evidence, licensure records, and related operating records.`
- Para 2: `It is a framework for documentation review and public-reference consistency. It is not a guarantee of product safety, treatment effectiveness, clinical quality, or regulatory compliance.`

**`WAYPOINTS`**
- 01 → `Documentation Review`
- 02 → `Ongoing Monitoring`
- 03 → `Disclosure`
- 04 → `Boundaries`

**§1 Documentation Review** (replaces "Audit", id stays `audit`)
- Section title: `Documentation Review`
- Intro: `How sourcing claims are reviewed against submitted and public records.`
- 01 `Sourcing-claim review` / `Review of the vendor's stated sourcing relationships to determine whether the available documentation supports the public claim.`
- 02 `Pharmacy record cross-reference` / `Cross-reference of cited 503A and 503B pharmacy relationships against public registration records, state licensure records, and related public filings where applicable.`
- 03 `Chain-of-custody review` / `Review of invoices, lot references, distribution records, and related documentation to determine whether the available record supports a documented sourcing trail.`
- 04 `Entity and identity review` / `Review of vendor identity, operating entity, location data, and related records to reduce inconsistency between public claims and submitted documentation.`

**§2 Ongoing Monitoring** (replaces "Surveillance", id stays `surveillance`)
- Section title: `Ongoing Monitoring`
- Intro: `How the framework reviews changes after initial documentation review.`
- 01 `Record maintenance` / `Published records may be reviewed periodically to determine whether licensing data, pharmacy relationships, and documentation remain consistent with the current status.`
- 02 `Public-record monitoring` / `Source Standard may monitor relevant public records, enforcement notices, licensure changes, and administrative updates where applicable.`
- 03 `Evidence reconciliation` / `New information may be compared against the existing vendor record to determine whether a status update, additional review, or limitation statement is required.`
- 04 `Status response` / `Where material documentation gaps or unresolved inconsistencies are identified, registry status may be updated according to Source Standard status definitions.`

**§3 Disclosure** (id `disclosure`)
- Intro: `How vendor changes are expected to be reported and reflected.`
- 01 `Change notification` / `Vendors are expected to disclose material sourcing, ownership, pharmacy relationship, or operating changes that could affect the accuracy of a published record.`
- 02 `Documentation updates` / `Updated documentation may be required when a vendor changes a pharmacy relationship, adds a therapy category, or expands the scope of a public sourcing claim.`
- 03 `Review continuity` / `Published records may be reviewed to determine whether underlying licenses, pharmacy relationships, and documentation remain consistent with the stated status.`
- 04 `Status adjustment` / `Where disclosure failures, expired documentation, or material inconsistencies are identified, registry status may be updated to reflect the current state of the record.`

**§4 Boundaries** (id `boundaries`)
- Intro: `What the framework does and does not claim.`
- `BOUNDARIES` array replaced with:
  1. `The framework reviews whether sourcing documentation and related records support the stated public claim within the reviewed scope.`
  2. `It does not provide clinical recommendations or individualized medical advice.`
  3. `It does not verify medical outcomes, treatment effectiveness, or biological response.`
  4. `It does not certify product safety, potency, sterility, or quality.`
  5. `It does not replace federal or state regulatory authority.`
  6. `It does not approve, recommend, or rank vendors.`

**Closing statement**
- H2: `Verification is a record standard.` (unchanged)
- Body: `The purpose of the Verification Protocol is to help the public interpret whether vendor sourcing claims are supported by documentation. Its role is to bring greater clarity, consistency, and accountability to a market where sourcing claims are often difficult to evaluate independently.`

### Out of Scope

- All layout, components, styling, spacing, colors, animations
- Section anchor IDs (`audit`, `surveillance`, `disclosure`, `boundaries`) preserved to avoid route/anchor breakage
- Footer (already aligned)
- All other pages

