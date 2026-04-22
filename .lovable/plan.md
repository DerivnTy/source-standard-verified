

## Final Retouch — Legal & Protocol Pages → Board DNA

`HowItWorks`, `Privacy`, `Terms`, `VerificationDisclaimer`, `Governance`, `Accountability` are the last pages still drifting from the MAB standard. They use `DocLayout` (sticky sidebar, `prose-filing`, `text-[15.5px]`, `border-border/60` opacity drift) and stray `border-t-2 border-t-foreground` black bars. This pass converts them to the same `BoardSection` chrome already used everywhere else, replaces sticky sidebars with a horizontal jump-bar, and kills every heavy black artifact.

---

### 1 · New `DocJumpBar` component

`src/components/DocJumpBar.tsx` — a sticky horizontal contents bar that sits directly under `RecordHeader`. Mono `CONTENTS ·` label + horizontally-scrollable `§N · Label` chips, hairline bottom border, `bg-background/95 backdrop-blur` so it stays legible while overlapping content. Uses the same active-section `IntersectionObserver` pattern from `DocLayout`, but renders inline (no left rail). Replaces the entire `DocLayout` shell on legal/protocol pages.

### 2 · Convert 5 pages from `DocLayout` → `BoardSection` chrome

For `Privacy`, `Terms`, `VerificationDisclaimer`, `Governance`, `Accountability`:

- Drop `DocLayout` + `DocSection` + `prose-filing` wrappers entirely.
- Replace each `<DocSection>` with a `<BoardSection n="1" category="…" title="…" muted={i % 2 === 1}>` — alternating `bg-background` ↔ `bg-surface-muted` per section, `py-12 md:py-16`, 12-col split (4-col rail with `§N · CATEGORY` mono eyebrow + `h-section` title + optional `text-[13.5px]` rationale; 8-col content).
- Body copy locked to `text-[14.5px] text-muted-foreground leading-relaxed`.
- Mount `<DocJumpBar waypoints={…} />` immediately after `<RecordHeader>`.
- Internal data tables (citation elements, partitioning, retention, MDE list, actions, authorities roster) keep their grid structure but swap `border-border/60 rounded-lg shadow-sm bg-surface` → `border border-border bg-background` with `divide-y divide-border` (no opacity, no shadow, no rounding drift). All inner row text → `text-[14.5px]`.
- Doc IDs normalized per directive: `SS-PROTO-2026.01` (HowItWorks), `SS-DISCLAIM-2026.01` (Disclaimer), `SS-PRIVACY-2026.01`, `SS-TERMS-2026.01`, `SS-GOV-2026.01`, `SS-ENFORCE-2026.01`. (Most already correct — only HowItWorks and Disclaimer renamed.)
- "Read deeper" sections: replace `<RelatedDocs>` card grid with a `bg-border gap-px` MAB-style grid of bordered cells (`bg-background p-5`, `meta` mono `REF · NN` chip + label + `→`), matching the Advisory Board roster footer exactly. `RelatedDocs` component itself stays for any other consumers.

### 3 · `HowItWorks` cleanup

Already on Board chrome. Two surgical edits:
- Kill the `border-t-2 border-t-foreground` black bar on the §10 OFFICIAL CITATION block — replace with the standard `bg-surface-muted` cite footer band (`border-t border-border`, mono `Cite as · {ID}`, `DocSignature`).
- Replace the in-page Document header strip (lines 272-285, the dense metadata bar) with `<DocJumpBar>` so the page gets the same horizontal contents nav as the legal pages.
- Update `DOC` value in `RecordHeader` metadata + everywhere referenced from `SS-FRAMEWORK-2026.01` → `SS-PROTO-2026.01`.

### 4 · Footer citation discipline (global)

Across all six pages, the closing citation block becomes uniform:
```
[ border-t border-border, bg-surface-muted, py-8 ]
  CITE AS · SS-XXXX-2026.01
  Source Standard. {Title}. Document {ID}. Issued 04/21/2026.
  [DocSignature: AUTH-ID + DATA VERIFIED]
```
No more `border-t-2 border-t-foreground`, no `rounded-b-lg shadow-sm`, no inline `OFFICIAL CITATION` boxes inside §-sections.

### 5 · Scroll/anchor hardening (already present — confirmed)

`ScrollToTop` + `useHashScroll` + `scroll-padding-top: 96px` are already in place from the Deep-Link phase. The new `DocJumpBar` uses smooth `scrollIntoView` for chip clicks (matches the existing system), and its sticky offset is accounted for by extending `scroll-padding-top` to `144px` (header 96 + jump-bar 48) in `index.css`.

---

### Files touched

**New**
- `src/components/DocJumpBar.tsx` — sticky horizontal `§N` jump-bar

**Modified primitives**
- `src/index.css` — bump `scroll-padding-top` to `144px`

**Rewritten (chrome only — copy/data verbatim)**
- `src/pages/Privacy.tsx`
- `src/pages/Terms.tsx`
- `src/pages/VerificationDisclaimer.tsx`
- `src/pages/Governance.tsx`
- `src/pages/Accountability.tsx`
- `src/pages/HowItWorks.tsx` — citation strip + jump-bar swap, `DOC` rename to `SS-PROTO-2026.01`

### What stays the same

All routes, all written copy, all data, the Board DNA already shipped on Library/FAQ/Status/About/MAB pages, `RecordHeader`/`BoardSection`/`DocSignature`/`Footnote`/`GlossaryTerm`/`Breadcrumb`/`PageMeta` APIs, registry filtering, dark mode, design tokens. `DocLayout` and `RelatedDocs` components remain in the codebase (unused on these six pages, available for any future doc that wants a sticky rail). Strictly presentational alignment + one new shared primitive.

