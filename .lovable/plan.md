# Fix: Registry & Facility text growing after typography pass

## What happened
In the previous pass I added `!important` to `font-size`, `line-height`, `font-weight`, `text-transform` on every `t-*` token. The intent was to lock visual consistency. The side effect is that any element which combined a `t-*` token with a pixel-tuned override (e.g. `text-[13px]`, `leading-[1.6]`, inline `style={{ fontSize: "13px" }}`) now snaps to the token's larger spec instead of the tuned value.

On the Vendor Registry and Facility (Greenlist) pages this shows up as:
- Summary strip body text growing (line-height jumps from `leading-[1.6]` override to the token's 1.75).
- Any element that combined `t-body-sm`/`t-label-sm` with a custom small size now renders at the token default.
- Vendor cards: in the same pass I retyped `VendorAuditCard` h3 from `text-[14px]` to `t-h3` (16px). On dense registry tiles the title is now visibly larger than before.

## Fix

### 1. Soften token authority — keep consistency, drop !important on size + line-height
Revert `!important` on `font-size`, `line-height`, and `font-weight` for the body and label tokens so authored overrides work again. Keep `!important` on `font-family` and `letter-spacing` (matches the file's original posture). Headings and the page-title scale keep their !important — those should not be overridable.

Tokens to soften:
- `t-body-md`, `t-body-sm`, `t-body-strong`, `.ss-body`
- `t-label-sm`, `t-utility-xs`, `t-micro`, `t-eyebrow-sm`, `.ss-eyebrow`
- `t-section-intro`, `t-body-lg`
- `t-h3`, `t-h4`, `.ss-card-title`
- `t-meta`, `t-meta-note`, `t-nav`, `.ss-card-meta`
- `t-numeric`, `t-button`
- `t-article-body`, `.prose-article p/li`

Keep `!important` on:
- `t-page-title` / `t-chapter-title` / `t-home-title` / `t-article-title` / `.ss-hero-title`
- `t-section-title-sm` / `t-section-title-md` / `.ss-section-title`
- `t-hero-lead`, `.ss-lead`

Result: tokens still define the canonical scale, but per-component pixel tuning (necessary for dense registry rows) is respected again.

### 2. Revert the one card-title resize that grew
`src/components/registry/VendorAuditCard.tsx` — restore the vendor card title to the pre-pass density:
- Use `t-body-strong` (14px, weight 600) instead of `t-h3` (16px).

Rationale: vendor cards live in a dense registry grid; the card title was deliberately 14px to fit the row. `t-body-strong` keeps it on a canonical token at the right size.

## Out of scope
- No changes to other registry components (rows, pills, summary strip beyond what the softened tokens already restore).
- No changes to headings or hero typography.
- No changes to the guardrail comment in `index.css`.

## Verification
After the change, the Vendor Registry and Facility (Greenlist) pages should render text at the same size as before the typography pass, while page-level headings/eyebrows continue to render at the locked institutional spec.
