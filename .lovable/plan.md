

## Remove template pages and clean up references

A small structural cleanup to remove both template scaffolding pages from the app, drop their routes, scrub footer/nav links, and re-point any internal references to the live registry pages.

### Files to delete

- `src/pages/GreenlistEntryTemplate.tsx`

(`src/pages/VendorProfileTemplate.tsx` was already deleted in a prior pass — only its redirect route remains.)

### `src/App.tsx` — remove routes + import

- Remove import: `import GreenlistEntryTemplate from "./pages/GreenlistEntryTemplate.tsx";`
- Remove route: `<Route path="/templates/greenlist-entry" element={<GreenlistEntryTemplate />} />`
- Remove route: `<Route path="/templates/vendor-profile" element={<Navigate to="/verified-vendors" replace />} />`
- Remove the now-unused `Navigate` import from `react-router-dom` if no other route uses it (only `BrowserRouter`, `Route`, `Routes` will remain).

Rationale: with the pages gone, hitting `/templates/greenlist-entry` or `/templates/vendor-profile` will fall through to the existing `<Route path="*" element={<NotFound />} />`. No further redirect is needed since the cleanup also removes every internal link pointing at those paths.

### `src/components/SiteFooter.tsx` — remove footer link

In the `Reference & Templates` column, remove:
```
{ to: "/templates/greenlist-entry", label: "Greenlist entry template" },
```

The column keeps `FAQ` and `Contact`. Rename the column from `Reference & Templates` → `Reference` so the heading matches its remaining contents.

### `src/components/SiteHeader.tsx` — verify

Already checked in prior context: header `nav` array does not reference `/templates/*`. No change required. The plan still confirms a re-read during implementation to be safe.

### Internal references — sweep and re-point

Search the codebase for any remaining links to the two template paths and re-point them to live registry pages:

- Any `to="/templates/greenlist-entry"` → `to="/greenlist"`
- Any `to="/templates/vendor-profile"` → `to="/verified-vendors"`
- Any `href="/templates/greenlist-entry"` → `href="/greenlist"`
- Any `href="/templates/vendor-profile"` → `href="/verified-vendors"`

Likely candidates to inspect (based on prior FAQ / Read deeper / How-It-Works overhauls): `src/pages/FAQ.tsx`, `src/pages/HowItWorks.tsx`, `src/pages/HowToReadTheDirectory.tsx`, `src/pages/ForVendors.tsx`, `src/pages/Greenlist.tsx`, `src/pages/VerifiedVendors.tsx`, `src/pages/Index.tsx`. If a "Read deeper" or inline link to a template exists, it gets re-pointed; if the page already links only to live registry pages, no change.

Also scan for the string `template` in any user-facing copy (footer/nav/CTAs) and remove or rephrase if it implies a "Coming Soon" or scaffolding link.

### Files touched

- Deleted: `src/pages/GreenlistEntryTemplate.tsx`
- Edited: `src/App.tsx` (remove import + 2 routes; drop unused `Navigate` import)
- Edited: `src/components/SiteFooter.tsx` (remove template link; rename column to `Reference`)
- Edited: any page files surfaced by the reference sweep that link to `/templates/*`

### What stays the same

All other routes, components, design tokens, and the `NotFound` fallback. No new pages, no new components, no copy changes outside the footer column rename and the re-pointed links.

