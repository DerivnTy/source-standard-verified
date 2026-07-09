Global eyebrow cleanup

Problem
Eyebrows above hero/page titles are too large (12px), too close to the title (20px), and visually compete with the heading instead of reading as quiet metadata.

Goal
Shrink and space every shared eyebrow so it feels like editorial metadata, not part of the headline. Do not change copy, colors, fonts, layout, or page structure.

Files to change
1. PageHeader.tsx
2. ArticleHeader.tsx
3. RecordHeader.tsx
4. UtilityHeader.tsx

Standard for hero/page eyebrows
- font-size: 10px (was 12px)
- letter-spacing: 0.14em (unchanged)
- color: rgba(255,255,255,0.6) (unchanged)
- margin-top from eyebrow to title: 22px (was 20px)
- still uppercase mono

Standard for section/card eyebrows
- ArticleSection callout kind: already 10px / 0.12em / 8px margin — leave as-is
- ArticleSection card ordinal: already 11px / 0.08em / 6px margin — leave as-is
- These already meet the "smaller section eyebrow" target.

Verification
Check at 390px mobile and desktop:
- /verification-disclaimer (PageHeader)
- /privacy (PageHeader)
- /terms (PageHeader)
- /governance (PageHeader or RecordHeader)
- /learn/education/* (ArticleHeader category path)
- /learn/news/* (ArticleHeader category path)
- /learn/faq (PageHeader or UtilityHeader)

Confirm every eyebrow now reads as quiet metadata and no longer crowds the heading. Spacing is consistent across every page type.