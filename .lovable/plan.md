## Governance cleanup

### 1. Remove Open entirely — `src/pages/Governance.tsx`
- Delete the `import openLogo from "@/assets/open-logo-transparent.png.asset.json"` line.
- Delete the entire "Clinical intelligence · Open" block inside the Ecosystem section (eyebrow, logo `<img>`, both paragraphs).

### 2. Simplify Ecosystem
- Keep the existing `ecosystemCategories` array (Independent laboratories, Healthcare organizations, Research partners) exactly as-is.
- Section renders as the `<dl>` only, no Open subsection.

### 3. Fix page structure & mobile Anchors overflow
Recompose Governance so sections read as a continuous editorial rhythm rather than stacked cards:
- Keep the section order: Hero (RecordHeader) → DocJumpBar → Advisory → Anchors → Neutrality → Ecosystem → Read deeper → Back to Home. This already matches the spec; no reordering needed.
- **Advisory (§1):** Replace the bordered "table" wrapper (grid header row + Callout inside a boxed div) with the same editorial pattern used elsewhere — a single `Callout` with the "Initial advisory roster pending publication" notice and the filing window mono line. Drop the fake `NAME / CREDENTIAL / ROLE / JURISDICTION` header row (it has no data rows and looks broken on mobile).
- **Anchors (§2) — mobile fix:** Replace the 12-col grid table with a responsive pattern:
  - On `md+`: keep the current 3-column grid (Anchor / Issuing Authority / Reference).
  - On mobile: render each authority as a stacked record — anchor code as an eyebrow on top (`meta text-primary`), full authority name + URL below, then the statutory/compendial reference paragraph. Use `divide-y divide-border` between records, no outer box, matching the Ecosystem `<dl>` rhythm.
  - Implementation: single `<ul>` where each `<li>` uses `flex flex-col gap-2 md:grid md:grid-cols-12 md:gap-3 md:items-baseline` and the column header row is hidden on mobile (`hidden md:grid`).
- **Ecosystem (§4):** Already a stacked `<dl>` — leave structure, just remove the Open block that followed it and drop the extra `pt-8` wrapper.
- **Read deeper (§5):** Unchanged — `NavCard` grid with the 5 cross-references.
- No typography, color, or spacing token changes beyond what's needed to remove the boxed table chrome.

### 4. Add Governance to navigation — `src/components/SiteHeader.tsx`
Update the `nav` array to this order (Home is prepended for mobile automatically by existing `mobileNav`):
1. Vendor Registry — `/verified-vendors`
2. Facility Records — `/greenlist`
3. How Verification Works — `/how-it-works`
4. Governance — `/governance` *(new)*
5. Advisory Board — `/medical-advisory`
6. Learn — `/learn`
7. About — `/about`

Apply for Verification stays as the standalone CTA button (desktop) and full-width action (mobile). Both desktop `nav.map` and mobile `mobileNav` render from the same array, so a single edit covers both.

### 5. Verification
After edits, confirm via read-back / preview:
- No `open-logo`, `openLogo`, or "Open" copy remains on Governance.
- `/governance` link present in desktop header and mobile overlay.
- Anchors section on 390px viewport shows each authority as a stacked record with no horizontal overflow.
- Page ends with Read deeper `NavCard` grid + `EditorialBackLink` "Back to Home".

### Out of scope
- No route additions/removals beyond adding Governance to nav (route already exists).
- No SEO metadata changes.
- No visual redesign of RecordHeader, DocJumpBar, Callout, or NavCard.
- No changes to About or Advisory Board pages.
