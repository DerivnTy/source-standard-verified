import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { Button } from "@/components/ui/button";

const DefList = ({ items }: { items: { term: string; description: string }[] }) => (
  <dl className="mt-6 grid gap-x-6 gap-y-4 md:grid-cols-[200px_1fr] border-t border-border/60 pt-6">
    {items.map((it, i) => (
      <div key={i} className="contents">
        <dt className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground pt-[2px]">
          {it.term}
        </dt>
        <dd className="text-[15.5px] leading-[1.7] text-foreground">
          {it.description}
        </dd>
      </div>
    ))}
  </dl>
);

const REFERENCE_ROWS = [
  {
    category: "TRT (Testosterone Cypionate / Enanthate)",
    frequency: "Weekly or Bi-Weekly",
    range: "50 mg – 200 mg / week",
  },
  {
    category: "Incretin Mimetics (GLP-1)",
    frequency: "Weekly (Titrated)",
    range: "0.25 mg – 2.4 mg / week",
  },
  {
    category: "Growth Hormone Secretagogues",
    frequency: "Daily (Nightly)",
    range: "100 mcg – 300 mcg / dose",
  },
  {
    category: "Metabolic Signaling Peptides",
    frequency: "Variable",
    range: "Compound specific — see SS-SERIES-001",
  },
];

const LibraryReferenceDosingRanges = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Reference Dosing Ranges: Selected Compounds"
        lead="A high-level summary of literature-based dosing ranges for common compounded medications."
        metadata={[
          { label: "Doc", value: "SS-GUIDE-004" },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "April 21, 2026" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="Critical Disclaimer" />
        <div className="border border-border/70 bg-surface-muted/50 rounded-[2px] px-5 py-4">
          <p className="text-[14.5px] leading-[1.7] text-foreground/90 m-0">
            The information provided in this document is for informational and
            foundational reference only. These ranges represent common clinical
            observations in peer-reviewed literature and do not constitute
            medical advice or prescribing instructions. All dosages must be
            individualized by a licensed medical provider based on blood
            chemistry, clinical history, and specific therapeutic goals.
          </p>
        </div>

        <div className="mt-14">
          <SectionLabel number="§2" title="Purpose of Standardization" />
          <p>
            In the compounded medication space, variability in concentration
            (e.g., mg/mL) often leads to patient confusion. Source Standard
            provides these reference ranges to help consumers understand the
            typical therapeutic window and to recognize significant deviations
            that may warrant further discussion with their provider.
          </p>
        </div>

        <div className="mt-14">
          <SectionLabel
            number="§3"
            title="Selected Compound Reference Table"
            description="Literature-based ranges for the most frequently compounded categories. Individual protocols may vary."
          />
          <div className="border border-border/70 rounded-[2px] overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1.2fr] bg-surface-muted/60 border-b border-border/70 px-4 py-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                Compound Category
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                Common Frequency
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground text-right">
                Typical Reference Range
              </span>
            </div>
            {REFERENCE_ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.4fr_1fr_1.2fr] items-baseline px-4 py-4 border-b border-border/60 last:border-b-0"
              >
                <span className="text-[14px] text-foreground pr-3">
                  {row.category}
                </span>
                <span className="text-[13.5px] text-muted-foreground pr-3">
                  {row.frequency}
                </span>
                <span className="font-mono text-[13px] text-foreground tabular-nums text-right">
                  {row.range}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <SectionLabel
            number="§4"
            title="Understanding Concentration vs. Volume"
          />
          <p>
            A common point of failure in patient handling is the confusion
            between milligrams (mg) of medication and milliliters (mL) of
            liquid.
          </p>
          <DefList
            items={[
              {
                term: "The Calculation",
                description:
                  "Dose (mg) ÷ Concentration (mg/mL) = Volume to inject (mL).",
              },
              {
                term: "Example",
                description:
                  "If a vial is concentrated at 200 mg/mL and the prescribed dose is 100 mg, the volume to draw is 0.5 mL.",
              },
              {
                term: "Verification Check",
                description:
                  "Verified clinics are required to provide clear dosing instructions on the pharmacy label that explicitly state the volume to be drawn.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§5" title="Conclusion on Clinical Oversight" />
          <p>
            Sub-therapeutic dosing leads to failed outcomes, while
            supra-therapeutic dosing increases the risk of adverse events (such
            as elevated hematocrit or gastrointestinal distress). If your
            prescribed dose falls significantly outside these foundational
            ranges, ensure your provider has explained the clinical rationale
            for your specific protocol.
          </p>
        </div>

        <div className="mt-16 pt-6 border-t border-border/70 flex items-center justify-between gap-6">
          <Button asChild variant="outline">
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/education#faq"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Proceed to Regulatory FAQ Categories →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryReferenceDosingRanges;
