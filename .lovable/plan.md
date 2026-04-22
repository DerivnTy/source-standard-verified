

## Vendor Profile — Single-Card Restructure

Aggressively simplify `src/pages/VendorProfile.tsx`. Strip every interpretive/explanatory section. Replace the multi-section scroll with **one full-width profile card** that holds identity, all record fields, and action buttons. Dense in information, sparse in explanation.

---

### What gets removed

- §2 "What this status means" (entire interpretation block)
- §5 "Verified scope" as a separate section
- §6 "Upstream sourcing" as a separate section
- §7 "Status history" as a separate section
- §8 "How to read this listing" (consumer guidance)
- §9 "Vendor pathway" as a separate section
- §10 "Continue reading" bridge section
- The `STATUS_INTERPRETATION` map (no longer needed)
- The right-slot "Status capsule" card in the hero
- The current `ProfileHeader` invocation with eyebrow/identity/lead/rightSlot scaffolding
- The bottom `ProfileFootnote` band

### New page structure (one screen, one card)

**1 · Compact identity row** (`bg-background`, tight top padding)
`container-wide`, `pt-8 pb-4`. Single horizontal row:
- Left: `vendor.name` as `h1` (text-[28px] md:text-[32px] semibold) · directly underneath, a single inline meta line: `StatusBadge` · `location` · `category` · `clinicalFocus[0]` (when present) — separated by middot dividers, all on one line on desktop, wrapping cleanly on mobile.
- Right (same row, hidden on mobile): primary `Visit website ↗` button + ghost `← Directory` link.
- No eyebrow, no lead paragraph, no breadcrumbs row above. Keep `Breadcrumb` component but compact.

**2 · Main profile card** (`bg-background`, full-width inside `container-wide`)
One bordered card (`border border-border`, no shadow, status-tinted 2px top border using existing `CAPSULE_BORDER` map). Internal padding `p-8 md:p-10`. Inside the card, a **2-column grid of record rows** (`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0`) so the card reads as dense, not stacked. Each row is `label / value`, hairline divider underneath, only populated rows render.

Fields rendered (in order, distributed across the 2 columns):
- Public status (with inline `StatusBadge`)
- Legal / public name
- Brand name (when distinct from `name`)
- Location
- Website (hostname link)
- Medical director
- Category
- Clinical focus
- States of operation (when available)
- Verified scope (verified only)
- Last review date (when present)
- Review ID (verified only, mono)
- Upstream source summary (verified + `publicNote` only — spans both columns as a short paragraph at the bottom of the grid)
- Verification status note (non-verified only — single muted line at bottom of grid spanning both columns, e.g. unverified → `No completed Source Standard verification is currently published.`)

**3 · Action area** (inside the same card, separated by a hairline divider, `pt-6 mt-6`)
Right-aligned cluster of small actions:
- Primary: `Visit website ↗` (when `vendor.website` exists)
- Ghost: `← Vendor Registry` → `/verified-vendors`
- For `unverified` / `removed` only: a quiet additional link `Begin Verification →` `/apply`
- For `verified`: no extra CTA
- For `under-review` / `suspended`: no extra CTA

**4 · Footer micro-line** (outside the card, `pt-6 pb-12`)
Single muted line, centered, `text-[11.5px] text-muted-foreground`:
`Public record · Updated {reviewDate || "—"} · No payment influences inclusion or status.`

That is the entire page. No additional sections.

---

### Visual rules

- One section, one card. No alternating `bg-surface-muted` bands.
- Tight vertical rhythm: hero identity sits at `pt-8`, card immediately below, footer micro-line below card. Whole page should fit on one screen at 1056×865 with minimal scroll.
- Status accents are subtle: status-tinted 2px top border on the card only (reuses existing `CAPSULE_BORDER` map).
- Verified prestige cue retained: small mono `REVIEW ID · {reviewId}` in the card, no other ornament.
- No interpretive copy anywhere. No "what it means / what it tells the public / what it does not imply." No "How to read this listing." No "Status history" section.
- Drop the page-level `SectionHeader` component usage on this page.
- Keep `PageMeta`, `Breadcrumb`, `StatusBadge`, `getVendor`, the `CAPSULE_BORDER` map, the `hostname` and `formatLocation` helpers, the `Row` primitive (refit to grid).

### Files touched

- `src/pages/VendorProfile.tsx` — full body rewrite to the single-card structure above. Remove `STATUS_INTERPRETATION` map, `NOTE_BORDER` map, `firstSentence` helper, `populatedHistory` logic, and `CapsuleRow`. Remove imports of `VENDOR_STATUS_PROFILE_NOTE`, `ProfileHeader`, `ProfileFootnote` (page now owns its own header layout). Repurpose the `Row` primitive to fit a 2-column grid.

### What stays the same

`StatusBadge`, `PageMeta`, `Breadcrumb`, `getVendor`, the `Vendor` / `VendorPublicStatus` types, `VENDOR_STATUS_LABEL`, the route `/directory/:slug`, all data in `src/data/vendors.ts` (no schema changes), and every other page on the site (Greenlist profile keeps its current structure — this change is scoped to vendor profiles only).

