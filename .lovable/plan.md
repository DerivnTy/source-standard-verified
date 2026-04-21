

## Site-wide spacing & hierarchy polish pass

A pure refinement pass — no new content, no new pages. We replace the ad-hoc spacing and heading sizes that have accumulated across the app with a single, enforced system, then audit every page against it. The result: the same rhythm everywhere, a clear typographic ladder, and content density that matches the authority of the mission.

### 1 — A real type ladder (the root cause)

Right now there are 8+ informal H2/H3 sizes in use (`text-xl`, `text-2xl`, `text-[1.25rem]`, `text-[1.375rem]`, `text-[1.5rem]`, `text-[1.625rem]`, `text-[1.875rem]`, plus the `.section-heading` utility). We collapse this to **four locked utilities** in `src/index.css`:

| Utility | Use | Size | Weight |
|---|---|---|---|
| `.display-1` | Home hero only (kept) | 34/42px | 500 |
| `.display-2` | Anchor-page heroes (kept) | 30/36px | 500 |
| `.title-doc` | Doc/regulatory page H1 (kept) | 26/28px | 500 |
| `.title-record` | Profile/record H1 (kept) | 24/30px | 500 |
| **`.h-section`** *(new)* | Every in-page section H2 | 20/22px | 500 |
| **`.h-sub`** *(new)* | Sub-section H3 inside a section | 15/16px | 600 |
| **`.h-card`** *(new)* | Card / panel title | 14/15px | 600 |

Body text is locked to **three sizes only**: `15px` (default prose), `13.5px` (helper / table cell), `12px` (meta / disclaimer). Anything in between gets snapped to the nearest token. The current `.section-heading` utility is deprecated — it conflicts with `.title-doc`.

### 2 — A real spacing ladder

Vertical rhythm becomes a **6-step scale**, used everywhere. Today the same "section" can be `py-8`, `py-10 md:py-14`, `py-14 md:py-20`, `py-16 md:py-24`. We collapse these:

| Token | Tailwind | Use |
|---|---|---|
| `space-section` | `py-16 md:py-20` | Major section on anchor pages |
| `space-section-doc` | `py-12 md:py-16` | Section on doc/policy pages |
| `space-section-tight` | `py-8 md:py-10` | Helper bands, status legends, scope notes |
| Inside-section heading→body gap | `mt-3` | Title to lead |
| Inside-section block→block gap | `mt-6` md / `mt-8` lg | Lead to grid/table |
| Card inner padding | `p-5` (compact) / `p-6` (standard) | Locked — no `p-4` or `p-8` cards |

The existing `Section` component (currently hard-codes `py-16 md:py-24`) gets a `density?: "default" | "doc" | "tight"` prop mapped to the tokens above, so callers stop overriding by reaching into raw padding classes.

### 3 — Component-level fixes

- **`Section.tsx`** — add the `density` prop, drop the over-spaced default to `space-section`, change `SectionLabel` H2 from `1.5/1.625rem font-semibold` → `.h-section`, tighten `mb-12` → `mb-8`, bring metadata-to-title gap from `mb-4` → `mb-3`.
- **`AnchorHeader.tsx`** — reduce hero padding from `py-20 md:py-28` to `py-16 md:py-24` (currently the loudest band on the site, especially on mobile).
- **`RecordHeader.tsx`** — already on `py-14 md:py-18`; tighten title→lead from `mt-5` to `mt-4`, lead→children from `mt-7` to `mt-6`, and demote summary rail label gap from `mb-3` to `mb-2`.
- **`ProfileHeader.tsx`** — lock identity row to single line (already planned, finish enforcement); reduce vertical padding to `pt-5 pb-12 md:pb-16`.
- **`UtilityHeader.tsx`** — reduce padding to `pt-5 pb-8 md:pb-10`.
- **`Card`** primitive — change default `p-6` header / `p-6 pt-0` content to `p-5` / `p-5 pt-0` so non-hero cards stop feeling oversized for their content.

### 4 — Per-page audit (header + section spacing only — no copy or content changes)

**Anchor pages** — `Index.tsx`, `VerifiedVendors.tsx`, `Greenlist.tsx`, `Education.tsx`
- All section H2s converted to `.h-section`. Today `Index` uses `.section-heading` (large semibold) and `Education` uses `text-[1.25rem] font-semibold` — they read as different sites.
- All section padding standardized to `space-section`. `Index` currently mixes `py-14 md:py-20` and `py-12 md:py-16`; `Education` uses the old `py-16 md:py-24`.
- Card inner padding normalized to `p-5` across the lookup cards on Home, the source-type cards on Greenlist, and the row cards on Education.
- Eyebrow → H2 gap unified to `mb-3` (Home currently uses `mb-4`).
- Heading → lead gap unified to `mt-3` (Home uses `mt-4`/`mt-5` inconsistently).
- Filter rows on Vendors & Greenlist: standardize sticky-row padding to `py-3` and the explanatory band above to `space-section-tight`.

**Doc pages** — `Governance.tsx`, `Accountability.tsx`, `Terms.tsx`, `Privacy.tsx`, `VerificationDisclaimer.tsx`, `StatusDefinitions.tsx`, `HowItWorks.tsx`, `HowToReadTheDirectory.tsx`, `ForVendors.tsx`, `MedicalAdvisory.tsx`, `About.tsx`, `FAQ.tsx`, `ReportConcern.tsx`
- All section padding → `space-section-doc`. Most are currently on `py-10 md:py-14`, which reads cramped against the larger anchor-page sections.
- All in-section H2s → `.h-section` (currently `text-xl md:text-2xl font-semibold` everywhere — this is the "DIY" feel persisting on doc pages).
- Side-rail labels (`§1 — Medical Advisory` etc.) → `.eyebrow` instead of `.meta`, so they stop reading as body text.
- Cite-as / footer strips → `space-section-tight`.

**Profile pages** — `VendorProfile.tsx`, `GreenlistProfile.tsx`, `AdvisorProfile.tsx`, `LibraryEntry.tsx`
- `VendorProfile` and `GreenlistProfile` still use the **old pattern**: `MetadataBar` at top + `font-semibold` H1. Migrate to `ProfileHeader` (entity name leads, doc IDs move to `ProfileFootnote` at page bottom). This was scoped in the previous header pass but never landed for these two — finishing it is the single biggest consistency win.
- Field-row dl: change `px-4 py-3` to `px-5 py-3`, label column from `col-span-1` to `col-span-4` (currently labels wrap awkwardly), value column to `col-span-8`.
- Right-rail card padding → `p-5`.
- Listing-detail section → `space-section-doc`.

**Utility pages** — `Apply.tsx`, `Contact.tsx`, `NotFound.tsx`, Education sub-indexes, `ReportConcern` form
- Form sections → `space-section-tight`.
- Field label → input gap unified to `mb-1.5`.
- Helper text → input gap unified to `mt-1.5`.
- 404: vertical padding from `py-32` → `py-24`.

### 5 — Tables & filter bars

Today every table sets its own row padding (`py-3`, `py-3.5`, `py-4`, `py-2.5`). Lock to:
- Table header row: `px-5 py-2.5`
- Table body row: `px-5 py-3`
- Empty-state padding: `py-10` (currently varies `py-6` to `py-10`)
- Filter bar to table gap: `mt-0` (filter section's own padding does the work) — currently has redundant `pt-3` plus the filter section's `py-3.5`

### 6 — What stays the same

All routes, all copy, all data, all colors, all interactive behavior. The footer, `SiteHeader`, and `MetadataBar` component itself are untouched. No new components. The only rename is deprecating `.section-heading` in favor of `.h-section`.

### Files touched

- `src/index.css` — add `.h-section`, `.h-sub`, `.h-card`, deprecate `.section-heading` (alias to `.h-section` for safety), tighten `.section`/`.section-tight` token values.
- `src/components/Section.tsx` — add `density` prop, retire over-spaced default, fix `SectionLabel` heading + gaps.
- `src/components/AnchorHeader.tsx`, `RecordHeader.tsx`, `ProfileHeader.tsx`, `UtilityHeader.tsx` — locked padding values listed above.
- `src/components/ui/card.tsx` — reduce default padding from `p-6` to `p-5`.
- All pages listed in §4 — mechanical class swaps, no content changes.
- `src/pages/VendorProfile.tsx`, `src/pages/GreenlistProfile.tsx` — migrate to `ProfileHeader` + `ProfileFootnote` (the one structural change in this pass; required for consistency with the other two profile types).

### Result

Same machine on every page. A visitor moving between Home → Vendors → a vendor profile → Governance → Apply feels four deliberately different page types but a single site — same heading scale within each tier, same vertical rhythm everywhere, same card density, same field labels. The "stacked, drag-and-drop" feeling resolves because the underlying tokens are no longer suggestions.

