import { LearnShell } from "@/components/learn/LearnShell";
import { BrowseStrip } from "@/components/learn/BrowseStrip";
import { FAQ_ENTRIES } from "@/data/learn";

/**
 * FaqTopicShell — wraps every /library/faq/* page in the Learn frame:
 * breadcrumbs, section pill nav, and two footer strips linking to
 * sibling FAQ topics and back to the FAQ hub. Keeps FAQ inside Learn
 * instead of ending each topic in a dead end.
 */
export const FaqTopicShell = ({
  topicLabel,
  currentPath,
  children,
}: {
  topicLabel: string;
  currentPath: string;
  children: React.ReactNode;
}) => {
  const siblings = FAQ_ENTRIES.filter((e) => e.to !== currentPath);

  return (
    <LearnShell
      section="faq"
      crumbs={[
        { label: "Learn", to: "/learn" },
        { label: "FAQ", to: "/learn/faq" },
        { label: topicLabel },
      ]}
    >
      {children}

      <BrowseStrip
        eyebrow="Related topics"
        primary={{ to: "/learn/faq", label: "All FAQ topics" }}
        secondary={siblings.map((s) => ({ to: s.to, label: s.label }))}
      />

      <BrowseStrip
        eyebrow="Browse Learn"
        primary={{ to: "/learn/education", label: "Browse Education" }}
        secondary={[
          { to: "/learn/news", label: "News & Insights" },
          { to: "/learn", label: "Learn overview" },
        ]}
      />
    </LearnShell>
  );
};

export default FaqTopicShell;
