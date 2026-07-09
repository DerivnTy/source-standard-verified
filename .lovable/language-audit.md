# Source Standard — Final Launch Language Audit

**Scope:** editorial and messaging review of every public route and shared
chrome as of this pass. No code changes were made. Findings are grouped
Critical / Recommended / Optional. Every finding names the page, the
current wording, why it should change, and the recommended direction —
not a full rewrite unless a phrase is short and rewriting is clearer.

The Canonical Messaging Standard at the end (§9) is the intended single
source of truth for all future writing.

---

## 1. Executive summary

The site now looks like an institution. It does not yet sound like one
consistently. The single most important pass before launch is not more
copy — it is aligning the copy that already exists.

The visual system is credible. The voice is close to credible. The gap is
not tone. It is **terminological drift** and **explanatory drift** across
pages that were written at different moments in the project's evolution.

The five most consequential risks:

1. **Verification status vocabulary is inconsistent across four pages.**
   The homepage, `/status-definitions`, `/how-it-works` (`/how-to-read-the-directory`),
   and `/learn/faq` each publish a *different* enumerated list of vendor
   statuses. This is the single most-referenced concept on the site and
   also the most contradictory. It reads as either uncertain or careless.
2. **"Greenlist" and "Facility Records" are used interchangeably.**
   The nav and footer say **Facility Records**. The route is `/greenlist`.
   FAQ, education articles, and internal copy still say **the Greenlist**,
   **Greenlisted**, and treat the concept as a badge. A first-time visitor
   cannot tell whether these are the same thing, two things, or a rename
   in progress.
3. **"Medical Advisory Board" and "Clinical Oversight" name the same body.**
   The nav and hero use *Medical Advisory Board*. The body copy on the
   same page uses *Clinical Oversight* eleven times. Governance calls the
   same body *Clinical* under "Advisory body of record." Three names for
   one entity.
4. **Provider / vendor / clinic / pharmacy / facility are used
   inconsistently at the top of the funnel.** The homepage headline says
   *provider*; the same page's search says *provider, clinic, or telehealth
   company*; the registry it navigates to is the *Vendor Registry*. The
   consumer arriving from the H1 does not know if a *provider* is what
   they are searching for.
5. **Verification is described three different ways depending on which
   page you land on.** As "publicly reviewed sourcing information"
   (`/how-it-works`), as "an evidence-informed determination" (`/verification-disclaimer`),
   and as "confirmed the pharmacy or facility they name as their source"
   (education article). Each is defensible in isolation. Together they
   describe three different things.

None of these are tone problems. They are integrity problems that only
show up once a reader compares two pages. Launch reviewers will compare
pages. Regulators, journalists, and skeptical clinicians will compare
pages. The Canonical Messaging Standard in §9 exists to end the drift.

Verdict: **hold on tone rewrites, ship terminology reconciliation.**
The voice is good enough. The vocabulary is not.

---

## 2. Positioning check

The site consistently claims Source Standard is:

- an independent public-reference organization
- a verification framework
- a documentation and transparency organization

And consistently disclaims that it is:

- a regulator
- a pharmacy, manufacturer, or laboratory
- a healthcare provider or certification body
- an endorsement organization

Where positioning drifts:

- **Home §Governance ("Who Stands Behind This?")** — pillar 3 reads
  *"Public Standards, Verification criteria and status definitions are
  published in full and available for public review."* This is accurate
  and on-voice.
- **Home §Mission ("Why Does This Exist?")** — *"Source Standard is an
  independent verification organization. It does not manufacture,
  prescribe, or sell therapies. Its role is to evaluate the sourcing and
  quality claims vendors make every day..."* — introduces **"quality
  claims"** as something Source Standard evaluates. Every other page
  disclaims quality evaluation (see `/verification-disclaimer`, `/about`
  §"What We Don't Do", `/medical-advisory` §Scope). This is a positioning
  contradiction, not a wording nit. Fix in Critical §5.1.
- **Partners** — the *Independent Laboratories* row reads *"Perform
  independent testing to verify the quality and integrity of compounded
  therapies."* This attributes quality-verification to a partner. It is
  literally what the labs do, but on a site that repeatedly disclaims
  quality certification the framing collapses the distinction between
  *Source Standard verifies sourcing* and *labs verify quality*. Fix in
  Critical §5.1.
- **/for-vendors §2 "Registry deliverables"** — *"A verification badge
  for use on vendor-controlled surfaces, governed by the framework's
  attribution terms."* The rest of the site never mentions a badge, and
  `/terms` §Integrity refers to *"Source Standard names, marks, or badge
  artwork."* Badges imply certification-mark posture. This is the closest
  the site comes to sounding like a certifying authority. Fix in Critical §5.4.

Positioning is otherwise coherent. The abstraction "public-reference
organization / verification framework / documentation" holds.

---

## 3. Terminology audit

Only terms that appear in more than one meaning across the site are
listed. A canonical definition is proposed for each. Full definitions are
consolidated in §9.

| Term | Current uses on the site | Problem | Canonical direction |
|------|--------------------------|---------|---------------------|
| **Provider** | Home H1 ("Is Your Provider Verified?"); search label ("provider, clinic, or telehealth company"); FAQ; Learn; Education. Sometimes used as a synonym for *vendor*, sometimes as a synonym for *clinician / prescriber*. | Ambiguous between "the business you buy from" and "the doctor treating you." | **Provider** = the consumer-facing entity a patient interacts with (clinic, telehealth company, in-person practice). Use in consumer copy. Not a synonym for *clinician* or *prescriber*. |
| **Vendor** | Nav ("Vendor Registry"); registry filters; `/for-vendors`; Apply; Terms; Accountability. | Reads as trade jargon when it appears in consumer sentences. Also used interchangeably with *provider* in some paragraphs. | **Vendor** = the operator whose record is reviewed by Source Standard. Use in registry, framework, and policy pages. In consumer-facing copy, prefer **provider** and reserve **vendor** for institutional context. Do not swap mid-sentence. |
| **Facility** | `/greenlist` copy ("compounding facility"); `/status-definitions` §Facility statuses; `/accountability` §Disclosure; Education. | Sometimes means specifically a 503B outsourcing facility; sometimes an umbrella for 503A + 503B + manufacturer. | **Facility** = umbrella term for any upstream entity recognized in Facility Records — 503A pharmacies, 503B outsourcing facilities, or manufacturers. When the specific class matters, name it. |
| **Pharmacy** | Facility Records; Governance; FAQ; Education. | Sometimes = 503A only; sometimes = any compounder. | **Pharmacy** = a licensed compounding pharmacy (503A or 503B). When only 503A is meant, say *503A pharmacy*. |
| **Manufacturer** | `/greenlist` filter; `/verification-disclaimer`; About; Governance. | Used as a filter category on the registry ("Manufacturer") but not defined anywhere in public copy. | **Manufacturer** = an FDA-registered drug or API manufacturer distinct from a compounding pharmacy. Define once, in §9, and link to that definition from the filter. |
| **Verification** | Every page. | Three overlapping definitions (see §4.1). | See §9. Canonical: *Verification is a documented review of the sourcing information a vendor publishes, conducted within the Source Standard framework.* |
| **Verified** | Home; registry; FAQ; Education; StatusDefinitions; HowItWorks. | Definition varies: "available information supported the sourcing representations" (StatusDefinitions) vs. "confirmed the pharmacy or facility they name as their source" (Education `/what-does-verified-mean`) vs. "identity, licensure, sourcing relationships, and public claims have been reviewed" (FAQ). | See §9. Canonical: *Verified means the vendor's sourcing representations were supported by the information reviewed within a defined scope at the time of review.* |
| **Verification status** | Home §Registry, StatusDefinitions, HowToReadTheDirectory, FAQ. | The set differs page-to-page (see §4.2). | See §9 for canonical set. Every page must enumerate from the same list. |
| **Record** | Everywhere. Site memory already retired *listing* in favor of *record*, and that has held. Occasional slip: HowToReadTheDirectory §8 still says "Verified Vendors directory." | Consistent enough; retire the last remaining *directory* usages. | **Record** = a single entry (vendor or facility) in the registry. **Registry** = the collection. Retire *directory* (see §5.3). |
| **Review** | HowItWorks, Accountability, StatusDefinitions, HowToReadTheDirectory. | Fine as verb. As a noun, sometimes = the internal process, sometimes = the review file, sometimes = a review event. | Prefer **review** (process), **review file** (materials), **review event** (a specific instance). |
| **Monitoring** | StatusDefinitions ("The facility is included in the Source Standard database and is currently being followed"); Accountability ("Monitoring data"); Privacy ("facility monitoring records"). | Used both as a status label (Facility) and as an internal activity (records). Distinction is not made explicit. | **Monitoring (status)** = a facility included in the database and followed against public records. **Monitoring (activity)** = internal, ongoing observation. Always name which sense on first use per page. |
| **Greenlisted** | StatusDefinitions; FAQ; Education `/what-does-greenlisted-mean`; `/greenlist` copy. | Two distinct meanings: FAQ + Education = "license and classification match public records"; StatusDefinitions = "records and supporting information support Greenlisted status under the Source Standard framework." The registry currently shows *no* facility as Greenlisted; empty state says "No manufacturer has yet satisfied Greenlisted criteria." | See §9. Canonical: *Greenlisted means a facility's records and supporting information support Greenlisted status under the Source Standard framework. It is not a registration check.* Update Education article accordingly. |
| **Under Review** | Home §Registry (enumerated); HowToReadTheDirectory (defined); StatusDefinitions (not listed). | Home + HowToRead treat it as a real status; StatusDefinitions omits it. | See §5.2. Decide whether Under Review is a public status. If yes, restore it to StatusDefinitions. If no, remove it from Home and HowToReadTheDirectory. |
| **Suspended** / **Removed** | Home; HowToReadTheDirectory; FAQ; Accountability §Actions. StatusDefinitions omits them from the enumerated vendor set. | Same as Under Review. Present as public statuses everywhere except the page that defines statuses. | See §5.2. Reconcile in one direction. |
| **Status Alert** | StatusDefinitions §Facility statuses; `/greenlist` legend. | Reasonable and consistent within the facility context. Do not extend to vendors without adding to StatusDefinitions. | Keep, facility-only. |
| **Public Reference** / **Public-reference organization** | Home §Mission; About; SiteFooter legal band. | Used consistently. | Keep. Preferred umbrella phrase for what the organization is. |
| **Independent Verification** | Home hero copy; About §Independence; Verification Disclaimer. | Consistent. | Keep. |
| **Framework** | Everywhere. | Consistent. | Keep. Preferred word for "the set of rules and processes Source Standard applies." Do not swap for *program*, *system*, or *methodology*. |
| **Directory** | HowToReadTheDirectory (page title, page body, breadcrumb, cross-refs); Terms `/how-to-read-the-directory` route. | Everything else on the site says *registry*. | Retire *directory* in favor of *registry*. Rename the page's language to "How to read the registry." Path can stay for SEO but page copy shouldn't reintroduce a retired term. |
| **Reference Library / Resource Library / Clinical Reference Library / Publications / Library** | Education page hero: "Resource Library" (category "Reference Library"); LibraryEntry: "Clinical Reference Library"; LibraryPublications: "Publications"; Learn hub: "Education". Five names. | The consumer cannot tell whether these are one thing or several. | Consolidate. **Learn** is the umbrella. **Education**, **News & Insights**, **Frequently Asked Questions** are its three surfaces. Retire *Resource Library*, *Reference Library*, and *Clinical Reference Library* from public copy. Keep internal library slugs as URLs only. |
| **Compounded therapy** vs. **compounded medication** vs. **compounded product** vs. **compounded therapies market** | About; Home; Education. | Interchangeable, but pluralization varies. | Prefer **compounded therapy** (singular) and **compounded therapies** (plural). Reserve **compounded medication** for the Education `/what-is-a-compounded-medication` article and closely related consumer language. Avoid **compounded product** unless referring specifically to a physical product. |
| **Sourcing claims** vs. **sourcing representations** vs. **sourcing information** | HowItWorks + About = "sourcing claims"; StatusDefinitions + Accountability = "sourcing representations"; VerificationDisclaimer = "sourcing information." | Same idea, three words. *Representations* is legalistic and correct; *claims* is punchy and consumer-appropriate; *information* is bland. | Use **sourcing claims** in consumer copy and framework overviews. Use **sourcing representations** in Terms, Privacy, Accountability, and the Verification Disclaimer. Do not mix within a single page. |
| **Consumer** / **Patient** / **User** | Home; About; VerificationDisclaimer; Terms. | Mostly consistent as *consumer*. Occasional *patient* (Verification Disclaimer, MedicalAdvisory). *User* appears in Terms §Warranty and reads as software-jargon. | **Consumer** in public-reference copy. **Patient** only when the clinical relationship is the point (e.g., "Medical decisions should be made with licensed clinicians"). Retire *user* except in Privacy §Access and Terms §Registry access. |
| **Public standing** / **Public status** / **Standing** | Accountability; StatusDefinitions. | Interchangeable. | Prefer **public status** in consumer copy. **Standing** is fine in Accountability and Terms. Do not introduce *public standing* as a distinct concept. |
| **Public-reference records** / **Public reference records** / **Public-reference materials** | About; VerificationDisclaimer; Privacy; Governance. | Hyphen usage drifts. | Standardize as **public-reference records** (hyphenated compound modifier before noun). *Materials* is acceptable when referring to more than records alone. |

---

## 4. Explanation audit

For each core concept: current phrasings, gaps, and the recommended
single explanation. The recommended wording is deferred to §9 so that it
is authored once, not eleven times.

### 4.1 What verification is

Current phrasings:

- Home §Mission: *"factual public-reference records that help make those
  claims more transparent."*
- HowItWorks §Definition: *"Verification is a public reference standard.
  It gives consumers a consistent way to see whether a compounding
  pharmacy or clinic has undergone independent review of the sourcing
  information it publishes."*
- VerificationDisclaimer §Opening: *"Verification is an evidence-informed
  determination made within a defined public review framework."*
- StatusDefinitions §Verified: *"Available information supported the
  vendor's sourcing representations within the defined review scope at
  the time of review."*
- Education `/what-does-verified-mean`: *"Verified means Source Standard
  has reviewed a provider's documentation and confirmed the pharmacy or
  facility they name as their source."*
- FAQ §Verified: *"Verified indicates that the vendor's identity,
  licensure, sourcing relationships, and public claims have been
  reviewed under the Source Standard framework..."*

Contradictions:

- HowItWorks says verification reviews *sourcing information*. Education
  says it *confirms the pharmacy named as source*. FAQ says it reviews
  *identity, licensure, sourcing relationships, and public claims* — a
  wider scope than either of the others.
- HowItWorks calls verification a *standard*. VerificationDisclaimer
  calls it a *determination*. Neither language is wrong, but a first-
  time visitor reading both pages back-to-back does not receive the same
  concept twice.

Recommendation: adopt one canonical two-sentence definition (see §9.5)
and use it verbatim on the surfaces where verification is first
introduced: Home §Mission, HowItWorks §Definition, VerificationDisclaimer
opening, StatusDefinitions §Verified, and Education `/what-does-verified-mean`.

### 4.2 The enumerated set of statuses

Current phrasings:

- **Home §Registry fields:** *"Whether a vendor is Verified, Unverified,
  Under Review, Suspended, Removed, or otherwise designated within the
  registry."* → 5 named vendor statuses.
- **StatusDefinitions.tsx:** vendor statuses = **Verified, Unverified**
  (2). Facility statuses = **Monitoring, Greenlisted, Status Alert** (3).
- **HowToReadTheDirectory §3 Definitions:** vendor statuses = **verified,
  under-review, unverified, suspended, removed** (5).
- **FAQ §Verification "What public statuses exist?":** *"Verified,
  Pending Review, Under Review, Suspended, Removed, Greenlisted, and Not
  Listed."* (7 — introduces *Pending Review* and *Not Listed* found
  nowhere else on the site.)
- **`/greenlist` filter pills:** All · Greenlisted · Monitoring · Status
  Alert. Correctly matches StatusDefinitions.

This is the single most damaging inconsistency on the site. Every
enumerated set is different. It also introduces at least two statuses
(*Pending Review*, *Not Listed*) that are not defined anywhere.

Recommendation: adopt the canonical set in §9.6 and apply it verbatim
everywhere statuses are enumerated. This is a Critical fix.

### 4.3 What verification does *not* mean

Currently well-covered on:

- HowItWorks §"Does not mean" (6 items)
- VerificationDisclaimer §"What verification does not establish" (5 items)
- About §"What We Don't Do" (5 items)
- MedicalAdvisory §Scope & Boundaries (6 items)

All four lists are consistent in spirit, but *phrase* differently and
contain overlapping but non-identical items. This is defensible — the
same disclaimer surfaces in multiple registers — but a launch reader
notices the near-duplication.

Recommendation: keep four surfaces but align the *first item* of each
list to identical wording (see §9.5). Below that, per-page variation is
fine.

### 4.4 Why Source Standard exists

Consistent across About §Why We Exist, Home §Mission, and the SiteFooter
legal band. Voice is aligned.

Small drift: About says *"faster than the public information that
surrounds it"* while Home says *"claims they cannot independently
verify."* Both work. Neither needs a rewrite. Keep.

### 4.5 What Source Standard does

Home §How ("Map the market / Verify sourcing claims / Maintain the public
record") — clear and canonical.

About §Our Role — also clear, uses different verbs ("maintains the
public-reference records... publishes the standards... keeps them
current... makes the entire framework openly reviewable").

These describe the same three actions in different words. Consistent
enough. Keep.

### 4.6 What Facility Records are

Confusing across pages:

- **`/greenlist` context strip:** *"Greenlisted facilities are currently
  recognized within the Source Standard framework."*
- **`/greenlist` empty state:** *"No manufacturer has yet satisfied
  Greenlisted criteria."*
- **StatusDefinitions §Monitoring:** every facility in the database is
  "currently being followed" — the default state.
- **Education `/what-does-greenlisted-mean`:** *"a Greenlisted facility
  is one whose license and classification match public records, nothing
  more, nothing less."*

Combined effect: a consumer reading the education article expects
Greenlisted to be a common status. They then land on `/greenlist` and
see no facility is Greenlisted. This is a real credibility problem.

Recommendation:

- Rename the concept for consumers. Use **Facility Records** everywhere
  the URL `/greenlist` is exposed as a link, in navigation, and in cross-
  references. Reserve **Greenlisted** for the *status label* only.
- Correct the Education article to reflect that Greenlisted is not a
  registration check; it is a framework determination that has not yet
  been assigned to any facility at launch.
- Retire the phrase **"the Greenlist"** as a proper noun for the page.
  See §5.2 and §5.7.

### 4.7 What the Vendor Registry is

Consistent across pages after the last pass. Homepage and Vendor
Registry both use *"Search the Source Standard Registry to see whether
your provider has been independently verified..."*. Keep.

### 4.8 Why consumers should care

Consistent: transparency about sourcing before choosing a provider.
Reinforced on Home §Audience, Learn hero, Education topic descriptions,
and VerificationDisclaimer §Reliance. Keep.

### 4.9 Why providers participate

Present on Home §Audience ("verification pathway... seeking to
demonstrate sourcing transparency") and on ForVendors. Missing an
articulated *incentive* for the provider — implicit that "transparency
is its own reward." Optional refinement in §7.

### 4.10 Why manufacturers appear

Not clearly explained anywhere. Manufacturers show up as a filter on
`/greenlist` and in the StatusDefinitions vocabulary, but no page
explains *why a manufacturer is in the registry* or *what it means for
one to be Monitored*. Recommend a one-paragraph explanation on
`/greenlist` before the search field. Recommended-severity finding.

### 4.11 What independence means

Consistent across About §Independence, Governance §Neutrality,
MedicalAdvisory §Institutional Mandate, and the SiteFooter legal band.
Voice is aligned. Keep.

### 4.12 What monitoring means

Two senses are used without labeling: **Monitoring (facility status)**
and **monitoring (internal activity)** (Accountability §Triggers, Privacy
§Collection).

Recommendation: on first use per page, disambiguate. In consumer copy,
prefer *"followed against public records"* over the bare word
*monitoring*, to avoid implying an active surveillance posture that
Source Standard does not have.

---

## 5. Page-by-page findings

Format: **Page · Current wording · Why it should change · Recommended
direction · Severity.**

### 5.1 Home (`/`)

- **Hero H1: "Is Your Provider Verified?"**  
  Why: excellent. Direct, consumer-first, and consistent with the
  registry H1. Keep. — *No change.*
- **Hero subtitle: "Search the Source Standard Registry to see whether
  your provider has been independently verified and to better understand
  their peptide sourcing transparency."**  
  Why: *peptide* narrows the site to one therapy category on the front
  door, while the registry, the framework, and the About page all
  describe a broader *compounded therapy market*. This is a positioning
  narrower-than-scope error. — **Direction:** replace *"peptide sourcing
  transparency"* with *"sourcing transparency"*. Same fix on Vendor
  Registry (`/verified-vendors`) hero. — **Critical.**
- **Hero search placeholder: "Search by provider, clinic, or telehealth
  company…"**  
  Why: introduces *provider* and *clinic* as if they were different
  things, then hands the reader off to a *Vendor Registry*. — **Direction:**
  align to a single term. Suggested: *"Search by provider name, clinic,
  or telehealth company"* (remove ellipsis per project style). Keep
  *provider* on the front door, but make the registry copy also use
  *provider* when describing what a record is. — **Recommended.**
- **Mission §opening: "Consumers increasingly rely on sourcing claims
  they cannot independently verify. Source Standard exists to improve
  transparency..."**  
  Why: strong. Keep.
- **Mission §second paragraph: "...to evaluate the sourcing and quality
  claims vendors make every day..."**  
  Why: introduces **quality claims** as something Source Standard
  evaluates. Every other page says the opposite (see §2 and §7.2 of
  Verification Disclaimer). — **Direction:** replace *"sourcing and
  quality claims"* with *"sourcing claims"*. — **Critical.**
- **§How ("Map the market / Verify sourcing claims / Maintain the public
  record")**  
  Why: on-voice, on-scope. Keep.
- **§Registry ("What Does the Registry Cover?") NavCard descriptions:**
  Vendor Registry desc = *"Search vendors by name, state, or verification
  status."* Facility Records desc = *"Recognized upstream sources and
  current verification status."*  
  Why: *"Recognized upstream sources"* implies a positive determination
  has been made about the facility. In fact, most facilities are
  *Monitoring*, not *Greenlisted*. — **Direction:** *"Compounding
  pharmacies and manufacturers followed within the Source Standard
  framework."* — **Recommended.**
- **§Registry fields ("What Will I See in a Record?") — Verification status
  row: "Whether a vendor is Verified, Unverified, Under Review, Suspended,
  Removed, or otherwise designated within the registry."**  
  Why: enumerates 5 statuses; StatusDefinitions defines only 2.
  See §4.2. — **Direction:** align to the canonical set from §9.6. —
  **Critical.**
- **§Audience ("Who Is This For?") — "The industry uses the public
  record as a reference point for accountability across the compounded
  therapy market."**  
  Why: *accountability* is a strong word that implies Source Standard
  enforces something. It doesn't. — **Direction:** replace *"accountability"*
  with *"transparency"*. — **Recommended.**
- **§Governance ("Who Stands Behind This?") — pillar 2: "Medical,
  scientific, and procedural guidance from an independent advisory
  board."**  
  Why: elsewhere on the site the same body is called *Medical Advisory
  Board* (nav, hero) and *Clinical Oversight* (body). Home says
  *"independent advisory board."* Fourth name. — **Direction:** use
  **Medical Advisory Board** verbatim wherever the body is named. See
  §5.11 and §9.3. — **Critical.**

### 5.2 Vendor Registry (`/verified-vendors`)

- **RegistryHeader description: same "peptide sourcing transparency" as
  Home.** — **Direction:** same fix as §5.1. — **Critical.**
- **Filter pills: VERIFIED / UNVERIFIED.**  
  Why: consistent with StatusDefinitions. Keep.
- **Search placeholder: "Search by provider, clinic, telehealth company,
  city, or state, ..."**  
  Why: trailing *, ...* is stylistically inconsistent with the site's
  no-ellipsis rule and its no-comma-before-ellipsis rule. — **Direction:**
  *"Search by provider, clinic, telehealth company, city, or state"*. —
  **Recommended.**
- **Empty-state and "Load More" button.**  
  Not audited in detail; readable. Keep.

### 5.3 Facility Records (`/greenlist`)

- **PageMeta title: "Who Compounds Your Medication? · Facility Records"**  
  Why: strong consumer-first question, on-voice. Keep.
- **Hero description: "Search the manufacturers and compounding
  pharmacies behind your provider's compounded therapies."**  
  Why: clear. Keep.
- **Context strip: "Greenlisted facilities are currently recognized
  within the Source Standard framework. Recognition is based on Source
  Standard's review and may change as new information becomes
  available."**  
  Why: shown by default *before* any search. But at launch no facility
  is Greenlisted. A consumer reads a Greenlisted-forward explanation
  and then sees only Monitoring rows. — **Direction:** rewrite as an
  explanation of what appears in Facility Records first, then define
  Greenlisted as the *aspirational* status inside the status guide.
  Suggested: *"Facility Records list the compounding pharmacies,
  outsourcing facilities, and manufacturers followed by Source
  Standard. Each record shows the facility's current status within the
  framework."* — **Critical.**
- **Empty state: "No manufacturer has yet satisfied Greenlisted criteria."**  
  Why: correct, but only shown conditionally. Should be reflected in
  the always-visible copy above so the two are not in tension. —
  **Recommended.**
- **Status Guide legend: "Greenlisted — Currently recognized. Monitoring
  — Under additional review. Status Alert — Additional information
  requires review."**  
  Why: *Monitoring* is defined as "under additional review" here, but
  StatusDefinitions defines it as "included in the Source Standard
  database and currently being followed" — the *default* state, not
  additional review. Contradiction. — **Direction:** align to
  StatusDefinitions wording. — **Critical.**
- **Filter labels: "503A Pharmacy / 503B Facility / Manufacturer".**  
  Why: acceptable but *503B Facility* is redundant (the F in 503B
  already stands for facility). — **Direction:** *"503A Pharmacy / 503B
  Outsourcing Facility / Manufacturer"* (explicit) or *"503A / 503B /
  Manufacturer"* (terse). Either is fine; pick one. — **Optional.**

### 5.4 Apply (`/apply`)

- **Hero title: "Vendor Verification Intake"**  
  Why: institutional and correct. Keep.
- **Subtitle: "Submit your operating profile to begin the Source
  Standard verification process. This form does not create verified
  status."**  
  Why: excellent — sets expectation twice. Keep.
- **Acknowledgment text: "I understand this intake does not approve,
  certify, or verify this organization..."**  
  Why: on-voice, correctly disclaims certification. Keep.
- **Success state: "Intake received"**  
  Why: consistent with the reference-ID naming convention (`SS-INTAKE-...`).
  Keep.
- **Breadcrumb: "Vendors › Apply"**  
  Why: navigates to `/for-vendors`. But nowhere in the nav is *Vendors*
  a section — the nav says *Advisory Board*, *Learn*, etc. This
  breadcrumb links to a page that isn't in the primary nav. —
  **Direction:** consider retiring `/for-vendors` as a distinct
  destination (its contents overlap Apply) or adding a nav entry. Not a
  language problem; noting for reference. — **Optional.**
- **Verification badge claim (via /for-vendors §2.4).**  
  Why: the site describes issuing a *verification badge for use on
  vendor-controlled surfaces.* Badge is the strongest certification-mark
  signal on the site. — **Direction:** either scope the badge to *"an
  optional attribution mark"* with an explicit rule that it is not a
  certification mark, or remove badge language entirely until a badge
  program is documented. — **Critical.**

### 5.5 Governance (`/governance`)

- **Hero title: "Who Oversees Source Standard?"**  
  Why: strong consumer question. Keep.
- **Hero lead: "How Source Standard stays independent, objective, and
  accountable."**  
  Why: aligned. Keep.
- **Advisory summary metric: "Advisory body of record — Clinical"**  
  Why: this is the third name for the Medical Advisory Board. See §4
  and §9.3. — **Direction:** change to *"Advisory body of record — Medical
  Advisory Board"*. — **Critical.**
- **§Advisory table: "Framework criteria maintained under licensed
  clinical oversight"**  
  Why: *"licensed clinical oversight"* here reads as a body ("the
  Clinical Oversight") elsewhere. — **Direction:** keep this phrase as a
  descriptor of activity but ensure the body itself is named *Medical
  Advisory Board* throughout the same page. — **Recommended.**
- **§Anchors: FDA / PCAB / NSF / USP / STATE table.**  
  Why: excellent. Keep.
- **§Neutrality: fee language: "Verification fees, where applicable,
  are uniform, disclosed at intake, and do not vary based on outcome,
  category, or reviewer determination."**  
  Why: solid on-voice institutional language. Keep. However Apply
  contains no visible mention of fees, and FAQ says *"Fees are disclosed
  during the application process and vary by category."* Governance says
  fees do *not* vary by category. Direct contradiction. — **Direction:**
  reconcile with FAQ (see §5.8). — **Critical.**

### 5.6 Accountability (`/accountability`)

- Voice is aligned throughout. Definition-list rhythm matches
  VerificationDisclaimer and Terms.
- **Hero eyebrow: "Governance · Compliance". Hero title: "Record
  Maintenance & Ongoing Standing".**  
  Why: eyebrow says *Compliance* but the last pass canonicalized this
  page as *Compliance* in the footer. Both consistent. Keep.
- **§Attestations, §Disclosure, §Independent testing activity, §Review
  triggers, §Actions.**  
  Why: all on-voice, all consistent internally. Keep.

### 5.7 Medical Advisory Board (`/medical-advisory`)

- **Hero: "Medical Advisory Board" / "Who Advises Source Standard?"**  
  Why: canonical name in the hero. Keep.
- **Body copy: eleven references to "Clinical Oversight" — Purpose card,
  §1, §2 title "Governance Functions", §3 body, §7 Boundaries preface,
  §9 closing.**  
  Why: renames the same body inside its own page. Consumer reads *Medical
  Advisory Board* in the hero and *Clinical Oversight* in the body. —
  **Direction:** replace every instance of *Clinical Oversight* with
  *the Medical Advisory Board* (or *the Board* on second reference). —
  **Critical.**
- **Advisor cards: "Medical Advisor / Pharmacy Advisor / Clinical
  Advisor / Legal Advisor" with "To Be Announced" placeholders.**  
  Why: honest and on-voice. But Governance's advisory table uses "Chair /
  Vice Chair / Member" titles for the same body. Two title systems for
  the same six seats. — **Direction:** pick one title system. Prefer
  *Chair / Vice Chair / Member* on Governance for institutional record
  posture, and keep *[Discipline] Advisor* on `/medical-advisory` for
  the consumer-facing structure. Add a one-line footnote on Governance
  that explains the mapping, so a reader who compares can reconcile. —
  **Recommended.**
- **Placeholder biography italics: "Advisor profile, credentials, and
  biography will be published upon formal appointment."**  
  Why: clean, factual. Keep.

### 5.8 FAQ (`/learn/faq` and `/faq`)

- **Group title: "The Greenlist"** and **Q: "What is the Greenlist?"**  
  Why: uses the retired name as a proper noun. — **Direction:** rename
  group to *Facility Records*. Rewrite the question to *"What are
  Facility Records?"* and adjust the answer accordingly (see §9.7). —
  **Critical.**
- **Q: "What public statuses exist?" — Answer: "Verified, Pending Review,
  Under Review, Suspended, Removed, Greenlisted, and Not Listed."**  
  Why: introduces *Pending Review* and *Not Listed* found nowhere else.
  See §4.2. — **Direction:** align to §9.6 canonical set. Rewrite the
  answer to enumerate the same statuses as StatusDefinitions. —
  **Critical.**
- **Q: "What does verification cost? — Fees are disclosed during the
  application process and vary by category."**  
  Why: contradicts Governance §Neutrality. — **Direction:** rewrite
  as *"Fees, where applicable, are uniform and disclosed at intake. They
  do not vary based on outcome or reviewer determination. See Governance §Neutrality."*
  or align Governance to match, whichever reflects reality. — **Critical.**
- **Q: "What if a vendor is 'Not Listed'?"**  
  Why: *Not Listed* is not a defined status. — **Direction:** rewrite as
  *"What if a vendor doesn't appear in the registry?"* and explain that
  the absence of a record is not a finding. Retire *Not Listed* as a
  quasi-status. — **Critical.**
- **Q: "How is my data handled?" — links to Privacy.**  
  Why: on-voice. Keep.
- **Q: "Can I cite a Source Standard record?"**  
  Why: correctly points to Terms §Citation. Keep.
- **RecordHeader metadata: "Status: Active / Updated: 04/21/26 /
  Jurisdiction: United States".**  
  Why: consistent with other institutional pages. Keep.
- **Breadcrumb: "Resource Library › FAQ".**  
  Why: uses the retired *Resource Library* name. — **Direction:**
  change to *"Learn › FAQ"*. — **Recommended.**

### 5.9 Learn hub (`/learn`)

- **Hero title: "What do I need to know before choosing a provider?"**  
  Why: excellent consumer question. Keep.
- **Hero statement: "Consumer-first answers to the questions that come
  up before you choose a provider, and timely updates about what's
  changing in compounded therapy."**  
  Why: reads clean. Keep. Note: *"consumer-first"* is a house
  descriptor — consider whether to expose it in copy or keep it as an
  internal principle. — **Optional.**
- **§Start Here list titles: "Learn the Basics / Verification / Choosing
  a Provider / Sourcing & Manufacturing".**  
  Why: solid. Keep.
- **§Browse by Resource card labels: "Education / News & Insights /
  Frequently Asked Questions".**  
  Why: consistent with footer. Keep.

### 5.10 Education index (`/learn/education`)

- **Hero: "Education" with statement "Evergreen answers to the questions
  people ask before choosing a provider. Every article answers one
  question, plainly, and points you to the next useful step."**  
  Why: on-voice after the simplification pass. Keep.
- **Topic descriptions.** All consistent. Keep.

### 5.11 Education articles (`/learn/education/*`)

- **`/what-is-a-compounded-medication`.**  
  Well-written, on-voice, factually clean. Keep.
- **`/what-are-peptides`.**  
  Same. Keep.
- **`/what-does-verified-mean`: "Verified means Source Standard has
  reviewed a provider's documentation and confirmed the pharmacy or
  facility they name as their source. It is a sourcing-transparency
  check..."**  
  Why: narrower than StatusDefinitions and FAQ. See §4.1. — **Direction:**
  replace opening sentence with the canonical Verified definition from
  §9.6. Keep the rest of the article. — **Critical.**
- **`/what-does-greenlisted-mean`: "The Greenlist is the public record
  of pharmacies and facilities whose regulatory status Source Standard
  has confirmed. A Greenlisted facility is one whose license and
  classification match public records, nothing more, nothing less."**  
  Why: incorrect. This describes a *registration check*, not
  *Greenlisted* status as defined on StatusDefinitions. — **Direction:**
  rewrite around the canonical definition from §9.6. The article should
  explain the *distinction* between *being listed in Facility Records*
  (default: Monitoring) and *being Greenlisted* (a status not yet
  assigned at launch). — **Critical.**
- **`/what-happens-during-a-verification-review`:** last sentence — *"the
  provider is not listed."* Retire *not listed* language. — **Recommended.**
- **`/what-information-should-a-transparent-provider-share`.** Strong.
  Keep.

### 5.12 News (`/learn/news` + article)

Not exhaustively audited. Sample checks:

- Hero copy consistent with Learn hub. Keep.
- Article template appears to inherit dateline + standfirst pattern.
  Fine. Keep.

### 5.13 Verification Disclaimer (`/verification-disclaimer`)

- **Hero title: "What Verification Does, and Doesn't, Mean"**  
  Why: strong. Keep.
- **§Institutional boundaries.** Canonical "is not a X" list. Keep.
- **§Reliance: "Medical decisions should be made with licensed healthcare
  professionals."**  
  Why: consistent with HowItWorks footer. Keep.

### 5.14 Status Definitions (`/status-definitions`)

- **Hero title: "What Does Each Status Mean?"** — consumer-first. Keep.
- **Vendor statuses list contains only Verified + Unverified.**  
  Why: contradicts every other enumeration. See §4.2. — **Direction:**
  reconcile per §9.6. If the canonical set is Verified / Unverified /
  Under Review / Suspended / Removed, add the missing three here with
  full definitions. — **Critical.**
- **Facility statuses list.** Consistent with `/greenlist`. Keep.
- **Progression inputs list.** On-voice. Keep.

### 5.15 How Verification Works (`/how-it-works`)

- **§Definition: "Verification is a public reference standard. It gives
  consumers a consistent way to see whether a compounding pharmacy or
  clinic has undergone independent review of the sourcing information it
  publishes."**  
  Why: introduces *compounding pharmacy or clinic* as the subject of
  verification. Everywhere else the subject is *vendor* (a clinic,
  telehealth company, or hybrid). *Compounding pharmacy* is a
  Facility-Records concept, not a Vendor-Registry concept. — **Direction:**
  align to canonical Verification definition (§9.5). Subject should be
  *the vendor*, not *the compounding pharmacy*. — **Critical.**
- **§Protocol steps: "Provider enters the registry — A compounding
  pharmacy or clinic is added to the Source Standard public registry."**  
  Why: same issue. Pharmacies belong in Facility Records, not the
  Vendor Registry. Mixing them here confuses which registry the reader
  is being described. — **Direction:** rewrite the four steps around the
  *vendor* as the subject. — **Critical.**
- **§Means / Does not mean columns.** Good. Keep.
- **Footer paragraph disclaimer.** Good. Keep.

### 5.16 How to Read the Directory (`/how-to-read-the-directory`)

- **Page title: "How to Read the Directory"** and body uses *directory*
  repeatedly.  
  Why: the site retired *directory* in favor of *registry*. — **Direction:**
  rewrite page copy using *registry*. Consider renaming the page (URL
  may stay) or retiring it entirely and merging its content into
  StatusDefinitions. — **Critical.**
- **§3 Definitions enumerates 5 vendor statuses.** Align to §9.6. See
  §4.2. — **Critical.**
- **§4 Clarification of "Unverified".** Excellent. Keep verbatim; adopt
  as canonical Unverified explanation. See §9.6.

### 5.17 About (`/about`)

- **Hero + Why We Exist + Our Role + Principles + What We Don't Do +
  Independence + Looking Ahead.**  
  Voice is aligned throughout. The strongest institutional writing on
  the site. Keep.
- **§Principles item "Evidence before representation".** Consider whether
  a consumer reader parses *representation* in the legal sense. It does
  read a little formal, but for the About page's register that's
  appropriate. Keep.

### 5.18 Partners (`/partners`)

- **Hero: "Who Helps Keep Source Standard Independent?"** — strong. Keep.
- **PageMeta description says "physicians, and partners"; hero statement
  says "physicians, and researchers".**  
  Why: minor inconsistency between meta and hero. — **Direction:** align
  to *"organizations, laboratories, physicians, and researchers"* in
  both. — **Recommended.**
- **Partner category "Independent Laboratories — Perform independent
  testing to verify the quality and integrity of compounded therapies."**  
  Why: attributes quality verification to a partner category. Reads as
  if Source Standard's ecosystem *does* quality-certify, indirectly. —
  **Direction:** *"Perform independent testing that informs review of
  sourcing claims and facility standing."* — **Critical.**
- **Partner category "Compounding Facilities — Supply therapies
  manufactured to established quality and sourcing standards."**  
  Why: implies compounding facilities are Source Standard partners.
  Facilities are the *subjects* of Facility Records, not partners of
  the framework. If a specific facility becomes a formal partner,
  disclose it as such. — **Direction:** remove *"Compounding Facilities"*
  from the partner categories. Facilities belong in Facility Records,
  not on the Partners page. — **Critical.**
- **Partner category "Medical Advisors — Offer independent clinical
  oversight that keeps verification objective and evidence-based."**  
  Why: overlaps and blurs the boundary with the Medical Advisory Board.
  A consumer reading this cannot tell whether *Medical Advisors* here
  are the same people as the Medical Advisory Board or a different
  group. — **Direction:** either remove this category or rename to
  *"External Clinical Reviewers"* with a one-line clarification that
  external reviewers are distinct from the Medical Advisory Board. —
  **Recommended.**
- **Open spotlight: "Open is a physician-led organization focused on
  helping healthcare professionals better understand clinical outcomes..."**  
  Why: strong, on-voice, appropriate scope-boundary language ("Source
  Standard verifies where therapies come from. Open studies what happens
  after they are used."). Keep.

### 5.19 Report a Concern (`/report-a-concern`)

- **Hero: "Report a Concern"** and lead. On-voice. Keep.
- **§What can be reported / What cannot be reported / How concerns are
  reviewed / Evidence guidelines.** All on-voice. Keep.
- **Form success state: "Submission received / Concern logged for review /
  The submission has been added to the intake register. No additional
  action is required."**  
  Why: institutional and correct. Keep.
- **Confidentiality line under submit: "Your identity is kept
  confidential."**  
  Why: brief and reassuring. Keep.

### 5.20 Contact (`/contact`)

- **Hero: eyebrow "Get in touch" / title "Reach Source Standard".**  
  Why: eyebrow is startup-adjacent; the rest of the site uses more
  institutional eyebrow language (Framework, Public Guide, Public
  Reference, Public Intake Channel). — **Direction:** replace eyebrow
  with *"Correspondence"* or *"Direct channels"*. — **Recommended.**
- **Direct channels footnote: "For clinical questions or regulatory
  matters, please contact the appropriate healthcare professional or
  regulatory authority."**  
  Why: correct and on-voice. Keep.
- **Toast copy on submit: "Message received / We will respond within
  five business days."**  
  Why: concrete. Keep.

### 5.21 Terms (`/terms`)

- **Lead + §Registry access + §Citation + §Integrity + §Warranty +
  §Jurisdiction.**  
  Voice aligned throughout. Keep.
- **§Integrity item "Unauthorized use of marks — No use of Source
  Standard names, marks, or badge artwork..."**  
  Why: mentions *badge artwork*. If the badge program is not documented
  publicly elsewhere, this reference is orphaned. See §5.4. —
  **Direction:** either document the badge program or remove *badge
  artwork* from Terms. — **Critical.**

### 5.22 Privacy (`/privacy`)

- **Lead + §Partitioning + §Collection + §Retention + §Access.**  
  Voice aligned. Keep.
- **§Access: "authorized personnel and approved infrastructure partners
  operating under confidentiality and access-control requirements".**  
  Why: correct. If any specific processor requires disclosure, this
  page will need a subprocessor list — outside language-audit scope.
  Note only.

### 5.23 Unsubscribe (`/unsubscribe`)

- **All state copy.** Neutral, correct. Keep.

### 5.24 404 (`/*`)

- **Copy: "The page you requested isn't part of the public registry. It
  may have been moved, retired, or never existed."**  
  Why: institutional and slightly warm. Keep.
- **Return CTA: "← Return home"** — consistent with the site's arrow
  discipline. Keep.

### 5.25 ForVendors (`/for-vendors`)

- **§2.4 badge language.** See §5.4 and §5.21. — **Critical.**
- **§3 Administrative notice: "Initial intake is an administrative
  submission step and takes approximately fifteen minutes to complete."**  
  Why: concrete, on-voice. Keep.
- **Route relationship to Apply.** Content overlaps; not a language
  issue. Note only.

### 5.26 LibraryEntry + LibraryPublications + Library* pages

- **Multiple names in use: Clinical Reference Library, Publications,
  Library.** See §3 term row *Reference Library / Resource Library*. —
  **Direction:** retire all consumer-facing references to *Clinical
  Reference Library* and *Resource Library*. Either fold library
  entries into `/learn/education` under a Publications topic, or expose
  them under a single stable name. — **Recommended.**

### 5.27 Shared chrome

- **SiteHeader nav labels** — canonical set: Vendor Registry, Facility
  Records, How Verification Works, Partners, Advisory Board, Learn,
  About. Consistent. Keep.
- **Apply CTA** — "Apply for Verification" in header, footer, mobile
  overlay. Consistent. Keep.
- **SiteFooter legal band** — *"Source Standard is an independent
  public-reference and verification framework for compounded therapy
  vendor sourcing claims. Records reflect documentation reviewed within
  a defined scope and at a defined point in time. Verification does not
  constitute medical advice, regulatory approval, product approval,
  treatment recommendation, or a guarantee of safety, efficacy, or
  outcome."* — canonical disclaimer. Reuse verbatim in §9.
- **SiteFooter mobile status label: "System Status: Operational".**  
  Why: this is a Stripe / GitHub convention; the site is not a service
  with an uptime dashboard. Reads as decorative rather than functional.
  — **Direction:** either link the status pill to a real status page or
  remove it. — **Recommended.**
- **SiteFooter column "Standards" contains "Verification Framework /
  Status Definitions / Compliance / Advisory Board".**  
  Why: nav says *How Verification Works* for the same page; footer says
  *Verification Framework*. Two labels for one route. — **Direction:**
  pick one. Prefer *How Verification Works* everywhere the page is
  linked. Rename footer column entry accordingly. — **Recommended.**
- **BriefingHero / ArticleHeader / RecordHeader category eyebrows** —
  drift: "Organization" (About), "Public Guide" (HowItWorks), "Public
  Reference" (FAQ), "Framework · Verification Disclaimer" (VerDisclaimer),
  "Registry Standards" (StatusDefinitions), "Governance · Compliance"
  (Accountability), "Policy · Terms of Use" (Terms), "Policy · Privacy"
  (Privacy), "Learn · Education" (LearnEducation). Two patterns are
  fighting: single-word (*Organization*, *Partners*) and structured
  (*Governance · Compliance*). — **Direction:** adopt the structured
  pattern site-wide: *[Section] · [Document]*. Suggested mapping in
  §8. — **Recommended.**

---

## 6. Tone audit

The voice is close to a single voice. The instances where it slips:

**Promotional slips**
- Home §Governance pillar text — *"Verification standards are set
  independently of any vendor, manufacturer, or commercial interest."*
  reads correctly. But *"Independent Governance"* as a pillar label
  starts to sound like a marketing headline. Consider *"Governance"*
  alone.
- ForVendors §2 — *"A verification badge for use on vendor-controlled
  surfaces..."* — the badge concept is the site's most promotional
  moment. See §5.4.

**Defensive slips**
- Verification Disclaimer §"Verification is an evidence determination,
  not a guarantee" callout body — reads slightly anxious. The site's
  best posture on this same topic is About §"What We Don't Do", which
  is a calm definition list. Consider replacing the callout body with
  a single sentence: *"Verification reflects the information reviewed
  within a defined scope, and should always be read within the limits
  of that scope."*

**Startup-oriented slips**
- Contact eyebrow *"Get in touch"* — see §5.20.
- Footer status pill *"System Status: Operational"* — see §5.27.

**Repetitive**
- Multiple pages open with a variant of *"Source Standard is an
  independent public-reference organization / verification framework /
  documentation organization..."*. This is intentional cross-page
  reinforcement, which is fine. Guard against expanding it: pick one
  canonical opener (§9.1) and use *only that phrasing* when the concept
  is introduced.

**Over-technical**
- Governance §Anchors is dense but correct. Its purpose is to *be*
  dense. Keep.
- Accountability §Independent testing activity — *"Source Standard may
  incorporate independent testing results as part of the framework..."*
  is fine but reads as a hedge. Optional edit: drop *"as part of the
  framework"* which is implied.

**Over-simplified**
- Education `/what-does-verified-mean` reduces Verified to *"a
  sourcing-transparency check"*. That's true and accessible, but pair
  it with the canonical two-sentence definition from §9.5 so the
  simplification doesn't stand alone.

**Off-voice**
- MedicalAdvisory §Purpose closing sentence — *"Its responsibility is
  not to determine which vendors succeed or fail."* The word *succeed*
  is out of register for the rest of the page. — **Direction:** *"...
  not to determine the status of individual vendors."*

---

## 7. Misleading-language register

Every phrase whose surface reading could imply regulatory authority,
certification, endorsement, guarantee, laboratory ownership, or legal
authority. Direction is given, not full rewrite.

1. **Home §Mission: "sourcing and quality claims"** — implies quality
   evaluation. Drop *and quality*. **Critical.**
2. **Home §Registry NavCard "Recognized upstream sources"** — implies
   positive determination. Reframe. See §5.1. **Recommended.**
3. **Home §Audience "reference point for accountability"** — implies
   enforcement. Use *transparency*. **Recommended.**
4. **ForVendors §2.4 + Terms §Integrity "verification badge / badge
   artwork"** — badge = certification-mark posture. Scope or retire.
   **Critical.**
5. **Partners §Independent Laboratories "verify the quality and
   integrity of compounded therapies"** — implies quality certification
   through partner. Reframe. **Critical.**
6. **Partners §Compounding Facilities as a "partner category"** —
   implies preferred-vendor relationship. Remove. **Critical.**
7. **`/greenlist` context strip "Greenlisted facilities are currently
   recognized within the Source Standard framework"** — presented as
   default when in fact no facility is Greenlisted at launch. Reframe.
   **Critical.**
8. **Education `/what-does-greenlisted-mean` "a Greenlisted facility is
   one whose license and classification match public records"** —
   implies a registration check that Greenlisted is not. Rewrite.
   **Critical.**
9. **HowItWorks §Definition "compounding pharmacy or clinic has
   undergone independent review"** — implies pharmacies are verified
   under the vendor framework. Rewrite. **Critical.**
10. **FAQ §Verification "identity, licensure, sourcing relationships,
    and public claims have been reviewed"** — implies scope wider than
    verification actually covers. Align to §9.5. **Critical.**
11. **FAQ §Public Statuses "Pending Review", "Not Listed"** —
    fictional statuses. Remove. **Critical.**
12. **Governance §Advisory metric "Advisory body of record: Clinical"**
    — implies a body other than the Medical Advisory Board. Align.
    **Critical.**
13. **SiteFooter mobile "System Status: Operational"** — implies an
    uptime service. Link or remove. **Recommended.**

---

## 8. Consistency register

Editorial patterns that should be uniform site-wide. Each entry is a
rule, not a per-page fix.

**Button labels** (imperative, sentence case, no ellipsis):
- Primary intake CTA: *"Apply for Verification"* — site-wide, verbatim.
- Registry search submit: *"Search"* — verbatim.
- Report submission: *"Submit concern"* — verbatim.
- Load more: *"Load More"* — appears once as *Load More*, once as
  *Load more*. Standardize as *Load More* (title case matches Apply for
  Verification pattern).
- Do not use ellipsis in button labels (*"Sending…"* on Contact is the
  one loading-state exception; keep it).

**Status chip labels** (uppercase, single word):
- *VERIFIED · UNVERIFIED · UNDER REVIEW · SUSPENDED · REMOVED* for vendor.
- *GREENLISTED · MONITORING · STATUS ALERT* for facility.
- No *"Pending Review"*, no *"Not Listed"*, no *"Pending"*.

**Eyebrow patterns** (adopt structured pattern):
- Format: **[Section] · [Document]** in uppercase, tracked, mono.
- Examples: *"Framework · Verification"*, *"Governance · Compliance"*,
  *"Policy · Privacy"*, *"Registry · Standards"*, *"Learn · Education"*.
- Single-word eyebrows (*"Organization"*, *"Partners"*, *"Learn"*,
  *"Education"*) should be upgraded to structured form so the pattern
  is uniform.

**Sidebar metadata (RecordHeader):**
- Include when the page is an institutional record: About, Governance,
  Accountability, Medical Advisory, FAQ, HowToReadTheDirectory, Terms,
  Privacy, VerificationDisclaimer, StatusDefinitions.
- Do not include on conversational or task pages: Home, Learn hub,
  Learn topics, Contact, Apply, Report a Concern.
- Metadata order: *Doc · Version · Status · Updated · Jurisdiction*.
- *Updated* format: *MM/DD/YY* (per Governance) — apply site-wide.
  Currently mixes *04/21/26*, *04 / 21 / 2026*, *April 21, 2026*.

**Cross-reference lists ("Continue reading" / "Read deeper"):**
- Prefer *"Continue reading"* (used by Terms, Accountability,
  StatusDefinitions).
- Retire *"Read deeper"* (used by FAQ).

**Arrows:**
- ASCII → in eyebrow-level chevrons and cross-reference links.
- Chevron-right icon inside NavCard rows.
- Unicode ‹ › in EditorialBackLink labels and similar in-body links.
- Do not mix inside a single component.

**Punctuation:**
- Middle dot *·* only between eyebrow segments and record metadata.
- Em dash — for parenthetical breaks.
- Never ellipsis in a completed sentence. Reserve for input placeholders
  (already true).
- Never comma before ellipsis (*"..., ..."* appears once on Vendor
  Registry search placeholder — remove).

**Case:**
- Sentence case for headings and subheadings.
- Title Case for the six navigation labels only (Vendor Registry,
  Facility Records, How Verification Works, Advisory Board, Learn,
  About).
- UPPERCASE only for eyebrows, chip labels, and small utility text.

**Terminology substitutions to apply site-wide (search and replace after
approving §9):**
- *listing / listings* → *record / records* (already done in the last
  pass; keep the rule).
- *directory* → *registry*.
- *the Greenlist* → *Facility Records* (page name) or *the Greenlisted
  status* (label).
- *Clinical Oversight* → *Medical Advisory Board* (or *the Board*).
- *Not Listed* → remove.
- *Pending Review* → remove.
- *peptide sourcing transparency* → *sourcing transparency*.
- *sourcing and quality claims* → *sourcing claims*.
- *Resource Library / Reference Library / Clinical Reference Library* →
  *Learn* or *Education*.

---

## 9. Canonical Messaging Standard

The single reference for all future writing. Every phrase below is
intended to appear *verbatim* on the surfaces named. Deviations in
future copy should require an explicit reason.

### 9.1 Who Source Standard is

> Source Standard is an independent public-reference organization that
> maintains verification records for the compounded therapy market.

Use verbatim on: About hero lead, SiteFooter legal band, JSON-LD org
description, `/about` §Why We Exist opening, any press or partnership
one-liner.

### 9.2 Why Source Standard exists

> Consumers increasingly rely on sourcing claims they cannot
> independently verify. Source Standard exists to improve transparency
> by providing independent verification and factual public-reference
> records that help make those claims more transparent.

Use verbatim on: Home §Mission, `/about` §Why We Exist. Do not
paraphrase for effect — repetition across surfaces is the point.

### 9.3 What Source Standard does

Three canonical actions, always in this order and always in this form:

1. **Map the market.** Identify and maintain records for compounded
   therapy vendors and the compounding facilities they rely on.
2. **Verify sourcing claims.** Review documentation and available
   evidence supporting vendor sourcing claims within the Source Standard
   framework.
3. **Maintain the public record.** Publish verification status and keep
   records current as new information becomes available.

Use verbatim on: Home §How, About §Our Role (may compress but must
preserve the three verbs and their order).

The **Medical Advisory Board** is the single canonical name for the
advisory body. Retire *Clinical Oversight* and *Advisory body of
record — Clinical*. On second reference within a page, *the Board* is
acceptable.

### 9.4 What Source Standard does not do

Canonical short list, in this order:

- Source Standard is not a regulator.
- Source Standard is not a pharmacy, manufacturer, or laboratory.
- Source Standard is not a healthcare provider.
- Source Standard is not a certification body.
- Source Standard does not endorse, rank, or recommend vendors.
- Source Standard does not evaluate product safety, efficacy, potency,
  sterility, or clinical outcomes.

Use verbatim on: About §What We Don't Do, VerificationDisclaimer
§Institutional boundaries. HowItWorks §Does not mean and MedicalAdvisory
§Scope & Boundaries may expand this list with page-specific items but
must preserve the six items above unchanged as the first six entries.

### 9.5 How Verification should always be explained

Canonical two-sentence definition:

> Verification is a documented review of the sourcing information a
> vendor publishes, conducted within the Source Standard framework.
> **Verified** means the vendor's sourcing representations were
> supported by the information reviewed within a defined scope at the
> time of review.

Canonical two-sentence disclaimer, always adjacent:

> Verification does not constitute medical advice, regulatory approval,
> product approval, treatment recommendation, or a guarantee of safety,
> efficacy, or outcome. It reflects reviewed information within a
> defined scope and should always be read within the limits of that
> scope.

Use verbatim on: HowItWorks §Definition, VerificationDisclaimer
opening, StatusDefinitions §Verified, Education
`/what-does-verified-mean`, SiteFooter legal band (already close;
align).

### 9.6 Canonical status set

Vendor statuses (five):

1. **Verified** — the vendor's sourcing representations were supported
   by the information reviewed within a defined scope at the time of
   review.
2. **Under Review** — a Source Standard review is in progress. Does not
   imply any conclusion about the vendor.
3. **Unverified** — no Source Standard verification is currently
   published for the vendor. Does not by itself imply the vendor is
   unsafe, noncompliant, or illegitimate. *(HowToReadTheDirectory §4
   contains the strongest existing wording; adopt it verbatim.)*
4. **Suspended** — a previously published verification is temporarily
   withdrawn while a matter is clarified. Does not constitute a final
   adverse finding.
5. **Removed** — the record has been withdrawn from active
   verification. Re-entry requires a new submission and review.

Facility statuses (three):

1. **Monitoring** — the facility is included in the Source Standard
   database and is followed against public records and supporting
   information. This is the default state. Does not imply a negative
   finding.
2. **Greenlisted** — the facility's records and supporting information
   currently support Greenlisted status under the Source Standard
   framework. Not a registration check. Does not imply guaranteed
   quality or regulatory endorsement.
3. **Status Alert** — public records or other information indicate that
   additional review is warranted before the current status can be
   confirmed. Does not imply a final determination.

Retire from every surface:

- *Pending Review*
- *Not Listed*
- Any status label not in the two lists above.

Enumeration must match this set verbatim on: Home §Registry fields,
StatusDefinitions, HowToReadTheDirectory §3, FAQ §Verification statuses,
`/greenlist` status guide, `/verified-vendors` filter pills.

### 9.7 How Facility Records should always be explained

Canonical explanation:

> Facility Records list the compounding pharmacies, outsourcing
> facilities, and manufacturers followed by Source Standard. Each
> record shows the facility's current status within the framework.
> Facilities enter the record in **Monitoring** status. **Greenlisted**
> is a status a facility may earn under the framework; it is not a
> registration check.

Use verbatim on: `/greenlist` context strip, FAQ §Facility Records,
Education `/what-does-greenlisted-mean` opening.

### 9.8 How Vendor Registry should always be explained

Canonical explanation:

> The Vendor Registry lists compounded therapy vendors reviewed under
> the Source Standard framework. Each record shows the vendor's current
> verification status and, where applicable, the pharmacies and
> facilities the vendor relies on.

Use verbatim on: Home §Registry, `/verified-vendors` hero secondary,
FAQ §Vendor Registry, Education `/what-does-verified-mean` context.

### 9.9 How Independence should always be described

Canonical statement:

> Source Standard is not owned by, financed by, or operated on behalf
> of any vendor, manufacturer, or pharmacy. Verification status is
> never influenced by commercial relationships. The standards used to
> evaluate sourcing claims are published in full and available for
> public review.

Use verbatim on: About §Independence, Governance §Neutrality (as the
first paragraph), Partners hero secondary, VerificationDisclaimer
§Framework interpretation.

### 9.10 How Monitoring should always be described

Two senses, always disambiguated on first use:

- **Monitoring (facility status):** the default state of a facility in
  the Facility Records — followed against public records and
  supporting information.
- **Monitoring (activity):** the ongoing internal process of following
  facilities, vendors, and public records against the framework.

In consumer copy, prefer *followed* over *monitored* when the noun is
absent (e.g., *"pharmacies followed by Source Standard"* rather than
*"pharmacies monitored by Source Standard"*).

### 9.11 Voice and tone rules

- One idea per paragraph. Two sentences per paragraph as the default.
- No hedge stacks. If a sentence needs three qualifiers, split it.
- No marketing intensifiers: *world-class*, *cutting-edge*, *leading*,
  *first-of-its-kind*, *best-in-class*.
- No startup register: *powered by*, *your one-stop*, *unlock*,
  *seamless*, *simply*.
- No emojis. No decorative Unicode. No exclamation marks.
- No ellipses in prose. Ellipses are allowed only inside input
  placeholders and loading states.
- No em dashes stacked in one paragraph beyond one instance.
- Passive voice is acceptable and often preferred when the actor is the
  framework itself (*"records are reviewed"*).
- Contractions are acceptable in consumer copy on Home, Learn,
  Education, and FAQ. Avoid in policy pages (Terms, Privacy,
  VerificationDisclaimer, Accountability, Governance).
- Numerals: spell out one through nine in prose; use digits for 10+ and
  for all statistics, statuses, or record counts.

### 9.12 Terminology reference card

One-line canonical definitions. Anchored copy of §3.

- **Provider.** The consumer-facing entity a patient interacts with
  (clinic, telehealth company, in-person practice). Use in consumer
  copy. Not a synonym for *clinician*.
- **Vendor.** The operator whose record is reviewed by Source Standard.
  Use in registry, framework, and policy pages.
- **Facility.** Any upstream entity in Facility Records — a 503A
  pharmacy, 503B outsourcing facility, or manufacturer.
- **Pharmacy.** A licensed compounding pharmacy (503A or 503B). Specify
  when only 503A is meant.
- **Manufacturer.** An FDA-registered drug or API manufacturer distinct
  from a compounding pharmacy.
- **Verification.** A documented review of the sourcing information a
  vendor publishes, conducted within the Source Standard framework.
- **Verified.** The status assigned when the vendor's sourcing
  representations are supported by the reviewed information within a
  defined scope.
- **Verification status.** One of the five vendor statuses or three
  facility statuses in §9.6.
- **Record.** A single entry (vendor or facility) in the registry.
- **Registry.** The collection of records.
- **Review.** The process of examining a submitted record against the
  framework.
- **Monitoring.** Default facility status; also the internal activity
  of following facilities and vendors.
- **Greenlisted.** Facility status assigned when framework criteria
  are met.
- **Framework.** The set of standards, criteria, and processes Source
  Standard applies. Do not swap for *program*, *system*, or *methodology*.
- **Independent verification.** Verification conducted within Source
  Standard's framework and independent of the vendor being reviewed.
- **Public-reference records.** The public-facing portion of the
  registry. Hyphenated.
- **Sourcing claims.** Consumer-facing term for a vendor's
  representations about who prepares and supplies its products.
- **Sourcing representations.** Policy-register equivalent of *sourcing
  claims*. Use in Terms, Privacy, Accountability, VerificationDisclaimer.
- **Compounded therapy.** Preferred singular term for the market Source
  Standard covers. Plural: *compounded therapies*.

### 9.13 Order of operations for the copy pass

When the copy pass is approved, apply changes in this order to
minimize churn:

1. Apply §9.6 (statuses) everywhere they are enumerated.
2. Apply §9.7 and rename all remaining *Greenlist* / *Greenlisted*
   references to *Facility Records* / *Greenlisted status*.
3. Apply §9.3's *Medical Advisory Board* to every instance of *Clinical
   Oversight* and *Advisory body of record — Clinical*.
4. Apply §5.1 fixes to Home (drop *peptide*, drop *quality*).
5. Apply §5.4 (retire or scope *badge*).
6. Apply §5.15 (align HowItWorks subject to *vendor*).
7. Apply §9.5 canonical Verification definition to the five surfaces.
8. Apply §5.18 fixes to Partners.
9. Sweep §8's search-and-replace list.
10. Sweep §8's chrome and eyebrow standardization.

Do not attempt this list in a single pass. Each numbered step is a
scoped edit worth reviewing independently.

---

*End of audit.*
