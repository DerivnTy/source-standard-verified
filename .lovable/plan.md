

## Tight-Crop the Logo Asset, Then Re-Scale

The visual smallness isn't a CSS sizing problem — it's a bounding-box problem. The current PNG has substantial transparent padding around the shield + wordmark, so when we set `h-10` on the `<img>`, half of that height is empty space. The fix is to physically crop the asset to its visible artwork bounds, regenerate the light variant from the cropped source, and then dial sizing back to sane numbers.

---

### 1 · Tight-crop the dark logo asset

Process `src/assets/source-standard-logo.png` with a Python/Pillow script:

- Load the image, find the bounding box of all non-transparent (alpha > 0) pixels using `Image.getbbox()` on the alpha channel.
- Crop to that bbox plus a tiny uniform safe margin (~2% of the artwork height on all sides) — just enough to prevent edge clipping at small render sizes, not enough to recreate the padding problem.
- Save back to `src/assets/source-standard-logo.png`, overwriting.
- Verify by reading the new dimensions; the aspect ratio should now reflect the true lockup proportions (roughly shield + wordmark width, not a near-square padded canvas).

### 2 · Regenerate the light (white) variant from the cropped source

Re-run the recolor step on the freshly cropped dark asset:
- Load the cropped `source-standard-logo.png`.
- Replace all non-transparent RGB values with white (`255,255,255`), preserve the alpha channel exactly.
- Save to `src/assets/source-standard-logo-light.png`.

This guarantees both variants share identical bounds and the navy/white versions are pixel-aligned.

### 3 · QA the cropped assets

Render each cropped PNG to a temp inspection image and visually confirm:
- No clipped pixels on any edge of the shield or wordmark.
- No visible halo or anti-alias fringe.
- Aspect ratio matches the actual lockup (wide, not square-ish).
- Light variant is cleanly white, alpha intact.

### 4 · Recalibrate displayed sizes against the new bounds

With the asset now tightly bounded, the same `h-*` classes will render the actual artwork at full height. Reset to balanced, intentional values:

- **`src/components/Logo.tsx`** (header + footer):
  Change `h-9 md:h-10 w-auto` → `h-8 md:h-9 w-auto`. The cropped asset at this height will visually read larger than the current padded asset at `h-10`, while keeping the 64px nav row balanced.

- **`src/components/BriefingHero.tsx`** (homepage cover):
  Change `h-24 sm:h-28 md:h-36 w-auto` → `h-16 sm:h-20 md:h-24 w-auto`. With true bounds, this will anchor the hero at meaningful presence without the previous overscale compensation. Still subordinate to the H1 beneath it.

The footer inherits the new `Logo` default automatically — no additional changes.

### 5 · What stays the same

- `Logo` component API (`variant` prop, link target, hover behavior, alt text).
- All consuming JSX in `SiteHeader.tsx`, `SiteFooter.tsx`, `Index.tsx`.
- Hero rhythm: eyebrow → logo → divider → H1 → statement → CTAs → scroll cue.
- No new placements, no decorative repetition.

### Files touched

- **Modified (binary):** `src/assets/source-standard-logo.png` — tightly cropped to artwork bounds.
- **Regenerated:** `src/assets/source-standard-logo-light.png` — white variant rebuilt from the cropped source.
- **Modified:** `src/components/Logo.tsx` — header/footer height back to `h-8 md:h-9`.
- **Modified:** `src/components/BriefingHero.tsx` — hero height back to `h-16 sm:h-20 md:h-24`.

### Outcome

The logo finally renders at the size the CSS claims it does, because the PNG bounds now match the visible mark. The header, footer, and hero each carry a confidently scaled lockup with zero wasted whitespace inside the image — without needing to chase ever-larger Tailwind heights to compensate for transparent padding.

