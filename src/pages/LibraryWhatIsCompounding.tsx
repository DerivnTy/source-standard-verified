import { ArticleHeader } from "@/components/ArticleHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ArticleSection,
  ArticleFooter,
  BoardDefList,
} from "@/components/ArticleSection";

const DOC_ID = "SS-SERIES-000B";

const LibraryWhatIsCompounding = () => {
  return (
    <>
      <PageMeta title="What Is Compounding? · Foundational Series" description="An introduction to pharmacy compounding, how compounded medications are produced, and why facility type matters when evaluating a sourcing claim." />
      <Breadcrumb items={[
          { label: "Resource Library", to: "/education" },
          { label: "Foundational Series" },
        ]} />
      <ArticleHeader
        title="What Is Compounding?"
        lead="An introduction to pharmacy compounding, how compounded medications are produced, and why facility type matters when evaluating a sourcing claim."
        metadata={[
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Status", value: "Active / Public Reference" },
          { label: "Doc", value: DOC_ID },
        ]}
      />

      <ArticleSection n={1} title="Understanding pharmacy compounding">
        <p>
          Pharmacy compounding is the process of preparing a medication to meet a specific patient need. Unlike large pharmaceutical manufacturers that produce medications in standardized forms and dosages, compounding pharmacies create customized preparations based on a prescription or clinical requirement.
        </p>
        <p>
          Compounded medications may be used when a commercially available product is unavailable, backordered, discontinued, requires a different dosage strength, or needs to be prepared in a form that better fits a patient's treatment plan.
        </p>
        <p>
          Because compounded medications are produced through different regulatory pathways than traditional pharmaceutical products, understanding where a medication originates is an important part of evaluating a sourcing claim.
        </p>
      </ArticleSection>

      <ArticleSection n={2} title="Traditional compounding pharmacies (503A)">
        <p>
          A 503A pharmacy is a state-licensed compounding pharmacy that prepares medications for individual patients.
        </p>
        <BoardDefList
          prefix={(i) => `§2.${i + 1}`}
          items={[
            { term: "Patient-specific preparation", description: "A 503A pharmacy generally compounds medications after receiving a valid prescription for a specific patient." },
            { term: "Regulatory framework", description: "These pharmacies operate under state pharmacy oversight and are expected to follow applicable USP standards, including USP <797> for sterile preparations." },
            { term: "Role in the supply chain", description: "503A pharmacies commonly dispense medications directly to patients or coordinate shipment through patient-specific prescription pathways." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={3} title="Outsourcing facilities (503B)">
        <p>
          A 503B facility is an FDA-registered outsourcing facility that compounds medications at a larger operational scale.
        </p>
        <BoardDefList
          prefix={(i) => `§3.${i + 1}`}
          items={[
            { term: "Office-use distribution", description: "503B facilities may compound medications for healthcare providers and clinics without requiring an individual prescription for each unit produced." },
            { term: "FDA oversight", description: "These facilities are subject to direct FDA oversight and inspection requirements." },
            { term: "Manufacturing standards", description: "503B facilities are expected to operate under current Good Manufacturing Practices (cGMP), a manufacturing framework used throughout the pharmaceutical industry to promote consistency, quality control, and process documentation." },
          ]}
        />
      </ArticleSection>

      <ArticleSection n={4} title="Why facility classification matters">
        <p>
          When a clinic, telehealth company, or vendor makes sourcing claims, understanding whether medication originates from a 503A pharmacy or a 503B outsourcing facility provides important context.
        </p>
        <p>
          The two facility types serve different functions within the healthcare system and operate under different regulatory frameworks. Facility classification provides reference context about how a medication enters the supply chain; it does not, on its own, establish product quality or clinical outcome.
        </p>
        <p>
          For consumers evaluating a sourcing claim, facility type is often one of the first reference points used to understand who prepared a medication and what regulatory pathway applies.
        </p>
        <p>
          Source Standard records and reviews facility relationships as part of its broader documentation and sourcing-review process.
        </p>
      </ArticleSection>

      <ArticleSection title="Key Takeaway">
        <p className="text-foreground font-medium">
          Compounding is not a single category. The distinction between 503A pharmacies and 503B outsourcing facilities provides context for understanding how compounded medications move through the supply chain. Facility classification is a reference point, not a guarantee of quality, and is most useful when reviewed alongside documentation and sourcing claims.
        </p>
      </ArticleSection>

      <ArticleFooter
        back={{ to: "/education", label: "Back to Resource Library" }}
        next={{ to: "/library/what-are-peptides", label: "What Are Peptides?" }}
        citation={`Source Standard · Foundational Series · What Is Compounding?, ${DOC_ID}. Last updated 04 / 21 / 2026.`}
      />
    </>
  );
};

export default LibraryWhatIsCompounding;
