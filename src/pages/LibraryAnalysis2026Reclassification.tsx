import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-ANALYSIS-001";

const LibraryAnalysis2026Reclassification = () => {
  return (
    <>
      <PageMeta title="The 2026 Compounding Reclassification · Analysis" description="Regulatory analysis of the 2026 compounding reclassification and its downstream impact." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Analysis" },
        ]} />
      <ArticleHeader
        eyebrow="Source Standard · Clinical Analysis"
        title="The 2026 Compounding Reclassification"
        lead="Background and implications of the recent regulatory shifts across 503A and 503B compounding categories."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Analysis / Public Record" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="The regulatory catalyst.">
        <p>
          In early 2026, the regulatory landscape for compounded sterile preparations underwent a significant shift. The FDA, in coordination with state boards, updated the 'Bulk Drug Substances' lists, effectively reclassifying how several high-demand compounds (including specific peptides and incretin mimetics) must be sourced and prepared.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Key changes in 503B availability.">
        <p>One of the most significant impacts of the 2026 update is the restriction of certain 'demonstrably difficult to compound' substances.</p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Enhanced stability requirements", description: "The FDA now requires more rigorous, long-term stability data for any compound held as 'Office Stock.'" },
            { term: "Batch-size limitations", description: "To prevent 503B facilities from acting as mass-manufacturers without full drug approval, batch sizes for specific metabolic compounds have been capped, leading to potential supply-chain bottlenecks." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="The shift back to 503A pharmacies.">
        <p>As 503B facilities face tighter restrictions, many clinics have pivoted back to 503A (patient-specific) pharmacies. While legal, this shift requires a higher degree of diligence.</p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Individual prescription necessity", description: "There has been an increase in 'administrative' enforcement against clinics that attempt to bulk-purchase from 503A pharmacies without individual patient names attached at the time of order." },
            { term: "Verification necessity", description: "Because 503A facilities do not have the same federal 'cGMP' reporting requirements as 503B, the 2026 reclassification has made independent audit trails (like the Source Standard protocol) the only reliable way to confirm quality." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="Looking ahead.">
        <p className="text-foreground font-medium">
          For consumers, the 2026 reclassification means that 'cheap and fast' sourcing is becoming a significant legal and safety liability. Institutions that fail to adapt their documentation and sourcing transparently are increasingly subject to state-level administrative action.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Education Hub" }}
        next={{ to: "/library/analysis/questions-for-your-clinic", label: "Questions to Ask Your Clinic (SS-ANALYSIS-004)" }}
        citation={`Source Standard, Clinical Analysis — 2026 Compounding Reclassification, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryAnalysis2026Reclassification;
