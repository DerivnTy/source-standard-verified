import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection, ProcessSteps } from "@/components/system";
import {
  HOW_IT_WORKS_FACILITY,
  HOW_IT_WORKS_SEARCH_PURPOSE,
  HOW_IT_WORKS_STEPS,
} from "@/data/publicLanguage";

const HowItWorks = () => {
  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "How Verification Works" }]} />

      <PageMeta
        title="How Verification Works · Source Standard"
        description={HOW_IT_WORKS_SEARCH_PURPOSE}
        path="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How Verification Works",
          url: "https://sourcestandard.org/how-it-works",
        }}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Public Guide"
        title="How Verification Works"
        statement={HOW_IT_WORKS_SEARCH_PURPOSE}
        docId=""
      />

      <PageSection first>
        <div style={{ maxWidth: "68ch" }}>
          <ProcessSteps
            steps={HOW_IT_WORKS_STEPS.map((sentence) => ({ title: sentence }))}
          />
        </div>
      </PageSection>

      <PageSection compact bordered={false}>
        <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
          <p
            className="text-foreground"
            style={{ fontSize: "17px", lineHeight: 1.6, margin: 0 }}
          >
            {HOW_IT_WORKS_FACILITY}
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}
          >
            {HOW_IT_WORKS_SEARCH_PURPOSE}
          </p>
        </div>
      </PageSection>

      <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default HowItWorks;
