# Final Launch Language Audit

## Objective

Produce one canonical editorial + messaging audit for Source Standard as a single document. No site copy is changed in this pass. The output becomes the reference all future writing must follow.

## Deliverable

A new file: `.lovable/language-audit.md`

No changes to any `src/**` file. No changes to routes, components, or data. `tsgo` is not needed — this pass writes prose only.

## Scope

Every public route currently mounted in `src/App.tsx`, read in full:

- Home, About, Governance, Accountability, Advisory Board (+ profile), Partners, Contact
- Vendor Registry (+ vendor profile), Facility Records (+ facility profile)
- Apply, Report a Concern, How Verification Works, How to Read the Directory, Status Definitions, Verification Disclaimer
- Learn hub, Education (index + basics/guides/questions + article), News (index + article), FAQ (hub + 4 category pages)
- Library entries (all `Library*.tsx` pages) and publications index
- Terms, Privacy, Unsubscribe, 404
- Shared chrome: `SiteHeader`, `SiteFooter`, `BriefingHero`, `ArticleHeader`, `UtilityHeader`, `RecordHeader`, `PageHeader`, `EditorialBackLink`, filter pills, status chips, CTA blocks

Every heading, subhead, eyebrow, body paragraph, helper text, button label, chip label, sidebar metadata, empty state, and definition is in scope.

## Method

1. Read all pages and shared chrome in batches.
2. Extract every unique explanation for each core concept (verification, monitoring, independence, Facility Records, Vendor Registry, statuses, provider vs vendor vs facility vs pharmacy vs manufacturer).
3. Compare explanations across pages. Flag drift, duplication, contradiction, unintended regulatory/certification/endorsement implication, and tone breaks.
4. Categorize findings as Critical / Recommended / Optional per the rubric in the request.
5. Write the canonical messaging standard section last, derived from the strongest existing phrasings on the site rather than invented ones.

## Document structure

```text
.lovable/language-audit.md
├── 1. Executive summary
│     — overall state of the voice, top 5 risks, one-paragraph verdict
├── 2. Positioning check
│     — what Source Standard is / is not, drift instances found
├── 3. Terminology audit
│     — table: term · canonical definition · where used · inconsistencies · recommendation
│     — covers: provider, vendor, facility, pharmacy, manufacturer,
│       verification, verified, verification status, record, review,
│       monitoring, greenlisted, under review, suspended, removed,
│       public reference, independent verification
├── 4. Explanation audit
│     — per concept: current phrasings across pages, gaps, contradictions,
│       recommended single explanation
│     — concepts: why SS exists, what SS does, how verification works,
│       what verification means / does not mean, why Facility Records exist,
│       why Vendor Registry exists, why consumers should care,
│       why providers participate, why manufacturers appear,
│       what independence means, what monitoring means
├── 5. Page-by-page findings
│     — one subsection per public route
│     — each finding: Page · Current wording · Why it should change ·
│       Recommended direction · Severity (Critical / Recommended / Optional)
├── 6. Tone audit
│     — instances flagged as promotional, defensive, startup-oriented,
│       over-simplified, over-technical, repetitive, or off-voice
├── 7. Misleading-language register
│     — every phrase that could imply regulatory authority, certification,
│       product approval, medical advice, endorsement, guarantee,
│       lab ownership, or legal authority — with fix direction
├── 8. Consistency register
│     — button labels, chip labels, eyebrow patterns, sidebar metadata,
│       CTA phrasings, sentence-case vs title-case, punctuation of
│       separators, use of arrows, etc.
└── 9. Canonical Messaging Standard
      — Who Source Standard is
      — Why Source Standard exists
      — What Source Standard does
      — What Source Standard does not do
      — Canonical explanation of Verification
      — Canonical explanation of Facility Records
      — Canonical explanation of Vendor Registry
      — Canonical explanation of Independence
      — Canonical explanation of Monitoring
      — Voice + tone rules (sentence rhythm, forbidden words,
        preferred cadence, restraint principles)
      — Terminology reference card (one-line canonical definitions)
```

## Ground rules for the audit itself

- Recommend directions, not full rewrites, unless a phrase is short and a rewrite is the clearest way to convey the fix.
- Never invent new claims about what Source Standard does. When existing language is ambiguous, flag it and ask rather than assert a new meaning.
- Prefer surfacing the strongest existing phrasing on the site as the canonical version rather than authoring new voice from scratch.
- Do not recommend changes solely for variation. Consistency outranks novelty.
- Do not recommend visual, layout, or component changes. Language only.

## Explicitly out of scope

- Any edits to `src/**`, `public/**`, `index.html`, or data files
- Any new routes, components, or CSS
- SEO metadata rewrites (separate pass)
- Legal review of Terms / Privacy (flag risky phrasing but do not redraft)
- Educational article factual review (flag claims that need SME review; do not silently reword clinical statements)

## Approval gate

After you approve this plan, the next turn produces only `.lovable/language-audit.md`. Site copy revisions happen in a later, separately approved pass that works from this document.
