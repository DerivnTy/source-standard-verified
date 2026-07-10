## Goal

Densify the article header experience across every Learn page (Education, News & Insights, FAQ, and future content) by merging the breadcrumb bar into the navy masthead and pulling the hero closer to the global navigation.

## Changes

### 1. Unify the breadcrumb bar with the navy masthead

**File:** `src/components/learn/LearnBreadcrumbs.tsx`

- Change the bar background from `bg-background/70` to `bg-[hsl(var(--navy-surface))]` so it matches the `ArticleHeader` hero.
- Change breadcrumb text color from `text-muted-foreground` to white at ~80% opacity (`text-white/80`). The final (current-page) crumb should be `text-white`.
- Remove the bottom border (`border-b border-border/50`) so the bar and the hero read as one continuous masthead with no visual seam.
- Remove the `backdrop-filter: blur(14px)` since it is no longer needed on a solid surface.
- Apply the same white/white-80% color treatment to the mobile parent link.

### 2. Reduce spacing above the hero

**File:** `src/components/ArticleHeader.tsx`

- On the navy editorial masthead path (`category` prop), reduce the top padding from `clamp(44px, 6.5vh, 68px)` down by approximately 16–24 px. Target: `clamp(24px, 5vh, 48px)`.
- This tightens the transition from global navigation → breadcrumb → hero so the masthead begins sooner without changing any other header metrics (title size, lead spacing, bottom padding, etc.).

### 3. Verify continuity

- Confirm that `ArticleHeader`’s navy path has no top border that would re-introduce a seam after the breadcrumb border is removed. (It currently does not.)
- Type-check and visually verify on Education, News, and FAQ routes that the breadcrumb and hero form a single uninterrupted navy block.

## Out of scope

- No changes to the legacy card-style `ArticleHeader` path (used by retired Library pages).
- No changes to non-Learn editorial pages (About, Governance, Privacy, Terms, etc.) unless they happen to reuse `LearnBreadcrumbs`.
- No changes to the global `SiteLayout` `HEADER_STACK_HEIGHT` or `main` padding.