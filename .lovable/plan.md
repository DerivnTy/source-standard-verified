# Homepage Hero Correction Pass

## Scope
`src/pages/Index.tsx` only. No edits to BriefingHero, header, footer, global CSS, or other pages.

## Change
Replace the current `flex-col justify-between` descendant layout on the BriefingHero wrapper with a centered composition. The hero still fills the mobile viewport, but the content reads as one cohesive centered block instead of vertically scattered groups.

### New wrapper

```tsx
<div
  className="
    min-h-[calc(100svh-96px)] lg:min-h-0
    [&>section]:min-h-[calc(100svh-96px)]
    lg:[&>section]:min-h-[calc(100dvh-84px)]
    [&_.page-shell]:min-h-[calc(100svh-96px)]
    lg:[&_.page-shell]:min-h-[calc(100dvh-84px)]
    [&_.page-shell]:flex
    [&_.page-shell]:items-center
    [&_.page-shell]:!pt-10
    [&_.page-shell]:!pb-10
    [&_.page-shell]:!px-8
    lg:[&_.page-shell]:!pt-[clamp(48px,7vh,72px)]
    lg:[&_.page-shell]:!pb-[clamp(64px,8vh,88px)]
    lg:[&_.page-shell]:!px-6

    [&_h1#briefing-title+p]:!mt-6
    [&_h1#briefing-title~div.flex.justify-center]:!mt-9
    [&_h1#briefing-title~div.flex.flex-col.sm\\:flex-row]:!mt-8
    [&_h1#briefing-title~div.flex.flex-col.sm\\:flex-row]:!gap-[14px]

    md:[&_h1#briefing-title+p]:!max-w-[440px]
  "
>
  <BriefingHero ... />
</div>
```

What this does:
- Mobile-only `min-h-[calc(100svh-96px)]` propagates down through section → page-shell so the navy hero fills the first iPhone screen below the 96px header.
- `flex items-center` on `.page-shell` vertically centers the entire hero content block (BriefingHero's inner `div.relative.w-full`) — no more `justify-between` stretching.
- Mobile padding: 40px top/bottom, 32px horizontal. Desktop reverts to BriefingHero's clamp values via `lg:` overrides.
- Internal spacing tightened via descendant selectors (BriefingHero structure is: `h1#briefing-title` then `p` then `div.flex.justify-center` (metrics) then `div.flex.flex-col.sm:flex-row` (actions)):
  - h1 → paragraph: 24px (`!mt-6`)
  - paragraph → Live Registry: 36px (`!mt-9`)
  - Live Registry → CTAs: 32px (`!mt-8`)
  - CTA gap: 14px
- Mobile-only paragraph cap at 440px so it doesn't feel floaty. Desktop max-width stays at BriefingHero's 520px.

## Removed
All previously-added selectors that forced flex distribution:
- `[&>section]:flex-1`, `[&>section]:flex-col`
- `[&_.page-shell]:flex-1`, `[&_.page-shell]:flex-col`
- All `[&_.page-shell>div.relative.w-full]:*` flex/justify-between/flex-1/gap-y rules

## Acceptance
- Hero fills the iPhone first screen; section §2 ("Claims are not documentation.") not visible on initial load.
- Headline, paragraph, Live Registry, and CTAs read as one centered cohesive block — no large vertical gaps.
- Desktop hero rhythm preserved.
- No copy, route, color, or shared-component changes.