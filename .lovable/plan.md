

## Homepage rewrite — Project "Clear Sight"

A copy-only pass on `src/pages/Index.tsx`. Layout, components, counters, routes, tokens, and section structure stay exactly as they are. Only the strings change. Replaces "process talk" with consumer-first language that frames the registry as a public utility.

### Section-by-section copy changes

**1. Hero (`BriefingHero`)**
- `category`: `"United States Public Registry"` → `"United States Public Peptide Registry"`
- `title`: `"The public standard for documented peptide sourcing"` → `"The United States Public Peptide Registry"`
- `statement`: → `"We verify clinical sourcing so you don't have to. Source Standard cross-references clinics and vendors against licensed pharmacy records to separate documented medical sourcing from the grey market."`
- `HeroActions` buttons: `"Access Vendor Registry"` → `"Search the Registry"`; `"Begin Verification"` → `"For Vendors: Get Verified"`

**2. The Trust Problem**
- Eyebrow: `"The trust problem"` → `"The trust problem"` (kept — broad, not redundant with new header)
- H2: → `"Branding is not documentation."`
- Body: → `"In the peptide industry, marketing claims are easy to make but difficult to prove. Most consumers are forced to rely on trust. We believe you should rely on records. We audit the supply chain to ensure what you're being sold is what's on the label."`

**3. How It Works (3-step)**
- Eyebrow: stays `"How it works"`
- Step 01 — h: `"Map the facilities."` b: `"We track every licensed 503A and 503B compounding pharmacy in the United States."`
- Step 02 — h: `"Audit the vendors."` b: `"We require clinics and online vendors to substantiate their sourcing with documented proof of these pharmacy relationships."`
- Step 03 — h: `"Publish the truth."` b: `"We list the results in a public database. If they can't prove it, they stay Unverified."`

**4. Live Registry (counters preserved)**
- Eyebrow: stays `"Live registry"`
- H2: → `"Total market visibility."`
- Add a one-line lede above the `StatRow`: `"Our database tracks the entire peptide economy in real time."`
- All six `<Stat>` counters and CTAs unchanged.

**5. What You Can Verify (registry fields)**
- Eyebrow: `"What you can verify"` → `"Registry fields"`
- H2: → `"Search. Verify. Proceed."`
- Lede: → `"Every listing in our registry provides a clear snapshot of a vendor's legitimacy."`
- `registryFields` array reduced/relabeled to the four user-specified fields:
  - `Verification status` — `"A simple red/green indicator of documented sourcing."`
  - `Fulfillment model` — `"Whether the vendor is a local clinic or an online-only platform."`
  - `Clinical focus` — `"The medical services the vendor is authorized to provide."`
  - `Upstream sources` — `"The licensed pharmacies supplying the vendor."`
- (City/state and last-review-date entries removed from this list — they remain visible on actual profile pages.)

**6. Function**
- Eyebrow: stays `"Function"`
- `whyMatters` array rewritten:
  - `For consumers` — `"Instant clarity on whether your clinic is using legal, licensed sources."`
  - `For vendors` — `"A professional seal of approval that separates you from the research-only grey market."`
  - `For doctors` — `"A clinical reference for referring patients to documented facilities."`

**7. Foundational Reference**
- Eyebrow stays.
- `basics` array re-pointed and re-titled (routes unchanged):
  - `"What 'Verified' means"` → `/library/what-source-standard-verification-actually-means`
  - `"503A vs. 503B"` → `/library/what-is-compounding`
  - `"The patient checklist"` → `/library/questions-to-ask-your-clinic`
  - Subcopy tightened to one institutional sentence each.

**8. Governance & Standards**
- No copy change. Section retained as-is.

**9. `PageMeta`**
- `title` → `"Source Standard · The United States Public Peptide Registry"`
- `description` → mirrors new hero statement.

### Out of scope

- No layout, spacing, color, font, or component changes.
- No changes to `BriefingHero`, `Stat`, `StatRow`, or any shared component.
- No route additions or data-model edits.
- No changes to any other page.

