# Stop mobile zoom on input focus

## What's happening

On iOS (Safari, and in-app browsers like Instagram), tapping any text field whose font size is under 16px makes the browser auto-zoom the page. The home hero search input is set to 14px, so tapping it zooms in and shifts the layout. The same applies to registry search, filter selects, the access gate, and the assistant input, which use 10.5–12.5px text.

## Fix

Apply one global rule so every form control renders at 16px on touch devices only, which is exactly what iOS needs to skip the auto-zoom. Desktop keeps the current compact sizing.

- Add to `src/index.css`, scoped to coarse-pointer / small screens:
  `input, select, textarea { font-size: 16px; }`
  This overrides the inline 14px on the hero input and the `text-[11px]` / `text-[12.5px]` classes on registry controls when on mobile.
- Where a control must stay visually small on mobile (registry search, facet selects, sort), keep the 16px font but nudge padding/height so the row height stays the same, avoiding layout growth.

## Also covered

- Home hero search (`src/pages/Index.tsx`) — remove the inline `fontSize: 14px` so the global rule applies cleanly.
- Registry query bar, facet select, sort control (`src/components/registry/QueryBar.tsx`), focus filter, pagination input.
- Site access gate and assistant input (`src/components/SiteAccessGate.tsx`, `src/components/SourceBot.tsx`).
- Contact / report-concern forms and shared `ui/input.tsx`, `ui/textarea.tsx`.

## Viewport meta

Keep `width=device-width, initial-scale=1.0` and add `viewport-fit=cover` for safe-area handling in in-app browsers. Deliberately not adding `maximum-scale=1, user-scalable=no`: it breaks accessibility pinch-zoom and is ignored by modern iOS anyway. The 16px rule is the real fix.

## Also reduces view shifting

- Add `overflow-x: hidden` guard on `html, body` so no element can cause horizontal drift after focus.
- Ensure focused inputs inside the filter sheet don't trigger scroll jumps by keeping their font at 16px too.

## Verification

Load the home page and registry at a mobile viewport in a headless browser, focus each input, and confirm no visual scale change and no layout shift.
