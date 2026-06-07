## Goal
Bring the Vendor Registry and Facility Records pages back in line with the homepage typography so search boxes, pills, row text, and supporting panels no longer read larger than the rest of the system.

## What I’ll change

1. Normalize the registry pages to the site baseline
- Reduce the oversized copy on `src/pages/Greenlist.tsx` where several explanatory blocks are still using 17–18px text.
- Tighten the supporting copy on `src/pages/VerifiedVendors.tsx` so explainer panels and buttons match the established system scale.
- Standardize search input text on both pages so the field text matches the homepage’s compact documentation-first feel.

2. Normalize the record rows
- Adjust `src/components/registry/VendorRow.tsx` so vendor names, secondary location text, status labels, and the “View” affordance sit on the same compact scale as the rest of the platform.
- Adjust `src/components/registry/GreenlistRow.tsx` for the same reason, especially the facility name and utility text.

3. Normalize registry controls
- Standardize filter pills on both registry pages.
- Audit and normalize registry-specific control components in `src/components/registry/QueryBar.tsx` and `src/components/registry/FilterBottomSheet.tsx` so sheet titles, option labels, selects, search, sort, and filter controls no longer drift larger than system text.

4. Preserve the institutional hierarchy
- Keep page titles and hero typography untouched.
- Only tighten body, utility, input, and row-level typography so the registry still feels dense, authoritative, and documentation-first.

5. Visually verify before completion
- Check Home against Vendor Registry and Facility Records in preview.
- Verify that users no longer perceive a jump in font size when moving between these pages, especially on mobile where the issue is most visible.

## Technical details
- Primary files:
  - `src/pages/VerifiedVendors.tsx`
  - `src/pages/Greenlist.tsx`
  - `src/components/registry/VendorRow.tsx`
  - `src/components/registry/GreenlistRow.tsx`
  - `src/components/registry/QueryBar.tsx`
  - `src/components/registry/FilterBottomSheet.tsx`
- Approach:
  - Replace remaining hard-coded 17–18px registry copy with the compact site standard.
  - Replace ad hoc 13–15px control/row text where needed with the normalized compact sizes used elsewhere.
  - Keep typography consistent with the existing institutional system rather than introducing a separate registry scale.

## Success criteria
- Search inputs on Vendor Registry and Facility Records no longer appear larger than homepage text.
- Filter labels, pills, row names, row metadata, status labels, and action text feel like the same design system as Home.
- Supporting explainer cards on both pages no longer read oversized.
- No visible font jump when navigating between Home, Vendor Registry, and Facility Records.