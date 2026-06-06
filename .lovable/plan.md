## Goal
Replace the hardcoded `5583` value for "Total Indexed" in `VerifiedVendors.tsx` with a dynamic count computed from `vendors.length`, so new vendor additions are automatically reflected.

## Change
In `src/pages/VerifiedVendors.tsx`, line 219:
```tsx
{ label: "Total Indexed", value: 5583 },
```
becomes:
```tsx
{ label: "Total Indexed", value: vendors.length },
```

No other changes required.