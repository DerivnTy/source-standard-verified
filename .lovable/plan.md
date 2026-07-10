## Root cause

Vertical space between blocks currently comes from **every** shared component declaring its own padding/margin. When they stack — Breadcrumb + Hero + PageSection + CategoryHeader + Card grid + RelatedArticles + ContinueLearning + Footer — the values compound into the dead bands the user sees. The fix is one rhythm, applied at the shared-component and token layer, not per page.

Note on `/learn/news`: the filter block described in the message was already removed from `LearnNews.tsx` in the previous turn (there is no filter markup left in that file). The user is likely viewing a stale preview; a hard refresh will show the current state. No new code change is needed there beyond the global spacing work below.

## Global vertical rhythm (single source of truth)

Applied consistently to every public page.

| Gap | Mobile | Desktop |
|---|---|---|
| Site header → hero (no light strip) | 0 | 0 |
| Breadcrumb top pad | 20 | 20 |
| Breadcrumb bottom pad | 8 | 8 |
| Hero title top (inside hero band) | 12 | 20 |
| Title → lead | 20 | 24 |
| Hero bottom pad | 36 | 44 |
| Hero → first section | 28 | 36 |
| Section top/bottom (standard) | 32 | 40 |
| H2 → intro paragraph | 14 (already enforced) | 14 |
| Intro → first content item | 24 | 24 |
| Card grid gap | 16 | 16 |
| Section → RelatedArticles / ContinueLearning | 32 | 40 |
| Last section → footer | 32 | 48 |

## Shared-component changes

### `src/components/BriefingHero.tsx` (chapter variant, line 165)
`pt-14 pb-3 md:pt-[72px] md:pb-9 lg:pt-16 lg:pb-[52px]`
→ `pt-3 pb-9 md:pt-4 md:pb-9 lg:pt-6 lg:pb-11`
Removes the large navy gap between the breadcrumb and the H1. Lead `marginTop` stays at 20–24.

### `src/components/learn/LearnBreadcrumbs.tsx` (line 34)
`minHeight: 40px, paddingTop: 14, paddingBottom: 14` → `paddingTop: 20, paddingBottom: 8` (drop `minHeight`).
Combined with the tighter hero top, back-link → title lands at 40–48px.

### `src/components/system/PageSection.tsx`
- `padY`: `28px` / `20px` → `32px` / `24px`.
- `childrenMarginTop`: `14 / 16` → `20 / 24` (no-intro / with-intro).
- `introMarginTop`: keep at 10 (matches the 12–16 target after H2 kerning).

### `src/components/learn/CategoryHeader.tsx`
`paddingBottom: 12, marginBottom: 20` → `paddingBottom: 12, marginBottom: 24`.

### `src/components/learn/RelatedArticles.tsx`
`paddingTop: 36` → `paddingTop: 32` (mobile) with a `md:pt-10` variant; header `marginBottom: 16` → `20`.

### `src/components/learn/ContinueLearning.tsx`
`paddingTop: 40, paddingBottom: 48` → `paddingTop: 32, paddingBottom: 40`. Terminal `!important` rule in `index.css` continues to lock the footer-adjacent bottom.

### `src/components/EditorialBackLink.tsx`
`paddingTop: 24, paddingBottom: 40` → `paddingTop: 20, paddingBottom: 32`.

### `src/components/PageHeader.tsx` (institutional hero)
`paddingTop: clamp(44px, 6.5vh, 68px)` → `clamp(32px, 5vh, 52px)`.
`paddingBottom: clamp(28px, 4vh, 40px)` → `clamp(24px, 3.5vh, 36px)`.

### `src/components/ArticleHeader.tsx` (navy masthead)
Already `pt: clamp(8, 2.5vh, 20), pb: clamp(20, 3vh, 32)` — leave as is; matches the new rhythm.

### `src/index.css` — `.section-pad` token (institutional pages)
Currently: mobile 80/32, md 72/36, lg 64/52.
Change to: mobile **40/32**, md **48/36**, lg **56/44**. The `section + section > .section-pad` reducer rule (24/32/40) and the terminal `*:has(> footer)` hard-stop rule stay unchanged, so subsequent sections and the last-before-footer band still align.

### `src/components/SiteFooter.tsx`
No padding change. The `margin-top: 0 !important` rule on `footer` already prevents a double band; verify no page-level `mb-*` is stacked on the last section.

## Page-level cleanups (only where they duplicate shared spacing)

- `src/pages/LearnEducation.tsx` line 58 — remove `paddingTop: 36, paddingBottom: 36` and let the wrapper inherit the standard 32/40 pattern (replace the raw `<section>` with `PageSection` scoped by `id={topic.id}` so category rhythm is owned centrally).
- `src/pages/LearnFaq.tsx` — the raw `<section>` currently sets `paddingTop/paddingBottom: 28`; drop those in favor of `PageSection`'s new 32 default. If a titleless section is still required, expose `PageSection` `title` as optional (single small API change) rather than duplicating the wrapper.
- `src/components/learn/LearnArticleTemplate.tsx` line 202 — News meta strip `paddingTop: 20, paddingBottom: 8` stays; it is smaller than any shared token and is the correct place for that value.
- Grep pass across `src/pages/Learn*.tsx`, `src/pages/Faq*.tsx`, `src/pages/Library*.tsx`, `src/pages/VerificationDisclaimer.tsx`, `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/pages/Governance.tsx`, `src/pages/MedicalAdvisory.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/About.tsx` for local `paddingTop|paddingBottom|marginTop|marginBottom|py-|pt-|pb-` on wrappers immediately around heroes, sections, related, and continue-learning blocks. Where the value duplicates a shared component's own padding, delete it. Where the page adds spacing that the shared component already owns, delete it. No negative margins introduced anywhere.

## Verification

Playwright at 390 and 1280:
- `/learn`, `/learn/news`, `/learn/education`, `/learn/faq`
- one Education article, one News article, one FAQ topic page
- `/verification-disclaimer`, `/medical-advisory`, `/privacy`, `/terms`

Confirm on each:
- No light strip between SiteHeader and hero.
- Back-link → title reads as 40–48px.
- First section begins ~28–36px below hero, not 60+.
- Section rhythm is uniform (no page pulls ahead or lags).
- Last content block sits 32–48px above the footer with no doubled band.
- No filter/chip UI remains on any Learn surface.

## Out of scope

- No color, typography, copy, or component-API changes beyond making `PageSection.title` optional.
- No changes to `SiteHeader.tsx`, `SiteFooter.tsx` internal padding.
- No changes to Registry, Directory, or Home page rhythm — they already ride on the `.section-pad` tokens and inherit the new values automatically.
