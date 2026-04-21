import advisor01 from "@/assets/advisors/advisor-01.jpg";
import advisor02 from "@/assets/advisors/advisor-02.jpg";
import advisor03 from "@/assets/advisors/advisor-03.jpg";
import advisor04 from "@/assets/advisors/advisor-04.jpg";
import advisor05 from "@/assets/advisors/advisor-05.jpg";
import advisor06 from "@/assets/advisors/advisor-06.jpg";

export type BoardMember = {
  slug: string;
  name: string;
  credentials: string;
  boardTitle: string;
  specialization: string;
  shortSummary: string;
  biography: string;
  background: string[];
  accomplishments: string[];
  whyTheyCare: string;
  contribution: string;
  clinicalFocus: string[];
  philosophy: string;
  jurisdiction: string;
  yearsPracticing: string;
  photo: string;
};

// NOTE: Placeholder profiles for design and structural mockup only.
// Names, photos, and biographical detail are illustrative and will be
// replaced with formally appointed advisors prior to public launch.
export const advisoryBoard: BoardMember[] = [
  {
    slug: "advisor-01",
    name: "Dr. Eleanor Whitfield",
    credentials: "MD, FACP",
    boardTitle: "Chair, Medical Advisory Board",
    specialization: "Internal Medicine · Endocrinology",
    shortSummary:
      "Board chair providing clinical oversight of framework criteria, evidence standards, and renewal intervals across the Source Standard registry.",
    biography:
      "Dr. Whitfield is a board-certified internist and endocrinologist with two decades of practice focused on hormone health, metabolic disease, and the prescribing standards surrounding compounded therapies. She has served on hospital pharmacy and therapeutics committees, contributed to institutional review of compounded preparations, and lectured on prescriber accountability at multiple academic medical centers. As Chair of the Medical Advisory Board, she convenes review sessions, ratifies framework revisions, and represents the board's clinical position on standards published under the Source Standard reference framework.",
    background: [
      "MD — University of Michigan Medical School",
      "Internal Medicine residency — Cleveland Clinic Foundation",
      "Endocrinology fellowship — Mayo Clinic",
      "Board-certified, American Board of Internal Medicine (Endocrinology, Diabetes & Metabolism)",
      "Fellow, American College of Physicians",
    ],
    accomplishments: [
      "Twenty years of clinical practice in internal medicine and endocrine care",
      "Former chair of a regional pharmacy and therapeutics committee",
      "Published author on prescribing standards for compounded hormone therapy",
      "Active state medical license in good standing across multiple jurisdictions",
      "Recurring invited reviewer for clinical guideline updates in endocrine practice",
    ],
    whyTheyCare:
      "The compounded therapy and longevity sector has expanded faster than its oversight infrastructure. Patients deserve a public reference layer that distinguishes clinics operating under verifiable upstream sourcing from those that do not — and clinicians deserve a framework that holds the field accountable to its own stated standards.",
    contribution:
      "Chairs framework review cycles, ratifies criteria revisions, and signs off on the quarterly Standard maintenance record published under SS-FRAMEWORK-2026.01. Final clinical authority on disputes regarding scope, evidence, and renewal intervals.",
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
    photo: advisor01,
  },
  {
    slug: "advisor-02",
    name: "Dr. Anand Krishnamurthy",
    credentials: "MD",
    boardTitle: "Vice Chair · Compounding & Sourcing Review",
    specialization: "Pharmacology · 503A / 503B Sourcing",
    shortSummary:
      "Reviews upstream pharmacy sourcing criteria and oversees the Greenlist evaluation methodology applied to 503A and 503B facilities.",
    biography:
      "Dr. Krishnamurthy is a clinical pharmacologist whose career has centered on the regulatory and quality-control layer beneath prescribed therapy. He has consulted with outsourcing facility quality programs, advised on internal review processes for compounded sterile preparations, and worked extensively with the USP compounding chapters that define the operational baseline for 503A and 503B pharmacies. As Vice Chair of the Medical Advisory Board, he oversees how compounding pharmacies are evaluated for inclusion in the Greenlist and how those records map to publicly citable FDA and PCAB authorities.",
    background: [
      "MD — Johns Hopkins University School of Medicine",
      "Clinical pharmacology fellowship — Vanderbilt University Medical Center",
      "Prior consulting role — 503B outsourcing facility quality programs",
      "Active engagement with USP <795>, <797>, and <800> revisions",
    ],
    accomplishments: [
      "Eighteen years of clinical pharmacology practice",
      "Consulting reviewer for outsourcing facility quality programs",
      "Contributor to public-safety reviews of compounded therapies",
      "Speaker on 503A versus 503B regulatory boundaries at pharmacy conferences",
    ],
    whyTheyCare:
      "The integrity of any clinic prescribing compounded therapy is bounded by the integrity of the pharmacy preparing it. Public reference to upstream sourcing closes a gap that patients cannot reasonably investigate on their own, and that most clinics do not surface voluntarily.",
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
    photo: advisor02,
  },
  {
    slug: "advisor-03",
    name: "Dr. Marcia Okonkwo",
    credentials: "MD, MPH",
    boardTitle: "Member · Patient Safety & Public Communication",
    specialization: "Preventive Medicine · Public Health",
    shortSummary:
      "Reviews how framework determinations are communicated to the public, with emphasis on accuracy, restraint, and informed-consumer language.",
    biography:
      "Dr. Okonkwo is a preventive medicine physician with a public health background focused on health communication and informed consent. Her work has examined how patient-facing materials shape decision-making in fields where regulatory categories are unfamiliar to the general public. She brings that lens to the Source Standard registry, ensuring that public listings, status definitions, and disclaimers represent clinical reality accurately and avoid implying endorsement beyond what the framework actually verifies.",
    background: [
      "MD — Emory University School of Medicine",
      "MPH (Health Policy & Management) — Johns Hopkins Bloomberg School of Public Health",
      "Preventive Medicine residency — Emory Rollins School of Public Health",
      "Prior advisory role on patient-information and informed-consent materials",
    ],
    accomplishments: [
      "Fifteen years of preventive and population-health practice",
      "Published work on health communication and informed-consumer disclosure",
      "Advisory role on patient-information materials at a regional health system",
      "Active contributor to standards for plain-language medical communication",
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
    photo: advisor03,
  },
  {
    slug: "advisor-04",
    name: "Dr. Daniel Park",
    credentials: "PharmD, BCPS",
    boardTitle: "Member · Pharmacy Standards Liaison",
    specialization: "Clinical Pharmacy · Sterile Compounding",
    shortSummary:
      "Pharmacy-side reviewer ensuring framework criteria align with current USP standards and state board of pharmacy expectations.",
    biography:
      "Dr. Park is a board-certified pharmacotherapy specialist with direct sterile-compounding oversight experience in hospital and outsourcing-facility settings. His practice has focused on translating USP chapter revisions into operational reality and on the points where state board of pharmacy expectations diverge from federal guidance. He brings pharmacist-side expertise to framework reviews, ensuring criteria for sterile and non-sterile compounded preparations are anchored to currently enforceable standards.",
    background: [
      "PharmD — University of California, San Francisco School of Pharmacy",
      "PGY-1 / PGY-2 pharmacy residency — UCSF Medical Center",
      "Board Certified Pharmacotherapy Specialist (BCPS)",
      "Prior sterile compounding oversight role — academic medical center",
    ],
    accomplishments: [
      "Twelve years of clinical pharmacy and sterile-compounding oversight",
      "Direct experience implementing USP <797> and <800> compliance programs",
      "Familiarity with multi-state board of pharmacy inspection expectations",
      "Recurring continuing-education contributor on USP chapter revisions",
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
    photo: advisor04,
  },
  {
    slug: "advisor-05",
    name: "Dr. Camila Reyes",
    credentials: "MD",
    boardTitle: "Member · Education & Reference Review",
    specialization: "Family Medicine · Clinical Education",
    shortSummary:
      "Reviews educational reference material published under the framework to ensure clinical accuracy and appropriate scope.",
    biography:
      "Dr. Reyes is a board-certified family medicine physician whose career has bridged primary care practice and clinical education. She has held faculty roles in residency training and has contributed to layperson-accessible medical reference material with an emphasis on scope discipline — making clear what general reference can and cannot substitute for. She brings that sensibility to the Source Standard educational layer, ensuring published explanations remain within the bounds of what the framework can substantiate.",
    background: [
      "MD — University of Texas Southwestern Medical School",
      "Family Medicine residency — University of Colorado",
      "Prior faculty appointment — community-based residency program",
      "Contributor to patient-accessible clinical reference material",
    ],
    accomplishments: [
      "Fourteen years of family-medicine practice with patient-education emphasis",
      "Faculty role training family-medicine residents",
      "Contributing reviewer on layperson-accessible medical references",
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
    photo: advisor05,
  },
  {
    slug: "advisor-06",
    name: "Dr. Richard Halloran",
    credentials: "MD, JD",
    boardTitle: "Member · Regulatory Affairs & Ethics",
    specialization: "Health Law · Medical Ethics",
    shortSummary:
      "Physician-attorney reviewing the regulatory posture of the framework and the ethical boundaries of public determinations published under it.",
    biography:
      "Dr. Halloran is a physician-attorney whose career has spanned bedside internal medicine, hospital general counsel work, and federal health-regulatory practice. He has advised academic medical centers on FDA enforcement matters, state medical board proceedings, and the ethical questions that arise when clinical determinations enter the public record. He brings that dual lens to the Medical Advisory Board, ensuring the framework's public-facing determinations are defensible both clinically and procedurally.",
    background: [
      "MD — Georgetown University School of Medicine",
      "JD (Health Law concentration) — Georgetown University Law Center",
      "Internal Medicine residency — MedStar Georgetown University Hospital",
      "Prior associate general counsel role — academic medical center",
      "Member in good standing, state bar (active)",
    ],
    accomplishments: [
      "Twenty-five years combined clinical and health-law practice",
      "Advised institutional review of FDA enforcement and warning-letter matters",
      "Contributor on medical-ethics and informed-consent standards",
      "Recurring lecturer on the intersection of clinical practice and health regulation",
      "Active medical and bar licenses in good standing",
    ],
    whyTheyCare:
      "Public determinations carry weight whether or not the publishing organization intends them to. The board's job on this seat is to make sure the framework's authority is matched by the procedural discipline that earns it.",
    contribution:
      "Reviews framework determinations for regulatory and ethical posture, advises on the boundaries between public reference and clinical advice, and helps maintain the conflict-of-interest disclosures recorded under SS-GOV-2026.01.",
    clinicalFocus: [
      "Regulatory posture review",
      "Conflict-of-interest discipline",
      "Public-determination boundaries",
      "Ethics of disclosure & non-disclosure",
    ],
    philosophy:
      "A standard earns its authority through the procedure behind it, not the language in front of it. The seat exists to make sure procedure stays ahead of language.",
    jurisdiction: "US",
    yearsPracticing: "25+",
    photo: advisor06,
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
