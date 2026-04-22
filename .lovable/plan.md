

## Homepage Hero — Subtle Brand Mark Scale-Down

A one-line typography refinement on `BriefingHero` (cover variant only). The "Source Standard" wordmark drops one type step so it reads as restrained institutional identity rather than statement-font branding. No structural changes, no copy changes, no other variants touched.

---

### Change

In `src/components/BriefingHero.tsx`, line 91 — the `brandMark` `<p>` className:

**From:**
```
text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px]
```

**To:**
```
text-[36px] sm:text-[52px] md:text-[68px] lg:text-[80px]
```

Roughly a 22–25% reduction across every breakpoint. Still clearly the dominant element in the stack — larger than the eyebrow, the H1 thesis line, and the supporting paragraph — but no longer theatrical at desktop sizes.

Margin below stays at `mb-8`, the hairline divider stays, the H1 mono treatment beneath it stays, the supporting paragraph and CTA row stay. The identity stack composition is preserved exactly.

### Files touched

- `src/components/BriefingHero.tsx` — single className edit on the `brandMark` paragraph.

### What stays the same

- Cover variant structure, scroll cue, navy surface, radial gradient, hero pattern.
- Chapter variant and default white variant — untouched.
- All copy on `Index.tsx`.
- Font family (`font-serif`), weight (400), tracking, and leading on the brand mark.

