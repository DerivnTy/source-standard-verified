

## Education Page — "See more" sections + spacing polish

Add a quiet "See more" affordance to each of the three main sections on `/education` so visitors can drill into a fuller index for that topic, and tighten the spacing/visual rhythm of the page.

### What changes

**1. New "See all" index pages (one per section)**
Three new lightweight index routes that show the full list for that lane in the same simplified row style used on `/education`:

- `/education/basics` — shows all foundational/intro entries from `librarySeries` (not just the curated three on the landing page).
- `/education/guides` — shows the full `libraryGuides` list with "Reviewed by Medical Advisory Board" attribution.
- `/education/questions` — shows the full `libraryFaqs` list, grouped by the original FAQ groups (legality, verification, methodology, due-diligence) rather than the four conversational buckets used on the landing page.

Each of these pages reuses `PageHeader` + `Section` + the existing `SimpleRow` / accordion patterns. They have a small "← Back to Learn" link at the top. No new components beyond what already exists.

**2. "See more" links on the landing page**
At the bottom of each of the three main sections on `/education`, add a single right-aligned quiet link:

- The Basics → `See all foundational reads →` (goes to `/education/basics`)
- Practical Guides → `See all clinical guides →` (goes to `/education/guides`)
- Common Questions → `See all questions →` (goes to `/education/questions`)

Styled as a small underlined text link in the existing muted tone — no buttons, no cards, no chrome.

**3. Landing page content trim**
To make "See more" meaningful, the landing page shows a curated subset rather than everything:

- **The Basics**: show the intro-level entries only (already filtered by `level === "intro"`) — current behavior, no change.
- **Practical Guides**: show the first 4 guides instead of the full list. The rest live on `/education/guides`.
- **Common Questions**: keep the four conversational buckets, but cap each bucket at the top 2 questions. The full grouped FAQ lives on `/education/questions`.

**4. Spacing + visual cleanup on `/education`**
- Increase breathing room between section headings and their row lists (current `mt-6` → `mt-8`).
- Add a small amount of extra space above each "See more" link so it sits clearly below the list rather than crowding it.
- Tighten the gap between the section heading and its one-line description (`mt-2` stays, but the description gets a slightly smaller max-width so it doesn't run wide on desktop).
- The "Start here" three-up grid: add a touch more internal padding inside each card so the title and description don't feel cramped at the current 1034px viewport.
- The "Jump to" anchor row: reduce visual weight slightly (lighter border, smaller text) so it reads as a quiet utility rather than a second nav.
- The "Coming soon" and "About this library" footer blocks: collapse them visually closer together so the page ends cleanly instead of trailing off.

### Files touched
- `src/pages/Education.tsx` — add "See more" links per section, trim Practical Guides to 4 and FAQ buckets to 2 per bucket, polish spacing.
- `src/pages/EducationBasics.tsx` *(new)* — full index of foundational reads.
- `src/pages/EducationGuides.tsx` *(new)* — full index of clinical guides.
- `src/pages/EducationQuestions.tsx` *(new)* — full FAQ grouped by original FAQ groups.
- `src/App.tsx` — register the three new routes (`/education/basics`, `/education/guides`, `/education/questions`).

### Routing note
The existing `/education/:slug` route handles individual entry pages. The three new index routes use static paths (`/basics`, `/guides`, `/questions`) so they take precedence over the slug route — they need to be registered above `/education/:slug` in `App.tsx` to match correctly.

### What stays the same
- All existing data (`src/data/library.ts`), entry slugs, and `/education/:slug` detail pages.
- The four-lane data taxonomy underneath.
- Header, footer, and every other page in the app.

### Result
Each section on `/education` shows a clean, curated taste with a quiet "See more" link to a full index. The landing page feels less dense, the spacing breathes properly, and visitors who want to go deeper have a clear, dedicated path into each topic without having to scroll through everything at once.

