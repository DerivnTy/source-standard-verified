

## Fix the broken hamburger menu

**Root cause:** During the last refactor, the body-scroll-lock `useEffect` was accidentally pasted **inside `useHeaderVisible`** (lines 38–46 of `src/components/SiteHeader.tsx`) instead of inside the `SiteHeader` component. That block references `open` — a variable that doesn't exist in the hook's scope — which throws a ReferenceError every time any component (e.g. `DocJumpBar`) calls `useHeaderVisible()`. The result: the header tree never finishes rendering the overlay correctly, so tapping the hamburger appears to do nothing.

## Changes (single file: `src/components/SiteHeader.tsx`)

1. **Remove** the misplaced scroll-lock `useEffect` from inside `useHeaderVisible` (lines 38–46). The hook should only contain the visibility-listener subscription.

2. **Re-add** the scroll-lock `useEffect` inside the `SiteHeader` component, alongside the other `useEffect`s, so it correctly closes over the local `open` state:
   ```tsx
   useEffect(() => {
     if (!open) return;
     const prev = document.body.style.overflow;
     document.body.style.overflow = "hidden";
     return () => { document.body.style.overflow = prev; };
   }, [open]);
   ```

3. **Verify** no other stale references remain in `useHeaderVisible` and that the overlay's `pointerEvents`/`opacity` toggling on `open` still works as designed.

## Outcome

- Tapping the hamburger toggles `open`, the full-screen Navy overlay fades in, body scroll locks, and the morphing X icon appears as intended.
- `DocJumpBar` and any other `useHeaderVisible` consumer stop crashing.

No visual or behavioral changes beyond restoring the intended interaction — purely a scope-bug fix.

