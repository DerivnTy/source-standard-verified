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

const LibraryEndocrinologicalContext = () => {
  return (
    <>
      <RecordHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Endocrinological Context: Age-Related Hormonal Change & TRT"
        lead="A clinical overview of the mechanisms behind hormonal decline and the therapeutic framework of Testosterone Replacement Therapy (TRT)."
        metadata={[
          { label: "Doc", value: "SS-GUIDE-003" },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04/21/26" },
        ]}
      />

      <Section>
        <SectionLabel number="§1" title="The Endocrine Axis" />
        <p>
          The human endocrine system operates on a complex feedback loop primarily governed by the Hypothalamic-Pituitary-Gonadal (HPG) axis. As individuals age, this axis can experience 'hypogonadism'—a state where the body fails to produce sufficient levels of testosterone. Unlike an acute injury, age-related decline is often gradual, leading to a constellation of symptoms including metabolic dysfunction, reduced bone density, and cognitive changes.
        </p>

        <div className="mt-14">
          <SectionLabel number="§2" title="Therapeutic Objective of TRT" />
          <p>
            Testosterone Replacement Therapy (TRT) is not intended to create 'supraphysiological' levels (levels far beyond natural human capacity). Instead, the clinical objective is restoration.
          </p>
          <DefList
            items={[
              {
                term: "Symptom Resolution",
                description: "Aiming for the lowest effective dose that resolves clinical symptoms of deficiency.",
              },
              {
                term: "Hormonal Optimization",
                description: "Bringing serum testosterone levels back into a healthy 'physiological range' appropriate for the patient's biological context.",
              },
            ]}
          />
        </div>

        <div className="mt-14">
          <SectionLabel number="§3" title="The Compounding Necessity" />
          <p>
            Many patients require TRT in specific concentrations or delivery methods (such as specific carrier oils like Grapeseed or MCT) to avoid allergic reactions or to allow for more precise micro-dosing. Because commercial 'Big Pharma' products often offer limited dosage strengths, highly regulated 503A and 503B compounding pharmacies fill a critical gap in personalized endocrine care.
          </p>
        </div>

        <div className="mt-14">
          <SectionLabel number="§4" title="Clinical Monitoring" />
          <p>
            TRT is a dynamic therapy that requires ongoing medical supervision. Verification through Source Standard ensures that the clinic providing the therapy is performing necessary monitoring, including:
          </p>
          <DefList
            items={[
              {
                term: "Baseline & Follow-up Labs",
                description: "Regularly checking Total/Free Testosterone, Estradiol, and Hematocrit levels.",
              },
              {
                term: "PSA Monitoring",
                description: "Ensuring prostate health is maintained throughout the course of therapy.",
              },
            ]}
          />
          <p className="mt-5">
            Restoration of hormonal balance is a clinical process, not a retail transaction. Proper sourcing of the hormones is the foundation of patient safety.
          </p>
        </div>

        {/* Pivot footer */}
        <div className="mt-16 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild>
            <Link to="/education">← Back to Clinical Library</Link>
          </Button>
          <Link
            to="/library/reference-dosing-ranges"
            className="text-[13px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-border"
          >
            Next: Reference Dosing Ranges (SS-GUIDE-004) →
          </Link>
        </div>
      </Section>
    </>
  );
};

export default LibraryEndocrinologicalContext;
