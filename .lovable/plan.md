

## National branding sweep — remove "Tampa, FL" / normalize jurisdiction

A small, surgical text/branding pass. No layout, route, or component changes. Vendor data (`src/data/vendors.ts`, `src/data/greenlist.ts`) is left untouched — those are real business addresses and historical records, not branding copy.

### 1 · Top Control Strip + Site utility strip

- `src/pages/Index.tsx` line 71: `Maintained in Tampa, FL · Public Registry` → `United States · Public Registry · SS-FRAMEWORK-2026.01` (per spec — promotes the doc anchor into the strip).
- `src/components/SiteHeader.tsx` line 31: `Maintained in Tampa, FL · Reviewed under Medical Advisory Board` → `United States · Reviewed under Medical Advisory Board`.

### 2 · Footer brand column

- `src/components/SiteFooter.tsx` line 81: `Maintained in Tampa, FL` → `Source Standard · United States`.

### 3 · Hero Institutional Metadata box

- `src/pages/Index.tsx` line 51: `Jurisdiction: Tampa, FL · US` → `Jurisdiction: United States`.

### 4 · Reference boxes on every doc page (`Jurisdiction: FL/US` → `United States`)

Seven pages, one-line edit each:
- `src/pages/FAQ.tsx`
- `src/pages/VerificationDisclaimer.tsx`
- `src/pages/Terms.tsx`
- `src/pages/StatusDefinitions.tsx`
- `src/pages/ReportConcern.tsx`
- `src/pages/Accountability.tsx`
- `src/pages/Privacy.tsx`

### 5 · Terms §6 — Jurisdictional Governance language

- `src/pages/Terms.tsx` line 138: rewrite description to lead with national framing while preserving Florida as governing-law venue:
  > "This User Agreement is governed by United States Federal Standards and the laws of the State of Florida, United States, without regard to conflict-of-law principles. Any dispute arising under or in connection with this Agreement is subject to the exclusive jurisdiction of the United States federal courts and the state courts located in Florida, which the user accepts as the sole and exclusive venue."

### 6 · `index.html` meta description

- Line 7: drop `Florida launch 2026.` → replace with `National public registry, launching 2026.` (keeps SEO copy aligned with national framing).

### What stays the same

- `src/data/vendors.ts` and `src/data/greenlist.ts` — real vendor/pharmacy locations (Tampa, Florida-based descriptions, etc.) are factual records and remain unchanged.
- All routes, layout, components, design tokens, and other page copy.
- Privacy Policy content — already nationally framed; no Tampa/Florida references found in `Privacy.tsx` body beyond the `FL/US` jurisdiction tag handled in §4.

### Files touched

- `src/pages/Index.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`
- `src/pages/Terms.tsx`
- `src/pages/FAQ.tsx`, `src/pages/VerificationDisclaimer.tsx`, `src/pages/StatusDefinitions.tsx`, `src/pages/ReportConcern.tsx`, `src/pages/Accountability.tsx`, `src/pages/Privacy.tsx`
- `index.html`

