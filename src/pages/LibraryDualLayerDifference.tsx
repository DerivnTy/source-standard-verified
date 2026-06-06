import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const LibraryDualLayerDifference = () => {
  return (
    <>
      <PageMeta title="Understanding Vendor Verification and Facility Transparency · Source Standard" description="Why both vendor records and facility records matter when evaluating compounded therapy sourcing claims." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Vendor Verification & Facility Transparency" },
        ]} />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="Understanding Vendor Verification and Facility Transparency"
        lead="Why both vendor records and facility records matter when evaluating compounded therapy sourcing claims."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <ArticleSection n={1} title="The transparency gap">
        <p>
          When consumers evaluate a compounded therapy provider, they are often evaluating only the business they can see.
        </p>
        <p>
          A clinic, telehealth provider, or online vendor may make claims regarding sourcing, quality, facility relationships, or supply-chain standards. However, the organization dispensing medication is often only one part of a larger supply chain.
        </p>
        <p>
          Understanding where a medication originates requires visibility into both the vendor and the facility supporting that vendor's sourcing claims.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="The vendor layer">
        <p>Vendor records focus on transparency.</p>
        <p>
          When Source Standard reviews a vendor record, the objective is to determine whether public sourcing claims are supported by documentation, facility relationships, public records, and other available evidence.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Sourcing claims", description: "Reviews whether a vendor identifies the facilities it claims to use and whether those relationships can be supported." },
            { term: "Documentation review", description: "Evaluates supporting records associated with vendor sourcing claims and public representations." },
            { term: "Public transparency", description: "Provides a structured public-reference record that allows sourcing claims to be reviewed with greater clarity." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="The facility layer">
        <p>Facility records focus on supply-chain visibility.</p>
        <p>
          Compounding facilities operate upstream from the vendor and play an important role in how medications enter the healthcare system.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Facility identification", description: "Maintains reference records relating to 503A and 503B compounding facilities." },
            { term: "Operational transparency", description: "Organizes publicly available information relating to facility operations, classifications, and regulatory status." },
            { term: "Independent testing activity", description: "Tracks Greenlisted status and testing activity associated with facilities monitored within the Source Standard ecosystem." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="Why both layers matter">
        <p>
          A vendor may make sourcing claims.
        </p>
        <p>
          A facility may produce the medication.
        </p>
        <p>
          Neither layer provides a complete picture by itself.
        </p>
        <p>
          Vendor transparency helps establish whether sourcing claims are supported by evidence.
        </p>
        <p>
          Facility transparency helps establish visibility into the organizations participating within the supply chain.
        </p>
        <p>
          Together, these records provide a more complete understanding of how medications move from compounding facilities to consumers.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="font-medium">
          Supply-chain transparency requires visibility into both the vendor and the facility. Vendor records help evaluate sourcing claims. Facility records help provide context regarding the organizations operating upstream. Together, they create a clearer public reference for evaluating compounded therapy sourcing relationships.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Resource Library. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryDualLayerDifference;
