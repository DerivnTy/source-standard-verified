Add an explainer `<aside>` panel below the facility profile card in `src/pages/GreenlistProfile.tsx`.

**Placement**: 32px below the existing profile card, inside the same 600px-wide wrapper, above the existing `paddingBottom: 48px`.

**Styling**: `bg-card`, `0.5px solid hsl(var(--border))`, `10px` border-radius, `24px` padding — matching the profile card.

**Block 1 — UPSTREAM RECORD**
- Eyebrow: `UPSTREAM RECORD` (10px, uppercase, 0.08em tracking, muted-foreground, semibold)
- Body: "This facility record is maintained as a public-reference entry used during vendor sourcing review." (13px, foreground)
- Supporting: "Inclusion in the Upstream Registry does not verify that any vendor is actively sourcing from this facility, and it does not constitute product approval, facility recommendation, or a guarantee of safety, sterility, potency, efficacy, or outcome." (12px, muted-foreground)

**Hairline divider** (0.5px border-top, 20px vertical margin)

**Block 2 — VENDOR-LEVEL VERIFICATION**
- Eyebrow: `VENDOR-LEVEL VERIFICATION`
- Body: "Vendor verification is reviewed separately and requires documentation supporting the vendor's stated pharmacy relationships, sourcing claims, and chain-of-custody records."
- CTA: `Open Vendor Registry →` as a `<Link to="/directory">` styled with underline-offset and 12px semibold uppercase tracking, top-margin 12px.

**Preservation**: No changes to facility data, card fields, back link, header, footer, routes, or database.