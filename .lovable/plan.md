

## Global Precision Audit — UI hardening pass

Six tightly-scoped edits that lock the institutional finish without restructuring any pages or routes. No new components; no data changes.

### 1 · `SiteHeader.tsx` — vertical alignment + flush CTA + live links

- Header row: ensure `flex h-16 items-center` (already set) — confirm `Logo` and `nav` sit on the same baseline by removing the per-link vertical padding `py-5` and replacing the active underline with an absolutely-positioned bottom strip pinned to `bottom-0` of the `h-16` container (so the underline still hugs the header edge while the link itself is `h-10` and vertically centered).
- CTA: `Button` size set to `h-10` (matches new nav link height) + `text-[13px] font-medium` — flush with the nav line.
- Links audit: every entry in `nav` already points to a live route — re-confirmed, no `#` anchors anywhere in `SiteHeader.tsx`, `SiteFooter.tsx`, or `Index.tsx` (grep returned zero matches). No change required for "no dead links" but the audit is documented.

### 2 · Homepage hero — strict 65/35 split + alignment + metadata box polish (`src/pages/Index.tsx`)

- Grid: `md:grid-cols-12` → `md:grid-cols-[65fr_35fr]` (true 65/35 split — the requested math). Drop the `md:col-span-8` / `md:col-span-4` shorthands.
- Aside: remove `md:pl-6 md:border-l md:border-border` (leftover decorative rail) and replace with the standard white Reference-Box treatment for visual parity with the rest of the site:
  - `bg-surface border border-[#E5E7EB] rounded-[4px] p-4` → switch the inline `border-border` colour to a hard `#E5E7EB` per spec.
  - Internal padding `p-4` (16px) — meets the "≥16px internal padding" rule.
  - Header label kept; rows kept; `md:self-end` kept so the box still bottoms-aligns with the CTA row on desktop.
- Mobile: the existing `md:` prefixes already cause the aside to stack below on small screens — explicit `mt-8 md:mt-0` added to guarantee breathing room above the metadata box when stacked.
- Left-edge alignment: `max-w-[640px]` on the lookup terminal kept; CTA row already left-aligned to the headline. Confirm the lookup `<form>` has no left padding/margin so the input's left edge matches the `h1` left edge exactly.
- Lookup full-width on mobile: `max-w-[640px]` already applies only via natural max — explicit `w-full` added so the field fills the column on narrow viewports.
- Lookup focus state: `focus-within:border-foreground/40` is already present — kept (subtle 1px border change on focus, satisfying "clear focus state").

### 3 · `SiteFooter.tsx` — strict 5-column grid + readable labels + container-aligned strip

- Grid: replace the current `md:col-span-3` brand + `md:col-span-9` nested 4-col layout with a single uniform 5-column track:
  - `lg:grid-cols-5 gap-x-8 gap-y-10` (equal gutters; 5 columns: Brand + 4 directory).
  - `md:grid-cols-2` fallback for tablet, `grid-cols-1` for mobile.
  - Drop the `lg:divide-x lg:divide-border/60` and the `lg:px-6` padding — replaced by the equal `gap-x-8` gutter (cleaner, no asymmetric divider rendering and no truncation).
- Link rows: remove `truncate` from the label span and remove `whitespace-nowrap` behavior — labels wrap to a second line when needed. Font reduced one step (`text-[13.5px]` → `text-[13px]`) for the label, doc ID kept at `text-[10.5px]`. Row layout becomes `flex items-start justify-between gap-3 py-1.5` so a wrapped 2-line label still aligns its first baseline with the doc ID.
- Brand column: drop `max-w-xs` on the description so the column uses its full 1/5 share without an artificial cap.
- Top compliance strip: wrap its inner row in `container-wide` (already present) — verified: the current strip uses `container-wide` so the gray strip is already container-aligned. Keep as-is.

### 4 · Mobile / desktop fluidity (covered by §2 + §3)

- Hero metadata box stacks below headline on mobile (verified — `md:` breakpoint applies the 65/35 grid; below `md` the children stack naturally). Added explicit `mt-8 md:mt-0` for spacing.
- Lookup terminal `w-full` on mobile (added).
- Footer collapses 5 → 2 → 1 columns at `lg`/`md`/sm breakpoints (added).

### 5 · Component standardization — `StatusBadge` is the single source

- `StatusBadge.tsx` already meets the spec (small caps, 1px border, rounded-[3px] → bumped to `rounded-[2px]` per spec, `font-mono uppercase tracking-[0.14em]`, status-coloured). Single change: `rounded-[3px]` → `rounded-[2px]` on the badge wrapper.
- Replace ad-hoc inline status pills with `StatusBadge` in two visible Home spots:
  - `Index.tsx` §4 Greenlist row — the inline `Active` pill becomes `<StatusBadge status="verified" />` (label override via the existing `verified` mapping reads "Verified" — to keep the literal "Active" label, retain the inline pill but restyle to match the StatusBadge geometry: `border border-verified/40 text-verified rounded-[2px] px-2 py-[3px] font-mono uppercase tracking-[0.14em] text-[10px]`).
  - `Index.tsx` §3 MAB card "Active" stamp — same restyle.
- Three site-wide colours are already token-bound: `--verified` (green), `--pending` (amber), `--muted-foreground` (gray) — no token edits.

### 6 · Body line-height + functional integrity

- `index.css` `body { line-height: 1.65 }` is current; the spec asks for `1.6` — change to `1.6` (one-line edit).
- Functional cross-check: every "Read deeper" / "View full index" / "Open the registry" anchor in `Index.tsx`, `SiteFooter.tsx`, `SiteHeader.tsx`, plus `RecordHeader`/`AnchorHeader` consumers, was grepped for `to="#"` and `href="#"` — zero matches. All links route to live pages. No fix required; documented as part of the audit.
- Search input focus state already lands a 1px `border-foreground/40` change on focus (kept).

### Files touched

- `src/components/SiteHeader.tsx` — nav link `py-5` → `h-10`, underline pinned to `bottom-0`, CTA `h-10`.
- `src/pages/Index.tsx` — hero grid switched to `md:grid-cols-[65fr_35fr]`, aside becomes white Reference Box with `#E5E7EB` border + 16px padding, lookup `w-full`, two inline "Active" pills restyled to badge geometry, `mt-8 md:mt-0` on aside.
- `src/components/SiteFooter.tsx` — 5-column grid, dividers removed, labels wrap (no `truncate`), font dropped to `text-[13px]`, brand `max-w-xs` removed.
- `src/components/StatusBadge.tsx` — `rounded-[3px]` → `rounded-[2px]`.
- `src/index.css` — `body { line-height: 1.65 }` → `1.6`.

### What stays the same

All routes, every page's content, the `Button`/`Section`/`Card`/`AnchorHeader`/`RecordHeader` primitives and the header/footer copy. No new components, no new fonts, no new dependencies.

