

## Build Greenlist Facility Profile Pages — Transparency Scorecard Layout

Add per-facility profile pages for every Greenlist entry, structured as neutral technical scorecards (not promotional bios). This is the upstream half of the dual-layer system, paired with Verified Vendor profiles downstream.

### 1. Data model — extend `src/data/greenlist.ts`

Add a `slug` and an optional `profile` object to `GreenlistEntry`. All profile fields are optional so entries without research data degrade gracefully to "Not disclosed".

```ts
export type GreenlistEntry = {
  slug: string;                    // NEW — e.g. "anazaohealth-corporation"
  name: string;
  type: GreenlistType;
  category: GreenlistCategory;
  location: string;
  focus: string;
  website?: string;
  profile?: GreenlistProfile;      // NEW
};

export type GreenlistProfile = {
  // Regulatory identity
  designation?: string;            // "503B" | "503A" | mixed
  fdaRegistration?: string;        // FEI / registration number
  statesServed?: string[];
  inspectionHistory?: string;      // short summary
  lastInspectionDate?: string;

  // Quality systems
  standards?: string[];            // ["cGMP (503B)", "USP 797", "USP 800"]
  cleanroomClass?: string;         // "ISO Class 5 primary engineering control"
  testingProtocols?: string[];     // ["Sterility", "Endotoxin", "Potency"]
  environmentalMonitoring?: string;

  // Product capabilities
  dosageForms?: string[];          // ["Sterile injectables", "Ophthalmic", ...]
  specializations?: string[];
  apiSourcingPolicy?: string;      // neutral phrasing only

  // Source Standard audit data
  ssReviewDate?: string;
  ssAuditDate?: string;
  labValidationLog?: string;       // neutral free text or "—"
  vendorCount?: number;
  reviewNotes?: string;

  // Neutral facility background
  yearsInOperation?: string;
  facilityScale?: string;          // square footage or scale
  qaStaffing?: string;
  background?: string;             // factual operational summary
};
```

Add helpers:
- `getGreenlistEntry(slug: string): GreenlistEntry | undefined`
- `slugify(name)` used to populate `slug` for all 36 existing entries (one-time edit; no data deletion).

Profile data is left **empty for now** on all entries. The page renders gracefully with "Not disclosed" placeholders so the structure ships immediately and can be populated entry-by-entry later.

### 2. New page — `src/pages/GreenlistProfile.tsx`

Scorecard layout, no promotional copy. Tone: neutral, factual, public-reference. Layout mirrors `VendorProfile.tsx` rhythm but structured for technical specs.

**Top — `MetadataBar`** (matches vendor profile pattern)
- Doc · Listing · Updated · Jurisdiction

**Header section**
- Back link → `/greenlist`
- Left col (md:col-span-8):
  - Eyebrow: `Public Registry · Greenlist Facility`
  - H1: facility name
  - Sub: `{type} · {location}`
  - Optional one-line neutral summary derived from `focus`
- Right col (md:col-span-4) — **At-a-glance scorecard sidebar**:
  - Inclusion status: `● GREENLISTED` (green pill, the only place green appears here)
  - Source type
  - Designation
  - SS review date
  - Vendor count

**Body — five grouped scorecard sections** (each rendered as a bordered `<dl>` block matching the `Field` pattern from `VendorProfile.tsx`, with `meta-label` headers on a muted bar):

1. **Regulatory identity & status**
   - Designation, FDA registration / FEI, States served / licensure, Inspection history, Last inspection date
2. **Quality systems & manufacturing standards**
   - Standards met, Cleanroom classification, Testing protocols, Environmental monitoring
3. **Product capabilities**
   - Dosage forms, Specializations, Clinical focus areas (from existing `focus`), API sourcing policy
4. **Source Standard audit data**
   - SS verification / review date, SS audit date, Third-party lab validation log, Vendor count, Review notes
5. **Neutral facility background**
   - Years in operation, Facility scale / square footage, QA staffing, Operational background

Every empty field renders `Not disclosed` in muted text. No "Contact us" CTAs, no marketing language, no logos.

**Footer disclosure block** (always present, verbatim):

> Source Standard does not accept payment from facilities for inclusion in the Greenlist. Information provided is for public reference and is derived from public regulatory filings, disclosed facility information, and Source Standard review data where applicable.

### 3. Routing — `src/App.tsx`

Add: `<Route path="/greenlist/:slug" element={<GreenlistProfile />} />`

### 4. Link rows from registry — `src/pages/Greenlist.tsx`

In both the desktop table rows and mobile cards, wrap the facility name in:
```tsx
<Link to={`/greenlist/${e.slug}`} className="hover:text-primary">{e.name}</Link>
```
Keep the external `Visit →` website link separate and unchanged. No other registry behavior changes (filters, sort, pagination untouched).

### 5. Not-found state

Mirror `VendorProfile`'s pattern: if no entry matches the slug, show "No facility profile found" with a back link to `/greenlist`.

### Visual / token reuse

Reuses existing primitives only — `MetadataBar`, `Field`-style `<dl>` rows, `meta-label`, `eyebrow`, `bg-surface-muted/60`, `border-border/60`, mono pills. No new components, no token changes. Green stays bound exclusively to the single `● GREENLISTED` inclusion pill in the sidebar.

### Files touched

- `src/data/greenlist.ts` — add `slug` to all entries, add `GreenlistProfile` type + `getGreenlistEntry` helper
- `src/pages/GreenlistProfile.tsx` — new file
- `src/pages/Greenlist.tsx` — wrap row names in `<Link>`
- `src/App.tsx` — register `/greenlist/:slug` route

### Out of scope

- Populating real regulatory/audit data per facility (ships with structure + "Not disclosed" placeholders; data fill-in is a follow-up content task)
- Verified Vendor profile changes
- Filters, sorting, pagination, or Greenlist legend changes

### Result

Every Greenlist row becomes clickable, opening a structured facility scorecard that reads like an institutional spec sheet: regulatory identity, quality systems, capabilities, Source Standard audit data, and neutral background — closed by the standard non-payment disclosure. The dual-layer system is now visible end-to-end: Greenlist = upstream technical scorecards, Verified Vendors = downstream business verification.

