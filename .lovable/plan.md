
# Vendor Registry – Consumer Experience Refinement (v3)

Goal: reposition `/verified-vendors` as a consumer lookup tool. Preserve typography, colors, card style, and institutional aesthetic — usability refinement only.

## 1. Registry Hero

Keep H1 as **"Vendor Registry"** (institutional voice). Update the `RegistryHeader` description to:

> *"Search the Source Standard Registry to find out whether your provider has been independently verified and to better understand their peptide sourcing transparency."*

Keep the compact navy hero treatment, live-updated pill, index number, and floating stats card. No structural changes to `RegistryHeader.tsx`.

## 2. Search as Primary Action

Promote the search input into the visual centerpiece, placed **above** the filters (currently below):

- A small orienting line **directly above** the search input:
  > *"Search clinics, telehealth providers, and wellness practices nationwide."*
  Muted 12px, no uppercase eyebrow — a plain informational line.
- Full width on mobile, capped ~640px on desktop, centered.
- Height 52–54px, 24px radius, 1px hairline, white background, 14px text.
- Placeholder: *"Search by provider, clinic, telehealth company, city, or state..."*
- Inline lucide `Search` glyph (1.75 stroke, muted) on the left.
- Remove the current "Search" uppercase eyebrow — placeholder is self-explanatory.

## 3. Expanded Filters (default = All Providers)

Reorganize into clearly labeled groups directly under the search:

1. **Verification Status** — `Verified` / `Unverified` pills, **default `any`**. Neither active = all records. Badges remain clear on cards for both states.
2. **Specialty** *(new, dynamic)* — options generated at runtime from actual data. Union of `vendor.clinicalFocus[]` + `vendor.category`, normalized (trim, title-case, dedupe case-insensitively). Only surface options with ≥ 2 matching vendors to avoid one-off noise. Multi-select, OR semantics. Uses existing `SoftPill`; horizontal scroll on mobile.
3. **Vendor Type** — Online, In-Person, **Hybrid** (new). Extend `DeliveryKey` to include `hybrid`, wired to `getVendorFulfillment`.
4. **State** *(new, dynamic)* — compact `<select>` styled to match pill/input language (32–36px height, 20px radius, 1px hairline, white bg). Populated from unique `vendor.state` values in the dataset, sorted, displayed with full state names via `usStates`. "All states" default.

All groups combine with AND; Specialty uses OR internally.

## 4. Move Status Definitions

Remove the bottom "Verified vs. Unverified" panel. Replace with a **compact definitions strip directly beneath the filter section**, above results:

- Two cells side-by-side on desktop, stacked on mobile.
- Each cell: small uppercase eyebrow (VERIFIED / UNVERIFIED) + one-sentence definition (reuse trimmed existing copy).
- Hairline border, white bg, 12px radius.
- Subtle text link "View Verification Framework" → `/how-it-works` at the end of the strip.

## 5. Registry Card Hierarchy (`VendorRow.tsx`)

Preserve card shell (radius, border, hover). Minor hierarchy tweaks only:

- Provider name 14px/600 (unchanged).
- Status (Verified/Unverified + shield) top-right (unchanged) — badge language remains clear for both states since Unverified rows are visible by default.
- Second line: **Location** (City, ST) — muted, clean (no vendor-type suffix).
- Third line: **Specialty pill** (existing style) with `+N` if multiple; **Vendor type** as a tiny neutral 10px tag next to it (Online / In-person / Hybrid).
- "View ›" bottom-right (unchanged).
- Vertical padding `10px 14px 8px` → `9px 14px 8px`; content gap `3px` → `2px`.

## 6. Mobile Density

- Filter section padding `pt-5 pb-3` → `pt-3 pb-2`; `space-y-4` → `space-y-3`.
- Card list gap `gap-1.5` → `gap-1` on mobile, `gap-1.5` on `md+`.
- Results section `pb-6 md:pb-8` → `pb-4 md:pb-6`.
- Stats card padding `14px 10px` → `12px 10px`.

## 7. Empty State (single CTA)

When active filters/query produce zero matches:

- Eyebrow: *"Can't find your provider?"*
- Body: *"Let us know so we can add them to the registry for review."*
- One outline CTA: **Request Provider Review** → `/contact?topic=request-provider-review`.

Fallback (registry entirely empty) keeps the generic message.

## 8. Preserve

- No color, typography, radius, or card visual redesign.
- Navy hero, `HeroPattern`, floating stats, `SoftPill`, `VendorRow` shell — retained.
- No backend changes; all filtering client-side over `vendors`.

## Files to modify

- `src/pages/VerifiedVendors.tsx` — hero description, search placement + intro line, dynamic filter derivation (specialty, state), hybrid delivery, in-place definitions strip, empty state, spacing.
- `src/components/registry/VendorRow.tsx` — vendor-type tag placement, tighter padding.
- (No changes to `RegistryHeader.tsx`, `SoftPill`, `HeroPattern`, or vendor data.)

## Follow-ups (not in this pass)

- **"Verified Only" quick toggle** near the search bar once the verified population grows — one-tap filter without changing the default.
- Persist active filters to URL query params for shareable links.
- `/contact` deep-link handling for `?topic=` values.
- Apply the same consumer-first treatment to the Facility Records page next.
