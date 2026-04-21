

## Page Headers — Consistency pass + sharper copy

The four-tier system is right, but execution drifted. Anchor pages don't visually agree with each other (different lead lengths, different vertical rhythm, different right-side treatments), Home shouts louder than it should, copy is verbose, and the "document" still announces itself with a heavy metadata bar before the title. This pass locks each tier to a single, repeatable shape and rewrites every opening so it reads in one breath.

### Principle

A visitor moving Home → Vendors → Greenlist → Education should feel the **same header machine** with the volume turned slightly up on Home. A visitor moving Governance → Privacy → Terms should feel the same document. Profiles all open identically. Forms all open identically. No exceptions, no per-page improvisation.

### Tier 1 — Anchor pages (Home, Vendors, Greenlist, Education)

One shape, one rhythm, one type scale. Home is the only page allowed a marginally larger headline.

**Locked structure (top → bottom):**
1. Eyebrow — one or two words, sentence case, the page's category. ("Directory", "Sources", "Library", "Reference".)
2. Title — one short line. Sentence case. No period. **Max ~7 words.**
3. Lead — one sentence, ≤ 22 words, capped at 56ch.
4. Optional inline action row (buttons or a single quiet stat). Never a "Summary" rail. Never a `MetadataBar`.

**Visual tokens (apply uniformly to all four pages):**
- Vertical padding: `py-20 md:py-28` (currently inconsistent — Home reads taller than Vendors).
- Title size: `display-2` for Vendors / Greenlist / Education. Home alone uses `display-1` (the only allowed deviation, ~12% larger).
- Eyebrow → title gap: `mb-4`. Title → lead gap: `mt-5`. Lead → action gap: `mt-8`.
- Bottom border: `border-b border-border/50` only — no muted background fill on any anchor page.
- Lead column width: `max-w-[56ch]` everywhere (currently 58ch and varies).

**Copy rewrites (sharper, fewer words):**

| Page | Eyebrow | Title | Lead |
|------|---------|-------|------|
| Home | Public reference | A public record of verified vendors and recognized sources. | Independent verification for the peptide, TRT, and hormone-optimization market. |
| Verified Vendors | Directory | Verified vendors. | Clinics reviewed against the Source Standard framework, with a citable record for each listing. |
| Greenlist | Sources | Recognized upstream sources. | 503B, 503A, and other compounding sources recognized by license, registration, and credentialing. |
| Education | Library | Learn how verification works. | Plain explanations of the framework, the documents that matter, and what to ask before you buy. |

Home loses the four-item framework strip under the buttons (it duplicates what the footer already says and adds visual noise). That metadata moves into the existing footer credibility line.

### Tier 2 — Regulatory / policy documents

Locked structure stays — but the metadata bar is **visually demoted** so the title leads, not the bureaucracy.

- `MetadataBar` becomes a thin, lower-contrast strip (`text-muted-foreground/70`, `border-border/40`, no background fill) and sits **below** the title block instead of above it. The title is the first thing the eye lands on when you open a doc page.
- Title scale locked to `text-[1.625rem] md:text-[1.75rem]`, `font-medium`, used identically across all 13 doc pages.
- Vertical padding locked to `py-14 md:py-18` across all doc pages (currently varies).
- Eyebrow capped to one or two words ("Policy", "Disclosure", "Reference", "Process", "Disclaimer").
- Lead trimmed to one sentence, ≤ 28 words, on every doc page. Where the current lead runs two sentences, keep the first; move the second into §1.
- Summary rail kept only on **Governance, Accountability, Verification Disclaimer, Status Definitions**. Removed from Terms, Privacy, How It Works, How to Read the Directory, For Vendors, Medical Advisory, About, FAQ, Report a Concern.

### Tier 3 — Profile / record pages

All four record types open with the exact same component, exact same spacing, exact same eyebrow style. Only the eyebrow word and the right-slot content change.

- Eyebrow: single noun ("Verified vendor", "Greenlist source", "Medical advisor", "Library entry").
- Title: entity name, `title-record`, no decoration.
- Identity row: locked to a single line of separator-joined facts (status badge · location · category). No second row, no chips wrapping.
- Right slot: at most one element (advisor photo, status card, or quick-glance facts). Never both photo and metadata.
- Vertical padding locked to `pt-6 pb-14 md:pb-18`.
- Doc IDs stay in `ProfileFootnote` at the page bottom (already done).

### Tier 4 — Utility pages (Apply, Contact, NotFound, Education sub-indexes, ReportConcern form)

- Title scale locked to `text-[1.25rem] md:text-[1.375rem]` everywhere.
- Vertical padding locked to `pt-6 pb-10 md:pb-12`.
- Description capped to one sentence, ≤ 18 words.
- Education sub-index titles rewritten: "All foundational reads" → "The basics — full index". "All clinical guides" → "Practical guides — full index". "All questions" → "Common questions — full index". (Keeps the landing-page vocabulary instead of inventing new names.)

### Type system tightening (`src/index.css`)

- Confirm `display-1` and `display-2` are used **only** for anchor titles, and only Home uses `display-1`. (Currently every anchor uses `display-1`, which is why they all feel the same loud size.)
- Add `.title-doc` utility (`1.625rem md:1.75rem`, `font-medium`, `tracking-[-0.012em]`) and use it inside `RecordHeader` so doc title size is enforced in one place rather than re-typed per component.
- Eyebrow tone unified: `text-muted-foreground/75`, `tracking-[0.08em]`, `text-[11px]` — currently three slightly different opacities are in use.

### Files touched

- `src/index.css` — add `.title-doc`, confirm `display-1`/`display-2` separation.
- `src/components/AnchorHeader.tsx` — lock padding/spacing/lead-width; add a `size?: "lg" | "default"` prop where `"lg"` (Home only) uses `display-1` and `"default"` (everything else) uses `display-2`.
- `src/components/RecordHeader.tsx` — move `MetadataBar` below the title block, demote its styling, lock title to `.title-doc`, lock padding.
- `src/components/UtilityHeader.tsx` — lock title scale + padding.
- `src/components/ProfileHeader.tsx` — lock identity row to one line, lock padding.
- Anchor pages — apply new copy + remove Home framework strip:
  `Index.tsx`, `VerifiedVendors.tsx`, `Greenlist.tsx`, `Education.tsx`.
- Doc pages — drop summary on the eight pages listed above; trim leads to one sentence; tighten eyebrows:
  `Terms.tsx`, `Privacy.tsx`, `HowItWorks.tsx`, `HowToReadTheDirectory.tsx`, `ForVendors.tsx`, `MedicalAdvisory.tsx`, `About.tsx`, `FAQ.tsx`, `ReportConcern.tsx`. Governance, Accountability, VerificationDisclaimer, StatusDefinitions keep their summary but get the same lead/eyebrow trim.
- Utility pages — re-title sub-indexes, trim descriptions:
  `Apply.tsx`, `Contact.tsx`, `NotFound.tsx`, `EducationBasics.tsx`, `EducationGuides.tsx`, `EducationQuestions.tsx`.
- Profile pages — verify identity row is single-line, no other changes:
  `VendorProfile.tsx`, `GreenlistProfile.tsx`, `AdvisorProfile.tsx`, `LibraryEntry.tsx`.

### What stays the same

All routes, all data, all body content below the header. Only the header band and its copy change.

### Result

Within a tier, every page opens identically — same height, same type scale, same rhythm, same eyebrow tone. Across tiers, the differences are deliberate (anchor vs. document vs. record vs. utility), not accidental. Home is the only page allowed a slightly larger title, and even that difference is one type step, not a different design. Copy is shorter, so the eye gets to the content fast instead of reading a paragraph at the top of every page.

