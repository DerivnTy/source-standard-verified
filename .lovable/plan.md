
# Redesign: How Verification Works

Goal: make `/how-it-works` look like a natural sibling of `/about` and `/governance` — typography-led, section-based, no stacked card containers. Content stays the same; only presentation changes. All edits are frontend/presentation.

## Diagnosis

The current page fights the site's own conventions: every block is wrapped in a `rounded-xl bg-surface border` card, so the eye reads "SaaS docs page." About and Governance use `PageSection` with `title`/`intro` slots and simple bordered `dl` reference lists instead. That is the language we adopt here.

## 1. Hero — align with About

File: `src/pages/HowItWorks.tsx`

- Use `BriefingHero` with defaults matching About (no `heroPadding` override, no bespoke `titleClassName` / `statementClassName`). Keep `category="Public Guide"` and drop the duplicate `eyebrow` prop.
- Result: same hero height, weight, and rhythm as About/Governance so the page visually joins the set.

## 2. Intro — plain typography, no card

File: `src/pages/HowItWorks.tsx`

- Replace the two custom `PageSection` blocks that centered narrow paragraphs with the About pattern: a single `PageSection` titled "What Verification Is" containing one lead paragraph (17px/1.6, foreground) + one supporting paragraph (15px/1.65, muted), both `max-w-[68ch]`, left-aligned.
- Add a second `PageSection` (compact) titled "What Verification Is Not" with one muted paragraph, same width.
- Keep the two key terms ("Verification", "Verified") bold; strip other emphasis.
- No centered text, no `bg-*` containers.

## 3. Informational notice — compact inline callout

Files: `src/components/InfoCallout.tsx`, `src/pages/HowItWorks.tsx`

- Rework `InfoCallout` into a compact, editorial notice consistent with `Callout.tsx`:
  - Left 2px hairline accent bar in `hsl(var(--under-review))`.
  - Background `hsl(var(--under-review-soft))`, rounded `lg` (matches `Callout.tsx`), no heavy border.
  - Small mono uppercase eyebrow "Important" (11px, 0.12em tracking) in the accent color.
  - Body copy at 14px / 1.65, muted-foreground.
  - Icon-optional; drop the large Info glyph — the eyebrow carries the semantics.
- Shorten displayed copy to the essential sentence:
  > "Source Standard verification is a transparency review, not a medical, clinical, or regulatory certification. Unverified status does not imply that a provider is unsafe or noncompliant."
- Move the full legal scope into a native `<details>` disclosure ("Read full scope") rendered underneath the summary, using the existing muted paragraph tokens.
- Constrain to `max-w-[68ch]` and place inside a `PageSection` (compact, no title).

## 4. Protocol timeline — no card wrapper, more room

Files: `src/pages/HowItWorks.tsx`, `src/components/system/ProcessSteps.tsx`

- Remove the `rounded-xl bg-surface border` wrapper and the inline "Protocol" mono label. Use a standard `PageSection` with `title="Protocol"` and a short `intro`.
- Constrain the list to `max-w-[68ch]`.
- In `ProcessSteps.tsx`:
  - Increase per-step `paddingBottom` from 28px to 36px.
  - Bump title from 15px → 16px, description from 14px → 14.5px with `lineHeight: 1.65`.
  - Nudge the glyph size up one step (`size="md"`) and widen the gutter to 20px for better balance.
- No card, no fill — the hairline connector and glyphs carry the structure.

## 5. "What Verification Means" — two clean columns, no card

File: `src/pages/HowItWorks.tsx`

- Remove the `rounded-xl bg-surface border` container and the duplicated inline `<h2>`. Use `PageSection title="What Verification Means"` like About uses `PageSection title="What We Don't Do"`.
- Render two side-by-side definition lists (`grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8`), each with:
  - A small header row: a 14px semibold label ("Verification means" / "Verification does not mean") preceded by a `check` / `x` glyph from `GlyphIcon`.
  - A `dl` with items styled like the About `DefinitionRow` (14px semibold term + 14px/1.6 muted description), separated by `divide-y divide-border/60` and framed by `border-t border-b border-border/60`.
- Keep existing MEANS/DOES_NOT_MEAN copy verbatim.

## 6. Vertical rhythm — inherit from PageSection

File: `src/pages/HowItWorks.tsx`

- Remove all `!pt-*` / `!pb-*` overrides. Let each `PageSection` (`first`, then default, then `compact` where appropriate) supply the standard rhythm used by About and Governance.
- Order: Hero → PageSection first "What Verification Is" → compact "What Verification Is Not" → compact InfoCallout section → default "Protocol" → default "What Verification Means" (`bordered={false}`, `pb="0"`) → `EditorialBackLink`.

## 7. Verification

- Type-check builds cleanly.
- Playwright screenshots of `/how-it-works` at 390px and 1280px:
  - No card-in-card stacking.
  - Section widths match About/Governance.
  - Callout reads as a compact notice, not a wall.
  - Protocol steps have visible breathing room between them.

## Technical notes

- No new tokens, no new colors — every value comes from existing HSL semantic tokens (`--under-review`, `--under-review-soft`, `--border`, `--foreground`, `--muted-foreground`).
- `BriefingHero.tsx` keeps the extended props added earlier; this redesign simply stops overriding them, so other pages using those props are unaffected.
- `ProcessSteps.tsx` change is site-wide (used only on this page today per current codebase); if any other page starts using it, it'll inherit the roomier rhythm — acceptable given the direction.
- Out of scope: routes, navigation, data, copy other than the callout summary sentence.
