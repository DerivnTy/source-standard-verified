## Plan

1. Update only the actual Vendor Profile header status renderer in `src/pages/VendorProfile.tsx`.
   - Target the top-right status element inside the white profile card on `/directory/:slug`.
   - Do not touch the Vendor Registry list cards, filters, routes, layout, or data.

2. Replace the verified branch with the approved registry treatment.
   - Render `VERIFIED` in Source Standard navy `#001021`.
   - Render the same inline `VerifiedShieldMark` SVG immediately to the right.
   - Match the registry preview card’s spacing, icon sizing, and vertical alignment.
   - Ensure the profile verified branch bypasses any legacy green treatment or shared verified color token.

3. Leave all non-verified profile states unchanged.
   - Keep `UNVERIFIED` red with no icon.
   - Keep `UNDER REVIEW` unchanged.
   - Preserve the existing card position, field grid, spacing, typography scale, and surrounding layout.

4. Verify the actual profile route after the change.
   - Check `/directory/northline-health-hormone-institute` specifically.
   - Confirm the visible top-right status reads `VERIFIED` with the shield icon to its right.
   - Confirm no green verified text remains on the actual profile page.

## Technical details

- Primary file: `src/pages/VendorProfile.tsx`
- Reused asset/component: `src/components/registry/VerifiedShieldMark.tsx`
- Implementation approach: replace the rendered verified JSX branch in the profile card header with the same inline-flex pattern used by the approved registry preview treatment, rather than relying on generic status-color logic.
- Scope guardrails:
  - No changes to `VendorRow` or registry preview cards
  - No changes to data, search, filters, routes, footer, header, or global styling
  - No image asset loading for the shield