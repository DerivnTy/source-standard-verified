## Objective

One shared rule owns the hero → first-section transition. Every page ends its hero flush, and the first section adds exactly 32px mobile / 40px desktop of top padding. No page sets its own top spacing under a hero.

## Findings from audit

Three hero components and two section components each add their own bottom/top spacing, and several pages layer inline `paddingTop` on top of that:

- `BriefingHero` (chapter variant) uses `pb-9 md:pb-9 lg:pb-11` (36–44px bottom).
- `BriefingHero` (briefing variant, line 84–85) still uses `paddingBottom: clamp(48px, 6vh, 64px)` — the source of the largest gaps.
- `PageHeader` uses `paddingBottom: clamp(24px, 3.5vh, 36px)`.
- `ArticleHeader` uses `paddingBottom: clamp(20px, 3vh, 32px)`.
- `PageSection` defaults to `padY = 32px` (compact 24px).
- `ArticleSection` first variant uses `paddingTop: 28px` / `24px` / `20px` depending on variant.
- `HowItWorks.tsx` hardcodes its own first `<section>` at `paddingTop: 32px` instead of using a shared component.

That's four+ layers stacking under one hero, which is why gaps differ page to page.

## Rule (single source of truth)

Hero → first section transition is owned entirely by the first section:

| Surface | Mobile | Desktop |
|---|---|---|
| Hero bottom padding | 0 | 0 |
| First section top padding | 32px | 40px |
| First section bottom padding | 32px | 40px |

Hero components stop adding bottom padding entirely. Every section directly beneath a hero gets the same top rhythm — regardless of whether the page uses `PageSection`, `ArticleSection`, or a custom `<section>`.

## Implementation

### 1. Zero out hero bottom padding

- `BriefingHero.tsx`
  - Briefing variant (line 85): drop `paddingBottom` to `0`.
  - Chapter variant (line 165): change `pb-9 md:pb-9 lg:pb-11` → `pb-0`.
- `PageHeader.tsx` (line 31): drop `paddingBottom` to `0`.
- `ArticleHeader.tsx` (line 59): drop `paddingBottom` to `0`. Keep the small `pt-5` variant untouched (it's used inside layouts, not as a hero).

Internal spacing inside the hero (title → lead) is unchanged. Only the outer bottom padding goes to 0.

### 2. Add a `first` prop to shared section components

- `PageSection` — add `first?: boolean`. When `first`, override `padY` to `32px` mobile / `40px` desktop via a class (`pt-8 pb-8 md:pt-10 md:pb-10`) instead of the inline `padY` var. Keeps `compact` and `pb` overrides working for non-first sections.
- `ArticleSection` — same `first?: boolean` addition. When `first`, use `pt-8 md:pt-10` instead of the current 20/24/28px inline top.

Rationale: one API, zero per-page math. Pages just mark the first section with `first`.

### 3. Apply `first` on the pages that begin with a hero

- `Learn.tsx` — first `PageSection title="Start Here"` gets `first`.
- `MedicalAdvisory.tsx`, `Privacy.tsx`, `VerificationDisclaimer.tsx` — first `ArticleSection variant="prose"` gets `first`.
- `LearnEducation.tsx`, `LearnNews.tsx`, `LearnFaq.tsx` — first `PageSection` gets `first`.
- Education / News article templates (`LearnArticleTemplate`) — verify the first content section under the hero uses `first`.

### 4. Remove ad-hoc first-section spacing on `HowItWorks.tsx`

- Replace the hand-rolled `<section style={{ paddingTop: "32px", paddingBottom: "32px" }}>` (line 73) with `<PageSection first bordered>` wrapping the same prose. Its two-paragraph intro renders identically inside `PageSection` because `PageSection` already provides `page-shell` + `w-standard`.
- The second hand-rolled `<section>` (line 93, "Protocol") becomes a normal `<PageSection>` (no `first`) so it inherits standard 32/40 rhythm.

### 5. Internal first-section rhythm (already partially in place)

Confirm inside the first section:
- Prose paragraph line-height / size unchanged (16px / 1.65, max-width 68ch).
- If the first section has a heading, existing `PageSection` heading→children margin (20px compact / 24px default) already matches the spec — no change.
- Paragraph → paragraph 1.1em, heading → body 12–16px — already handled by prose defaults; no change.

### 6. Grep sweep for stragglers

After the shared changes, `rg -n "paddingTop|pt-8|pt-10|pt-12|pt-14|pt-16" src/pages src/components` and remove any remaining inline top padding on a section that directly follows a hero. Institutional legal pages (`Terms`, `Governance`, `Accountability`, `Apply`, `Contact`, `ReportConcern`, `StatusDefinitions`, `HowToReadTheDirectory`) get the same treatment as Privacy.

## Verification

Playwright at 390px and 1280px on:
`/how-it-works`, `/medical-advisory`, `/learn`, `/learn/education`, `/learn/news`, `/learn/faq`, `/privacy`, `/verification-disclaimer`, one Education article, one News article.

Confirm the pixel distance from the last hero baseline to the first section's heading (or first line of prose) is identical across all pages — 32px mobile, 40px desktop.

## Non-goals

- No negative margins.
- No per-page overrides.
- No changes to internal hero typography or to section-to-section rhythm below the first section.
- No new wrapper components — the `first` prop lives on existing `PageSection` and `ArticleSection`.
