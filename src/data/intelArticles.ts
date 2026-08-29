/**
 * Intelligence articles — Source Standard's Research & Insights record.
 *
 * These entries cover regulatory actions, recalls, published research,
 * and sourcing analysis. Every factual statement traces to the cited
 * primary source; nothing is added beyond what that source supports.
 * They share the Article type, so schema, breadcrumbs, sitemap
 * inclusion, and internal linking are inherited.
 */

import type { Article } from "@/data/articles";

export const INTEL_CATEGORIES = [
  "Regulatory Updates",
  "Research",
  "Recalls & Safety",
  "Testing & Quality",
  "Sourcing & Transparency",
  "Guides",
] as const;

export type IntelCategory = (typeof INTEL_CATEGORIES)[number];

export const INTEL_ARTICLES: Article[] = [
  // 1 ─────────────────────────────────────────────────────────────────
  {
    slug: "fda-warns-supplement-grade-ingredients-injectable-drugs",
    question: "FDA warns against using supplement-grade ingredients in injectable drugs",
    metaTitle: "FDA Warns Against Supplement-Grade Ingredients in Injectable Drugs",
    metaDescription:
      "FDA is investigating adverse events in at least 30 patients who received compounded IV glutathione made with supplement-grade ingredient. What it means for sourcing.",
    standfirst:
      "FDA reports that pharmacies involved in a compounded IV glutathione investigation obtained the ingredient from the same supplier lot — an ingredient labelled for dietary supplement use, not for injectable drugs.",
    category: "Regulatory Updates",
    cluster: "compounding",
    published: "2026-08-27",
    updated: "2026-08-29",
    source: {
      name: "U.S. Food and Drug Administration",
      date: "August 27, 2026",
    },
    sections: [
      {
        id: "what-fda-reported",
        heading: "What FDA reported",
        body: [
          "FDA is investigating reports involving at least 30 patients who experienced adverse events after receiving compounded intravenous glutathione.",
          "According to FDA, the pharmacies involved obtained glutathione from the same supplier lot. The ingredient was labelled for dietary supplement use and was not appropriate for use in injectable drugs.",
        ],
      },
      {
        id: "adverse-events",
        heading: "The reported adverse events",
        body: [
          "Reported adverse events included fever, chills, dizziness, pain, and sepsis-like symptoms. Some patients were hospitalised.",
          "FDA emphasised that compounders are responsible for ensuring the ingredients they use are appropriate for their intended purpose.",
        ],
      },
      {
        id: "supplement-vs-pharmaceutical",
        heading: "Why the grade of an ingredient matters",
        body: [
          "An ingredient labelled for dietary supplement use is qualified against a different set of expectations than an ingredient intended for a sterile injectable drug. The label states the use the supplier qualified it for; using it outside that use places the burden of qualification on whoever compounds with it.",
          "FDA's position in this investigation is narrow and specific: the responsibility for confirming an ingredient is appropriate for its intended purpose sits with the compounder.",
        ],
      },
      {
        id: "sourcing-implication",
        heading: "The sourcing implication",
        body: [
          "The broader sourcing issue is that product quality begins upstream. Understanding where an ingredient originated, how it was qualified, and whether it was appropriate for its intended use matters before a finished compounded product reaches a patient.",
          "A single supplier lot reaching multiple pharmacies is the mechanism by which one upstream decision becomes a multi-site patient event. That is a supply-chain fact, not an inference about any particular pharmacy's practices.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is supplement-grade the same as pharmaceutical-grade?",
        a: "No. The labelled intended use reflects what the supplier qualified the material for. FDA's statement in this investigation was that the ingredient was labelled for dietary supplement use and was not appropriate for use in injectable drugs.",
      },
      {
        q: "How can a patient tell what grade of ingredient was used?",
        a: "Not directly. The question has to be asked of the compounder, and the answer is supported by ingredient release documentation held upstream of the finished product.",
      },
    ],
    relatedArticles: [
      "pharmacy-may-not-be-the-manufacturer",
      "drug-quality-starts-before-the-pharmacy",
      "compounded-injectable-recalled-elevated-endotoxin",
    ],
    relatedPaths: [
      { to: "/compounding", label: "Compounding overview" },
      { to: "/facilities", label: "Facility records" },
    ],
  },

  // 2 ─────────────────────────────────────────────────────────────────
  {
    slug: "lilly-files-six-lawsuits-over-retatrutide-sales",
    question: "What do Lilly's retatrutide lawsuits mean for buyers?",
    metaTitle: "Lilly Files Six Lawsuits Over Retatrutide Sales",
    metaDescription:
      "Eli Lilly filed six lawsuits over alleged unauthorised retatrutide sales. Retatrutide is investigational and not FDA approved — here is what that distinction means.",
    standfirst:
      "Retatrutide is in Phase 3 development and is not FDA approved. Commercial availability is not evidence of approval, legitimacy, or appropriate sourcing.",
    category: "Regulatory Updates",
    cluster: "peptides",
    published: "2026-08-12",
    updated: "2026-08-29",
    source: {
      name: "Eli Lilly and Company",
      date: "August 12, 2026",
    },
    sections: [
      {
        id: "the-filings",
        heading: "The filings",
        body: [
          "Eli Lilly filed six lawsuits on 12 August 2026 against U.S. entities it alleges were selling unauthorised retatrutide products.",
          "According to Lilly, products targeted by the lawsuits were being marketed outside its clinical trial programme, including products described as \"research use only\" while allegedly being sold for human use.",
        ],
      },
      {
        id: "regulatory-status",
        heading: "Retatrutide's regulatory status",
        body: [
          "Retatrutide remains investigational and is not FDA approved. It remains in clinical development, with Phase 3 studies ongoing.",
          "An investigational compound has not completed the review that establishes an approved indication, dosing, labelling, and manufacturing standard. That review is the thing an approval represents; nothing available for purchase substitutes for it.",
        ],
      },
      {
        id: "research-use-only",
        heading: "What \"research use only\" signals",
        body: [
          "A research-use-only label describes a product not offered for human administration. Where such a label sits on a product allegedly sold for human use, the label is not describing the transaction.",
          "The distinction matters because commercial availability does not establish regulatory approval, product legitimacy, or appropriate sourcing.",
        ],
      },
      {
        id: "questions",
        heading: "The questions that follow",
        body: [
          "As interest in investigational peptides increases, questions about who manufactured a product, where it entered the supply chain, and what regulatory pathway applies become increasingly important.",
          "Those three questions are answerable with documents, or they are not answerable at all. Source Standard treats an unanswerable sourcing question as an information gap and records it as such.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is retatrutide FDA approved?",
        a: "No. Retatrutide remains investigational, with Phase 3 studies ongoing.",
      },
      {
        q: "Does a product being available for sale mean it is legitimate?",
        a: "No. Commercial availability does not establish regulatory approval, product legitimacy, or appropriate sourcing.",
      },
    ],
    relatedArticles: [
      "before-you-trust-a-peptide-product-ask-these-4-questions",
      "fda-updates-glp-1-import-controls",
      "pharmacy-may-not-be-the-manufacturer",
    ],
    relatedPaths: [
      { to: "/peptides", label: "Peptides overview" },
      { to: "/peptides/sourcing", label: "Peptide sourcing" },
    ],
  },

  // 3 ─────────────────────────────────────────────────────────────────
  {
    slug: "bpc-157-phase-2-hamstring-trial",
    question: "Is BPC-157 in human clinical trials?",
    metaTitle: "BPC-157 Enters Phase 2 Human Study for Acute Hamstring Injuries",
    metaDescription:
      "BPC-157 is being evaluated in a randomised, double-blind, placebo-controlled Phase 2 trial in acute Grade II hamstring strain. What the trial does and does not establish.",
    standfirst:
      "A registered Phase 2 trial moves BPC-157 from preclinical and anecdotal evidence into a controlled human setting. It does not establish that the compound is safe or effective.",
    category: "Research",
    cluster: "peptides",
    published: "2026-08-20",
    updated: "2026-08-29",
    source: {
      name: "ClinicalTrials.gov, Study ID NCT07437547",
      url: "https://clinicaltrials.gov/study/NCT07437547",
    },
    sections: [
      {
        id: "the-study",
        heading: "The study",
        body: [
          "BPC-157 is being evaluated in a Phase 2 human clinical trial involving acute hamstring strains. The study is randomised, double-blind, and placebo-controlled.",
          "The condition being studied is acute Grade II hamstring strain.",
        ],
        bullets: [
          "Design — randomised, double-blind, placebo-controlled",
          "Population — acute Grade II hamstring strain",
          "Outcomes — return to unrestricted sport and MRI-assessed structural healing",
          "Registration — ClinicalTrials.gov, NCT07437547",
        ],
      },
      {
        id: "what-is-measured",
        heading: "What is being measured",
        body: [
          "Researchers are evaluating whether BPC-157 can improve recovery and are measuring outcomes including return to unrestricted sport and MRI-assessed structural healing.",
          "Both are concrete endpoints: one functional, one structural. That combination is what distinguishes a controlled trial from a self-reported recovery account.",
        ],
      },
      {
        id: "what-it-does-not-mean",
        heading: "What a Phase 2 trial does not mean",
        body: [
          "The existence of a Phase 2 clinical trial does not establish that BPC-157 is safe or effective. It means the compound is being evaluated in a more rigorous human setting.",
          "That distinction is particularly important because much of the public discussion surrounding BPC-157 has historically relied on preclinical evidence, anecdotal reports, and limited human evidence.",
        ],
      },
      {
        id: "following",
        heading: "Following the trial",
        body: [
          "Source Standard will continue following this trial as results become available. Until results are published, the accurate statement about BPC-157's human evidence base is that it is limited and under active study.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is BPC-157 FDA approved?",
        a: "No. It is under evaluation in a Phase 2 human trial, which is a stage of clinical investigation rather than an approval.",
      },
      {
        q: "Does a Phase 2 trial mean BPC-157 works?",
        a: "No. It means the compound is being evaluated in a randomised, controlled human setting. Results determine what the trial establishes.",
      },
    ],
    relatedArticles: [
      "before-you-trust-a-peptide-product-ask-these-4-questions",
      "lilly-files-six-lawsuits-over-retatrutide-sales",
      "glp-1-weight-loss-network-meta-analysis",
    ],
    relatedPaths: [{ to: "/peptides", label: "Peptides overview" }],
  },

  // 4 ─────────────────────────────────────────────────────────────────
  {
    slug: "before-you-trust-a-peptide-product-ask-these-4-questions",
    question: "Before you trust a peptide product, ask these 4 questions",
    metaTitle: "Before You Trust a Peptide Product, Ask These 4 Questions",
    metaDescription:
      "Who made the active ingredient, who tested it, what was tested, and what is its regulatory status? Four questions that separate evidence from assurance.",
    standfirst:
      "A pharmacy name, a certificate of analysis, a purity result, or a third-party test can each provide useful information. None of them necessarily answers every question about a product.",
    category: "Guides",
    cluster: "peptides",
    published: "2026-08-29",
    updated: "2026-08-29",
    source: {
      name: "Source Standard analysis informed by U.S. FDA materials",
    },
    sections: [
      {
        id: "why-four",
        heading: "Why one answer is never enough",
        body: [
          "Consumers often want a simple answer to the question: can I trust this peptide product? The available signals — a familiar pharmacy name, a certificate, a purity percentage — each answer a narrow question well and a broad question badly.",
          "The four questions below are ordered so that each one closes a gap the previous one leaves open.",
        ],
      },
      {
        id: "who-manufactured",
        heading: "1. Who manufactured the active ingredient?",
        body: [
          "Do not look only at the pharmacy or vendor. Trace the source of the active pharmaceutical ingredient.",
          "The place where a finished medication was compounded may not be the same organisation that manufactured or supplied its active ingredient. Those are two separate entities with two separate records.",
        ],
      },
      {
        id: "who-tested",
        heading: "2. Who tested it?",
        body: [
          "Determine whether testing was performed by an independent laboratory, and understand potential conflicts of interest.",
          "In-house testing is not inherently unreliable, and independent testing is not inherently conclusive. What matters is knowing which one you are reading.",
        ],
      },
      {
        id: "what-was-tested",
        heading: "3. What was actually tested?",
        body: [
          "Identity, chemical purity, potency, sterility, bacterial endotoxins, heavy metals, and other analyses answer different questions.",
          "A high chemical-purity result does not automatically establish sterility, appropriate sourcing, regulatory status, or overall product quality.",
        ],
        bullets: [
          "Identity — is this the molecule claimed?",
          "Purity and potency — how much of it is present, and in what proportion?",
          "Sterility — is the preparation free of viable microorganisms?",
          "Bacterial endotoxins — are pyrogenic bacterial fragments below specification?",
        ],
      },
      {
        id: "regulatory-status",
        heading: "4. What is the regulatory status?",
        body: [
          "Determine whether the product is an approved drug, a compounded medication, an investigational product, or a research-use product.",
          "Different regulatory categories carry different evidence and oversight considerations. Category is not a quality score, but it defines which evidence exists at all.",
        ],
      },
      {
        id: "principle",
        heading: "The underlying principle",
        body: [
          "Transparency requires understanding the evidence behind a product rather than relying on a single number, label, or claim.",
          "Better questions lead to better-informed decisions. Where an answer is unavailable, the accurate conclusion is that the point is unverified — not that the product is deficient.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a certificate of analysis enough on its own?",
        a: "No. A certificate reports the tests it lists, for the lot it names. It says nothing about tests that were not run or about the vial's relationship to that lot unless the lot identifiers match.",
      },
      {
        q: "Does high purity mean a product is safe?",
        a: "No. A high chemical-purity result does not automatically establish sterility, appropriate sourcing, regulatory status, or overall product quality.",
      },
    ],
    relatedArticles: [
      "pharmacy-may-not-be-the-manufacturer",
      "what-does-a-peptide-coa-actually-prove",
      "purity-testing-vs-sterility-testing",
      "what-is-endotoxin-testing",
    ],
    relatedPaths: [
      { to: "/peptides/testing", label: "Peptide testing overview" },
      { to: "/peptides/purity-testing", label: "Purity testing" },
      { to: "/peptides/sterility-testing", label: "Sterility testing" },
      { to: "/peptides/endotoxin-testing", label: "Endotoxin testing" },
      { to: "/peptides/sourcing", label: "Peptide sourcing" },
      { to: "/how-it-works", label: "Verification methodology" },
      { to: "/clinics", label: "Clinic directory" },
      { to: "/facilities", label: "Facility records" },
    ],
  },

  // 5 ─────────────────────────────────────────────────────────────────
  {
    slug: "pharmacy-may-not-be-the-manufacturer",
    question: "Is the pharmacy on the label the manufacturer?",
    metaTitle: "The Pharmacy May Not Be the Manufacturer",
    metaDescription:
      "The pharmacy name on a compounded medication may not identify where the active pharmaceutical ingredient originated. How compounded drug sourcing actually works.",
    standfirst:
      "Source transparency means understanding where a product started, not simply where it was finished.",
    category: "Sourcing & Transparency",
    cluster: "compounding",
    published: "2026-08-29",
    updated: "2026-08-29",
    source: {
      name: "Source Standard analysis",
    },
    sections: [
      {
        id: "two-questions",
        heading: "Two questions, not one",
        body: [
          "When someone receives a compounded medication, the pharmacy name on the label may not identify where the active pharmaceutical ingredient actually originated.",
          "The pharmacy may prepare the finished medication while obtaining the active pharmaceutical ingredient, or API, from a separate upstream manufacturer or supplier.",
        ],
        bullets: [
          "Who compounded the finished medication?",
          "Who manufactured or supplied the active ingredient inside it?",
        ],
      },
      {
        id: "supply-chain",
        heading: "A simplified supply chain",
        body: [
          "API manufacturer or supplier → compounding pharmacy or outsourcing facility → clinic or provider → patient.",
          "Understanding the pharmacy is important, but it represents only one layer of the supply chain. Each layer holds its own documentation and carries its own obligations.",
        ],
      },
      {
        id: "what-to-ask",
        heading: "What to ask",
        body: [
          "For someone evaluating a compounded product, it is reasonable to ask where the active ingredient was sourced and what documentation supports that supply chain.",
          "Both questions have short factual answers. Where those answers are not available, the sourcing is unverified — which is a different finding from sourcing being inadequate.",
        ],
      },
      {
        id: "what-source-standard-records",
        heading: "What Source Standard records",
        body: [
          "Where a clinic has completed Source Standard verification, named upstream sources appear on its directory record. Where a clinic has not participated, Source Standard holds no sourcing information and infers none.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do compounding pharmacies make their own active ingredients?",
        a: "Generally the active pharmaceutical ingredient is obtained from a separate upstream manufacturer or supplier, and the pharmacy prepares the finished medication.",
      },
      {
        q: "How do I find out who made the API in my medication?",
        a: "Ask the compounder which supplier provided the active ingredient and what documentation supports that supply chain.",
      },
    ],
    relatedArticles: [
      "before-you-trust-a-peptide-product-ask-these-4-questions",
      "drug-quality-starts-before-the-pharmacy",
      "does-the-pharmacy-compound-the-peptide-itself",
      "how-peptide-sourcing-works",
    ],
    relatedPaths: [
      { to: "/peptides/sourcing", label: "Peptide sourcing" },
      { to: "/compounding/503a", label: "503A compounding pharmacies" },
      { to: "/compounding/503b", label: "503B outsourcing facilities" },
      { to: "/facilities", label: "Facility records" },
      { to: "/clinics", label: "Clinic directory" },
    ],
  },

  // 6 ─────────────────────────────────────────────────────────────────
  {
    slug: "fda-updates-glp-1-import-controls",
    question: "What did FDA change about GLP-1 API import controls?",
    metaTitle: "FDA Updates GLP-1 Import Controls After Reviewing API Sites",
    metaDescription:
      "FDA updated Import Alert 66-80 after evaluating 48 GLP-1 API manufacturing sites, 21% of which were noncompliant or unresponsive to records requests.",
    standfirst:
      "Problems involving an API manufacturer can exist before a product ever reaches a pharmacy, clinic, or patient.",
    category: "Regulatory Updates",
    cluster: "peptides",
    published: "2026-08-12",
    updated: "2026-08-29",
    source: {
      name: "U.S. Food and Drug Administration, Import Alert 66-80",
      date: "Updated August 12, 2026",
    },
    sections: [
      {
        id: "the-update",
        heading: "The update",
        body: [
          "FDA updated Import Alert 66-80 on 12 August 2026, expanding how it evaluates foreign manufacturers supplying GLP-1 active pharmaceutical ingredients.",
          "FDA stated that it evaluated 48 GLP-1 API manufacturing sites and found that 21% were either noncompliant with applicable requirements or did not respond to records requests in a timely manner.",
        ],
      },
      {
        id: "evidence-expansion",
        heading: "The evidence manufacturers can submit",
        body: [
          "The update also expands the types of evidence manufacturers can submit when seeking Green List status.",
        ],
        bullets: [
          "Certificates of analysis",
          "Impurity and potency specifications",
          "Microbial testing",
          "Stability data",
          "Process validation",
          "Batch records",
          "Out-of-specification investigations",
        ],
      },
      {
        id: "upstream-quality",
        heading: "Why upstream quality is the issue",
        body: [
          "The broader issue is upstream quality. Problems involving an API manufacturer can exist before a product ever reaches a pharmacy, clinic, or patient.",
          "A downstream facility inherits the material it is given. Its own compliance record does not describe the conditions under which that material was made.",
        ],
      },
      {
        id: "for-source-standard",
        heading: "What it reinforces",
        body: [
          "For Source Standard, this reinforces why supplier identity, manufacturing history, documentation, and testing all matter when evaluating a finished product.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an FDA import alert?",
        a: "An import alert is the mechanism FDA uses to control entry of products from specific foreign manufacturers. Import Alert 66-80 applies to drug products and, per this update, to how GLP-1 API manufacturers are evaluated.",
      },
    ],
    relatedArticles: [
      "drug-quality-starts-before-the-pharmacy",
      "pharmacy-may-not-be-the-manufacturer",
      "glp-1-weight-loss-network-meta-analysis",
    ],
    relatedPaths: [
      { to: "/peptides/sourcing", label: "Peptide sourcing" },
      { to: "/facilities", label: "Facility records" },
    ],
  },

  // 7 ─────────────────────────────────────────────────────────────────
  {
    slug: "compounded-injectable-recalled-elevated-endotoxin",
    question: "Why was a compounded glutathione injectable recalled?",
    metaTitle: "Compounded Injectable Recalled After Elevated Endotoxin Findings",
    metaDescription:
      "Victory Medical Center Pharmacy recalled compounded glutathione 200 mg/mL vials after testing found elevated bacterial endotoxins. Why purity is not the whole picture.",
    standfirst:
      "A product can perform well on one measurement while failing another. A single purity percentage is not a complete picture of injectable quality.",
    category: "Recalls & Safety",
    cluster: "compounding",
    published: "2026-08-05",
    updated: "2026-08-29",
    source: {
      name: "U.S. Food and Drug Administration",
      date: "August 5, 2026",
    },
    sections: [
      {
        id: "the-recall",
        heading: "The recall",
        body: [
          "On 5 August 2026, Victory Medical Center Pharmacy voluntarily recalled certain lots of compounded glutathione 200 mg/mL multi-dose vials after pharmacy testing identified elevated bacterial endotoxin levels.",
          "The affected product was Getz Pharma Compounded Glutathione Injectable, 200 mg/mL. It was distributed to consumers in Texas, Florida, and New York.",
        ],
      },
      {
        id: "reported-events",
        heading: "Reported adverse events",
        body: [
          "Victory Medical Center Pharmacy reported adverse events including fever, chills, severe headache, nausea, tachycardia, changes in blood pressure, body aches, and injection-site reactions.",
        ],
      },
      {
        id: "purity-is-not-sterility",
        heading: "Purity is not the same question as endotoxin",
        body: [
          "Confirming the expected active ingredient or measuring chemical purity does not, by itself, establish that a product meets other critical quality requirements.",
          "Injectable products can also require evaluation for attributes such as sterility and bacterial endotoxin levels. These answer separate quality questions, and a product can perform well on one measurement while failing another.",
        ],
      },
      {
        id: "lesson",
        heading: "The larger lesson",
        body: [
          "A single purity percentage should not be treated as a complete picture of injectable product quality.",
          "When reading a certificate of analysis for an injectable, the useful exercise is to note which assays are present and which are absent — the absent ones are the questions still open.",
        ],
      },
    ],
    faqs: [
      {
        q: "What are bacterial endotoxins?",
        a: "Endotoxins are pyrogenic fragments of bacterial cell walls. They are measured by a dedicated assay and can be present even where other quality measurements are within specification.",
      },
      {
        q: "Does a purity test detect endotoxins?",
        a: "No. Purity, sterility, and bacterial endotoxin testing answer separate questions and are run as separate analyses.",
      },
    ],
    relatedArticles: [
      "what-is-endotoxin-testing",
      "purity-testing-vs-sterility-testing",
      "before-you-trust-a-peptide-product-ask-these-4-questions",
    ],
    relatedPaths: [
      { to: "/peptides/endotoxin-testing", label: "Endotoxin testing" },
      { to: "/peptides/sterility-testing", label: "Sterility testing" },
      { to: "/peptides/testing", label: "Peptide testing overview" },
    ],
  },

  // 8 ─────────────────────────────────────────────────────────────────
  {
    slug: "drug-quality-starts-before-the-pharmacy",
    question: "Where does drug quality risk actually originate?",
    metaTitle: "Drug Quality Starts Before the Pharmacy",
    metaDescription:
      "FDA warning letters to API manufacturers show that quality risk can originate upstream, before a pharmacy or clinic ever receives a product.",
    standfirst:
      "Compliance at a downstream facility cannot by itself eliminate manufacturing risk that originated earlier in the supply chain.",
    category: "Sourcing & Transparency",
    cluster: "compounding",
    published: "2026-07-31",
    updated: "2026-08-29",
    source: {
      name: "U.S. Food and Drug Administration warning letters",
      date: "July 2026",
    },
    sections: [
      {
        id: "what-fda-cited",
        heading: "What FDA cited",
        body: [
          "Recent FDA warning letters involving active pharmaceutical ingredient manufacturers highlight a part of drug quality that can easily be overlooked: risk can originate upstream, before a pharmacy or clinic ever receives a product.",
          "FDA cited significant current good manufacturing practice deficiencies involving areas such as quality oversight, cleaning processes, cross-contamination concerns, and manufacturing controls.",
          "In at least one case discussed in the underlying FDA materials, products from the facility had also been placed on import alert.",
        ],
      },
      {
        id: "the-chain",
        heading: "The chain a clinic is actually buying from",
        body: [
          "For clinics evaluating suppliers, the pharmacy or outsourcing facility represents only one part of the chain.",
          "A simplified supply chain can be: API manufacturer → pharmacy or 503B outsourcing facility → clinic → patient. Quality depends on what occurs at multiple stages.",
        ],
      },
      {
        id: "downstream-limits",
        heading: "The limits of downstream compliance",
        body: [
          "Compliance at a downstream facility cannot by itself eliminate manufacturing risk that originated earlier in the supply chain.",
          "This is why Source Standard focuses not only on the name of the pharmacy but also on supplier identity, manufacturing history, documentation, and independent evidence where available.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is cGMP?",
        a: "Current good manufacturing practice is the set of regulatory expectations covering how a drug or ingredient is produced, controlled, and documented. FDA warning letters cite deficiencies against those expectations.",
      },
    ],
    relatedArticles: [
      "pharmacy-may-not-be-the-manufacturer",
      "fda-updates-glp-1-import-controls",
      "fda-warns-supplement-grade-ingredients-injectable-drugs",
    ],
    relatedPaths: [
      { to: "/compounding/503b", label: "503B outsourcing facilities" },
      { to: "/facilities", label: "Facility records" },
      { to: "/clinics", label: "Clinic directory" },
    ],
  },

  // 9 ─────────────────────────────────────────────────────────────────
  {
    slug: "glp-1-weight-loss-network-meta-analysis",
    question: "How do tirzepatide, semaglutide, and liraglutide compare for weight loss?",
    metaTitle: "New Analysis Compares Weight Loss Across Major GLP-1 Therapies",
    metaDescription:
      "A network meta-analysis of 24 Phase 3 trials compared tirzepatide, semaglutide, and liraglutide for longer-term weight loss. What it found and what it cannot settle.",
    standfirst:
      "Tirzepatide 15 mg ranked highest in the analysis. The authors' limitations matter as much as the ranking.",
    category: "Research",
    cluster: "peptides",
    published: "2026-08-06",
    updated: "2026-08-29",
    source: {
      name: "Journal of Endocrinological Investigation",
      date: "August 6, 2026",
    },
    sections: [
      {
        id: "the-analysis",
        heading: "The analysis",
        body: [
          "A systematic review and network meta-analysis compared longer-term weight-loss outcomes across 24 Phase 3 randomised trials involving tirzepatide, semaglutide, and liraglutide.",
        ],
      },
      {
        id: "findings",
        heading: "What it found",
        body: [
          "In the analysis, tirzepatide 15 mg ranked highest for reductions in body weight and waist circumference.",
          "Higher-dose semaglutide 7.2 mg also ranked above the 2.4 mg dose, although the additional benefit was modest and was not consistently statistically significant across comparisons.",
          "Liraglutide 3.0 mg ranked below the higher doses of tirzepatide and semaglutide in the analysis. The analysis did not identify significant between-treatment differences in serious adverse events.",
        ],
      },
      {
        id: "limitations",
        heading: "The limitations the authors noted",
        body: [
          "The authors noted important limitations, including heterogeneity across studies and limited direct head-to-head evidence.",
          "A network meta-analysis infers comparisons that the underlying trials did not run directly. Where head-to-head evidence is limited, the ranking reflects a model as much as a measurement.",
        ],
      },
      {
        id: "takeaway",
        heading: "The takeaway",
        body: [
          "The takeaway should not be that these therapies are interchangeable.",
          "Different molecules, doses, study populations, and evidence bases matter when interpreting comparative outcomes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Did the analysis find one therapy safer than another?",
        a: "The analysis did not identify significant between-treatment differences in serious adverse events.",
      },
    ],
    relatedArticles: [
      "fda-updates-glp-1-import-controls",
      "bpc-157-phase-2-hamstring-trial",
      "before-you-trust-a-peptide-product-ask-these-4-questions",
    ],
    relatedPaths: [{ to: "/peptides", label: "Peptides overview" }],
  },
];
