import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { Button } from "@/components/ui/button";

const DefList = ({
  items,
}: {
  items: { term: React.ReactNode; description: string }[];
}) => (
  <dl className="mt-4 divide-y divide-border/60 border-y border-border/60">
    {items.map((it, i) => (
      <div
        key={i}
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

const QUESTIONS = [
  {
    q: "Which pharmacy is compounding this medication, and are they a 503A or 503B facility?",
    why: "This tells you if the pharmacy is state-regulated (503A) or FDA-registered (503B) and clarifies the oversight level.",
  },
  {
    q: "Can you provide the Lot Number and the Certificate of Analysis (CoA) for this current batch?",
    why: "This proves the medication has been tested for potency and purity and that the clinic actually has the documentation.",
  },
  {
    q: "Is the medication dispensed as 'Office Stock' or is it shipped directly to me from the pharmacy?",
    why: "Office stock must come from a 503B facility. If a clinic is dispensing 503A medication from their own shelf, they may be in violation of state pharmacy laws.",
  },
  {
    q: "What specific diluent is used for reconstitution, and does it contain a preservative?",
    why: "This ensures you are using the correct handling protocol (SS-GUIDE-001) and alerts you to potential sensitivities (e.g., benzyl alcohol).",
  },
  {
    q: "What is the clinic's process if an adverse event occurs?",
    why: "A verified clinic must have a formal process for reporting side effects back to the pharmacy and, if necessary, the FDA's MedWatch system.",
  },
];

const FlagTerm = ({
  color,
  label,
}: {
  color: "emerald" | "amber" | "rose";
  label: string;
}) => {
  const dot =
    color === "emerald"
      ? "bg-emerald-500"
      : color === "amber"
      ? "bg-amber-500"
      : "bg-rose-500";
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`inline-block h-2 w-2 rounded-full ${dot}`} aria-hidden />
      {label}
    </span>
  );
};

const LibraryAnalysisQuestionsForYourClinic = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Analysis"
        title="Questions to Ask Your Clinic"
        lead="A neutral, evidence-based checklist consumers can use to evaluate a clinic's sourcing, documentation, and clinical practices."
        metadata={[
          { label: "Doc", value: "SS-SERIES-004" },
          { label: "Status", value: "Analysis / Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "April 21, 2026" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="The Informed Consumer" />
        <p className="text-[15px] leading-[1.75] text-foreground/90">
          In the compounded medication space, transparency is the primary indicator of safety. A high-integrity clinic should view patient inquiries as a sign of an informed, responsible patient, not as an interrogation. If a clinic is hesitant or unable to answer these foundational questions, it likely indicates a gap in their own supply-chain oversight.
        </p>

        <div className="mt-12">
          <SectionLabel
            number="§2"
            title={`The "Source Five" Checklist`}
            description="Before beginning a protocol, we recommend asking your provider these five specific questions."
          />
          <ol className="mt-6 space-y-6 border-y border-border/60 divide-y divide-border/60">
            {QUESTIONS.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-1 md:grid-cols-[3rem_1fr] gap-2 md:gap-6 py-5 first:pt-5 last:pb-5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground pt-1">
                  Q{i + 1}
                </div>
                <div>
                  <p className="text-[15.5px] font-semibold text-foreground leading-snug">
                    &ldquo;{item.q}&rdquo;
                  </p>
                  <p className="mt-2 pl-4 border-l border-border/70 text-[14.5px] leading-[1.7] text-foreground/85">
                    <span className="font-medium text-foreground">Why it matters: </span>
                    {item.why}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <SectionLabel
            number="§3"
            title="Evaluating the Responses"
            description="Use this legend to interpret a clinic's answers at a glance."
          />
          <DefList
            items={[
              {
                term: <FlagTerm color="emerald" label="Green Flag" />,
                description:
                  "The clinic provides pharmacy names immediately and offers to email you the CoA.",
              },
              {
                term: <FlagTerm color="amber" label="Yellow Flag" />,
                description:
                  "The clinic says they 'use several pharmacies' but can't tell you which one your specific vial is from.",
              },
              {
                term: <FlagTerm color="rose" label="Red Flag" />,
                description:
                  "The clinic claims the sourcing information is 'proprietary' or 'trade secret.' In healthcare, sourcing is never a trade secret; it is a matter of public safety.",
              },
            ]}
          />
        </div>

        <div className="mt-16 pt-6 border-t border-border/70 flex items-center justify-between gap-6">
          <Button asChild variant="outline">
            <Link to="/education">← Back to Education Hub</Link>
          </Button>
          <Link
            to="/library/analysis/meaning-of-verification"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next Analysis: What Verification Actually Means (SS-SERIES-005) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryAnalysisQuestionsForYourClinic;
