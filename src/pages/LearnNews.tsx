import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { LearnShell } from "@/components/learn/LearnShell";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { ContinueLearning } from "@/components/learn/ContinueLearning";
import { PageSection } from "@/components/system";
import { NEWS_ARTICLES, NEWS_CATEGORIES, type NewsCategoryId } from "@/data/learn";

const HERO_STATEMENT =
  "Timely reporting and analysis on compounded medications, regulatory changes, industry developments, and updates from Source Standard.";

// Editorial section order (curated, independent of NEWS_CATEGORIES declaration order)
const SECTION_ORDER: NewsCategoryId[] = [
  "regulatory",
  "industry",
  "scientific",
  "source-standard",
  "editorial",
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const LearnNews = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Insights, Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn/news",
  };

  const sections = SECTION_ORDER
    .map((id) => {
      const cat = NEWS_CATEGORIES.find((c) => c.id === id);
      if (!cat) return null;
      const articles = NEWS_ARTICLES
        .filter((a) => a.category === id)
        .sort(
          (a, b) =>
            new Date(b.dateline).getTime() - new Date(a.dateline).getTime(),
        );
      if (articles.length === 0) return null;
      return { id, label: cat.label, articles };
    })
    .filter((s): s is { id: NewsCategoryId; label: string; articles: typeof NEWS_ARTICLES } => s !== null);

  return (
    <>
      <PageMeta
        title="News & Insights"
        description={HERO_STATEMENT}
        path="/learn/news"
        jsonLd={jsonLd}
      />

      <LearnShell
        section="news"
        crumbs={[
          { label: "Learn", to: "/learn" },
          { label: "News & Insights" },
        ]}
      >
        <BriefingHero
          tone="navy"
          variant="chapter"
          category="Learn · News & Insights"
          title="News & Insights"
          statement={HERO_STATEMENT}
          docId=""
        />

        {sections.map((section, i) => (
          <PageSection key={section.id} title={section.label} first={i === 0}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {section.articles.map((a) => (
                <ArticleCard
                  key={a.slug}
                  to={`/learn/news/${a.slug}`}
                  title={a.headline}
                  description={a.standfirst}
                  meta={formatDate(a.dateline)}
                />
              ))}
            </div>
          </PageSection>
        ))}

        <ContinueLearning exclude="/learn/news" />
      </LearnShell>
    </>
  );
};

export default LearnNews;
