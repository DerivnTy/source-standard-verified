## Objective
Refine the shared article hero across all educational content detail pages (Education, News, FAQ, Library) to reduce visual weight on mobile while preserving desktop authority.

## Problem
- Eyebrow sits too close to title (14px gap)
- Mobile article H1 is 40px (`ss-hero-title`) — dominates the viewport
- Reading experience feels like a landing page, not editorial content

## Solution
The `.t-article-title` token already exists at 34px mobile / 1.12 line-height, which satisfies the 10–15% size reduction and line-height targets. The fix is to make `ArticleHeader` use this token and increase eyebrow breathing room.

### Changes

#### 1. `src/components/ArticleHeader.tsx`
- **Navy masthead path** (Education + News articles):
  - Change `<h1>` class from `ss-hero-title` → `t-article-title`
  - Increase eyebrow→title `marginTop` from `14px` → `18px`
  - Preserve `!text-white`, `textWrap: "balance"`, and all other styling
- **Card path** (Library legacy):
  - Change `<h1>` class from `t-page-title` → `t-article-title`
  - Preserve existing card chrome and metadata layout

#### 2. `src/index.css`
- No changes needed. `.t-article-title` is already 34px mobile / 1.12 line-height / 56px md+ / 64px lg+, which matches the requested mobile reduction and editorial line-height.

## Verification
After implementation, verify at 390px mobile width on:
1. `/learn/education/what-does-verified-mean`
2. One news article
3. One FAQ long-form page (`/learn/faq/*` or similar)
4. One library article page (`/education/*`)

Confirm:
- Eyebrow has ~18px breathing room before title
- H1 is smaller and more readable (34px mobile)
- Hero no longer dominates the first screen
- Desktop remains unchanged and professional

## Out of Scope
- No page copy changes
- No color, font, layout system, or branding changes
- No changes to non-article pages (Governance, About, Registry, etc.) that use `PageHeader` or `ss-hero-title` directly