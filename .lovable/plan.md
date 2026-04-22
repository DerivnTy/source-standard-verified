

## Refine §8 — Compact, Symmetric Pathway Panel

Tighten the existing split-pathway section into a more compact, balanced, higher-contrast closing panel. No new structure — just spacing, sizing, and color discipline so both cells lock to the same vertical rhythm.

---

### Changes (single edit, `src/pages/Index.tsx` lines 325–379)

**1 · Shrink the band**
- Outer padding: `py-12 md:py-14` → `py-10 md:py-12`. Reduces dead vertical air.
- Eyebrow band bottom margin: `mb-8` → `mb-6`.

**2 · Larger, brighter "Choose your path"**
- `text-[10.5px] text-white/45` → `text-[12px] text-white/75`, tracking stays at `0.22em`.
- §8 marker matches new size: `text-[12px] text-white/40`.
- Border under band: `border-white/10` → `border-white/15` for slightly cleaner separation.

**3 · Stronger panel labels (01 / 02)**
- `text-[10.5px] text-white/50` → `text-[12px] text-white` on both cells. More presence, equal weight.

**4 · Symmetric internal rhythm (lock both cells to identical vertical positions)**
- Cell padding equalized: `p-8 md:p-10` → `p-9 md:p-11` on both — uniform.
- Body copy gets a fixed-height container so the CTA sits at the same y on both sides regardless of copy length. Apply `min-h-[3.6rem]` to the `<p>` body line on each cell. Both bodies are short single-line/two-line strings; reserving the same minimum height guarantees the two CTAs align to the same baseline.
- Stack rhythm becomes consistent and symmetric:
  - eyebrow → `mt-5` heading → `mt-3` body (fixed min-height) → `mt-6` CTA.

**5 · Higher-contrast body copy**
- `text-white/70` → `text-white/80` for both body paragraphs. Still restrained, no longer washed out.

**6 · CTA polish**
- Underline border: `border-white/40` → `border-white/55` for slightly clearer affordance. Hover stays `border-white`. Size unchanged.

**7 · Frame contrast**
- Outer panel border + dividers: `border-white/10` → `border-white/15`. Marginally stronger structural seams without adding visual weight.

---

### What stays the same

- Two-column framed panel structure, eyebrow + §8 header row, numbered labels, inline arrow-link CTAs, mobile stacking via `divide-y`. No content additions, no layout rebuild.

### Files touched

- **Modified:** `src/pages/Index.tsx` — single contained edit to the §8 block (lines 325–379).

### Outcome

A more compact navy band with a slightly larger, brighter eyebrow, stronger white panel labels, equalized cell padding, body copy with reserved height so both CTAs sit at the same vertical line, and a touch more contrast on body text and dividers. Reads as a polished, symmetric final pathway panel.

