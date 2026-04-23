

## Vendor Batch Import — peptide_hormone_market_census_v5.csv

Append 4,265 new clinic/brand entries from the uploaded CSV to `src/data/vendors.ts` as a new `Batch` block at the end of `vendorsRaw`, all with `status: "unverified"` (which renders as **"No Records on File"** per the existing `StatusBadge` mapping — this is the status the user requested).

### Source data shape

CSV columns: `vendor_name, status, verification_badge, fulfillment, category, clinical_focus, medical_director, source_type, address, website_url, last_reviewed, review_id, about_summary` — 4,265 rows.

### Mapping rules (applied per row by an import script)

| CSV column | `Vendor` field | Transform |
|---|---|---|
| `vendor_name` | `name` | trimmed |
| — | `slug` | kebab-case of `name`, deduped against existing 3,016 slugs and within batch by appending `-2`, `-3`, … |
| — | `status` | hardcoded `"unverified"` |
| `address` | `city`, `state`, `zip` | parsed: `"City, ST"` → city+state; `"123 St City ST 12345"` → city+state+zip; `"City ST"` → city+state; `"Not on file"` → omit all three |
| `website_url` | `website` | `"Not on file"` → omit; else passed through `normalizeWebsite()` |
| `medical_director` | `medicalDirector` | `"Pending Audit"` / `"Not on file"` → omit |
| `clinical_focus` | `clinicalFocus[]` | split on `;` then `/`, trim, drop empties |
| `category` | `category` | mapped to allowed `VendorCategory` union: `Wellness`→`Wellness`, `Longevity`→`Wellness`, anything containing `TRT`→`TRT Clinic`, `Hormone`→`Hormone Optimization`, `Peptide`→`Peptides`, `Pharmacy`→`Compounding Pharmacy`, else `Other` |
| `about_summary` | `summary` | trimmed; `"Not on file"` → omit |
| `last_reviewed`, `review_id`, `source_type`, `verification_badge`, `fulfillment` | — | not mapped (status is unverified; these are derived elsewhere or out of scope) |

`fulfillment` column from the CSV is intentionally not stored — `getVendorFulfillment()` already derives it from the absence/presence of `city`/`state`, which produces the correct result given our address parsing.

### File modification

- Insert a new `// ---------- Batch (Census v5) ----------` marker before the closing `] as const;` at line 32971 in `src/data/vendors.ts`, followed by 4,265 new entry objects.
- No changes to types, helpers, status labels, or the `vendors` export wiring.
- All entries will display as **"No Records on File"** (the `unverified` stamp label defined in `StatusBadge.tsx`).

### Execution

A one-off Node script will:
1. Read `src/data/vendors.ts`, extract existing slug set.
2. Parse the CSV with proper quote handling (rows contain commas inside quoted fields).
3. Apply the mapping above; deduplicate slugs against existing data and within the batch.
4. Render entries as TS object literals (omitting empty/optional fields) and splice them in before `] as const;`.
5. Report counts: rows read, entries written, slug collisions resolved, rows skipped.

Script lives in `/tmp/` (not committed). Only `src/data/vendors.ts` is modified.

### Out of scope

- No schema changes, no new categories, no UI changes
- No deduplication across `vendor_name` (only slug collisions resolved with numeric suffix)
- No backfill of `medicalDirector`, `summary`, etc. for existing entries
- `source_type` and `verification_badge` columns ignored — registry derives those from `status`

