

## Pass 1 — Global Typography Reset (iOS-Native Hierarchy)

A surgical reset of the typography system. Since the entire site is driven by canonical `t-*` tokens in `src/index.css` plus the Tailwind font stack, I can rebind every text style globally by editing **two files only**. No per-page changes required.

---

### 1. Font stack (`tailwind.config.ts`)

Promote **Inter** to primary sans (currently Geist is first), keep Source Serif 4 for serif, swap mono to **Geist Mono**:

- `sans`: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- `serif`: `"Source Serif 4", "Source Serif Pro", Georgia, ui-serif, serif`
- `mono`: `"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace`

### 2. Font import (`src/index.css` line 1)

Update the Google Fonts URL: drop Geist sans + IBM Plex Mono, add **Geist Mono** weights 400/500. Keep Inter (add 700 for eyebrows), keep Source Serif 4, keep Playfair (used by `RegistryHeader`).

### 3. Base layer (`src/index.css` lines 171–192)

- `body`: `font-size: 17px`, `letter-spacing: -0.011em` (was 16px / -0.005em).
- `h1–h6`: add `letter-spacing: -0.022em`, `font-weight: 600`. Remove per-heading letter-spacing overrides on h1/h2/h3/h4 (lines 186–189) — replaced by token-level control.

### 4. Canonical type tokens (`src/index.css` lines 276–298) — rebind to spec

| Token | New spec | Maps to |
|---|---|---|
| `.t-page-title` | **Source Serif 4, 600, 34/40, -0.022em** | H1 page titles |
| `.t-article-title` | Source Serif 4, 600, 34/40, -0.022em | Article H1 |
| `.t-chapter-title` / `.t-home-title` | alias → `.t-page-title` (kept) | — |
| `.t-section-title-md` | **Inter, 600, 22/30, -0.022em** | H2 |
| `.t-section-title-sm` | Inter, 600, 22/30, -0.022em | H2 (small variant) |
| `.t-h3` | Inter, 600, 17/24, -0.022em | Card titles (vendor names) |
| `.t-h4` | Inter, 600, 17/24, -0.022em | — |
| `.t-body-md` (default body) | **Inter, 400, 17/26, -0.011em** | Body |
| `.t-body-sm` | Inter, 400, 15/24, -0.011em | Selection bars (Select Focus) |
| `.t-body-lg` | Inter, 400, 17/28, -0.011em | Long-form |
| `.t-body-strong` | Inter, 600, 17/26, -0.011em | — |
| `.t-nav` | **Inter, 500, 17/24, -0.011em** | Nav links |
| `.t-label-sm` (filter pills) | **Inter, 600, 13/16, 0.04em, uppercase** | Pills |
| `.t-eyebrow-sm` | **Inter, 700, 11/16, 0.05em, uppercase** | Eyebrows |
| `.t-utility-xs` | **Geist Mono, 400, 12/16, 0.02em** | Metadata labels |
| `.t-micro` | Geist Mono, 400, 12/16 | — |
| `.meta-mono` | Geist Mono, 400, 12/16, tabular-nums | Technical IDs |

H3 (24px) and H4 (20px) are **not** in the new hierarchy — both collapse to the 17px card-title size for full unification.

### 5. Cleanup

- Drop the IBM Plex Mono import; rebind `.meta-mono`'s inline `font-family` to Geist Mono.
- Remove the conflicting per-h1/h2/h3/h4 letter-spacing rules now that tokens carry the spec.
- Leave colors, spacing, layouts, and `RegistryHeader`'s Playfair Display H1 untouched (per directive — Pass 1 is type-only; Playfair is a registry-specific anchor we'll address in a later pass if needed).

### Files touched

- `src/index.css` — font import + base layer + token rebinds
- `tailwind.config.ts` — sans/mono font stacks

### Out of scope (later passes)

- Spacing, grids, container geometry → Pass 2
- Motion, transitions, interaction logic → Pass 3
- Color and layout changes → never in Pass 1

