import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqPage } from "@/components/library/FaqPage";

const ITEMS = [
  {
    q: "Does Verified status mean a product is safe?",
    a: "No. Verification does not guarantee product safety, effectiveness, potency, sterility, or clinical outcome.",
  },
  {
    q: "Does Source Standard test every product sold by a vendor?",
    a: "No. Verification is primarily based on documentation review, sourcing evaluation, public records, and registry standards. Testing activity is disclosed separately when applicable.",
  },
  {
    q: "Can Source Standard tell me which treatment is right for me?",
    a: "No. Treatment decisions should always be made between a patient and a licensed healthcare professional.",
  },
  {
    q: "Why does Source Standard discuss safety if it does not provide medical advice?",
    a: "Source Standard discusses sourcing transparency, pharmacy standards, and public claims so consumers can ask better questions of their clinicians. It does not provide individualized medical guidance.",
  },
  {
    q: "What should consumers focus on most?",
    a: "Consumers should understand sourcing transparency, pharmacy relationships, documentation quality, licensure status, and vendor accountability rather than relying solely on marketing claims.",
  },
];

const FaqClinicalSafety = () => (
  <>
    <PageMeta
      title="Is a Compounded Therapy Safe?"
      description="What consumers commonly ask about compounded product handling, sourcing, and safety-related claims, and what Source Standard can and cannot tell you."
    />
    <Breadcrumb
      items={[
        { label: "Resource Library", to: "/education" },
        { label: "Safety & Product" },
      ]}
    />
    <FaqPage
      title="Is a Compounded Therapy Safe?"
      intro="What consumers commonly ask about compounded product handling, sourcing, and safety-related claims, and what Source Standard can and cannot tell you."
      items={ITEMS}
    />
  </>
);

export default FaqClinicalSafety;
