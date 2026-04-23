

## Adopt the Institutional-Immersive Standard as Core Memory

This is a governance directive, not a feature. No UI changes are needed right now — but the standard must be persisted so every future design decision is bound by it automatically.

### What gets saved

A single Core memory entry at `mem://index.md` containing the four pillars:

1. **In-Place Interactions** — morph, expand, unfold. No modals, side drawers, or page jumps unless physically required. Filter folders and nav menus open in place.
2. **Glossy-Minimalist Visuals** — backdrop-filter blur, 1px hairline borders, subtle background value shifts. No drop shadows. No emojis. Sharp 1px line icons or typography only.
3. **Singular-Punchy Language** — one-word actions, no ellipses, no jargon, no filler.
4. **iOS-Native Physics** — if it wouldn't ship in an Apple system app, it doesn't ship here. Spring/ease-out transitions, 300–350ms, no snap.

Plus the established component conventions already in play:
- Pills/filters: 20px radius, 1px border, semi-bold sans-serif uppercase, Navy/White active states.
- Sticky filter/nav stacks: `backdrop-filter: blur(12px+)`.
- Mobile menu: full-screen immersive overlay, Navy 0.92 + blur 40px, serif links, 0.5px hairline dividers.
- Project framing: regulatory directory × high-end fintech (Stripe-grade), never marketing.

### Outcome

Every subsequent request — new pages, new components, new flows — is automatically evaluated against this standard before any code is written. No re-litigating these rules per feature.

### Files touched

- `mem://index.md` (Core memory) — created on approval.

