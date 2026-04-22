

## Verified Vendors + Vendor Profile — Public Trust Layer

Reframe the directory page as the public record at the center of the company — clearer hero, restrained editorial styling, a status-meaning legend, a value-contrast section, and a calm vendor-application bridge. Simplify the profile into a formal public record where verified status feels prestigious-by-restraint and unverified status is unmistakably visible.

---

### `src/pages/VerifiedVendors.tsx` — restructured

**1 · Hero (replace BriefingHero invocation)**
Use the navy `BriefingHero` for tonal consistency with the home page.
- `tone`: `navy`
- `category`: `Public Vendor Record`
- `title`: `Verified Vendors`
- `statement`: `The public record of vendors and clinics tracked under the Source Standard framework. Each listing reflects whether a documented verification has been completed, is in progress, or is not on file.`
- Drop `docId`, `metadata`, `verifiedOn`. No actions — directory is the action.

**2 · "Why this page matters" — short three-statement row**
Light surface, immediately under the hero, no cards, hairline dividers between columns:
1. `A documented reference point` — consumers can check whether a vendor has completed Source Standard verification.
2. `What verified means` — a completed review against documented sourcing records is on file.
3. `What unverified means` — no completed verification is on file. It does not imply unsafe or noncompliant.

**3 · Refined status summary (replace 6-up HoverCard tile grid)**
Drop the dashboard tiles + hover cards. Replace with one editorial summary line + a single emphasized verified count:
- Inline meta line, muted/mono digits: `1,247 tracked · 312 verified · 48 under review · 872 unverified · 9 suspended · 6 removed` (live counts).
- Directly under it, a small two-line block giving Verified slightly more weight: large `312` numeral with `Verified vendors on the public record` label. Quiet, no boxed background, no tinted card. This is the only number that earns visual emphasis.

**4 · Search + filters — calmer premium utility**
Keep all functionality (search, status, state, city, focus, sort, reset, result count). Restyle:
- Drop the sticky bar's backdrop blur and shadow. Use a single hairline top border.
- Inputs/selects share `h-9`, `rounded-md`, `border-border/40`. No `rounded-[10px]`.
- Sort becomes a quieter inline control aligned right, with the result count.
- Reset becomes a plain text link, not a button.

**5 · Main table — editorial public record**
Strip the elevated card wrapper:
- Remove `rounded-[12px] border bg-card shadow-[…]`. Use `divide-y divide-border/50` rows on the page surface.
- Vendor / clinic name: `text-[14.5px] font-semibold text-foreground` (dominant anchor).
- Status: keep `StatusBadge`, but ensure verified reads as the most resolved (existing badge already supports this — no color changes).
- City / state and clinical focus: `text-[12.5px] text-muted-foreground`, lighter.
- Profile action: `View →` simple text link, no uppercase/tracking treatment.
- Mobile cards: remove `card-elevated` shell, plain `border-b` rows.

**6 · Status meaning legend — new short section directly under the table**
Five-row plain definition list (no card, no tint), one line each:
- `Verified` — completed review on file.
- `Under Review` — active review in progress.
- `Unverified` — no completed verification on file.
- `Suspended` — previously verified status temporarily paused.
- `Removed` — verification no longer in effect.
Each row: small status dot/badge + label + plain definition. Replaces the existing collapsed `<details>` methodology accordion.

**7 · Why verified status matters — value-contrast section**
3-up grid on muted surface, factual tone, no sales verbs:
- `For consumers` — a documented reference point beyond marketing claims.
- `For vendors` — public differentiation tied to reviewed records.
- `For the market` — sourcing transparency becomes easier to interpret when documented and undocumented operators are publicly distinguishable.

**8 · Final bridge to vendor application — calm two-line footer**
Full-width on white surface, one short two-column row (no navy band — the home page already owns that closer):
- Left: `For vendors seeking public verification` — short paragraph: verification is recorded only after documentation review is complete.
- Right: single quiet text link `Begin Verification →` to `/apply`.
Followed by one flat muted disclaimer paragraph at the very bottom (the existing methodology copy, distilled to one sentence; no accordion).

---

### `src/pages/VendorProfile.tsx` — formal public record

Goal: a tight public record. Verified profiles feel prestigious through restraint; unverified profiles make absence of verification unmistakable without sounding hostile.

**1 · Header — keep `ProfileHeader`, sharpen content**
- `eyebrow`: status-driven instead of a fixed "Verified vendor" label:
  - verified → `Verified vendor`
  - under-review → `Vendor under review`
  - unverified → `Listed vendor · Unverified`
  - suspended → `Vendor verification suspended`
  - removed → `Removed listing`
- `title`: vendor name (unchanged).
- `identity`: status badge + location + category (unchanged shape, lighter visual weight).
- `lead`: one plain sentence drawn from `vendor.summary` or, if missing, `VENDOR_STATUS_PROFILE_NOTE[status]`.
- `rightSlot` becomes a "Status at a glance" panel: status label, one-line meaning from `VENDOR_STATUS_PROFILE_NOTE`, last review date if applicable, and (verified only) review ID. Quiet bordered block, no tint.

**2 · Public record body — replace current 7/5 grid with two unnumbered sections**

- **Public record** (one `dl` definition list, no numbered subsection scaffolding):
  - Vendor · Public status · Location · Website · Medical director · Category · Clinical focus · Verified scope (only when status === verified, drawn from `verifiedCategories`) · Last review date (only when present) · Review ID (only when status === verified).
  - Empty fields render as `—`. No internal `Doc:` codes anywhere visible.
- **Upstream sourcing relationship** — single short paragraph or `dl` rows summarizing any documented upstream relationships when present in the vendor data (falls back to `vendor.publicNote` or omits the section entirely if no data).

**3 · Status interpretation note — short closing block**
Plain bordered strip, one paragraph from `VENDOR_STATUS_DISCLOSURE[status]` (already exists in `src/data/vendors.ts`). Plus a fixed one-liner: `Directory inclusion does not constitute medical advice, product endorsement, or a guarantee of clinical outcome.`

**4 · Status-specific surfacing**
- **Verified**: nothing celebratory — no ribbons, no large badges. The combination of the eyebrow, the status badge in identity, the verified scope row, and the review ID does the work. This is prestige-by-restraint.
- **Unverified**: the "Status at a glance" panel uses a plain border and reads `Unverified · No completed verification on file` in `text-foreground` weight. Below the public record, render a one-line plain note: `This vendor has not completed Source Standard verification.` No alarm color, no warning iconography — visibility through plain language and contrast against neighboring verified profiles.
- **Suspended / removed**: include current public note prominently above the public record when present.

**5 · `ProfileFootnote` — strip internal doc codes**
- Remove the `Doc: SS-REG-…` row.
- Keep `Listing` (status label), `Updated` (review date or `—`), `Jurisdiction`.

**6 · Breadcrumb** — unchanged.

---

### Files touched

- `src/pages/VerifiedVendors.tsx` — rewrite hero invocation; replace 6-up stats grid with inline summary + single emphasized verified count; add "Why this page matters" 3-up; soften filter bar styling; restyle table + mobile cards as editorial rows; add status-meaning legend; add "Why verified status matters" 3-up; replace `<details>` footer with vendor-application bridge + flat disclaimer.
- `src/pages/VendorProfile.tsx` — status-driven eyebrow; replace right-side status card with "Status at a glance" panel; replace 7/5 grid with unnumbered Public Record + Upstream Sourcing sections rendered as `dl`; add status interpretation closing note (using existing `VENDOR_STATUS_DISCLOSURE`); strip internal doc codes from `ProfileFootnote`.

### What stays the same

`BriefingHero`, `StatusBadge`, `ProfileHeader`, `ProfileFootnote`, `Breadcrumb`, `PageMeta`, `EmptyState`, all data and constants in `src/data/vendors.ts`, all routes, search/filter/sort/pagination logic, mobile responsiveness, the navy/cream global accent system, and every other page on the site.

