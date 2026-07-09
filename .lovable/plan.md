
## Overall design objective

The homepage should feel like a polished product experience rather than a technical document. Users should move naturally from understanding the problem, to understanding the solution, to taking action, with each section using the most appropriate presentation instead of repeating the same layout pattern.

## Goal

Break the repetitive "heading → paragraph → white card stack → CTA" pattern on the homepage so each section has its own visual identity. The homepage should feel easier to scan, more engaging, and more consumer-focused while preserving Source Standard's institutional credibility.

The homepage should feel like a guided experience, not a long document. Visitors should naturally move from one section to the next without feeling like they're reading the same layout repeatedly.

Only the homepage changes. Existing shared primitives (`PageSection`, `DataStrip`, `Glyph`) remain available for future page migrations.

## Guiding principles

- If a design element does not improve comprehension, remove it.
- Cards are for destinations, interactions, and high-value information — not simple supporting copy.
- Optimize information density on a section-by-section basis. Some sections (Registry Fields) should become dramatically shorter; others (Mission) should retain breathing room.
- Every section should feel intentionally different from the one before it.
- **Simplify aggressively.** If an element does not meaningfully improve understanding or navigation, remove it rather than redesigning it. Reducing visual noise is often a better solution than introducing another component.

## Durable design doctrine: presentation matches purpose

Different types of information deserve different visual treatments. Processes should look like processes. Navigation should look like navigation. Educational content should look like educational content. Trust and governance should look institutional. The visual language should reinforce what the user is looking at, not simply present everything as a bordered card.

This principle governs this pass — and it becomes the standard for future page migrations (Vendor Profiles, Facility Records, Learn, FAQ, Governance, Partners, and every page added after them).

## Consumer-first test

For every section, ask:

- Can a first-time visitor understand the purpose of this section within 5 seconds?
- Is the primary action obvious?
- Is there anything that can be removed without reducing comprehension?
- Does this section earn the space it occupies?

If the answer to any of these is "no," continue iterating.

## Design system principle

This homepage establishes the visual language for future consumer-facing pages.

When creating new presentation patterns, prefer solutions that are reusable across Vendor Profiles, Facility Records, Learn, FAQ, Governance, Partners, and future product surfaces. Avoid creating homepage-only components unless they solve a truly unique problem.

---

## 1. New lightweight primitives (`src/components/system/`)

These are provided as strong candidates for the section outcomes below. Use them where they fit; substitute or extend when a better solution emerges.

### `FeatureItem.tsx`
Lightweight information item — no border, no background.
- Icon + title + one-sentence description.
- `variant="row"` (icon left, text right) and `variant="block"` (icon top).
- Suited to informational content that doesn't need card chrome.

### `NavCard.tsx`
Compact navigation destination.
- Title, one-line description, right `ArrowRight`.
- Compact padding, hairline border, 12px radius.
- Hover: background shifts, chevron slides right slightly, border darkens. Active: subtle scale.
- Reserved for actual navigation.

### `ProcessSteps.tsx`
Vertical process — no cards, no numbered badges.
- Each step: small `check` glyph in the gutter, thin hairline connecting consecutive steps, title, one-sentence description.
- Simple, lightweight, process-oriented.

All three exported from `src/components/system/index.ts`.

---

## 2. `PageSection` — add `compact` variant

Add `compact?: boolean`. Compact mode reduces vertical padding and tightens heading→body spacing. Existing behavior unchanged (non-breaking).

---

## 3. Homepage redesign (`src/pages/Index.tsx`)

Hero, `DocJumpBar`, and existing content copy remain unchanged. Only presentation changes.

**Mission — "Why Does This Exist?"**
Text-forward editorial presentation. `shield-check` glyph. Two existing paragraphs separated by a thin divider. No cards. Retains generous breathing room.

**Claims Are Not Verification**
Keep largely as-is. `minus` glyph, existing paragraph, existing CTA. Tighten paragraph→CTA spacing.

**How Does Source Standard Verify?**
This section should visually communicate that verification is a sequential process rather than a collection of unrelated concepts. Avoid stacked bordered cards. A timeline, vertical process, connected steps, or another lightweight process visualization is acceptable if it improves comprehension. Preserve the existing three steps (Map the market · Verify sourcing claims · Maintain the public record). Trailing CTA: "Search the Registry".

**What Does the Registry Cover?**
Keep introductory text. The Vendor Registry and Facility Records destinations should feel like clickable navigation, not stacked buttons or informational cards. Each destination gets a one-line supporting description. Layout adapts: stacked on mobile, two-column on desktop.

**What Will I See in a Listing?**
This information should read as a fast visual checklist rather than four independent feature cards. The implementation may use checklist rows, feature items, icon lists, or another lightweight presentation. Items: Verification Status · Vendor Type · Therapy Categories · Facility Relationships. Single column mobile, two columns on larger screens. No borders. Trailing CTA: "Open the Registry".

**Who Is This For?**
Three audiences (Consumers · Providers · Industry) should read as lightweight feature blocks rather than bordered cards. Desktop: three-column grid. Mobile: single column separated by subtle hairline dividers.

**Where Can I Learn More?**
This section should clearly present destinations that feel interactive and navigational. The implementation should use a navigation-oriented presentation rather than informational cards. Preserve existing destinations. Trailing CTA: "Browse Learn".

**Who Stands Behind This?**
Do NOT repeat another navigation-card section. This section should read as institutional trust attestation. Three trust pillars — Independent Governance · Advisory Board · Public Standards — each with icon, title, and one-sentence description. No chevrons. No per-item links. Single trailing CTA: "Explore Governance".

## Visual rhythm

Intentional alternation:

```text
Mission        → editorial
Problem        → text + CTA
Verification   → process
Registry       → navigation
Listing Fields → checklist
Audience       → feature blocks
Learn          → navigation
Governance     → trust
```

No two adjacent sections should feel visually identical.

---

## 4. Verification

- `bunx tsgo --noEmit` clean.
- Playwright at 390×779 (mobile) and 1280×1800 (desktop): full-page scroll of `/`, screenshot each section.
- Spot-check `/how-it-works`, `/learn`, `/partners`, `/verified-vendors`, `/greenlist` — pixel-identical to today.

## Success criteria

After this pass, the homepage should:
- feel more dynamic without becoming visually busy,
- encourage continuous scrolling through variation rather than repetition,
- preserve the institutional tone of Source Standard,
- improve comprehension before adding decoration.

---

## 5. Explicitly NOT in scope

Other pages, colors, typography, routes, verification logic, hero, `SiteHeader`, `SiteFooter`, `DocJumpBar`, global spacing tokens, existing content copy (except small supporting descriptions required for new navigation and pillar layouts).

---

## Design heuristics

When choosing between multiple acceptable implementations, prefer the one that follows these principles:

- **Presentation matches purpose.** The layout should immediately communicate what kind of information the visitor is looking at.
- **Scanning beats reading.** Visitors should understand the purpose of a section before reading every sentence.
- **Hierarchy over decoration.** Improve comprehension through spacing, typography, grouping, and layout before adding visual elements.
- **Interaction should be obvious.** Navigation should look clickable. Informational content should not.
- **Trust should feel institutional.** Governance, standards, and verification should communicate stability and credibility rather than marketing.
- **Reduce repetition.** If two adjacent sections share the same layout, ask whether they should.
- **Progressive disclosure.** Surface the essential information first, then provide paths to learn more instead of showing everything at once.
- **Consistency without monotony.** The homepage should feel cohesive because it shares a design language, not because every section uses the same structure.

---

## Visual audit checklist

Before considering the homepage complete, verify the following visually:

- No two adjacent sections feel visually identical.
- Every section communicates its purpose before the visitor reads body copy.
- Interactive elements are immediately distinguishable from informational content.
- Information density feels intentional rather than sparse.
- Decorative elements never compete with hierarchy.
- The homepage feels like a guided journey from trust → understanding → action.
- Mobile receives equal design attention as desktop.
- The page feels like a modern product website rather than a documentation portal.

---

## Design challenge

Do not treat this document as a checklist. Treat it as the design objective.

If you identify a presentation that better satisfies these goals while remaining consistent with the Source Standard design language, prefer the stronger solution.

The success metric is not matching this document line-for-line. The success metric is whether the homepage becomes easier to understand, easier to navigate, and more compelling for a first-time visitor.

---

## Technical notes

- **New:** `src/components/system/FeatureItem.tsx`, `NavCard.tsx`, `ProcessSteps.tsx` (candidates for the outcomes above; extend or substitute if a better fit emerges).
- **Modified:** `src/components/system/index.ts` (exports), `PageSection.tsx` (add `compact`), `src/pages/Index.tsx` (rewrite sections).
- **Not modified:** `src/index.css`, `DataStrip.tsx`, `GlyphIcon.tsx`, hero, other pages.
- `ArrowRight` already in `lucide-react`; no new dependencies.
