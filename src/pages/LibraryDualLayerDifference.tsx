import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-SERIES-003";

const LibraryDualLayerDifference = () => {
  return (
    <>
      <PageMeta title="The Dual-Layer Difference · Clinical Guide" description="Why Source Standard audits both the vendor and the upstream pharmacy." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Clinical Guides" },
        ]} />
      <ArticleHeader
        eyebrow="Source Standard · Foundational Philosophy"
        title="The Dual-Layer Difference"
        lead="Understanding the symbiotic verification of both the clinical entity and the upstream pharmacy provider."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "In Review / Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title='The "single-point" failure.'>
        <p>
          In the current healthcare landscape, verification usually happens in a vacuum. A pharmacy might be licensed by a state board, or a clinic might have a licensed medical director. However, the connection between the two is rarely audited. Source Standard was founded to eliminate the 'blind spot' that exists between the prescription and the procurement.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Layer one, the clinical entity">
        <p>We first audit the clinic itself. This layer of verification focuses on:</p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Medical oversight", description: "Confirming the Medical Director is licensed and in good standing without OIG exclusions." },
            { term: "Prescribing integrity", description: "Ensuring that medications are issued via valid patient-provider relationships, not 'click-to-buy' automated systems." },
            { term: "Transparency", description: "Confirming the clinic accurately represents its sourcing to the consumer." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Layer two, the upstream pharmacy">
        <p>A clinic is only a pass-through for the medication. Therefore, we verify the source:</p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Licensure reconciliation", description: "Cross-referencing pharmacy licenses in every state they ship to." },
            { term: "Facility classification", description: "Distinguishing between 503A (Patient-Specific) and 503B (Outsourcing) and ensuring the clinic is using the correct facility for their business model." },
            { term: "Evidence of sourcing", description: "Requiring invoices that prove the clinic is actually buying from the regulated pharmacy they claim to use." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="The symbiotic, closed-loop outcome">
        <p>
          By verifying both layers, Source Standard creates a 'Closed-Loop' of accountability. If a pharmacy fails an inspection, the clinic's verification is flagged. If a clinic switches to an undocumented source, their 'Verified' status is revoked. This dual-layer approach is the only way to ensure that the medication in the patient's hand is the same medication documented in the audit.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/library/aseptic-protocols", label: "Clinical Handling & Aseptic Protocols (SS-GUIDE-001)" }}
        citation={`Source Standard · Foundational Philosophy · The Dual-Layer Difference, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryDualLayerDifference;
