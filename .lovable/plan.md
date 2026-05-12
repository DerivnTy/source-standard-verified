## Vendor Verification Intake — Structured Form Rebuild

Surgical content + form-structure update to `src/pages/Apply.tsx`. Keep all existing page chrome (PageMeta, Breadcrumb, BriefingHero, the two follow-on link cards, the surrounding `section` / `page-shell` / `w-standard` wrappers, the `bg-card border border-border rounded-xl` form container). Only the form body, headings, hero text, and post-submit copy change.

### Copy changes

- `PageMeta.title`: "Vendor Verification Intake"
- `PageMeta.description`: new subtitle
- `BriefingHero` `title`: "Vendor Verification Intake"
- `BriefingHero` `statement`: "Submit your operating profile to open a Source Standard review file. This form does not create verified status. If eligible, your team will receive the secure documentation request and review instructions."
- Inner section heading stays as `Intake submission` block but retitled to match: eyebrow "Vendor intake", h2 "Vendor Verification Intake", lede = subtitle above.
- Submit button: "Submit Intake"
- Post-submit headline + body: "Intake received." / "If eligible for documentation review, Source Standard will send the next-step access instructions to the administrative contact provided."
- Footer disclaimer under form removed; replaced by the Submission Acknowledgment checkbox (below).

### Form structure

Each group rendered as a `<fieldset>` with the existing `legend` styling, separated by the existing 28px (`space-y-7`) rhythm and a thin `border-t border-border pt-7` divider between groups for the institutional sectioned feel. Two-column grid on `sm+` (`grid sm:grid-cols-2 gap-[18px]`), full-width fields use `sm:col-span-2`.

1. **Business Identity**
   - Legal business name
   - Public brand / DBA name
   - Website (url)
   - Principal business address (full-width)
   - Mailing address, if different (full-width, optional)
   - State of formation (Select — `usStates`)
   - Entity type (Select: LLC, S-Corp, C-Corp, PLLC, Professional Corp, Sole Proprietor, Other)
   - Registered business / license state (Select — `usStates`)

2. **Operating Scope**
   - Vendor type (Select: Physical clinic, Telehealth clinic, Online vendor, Pharmacy / supplier, Other)
   - Verification track (Select: Physical vendor review, Online vendor review, Supplier / upstream source review)
   - States of operation (text, comma-separated; helper text)
   - States served (text, comma-separated; helper text)
   - Therapy categories — multi-select via Checkbox grid (TRT, HRT, GLP-1, Peptides, Longevity compounds, Other compounded therapies). Full-width.

3. **Clinical Authority** (all optional — labels include "if applicable")
   - Prescriber / Medical Director name
   - NPI
   - License state (Select — `usStates`)
   - Role (Select: Medical Director, Prescribing Physician, Nurse Practitioner, Pharmacy Representative, Not applicable)

4. **Sourcing Profile**
   - Primary supplier / pharmacy name
   - Additional supplier / pharmacy names (Textarea, full-width)
   - Current sourcing model (Select: 503A pharmacy, 503B outsourcing facility, Multiple suppliers, Unsure, Other)
   - Products / compounds submitted for review (Textarea, full-width)

5. **Review Readiness**
   - Intro line: "Can your organization provide the following if accepted for review?"
   - Stacked Checkbox list (full-width):
     - Business registration
     - Medical or pharmacy license, if applicable
     - Medical Director / prescriber documentation, if applicable
     - Recent supplier invoice
     - COA or sourcing documentation
     - Signed vendor attestation
     - Signed vendor agreement

6. **Administrative Contact**
   - Contact name
   - Business email (email, required)
   - Business phone (tel)
   - Role / title

7. **Submission Acknowledgment**
   - Required Checkbox + label with the full disclaimer text. Submit button disabled until checked.

Submit button stays right-aligned on `sm+`, full-width on mobile, label "Submit Intake".

### Behaviour

- Local React state object holds all field values; no backend wiring (preserves the current mock-submit pattern that generates an `SS-INTAKE-YYYY-XXXXXX` reference and shows the post-submit panel with "Submit another intake").
- Required fields: legal name, brand, website, principal address, state of formation, entity type, registered state, vendor type, verification track, states of operation, states served, at least one therapy category, primary supplier, sourcing model, contact name, business email, acknowledgment checkbox.
- Use existing shadcn primitives: `Input`, `Textarea`, `Select`, `Checkbox`, `Label`, `Button`. Reuse `usStates` from `src/lib/usStates.ts` for state dropdowns.

### Visual / system rules

- Use only semantic tokens (`text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`) — no hardcoded colors.
- Section legends: `t-body-md font-semibold text-foreground`.
- Helper text under multi-state fields: `t-utility-xs text-muted-foreground`.
- No marketing language, no provider/clinical positioning, no payment copy, no Stripe.
- No drop shadows; rely on 1px hairline borders and the existing rounded-xl card.

### Files touched

- `src/pages/Apply.tsx` — only file modified.

### Out of scope

- No route changes, no nav changes, no backend, no payments, no email, no DB.
