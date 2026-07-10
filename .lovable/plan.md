# Simplify the editorial hero

Apply cleanly across every page that uses the shared navy article masthead (Education articles, News articles, Library entries, Privacy, Terms, Verification Disclaimer, Accountability, Status Definitions, Report Concern, Medical Advisory, and any future editorial page).

## 1. `src/components/ArticleHeader.tsx` — navy masthead path

- Remove the uppercase mono category eyebrow (`{category.toUpperCase()}`) and its `<p>` wrapper entirely. The `category` prop stays in the signature (still used as the switch that selects the navy path so existing callsites keep working) but is no longer rendered.
- Tighten the vertical rhythm inside the navy hero container:
  - `paddingTop`: `clamp(24px, 5vh, 48px)` → `clamp(8px, 2.5vh, 20px)` (≈24–32px removal, matching the request).
  - `paddingBottom`: `clamp(28px, 4vh, 40px)` → `clamp(20px, 3vh, 32px)` so the hero closes tighter above the metadata / Key Takeaway.
  - Title `marginTop`: `22px` → `0` (no eyebrow above it anymore).
  - Lead `marginTop`: `14px` → `10px` for a slightly denser title→lead gap.
- Typography (font sizes, weights, colors, `text-wrap: balance`, `max-w-[68ch]`) is preserved exactly.
- The card-path (Library legacy, no `category`) is untouched.

## 2. `src/components/learn/LearnArticleTemplate.tsx` — Education

- Stop composing the reading-time / topic string. Continue passing a non-empty `category` prop so `ArticleHeader` still renders the navy path, but the value is inert (e.g. `category="education"`). No visible eyebrow, no metadata row — Education heroes show title + lead only.
- Reading time already appears on listing cards and related-article cards; nothing else moves.

## 3. `src/components/learn/LearnArticleTemplate.tsx` — News

- Remove the eyebrow the same way (pass an inert `category="news"` to keep the navy path).
- Add a new small muted metadata row **immediately below the hero and above `<KeyTakeaway>`**, inside `page-shell` / `w-reading-wide` so it aligns with body copy. It renders `dateLabel · category.label` using the existing values already computed in the template.
  - Style: `font-mono uppercase`, `10px`, letter-spacing `0.14em`, `text-muted-foreground`, top padding ~`20px`, bottom padding ~`8px`. Matches the muted regulatory tone used elsewhere on the site.
  - Only rendered when at least one meta part exists.

## 4. Other pages passing `category` to `ArticleHeader`

Library entries, Privacy, Terms, Verification Disclaimer, Accountability, Status Definitions, Report Concern, and Medical Advisory currently pass a `category` string that produced the eyebrow. After the change, these pages simply render title + lead in the navy hero — consistent with the request and with the editorial system. No per-page edits required.

## Out of scope

- FAQ topic pages (`FaqPage` / `FaqTopicShell`) don't use `ArticleHeader`; their heroes already differ and aren't in the request's "hero" definition. Not modified.
- Breadcrumb bar, HeroPattern, related articles, Continue Learning, Key Takeaway styling — all unchanged.
- Card-based legacy `ArticleHeader` path — unchanged.

## Verification

- `bunx tsc --noEmit`.
- Playwright screenshots at 1280×1800 and 390×844 of one Education article and one News article to confirm: eyebrow gone, hero visibly tighter (≈24–32px), News metadata row visible directly under the navy hero, Education hero shows only title + lead.
