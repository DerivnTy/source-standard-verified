/**
 * Articles — the /articles/:slug library.
 *
 * Each record is an SEO landing page targeting a question people
 * actually search. Articles are data, not per-file routes, so a new
 * article inherits schema, breadcrumbs, sitemap inclusion, and internal
 * linking automatically.
 *
 * Editorial rule: no claim is made that Source Standard cannot support.
 * Where an answer depends on facts about a specific company that we do
 * not hold, the article says the information is not independently
 * verified rather than filling the gap.
 */

import type { ClusterId } from "@/seo/clusters";
import type { IntelCategory } from "@/data/intelArticles";

export type ArticleSectionData = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

export type ArticleSource = {
  /** Primary source organisation or publication. */
  name: string;
  /** Publication or update date, as stated by the source. */
  date?: string;
  url?: string;
};

export type Article = {
  slug: string;
  /** Rendered as the H1. Phrased as the question people search. */
  question: string;
  metaTitle: string;
  metaDescription: string;
  standfirst: string;
  cluster?: ClusterId;
  /** Research & Insights category. Present on intelligence articles. */
  category?: IntelCategory;
  /** Primary source attribution, shown on the page and in schema. */
  source?: ArticleSource;
  published: string;
  updated: string;
  sections: ArticleSectionData[];
  faqs?: { q: string; a: string }[];
  relatedArticles?: string[];
  /** Extra in-site destinations surfaced at the foot of the article. */
  relatedPaths?: { to: string; label: string }[];
};


const AUTHORED = { published: "2026-08-29", updated: "2026-08-29" };

export const ARTICLES: Article[] = [
  {
    slug: "what-does-peptide-purity-testing-tell-you",
    question: "What does peptide purity testing actually tell you?",
    metaTitle: "What Does Peptide Purity Testing Actually Tell You?",
    metaDescription:
      "Peptide purity testing measures how much of a sample is the intended peptide. Here is what a purity percentage proves, what it leaves out, and how to read the result.",
    standfirst:
      "A purity figure is a precise answer to a narrow question. Most of the confusion around peptide testing comes from treating it as an answer to a broad one.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "what-it-measures",
        heading: "What the number measures",
        body: [
          "Purity testing separates the contents of a sample and reports the intended peptide as a proportion of the total. High-performance liquid chromatography is the usual method; mass spectrometry is typically used alongside it to confirm that the dominant peak is in fact the molecule claimed.",
          "A result of 98% means that under the stated method, 98% of the detected material was the target peptide. It does not describe the other 2%, and it does not describe anything the method cannot detect.",
        ],
      },
      {
        id: "what-it-misses",
        heading: "What it does not cover",
        body: [
          "Purity is silent on sterility, endotoxin content, correct fill volume, potency of the reconstituted product, storage after testing, and the relationship between the tested lot and the vial in front of you.",
          "This is not a criticism of purity testing. It is the reason serious programmes run several assays and report them together.",
        ],
        bullets: [
          "Sterility — a separate microbiological test",
          "Endotoxin — a separate assay for bacterial fragments",
          "Potency of the finished preparation — a different measurement from raw purity",
          "Lot correspondence — whether this certificate belongs to this vial",
        ],
      },
      {
        id: "reading",
        heading: "How to read a purity result",
        body: [
          "Look for six things: lot identifier, analytical method, acceptance specification, reported result, testing laboratory, and date. A certificate missing the laboratory or the lot cannot be tied to anything, which makes the number unverifiable rather than reassuring.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is 99% purity better than 98%?",
        a: "Numerically, yes, but the difference is only meaningful if both results came from comparable methods and specifications. A number without a method is not comparable to anything.",
      },
    ],
    relatedArticles: ["purity-testing-vs-sterility-testing", "what-does-a-peptide-coa-actually-prove", "what-is-endotoxin-testing"],
  },

  {
    slug: "where-do-peptide-clinics-source-their-products",
    question: "Where do peptide clinics source their products?",
    metaTitle: "Where Do Peptide Clinics Source Their Products?",
    metaDescription:
      "Peptide clinics obtain compounded products through several different arrangements. Here are the common ones and how to find out which applies to a given clinic.",
    standfirst:
      "Clinics rarely make what they dispense. Understanding the handful of arrangements that sit behind a prescription is the fastest way to ask a useful question.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "arrangements",
        heading: "The common arrangements",
        body: [
          "A clinic may hold a relationship with a 503A compounding pharmacy that prepares patient-specific prescriptions, with a 503B outsourcing facility supplying batch product for office use, with a consumer brand that markets products compounded elsewhere, or with a distributor or telehealth platform that manages the supply relationship on the clinic's behalf.",
          "Each arrangement is lawful and each produces a different documentary record. What they share is that the underlying preparer is a specific, nameable entity.",
        ],
      },
      {
        id: "finding-out",
        heading: "How to find out which applies",
        body: [
          "Ask which pharmacy or facility prepares the product, and whether that entity compounds it or obtains it from another party. Both questions have short factual answers, and a clinic with a documented supply chain can give them.",
          "Where a clinic has completed Source Standard verification, named upstream sources appear on its directory record. Where a clinic has not participated, we hold no sourcing information and do not infer any.",
        ],
      },
      {
        id: "no-answer",
        heading: "If you do not get an answer",
        body: [
          "An unanswered question is an information gap, not evidence of a problem. It does mean that any downstream assurance about quality rests on the clinic's word rather than on a record you can check.",
        ],
      },
    ],
    relatedArticles: ["how-peptide-sourcing-works", "does-the-pharmacy-compound-the-peptide-itself", "what-should-patients-ask-a-peptide-clinic"],
    relatedPaths: [{ to: "/clinics", label: "Search the clinic directory" }],
  },

  {
    slug: "what-is-a-503a-compounding-pharmacy",
    question: "What is a 503A compounding pharmacy?",
    metaTitle: "What Is a 503A Compounding Pharmacy?",
    metaDescription:
      "A 503A compounding pharmacy prepares patient-specific medications under state board licensure. Here is how it is regulated and what documentation it produces.",
    standfirst:
      "503A is the traditional model of pharmacy compounding: a licensed pharmacy preparing a medication for an identified patient against a valid prescription.",
    cluster: "compounding",
    ...AUTHORED,
    sections: [
      {
        id: "definition",
        heading: "The legal basis",
        body: [
          "Section 503A of the Federal Food, Drug, and Cosmetic Act exempts certain compounded preparations from requirements that apply to manufactured drug products, on the condition that compounding is performed by a licensed pharmacist or physician for an identified individual patient based on a valid prescription.",
          "Compounded preparations are not FDA-approved. The exemption is about which requirements apply, not an endorsement of the preparation.",
        ],
      },
      {
        id: "oversight",
        heading: "Who oversees it",
        body: [
          "State boards of pharmacy license and inspect 503A pharmacies. United States Pharmacopeia chapters describe practice standards for sterile and non-sterile compounding, and their force depends on state adoption.",
          "503A pharmacies are not required to operate under current good manufacturing practice, which is the standard that applies to registered outsourcing facilities.",
        ],
      },
      {
        id: "records",
        heading: "What records exist",
        body: [
          "Because production is patient-specific rather than batch-based, the record set differs from a 503B facility's. Prescription records, compounding logs, and applicable testing records exist; per-batch release and stability documentation of the kind cGMP requires generally does not.",
        ],
      },
    ],
    relatedArticles: ["503a-vs-503b-whats-the-difference", "what-is-a-503b-outsourcing-facility"],
    relatedPaths: [{ to: "/compounding/503a", label: "503A pharmacies — full overview" }],
  },

  {
    slug: "what-is-a-503b-outsourcing-facility",
    question: "What is a 503B outsourcing facility?",
    metaTitle: "What Is a 503B Outsourcing Facility?",
    metaDescription:
      "A 503B outsourcing facility registers with the FDA, compounds in batches, and operates under cGMP. Here is what that means and how to check registration.",
    standfirst:
      "503B outsourcing facilities were created by the Drug Quality and Security Act of 2013 to bring batch compounding under federal registration and inspection.",
    cluster: "compounding",
    ...AUTHORED,
    sections: [
      {
        id: "definition",
        heading: "What the designation means",
        body: [
          "A facility that registers as an outsourcing facility under section 503B may compound sterile preparations in batch quantities without patient-specific prescriptions and distribute them to healthcare providers for office administration.",
          "Registered facilities appear on a list published by the FDA and are subject to FDA inspection on a risk-based schedule.",
        ],
      },
      {
        id: "cgmp",
        heading: "The cGMP obligation",
        body: [
          "Outsourcing facilities must comply with current good manufacturing practice: a quality unit, documented process controls, validated procedures, environmental monitoring, release and stability testing, and adverse event reporting.",
          "This produces a far denser evidentiary record than patient-specific compounding, which is why facility-level documentation is often the strongest link in a sourcing chain.",
        ],
      },
      {
        id: "checking",
        heading: "Checking a facility's status",
        body: [
          "Registration is public and changes over time. A facility listed in a previous year may not be listed now. Source Standard's facility records note documented regulatory status with an as-of date and a link to the source, rather than asserting a current status we have not re-checked.",
        ],
      },
    ],
    relatedArticles: ["503a-vs-503b-whats-the-difference", "who-manufactures-compounded-peptides"],
    relatedPaths: [
      { to: "/compounding/503b", label: "503B outsourcing facilities — full overview" },
      { to: "/facilities", label: "Browse facility records" },
    ],
  },

  {
    slug: "503a-vs-503b-whats-the-difference",
    question: "503A vs 503B: what's the difference?",
    metaTitle: "503A vs 503B: What's the Difference?",
    metaDescription:
      "503A pharmacies compound patient-specific prescriptions under state licensure; 503B facilities register with the FDA and compound in batches under cGMP.",
    standfirst:
      "Both designations describe lawful compounding. They differ on prescription basis, registration, inspection, manufacturing standard, and the records each produces.",
    cluster: "compounding",
    ...AUTHORED,
    sections: [
      {
        id: "axes",
        heading: "The five differences",
        body: ["Neither designation is a quality score. What changes is the framework and the paperwork."],
        bullets: [
          "Prescription basis — 503A requires a patient-specific prescription; 503B does not",
          "Registration — 503B registers federally with the FDA; 503A is licensed by a state board",
          "Inspection — FDA risk-based inspection for 503B; state board inspection for 503A",
          "Standard — cGMP for 503B; USP compounding chapters as adopted by state law for 503A",
          "Records — per-batch release and stability documentation for 503B; prescription-level records for 503A",
        ],
      },
      {
        id: "which-matters",
        heading: "Which matters for the product you were given",
        body: [
          "The designation tells you what evidence should exist. If a product came from a registered outsourcing facility, per-batch documentation should be available. If it was compounded patient-specifically, ask instead about the pharmacy's licensure and the testing it performs.",
        ],
      },
      {
        id: "both",
        heading: "Organisations that operate both",
        body: [
          "Some organisations run a 503A pharmacy and a registered 503B facility, often as separate legal entities under one brand. Which one prepared a given product is a specific question with a specific answer, and worth asking rather than assuming.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is 503B safer than 503A?",
        a: "Not automatically. 503B facilities carry cGMP obligations and federal inspection, which generates more documentation, but outcomes depend on the individual entity rather than the category.",
      },
    ],
    relatedArticles: ["what-is-a-503a-compounding-pharmacy", "what-is-a-503b-outsourcing-facility"],
    relatedPaths: [{ to: "/compounding/503a-vs-503b", label: "Full 503A vs 503B comparison" }],
  },

  {
    slug: "what-does-a-peptide-coa-actually-prove",
    question: "What does a peptide COA actually prove?",
    metaTitle: "What Does a Peptide COA Actually Prove?",
    metaDescription:
      "A certificate of analysis reports specific tests on a specific lot on a specific date. Here is how to read one and what it cannot establish.",
    standfirst:
      "A certificate of analysis is a useful document and a commonly misread one. It proves what it says, about the lot it names, and nothing beyond that.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "anatomy",
        heading: "The anatomy of a certificate",
        body: [
          "A complete certificate names the product, the lot or batch, the tests performed, the analytical methods, the acceptance specifications, the results, the testing laboratory, the date, and an authorising signature.",
        ],
        bullets: [
          "Lot identifier — ties the document to physical product",
          "Method — makes the result interpretable and comparable",
          "Specification — the threshold the result is judged against",
          "Laboratory — who generated the result, and whether they are independent",
          "Date — when the sample was tested, not when the product was made",
        ],
      },
      {
        id: "limits",
        heading: "Four things a COA cannot prove",
        body: [
          "It cannot prove that the lot on the certificate is the lot you received. It cannot prove that untested attributes are acceptable. It cannot prove anything about storage or handling after the sample was drawn. And it cannot prove that the document itself is authentic — that requires confirming with the laboratory named on it.",
        ],
      },
      {
        id: "using",
        heading: "Using one well",
        body: [
          "Treat a certificate as a starting point for a specific question: does the lot match, are the tests the ones that matter for an injectable preparation, and is the laboratory independent of the seller? Those three checks extract most of the document's value.",
        ],
      },
    ],
    relatedArticles: ["what-does-peptide-purity-testing-tell-you", "how-can-you-verify-where-a-compounded-peptide-came-from"],
    relatedPaths: [{ to: "/peptides/testing", label: "Peptide testing overview" }],
  },

  {
    slug: "purity-testing-vs-sterility-testing",
    question: "Purity testing vs sterility testing: what's the difference?",
    metaTitle: "Purity Testing vs Sterility Testing: The Difference",
    metaDescription:
      "Purity testing measures chemical composition; sterility testing measures microbiological contamination. A product can pass one and fail the other.",
    standfirst:
      "These two tests are frequently spoken about as if they were one. They measure unrelated properties and are not substitutes for each other.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "purity",
        heading: "Purity: what is in the vial",
        body: [
          "Purity testing is chemical. It separates the sample and reports the proportion that is the intended peptide, typically by chromatography with mass-spectrometric confirmation of identity.",
        ],
      },
      {
        id: "sterility",
        heading: "Sterility: what is living in the vial",
        body: [
          "Sterility testing is microbiological. It asks whether viable microorganisms are present. For injectable preparations this is the property most directly connected to acute harm, and it is supported by process controls — cleanroom classification, environmental monitoring, aseptic technique — not by a single test in isolation.",
        ],
      },
      {
        id: "independence",
        heading: "Why one does not imply the other",
        body: [
          "A chemically pure preparation can be contaminated. A sterile preparation can contain degraded or incorrect material. And both can be true while endotoxin content remains untested, since endotoxins survive processes that kill bacteria.",
          "A product described only as \"tested\" has not told you which of these three questions was asked.",
        ],
      },
    ],
    relatedArticles: ["what-is-endotoxin-testing", "what-does-peptide-purity-testing-tell-you"],
    relatedPaths: [
      { to: "/peptides/purity-testing", label: "Purity testing in depth" },
      { to: "/peptides/sterility-testing", label: "Sterility testing in depth" },
    ],
  },

  {
    slug: "what-is-endotoxin-testing",
    question: "What is endotoxin testing?",
    metaTitle: "What Is Endotoxin Testing and Why Does It Matter?",
    metaDescription:
      "Endotoxin testing detects bacterial cell-wall fragments that survive sterilisation. Here is what it measures, how results are reported, and why sterility testing does not cover it.",
    standfirst:
      "Endotoxins are what bacteria leave behind. Killing the organism does not remove them, which is why endotoxin testing exists as a separate assay.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "what",
        heading: "What endotoxins are",
        body: [
          "Endotoxins are lipopolysaccharide fragments from the outer membrane of gram-negative bacteria. They are heat-stable and are not eliminated by ordinary sterilisation, so a sterile preparation can still carry a clinically relevant load.",
          "Exposure is associated with febrile and inflammatory reactions, and acceptable limits depend on the route of administration and the dose.",
        ],
      },
      {
        id: "measurement",
        heading: "How it is measured and reported",
        body: [
          "Bacterial endotoxin testing typically uses a limulus amebocyte lysate assay or a recombinant factor C alternative. Results are reported in endotoxin units against a stated limit for the product and route.",
          "A claim of \"endotoxin tested\" with no limit and no value is not a finding — it is a category of test with the result omitted.",
        ],
      },
      {
        id: "where",
        heading: "Where it sits in the record",
        body: [
          "For sterile injectables, endotoxin results normally appear on the certificate of analysis alongside sterility results, generated by the compounder's quality unit or an external laboratory.",
        ],
      },
    ],
    relatedArticles: ["purity-testing-vs-sterility-testing", "what-does-a-peptide-coa-actually-prove"],
    relatedPaths: [{ to: "/peptides/endotoxin-testing", label: "Endotoxin testing in depth" }],
  },

  {
    slug: "how-can-you-verify-where-a-compounded-peptide-came-from",
    question: "How can you verify where a compounded peptide came from?",
    metaTitle: "How to Verify Where a Compounded Peptide Came From",
    metaDescription:
      "A practical sequence for tracing a compounded peptide back to the pharmacy or facility that prepared it, using labels, lot numbers, and certificates.",
    standfirst:
      "Tracing a product back through the chain is mostly a matter of asking for documents in the right order and checking that they refer to each other.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "sequence",
        heading: "A workable sequence",
        body: [
          "Each step produces something the next step can be checked against. Where a step cannot be completed, the chain is broken at that point, and that is the useful finding.",
        ],
        bullets: [
          "Read the label — the preparing pharmacy or facility is usually named on it, along with a lot number and beyond-use date",
          "Identify the entity — determine whether it is a state-licensed 503A pharmacy or an FDA-registered 503B outsourcing facility",
          "Request the certificate — ask the clinic for the lot-specific certificate of analysis matching the lot on your label",
          "Check correspondence — confirm the lot on the certificate matches the lot on the vial",
          "Check the laboratory — confirm the testing laboratory named on the certificate is independent of the seller",
        ],
      },
      {
        id: "gaps",
        heading: "Interpreting a broken chain",
        body: [
          "If the label names no preparer, or the certificate's lot does not match, or no certificate exists, you have found an absence of documentation. That is a real and relevant fact. It is not proof that a product is unsafe, and it should not be described as though it were.",
        ],
      },
      {
        id: "role",
        heading: "Where Source Standard fits",
        body: [
          "Source Standard performs this exercise systematically for clinics that voluntarily enter verification, and publishes the outcome on the clinic's directory record. For clinics that have not participated, we publish only that fact.",
        ],
      },
    ],
    relatedArticles: ["what-does-a-peptide-coa-actually-prove", "does-the-pharmacy-compound-the-peptide-itself"],
    relatedPaths: [
      { to: "/how-it-works", label: "How Source Standard verification works" },
      { to: "/status-definitions", label: "What each directory status means" },
    ],
  },

  {
    slug: "what-should-patients-ask-a-peptide-clinic",
    question: "What should patients ask a peptide clinic?",
    metaTitle: "What Should Patients Ask a Peptide Clinic?",
    metaDescription:
      "Ten factual questions to ask a peptide clinic about sourcing, testing, and documentation — and how to interpret the answers you get.",
    standfirst:
      "Good questions have factual answers. These are phrased so that a clinic with a documented supply chain can answer them quickly, and so that a vague answer is legible as a vague answer.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "questions",
        heading: "Ten questions",
        body: ["Ask them plainly. None of them is adversarial, and all of them are routine for a clinic that keeps records."],
        bullets: [
          "Which pharmacy or facility prepares this product?",
          "Is that entity a 503A pharmacy or a 503B outsourcing facility?",
          "Does that entity compound the product itself, or obtain it elsewhere?",
          "Can I see the certificate of analysis for the lot I am receiving?",
          "Which laboratory performed that testing?",
          "Was sterility testing performed on this preparation?",
          "Was endotoxin testing performed?",
          "What is the beyond-use date, and how should this be stored?",
          "Who is the prescribing clinician, and what is their role in ongoing monitoring?",
          "What happens if I have an adverse reaction, and how is it reported?",
        ],
      },
      {
        id: "interpreting",
        heading: "Interpreting the answers",
        body: [
          "A specific answer can be checked. A general reassurance cannot. Neither type of answer proves anything about product quality on its own, but only one of them gives you something to follow up.",
          "If a clinic declines to name its upstream, that is a documented limitation on what you can independently confirm — not a finding about the product.",
        ],
      },
    ],
    relatedArticles: ["how-to-evaluate-a-peptide-clinic", "where-do-peptide-clinics-source-their-products"],
    relatedPaths: [{ to: "/clinics", label: "Look up a clinic in the directory" }],
  },

  {
    slug: "who-manufactures-compounded-peptides",
    question: "Who manufactures compounded peptides?",
    metaTitle: "Who Manufactures Compounded Peptides?",
    metaDescription:
      "Compounded peptides are prepared by 503A pharmacies and 503B outsourcing facilities from active ingredients made by upstream API manufacturers.",
    standfirst:
      "\"Manufacture\" is the wrong word for most of this chain, and the distinction between manufacturing, compounding, and reselling is where a lot of ambiguity lives.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "roles",
        heading: "Three distinct roles",
        body: [
          "An API manufacturer produces the raw active ingredient. A compounder — a 503A pharmacy or a 503B outsourcing facility — turns that ingredient into a finished preparation. A brand or distributor may market the result without performing either activity.",
          "A company can occupy more than one of these roles, and many marketing pages do not distinguish between them.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why the distinction matters",
        body: [
          "Regulatory obligations attach to activities, not to brand names. Whether cGMP applies, whether FDA registration exists, and whether batch records exist all depend on which role the entity actually performs.",
        ],
      },
      {
        id: "finding",
        heading: "Finding out who did what",
        body: [
          "The preparing entity is usually named on the product label. Source Standard maintains facility records for compounders and outsourcing facilities, including documented regulatory status with an as-of date and a link to the underlying source.",
        ],
      },
    ],
    relatedArticles: ["does-the-pharmacy-compound-the-peptide-itself", "what-is-a-503b-outsourcing-facility"],
    relatedPaths: [{ to: "/facilities", label: "Browse facility records" }],
  },

  {
    slug: "does-the-pharmacy-compound-the-peptide-itself",
    question: "Does the pharmacy compound the peptide itself?",
    metaTitle: "Does the Pharmacy Compound the Peptide Itself?",
    metaDescription:
      "Some pharmacies compound in-house; others obtain finished product from an outsourcing facility. Here is how to tell which arrangement applies and why it matters.",
    standfirst:
      "A pharmacy name on a label does not always mean the pharmacy prepared the contents. The question is worth asking directly.",
    cluster: "compounding",
    ...AUTHORED,
    sections: [
      {
        id: "arrangements",
        heading: "In-house, outsourced, or resold",
        body: [
          "A pharmacy may compound the preparation itself, order it from a registered 503B outsourcing facility, or dispense product supplied by another party under a commercial arrangement.",
          "All three can appear identical to a patient. Only the first means the dispensing pharmacy's own compounding practices are the ones that produced what you received.",
        ],
      },
      {
        id: "consequences",
        heading: "What changes with the answer",
        body: [
          "The answer determines which entity's licensure, inspection history, and testing regime are relevant, and therefore which documents you should be asking for.",
        ],
      },
      {
        id: "asking",
        heading: "How to get a clean answer",
        body: [
          "Ask: \"Was this compounded here, or supplied by another facility — and if supplied, by which one?\" It is a two-part question that resists a partial answer.",
        ],
      },
    ],
    relatedArticles: ["who-manufactures-compounded-peptides", "503a-vs-503b-whats-the-difference"],
  },

  {
    slug: "how-peptide-sourcing-works",
    question: "How peptide sourcing works",
    metaTitle: "How Peptide Sourcing Works, End to End",
    metaDescription:
      "A walkthrough of the compounded peptide supply chain — from active ingredient manufacture to the clinic that dispenses it — and where documentation is created.",
    standfirst:
      "Four links, three handoffs, and a documentary record that is either created at each step or is not. That is the whole picture.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "chain",
        heading: "The chain",
        body: ["Each link is a separate legal entity with separate obligations."],
        bullets: [
          "Active ingredient manufacture — the raw peptide is produced and released with its own documentation",
          "Compounding — a 503A pharmacy or 503B facility prepares the finished sterile preparation",
          "Testing — identity, potency, sterility, and endotoxin assays are run in-house or by an external laboratory",
          "Dispensing — a clinic or pharmacy supplies the product to the patient with labelling and a beyond-use date",
        ],
      },
      {
        id: "documents",
        heading: "Where documents are created",
        body: [
          "Ingredient release records sit with the API manufacturer. Batch or prescription records sit with the compounder. Certificates of analysis sit with whoever ran the test. Dispensing records sit with the clinic.",
          "A transparent supply chain is one in which these records exist and can be produced on request. An opaque one is not necessarily unsafe; it is unverifiable, which is a different problem.",
        ],
      },
      {
        id: "verification",
        heading: "What verification adds",
        body: [
          "Source Standard's verification process asks a clinic to demonstrate defined sourcing claims with evidence from these records. Completing it results in a Source Standard Verified status; not participating results in no determination at all.",
        ],
      },
    ],
    relatedArticles: ["where-do-peptide-clinics-source-their-products", "how-can-you-verify-where-a-compounded-peptide-came-from"],
    relatedPaths: [{ to: "/peptides/sourcing", label: "Peptide sourcing overview" }],
  },

  {
    slug: "how-to-evaluate-a-peptide-clinic",
    question: "How to evaluate a peptide clinic",
    metaTitle: "How to Evaluate a Peptide Clinic",
    metaDescription:
      "A structured way to assess a peptide clinic: clinical oversight, sourcing transparency, testing documentation, and how to weigh what you cannot confirm.",
    standfirst:
      "Evaluation is not the same as suspicion. The goal is to distinguish what you have confirmed from what you have merely been told.",
    cluster: "peptides",
    ...AUTHORED,
    sections: [
      {
        id: "clinical",
        heading: "Clinical oversight",
        body: [
          "Identify the prescribing clinician and their licensure, how initial assessment is performed, and what ongoing monitoring is offered. A prescription issued without assessment or follow-up is a clinical question independent of product quality.",
        ],
      },
      {
        id: "sourcing",
        heading: "Sourcing transparency",
        body: [
          "Ask which entity prepares the product and whether it compounds in-house. A clinic that answers specifically has given you something checkable; a clinic that answers generally has not.",
        ],
      },
      {
        id: "documentation",
        heading: "Testing documentation",
        body: [
          "Ask for the lot-specific certificate of analysis and confirm the lot matches your vial. Note which tests appear — identity, potency, sterility, endotoxin — and which do not.",
        ],
      },
      {
        id: "weighing",
        heading: "Weighing what you cannot confirm",
        body: [
          "Record gaps as gaps. \"I could not confirm the upstream facility\" is an accurate note. \"The clinic is hiding something\" is an inference the evidence does not support, and it is the kind of inference Source Standard deliberately refuses to publish.",
        ],
      },
    ],
    relatedArticles: ["what-should-patients-ask-a-peptide-clinic", "how-can-you-verify-where-a-compounded-peptide-came-from"],
    relatedPaths: [
      { to: "/how-to-read-the-directory", label: "How to read the directory" },
      { to: "/status-definitions", label: "Status definitions" },
    ],
  },
  ...INTEL_ARTICLES,
];


export const getArticle = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);

export const articlesForCluster = (cluster: ClusterId): Article[] =>
  ARTICLES.filter((a) => a.cluster === cluster);
