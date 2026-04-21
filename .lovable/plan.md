

## Replace "Website" Column With "Profile · View →" On Greenlist Table

Mirror the Verified Vendors registry pattern: the right-most column becomes the entry point into the facility profile page, not an external website link.

### Change — `src/pages/Greenlist.tsx`

**Desktop table header (line 329):**
- Rename `Website` → `Profile`

**Desktop table row (lines 354–367):**
- Replace the conditional external `Visit →` anchor with a single internal `<Link to={'/greenlist/${e.slug}'}>` rendering `View →` in the same mono uppercase style.
- Always renders (no website-presence conditional).

**Mobile card (lines 374–399):**
- Remove the external `Visit website →` anchor.
- Add a right-aligned `View →` `<Link>` to `/greenlist/${e.slug}` at the bottom of the card so the entry point matches desktop behavior.
- Facility name link at the top stays as-is (still navigates to profile — redundant tap target is fine and matches Verified Vendors).

### Why the external website moves

The website still exists on the profile page (already rendered in `GreenlistProfile.tsx` header as `Visit facility website →`), so no information is lost — it just lives one click deeper, exactly like the Verified Vendors pattern.

### Out of scope

- Filters, sort, pagination, source-type cards, explanatory bridge — untouched.
- `GreenlistProfile.tsx` content — already covers the full field list described in the request.
- Data model — no changes.

### Files touched

- `src/pages/Greenlist.tsx`

### Result

The Greenlist table reads as a clean five-column public registry — Facility / Brand · Source Type · Location · Focus · Profile — with `View →` as the consistent entry into each facility's transparency scorecard. Behavior now matches the Verified Vendors directory exactly.

