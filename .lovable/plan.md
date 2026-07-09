
## Goal

Establish the new consumer-facing visual language on the **homepage** and the **shared primitives it inherits from**. No color, font, route, data, or verification-logic changes.

Governing principle: *if a design element does not improve comprehension, remove it.*

**Revision from prior plan (per your caution):** Global `.section-pad` tokens are **not** modified. The tighter rhythm lives inside the new `PageSection` primitive so `/how-it-works`, `/learn`, `/partners`, `/verified-vendors`, `/greenlist`, and every other page that hasn't opted in stay visually identical until we migrate them intentionally.

---

## 1. New shared primitives (`src/components/system/`)

### 1a. `GlyphIcon.tsx` — sitewide icon vocabulary

Thin `lucide-react` wrapper enforcing 1.25px stroke, `currentColor`, no fills, no backgrounds. Sizes: `xs (12) | sm (14) | md (16)`. Export a `Glyph` component and a `GlyphName` union that pins one meaning per icon:

| Glyph | Meaning (never reuse for anything else) |
|---|---|
| `check` | established / included / verified |
| `minus` | limitation / excluded / does not mean |
| `circle` | category / neutral grouping / status dot |
| `search` | registry / discovery |
| `shield-check` | Source Standard verification |
| `graduation-cap` | education / Learn |
| `handshake` | partners / collaboration |
| `scale` | governance / accountability / standards |

`SourceCheck` stays as-is — it's a distinct trust mark, not a UI glyph.

### 1b. `DataStrip.tsx` — extracted from `Index.tsx`

Promoted to a shared primitive. Removes the `01 / 03` counter. Adds optional `icon` prop from the Glyph vocabulary. Reduces internal padding from `16px 18px` → `14px 16px`, tightens title→body gap from `8px` → `6px`, tightens line-height from `1.75` → `1.65`. No breaking API for numbered index/total — those props are gone.

### 1c. `PageSection.tsx` — canonical consumer section pattern

Owns its own compact vertical rhythm (padding `28px` top/bottom mobile). Structure:

```
[optional Glyph]  Question heading (22px, weight 700)
Short supporting sentence (optional, 15px, muted)
Content block (grid of DataStrips or custom children)
Optional CTA row
```

Never emits a numbered eyebrow. Renders on `.page-shell` inside `w-standard`. Framework/legal doc pages that need `§`-numbering keep using their existing scaffolding — this primitive is opt-in.

### 1d. `src/components/system/index.ts`

Re-export `PageSection`, `DataStrip`, `Glyph`, `GlyphName`.

---

## 2. Homepage rewrite (`src/pages/Index.tsx`)

Hero and `DocJumpBar` untouched (except waypoint labels).

Delete the giant inline `<style>` block's numbered-scaffold overrides: `.home-eyebrow`, `.home-h2`, `.home-lead`, `.home-lead-pill`, `.home-lead-card`, `.home-grid`, `.home-cta`, `.home-section` padding rules. Keep only the hero-scoped `@keyframes scrollCue` and the `.home-hero h1#briefing-title` desktop overrides.

Delete the local `DataStrip` definition — import from `@/components/system`.

Remove leading digits from `homeWaypoints`. `DocJumpBar` currently renders `w.number.padStart(2, "0") + "."` before each label — update it to skip that span when `number` is empty (surgical change, non-numbered waypoints render label-only).

Migrate all eight below-hero sections to `<PageSection>` with these glyphs and unchanged headings/copy:

| # | Section | Glyph | Content |
|---|---|---|---|
| 1 | Mission — "Why Does This Exist?" | `shield-check` | Two-paragraph mission collapsed to a single `intro` + a short second paragraph as child content, card chrome removed. |
| 2 | Trust problem — "Claims Are Not Verification" | `minus` | Lead paragraph as `intro`, primary CTA. |
| 3 | How it works — "How Does Source Standard Verify?" | `search` | 3 `DataStrip`s, each with `check` glyph. |
| 4 | Live registry — "What Does the Registry Cover?" | `search` | Lead as `intro`, two stacked CTAs unchanged. |
| 5 | Registry fields — "What Will I See in a Listing?" | `circle` | 4 `DataStrip`s, each with `circle` glyph (categories). |
| 6 | Function — "Who Is This For?" | `handshake` | 3 `DataStrip`s, no glyph on cards (audience labels are self-explanatory). |
| 7 | Reference — "Where Can I Learn More?" | `graduation-cap` | 3 linked `DataStrip`s. |
| 8 | Governance — "Who Stands Behind This?" | `scale` | 3 linked `DataStrip`s. |

Mobile card stacks stay `flex-col gap-2.5`. Desktop grids stay `lg:grid-cols-2/3 lg:gap-3`. If post-implementation the tighter card padding makes `gap-2.5` feel too separated on mobile, drop to `gap-2`.

---

## 3. Verification

- `bunx tsgo --noEmit` clean.
- Playwright screenshots at 390×779 (mobile, current viewport) and 1280×1800 (desktop) of `/`, plus spot checks per your caution list: `/how-it-works`, `/learn`, `/partners`, `/verified-vendors`, `/greenlist`. Confirm:
  - Homepage: no numbers visible below hero, hero unchanged, sections visibly denser without cramping, glyphs render at 1.25px stroke inheriting text color.
  - Spot-check pages: **pixel-identical** to before (since `.section-pad` is untouched and none of them consume the new primitives yet).
- Grep to confirm no other file imported the local `DataStrip` from `Index.tsx`.

---

## 4. Explicitly NOT in this pass

- About, Partners, How It Works, Governance, Accountability, FAQ, Verification Disclaimer, Status Definitions, Education, Learn — migrate to `PageSection` + `Glyph` in follow-up turns after homepage review.
- Framework/legal docs keep `§`-numbering.
- Global `.section-pad`, colors, fonts, routes, data files, verification logic, hero spacing, `SourceCheck`, `SiteHeader`, `SiteFooter`, `DocJumpBar` sticky/scroll behavior.

---

## Technical notes

- **New files:** `src/components/system/GlyphIcon.tsx`, `src/components/system/DataStrip.tsx`, `src/components/system/PageSection.tsx`.
- **Modified:** `src/components/system/index.ts` (exports), `src/pages/Index.tsx` (rewrite below hero, delete local `DataStrip`, trim inline `<style>`, drop waypoint numbers), `src/components/DocJumpBar.tsx` (render the leading `NN.` chip only when `number` is non-empty).
- **Not modified:** `src/index.css`.
- `lucide-react` already a dependency; no installs.
