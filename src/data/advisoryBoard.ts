export type BoardMember = {
  slug: string;
  name: string;
  credentials: string;
  boardTitle: string;
  specialization: string;
  shortSummary: string;
  biography: string;
  accomplishments: string[];
  whyTheyCare: string;
  contribution: string;
  clinicalFocus: string[];
  philosophy: string;
  jurisdiction: string;
  yearsPracticing: string;
};

// NOTE: Placeholder profiles for design and structural mockup only.
// To be replaced with real medical advisory board members prior to public launch.
export const advisoryBoard: BoardMember[] = [
  {
    slug: "advisor-01",
    name: "[Placeholder] Advisor 01",
    credentials: "MD, FACP",
    boardTitle: "Chair, Medical Advisory Board",
    specialization: "Internal Medicine · Endocrinology",
    shortSummary:
      "Board chair providing clinical oversight of framework criteria, evidence standards, and renewal intervals across the Source Standard registry.",
    biography:
      "Placeholder biography reserved for the formally appointed Chair of the Medical Advisory Board. The Chair is responsible for convening review sessions, ratifying framework revisions, and representing the board's clinical position on standards published under the Source Standard reference framework.",
    accomplishments: [
      "Two decades of clinical practice in internal medicine and endocrine care",
      "Prior service on hospital pharmacy and therapeutics committees",
      "Published contributor on prescribing standards and patient-safety oversight",
      "Active state medical license in good standing",
    ],
    whyTheyCare:
      "The compounded therapy and longevity sector has expanded faster than its oversight infrastructure. Patients deserve a public reference layer that distinguishes clinics operating under verifiable upstream sourcing from those that do not.",
    contribution:
      "Chairs framework review cycles, ratifies criteria revisions, and signs off on the quarterly Standard maintenance record published under SS-FRAMEWORK-2026.01.",
    clinicalFocus: [
      "Hormone replacement therapy oversight",
      "Compounded therapy sourcing review",
      "Prescriber accountability standards",
      "Public-facing clinical communication",
    ],
    philosophy:
      "Clinical oversight is not a credential to display — it is a recurring practice. A standard that is not periodically re-examined by physicians is not a standard; it is a snapshot. The board exists to keep this framework honest against evolving clinical reality.",
    jurisdiction: "FL / US",
    yearsPracticing: "20+",
  },
  {
    slug: "advisor-02",
    name: "[Placeholder] Advisor 02",
    credentials: "MD",
    boardTitle: "Vice Chair · Compounding & Sourcing Review",
    specialization: "Pharmacology · 503A / 503B Sourcing",
    shortSummary:
      "Reviews upstream pharmacy sourcing criteria and oversees the Greenlist evaluation methodology applied to 503A and 503B facilities.",
    biography:
      "Placeholder biography reserved for the Vice Chair responsible for the upstream sourcing layer of the Source Standard framework. This seat oversees how compounding pharmacies are evaluated for inclusion in the Greenlist and how those records map to publicly citable FDA and PCAB authorities.",
    accomplishments: [
      "Clinical pharmacology background with focus on compounded preparations",
      "Familiarity with USP <795>, <797>, and <800> compounding chapters",
      "Prior consulting role on outsourcing facility quality programs",
      "Contributor to public-safety reviews of compounded therapies",
    ],
    whyTheyCare:
      "The integrity of any clinic prescribing compounded therapy is bounded by the integrity of the pharmacy preparing it. Public reference to upstream sourcing closes a gap that patients cannot reasonably investigate on their own.",
    contribution:
      "Approves the Greenlist evaluation rubric, reviews PCAB and FDA establishment records cited in pharmacy entries, and authorizes status changes recorded in SS-GRN-2026.01.",
    clinicalFocus: [
      "503A traditional compounding review",
      "503B outsourcing facility evaluation",
      "USP chapter benchmarking",
      "Recall and warning-letter monitoring",
    ],
    philosophy:
      "A pharmacy's compliance posture is a public record — the framework simply makes that record legible. The board's role is to ensure the rubric used to read those records is defensible to any reviewing clinician.",
    jurisdiction: "US (Multi-state)",
    yearsPracticing: "18+",
  },
  {
    slug: "advisor-03",
    name: "[Placeholder] Advisor 03",
    credentials: "MD, MPH",
    boardTitle: "Member · Patient Safety & Public Communication",
    specialization: "Preventive Medicine · Public Health",
    shortSummary:
      "Reviews how framework determinations are communicated to the public, with emphasis on accuracy, restraint, and informed-consumer language.",
    biography:
      "Placeholder biography reserved for the board seat focused on patient-facing communication. This seat ensures that public registry pages, status definitions, and disclaimers represent clinical reality accurately and avoid implying endorsement beyond what the framework actually verifies.",
    accomplishments: [
      "Clinical practice in preventive and population health",
      "Public-health policy background with emphasis on health communication",
      "Prior advisory role on patient-information materials",
      "Active engagement with informed-consent standards",
    ],
    whyTheyCare:
      "Public registries influence patient decisions whether they intend to or not. Language and structure are clinical instruments here, and they need to be reviewed with the same care given to any other published standard.",
    contribution:
      "Reviews public-facing status definitions, disclaimers, and educational reference pages before publication; signs off on tone and scope of communicated determinations.",
    clinicalFocus: [
      "Patient-facing disclosure language",
      "Informed-consumer communication",
      "Status definition accuracy",
      "Educational reference review",
    ],
    philosophy:
      "What a registry implies matters as much as what it states. The board's job on this seat is to make sure inference and statement remain aligned.",
    jurisdiction: "US",
    yearsPracticing: "15+",
  },
  {
    slug: "advisor-04",
    name: "[Placeholder] Advisor 04",
    credentials: "PharmD, BCPS",
    boardTitle: "Member · Pharmacy Standards Liaison",
    specialization: "Clinical Pharmacy · Sterile Compounding",
    shortSummary:
      "Pharmacy-side reviewer ensuring that framework criteria align with current USP standards and state board of pharmacy expectations.",
    biography:
      "Placeholder biography reserved for the pharmacy standards liaison seat. This seat brings pharmacist-side expertise to framework reviews, ensuring criteria for sterile and non-sterile compounded preparations are anchored to currently enforceable standards.",
    accomplishments: [
      "Board-certified pharmacotherapy specialist credential",
      "Direct sterile compounding oversight experience",
      "Familiarity with state board of pharmacy inspection records",
      "Active continuing-education engagement on USP revisions",
    ],
    whyTheyCare:
      "Clinics and pharmacies operate under overlapping but distinct regulatory layers. A reference framework that ignores either layer fails the patient. This seat exists to keep both in view.",
    contribution:
      "Cross-checks pharmacy criteria against current USP and state board guidance; flags when framework language drifts from currently enforceable standards.",
    clinicalFocus: [
      "USP <797> sterile compounding",
      "USP <800> hazardous drug handling",
      "State board of pharmacy alignment",
      "Pharmacist-prescriber coordination",
    ],
    philosophy:
      "Standards age. The board's responsibility is to notice when they have, and to revise the framework before the gap becomes a patient-safety question.",
    jurisdiction: "US (Multi-state)",
    yearsPracticing: "12+",
  },
  {
    slug: "advisor-05",
    name: "[Placeholder] Advisor 05",
    credentials: "MD",
    boardTitle: "Member · Education & Reference Review",
    specialization: "Family Medicine · Clinical Education",
    shortSummary:
      "Reviews educational reference material published under the framework to ensure clinical accuracy and appropriate scope.",
    biography:
      "Placeholder biography reserved for the seat responsible for educational reference review. This seat ensures that any clinical or procedural explanation published on the site stays within the bounds of what the framework can substantiate.",
    accomplishments: [
      "Primary-care practice with emphasis on patient education",
      "Prior faculty role in clinical training",
      "Contributor to layperson-accessible medical reference material",
      "Active state medical license in good standing",
    ],
    whyTheyCare:
      "Patients reading public reference material often have no other clinician in the room. The framework's educational pages need to be written as if they will be the only source consulted, even though they should not be.",
    contribution:
      "Reviews educational reference pages and explanatory copy; ensures language remains within the framework's defensible scope and does not drift into clinical advice.",
    clinicalFocus: [
      "Educational reference accuracy",
      "Scope-of-framework discipline",
      "Patient-accessible language",
      "Cross-reference verification",
    ],
    philosophy:
      "A reference that knows its own limits is more useful than one that does not. This seat exists to keep the framework's educational layer disciplined about what it is and is not saying.",
    jurisdiction: "US",
    yearsPracticing: "14+",
  },
];

export const responsibilities: { code: string; title: string; description: string }[] = [
  {
    code: "R-01",
    title: "Audit oversight",
    description:
      "Reviews internal verification audits and confirms that determinations recorded on vendor and pharmacy entries match the underlying evidence.",
  },
  {
    code: "R-02",
    title: "Greenlist review",
    description:
      "Approves the rubric used to evaluate compounding pharmacies for inclusion and authorizes status changes recorded in the registry.",
  },
  {
    code: "R-03",
    title: "Policy refinement",
    description:
      "Maintains and revises framework policy language as upstream authorities update guidance or as enforcement patterns shift.",
  },
  {
    code: "R-04",
    title: "Standard evolution",
    description:
      "Ratifies versioned changes to the Source Standard framework and records rationale in the published maintenance log.",
  },
  {
    code: "R-05",
    title: "Educational review",
    description:
      "Reviews public reference and educational pages for clinical accuracy and appropriate scope before publication.",
  },
  {
    code: "R-06",
    title: "Clinical guidance",
    description:
      "Provides clinician-side perspective on prescriber accountability standards and the limits of what the framework can substantiate.",
  },
  {
    code: "R-07",
    title: "Sourcing & patient-safety perspective",
    description:
      "Anchors framework criteria to upstream pharmacy sourcing realities and to currently enforceable patient-safety standards.",
  },
];
