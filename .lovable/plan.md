

## Global Zero-Redundancy: Hero & Section Eyebrow Removal

Eliminate the redundant `POLICY · …` hero eyebrow and the duplicate `01` marker above each section headline across all five policy/protocol/about pages. After this pass, each title appears exactly once: H1 in the navy hero, then DocJumpBar chips, then bold section headlines.

### 1. Component hardening

**`src/components/BriefingHero.tsx`**
- In both the navy `chapter` branch and the default-mode branch, wrap the eyebrow `<p>` that renders `category` in `{category && (...)}` so an empty string fully suppresses the element and its margin (no orphaned spacing).
- Leave the `cover` variant and all other props untouched.

**`src/components/BoardSection.tsx`**
- When `hideEyebrow` is `true`, render **nothing** in the eyebrow slot. Delete the `<p className="t-utility-xs text-muted-foreground/60 mb-3">{n}</p>` line entirely.
- Default behavior (`hideEyebrow={false}`) is unchanged — MAB page keeps its `§N · CATEGORY` eyebrow.

### 2. Page updates — set `category=""` on BriefingHero

Update the navy `BriefingHero` invocation in each page:

- `src/pages/Terms.tsx` — `category="Policy · Registry User Agreement"` → `category=""`
- `src/pages/Privacy.tsx` — `category="Policy · Data Governance Protocol"` → `category=""`
- `src/pages/VerificationDisclaimer.tsx` — remove the `Policy · …` category string
- `src/pages/About.tsx` — remove the `About · …` category string
- `src/pages/HowItWorks.tsx` — remove the `Policy · …` category string

No other props change. `hideEyebrow` is already passed to every `BoardSection` on these five pages from the prior round, so the BoardSection component change automatically suppresses the `01`/`02`/… markers globally.

### 3. Layout geometry

No spacing overrides. The navy hero's existing vertical padding now hugs the H1 directly — balanced and intentional. `DocJumpBar` continues to provide the buffer to Section 01, and each `BoardSection`'s headline becomes the first visual element of its block.

### Result

```text
┌──────────────────────────────────────┐
│                                      │
│   Data Governance Protocol           │  ← H1 only, no eyebrow
│   The administrative framework …     │
│                                      │
├──────────────────────────────────────┤
│ CONTENTS · 01 PARTITIONING  02 …     │  ← DocJumpBar (only place numbers live)
├──────────────────────────────────────┤
│                                      │
│   Record Partitioning &              │  ← bold headline = first element
│   PAM Classification                 │
│   | Source Standard maintains …      │
└──────────────────────────────────────┘
```

One title per zone. Five pages aligned. No clerical stutter.

