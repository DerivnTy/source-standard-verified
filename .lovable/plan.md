

## Site Architecture Build-Out: Full Page Structure

This pass establishes the complete page architecture for SourceStandard.org. Every page listed below will exist as a real route with a placeholder `RecordHeader` and a "Section in development" notice in the same institutional style as the rest of the site. No content is being written yet — this is the structural pass so subsequent passes can fill pages one at a time.

---

### 1. Routes to add

All new routes mounted inside the existing `<SiteLayout />` in `src/App.tsx`.

**Primary (linked from main nav):**
- `/` — Home (exists)
- `/greenlist` — Greenlist (exists)
- `/verified-vendors` — Verified Vendors (exists)
- `/how-it-works` — How It Works (exists)
- `/for-vendors` — For Vendors (exists)
- `/education` — Education (exists)
- `/about` — About (exists)
- `/contact` — Contact (exists)
- `/apply` — Apply for Verification (exists, also surfaced as header button)

**Support / secondary (linked from footer):**
- `/accountability` — Accountability & Enforcement *(new)*
- `/medical-advisory` — Medical Advisory Board *(new)*
- `/faq` — FAQ *(new)*
- `/report-a-concern` — Report a Concern *(new)*
- `/status-definitions` — Status Definitions *(new)*
- `/templates/vendor-profile` — Vendor Profile Template *(new)*
- `/templates/greenlist-entry` — Greenlist Entry Template *(new)*
- `/privacy` — Privacy Policy *(new)*
- `/terms` — Terms of Use *(new)*
- `/verification-disclaimer` — Verification Disclaimer / Scope of Review *(new)*
- `/governance` — Governance & Oversight (exists, kept; cross-links from Medical Advisory)

---

### 2. Placeholder page pattern

Each new page is a small, consistent React component — not lorem ipsum, not "coming soon" marketing copy. Same institutional language already used in empty states elsewhere on the site.

```text
┌──────────────────────────────────────────────────────────┐
│ RecordHeader                                             │
│   metadata: DOC SS-{CODE}-2026.01 · STATUS: DRAFT        │
│             UPDATED 04/20/26 · JURISDICTION FL/US        │
│   eyebrow:  {SECTION CATEGORY}                           │
│   title:    {Page title}                                 │
│   lead:     {One-line declarative purpose statement}     │
├──────────────────────────────────────────────────────────┤
│ §1 Section in development                                │
│ Content for this reference page is being prepared and    │
│ will publish under document version 2026.01.             │
│                                                          │
│ Cite as: Source Standard {Page}, SS-{CODE}-2026.01.      │
└──────────────────────────────────────────────────────────┘
```

Doc IDs assigned per page so each placeholder already reads as a real registry record:

| Page | Doc ID |
|------|--------|
| Accountability & Enforcement | `SS-ENFORCE-2026.01` |
| Medical Advisory Board | `SS-MAB-2026.01` |
| FAQ | `SS-FAQ-2026.01` |
| Report a Concern | `SS-REPORT-2026.01` |
| Status Definitions | `SS-STATUS-2026.01` |
| Vendor Profile Template | `SS-TPL-VENDOR-2026.01` |
| Greenlist Entry Template | `SS-TPL-GREENLIST-2026.01` |
| Privacy Policy | `SS-PRIVACY-2026.01` |
| Terms of Use | `SS-TERMS-2026.01` |
| Verification Disclaimer | `SS-DISCLAIMER-2026.01` |

---

### 3. Navigation updates

**`SiteHeader.tsx`** — main nav stays at the current 7 items (Home, Greenlist, Verified Vendors, How It Works, For Vendors, Education, About). Contact moves to footer-prominent only to keep the top nav under 8 items; the **Apply for Verification** button remains in the header. (Adding Contact to the top would push the bar to 8 items and crowd the Apply button at this viewport.)

**`SiteFooter.tsx`** — restructured into 5 columns so every support page has a visible home:

```text
Registry              Standards              Organization          Reference             Legal
─────────             ─────────              ────────────          ─────────             ─────
Greenlist             How It Works           About                 FAQ                   Privacy
Verified Vendors      For Vendors            Medical Advisory      Status Definitions    Terms
Apply                 Accountability         Governance            Vendor Profile Tpl.   Verification
Report a Concern      Education              Contact               Greenlist Entry Tpl.   Disclaimer
```

The standing disclaimer line and version metadata at the footer base remain unchanged.

---

### 4. Files touched

**Edit:**
- `src/App.tsx` — register 10 new routes
- `src/components/SiteFooter.tsx` — restructure to 5-column footer with full link inventory
- `src/components/SiteHeader.tsx` — minor: ensure no nav growth, no copy change

**Create (10 placeholder pages, all using `RecordHeader` + a single "in development" section):**
- `src/pages/Accountability.tsx`
- `src/pages/MedicalAdvisory.tsx`
- `src/pages/FAQ.tsx`
- `src/pages/ReportConcern.tsx`
- `src/pages/StatusDefinitions.tsx`
- `src/pages/VendorProfileTemplate.tsx`
- `src/pages/GreenlistEntryTemplate.tsx`
- `src/pages/Privacy.tsx`
- `src/pages/Terms.tsx`
- `src/pages/VerificationDisclaimer.tsx`

**Optional small shared component (not required but reduces duplication):**
- `src/components/PlaceholderSection.tsx` — renders the consistent "§1 Section in development / Cite as…" block used by all 10 new pages.

---

### Outcome

After this pass, every page in the final site architecture exists as a real route with a real institutional placeholder. The footer becomes the navigable index of the full standards platform. Subsequent passes can fill one page at a time without any further routing or navigation work — the architecture is locked in.

