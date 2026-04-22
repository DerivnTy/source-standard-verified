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

const DOC_ID = "SS-SERIES-000A";

const LibraryWhatArePeptides = () => {
  return (
    <>
      <PageMeta title="What Are Peptides? · Foundational Series" description="A plain-language introduction to peptides, their clinical utility, and the importance of sourcing integrity." />
      <Breadcrumb items={[
          { label: "Education", to: "/education" },
          { label: "Foundational Series" },
        ]} />
      <RecordHeader
        eyebrow="Source Standard · Foundational Series"
        title="What Are Peptides?"
        lead="A plain-language introduction to peptides, their clinical utility, and the critical importance of sourcing integrity."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        verifiedOn="04 / 21 / 2026"
      />

      <BoardSection n={1} category="Foundation" title="The biological blueprint.">
        <p>
          Peptides are short chains of amino acids, linked together by peptide bonds. Think of them as smaller versions of proteins. While proteins are long, complex chains, peptides are typically comprised of 50 or fewer amino acids. In the human body, these molecules act as highly specific signaling messengers, telling your cells and systems exactly how to function — regulating everything from hormone production and immune response to tissue repair.
        </p>
      </BoardSection>

      <BoardSection
        n={2}
        category="Clinical utility"
        title="How peptides are used in modern care."
        muted
      >
        <p>
          Because peptides are naturally occurring signaling molecules, clinical research has focused on harnessing them for targeted therapies. In modern clinical settings, synthesized peptides are used to:
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            {
              term: "Regulate metabolic function",
              description: "Assisting in weight management and glucose signaling.",
            },
            {
              term: "Support tissue repair",
              description: "Accelerating recovery from injury or age-related wear.",
            },
            {
              term: "Optimize hormonal balance",
              description: "Fine-tuning the endocrine system with high specificity.",
            },
          ]}
        />
        <p className="text-foreground font-medium">
          Unlike many synthetic drugs, peptides are designed to mimic the body's own natural processes, which often results in a more favorable safety profile when sourced and administered correctly.
        </p>
      </BoardSection>

      <BoardSection
        n={3}
        category="Sourcing crisis"
        title="Why provenance matters."
      >
        <p>
          The rise in peptide popularity has led to a fragmented and high-risk supply chain. Because peptides are complex to manufacture, many 'direct-to-consumer' sources bypass traditional pharmacy regulations.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            {
              term: "Research Use Only (RUO)",
              description:
                "Many products sold online are labeled 'Not for Human Consumption.' These lack any clinical oversight, sterility testing, or potency verification.",
            },
            {
              term: "The Source Standard goal",
              description:
                "Our framework ensures that the peptides provided by a clinic are not 'research grade' chemicals, but are clinical-grade medications compounded in regulated 503A or 503B facilities.",
            },
          ]}
        />
        <p className="text-foreground font-medium">
          Peptides are powerful biological tools. Their efficacy is entirely dependent on their purity and the sterile integrity of their source.
        </p>
      </BoardSection>

      <BoardFooterNav
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/library/interpreting-coas", label: "Next · Interpreting CoAs (SS-SERIES-002)" }}
      />

      <BoardCiteFooter citation={`Source Standard, Foundational Series — What Are Peptides?, ${DOC_ID}. Last updated 04 / 21 / 2026.`} />
    <DocSignature docId={DOC_ID} verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default LibraryWhatArePeptides;
