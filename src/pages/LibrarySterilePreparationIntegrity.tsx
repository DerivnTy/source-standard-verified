import { RecordHeader } from "@/components/RecordHeader";
import {
  BoardSection,
  BoardDefList,
  BoardFooterNav,
  BoardCiteFooter,
} from "@/components/BoardSection";

const DOC_ID = "SS-GUIDE-001";

const LibrarySterilePreparationIntegrity = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Sterile Preparation Integrity: Handling & Reconstitution Protocol"
        lead="Clinical standards for the handling, reconstitution, and storage of compounded sterile preparations to ensure therapeutic efficacy and microbial safety."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <BoardSection n={1} category="Importance" title="Why sterile integrity matters.">
        <p>
          Once a compounded sterile preparation (CSP) leaves a controlled pharmacy environment (503A or 503B), its integrity relies entirely on the handling practices of the clinical staff and the end-user. Failure to maintain aseptic conditions during reconstitution or administration can lead to microbial contamination, site-of-injection infections, and the degradation of the active compound.
        </p>
      </BoardSection>

      <BoardSection
        n={2}
        category="Reconstitution"
        title="Reconstitution standards for lyophilized compounds."
        muted
      >
        <p>For lyophilized (freeze-dried) compounds, the reconstitution process is a critical window for potential error.</p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            {
              term: "Diluent verification",
              description: "Only use the specific diluent provided or prescribed (typically Bacteriostatic Water or Sterile Saline).",
            },
            {
              term: "The 'Gentle Swirl' rule",
              description:
                "To avoid denaturing delicate peptide chains, never shake the vial. Gently swirl the liquid until the powder is fully dissolved.",
            },
            {
              term: "Pressure equalization",
              description:
                "When injecting diluent, allow the pressure to equalize naturally to prevent 'venting,' which can introduce unfiltered room air into the sterile environment of the vial.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={3}
        category="Storage"
        title="Storage & stability requirements."
      >
        <p>Temperature fluctuations are the primary cause of peptide degradation.</p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            {
              term: "Cold-chain maintenance",
              description:
                "Unless specifically stated otherwise by the compounding pharmacist, most reconstituted peptides must be stored between 2°C and 8°C (36°F – 46°F).",
            },
            {
              term: "Light sensitivity",
              description: "Keep vials in their original secondary packaging or a dark container to prevent UV-induced oxidation.",
            },
            {
              term: "Beyond-Use Date (BUD)",
              description:
                "Never exceed the BUD listed on the pharmacy label. A 503A preparation typically has a shorter stability window than a mass-produced drug.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={4}
        category="Best practices"
        title="Visual inspection and clinical discipline."
        muted
      >
        <p>
          Always perform a visual inspection before use. If the solution appears cloudy, contains visible particulates, or has changed color significantly, the preparation must be discarded.{" "}
          <span className="text-foreground font-medium">'When in doubt, throw it out'</span> is the foundational rule of sterile handling.
        </p>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/library/aseptic-technique-fundamentals", label: "Next · Aseptic Technique Fundamentals (SS-GUIDE-002)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Clinical Guide — Sterile Preparation Integrity, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    </>
  );
};

export default LibrarySterilePreparationIntegrity;
