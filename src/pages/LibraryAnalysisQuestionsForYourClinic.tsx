import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-ANALYSIS-004";

const QUESTIONS = [
  {
    q: "Which pharmacy compounds this medication?",
    why: "Identifying the compounding pharmacy is the starting point for reviewing facility records and public licensing information.",
  },
  {
    q: "Is the medication sourced through a 503A or 503B facility?",
    why: "Facility classification provides context about the regulatory pathway used to prepare a compounded medication.",
  },
  {
    q: "Can you explain your sourcing process?",
    why: "A clear, consistent explanation of how a clinic sources medications is a useful indicator of sourcing transparency.",
  },
  {
    q: "What documentation supports your sourcing claims?",
    why: "Records such as certificates of analysis, invoices, or facility registrations can be reviewed against public statements.",
  },
  {
    q: "How are facility relationships disclosed to patients?",
    why: "Public disclosure of facility relationships allows consumers to review sourcing claims against available evidence.",
  },
];

const RESPONSE_EXAMPLES = [
  {
    label: "Identifies the pharmacy directly",
    description: "The clinic names the compounding pharmacy and is willing to share supporting documentation upon request.",
  },
  {
    label: "Describes the sourcing process clearly",
    description: "The clinic can explain its facility relationships and how sourcing claims are supported.",
  },
  {
    label: "Limited or inconsistent disclosure",
    description: "The clinic is unable or unwilling to identify its compounding source or provide documentation that can be reviewed.",
  },
];

const LibraryAnalysisQuestionsForYourClinic = () => {
  return (
    <>
      <PageMeta
        title="Vendor Evaluation Checklist · Source Standard"
        description="A neutral consumer-transparency checklist for asking clinics about compounded-medication sourcing."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Consumer Due Diligence" },
        ]}
      />
      <ArticleHeader
        eyebrow="Source Standard · Public Reference"
        title="Vendor Evaluation Checklist"
        lead="A neutral set of questions consumers can use to better understand a clinic's sourcing practices, facility relationships, and supporting documentation."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="Asking about sourcing">
        <p>
          Sourcing transparency is one of the most useful reference points consumers can consider when evaluating a compounded-medication provider. The questions below are intended to support informed conversations with a clinic; they are not legal or compliance conclusions.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="A consumer-transparency checklist">
        <p>Consumers may consider asking the following questions when evaluating a clinic.</p>
        <ol className="border border-border bg-background divide-y divide-border my-2">
          {QUESTIONS.map((item, i) => (
            <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5">
              <div className="col-span-2 font-mono t-utility-xs uppercase tracking-[0.14em] text-primary">
                Q{i + 1}
              </div>
              <div className="col-span-10">
                <p className="text-[15.5px] font-semibold text-foreground leading-snug">
                  &ldquo;{item.q}&rdquo;
                </p>
                <p className="mt-2 t-body-sm text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-medium">Why it matters · </span>
                  {item.why}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </ArticleSection>

      <ArticleSection n={3} title="Examples of transparent responses">
        <p>
          The examples below describe patterns consumers may encounter. They are illustrative reference points, not determinations about a specific organization.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={RESPONSE_EXAMPLES.map((r) => ({ term: r.label, description: r.description }))}
        />
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Asking direct questions about sourcing, facility relationships, and supporting documentation is a reasonable part of consumer due diligence. The clarity and consistency of a clinic's responses can be a useful reference point when reviewing a sourcing claim.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Public Reference · Vendor Evaluation Checklist, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryAnalysisQuestionsForYourClinic;
