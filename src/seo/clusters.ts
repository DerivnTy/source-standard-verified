/**
 * Topic clusters.
 *
 * Hub-and-spoke content architecture. Each cluster has one hub page and
 * several spokes; every spoke links up to its hub, sideways to its
 * siblings, and out into the directory and article library. One data
 * model, one renderer, so adding a spoke is a data change.
 *
 * Content rule: nothing is asserted that Source Standard cannot support.
 * Where an answer depends on facts we do not hold, the page says so.
 */

export type ClusterId = "peptides" | "compounding";

export type ClusterSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

export type ClusterPage = {
  /** Full site path, e.g. "/peptides/purity-testing". */
  path: string;
  cluster: ClusterId;
  /** True for the cluster's hub page. */
  isHub?: boolean;
  navLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: ClusterSection[];
  faqs?: { q: string; a: string }[];
  /** Slugs from src/data/articles.ts. */
  relatedArticles: string[];
  updated: string;
};

export const CLUSTERS: Record<ClusterId, { label: string; path: string; blurb: string }> = {
  peptides: {
    label: "Peptides",
    path: "/peptides",
    blurb:
      "How compounded peptides are sourced, tested, and documented — and what each kind of test actually proves.",
  },
  compounding: {
    label: "Compounding",
    path: "/compounding",
    blurb:
      "How 503A pharmacies and 503B outsourcing facilities are regulated, and why the distinction changes what documentation exists.",
  },
};

export const CLUSTER_PAGES: ClusterPage[] = [
  // ─────────────────────────────── Peptides hub
  {
    path: "/peptides",
    cluster: "peptides",
    isHub: true,
    navLabel: "Peptides overview",
    h1: "Compounded peptides: sourcing, testing, and documentation",
    metaTitle: "Compounded Peptides: Sourcing, Testing and Documentation",
    metaDescription:
      "How compounded peptides are sourced and tested, what a certificate of analysis proves, and how to check where a clinic's peptides come from.",
    lead:
      "A compounded peptide reaches a patient through a chain: a raw ingredient supplier, a compounding pharmacy or outsourcing facility, and the clinic that prescribes and dispenses it. Most of the questions people ask about peptide quality are really questions about that chain and about which parts of it are documented.",
    updated: "2026-08-29",
    sections: [
      {
        id: "the-chain",
        heading: "The sourcing chain, end to end",
        body: [
          "Every compounded peptide has an upstream story. An active pharmaceutical ingredient is manufactured, sold to a compounder, combined into a finished preparation, tested to whatever standard applies, and shipped to the prescriber or patient. Each handoff either generates a document or does not.",
          "Source Standard exists because the last link in that chain — the clinic a patient actually interacts with — is usually the only one the patient can see. Verification is the process of asking a clinic to demonstrate the links behind it with evidence rather than assurance.",
        ],
        bullets: [
          "API manufacturer — makes the raw peptide ingredient",
          "Compounder — a 503A pharmacy or 503B outsourcing facility that prepares the finished product",
          "Testing laboratory — runs identity, potency, sterility, and endotoxin assays where applicable",
          "Clinic or provider — prescribes, dispenses, and communicates with the patient",
        ],
      },
      {
        id: "what-testing-covers",
        heading: "What testing does and does not cover",
        body: [
          "Testing is not one thing. Purity and potency testing speak to what is in the vial and how much. Sterility testing speaks to whether the preparation is free of viable microorganisms. Endotoxin testing speaks to bacterial breakdown products that survive sterilisation. A product can pass one and have never been subjected to another.",
          "This is why a single certificate is weak evidence on its own. The useful question is not \"is it tested?\" but \"which tests, run by whom, on which lot, against what specification?\"",
        ],
      },
      {
        id: "documentation",
        heading: "Why documentation is the unit of trust",
        body: [
          "Claims about quality are cheap to make and hard to check. Documents are neither. A certificate of analysis names a lot, a method, a specification, and a result — all of which can be traced back to a laboratory and a date.",
          "Source Standard's verification process is documentation-first for that reason. A clinic that has completed verification has shown evidence supporting defined sourcing claims. A clinic that has not completed it has simply not participated, which is a statement about our records and not about the clinic's products.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Source Standard test peptides itself?",
        a: "No. Source Standard reviews documentation produced by compounders and testing laboratories. We do not operate a laboratory and we do not perform independent assays.",
      },
      {
        q: "Can I tell where a clinic's peptides come from?",
        a: "Sometimes. Clinics that have completed Source Standard verification have named upstream sources on the record. For clinics that have not participated, the sourcing chain is not something we have information about, and we do not speculate.",
      },
    ],
    relatedArticles: [
      "how-peptide-sourcing-works",
      "where-do-peptide-clinics-source-their-products",
      "what-does-a-peptide-coa-actually-prove",
      "who-manufactures-compounded-peptides",
    ],
  },

  // ─────────────────────────────── Peptides spokes
  {
    path: "/peptides/testing",
    cluster: "peptides",
    navLabel: "Peptide testing",
    h1: "Peptide testing: what each test measures",
    metaTitle: "Peptide Testing Explained: Purity, Sterility and Endotoxin",
    metaDescription:
      "A plain-language guide to peptide testing — what purity, potency, sterility, and endotoxin testing each measure, and what a passing result does and does not prove.",
    lead:
      "\"Third-party tested\" is a phrase, not a specification. This page separates the individual tests that phrase can refer to, so you can tell which questions a given certificate answers.",
    updated: "2026-08-29",
    sections: [
      {
        id: "families",
        heading: "The four questions testing can answer",
        body: [
          "Almost every assay run on a compounded peptide answers one of four questions: is this the right molecule, how much of it is there, is it contaminated with material from the manufacturing process, and is it safe to inject.",
        ],
        bullets: [
          "Identity — is the substance in the vial the peptide it claims to be?",
          "Potency and purity — how much active peptide is present, and what proportion is something else?",
          "Sterility — does the preparation contain viable microorganisms?",
          "Endotoxin — does it contain bacterial cell-wall fragments that survive sterilisation?",
        ],
      },
      {
        id: "who-runs-it",
        heading: "Who runs the test matters as much as the result",
        body: [
          "A result generated by the seller is a different evidentiary object from a result generated by an independent, accredited laboratory. Neither is automatically worthless, but they are not interchangeable, and a document that does not name the laboratory cannot be evaluated at all.",
          "When reading a certificate, look for the laboratory name, the analytical method, the lot or batch identifier, the date, the specification the result is measured against, and a signature.",
        ],
      },
      {
        id: "scope",
        heading: "Test scope is per-lot, not per-company",
        body: [
          "A certificate applies to a specific lot. A company that tested one lot thoroughly has not thereby tested every lot. Programmes that test every batch exist, and they generate a document per batch; programmes that test occasionally generate a document occasionally.",
          "When a clinic provides a certificate, the useful follow-up is whether the lot on the certificate is the lot in the vial.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a certificate of analysis proof of safety?",
        a: "No. A certificate reports results for the tests it lists, on the lot it names, on the date it was run. It is evidence about that lot and those tests, not a general safety guarantee.",
      },
      {
        q: "What is the difference between purity testing and sterility testing?",
        a: "Purity testing measures chemical composition — how much of the vial is the intended peptide. Sterility testing measures microbiological contamination. A product can be chemically pure and non-sterile, or sterile and impure.",
      },
    ],
    relatedArticles: [
      "what-does-peptide-purity-testing-tell-you",
      "purity-testing-vs-sterility-testing",
      "what-is-endotoxin-testing",
      "what-does-a-peptide-coa-actually-prove",
    ],
  },
  {
    path: "/peptides/purity-testing",
    cluster: "peptides",
    navLabel: "Purity testing",
    h1: "Peptide purity testing",
    metaTitle: "Peptide Purity Testing: What HPLC Results Actually Show",
    metaDescription:
      "What peptide purity testing measures, how HPLC and mass spectrometry results are read, and why a purity percentage alone does not describe a product's safety.",
    lead:
      "Purity testing answers a narrow, useful question: of the material in this vial, what proportion is the peptide it is supposed to be?",
    updated: "2026-08-29",
    sections: [
      {
        id: "methods",
        heading: "How purity is measured",
        body: [
          "High-performance liquid chromatography separates the components of a sample and reports each as a proportion of the total. Mass spectrometry confirms molecular identity by mass. Used together they answer both \"is this the right molecule\" and \"how much of the sample is it\".",
          "A purity figure without a named method is not interpretable. The same sample can produce different numbers under different conditions.",
        ],
      },
      {
        id: "what-it-misses",
        heading: "What a purity figure does not tell you",
        body: [
          "A high purity result says nothing about sterility, endotoxin load, correct dosing of the finished preparation, storage conditions after testing, or whether the tested lot is the one you received.",
          "It also does not characterise the remaining percentage. A 99% pure peptide has 1% of something else in it, and the identity of that something is a separate question the certificate may or may not address.",
        ],
      },
      {
        id: "reading-it",
        heading: "Reading a purity certificate",
        body: [
          "Check the lot identifier, the method, the acceptance specification, the reported result, the laboratory, and the date. If any of those are absent, note the gap rather than filling it with an assumption.",
        ],
      },
    ],
    relatedArticles: [
      "what-does-peptide-purity-testing-tell-you",
      "purity-testing-vs-sterility-testing",
      "what-does-a-peptide-coa-actually-prove",
    ],
  },
  {
    path: "/peptides/sterility-testing",
    cluster: "peptides",
    navLabel: "Sterility testing",
    h1: "Sterility testing for compounded peptides",
    metaTitle: "Sterility Testing for Compounded Peptides Explained",
    metaDescription:
      "What sterility testing is, why it matters for injectable compounded preparations, and how sterility differs from purity and endotoxin testing.",
    lead:
      "Sterility testing asks whether a preparation contains viable microorganisms. For anything injected, it is the test most directly connected to acute patient harm.",
    updated: "2026-08-29",
    sections: [
      {
        id: "why",
        heading: "Why sterility is a distinct concern",
        body: [
          "Injectable preparations bypass the body's external barriers. Contamination that would be inconsequential in an oral product can be serious when introduced directly into tissue or bloodstream.",
          "This is the reason sterile compounding is governed by its own standards and why facilities preparing sterile products operate under environmental controls that non-sterile compounding does not require.",
        ],
      },
      {
        id: "how",
        heading: "How sterility is established",
        body: [
          "Sterility can be assessed by direct testing of finished units and supported by process controls: cleanroom classification, environmental monitoring, aseptic technique, media fills, and validated sterilisation or filtration steps.",
          "Testing alone is a sample. Process control is what makes the sample representative. Serious programmes have both, and both generate records.",
        ],
      },
      {
        id: "beyond-use",
        heading: "Beyond-use dating",
        body: [
          "A sterile preparation carries a beyond-use date reflecting how long it can be expected to remain acceptable under specified storage. That date is part of the sterility picture, not a separate administrative detail.",
        ],
      },
    ],
    relatedArticles: ["purity-testing-vs-sterility-testing", "what-is-endotoxin-testing", "what-is-a-503b-outsourcing-facility"],
  },
  {
    path: "/peptides/endotoxin-testing",
    cluster: "peptides",
    navLabel: "Endotoxin testing",
    h1: "Endotoxin testing",
    metaTitle: "What Is Endotoxin Testing? Compounded Peptides Explained",
    metaDescription:
      "Endotoxin testing detects bacterial fragments that survive sterilisation. Here is what it measures, why sterility testing does not cover it, and how results are reported.",
    lead:
      "Endotoxins are fragments of the outer membrane of certain bacteria. They survive processes that kill the bacteria themselves, which is why a sterile product can still carry them.",
    updated: "2026-08-29",
    sections: [
      {
        id: "what",
        heading: "What endotoxins are",
        body: [
          "Endotoxins are lipopolysaccharides shed from the cell walls of gram-negative bacteria. They are heat-stable and are not removed by ordinary sterilisation, so a preparation can pass a sterility test and still contain a clinically relevant endotoxin load.",
          "In patients, endotoxin exposure is associated with febrile and inflammatory reactions. Limits are set by route of administration and dose.",
        ],
      },
      {
        id: "how-measured",
        heading: "How it is measured",
        body: [
          "Bacterial endotoxin testing typically uses a limulus amebocyte lysate assay or a recombinant equivalent, and results are reported in endotoxin units relative to a defined limit for the product and route.",
          "As with any assay, a result is only interpretable against a stated specification. \"Endotoxin tested\" without a limit and a value is not a finding.",
        ],
      },
      {
        id: "who-runs-it",
        heading: "Where it appears in the chain",
        body: [
          "Endotoxin testing is normally performed on sterile injectable preparations by the compounder or an external laboratory, and reported on the certificate of analysis alongside sterility results.",
        ],
      },
    ],
    relatedArticles: ["what-is-endotoxin-testing", "purity-testing-vs-sterility-testing", "what-does-a-peptide-coa-actually-prove"],
  },
  {
    path: "/peptides/sourcing",
    cluster: "peptides",
    navLabel: "Peptide sourcing",
    h1: "Peptide sourcing: how a clinic gets its products",
    metaTitle: "Peptide Sourcing: How Clinics Get Compounded Products",
    metaDescription:
      "How peptide clinics source compounded products, the difference between a pharmacy that compounds and one that resells, and how to verify a sourcing claim.",
    lead:
      "When a clinic says it uses a \"licensed US pharmacy\", that sentence can describe several different arrangements. Distinguishing them is most of what sourcing transparency means.",
    updated: "2026-08-29",
    sections: [
      {
        id: "arrangements",
        heading: "Common sourcing arrangements",
        body: [
          "A clinic may work with a 503A pharmacy that compounds patient-specific prescriptions, with a 503B outsourcing facility producing batches for office use, with a brand that markets products compounded by a third party, or with an intermediary that does not disclose its upstream at all.",
          "None of these is inherently better or worse. They differ in which regulations apply and which records exist, and therefore in what a clinic is able to demonstrate.",
        ],
      },
      {
        id: "questions",
        heading: "Questions that resolve a sourcing claim",
        body: [
          "The following questions have factual answers, and a clinic with a documented supply chain can answer them without difficulty.",
        ],
        bullets: [
          "Which pharmacy or facility prepares the product?",
          "Is that entity registered as a 503A pharmacy or a 503B outsourcing facility?",
          "Does that entity compound the product itself, or obtain it from someone else?",
          "Is a lot-specific certificate of analysis available for the product I received?",
          "Which laboratory performed the testing on that certificate?",
        ],
      },
      {
        id: "unknowns",
        heading: "When the answer is unknown",
        body: [
          "An unanswered sourcing question is not evidence of wrongdoing. It is an absence of information. Source Standard records that absence as an absence — the directory distinguishes clinics that have demonstrated sourcing claims from clinics we hold no verification record for, and makes no inference about the second group.",
        ],
      },
    ],
    relatedArticles: [
      "where-do-peptide-clinics-source-their-products",
      "how-peptide-sourcing-works",
      "does-the-pharmacy-compound-the-peptide-itself",
      "how-can-you-verify-where-a-compounded-peptide-came-from",
    ],
  },

  // ─────────────────────────────── Compounding hub
  {
    path: "/compounding",
    cluster: "compounding",
    isHub: true,
    navLabel: "Compounding overview",
    h1: "Compounding: how compounded medications are made and regulated",
    metaTitle: "Compounding Pharmacies: How Compounded Medicine Is Regulated",
    metaDescription:
      "How compounded medications are produced and regulated in the United States, and how 503A pharmacies differ from 503B outsourcing facilities.",
    lead:
      "Compounded medications are prepared rather than mass-manufactured. They are not FDA-approved products, and the regulatory regime that governs them depends on which kind of entity prepares them.",
    updated: "2026-08-29",
    sections: [
      {
        id: "what",
        heading: "What compounding is",
        body: [
          "Compounding is the preparation of a medication to meet a need that a commercially available product does not — a different strength, a different route, the removal of an ingredient a patient reacts to, or a formulation that is not manufactured at all.",
          "Compounded preparations are not reviewed or approved by the FDA for safety and efficacy in the way approved drug products are. Oversight operates through the licensing and registration of the entities that prepare them, and through the standards those entities are held to.",
        ],
      },
      {
        id: "two-lanes",
        heading: "Two regulatory lanes",
        body: [
          "Section 503A of the Federal Food, Drug, and Cosmetic Act covers traditional pharmacy compounding of patient-specific prescriptions. Section 503B created outsourcing facilities, which may produce larger batches without patient-specific prescriptions and register with the FDA.",
          "The practical consequence for a patient is documentary: the two lanes generate different records, and are inspected on different terms.",
        ],
      },
      {
        id: "why-it-matters",
        heading: "Why the distinction matters to a patient",
        body: [
          "Knowing which lane a product came from tells you what kind of evidence should exist for it. It does not by itself tell you the product is good or bad, and Source Standard does not present the distinction as a quality ranking.",
        ],
      },
    ],
    relatedArticles: [
      "what-is-a-503a-compounding-pharmacy",
      "what-is-a-503b-outsourcing-facility",
      "503a-vs-503b-whats-the-difference",
    ],
  },

  // ─────────────────────────────── Compounding spokes
  {
    path: "/compounding/503a",
    cluster: "compounding",
    navLabel: "503A pharmacies",
    h1: "503A compounding pharmacies",
    metaTitle: "What Is a 503A Compounding Pharmacy?",
    metaDescription:
      "What a 503A compounding pharmacy is, how it is licensed and inspected, and what patient-specific compounding means in practice.",
    lead:
      "A 503A pharmacy compounds medications for identified patients against individual prescriptions. It is the traditional model of pharmacy compounding.",
    updated: "2026-08-29",
    sections: [
      {
        id: "definition",
        heading: "Definition and scope",
        body: [
          "Under section 503A, a licensed pharmacy or physician may compound a drug for an identified individual patient based on a valid prescription. The exemptions that make this lawful are conditioned on that patient-specific basis.",
          "503A pharmacies are licensed by state boards of pharmacy. State boards, rather than the FDA, are the primary inspecting authority, although the FDA retains authority over drug products.",
        ],
      },
      {
        id: "standards",
        heading: "Standards that apply",
        body: [
          "Sterile and non-sterile compounding practice is described in United States Pharmacopeia chapters covering facilities, personnel, testing, and beyond-use dating. Compliance obligations follow from state law adopting those chapters.",
          "503A pharmacies are not required to follow current good manufacturing practice in the way registered outsourcing facilities are.",
        ],
      },
      {
        id: "implication",
        heading: "What this means for documentation",
        body: [
          "Because 503A production is patient-specific rather than batch-based, the documentary trail differs from a 503B facility's. That is a structural difference, not a deficiency, and Source Standard evaluates each entity against the criteria that apply to it.",
        ],
      },
    ],
    relatedArticles: ["what-is-a-503a-compounding-pharmacy", "503a-vs-503b-whats-the-difference"],
  },
  {
    path: "/compounding/503b",
    cluster: "compounding",
    navLabel: "503B outsourcing facilities",
    h1: "503B outsourcing facilities",
    metaTitle: "What Is a 503B Outsourcing Facility?",
    metaDescription:
      "What a 503B outsourcing facility is, how FDA registration and cGMP obligations apply, and how it differs from a traditional compounding pharmacy.",
    lead:
      "A 503B outsourcing facility registers with the FDA, may compound in batches without patient-specific prescriptions, and operates under current good manufacturing practice.",
    updated: "2026-08-29",
    sections: [
      {
        id: "definition",
        heading: "Definition and scope",
        body: [
          "Section 503B was added by the Drug Quality and Security Act of 2013. A facility that registers as an outsourcing facility may compound sterile preparations in batch quantities and distribute them to healthcare providers for office use.",
          "Registered facilities appear on a list the FDA publishes and are subject to FDA inspection on a risk-based schedule.",
        ],
      },
      {
        id: "cgmp",
        heading: "Current good manufacturing practice",
        body: [
          "Outsourcing facilities must comply with cGMP requirements. In practice this means documented production and process controls, quality unit oversight, stability and release testing, environmental monitoring, and adverse event reporting.",
          "This generates a substantially richer documentary record than patient-specific compounding does, which is one reason facility-level evidence is often the strongest part of a sourcing chain.",
        ],
      },
      {
        id: "verify",
        heading: "Verifying a facility's registration",
        body: [
          "Registration status is a matter of public record and changes over time. A facility that appeared on the FDA's registered list previously may not appear on the current list. Source Standard's facility records note documented regulatory status with dates and links to the underlying source.",
        ],
      },
    ],
    relatedArticles: ["what-is-a-503b-outsourcing-facility", "503a-vs-503b-whats-the-difference", "who-manufactures-compounded-peptides"],
  },
  {
    path: "/compounding/503a-vs-503b",
    cluster: "compounding",
    navLabel: "503A vs 503B",
    h1: "503A vs 503B: what is the difference?",
    metaTitle: "503A vs 503B: What's the Difference? A Clear Comparison",
    metaDescription:
      "A side-by-side comparison of 503A compounding pharmacies and 503B outsourcing facilities: prescriptions, registration, inspection, cGMP, and testing.",
    lead:
      "The two designations describe different lawful routes to a compounded medication. They differ on five axes that matter to a patient trying to evaluate a product.",
    updated: "2026-08-29",
    sections: [
      {
        id: "comparison",
        heading: "Five differences that matter",
        body: [
          "Both are legitimate. Neither designation is a quality score, and a well-run 503A pharmacy is not inferior to a poorly run outsourcing facility. What changes is the framework each is held to and the evidence each produces.",
        ],
        bullets: [
          "Prescription basis — 503A compounds against patient-specific prescriptions; 503B may compound in batches for office use",
          "Registration — 503B facilities register with the FDA and appear on a published list; 503A pharmacies are licensed by state boards",
          "Inspection — 503B facilities are subject to FDA inspection; 503A pharmacies are primarily inspected by state boards",
          "Manufacturing standard — 503B facilities must comply with cGMP; 503A pharmacies follow USP compounding chapters as adopted by state law",
          "Testing records — batch production under cGMP generates release and stability records per batch; patient-specific compounding does not",
        ],
      },
      {
        id: "choosing",
        heading: "What to do with the distinction",
        body: [
          "If a clinic names its upstream, look up which category that entity falls into and ask for the documentation that category should produce. If a clinic does not name its upstream, that is the gap worth addressing before evaluating anything downstream of it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a 503B product safer than a 503A product?",
        a: "Not automatically. 503B facilities operate under cGMP and FDA registration, which produces more documentation, but safety depends on the individual entity's practices rather than the designation alone.",
      },
      {
        q: "Can one company be both?",
        a: "Some organisations operate both a 503A pharmacy and a registered 503B facility, often as separate legal entities. Which one prepared a given product is a specific, answerable question.",
      },
    ],
    relatedArticles: [
      "503a-vs-503b-whats-the-difference",
      "what-is-a-503a-compounding-pharmacy",
      "what-is-a-503b-outsourcing-facility",
    ],
  },
];

export const getClusterPage = (path: string): ClusterPage | undefined =>
  CLUSTER_PAGES.find((p) => p.path === path);

export const clusterHub = (id: ClusterId): ClusterPage =>
  CLUSTER_PAGES.find((p) => p.cluster === id && p.isHub)!;

export const clusterSpokes = (id: ClusterId): ClusterPage[] =>
  CLUSTER_PAGES.filter((p) => p.cluster === id && !p.isHub);

export const clusterPathsForSitemap = (): string[] => CLUSTER_PAGES.map((p) => p.path);
