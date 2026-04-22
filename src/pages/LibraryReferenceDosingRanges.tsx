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

const DOC_ID = "SS-GUIDE-004";

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
      <PageMeta title="Reference Dosing Ranges · Foundational Series" description="Conservative reference dosing ranges drawn from peer-reviewed literature." />
      <Breadcrumb items={[
          { label: "Education", to: "/education" },
          { label: "Foundational Series" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Reference Dosing Ranges: Selected Compounds"
        lead="A high-level summary of literature-based dosing ranges for common compounded medications."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <BoardSection n={1} category="Disclaimer" title="Critical reading note.">
        <div className="border border-border bg-background px-5 py-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
            Disclaimer · §1
          </p>
          <p className="text-[14.5px] text-foreground leading-relaxed font-medium m-0">
            The information provided in this document is for informational and foundational reference only. These ranges represent common clinical observations in peer-reviewed literature and do not constitute medical advice or prescribing instructions. All dosages must be individualized by a licensed medical provider based on blood chemistry, clinical history, and specific therapeutic goals.
          </p>
        </div>
      </BoardSection>

      <BoardSection
        n={2}
        category="Purpose"
        title="Why standardize public reference ranges."
        muted
      >
        <p>
          In the compounded medication space, variability in concentration (e.g., mg/mL) often leads to patient confusion. Source Standard provides these reference ranges to help consumers understand the typical therapeutic window and to recognize significant deviations that may warrant further discussion with their provider.
        </p>
      </BoardSection>

      <BoardSection
        n={3}
        category="Reference table"
        title="Selected compound reference table."
        rationale="Literature-based ranges for the most frequently compounded categories. Individual protocols may vary."
      >
        <div className="border border-border bg-background">
          <div className="grid grid-cols-[1.4fr_1fr_1.2fr] bg-surface-muted border-b border-border px-4 py-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
              Compound category
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
              Common frequency
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground text-right">
              Typical reference range
            </span>
          </div>
          {REFERENCE_ROWS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[1.4fr_1fr_1.2fr] items-baseline px-4 py-4 border-b border-border last:border-b-0"
            >
              <span className="text-[14px] text-foreground pr-3">{row.category}</span>
              <span className="text-[13.5px] text-muted-foreground pr-3">{row.frequency}</span>
              <span className="font-mono text-[13px] text-foreground tabular-nums text-right">
                {row.range}
              </span>
            </div>
          ))}
        </div>
      </BoardSection>

      <BoardSection
        n={4}
        category="Calculation"
        title="Concentration vs. volume."
        muted
      >
        <p>A common point of failure in patient handling is the confusion between milligrams (mg) of medication and milliliters (mL) of liquid.</p>
        <BoardDefList
          prefix={(i) => `§4.${i + 1}`}
          items={[
            {
              term: "The calculation",
              description: "Dose (mg) ÷ Concentration (mg/mL) = Volume to inject (mL).",
            },
            {
              term: "Example",
              description: "If a vial is concentrated at 200 mg/mL and the prescribed dose is 100 mg, the volume to draw is 0.5 mL.",
            },
            {
              term: "Verification check",
              description:
                "Verified clinics are required to provide clear dosing instructions on the pharmacy label that explicitly state the volume to be drawn.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={5}
        category="Conclusion"
        title="On clinical oversight."
      >
        <p>
          Sub-therapeutic dosing leads to failed outcomes, while supra-therapeutic dosing increases the risk of adverse events (such as elevated hematocrit or gastrointestinal distress). If your prescribed dose falls significantly outside these foundational ranges, ensure your provider has explained the clinical rationale for your specific protocol.
        </p>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/education#faq", label: "Proceed to Regulatory FAQ Categories" }}
      />

      <BoardCiteFooter citation={`Source Standard, Clinical Guide — Reference Dosing Ranges, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    <DocSignature docId={DOC_ID} verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default LibraryReferenceDosingRanges;
