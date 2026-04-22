import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { Button } from "@/components/ui/button";

const DefList = ({ items }: { items: { term: string; description: string }[] }) => (
  <dl className="mt-4 divide-y divide-border/60 border-y border-border/60">
    {items.map((it) => (
      <div
        key={it.term}
        className="grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-2 md:gap-6 py-4"
      >
        <dt className="text-[13.5px] font-semibold text-foreground leading-snug">
          {it.term}
        </dt>
        <dd className="text-[15px] leading-[1.75] text-foreground/90 m-0">
          {it.description}
        </dd>
      </div>
    ))}
  </dl>
);

const LibraryAnalysis2026Reclassification = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Analysis"
        title="The 2026 Compounding Reclassification"
        lead="Background and implications of the recent regulatory shifts across 503A and 503B compounding categories."
        metadata={[
          { label: "Doc", value: "SS-SERIES-001" },
          { label: "Status", value: "Analysis / Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "April 21, 2026" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="The Regulatory Catalyst" />
        <p className="text-[15px] leading-[1.75] text-foreground/90">
          In early 2026, the regulatory landscape for compounded sterile preparations underwent a significant shift. The FDA, in coordination with state boards, updated the &lsquo;Bulk Drug Substances&rsquo; lists, effectively reclassifying how several high-demand compounds (including specific peptides and incretin mimetics) must be sourced and prepared.
        </p>

        <div className="mt-12">
          <SectionLabel
            number="§2"
            title="Key Changes in 503B Availability"
            description="One of the most significant impacts of the 2026 update is the restriction of certain &lsquo;demonstrably difficult to compound&rsquo; substances."
          />
          <DefList
            items={[
              {
                term: "Enhanced Stability Requirements",
                description:
                  "The FDA now requires more rigorous, long-term stability data for any compound held as 'Office Stock.'",
              },
              {
                term: "Batch-Size Limitations",
                description:
                  "To prevent 503B facilities from acting as mass-manufacturers without full drug approval, batch sizes for specific metabolic compounds have been capped, leading to potential supply-chain bottlenecks.",
              },
            ]}
          />
        </div>

        <div className="mt-12">
          <SectionLabel
            number="§3"
            title="The 'Trickle-Down' to 503A Pharmacies"
            description="As 503B facilities face tighter restrictions, many clinics have pivoted back to 503A (patient-specific) pharmacies. While legal, this shift requires a higher degree of diligence."
          />
          <DefList
            items={[
              {
                term: "Individual Prescription Necessity",
                description:
                  "There has been an increase in 'administrative' enforcement against clinics that attempt to bulk-purchase from 503A pharmacies without individual patient names attached at the time of order.",
              },
              {
                term: "Verification Necessity",
                description:
                  "Because 503A facilities do not have the same federal 'cGMP' reporting requirements as 503B, the 2026 reclassification has made independent audit trails (like the Source Standard protocol) the only reliable way to confirm quality.",
              },
            ]}
          />
        </div>

        <div className="mt-12">
          <SectionLabel number="§4" title="Looking Ahead" />
          <p className="text-[15px] leading-[1.75] text-foreground/90">
            For consumers, the 2026 reclassification means that &lsquo;cheap and fast&rsquo; sourcing is becoming a significant legal and safety liability. Institutions that fail to adapt their documentation and sourcing transparently are increasingly subject to state-level administrative action.
          </p>
        </div>

        <div className="mt-16 pt-6 border-t border-border/70 flex items-center justify-between gap-6">
          <Button asChild variant="outline">
            <Link to="/education">← Back to Education Hub</Link>
          </Button>
          <Link
            to="/library/analysis/questions-to-ask-your-clinic"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next Analysis: Questions to Ask Your Clinic (SS-SERIES-004) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryAnalysis2026Reclassification;
