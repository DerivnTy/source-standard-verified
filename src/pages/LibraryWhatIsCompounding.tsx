import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { Button } from "@/components/ui/button";

const DefList = ({
  items,
}: {
  items: { term: string; description: string }[];
}) => (
  <dl className="mt-5 divide-y divide-border/60 border-y border-border/60">
    {items.map((it) => (
      <div key={it.term} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-4">
        <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {it.term}
        </dt>
        <dd className="text-[16px] leading-[1.7] text-foreground">{it.description}</dd>
      </div>
    ))}
  </dl>
);

const LibraryWhatIsCompounding = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Foundational Series"
        title="What Is Compounding?"
        lead="An overview of pharmacy compounding, the 503A vs. 503B regulatory framework, and supply-chain implications."
        metadata={[
          { label: "Doc", value: "SS-SERIES-000B" },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04/21/26" },
        ]}
      />

      <Section>
        <SectionLabel
          number="§1"
          title="Overview"
        />
        <p>
          Pharmacy compounding is the process of creating a custom medication tailored to the specific needs of an individual patient. While traditional pharmaceutical manufacturers create mass-produced drugs, compounding pharmacies provide essential access to medications that may be backordered, discontinued, or required in a specific dosage form not commercially available.
        </p>
        <p>
          However, not all compounding pharmacies are regulated the same way. In the United States, the distinction between 503A and 503B facilities is the most critical factor in supply-chain integrity.
        </p>

        <div className="mt-14">
          <SectionLabel
            number="§2"
            title="503A Pharmacies: Patient-Specific"
          />
          <p>
            A 503A pharmacy is a traditional state-licensed facility. Their operations are primarily governed by State Boards of Pharmacy.
          </p>
          <DefList
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
        </div>

        <div className="mt-14">
          <SectionLabel
            number="§3"
            title="503B Pharmacies: Outsourcing Facilities"
          />
          <p>
            A 503B pharmacy is a designated Outsourcing Facility. These are high-volume operations capable of manufacturing large batches.
          </p>
          <DefList
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
        </div>

        <div className="mt-14">
          <SectionLabel
            number="§4"
            title="Clinical Implications"
          />
          <p>
            For a source to be 'Verified' by Source Standard, the clinic must disclose their facility type. If a clinic maintains 'Office Stock' to dispense immediately to patients, that inventory must originate from a 503B facility to meet safety requirements. Medications shipped directly to a patient's home are typically handled by 503A facilities.
          </p>
        </div>

        {/* Pivot footer */}
        <div className="mt-16 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild>
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/library/what-are-peptides"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next: What Are Peptides? (SS-SERIES-000A) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryWhatIsCompounding;
