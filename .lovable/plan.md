

## Sitewide Em Dash Removal Pass

Audit and rewrite every em dash (`—`) in user-facing copy across the site. Replace with the cleanest natural alternative (period, comma, colon, parentheses, or sentence rewrite) on a case-by-case basis. Not a blind swap.

### Scope

**~1,100 occurrences across ~70 files**, grouped into three tiers:

1. **Page copy (highest priority)** — visible prose on every page:
   - All `src/pages/*.tsx` (Index, About, Greenlist, VerifiedVendors, HowItWorks, Education, Governance, Accountability, Privacy, Terms, ForVendors, Apply, Contact, ReportConcern, MedicalAdvisory, AdvisorProfile, GreenlistProfile, VendorProfile, StatusDefinitions, HowToReadTheDirectory, VerificationDisclaimer, FAQ, all FAQ category pages, all Library article pages, LibraryEntry, NotFound)
   - Hero statements, section bodies, eyebrows, lead text, CTAs, list items, metadata strings, citation footers.

2. **Data files (high priority)** — copy rendered into pages:
   - `src/data/advisoryBoard.ts` (biographies, philosophy, credentials list)
   - `src/data/glossary.ts` (definitions)
   - `src/data/library.ts` (entry titles, descriptions, body sections)
   - `src/data/vendors.ts` (descriptions, notes)
   - `src/data/greenlist.ts` (alert details, scope notes)
   - `src/data/authorities.ts` if present.

3. **Component-level user-visible strings (medium priority)**:
   - Placeholder/empty values like `"—"` used in tables (`VerifiedVendors`, `GreenlistProfile`). These are visual placeholders, not prose. **Replace with `"--"` or `"N/A"`** to honor the rule. Default replacement: `"--"` (double hyphen) since it preserves the visual "no value" affordance without using an em dash.

### Out of scope (do NOT modify)

- JSDoc comments and code comments (`/** Section — centered ... */`). These are developer documentation, not site copy. Leaving them avoids needless churn and accidental breakage.
- UI library files under `src/components/ui/**`.

### Replacement rules

Apply per sentence, choose the cleanest fit:

| Original construction | Preferred fix |
|---|---|
| Appositive (`X — a Y — does Z`) | Commas: `X, a Y, does Z` |
| Definition/explanation (`X — the Y that...`) | Colon or period: `X: the Y that...` or split into two sentences |
| Range/connector in citation (`Foundational Series — What Is Compounding?`) | Comma: `Foundational Series, What Is Compounding?` |
| Credential list (`MD — Johns Hopkins`) | Comma: `MD, Johns Hopkins` |
| Emphatic aside (`... not a credential — it is a practice.`) | Period: `... not a credential. It is a recurring practice.` |
| Table empty-cell `"—"` | `"--"` |

Preserve meaning and authority. No filler words. No awkward hyphen swaps. Where a sentence becomes clunky, split it.

### Execution approach

1. Process files in batches by directory: `src/pages/` first (highest visibility), then `src/data/`, then user-facing strings inside `src/components/`.
2. For each file, read full content, rewrite every em dash occurrence using the rules above, write back.
3. Skip JSDoc blocks entirely (regex-detected `/**`).
4. Verify with a final `grep` for `—` across `src/` excluding `components/ui/` and JSDoc comment lines. Target: zero matches in user-facing copy.

### Outcome

All em dashes removed from rendered site copy. Voice stays authoritative and restrained. Sentence structure improves where the dash was hiding a weak construction. Code comments untouched. UI placeholders downgraded from `—` to `--` so tables still read as "no value."

