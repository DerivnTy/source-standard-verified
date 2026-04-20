

## Philosophy Pass: From "Presenting a Standard" → "Operating as a Public Reference"

Keep all prior structural and visual direction. This pass tightens **copy, framing, and a few structural additions** so the site reads as an already-established public information system — not an organization explaining itself.

The principle driving every change: **remove persuasion, add reference.** Replace explanatory/sales-adjacent language with declarative, informational, registry-style statements. Add a visible medical/standards authority layer so weight is shown, not claimed.

---

### 1. Homepage (`Index.tsx`) — reframe as a reference entry point

**Hero copy rewrite (keep layout, tighten voice):**
- Eyebrow: `PUBLIC REFERENCE · VERIFICATION FRAMEWORK`
- Headline: `Source Standard.` followed by a shorter declarative line — *"The public reference for vendor documentation in peptide, TRT, and hormone optimization."*
- Subparagraph: replace the current explanatory paragraph with a 2-sentence reference statement: what the registry contains, who maintains it, and where verification authority is anchored. No "we help…" / "we exist to…" phrasing.
- CTAs: relabel — `View the Registry` (primary) and `Verification Process` (secondary). Remove "Apply" from the hero entirely; it lives in the header. The hero should read as informational, not transactional.
- Supporting line: replace marketing tagline with a reference line — *"Maintained in Tampa, FL · Anchored to public FDA, PCAB, NSF, and USP records."*

**New section: §1 — Authority Anchors** (replaces "Operating Philosophy" as the first section)
- Three numbered rows in the same hairline-divider style:
  - `01 / Medical Oversight` — physicians and licensed clinicians review framework criteria.
  - `02 / Public Source Anchoring` — every standard maps to a publicly citable upstream record (FDA, PCAB, NSF, USP, state licensure).
  - `03 / Documentation Custody` — verifications reference records vendors already maintain; no investigative claims, no proprietary scoring.
- This section makes the authority structure visible without a single sentence of "trust us."

**Operating Philosophy** becomes §2, copy tightened to declarative statements (drop "Authority is expressed through documentation, not assertion." headline — too thesis-like; replace with *"Framework principles."*).

**Lifecycle** stays as §3, copy unchanged structurally, language tightened to procedural verbs only.

**Greenlist preview** stays as §4.

**Verified Vendors preview** stays as §5.

**Replace the final CTA strip** with a §6 **Public Use** block — three short reference items in the same row format:
- `For consumers` — *"Look up a vendor. Read the criteria they were verified against."*
- `For vendors` — *"Submission requirements and process reference."*
- `For clinicians & partners` — *"Framework documentation and citation guidelines."*

This removes the "Apply now" sales close from the homepage and replaces it with a public-utility directory.

---

### 2. New page: `/governance` (Medical & Standards Oversight)

A short institutional page — not a team/about page, an **authority disclosure page**.

- `RecordHeader` with doc ID `SS-GOV-2026.01`.
- Sections:
  - **Medical Advisory** — describes the role of physician oversight in framework criteria. Placeholder roster table with columns `Name · Credential · Role · Jurisdiction` and an honest note: *"Initial advisory roster published Q1 2026."* (Same pattern as Verified Vendors empty state — intentional, not unfinished.)
  - **Standards Authorities Referenced** — table of upstream bodies the framework anchors to (FDA, PCAB, NSF, USP, State Boards of Pharmacy) with their public URLs and what Source Standard references from each.
  - **Conflict of Interest Policy** — short declarative paragraph: Source Standard does not manufacture, distribute, prescribe, or dispense.
- Add `/governance` to the main nav between **About** and **Apply** button, **or** under About in the footer "Organization" column. (Recommend footer + a link from About; the top nav is already 7 items.)

---

### 3. Education (`Education.tsx`) — reposition as the public knowledge layer

- Header copy reframed: *"Public reference material on peptide therapy, TRT, hormone optimization, sourcing, storage, and consumer due diligence."* Drop any "learn more" / "our blog" framing.
- Expand category index to match the user's earlier list explicitly:
  - `REF-100 series` Understanding 503B Facilities
  - `REF-200` How to Read a Certificate of Analysis
  - `REF-300` Licensing & Registration Basics
  - `REF-400` Vendor Verification Standards
  - `REF-500` Sourcing Documentation
  - `REF-600` Consumer Due Diligence
  - `REF-700` Storage, Stability & Shelf Life
  - `REF-800` Risks of Unverified Sources
- Stub entries continue to use `Forthcoming` / `Publishing 2026` status. Add a `Citation` column so each entry visually reads like a library record, not a blog card.
- Add a top reference line: *"Educational material is informational only and is not medical advice."* — institutional disclaimer, in `.meta` style.

---

### 4. About (`About.tsx`) — strip self-explanation

- Remove any sentence that begins with "We exist to…", "Our mission is…", "We believe…".
- Replace with declarative role statements: *"Source Standard is a documentation-first verification framework. It is maintained in Tampa, FL. It is not a clinic, pharmacy, laboratory, or enforcement body."*
- Add a short **Role boundaries** subsection (what the organization does / does not do) as a two-column table — registry-style, not narrative.
- Link to `/governance` for medical oversight detail rather than describing physicians inline.

---

### 5. For Vendors (`ForVendors.tsx`) — reposition as a reference, not a pitch

- Rename page header from any "Why verification matters" framing to **Vendor Reference**.
- Drop persuasive value-prop copy ("Stand out", "Build trust with customers", etc., if present).
- Keep the numbered submission standard and sticky checklist; reframe the intro as a one-paragraph procedural statement: *"This page documents the submission requirements, evidence categories, and review timeline for vendors seeking verification under SS-FRAMEWORK-2026.01."*
- Move the "Apply" CTA to a single hairline strip at the bottom — not a hero, not repeated.

---

### 6. How It Works (`HowItWorks.tsx`) — minor copy pass

- Change page lead from explanatory ("Here's how our process works…") to declarative ("Procedural reference for the six-step verification lifecycle.").
- Add a small `Scope` metadata row at top: *Applies to: all vendors under SS-FRAMEWORK-2026.01.*

---

### 7. Verified Vendors (`VerifiedVendors.tsx`) — reinforce reference framing

- Header sublead rewritten as: *"Public registry of vendors whose documentation has been reviewed under SS-FRAMEWORK-2026.01. Listings include the review identifier, scope of documentation reviewed, and verification expiry."*
- Add a permanent **How to read this registry** strip above the table — 4 short columns explaining what each column means (Review ID format, Scope, Status markers, Expiry). Turns the empty state into a usable reference even before any vendors are listed.

---

### 8. Greenlist (`Greenlist.tsx`) — already close, two additions

- Add a top **Citation** block: *"Cite as: Source Standard Greenlist, SS-GREENLIST-2026.01. Last updated 04/20/2026."* This is the single most "this is a real reference" signal — academic/standards bodies always show citation format.
- Drop any remaining "Live Database" marketing language; replace with `STATUS: ACTIVE · VERSION 2026.01`.

---

### 9. Header / Footer — small reframing

- `SiteHeader` utility strip right side: change from `EST. 2026 · TAMPA, FL · DOC v.2026.01` to `PUBLIC REFERENCE · DOC v.2026.01 · TAMPA, FL`. Leads with function, not founding.
- `SiteFooter`: under the **Organization** column add `Governance & Oversight → /governance`. Under **Legal** add a short standing statement: *"Source Standard is an information and verification framework. It does not provide medical advice, prescribe, dispense, or endorse products."*

---

### 10. Global copy rules (applied across all edits above)

A short style guide enforced during this pass:
- No first-person plural framing ("we help / we believe / we exist") — replace with role-based declaratives ("Source Standard maintains…", "The framework references…").
- No persuasive adjectives (*trusted, leading, premier, robust, comprehensive*).
- No "learn more" / "discover" / "join" language.
- Statuses, IDs, and timestamps wherever a section makes a claim — claims become records.
- Disclaimers stated plainly, not buried.

---

### Files touched

- **Edit:** `src/pages/Index.tsx`, `src/pages/About.tsx`, `src/pages/Education.tsx`, `src/pages/ForVendors.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/VerifiedVendors.tsx`, `src/pages/Greenlist.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, `src/App.tsx` (route).
- **Create:** `src/pages/Governance.tsx`, `src/data/authorities.ts` (small dataset for the standards authorities table).

### Outcome

After this pass, no page on the site contains a sentence asking the visitor to trust Source Standard. Authority is shown three ways: a visible medical/standards oversight layer (`/governance` + homepage §1 Authority Anchors), citation-style framing on every reference page, and copy that reads like an institutional record rather than a company introduction. A consumer arriving from a vendor's "Verified by Source Standard" claim immediately sees a public reference system, not a brand.

