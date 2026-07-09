Audit findings
- EditorialBackLink currently adds 32px top + 56px bottom padding.
- ArticleSection variants (prose/callout/card) have no bottom padding, so ArticleSection-based pages already have ~32px of gap before the back link.
- PageSection adds symmetric 28px bottom padding (20px when compact), creating 48–60px of gap before the back link on PageSection-based pages.
- Contact.tsx last section uses `py-12 md:py-16`, adding 48–64px of bottom padding before the back link.

Changes

1. EditorialBackLink spacing
   File: `src/components/EditorialBackLink.tsx`
   - Change `paddingTop` from `32px` to `24px`.
   - Change `paddingBottom` from `56px` to `40px`.

2. Contact page bottom padding
   File: `src/pages/Contact.tsx`
   - The final `<section className="container-wide py-12 md:py-16">` carries too much bottom padding.
   - Change to asymmetric padding: retain top padding, reduce bottom padding to `pb-6 md:pb-8` so the back link sits closer to the form without touching it.

3. PageSection-based pages — remove bottom padding from the last section
   Files:
   - `src/pages/Governance.tsx` — last `PageSection` (`id="deeper"`)
   - `src/pages/About.tsx` — last `PageSection` (`id="looking-ahead"`)
   - `src/pages/HowItWorks.tsx` — last `PageSection` (`id="meaning"`)

   To do this safely, add a minimal `pb` prop override to `PageSection`:
   - File: `src/components/system/PageSection.tsx`
   - Add optional `pb?: string` prop.
   - When `pb` is provided, use it for `paddingBottom` instead of `padY`.
   - Then set `pb="0"` on the last `PageSection` of each of the three files above.

   This leaves all other PageSection usages unchanged and avoids a global rhythm shift on consumer pages.

4. ArticleSection-based pages
   Files: `src/pages/VerificationDisclaimer.tsx`, `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/pages/Accountability.tsx`, `src/pages/StatusDefinitions.tsx`, `src/pages/ReportConcern.tsx`
   - No changes needed. ArticleSection variants have no bottom padding; after the EditorialBackLink fix the gap from final content to back link becomes ~24px, which is within target.

Verification
- Preview at 390px on:
  - `/verification-disclaimer`
  - `/privacy`
  - `/terms`
  - `/governance`
- Confirm the final section, back link, and footer read as one continuous ending with no dead zone.