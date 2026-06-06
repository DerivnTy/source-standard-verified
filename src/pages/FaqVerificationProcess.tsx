import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FaqPage } from "@/components/library/FaqPage";

const ITEMS = [
  {
    q: "What does Verified mean?",
    a: "Verified means Source Standard reviewed documentation supporting a vendor's stated sourcing claims and assigned status within the framework.",
  },
  {
    q: "Does Verified mean the vendor is the best option?",
    a: "No. Verification is not a ranking system and does not compare vendors against one another.",
  },
  {
    q: "What information is reviewed?",
    a: "Depending on the review scope, documentation may include sourcing records, pharmacy relationships, licensure records, chain-of-custody evidence, and related public records.",
  },
  {
    q: "Can a vendor lose Verified status?",
    a: "Yes. Registry status may change when documentation expires, sourcing changes occur, new information emerges, or review standards are no longer satisfied.",
  },
  {
    q: "Are all vendors in the registry Verified?",
    a: "No. The registry includes multiple status categories, including Verified, Unverified, Under Review, Suspended, and Removed.",
  },
];

const FaqVerificationProcess = () => (
  <>
    <PageMeta
      title="Verification Questions"
      description="Common questions about how verification works, what documentation is reviewed, and what registry status means."
    />
    <Breadcrumb
      items={[
        { label: "Resource Library", to: "/education" },
        { label: "Verification" },
      ]}
    />
    <FaqPage
      title="Verification Questions"
      intro="Common questions about how verification works, what documentation is reviewed, and what registry status means."
      items={ITEMS}
    />
  </>
);

export default FaqVerificationProcess;
