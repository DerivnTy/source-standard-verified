import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { LearnShell } from "@/components/learn/LearnShell";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { CategoryHeader } from "@/components/learn/CategoryHeader";
import { ContinueLearning } from "@/components/learn/ContinueLearning";
import { readingTimeMinutes, formatReadingTime } from "@/lib/readingTime";
import {
  EDUCATION_TOPICS,
  educationArticlesByTopic,
} from "@/data/learn";

const HERO_STATEMENT =
  "Evergreen answers to the questions people ask before choosing a provider. Every article answers one question, plainly, and points you to the next useful step.";

const LearnEducation = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Education, Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn/education",
  };

  return (
    <>
      <PageMeta
        title="Education"
        description={HERO_STATEMENT}
        path="/learn/education"
        jsonLd={jsonLd}
      />

      <LearnShell
        section="education"
        crumbs={[
          { label: "Learn", to: "/learn" },
          { label: "Education" },
        ]}
      >
        <BriefingHero
          tone="navy"
          variant="chapter"
          category="Learn · Education"
          title="Education"
          statement={HERO_STATEMENT}
          docId=""
        />

        {/* Topic sections */}
        {EDUCATION_TOPICS.map((topic, i) => {
          const entries = educationArticlesByTopic(topic.id);
          const isFirst = i === 0;
          return (
            <section
              key={topic.id}
              id={topic.id}
              className={`scroll-mt-24 bg-background border-b border-border ${isFirst ? "pt-10 pb-10 md:pt-12 md:pb-12" : "section-pad"}`}
            >
              <div className="page-shell">
                <div className="mx-auto w-standard">
                  <CategoryHeader
                    title={topic.label}
                    description={topic.description}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {entries.map((a) => (
                      <ArticleCard
                        key={a.slug}
                        to={`/learn/education/${a.slug}`}
                        title={a.question}
                        description={a.answersFor}
                        meta={formatReadingTime(readingTimeMinutes(a.sections))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <ContinueLearning exclude="/learn/education" />
      </LearnShell>
    </>
  );
};

export default LearnEducation;
