

## Architectural Correction: From "Startup Defining Itself" to "Established Public Reference Organization"

This plan re-sequences the site, re-anchors the homepage, and elevates the Medical Advisory layer so every page reads as a section *within* an existing institution rather than a pitch for one.

---

### 1. Re-sequence the global navigation (outside-in hierarchy)

Reorder the primary nav and footer to match the stated hierarchy of importance: public authority → medical authority → vendor registry → source registry → education → process → enforcement → vendor participation.

**New top nav order:**
`Verified Vendors` · `Greenlist` · `Medical Advisory` · `Education` · `How it works` · `About`

(Move "Medical Advisory" up from the footer area into the primary nav as a peer of the registries. Demote "How it works" — it's process depth, not a top-layer entry point. Drop "Home" label; logo handles it.)

**Header utility strip** (already present): keep, but standardize wording to *"Public reference · Standard SS-FRAMEWORK-2026.01 · Active"* on every page so the institutional frame is constant.

**Footer column reorder:** `Registry` → `Medical & Governance` (merge medical advisory + governance + accountability) → `Standards & Process` → `Reference & Templates` → `Legal`. Promotes oversight to the second column instead of burying it.

---

### 2. Rebuild the homepage around the corrected sequence

The current homepage opens with a hero pitch, then explains "How Source Standard is anchored" (still a self-justification frame). Replace with sections that read as *entry points into an existing system*.

**New homepage section order:**

```text
§0  Standing strip          Doc ID, status, version, jurisdiction (already exists)
§1  Public statement        One short institutional sentence — what this is, in
                            public terms. No "we are building." Present tense.
§2  Public lookups          Two equal-weight panels:
                              • Look up a vendor   → Verified Vendors registry
                              • Look up a source   → Greenlist
                            This is what the public comes here to do.
§3  Medical authority       Medical Advisory Board panel: roster summary,
                            physician oversight statement, link to MAB page.
                            Treated as a foundational layer, not a footnote.
§4  The two registries      Brief structural explanation of Greenlist (sources)
                            and Verified Vendors (vendors verified against them).
§5  Standards anchoring     FDA · PCAB · NSF · USP reference row + governance link.
§6  Education reference     Library preview (existing, kept).
§7  Process & accountability  Compact links into How it works, Accountability,
                              Status definitions — the "deeper if you want it" layer.
§8  For vendors             Last, not first. Vendor participation is a consequence
                            of the standard, not the purpose of the site.
```

Rationale: the user enters the system → sees what they can check → sees the medical authority behind it → sees the structure → can go deeper. No "here is what we're trying to be."

---

### 3. Standardize the "established system" interface chrome

Apply consistent institutional elements site-wide so structure does the trust work, not copy.

- **Document metadata bar** (`MetadataBar`) at the top of every content page: Doc ID, Version, Status, Updated, Jurisdiction. Already exists on several pages — extend to the remaining ones (Education, About, Apply, Contact, ForVendors, FAQ).
- **Section numbering** (§1, §2, …) used consistently across pages, not just the homepage.
- **"Read deeper" panel** at the bottom of every page (pattern already used on MedicalAdvisory and VerifiedVendors) linking laterally into the system. Standardize and apply to all pages.
- **Status pill conventions**: ■ Active / ■ Pending / ■ Expired / ■ Draft, used identically wherever status appears.
- **Reference IDs** on education entries (REF-###), registry rows (SS-YYYY-#####), and framework documents (SS-DOC-YYYY.##) — already partially in place; audit for consistency.

---

### 4. Elevate Medical Advisory as a foundational layer

- Add MAB to the primary nav (see §1).
- Add a Medical Advisory panel as homepage §3 (above the registry/model explanation).
- Add a small "Reviewed under Medical Advisory Board · SS-MAB-2026.01" line to the document metadata of every framework / registry / standards page (Greenlist, Verified Vendors, How it works, Status definitions, Accountability).
- Footer: move Medical Advisory into the second column (Medical & Governance), not the Organization column.

---

### 5. Tone & copy adjustments (architecture-driven, not a rewrite)

Page intros across the site should follow this template:

> **[Institutional title]**
> *One sentence describing what this page is in the public system.* Not what Source Standard "does" or "believes" — what this page *is*.

Examples of the shift (copy will be written page-by-page after this architectural pass):

- Homepage hero: from *"The public reference for verifying vendors…"* (already close) → keep, but remove any forward-looking "we will" language elsewhere.
- About: from "who we are / what we're building" → "Organizational reference. Mandate, jurisdiction, governance structure, founding record."
- How it works: from explainer → "Procedural reference for the verification framework SS-FRAMEWORK-2026.01."
- For vendors: from sales-adjacent → "Participation reference for vendors seeking listing under the standard."

No marketing verbs ("discover," "unlock," "join"). Present-tense institutional language.

---

### 6. Page-level depth gradient

Every major page restructured to follow: **public summary → structured subsections → procedural / legal depth at the bottom.**

- Top: institutional title + one-line public purpose + metadata bar.
- Middle: structured subsections (numbered, with reference panels).
- Bottom: procedural detail, definitions, citations, "Read deeper" lateral links.

Pages to restructure under this pattern in the implementation pass: `About`, `HowItWorks`, `Greenlist`, `VerifiedVendors`, `ForVendors`, `Education`, `Governance`, `Accountability`, `MedicalAdvisory`, `StatusDefinitions`. (Templates, Privacy, Terms, Disclaimer already match the pattern.)

---

### Files this will touch

- `src/components/SiteHeader.tsx` — nav reorder, MAB promotion, utility strip wording.
- `src/components/SiteFooter.tsx` — column reorder, Medical & Governance grouping.
- `src/pages/Index.tsx` — full section reorder, add MAB panel as §3, dual-lookup §2, demote vendor section to last.
- `src/components/MetadataBar.tsx` / `RecordHeader.tsx` — add optional "Reviewed under MAB" slot.
- All page files listed in §6 — apply standard header + metadata bar + Read-deeper footer panel; revise intro copy to institutional template.
- `src/components/PageHeader.tsx` — extend to optionally render metadata bar so non-record pages share the same chrome.

---

### What this plan deliberately does NOT do

- Does not change the visual design system, typography, or color tokens (those were finalized in prior passes).
- Does not write final page copy — that is the next, page-by-page step the user has already scoped.
- Does not add new routes or remove existing pages — the architecture set in the previous pass stays; this pass re-weights and re-sequences it.

After approval, implementation will proceed in this order: (1) nav + footer reorder, (2) homepage rebuild, (3) chrome standardization across pages, (4) Medical Advisory elevation, (5) per-page intro template applied. Then we begin writing page content one by one as previously planned.

