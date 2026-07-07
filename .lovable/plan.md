Revise the homepage copy on `src/pages/Index.tsx` to shift from operational detail to mission-driven messaging. All changes below incorporate the approved wording revisions.

**Guiding principle:** Show the mission. Protect the mechanism.

---

**1. Hero meta strip**
Change `"Documentation-first review"` → `"Independent verification"`.

**2. Mission statement (new section immediately below hero)**
Add a new white-background section between the hero and the Problem section containing:
> "Consumers increasingly rely on sourcing claims they cannot independently verify. Source Standard exists to improve transparency by providing independent verification and factual public-reference records that help make those claims more transparent."

Style it as a single centered paragraph inside the standard page shell, using the same `.home-lead` typography as other section intros.

**3. Independence statement (new, placed within the page)**
Add a short trust statement:
> "Source Standard is an independent verification organization. We do not manufacture, prescribe, or sell therapies. Our role is to provide objective, documentation-based verification through a public reference system."

Placement: after the Mission statement, styled as a compact card or inset within the same section, maintaining visual hierarchy.

**4. Problem Section (§2 — "Claims are not verification")**
Replace the current body copy with:
> "Compounded therapy vendors make sourcing and quality claims every day. Source Standard evaluates those claims through a structured verification framework and publishes factual verification records designed to distinguish supported claims from unsupported claims."

**5. How Source Standard Works (§3)**
Update the `howItWorks` array:
- Step 1 — Keep as-is: `"Map the market."` / `"Identify and maintain records for compounded therapy vendors and compounding facilities operating throughout the supply chain."`
- Step 2 — Replace description with: `"Review documentation and available evidence supporting vendor sourcing claims."`
- Step 3 — Replace description with: `"Maintain public verification records through ongoing review and status updates."`

**6. Registry Section (§4)**
Replace the body copy with:
> "The Source Standard registry tracks vendors and compounding facilities within a unified public-reference system. Vendor records focus on sourcing transparency and facility relationships. Facility records reflect current verification status and recognized upstream sources within the Source Standard framework."

**7. Registry Fields (§5)**
Update `registryFields`:
- "Verification status", "Vendor type", "Therapy category" — keep as-is.
- "Facility relationships" description — replace with: `"Recognized upstream sources and current verification status."`

**8. Foundational Reference / Facility Standards (§7 `basics` array)**
- "Facility Standards" subtitle — replace with: `"Learn how upstream sources are recognized within the Source Standard framework."`
- "Verification Framework" subtitle — replace with: `"Learn how the Source Standard Verification Framework is structured and how verification statuses are defined."`
- "Status Definitions" — keep as-is.

**9. Governance Section (§8)**
Update the `governanceLinks` descriptions:
- Advisory Board — keep as-is.
- Verification Framework link — replace with: `"The standards that govern verification and status designations throughout the registry."`
- Status Definitions — keep as-is.

**10. Function of the framework (§6 `whyMatters` array)**
- "For consumers" — keep as-is.
- "For providers" — replace with: `"A verification pathway for clinics, telehealth providers, and wellness businesses seeking to demonstrate sourcing transparency."`
- "For the industry" — replace with: `"A centralized public reference layer that improves transparency across the compounded therapy market."`

**Out of scope:** No visual design changes, no layout changes, no new components. Only copy updates within the existing structure.