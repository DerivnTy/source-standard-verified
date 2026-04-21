

## Directory Data Normalization + Filter Reliability Pass

Two-part fix: clean and normalize the underlying data fields used for filtering across both directories, and fix the filter/sort logic so multi-filter combinations behave reliably.

### Files touched
- `src/data/vendors.ts` — normalize `state`, `city`, `clinicalFocus`; add a canonical focus taxonomy + helper.
- `src/data/greenlist.ts` — split `location` into discrete `city` / `state` (keep `location` as derived display); add helpers.
- `src/pages/VerifiedVendors.tsx` — fix city filter bug, expand search, use normalized fields.
- `src/pages/Greenlist.tsx` — filter on the new discrete `state`/`city` fields, expand search, fix multi-location handling.

---

### 1. Vendor data normalization (`src/data/vendors.ts`)

**State field**
- Standardize all `state` values to 2-letter US codes (already mostly the case).
- Convert the 2 existing `state: "US"` entries to either the actual operating state (where determinable from city) or omit the state and add a `serviceArea: "Nationwide / telehealth"` flag (new optional field) so they still show up under a "Nationwide" filter option rather than being silently broken.

**City field**
- Strip parenthetical annotations from city names (e.g. `"Dorset (Tele)"` → `city: "Dorset"`, plus `serviceArea: "Telehealth"`).
- Normalize abbreviations: `"Ft Lauderdale"` → `"Fort Lauderdale"`. Trim trailing whitespace across all entries.
- City stays as a discrete field (no embedded state). The "City, ST" display string is computed at render time only.

**Clinical focus field — canonical taxonomy**
Collapse the current ~50 free-form variants into a fixed canonical list, applied via a one-time normalization pass over the dataset:

| Canonical label | Folds in |
|---|---|
| TRT | TRT, Tele-TRT |
| HRT | HRT, Hormones, BHRT, Hormone Pellets, BioTE, Menopause, Endocrinology |
| Peptides | Peptides, Peptide Therapy, Immune Peptides, Tissue Repair |
| Weight Loss | Weight Loss, Medical Weight Loss, Obesity, Obesity Medicine, GLP-1, Tirzepatide |
| Men's Health | Men's Health (straight apostrophe), Sexual Health |
| Women's Health | (new bucket if any present) |
| Longevity | Longevity, Anti-Aging, Aging, Age Mgmt, Age Management, NAD+ |
| Performance | Performance, Sports Medicine, Sports Med, Bio-Hacking, Optimization |
| Regenerative | Regenerative, Regenerative Medicine |
| Aesthetics | Aesthetics |
| Wellness | Wellness, IV, IV Therapy |
| Functional / Integrative | Functional, Functional Medicine, Integrative, Integrative Medicine, Integrative Health, Naturopathic |
| Telehealth | Telehealth, Concierge |
| Other clinical | Neurology, Diagnostics, Distribution, Clinical |

Rules applied to every vendor record:
- Trim whitespace, normalize curly `'` → straight `'`.
- Map each raw value through the table above.
- Deduplicate within each vendor's array.
- The dropdown then shows ~12 clean options instead of ~50 noisy ones.

Export the canonical list as `CLINICAL_FOCUS_OPTIONS` so the page reads from a stable source rather than `Set` over inconsistent strings.

---

### 2. Greenlist data normalization (`src/data/greenlist.ts`)

**Split `location` into discrete fields**
Add to the `GreenlistEntry` type:
```ts
city?: string;           // primary city, omitted for nationwide
state?: string;          // 2-letter US code; omitted for nationwide
additionalLocations?: { city: string; state: string }[];  // for multi-site entries
serviceArea?: "Nationwide" | "Multi-state" | "Multi-location";
```

For each existing entry, populate the new fields:
- `"Atlanta, GA"` → `city: "Atlanta", state: "GA"`.
- `"St. Louis, MO"` → `city: "St. Louis", state: "MO"`.
- `"Denver, CO and Columbus, OH"` → `city: "Denver", state: "CO"`, `additionalLocations: [{city:"Columbus", state:"OH"}]`. **Both states will now match the state filter.**
- `"Multi-location"` → `serviceArea: "Multi-location"` (no city/state).
- `"US multi-state"` / `"US"` → `serviceArea: "Nationwide"`.

`location` (display string) is computed from the discrete fields, not the source of truth.

**New helpers**
- `getGreenlistStates()` — returns sorted unique state codes, including those from `additionalLocations`.
- `entryMatchesState(entry, state)` — checks `state` and every `additionalLocations[*].state`.
- `getGreenlistCities()` — `"City, ST"` strings derived from the discrete fields.

---

### 3. Verified Vendors filter logic (`src/pages/VerifiedVendors.tsx`)

**Fix the broken city filter**
Current bug: `getVendorCities()` returns `"Atlanta, GA"` but the filter compares `v.city !== city` where `v.city` is just `"Atlanta"`. The city filter currently matches nothing.

Fix: use a stable city key `${v.city}, ${v.state}` on both sides — both the dropdown options and the comparison — so city + state combinations intersect correctly.

**Cascade cities by selected state** (already partially in place — verify it uses the new keys.)

**Expand the search hay**
Include `name`, `city`, `state`, `category`, and all `clinicalFocus` entries so a user typing "TRT Atlanta" finds Atlanta TRT clinics. Keep `q.includes` semantics (substring, case-insensitive).

**Use canonical focus list**
Populate the focus dropdown from the new `CLINICAL_FOCUS_OPTIONS` constant rather than from a `Set` over raw values.

**Verify intersect logic**
Each filter is an independent AND clause already (`if (... !== ALL && ... !== expected) return false`). After the fixes above, combinations like `FL + TRT`, `TX + Weight Loss`, `GA + Atlanta`, `Verified + FL` all intersect cleanly because every field is normalized.

---

### 4. Greenlist filter logic (`src/pages/Greenlist.tsx`)

**Replace `extractState(location)` with `entry.state`** (and `additionalLocations`).
Drop the regex-on-display-string approach. State filter calls `entryMatchesState(entry, state)`.

**Add a "Nationwide / multi-location" option** to the state dropdown so entries with no specific state are still findable, instead of being silently invisible.

**Expand search hay** to include `name`, `location` (display), `focus`, `type`, and `category`.

**Sort by state** uses `entry.state ?? ""` directly (no regex).

---

### 5. What stays the same
- All slugs, routes, page layouts, headers, status legends, sort UI labels.
- Visual/typography decisions made in prior turns.
- Profile pages — they read the same fields, just cleaner values flow through.
- Pagination, reset behavior, sticky filter row.

### 6. Verification flows tested after build
- `Florida + TRT` (verified vendors) → returns FL vendors with TRT in normalized focus.
- `Texas + Weight Loss` → all TX vendors whose focus folded into "Weight Loss" (incl. former GLP-1, Tirzepatide, Obesity Medicine entries).
- `New York + Aesthetics`, `Georgia + Atlanta`, `Verified + FL` — all return the expected intersect.
- `503B + FL` (greenlist), `503A + TX` — state filter now reads discrete `state` field; multi-state entry "Denver, CO and Columbus, OH" appears under both CO and OH.
- Search "atlanta trt" finds Atlanta TRT clinics (search now spans focus + location).

### Result
Every filterable field is stored as a clean discrete value with a fixed taxonomy. The city filter on Verified Vendors actually works. Multi-location greenlist entries are findable by every state they operate in. Search and filters intersect cleanly across all combinations.

