## Diagnosis

The reason §1 and §3 body text won't stretch and the pill has a gap at the top is **not** the JSX I've been editing — it's a CSS rule with `!important` higher up in the same file (lines 446–451 of `src/pages/Index.tsx`):

```css
@media (min-width: 1024px) {
  .home-section .home-lead {
    font-size: 16px !important;
    line-height: 1.7 !important;
    margin-top: 18px !important;   /* ← creates the gap inside the pill */
    max-width: 68ch !important;    /* ← prevents stretching full width */
  }
}
```

Every `<p className="home-lead">` is capped at ~68 characters wide and given 18px top margin on desktop. Any width I set on the wrapping card or `<p>` element is overridden by this rule. That's why my prior edits had no visible effect.

The "indented differently" perception comes from `.home-section .home-h2` and `.home-eyebrow` having no left padding while the white pill card I added has `padding-left: 18px` — text inside the pill starts 18px further right than the H2 above it, so the pill *looks* offset from the rest of the page.

## Fix

Three concrete edits in `src/pages/Index.tsx`:

1. **CSS rule for `.home-section .home-lead`** (lines 446–451):
   - Remove `max-width: 68ch !important` → body text stretches to its container width.
   - Change `margin-top: 18px !important` → `margin-top: 0 !important` → no extra gap inside the pill (the wrapping `mt-4` on the card already provides spacing above the pill).

2. **§1 (Trust problem) pill wrapper** (around line 535):
   - Reduce padding to `8px 18px 12px` for a tighter pill.
   - Add `marginLeft: -18px` and `marginRight: -18px` (or use negative left/right via inline style) so the pill's *text* lines up exactly with the H2 above. Actually cleaner: set padding to `10px 0 12px 0` and rely on the white background + border without horizontal inset, so text x-position matches the H2.
   - Keep `w-full` so it spans the full container width.

3. **§3 (Live registry) pill wrapper** (around line 609): identical changes as §1.

## What you'll see after the edit

- Body paragraph in §1 and §3 fills the full width of the section container (same width as the H2 above).
- Top of the pill sits tight against the body text (no large empty band above the words).
- Body text left edge aligns precisely with the H2 / eyebrow text left edge.

## Out of scope

- No changes to other sections, headings, or component layout.
- No changes to color tokens.