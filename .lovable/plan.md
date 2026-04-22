

## Upgrade the Greenlist Facility Profile (selective implementation)

Goal: make Greenlist facility pages feel like real registry records, not content pages — by adding a small set of high-authority FDA fields, restructuring the record into clear sections, and seeding the vendor↔facility cross-reference architecture. Keep the institutional tone. No "Good Guys" framing. No colorful pills.

### What gets implemented (and what doesn't)

Implementing:
- FEI Number
- Last FDA Inspection (date)
- Form 483 Issued (Yes / No / Unknown)
- Rename **Background → FDA Registration History** with structured sub-fields
- **Compounding Scope** as a compact monochrome capability grid (no colored pills)
- **Verified Vendors Sourced Here** section with an empty-state that reads as intentional

Not implementing (per your guidance):
- "The Good Guys" framing — never
- Inspection-risk narrative on the profile
- Big explainer text on the profile itself (a short tooltip on Form 483 is fine)

### Data model additions — `src/data/greenlist.ts`

Extend `GreenlistProfile` with optional fields (all optional so existing entries keep working):

```ts
// Regulatory identity (additions)
feiNumber?: string;                    // e.g. "3001234567"
lastInspectionDate?: string;           // already exists — keep
form483Issued?: boolean | "unknown";   // tri-state
form483Date?: string;                  // optional, only shown if Yes

// FDA Registration History (replaces "background" semantically)
initialRegistrationYear?: string;
currentRegistrationStatus?:
  | "Active"
  | "Inactive"
  | "Lapsed"
  | "Withdrawn"
  | "Not Registered";
mostRecentRegistrationYear?: string;
selfReportedIntent?: string;           // free text, short
registrationCategory?: string;         // e.g. "503B Outsourcing Facility"
registrationNotes?: string;            // optional short paragraph

// Compounding scope (structured capability flags)
compoundingScope?: {
  sterile?: boolean;
  nonSterile?: boolean;
  bulkDrugSubstances?: boolean;
  officeUse?: boolean;
  patientSpecific?: boolean;
  hazardous?: boolean;
};

// Cross-reference (architecture seed — empty for now)
verifiedVendorSlugs?: string[];        // resolved at render time via getVendor()
```

Keep existing `background` field for backward compatibility but stop rendering it once `registrationNotes` / FDA Registration History block is in place. (Existing `background` text can be migrated later; not part of this pass.)

No data is being filled in for facilities here — schema and renderers only. Population is a separate content pass.

### Profile layout — `src/pages/GreenlistProfile.tsx`

Adopt the same disciplined two-column shell already locked in for Vendor Profile (8/4 grid, `lg:divide-x`, identical padding tokens, status hairline, identity band). This ensures parity across the registry.

Locked structure:

```text
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Greenlist                                        │
├─────────────────────────────────────────────────────────────┤
│  ▔ status hairline ▔                                        │
│  IDENTITY BAND                                              │
│  [MG]  503B OUTSOURCING FACILITY        [Recognized]        │
│        Facility Name                    [Visit website]     │
│        ⏵ FEI · Location · Source type · hostname            │
├─────────────────────────────────────┬───────────────────────┤
│  PUBLIC RECORD (6-row matrix)       │  TRUST RECORD         │
│  Last FDA Inspection | Form 483     │  Registry status      │
│  Current Reg. Status | FEI Number   │  FEI Number           │
│  Initial Reg. Year   | Reg. Category│  Last FDA Inspection  │
│                                     │  Form 483 Issued      │
│  FDA REGISTRATION HISTORY           │  Current Reg. Status  │
│  Initial Registration               │  Source type          │
│  Current Status                     │                       │
│  Most Recent Registration Year      │  ─────────            │
│  Self-Reported Intent               │                       │
│  Registration Notes (if any)        │  REPORT A CONCERN     │
│                                     │  [ Report ]           │
│  COMPOUNDING SCOPE                  │                       │
│  ✓ Sterile        ✓ Office Use      │                       │
│  ✓ Non-Sterile    ✓ Bulk Drug Subs. │                       │
│  · Hazardous      · Patient-spec.   │                       │
│                                     │                       │
│  VERIFIED VENDORS SOURCED HERE      │                       │
│  • Vendor A → /verified-vendors/... │                       │
│  • Vendor B → ...                   │                       │
│  (or calm empty-state)              │                       │
│                                     │                       │
│  REGULATORY ALERT (conditional)     │                       │
└─────────────────────────────────────┴───────────────────────┘
│  Public registry footer line                                │
└─────────────────────────────────────────────────────────────┘
```

Spacing/rhythm tokens reused exactly from VendorProfile (`py-6`, `px-6 md:px-8` left, `md:px-7` rail, eyebrow→title `mb-1.5`, title→body `mb-5`, public-record `gap-x-10 gap-y-4`).

### Section specs

**Public Record matrix (6 rows, fixed)**
1. Last FDA Inspection (date or `—`) | Form 483 Issued (`Yes` / `No` / `Unknown` with small `info` tooltip on the label only)
2. Current Registration Status | FEI Number (mono)
3. Initial Registration Year | Registration Category

Empty values render `—`. Same `Field` primitive as VendorProfile for visual parity.

**FDA Registration History** (replaces "Background")
Stacked label/value rows (not a 2-col grid — reads as a narrative record):
- Initial Registration (year, optional)
- Current Status
- Most Recent Registration Year
- Self-Reported Intent
- Registration Notes (short paragraph, only if present)

If none of these are populated, show one calm fallback line: *"No FDA registration history on file."*

**Compounding Scope** — compact monochrome capability grid
2-column grid of capability rows. Each row is an icon + label, no color, no pill background:
- Present capabilities: `Check` icon, foreground text
- Absent/unknown: muted dot, muted text
- Order: Sterile, Non-Sterile, Bulk Drug Substances, Office Use, Patient-Specific, Hazardous

Reads like an institutional checklist, not a SaaS feature list. If `compoundingScope` is absent entirely, show fallback line: *"No published capability scope on file."*

**Verified Vendors Sourced Here**
Resolve `verifiedVendorSlugs` via `getVendor(slug)` and render only those with `publicStatus === "verified"`. Each item: vendor name + small location, linked to `/verified-vendors/{slug}`.

Empty state (calm, intentional — not a "missing feature"):

> *"No verified vendor sourcing relationships currently published."*

Same line-height and muted tone as other fallback lines. No CTA. No "coming soon."

**Trust Rail** (right column, 4-span)
Always-rendered ordered rows with "Not on file" fallbacks: Registry status → FEI Number → Last FDA Inspection → Form 483 Issued → Current Registration Status → Source type. Then a thin divider, then a compact "Report a concern" link styled exactly like VendorProfile.

**Regulatory Alert** stays where it is (conditional, full-width inside main column, after Verified Vendors section), unchanged styling.

### Form 483 presentation rules

- Label: `Form 483 Issued` with small inline `info` icon (Lucide `Info`, `h-3 w-3`) that opens a one-line `Tooltip`: *"FDA Form 483 lists inspectional observations issued at the close of an FDA inspection."* That's the entire on-page explanation. No paragraph, no link to an article on this page.
- Value: `Yes` (foreground), `No` (foreground), `Unknown` (muted). When `Yes`, optionally append the date in muted tabular-nums on the same line: `Yes · Mar 14, 2024`.

### Files touched

- `src/data/greenlist.ts` — extend `GreenlistProfile` type with the optional fields above. No data populated. No existing entries modified.
- `src/pages/GreenlistProfile.tsx` — replace current single-card layout with the locked two-column shell described above; add the new sections; add the Form 483 tooltip; add Verified Vendors resolver using `getVendor`.

No changes to: Vendor Profile, registry pages, status taxonomy, color tokens, typography tokens, or any other page.

### Implementation order (matches your priority)

1. FEI Number (data + render in matrix + rail)
2. Last FDA Inspection + Form 483 Issued (matrix + rail + tooltip)
3. Rename + restructure Background → FDA Registration History block
4. Compounding Scope monochrome capability grid
5. Verified Vendors Sourced Here (with calm empty state)
6. Trust Rail and identity band aligned to VendorProfile tokens

### Out of scope

- Filling in real FEI numbers, inspection dates, or Form 483 data per facility (separate content pass).
- Migrating existing `background` text into `registrationNotes` (separate content pass).
- Changes to the Greenlist registry/listing page.
- Any new explanatory article or glossary entry for Form 483 (you said keep it off the profile — fine to add later in `src/data/glossary.ts` as a separate request).

