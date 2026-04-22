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

const LibrarySterilePreparationIntegrity = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Sterile Preparation Integrity: Handling & Reconstitution Protocol"
        lead="Clinical standards for the handling, reconstitution, and storage of compounded sterile preparations to ensure therapeutic efficacy and microbial safety."
        metadata={[
          { label: "Doc", value: "SS-GUIDE-001" },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04/21/26" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="The Importance of Sterile Integrity" />
        <p>
          Once a compounded sterile preparation (CSP) leaves a controlled pharmacy environment (503A or 503B), its integrity relies entirely on the handling practices of the clinical staff and the end-user. Failure to maintain aseptic conditions during reconstitution or administration can lead to microbial contamination, site-of-injection infections, and the degradation of the active compound.
        </p>

        <div className="mt-14">
          <SectionLabel number="§2" title="Reconstitution Standards" />
          <p>
            For lyophilized (freeze-dried) compounds, the reconstitution process is a critical window for potential error.
          </p>
          <DefList
            items={[
              {
                term: "Diluent Verification",
                description: "Only use the specific diluent provided or prescribed (typically Bacteriostatic Water or Sterile Saline).",
              },
              {
                term: "The 'Gentle Swirl' Rule",
                description: "To avoid denaturing delicate peptide chains, never shake the vial. Gently swirl the liquid until the powder is fully dissolved.",
              },
              {
                term: "Pressure Equalization",
                description: "When injecting diluent, allow the pressure to equalize naturally to prevent 'venting,' which can introduce unfiltered room air into the sterile environment of the vial.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§3" title="Storage & Stability" />
          <p>
            Temperature fluctuations are the primary cause of peptide degradation.
          </p>
          <DefList
            items={[
              {
                term: "Cold Chain Maintenance",
                description: "Unless specifically stated otherwise by the compounding pharmacist, most reconstituted peptides must be stored between 2°C and 8°C (36°F – 46°F).",
              },
              {
                term: "Light Sensitivity",
                description: "Keep vials in their original secondary packaging or a dark container to prevent UV-induced oxidation.",
              },
              {
                term: "Beyond-Use Date (BUD)",
                description: "Never exceed the BUD listed on the pharmacy label. A 503A preparation typically has a shorter stability window than a mass-produced drug.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§4" title="Clinical Best Practices" />
          <p>
            Always perform a visual inspection before use. If the solution appears cloudy, contains visible particulates, or has changed color significantly, the preparation must be discarded. 'When in doubt, throw it out' is the foundational rule of sterile handling.
          </p>
        </div>

        {/* Pivot footer */}
        <div className="mt-16 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild>
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/library/aseptic-technique-fundamentals"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next: Aseptic Technique Fundamentals (SS-GUIDE-002) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibrarySterilePreparationIntegrity;
