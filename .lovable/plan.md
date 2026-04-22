

## "Other" → "Unverified Facilities" rebrand + red alert badge

Reframe the third Greenlist category as a serious "Unverified Facilities" status with an institutional red soft-badge, completing the Green → Amber → Red traffic-light system.

---

### 1 · New token — institutional red

`src/index.css` — add to `:root`:

```css
--src-unverified: 0 55% 38%;        /* deep crimson text */
--src-unverified-soft: 0 60% 95%;   /* light alert-red bg */
```

And to `.dark`:

```css
--src-unverified: 0 65% 65%;
--src-unverified-soft: 0 35% 16%;
```

Keep the existing `--src-other` tokens in place for safety (orphaned, not referenced after this change). Token-driven so dark mode auto-resolves.

### 2 · Greenlist — rename + recolor

`src/pages/Greenlist.tsx`:

**Source-type definition (line 41-45)** — rewrite the `Other` entry copy:
```ts
Other: {
  title: "Unverified Facilities",
  body:
    "Entities that have not yet undergone the Source Standard audit process or have failed to provide necessary transparency regarding their supply chain and clinical protocols.",
},
```

**Category style + pill maps (lines 48-67)** — point `Other` at the new red tokens:
```ts
Other: { dot: "bg-[hsl(var(--src-unverified))]" }
// and
Other: {
  wrap: "bg-[hsl(var(--src-unverified-soft))] text-[hsl(var(--src-unverified))] ring-1 ring-[hsl(var(--src-unverified))]/25",
  dot:  "bg-[hsl(var(--src-unverified))]",
},
```

**Stat strip label (line 267)** — the card currently shows the raw key (`"Other"`) when not the total card. Map `Other → "Unverified"` for the eyebrow and keep the full title in the hover-card body. Implementation: replace `s.key === "total" ? s.label : s.key` with a small label resolver: `total → "Total Recognized"`, `503B / 503A → as-is`, `Other → "Unverified"`.

**Pill label (line 76)** — currently renders the raw category (`"Other"`). Map to `"Unverified"` display string while keeping the underlying `GreenlistCategory` value `"Other"` (no data migration). Tracking/uppercase styling unchanged so it sits at identical visual weight to the 503B/503A pills.

**Type filter `<option>` (lines 311-315)** — show "Unverified" as the visible label for the `Other` option; value stays `"Other"`.

**Card sub-label (line 275)** — the strip currently does `s.label.replace(/^503[AB] /, "").replace(/^Other /, "")`. With the new title `"Unverified Facilities"`, replace this with a tiny per-key descriptor map so the third card reads "Audit pending / non-transparent" beneath the `00` count, matching the secondary lines under 503B / 503A.

### 3 · Underlying data type — unchanged

`GreenlistCategory = "503B" | "503A" | "Other"` stays. `data/greenlist.ts` is untouched. "Other" becomes a purely internal key; every user-facing surface renders "Unverified" / "Unverified Facilities."

### 4 · Verified Vendors — no change

`VerifiedVendors.tsx` uses `StatusBadge` (verified / under-review / suspended), not the Greenlist category system. Its red is already reserved for `suspended`. No edits needed — the rebrand is scoped to the Upstream Facility Registry where the traffic-light system lives.

### 5 · Layout / density — preserved

No changes to: container chrome (`rounded-[12px]`, soft layered shadow), hairline dividers, sticky filter bar, row hover (`hover:bg-primary/[0.04]`), typography, "View →" treatment, methodology accordion, pagination.

---

### Files touched

- `src/index.css` — add `--src-unverified` + `--src-unverified-soft` tokens (light + dark).
- `src/pages/Greenlist.tsx` — rename `Other` copy, repoint `CATEGORY_STYLE` + `CATEGORY_PILL` `Other` to unverified tokens, remap display labels in stat card eyebrow / pill / filter dropdown / card sub-label.

### What stays the same

All routes, all data, the `GreenlistCategory` type and underlying `"Other"` key, every other page, `StatusBadge`, `SourceCheck`, the 503B (green) / 503A (amber) styling, dark-mode behavior, filtering / sorting / pagination logic. Presentational + copy only.

