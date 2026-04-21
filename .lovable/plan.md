

## Final Architecture Lock: Three-Layer Public Authority Platform

This is the structural pass that locks the site's information architecture before per-page content build-out. The architecture, navigation, and homepage are reorganized around the **three-layer model** (immediate clarity → structured understanding → deep exact answers) and the **three authority pillars** (consumer trust reference, vendor legitimacy layer, doctor-backed institutional authority).

No new pages are added — every page from the previous architecture pass already exists. This pass reorganizes how they relate to each other so the site behaves like a layered public reference system, not a flat list of pages.

---

### 1. Information architecture — three-layer model

Every page is assigned a layer. Navigation, homepage entry points, and cross-links are built around this.

**Layer 1 — Surface (immediate clarity, top nav)**
- Home
- Verified Vendors *(the page a consumer is most likely arriving for)*
- Greenlist
- Education
- Medical Advisory Board *(promoted into top nav — this is an authority pillar, not a footer page)*

**Layer 2 — Structure (one click from surface)**
- How It Works
- For Vendors
- About
- Governance & Oversight
- Status Definitions

**Layer 3 — Depth (footer / cross-linked from Layer 2)**
- Accountability & Enforcement
- Verification Disclaimer / Scope of Review
- FAQ
- Report a Concern
- Vendor Profile Template
- Greenlist Entry Template
- Privacy
- Terms
- Contact
- Apply for Verification *(also surfaced as header button)*

---

### 2. Top navigation — restructured

Current header has 7 nav items and is reading slightly heavy for the consumer-first principle. New structure prioritizes the consumer's path:

```text
Home   Verified Vendors   Greenlist   Education   Medical Advisory   How It Works   About        [Apply]
└─ L1  └─ L1              └─ L1       └─ L1       └─ L1              └─ L2          └─ L2        button
```

Changes from current nav:
- **Add:** Medical Advisory Board (authority pillar must be visible at the surface).
- **Reorder:** Verified Vendors moves to position 2 (the most consumer-critical destination).
- **Demote:** For Vendors moves out of top nav into the footer's Standards column. Vendors arrive via direct outreach, the Apply button, or the For Vendors footer link — they are not the primary visitor.
- **Keep:** Apply for Verification button on the right.

Utility strip copy unchanged.

---

### 3. Homepage rebuild — three-layer entry point

The homepage is reorganized so a consumer can satisfy each of the three layers without leaving the page, and so each homepage section deep-links to the page that owns that layer of content.

```text
┌─────────────────────────────────────────────────────────────────┐
│ §0  HERO                                                        │
│     Eyebrow · Headline · 2-line lead · 2 CTAs                   │
│     Primary: Look Up a Vendor → /verified-vendors               │
│     Secondary: View the Greenlist → /greenlist                  │
│     Right: Framework Snapshot data block (kept)                 │
├─────────────────────────────────────────────────────────────────┤
│ §1  AUTHORITY PILLARS (replaces "Authority Anchors")            │
│     Three-column row, each links to its own page:               │
│     01 Medical Oversight        → /medical-advisory             │
│     02 Public Standards         → /governance                   │
│     03 Independent Testing      → /accountability#testing       │
├─────────────────────────────────────────────────────────────────┤
│ §2  CONSUMER ENTRY POINT  (new — the Layer-1 consumer panel)    │
│     "Check a vendor" — brief explanation + prominent link to    │
│     /verified-vendors. Single hairline strip, no marketing.     │
├─────────────────────────────────────────────────────────────────┤
│ §3  THE DUAL-LAYER MODEL  (replaces lifecycle on homepage)      │
│     Two-row institutional explainer:                            │
│     Layer A — Greenlist (recognized upstream sources)           │
│     Layer B — Verified Vendors (sourcing verified against A)    │
│     Links to /greenlist and /how-it-works                       │
├─────────────────────────────────────────────────────────────────┤
│ §4  GREENLIST PREVIEW            (kept)                         │
├─────────────────────────────────────────────────────────────────┤
│ §5  VERIFIED VENDORS PREVIEW     (kept)                         │
├─────────────────────────────────────────────────────────────────┤
│ §6  EDUCATION PREVIEW  (new — surfaces the public knowledge     │
│     library with 3-4 forthcoming REF entries)                   │
├─────────────────────────────────────────────────────────────────┤
│ §7  PUBLIC USE  (kept — three audience entry points)            │
│     For consumers · For vendors · For clinicians & partners     │
└─────────────────────────────────────────────────────────────────┘
```

Lifecycle / Operating Philosophy sections move off the homepage and live exclusively on `/how-it-works` and `/about` (Layer 2). Homepage gets shorter, calmer, more consumer-first — exactly the surface behavior described.

---

### 4. Cross-linking rules (the layered behavior)

Each Layer-1 page ends with a small **"Read deeper"** strip linking to its Layer-2 and Layer-3 counterparts. This is what makes the site feel "simple on the surface, exact underneath."

| Layer-1 page | Read-deeper links |
|---|---|
| Verified Vendors | How It Works · Status Definitions · Verification Disclaimer · Report a Concern |
| Greenlist | Greenlist Entry Template · How It Works · Governance |
| Education | Medical Advisory · Governance |
| Medical Advisory | Governance · About · Accountability |

`How It Works` (Layer 2) ends with a single link to `Accountability & Enforcement` (Layer 3) — the deepest red-tape page. This keeps enforcement detail off the homepage but reachable in two clicks.

---

### 5. Footer — re-columned to match the architecture

Current footer has 5 columns (Registry / Standards / Organization / Reference / Legal). It already holds every page; only the column membership shifts to match the new layering:

```text
Registry              Standards              Organization            Reference              Legal
─────────             ─────────              ────────────            ─────────              ─────
Verified Vendors      How It Works           About                   FAQ                    Privacy
Greenlist             For Vendors            Medical Advisory        Status Definitions     Terms
Apply                 Accountability         Governance              Vendor Profile Tpl.    Verification Disclaimer
Report a Concern      Education              Contact                 Greenlist Entry Tpl.
```

Standing disclaimer line and version metadata at the footer base unchanged.

---

### 6. Files touched

**Edit only — no new files:**
- `src/components/SiteHeader.tsx` — reorder nav, add Medical Advisory, remove For Vendors from top nav.
- `src/components/SiteFooter.tsx` — move For Vendors into Standards column, move Verified Vendors to top of Registry column.
- `src/pages/Index.tsx` — homepage rebuild per §3 above (rename Authority Anchors → Authority Pillars with page links, add Consumer Entry Point §2, replace lifecycle with Dual-Layer Model §3, add Education preview §6, remove the old lifecycle and operating-philosophy sections).
- `src/pages/VerifiedVendors.tsx` — append "Read deeper" strip.
- `src/pages/Greenlist.tsx` — append "Read deeper" strip.
- `src/pages/Education.tsx` — append "Read deeper" strip.
- `src/pages/MedicalAdvisory.tsx` — append "Read deeper" strip (placeholder body unchanged for now).
- `src/pages/HowItWorks.tsx` — append single link to Accountability.

No content is being written for the placeholder pages in this pass. Architecture only.

---

### Outcome

After this pass the site behaves as a true layered public reference: a consumer landing on the homepage gets immediate clarity and one obvious path to look up a vendor; one click takes them to structured understanding (How It Works, Medical Advisory, Governance); a second click takes them to the exact rules (Accountability, Status Definitions, Verification Disclaimer). The Medical Advisory Board is visible at the surface as one of the three authority pillars. Marketing-style sections are off the homepage. Per-page content build-out can now begin against a locked architecture.

