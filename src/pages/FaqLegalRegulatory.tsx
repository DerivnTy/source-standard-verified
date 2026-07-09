import { PageMeta } from "@/components/PageMeta";
import { FaqTopicShell } from "@/components/learn/FaqTopicShell";
import { FaqPage } from "@/components/library/FaqPage";

const ITEMS = [
  {
    q: "Is Source Standard a government agency?",
    a: "No. Source Standard is an independent public-reference and verification framework. It does not operate on behalf of the FDA, DEA, state pharmacy boards, or any government agency.",
  },
  {
    q: "Does Source Standard regulate pharmacies or vendors?",
    a: "No. Regulatory authority remains with federal and state agencies. Source Standard organizes documentation, sourcing information, and public-reference records to improve transparency.",
  },
  {
    q: "Does a Verified status mean regulatory approval?",
    a: "No. Verification reflects documentation reviewed within the Source Standard framework. It is not government approval, certification, accreditation, or endorsement.",
  },
  {
    q: "What actions can Source Standard take regarding a vendor?",
    a: "Source Standard can update or remove a registry record based on the information available. It does not have authority over a vendor's ability to operate; that authority rests with regulators.",
  },
  {
    q: "Does Source Standard provide legal advice?",
    a: "No. Information published by Source Standard is educational and informational in nature and should not be interpreted as legal advice.",
  },
];

const FaqLegalRegulatory = () => (
  <>
    <PageMeta
      title="Who Regulates This, and Where Does Source Standard Fit?"
      description="How Source Standard relates to the FDA, state boards, and other regulators, and what our role is (and is not) in oversight."
    />
    <FaqTopicShell
      topicLabel="Legal & Regulatory"
      currentPath="/library/faq/legal-regulatory"
    >
      <FaqPage
        title="Who Regulates This, and Where Does Source Standard Fit?"
        intro="How Source Standard relates to the FDA, state boards, and other regulators, and what our role is (and is not) in oversight."
        items={ITEMS}
      />
    </FaqTopicShell>
  </>
);

export default FaqLegalRegulatory;
