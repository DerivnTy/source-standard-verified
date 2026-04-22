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
      <div key={it.term} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-6 py-4">
        <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {it.term}
        </dt>
        <dd className="text-[16px] leading-[1.7] text-foreground">{it.description}</dd>
      </div>
    ))}
  </dl>
);

const LibraryInterpretingCoAs = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Audit Protocols"
        title="Audit Protocols: Interpreting CoAs and Detecting Discrepancies"
        lead="A guide to understanding Certificates of Analysis, verifying laboratory authenticity, and identifying common red flags in pharmaceutical testing."
        metadata={[
          { label: "Doc", value: "SS-SERIES-002" },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04/21/26" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="What is a CoA?" />
        <p>
          A Certificate of Analysis (CoA) is a legal document issued by an analytical laboratory that confirms a batch of medication meets its product specification. It is the 'fingerprint' of a drug's quality. In the compounding industry, a CoA should be provided for every lot of raw API (Active Pharmaceutical Ingredient) and, in best-practice scenarios, for the finished compounded sterile preparation.
        </p>

        <div className="mt-14">
          <SectionLabel number="§2" title="The Anatomy of a Verified CoA" />
          <p>
            When Source Standard audits a vendor, we look for four critical pillars on every report:
          </p>
          <DefList
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
                term: "Sterility & Endotoxins",
                description: "For injectable preparations, does the report confirm the absence of microbial growth and pyrogens?",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§3" title="Common Red Flags & Discrepancies" />
          <p>
            Consumers and clinics should be wary of 'Static CoAs' — reports that are reused for different batches or have been visually altered. Red flags include:
          </p>
          <DefList
            items={[
              {
                term: "Mismatched Lot Numbers",
                description: "The lot number on your vial must match the lot number on the CoA.",
              },
              {
                term: "Opaque Lab Identity",
                description: "A report that does not list a verifiable third-party lab (including address and contact info) should be treated as fraudulent.",
              },
              {
                term: "Missing Dates",
                description: "Reports that lack a 'Date of Analysis' or 'Expiration Date' fail to prove current stability.",
              },
              {
                term: "Photoshop Artifacts",
                description: "Misaligned text or varying font styles often indicate that a report has been 'edited' to reflect higher purity than was actually tested.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§4" title="The Source Standard Verification Protocol" />
          <p>
            Our auditors do not just read CoAs; we reconcile them. This involves contacting the issuing laboratory directly to confirm that the report ID exists in their system and that the data on the page matches their internal records. This 'Closed-Loop' verification is the only way to ensure supply-chain integrity.
          </p>
        </div>

        {/* Pivot footer */}
        <div className="mt-16 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild>
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/library/dual-layer-difference"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next: The Dual-Layer Difference (SS-SERIES-003) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryInterpretingCoAs;
