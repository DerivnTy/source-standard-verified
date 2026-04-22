import { RecordHeader } from "@/components/RecordHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DocSignature } from "@/components/DocSignature";
import {
  BoardSection,
  BoardDefList,
  BoardFooterNav,
  BoardCiteFooter,
} from "@/components/BoardSection";

const DOC_ID = "SS-ANALYSIS-006";

const LibraryAnalysisUndocumentedSourcingSigns = () => {
  return (
    <>
      <PageMeta title="Undocumented Sourcing — Warning Signs · Analysis" description="Recognizing red flags of undocumented medication sourcing." />
      <Breadcrumb items={[
          { label: "Education", to: "/education" },
          { label: "Analysis" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Clinical Analysis"
        title="Warning Signs of Undocumented Sourcing"
        lead="Identifying the patterns, disclosures, and behaviors that indicate a clinic may be operating outside of regulated sourcing channels."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Analysis / Public Record" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        verifiedOn="04 / 21 / 2026"
      />

      <BoardSection n={1} category="Context" title='The "grey market" incursion.'>
        <p>
          As demand for therapeutic peptides and hormones increases, a 'grey market' of undocumented substances has emerged. These are often 'research-grade' chemicals repackaged as clinical-grade medications. For a clinic, using these sources is significantly cheaper but carries catastrophic risks for the patient. Spotting these sources requires looking for specific 'evasive' behaviors.
        </p>
      </BoardSection>

      <BoardSection
        n={2}
        category="Red flag"
        title="Label anonymity."
        rationale="The most glaring sign of undocumented sourcing is a medication vial that lacks a specific pharmacy's credentials."
        muted
      >
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            {
              term: "Generic branding",
              description:
                "If the vial only features the clinic's logo and does not list the compounding pharmacy's name, address, and license number, the source is likely undocumented.",
            },
            {
              term: "Handwritten details",
              description:
                "While some small-batch pharmacies use hand-filled dates, a lack of professional, thermal-printed Lot Numbers and Expiration Dates is a major compliance failure.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={3}
        category="Red flag"
        title='The "proprietary blend" defense.'
        rationale="When asked about their source, some clinics will claim their pharmacy is a 'trade secret' or a 'proprietary partnership.'"
      >
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            {
              term: "The truth",
              description:
                "There is no such thing as a proprietary pharmacy in the US regulatory framework. Every pharmacy must be licensed and every medication must be traceable. 'Proprietary' is almost always code for 'Undocumented.'",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={4}
        category="Red flag"
        title="Payment and shipping anomalies."
        rationale="High-integrity clinical sourcing follows traditional medical billing and shipping paths."
        muted
      >
        <BoardDefList
          prefix={(i) => `§4.${i + 1}`}
          items={[
            {
              term: "Non-traditional payments",
              description:
                "Clinics that insist on Zelle, Cryptocurrency, or 'Friends and Family' PayPal payments are often bypassing the financial audits that traditional merchant banks require for medical services.",
            },
            {
              term: "Residential return addresses",
              description:
                "If a medication arrives with a return address that is a residential home or a generic PO Box rather than a licensed pharmacy facility, the supply chain has been compromised.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection n={5} category="Conclusion" title="The cost of low transparency.">
        <p className="text-foreground font-medium">
          Undocumented sourcing isn't just a legal technicality; it's a safety vacuum. Without a documented pharmacy, there is no one to hold accountable for sterility failures, incorrect potencies, or heavy metal contamination. If a clinic cannot — or will not — prove their source, they have failed the primary duty of patient care.
        </p>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Education Hub" }}
        next={{ to: "/directory", label: "Search the Verified Registry" }}
      />

      <BoardCiteFooter citation={`Source Standard, Clinical Analysis — Warning Signs of Undocumented Sourcing, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    <DocSignature docId={DOC_ID} verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default LibraryAnalysisUndocumentedSourcingSigns;
