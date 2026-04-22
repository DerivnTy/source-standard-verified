

## Unified Registry Integration — Unverified & Flagged Facilities

Weave Unverified / Flagged / Shut-Down entries directly into the Greenlist (and Verified Vendors where applicable), alphabetically alongside 503B and 503A entries. The table stays clean — a soft-red status badge is the only signal. The Profile page does the heavy lifting with a dedicated **Regulatory Alert** block exposing status, reason, and source proof.

---

### 1 · Data model — extend `GreenlistEntry`

`src/data/greenlist.ts`:

**a. New alert subtypes** under the existing `Other` category (no new top-level category needed — keeps the Green/Amber/Red traffic light intact):

```ts
export type AlertStatus =
  | "shut-down"          // FDA action / ceased operations
  | "no-longer-registered" // present on FDA list previously, absent now
  | "not-on-fda-list"    // claims registration but never listed
  | "unverified";        // generic, no audit submitted
```

**b. New `regulatoryAlert` field** on `GreenlistEntry` (optional — only populated for flagged/unverified facilities):

```ts
regulatoryAlert?: {
  status: AlertStatus;        // drives badge label + alert banner
  shortLabel?: string;        // table cell override, e.g. "No Active Registration"
  asOf: string;               // ISO date (e.g. "2026-04-16")
  reason: string;             // 1–3 sentence objective summary
  proof: { label: string; url: string }[]; // FDA links, snapshots, warning letters
};
```

**c. Type addition** — extend `GreenlistType` with `"Unverified Facility"` so the type column has a valid label for non-503-status entries.

**d. Two seed records** (Examples A & B from the brief) appended to `greenlistEntries`, both `category: "Other"`, with full `regulatoryAlert` blocks and proof links.

### 2 · Table integration — clean & alphabetical

`src/pages/Greenlist.tsx`:

- **No structural change** to filtering/sorting/pagination — entries with `category: "Other"` already flow through. Default `name-asc` sort already interleaves them alphabetically.
- **Status column** (currently shows `<CategoryPill>` for 503B/503A): for entries with `regulatoryAlert`, render an additional **soft-red status badge** (e.g. "UNVERIFIED" / "NO ACTIVE REGISTRATION") *underneath* the `CategoryPill` using the existing `--src-unverified` / `--src-unverified-soft` tokens. Same soft-badge style as the `Other` pill but using `regulatoryAlert.shortLabel` when present (else a default mapped from `AlertStatus`).
- **Alphabetical interleaving** — confirmed by default `name-asc`. No new "Flagged" section; entries appear inline like everyone else.
- **Filter dropdown** — the existing `Unverified` option already filters `category === "Other"`, which now correctly captures these entries. No filter-logic change.
- **Mobile card** — same soft-red badge appended below the source-type pill.

### 3 · Profile page — Regulatory Alert block

`src/pages/GreenlistProfile.tsx`:

When `entry.regulatoryAlert` is present, render a new **`SubSection` "00 — Regulatory Alert"** *above* "01 Regulatory & Quality":

```
┌────────────────────────────────────────────────────────┐
│  00  REGULATORY ALERT                                  │
├────────────────────────────────────────────────────────┤
│  Current status      [SHUT DOWN / NO LONGER REGISTERED]│
│  As of               April 16, 2026                    │
│  Reason for alert    Present on FDA's 503B registry…   │
│  Source proof        ↗ FDA Registry Snapshot           │
│                      ↗ Warning Letter (2024)           │
└────────────────────────────────────────────────────────┘
```

Container uses red token chrome (`bg-[hsl(var(--src-unverified-soft))]/40`, `border-[hsl(var(--src-unverified))]/30`) so it reads as an alert banner, not a generic block. Soft, institutional — not loud.

**Header changes** for alert entries:
- `identity` row: replace the green "Greenlisted" pill with a soft-red badge using `regulatoryAlert.shortLabel` (e.g. "UNVERIFIED — NOT ON FDA LIST"). Dot uses `--src-unverified`.
- `eyebrow`: `"Greenlist source"` → `"Unverified facility"` when alert is present.
- `lead`: pulls from `regulatoryAlert.reason` (truncated) instead of `background` when alert exists, so the "what's wrong" lands above the fold.

**Footnote**: `Listing` field changes from `"Greenlist Facility"` → `"Unverified Facility"` when alert is present.

### 4 · Verified Vendors — already supports this pattern

`src/pages/VerifiedVendors.tsx` already has `unverified` / `under-review` / `suspended` statuses with `<StatusBadge>` rendering soft-red for `suspended`. **No change needed** — the brief's "weave unverified into the table" is already true here.

We will add an optional `regulatoryAlert` block to `VendorProfile.tsx` mirroring the Greenlist treatment, surfaced when `vendor.publicNote` is upgraded to a structured alert. Out of scope for this pass unless data is added; type definition added now so future entries slot in cleanly.

### 5 · Tokens — already exist

`--src-unverified` (deep crimson) and `--src-unverified-soft` (light alert red) tokens added in the previous pass. No CSS changes required.

---

### Files touched

- `src/data/greenlist.ts` — add `AlertStatus` type, `regulatoryAlert` optional field on `GreenlistEntry`, extend `GreenlistType` with `"Unverified Facility"`, append two seed entries (Examples A & B).
- `src/pages/Greenlist.tsx` — render soft-red status badge under `CategoryPill` for entries with `regulatoryAlert` (desktop row + mobile card). Tiny helper `AlertBadge` component co-located.
- `src/pages/GreenlistProfile.tsx` — render new "00 — Regulatory Alert" `SubSection` above "01"; swap header eyebrow / identity pill / lead when alert present; footnote `Listing` label updates.

### What stays the same

All routes, filtering / sorting / pagination logic, `CategoryPill` styling for 503B / 503A / generic Other, stat strip, sticky filter bar, methodology accordion, `StatusBadge`, `SourceCheck`, every other page, the global token system, dark-mode behavior. Additive changes only — existing entries without `regulatoryAlert` render exactly as today.

