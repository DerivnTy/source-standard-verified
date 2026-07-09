## Interactive Feature Row — new navigation primitive

Introduce a second navigation pattern that sits between static `FeatureItem` and full `NavCard`: a lightweight, no-chrome row that reads as interactive. Apply it to the four Batch 2 hubs where `FeatureItem` blocks are wrapped in `<Link>`s.

### 1. New primitive — `src/components/system/FeatureLink.tsx`

Thin interactive wrapper that composes `FeatureItem` + affordances. Keeps `FeatureItem` itself purely informational.

Props: `to: string`, plus the same `title`, `desc`, `icon`, `variant` (`"row" | "block"`, defaults to `"block"`) as `FeatureItem`.

Behavior:
- Renders a `react-router-dom` `Link` wrapping the `FeatureItem` and an `ArrowRight` (lucide, `strokeWidth={1.25}`, 16px).
- Layout: `group flex items-center justify-between gap-4 cursor-pointer`, min-height `44px` (mobile touch target), horizontal padding `px-3 md:px-4`, vertical padding `py-3`, negative horizontal margin so the row visually flushes with surrounding `PageSection` copy (`-mx-3 md:-mx-4`).
- No border. No radius chrome beyond a subtle `rounded-lg` for the hover tint.
- Hover: `hover:bg-muted/40`, title darkens via `group-hover:text-foreground` (base already `text-foreground` — use `text-foreground/90` at rest so the shift is perceptible), arrow translates `group-hover:translate-x-[3px]` and shifts to `text-foreground` from `text-muted-foreground`.
- Transitions: `transition-colors duration-200`, arrow `transition-transform duration-200`. Active state: `active:scale-[0.995]`.
- Focus-visible: `focus-visible:outline-none focus-visible:bg-muted/40` plus `focus-visible:ring-1 focus-visible:ring-border`.
- Accessibility: `aria-label={title}`.

Small internal tweak: to darken the title on hover without forking `FeatureItem`, `FeatureLink` overrides via wrapper class `[&_h3]:transition-colors group-hover:[&_h3]:text-foreground` and sets an at-rest `[&_h3]:text-foreground/85`. This keeps `FeatureItem` untouched.

Export from `src/components/system/index.ts`.

### 2. Doctrine update — `src/components/system/FeatureItem.tsx`

Extend the header doc block:
- **`FeatureItem`** — informational, static. Never wrap in a Link.
- **`FeatureLink`** — lightweight navigational row. Same visual language, adds hover tint, chevron nudge, cursor, 44px touch target. Use inside educational and reference content.
- **`NavCard`** — high-emphasis destination card with hairline border. Use for top-level or hero-level navigation.

Rule: "If something navigates somewhere, it must visibly behave like navigation."

### 3. Apply to Batch 2 hubs

Replace every `<Link>`-wrapped `FeatureItem` with `FeatureLink`. No copy or data changes.

- **`src/pages/Learn.tsx`** — "Start with the basics" 2×2 grid of `EDUCATION_TOPICS` and "Recent updates" list. (Recent updates keeps its meta line above via a small wrapper — see technical note.)
- **`src/pages/LearnEducation.tsx`** — every topic block's article list.
- **`src/pages/LearnFaq.tsx`** — the four FAQ topic rows.
- **`src/components/learn/LearnArticleTemplate.tsx`** — "Related questions" and "Related education" lists.

Informational `FeatureItem` uses elsewhere (About principles, HowItWorks verified-mean blocks, Partners category grid, etc.) are unchanged — they are content, not navigation.

### 4. Technical notes

- Recent updates rows on `/learn` currently render a meta line (`APRIL 14 · REGULATORY UPDATES`) above the `FeatureItem`. `FeatureLink` renders one row; to keep the meta strip, pass it as an optional `eyebrow?: string` prop on `FeatureLink` rendered above the title inside the link so the whole area stays a single clickable target. Adds minimal surface to the API without a second primitive.
- Grid `FeatureLink`s (2-col categories on `/learn`) get the full-cell hit area for free because they are the grid child.
- No new dependencies. Uses existing `lucide-react` `ArrowRight`, `react-router-dom` `Link`, and Tailwind tokens only. No hardcoded colors.

### 5. Preserve

Routes, copy, JSON-LD, deep-link hashes, existing `NavCard` usage, all informational `FeatureItem` sites.

### 6. Verification

- `bunx tsgo --noEmit`.
- Playwright mobile screenshots (390×1800) of `/learn` (hover + rest via CSS not needed on mobile — capture rest state) and `/learn/education`. Confirm rows show chevron affordance, adequate spacing, no bordered chrome, and 44px min height.
