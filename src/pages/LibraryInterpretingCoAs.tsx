import { RecordHeader } from "@/components/RecordHeader";
import {
  BoardSection,
  BoardDefList,
  BoardFooterNav,
  BoardCiteFooter,
} from "@/components/BoardSection";

const DOC_ID = "SS-SERIES-002";

const LibraryInterpretingCoAs = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Audit Protocols"
        title="Audit Protocols: Interpreting CoAs and Detecting Discrepancies"
        lead="A guide to understanding Certificates of Analysis, verifying laboratory authenticity, and identifying common red flags in pharmaceutical testing."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <BoardSection n={1} category="Definition" title="What is a CoA?">
        <p>
          A Certificate of Analysis (CoA) is a legal document issued by an analytical laboratory that confirms a batch of medication meets its product specification. It is the 'fingerprint' of a drug's quality. In the compounding industry, a CoA should be provided for every lot of raw API (Active Pharmaceutical Ingredient) and, in best-practice scenarios, for the finished compounded sterile preparation.
        </p>
      </BoardSection>

      <BoardSection
        n={2}
        category="Anatomy"
        title="The four pillars of a verified CoA."
        muted
      >
        <p>When Source Standard audits a vendor, we look for four critical pillars on every report:</p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            {
              term: "Identity",
              description: "Does the report clearly state the name of the compound and the manufacturer?",
            },
            {
              term: "Potency (Assay)",
              description: "Is the active ingredient within the acceptable range (typically 90%–110% of the labeled claim)?",
            },
            {
              term: "Purity",
              description: "Are impurities, heavy metals, and residual solvents documented and within safety limits?",
            },
            {
              term: "Sterility & endotoxins",
              description: "For injectable preparations, does the report confirm the absence of microbial growth and pyrogens?",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={3}
        category="Red flags"
        title="Common discrepancies and forgery patterns."
      >
        <p>
          Consumers and clinics should be wary of 'Static CoAs' — reports that are reused for different batches or have been visually altered. Red flags include:
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            {
              term: "Mismatched lot numbers",
              description: "The lot number on your vial must match the lot number on the CoA.",
            },
            {
              term: "Opaque lab identity",
              description:
                "A report that does not list a verifiable third-party lab (including address and contact info) should be treated as fraudulent.",
            },
            {
              term: "Missing dates",
              description: "Reports that lack a 'Date of Analysis' or 'Expiration Date' fail to prove current stability.",
            },
            {
              term: "Photoshop artifacts",
              description:
                "Misaligned text or varying font styles often indicate that a report has been 'edited' to reflect higher purity than was actually tested.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={4}
        category="Protocol"
        title="The Source Standard verification protocol."
        muted
      >
        <p>
          Our auditors do not just read CoAs; we reconcile them. This involves contacting the issuing laboratory directly to confirm that the report ID exists in their system and that the data on the page matches their internal records. This 'Closed-Loop' verification is the only way to ensure supply-chain integrity.
        </p>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/library/dual-layer-difference", label: "Next · The Dual-Layer Difference (SS-SERIES-003)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Audit Protocols — Interpreting CoAs, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    </>
  );
};

export default LibraryInterpretingCoAs;
