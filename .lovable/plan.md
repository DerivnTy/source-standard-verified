# Vendor Verification Intake Page Simplification

**Note on file target:** The plan references `src/pages/BeginVerification.tsx`, but that file does not exist in this project. The vendor intake page that contains all the sections you want removed (process steps, "Step 1 collects general business details only", "Documents typically requested during onboarding", and the inline reference link row) is **`src/pages/Apply.tsx`**. I'll apply the changes there. The route stays unchanged.

## Scope
Single-file edit: `src/pages/Apply.tsx`. No header, footer, global CSS, shared component, or routing changes.

## Final page structure
1. Header (global, untouched)
2. Breadcrumb (kept)
3. BriefingHero (kept, copy unchanged — already matches the requested wording)
4. Intake submission form, wrapped in a white card
5. Two reference link rows (Vendor submission standard, How verification works)
6. Footer (global, untouched)

## Changes

### Remove
- The "From intake to review" section (3-step process grid)
- The "Step 1 collects general business details only" section (`stepRequires` list)
- The "Documents typically requested during onboarding" section (`onboardingDocs` list)
- The trailing inline link row ("Vendor submission standard → · How verification works →")
- The unused `processSteps`, `stepRequires`, `onboardingDocs` constants
- The local `SectionHeader` helper if it's no longer used after the rewrite (will replace with inline eyebrow/heading per spec)

### Keep (behavior preserved)
- `PageMeta`, `Breadcrumb`, `BriefingHero`
- All form fields exactly as today (Legal name, Brand name, Website, Verification category, Prescriber name, States of operation, Contact name, Business email, Business phone)
- Submit handler, `submitting` state, `filed` success state with reference ID, "Submit another intake" reset
- Group fieldset legends: Business profile, Operating scope, Administrative contact

### Intake form section (new wrapping)
- Section padding: `pt-9 pb-9` (36px), `border-b border-border` (hairline)
- Eyebrow `VENDOR INTAKE` + heading `Intake submission` + intro paragraph from spec
- Form (and the success state) wrapped in a card:
  - `bg-card border border-border rounded-xl p-6`
- Vertical rhythm inside the card:
  - Label → input: 8px (`space-y-2`)
  - Field → field: 18px (`gap-[18px]` on the grid)
  - Group heading → first field: 18px (`mb-[18px]` on legend)
  - Group → group: 28px (`space-y-7` on the form)
  - Submit button: `mt-6` (24px)
- Submit button: `w-full sm:w-auto sm:ml-auto` so it's full width on mobile, content-width right-aligned on desktop
- Post-submit note moved inside the card, below a hairline divider:
  - `mt-5 pt-5 border-t border-border text-[13.5px] leading-[1.6] text-muted-foreground`
  - Copy: "Submitting this form opens your intake file. If your application is accepted for onboarding, Source Standard will email your team with the next-step access link."

### Reference links section (replaces old inline link row)
- Section: `pt-8 pb-16` (no large dead gap before footer)
- Container: `max-w-2xl space-y-3`
- Two `<Link>` rows, each:
  - `bg-card border border-border rounded-xl px-4 py-3.5`
  - `flex items-center justify-between gap-4`
  - Label `text-[13px] font-semibold text-foreground`
  - Right-side arrow `→` in `text-muted-foreground` (or primary on hover)
- Row 1: "Vendor submission standard" → `/for-vendors`
- Row 2: "How verification works" → `/how-it-works`

### Hero
Copy already matches the requested wording, so no text changes. Hero left as-is.

## Acceptance check
- Page reads: Header → Hero → Form card → Two link rows → Footer
- No process timeline, no document preview list, no duplicate explanation, no large dead zones
- Form submission flow and validation behavior unchanged
- Mobile (390px): submit button full width; form card padding comfortable; no horizontal overflow