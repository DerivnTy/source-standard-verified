

## De-duplicate Greenlist Profile Fields

The "At a glance" panel and the body sections currently restate the same facts (Source Type vs Designation, Location vs header, Years in operation in both sidebar and Background, FDA / SS review date in both places). Tighten the profile so each fact appears once, in the highest-signal place.

### File touched
- `src/pages/GreenlistProfile.tsx`

### 1. "At a glance" panel — keep only non-duplicative essentials

Reduce the sidebar to the four facts a visitor needs at a glance, plus Designation only when it adds information beyond Source Type.

New row order:
- Source type (`entry.type`)
- Location (`entry.location`)
- Website (`entry.website` or muted "Not listed")
- Designation — **only render when `p.designation` exists AND its normalized value differs from `entry.type`**. (Comparison: lowercase, strip punctuation/whitespace. e.g. `"503B"` vs `"503B Outsourcing Facility"` → considered duplicative when `entry.type` already conveys it; show only when it adds something like `"FDA-registered 503B Outsourcing Facility"` truly distinct, or for 503A entries where designation surfaces state board info.)

Removed from the sidebar:
- FDA registration / FEI → still shown once in the Regulatory & Quality section.
- Years in operation → still shown once in the Background section.
- SS review date → still shown once in the Background section (as `ssAuditDate` / review notes); not surfaced in sidebar.

### 2. Body sections — drop fields already in the header

- **Regulatory & Quality**: remove `Designation` row from this section (now lives only in sidebar when distinct). Keep FDA/FEI, states served, inspections, standards, cleanroom, testing, monitoring.
- **Capabilities**: remove the `Clinical focus` row that re-renders `entry.focus` — the focus/background sentence is already the hero summary paragraph. Keep dosage forms, specializations, API sourcing policy.
- **Background**: unchanged structure (years in operation, facility scale, QA staffing, SS audit date, review notes) — these don't appear elsewhere on the page.

### 3. Header — unchanged
Hero already shows Source Type · Location in the meta line and Greenlisted pill above the title, so no changes there. Sidebar drops its redundant "Greenlisted" header strip is **kept** (it's the visual anchor of the card, not duplicative text data).

### Result
Each fact lives in exactly one place:
- Greenlist status → hero pill + sidebar header strip (visual anchor, intentional).
- Source type, Location, Website → sidebar.
- Designation → sidebar only when it adds info beyond Source Type.
- FDA/FEI, standards, inspections → Regulatory & Quality section.
- Years in operation, facility scale, audit notes → Background section.
- Clinical focus → hero summary paragraph.

The profile reads tighter, with no field restated across header, sidebar, and body.

