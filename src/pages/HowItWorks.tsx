import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection, ProcessSteps } from "@/components/system";
import {
  HOW_IT_WORKS_FACILITY,
  HOW_IT_WORKS_SEARCH_PURPOSE,
  HOW_IT_WORKS_STEPS,
} from "@/data/publicLanguage";
import {
  METHODOLOGY_SCOPE,
  METHODOLOGY_TESTING,
  TESTING_DOES,
  WHAT_WE_DO_TODAY,
} from "@/data/institutionalCopy";

const RELATED = [
  { to: "/status-definitions", label: "Status definitions" },
  { to: "/verification-disclaimer", label: "What verification does not mean" },
  { to: "/apply", label: "Apply for review" },
  { to: "/governance", label: "Independence and governance" },
];

const HowItWorks = () => {
  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "How Verification Works" }]} />

      <PageMeta
        title="How Verification Works"
        description={HOW_IT_WORKS_SEARCH_PURPOSE}
        path="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How Verification Works",
          url: "https://www.sourcestandard.org/how-it-works",
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

      <PageSection first title="What is reviewed">
        <div className="flex flex-col gap-3">
          <p className="t-body-lg" style={{ margin: 0 }}>
            {WHAT_WE_DO_TODAY}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {METHODOLOGY_SCOPE}
          </p>
        </div>
      </PageSection>

      <PageSection compact title="Clinic review">
        <ProcessSteps
          steps={HOW_IT_WORKS_STEPS.map((sentence) => ({ title: sentence }))}
        />
      </PageSection>

      <PageSection compact title="Facility evaluation">
        <div className="flex flex-col gap-3">
          <p className="t-body-lg" style={{ margin: 0 }}>
            {HOW_IT_WORKS_FACILITY}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            Facility records are a separate index from clinic verification. A facility may be followed in Monitoring status without being Greenlisted. Greenlisted status is issued only when the applicable evaluation is completed and the defined criteria are met.
          </p>
        </div>
      </PageSection>

      <PageSection compact title="Independent testing">
        <div className="flex flex-col gap-3">
          <p className="t-body-lg" style={{ margin: 0 }}>
            {METHODOLOGY_TESTING}
          </p>
          <p className="t-body-sm text-muted-foreground" style={{ margin: 0 }}>
            {TESTING_DOES}
          </p>
        </div>
      </PageSection>

      <PageSection last bordered={false} title="Related records">
        <ul className="m-0 max-w-[68ch] list-none p-0">
          {RELATED.map((r, i) => (
            <li key={r.to} className={i > 0 ? "border-t border-border" : ""}>
              <Link
                to={r.to}
                className="inline-flex items-center justify-between gap-4 py-3 text-foreground hover:text-primary w-full"
              >
                <span className="t-body-sm">{r.label}</span>
                <span aria-hidden className="text-muted-foreground">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
};

export default HowItWorks;
