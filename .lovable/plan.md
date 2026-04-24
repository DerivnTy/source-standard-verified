

## Privacy Page Copy Rewrite

Text-only changes to `src/pages/Privacy.tsx`. No layout, components, styling, routes, navigation, footer, or animation changes. All anchor IDs (`partitioning`, `collection`, `retention`, `processing`, `inquiries`) preserved.

### Files Touched

1. **`src/pages/Privacy.tsx`** — hero description, purpose statement, all five section titles/intros/clauses, closing statement.

*Footer: already aligned from prior passes — no change.*

### Content Changes

**`heroDescription`**
→ `The administrative framework governing the collection, separation, retention, and processing of public registry data and protected review materials.`

**`PageMeta`** — title `Privacy`, description = heroDescription.

**`BriefingHero`**
- `category`: `Data Governance Protocol` (unchanged)
- `title`: `Data Governance & Privacy` (unchanged)
- `statement`: heroDescription

**Purpose section ("How data is handled under the framework")** — replace with three paragraphs:
1. `Source Standard maintains a distinction between public registry information and protected review materials.`
2. `This page explains what is collected, how records are separated, how long materials may be retained, and the limits under which data may be processed.`
3. `The goal of this protocol is to preserve the integrity of the public record while limiting access to sensitive review materials that are not published as part of the registry.`

**§01 Partitioning**
- Title: `Record Partitioning` (unchanged)
- Intro: `How public registry information is separated from protected review materials.`
- `PARTITIONING` array (3 items):
  - 01 `Public registry data` / `Public registry data is limited to business identity, vendor type, therapy category, review scope, current status, status dates, and related public-reference fields published for consumer and clinician use.`
  - 02 `Protected review materials` / `Protected review materials may include licensing records, supplier invoices, certificates of analysis, submitted documentation, internal review notes, concern reports, and related supporting materials retained in the review file.`
  - 03 `Access restriction` / `Protected review materials are retained within a restricted internal environment and are not published, sold, or shared with third parties except where required by law or necessary for authorized infrastructure operations.`

**§02 Collection**
- Title: `Scope of Collection` (unchanged)
- Intro: `What categories of data may be collected under the framework.`
- `COLLECTION` array (4 items):
  - 01 `Vendor intake` / `Business credentials, operating details, sourcing records, pharmacy relationship documentation, and related materials submitted for verification or review.`
  - 02 `Monitoring data` / `Where applicable, records associated with public-record monitoring, status review, documentation updates, and related registry maintenance activity.`
  - 03 `Concern reports` / `Supporting documentation and contact details submitted through the public reporting channel.`
  - 04 `Site analytics` / `Site usage may be monitored through aggregate, non-identifying signals. Source Standard does not rely on advertising trackers or cross-site identification systems.`

**§03 Retention**
- Title: `Data Retention` (unchanged)
- Intro: `How long records are maintained under different conditions.`
- `RETENTION` array (4 items):
  - 01 `Active records` / `Protected review materials may be retained for the duration of an entity's active status in the registry and for the period reasonably necessary to administer review, renewal, record maintenance, and related compliance processes.`
  - 02 `Status history` / `Public status transitions and related public record history may be retained to preserve the integrity and continuity of the registry timeline.`
  - 03 `Withdrawn or closed submissions` / `Documentation associated with withdrawn, denied, closed, or incomplete submissions may be held for a limited administrative period before secure disposal.`
  - 04 `Secure disposal` / `Sensitive records scheduled for deletion are disposed of through documented internal procedures designed to reduce the risk of unauthorized recovery.`

**§04 Processing**
- Title: `Authorized Processing` (unchanged)
- Intro: `How data may be processed in support of the framework.`
- Body (2 paragraphs):
  1. `Data processing is limited to essential internal functions and authorized infrastructure partners operating under confidentiality and access restrictions.`
  2. `Any such partner is limited to the minimum data reasonably necessary for hosting, transactional communications, secure storage, registry operations, and privacy-respecting analytics.`

**§05 Inquiries**
- Title: `Inquiries & Requests` (unchanged)
- Intro: `How privacy-related requests may be made.`
- Body (3 paragraphs + email):
  1. `Individuals may request access to or correction of personal data held by Source Standard where applicable under law and within the limits of the framework's record-retention obligations.`
  2. `Deletion requests are reviewed in light of the organization's need to preserve legitimate administrative, legal, and historical recordkeeping obligations.`
  3. `Data Privacy Officer:` + email link `privacy@sourcestandard.org` (unchanged styling)

**Closing statement**
- H2: `Public transparency requires disciplined record handling.` (unchanged)
- Body: `The purpose of this protocol is to separate what must be published for public clarity from what must remain protected to preserve review integrity, privacy, and responsible record administration.`

### Out of Scope

- All layout, components, styling, spacing, colors, animations
- Anchor IDs and routes preserved
- Footer (already aligned)
- All other pages

