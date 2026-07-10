import { LearnShell } from "@/components/learn/LearnShell";
import { ContinueLearning } from "@/components/learn/ContinueLearning";

/**
 * FaqTopicShell — wraps every /library/faq/* page in the Learn frame:
 * breadcrumbs above the page and the canonical Continue Learning closer
 * below it, so FAQ topics belong to Learn instead of ending in a dead
 * end.
 */
export const FaqTopicShell = ({
  topicLabel,
  currentPath: _currentPath,
  children,
}: {
  topicLabel: string;
  currentPath: string;
  children: React.ReactNode;
}) => (
  <LearnShell
    section="faq"
    crumbs={[
      { label: "Learn", to: "/learn" },
      { label: "FAQ", to: "/learn/faq" },
      { label: topicLabel },
    ]}
  >
    {children}
    <ContinueLearning exclude="/learn/faq" />
  </LearnShell>
);

export default FaqTopicShell;
