

## Home page rebuild — exact copy lock-in

This pass replaces the homepage with the user's exact provided copy and structure, and updates the global header strip + nav to match. No design system changes; only content, ordering, nav labels, and the metadata bar values.

---

### 1. Global header (`SiteHeader.tsx`)

Top utility strip — replace current text:
- Left: `Public reference • Document version 2026.01`
- Right: `Maintained in the United States`

Primary nav — re-add `Home` and reorder to user's exact sequence:
`Home` · `Verified Vendors` · `Greenlist` · `Education` · `Medical Advisory` · `How It Works` · `About`

(Capitalization preserved exactly as the user wrote it. `Home` links to `/`.)

CTA button label: `Apply for Verification` (capitalized as specified).

### 2. Homepage metadata bar (`Index.tsx`)

Replace current metadata bar values with exactly:
- Doc: `SS-FRAMEWORK-2026.01`
- Status: `Active`
- Updated: `April 20, 2026`
- Jurisdiction: `United States`

Remove Version, Reviewed-under, and other extra fields from this bar (the user's spec lists only those four).

### 3. Homepage sections — full replacement

Rebuild `src/pages/Index.tsx` to follow the user's exact section list and copy, in this order. All section bodies use the exact text supplied by the user.

```text
Hero
  Eyebrow:      Public verification reference
  Headline:     The public reference for verifying vendors in
                peptide, TRT, and hormone optimization.
  Support:      [exact supporting paragraph]
  Buttons:      [Look up a vendor]  [How verification works]
  Support line: Maintained in the United States • Anchored to
                public FDA, PCAB, NSF, and USP records
  Right panel — "Framework snapshot":
    Greenlist categories: 03
    Verified vendors: 00
    Pending review: 00
    Jurisdiction: United States
    Launch: Q1 2026
    Sources: FDA • PCAB • NSF • USP
  (No "documentation-first" anywhere in this panel.)

§ What Source Standard is              [exact body]
§ Medical advisory oversight           [exact body]  → View medical advisory
§ Verified Vendors Registry            [exact body + empty-state] → Browse verified vendors
§ Greenlist of recognized sources      [exact body]  → View Greenlist
§ Education and public guidance        [exact body]  → Explore education
§ How the standard works               [exact body]  → View how it works
§ Why vendors want to be associated
   with Source Standard                [exact body]  → Learn more for vendors
§ A public place to verify, learn,
   and understand                      [exact body]
   Buttons: [Look up a vendor]  [Explore education]
```

All previous homepage sections (lookups card pair, "two registries" panel, standards-anchoring grid, education preview list, procedural 4-up grid, vendor strip) are removed and replaced by the eight sections above.

### 4. Style + behavior preserved

- Keep the existing typography system, color tokens, container widths, border treatments, and `Button` component.
- Keep the institutional chrome (metadata bar at top of page, sentence-case nav, restrained borders).
- Each section uses a clean two-column or single-column layout consistent with the current visual language; no new component primitives required.
- Remove all references to "Tampa" from the homepage and header strip (replaced with "United States").
- Remove the phrase "documentation-first" anywhere it currently appears on the homepage.

### 5. Files touched

- `src/components/SiteHeader.tsx` — utility strip text, nav items + order, CTA label casing.
- `src/pages/Index.tsx` — full content + structure replacement per user spec; metadata bar fields trimmed.

### 6. Out of scope for this pass

- Medical Advisory page rebuild (user indicated that is the next pass).
- Footer changes.
- Any visual/typography/token changes.
- Other inner pages.

