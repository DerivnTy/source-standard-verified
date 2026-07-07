## Verified Vendors — Copy Refinements

### Goal
Update public-facing copy on the Verified Vendors page to communicate verification outcomes and framework positioning without revealing internal operational details.

### Changes

1. **"Verified vs. Unverified" section**
   - Replace the Verified paragraph with:
     > Verified records reflect vendor information that has been reviewed by Source Standard within a defined scope and at a defined point in time. Verification status is based on the evidence available during that review.
   - Replace the Unverified paragraph with:
     > Unverified records have not yet met the requirements for Verified status within the Source Standard framework.

2. **"Registry Framework" description**
   - Replace:
     > Source Standard helps consumers evaluate sourcing claims through reviewed evidence.
   - With:
     > Source Standard provides a public-reference framework that helps consumers better understand vendor sourcing transparency.

3. **Button label**
   - Rename "View Verification Protocol" to "View Verification Framework".

4. **Helper text near Verification Status filters**
   - Add directly beneath the Verification Status filter pills:
     > Status reflects Source Standard's review within a defined scope and at a defined point in time.

### Scope
- File: `src/pages/VerifiedVendors.tsx`
- No layout, design, search, or registry structure changes.
- Pure copy replacements and one small helper text addition.