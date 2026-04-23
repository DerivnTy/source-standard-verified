

## Batch 2 vendor import — `peptide_hormone_market_census_v2.csv`

Append ~2,870 new vendor entries from the uploaded CSV into `src/data/vendors.ts` as **unverified** listings. No UI, copy, or schema changes — pure data append, identical protocol to Batch 1.

### Pipeline

1. **Parse** the CSV (13 columns, 2,870 data rows).
2. **Scope filter** — drop rows that are clearly out of scope:
   - Pure research-chemical resellers (e.g., "research only" sites)
   - Generic supplement / nutraceutical shops
   - Non-medical aesthetic-only spas with no peptide/hormone/GLP-1/TRT/HRT signal
   - Any row whose `clinical_focus` and `about_summary` contain no peptide-economy keywords (TRT, HRT, BHRT, peptide, GLP-1, semaglutide, tirzepatide, hormone, pellet, sermorelin, ipamorelin, BPC, weight-loss-Rx, men's health, sexual health, etc.)
3. **Field mapping** to existing `Vendor` shape:
   - `name` ← `vendor_name`
   - `slug` ← kebab-case of name + dedup suffix if collision with existing 1,650
   - `status` ← `"unverified"` (forced — CSV "Pending Audit" / "UNVERIFIED" ignored)
   - `city`, `state` ← parsed from `address` (handles formats: "City ST", "Street, City ST ZIP", "Multi / Locations ST", "City1 / City2 ST")
   - `zip` ← extracted 5-digit when present
   - `website` ← `website_url` via `normalizeWebsite()`
   - `medicalDirector` ← omitted when value is `"Pending Audit"` or `"Not on file"`
   - `clinicalFocus` ← split `clinical_focus` on `;` and trim
   - `category` ← mapped to existing `VendorCategory` enum (`Wellness`, `TRT Clinic`, `Hormone Optimization`, `Peptides`, `Other`) using focus heuristics
   - `summary` ← `about_summary` (kept verbatim — useful for VendorProfile body)
   - `reviewId`, `reviewDate`, `verifiedCategories`, etc. ← **not set** (unverified)
4. **Dedup** against the existing 1,650 by normalized name + website host. Skip duplicates.
5. **Append** the new entries inside the existing `vendors: Vendor[]` array in `src/data/vendors.ts`, preceded by a `// ---------- Batch 2 import ----------` comment marker.
6. **Skipped-rows report** — write `/mnt/documents/batch2_skipped_rows.csv` containing every dropped row with a `reason` column (out_of_scope / duplicate / unparseable_address) for your case-by-case review.

### Guarantees

- No new components, routes, or profile templates — every new vendor renders through the existing `VendorProfile` and appears automatically in the Public Trust Registry table.
- All entries land as `unverified` ("No Records on File").
- No counter logic changes; the registry totals on `/verified-vendors` will update naturally from the appended array.
- TypeScript will be re-checked after the append.

### Deliverables

- Updated `src/data/vendors.ts` (data append only)
- `/mnt/documents/batch2_skipped_rows.csv` artifact for your review

