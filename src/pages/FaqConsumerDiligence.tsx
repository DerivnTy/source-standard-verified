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
      title="What Should I Ask My Provider?"
      description="Questions you can ask your clinic to evaluate sourcing, transparency, and documentation before starting a compounded therapy."
    />
    <Breadcrumb
      items={[
        { label: "Resource Library", to: "/education" },
        { label: "Consumer Due Diligence" },
      ]}
    />
    <FaqPage
      title="What Should I Ask My Provider?"
      intro="Questions you can ask your clinic to evaluate sourcing, transparency, and documentation before starting a compounded therapy."
      items={ITEMS}
    />
  </>
);

export default FaqConsumerDiligence;
