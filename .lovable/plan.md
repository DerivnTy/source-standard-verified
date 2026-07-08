## How Verification Works — Consumer Rewrite (approved)

Rewrite `src/pages/HowItWorks.tsx` end-to-end as a five-section consumer guide. Preserve routing (`/how-it-works`), color palette, typography, `BriefingHero`, `Breadcrumb`, `PageMeta`, and site chrome.

### Removed
- Internal waypoints and `SectionAnchorNav`.
- Numbered `Clause` cards (`AUDIT_CLAUSES`, `SURVEILLANCE_CLAUSES`, etc.).
- Long procedural methodology paragraphs.

### New page structure

1. **BriefingHero** (kept)
   - Eyebrow: "Public Guide"
   - Title: "How Verification Works"
   - Deck: one plain-language sentence.

2. **What is Verification?** — short 2–3 sentence lead. Consumer-focused, no internal methodology.

3. **How Verification Works** — 4-step visual flow
   - Horizontal on desktop, vertical on mobile. Hairline connector, no cards.
   - Steps:
     1. Provider enters the registry
     2. **Source Standard reviews available information for providers undergoing verification** — worded so it does not imply every registry entry has been reviewed.
     3. A public verification status is assigned
     4. Records are periodically reviewed and updated

4. **What Verification Means** — compact checklist, Lucide `Check` (14px, foreground):
   - Public sourcing transparency
   - Independent review within the Source Standard framework
   - Public verification status
   - Ongoing record maintenance

5. **What Verification Does Not Mean** — same layout, neutral glyph (Lucide `Minus`, muted):
   - Medical advice
   - FDA approval
   - Product approval
   - Safety guarantee
   - Treatment recommendation
   - Future outcome guarantee

6. **Why It Matters** — 2–3 sentence close about helping consumers make more informed decisions about compounded peptide providers through public verification and transparency.

7. **Disclaimer footer** — keep existing legal / positioning paragraph verbatim.

### Visual treatment
- `container-narrow` layout, existing `Eyebrow` / small-caps pattern.
- Section spacing tightened to `mt-10`/`mt-12`.
- 0.5px `hsl(var(--border))` hairlines between §2–§6.
- Lucide `Check`, `Minus` at 14px, `strokeWidth={1.75}`. No badges, no gradients, no new tokens.

### Files
- Edit `src/pages/HowItWorks.tsx` only. Remove unused imports.

### Preserved
- Route `/how-it-works`, `BriefingHero`, `Breadcrumb`, `PageMeta`, palette, typography, legal disclaimer copy.

### Out of scope
- `FaqVerificationProcess`, `VendorProfile` verification toggle, `FAQ` links, new routes/images.
