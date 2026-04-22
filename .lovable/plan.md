

## Header simplification + brand polish

Single-file change to `src/components/SiteHeader.tsx`. Tokens, layout, and CTA styling already match the institutional system — this pass tightens the nav itself.

### 1 · Remove "Home" from nav

Drop the `{ to: "/", label: "Home", end: true }` entry from the `nav` array. The Logo (top-left) becomes the sole homepage affordance — it already wraps a `<Link to="/">` via `Logo.tsx`.

### 2 · Logo polish

In `Logo.tsx`: bump the mark from `22×22` → `26×26`, wordmark from `15px` → `15.5px font-semibold tracking-[-0.01em]`, add `hover:opacity-80 transition-opacity` so it reads as interactive. Keep the navy/teal checkmark as-is.

### 3 · Nav link refinement

- Increase desktop nav `gap-7` → `gap-9` for breathing room between the 6 remaining links.
- Link type scale: `text-[13.5px]` → `text-[13px]`, weight `font-medium` (already), tracking `tracking-[0.005em]`. Inactive color stays muted; hover brightens to foreground; active state keeps the teal underline (now `after:h-[2px]` already, leave thickness, but lower it to `bottom-[-14px]` so it sits exactly on the header's bottom border).
- Active link weight stays `font-semibold` for unmistakable wayfinding.

### 4 · Primary CTA — Institutional Navy

"Apply for verification" already uses `bg-foreground text-background` (the navy token). Confirm + tighten:
- `h-10 px-5 text-[13px] font-medium rounded-md` (inherits the new 10px radius automatically).
- Hover: `hover:bg-foreground/90` (already in place).
- This is the only filled button in the header — establishes a clear single-CTA hierarchy.

### 5 · Ghost button language for secondary actions

Header currently has no secondary button — the nav links themselves are the "ghost" affordances. To formalize the system for future use, no new button is added in the header, but the existing `variant="ghost"` in `button.tsx` is already correctly styled (`hover:bg-accent`) and inherits the new tokens. No code change needed; documented for downstream pages.

### 6 · Sticky glassmorphism

Update the `<header>` classes:
- Resting state: `bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border/40`. Slightly more transparent + stronger blur than current `bg-background/85 backdrop-blur-md`, so the cool-gray page tint shows through and reads as true glass against scrolled content.
- Drop the existing `shadow-sm` — the brief explicitly calls for "very thin bottom border, no heavy shadow." The hairline `border-b` does the separation work.
- Utility strip (non-home pages) keeps its `bg-background border-b border-border/40` — the small mono band sits above the glass header and stays opaque so the metadata stays legible.

### 7 · Mobile menu

Mobile sheet drops the "Home" item alongside desktop. No other mobile changes — sheet already uses the new radius and tokens.

---

### Files touched

- `src/components/SiteHeader.tsx` — remove Home, widen nav gap, refine link size/tracking, swap header classes for glassmorphism + hairline border, drop shadow.
- `src/components/Logo.tsx` — slightly larger mark + wordmark, add hover affordance.

### What stays the same

Every route, every page, the CTA destination, the nav active-state color (teal), the utility strip, the mobile sheet structure, and every other component. `Button` variants (`default` navy, `ghost`, `outline`) are already correct via tokens — no `button.tsx` edits.

