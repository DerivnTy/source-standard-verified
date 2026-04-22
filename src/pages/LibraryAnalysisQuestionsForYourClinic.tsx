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

const DOC_ID = "SS-ANALYSIS-004";

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

const FLAGS = [
  {
    label: "Green flag",
    description: "The clinic provides pharmacy names immediately and offers to email you the CoA.",
  },
  {
    label: "Yellow flag",
    description:
      "The clinic says they 'use several pharmacies' but can't tell you which one your specific vial is from.",
  },
  {
    label: "Red flag",
    description:
      "The clinic claims the sourcing information is 'proprietary' or 'trade secret.' In healthcare, sourcing is never a trade secret; it is a matter of public safety.",
  },
];

const LibraryAnalysisQuestionsForYourClinic = () => {
  return (
    <>
      <PageMeta title="Questions to Ask Your Clinic · Analysis" description="A standardized checklist for evaluating clinic transparency." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Analysis" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Clinical Analysis"
        title="Questions to Ask Your Clinic"
        lead="A neutral, evidence-based checklist consumers can use to evaluate a clinic's sourcing, documentation, and clinical practices."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Analysis / Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        verifiedOn="04 / 21 / 2026"
      />

      <BoardSection n={1} category="Premise" title="The informed consumer.">
        <p>
          In the compounded medication space, transparency is the primary indicator of safety. A high-integrity clinic should view patient inquiries as a sign of an informed, responsible patient, not as an interrogation. If a clinic is hesitant or unable to answer these foundational questions, it likely indicates a gap in their own supply-chain oversight.
        </p>
      </BoardSection>

      <BoardSection
        n={2}
        category="Checklist"
        title='The "Source Five" checklist.'
        rationale="Before beginning a protocol, we recommend asking your provider these five specific questions."
        muted
      >
        <ol className="border border-border bg-background divide-y divide-border">
          {QUESTIONS.map((item, i) => (
            <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5">
              <div className="col-span-2 meta text-primary">Q{i + 1}</div>
              <div className="col-span-10">
                <p className="text-[14.5px] font-semibold text-foreground leading-snug">
                  &ldquo;{item.q}&rdquo;
                </p>
                <p className="mt-2 text-[14.5px] text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Why it matters · </span>
                  {item.why}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </BoardSection>

      <BoardSection
        n={3}
        category="Legend"
        title="Evaluating the responses."
        rationale="Use this legend to interpret a clinic's answers at a glance."
      >
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={FLAGS.map((f) => ({ term: f.label, description: f.description }))}
        />
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Education Hub" }}
        next={{ to: "/library/analysis/meaning-of-verification", label: "Next Analysis · What Verification Actually Means (SS-ANALYSIS-005)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Clinical Analysis — Questions to Ask Your Clinic, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    <DocSignature docId={DOC_ID} verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default LibraryAnalysisQuestionsForYourClinic;
