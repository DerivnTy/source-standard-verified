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

const DOC_ID = "SS-GUIDE-002";

const LibraryAsepticTechnique = () => {
  return (
    <>
      <PageMeta title="Aseptic Technique · Clinical Guide" description="Foundational principles of aseptic compounding and barrier technique." />
      <Breadcrumb items={[
          { label: "Education", to: "/education" },
          { label: "Clinical Guides" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Aseptic Technique: Sanitization Fundamentals"
        lead="Foundational principles of aseptic handling for clinicians and patients to minimize the risk of microbial introduction during medication administration."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
      />

      <BoardSection n={1} category="Foundation" title="Defining the aseptic field.">
        <p>
          In clinical practice, 'aseptic' means the absence of pathogenic microorganisms. While a home or office environment is never truly sterile, we can create a 'Controlled Field' for medication preparation. This involves identifying a clean, well-lit, non-porous surface away from high-traffic areas, open windows, or air vents.
        </p>
      </BoardSection>

      <BoardSection
        n={2}
        category="Hand hygiene"
        title="Hand hygiene & barrier protection."
        muted
      >
        <p>The most common vector for contamination is the human hand.</p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            {
              term: "Mechanical cleaning",
              description: "Hands should be washed with antimicrobial soap for at least 30 seconds, focusing on the fingernails and webbing between fingers.",
            },
            {
              term: "Gloves",
              description:
                "While patient self-administration often relies on hand washing, clinical staff must utilize medical-grade, powder-free gloves. Note: Wearing gloves does not replace the need for hand washing; it is an additional layer of protection.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={3}
        category="Sanitization"
        title="The 'Swab and Wait' protocol."
      >
        <p>Alcohol-based sanitization is a chemical reaction that requires time to be effective.</p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            {
              term: "Septum sanitization",
              description: "Before every needle entry, the rubber stopper (septum) of the vial must be wiped firmly with a 70% Isopropyl Alcohol swab.",
            },
            {
              term: "The 10-second rule",
              description:
                "You must allow the alcohol to air-dry for at least 10 seconds. Do not blow on the surface to speed up drying, as this introduces oral bacteria back onto the sterile field.",
            },
            {
              term: "Single use",
              description: "Never use the same alcohol swab for both the vial and the skin site. Each requires a fresh, sterile swab.",
            },
          ]}
        />
      </BoardSection>

      <BoardSection
        n={4}
        category="Critical sites"
        title="Equipment areas that must remain sterile."
        muted
      >
        <p>Certain parts of the administration equipment must never touch a non-sterile surface:</p>
        <BoardDefList
          prefix={(i) => `§4.${i + 1}`}
          items={[
            {
              term: "The needle",
              description: "From the moment the cap is removed until the injection is complete.",
            },
            {
              term: "The syringe hub",
              description: "The point where the needle attaches to the syringe.",
            },
            {
              term: "The vial septum",
              description: "Once sanitized and dried.",
            },
          ]}
        />
        <p className="text-foreground font-medium">
          If any of these 'Critical Sites' come into contact with a finger, table, or clothing, the equipment is considered compromised and must be discarded.
        </p>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/library/endocrinological-context", label: "Next · Endocrinological Context (SS-GUIDE-003)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Clinical Guide — Aseptic Technique, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    <DocSignature docId={DOC_ID} verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default LibraryAsepticTechnique;
