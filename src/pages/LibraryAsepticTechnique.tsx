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

const LibraryAsepticTechnique = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Aseptic Technique: Sanitization Fundamentals"
        lead="Foundational principles of aseptic handling for clinicians and patients to minimize the risk of microbial introduction during medication administration."
        metadata={[
          { label: "Doc", value: "SS-GUIDE-002" },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04/21/26" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="Defining the Aseptic Field" />
        <p>
          In clinical practice, 'aseptic' means the absence of pathogenic microorganisms. While a home or office environment is never truly sterile, we can create a 'Controlled Field' for medication preparation. This involves identifying a clean, well-lit, non-porous surface away from high-traffic areas, open windows, or air vents.
        </p>

        <div className="mt-14">
          <SectionLabel number="§2" title="Hand Hygiene & Barrier Protection" />
          <p>
            The most common vector for contamination is the human hand.
          </p>
          <DefList
            items={[
              {
                term: "Mechanical Cleaning",
                description: "Hands should be washed with antimicrobial soap for at least 30 seconds, focusing on the fingernails and webbing between fingers.",
              },
              {
                term: "Gloves",
                description: "While patient self-administration often relies on hand washing, clinical staff must utilize medical-grade, powder-free gloves. Note: Wearing gloves does not replace the need for hand washing; it is an additional layer of protection.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§3" title="The 'Swab and Wait' Protocol" />
          <p>
            Alcohol-based sanitization is a chemical reaction that requires time to be effective.
          </p>
          <DefList
            items={[
              {
                term: "Septum Sanitization",
                description: "Before every needle entry, the rubber stopper (septum) of the vial must be wiped firmly with a 70% Isopropyl Alcohol swab.",
              },
              {
                term: "The 10-Second Rule",
                description: "You must allow the alcohol to air-dry for at least 10 seconds. Do not blow on the surface to speed up drying, as this introduces oral bacteria back onto the sterile field.",
              },
              {
                term: "Single Use",
                description: "Never use the same alcohol swab for both the vial and the skin site. Each requires a fresh, sterile swab.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§4" title="'Critical Sites' Safety" />
          <p>
            Certain parts of the administration equipment must never touch a non-sterile surface:
          </p>
          <DefList
            items={[
              {
                term: "The Needle",
                description: "From the moment the cap is removed until the injection is complete.",
              },
              {
                term: "The Syringe Hub",
                description: "The point where the needle attaches to the syringe.",
              },
              {
                term: "The Vial Septum",
                description: "Once sanitized and dried.",
              },
            ]}
          />
          <p className="mt-5">
            If any of these 'Critical Sites' come into contact with a finger, table, or clothing, the equipment is considered compromised and must be discarded.
          </p>
        </div>

        {/* Pivot footer */}
        <div className="mt-16 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild>
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/library/endocrinological-context"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next: Endocrinological Context (SS-GUIDE-003) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryAsepticTechnique;
