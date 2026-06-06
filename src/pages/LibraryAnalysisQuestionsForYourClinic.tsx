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
    q: "Which pharmacy or facility prepares this medication?",
    why: "Identifying the compounding pharmacy or outsourcing facility is the starting point for reviewing facility records and public licensing information.",
  },
  {
    q: "Is sourcing information available publicly?",
    why: "Public sourcing information can be reviewed against documentation, licensing records, and other available evidence.",
  },
  {
    q: "Has the facility relationship changed recently?",
    why: "Changes to facility relationships can affect what current sourcing claims describe, even when prior statements remain visible publicly.",
  },
  {
    q: "Is documentation available supporting sourcing claims?",
    why: "Records such as certificates of analysis, invoices, or facility registrations provide reviewable evidence that can support public statements.",
  },
  {
    q: "When was this information last reviewed?",
    why: "Sourcing information has a point-in-time character; knowing when it was last reviewed helps consumers interpret the current public record.",
  },
];

const LibraryAnalysisQuestionsForYourClinic = () => {
  return (
    <>
      <PageMeta
        title="Questions to Ask About Sourcing · Source Standard"
        description="A neutral set of sourcing-transparency questions consumers can use when evaluating a compounded-medication provider."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Consumer Due Diligence" },
        ]}
      />
      <ArticleHeader
        eyebrow="Source Standard · Public Reference"
        title="Questions to Ask About Sourcing"
        lead="A neutral set of questions consumers can use to better understand a vendor&rsquo;s sourcing practices, facility relationships, and supporting documentation."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="Framing">
        <p>
          Sourcing transparency is one of the most useful reference points consumers can consider when evaluating a compounded-medication provider. The questions below are intended to support informed conversations about sourcing; they are not treatment guidance, handling instructions, or compliance determinations.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Sourcing-transparency questions">
        <p>Consumers may consider asking the following questions when reviewing a vendor.</p>
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

      <ArticleSection n={3} title="How to interpret the answers">
        <p>
          Clarity and consistency are useful reference points. A vendor that can identify its compounding source, describe its facility relationships, and point to supporting documentation provides more reviewable information than one that cannot.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Identifies the source directly", description: "The vendor names the compounding pharmacy or outsourcing facility and is willing to share supporting documentation upon request." },
            { term: "Describes the sourcing process clearly", description: "The vendor can explain its facility relationships and how sourcing claims are supported." },
            { term: "Limited or inconsistent disclosure", description: "The vendor is unable or unwilling to identify its compounding source or provide documentation that can be reviewed." },
          ]}
        />
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Asking direct questions about sourcing, facility relationships, and supporting documentation is a reasonable part of consumer due diligence. The clarity and consistency of a vendor&rsquo;s responses are useful reference points when reviewing a sourcing claim.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Public Reference · Questions to Ask About Sourcing, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryAnalysisQuestionsForYourClinic;
