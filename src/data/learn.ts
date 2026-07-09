/**
 * Learn, content system for the /learn universe.
 *
 * Two engines:
 *   • Education, timeless questions. `/learn/education/:slug`
 *   • News & Insights, timely reports. `/learn/news/:slug`
 *
 * Articles are data, not per-file pages. Templates render from these
 * records so we can build a library of 100+ pages without a route file
 * per article.
 */

export type EducationTopicId =
  | "basics"
  | "choosing-a-provider"
  | "verification"
  | "sourcing-and-manufacturing";

export type NewsCategoryId =
  | "industry"
  | "regulatory"
  | "scientific"
  | "source-standard"
  | "editorial";

export type NextStepId =
  | "vendor-registry"
  | "facility-records"
  | "how-verification-works"
  | "transparent-listing"
  | "contact"
  | "learn-education"
  | "learn-news";

export interface NextStep {
  id: NextStepId;
  label: string;
  to: string;
}

export const NEXT_STEPS: Record<NextStepId, NextStep> = {
  "vendor-registry": {
    id: "vendor-registry",
    label: "Search the Vendor Registry",
    to: "/verified-vendors",
  },
  "facility-records": {
    id: "facility-records",
    label: "Explore Facility Records",
    to: "/greenlist",
  },
  "how-verification-works": {
    id: "how-verification-works",
    label: "Learn how verification works",
    to: "/how-it-works",
  },
  "transparent-listing": {
    id: "transparent-listing",
    label: "See a transparent provider listing",
    to: "/verified-vendors",
  },
  contact: {
    id: "contact",
    label: "Contact Source Standard",
    to: "/contact",
  },
  "learn-education": {
    id: "learn-education",
    label: "Browse Education",
    to: "/learn/education",
  },
  "learn-news": {
    id: "learn-news",
    label: "Read News & Insights",
    to: "/learn/news",
  },
};

// ── Topic + Category metadata ────────────────────────────────────────

export const EDUCATION_TOPICS: {
  id: EducationTopicId;
  label: string;
  description: string;
}[] = [
  {
    id: "basics",
    label: "Learn the Basics",
    description:
      "Start here. Plain-language answers to the questions people ask first.",
  },
  {
    id: "choosing-a-provider",
    label: "Choosing a Provider",
    description:
      "What to look for, what to ask, and what a trustworthy listing shows.",
  },
  {
    id: "verification",
    label: "Verification",
    description:
      "What Source Standard reviews, what a status means, and how a review works.",
  },
  {
    id: "sourcing-and-manufacturing",
    label: "Sourcing & Manufacturing",
    description:
      "Where compounded medications come from, who makes them, and why it matters.",
  },
];

export const NEWS_CATEGORIES: {
  id: NewsCategoryId;
  label: string;
}[] = [
  { id: "industry", label: "Industry News" },
  { id: "regulatory", label: "Regulatory Updates" },
  { id: "scientific", label: "Scientific Research" },
  { id: "source-standard", label: "Source Standard Updates" },
  { id: "editorial", label: "Editorial & Analysis" },
];

// ── Article schemas ──────────────────────────────────────────────────

export interface EducationSection {
  title: string;
  body: string | string[];
}

export interface EducationArticle {
  slug: string;
  topic: EducationTopicId;
  question: string; // The consumer question, used as <h1> and <title>
  shortAnswer: string; // 2–3 sentence answer
  answersFor: string; // "What this answers", one sentence
  sections: EducationSection[];
  relatedQuestions: { slug: string }[]; // Other education articles
  nextStep: NextStepId;
  updated: string; // YYYY-MM-DD
}

export interface NewsArticle {
  slug: string;
  category: NewsCategoryId;
  headline: string;
  standfirst: string;
  dateline: string; // YYYY-MM-DD
  location?: string;
  body: string[];
  whyThisMatters: string;
  relatedEducation: { slug: string }[];
  nextStep: NextStepId;
}

// ── Education articles (12) ──────────────────────────────────────────

export const EDUCATION_ARTICLES: EducationArticle[] = [
  // ── Basics ────────────────────────────────────────────────────────
  {
    slug: "what-is-a-compounded-medication",
    topic: "basics",
    question: "What Is a Compounded Medication?",
    answersFor:
      "The difference between a compounded medication and one that comes off a pharmaceutical company's production line.",
    shortAnswer:
      "A compounded medication is one that a licensed pharmacy prepares for a specific prescription, rather than a mass-manufactured product that comes in a sealed retail package. Compounding is legal, regulated, and long-standing, but the responsibility for quality rests on the individual pharmacy.",
    sections: [
      {
        title: "What compounding is",
        body: [
          "Compounding is the process of preparing a medication in a pharmacy to meet the needs of a specific patient. That might mean adjusting a dose, removing an allergen, changing the delivery form, or preparing a formulation that isn't otherwise available.",
          "Compounded medications are not FDA-approved products. Instead, the pharmacy that prepares them operates under state pharmacy law and one of two federal categories: 503A pharmacies and 503B outsourcing facilities.",
        ],
      },
      {
        title: "Why it exists",
        body: "Compounding fills gaps that mass manufacturing doesn't. It also creates a system where quality depends on the pharmacy itself, which is why knowing where a compounded product comes from matters.",
      },
      {
        title: "What to look for as a consumer",
        body: "A trustworthy provider should be able to tell you which pharmacy prepared your medication, what regulatory category that pharmacy falls under, and what documentation supports the product's identity and quality.",
      },
    ],
    relatedQuestions: [
      { slug: "what-is-a-503a-pharmacy" },
      { slug: "what-is-a-503b-outsourcing-facility" },
      { slug: "compounded-vs-fda-approved" },
    ],
    nextStep: "vendor-registry",
    updated: "2026-07-09",
  },
  {
    slug: "what-are-peptides",
    topic: "basics",
    question: "What Are Peptides?",
    answersFor:
      "What peptides are, why they're used in medicine, and why the pharmacy that prepares them matters.",
    shortAnswer:
      "Peptides are short chains of amino acids that the body uses for signaling and regulation. Some are studied and prescribed in medical settings; others are sold as research materials. Compounded peptide preparations are made by licensed pharmacies, and the sourcing of those preparations is worth understanding before use.",
    sections: [
      {
        title: "What peptides are",
        body: "Peptides are short chains of amino acids joined by peptide bonds. They occur naturally throughout the body and are generally smaller than proteins. In biology, peptides participate in a wide range of signaling and regulatory processes.",
      },
      {
        title: "Where compounded peptides come from",
        body: "When a peptide is prescribed as a compounded medication, it is prepared by a 503A pharmacy or a 503B outsourcing facility. Both operate under regulation, but the responsibility for quality rests on the individual facility.",
      },
      {
        title: "Why sourcing matters",
        body: "Because compounded peptides can move through several organizations before reaching a consumer, knowing which pharmacy actually prepared the product is the most useful reference point. That single fact lets you check facility records, regulatory classification, and the documentation the pharmacy is willing to share.",
      },
    ],
    relatedQuestions: [
      { slug: "what-is-a-compounded-medication" },
      { slug: "why-does-sourcing-matter" },
      { slug: "what-is-a-503a-pharmacy" },
    ],
    nextStep: "vendor-registry",
    updated: "2026-07-09",
  },

  // ── Choosing a Provider ──────────────────────────────────────────
  {
    slug: "how-do-i-know-if-a-provider-is-trustworthy",
    topic: "choosing-a-provider",
    question: "How Do I Know If a Provider Is Trustworthy?",
    answersFor:
      "The signals that separate a transparent provider from one that avoids specifics.",
    shortAnswer:
      "A trustworthy provider will tell you which pharmacy prepares your medication, share supporting documentation on request, and describe its sourcing in specific terms, not marketing language. Vague or evasive answers about sourcing are the clearest sign to look elsewhere.",
    sections: [
      {
        title: "The specifics they should be able to name",
        body: [
          "The pharmacy or facility that prepares your medication, by name.",
          "The regulatory category that pharmacy operates under (503A or 503B).",
          "The state in which it is licensed and its licensing status.",
          "Documentation such as certificates of analysis when you ask to see one.",
        ],
      },
      {
        title: "Warning signs",
        body: "If a provider describes its sourcing only in general terms, 'FDA-registered,' 'premium,' 'medical-grade', without being able to name the actual pharmacy, that's a gap worth taking seriously.",
      },
      {
        title: "How to verify what you're told",
        body: "Once you have the name of the pharmacy, you can look up its regulatory status directly. Source Standard's registry and facility records exist to make this check quick.",
      },
    ],
    relatedQuestions: [
      { slug: "what-should-i-ask-my-provider" },
      { slug: "what-information-should-a-transparent-provider-share" },
      { slug: "what-does-verified-mean" },
    ],
    nextStep: "vendor-registry",
    updated: "2026-07-09",
  },
  {
    slug: "what-should-i-ask-my-provider",
    topic: "choosing-a-provider",
    question: "What Should I Ask My Provider?",
    answersFor:
      "Four direct questions any provider should be able to answer clearly.",
    shortAnswer:
      "Ask which pharmacy prepares your medication, what regulatory category that pharmacy falls under, whether you can see a certificate of analysis, and whether the pharmacy is listed in Source Standard. Clear answers to these four questions tell you almost everything you need to know.",
    sections: [
      {
        title: "The four questions",
        body: [
          "1. Which pharmacy prepares my medication? Ask for the name.",
          "2. Is that pharmacy a 503A or a 503B? Both are legitimate categories, but they mean different things.",
          "3. Can I see a certificate of analysis for a recent batch? A transparent provider can produce one.",
          "4. Is the pharmacy listed in Source Standard's registry? If so, you can review its record directly.",
        ],
      },
      {
        title: "What good answers look like",
        body: "Specific names, specific categories, specific documents. If the answer redirects to marketing language or refuses to identify the pharmacy, that itself is an answer.",
      },
    ],
    relatedQuestions: [
      { slug: "how-do-i-know-if-a-provider-is-trustworthy" },
      { slug: "what-information-should-a-transparent-provider-share" },
      { slug: "how-to-read-a-certificate-of-analysis" },
    ],
    nextStep: "transparent-listing",
    updated: "2026-07-09",
  },
  {
    slug: "what-information-should-a-transparent-provider-share",
    topic: "choosing-a-provider",
    question: "What Information Should a Transparent Provider Share?",
    answersFor:
      "The baseline of documentation and disclosure that separates transparent providers from opaque ones.",
    shortAnswer:
      "A transparent provider names its pharmacy sources, discloses their regulatory categories, and produces documentation on request. A provider that shares less than that is a provider that's asking you to take its word for it.",
    sections: [
      {
        title: "Named sourcing",
        body: "The single most important disclosure is the name of the pharmacy or facility that prepares each compounded product. Not a category, not a claim, a name.",
      },
      {
        title: "Regulatory status",
        body: "A transparent provider says whether that pharmacy is a 503A or a 503B, and which state licenses it. Both regulatory categories are legitimate; the point is knowing which one applies.",
      },
      {
        title: "Documentation on request",
        body: "Certificates of analysis, facility license status, and other supporting records should be available on request. A provider that treats these documents as confidential has decided that its patients don't need to see them.",
      },
    ],
    relatedQuestions: [
      { slug: "what-should-i-ask-my-provider" },
      { slug: "how-to-read-a-certificate-of-analysis" },
      { slug: "why-do-facility-records-matter" },
    ],
    nextStep: "transparent-listing",
    updated: "2026-07-09",
  },

  // ── Verification ─────────────────────────────────────────────────
  {
    slug: "what-does-verified-mean",
    topic: "verification",
    question: "What Does Verified Mean?",
    answersFor:
      "What Source Standard's Verified status represents, and what it does not.",
    shortAnswer:
      "Verified means Source Standard has reviewed a provider's documentation and confirmed the pharmacy or facility they name as their source. It is a sourcing-transparency check, not a clinical endorsement, and it does not evaluate specific products, prices, or outcomes.",
    sections: [
      {
        title: "What Verified confirms",
        body: [
          "The provider has identified the pharmacy or facility that prepares its compounded products.",
          "That pharmacy exists, is licensed, and its regulatory classification matches what the provider claims.",
          "The provider has produced supporting documentation for the review.",
        ],
      },
      {
        title: "What Verified does not mean",
        body: "Verified is not an endorsement of any specific product, treatment, or clinical outcome. It does not evaluate pricing, effectiveness, or medical appropriateness. Those are decisions between a patient and their clinician.",
      },
      {
        title: "Why the distinction matters",
        body: "A verified sourcing claim narrows what you have to trust. It doesn't replace clinical judgment, but it moves the conversation from 'take our word for it' to 'here's the pharmacy, check it yourself.'",
      },
    ],
    relatedQuestions: [
      { slug: "what-happens-during-a-verification-review" },
      { slug: "what-does-greenlisted-mean" },
      { slug: "why-do-facility-records-matter" },
    ],
    nextStep: "how-verification-works",
    updated: "2026-07-09",
  },
  {
    slug: "what-happens-during-a-verification-review",
    topic: "verification",
    question: "What Happens During a Verification Review?",
    answersFor:
      "The steps Source Standard takes when it reviews a provider's sourcing claims.",
    shortAnswer:
      "A verification review checks the paper trail behind a provider's sourcing claim: who prepares the medication, whether that pharmacy is licensed, and whether the documentation the provider has produced matches what public records show.",
    sections: [
      {
        title: "The paperwork step",
        body: "Providers submit invoices, purchase records, and other documentation that identifies the pharmacies or facilities they source from. Nothing about a provider's sourcing is inferred, it's evidenced.",
      },
      {
        title: "The public-records step",
        body: "Source Standard cross-references the pharmacies named in that documentation against public regulatory records: FDA registrations for 503B outsourcing facilities, state licensing for 503A pharmacies.",
      },
      {
        title: "The outcome",
        body: "When documentation and public records align, the provider receives a Verified listing. When they don't, the listing reflects the gap, or the provider is not listed.",
      },
    ],
    relatedQuestions: [
      { slug: "what-does-verified-mean" },
      { slug: "what-does-greenlisted-mean" },
      { slug: "how-do-i-know-if-a-provider-is-trustworthy" },
    ],
    nextStep: "how-verification-works",
    updated: "2026-07-09",
  },
  {
    slug: "what-does-greenlisted-mean",
    topic: "verification",
    question: "What Does Greenlisted Mean?",
    answersFor:
      "What it means when a pharmacy or facility appears on Source Standard's Greenlist.",
    shortAnswer:
      "The Greenlist is the public record of pharmacies and facilities whose regulatory status Source Standard has confirmed. A Greenlisted facility is one whose license and classification match public records, nothing more, nothing less.",
    sections: [
      {
        title: "What it confirms",
        body: "A Greenlisted facility has been checked against the appropriate regulator, the FDA for 503B outsourcing facilities, state boards of pharmacy for 503A pharmacies, and that check matches what the facility itself claims.",
      },
      {
        title: "What it doesn't confirm",
        body: "Greenlisting confirms regulatory identity, not clinical quality or specific product outcomes. It is a starting point for consumers, not a substitute for the review a clinician performs.",
      },
    ],
    relatedQuestions: [
      { slug: "what-does-verified-mean" },
      { slug: "why-do-facility-records-matter" },
      { slug: "what-is-a-503b-outsourcing-facility" },
    ],
    nextStep: "facility-records",
    updated: "2026-07-09",
  },

  // ── Sourcing & Manufacturing ─────────────────────────────────────
  {
    slug: "what-is-a-503a-pharmacy",
    topic: "sourcing-and-manufacturing",
    question: "What Is a 503A Pharmacy?",
    answersFor:
      "The category of pharmacy that prepares compounded medications for individual patients on prescription.",
    shortAnswer:
      "A 503A pharmacy is a state-licensed compounding pharmacy that prepares medications one prescription at a time for individual patients. It is regulated primarily at the state level by boards of pharmacy, and its products are not FDA-approved.",
    sections: [
      {
        title: "Who they serve",
        body: "503A pharmacies fill compounded prescriptions for named patients. They cannot manufacture in bulk for stock, and they cannot ship large volumes to clinics that will resell them.",
      },
      {
        title: "How they're regulated",
        body: "State boards of pharmacy license and inspect 503A pharmacies. The FDA has jurisdiction in some areas, but day-to-day oversight sits with the state.",
      },
      {
        title: "What that means for you",
        body: "If a provider's medication comes from a 503A pharmacy, the pharmacy should be licensed in a US state, that license should be in good standing, and the medication should have been prepared against a real prescription.",
      },
    ],
    relatedQuestions: [
      { slug: "what-is-a-503b-outsourcing-facility" },
      { slug: "who-manufactures-compounded-medications" },
      { slug: "compounded-vs-fda-approved" },
    ],
    nextStep: "facility-records",
    updated: "2026-07-09",
  },
  {
    slug: "what-is-a-503b-outsourcing-facility",
    topic: "sourcing-and-manufacturing",
    question: "What Is a 503B Outsourcing Facility?",
    answersFor:
      "The category of compounding facility that can prepare medications in larger batches, under FDA oversight.",
    shortAnswer:
      "A 503B outsourcing facility is a compounding facility registered with the FDA that can prepare medications in larger batches for clinics and hospitals to stock. 503B facilities are held to stricter manufacturing standards than 503A pharmacies.",
    sections: [
      {
        title: "What they do",
        body: "503B facilities prepare compounded medications in batch quantities that clinics and hospitals can keep in stock. Unlike 503A pharmacies, they don't require an individual prescription for each unit.",
      },
      {
        title: "How they're regulated",
        body: "503B outsourcing facilities register with the FDA and follow Current Good Manufacturing Practice (CGMP) standards. The FDA inspects them directly.",
      },
      {
        title: "Why this matters",
        body: "When a provider says their compounded medication comes from a 503B, the facility should be findable in the FDA's public registration list. If it isn't, the claim doesn't hold.",
      },
    ],
    relatedQuestions: [
      { slug: "what-is-a-503a-pharmacy" },
      { slug: "who-manufactures-compounded-medications" },
      { slug: "why-do-facility-records-matter" },
    ],
    nextStep: "facility-records",
    updated: "2026-07-09",
  },
  {
    slug: "who-manufactures-compounded-medications",
    topic: "sourcing-and-manufacturing",
    question: "Who Manufactures Compounded Medications?",
    answersFor:
      "The organizations that actually prepare the compounded medications a clinic dispenses, which is usually not the clinic itself.",
    shortAnswer:
      "Most clinics do not manufacture their own medications. Compounded products come from 503A pharmacies or 503B outsourcing facilities that operate separately from the clinic. Knowing which facility actually prepared your medication is the starting point for reviewing any sourcing claim.",
    sections: [
      {
        title: "The clinic is usually not the maker",
        body: "A clinic that offers compounded therapy typically orders from a pharmacy or an outsourcing facility. That external facility is the one whose licensing, regulatory status, and quality practices matter for the product itself.",
      },
      {
        title: "Why the distinction matters",
        body: "Clinics come and go. Pharmacies persist and are on the regulatory record. When you know which pharmacy is behind a compounded product, you can check that pharmacy directly.",
      },
    ],
    relatedQuestions: [
      { slug: "what-is-a-503a-pharmacy" },
      { slug: "what-is-a-503b-outsourcing-facility" },
      { slug: "why-do-facility-records-matter" },
    ],
    nextStep: "facility-records",
    updated: "2026-07-09",
  },
  {
    slug: "compounded-vs-fda-approved",
    topic: "sourcing-and-manufacturing",
    question: "What's the Difference Between Compounded and FDA-Approved Medications?",
    answersFor:
      "How compounded medications differ from the FDA-approved products people are more familiar with.",
    shortAnswer:
      "FDA-approved medications are mass-manufactured products that have been reviewed by the FDA for safety and effectiveness. Compounded medications are prepared by individual pharmacies against a prescription and are not FDA-approved as products. Both are legal, but the safeguards behind them are different.",
    sections: [
      {
        title: "FDA-approved products",
        body: "An FDA-approved medication has been through clinical trials, manufacturing review, and formal labeling approval. The product itself carries an FDA approval, not just the facility that made it.",
      },
      {
        title: "Compounded medications",
        body: "A compounded medication does not carry a product approval. Its quality depends on the pharmacy that prepares it, that pharmacy's regulatory category, and the documentation that supports the batch.",
      },
      {
        title: "Why this matters",
        body: "Compounded and FDA-approved are not the same category with different marketing. They are different regulatory systems. Understanding which one applies to your medication is the first step to evaluating it honestly.",
      },
    ],
    relatedQuestions: [
      { slug: "what-is-a-compounded-medication" },
      { slug: "what-is-a-503a-pharmacy" },
      { slug: "what-is-a-503b-outsourcing-facility" },
    ],
    nextStep: "vendor-registry",
    updated: "2026-07-09",
  },
  {
    slug: "why-does-sourcing-matter",
    topic: "sourcing-and-manufacturing",
    question: "Why Does Sourcing Matter?",
    answersFor:
      "Why the identity of the pharmacy behind a compounded medication is the most useful thing to know about it.",
    shortAnswer:
      "Compounded medications don't carry a product-level approval. Quality is tied to the specific pharmacy that prepared them. That means the pharmacy's name, not marketing language about it, is the single most useful fact about the product.",
    sections: [
      {
        title: "The product isn't approved; the pharmacy is licensed",
        body: "Because compounded medications aren't FDA-approved products, there is no FDA sign-off on any specific batch. What exists instead is a pharmacy license and, for 503B facilities, an FDA registration. Both are attached to the facility, not the product.",
      },
      {
        title: "Naming the pharmacy is the pivot point",
        body: "Once you know which pharmacy prepared the medication, everything else becomes checkable: regulatory status, inspection history, category, licensing. Without the name, none of it is.",
      },
      {
        title: "What sterile preparation adds",
        body: "For injectable compounded medications, sterile preparation is an additional layer of practice that the pharmacy must follow. It is one of the reasons the specific pharmacy, not just 'a pharmacy', matters.",
      },
    ],
    relatedQuestions: [
      { slug: "what-is-sterile-compounding" },
      { slug: "who-manufactures-compounded-medications" },
      { slug: "why-do-facility-records-matter" },
    ],
    nextStep: "facility-records",
    updated: "2026-07-09",
  },
  {
    slug: "what-is-sterile-compounding",
    topic: "sourcing-and-manufacturing",
    question: "What Is Sterile Compounding?",
    answersFor:
      "What sterile compounding is, and why it matters for injectable compounded medications.",
    shortAnswer:
      "Sterile compounding is the preparation of medications, typically injectables, in an environment designed to keep them free of microbial contamination. Both 503A pharmacies and 503B facilities can perform it, but they must follow specific standards to do so.",
    sections: [
      {
        title: "Why sterility is separate",
        body: "Any compounded medication that bypasses the digestive system, injections, infusions, some ophthalmic products, must be prepared under sterile conditions. Contamination in these routes is a direct risk.",
      },
      {
        title: "The standards",
        body: "Sterile compounding follows recognized pharmacy standards (commonly referenced as USP <797>) covering the environment, technique, and testing that must be in place. 503B facilities additionally follow Current Good Manufacturing Practice.",
      },
      {
        title: "What to look for",
        body: "A pharmacy that offers sterile compounding should be able to identify the standard it follows and, on request, show that its facility is inspected against that standard.",
      },
    ],
    relatedQuestions: [
      { slug: "why-does-sourcing-matter" },
      { slug: "what-is-a-503b-outsourcing-facility" },
      { slug: "how-to-read-a-certificate-of-analysis" },
    ],
    nextStep: "facility-records",
    updated: "2026-07-09",
  },
  {
    slug: "how-to-read-a-certificate-of-analysis",
    topic: "sourcing-and-manufacturing",
    question: "How Do I Read a Certificate of Analysis?",
    answersFor:
      "What a certificate of analysis is, what fields matter, and how to use one to check a batch.",
    shortAnswer:
      "A certificate of analysis is a document from a pharmacy or lab that reports what a specific batch of medication contains and how it was tested. It should identify the product, the batch, the date, and the tests performed, with results.",
    sections: [
      {
        title: "What it is",
        body: "A certificate of analysis (COA) is a written record from the preparing facility that reports the identity, strength, and purity of a specific batch of medication.",
      },
      {
        title: "What to look for",
        body: [
          "The product name and formulation, spelled out.",
          "A batch or lot number that ties the document to a specific batch.",
          "The date of preparation or testing.",
          "The tests performed, identity, potency, sterility for injectables, with the actual results and the acceptance range.",
          "The name of the laboratory or facility issuing the COA.",
        ],
      },
      {
        title: "How to use it",
        body: "A COA lets you compare what the batch was tested for against what the product is claimed to be. If a provider cannot produce a COA for a batch you're being asked to use, that's worth noting.",
      },
    ],
    relatedQuestions: [
      { slug: "what-should-i-ask-my-provider" },
      { slug: "what-is-sterile-compounding" },
      { slug: "what-information-should-a-transparent-provider-share" },
    ],
    nextStep: "transparent-listing",
    updated: "2026-07-09",
  },
  {
    slug: "what-is-compounded-hormone-therapy",
    topic: "sourcing-and-manufacturing",
    question: "What Is Compounded Hormone Therapy?",
    answersFor:
      "How compounded hormone therapy differs from FDA-approved hormone products, and what to check.",
    shortAnswer:
      "Compounded hormone therapy is hormone treatment prepared by a compounding pharmacy for a specific prescription, rather than a mass-manufactured FDA-approved hormone product. It exists to fill needs that off-the-shelf products don't, but the same sourcing questions apply.",
    sections: [
      {
        title: "Why it exists",
        body: "Compounded hormone therapy is often used when a patient needs a dose, delivery form, or combination that isn't available as an FDA-approved product.",
      },
      {
        title: "How it differs from FDA-approved hormones",
        body: "FDA-approved hormone medications have been through clinical trials and formal review. Compounded hormone preparations have not. Quality depends on the pharmacy preparing them and the documentation that supports each batch.",
      },
      {
        title: "What to check",
        body: "The same questions apply as with any compounded medication: which pharmacy prepares it, what regulatory category that pharmacy is in, and what documentation the provider can produce.",
      },
    ],
    relatedQuestions: [
      { slug: "compounded-vs-fda-approved" },
      { slug: "what-is-a-compounded-medication" },
      { slug: "what-should-i-ask-my-provider" },
    ],
    nextStep: "vendor-registry",
    updated: "2026-07-09",
  },
  {
    slug: "why-do-facility-records-matter",
    topic: "verification",
    question: "Why Do Facility Records Matter?",
    answersFor:
      "Why the pharmacies and facilities behind a compounded product are more informative than the clinic that dispenses it.",
    shortAnswer:
      "Facility records show you the pharmacy behind the product, its license, its regulatory category, its status. Because compounded medications don't carry product approvals, the facility is where the real accountability lives.",
    sections: [
      {
        title: "What facility records contain",
        body: "A facility record shows a pharmacy's regulatory category (503A or 503B), the authority that licenses it, its current status, and, where applicable, its FDA registration.",
      },
      {
        title: "Why they matter more than marketing",
        body: "Any provider can describe their sourcing in flattering terms. Facility records are the check that determines whether the description matches reality.",
      },
      {
        title: "How to use them",
        body: "When a provider names the pharmacy behind their compounded product, you can look that pharmacy up directly. If the pharmacy record contradicts the provider's description, that's the finding.",
      },
    ],
    relatedQuestions: [
      { slug: "what-does-greenlisted-mean" },
      { slug: "what-is-a-503a-pharmacy" },
      { slug: "what-is-a-503b-outsourcing-facility" },
    ],
    nextStep: "facility-records",
    updated: "2026-07-09",
  },
];

// ── News articles ────────────────────────────────────────────────────

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "2026-compounding-reclassification",
    category: "regulatory",
    headline: "2026 Compounding Reclassification: What Consumers Need to Know",
    standfirst:
      "New FDA guidance changes how some compounded medications are categorized. What that means for the products consumers currently receive.",
    dateline: "2026-04-14",
    location: "Washington, D.C.",
    body: [
      "The FDA has issued updated guidance affecting how certain compounded medications are classified for regulatory purposes. The change primarily affects the boundary between what a 503A pharmacy and a 503B outsourcing facility can prepare, and how clinics stock those products.",
      "For consumers, the practical effect is narrower than the headlines suggest. Compounded medications remain legal. Pharmacies remain licensed. What changes is which category some products fall into, and therefore which set of regulatory standards applies to their preparation.",
      "The clearest signal for consumers remains unchanged: knowing which specific pharmacy prepares your medication. The reclassification does not change how you check that fact, it only shifts which regulatory record you'll find that pharmacy in.",
    ],
    whyThisMatters:
      "Regulatory reclassifications typically cause more confusion than change. What matters for consumers is the same thing it was before: the pharmacy behind the product and the record that pharmacy carries.",
    relatedEducation: [
      { slug: "what-is-a-503a-pharmacy" },
      { slug: "what-is-a-503b-outsourcing-facility" },
      { slug: "what-is-a-compounded-medication" },
    ],
    nextStep: "facility-records",
  },
];

// ── Lookups ──────────────────────────────────────────────────────────

export const getEducationArticle = (slug: string) =>
  EDUCATION_ARTICLES.find((a) => a.slug === slug);

export const getNewsArticle = (slug: string) =>
  NEWS_ARTICLES.find((a) => a.slug === slug);

export const educationArticlesByTopic = (topic: EducationTopicId) =>
  EDUCATION_ARTICLES.filter((a) => a.topic === topic);

export const newsArticlesByCategory = (category: NewsCategoryId) =>
  NEWS_ARTICLES.filter((a) => a.category === category);

// ── FAQ pillar wiring ────────────────────────────────────────────────

export const FAQ_ENTRIES: {
  label: string;
  description: string;
  to: string;
}[] = [
  {
    label: "Legal & Regulatory",
    description:
      "The statutory framework, public records, and lawful access boundaries around compounded medications.",
    to: "/library/faq/legal-regulatory",
  },
  {
    label: "Clinical Safety",
    description:
      "What Source Standard covers on sourcing and pharmacy standards, and where clinical judgment belongs.",
    to: "/library/faq/clinical-safety",
  },
  {
    label: "Verification Process",
    description:
      "What Source Standard reviews, and what its public statuses represent.",
    to: "/library/faq/verification-process",
  },
  {
    label: "Consumer Diligence",
    description:
      "Public-facing checks a consumer can make before relying on a vendor's sourcing claim.",
    to: "/library/faq/consumer-diligence",
  },
];
