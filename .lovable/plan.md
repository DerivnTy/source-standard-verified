

## Greenlist + Facility Profile — Reposition as Reference Layer

Reframe the Greenlist as a quiet supporting registry, not a primary product. Reduce dashboard density, soften the table, add an interpretation note, and bridge users back to the vendor registry. Simplify the profile page to a clean public-reference card.

---

### `src/pages/Greenlist.tsx` — restructured

**1 · Hero (replace BriefingHero invocation)**
Use the navy `BriefingHero` for tonal consistency with the home page, but with shorter, plainer copy:
- `category`: `Reference Registry`
- `title`: `Upstream Greenlist`
- `statement`: `The maintained reference set of recognized upstream compounding facilities used within the Source Standard framework. Inclusion supports upstream reference only — vendor verification is assessed separately.`
- Remove `docId`, `metadata`, `verifiedOn` props (the navy variant ignores them anyway).
- No actions — this is a reference page, not a conversion screen.

**2 · "Why this page exists" — new short section**
Light surface, three plain statements in a 3-up grid (no cards, hairline dividers):
1. `Recognized upstream sources` — Source Standard first identifies compounding facilities recognized under federal registration, state licensure, or accredited credentialing.
2. `Vendor assessment` — clinics and vendors are then assessed against those upstream sources.
3. `One layer of the verification chain` — the Greenlist is a reference layer. It is not, on its own, a vendor verification.

**3 · Quieter stats row (replace HoverCard 4-up tile grid)**
Drop the big tabular numerals on tinted background. Render as a single inline summary line above the filter bar:
- Format: `198 recognized · 42 503B · 144 503A · 12 not currently recognized`
- Small, muted, mono digits, no boxes, no hover cards. One short sentence.

**4 · Search + filters — reduced visual weight**
Keep all functionality. Restyle:
- Remove the sticky bar's drop-shadow and backdrop blur; keep simple top border instead.
- Inputs and selects use `border-border/40` and a single shared height (`h-9`), no rounded `[10px]` — use default `rounded-md`.
- Combine into a single calmer row; reset becomes a quiet text link, not a button.

**5 · Main table — editorial public-record styling**
Strip the elevated card shell:
- Remove `rounded-[12px] border bg-card shadow-[…]` wrapper; use a plain `divide-y divide-border/50` list with no outer card.
- Facility name: bump to `text-[14px] font-semibold` with darker `text-foreground` (strongest weight on the row).
- Source type: replace the colored `CategoryPill` with a quiet text label (`503B`, `503A`, `Unverified`) in `text-[12px] uppercase tracking-[0.1em] text-muted-foreground`. Keep a small left dot for category color, but remove pill background/ring.
- Location and focus: `text-[12.5px] text-muted-foreground`, no truncation styling beyond what's needed.
- Status (alert) chip: keep but desaturate — no soft background, just colored dot + small label.
- "View" action: simple `View →` text link in muted color, no uppercase mono treatment.
- Mobile cards: remove `card-elevated` shell, use plain `border-b` rows.

**6 · Interpretation note — new short block above the table**
A single paragraph in a quiet bordered strip directly under the stats line:
> Inclusion means the facility appears within the recognized upstream reference set used by the framework. It does not mean Source Standard is certifying any downstream vendor that uses the source. Vendor verification is a separate review.

**7 · Bridge to vendor registry — new section at page bottom**
Replace the collapsed "Inclusion Standards & Disclaimer" `<details>` with a calmer two-part footer:
- **Top half** — Bridge: short two-column row.
  - Left: `Two layers, one framework` — one paragraph explaining upstream reference + vendor verification as the dual-layer model.
  - Right: a single quiet text link → `Open the Vendor Registry →` `/directory`.
- **Bottom half** — Keep the cite/disclaimer text, but flatten it to a single muted paragraph at the very bottom (no accordion, no border, no surface tint). Drop the "Technical note" block entirely — its content is now covered by the interpretation note up top.

---

### `src/pages/GreenlistProfile.tsx` — simplified profile

**Goal**: a clean public-reference page. Currently the page reads as half-internal-record with `01 / 02 / 03` SubSections and a footer of doc IDs.

**Changes:**

**1 · Header — keep the existing `ProfileHeader` shell, simplify content**
- Eyebrow stays (`Greenlist source` or `Unverified facility`).
- Identity row: keep status badge + type + location, but drop the inline dot pattern's heavier styling — keep it quiet.
- `lead`: one plain sentence drawn from `entry.focus` (or `p.background` first sentence). Strip tail "." duplication logic.
- Right-side "At a glance" panel: keep, it works as the side summary panel the brief calls for. Reduce label tracking and compress to 4 rows max.

**2 · Regulatory Alert section — keep, but lighter**
For unverified facilities, retain the alert block but:
- Remove the `00` mono section number and the colored title.
- Render as a simple bordered note with a small "Regulatory alert" label, current status pill, "as of" date, reason, and proof links — no full subsection scaffolding.

**3 · Replace the three numbered SubSections with two plain sections**
Drop `SubSection` (with `01 / 02 / 03` + bottom border + title). Use simple `h2` headings, no numbering:

- **Regulatory & standards** — same content as current §01: designation, FDA reg, last inspection, cleanroom class, standards, states served, testing, inspection history, env monitoring. No `MetaLine` dot-row visual; render as a clean `dl` definition list.
- **Operating focus & capabilities** — merges current §02 (Product Capabilities) and §03 (Background) into one section: dosage forms, specializations, clinical focus, API sourcing, years in operation, facility scale, QA staffing, background prose, review notes — all as `dl` rows.

**4 · New "Interpretation" note — short closing block**
One paragraph, plain border, no heading number:
> This facility appears in the Source Standard upstream reference set. Inclusion reflects recognized federal registration, state licensure, or accredited credentialing. It is not a clinical endorsement and does not constitute verification of any downstream vendor or product that may source from this facility.

**5 · `ProfileFootnote` — strip internal codes**
- Remove `Doc: SS-GL-XXX` row.
- Keep `Listing` (Greenlist Facility / Unverified Facility), `Updated`, `Jurisdiction`.
- Keep the existing note paragraph (it already reads correctly).

**6 · Breadcrumb stays as-is**, it's already minimal and useful.

---

### Files touched

- `src/pages/Greenlist.tsx` — rewrite hero invocation, replace stats tile grid with inline summary line, add "Why this page exists" 3-up, add interpretation note above table, restyle filter bar + table + mobile cards, replace `<details>` footer with bridge section + flat disclaimer paragraph.
- `src/pages/GreenlistProfile.tsx` — drop `SubSection` numbering pattern, collapse §01–§03 into two unnumbered sections rendered as `dl` lists, soften alert block, add closing interpretation note, trim `ProfileFootnote` items.

### What stays the same

`BriefingHero` component, all data in `src/data/greenlist.ts`, all routes, `ProfileHeader` / `ProfileFootnote` / `Breadcrumb` / `PageMeta` components, search/filter/sort/pagination logic, mobile responsiveness, the navy/cream global accent system, and every other page on the site.

