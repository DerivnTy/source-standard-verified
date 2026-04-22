

## Lock the Vendor Profile Template

Goal: stop tweaking the vendor profile page-by-page. Define one disciplined template with fixed spacing tokens, fixed section structure, and a fixed two-column body. Every vendor — verified, under-review, unverified, suspended, removed — renders through the exact same shell.

### The locked template

```text
┌──────────────────────────────────────────────────────────────┐
│  ← Back to Directory                          (top nav row)  │
├──────────────────────────────────────────────────────────────┤
│  ▔▔▔▔▔▔▔▔ status hairline ▔▔▔▔▔▔▔▔                          │
│                                                              │
│  IDENTITY BAND                              [Status Badge]   │
│  [MG]  CATEGORY · PUBLIC RECORD             status sentence  │
│        Vendor Name                          [Visit website]  │
│        ⏵ fulfillment · location · focus · hostname           │
│                                                              │
├───────────────────────────────────┬──────────────────────────┤
│  ABOUT                            │  TRUST RECORD            │
│  paragraph or fallback            │  Status                  │
│                                   │  Last reviewed           │
│  ───────────────────              │  Review ID               │
│                                   │  Source type             │
│  PUBLIC RECORD                    │  Clinical focus          │
│  Category      | Fulfillment      │  Medical director        │
│  Clinical foc. | Medical director │                          │
│  Source type   | Address          │  REVIEWED COMPONENTS     │
│                                   │  (verified only)         │
│  ───────────────────              │                          │
│                                   │  ─────────────           │
│  VERIFIED SCOPE (verified only)   │                          │
│                                   │  [ Report a concern ]    │
├───────────────────────────────────┴──────────────────────────┤
│  Public record footer line                                   │
└──────────────────────────────────────────────────────────────┘
```

Every profile uses this exact shell. Sections that don't apply for a status collapse cleanly without breaking the rhythm.

### Spacing & rhythm tokens (locked, used everywhere on this page)

- Section vertical padding: `py-10` desktop, `py-8` mobile — identical for About, Public Record, Verified Scope, and the Trust Rail.
- Section horizontal padding: `px-6 md:px-10` left column, `px-6 md:px-8` rail.
- Eyebrow → title gap: `mb-1.5`.
- Title → body gap: `mb-5`.
- Public Record `<dl>` row gap: `gap-x-12 gap-y-6`, fixed two-column on `sm+`.
- Rail row vertical: `py-3` with `border-b border-border/50`.
- Identity band: `px-6 md:px-10 pt-9 pb-8` (single fixed value, no per-page variation).

### Column alignment

- Body grid: `lg:grid-cols-12`, `lg:col-span-8` main / `lg:col-span-4` rail, with `lg:divide-x divide-border` so the vertical rule is one continuous line.
- Add `lg:items-stretch` on the grid and a min-height baseline so the rail's tinted background matches the main column's full height — no detached "card floating" feel.
- Each section in the main column ends with `border-b border-border last:border-b-0`. The rail uses the same internal divider rhythm.

### Locked section primitives

- `SectionHeading` already exists — standardize all eyebrow + title pairs through it (no inline `<p>+<h2>` variants).
- `Field` (dl item, label above value) — used **only** inside Public Record. Locked label style: `t-utility-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground`. Locked value style: `t-body-sm text-foreground font-medium`.
- `RailRow` (label left, value right) — used **only** inside Trust Record. Same label tokens; right-aligned value.
- `FallbackLine` (new, tiny) — single italic muted line used by About, Verified Scope, and any "Not on file" rail value, so the missing-data state is consistent.

### About section: stable height fallback

When `summary`/`publicNote` is empty, render the fallback inside a fixed `min-h-[5.5rem]` block so About always reserves the same vertical space. This is the single biggest fix for "some pages feel top-heavy and some feel too open."

### Public Record: locked field matrix

Always six rows in a fixed two-column grid (sm+):

1. Category | Fulfillment
2. Clinical focus | Medical director
3. Source type | Address (in-person/hybrid) **or** Service area (online)

Empty values render as a muted `—` instead of being removed, so the grid never collapses unevenly. This kills the "random stacking" behavior.

### Trust Rail: locked order

Status → Last reviewed → Review ID → Source type → Clinical focus → Medical director. Verified-only fields show "Not on file" (muted italic) for non-verified statuses instead of disappearing, so rail height is comparable across statuses. Reviewed Components block only renders for verified.

### Status theming (unchanged, just confirmed locked)

Hairline + monogram ring only — no other color variation between statuses. Theme map already exists in `THEME`.

### Mobile

Grid collapses to single column. Rail moves below main. All padding tokens drop one step (`py-10` → `py-8`, `px-10` → `px-6`). Identity band stacks: monogram + identity, then status cluster. No new mobile decisions — same template, vertical.

### Files touched

- `src/pages/VendorProfile.tsx` — refactor in place. Apply the locked tokens, normalize all section padding, switch Public Record to fixed six-row matrix with `—` fallbacks, add `min-h` to About, normalize rail to always-rendered ordered rows, ensure last-section borders collapse cleanly. No structural changes outside what's described.

No new components, no token/CSS changes, no impact on any other page.

### Out of scope

- Greenlist profile (separate template, separate pass if requested).
- Any new content (logos, accreditations, license fields, audit notes) — template first, content later.
- Color/typography token changes.

