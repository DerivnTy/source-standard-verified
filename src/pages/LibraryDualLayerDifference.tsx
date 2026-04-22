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

const LibraryDualLayerDifference = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Foundational Philosophy"
        title="The Dual-Layer Difference"
        lead="Understanding the symbiotic verification of both the clinical entity and the upstream pharmacy provider."
        metadata={[
          { label: "Doc", value: "SS-SERIES-003" },
          { label: "Status", value: "In Review / Public Reference" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04/21/26" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title={`The "Single-Point" Failure`} />
        <p>
          In the current healthcare landscape, verification usually happens in a vacuum. A pharmacy might be licensed by a state board, or a clinic might have a licensed medical director. However, the connection between the two is rarely audited. Source Standard was founded to eliminate the 'blind spot' that exists between the prescription and the procurement.
        </p>

        <div className="mt-14">
          <SectionLabel number="§2" title="Layer One: The Clinical Entity" />
          <p>
            We first audit the clinic itself. This layer of verification focuses on:
          </p>
          <DefList
            items={[
              {
                term: "Medical Oversight",
                description: "Confirming the Medical Director is licensed and in good standing without OIG exclusions.",
              },
              {
                term: "Prescribing Integrity",
                description: "Ensuring that medications are issued via valid patient-provider relationships, not 'click-to-buy' automated systems.",
              },
              {
                term: "Transparency",
                description: "Confirming the clinic accurately represents its sourcing to the consumer.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§3" title="Layer Two: The Upstream Pharmacy" />
          <p>
            A clinic is only a pass-through for the medication. Therefore, we verify the source:
          </p>
          <DefList
            items={[
              {
                term: "Licensure Reconciliation",
                description: "Cross-referencing pharmacy licenses in every state they ship to.",
              },
              {
                term: "Facility Classification",
                description: "Distinguishing between 503A (Patient-Specific) and 503B (Outsourcing) and ensuring the clinic is using the correct facility for their business model.",
              },
              {
                term: "Evidence of Sourcing",
                description: "Requiring invoices that prove the clinic is actually buying from the regulated pharmacy they claim to use.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§4" title="The Symbiotic Result" />
          <p>
            By verifying both layers, Source Standard creates a 'Closed-Loop' of accountability. If a pharmacy fails an inspection, the clinic's verification is flagged. If a clinic switches to an undocumented source, their 'Verified' status is revoked. This dual-layer approach is the only way to ensure that the medication in the patient's hand is the same medication documented in the audit.
          </p>
        </div>

        {/* Pivot footer */}
        <div className="mt-16 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild>
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/library/aseptic-protocols"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next: Clinical Handling & Aseptic Protocols (SS-GUIDE-001) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryDualLayerDifference;
