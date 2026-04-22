

## Global accent replacement — Safety Blue → Hero Navy + Cream

Single, surgical token swap. No layouts, spacings, or page/card backgrounds change. Only the light-blue accent system (`--primary` family) and its `--accent-soft` companion are repointed to the homepage hero navy + cream.

---

### 1 · Token redefinition (`src/index.css`)

Repoint these tokens in `:root` (and mirror in `.dark` so the system is consistent):

```css
/* was Safety Blue 199 89% 48% — now Hero Navy */
--primary: 222 47% 11%;             /* matches --navy-surface exactly */
--primary-foreground: 40 30% 96%;   /* warm cream, not pure white */
--primary-hover: 222 40% 16%;       /* matches --navy-surface-2 */
--accent-soft: 222 35% 94%;         /* very faint navy tint (replaces blue tint) */
--ring: 222 47% 11%;                /* focus rings now navy, not blue */

/* New explicit token for cream on navy (used by buttons, badges, chips) */
--cream: 40 30% 96%;
```

Dark mode: `--primary` stays navy (`222 47% 11%`), `--primary-foreground` stays cream, `--primary-hover` lightens to `222 40% 22%`, `--ring` matches, `--accent-soft` becomes `222 30% 18%`.

This single change automatically fixes everything that already uses the token: every shadcn `Button` default variant, every `bg-primary` / `text-primary` / `border-primary` / `ring-primary` consumer, the `link-accent` utility, the `prose-filing a` style, `Callout` info variant, `EmptyState` link, `GlossaryTerm` link, `Apply` submit button, `SiteHeader` mobile CTA, `ForVendors` / `Greenlist` / `Education` / `VerifiedVendors` / `VendorProfile` / `NotFound` text-primary links, etc.

### 2 · Verified / Pending status chips

`--verified` (green) and `--pending` (amber) are *not* the cheap blue, so they stay as semantic status colors. However, several "verified" badges currently render with a soft green tint that read as the closest neighbor to the blue accent system. Decision: **leave verified/pending colors untouched** — they are status semantics (green = verified, amber = pending, red = unverified). Repainting them navy would erase status meaning. Only the interactive/primary-blue family is replaced.

### 3 · Hard-coded blue sweep

After the token swap, do a final pass for any remaining literal sky/blue Tailwind utilities or hex codes that bypass the token system:

- Search: `bg-sky-`, `text-sky-`, `border-sky-`, `bg-blue-`, `text-blue-`, `border-blue-`, `199 89%`, `#0EA5E9`, `#38BDF8` across `src/**`.
- Replace any hits with the corresponding `primary` / `cream` token classes (`bg-primary`, `text-[hsl(var(--cream))]`, etc.).

Expected hits are minimal — most blue in the codebase already routes through `--primary`.

### 4 · Cream text inside dark elements

Add a small utility for direct use where a component opts into the dark-navy plate look outside of the `Button` primitive:

```css
.on-navy { color: hsl(var(--cream)); }
```

Used by: any inline badge or chip authored with `bg-primary` to guarantee the label is the warm cream rather than pure white. Existing `text-primary-foreground` consumers automatically get cream because we redefined the token.

### 5 · Accessibility

Navy `222 47% 11%` on cream `40 30% 96%` = contrast ratio ~16:1 (well above WCAG AAA). Hover state `222 40% 16%` on cream stays ~13:1. Focus ring uses navy on light surfaces (existing offset preserves visibility).

### 6 · What is explicitly NOT changed

- `--background`, `--surface`, `--surface-muted`, `--surface-sunken`, `--card`, `--popover`, `--muted`, `--border` — all neutral surfaces stay exactly as today.
- `--navy-surface` / `--navy-surface-2` (hero) — unchanged.
- Status tokens `--verified`, `--pending`, `--destructive`, and all `--src-*` greenlist source-type accents — unchanged (they encode meaning, not theme).
- Sidebar tokens — unchanged.
- All page backgrounds, card backgrounds, section spacing, and layout — untouched.

---

### Files touched

- `src/index.css` — redefine `--primary`, `--primary-foreground`, `--primary-hover`, `--accent-soft`, `--ring` in both `:root` and `.dark`; add `--cream` token and `.on-navy` utility.
- `src/**/*.tsx` — only files that contain literal `sky-*`, `blue-*`, or hex blue references (sweep results determine exact list; expected ≤ 3 files, likely zero given current token discipline).

### What stays the same

Every layout, every spacing scale, every page/card/section background, the hero, the sidebar, all status semantics (green/amber/red), all data, all routes.

