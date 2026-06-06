import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const LibraryInterpretingCoAs = () => {
  return (
    <>
      <PageMeta title="Understanding Certificates of Analysis (CoAs) · Resource Library" description="How laboratory reports are used, what information they contain, and why documentation should always be reviewed carefully." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Sourcing & Regulation" },
        ]} />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="Understanding Certificates of Analysis (CoAs)"
        lead="How laboratory reports are used, what information they contain, and why documentation should always be reviewed carefully."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <ArticleSection n={1} title="What is a Certificate of Analysis?">
        <p>
          A Certificate of Analysis (CoA) is a laboratory report that documents the results of testing performed on a specific batch of a product or ingredient.
        </p>
        <p>
          Within pharmaceutical and compounding supply chains, CoAs are commonly used to document characteristics such as identity, potency, purity, sterility, and other quality-related measurements.
        </p>
        <p>
          Because testing is performed on a specific batch, each report should be associated with identifiable lot information and a defined testing date.
        </p>
        <p>
          A CoA can provide useful information about a product, but it represents only one piece of a broader documentation record.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="What information is typically included?">
        <p>
          Most Certificates of Analysis contain several categories of testing information.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Identity", description: "Confirms that the tested material matches the compound or ingredient identified on the report." },
            { term: "Potency", description: "Measures the amount of active ingredient present relative to the expected specification." },
            { term: "Purity", description: "Documents impurities, contaminants, residual solvents, or other compounds detected during testing." },
            { term: "Sterility and endotoxin testing", description: "For sterile injectable preparations, additional testing may evaluate microbial contamination and endotoxin levels." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Important limitations of a CoA">
        <p>
          While Certificates of Analysis can provide valuable information, they do not answer every question about a product or supply chain.
        </p>
        <p>
          A CoA reflects testing performed on a specific sample at a specific point in time.
        </p>
        <p>
          It does not automatically verify:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>The complete chain of custody</li>
          <li>Ongoing storage conditions</li>
          <li>Distribution practices</li>
          <li>Future product stability</li>
          <li>The accuracy of public marketing claims</li>
        </ul>
        <p>
          For this reason, a CoA should be evaluated alongside other documentation rather than viewed as a standalone guarantee.
        </p>
      </ArticleSection>

      <ArticleSection n={4} title="Common red flags">
        <p>
          Consumers and healthcare organizations should carefully review supporting documentation before relying on a laboratory report.
        </p>
        <BoardDefList
          prefix={(i) => `§4.${i + 1}`}
          items={[
            { term: "Mismatched identifiers", description: "Lot numbers, batch identifiers, or product names should be consistent across all related records." },
            { term: "Incomplete laboratory information", description: "Reports should clearly identify the testing laboratory and provide sufficient information to verify the testing source." },
            { term: "Missing dates", description: "Testing dates help establish when analysis occurred and whether documentation remains current." },
            { term: "Inconsistent formatting", description: "Unusual alterations, missing sections, inconsistent typography, or incomplete reporting may warrant additional review." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={5} title="Why documentation matters">
        <p>
          A Certificate of Analysis is most useful when it exists within a broader documentation framework.
        </p>
        <p>
          Supply-chain transparency often depends on multiple forms of supporting evidence, including pharmacy relationships, sourcing records, chain-of-custody documentation, public records, and laboratory reports.
        </p>
        <p>
          When evaluated together, these records provide greater context than any single document can provide on its own.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          A Certificate of Analysis can provide valuable testing information, but it should be viewed as one component of a larger documentation record. Understanding both the value and limitations of a CoA helps consumers evaluate sourcing claims with greater clarity.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation="Source Standard · Resource Library. Last updated 04 / 21 / 2026."
      />
    </>
  );
};

export default LibraryInterpretingCoAs;
