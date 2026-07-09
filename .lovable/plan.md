# Editorial Navigation Cleanup

Move the back link out of every long-form page's header and standardize it as a quiet editorial footer link at the bottom.

## New shared component

Create `src/components/EditorialBackLink.tsx`:

- Props: `to: string`, `label: string` (default `"Back to Home"`)
- Renders a single `<Link>` inside a `<nav>` wrapper, centered inside `w-reading-wide` on `page-shell`.
- Styling matches the existing `BackToLibrary` in `LearnArticleTemplate.tsx`:
  - `font-mono uppercase text-muted-foreground hover:text-foreground transition-colors group`
  - `fontSize: 11px`, `letterSpacing: 0.08em`
  - Arrow `←` in a `<span aria-hidden>` that nudges left on hover
  - No border, no button chrome
- Spacing: `marginTop: 48px`, `marginBottom: 80px`

The existing `BackToLibrary` inside `LearnArticleTemplate.tsx` is replaced by this component (used with `label="Back to Learn Library"` and `to="/learn"`).

## Header changes (`src/components/ArticleHeader.tsx`)

- Remove the top back link from BOTH rendering paths (category masthead and backward-compatible card path).
- Keep the `backHref` / `backLabel` props in the type signature but mark them as ignored/deprecated so existing callers don't break; they will no longer render anything.
- Page must open with: Category → Title → Standfirst → hairline → content. No exit link before the article begins.

## Pages that get the new footer link

For each page below, remove the pre-header back link (already handled by `ArticleHeader` change) and render `<EditorialBackLink />` as the last child of the page, after the final section.

Default footer target is `to="/"` with `label="Back to Home"` unless noted.

| Page | Footer target |
|---|---|
| `src/pages/Terms.tsx` | `/` – "Back to Home" |
| `src/pages/Privacy.tsx` | `/` – "Back to Home" |
| `src/pages/VerificationDisclaimer.tsx` | `/` – "Back to Home" |
| `src/pages/Governance.tsx` | `/` – "Back to Home" |
| `src/pages/Accountability.tsx` | `/about` – "Back to About" (currently uses this backLabel; keep the semantic target) |
| `src/pages/MedicalAdvisory.tsx` | `/` – "Back to Home" |
| `src/pages/About.tsx` | `/` – "Back to Home" |
| `src/pages/HowItWorks.tsx` | `/` – "Back to Home" |
| `src/pages/StatusDefinitions.tsx` | `/about` – "Back to About" |
| `src/pages/Partners.tsx` | `/` – "Back to Home" |
| `src/pages/Contact.tsx` | `/` – "Back to Home" |
| `src/pages/ForVendors.tsx` | `/` – "Back to Home" |
| `src/pages/ReportConcern.tsx` | `/` – "Back to Home" (currently "Back to Registry" at the top; institutional page → home is correct per spec) |

For any page that doesn't currently use `ArticleHeader` (e.g. Governance, MedicalAdvisory, About, HowItWorks, Partners, Contact, ForVendors — verified they have no existing back link), only the footer link is added; nothing else changes.

## Learn / article templates (`src/components/learn/LearnArticleTemplate.tsx`)

- `EducationArticleTemplate` and `NewsArticleTemplate` already render `<BackToLibrary />` at the end. Replace that local component with `<EditorialBackLink to="/learn" label="Back to Learn" />` so it uses the shared primitive and the "Back to Learn" wording specified.
- Because `ArticleHeader` no longer renders a top back link, the pre-article exit link disappears from every Learn article as well — matching the spec ("← Back to Learn for Learn articles" at the bottom only).

## Out of scope

- Library detail pages (`src/pages/Library*.tsx`) and profile pages (`VendorProfile`, `GreenlistProfile`, `AdvisorProfile`) — these are registry/reference records with their own established navigation pattern, not long-form institutional documents. Not part of this pass.
- No design token, color, typography, copy (other than back-link labels), route, or data-model changes.

## Verification

- `bunx tsgo --noEmit`
- Headless screenshot spot-check at 390×844 for `Terms`, `Privacy`, `Governance`, `About`, `ReportConcern`, and one Learn article, confirming:
  - Page opens with Category / Title / Standfirst (no top back link).
  - Page ends with a quiet `← BACK TO HOME` (or `BACK TO LEARN`) with ~48px top / ~80px bottom breathing room.
