

## Global Page Formatting & Hierarchy System

A sitewide formatting cleanup. Establish one disciplined editorial grid, eliminate over-centered body content, and apply a single typographic + spacing hierarchy to every page that currently feels templated. No content rewrites — composition only.

---

### 1 · Establish the canonical body grid (one system, used everywhere)

The site already has a strong editorial grid — `BoardSection` (used by `Governance`, `Accountability`, `StatusDefinitions`, `MedicalAdvisory`). It pairs a left meta column (`§N · CATEGORY`, title, rationale) with a right content column. This becomes the **canonical body section** for every major standards/policy/about page.

The pages drifting from this system — `About`, `HowItWorks`, and any future page using a centered `SectionHeader` — get rebuilt onto it.

**Three width tiers, applied consistently:**
- `narrow` (max-w-[680px]) — legal text, single-statement sections, intros
- `editorial` (max-w-[920px]) — standard prose + grid sections (the default)
- `wide` (container-wide, max-w-[1280px]) — tables, profile cards, multi-column structured records

No section picks its own ad-hoc width. The width comes from the section primitive.

### 2 · Lock the typographic hierarchy

The CSS tokens already exist in `src/index.css` (`.title-page`, `.h-section`, `.h-sub`, `.h-card`, `.eyebrow`, `.meta`, `.meta-mono`, `.text-helper`). The problem is pages bypass them with one-off `text-[1.625rem]` / `text-[15.5px]` / `text-[14.5px]` values.

**Sitewide rule (enforced via section primitives):**
| Role | Class | Notes |
|---|---|---|
| Page title (H1) | `.title-page` (or `.display-1` on Home cover only) | One per page |
| Section title (H2) | `.h-section` | Inside `BoardSection` |
| Subsection (H3) | `.h-sub` | |
| Card / row label (H4) | `.h-card` | |
| Eyebrow / overline | `.eyebrow` (sentence case) or `.meta-mono` (technical) | Pick one per context |
| Body | default `body` (16px / 1.6) | |
| Helper / meta | `.text-helper` or `.meta` | |

Audit `About.tsx` and `HowItWorks.tsx` for arbitrary text sizes (`text-[15.5px]`, `text-[20px]`, `text-[1.625rem]`, etc.) and replace with the tokens above.

### 3 · Lock the vertical rhythm

`src/index.css` already defines a 3-step ladder (`.section-band`, `.space-section`, `.space-section-doc`, `.space-section-tight`). Apply it consistently:

- Hero → first content section: `.space-section-doc` (no extra top spacing on first section)
- Between major sections on standards pages: `.space-section-doc` (py-16 md:py-20)
- Helper bands / cite-as / signature: `.space-section-tight` (py-12 md:py-16)
- Inside-section header → body gap: `mb-8` (one value, sitewide)
- Body paragraph → list/table: `mt-5`
- List item internal spacing: `py-4` (text rows) / `py-5` (titled rows)

Pages stop choosing their own `py-12 md:py-16` per section.

### 4 · Eliminate over-centering — page-by-page actions

**`src/pages/About.tsx` — full rebuild onto `BoardSection`:**
Replace every centered `SectionHeader` + centered prose block with `BoardSection` (left meta, right content). Keep all current copy. Specifically:
- "Why this exists" → `BoardSection n="1" category="Context" title="Consumers shouldn't have to decode marketing claims."` with the two paragraphs left-aligned in the right column.
- "What Source Standard is" → `BoardSection n="2" category="Definition"`.
- "What Source Standard is not" → `BoardSection n="3" category="Boundaries"` with the 6-item list as a left-aligned bordered list.
- "Operating principle" — **keep centered** (single short statement = legitimate use of centering, per user's rule). Wrap in a tighter `.space-section-tight` band, narrow width (max-w-2xl).
- "Who this serves" → `BoardSection n="4" category="Audiences"` with the two-column split inside the right column.
- "Principles" → `BoardSection n="5" category="Principles"` with the numbered list.
- "Scope & boundaries" → `BoardSection n="6" category="Scope"` with the two-column within / outside split.
- "Mission" — **keep centered**, same treatment as "Operating principle" (short emphatic statement).
- "Continue reading" → footer-style `BoardSection` with the link grid, no `text-center`.
- Add `DocJumpBar` waypoints + `Breadcrumb` (currently missing) so it matches `Governance` / `Accountability` chrome.

**`src/pages/HowItWorks.tsx` — same treatment:**
Replace the centered `SectionHeader` and the `text-center` body blocks. Every section becomes a `BoardSection`. Specifically:
- "What verification means" → `BoardSection n="1" category="Definition"` — body left-aligned, no `text-center`.
- "Core principles" → `BoardSection n="2" category="Principles"`.
- "Scope of the review" → `BoardSection n="3" category="Scope"` with the within/outside two-column split.
- "Status definitions" → `BoardSection n="4" category="Standings"` — list left-aligned, the "Full status definitions →" link sits at the bottom of the right column, no `text-right` on a centered container.
- "What the review looks at" → `BoardSection n="5" category="Examination"`.
- "Review lifecycle" → `BoardSection n="6" category="Lifecycle"`.
- "Ongoing surveillance" → `BoardSection n="7" category="Surveillance"` — the lead paragraph and the change list both left-aligned (currently `text-center`).
- "After a determination" → `BoardSection n="8" category="Outcome"`.
- "Why entities apply" → `BoardSection n="9" category="Rationale"`.
- "Jurisdictional limitations" → `BoardSection n="10" category="Limits"`.
- Add a `DocJumpBar` with these 10 waypoints (HowItWorks already has the right `DOC_ID`, just isn't showing the rail).

**Sweep for `text-center` in body content elsewhere:**
Any other page that uses `text-center` outside the hero, a single-statement emphasis section, or the home cover gets the same conversion. Specific known offenders to check and de-center if found: `Education.tsx`, `FAQ.tsx`, `Apply.tsx`, `Contact.tsx`, `ReportConcern.tsx`, `VerificationDisclaimer.tsx`, `HowToReadTheDirectory.tsx`. Centering is preserved only for: hero/cover, named "principle/mission" callouts, cite-as footers, and the global utility bar.

### 5 · Standardize section chrome

- All `BoardSection` instances render with the same border + alternating bg pattern they already use — no per-page color overrides.
- Section eyebrows: technical contexts use `.meta-mono` (uppercase, mono); editorial contexts use `.eyebrow` (uppercase, sans, looser tracking). Pages stop mixing both within the same page.
- Buttons: the site already has `Button` variants — every page uses `<Button asChild>` for actions. No more bespoke `<Link className="text-primary hover:underline">` styled to look like a CTA.
- List markers: numbered editorial lists use the `01 / 02` mono index (matches `BoardSection` / `BoardDefList`). Bulleted lists use the em-dash convention (`— item`) already set up. Pick one per list, never mix.

### 6 · Files touched

- `src/pages/About.tsx` — full composition rebuild onto `BoardSection`. Add `Breadcrumb` + `DocJumpBar`. Replace the local `SectionHeader` helper. Copy preserved.
- `src/pages/HowItWorks.tsx` — full composition rebuild onto `BoardSection`. Add `DocJumpBar`. Remove the local `SectionHeader` helper and every `text-center` in body sections. Copy preserved.
- `src/pages/Education.tsx`, `src/pages/FAQ.tsx`, `src/pages/Apply.tsx`, `src/pages/Contact.tsx`, `src/pages/ReportConcern.tsx`, `src/pages/VerificationDisclaimer.tsx`, `src/pages/HowToReadTheDirectory.tsx` — targeted audit pass: replace any `text-center` body sections with left-aligned editorial layout, swap arbitrary text sizes for tokens, normalize section spacing to the ladder. No structural rebuild unless a page is using the same centered-SectionHeader anti-pattern.
- `src/components/Section.tsx` — extend the existing primitive with a documented `width` prop (`narrow` | `editorial` | `wide`) so doc/policy pages have one consistent width API. Defaults preserved (`editorial` = current 920px). No breaking changes to existing callers.

### 7 · What stays the same

- The Home cover (`BriefingHero variant="cover"`) — its centered composition is the deliberate top of the hierarchy.
- The `chapter` variant of `BriefingHero` on every other major page — already correctly tightened in the previous loop.
- All page chrome: `SiteHeader`, `GlobalUtilityBar`, `SiteFooter`, `Breadcrumb`, `DocJumpBar`, `RecordHeader`, `DocSignature`, `BoardSection`, `BoardDefList`, `BoardCiteFooter`, `Callout`, `StatusBadge`.
- All routes, all data, all profile pages (vendor + greenlist already on the single-card system).
- All copy on every page.

### Outcome

Every major page becomes a left-aligned editorial document built on one grid (`BoardSection`), with one type system, one spacing ladder, and one width API. Centering is reserved for: the home cover, chapter intros, single-statement emphasis blocks, and cite footers — nothing else. The site reads as one continuous institutional framework instead of a stack of dragged-in modules.

