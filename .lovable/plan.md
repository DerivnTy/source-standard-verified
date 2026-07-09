# Footer Cleanup Plan

## Scope
Simplify the information architecture of `src/components/SiteFooter.tsx` to match the site's editorial style — calmer, less dense, no redundancy.

## Changes

### 1. Remove duplicate navigation
- Delete the entire **Learn** column and all its links (Learn, Education, News & Insights, Frequently Asked Questions).

### 2. Rename Standards → Framework
- Change column heading from `Standards` to `Framework`.
- Update links:
  - Verification Framework (`/how-it-works`)
  - Status Definitions (`/status-definitions`)
  - **Governance** (`/governance`) — add this page
  - Advisory Board (`/medical-advisory`)
- Remove the old `Compliance` (`/accountability`) link.

### 3. Simplify Company → Source Standard
- Change column heading from `Company` to `Source Standard`.
- Update links:
  - About (`/about`)
  - Contact (`/contact`) — add this page
  - Privacy (`/privacy`)
  - Terms (`/terms`)
  - Disclaimer (`/verification-disclaimer`)
- Remove the old `About Source Standard` link (replaced by plain `About`).

### 4. Reduce legal copy prominence
- Smaller font size, increased line-height.
- Constrain width to approximately `60ch`.
- Use muted foreground color (`text-muted-foreground` or equivalent token).
- Ensure it reads as fine print, not a primary paragraph.

### 5. Simplify system status
- Change from `● SYSTEM STATUS: OPERATIONAL · LOCK` to `● System Status: Operational`.
- Remove the `Lock` button entirely.

### 6. Improve spacing
- Slightly increase vertical spacing between the four remaining footer groups (Registry, Framework, Source Standard, brand column).
- Reduce spacing between individual links within each group for a tighter, calmer rhythm.

### 7. Remove redundancy
- Footer now contains only:
  - Registry links
  - Framework links
  - Source Standard links
  - Copyright
  - System status
  - Legal disclaimer
- Everything else removed.

### 8. Preserve existing styling
- Keep navy background (`bg-[hsl(var(--navy-surface))]`).
- Keep existing typography tokens and colors.
- Keep hairline border styling.
- No redesign of visual style — only information architecture simplification.

## Out of scope
- No changes to header navigation.
- No changes to routes or page components.
- No changes to the `Logo` component or `useSiteAccess` hook usage.

## Verification
- `/governance` appears in the Framework footer column.
- No Learn column remains.
- No Lock button remains.
- Legal disclaimer is visually subdued.
- Footer renders cleanly on mobile and desktop.