import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { PageSection, FeatureLink } from "@/components/system";
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

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Learn · Education"
        title="Education"
        statement={HERO_STATEMENT}
        docId=""
      />

      <div style={{ height: "32px" }} aria-hidden />

      {/* Topic sections */}
      {EDUCATION_TOPICS.map((topic) => {
        const entries = educationArticlesByTopic(topic.id);
        return (
          <div key={topic.id} id={topic.id} className="scroll-mt-24">
            <PageSection title={topic.label} intro={topic.description}>
              <ul className="flex flex-col">
                {entries.map((a, i) => (
                  <li
                    key={a.slug}
                    className={i > 0 ? "border-t border-border/40 mt-2 pt-2" : ""}
                  >
                    <FeatureLink
                      to={`/learn/education/${a.slug}`}
                      title={a.question}
                      desc={a.answersFor}
                    />
                  </li>
                ))}
              </ul>
            </PageSection>
          </div>
        );
      })}

      <EditorialBackLink to="/learn" label="Back to Learn" />
    </>
  );
};

export default LearnEducation;
