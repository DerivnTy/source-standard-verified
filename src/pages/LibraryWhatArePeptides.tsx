import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-SERIES-000A";

const LibraryWhatArePeptides = () => {
  return (
    <>
      <PageMeta
        title="What Are Peptides? · Foundational Series"
        description="An educational overview of peptides, how they are used, and why sourcing transparency and documentation matter when reviewing compounded peptide products."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Foundational Series" },
        ]}
      />
      <ArticleHeader
        title="What Are Peptides?"
        lead="An educational overview of peptides, the contexts in which they are used, and why sourcing transparency and documentation matter when reviewing compounded peptide products."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="What peptides are">
        <p>
          Peptides are short chains of amino acids joined by peptide bonds. They occur naturally throughout the body and are generally smaller than proteins, typically composed of fewer than fifty amino acids. In biological systems, peptides participate in a wide range of signaling and regulatory processes.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Why peptides are used in medicine and research">
        <p>
          Peptides have been studied and used across both clinical and research settings for many years. Their structure and specificity make them a common subject of pharmaceutical development and laboratory study.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            {
              term: "Clinical research",
              description:
                "Peptides are studied in connection with a variety of physiological processes, and certain peptide-based products are approved or prescribed within regulated medical contexts.",
            },
            {
              term: "Compounded preparations",
              description:
                "Some peptides are prepared by compounding pharmacies in response to specific prescriptions or clinical needs, following the same regulatory pathways that apply to other compounded medications.",
            },
            {
              term: "Research use",
              description:
                "Peptides are also widely used as laboratory reference materials, which are distinct from clinical preparations and are not intended for human use.",
            },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Why compounded peptides exist">
        <p>
          Compounded peptide preparations may be produced when a commercially available product is unavailable, when a prescription calls for a specific formulation, or when a clinician requests a preparation through a licensed compounding pathway. These preparations are produced by 503A pharmacies or 503B outsourcing facilities operating under their respective regulatory frameworks.
        </p>
      </ArticleSection>

      <ArticleSection n={4} title="Why sourcing transparency matters">
        <p>
          Because compounded peptide products can move through multiple organizations before reaching a consumer, understanding where a preparation originates is an important part of reviewing a sourcing claim.
        </p>
        <BoardDefList
          prefix={(i) => `§4.${i + 1}`}
          items={[
            {
              term: "Facility identification",
              description:
                "Knowing which pharmacy or facility prepared a compounded peptide provides context for reviewing public records, licensing status, and regulatory classification.",
            },
            {
              term: "Documentation",
              description:
                "Records such as certificates of analysis, invoices, and facility registrations can support or clarify a vendor's sourcing claims when made available for review.",
            },
            {
              term: "Public-reference review",
              description:
                "Source Standard organizes facility records and sourcing-related documentation so that compounded peptide claims can be reviewed within a structured public-reference framework.",
            },
          ]}
        />
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Peptides are a broad category of molecules used in both research and clinical settings. When peptides are prepared through compounding, sourcing transparency, facility identification, and supporting documentation are the most useful reference points for understanding how a product entered the supply chain.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Foundational Series · What Are Peptides?, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryWhatArePeptides;
