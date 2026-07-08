## Vendor Profile — Hierarchy & Redundancy Cleanup

Refine `src/pages/VendorProfile.tsx` only. No changes to styling, colors, typography, cards, routing, data model, or verification logic.

### 1. Quick Facts — remove Location, reorder
Quick Facts becomes purely administrative:

1. Profile Status — Claimed / Unclaimed
2. Verification — Verified / Unverified (or under-review / suspended / removed label)
3. Last Reviewed — date or "Not yet reviewed"
4. Provider Type — In-Person / Online / Hybrid

Change from the current table:
- Remove the **Location** row (already in hero).
- Rename **Profile** → **Profile Status**.
- Reorder as listed above.
- Keep the conditional **Verification Period** row (verified + both dates present) at the bottom of the table.

### 2. Rename Contact "Address" → "Practice Address"
Single `<Cell label>` change in the Contact section. Missing-state copy ("Not provided to Source Standard") is unchanged.

### 3. Section responsibilities
No structural changes required — current sections already map to the intended questions. No copy edits beyond §1 and §2. This item is a guardrail: do not reintroduce location/identity duplication.

### 4. Activity — always render the full timeline
Remove the "compact single-line fallback" branch inside the `Activity` component. Always render the four-row timeline:

- Profile Created — value or muted "—"
- Last Reviewed — value or muted "Not yet reviewed"
- Verification Status Issued — value or muted "Not yet issued"
- Last Updated — value or muted "—"

Missing values render in muted color using the existing `provided` flag. Card chrome, dividers, and typography stay as-is.

### Technical notes
- Single file: `src/pages/VendorProfile.tsx`.
- `QuickFactsTable` component API unchanged; only the `rows` array passed at the call site changes.
- `Activity` component simplified — drop the `< 2 provided` branch, always render the `<article>` variant.
- Typecheck after edits.

### Out of scope
- New sections, fields, or data.
- Any Greenlist / Facility Records changes.
- Restyling of any element.
