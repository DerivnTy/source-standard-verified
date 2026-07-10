import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { LearnShell } from "@/components/learn/LearnShell";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { CategoryHeader } from "@/components/learn/CategoryHeader";
import { BrowseStrip } from "@/components/learn/BrowseStrip";
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

        {/* Topic index — quick jump */}
        <section className="bg-background border-b border-border/50" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <div className="page-shell">
            <div className="mx-auto w-standard">
              <p
                className="font-mono uppercase text-muted-foreground"
                style={{ fontSize: "10px", letterSpacing: "0.14em", marginBottom: "10px" }}
              >
                Browse by topic
              </p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION_TOPICS.map((t) => {
                  const count = educationArticlesByTopic(t.id).length;
                  return (
                    <a
                      key={t.id}
                      href={`#${t.id}`}
                      className="inline-flex items-center gap-2 bg-card hover:bg-muted transition-colors"
                      style={{
                        border: "0.5px solid hsl(var(--border))",
                        borderRadius: "20px",
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      <span className="text-foreground">{t.label}</span>
                      <span
                        className="font-mono uppercase text-muted-foreground/80 tabular-nums"
                        style={{ fontSize: "10px", letterSpacing: "0.1em" }}
                      >
                        {count}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Topic sections */}
        {EDUCATION_TOPICS.map((topic) => {
          const entries = educationArticlesByTopic(topic.id);
          return (
            <section
              key={topic.id}
              id={topic.id}
              className="scroll-mt-24 bg-background border-b border-border"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <div className="page-shell">
                <div className="mx-auto w-standard">
                  <CategoryHeader
                    eyebrow="Education"
                    title={topic.label}
                    description={topic.description}
                    count={entries.length}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

        <BrowseStrip
          eyebrow="Continue in Learn"
          primary={{ to: "/learn/faq", label: "Frequently Asked Questions" }}
          secondary={[
            { to: "/learn/news", label: "News & Insights" },
            { to: "/learn", label: "Learn overview" },
          ]}
        />
      </LearnShell>
    </>
  );
};

export default LearnEducation;
