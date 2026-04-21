

## Simplify "How Greenlist status works" Into Plain Explanatory Text

Strip the boxed status-card treatment from Group A on the Greenlist legend so the section reads as a short editorial intro to the registry, not as another card. Source types grid and scope note stay exactly as they are.

### Change — `src/pages/Greenlist.tsx` (lines ~172–220)

Replace the current Group A block (lines 178–188), which renders the `GreenlistedPill` inside a `rounded-lg border bg-background` card, with a plain prose intro:

- Promote "How Greenlist status works" from a `meta-label` eyebrow to a proper `section-heading` (matches editorial weight of other section intros on the site).
- Underneath, a single muted paragraph (no border, no background, no pill, no green dot) explaining that Greenlisted is the inclusion standard and that source type is what varies.
- Remove the `Status` eyebrow above Group A entirely — the heading does that job now.
- Keep the `Source types in this registry` eyebrow + 3-up grid below, untouched.
- Keep the `Scope note` paragraph below, untouched.
- The outer `bg-surface-muted/60 border-b border-border/60` section wrapper stays for visual rhythm with adjacent sections.

Final structure of the section:

```text
[heading]   How Greenlist status works
[paragraph] Every source listed in this registry is Greenlisted by definition.
            "Greenlisted" is the Source Standard inclusion status for recognized
            upstream sources. What varies across listings is the source type.

[eyebrow]   SOURCE TYPES IN THIS REGISTRY
[3-up grid] 503B  │  503A  │  Other Qualified Source

[scope note] Greenlisted is a Source Standard status… (unchanged)
```

### Cleanup

- The `GreenlistedPill` component is no longer rendered anywhere on the page after this change — remove its definition to keep the file lean.
- No data, routing, filter, table, or token changes.

### Files touched

- `src/pages/Greenlist.tsx`

### Result

The top of the Greenlist page reads as a calm explanatory intro followed by the structured source-type explainer, instead of two card-styled groups that competed visually. The green status pill no longer appears outside row-level status contexts elsewhere on the site, reinforcing that on this page, Greenlisted is implicit by inclusion.

