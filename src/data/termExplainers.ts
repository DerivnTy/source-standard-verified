/**
 * Term explainers, the sitewide "what it means / what it does not mean"
 * source of truth for concepts a consumer is unlikely to know.
 *
 * These are definitional statements about how the regulatory categories
 * and test types work. They contain no claims about any specific clinic,
 * facility, or product. Every entry must carry a `doesNotMean` line:
 * the limits of a term are as important as the term.
 */
export type TermExplainer = {
  term: string;
  /** Plain-language definition. */
  means: string;
  /** The inference readers commonly make that the term does not support. */
  doesNotMean: string;
  /** Optional deeper reading inside Source Standard. */
  to?: string;
};

export const TERM_EXPLAINERS: Record<string, TermExplainer> = {
  "503a": {
    term: "503A compounding pharmacy",
    means:
      "A pharmacy compounding under Section 503A of the Federal Food, Drug, and Cosmetic Act. It prepares medications for individually identified patients against a prescription, and is overseen primarily by its state board of pharmacy.",
    doesNotMean:
      "503A status is a regulatory category, not a quality rating. These pharmacies are not required to follow FDA current good manufacturing practice regulations, and their preparations are not FDA-approved.",
    to: "/compounding/503a",
  },
  "503b": {
    term: "503B outsourcing facility",
    means:
      "A facility registered with the FDA under Section 503B. It may compound in larger batches without patient-specific prescriptions, must follow current good manufacturing practice requirements, and is subject to FDA inspection.",
    doesNotMean:
      "Registration is a filing, not an endorsement. It does not mean the FDA has approved the products, that the facility has passed its most recent inspection, or that any individual batch was tested.",
    to: "/compounding/503b",
  },
  api: {
    term: "API manufacturer",
    means:
      "The manufacturer of the active pharmaceutical ingredient, the chemical that produces the drug's effect. The API is made upstream of the pharmacy that compounds the finished preparation.",
    doesNotMean:
      "Knowing the compounding pharmacy does not tell you who made the API. A reputable pharmacy can source from an API manufacturer that has never been independently evaluated.",
    to: "/peptides/sourcing",
  },
  coa: {
    term: "Certificate of Analysis (COA)",
    means:
      "A laboratory document reporting the results of specified tests on a specific sample or lot, such as identity, purity, or potency, against stated acceptance criteria.",
    doesNotMean:
      "A COA proves only what it tested, on the sample it tested. It does not establish that the lot you received matches the sample, that the testing laboratory was independent, or that untested attributes were acceptable.",
    to: "/peptides/testing",
  },
  identity: {
    term: "Identity testing",
    means:
      "Analysis confirming that the substance in a sample is the compound it is labelled as, typically by mass spectrometry or chromatographic comparison against a reference standard.",
    doesNotMean:
      "Confirming identity says nothing about how much active compound is present, what impurities accompany it, or whether the preparation is sterile.",
    to: "/peptides/testing",
  },
  purity: {
    term: "Purity",
    means:
      "The proportion of a sample that is the intended compound, with the balance being related substances, process impurities, or degradation products.",
    doesNotMean:
      "A high purity figure does not mean the correct dose is present, that the impurities present are harmless, or that the product is sterile.",
    to: "/peptides/testing",
  },
  potency: {
    term: "Potency",
    means:
      "The measured amount of active compound present, compared with the amount stated on the label.",
    doesNotMean:
      "Potency within specification does not establish identity of every component, absence of contaminants, or stability over the product's shelf life.",
    to: "/peptides/testing",
  },
  sterility: {
    term: "Sterility testing",
    means:
      "Testing intended to demonstrate the absence of viable microorganisms in a preparation intended for injection or other sterile use.",
    doesNotMean:
      "Sterility testing examines a sample of a lot, not every unit. A passing result does not detect bacterial endotoxins, which survive sterilization.",
    to: "/peptides/testing",
  },
  endotoxin: {
    term: "Bacterial endotoxins",
    means:
      "Fragments of the outer membrane of gram-negative bacteria. They can cause fever and severe inflammatory reactions when injected, and are measured separately from sterility.",
    doesNotMean:
      "A sterile product is not automatically low in endotoxins. Sterilization kills organisms but does not remove the endotoxins they left behind.",
    to: "/peptides/testing",
  },
  inspection: {
    term: "FDA inspection",
    means:
      "An on-site examination of a registered facility's operations, records, and conditions by FDA investigators, closed with a classification reflecting what was found.",
    doesNotMean:
      "An inspection is a point-in-time examination. Absence of a recent inspection does not mean a facility is compliant, and passing one does not certify individual products.",
  },
  "form-483": {
    term: "Form 483 observation",
    means:
      "A written list of conditions FDA investigators observed during an inspection that, in their judgment, may violate the Food, Drug, and Cosmetic Act.",
    doesNotMean:
      "A Form 483 is an investigator's observation, not a final agency determination, and not proof that a product was harmed. Its absence is likewise not a clean bill of health.",
  },
  "warning-letter": {
    term: "FDA warning letter",
    means:
      "A formal notice from the FDA stating that the agency considers a firm to be in significant violation of federal requirements, and requiring corrective action.",
    doesNotMean:
      "A warning letter concerns the violations described in it. It does not by itself establish that a specific patient was harmed, nor that every product from the firm is affected.",
  },
  recall: {
    term: "Recall",
    means:
      "A removal or correction of a marketed product, usually initiated by the firm, because the product is in violation of the law or presents a risk.",
    doesNotMean:
      "A recall covers the lots identified in the recall notice. It does not automatically extend to the firm's other products, and its absence does not confirm that unrecalled lots were tested.",
  },
  "sourcing-documentation": {
    term: "Sourcing documentation",
    means:
      "The records tracing a finished preparation back through the compounding pharmacy or outsourcing facility to the manufacturer of its active ingredient, such as invoices, lot records, and supplier qualification files.",
    doesNotMean:
      "Documentation demonstrates a paper trail. It does not on its own establish the quality of the material described, which is why Source Standard reviews documents against independent records.",
    to: "/peptides/sourcing",
  },
  "verification-status": {
    term: "Source Standard verification status",
    means:
      "A statement of whether an organization has completed Source Standard's independent sourcing verification process, and the current state of that participation.",
    doesNotMean:
      "A status of Not Source Standard Verified means the process has not been completed. It does not indicate that the provider failed verification, or that its sourcing, products, or safety are deficient.",
    to: "/status-definitions",
  },
  "independent-testing": {
    term: "Independent testing",
    means:
      "Analysis performed by a laboratory with no commercial relationship to the seller of the product being tested, on a sample the seller did not select.",
    doesNotMean:
      "A test result supplied by a seller is not independent, even when the laboratory is accredited, because the seller controlled which sample was submitted.",
    to: "/peptides/testing",
  },
};

export const getTermExplainer = (key: string): TermExplainer | undefined =>
  TERM_EXPLAINERS[key.trim().toLowerCase()];
