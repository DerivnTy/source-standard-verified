Plan: Redesign "How Verification Works" page

Goal: Transform the current text-heavy /how-it-works page into a premium, institutional explanation page with better whitespace, clearer typography hierarchy, and a visual callout, while keeping the dark navy hero and all existing content.

Current state verified
- File: src/pages/HowItWorks.tsx
- Existing components: BriefingHero, PageSection, ProcessSteps, EditorialBackLink
- Design system: Inter headings, navy hero, semantic HSL tokens, radius = 1.25rem
- The current page has three sections: definition, protocol, and "What Verification Means"
- The long disclaimer at the bottom of the page will be promoted to a proper informational callout

Scope: presentation-only changes to /how-it-works and its supporting components. No new data, no route changes, no backend work.

----

1. Hero redesign

File: src/pages/HowItWorks.tsx / src/components/BriefingHero.tsx

- Increase hero vertical padding to give the title and subtitle more breathing room (target: ~50% more top/bottom than current chapter variant).
- Constrain the hero text block to a narrower width (~64ch for title, ~52ch for subtitle) so the headline does not span the full mobile width.
- Reduce the subtitle font size and weight so it reads as supporting copy, not a secondary headline.
- Keep the navy background and the subtle radial gradient/HeroPattern; do not change the color.
- Consider adding a small eyebrow label above the H1 (e.g., "Public Guide") for hierarchy, but keep it minimal.

2. Intro content restructuring

File: src/pages/HowItWorks.tsx

- Split the current two-paragraph intro into two distinct sections:
  a) "What Verification Is" — definition paragraph
  b) "What Verification Is Not" — the transparency-signal paragraph
- Use two separate PageSection instances with consistent spacing between them.
- Increase whitespace between paragraphs and around each section.
- Increase body line height slightly (from 1.65 to ~1.75).
- Limit paragraph width to a reading-friendly measure (max-w-reading or ~64ch).
- Remove bold styling except for the key terms "Verification" and "Verified".
- Apply `.t-body-md` or a refined body token instead of inline styles.

3. New informational callout

File: src/components/InfoCallout.tsx (new) + src/pages/HowItWorks.tsx

- Replace the bottom-of-page disclaimer paragraph with a dedicated `InfoCallout` component.
- Background: subtle light blue/gray using existing semantic tokens (e.g., `hsl(var(--under-review-soft))` or `hsl(var(--surface-muted))`).
- No border that resembles an input field; use a 1px hairline only if needed for contrast, or none.
- Add a small `Info` icon from lucide-react at the top-left of the callout.
- Increase padding to match the site radius (rounded-xl / 1.25rem).
- Text should be left-aligned, slightly smaller than body, and read as a notice, not editable content.
- Position the callout after the intro sections and before the Protocol section, so it acts as a credibility gate before the process.

4. Protocol section redesign

File: src/pages/HowItWorks.tsx + src/components/system/ProcessSteps.tsx

- Add more vertical spacing before the Protocol section so the transition from intro/callout feels intentional.
- Replace the uppercase mono "Protocol" label with a more refined, smaller section eyebrow using `.t-eyebrow-sm` styling.
- Wrap the protocol content in a subtle visual container (soft background or hairline card) to separate it from the surrounding text sections.
- Increase spacing between each step in ProcessSteps (target ~24–28px between steps).
- Ensure step titles and descriptions have consistent alignment and hierarchy.
- Keep the check-gutter rail but allow more vertical breathing room.

5. "What Verification Means" section cleanup

File: src/pages/HowItWorks.tsx

- Keep the two-column "Means / Does Not Mean" definition lists.
- Tighten the label spacing and ensure the section title uses the same heading token as the rest of the page.
- Remove the bottom disclaimer paragraph (it moves to the InfoCallout).
- Ensure consistent internal spacing between list items.

6. Global spacing and typography consistency

File: src/pages/HowItWorks.tsx + minor tokens if needed

- Apply consistent section padding across all page sections; use PageSection tokens rather than one-off overrides.
- Ensure every section has a clear heading + body rhythm.
- Audit mobile widths: no paragraph should stretch to the full 100% mobile width; cap at reading width.
- Use existing semantic tokens only (no raw hex colors). Backgrounds, borders, and text must use CSS variables.
- Final check: verify the page still feels like a single scrolling narrative, not fragmented blocks.

7. Verification

- Build the app and capture mobile + desktop screenshots of /how-it-works.
- Confirm: no horizontal overflow, no color hardcoding, no console errors, and all content remains readable.

Out of scope
- No new routes, no data changes, no backend or auth changes.
- No changes to other pages unless shared component fixes are required.
- No changes to navigation or footer.