

## Bring Legacy Legal Pages onto the Chapter-Page System

`Privacy`, `VerificationDisclaimer`, and `Terms` already use `BoardSection` + `DocJumpBar` + `DocSignature`, but they open straight into a flat `RecordHeader` on white. That's why they read as "bare" next to `Greenlist` and `MedicalAdvisory`, which open with the dark navy `BriefingHero` chapter intro before the document body begins.

Fix: prepend the same chapter-style intro and tighten the transition into the document chrome. Same composition family as every other major page on the site. No copy changes.

---

### 1 · Add a `BriefingHero variant="chapter"` to each legacy doc page

Insert immediately after `<Breadcrumb />`, before `<RecordHeader />`. Same pattern Greenlist and MedicalAdvisory already use.

**`src/pages/Privacy.tsx`**
```
<BriefingHero
  variant="chapter"
  eyebrow="Policy · Data governance protocol"
  title="Data Governance & Privacy Policy"
  lead="What Source Standard collects, how it is partitioned between public registry and Protected Audit Material, the partners that process it, retention rules, and the rights of individuals whose data is held."
/>
```

**`src/pages/VerificationDisclaimer.tsx`**
```
<BriefingHero
  variant="chapter"
  eyebrow="Disclaimer · Formal regulatory attestation"
  title="Verification Disclaimer & Attestation Scope"
  lead="The scope, boundaries, time-bound nature, and liability framing of every Source Standard verification determination."
/>
```

**`src/pages/Terms.tsx`**
```
<BriefingHero
  variant="chapter"
  eyebrow="Policy · Registry user agreement"
  title="User Agreement & Registry Terms"
  lead="The binding user agreement governing access to the public registry and any reproduction, citation, or downstream use of its contents."
/>
```

The `eyebrow` and `lead` text is lifted from the existing `RecordHeader` props on each page so the chapter intro carries the same voice with no rewrites.

### 2 · Demote `RecordHeader` into a quieter document-metadata strip

Once the `BriefingHero` carries the title + lead, the `RecordHeader` underneath is redundant in that role. Remove the `eyebrow`, `title`, and `lead` props from each `RecordHeader` call, keeping only `metadata`, `verifiedOn`, and `downloadable={true}`. The header collapses to a clean reference card row sitting between the chapter intro and the `DocJumpBar` — exactly how a doc metadata band should read after a chapter opener.

`RecordHeader` already handles missing `eyebrow`/`title`/`lead` cleanly (they're conditionally rendered). One small tweak: when neither title nor lead is present, the left column collapses; tighten the band by passing a new optional `compact` prop on `RecordHeader` that swaps `py-14 md:py-20` for `py-8 md:py-10` and lets the right-rail Reference card sit on a single horizontal row of metadata. This keeps the page rhythm tight instead of leaving an empty left column.

### 3 · No other changes

- `BoardSection`, `DocJumpBar`, `BoardCiteFooter`, `DocSignature` chrome on these three pages stays exactly as is.
- All copy, all section ordering, all waypoints preserved.
- `Greenlist`, `MedicalAdvisory`, `Governance`, `Accountability`, `StatusDefinitions`, `About`, `HowItWorks` already follow the chapter system — untouched.
- No data, route, or component-API changes outside the small `compact` prop on `RecordHeader`.

### Files touched

- `src/pages/Privacy.tsx` — add `BriefingHero` import + chapter intro; strip `eyebrow`/`title`/`lead` from `RecordHeader`; pass `compact`.
- `src/pages/VerificationDisclaimer.tsx` — same treatment.
- `src/pages/Terms.tsx` — same treatment.
- `src/components/RecordHeader.tsx` — add optional `compact?: boolean` that tightens vertical padding and renders metadata-only as a single horizontal reference strip when `title`/`lead` are absent.

### Outcome

The three remaining "bare" legal pages now open with the same dark-navy chapter band as Greenlist and Medical Advisory, then drop into a tightened reference-metadata strip, then into the existing `BoardSection` document body. The site reads as one continuous chapter system: home is the cover, every other major page (legal pages included) is a properly designed chapter.

