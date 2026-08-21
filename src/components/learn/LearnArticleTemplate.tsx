import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";

import { LearnShell } from "./LearnShell";
import { KeyTakeaway } from "./KeyTakeaway";
import { RelatedArticles, RelatedItem } from "./RelatedArticles";
import { ContinueLearning } from "./ContinueLearning";

import { readingTimeMinutes, formatReadingTime } from "@/lib/readingTime";

import {
  EducationArticle,
  NewsArticle,
  NEWS_CATEGORIES,
  getEducationArticle,
} from "@/data/learn";



// ── News article template ─────────────────────────────────────────

export const NewsArticleTemplate = ({ article }: { article: NewsArticle }) => {
  const category = NEWS_CATEGORIES.find((c) => c.id === article.category);
  const path = `/learn/news/${article.slug}`;

  const relatedResolved = article.relatedEducation
    .map((r) => getEducationArticle(r.slug))
    .filter((a): a is EducationArticle => Boolean(a));

  const relatedItems: RelatedItem[] = relatedResolved.map((r) => ({
    to: `/learn/${r.topic}#${r.slug}`,
    title: r.question,
    description: r.answersFor,
    meta: formatReadingTime(readingTimeMinutes(r.sections)),
  }));

  const dateLabel = new Date(article.dateline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const metaParts = [dateLabel, category?.label].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.standfirst,
    datePublished: article.dateline,
    dateModified: article.dateline,
    author: { "@type": "Organization", name: "Source Standard" },
    publisher: { "@type": "Organization", name: "Source Standard" },
    mainEntityOfPage: `https://www.sourcestandard.org${path}`,
  };

  return (
    <>
      <PageMeta
        title={article.headline}
        description={article.standfirst}
        path={path}
        type="article"
        jsonLd={jsonLd}
      />

      <LearnShell
        section="news"
        crumbs={[
          { label: "Learn", to: "/learn" },
          { label: "News & Insights", to: "/learn/news" },
          { label: article.headline },
        ]}
      >
        <ArticleHeader
          title={article.headline}
          lead={article.standfirst}
          category="news"
        />

        {metaParts.length > 0 && (
          <div className="page-shell" style={{ paddingTop: "20px", paddingBottom: "8px" }}>
            <div className="w-reading-wide">
              <p
                className="font-mono uppercase text-muted-foreground"
                style={{ fontSize: "10px", letterSpacing: "0.14em" }}
              >
                Source Standard · {metaParts.join(" · ")}
              </p>
            </div>
          </div>
        )}

        <ArticleSection variant="prose">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </ArticleSection>

        <ArticleSection variant="prose" title="Why this matters">
          <p className="text-foreground font-medium">{article.whyThisMatters}</p>
        </ArticleSection>

        <KeyTakeaway>{article.standfirst}</KeyTakeaway>


        <RelatedArticles
          title="Related education"
          eyebrow="Continue reading"
          items={relatedItems}
        />

        <ContinueLearning exclude="/learn/news" />
      </LearnShell>
    </>
  );
};
