import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { Button } from "@/components/ui/button";

const DefList = ({
  items,
}: {
  items: { term: string; description: string }[];
}) => (
  <dl className="mt-5 divide-y divide-border/60 border-y border-border/60">
    {items.map((it) => (
      <div key={it.term} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-6 py-4">
        <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {it.term}
        </dt>
        <dd className="text-[16px] leading-[1.7] text-foreground">{it.description}</dd>
      </div>
    ))}
  </dl>
);

const LibraryWhatArePeptides = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Foundational Series"
        title="What Are Peptides?"
        lead="A plain-language introduction to peptides, their clinical utility, and the critical importance of sourcing integrity."
        metadata={[
          { label: "Doc", value: "SS-SERIES-000A" },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04/21/26" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="The Biological Blueprint" />
        <p>
          Peptides are short chains of amino acids, linked together by peptide bonds. Think of them as smaller versions of proteins. While proteins are long, complex chains, peptides are typically comprised of 50 or fewer amino acids. In the human body, these molecules act as highly specific signaling messengers, telling your cells and systems exactly how to function — regulating everything from hormone production and immune response to tissue repair.
        </p>

        <div className="mt-14">
          <SectionLabel number="§2" title="Clinical Utility" />
          <p>
            Because peptides are naturally occurring signaling molecules, clinical research has focused on harnessing them for targeted therapies. In modern clinical settings, synthesized peptides are used to:
          </p>
          <DefList
            items={[
              {
                term: "Regulate Metabolic Function",
                description: "Assisting in weight management and glucose signaling.",
              },
              {
                term: "Support Tissue Repair",
                description: "Accelerating recovery from injury or age-related wear.",
              },
              {
                term: "Optimize Hormonal Balance",
                description: "Fine-tuning the endocrine system with high specificity.",
              },
            ]}
          />
          <p className="mt-6">
            Unlike many synthetic drugs, peptides are designed to mimic the body's own natural processes, which often results in a more favorable safety profile when sourced and administered correctly.
          </p>
        </div>

        <div className="mt-14">
          <SectionLabel number="§3" title="The Sourcing Crisis" />
          <p>
            The rise in peptide popularity has led to a fragmented and high-risk supply chain. Because peptides are complex to manufacture, many 'direct-to-consumer' sources bypass traditional pharmacy regulations.
          </p>
          <DefList
            items={[
              {
                term: "Research Use Only (RUO)",
                description:
                  "Many products sold online are labeled 'Not for Human Consumption.' These lack any clinical oversight, sterility testing, or potency verification.",
              },
              {
                term: "The Source Standard Goal",
                description:
                  "Our framework ensures that the peptides provided by a clinic are not 'research grade' chemicals, but are clinical-grade medications compounded in regulated 503A or 503B facilities.",
              },
            ]}
          />
          <p className="mt-6">
            Peptides are powerful biological tools. Their efficacy is entirely dependent on their purity and the sterile integrity of their source.
          </p>
        </div>

        {/* Pivot footer */}
        <div className="mt-16 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild>
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/library/interpreting-coas"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next: Interpreting CoAs (SS-SERIES-002) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryWhatArePeptides;
