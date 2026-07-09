
## Vendor Registry Row Polish

Fix the compressed, spreadsheet feel of the registry rows by re-ordering the row hierarchy so vendor name is the anchor and category chip becomes supporting context.

### 1. `src/components/system/RegistryRow.tsx` — restructure

Replace the current three-column layout (chip · name · status+chevron) with a name-first stack. Chevron becomes a true right rail, vertically centered.

New mobile layout:

```text
Vendor Name ..................... StatusPill   ›
Vendor Type · Location                          
Specialty chip                                  
```

Concrete changes:
- Outer flex: `items-center` on the chevron column, but the content column stacks vertically.
- Row 1: `flex items-baseline justify-between gap-3` → `name` (truncate, `text-[15px]` on mobile, semibold, `-0.01em`) on the left; `StatusPill` on the right. Status pill uses the shared `StatusPill` — no red uppercase text floating in the row.
- Row 2 (metaLeft): `mt-1`, `text-[12.5px]`, `text-muted-foreground`, no truncation forced; renders "Vendor Type · Location".
- Row 3 (chip): `mt-2`, small uppercase pill using existing chip styling (10px, 600, `letterSpacing 0.04em`, muted background) — but only rendered when `chip` prop is present. Sits below the meta, not before the name.
- Chevron: separate right-side column, `self-center`, subtle (`text-muted-foreground/60`, 14px, translates 3px on hover).
- Remove `metaRight` from mobile primary layout (kept as optional prop for desktop-only use, right-aligned on `md:` breakpoints).
- Vertical padding: bump to `py-4` so name/meta/chip stack breathes; still hits 44px min-height.
- Keep hairline dividers (parent applies `divide-y divide-border/60`), hover tint `bg-muted/40`, focus-visible ring, `active:scale-[0.998]`.

Desktop (`md:` and up):
- Switch Row 1 to a wider table-feel: name column flexes, meta shows inline to the right of the name column, chip appears as a small trailing chip, status pill + chevron pinned right. Keep it denser than mobile but do not sacrifice the name-first read.
- Approach: single flex row on `md:` with `name (flex-1 truncate)` · `metaLeft (muted, shrink)` · `chip (shrink)` · `StatusPill` · chevron. Mobile falls back to the stacked layout via `flex-col md:flex-row` on an inner wrapper.

### 2. `src/pages/VerifiedVendors.tsx`

Adjust how vendor rows are populated (the row itself is where the fix lives; the page only feeds props):
- `chip` prop → `vendor.category` (specialty) — unchanged prop, but now renders below.
- `metaLeft` → `"{Fulfillment type} · {City, ST}"` where fulfillment is `In-person` / `Online` / `Hybrid` from `getVendorFulfillment`. Currently metaLeft mixes different fields — normalize to type · location.
- `metaRight` → drop on mobile (was contributing to wrap). Keep only if used on desktop.
- `status` → continues to feed `StatusPill` via RegistryRow.

### 3. `src/pages/Greenlist.tsx` — parity check

Facility rows already use `RegistryRow`. After the restructure they automatically inherit the name-first hierarchy. Verify:
- `chip` = facility category (503A / 503B / Manufacturer) reads as supporting context below.
- `metaLeft` = "{Facility type} · {Location}" reads on second line.
- `StatusPill` (`greenlisted` / `monitoring` / `alert`) sits top-right, not competing with name.

No structural changes expected in Greenlist beyond confirming meta content matches the "type · location" pattern; adjust the string if it currently concatenates differently.

### Preserved

- Search, filter, sort, pagination, "load more" behavior on both pages.
- Routes, IDs, `to` props, aria labels.
- Status semantics via shared `StatusPill`.
- Hairline dividers between rows, dense registry feel.
- All colors via semantic HSL tokens (no hardcoded hex).

### Verification

- `bunx tsgo --noEmit`.
- Playwright at 390×844 (mobile) and 1280×1800 (desktop) on `/verified-vendors` and `/greenlist`. Confirm: name is the visual anchor, status pill reads as a status not floating text, specialty chip sits below meta, chevron is centered, rows feel like public records not table rows.
