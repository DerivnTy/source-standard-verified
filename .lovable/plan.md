

## Rebuild Greenlist Profile Section Structure + Populate Fields

Replace the current triple-headed boxed sections with clean, single-headline editorial blocks, and populate profiles with verifiable public information.

### Files touched
- `src/pages/GreenlistProfile.tsx` — restructure section component
- `src/data/greenlist.ts` — populate profile fields with public info where supportable

### 1. Section header simplification

**Current (repetitive):**
```
01 · Regulatory & Quality
Regulatory identity, quality systems
Licensure, inspections, and quality systems.
```

**New (single line):**
```
01 · Regulatory & Quality
─────────────────────────
[content begins immediately]
```

Replace the boxed `<Section>` component with a flat editorial block:
- One header line: number + title in mono uppercase, no eyebrow stack, no subtitle, no bordered box.
- Hairline rule under the header.
- Content sits directly below on the page background — no card surface, no nested header strip.
- Inter-section spacing increases slightly (`space-y-8` instead of `space-y-3`) so the rule + whitespace creates the section division instead of a card border.

### 2. Content layout under each section

Drop the rigid 2-column `<dl>` grid that forces every field into an equal cell. Instead:

- **Inline metadata row** at top of each section for short scalar fields (e.g., "FDA reg · 3001234567 · 12 states served · cGMP, USP <797>") rendered as a wrapped, dot-separated mono line.
- **Tag rows** for arrays (standards, dosage forms, specializations) on their own line with a small label.
- **Prose paragraph** for narrative fields (inspection notes, API sourcing policy, operational summary, review notes).

Result: each section reads like a brief, not a form.

### 3. New section composition

**01 · Regulatory & Quality**
- Inline meta line: designation · FDA reg / FEI · last inspection date · cleanroom class
- States served — tag chips
- Standards met — tag chips
- Inspection history — short paragraph if present
- Testing protocols / environmental monitoring — short paragraph if present

**02 · Product Capabilities**
- Dosage forms — tag chips
- Specializations — tag chips
- Clinical focus — short paragraph (uses `entry.focus` as fallback)
- API sourcing policy — paragraph if present

**03 · Background**
- Inline meta line: years in operation · facility scale · QA staffing
- Operational summary — paragraph (`p.background`)
- Review notes — paragraph if present

Sections that end up empty after omit-empty filtering still skip entirely.

### 4. Data population (`src/data/greenlist.ts`)

For each entry, ensure the `profile` block contains verifiable public information. Cover where supportable from public sources (FDA 503B registration list, state board listings, company About pages):

- `fdaRegistration` — for 503B facilities, FDA registration / FEI from the FDA 503B Registered Outsourcing Facilities list.
- `standards` — `cGMP (503B)` for outsourcing facilities; `USP <797>`, `USP <800>`, `USP <795>` based on disclosed scope.
- `dosageForms` — sterile injectables, oral, topicals, ophthalmic, etc., per company disclosures.
- `specializations` — hormone therapy, peptide therapy, weight management, ophthalmic, hospital/perioperative, etc.
- `apiSourcingPolicy` — only where the company publicly states FDA-registered API or COA practices.
- `yearsInOperation` / `facilityScale` — only where publicly stated.
- `background` — neutral 1–2 sentence operational summary based on public site / FDA listing.
- `statesServed` — only where the company publishes a list; otherwise omit.
- `inspectionHistory` — left blank unless a recent FDA Form 483 is publicly known and uncontroversial; otherwise omit (do not invent).

**Rule:** if a fact is not publicly verifiable, leave it omitted. No "Not disclosed" filler.

### What stays the same
- Hero header, At-a-glance sidebar, MetadataBar — untouched.
- Routing, slugs, table view — untouched.
- Section omit-empty rules.
- Footer disclosure note (kept, but un-boxed to match new editorial style).

### Result
Each profile section reads as a clean editorial block: one header line, a hairline rule, then the actual content laid out as a mix of inline meta lines, tag rows, and short paragraphs. The page feels like a facility brief, not stacked admin cards. Profile data is populated from public sources where verifiable, with sparse-but-accurate sections preferred over padded ones.

