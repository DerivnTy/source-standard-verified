# Learn — Pre-Implementation Audit & Migration Map

Step 0 deliverable for Phase 1. No new routes are created until this map is approved.

**Scope:** every page under `/education/*` and `/library/*`.
**Out of scope (leave in place):** the four Tier D FAQ pages under `/library/faq/*`.

---

## 1. Inventory (current state)

### `/education/*` (4 routes)

| # | Route | File | Current purpose |
|---|---|---|---|
| E1 | `/education` | `Education.tsx` | Resource Library hub (search, filter, Core + Latest sections, Common Inquiries) |
| E2 | `/education/basics` | `EducationBasics.tsx` | "The Basics" — foundational entries landing |
| E3 | `/education/guides` | `EducationGuides.tsx` | Clinical & audit guides landing |
| E4 | `/education/questions` | `EducationQuestions.tsx` | Common questions landing |
| E5 | `/education/:slug` | `LibraryEntry.tsx` | Dynamic fallback for unmapped library slugs |

### `/library/*` (16 content + 4 hub/category routes)

Core Reference (`category: "core"`):

| # | Route | File | Title as shipped |
|---|---|---|---|
| L1 | `/library/what-is-compounding` | `LibraryWhatIsCompounding.tsx` | What Is Compounding? |
| L2 | `/library/what-are-peptides` | `LibraryWhatArePeptides.tsx` | Understanding Peptides |
| L3 | `/library/interpreting-coas` | `LibraryInterpretingCoAs.tsx` | Understanding Certificates of Analysis |
| L4 | `/library/dual-layer-difference` | `LibraryDualLayerDifference.tsx` | Understanding Vendor Verification & Facility Transparency |
| L5 | `/library/sterile-preparation-integrity` | `LibrarySterilePreparationIntegrity.tsx` | Why Supply Chains Matter in Compounded Therapy |
| L6 | `/library/aseptic-technique` | `LibraryAsepticTechnique.tsx` | Understanding Sterile Compounding |
| L7 | `/library/endocrinological-context` | `LibraryEndocrinologicalContext.tsx` | Understanding Compounded Hormone Therapy |
| L8 | `/library/why-vendor-transparency-matters` | `LibraryWhyVendorTransparencyMatters.tsx` | Why Vendor Transparency Matters |
| L9 | `/library/what-happens-during-a-verification-review` | `LibraryWhatHappensDuringVerificationReview.tsx` | What Happens During a Verification Review? |

Analysis & Publications (`category: "latest"` or analysis):

| # | Route | File | Title as shipped |
|---|---|---|---|
| L10 | `/library/analysis/2026-reclassification` | `LibraryAnalysis2026Reclassification.tsx` | Understanding Regulatory Changes in Compounding |
| L11 | `/library/analysis/questions-for-your-clinic` | `LibraryAnalysisQuestionsForYourClinic.tsx` | Questions to Ask About Sourcing |
| L12 | `/library/analysis/meaning-of-verification` | `LibraryAnalysisMeaningOfVerification.tsx` | Understanding Verification Scope |
| L13 | `/library/analysis/undocumented-sourcing-signs` | `LibraryAnalysisUndocumentedSourcingSigns.tsx` | Transparency Concerns & Documentation Gaps |

Category / index pages (no unique content — reuse `LibraryCategory` or `LibraryPublications`):

| # | Route | File | Notes |
|---|---|---|---|
| L14 | `/library/core` | `LibraryCategory.tsx` | Core category listing |
| L15 | `/library/latest` | `LibraryPublications.tsx` | Alias of publications |
| L16 | `/library/publications` | `LibraryPublications.tsx` | Publications listing |
| L17 | `/library/sourcing` | `LibraryCategory.tsx` | Empty category shell |
| L18 | `/library/clinical` | `LibraryCategory.tsx` | Empty category shell |
| L19 | `/library/consumer` | `LibraryCategory.tsx` | Empty category shell |

Out of scope (Tier D, keep as-is):
`/library/faq/legal-regulatory`, `/library/faq/clinical-safety`, `/library/faq/verification-process`, `/library/faq/consumer-diligence`.

---

## 2. Engine classification

**Rule of thumb:** timeless question → Education. Reports/interprets something that happened → News & Insights.

| Engine | Topic | Pages |
|---|---|---|
| Education | Basics | L1, L2 |
| Education | Choosing a Provider | L11, (new) trustworthiness, (new) transparent provider info |
| Education | Verification | L4, L8, L9, L12, L13 |
| Education | Sourcing & Manufacturing | L3, L5, L6, L7, (new) 503A, (new) 503B, (new) who manufactures, (new) compounded vs FDA-approved |
| News & Insights | Regulatory Updates | L10 |
| News & Insights | Industry News / Scientific Research / Source Standard Updates / Editorial | — (none migrated in Phase 1 beyond L10) |

---

## 3. Disposition & migration map

Legend: **R&R** = retain & rewrite into new template · **Merge** · **Retire** (301) · **Move** · **Create**

### Education engine → `/learn/education/:slug`

| From | Disposition | To |
|---|---|---|
| `/library/what-is-compounding` (L1) | R&R | `/learn/education/what-is-a-compounded-medication` |
| `/library/what-are-peptides` (L2) | R&R | `/learn/education/what-are-peptides` |
| `/library/interpreting-coas` (L3) | R&R | `/learn/education/how-to-read-a-certificate-of-analysis` |
| `/library/dual-layer-difference` (L4) | Merge → into "What does Verified mean?" as a supporting section | `/learn/education/what-does-verified-mean` |
| `/library/sterile-preparation-integrity` (L5) | R&R (retitle to sourcing frame) | `/learn/education/why-does-sourcing-matter` |
| `/library/aseptic-technique` (L6) | R&R | `/learn/education/what-is-sterile-compounding` |
| `/library/endocrinological-context` (L7) | R&R | `/learn/education/what-is-compounded-hormone-therapy` |
| `/library/why-vendor-transparency-matters` (L8) | Merge → into "What information should a transparent provider share?" | `/learn/education/what-information-should-a-transparent-provider-share` |
| `/library/what-happens-during-a-verification-review` (L9) | R&R | `/learn/education/what-happens-during-a-verification-review` |
| `/library/analysis/questions-for-your-clinic` (L11) | R&R (reclassify Education, not Analysis) | `/learn/education/what-should-i-ask-my-provider` |
| `/library/analysis/meaning-of-verification` (L12) | Primary source for merge target | `/learn/education/what-does-verified-mean` |
| `/library/analysis/undocumented-sourcing-signs` (L13) | R&R | `/learn/education/how-do-i-know-if-a-provider-is-trustworthy` |

Education pages to **create** (gap analysis — no existing source):

| Create | To |
|---|---|
| What is a 503A pharmacy? | `/learn/education/what-is-a-503a-pharmacy` |
| What is a 503B outsourcing facility? | `/learn/education/what-is-a-503b-outsourcing-facility` |
| Who manufactures compounded medications? | `/learn/education/who-manufactures-compounded-medications` |
| What's the difference between compounded and FDA-approved medications? | `/learn/education/compounded-vs-fda-approved` |
| What does Greenlisted mean? | `/learn/education/what-does-greenlisted-mean` |

### News & Insights engine → `/learn/news/:slug`

| From | Disposition | To |
|---|---|---|
| `/library/analysis/2026-reclassification` (L10) | R&R into News template (dated) | `/learn/news/2026-compounding-reclassification` |

No net-new News posts required in Phase 1 beyond L10.

### Hubs / category shells → Retire

| From | Disposition | 301 target |
|---|---|---|
| `/education` (E1) | Retire (replaced by Learn hub) | `/learn` |
| `/education/basics` (E2) | Retire | `/learn/education#basics` |
| `/education/guides` (E3) | Retire | `/learn/education` |
| `/education/questions` (E4) | Retire | `/learn/education` |
| `/education/:slug` (E5) | Retire (dynamic fallback) | `/learn/education` (unmatched slugs) or specific new slug when known |
| `/library/core` (L14) | Retire | `/learn/education` |
| `/library/latest` (L15) | Retire | `/learn/news` |
| `/library/publications` (L16) | Retire | `/learn/news` |
| `/library/sourcing` (L17) | Retire | `/learn/education#sourcing-and-manufacturing` |
| `/library/clinical` (L18) | Retire | `/learn/education#verification` |
| `/library/consumer` (L19) | Retire | `/learn/education#choosing-a-provider` |

### Kept as-is (Tier D, out of scope)

`/library/faq/legal-regulatory`, `/library/faq/clinical-safety`, `/library/faq/verification-process`, `/library/faq/consumer-diligence`.

---

## 4. New routes to be created (after approval)

Hubs:
- `/learn`
- `/learn/education`
- `/learn/news`

Education articles (12 total): 7 R&R + 5 new + 1 merge target that consolidates L4/L8/L12.

News posts (1 total): L10.

---

## 5. Redirect list (301s in one place)

```
/education                                              → /learn
/education/basics                                       → /learn/education#basics
/education/guides                                       → /learn/education
/education/questions                                    → /learn/education
/education/*                                            → /learn/education        (fallback for E5)
/library/core                                           → /learn/education
/library/latest                                         → /learn/news
/library/publications                                   → /learn/news
/library/sourcing                                       → /learn/education#sourcing-and-manufacturing
/library/clinical                                       → /learn/education#verification
/library/consumer                                       → /learn/education#choosing-a-provider
/library/what-is-compounding                            → /learn/education/what-is-a-compounded-medication
/library/what-are-peptides                              → /learn/education/what-are-peptides
/library/interpreting-coas                              → /learn/education/how-to-read-a-certificate-of-analysis
/library/dual-layer-difference                          → /learn/education/what-does-verified-mean
/library/sterile-preparation-integrity                  → /learn/education/why-does-sourcing-matter
/library/aseptic-technique                              → /learn/education/what-is-sterile-compounding
/library/endocrinological-context                       → /learn/education/what-is-compounded-hormone-therapy
/library/why-vendor-transparency-matters                → /learn/education/what-information-should-a-transparent-provider-share
/library/what-happens-during-a-verification-review      → /learn/education/what-happens-during-a-verification-review
/library/analysis/2026-reclassification                 → /learn/news/2026-compounding-reclassification
/library/analysis/questions-for-your-clinic             → /learn/education/what-should-i-ask-my-provider
/library/analysis/meaning-of-verification               → /learn/education/what-does-verified-mean
/library/analysis/undocumented-sourcing-signs           → /learn/education/how-do-i-know-if-a-provider-is-trustworthy
```

All redirects implemented client-side via React Router `<Navigate replace>` since Lovable hosting serves the SPA fallback (no server-level 301 layer available). Sitemap and canonicals will point at the new URLs only.

---

## 6. Open decisions before build

1. **Confirm the 3 merges** (L4→Verified, L8→Transparent-provider, L12→Verified). If any should stay standalone, note which.
2. **L5 → "Why does sourcing matter?"** — the current page leans sterile-prep. Confirm the reframe, or split off a separate `/learn/education/what-is-sterile-compounding` and keep L6 there instead. Current map merges the sterile-prep angle into L6.
3. **News category taxonomy** — Phase 1 only migrates one post (L10) into "Regulatory Updates". Confirm the five news categories (Industry / Regulatory / Scientific / Source Standard / Editorial) as the shipped set, or trim to what's used now and grow later.
4. **`/education/:slug` catchall** — retire fully, or map any known legacy slugs individually first? Recommend full retire to `/learn/education`.

Approve the map (or edit inline) and I'll build Steps 1–5.
