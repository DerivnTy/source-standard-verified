

## Visual Refinement Pass — Decouple Brand Blue From Status Green

A token-led refinement that introduces a restrained slate-blue as the **interface accent** while preserving forest green strictly as **status meaning** (Verified, Greenlisted, Active). No gradients, no glow, no animations. The change happens almost entirely in `src/index.css` with small follow-on edits where green was hardcoded as a UI accent rather than as status.

### 1. Color system — split brand from status

Currently `--primary`, `--ring`, and `--verified` all share the same forest green. That's why the site reads as "green-coded" — every link, button, focus ring, and active state uses the same hue as the Verified badge. We separate them.

**`src/index.css` — `:root` token changes:**

- **New brand accent (slate-blue, restrained):**
  - `--primary: 215 38% 28%;` — deep slate-blue, near-navy. Flat, confident, not "tech blue." Replaces forest green for buttons, links, ring, focus.
  - `--primary-foreground: 0 0% 100%;`
  - `--primary-hover: 215 38% 22%;`
  - `--ring: 215 38% 28%;`

- **Soft blue surface tints (used very sparingly):**
  - `--accent-soft: 215 36% 96%;` — for subtle hover/active backgrounds on nav, list rows, anchor cards. Replaces the gray `--surface-muted` only in selected interactive contexts, never as a section background.

- **Green retained, but reframed as status-only:**
  - `--verified: 152 45% 22%;` (unchanged tone, slightly deeper for contrast against the new blue-leaning UI)
  - `--verified-foreground: 0 0% 100%;`
  - `--verified-soft: 152 30% 95%;`
  - Used only by `StatusBadge`, the Greenlist "Active" indicator, and verified-status surfaces. Never on buttons, links, nav, or focus rings.

- **Eyebrows decouple from primary:**
  - `.eyebrow` switches from `text-primary` (was green, would now be blue) to `text-foreground/70` — neutral, editorial. Prevents every section label from shouting in the new accent color. Blue is reserved for actionable elements.

- **Borders and surfaces (one more pass for editorial calm):**
  - `--border: 215 20% 93%;` — slightly cooler to harmonize with the new accent.
  - `--surface-muted: 210 22% 98.7%;` — barely-there cool tint, removes the warm gray cast.

- **Shadows:** unchanged. No new glow, no colored shadows.

Dark mode tokens get parallel adjustments (slate-blue at higher lightness for legibility) but stay out of scope for visual review until light mode is confirmed.

### 2. Typography refinement (editorial, not mechanical)

In `@layer components`:

- `.eyebrow` — `text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/65` (down from semibold/0.04em primary). Quieter, more editorial.
- `.eyebrow-muted` — same treatment, `text-muted-foreground/80`.
- `.section-heading` — keep size, drop weight from `600` → `550` via `font-semibold` retained but tracking tightened to `-0.014em` for a more designed feel at large sizes.
- Body line-height already at 1.65 — leave it.
- Add `.link-accent` utility: `text-primary hover:text-primary-hover underline-offset-4 decoration-primary/30 hover:decoration-primary` — used for inline links so they read as crafted, not default-blue.

### 3. Component touch-ups (where green was hardcoded as UI, not status)

- **`src/pages/Index.tsx`**
  - §4 Greenlist preview: the row indicator `text-primary` → `text-verified` (it represents "Active" status, not brand). Also change `●` glyph to a proper dot span matching `StatusBadge` for consistency.
  - §3, §5, §6 inline `Link` arrows currently `text-primary hover:text-primary-hover` — these correctly become slate-blue automatically via the token swap. No code change needed.
  - §1 hero CTA buttons inherit the new primary automatically.
  - §2 lookup card padding holds; the card header eyebrow becomes neutral via the `.eyebrow` change.

- **`src/components/SiteHeader.tsx`**
  - Active nav state: currently `text-foreground font-semibold underline`. Change to `text-primary font-semibold` with a 2px bottom inset bar (`border-b-2 border-primary -mb-[1px]`) on the active link — bespoke, not default-underlined. Hover stays neutral foreground.
  - Header CTA already uses `bg-primary` — flips to slate-blue automatically. Remove the hardcoded `bg-primary hover:bg-primary-hover` repeat (redundant with `Button` default variant) so it inherits cleanly.

- **`src/components/StatusBadge.tsx`** — no changes needed. It uses `text-verified` / `text-pending` / `text-destructive` which remain green / amber / red. The dot stays.

- **`src/components/RecordHeader.tsx`** — eyebrow becomes neutral via `.eyebrow` change. No structural edit.

### 4. Filter & input polish (custom feel, not default)

In `src/pages/VerifiedVendors.tsx` and `src/pages/Greenlist.tsx` (already share the refined `h-9 rounded-md border-border/70` shell from the last pass):

- Focus state currently `focus:ring-2 focus:ring-ring/30 focus:border-foreground`. Change to:
  - `focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60`
  — A wider, much softer slate-blue halo. No glow, no animation; a 15% alpha ring reads as "considered" not "tech."
- Sticky filter bar: `bg-background/95 backdrop-blur-sm` stays. Add `shadow-[0_1px_0_0_hsl(var(--border))]` instead of `border-b` so the bar's separation reads as a hairline shadow rather than a hard line.
- Pagination active page: was `bg-foreground text-background`. Change to `bg-primary text-primary-foreground` so the active state reads in the new accent — restrained, not flashy.

### 5. Section transitions (softer rhythm)

Across `Index.tsx` and `About.tsx`: the alternating `border-b border-border/50` between sections is correct, but a few `bg-surface-muted` blocks on `About.tsx` still use the old non-`/40` value, creating banding heavier than the new Index pattern. Normalize:

- `About.tsx` §2/§4/§6/§8 `bg-surface-muted` → `bg-surface-muted/60`.
- `About.tsx` `border-b border-border` → `border-b border-border/60`.
- §5 scope table on `About.tsx`: drop the inner hard `border border-border` frame, replace with `rounded-lg border border-border/60` (matches Index/Greenlist registry pattern).

### Out of scope

- No content, copy, route, data, or component-API changes.
- No dark mode review (tokens are adjusted in parallel; visual sign-off in a follow-up).
- No changes to secondary pages (Education, Governance, FAQ, etc.) — they inherit the token shift automatically and can be reviewed after light mode is approved.
- No new dependencies, animations, gradients, or shadows beyond the single hairline-shadow on the filter bar.

### Files touched

- `src/index.css` — token split, eyebrow/typography refinement, new `.link-accent` utility
- `src/pages/Index.tsx` — §4 active dot uses `text-verified` (status, not brand); minor cleanup
- `src/pages/About.tsx` — section divider/background normalization, scope-table softening
- `src/pages/VerifiedVendors.tsx` — filter focus ring, pagination active state
- `src/pages/Greenlist.tsx` — same parallel updates
- `src/components/SiteHeader.tsx` — bespoke active nav state, redundant button class cleanup

### Result

The interface shifts from green-coded to slate-blue-led, with green now reading exclusively as "verified / active / approved." Eyebrows and section labels quiet down to editorial neutral. Focus rings, active nav, and primary buttons share one restrained accent. No gradient, no glow, no template polish — just a cleaner separation of *brand* and *meaning* that makes the green status signals more legible and the overall system feel more designed.

