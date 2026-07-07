# About Source Standard Page – Content Refinement

## Goal
Refocus the About page so it communicates who Source Standard is, why it exists, and what its role is — without describing internal verification mechanics.

**Guiding principle:** Show the mission. Protect the methodology.

## Scope
- **Single file:** `src/pages/About.tsx`
- **Only copy changes** — no structural, visual, component, import, routing, or dependency changes.
- All changes target local string constants and inline paragraph text. Existing components, layout, and styling remain exactly as-is.

## Changes by Section

### 1. Hero Description
Replace "supply-chain visibility" with "sourcing transparency" to maintain consistent language throughout the site.

### 2. Organizational Purpose (§3)
Simplify the body copy to focus on the broader mission:
- improving sourcing transparency
- creating trusted public-reference records
- increasing accountability
- helping consumers better understand sourcing claims

Remove references to:
- organizing evidence
- evaluating sourcing claims
- documenting supply-chain relationships
- maintaining evidence
- evaluating claims through evidence

Retain the "does not" boundary statements (not replacing physicians, regulators, pharmacists; not determining best treatments).

### 3. Market Context (CONTEXT array, §4)
Simplify the four clauses. Remove references to:
- facility and manufacturer relationships
- supply-chain documentation
- fragmented records

Focus on the broader transparency challenge: consumers often have limited visibility into vendor sourcing claims, making informed decisions difficult.

### 4. Operational Boundaries (§5)
No changes. This section is already well-positioned.

### 5. Who the Framework Serves (OBJECTIVES array, §6)
Simplify descriptions for each audience:
- **Consumers:** Remove references to facility relationships, supporting documentation, and evidence supporting claims. Focus on helping consumers understand sourcing transparency through a structured public-reference system.
- **Providers:** Remove references to supporting documentation and supply-chain accountability. Focus on providing a trusted, independent framework for demonstrating sourcing transparency.
- **Industry:** Maintain current emphasis on transparency and accountability without describing operational processes.

### 6. Framework Components (SCOPE array, §7)
Simplify each component description:
- **Vendor Registry:** Remove "review status" and "supporting documentation." Focus on public-reference records that improve transparency around vendor sourcing.
- **Facility Records:** Simplify to public-reference records relating to upstream organizations within the compounded therapy supply chain. Avoid describing the ecosystem or internal classifications.
- **Verification Framework:** Replace references to standards, review procedures, evidence requirements, and status criteria. Focus on the principles that guide the public-reference framework and verification standards.
- **Educational Resources:** Replace "documentation standards" with broader wording about educational materials explaining sourcing transparency, verification concepts, and public terminology.

### 7. Institutional Principles (PRINCIPLES array, §8)
Keep the overall 4-item structure.
Simplify Principle 3:
- From: "Status determinations are governed by defined standards and review procedures."
- To: "Status determinations are guided by consistent public standards."

### 8. Institutional Role (closing §9)
Simplify to reinforce mission rather than operational methodology.
Remove references to:
- organizing evidence
- evaluating sourcing claims
- maintaining public records

Focus on:
- improving sourcing transparency
- maintaining trusted public-reference records
- helping consumers better understand sourcing claims
- increasing accountability

Retain the boundary statement that Source Standard does not replace clinical judgment, regulatory oversight, or personal decision-making.

## Overall Direction
The page should answer four questions:
1. What is Source Standard?
2. Why does it exist?
3. Who does it serve?
4. What does it not do?

It should not explain internal review methodology, documentation workflows, evidence management, operational framework mechanics, or status determination methodology.

## Verification
Run `bun run build` to confirm the file compiles cleanly after copy changes.