

## Global Header Refinement

Tighten the global utility bar to a single sitewide framework strip, and refine `SiteHeader` so the navigation and verification action read as one composed institutional system.

---

### 1 · Global utility bar — single static strip

Rewrite `src/components/GlobalUtilityBar.tsx` to remove all route-specific content. No more per-page `DOC ID`, version, or status — that metadata belongs on individual document pages, not the global chrome.

**New content (identical on every route):**
```
SOURCE STANDARD FRAMEWORK  ·  PUBLIC REFERENCE SYSTEM  ·  ACTIVE  ·  UNITED STATES  ·  UPDATED 04 / 21 / 2026
```

**Implementation:**
- Delete the `RouteSignature` type, `DEFAULT_SIG`, `ROUTE_SIGNATURES` map, and `resolveSignature()` helper.
- Keep the `useLocation` check only to detect the home route (`/`) for the navy-surface variant — same color logic as today.
- Render a single horizontal row of mono segments separated by middots. On narrow viewports, hide secondary segments progressively (`hidden sm:inline`, `hidden md:inline`) so the bar never wraps:
  - Always visible: `SOURCE STANDARD FRAMEWORK`
  - `sm+`: `PUBLIC REFERENCE SYSTEM`
  - `sm+`: `STATUS · ACTIVE` (with the word "ACTIVE" slightly brighter, matching today's status emphasis)
  - `md+`: `UNITED STATES`
  - Always visible (right-aligned): `UPDATED 04 / 21 / 2026`
- Keep the existing styling: `font-mono text-[10.5px] uppercase tracking-[0.14em]`, hairline bottom border, navy variant on `/`, neutral elsewhere. No structural change to height or padding.

### 2 · `SiteHeader` — refined institutional balance

Edit `src/components/SiteHeader.tsx` to make the header read as one composed unit.

**Verification action — refine the button:**
Replace the current solid black-on-white button with a quieter, tailored, header-native treatment:
- Component: keep `<Button asChild>` but switch to `variant="outline"` styling overridden inline.
- Visual: thin 1px border in `border-foreground/20`, transparent background, `text-foreground` label, hover lifts to `border-foreground/40` and `bg-foreground/[0.03]` (no color shift, no scale, no shadow).
- Sizing: `h-9 px-4 text-[12.5px] font-medium tracking-[0.01em] rounded-md` — slightly shorter than today's `h-10 px-5`, so the action sits at nav weight rather than dominating.
- Copy: keep `Apply for Verification` (Title Case — currently sentence case). Title Case reads as a formal action label, matches the institutional tone.
- No icon, no arrow, no accent color.

**Nav + spacing balance:**
- Reduce nav gap from `gap-9` to `gap-7` so the nav cluster feels tighter and the button sits closer to the nav as part of the same composition.
- Nav links: keep current `text-[13px] font-medium` but soften the active-state underline — change `after:bg-primary` to `after:bg-foreground` and reduce `after:h-[2px]` to `after:h-[1.5px]`. The active link still anchors visually but stops feeling like a brand accent.
- Logo: leave `Logo.tsx` untouched (already restrained).

**Header surface:**
- Keep the sticky behavior, scroll hide/show, and backdrop-blur. No changes there.
- Tighten the bottom border from `border-border/40` to `border-border/60` so the header has a slightly crisper terminal edge — reads as a defined band rather than a fade.

**Mobile menu:**
- Replace the mobile primary `Apply for verification` button with the same outline treatment (`border border-foreground/20 bg-transparent text-foreground`) so the mobile menu inherits the refined institutional tone. Copy: `Apply for Verification`.

### 3 · No other changes

- `Logo.tsx`, `SiteLayout.tsx`, `SiteFooter.tsx`, route definitions, and every page remain untouched.
- The per-page `DocJumpBar`, `RecordHeader`, `ProfileFooter`, and other document-level metadata continue to display page-specific identifiers — they were never the global bar's job.

### Files touched

- `src/components/GlobalUtilityBar.tsx` — full rewrite to a single static framework strip; remove route signature map and resolver.
- `src/components/SiteHeader.tsx` — refine the desktop and mobile verification button, tighten nav spacing, soften the active underline accent, crisp the bottom border. Update copy to `Apply for Verification`.

### What stays the same

`Logo`, `SiteLayout`, `SiteFooter`, `SourceBot`, the sticky/hide-on-scroll behavior, the `useHeaderVisible` hook, all routes, all page-level metadata components, and the home-page navy treatment of the utility bar.

