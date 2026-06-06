import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-GUIDE-002";

const LibraryAsepticTechnique = () => {
  return (
    <>
      <PageMeta
        title="Understanding Sterile Compounding · Resource Library"
        description="What sterile compounding means, why sterile environments matter, and how it differs from non-sterile preparation."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Latest Publications" },
        ]}
      />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="Understanding Sterile Compounding"
        lead="An overview of sterile compounding, why controlled environments matter, and why consumers may want to know whether a medication was prepared under sterile conditions."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="What sterile compounding means">
        <p>
          Sterile compounding refers to the preparation of medications in a controlled environment designed to prevent microbial contamination. It is generally associated with injectable products, ophthalmic preparations, and other medications that bypass the body&rsquo;s natural barriers and therefore must be free of microorganisms when administered.
        </p>
        <p>
          Sterile compounding is distinct from non-sterile compounding, which covers preparations such as oral capsules, topical creams, and other dosage forms that do not require a sterile environment to be prepared.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Why sterile environments matter">
        <p>
          Because sterile preparations are introduced into the body in ways that bypass natural defenses, the environment in which they are prepared is closely tied to the integrity of the finished product. Controlled facilities are designed to limit the introduction of particulate matter, microorganisms, and other contaminants during preparation.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Controlled air environments", description: "Sterile preparation areas are designed to manage airflow, particulate levels, and surface conditions in a way that supports product integrity." },
            { term: "Defined operational standards", description: "USP General Chapters, including those addressing sterile preparation, outline expectations that apply to facilities engaged in sterile compounding." },
            { term: "Facility classification", description: "Compounding facilities operate under defined regulatory categories (503A or 503B) that establish the framework within which sterile preparation occurs." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Sterile vs. non-sterile compounding">
        <p>
          Whether a medication is compounded under sterile or non-sterile conditions depends on the product, its route of administration, and the regulatory pathway under which it is prepared.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Sterile preparations", description: "Generally include injectable, inhaled, and ophthalmic products that are required to be free of microorganisms at the point of dispensing." },
            { term: "Non-sterile preparations", description: "Include oral, topical, and other dosage forms that do not require a sterile environment for preparation." },
            { term: "Different facility expectations", description: "Sterile and non-sterile preparations are typically associated with different facility design, documentation, and operational expectations under applicable USP chapters and regulatory categories." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="Why consumers may want to know">
        <p>
          For consumers reviewing a compounded medication, understanding whether the preparation is sterile or non-sterile is a basic reference point. When a product is sterile, the facility that prepared it, its regulatory classification, and the documentation associated with that preparation become relevant context when evaluating sourcing claims.
        </p>
        <p>
          Source Standard organizes facility records, regulatory classifications, and sourcing documentation so that compounded-medication claims can be reviewed within a structured public-reference framework.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Sterile compounding describes a defined preparation environment used for certain categories of medications. Knowing whether a product was prepared under sterile conditions, and which facility prepared it, is a useful reference point for reviewing a sourcing claim.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Resource Library · Understanding Sterile Compounding, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryAsepticTechnique;
