export type Lane = "series" | "guide" | "faq" | "supplementary";
export type EntryStatus = "published" | "in-review" | "outlined" | "forthcoming";

export type EntryLevel = "intro" | "intermediate";

export type LibraryEntry = {
  id: string;
  slug: string;
  lane: Lane;
  title: string;
  summary: string;
  status: EntryStatus;
  reviewedBy?: string;
  level?: EntryLevel;
};

export type FAQGroup = "legality" | "verification" | "methodology" | "due-diligence";

export type FAQEntry = {
  id: string;
  group: FAQGroup;
  q: string;
  a: string;
  relatedSlug?: string;
};

export type SupplementaryFormat = {
  id: string;
  title: string;
  description: string;
  status: "forthcoming" | "active";
  cta?: { label: string; to: string };
};

export const FAQ_GROUP_LABEL: Record<FAQGroup, string> = {
  legality: "Legality & access",
  verification: "Verification & status",
  methodology: "Methodology",
  "due-diligence": "Consumer due diligence",
};

export const ENTRY_STATUS_LABEL: Record<EntryStatus, string> = {
  published: "Published",
  "in-review": "In review",
  outlined: "Outlined",
  forthcoming: "Forthcoming",
};

export const librarySeries: LibraryEntry[] = [
  {
    id: "SS-SERIES-000A",
    slug: "what-are-peptides",
    lane: "series",
    title: "What Are Peptides?",
    summary:
      "A plain-language introduction to peptides, what they are, how they're used clinically, and why sourcing matters.",
    status: "outlined",
    level: "intro",
  },
  {
    id: "SS-SERIES-000B",
    slug: "what-is-compounding",
    lane: "series",
    title: "What Is Compounding?",
    summary:
      "An overview of pharmacy compounding, the difference between 503A and 503B facilities, and why the distinction matters.",
    status: "outlined",
    level: "intro",
  },
  {
    id: "SS-SERIES-001",
    slug: "the-2026-compounding-reclassification",
    lane: "series",
    title: "The 2026 Compounding Reclassification",
    summary:
      "Background and implications of the 2026 regulatory reclassification across 503A and 503B compounding categories.",
    status: "outlined",
  },
  {
    id: "SS-SERIES-002",
    slug: "how-to-read-a-certificate-of-analysis",
    lane: "series",
    title: "How to Read a Certificate of Analysis",
    summary:
      "What a Certificate of Analysis documents, what it does not, and how to interpret common test sections.",
    status: "outlined",
    level: "intro",
  },
  {
    id: "SS-SERIES-003",
    slug: "the-dual-layer-difference",
    lane: "series",
    title: "The Dual-Layer Difference",
    summary:
      "Why Source Standard verifies both the clinic and the upstream pharmacy, and what each layer is responsible for.",
    status: "in-review",
    level: "intro",
  },
  {
    id: "SS-SERIES-004",
    slug: "questions-to-ask-your-clinic",
    lane: "series",
    title: "Questions to Ask Your Clinic",
    summary:
      "A neutral checklist consumers can use when evaluating a clinic's sourcing, documentation, and clinical practices.",
    status: "outlined",
  },
  {
    id: "SS-SERIES-005",
    slug: "what-source-standard-verification-actually-means",
    lane: "series",
    title: "What Source Standard Verification Actually Means",
    summary:
      "The scope, limits, and reviewable evidence behind a verified listing in the Source Standard registry.",
    status: "outlined",
  },
  {
    id: "SS-SERIES-006",
    slug: "warning-signs-of-undocumented-sourcing",
    lane: "series",
    title: "Warning Signs of Undocumented Sourcing",
    summary:
      "Patterns and disclosures that indicate a clinic may be operating outside documented sourcing channels.",
    status: "outlined",
  },
];

export const libraryGuides: LibraryEntry[] = [
  {
    id: "SS-GUIDE-001",
    slug: "safe-peptide-handling-and-reconstitution",
    lane: "guide",
    title: "Why Supply Chains Matter in Compounded Therapy",
    summary:
      "How compounded medications move through facilities, vendors, and consumers, and why sourcing transparency matters.",
    status: "outlined",
    reviewedBy: "Medical Advisory Board",
  },
  {
    id: "SS-GUIDE-002",
    slug: "sanitization-and-aseptic-technique-fundamentals",
    lane: "guide",
    title: "Sanitization and Aseptic-Technique Fundamentals",
    summary:
      "Foundational aseptic-technique principles relevant to compounded sterile preparation handling.",
    status: "outlined",
    reviewedBy: "Medical Advisory Board",
  },
  {
    id: "SS-GUIDE-003",
    slug: "the-science-of-aging-and-trt",
    lane: "guide",
    title: "The Science of Aging and TRT",
    summary:
      "Overview of endocrinological mechanisms relevant to age-related hormonal change and TRT clinical context.",
    status: "outlined",
    reviewedBy: "Medical Advisory Board",
  },
  {
    id: "SS-GUIDE-004",
    slug: "dosing-guidance-summaries-for-common-compounds",
    lane: "guide",
    title: "Dosing-Guidance Summaries for Common Compounds",
    summary:
      "High-level reference summaries of dosing ranges commonly cited for selected compounds. Not personalized advice.",
    status: "outlined",
    reviewedBy: "Medical Advisory Board",
  },
  {
    id: "SS-GUIDE-005",
    slug: "storage-and-stability-fundamentals",
    lane: "guide",
    title: "Storage and Stability Fundamentals",
    summary:
      "Temperature, light, and time-based stability considerations for compounded and biologic preparations.",
    status: "outlined",
    reviewedBy: "Medical Advisory Board",
  },
  {
    id: "SS-GUIDE-006",
    slug: "sterile-injectable-handling-for-consumers",
    lane: "guide",
    title: "Sterile Injectable Handling for Consumers",
    summary:
      "Consumer-facing reference on handling, site preparation, and disposal of sterile injectable products.",
    status: "outlined",
    reviewedBy: "Medical Advisory Board",
  },
];

export const libraryFaqs: FAQEntry[] = [
  {
    id: "SS-FAQ-001",
    group: "legality",
    q: "Is it legal to buy peptides online?",
    a: "Legality depends on the specific compound, its regulatory classification, and the prescriber and dispenser involved. Many peptides are restricted to prescription-only dispensing through licensed pharmacies. Direct online purchase outside a prescriber–pharmacy relationship is generally outside the legal channel.",
  },
  {
    id: "SS-FAQ-002",
    group: "legality",
    q: "What does 'research use only' actually mean?",
    a: "'Research use only' indicates a product has not been authorized for human therapeutic use. Materials sold under that label are not within the regulated medical supply chain and are not equivalent to prescribed compounded preparations.",
  },
  {
    id: "SS-FAQ-003",
    group: "verification",
    q: "Why are some vendors listed as Unverified?",
    a: "Unverified means a vendor has not completed the Source Standard review process, or that the available documentation did not establish a verified status. It is descriptive of review state, not an accusation.",
    relatedSlug: "what-source-standard-verification-actually-means",
  },
  {
    id: "SS-FAQ-004",
    group: "verification",
    q: "Does Source Standard guarantee product safety?",
    a: "No. Source Standard documents reviewable sourcing and operational evidence at the time of review. It does not guarantee individual product safety, clinical outcomes, or future conduct.",
    relatedSlug: "what-source-standard-verification-actually-means",
  },
  {
    id: "SS-FAQ-005",
    group: "verification",
    q: "What is the difference between Verified and Under Review?",
    a: "Verified indicates the registry has accepted documented evidence supporting the listing. Under Review indicates the file is open and being evaluated, with no determination yet recorded.",
  },
  {
    id: "SS-FAQ-006",
    group: "methodology",
    q: "What is blind purchase testing?",
    a: "Blind purchase testing is the practice of acquiring a product through ordinary consumer channels, without identifying the buyer as a reviewer, and submitting that product for independent analysis.",
  },
  {
    id: "SS-FAQ-007",
    group: "methodology",
    q: "What does a Certificate of Analysis actually prove?",
    a: "A Certificate of Analysis records test results for a specific lot against defined specifications. It does not establish chain-of-custody outside the tested lot, nor does it speak to clinical handling after dispensing.",
    relatedSlug: "how-to-read-a-certificate-of-analysis",
  },
  {
    id: "SS-FAQ-008",
    group: "methodology",
    q: "How often is the registry updated?",
    a: "The registry is reviewed on a continuous basis. Listings are updated as new documentation, status changes, or reported concerns are processed.",
  },
  {
    id: "SS-FAQ-009",
    group: "due-diligence",
    q: "What should I ask a clinic before starting treatment?",
    a: "Ask which pharmacy dispenses your preparation, whether it is a 503A or 503B facility, whether a Certificate of Analysis is available for the relevant lot, and what the clinic's protocol is for handling adverse events.",
    relatedSlug: "questions-to-ask-your-clinic",
  },
  {
    id: "SS-FAQ-010",
    group: "due-diligence",
    q: "How should I evaluate a clinic that is not listed?",
    a: "Absence from the registry is not a determination. Evaluate sourcing transparency, prescriber credentials, dispensing pharmacy disclosure, and willingness to provide documentation on request.",
  },
];

export const librarySupplementary: SupplementaryFormat[] = [
  {
    id: "SS-SUP-001",
    title: "Video Library",
    description:
      "Short, structured clinical explainers and walkthroughs covering sourcing, documentation, and verification topics.",
    status: "forthcoming",
    cta: { label: "Notify me", to: "/contact" },
  },
  {
    id: "SS-SUP-002",
    title: "Live Monthly Webinars",
    description:
      "Recurring sessions with members of the Medical Advisory Board and the registry team. Registration and archive forthcoming.",
    status: "forthcoming",
    cta: { label: "Notify me", to: "/contact" },
  },
  {
    id: "SS-SUP-003",
    title: "Integrity Report Feed",
    description:
      "Periodic published reports summarizing directory-wide findings, status changes, and methodological updates.",
    status: "forthcoming",
    cta: { label: "Notify me", to: "/contact" },
  },
];

export const findLibraryEntry = (slug: string): LibraryEntry | undefined =>
  [...librarySeries, ...libraryGuides].find((e) => e.slug === slug);
