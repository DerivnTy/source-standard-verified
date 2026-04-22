

## Vendor Profile — Public Trust Product Restructure

Rebuild `src/pages/VendorProfile.tsx` so each profile reads as the public trust product of Source Standard — prestigious for verified vendors, plainly factual for unverified, calmly serious for under-review/suspended/removed. Replace the flat single-column record with a status-led identity hero, an interpretive status panel, an explicit verified-scope block, and a quiet vendor pathway. One structure for all five statuses; status-aware accents only.

---

### Section sequence

**1 · Identity hero** (`bg-background`, replaces current `ProfileHeader` invocation — keep the component, refine usage)
- Eyebrow: existing `EYEBROW_BY_STATUS[vendor.status]`.
- Title: `vendor.name`.
- Identity row (one compact line): `StatusBadge` (size `md`) · location (`city, ST`) · `category` · `clinicalFocus[0]` (when present).
- Lead: one-sentence plain description — prefer `vendor.summary` trimmed to first sentence; otherwise `VENDOR_STATUS_PROFILE_NOTE[status]`. Never paste a multi-paragraph summary in the hero.
- Right-slot **Status capsule** (refined, replaces current "Status at a glance"): bordered card, status-tinted top border (`border-t-2` in the same color family as the existing `StatusBadge` variant — `verified`, `pending`, `destructive`, `muted-foreground`). Rows: `Status`, `Public since` (when verified — uses `reviewDate`), `Last review`, `Review ID` (verified only, mono), `Renewal interval` (verified — `Annual` constant), `Website` (hostname link, or `Not listed` muted). Filter empty rows.
- Tighten hero vertical padding so the page leads with information, not whitespace.
- Remove the existing free-floating `Current note` block from the body — it relocates into Section 4 below.

**2 · What this status means** (`bg-surface-muted`, NEW interpretive anchor)
Centered `SectionHeader` (eyebrow `Interpretation`, title status-aware: `What "Verified" means` / `What "Unverified" means` / `What "Under Review" means` / `What "Suspended" means` / `What "Removed" means`).
Below, in a `max-w-3xl` column, three plain rows with hairline dividers:
- `What it means` — one sentence, status-aware.
- `What it tells the public` — one sentence.
- `What it does not imply` — one sentence.
Status copy lives in a new local `STATUS_INTERPRETATION` map inside the file (not a data-file change). Wording matches the user spec (e.g. Verified: `Records have been reviewed and support the published scope at the time of review.` / Unverified: `No completed Source Standard verification is currently published for this vendor.` / etc.). This block renders on every profile, identical structure, status-swapped wording.

**3 · Public record summary** (`bg-background`)
Centered `SectionHeader` (`Public record`, lede `The factual record on file with Source Standard.`). Replace the dense 12-col `<dl>` grid with the same plain stacked definition list pattern used on Greenlist profiles in a `max-w-3xl` column — `label-w-44 / value` rows, hairline dividers, only populated rows render. Show:
- Vendor · Public status · Location · Website · Medical director · Category · Clinical focus · Last review (when present) · Verified scope (verified only) · Review ID (verified only, mono).
Drop `DLRow` helper; use a small local `Row` matching the Greenlist pattern so the two record types share one visual language.

**4 · Current review note** (conditional, `bg-background`)
Only renders when `vendor.publicNote` exists AND `status` ∈ {`under-review`, `suspended`, `removed`}. Bordered card with status-tinted left border, eyebrow `Current note · as of {reviewDate || "—"}`, plain paragraph body. Repositioned here so it sits between record and verified-scope, never floating above the record.

**5 · Verified scope** (`bg-surface-muted`)
Centered `SectionHeader` (`Verified scope`, lede status-aware).
- **Verified path:** Plain stacked rows in `max-w-3xl`: `Verified category` (joined `verifiedCategories`), `Review date`, `Renewal interval` (`Annual`), `Review ID` (mono). If `verifiedCategories` is empty, fall back to `vendor.category`. Below the rows, a single muted line: `The listing reflects reviewed documentation within this scope at the time of review.`
- **Non-verified path** (unverified / under-review / suspended / removed): Render a quiet inset block titled `Verification not currently published` with a status-aware one-liner (e.g. unverified → `No completed Source Standard verification is currently published for this vendor. A vendor seeking review may begin the verification process.`). No empty record-grid scaffold.

**6 · Upstream sourcing relationship** (conditional, `bg-background`)
Renders only when `vendor.publicNote` exists AND `status === "verified"`. Centered `SectionHeader` (`Upstream sourcing`, lede `How this vendor connects to the upstream reference layer.`). One short paragraph in `max-w-3xl` using `vendor.publicNote`. No fabricated relationships when data is absent — the section simply omits.

**7 · Status history** (`bg-surface-muted`)
Centered `SectionHeader` (`Status history`). Plain stacked rows in `max-w-3xl`, hairline dividers, only populated rows render:
- `Current status` — `VENDOR_STATUS_LABEL[status]`
- `Status since` — `reviewDate` (verified) / `—` otherwise
- `Last review date` — `reviewDate`
- `Active review` — `Yes` (under-review) / `No` (others)
- `Lapsed / suspended / removed` — `reviewDate` (when status ∈ those three)
If fewer than 2 rows populate, render a single muted line: `No prior status events on file.` — prevents a one-row section.

**8 · How to read this listing** (`bg-background`, NEW consumer guidance)
Centered `SectionHeader` (`How to read this listing`). Three short bullets in `max-w-3xl` with hairline dividers, identical wording across profiles:
- A verified listing reflects completed review within the published scope.
- An unverified listing means no completed review is currently published.
- This page is a public reference. Clinical decisions still belong with licensed providers.

**9 · Vendor pathway** (`bg-surface-muted`, status-aware tone)
- **Unverified / removed:** Centered `SectionHeader` (`For this vendor`). One factual sentence: `This vendor does not currently have a published Source Standard verification.` + a single quiet primary link `Begin verification → /apply`. Restrained, not salesy.
- **Verified:** A single quiet line: `This listing is a published Source Standard verification record.` No CTA.
- **Under review / suspended:** A single muted line stating current standing; no CTA.

**10 · Continue reading — quiet bridge** (`bg-background`)
Small eyebrow `Continue reading`, four quiet text links in a single row (single column on mobile), hairline dividers between:
- `Back to Verified Vendors → /verified-vendors`
- `How Verification Works → /how-it-works`
- `View Upstream Greenlist → /greenlist`
- `Status Definitions → /status-definitions`

**11 · Footer**
Keep `ProfileFootnote` as-is: `Listing` · `Updated` · `Jurisdiction`. Add a short `note` slot beneath: `Public record. No payment influences inclusion or status.` — matches the Greenlist profile footer rhythm.

---

### Status-aware accents (subtle, never loud)

- Status capsule uses a 2px top border in the existing `StatusBadge` color family (`verified`, `pending`, `destructive`, `muted-foreground`). No background tints elsewhere — the rest of the page stays neutral.
- Verified profiles get one extra dignity cue: a small mono `REVIEW ID · {reviewId}` line under the title in the hero (only when `reviewId` exists). This makes verified feel like an indexed public asset.
- Unverified profiles get no negative styling — neutrality with the absence framed plainly in §2 and §5.
- Suspended / removed use the existing `destructive` and `muted-foreground` palette only on the status capsule border and the §4 left border.

### Visual rules

- One consistent profile structure across all 5 statuses; status only swaps copy and the capsule accent.
- Centered `SectionHeader` rhythm + `max-w-3xl` content columns — matches About / Education / How Verification Works / Greenlist Profile.
- Surfaces alternate `bg-background` ↔ `bg-surface-muted` between sections 2–10.
- Hairline dividers via `border-border`. No card shadows. Bordered micro-cards only on the hero status capsule and the §4 current note.
- Drop the dense 12-col `<dl>` grid; use the same plain stacked rows the Greenlist profile now uses, so the two record types share one visual language.
- Tighten hero vertical padding so status, identity, and capsule sit above the fold.
- No promotional language anywhere; no marketing CTAs on verified profiles.

### Files touched

- `src/pages/VendorProfile.tsx` — full body rewrite. Refine hero (compact identity row, status capsule with status-tinted top border, optional `REVIEW ID` micro-line for verified), add new local `STATUS_INTERPRETATION` map and §2 interpretive block, replace the dense `<dl>` with a Greenlist-style stacked row pattern, reposition the current-note block, add §5 Verified scope (with non-verified fallback), conditionally render §6 Upstream sourcing for verified, add §7 Status history, add §8 How to read this listing, add status-aware §9 Vendor pathway, replace the disclosure block with the §10 Continue-reading bridge, extend `ProfileFootnote` with a one-line public-record note.

### What stays the same

`ProfileHeader`, `ProfileFootnote`, `StatusBadge`, `Section`, `PageMeta`, `Breadcrumb`, `getVendor`, the `Vendor` / `VendorPublicStatus` types, `VENDOR_STATUS_LABEL`, `VENDOR_STATUS_PROFILE_NOTE`, `VENDOR_STATUS_DISCLOSURE`, the route `/directory/:slug`, all data in `src/data/vendors.ts` (no schema changes), and every other page on the site.

