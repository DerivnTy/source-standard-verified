# Homepage Hero Centering Pass

## Scope
`src/pages/Index.tsx` only. No edits to BriefingHero, header, footer, global CSS, or other pages.

## Change
Replace the current hero wrapper with a flex-column layout that stretches the inner BriefingHero content column to fill the viewport and `justify-center`s its child blocks. Also remove the previously-added "Continue" scroll cue and its `@keyframes scrollCue` style block.

### New wrapper

```tsx
<div
  className="
    relative
    flex flex-col
    min-h-[calc(100svh-96px)] lg:min-h-0
    [&>section]:flex-1 [&>section]:flex [&>section]:flex-col
    [&_.page-shell]:flex-1 [&_.page-shell]:flex [&_.page-shell]:flex-col
    [&_.page-shell]:!px-8 [&_.page-shell]:!py-0
    lg:[&_.page-shell]:!px-6
    lg:[&_.page-shell]:!pt-[clamp(48px,7vh,72px)]
    lg:[&_.page-shell]:!pb-[clamp(64px,8vh,88px)]
    [&_.page-shell>div.relative.w-full]:flex
    [&_.page-shell>div.relative.w-full]:flex-col
    [&_.page-shell>div.relative.w-full]:justify-center
    [&_.page-shell>div.relative.w-full]:flex-1
    [&_.page-shell>div.relative.w-full]:gap-y-8

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

What it does:
- Mobile-only `min-h-[calc(100svh-96px)]` keeps the navy hero filling the viewport under the 96px header. Desktop reverts to BriefingHero's own `lg:min-h-[calc(100dvh-84px)]`.
- `flex-1` cascades down section → page-shell → BriefingHero's content `div.relative.w-full`, so that inner column fills the available height and can `justify-center` its children (h1, paragraph, metrics, actions).
- `!py-0 !px-8` on mobile lets the inner column own vertical positioning. Desktop padding restored via `lg:` overrides.
- Existing tightening selectors for h1→p, p→metrics, metrics→actions, CTA gap, and mobile paragraph max-width are preserved.

### Removed
- The `<style>{`@keyframes scrollCue`...}</style>` block.
- The "Continue ↓" cue `<div>` and its label/arrow.

## Acceptance
- iPhone viewport: navy hero fills first screen; the entire content group (headline → paragraph → Live Registry → CTAs) sits vertically centered with no large dead space below buttons.
- Desktop hero rhythm preserved.
- Section §2 not visible on initial load.
- No copy, route, color, font, BriefingHero, or global CSS changes.