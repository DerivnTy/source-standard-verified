## Plan

Update only `src/pages/VendorProfile.tsx` so the top-right profile-card status uses an explicit Vendor Profile status renderer instead of the current shared color/label branch.

### What will change
1. Isolate the top-right status UI into a local helper such as `renderProfileStatus(status)` inside `VendorProfile.tsx`.
2. Make the `verified` branch return the approved inline status group:
   - `VERIFIED`
   - Source Standard navy `#001021`
   - `VerifiedShieldMark` inline SVG on the right
   - same `inline-flex`, gap, sizing, and vertical offset pattern as the registry preview card
3. Keep `unverified`, `under-review`, `suspended`, and `removed` behavior visually unchanged.
4. Remove `verified` from relying on the generic profile status color map for this top-right status so no legacy green treatment can win on this page.

### Findings from inspection
- The active route `/directory/:slug` renders `VendorProfile` directly from `src/App.tsx`.
- The visible top-right profile status is rendered in `src/pages/VendorProfile.tsx` inside the header branch around the current `<span>` status wrapper.
- The only shared icon involved is `src/components/registry/VerifiedShieldMark.tsx`.
- No separate profile-only `StatusBadge`, `ProfileStatus`, or helper component is currently controlling that specific top-right status.

### Technical details
- Touch file: `src/pages/VendorProfile.tsx`
- Reuse existing icon: `src/components/registry/VerifiedShieldMark.tsx`
- Preserve:
  - card layout
  - field grid
  - spacing
  - header/footer
  - routes/data
  - Vendor Registry preview cards
- Implementation shape:

```text
renderProfileStatus(status)
  verified      -> explicit navy inline-flex text + shield
  unverified    -> existing red text only
  under-review  -> existing amber text only
  suspended     -> existing muted text only
  removed       -> existing muted text only
```

### Acceptance check
After implementation, the top-right status on `/directory/northline-health-hormone-institute` will be controlled by the dedicated verified branch in `VendorProfile.tsx`, ensuring it renders as `VERIFIED [shield]` and cannot fall back to any legacy green verified styling.