

## Apply form — Low-friction registry initialization

A focused refactor of `src/pages/Apply.tsx`. The form becomes a three-section, public-data-only registration that initializes a backend record without demanding sensitive evidence at intake. The "Pre-Audit Evidentiary Requirements" sidebar stays in place as a forward-looking checklist for Step 2, but the form itself is trimmed and re-grouped. No routing, no new components, no token changes.

### The hook (above the form panel)

Add a single mono advisory line directly above the form's header strip, inside the same `md:col-span-8` column:

- Container: `border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3 mb-4`
- Mono label (10.5px uppercase, muted): `STEP 1 OF 2 · REGISTRY INITIALIZATION`
- Body (13px, foreground, leading-relaxed): `Initialize your registry profile. Final document uploads and payment occur in Step 2 via our secure clinical portal.`

### Form panel — header strip (kept, lightly revised)

- Line 1 (unchanged): `FORM SS-INTAKE-01 · PRELIMINARY ADMINISTRATIVE INTAKE`
- Line 2 (revised): `Step 1 — Public registry data only · Governed by SS-VENDOR-STD-2026.01 · Required fields`

### Form fields — re-grouped into three labeled sections

Each group is rendered as a labeled fieldset with a mono section header (`font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground`) above a thin border-top divider, matching the page's existing typography. All inputs keep `h-10 rounded-none` styling.

**§A · Public Identity**

| Label | `id` (DB key) | Input | Required |
|---|---|---|---|
| Legal entity name | `LegalName` | text | yes |
| Public-facing brand name | `BrandName` | text | yes |
| Primary website | `Website` | url, placeholder `https://` | yes |

**§B · Verification Scope**

| Label | `id` (DB key) | Input | Required |
|---|---|---|---|
| Audit category requested | `Category` | text, placeholder `e.g. TRT clinic, 503A compounding pharmacy, 503B outsourcing facility` | yes |
| States of operation | `StateList` | text, placeholder `Comma-separated, e.g. CA, TX, FL` + helper text `Two-letter postal codes, comma-separated.` | yes |

**§C · Administrative Contact**

| Label | `id` (DB key) | Input | Required |
|---|---|---|---|
| Authorized representative | `ContactName` | text | yes |
| Contact email of record | `ContactEmail` | email | yes |
| Telephone of record | `ContactPhone` | tel | optional |

All previously-present invasive fields (`Operational scope statement` textarea, jurisdiction free-text) are removed at intake. Operational scope and jurisdictional registrations are deferred to Step 2 and remain represented in the sidebar checklist.

### Form panel — footer / submit (kept, copy unchanged)

- `ADMINISTRATIVE NOTICE · SS-INTAKE-01` strip and `[ SS-INTAKE-01 ] FILE DOCUMENT` button kept exactly as-is. The "Filing…" submitting state is also preserved.

### Success state — replace toast with in-panel confirmation

Replace the current `toast(...)` post-submit feedback with a clean in-panel confirmation that swaps the form body for a confirmation block. New local state: `filed: boolean`. After the simulated 600 ms submit, set `filed = true`. Form panel renders one of two views:

- **`filed === false`** — current form (with the new sectioning above).
- **`filed === true`** — confirmation block inside the same bordered panel:
  - Header strip kept; line 2 swapped to `Status · Filing acknowledged · Awaiting Verification Officer`.
  - Body (replacing the field grid):
    - Mono label (10.5px uppercase, foreground): `FILING RECEIVED · SS-INTAKE-01`
    - Heading (16px semibold, foreground): `Filing Received.`
    - Body (13px, foreground, leading-relaxed): `A Verification Officer is initializing your profile. You will receive an automated email within 24 hours to set up your secure portal access.`
    - Mono sub-line (11px uppercase, muted): `Reference · SS-INTAKE-{YYYY}-{6-char id}` (generated client-side via `crypto.randomUUID().slice(0,6).toUpperCase()`)
  - Footer strip kept; `File document` button replaced by a secondary `[ SS-INTAKE-01 ]  FILE ANOTHER ENTITY` ghost button that resets `filed` to `false` and clears the form.

The `toast` import is removed.

### Sidebar — minor copy alignment

- Sidebar header label appended with step context: `Pre-audit evidentiary requirements` → `Pre-audit evidentiary requirements · Step 2`
- Sidebar footnote unchanged (already references the secure transmission link issued after acknowledgment — consistent with the new success state).

### Footer — Official citation block

Kept exactly as-is. No changes.

### Visual style

- High-density monochromatic layout preserved (existing `border-border` + `bg-surface-muted` tokens; no new colors).
- Three section headers use the same mono treatment as the page's existing eyebrows for typographic consistency.
- Confirmation block reuses the form panel chrome so the page does not visually "jump" on submit — only the content inside the bordered panel changes.

### Database-mapping rationale (technical)

Field `id` attributes are intentionally PascalCase (`LegalName`, `BrandName`, `Website`, `Category`, `StateList`, `ContactName`, `ContactEmail`, `ContactPhone`) so a future backend handler can read `e.currentTarget.elements.namedItem('LegalName')` (or a `FormData` entry) and map 1:1 onto the eventual `vendor_intake` table columns without renaming. This is a UI-only change today; no backend wiring is added in this pass.

### Files touched

- `src/pages/Apply.tsx` only — add `filed` state + reset handler, remove `toast` import, insert the §A/§B/§C grouped fields, add the "Step 1 of 2" hook bar, swap the post-submit UX from toast to in-panel confirmation, append `· Step 2` to the sidebar header.

### What stays the same

All routes, the `UtilityHeader` / `Button` / `Input` / `Label` components, the 4 / 8 column grid, sticky sidebar behavior, the Pre-audit evidentiary requirements list, the Administrative Notice block, the `[ SS-INTAKE-01 ]` filing-button styling, the Official Citation footer, and all design tokens.

