import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const LibraryAnalysis2026Reclassification = () => {
  return (
    <>
      <PageMeta title="Understanding Regulatory Changes in Compounding · Resource Library" description="How regulatory updates can affect compounded medications, sourcing pathways, and supply-chain transparency." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Analysis" },
        ]} />
      <ArticleHeader
        eyebrow="Educational Resource"
        title="Understanding Regulatory Changes in Compounding"
        lead="How regulatory updates can affect compounded medications, sourcing pathways, and supply-chain transparency."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <ArticleSection n={1} title="Why regulatory changes matter">
        <p>
          Compounded medications exist within a regulatory framework that continues to evolve over time. Changes to federal guidance, state oversight, pharmacy standards, and compounding policies can influence how medications are prepared, distributed, and documented throughout the supply chain.
        </p>
        <p>
          For consumers, these changes often occur behind the scenes. However, they can affect where medications originate, how clinics source inventory, and what documentation is available to support a vendor's public sourcing claims.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="How supply chains respond to regulatory changes">
        <p>
          When compounding regulations change, pharmacies and clinics may adjust their sourcing practices to remain compliant with evolving requirements.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Documentation requirements", description: "Changes in oversight often increase the amount of documentation required to support sourcing relationships, inventory management, and distribution practices." },
            { term: "Operational adjustments", description: "Pharmacies and clinics may modify sourcing pathways, inventory procedures, or dispensing models in response to new regulatory expectations." },
            { term: "Market adaptation", description: "As regulations evolve, some organizations adapt quickly while others require additional time to update processes, documentation, and operational controls." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Why transparency becomes more important">
        <p>
          Periods of regulatory change often create uncertainty for consumers attempting to evaluate vendor claims.
        </p>
        <p>
          Public marketing language may not fully explain how a vendor sources medication, which pharmacy relationships exist, or whether those relationships have recently changed.
        </p>
        <p>
          For that reason, documentation, pharmacy relationship evidence, and publicly reviewable records become increasingly important when evaluating sourcing claims.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Documentation review", description: "Reviewing supporting records provides greater clarity than relying solely on marketing claims or promotional materials." },
            { term: "Relationship verification", description: "Understanding which pharmacies and facilities participate in a vendor's supply chain provides important context when evaluating sourcing transparency." },
            { term: "Record consistency", description: "Comparing public claims against documentation, licensing records, and facility relationships can help identify whether sourcing statements remain supported over time." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="What consumers should pay attention to">
        <p>
          When evaluating a compounded therapy vendor during periods of regulatory change, consumers should focus on transparency rather than promotional claims.
        </p>
        <p>
          Questions worth considering include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Does the vendor identify its pharmacy or facility relationships?</li>
          <li>Are sourcing claims supported by documentation?</li>
          <li>Are licensing and business records available and current?</li>
          <li>Has the vendor disclosed material sourcing changes?</li>
          <li>Is there a clear public record showing when information was last reviewed?</li>
        </ul>
        <p>
          These questions often provide more useful insight than marketing language alone.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Regulatory changes can alter how compounded medications move through the healthcare system, but transparency remains the most important factor for consumers. Regardless of how regulations evolve, documentation, sourcing records, and public accountability remain essential tools for evaluating vendor claims.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        citation="Source Standard · Resource Library. Last updated 04 / 21 / 2026."
      />
    </>
  );
};

export default LibraryAnalysis2026Reclassification;
