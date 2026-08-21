import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { LearnShell } from "@/components/learn/LearnShell";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { ContinueLearning } from "@/components/learn/ContinueLearning";
import { PageSection } from "@/components/system";
import { FAQ_ENTRIES } from "@/data/learn";

const HERO_STATEMENT =
  "Short answers on legal and regulatory context, clinical limits, the verification process, and how to check a clinic record.";

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

        <PageSection first layout="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {FAQ_ENTRIES.map((f) => (
              <ArticleCard
                key={f.to}
                to={f.to}
                title={f.label}
                description={f.description}
              />
            ))}
          </div>
        </PageSection>

        <ContinueLearning exclude="/learn/faq" />
      </LearnShell>
    </>
  );
};

export default LearnFaq;
