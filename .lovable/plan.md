

## Footer Navigation Cleanup — Resource Library Column

Replace the article-level and dead links in the "Resource Library" footer column with broad, stable destinations that already exist in the routing layer.

### Current state (problematic)

The `Resource Library` column in `src/components/SiteFooter.tsx` contains:
- `Foundational Sourcing` → `/education#basics` (anchor doesn't resolve to a section on the rebuilt page)
- `Interpreting CoAs` → `/education/how-to-read-a-certificate-of-analysis` (article-level link)
- `Protocols` → `/education#guides` (dead anchor)
- `FAQ` → `/education#questions` (dead anchor)

### New footer logic

Replace with broad destinations only. All targets verified against `App.tsx` routes:

| Label | Route | Validity |
|---|---|---|
| Resource Library | `/education` | exists |
| Regulation | `/education#regulation` | resolves to §3 anchor on rebuilt hub |
| Clinical | `/education#clinical` | resolves to §4 anchor on rebuilt hub |
| Consumer Due Diligence | `/education#consumer` | resolves to §5 anchor on rebuilt hub |
| Common Inquiries | `/education#common-inquiries` | resolves to §6 anchor on rebuilt hub |

The three category anchors (`#regulation`, `#clinical`, `#consumer`) already exist as section IDs on the rebuilt Resource Library page (preserved during the recent rebuild). The Common Inquiries anchor (`#common-inquiries`) needs to be confirmed/added as a section ID — if the section doesn't carry that ID yet, the link target will be added to the §6 wrapper as part of this change.

### Files touched

- `src/components/SiteFooter.tsx` — replace the `Resource Library` column's `links` array with the five entries above. No structural/styling changes to the footer.
- `src/pages/Education.tsx` — verify §6 wrapper carries `id="common-inquiries"`; add if missing. No copy or layout changes.

### Out of scope

- Other footer columns (Registry, Standards, Governance) — untouched
- Footer layout, typography, and the legal/copyright block
- Routing changes
- Any new destination pages

