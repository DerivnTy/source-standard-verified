export type GlossaryTermDef = {
  term: string;
  definition: string;
  anchor?: string;
};

/**
 * Authoritative glossary — referenced by <GlossaryTerm> tooltips.
 * Keys are lowercased term identifiers.
 */
export const GLOSSARY: Record<string, GlossaryTermDef> = {
  aseptic: {
    term: "Aseptic",
    definition:
      "A technique or environment maintained free from viable microbial contamination during sterile preparation.",
  },
  cgmp: {
    term: "cGMP",
    definition:
      "Current Good Manufacturing Practice, FDA regulations governing pharmaceutical manufacturing quality systems (21 CFR 210/211).",
  },
  oai: {
    term: "OAI",
    definition:
      "Official Action Indicated, an FDA inspection classification signaling regulatory or administrative action is warranted.",
  },
  vai: {
    term: "VAI",
    definition:
      "Voluntary Action Indicated, an FDA inspection classification noting deviations that do not yet warrant administrative action.",
  },
  nai: {
    term: "NAI",
    definition: "No Action Indicated, an FDA inspection closed with no objectionable conditions found.",
  },
  "503a": {
    term: "503A",
    definition:
      "Section 503A of the FD&C Act, pharmacies compounding under state board oversight for individually identified patient prescriptions.",
  },
  "503b": {
    term: "503B",
    definition:
      "Section 503B of the FD&C Act, outsourcing facilities registered with FDA, subject to cGMP, permitted to compound without patient-specific prescriptions.",
  },
  coa: {
    term: "Certificate of Analysis (CoA)",
    definition:
      "A document issued by a qualified laboratory certifying the identity, potency, and purity of a tested API or finished compound.",
  },
  usp: {
    term: "USP",
    definition:
      "United States Pharmacopeia, the official compendium establishing standards for sterile (<797>) and non-sterile (<795>) compounding.",
  },
  peptide: {
    term: "Peptide",
    definition:
      "A short chain of amino acids (typically 2–50 residues) used therapeutically to modulate endocrine, metabolic, or regenerative pathways.",
  },
  sterile: {
    term: "Sterile",
    definition:
      "Free from all viable microorganisms, validated by a sterility assurance level (SAL) of 10⁻⁶ or via aseptic processing.",
  },
  fda: {
    term: "FDA",
    definition: "U.S. Food and Drug Administration, the federal agency regulating drugs, biologics, and devices.",
  },
  api: {
    term: "API",
    definition: "Active Pharmaceutical Ingredient, the bulk substance providing the therapeutic effect.",
  },
  bud: {
    term: "BUD",
    definition:
      "Beyond-Use Date, the date after which a compounded preparation may not be administered, governed by USP <797>.",
  },
  iso5: {
    term: "ISO 5",
    definition:
      "An air-quality classification permitting ≤3,520 particles ≥0.5 μm per m³, the standard required at the critical site during sterile compounding.",
  },
  endotoxin: {
    term: "Endotoxin",
    definition:
      "A heat-stable lipopolysaccharide from gram-negative bacterial cell walls; sterile injectables must remain below USP endotoxin limits.",
  },
  pec: {
    term: "PEC",
    definition: "Primary Engineering Control, the ISO 5 device (LAFW, BSC, CAI/CACI) housing aseptic operations.",
  },
  hpapi: {
    term: "HPAPI",
    definition: "Highly Potent Active Pharmaceutical Ingredient requiring containment beyond standard cGMP controls.",
  },
  ndc: {
    term: "NDC",
    definition: "National Drug Code, FDA-assigned identifier for a labeler, product, and package configuration.",
  },
  moa: {
    term: "MOA",
    definition: "Mechanism of Action, the biochemical pathway through which a substance produces its effect.",
  },
  hcg: {
    term: "hCG",
    definition: "Human Chorionic Gonadotropin, a glycoprotein hormone used clinically in fertility and HRT contexts.",
  },
  hrt: {
    term: "HRT",
    definition: "Hormone Replacement Therapy, clinical administration of hormones to address documented deficiency.",
  },
  trt: {
    term: "TRT",
    definition: "Testosterone Replacement Therapy, supervised hormonal therapy for clinically diagnosed hypogonadism.",
  },
  gmp: {
    term: "GMP",
    definition: "Good Manufacturing Practice, the umbrella quality framework for pharmaceutical production.",
  },
  fdca: {
    term: "FD&C Act",
    definition:
      "Federal Food, Drug, and Cosmetic Act, the foundational U.S. statute governing drug regulation, including §503A and §503B.",
  },
};

export const getGlossaryEntry = (key: string): GlossaryTermDef | undefined =>
  GLOSSARY[key.toLowerCase()];
