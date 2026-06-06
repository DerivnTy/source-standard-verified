import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-GUIDE-003";

const LibraryEndocrinologicalContext = () => {
  return (
    <>
      <PageMeta
        title="Understanding Compounded Hormone Therapy · Resource Library"
        description="Why hormone therapies are sometimes compounded, the role of 503A and 503B facilities, and why sourcing transparency matters."
      />
      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: "Latest Publications" },
        ]}
      />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="Understanding Compounded Hormone Therapy"
        lead="A neutral overview of why hormone therapies are sometimes compounded, how facility classification fits into the supply chain, and why sourcing transparency matters for consumers."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="Why hormone therapies are sometimes compounded">
        <p>
          Hormone-related medications are available in a range of commercially manufactured forms. In some cases, a prescriber may request a compounded preparation when a specific formulation, concentration, or delivery format is not commercially available, or when an individualized formulation is required by the prescribing clinician.
        </p>
        <p>
          This page does not discuss treatment goals, dosing, monitoring, or clinical outcomes. Those decisions belong to a licensed prescriber and patient. The focus here is on how compounded hormone preparations enter the supply chain and how their sourcing can be reviewed.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="The role of 503A and 503B facilities">
        <p>
          Compounded hormone preparations, like other compounded medications, are produced by pharmacies and outsourcing facilities operating under defined regulatory categories.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "503A pharmacies", description: "Traditional compounding pharmacies that prepare medications in response to individual prescriptions and operate under state pharmacy regulation alongside federal compounding provisions." },
            { term: "503B outsourcing facilities", description: "Facilities registered with the FDA that may prepare compounded medications in larger batches under additional federal oversight." },
            { term: "Facility classification as context", description: "Knowing whether a compounded hormone preparation originated from a 503A pharmacy or a 503B outsourcing facility provides context for reviewing public records and licensing information." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Why sourcing transparency matters">
        <p>
          Compounded hormone preparations may move through multiple organizations before reaching a consumer. Understanding which facility prepared a medication, and how that facility relationship is disclosed, is an important reference point when evaluating a sourcing claim.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Facility identification", description: "Knowing which pharmacy or outsourcing facility prepared a compounded hormone product provides context for reviewing public records and registrations." },
            { term: "Facility disclosure", description: "Public disclosure of facility relationships allows consumers to compare a vendor&rsquo;s stated sourcing against available evidence." },
            { term: "Supporting documentation", description: "Records such as certificates of analysis, invoices, and facility registrations can support or clarify a vendor&rsquo;s sourcing claims when made available for review." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="How consumers can evaluate sourcing claims">
        <p>
          When reviewing a compounded hormone therapy vendor, consumers can focus on transparency rather than promotional language. Useful questions include which facility prepares the medication, how that relationship is disclosed, and what documentation is available to support those statements.
        </p>
        <p>
          Source Standard organizes facility records, regulatory classifications, and sourcing-related documentation so that compounded-medication claims can be reviewed within a structured public-reference framework.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Compounded hormone therapy exists within the broader compounded-medication supply chain. Facility identification, facility disclosure, and supporting documentation are the most useful reference points for understanding how a compounded hormone preparation entered the supply chain.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation={`Source Standard · Resource Library · Understanding Compounded Hormone Therapy, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryEndocrinologicalContext;
