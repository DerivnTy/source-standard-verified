import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqPage } from "@/components/library/FaqPage";

const ITEMS = [
  {
    q: "What should I ask a vendor?",
    a: "Ask where products originate, which pharmacy or manufacturer is involved, whether documentation exists, and whether the vendor participates in independent review.",
  },
  {
    q: "Why is sourcing transparency important?",
    a: "Consumers cannot evaluate claims they cannot verify. Transparency helps create accountability throughout the supply chain.",
  },
  {
    q: "Is a Certificate of Analysis enough?",
    a: "Not always. Documentation is most useful when it can be connected to sourcing records, pharmacy relationships, and supporting evidence.",
  },
  {
    q: "Should I trust marketing claims?",
    a: "Marketing claims should always be considered separately from documentation. Verification focuses on evidence, not advertising.",
  },
  {
    q: "What is the purpose of due diligence?",
    a: "Due diligence helps consumers make decisions using verifiable information rather than assumptions, testimonials, or branding alone.",
  },
];

const FaqConsumerDiligence = () => (
  <>
    <PageMeta
      title="Consumer Due Diligence"
      description="Questions consumers can ask when evaluating sourcing claims, vendor transparency, and documentation quality."
    />
    <Breadcrumb
      items={[
        { label: "Resource Library", to: "/education" },
        { label: "Consumer Due Diligence" },
      ]}
    />
    <FaqPage
      title="Consumer Due Diligence"
      intro="Questions consumers can ask when evaluating sourcing claims, vendor transparency, and documentation quality."
      items={ITEMS}
    />
  </>
);

export default FaqConsumerDiligence;
