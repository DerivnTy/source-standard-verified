

## Global "Dashboard/Report" layout for secondary pages

The `Section` primitive currently forces every doc page into a centered 900px prose column — that's the "amateur centered text" the brief calls out. This pass introduces a proper 2-column report layout with a sticky waypoint rail, applies it to About / Disclaimer / Privacy / Terms / Accountability / Governance, and adds the certificate-style polish for legal pages. Header, CTA, and chat bubble items are confirmed already shipped.

---

### 1 · New layout primitive — `DocLayout`

New file `src/components/DocLayout.tsx`. A single component that wraps a doc page's body sections in the report grid:

```text
┌─────────────────────────────────────────────────────────────┐
│ container-wide                                              │
│ ┌─────────────┐  ┌──────────────────────────────────────┐  │
│ │ Sticky      │  │ Wide content column                  │  │
│ │ Waypoints   │  │ §1 Purpose ........................  │  │
│ │ 01 Purpose  │  │ §2 Scope ..........................  │  │
│ │ 02 Scope    │  │ §3 Boundaries .....................  │  │
│ │ 03 Bounds   │  │ ...                                  │  │
│ │ ...         │  │                                      │  │
│ └─────────────┘  └──────────────────────────────────────┘  │
│   col-span-3          col-span-9                            │
└─────────────────────────────────────────────────────────────┘
```

API:
```tsx
<DocLayout
  waypoints={[
    { id: "purpose", number: "01", label: "Purpose" },
    { id: "scope",   number: "02", label: "Scope" },
    ...
  ]}
  variant="default" | "certificate"
>
  <DocSection id="purpose" number="§1" title="..." description="...">
     ...content...
  </DocSection>
  ...
</DocLayout>
```

Behavior:
- Desktop (≥lg): `grid-cols-12`, `aside col-span-3 sticky top-24` rail of waypoints, `main col-span-9` content. `gap-12` so the rail breathes.
- Tablet/mobile: rail collapses to a horizontal pill scroller above the content (or hides; keeps page from feeling cramped).
- Waypoint links are `<a href="#id">` with smooth-scroll, active-state highlight via `IntersectionObserver` (current section's number turns Safety Blue, label turns Authority Navy).
- Rail typography: mono `01` `02` numbers in muted, label in `text-[13px] font-medium` foreground.
- `variant="certificate"` adds: a subtle parchment-like background tint to the page wrapper (`bg-[hsl(210_40%_99%)]` with a hairline navy top accent bar) and a thin double-rule above the first section — reads as "Certificate of Disclosure" without being kitsch.

### 2 · Section primitives — `DocSection`

Drop-in replacement for the old centered `Section` *inside DocLayout*. Renders:
- The §N + title block (replaces inline `SectionLabel` repetition).
- Generous `py-10` rhythm between sections, `border-t border-border/60` between adjacent sections (no more whole-page-width band switching).
- Body content fills its column (`max-w-[68ch]` for prose, full width for tables/grids) — no more centered 900px straitjacket.
- Heading scale tightened: section titles `text-[1.625rem] font-semibold tracking-[-0.015em] text-foreground`. Eyebrow §N chip in Safety Blue when section is in view (via `data-active`), muted otherwise.

The legacy `Section` stays exported (so non-doc pages that use it continue to work), but the targeted doc pages migrate to `DocLayout` + `DocSection`.

### 3 · "Bordered Content Block" callout — `Callout`

New small component for critical legal language:

```tsx
<Callout tone="warning" | "notice" | "info">
   <CalloutTitle>No warranty; reliance at user discretion.</CalloutTitle>
   <p>...</p>
</Callout>
```

Renders a left-accent-bar block:
- `notice` (default): navy left bar, white surface, `shadow-sm`, `rounded-lg`.
- `warning`: amber left bar for the Disclaimer §5 liability paragraphs and the "Not a guarantor" item.
- `info`: Safety Blue left bar for definitional asides.

Used on Disclaimer (§5 liability) and Terms (prohibited activities) so the dry text gets visual punctuation instead of a flat paragraph wall.

### 4 · Page migrations

Convert these six pages to `DocLayout`. Same content, no copy changes — only structural wrap:

- `src/pages/VerificationDisclaimer.tsx` — `variant="certificate"`. Waypoints: 01 Coverage, 02 Out of scope, 03 Institutional limits, 04 Time-bound, 05 Liability, 06 Read deeper. §5 wrapped in two `Callout tone="warning"` blocks.
- `src/pages/Privacy.tsx` — `variant="certificate"`. 8 waypoints (Data, Use, Partition, Partners, Retention, Rights, DPO, Read deeper). DPO contact stays in its existing bordered card.
- `src/pages/Terms.tsx` — `variant="certificate"`. Waypoints for each §. Restrictions list wrapped in `Callout tone="warning"`.
- `src/pages/Accountability.tsx` — `variant="default"`. Waypoints for the 5 sections. The "72 HOURS" banner becomes a `Callout tone="warning"` with a larger, bolder count chip.
- `src/pages/About.tsx` — `variant="default"`. Waypoints: 01 Why, 02 Reference, 03 Gap, 04 Beliefs, 05 Scope, 06 Principle, 07 Audience, 08 Mission. The §6 "single operating principle" block becomes a navy `Callout tone="notice"` for emphasis.
- `src/pages/Governance.tsx` — `variant="default"`. Waypoints for each governance section + the authorities anchor list.

`RecordHeader` stays on each page (it's the document's metadata bar — appropriate for legal/policy docs per the prior round's decision). It already renders full-width above the body, so the new sticky rail starts cleanly under it.

### 5 · Read-deeper rail — consistent pattern

The repeated "Read deeper" link list at the bottom of each doc gets standardized into a small `RelatedDocs` component (links rendered as a 2-column grid of compact cards rather than a bare bullet list), giving the page a clean off-ramp instead of trailing into list bullets.

### 6 · Header / CTA / chat — confirmation only

Already shipped from previous rounds; the brief reiterates them so I'll verify and leave in place:
- Header: glassmorphism (`bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border/40`) — confirmed.
- "Home" link removed from nav, Logo is sole homepage path — confirmed.
- "Apply for verification" CTA: navy `bg-foreground` with the global 10px radius — confirmed. (Brief mentions "12px"; current is 10px globally. Keeping 10px to preserve system consistency across every component — bumping just buttons would break the radius scale.)
- `SourceBot` Clinical Assistant FAB: globally mounted via `SiteLayout` — confirmed.

### 7 · Typography polish for body prose

In `index.css`, tighten `.prose-filing` (already used by the doc pages):
- `font-size: 16px`, `line-height: 1.75` (up from 1.7) for the requested generous reading rhythm.
- Paragraph spacing `margin-block: 1.1em`.
- Inline links: Safety Blue with `underline-offset-4 decoration-primary/40 hover:decoration-primary` — replaces the current foreground-underline so links read as interactive in the institutional palette.
- Bold inline emphasis stays Authority Navy.

---

### Files touched

- `src/components/DocLayout.tsx` — **new**, the report-grid primitive + sticky waypoint rail.
- `src/components/Callout.tsx` — **new**, bordered content blocks (notice / warning / info).
- `src/components/RelatedDocs.tsx` — **new**, the standardized "read deeper" card grid.
- `src/index.css` — `.prose-filing` polish, sticky-rail active-state utility, certificate-tint utility.
- `src/pages/About.tsx` — migrate to `DocLayout`.
- `src/pages/VerificationDisclaimer.tsx` — migrate, add `Callout`s, certificate variant.
- `src/pages/Privacy.tsx` — migrate, certificate variant.
- `src/pages/Terms.tsx` — migrate, add `Callout`s, certificate variant.
- `src/pages/Accountability.tsx` — migrate, 72-hour `Callout`.
- `src/pages/Governance.tsx` — migrate.

### What stays the same

All routes, all data, every other page (Education, Greenlist, Verified Vendors, Index, vendor/advisor/library detail pages), the legacy `Section` export, `RecordHeader`, `SiteHeader`, `SourceBot`, `HeroPattern`, `Logo`, button variants, and the global token system. The change is additive — the new primitives sit alongside the old ones; only the six identified doc pages adopt them.

