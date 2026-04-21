

## Home page + footer copy: Public Standards Bureau tone

A targeted copy-only pass. No structural changes, no new components, no design tokens touched. Numbering note: the user's "§2/§4/§6/§7.3" map onto the home page's existing section IDs (§2 Public lookups, §4 The two registries, §6 Education, §7.3 Accountability & enforcement card). I'm preserving those section numbers and only changing labels and prose.

### `src/pages/Index.tsx`

**Hero**
- Eyebrow: `Public reference` → `Public registry`
- Title: `Verify the source.` → `Public Registry of Compounding Standards.`
- Lead: → `An independent registry cross-referencing licensed vendors against FDA-registered compounding facilities and recognized regulatory benchmarks.`

**§2 — Public lookups**
- Card A label: `Look up a vendor` → `Vendor audit lookup`
- Card A title: `Verified Vendors registry` → `Compliance Assessment registry`
- Card A body: → `Each listing carries a Unique Audit Identifier, the categories assessed, and the date of the most recent compliance review.`
- Card B label: `Look up a source` → `Upstream source lookup`
- Card B title: `Greenlist of recognized sources` → `Registry of recognized upstream sources`
- Card B body: → `Inclusion is based on FDA registration, state licensure, and recognized accreditation records held by the upstream facility.`

**§4 — The two registries**
- H2: `Sources first. Vendors verified against them.` → `Source-First Verification. A mandatory prerequisite for every listing.`
- Lead: → `The upstream source registry documents the compounding facilities recognized under the framework. A vendor cannot be assessed until its declared sources clear that registry. Both registries are anchored to public regulatory benchmarks.`

**§6 — Education** *(rename to Reference Library)*
- Eyebrow: `§6 — Education` → `§6 — Reference library`
- H2: `Neutral, physician-reviewed reference material.` → `Administrative Reference & Compliance Library.`
- Lead: → `Procedural notes on source authentication, document discrepancies, regulatory benchmarks, and the audit categories used in compliance assessment. Informational only; not medical advice.`
- `eduPreview` items (REF titles refocused on authentication / document discrepancies):
  - `REF-101` · 503B facilities → `Authenticating an FDA 503B outsourcing facility registration.`
  - `REF-201` · Certificates of analysis → `Reading a Certificate of Analysis: structural fields and common document discrepancies.`
  - `REF-601` · Due diligence → `Source authentication: the questions an auditor asks before a listing is issued.`
  - `REF-801` · Document discrepancies → `Document discrepancies and unverifiable supply: indicators flagged during assessment.`
- CTA: `Open the library` → `Open the reference library`

**§7.3 — Accountability card** *(rename to Enforcement & Oversight; expand description to name randomized batch testing and supply-chain disclosures)*
- `procedural[2].t`: `Accountability & enforcement` → `Enforcement & Oversight`
- `procedural[2].d`: → `Vendor obligations, randomized batch testing, supply-chain disclosures, and the procedures for suspension or removal.`

**§8 — Vendor participation** *(minor tone alignment, no structural change)*
- H2: `For vendors seeking listing under the standard.` → `For vendors seeking listing under the framework.`
- Lead: → `Submission requirements, evidence categories, and review timelines are published openly. A listing is issued only after compliance assessment is complete and a Unique Audit Identifier has been assigned.`

### `src/components/SiteFooter.tsx`

Footer disclaimer paragraph (currently begins "Source Standard is a public information and verification framework…") → replace with:

> Source Standard is an independent auditing and information framework. It does not manufacture, distribute, prescribe, or dispense products, and it does not provide medical advice. A listing reflects documentation reviewed at the time of compliance assessment and does not guarantee medical outcomes, product safety, or treatment efficacy.

Top utility strip: `Standard SS-FRAMEWORK-2026.01 · Active` → unchanged. Right-side: `Reviewed under Medical Advisory Board · Updated April 20, 2026` → unchanged.

### What stays the same

All routes, all components, all data files (`greenlist`, `anchors` array keys), all section numbering, all spacing and typography tokens, the `Logo`, the `MetadataBar`, the footer column structure and links. This is a copy pass, nothing else.

