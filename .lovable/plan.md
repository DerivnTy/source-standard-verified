

## Education page consumer pivot + site-wide "Source Bot" chat FAB

Two changes: trim the Education page to a consumer-friendly Resource Hub, and add a global floating chat assistant rendered from `SiteLayout` so it appears on every page.

### 1 · Education page cleanup (`src/pages/Education.tsx`)

**Hero**
- Remove the search input entirely, the `Search` icon import, the `query` state, all `useMemo` filter blocks, and `matches()` helper.
- Keep the centered eyebrow, `h1`, and lead copy as-is. Hero stays centered with no reference box (already there).

**Tile redesign — `LibraryTile`**
Restyle to match the requested consumer card:
- Remove the Doc ID footer row entirely (no `SS-…` code shown).
- Remove the status chip from the card body (Published/Forthcoming pill goes away on these cards).
- Title: bump to `text-[19px] font-semibold leading-snug`.
- Description: clamp to 2 lines via `line-clamp-2` for visual rhythm; keep `leading-[1.7]`.
- Optional `Reviewed by …` micro-line stays only if present.
- Footer becomes a single subtle CTA: `Read article →` in muted foreground that brightens + nudges right on hover (using `ChevronRight`).
- Card chrome: white `bg-background`, `border border-border/50` (thinner, lighter), `hover:shadow-md hover:border-foreground/30 transition-all duration-200`. No translate.

This tile is reused for Foundational, Clinical Protocols, and Latest Analysis — all three remain 3-column grids (already are).

**FAQ category cards (4-up grid)**
- Remove the `code: "FAQ-CAT-0X"` field from the `CATEGORIES` array (or simply stop rendering it — it isn't rendered today, so just confirm none surfaces). Trim `label` strings to the requested single words: **Legal**, **Safety**, **Verification**, **Diligence**.
- Remove the `{count} entries` micro-line so the card focuses on the title.
- Keep the icon, larger heading, description, and full-width outline `Browse Category →` button.
- Match the new card chrome (`border-border/50`, soft hover shadow, no translate).

**Sticky jump bar**
Keep as-is — still useful for scanning.

**Removed code**: `useState`, `useMemo`, `query`, `Search` icon import, `matches`, `filteredBasics`/`filteredGuides`/`filteredAnalysis`, `categoryCounts`, `EmptyNote`. Sections render `basics`, `guidesPreview`, and `analysisCards` directly.

### 2 · New global chat FAB + window

**New file: `src/components/SourceBot.tsx`**

Self-contained client component. No backend, no LLM call yet — UI/UX scaffold only, with a stubbed send handler that appends the user's message and a canned "I'm not connected to the knowledge base yet" assistant reply (clearly labeled in a comment as the future LLM hook point).

- **FAB**: fixed `bottom-6 right-6 z-50`, `h-14 w-14 rounded-full`, dark (`bg-foreground text-background`) matching the "Apply for verification" button language, soft shadow, subtle hover scale. Icon: `ShieldCheck` from lucide (clean, on-brand). `aria-label="Open Source Standard Assistant"`.
- **Chat window**: when toggled open, renders a fixed panel anchored bottom-right (`bottom-24 right-6`), `w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-8rem)]`, `rounded-xl border border-border/60 bg-background shadow-xl`, flex column.
  - **Header**: small bar with `ShieldCheck` icon + title `Source Standard Assistant` + muted subline `Educational reference · not medical advice` + a close button (`X`).
  - **Message list**: scrollable, `flex-1 overflow-y-auto p-4 space-y-3`. Assistant bubbles `bg-surface-muted text-foreground`, user bubbles `bg-foreground text-background self-end`, both `rounded-lg px-3 py-2 text-[13.5px] leading-[1.6] max-w-[85%]`.
  - **Seed message** (assistant): *"Hello! I am the Source Standard Assistant. I can help you understand peptide safety, 503A/B regulations, or how our verification process works. What can I help you find today?"*
  - **Input row**: `border-t border-border/50 p-3` with a rounded text input + dark send button (paper-plane / `Send` icon). Submit on Enter; disabled when empty.
  - **Mobile**: at `<sm`, panel becomes near-fullscreen via the max-width/height clamps above; FAB stays at `bottom-6 right-6`.
- **State**: local `useState` for `open` and `messages: { role: "user" | "assistant"; content: string }[]`. No persistence.
- **Internal note** (developer comment in file):

  ```
  // TODO: wire to LLM. Send `messages` to an edge function that injects
  // the Source Standard library content (src/data/library.ts + the
  // SS-SERIES analysis pages) as system context, then stream the reply.
  ```

**Wire-up: `src/components/SiteLayout.tsx`**
Import `SourceBot` and render it once after `SiteFooter` so it overlays every route.

```tsx
<SiteFooter />
<SourceBot />
```

### Files touched

- `src/pages/Education.tsx` — remove search + filtering, redesign `LibraryTile`, simplify FAQ cards, trim category labels.
- `src/components/SourceBot.tsx` — new floating chat FAB + window (UI only, stubbed send).
- `src/components/SiteLayout.tsx` — mount `<SourceBot />` site-wide.

### What stays the same

- All routes and slug overrides, `library.ts`, every other page, `RecordHeader`/`AnchorHeader`/`Section`/`Button`, the sticky jump bar, the Forthcoming + About footer block, and the Highly Recommended trio.

