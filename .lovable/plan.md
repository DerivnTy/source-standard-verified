

## Apply for Verification — Intake Restructure

Rebuild `src/pages/Apply.tsx` to match the real operating flow: this public page is intake-only. Vendors submit basic business info, Source Standard reviews, then emails an invitation into the internal onboarding system where documents are uploaded. Strip the "Step 1 of 2 / SS-INTAKE-01 / §A§B§C / [ SS-INTAKE-01 ] SUBMIT INITIAL FILING" administrative coding and reframe as a calm, conversion-oriented intake.

---

### Section sequence

**1 · Hero** (replace `UtilityHeader`)
Centered, calm opening — match the editorial rhythm used on About / Education.
- Eyebrow: `Apply for Verification`
- Title: `Apply for Verification`
- Subhead: `Submit your basic business information to open a Source Standard review file. Once intake is acknowledged, your team will receive an email invitation to continue onboarding and upload documentation through our internal verification system.`
- No `Form SS-INTAKE-01 · Step 1 of 2` chip, no doc codes.

**2 · How it works** (`bg-surface-muted`)
Centered `SectionHeader` (eyebrow `How it works`, lede `Three steps from intake to review.`). Three numbered blocks (`01 / 02 / 03`) in a 3-col grid (single column on mobile), hairline dividers:
- `01 · Submit business details` — Share general business information through this short intake form.
- `02 · Receive onboarding invitation` — If accepted for onboarding, your team is emailed a secure access link to our internal verification system.
- `03 · Complete onboarding and enter review` — Inside the internal system, upload documentation, complete onboarding, and move into formal review.

**3 · What this step requires** (`bg-background`)
Centered `SectionHeader` (`What this step requires`, lede `Step 1 collects general business details only — full documentation is requested later through the internal onboarding system.`). Below, a `max-w-3xl` plain bulleted list with hairline dividers:
- Legal business name
- Brand name
- Website
- Doctor or prescriber name (where applicable)
- States of operation
- Administrative contact details

**4 · Documents typically requested during onboarding** (`bg-surface-muted`)
Quiet preview, de-emphasized. Centered `SectionHeader` (eyebrow `Later — during internal onboarding`, title `Documents typically requested during onboarding`, lede `Provided here for transparency. Not required at this step.`). Plain bulleted list with hairline dividers, muted tone:
- Business licenses and registrations
- Pharmacy invoices
- Certificates of analysis
- Prescriber credentials (where applicable)
- Supplier or pharmacy agreements (where applicable)

**5 · Intake form** (`bg-background`)
Centered `SectionHeader` (`Begin intake`, lede `Tell us who you are. We'll review and reach out with next steps.`). Form rendered in a `max-w-2xl` centered column — no bordered card shell, no `Form SS-INTAKE-01` header strip, no `§A / §B / §C` mono legends. Three plain section labels (regular weight, no mono):
- **Business profile** — `Legal business name`, `Brand name`, `Website`
- **Operating scope** — `Verification category`, `Prescriber name (if applicable)`, `States of operation`
- **Administrative contact** — `Contact name`, `Business email`, `Business phone`

Inputs use default rounded styling (drop `rounded-none`, drop mono `meta-label` class — use plain `Label`). Add the new `Prescriber name` field as optional.

CTA: a single primary `Button` labeled **`Submit Intake`** (drop the `[ SS-INTAKE-01 ] SUBMIT INITIAL FILING` mono chrome, drop forced uppercase/mono). Submitting state: `Submitting…`.

**6 · Submission notice** (immediately below the form, same section)
Single muted paragraph in `max-w-2xl`:
> Submitting this form opens your intake file. If your application is accepted for onboarding, Source Standard will email your team with the next-step access link for document submission and review.

**7 · Filed confirmation state** (replaces the form when `filed === true`)
Same centered column. Plain heading `Intake received.` + paragraph: `Your file has been opened. If accepted for onboarding, your team will receive an email invitation with secure access to continue onboarding.` Muted reference line: `Reference: {reference}`. Quiet `Submit another intake` ghost link below.

**8 · Footer**
Drop the `Official citation · SS-INTAKE-01` band entirely. Replace with a single muted line of two quiet text links: `Vendor submission standard →` `/for-vendors` · `How verification works →` `/how-it-works`.

---

### Visual rules

- No `§A / §B / §C` legends, no `Form SS-INTAKE-01`, no `[ SS-INTAKE-01 ]` button chrome, no `Step 1 of 2` chip, no `Administrative notice · SS-INTAKE-01` band, no `Official citation` footer.
- Drop `font-mono uppercase tracking-[0.08em]` from all visible UI labels in the form area.
- Drop `rounded-none` on inputs and the CTA — use the project's default rounded styling so the form feels like an intake form, not a regulatory portal.
- Centered `SectionHeader` rhythm + `max-w-2xl/3xl` content columns — matches About / Education / How Verification Works.
- Surfaces alternate `bg-background` ↔ `bg-surface-muted`. Hairline dividers via `border-border`. No card shadows, no left-rail sticky checklist.
- Spacing: `container-wide` + `py-12 md:py-16`.

### Files touched

- `src/pages/Apply.tsx` — full body rewrite. Replace `UtilityHeader` with centered hero, drop sticky-rail checklist layout, restructure into the 8 sections above, add 3-step process overview, reframe checklist as "documents typically requested during onboarding" (de-emphasized), simplify form (plain section labels, default input styling, new optional `Prescriber name` field), replace mono CTA with `Submit Intake`, drop citation footer.

### What stays the same

`PageMeta`, `Breadcrumb`, `Button` / `Input` / `Label` primitives, the simulated submit logic (`onSubmit` + `setTimeout` + `SS-INTAKE-{YYYY}-{ID}` reference generation + `filed` / `fileAnother` state), the route `/apply`, and every other page on the site.

