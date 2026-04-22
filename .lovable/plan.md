

## Add separation between hero and registry-summary on database pages

The `RegistryHeader` (navy hero) and `RegistrySummaryStrip` currently sit flush against each other because the strip opens with `pb-10 md:pb-12` only — no top padding — so its top border hugs the hero's bottom border with zero breathing room. Result: the stats row reads as the tail of the hero instead of a new section.

### Fix

**`src/components/registry/RegistrySummaryStrip.tsx`**
- Change the wrapper padding from `pb-10 md:pb-12` to `pt-10 md:pt-14 pb-10 md:pb-12` so the stats block opens with real vertical space above it.
- Remove the `border-t border-border/60` from the inner grid (the top hairline that visually fuses it to the hero). The cell dividers (`md:divide-x`) stay; the strip will read as its own layer with air above and structure within.

That's it. One file, two token changes. Applies automatically to both Verified Vendors and Greenlist since both compose the same `RegistrySummaryStrip` directly under `RegistryHeader`.

### Out of scope

- No changes to `RegistryHeader`, `QueryBar`, table, or pagination.
- No new components or tokens.
- Summary block stays exactly where it is in page flow.

