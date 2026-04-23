

## Global Change 01b — Match Hero Background Exactly to Homepage

The navy chapter heroes on interior pages are rendering as flat dark navy. The homepage hero has a noticeably lighter, atmospheric quality because it layers a **radial light spotlight** over the navy surface in addition to the grid pattern. Interior pages are missing that radial light layer, which is why they look darker and flatter than the homepage.

### Root cause

In `src/components/BriefingHero.tsx`:

- The **cover** branch (homepage, lines ~67–77) renders a radial gradient overlay before `HeroPattern`:
  ```
  background: radial-gradient(ellipse 70% 60% at 50% 35%,
              hsl(var(--navy-surface-2)) 0%, transparent 70%);
  ```
  This is what creates the lighter "lift" in the center and the premium atmospheric feel.

- The **chapter** branch (all interior pages, lines ~140–175) skips that overlay entirely and only renders `HeroPattern` at `opacity={0.018}`. Result: flat navy, faint grid, no light center.

The grid pattern is also fainter on chapter (`0.018`) than cover (`0.02`), which makes the "boxes" less visible.

### Fix

Update the **chapter + navy** branch of `BriefingHero` to match the homepage's atmospheric layering:

1. Add the same radial-gradient overlay div (using `--navy-surface-2`) above `HeroPattern`, sized appropriately for the shorter chapter height (e.g. `ellipse 70% 80% at 50% 40%` so the light center reads correctly at chapter proportions).
2. Bump `HeroPattern` opacity from `0.018` → `0.02` to match the cover so the faint boxes are equally visible.
3. Keep `cellSize={32}` and `stroke="white"` — already correct.

No changes to copy, layout, height, padding, type, or any other variant. Cover (homepage) and default (white) branches untouched.

### Files touched

- `src/components/BriefingHero.tsx` — modify the navy/chapter branch only (~lines 140–175).

### Result

About, Verification, Medical Advisory, Resource Library, Terms, Privacy, Status Definitions, Enforcement, and Verification Disclaimer will all open with the same lighter, atmospheric navy surface as the homepage — same radial light center, same faint white grid boxes, same premium feel. The cadence becomes truly continuous from Home → any interior page.

