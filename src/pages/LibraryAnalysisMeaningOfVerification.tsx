import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-ANALYSIS-005";

const LibraryAnalysisMeaningOfVerification = () => {
  return (
    <>
      <PageMeta
        title="Understanding Verification Scope · Source Standard"
        description="What a Verified record in the Source Standard registry establishes, and what it does not establish."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Verification Methodology" },
        ]}
      />
      <ArticleHeader
        eyebrow="Source Standard · Public Reference"
        title="Understanding Verification Scope"
        lead="A neutral disclosure of what a Verified record in the Source Standard registry establishes, what it does not establish, and how status may change over time."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="What verification reviews">
        <p>
          Verification reflects a review of submitted documentation, sourcing claims, facility relationships, public records, and supporting evidence within the scope of the Source Standard framework. It is a structured review of available information at a point in time.
        </p>
        <BoardDefList
          prefix={(i) => `§1.${i + 1}`}
          items={[
            { term: "Vendor sourcing claims", description: "Public statements describing how a vendor sources compounded medications are reviewed against available evidence." },
            { term: "Facility relationships", description: "Stated relationships between a vendor and compounding pharmacies or outsourcing facilities are reviewed for consistency with available records." },
            { term: "Submitted documentation", description: "Records made available by the vendor are reviewed within the scope of the framework." },
            { term: "Public records", description: "Publicly available information relating to the vendor or referenced facilities is reviewed where applicable." },
            { term: "Licensing records", description: "Publicly accessible licensing information is reviewed as a reference point for facility classification and operational status." },
            { term: "Testing activity where applicable", description: "Where testing activity is part of the public record or made available for review, it is considered within the structured review." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={2} title="What verification does not establish">
        <p>
          Verification is a documentation and sourcing-transparency review. It is not a clinical, regulatory, or product-quality determination.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Product safety", description: "Verification does not establish that a product is safe." },
            { term: "Product quality", description: "Verification does not establish that a product is of a particular quality." },
            { term: "Clinical effectiveness", description: "Verification does not establish that a product is clinically effective." },
            { term: "Medical appropriateness", description: "Verification does not establish that a product is medically appropriate for any individual." },
            { term: "Regulatory approval", description: "Verification does not constitute regulatory approval, endorsement, or certification." },
            { term: "Future compliance", description: "Verification does not guarantee future compliance, sourcing practices, or status." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Ongoing status monitoring">
        <p>
          Verification reflects information available at a specific point in time. The public record is not static.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Records may be updated", description: "Registry records may be updated as new information becomes available." },
            { term: "Documentation may change", description: "Supporting documentation, sourcing relationships, or public claims may change over time." },
            { term: "Status may change", description: "A record's status may be updated, suspended, or removed based on subsequent review." },
            { term: "New evidence may affect public records", description: "New information made available to Source Standard may affect the public record associated with a record." },
          ]}
        />
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          A Verified record reflects a documentation and sourcing-claim review at a point in time. It does not establish product safety, clinical effectiveness, regulatory approval, or future compliance. The public record may change as new information becomes available.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Public Reference · Understanding Verification Scope, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryAnalysisMeaningOfVerification;
