# Tier A · Vendor Registry — Consumer-First Pass

Primary question the page must answer: **"Is my provider verified?"**

Nav label stays **"Vendor Registry"** per the governing plan. Only the page-level headline, supporting copy, and header microcopy shift to consumer framing. Filters, results, search, routing, JSON-LD, and business logic are untouched.

## Scope of changes (surgical, header band only)

### 1. `src/pages/VerifiedVendors.tsx`

Two edits:

- **`<PageMeta title>`** — change from `"Vendor Registry"` to `"Is Your Provider Verified? · Vendor Registry"`. Keeps the institutional destination name in the tab/SERP while leading with the consumer question.
- **`<RegistryHeader title>`** — change from `"Vendor Registry"` to `"Is Your Provider Verified?"`. This is the on-page headline; per the principle, headlines answer consumer questions.
- **Description prop** (used for both meta and header) — tighten to:
  *"Search the Source Standard Registry to see whether your provider has been independently verified and to better understand their peptide sourcing transparency."*
  (One-word swap: "find out" → "see". Everything else already reads consumer-first.)

No changes to the `indexNumber="01"` label, record-count pill, floating stats card, search input, filter pills, results grid, or pagination.

### 2. No other files touched

`RegistryHeader.tsx` stays as-is — it's a shared primitive; the page controls what strings flow in.

## What is deliberately not changed

- Filter labels ("Verification Status", "Delivery", "State", "Specialty") — these are operator-flavored but they're the actual filter dimensions; renaming them risks confusion. Revisit in the Phase 3 polish pass if the 30-second test flags them.
- The `RegistryHeader` "Live · date · N records" pill — institutional signal, consumer-neutral.
- Search placeholder — already consumer-phrased.
- JSON-LD name (`"Vendor Registry"`) — matches the institutional destination for SEO/schema.

## 30-second test after the change

A first-time visitor lands on `/verified-vendors` and sees, in order:
1. Headline: **Is Your Provider Verified?**
2. One-line description telling them to search.
3. Live record count.
4. Search field.
5. Results.

Primary question answered before the fold. Institutional framing preserved via the nav label, JSON-LD, and record-count pill.

## Files edited

- `src/pages/VerifiedVendors.tsx` (title + description strings only, ~3 lines total)

Confirm and I'll ship it.
