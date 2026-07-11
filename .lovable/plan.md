Plan: Site-wide desktop layout density fix

Scope
- Fix the desktop/tablet layout globally, not just `/medical-advisory`.
- Preserve locked mobile experience and existing visual identity: no typography, color, component, or copy redesigns.
- Applies to all informational/documentation pages: How Verification Works, Governance, Medical Advisory, About, Learn (index + articles + FAQ), Status Definitions, and any future doc pages that use the shared primitives.

1. One shared desktop content boundary
- Update the global width tokens so the primary informational content boundary sits at ~1200–1280px on desktop (roughly 1240px at `lg`, 1280px at `xl`).
- Keep comfortable page-shell padding: ~48px at `lg`, up to ~64px at `xl`.
- Collapse the current "narrow standard vs. wide" split so `w-standard` and `w-wide` resolve to the same institutional width at `lg`+. This is the single source of truth every informational page inherits.

2. Fix shared section primitives (this is the global lever)
- `PageSection`: switch its inner column from `w-standard` to the shared institutional container so every section built with it (Governance, Medical Advisory, How It Works, About, Status pages, Learn shells, and future docs) automatically uses the wider desktop width. Keep mobile identical.
- Remove the local `max-w-[68ch]` wrapper that pages currently place around bulleted lists, DefLists, grouped cards, dividers, and accordion groups when they sit inside `PageSection`. Preserve `68ch` only for true long-form paragraph runs (the readability constraint), applied at the paragraph level rather than the section level.
- `ArticleSection` (`variant="prose" | "callout" | "card"`): keep the reading measure for paragraph prose, but widen the section chrome (borders, DefList rows, status rows, related-links callouts, card grids) to the shared institutional container at `lg`+ so dividers and grouped content align with the rest of the page.
- `PageHeader` / `BriefingHero` inner columns: align to the same institutional width so hero, body, and dividers share one left/right edge on desktop.

3. White sections + dividers align to the container
- Every hairline, top/bottom border, DefList, accordion group, status row, and card grid inside `PageSection` / `ArticleSection` inherits the shared width automatically once step 2 lands. No per-page edits required for the pages that already use these primitives.
- Spot-fix only where a page hardcodes a narrower wrapper around a divider/list block (e.g. `max-w-[68ch]` around `<DefList>` or `<ul>` in `MedicalAdvisory.tsx`, `Governance.tsx`, `HowItWorks.tsx`).

4. Footer sits directly under content
- `SiteLayout`: keep the outer `min-h-screen flex flex-col` and add `flex: 1` to `<main>` so the footer is pushed to the bottom only when the page is short, and sits directly under content on tall pages.
- Remove any bottom padding/margin above the footer that produces artificial whitespace on short pages (the `Hard-Stop` `padding-bottom` protocol in `index.css`, the `pb-` values on `EditorialBackLink`, and the `mt-*` before the footer). Keep terminal rhythm tight.
- Footer already spans full browser width via `bg-[hsl(var(--navy-surface))]` on the `<footer>` element and the fixed navy backdrop; verify nothing constrains it.

5. Desktop vertical rhythm (tighten only at `lg`/`xl`)
- Reduce oversized desktop-only values in `index.css` and `PageSection`:
  - `.section-pad` at `lg`/`xl`: cut top/bottom padding.
  - `PageSection` `first` and non-first `lg:`/`xl:` padding: cut further.
  - Section-to-section `pt` at `lg`+: cut.
  - `BriefingHero` chapter/navy hero `lg:` top/bottom padding: cut.
- Mobile and `md` values remain untouched.

6. Verification
Playwright at 390 / 768 / 1280 / 1440 / 1680 on:
- `/how-it-works`
- `/governance`
- `/medical-advisory`
- `/about`
- `/learn`, `/learn/faq`, and one `/learn/:topicId` article
- `/status-definitions`

Confirm:
- Mobile pixel-identical to current baseline.
- Desktop content boundary is ~1200–1280px, consistent across every listed page.
- Section dividers, DefList borders, status rows, callouts, and card grids span the shared container edge-to-edge on desktop.
- Long-form paragraph runs remain readable (measure preserved at paragraph level).
- Footer sits directly under content on short pages (no large blank gap) and follows content naturally on long pages; navy band spans full viewport width.
- No changes to typography, colors, components, or copy.

Non-goals
- No copy, color, typography, or component visual redesign.
- No mobile layout changes.
- No routing, data, or backend changes.

Technical notes (for engineering)
- Files most likely to change:
  - `src/index.css` — width tokens (`.w-standard`, `.w-wide`, `.page-shell` padding), `.section-pad` at `lg`/`xl`, Hard-Stop bottom padding, section+section `pt`.
  - `src/components/system/PageSection.tsx` — inner container width; `firstBottomClass` / `responsivePadClass` desktop values.
  - `src/components/ArticleSection.tsx` — widen section chrome for non-prose blocks; keep `68ch` on paragraph text.
  - `src/components/PageHeader.tsx`, `src/components/BriefingHero.tsx` — inner width alignment + `lg:` padding cut.
  - `src/components/SiteLayout.tsx` — `<main className="flex-1">`.
  - `src/components/SiteFooter.tsx` — remove any residual gap above; keep full-bleed navy.
  - `src/components/EditorialBackLink.tsx` — trim `pb` at desktop.
  - Spot fixes in `MedicalAdvisory.tsx`, `Governance.tsx`, `HowItWorks.tsx` to drop `max-w-[68ch]` from list/DefList wrappers (paragraph-level readability preserved).