## Objective

Restructure `/learn` into a single clear reading order: hero → **Start Here** (primary learning path) → **Browse by Resource** (secondary) → **Recent Updates** → **Still Have Questions?** → **Continue Exploring**. No new components, no visual/branding changes.

---

## Reorder

New top-to-bottom order on `src/pages/Learn.tsx`:

1. **Hero** — unchanged.
2. **Start Here** — the current "Start with the basics" section, moved directly under the hero and promoted to the page's primary section.
3. **Browse by Resource** — the current three `NavCard` block (Education / News & Insights / FAQ), moved below Start Here and given the section heading "Browse by Resource".
4. **Recent Updates** — unchanged, stays where it is.
5. **Still Have Questions?** — the current footer sentence, promoted to a proper `PageSection` titled "Still Have Questions?".
6. **Continue Exploring** — the existing `NextStep` closer, with eyebrow renamed from "Ready to check a provider?" to "Continue Exploring".

---

## Start Here — content and interaction

- Section title: **Start Here**.
- Reorder rows (data change in `src/data/learn.ts` `EDUCATION_TOPICS`) to:
  1. Learn the Basics — *Start here. Plain-language answers to the questions people ask first.*
  2. Verification — *What Source Standard reviews, what verification statuses mean, and how a review works.*
  3. Choosing a Provider — *What to look for, what to ask, and how to interpret a provider listing.*
  4. Sourcing & Manufacturing — *Where compounded medications come from, who makes them, and why sourcing matters.*
- Update the copy on these rows to match the exact strings above.
- Make each row read as navigation:
  - Replace the current text-glyph `›` with the site-standard `ChevronRight` icon from `lucide-react` (same 12–14px, `strokeWidth: 1.75` used in `NextStep`).
  - Show the chevron at all breakpoints (currently hidden on mobile).
  - Entire row remains a single `<Link>`; keep the existing hover `bg-muted/40` and add `active:bg-muted/60` for a press state. Chevron continues to translate on hover.

---

## Browse by Resource

- Wrap the existing three `NavCard`s in a `PageSection` titled **Browse by Resource** so it reads as a secondary browse layer, not a primary directory.
- Copy on the cards unchanged.

---

## Still Have Questions?

- Replace the loose footer paragraph with a `PageSection` titled **Still Have Questions?** containing the same one-sentence FAQ + Contact prose.

---

## Continue Exploring

- Change the `NextStep` call to `eyebrow="Continue Exploring"`.
- No changes to the four options (Vendor Registry, Facility Records, How Verification Works, Contact) or to the `NextStep` component itself.

---

## Not doing

- No hero change.
- No changes to `/learn/education`, `/learn/news`, `/learn/faq`, or the `NextStep` component internals.
- No color, type, or component-library changes.
- No changes to other pages.

---

## Files touched

- `src/pages/Learn.tsx` — reorder + section wrappers + chevron icon + press state.
- `src/data/learn.ts` — reorder and rewrite the four `EDUCATION_TOPICS` entries.

## Verification

- `bunx tsgo --noEmit`.
- Read `/learn` top-to-bottom on mobile (390) and desktop (1280): confirm one primary learning path, one secondary browse layer, and a clear closing progression into the registry.
