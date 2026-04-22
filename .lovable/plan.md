

## Site-wide refinement pass

A single coordinated cleanup that takes the homepage standard and enforces it across the entire site. Token spec, shared headers, eyebrow discipline, voice, and dead-content removal — all in one pass. Not a redesign. Alignment, tightening, authority.

### Sequence of work

```text
1. Token spec        → fix CSS to match the locked spec
2. Shared headers    → BriefingHero / RecordHeader / AnchorHeader cleanup
3. Page sweep        → every page in src/pages/*, alphabetical
4. Editorial pass    → eyebrow trims, redundancy removal, voice fixes
```

---

### 1 · Token spec (src/index.css)

The CSS spec drifted from the locked numbers the user just stated. Bring the token classes into exact alignment so every page that uses them inherits the fix.

| Token | Current | Locked | Action |
|---|---|---|---|
| `.t-section-title-sm` | 28/36 | **30/38** | update |
| `.t-page-title` (md+) | 48/56 | 48/56 | keep |
| `.t-page-title` (mobile) | 36/44 | 36/44 | keep (graceful step-down) |
| `.t-section-title-md` | 32/40 | **36/44** | update |
| `.t-h3` | 24/32 (md) | 24/32 | keep |
| `.t-h4` | 20/28 (md) | 20/28 | keep |
| `.t-body-md` | 18/30 | 18/30 | keep |
| `.t-body-lg` | 19/32 | 19/32 | keep |
| `.t-body-strong` | 18/30 weight 500 | **18/30 weight 600** | update |
| `.t-utility-xs` | 12/16 | 12/16 | keep |
| `.t-eyebrow-sm` | 13/18 | 13/18 | keep |
| `.t-label-sm` | 14/20 | **14/18** | update |

Also: deprecate (visually no-op alias to canonical tokens) the legacy `.title-page`, `.title-doc`, `.h-section`, `.h-sub`, `.h-card`, `.display-1`, `.display-2`, `.section-heading` so any straggler markup snaps into the new system instead of holding old sizes. Leave the class names in place to avoid breakage; redirect their `@apply` to the canonical `t-*` tokens.

---

### 2 · Shared headers

**`BriefingHero` (chapter variant)**
- Already correct: uses `t-chapter-title`, `t-body-md`, `t-eyebrow-sm`. No structural change.
- Remove the legacy "dense" branch (`isDense`/`rightRail` path) — unused, drifts to `text-[28px]/[32px]/[38px]` ad-hoc sizes. If never called, delete the branch; if called, route it through the same tokens as the chapter branch.
- Drop the cover-only inner mini-eyebrow on white surface (kept on navy cover for the homepage rhythm).

**`RecordHeader`**
- Replace `eyebrow` rendered with `.eyebrow` (11px) → `t-eyebrow-sm` (13px).
- Replace `title` rendered with `.title-page` → `t-page-title`.
- Replace `lead` rendered with `t-body-sm` → `t-body-md`.
- Remove the `Reference` aside box's "Download · PDF" link from policy pages where no PDF actually downloads (it's a dead link). Keep the metadata `<dl>`. The `downloadable` prop already exists — flip default to `false`, opt back in only when a real PDF is attached.

**`AnchorHeader`**
- Replace `.eyebrow` (11px) → `t-eyebrow-sm`.
- Replace `.display-1`/`.title-page` → `t-page-title` (one canonical H1 token across all anchor pages).
- Replace lead `t-body-sm leading-[1.65]` → `t-body-md`.
- Add a thin 12px hairline rule above the eyebrow on the centered (no-aside) variant — gives the opening section the subtle structural anchor the user asked for without visual noise.

**`PageHeader`** — already on the canonical `Eyebrow` / `PageTitle` / `Lead` system. No change.

**`BoardSection`**
- Already on canonical tokens. Tighten the right-rail body from `t-body-md` muted → keep `t-body-md` but switch color to `text-foreground/85` so multi-paragraph rationale doesn't read as faint as metadata. (Inner `<p>` overrides preserved.)
- Strip the `category` eyebrow when a section is the *first* `BoardSection` on a page that already has a `BriefingHero` showing a section number — the duplicate `§N · CATEGORY` echoes the hero. Make the eyebrow optional and only render when explicitly passed.

---

### 3 · Page sweep

Every page in `src/pages/`. The recurring fixes applied across the board:

**Typography drift fixes (every page)**
- Replace ad-hoc `text-[14.5px]`, `text-[15px]`, `text-[1.25rem]`, `text-[26px]`, `text-[28px]/[32px]/[38px]` with the closest canonical `t-*` token.
- Replace `.eyebrow` (11px) usages with `t-eyebrow-sm`.
- Replace `.h-section`, `.h-sub`, `.h-card`, `.title-page`, `.title-doc` with `t-section-title-sm`, `t-h3`, `t-h4`, `t-page-title` respectively.
- Replace `meta-mono` eyebrow patterns (e.g. `font-mono uppercase tracking-[0.18em]`) with `t-utility-xs` — same visual weight, single token.

**Eyebrow discipline (every page)**
- Hero may carry one eyebrow (the hero's `category` prop already does this).
- Section eyebrows: only when the section title alone doesn't orient the reader. Default = no eyebrow.
- Concretely: strip eyebrow from sections where the H2 is self-explanatory ("Read deeper", "Continue reading", "Why this matters", "Begin intake"). Keep on ordinal/structural sections (`§N · Anchors`, `§N · Lifecycle`) on policy/governance pages where the numbering carries authority.
- Never two eyebrows above one heading. Audit and remove.

**First-section anchor (every page)**
- After the hero, the first section currently lands flat. Add a 1px hairline rule above the eyebrow line (or directly above the H2 when no eyebrow), 32px wide, `bg-border` — same restrained accent the homepage uses. One token, no decoration.

**Spacing rhythm (every page)**
- Replace `py-12 md:py-16`, `py-14`, `py-16 md:py-20`, `space-section-tight`, `space-section`, `section-tight` with the canonical `section-pad` utility.
- Replace `container-wide` with `page-shell` + a `w-standard` inner wrapper. (`container-wide` already aliases to a different max-width — 1280 vs the spec's 1440 outer / 1120 content. This is the single largest source of width drift.)

**Per-page editorial fixes (highlights, not exhaustive)**

- **About** — Cut beliefs/operating-principle/mission centered emphatic blocks (§ duplicate the same idea three times). Keep §1 Context, §2 Definition, §3 Boundaries, §4 Audiences, §6 Scope, §7 Continue reading. Drop §5 Principles (redundant with §2+§3). Result: 6 sections instead of 9.
- **HowItWorks** — Keep the 10-section structure (it's the SOP and earns the depth). Apply token + eyebrow + spacing fixes. Strip duplicated `category` eyebrows where the section title repeats it ("Definition" eyebrow over "Definition" title — drop the eyebrow).
- **Education / Resource Library** — Delete the duplicated "Forthcoming formats" section (lines 454–478, an exact second copy with `container-wide` instead of `page-shell`). Collapse "Latest analysis" + "Verification & due diligence" into one (they currently render the same `verificationEntries` array twice). Drop redundant period at end of section titles ("Start here." → "Start here").
- **MedicalAdvisory** — Replace the bespoke `py-14 border-b border-border/40` sections with `section-pad`. Replace `.h-section` → `t-section-title-sm`. Strip the "Why this Board exists" / "Role in the framework" / "Scope & boundaries" / "Responsibilities" eyebrow on each section — let the H2 carry it. The page currently has 5 stacked eyebrows in a row.
- **Governance** — Strip `.eyebrow`/`meta-mono` mixing in the anchors table; use `t-utility-xs` consistently. Drop the "advisory roster pending publication" callout's mono "FILING WINDOW, Q1 2026." line — the date is already in the metadata bar.
- **Apply** — Replace centered `.eyebrow` + `.title-page` hero with the canonical `BriefingHero tone="default" variant="chapter"`. Replace each section's centered `SectionHeader` (eyebrow + title + lede stacked centered) with left-aligned headers using `t-section-title-sm` — matches every other page. Drop the "Begin intake / Begin intake" duplicate eyebrow-and-title pair.
- **StatusDefinitions** — Replace the bespoke §2 grid header (mono "Roster · DOC_ID" tag) with the standard `BoardSection` chrome. The custom card uses `.h-section`, `meta`, and ad-hoc mono — collapse into tokens.
- **FAQ** — Replace `RecordHeader` with `BriefingHero tone="navy" variant="chapter"` for visual continuity with About/HowItWorks/Education. Drop the doc-ID metadata box on the FAQ — it's an editorial reference page, not a controlled policy document.
- **Accountability / VerificationDisclaimer / ReportConcern / Privacy / Terms** — Keep `RecordHeader` (these *are* controlled docs). Apply the token cleanup inside `RecordHeader` once and these pages inherit it. Trim duplicate `category` eyebrows on inner `BoardSection`s.
- **HowToReadTheDirectory** — Replace `RecordHeader` → `BriefingHero` (it's a public reading page, not a policy doc). Apply token sweep.
- **ForVendors / Contact / VerificationDisclaimer** — Token sweep + eyebrow trim + spacing rhythm.
- **EducationBasics / EducationGuides / EducationQuestions / FaqClinicalSafety / FaqLegalRegulatory / FaqVerificationProcess** — Token sweep + first-section hairline + width discipline. No content rewrite (these are content-driven listing pages).
- **Library article pages** (12 files) — Already on `ArticleHeader` + `ArticleSection`. Audit those two components once; pages inherit. Single change: ensure `ArticleHeader` uses `t-page-title` not `t-article-title` per the spec ("page hero title uses page-title 48/56 unless homepage" — article-title is 48/56 anyway, but consolidating to page-title removes one token).
- **VerifiedVendors / Greenlist / VendorProfile / GreenlistProfile** — Already cleaned in prior passes. Token verification only; no copy edits.
- **Index (homepage)** — Already at the new standard. No change.
- **NotFound** — Token sweep only.

**Removals (only the clearly dead/redundant)**
- Education: duplicate "Forthcoming formats" section.
- About: §5 Principles, the Operating Principle centered block, the Mission centered block (the same idea is already established in §1 + §2).
- Apply: duplicate "Begin intake" eyebrow over "Begin intake" title.
- Governance: redundant filing-window mono line.
- Several pages: `category` eyebrow on first `BoardSection` when hero already shows the same word.

**What is preserved**
- All factual content, every status definition, every policy clause, every advisory boundary, every regulatory reference, every CTA, every link target. Nothing gets removed because it's "complex" — only because it's duplicated or weakening.

---

### 4 · Voice (editorial pass)

Apply across rewritten copy where the existing tone drifts:

- **Cut**: "matters", "matters more than ever", "the role here is not to persuade", "real operational value", drama markers.
- **Cut**: dual-period redundancy ("Start here.", "Foundational sourcing.") — section titles are not sentences.
- **Replace**: "We verify" / "We flag" → "Within scope" / "Outside scope" (already partially done).
- **Replace**: emphatic centered single-statement blocks ("If documentation is present…") → integrate as a normal paragraph in the relevant section. The site should not feel like it's quoting itself.
- **Standardize**: section title sentence case, no trailing period. H2s read as labels, not sentences.
- **Standardize**: eyebrow text sentence case, not Title Case. ("Read deeper" not "Read Deeper".)

---

### Files touched

System (3): `src/index.css`, `src/components/BriefingHero.tsx`, `src/components/RecordHeader.tsx`, `src/components/AnchorHeader.tsx`, `src/components/BoardSection.tsx`, `src/components/Section.tsx`, `src/components/ArticleHeader.tsx`.

Pages (every page in `src/pages/` except the four already-clean profile/registry pages and Index): About, HowItWorks, Education, EducationBasics, EducationGuides, EducationQuestions, MedicalAdvisory, AdvisorProfile, Governance, Apply, FAQ, FaqClinicalSafety, FaqLegalRegulatory, FaqVerificationProcess, Accountability, StatusDefinitions, ReportConcern, VerificationDisclaimer, HowToReadTheDirectory, ForVendors, Contact, Privacy, Terms, NotFound, and the 12 Library article pages.

### Out of scope

- No new components, no new tokens, no color changes, no font changes.
- No data-model changes.
- No route changes.
- No homepage changes (already at the standard).
- No registry/profile page changes (already at the standard).
- No PDF generation, no new explanatory articles.

