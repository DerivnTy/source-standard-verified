

## Zero-Redundancy Header Protocol

Strip the redundant `§N · CATEGORY` mono eyebrow from every `BoardSection` instance on the policy/protocol pages, sharpen three headlines, and confirm the body metadata strip is already gone. The section number stays as a quiet left-side marker; the bold headline becomes the sole entry point.

### 1. BoardSection — make eyebrow optional

**File:** `src/components/BoardSection.tsx`

- Add an optional `hideEyebrow?: boolean` prop (default `false`).
- When `true`, suppress the `<p className="t-utility-xs text-muted-foreground mb-4">§N · CATEGORY</p>` line entirely and instead render a muted grey section number (`01`, `02`, …) above the headline using the existing mono utility (`t-utility-xs text-muted-foreground/60 mb-3`).
- No change to the 12-col layout, padding, or typography tokens. MAB page (`MedicalAdvisory.tsx`) keeps current behavior since the prop defaults off.

### 2. Apply `hideEyebrow` + headline edits

**`src/pages/Terms.tsx` (Registry User Agreement)**
- Pass `hideEyebrow` to every `BoardSection`.
- Rename section 01 title: `Acceptance of Terms` → **`Registry Access & Acceptance`**.

**`src/pages/Privacy.tsx` (Data Governance Protocol)**
- Pass `hideEyebrow` to every `BoardSection`.
- Rename section 01 title: `Record Partitioning & Access Control` → **`Record Partitioning & PAM Classification`**.

**`src/pages/VerificationDisclaimer.tsx`**
- Pass `hideEyebrow` to every `BoardSection`.
- Rename section 01 title: `Scope of Administrative Attestation` → **`Administrative Attestation Scope`**.

**`src/pages/HowItWorks.tsx` (Verification Protocol)**
- Pass `hideEyebrow` to every `BoardSection`. No headline changes.

**`src/pages/About.tsx` (Organization & Mandate)**
- Pass `hideEyebrow` to every `BoardSection`. No headline changes.

### 3. Body metadata strip

Already removed in the previous pass on Terms / Privacy / VerificationDisclaimer. About and HowItWorks never had one. No action needed — confirmed via current file view.

### 4. Spacing

The existing `section-pad` token on `BoardSection` plus the `DocJumpBar` produces the ~64px hero-to-Section-01 gap. The 12-col left rail places the muted `01` marker, then `mb-3` (12px) to the headline; the right-rail list keeps `space-y-5` from `BoardSection`'s body wrapper. No global spacing overrides required.

### Result

```text
┌─────────────────────────────────────────┐
│  Hero (navy) — title + subtitle         │
├─────────────────────────────────────────┤
│  DocJumpBar (sticky)                    │
├─────────────────────────────────────────┤
│  01                  Registry Access    │
│                      & Acceptance       │
│                                         │
│                      | Access constit…  │
│                      | If any term…     │
└─────────────────────────────────────────┘
```

One number. One headline. No repeated category. Matches the Advisory Board's surgical rhythm across all five policy/protocol pages.

