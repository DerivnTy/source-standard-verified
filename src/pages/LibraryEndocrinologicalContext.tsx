import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-GUIDE-003";

const LibraryEndocrinologicalContext = () => {
  return (
    <>
      <PageMeta title="Endocrinological Context · Foundational Series" description="Clinical context for the endocrine pathways modulated by therapeutic peptides." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Foundational Series" },
        ]} />
      <ArticleHeader
        eyebrow="Source Standard · Clinical Guide"
        title="Endocrinological Context: Age-Related Hormonal Change & TRT"
        lead="A clinical overview of the mechanisms behind hormonal decline and the therapeutic framework of Testosterone Replacement Therapy (TRT)."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "MAB Reviewed / Active" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="The HPG feedback loop.">
        <p>
          The human endocrine system operates on a complex feedback loop primarily governed by the Hypothalamic-Pituitary-Gonadal (HPG) axis. As individuals age, this axis can experience 'hypogonadism' — a state where the body fails to produce sufficient levels of testosterone. Unlike an acute injury, age-related decline is often gradual, leading to a constellation of symptoms including metabolic dysfunction, reduced bone density, and cognitive changes.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="The clinical goal of TRT.">
        <p>
          Testosterone Replacement Therapy (TRT) is not intended to create 'supraphysiological' levels (levels far beyond natural human capacity). Instead, the clinical objective is restoration.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Symptom resolution", description: "Aiming for the lowest effective dose that resolves clinical symptoms of deficiency." },
            { term: "Hormonal optimization", description: "Bringing serum testosterone levels back into a healthy 'physiological range' appropriate for the patient's biological context." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Why compounded options matter.">
        <p>
          Many patients require TRT in specific concentrations or delivery methods (such as specific carrier oils like Grapeseed or MCT) to avoid allergic reactions or to allow for more precise micro-dosing. Because commercial 'Big Pharma' products often offer limited dosage strengths, highly regulated 503A and 503B compounding pharmacies fill a critical gap in personalized endocrine care.
        </p>
      </ArticleSection>

      <ArticleSection n={4} title="What ongoing supervision looks like.">
        <p>
          TRT is a dynamic therapy that requires ongoing medical supervision. Verification through Source Standard ensures that the clinic providing the therapy is performing necessary monitoring, including:
        </p>
        <BoardDefList
          prefix={(i) => `§4.${i + 1}`}
          items={[
            { term: "Baseline & follow-up labs", description: "Regularly checking Total/Free Testosterone, Estradiol, and Hematocrit levels." },
            { term: "PSA monitoring", description: "Ensuring prostate health is maintained throughout the course of therapy." },
          ]}
        />
        <p className="text-foreground font-medium">
          Restoration of hormonal balance is a clinical process, not a retail transaction. Proper sourcing of the hormones is the foundation of patient safety.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Clinical Library" }}
        next={{ to: "/library/reference-dosing-ranges", label: "Reference Dosing Ranges (SS-GUIDE-004)" }}
        citation={`Source Standard, Clinical Guide — Endocrinological Context, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryEndocrinologicalContext;
