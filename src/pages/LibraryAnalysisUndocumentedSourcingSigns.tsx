import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-ANALYSIS-006";

const CONCERNS = [
  {
    term: "Unidentified sourcing partners",
    description:
      "A vendor is unable or unwilling to identify the compounding pharmacy or facility associated with a product.",
  },
  {
    term: "Unsupported facility claims",
    description:
      "Public statements reference facility relationships that cannot be matched to available documentation or public records.",
  },
  {
    term: "Missing documentation",
    description:
      "Records that would ordinarily support a sourcing claim, such as certificates of analysis or facility registrations, are unavailable for review.",
  },
  {
    term: "Inconsistent public statements",
    description:
      "Sourcing descriptions vary across consultations, marketing materials, or written communications without a clear explanation.",
  },
  {
    term: "Unclear facility relationships",
    description:
      "The vendor's relationship with its compounding facility is not described in a way that can be reviewed against public information.",
  },
  {
    term: "Inability to identify the compounding source",
    description:
      "A consumer cannot determine which facility prepared a specific medication based on labeling or vendor disclosures.",
  },
  {
    term: "Missing chain-of-custody records where expected",
    description:
      "Documentation that would typically accompany a compounded product through the supply chain is unavailable when requested.",
  },
];

const LibraryAnalysisUndocumentedSourcingSigns = () => {
  return (
    <>
      <PageMeta
        title="Warning Signs and Red Flags · Source Standard"
        description="Common transparency concerns consumers may encounter when reviewing compounded-medication sourcing claims."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Consumer Due Diligence" },
        ]}
      />
      <ArticleHeader
        eyebrow="Source Standard · Public Reference"
        title="Warning Signs and Red Flags"
        lead="Common transparency concerns consumers may encounter when reviewing compounded-medication sourcing claims and vendor disclosures."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="Transparency as a reference point">
        <p>
          Sourcing transparency is one of the most useful reference points consumers can consider when evaluating a compounded-medication provider. The patterns described below are common transparency concerns; they are not determinations of wrongdoing about any specific organization.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Common transparency concerns">
        <p>
          The following patterns may indicate that a sourcing claim is difficult to verify against available evidence.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={CONCERNS}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Why transparency matters">
        <p>
          When sourcing information cannot be identified, reviewed, or cross-referenced against public records, consumers have fewer reference points available for evaluating a compounded-medication claim. Transparency does not replace clinical judgment or regulatory oversight, but it allows sourcing claims to be reviewed within a structured public-reference framework.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Transparency concerns are most useful when interpreted as reference points for further inquiry. Where sourcing partners, facility relationships, or supporting documentation cannot be identified or reviewed, consumers may consider asking additional questions before relying on a sourcing claim.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Public Reference · Warning Signs and Red Flags, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryAnalysisUndocumentedSourcingSigns;
