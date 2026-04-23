

## DocJumpBar: Restore Visibility on Scroll

The bar disappears as you scroll because the sticky `<nav>` lives **inside** the 44px-tall seam zone wrapper. Sticky elements can only stick within their parent's bounds — once the seam zone scrolls out of view, the nav is clipped away with it. That's why it never docks at the top.

### Fix

Single file: `src/components/DocJumpBar.tsx`.

1. **Move the sticky nav out of the seam zone.** The seam zone keeps its 44px height + navy/white gradient as a pure visual anchor (no nav inside). The `<nav>` becomes a sibling that follows the seam in document flow.

2. **Make the nav's sticky parent the page itself** (or at minimum a tall ancestor — the page body), so it can stick all the way down the article.

3. **Anchor the resting position visually on the seam** by giving the nav a negative top margin equal to half the seam height. At rest it overlaps the seam (looking centered on the navy/white split); as the user scrolls, sticky takes over at `top: 64px` and the negative margin no longer matters.

4. **Keep the scroll-linked width morph intact** — `progress` still drives width, radius, shadow, and border opacity exactly as today. Only the DOM placement changes.

### Structure

```text
<section seam-zone (44px, navy/white gradient)>  ← purely decorative
<nav sticky top-64px, mx-auto, width = lerp(80%,100%,progress)>  ← sibling, sticks for entire article
   Contents · 01 · 02 · 03 · …
</nav>
<article body…>
```

### Result

- At rest: pill sits visually on the seam (via negative top margin), 80% width, rounded.
- Scrolling down: sticks at `top: 64px`, smoothly widens to 100% and squares off as `progress` → 1.
- Scrolling up: reverses — narrows back to a pill, returns to seam.
- Always visible throughout the article because its sticky container is now the page, not the 44px seam.

