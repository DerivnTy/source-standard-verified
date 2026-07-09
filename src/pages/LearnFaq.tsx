import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { LearnShell } from "@/components/learn/LearnShell";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { BrowseStrip } from "@/components/learn/BrowseStrip";
import { PageSection } from "@/components/system";
import { FAQ_ENTRIES } from "@/data/learn";

const HERO_STATEMENT =
  "Direct answers to the questions we receive most often, organized by topic. If you don't find your question here, contact us.";

const LearnFaq = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Frequently Asked Questions, Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn/faq",
  };

  return (
    <>
      <PageMeta
        title="Frequently Asked Questions"
        description={HERO_STATEMENT}
        path="/learn/faq"
        jsonLd={jsonLd}
      />

      <LearnShell
        section="faq"
        showNav
        crumbs={[
          { label: "Learn", to: "/learn" },
          { label: "FAQ" },
        ]}
      >
        <BriefingHero
          tone="navy"
          variant="chapter"
          category="Learn · FAQ"
          title="Frequently Asked Questions"
          statement={HERO_STATEMENT}
          docId=""
        />

        <PageSection
          title="Browse by topic"
          intro="Four topic sets cover the questions we hear most often."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQ_ENTRIES.map((f) => (
              <ArticleCard
                key={f.to}
                to={f.to}
                eyebrow="FAQ Topic"
                title={f.label}
                description={f.description}
              />
            ))}
          </div>
        </PageSection>

        <BrowseStrip
          eyebrow="Still have questions?"
          primary={{ to: "/contact", label: "Contact Source Standard" }}
          secondary={[
            { to: "/learn/education", label: "Browse Education" },
            { to: "/learn/news", label: "News & Insights" },
          ]}
        />
      </LearnShell>
    </>
  );
};

export default LearnFaq;
