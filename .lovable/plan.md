

## Verification Standard — "Board Layout" Rebuild

Replace the dense 12-column ledger grid on `src/pages/HowItWorks.tsx` with the same clean vertical narrative layout used on the Medical Advisory Board page (`src/pages/MedicalAdvisory.tsx`), via the existing `BoardSection` component.

### What changes

**File:** `src/pages/HowItWorks.tsx` (only)

1. **Remove** the entire 12-column ledger block (the `border border-border/60` wrapper and all `grid grid-cols-12` section rows).
2. **Replace** it with a vertical stack of four `BoardSection` components — the exact chrome MAB uses (4-col left rail with mono `§N · CATEGORY` eyebrow + bold sans title + rationale; 8-col right rail with body copy).
3. **Alternate** `muted` prop on `BoardSection` (false / true / false / true) for the same subtle banding as MAB.
4. **Keep**: `PageMeta`, `Breadcrumb`, `BriefingHero` (navy, "The Verification Standard"), and `DocJumpBar` with the existing 4 waypoints (`AUDIT`, `SURVEILLANCE`, `DISCLOSURE`, `BOUNDARIES`).
5. **Drop** the per-bullet `label:` mono prefixes — replace with the four clinical-narrative paragraphs from the brief (one paragraph per section, no bullet lists, no double labeling).

### Section content (final copy)

- **§01 · Supply-Chain Substantiation** (id `primary-source`) — paragraph from brief.
- **§02 · Analytical Surveillance** (id `surveillance`) — paragraph from brief.
- **§03 · Continuous Oversight** (id `monitoring`) — paragraph from brief.
- **§04 · Operational Boundaries** (id `boundaries`) — paragraph from brief.

Section ids stay identical so `DocJumpBar` smooth-scroll keeps working without nav edits.

### Visual outcome

```text
┌─────────────────────────────────────────────────────────┐
│ §01 · AUDIT          │  Single clinical paragraph,      │
│ Supply-Chain         │  Geist Sans, generous leading,   │
│ Substantiation       │  no bullets, no mono labels.     │
│ (rationale line)     │                                  │
├─────────────────────────────────────────────────────────┤
│ §02 · SURVEILLANCE   │  ... (muted band)                │
└─────────────────────────────────────────────────────────┘
```

### Technical notes

- `BoardSection` already enforces: `border-b border-border`, `page-shell section-pad`, `w-standard` 12-col grid, `t-utility-xs` mono eyebrow, `t-section-title-sm` sans title, `t-body-md` body — identical to MAB.
- No changes to `BoardSection`, `DocJumpBar`, `BriefingHero`, or any shared component.
- No new files, no new dependencies.
- Removes ~80 lines of bespoke grid markup; replaces with ~40 lines of declarative `BoardSection` usage.

