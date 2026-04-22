import { RecordHeader } from "@/components/RecordHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DocSignature } from "@/components/DocSignature";
import {
  BoardSection,
  BoardDefList,
  BoardFooterNav,
  BoardCiteFooter,
} from "@/components/BoardSection";

const DOC_ID = "SS-SERIES-000B";

const LibraryWhatIsCompounding = () => {
  return (
    <>
      <PageMeta title="What Is Compounding? · Foundational Series" description="The legal and clinical meaning of pharmaceutical compounding under §503A and §503B." />
      <Breadcrumb items={[
          { label: "Education", to: "/education" },
          { label: "Foundational Series" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Foundational Series"
        title="What Is Compounding?"
        lead="An overview of pharmacy compounding, the 503A vs. 503B regulatory framework, and supply-chain implications."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <BoardSection n={1} category="Overview" title="What pharmacy compounding is.">
        <p>
          Pharmacy compounding is the process of creating a custom medication tailored to the specific needs of an individual patient. While traditional pharmaceutical manufacturers create mass-produced drugs, compounding pharmacies provide essential access to medications that may be backordered, discontinued, or required in a specific dosage form not commercially available.
        </p>
        <p className="text-foreground font-medium">
          However, not all compounding pharmacies are regulated the same way. In the United States, the distinction between 503A and 503B facilities is the most critical factor in supply-chain integrity.
        </p>
      </BoardSection>

      <BoardSection
        n={2}
        category="503A pharmacies"
        title="Patient-specific facilities."
        muted
      >
        <p>
          A 503A pharmacy is a traditional state-licensed facility. Their operations are primarily governed by State Boards of Pharmacy.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            {
              term: "Requirement",
              description:
                "They can only compound a medication after receiving a valid prescription for an individual, identified patient.",
            },
            {
              term: "Standards",
              description:
                "They must follow USP (United States Pharmacopeia) guidelines, specifically USP <797> for sterile products.",
            },
            {
              term: "Oversight",
              description:
                "Primary oversight is at the state level, leading to varying degrees of enforcement and facility standards across different regions.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={3}
        category="503B pharmacies"
        title="Outsourcing facilities."
      >
        <p>
          A 503B pharmacy is a designated Outsourcing Facility. These are high-volume operations capable of manufacturing large batches.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            {
              term: "Requirement",
              description:
                "They can compound without individual patient prescriptions and sell directly to clinics for 'office use.'",
            },
            {
              term: "Oversight",
              description: "They are regulated directly by the FDA.",
            },
            {
              term: "Standards",
              description:
                "They must adhere to cGMP (current Good Manufacturing Practices) — the same rigorous standards followed by major pharmaceutical manufacturers. This includes mandatory stability testing for every batch.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={4}
        category="Clinical implications"
        title="What this means at the point of care."
        muted
      >
        <p>
          For a source to be 'Verified' by Source Standard, the clinic must disclose their facility type. If a clinic maintains 'Office Stock' to dispense immediately to patients, that inventory must originate from a 503B facility to meet safety requirements. Medications shipped directly to a patient's home are typically handled by 503A facilities.
        </p>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/library/what-are-peptides", label: "Next · What Are Peptides? (SS-SERIES-000A)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Foundational Series — What Is Compounding?, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    <DocSignature docId={DOC_ID} verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default LibraryWhatIsCompounding;
