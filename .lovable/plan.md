# Homepage Hero Scroll Cue

## Scope
`src/pages/Index.tsx` only. No edits to BriefingHero, global CSS, header, footer, or routes.

## Change
Add a quiet "CONTINUE ↓" scroll cue anchored to the bottom of the navy hero panel.

1. Add `relative` to the hero wrapper `<div>` className so the absolutely-positioned cue anchors to the hero bounds.
2. Add a local `<style>` tag inside the hero wrapper defining the `scrollCue` keyframes.
3. Add the cue element as the last child of the hero wrapper, after `<BriefingHero />`:
   - `aria-hidden="true"`, `pointer-events-none`
   - `absolute bottom-5 left-1/2 -translate-x-1/2`
   - Two stacked elements: small uppercase "Continue" label (10px, mono, 0.18em tracking) and a 12px down arrow `↓`
   - Color `text-white/60` so it sits over the navy without being a marketing CTA
   - Inline `animation: "scrollCue 2.4s ease-in-out infinite"` (gentle 5px translate + 0.35→0.7 opacity fade)

## Acceptance
- iPhone viewport: cue visible at bottom of hero, below CTA buttons, gently bobbing.
- Hero copy, metrics, buttons, structure, and section §2 unchanged.
- No global CSS or shared component edits.