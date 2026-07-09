
# Final Launch QA — Implementation Plan

Scoped to the items you approved. No new components, no new pages, no visual redesign. Every change reuses existing tokens and existing patterns.

---

## 1 · Data reconciliation (Critical)

**Problem:** `/` shows "50 states". `/verified-vendors` shows "51 states". Same registry.

**Fix:**
- Create a single source: `src/data/registryStats.ts` exporting `{ providersIndexed: 4180, statesRepresented: <N>, facilityRecords: 120, lastUpdated: "07/09/2026" }`.
- Import into `Index.tsx`, `VerifiedVendors.tsx`, `Greenlist.tsx`. Delete inline literals.
- Verification: `bunx tsgo --noEmit`, then Playwright at 1280 to confirm both pages show the same state count and the same "records" number where displayed.

---

## 2 · Canonical page names

**Rule:** one noun per concept, everywhere the concept is *named* (header nav, footer, cross-reference cards, editorial back-link labels, breadcrumb eyebrows). Consumer-question H1s stay as-is.

**Canon:**
| Concept | Label everywhere |
|---|---|
| /verified-vendors | Vendor Registry |
| /greenlist | Facility Records |
| /how-it-works | How Verification Works |
| /medical-advisory | Advisory Board |
| /partners | Partners |
| /learn | Learn |
| /about | About |
| /contact | Contact |
| /apply | Apply for Verification |
| /report-concern | Report a Concern |

**Files touched:**
- `SiteHeader.tsx`, `SiteFooter.tsx` — confirm labels match canon.
- Cross-reference cards on Governance, Accountability, HowItWorks, Learn, About, VerificationDisclaimer — retire any remaining "Greenlist" / "Medical Advisory" as page *names* (the words remain valid as a status or a category, just not as the page identity).
- `EditorialBackLink` usages — normalize `label` prop to canon.

---

## 3 · Hero system (your rule, not mine)

**Rule:** Navy = a page you're meant to read. Light = a record you're meant to inspect.

**Navy hero (read):** Home, About, Learn, Learn/Education, Learn/Faq, Learn/News, HowItWorks, Governance, Accountability, MedicalAdvisory, Partners, Contact, ReportConcern, Terms, Privacy, VerificationDisclaimer, StatusDefinitions, ForVendors/Apply, HowToReadTheDirectory.

**Light hero (inspect):** VerifiedVendors index, Greenlist index, VendorProfile, GreenlistProfile, AdvisorProfile, LibraryEntry, and all search-result surfaces.

**Fix:**
- Extend the existing `BriefingHero` (navy variant) to Governance, Accountability, StatusDefinitions, VerificationDisclaimer, Terms, Privacy, Apply, Contact, ReportConcern — pages that currently render on a light background.
- The `Reference` metadata card that currently appears on Governance and Apply moves *inside* the navy hero as a right-column card (white surface, 1px hairline, existing typography). Only pages with a real `SS-…` doc ID keep the card. Do not fabricate IDs.
- Remove the light-hero header block from the affected pages once `BriefingHero` is in place.

**Verification:** Playwright at 1280 and 390 for each converted page — confirm hero, eyebrow, subtitle, and reference card (where present) render without layout shift.

---

## 4 · Eyebrow (kicker) system

**Rule:** one component, one casing. Uppercase mono tracked (`text-xs tracking-[0.14em] uppercase font-mono`), single dot separator (` · `) when two parts. Pages without a category simply omit the eyebrow.

**Fix:**
- Consolidate on the existing `POLICY · TERMS OF USE` style used by Terms / Privacy / VerificationDisclaimer / StatusDefinitions.
- Replace sentence-case eyebrows on Governance ("Governance & oversight"), Apply ("Vendor onboarding"), Contact ("Get in touch"), Accountability ("GOVERNANCE · COMPLIANCE" — already fine, verify), MedicalAdvisory (add "GOVERNANCE · ADVISORY BOARD").
- About, Partners, HowItWorks, Learn, Education, Home: omit eyebrow (they open with the H1 directly).

---

## 5 · Homepage hero spacing

**Problem:** ~250–300px of empty navy below the stats block before the "Contents" strip.

**Fix:** In `Index.tsx`, reduce the hero section's `paddingBottom` to `64px` desktop / `48px` mobile, matching the editorial rhythm on About and HowItWorks. Nothing else changes.

---

## 6 · 404 wrapped in SiteLayout

**Fix:** In `App.tsx` (or wherever routing lives), ensure the catch-all `<NotFound />` renders inside the same `<SiteLayout>` used by all other routes. Keep the existing "Page not found" card and "Return Home" link inside.

---

## 7 · Hero subtitle orphans (balanced wrapping)

**Fix:** In `BriefingHero.tsx` (and any hero subtitle rendering), apply `style={{ textWrap: "balance" }}` and cap `max-width` at `52ch` on the subtitle paragraph. Verify no single-word last line on Home, About, Learn, Education, HowItWorks, MedicalAdvisory at both 1280 and 390.

---

## 8 · Homepage / VerifiedVendors subtitle canon

**Fix:** Choose one canonical sentence and use it on both:

> "Search the Source Standard Registry to see whether your provider has been independently verified and to better understand their peptide sourcing transparency."

Remove the divergent Home variant.

---

## 9 · Footer "Begin Verification →"

**Fix:** Remove the arrow. Let it sit as a peer link in the Registry column, matching every other footer link's weight and casing. (You already have the header `APPLY FOR VERIFICATION` pill for the CTA.)

---

## 10 · Microcopy consistency sweep

**Rule set (one definition per term, used consistently):**

| Term | Meaning | Do not use for |
|---|---|---|
| **Provider** | The clinic, telehealth company, or prescriber a consumer chooses. | Pharmacies, facilities, manufacturers. |
| **Vendor** | The registered entity in the Vendor Registry (same as provider, in the registry context). | Facilities. |
| **Facility** | A 503A pharmacy, 503B outsourcing facility, or manufacturer in the Facility Records. | Providers, vendors. |
| **Pharmacy** | A 503A compounding pharmacy specifically. | 503B facilities, manufacturers. |
| **Verification** | The Source Standard review process. | Individual clinical acts. |
| **Verified** | The public status assigned after review. | Any looser sense of "checked". |
| **Verification status** | The named classification (Verified / Unverified / etc.). | Never shortened to just "status" mid-sentence. |
| **Record** | A public entry in the registry (provider record, facility record). | Internal review materials. |
| **Listing** | Not used. Retire in favor of **record**. | — |

**Execution:**
- One pass across `src/pages/**` and `src/components/**` searching each term.
- Replace "listing" → "record" everywhere it appears in public copy.
- Where "status" appears without a qualifier, promote to "verification status" unless the context is a facility (then "facility status").
- Where "pharmacy" is used generically to mean any facility, replace with "facility".
- Where "vendor" and "provider" are used interchangeably within the same paragraph, pick the one that matches the surrounding page (Vendor Registry surfaces → "vendor"; consumer-facing prose → "provider").
- No sentence rewriting for style. Terminology swaps only.

**Verification:** ripgrep each term after the sweep and spot-check the top hits per page.

---

## Explicitly not doing

- Continue Exploring block on Learn — keep as-is.
- Greenlisted status card parity with Verified Vendors — keep as-is.
- Filter pill height normalization — not launch-blocking.
- Governance notice divider — not launch-blocking.

---

## Implementation order

1. Data reconciliation (#1)
2. 404 wrap (#6)
3. Homepage hero spacing (#5)
4. Hero subtitle balancing (#7)
5. Home ↔ Vendor Registry subtitle canon (#8)
6. Canonical page names sweep (#2)
7. Eyebrow normalization (#4)
8. Hero system migration to navy for the "read" pages (#3)
9. Footer "Begin Verification" (#9)
10. Microcopy sweep (#10)

Each step lands independently. Between steps 3 and 8 I'll run `bunx tsgo --noEmit` and a Playwright pass at 1280 + 390 on every page touched by that step.
