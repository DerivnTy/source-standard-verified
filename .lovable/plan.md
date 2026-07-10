## Goal

Make Learn topic navigation land the destination section in the **vertical center** of the viewport, consistently across desktop and mobile, whether the user is already on the Learn page or navigating in from another page.

## Scope

The Learn topic navigation currently lives at `/learn/education` (the Resource Library) and uses hashes like `#basics`, `#verification`, `#choosing-a-provider`, `#sourcing-and-manufacturing`. It has two competing scroll behaviors: the global `useHashScroll` hook and a local `hashchange`/tab‑click handler in `Education.tsx` — both use `block: "start"`.

## Changes

### 1. Rename topic ID `basics` → `learn-the-basics`

In `src/data/learn.ts`, update `EducationTopicId` and the topic entry so the hash matches the label. Update every downstream reference:

- `src/pages/Learn.tsx` (topic card links)
- `src/pages/Education.tsx` (section `id`, category list, `Filter` type, `CATEGORIES` map)
- `src/components/learn/LearnArticleTemplate.tsx` (breadcrumb link)
- `src/App.tsx` legacy redirect map: add `["/learn/education#basics", "/learn/education#learn-the-basics"]` (plus keep the existing `/education/basics` redirect target updated)
- Any article `topic: "basics"` entries in `src/data/learn.ts`
- `public/sitemap.xml` if a `#basics` URL is listed

Sections on `/learn/education` will then expose these stable IDs:
`#learn-the-basics`, `#verification`, `#choosing-a-provider`, `#sourcing-and-manufacturing`.

### 2. Center-align hash scroll globally

Update `src/hooks/useHashScroll.ts`:

- Change `block: "start"` → `block: "center"`.
- Replace the current `requestAnimationFrame` timing with a `setTimeout(scrollToSection, 150)` (matches the spec and gives the destination page time to mount its sections after route change).
- Re‑run on `[pathname, hash]` (already does).

This hook already runs on every route, so it covers cross‑page navigation into `/learn/education#...` from anywhere on the site.

### 3. Remove the competing top‑aligned scroll in `Education.tsx`

In `src/pages/Education.tsx`:

- Delete the `hashchange` `useEffect` (lines ~300–314) that calls `scrollIntoView({ block: "start" })`.
- In `handleTabClick`, keep the filter + `history.replaceState` logic, but remove the local `scrollIntoView` call and instead dispatch through the hash so `useHashScroll` handles centering — simplest form: after `replaceState`, call `el?.scrollIntoView({ behavior: "smooth", block: "center" })` directly using the same centering rule. No `block: "start"` remains anywhere on this page.
- Keep `initialFilter` logic (reads the hash to preselect the category filter) — that is filter state, not scroll behavior.

### 4. Leave `ScrollToTop` alone

`src/components/ScrollToTop.tsx` already bails out when a hash is present, so it does not compete with the centered hash scroll.

## Verification

After changes, test on desktop and mobile viewport:

1. From `/`, click a Learn topic → lands on `/learn/education#<id>` with the section vertically centered.
2. Already on `/learn/education`, click each topic tab → section re‑centers smoothly, URL hash updates.
3. Direct load of `/learn/education#verification` (and each other topic) → section is centered after paint.
4. Legacy URLs (`/education/basics`, `/library/sourcing`, etc.) redirect and still land centered on the new IDs.

## Out of scope

No visual, typography, or content changes. No changes to the global hero/section padding rules established previously.
