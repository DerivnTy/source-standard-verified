

## Resource Library — Make Entries Read as Articles

Add a consistent, restrained "Read →" cue to every library entry on the Resource Library page so each row visibly signals it opens into a full article. No heavy CTAs, no card chrome — just a small, right-aligned editorial action that makes clickability obvious.

---

### The change

In `src/pages/Education.tsx`:

1. **`EntryRow` (lines 172–194)** — used by Foundational, Clinical, and Verification sections. Restructure the link interior to a 2-column layout: title + summary on the left, a quiet `Read →` action on the right that brightens to `text-foreground` on row hover.
   ```text
   Title of article                                    Read →
   One-line summary description here.
   Reviewed by Medical Advisory Board
   ```
   - Action: `text-[12.5px] text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap shrink-0 mt-0.5`
   - Layout: `flex items-start justify-between gap-6` wrapping the existing text block.

2. **Latest analysis strip (lines 382–398)** — same treatment. Add a right-aligned `Read →` to each `<li>` so the two-column analysis grid matches the rest.

3. **`FeatureCard` (lines 144–170)** — already has a `Read →` line at the bottom. Upgrade to `Read article →` and bump weight slightly (`text-[13px] font-medium text-foreground/80 group-hover:text-foreground`) so the featured trio reads as the strongest article cue on the page, with the row-level `Read →` as the quieter, consistent echo below.

4. **FAQ category row (lines 342–362)** and **Forthcoming formats (lines 418–432)** — left untouched. FAQ tiles are navigational category cards (not articles), and Forthcoming formats are explicitly non-article placeholders.

### What stays the same

- Section structure, ordering, surfaces, eyebrows, ledes.
- Hover states on the row itself (`hover:bg-surface-muted/60`) and title color shift.
- All routing, data sources, overrides.
- Typography scale of titles and summaries.

### Visual outcome

Every clickable article entry — featured, foundational, clinical, verification, and analysis — carries a visible, consistent reading cue. The page scans as a library of articles, not a wall of text rows, without introducing buttons or card weight.

### Files touched

- `src/pages/Education.tsx` — modify `EntryRow`, `FeatureCard`, and the Latest analysis `<li>` block. Three small, contained edits.

