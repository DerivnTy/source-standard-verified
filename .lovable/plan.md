

## Remove Redundant Body Metadata Bars

Strip the secondary mono-spaced `VERSION | CLASSIFICATION | STATUS` strip that sits between the hero subtitle and Section 01 on the policy/protocol pages. The hero already carries the page identity — the duplicate strip adds visual noise and breaks the clean Advisory Board rhythm.

### What changes

Delete the `<section className="border-b border-border bg-surface-muted">…</section>` metadata block (the one wrapping the `font-mono text-[11px] uppercase…` paragraph) from each affected page. Leave `BriefingHero` and `DocJumpBar` untouched — `DocJumpBar` already provides the natural spacing buffer before Section 01.

### Files to edit

- `src/pages/Terms.tsx` — remove the `VERSION: 2026.01 | EFFECTIVE: 04/21/26 | JURISDICTION: US/FL` strip.
- `src/pages/Privacy.tsx` — remove the `VERSION: 2026.01 | CLASSIFICATION: PUBLIC-FACING PROTOCOL | UPDATED: 04/21/26` strip.
- `src/pages/VerificationDisclaimer.tsx` — remove the `VERSION: 2026.01 | CLASSIFICATION: REGULATORY ATTESTATION | STATUS: ACTIVE` strip.

### Pages already clean (no change needed)

- `src/pages/About.tsx` — never had a body metadata strip.
- `src/pages/HowItWorks.tsx` (Verification Protocol) — never had a body metadata strip.

### Spacing

No spacing overrides required. With the metadata `<section>` removed, the existing `DocJumpBar` (sticky nav) sits directly under the hero, and the first `BoardSection`'s `section-pad` token provides the uniform breathing room — matching the Medical Advisory Board page exactly.

### Outcome

Hero subtitle → DocJumpBar → Section 01. No duplicated mono metadata. Five policy/protocol pages now share one consistent header rhythm.

