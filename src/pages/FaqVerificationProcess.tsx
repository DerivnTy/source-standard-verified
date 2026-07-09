import { PageMeta } from "@/components/PageMeta";
import { FaqTopicShell } from "@/components/learn/FaqTopicShell";
import { FaqPage } from "@/components/library/FaqPage";

const ITEMS = [
  {
    q: "What does Verified mean?",
    a: "Verified means Source Standard reviewed evidence supporting a vendor's stated sourcing claims and assigned status within the framework.",
  },
  {
    q: "Does Verified mean the vendor is the best option?",
    a: "No. Verification is not a ranking system and does not compare vendors against one another.",
  },
  {
    q: "What information is reviewed?",
    a: "Depending on the review scope, information considered may include sourcing documentation, pharmacy relationships, licensure records, and related public records.",
  },
  {
    q: "Can a vendor lose Verified status?",
    a: "Yes. Registry status may change when documentation expires, sourcing changes occur, or new information indicates the record no longer reflects current conditions.",
  },
  {
    q: "Are all vendors in the registry Verified?",
    a: "No. The registry includes multiple status categories, including Verified, Unverified, Under Review, Suspended, and Removed.",
  },
];

const FaqVerificationProcess = () => (
  <>
    <PageMeta
      title="How Does Verification Work?"
      description="What verification means, how registry statuses are assigned, and how consumers should interpret Source Standard records."
    />
    <FaqTopicShell
      topicLabel="Verification Process"
      currentPath="/library/faq/verification-process"
    >
      <FaqPage
        title="How Does Verification Work?"
        intro="What verification means, how registry statuses are assigned, and how consumers should interpret Source Standard records."
        items={ITEMS}
      />
    </FaqTopicShell>
  </>
);

export default FaqVerificationProcess;
