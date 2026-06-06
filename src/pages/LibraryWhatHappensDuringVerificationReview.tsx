import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
} from "@/components/ArticleSection";

const DOC_ID = "SS-GUIDE-007";

const LibraryWhatHappensDuringVerificationReview = () => {
  return (
    <>
      <PageMeta
        title="What Happens During a Verification Review? · Resource Library"
        description="A high-level overview of how documentation, sourcing claims, facility relationships, and public records are reviewed within the Source Standard framework."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Latest Publications" },
        ]}
      />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="What Happens During a Verification Review?"
        lead="Understanding how Source Standard evaluates sourcing claims, supporting documentation, and facility relationships."
        metadata={[
          { label: "Updated", value: "06 / 06 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="Why verification exists">
        <p>
          Compounded therapy vendors frequently make public claims regarding sourcing, pharmacy relationships, facility partnerships, and quality standards.
        </p>
        <p>
          For consumers, it is often difficult to determine which claims are supported by evidence and which claims are simply statements.
        </p>
        <p>
          Verification exists to create a structured process for reviewing available information and organizing that information into a public-reference record.
        </p>
        <p>
          The purpose of verification is transparency, not endorsement.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Information submitted for review">
        <p>
          Verification begins with documentation.
        </p>
        <p>
          Depending on the scope of review, a vendor may provide records relating to facility relationships, sourcing claims, registrations, licenses, invoices, testing records, or other supporting documentation.
        </p>
        <p>
          The goal is to establish whether public sourcing claims can be connected to available evidence.
        </p>
        <p>
          Documentation alone does not determine status, but it provides the foundation for the review process.
        </p>
      </ArticleSection>

      <ArticleSection n={3} title="Review of sourcing relationships">
        <p>
          A significant portion of the verification process focuses on facility relationships.
        </p>
        <p>
          When a vendor identifies a compounding facility, Source Standard reviews available information relating to that relationship.
        </p>
        <p>
          This may include publicly available records, facility information, supporting documentation, and other evidence relevant to the claim.
        </p>
        <p>
          The objective is not to guarantee future performance, but to determine whether the stated relationship is supported at the time of review.
        </p>
      </ArticleSection>

      <ArticleSection n={4} title="Status assignment and monitoring">
        <p>
          After documentation and sourcing claims are reviewed, a public status may be assigned within the framework.
        </p>
        <p>
          Status assignments reflect the information available during the review process and may change over time as new information becomes available.
        </p>
        <p>
          Because supply chains, documentation, and facility relationships can evolve, verification should be understood as an ongoing process rather than a permanent designation.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Verification is a structured review process designed to evaluate whether sourcing claims are supported by available evidence. Its purpose is to improve transparency by organizing documentation, facility relationships, and public-reference information into a consistent framework.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Resource Library · What Happens During a Verification Review?, ${DOC_ID}. Last updated 06 / 06 / 2026.`}
      />
    </>
  );
};

export default LibraryWhatHappensDuringVerificationReview;
