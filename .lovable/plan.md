

## Institutional Redesign: From Marketing Site → Standards Platform

The current site reads like a SaaS landing page — oversized centered hero text, generous luxury spacing, and section-by-section "campaign" rhythm. This plan rebuilds the visual system so the site reads like a public registry / standards body where authority is *expressed*, not *sold*.

### 1. Global typographic & spacing system (`index.css`, `tailwind.config.ts`)

Reduce display scale across the site to editorial/institutional proportions:

- Hero `h1`: drop from `text-7xl` → roughly `text-3xl md:text-4xl` (28–36px), tighter leading, left-aligned by default.
- Section `h2`: drop from `text-4xl` → `text-2xl md:text-[1.75rem]`, semibold, not bold-display.
- Body: standardize on 14–15px with 1.65 line-height; muted-foreground darkened slightly for stronger contrast/gravity.
- Add a metadata text style (`.meta`): 11px mono, tabular-nums, used for IDs, versions, timestamps, statuses.
- Tighten section vertical rhythm: `py-20/28` → `py-14 md:py-20`. Less luxury whitespace, more density.
- Darken `--foreground` and `--border` a touch so line work feels sharper and more registry-like.

### 2. Global page chrome

**`SiteHeader`**
- Add a thin top utility strip above the main header: left side `SOURCE STANDARD · PUBLIC VERIFICATION REGISTRY`, right side `EST. 2026 · TAMPA, FL`. Sets institutional tone before the nav even renders.
- Tighten nav typography to 12px uppercase tracked labels (reference-site feel rather than product-site feel).
- Keep the green Apply button but reduce its visual dominance slightly.

**`SiteFooter`**
- Restructure into a 4-column institutional footer: Registry / Standards / Organization / Legal — each a column of small links and metadata, plus a "Document version 2026.01" line. Reads like a gov/standards-body footer.

**New shared component: `RecordHeader`** (replaces `PageHeader` usage on registry-style pages)
- Renders a top metadata bar (`Document ID · Version · Last Updated · Status`), a small eyebrow, a restrained left-aligned title, a formal lead paragraph, and an optional summary metadata grid below. Used on Greenlist, Verified Vendors, How It Works, About.

### 3. Homepage rebuild (`Index.tsx`)

Replace the centered marketing hero with a structured institutional opening:

```text
┌──────────────────────────────────────────────────────────────┐
│ DOC SS-FRAMEWORK-2026.01   STATUS: ACTIVE   UPDATED 04/20/26 │  ← metadata bar
├──────────────────────────────────────────────────────────────┤
│ PUBLIC VERIFICATION FRAMEWORK                                │  ← eyebrow
│                                                              │
│ Source Standard.            ┌────────────────────────────┐   │
│ A documentation-first       │ FRAMEWORK SNAPSHOT         │   │
│ verification standard for   │ ─────────────────────────  │   │
│ peptide, TRT, and hormone   │ Greenlist categories   03  │   │
│ optimization vendors.       │ Verified vendors       00  │   │
│                             │ Pending review         00  │   │
│ [supporting paragraph...]   │ Jurisdiction        FL/US  │   │
│                             │ Launch              Q1 '26 │   │
│ [Browse Greenlist] [Apply]  └────────────────────────────┘   │
│ Florida Launch 2026 · Documentation-First Model              │
└──────────────────────────────────────────────────────────────┘
```

- 7/5 column split, left-aligned title (~36px), no oversized centered text.
- Right panel = always-visible "framework snapshot" data block (small registry table).
- Buttons smaller (h-11), squared, secondary as ghost/underline rather than equally-weighted outline.

Subsequent homepage sections become more registry-like:
- **Operating philosophy:** numbered table-style rows (`01 / Documentation-first / definition…`) with hairline dividers, not card grids.
- **Lifecycle:** numbered editorial list with left-rail step numbers and right-side procedural text — replaces the 3-col card grid.
- **Greenlist preview:** kept, but styled as a compact registry table with column headers (Category / Scope / Status / Ref).
- **Verified vendors preview:** small empty-state row inside a registry frame, not a centered hero card.
- **Final CTA:** condensed single hairline strip, not a full section.

Copy tightening: replace promotional phrasings with procedural language ("Recognized upstream sources", "Time-bound verifications", "Public review identifier issued").

### 4. Greenlist page (`Greenlist.tsx`)

- Swap `PageHeader` for `RecordHeader` with metadata bar (Doc ID, version, jurisdiction, status).
- Reduce category section headlines from `text-3xl` → `text-xl`.
- Convert criteria from bordered list-cards into a numbered reference list (`§1.1`, `§1.2` style) with hairline dividers.
- Tighten the entries table: smaller header type, monospaced reference codes, deep-green status dots instead of pill badges.
- Add a left-side persistent "Section index" (01 503B / 02 503A / 03 Other) so it reads like a navigable standard.

### 5. Other pages (consistent application)

- **Verified Vendors:** `RecordHeader` + registry frame with column headers visible even when empty; the empty state becomes one inline row stating "No published records. First entries: Q1 2026." instead of a centered hero card.
- **How It Works:** numbered procedural sections with left-rail step numbers, hairline dividers, and a small "Process reference" metadata block at top.
- **For Vendors:** two-column layout — left: requirements as a numbered standard; right: sticky "Submission checklist" panel.
- **Education:** tighter table-of-contents layout. Categories become a left index, forthcoming references become a dense right-side list with `REF-###` codes, status, and publish date columns.
- **About:** editorial article layout (single column, left-aligned, structured subheads, marginal metadata).
- **Apply / Contact:** form layouts get a metadata header, smaller field labels, and a structured 2-column form/sidebar grid.

### 6. Component tweaks

- `StatusBadge`: switch from filled pills to small uppercase text with a leading colored square (`■ VERIFIED`) — registry/legal style.
- `Section` primitive: reduced default padding; add a `framed` variant that draws a hairline border + metadata bar at top (used for registry sections).
- Remove decorative `Database` lucide icon from empty states; replace with text-only "NO RECORDS" label.

### Files touched

- Edit: `src/index.css`, `tailwind.config.ts`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, `src/components/PageHeader.tsx`, `src/components/Section.tsx`, `src/components/StatusBadge.tsx`, `src/pages/Index.tsx`, `src/pages/Greenlist.tsx`, `src/pages/VerifiedVendors.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/ForVendors.tsx`, `src/pages/Education.tsx`, `src/pages/About.tsx`, `src/pages/Apply.tsx`, `src/pages/Contact.tsx`.
- Create: `src/components/RecordHeader.tsx`, `src/components/MetadataBar.tsx`.

### Outcome

After this pass, every page opens with a metadata bar, a restrained left-aligned title, and procedural body content laid out on a tighter grid. Buttons, badges, and tables read like a public registry. No centered marketing heroes. No oversized display type. The site stops asking for trust and starts behaving like the reference layer it claims to be.

