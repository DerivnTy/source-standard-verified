# Kill White Overscroll Below Footer

## Diagnosis
The white/cream area you see when force-scrolling past the footer is the **page/body background** showing through the browser's overscroll bounce. The footer itself ends correctly on navy — but when you pull the page past its end, the viewport reveals whatever color sits behind the document (currently cream).

The cleanest fix would be to set `body { background: hsl(var(--navy-surface)) }` in `src/index.css`, but you scoped this change to `SiteFooter.tsx` only. So we'll solve it from inside the footer.

## Fix (single file: `src/components/SiteFooter.tsx`)

Add a fixed-position, full-width navy panel pinned to the bottom of the viewport, sitting behind all content (`-z-10`, `pointer-events-none`). Because it's `position: fixed` to the bottom, it stays painted under the overscroll area regardless of scroll position. Because it's behind everything (`-z-10`), it never interferes with page content or interactions — users only see it when the browser's overscroll bounce exposes the area beneath the document.

```tsx
return (
  <>
    {/* Paints navy behind any overscroll bounce */}
    <div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 h-[50vh] -z-10 pointer-events-none bg-[hsl(var(--navy-surface))]"
    />
    <footer className="relative mt-0 mb-0 bg-[hsl(var(--navy-surface))]">
      {/* ... existing footer content unchanged ... */}
    </footer>
  </>
);
```

Notes:
- `h-[50vh]` is more than enough to cover any overscroll bounce on mobile and desktop.
- `relative` on the `<footer>` ensures it stacks above the fixed panel during normal scroll.
- No changes to footer copy, links, structure, padding, header, routes, or global CSS.

## Acceptance
- Force-scrolling past the footer on mobile reveals navy, not cream.
- Footer content, spacing, and links are unchanged.
- No layout shift, no interaction blockers.