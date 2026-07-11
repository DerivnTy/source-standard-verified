Add a section header "Why this board exists" above the three intro paragraphs on the Medical Advisory page.

Change
- `src/pages/MedicalAdvisory.tsx`, first `<PageSection first>` (around line 134): add `title="Why this board exists"` to the section props so it renders using the shared section-heading style used by every other section on the page. No changes to copy, layout, or paragraph content.

Non-goals
- No wording changes to the existing paragraphs.
- No changes to any other page or shared component.