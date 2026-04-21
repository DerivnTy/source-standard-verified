

## Unify Greenlist Profile Typography

Make label/value formatting consistent across all Greenlist profile sections so every field reads the same way as the "Clinical focus" prose line.

### File touched
- `src/pages/GreenlistProfile.tsx`

### Changes

**1. Lightly bold the inline labels**
Update the label spans inside `TagRow` and `Prose` components so labels like `Dosage forms`, `Specializations`, `Standards`, `States served`, `Testing`, `Inspections`, `Environmental monitoring`, `Clinical focus`, `API sourcing`, `Review notes` render with `font-semibold` (light bold) instead of the current uppercase mono micro-caps.

- Labels switch from `text-[10.5px] uppercase tracking-[0.1em] font-mono text-muted-foreground` → `text-[14px] font-semibold text-foreground` (matches body prose size, lightly emphasized).
- Label still sits inline before the value, separated by a space.

**2. Unify the value typography**
Make the values that follow each label use the same font/size/color as the "Clinical focus" paragraph (which uses `Prose`: `text-[14px] text-foreground/85 leading-[1.55]`).

- `TagRow` chips (Dosage forms, Specializations, Standards, States served, Testing): drop the mono chip styling (`font-mono`, bordered pill, muted surface). Render values as a plain comma-separated inline list in `text-[14px] text-foreground/85`, sitting on the same line as the bold label and wrapping naturally.
- `Prose` values: already correct — only the label styling needs to change to match.
- `MetaLine` (the dot-separated mono row at the top of each section): convert from `font-mono text-[12.5px]` to the same `text-[14px] text-foreground/85` body style, keeping the `·` separators but dropping the mono treatment so it reads as one consistent voice with the rest of the section.

**3. Result — consistent formatting per field**
Every line in every section reads as:

> **Label** value text in the same body font, same size, same color as Clinical focus.

Example after change:
- **Standards** cGMP (503B), USP <797>, USP <800>
- **Dosage forms** Sterile injectables, ophthalmic
- **Specializations** Hormone therapy, peptide therapy
- **Clinical focus** Sterile compounded drugs from bulk substances for office use; early-stage 503B focused on provider-office sterile products.

### What stays the same
- Section headers (`01 · Regulatory & Quality` etc.), hairline rules, omit-empty rules, section ordering.
- Hero, At-a-glance sidebar, MetadataBar, footer disclosure note.
- Data in `src/data/greenlist.ts` — untouched.

### Result
Every field across every Greenlist profile uses one consistent typographic system: a lightly bold label followed by body-prose values in the same font as the Clinical focus line. No more mono chips next to prose paragraphs — the page reads as one cohesive brief.

