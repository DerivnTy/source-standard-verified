

## Homepage Copy Rewrite — Source Standard (Revised)

Rewrites text content only across the homepage and footer. No layout, components, styles, spacing, or routes change — except one CTA route correction noted below.

### Files Touched

1. **`src/pages/Index.tsx`** — text strings only + one route update on the secondary hero CTA.
2. **`src/components/SiteFooter.tsx`** — column titles, link labels, legal disclaimer.

### Route Correction (Revised)

**Secondary hero CTA**
- Label: `For Vendors` → `View Verification Protocol`
- Route: `/apply` → `/protocol`
- Rationale: a button labeled "View Verification Protocol" must navigate to the protocol page, not the vendor application page. `/apply` remains reserved for vendor submission / "Begin Verification" actions only.

*Note:* If `/protocol` is not yet a registered route in `App.tsx`, the link will render but resolve to `NotFound`. Since the user explicitly directed this route, we will wire the CTA to `/protocol` as instructed; route registration is out of scope for this copy pass and can be addressed in a follow-up.

### Content Changes — Homepage (`src/pages/Index.tsx`)

**PageMeta**
- Title: `Source Standard · Independent Verification for Compounded Therapy Vendors`
- Description: `Source Standard reviews vendor sourcing claims, pharmacy relationships, and documentation trails across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapies.`

**Hero (BriefingHero)**
- `category`: `Public Reference System · United States`
- `title`: `Independent Verification for Compounded Therapy Vendors`
- `statement`: `Source Standard reviews vendor sourcing claims, pharmacy relationships, and documentation trails across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapies.`

**HeroMetrics**
- Header label: `Live Tracker` → `Live Registry`
- Unit labels: `Identified Sources` → `Identified Vendors`; `Verified` → `Verified Records`

**HeroActions**
- Primary: `Search the Registry` → `/verified-vendors` (unchanged route)
- Secondary: `View Verification Protocol` → `/protocol` (route corrected)

**HeroMeta strip**
- `Live Data` value: `${total} vendors indexed`

**§1 — Problem**
- H2: `Claims are not documentation.`
- Body: `Vendors make public sourcing claims across compounded therapy categories. Source Standard reviews those claims against submitted documentation, public records, and pharmacy relationship evidence.`
- CTA label: `View Verification Protocol` (route unchanged from current target)

**§2 — Methodology** (`howItWorks`)
1. `Map the vendors.` / `Index vendors across peptides, TRT, HRT, GLP-1, longevity compounds, and other compounded therapy categories.`
2. `Review the documentation.` / `Evaluate sourcing claims, pharmacy relationships, chain-of-custody records, and submitted evidence within a defined review scope.`
3. `Publish the status.` / `Vendor records display the current documentation status. Claims without sufficient reviewed documentation remain Unverified.`

**§3 — Registry**
- H2: `Unified market visibility.`
- Body: `The Source Standard registry tracks compounded therapy vendors in one public-reference system. Therapy category is metadata. Verification status is assigned through the same documentation framework.`
- CTAs: `Search the Registry`, `Explore Upstream Registry`

**§4 — Fields** (`registryFields`)
- H2: `Search. Review. Verify status.`
- Lead: `Each listing provides a structured snapshot of vendor documentation status and sourcing review scope.`
1. `Verification status` / `Whether documentation review is published, in progress, suspended, removed, or not on file.`
2. `Vendor type` / `Whether the vendor operates as a telehealth platform, physical clinic, hybrid provider, or online vendor.`
3. `Therapy category` / `The compounded therapy categories associated with the vendor record.`
4. `Sourcing evidence` / `The pharmacy relationships, documentation trails, and chain-of-custody records reviewed within the defined scope.`

**§5 — Function** (`whyMatters`)
1. `For consumers` / `A public record showing what has been reviewed, what remains unverified, and when the status was last updated.`
2. `For vendors` / `A documentation-based verification pathway tied to sourcing claims, pharmacy relationships, and status history.`
3. `For clinicians` / `A structured reference for reviewing whether a vendor's sourcing claims are supported by documentation.`

**§6 — Reference** (`basics`)
1. `What "Verified" means` / `The documentation standard a vendor record must meet to display Verified status.`
2. `503A and 503B sourcing` / `The licensed compounding pharmacy categories used in sourcing documentation review.`
3. `Consumer review checklist` / `The sourcing and documentation questions consumers should know before evaluating a vendor.`

**§7 — Governance** (`governanceLinks`)
1. `Advisory Board` / `Medical and procedural oversight for education, standards, and review boundaries.`
2. `Verification Protocol` / `How vendor documentation review is conducted, scoped, and recorded.`
3. `Status Definitions` / `Definitions for every public vendor status displayed in the registry.`

**§8 — Access**
- H2: `Access the Vendor Registry.`
- CTA: `Enter Registry` (unchanged)

### Footer (`SiteFooter.tsx`)

- **Registry**: `Vendor Registry`, `Upstream Registry`, `Report a Concern`, `Begin Verification →`
- **Standards**: `Verification Protocol`, `Status Definitions`, `Compliance`, `Resource Library` (added; routes to `/education`)
- **Resource Library**: unchanged (already matches)
- **Governance**: `Advisory Board`, `Terms`, `Privacy`, `Disclaimer`
- **Disclaimer**: `Source Standard is an independent public-reference and verification framework for compounded therapy vendor sourcing claims. Listings reflect documentation reviewed within a defined scope and at a defined point in time. Verification does not constitute medical advice, regulatory approval, product approval, treatment recommendation, or a guarantee of safety, efficacy, or outcome.`

### Out of Scope

- Route registration for `/protocol` (will resolve to `NotFound` until added in a follow-up).
- All layout, components, styling, spacing, colors, animations.
- All other pages.

