import { FeatureLink } from "@/components/system";

import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { EditorialBackLink } from "@/components/EditorialBackLink";

import {
  EducationArticle,
  NewsArticle,
  EDUCATION_TOPICS,
  NEWS_CATEGORIES,
  getEducationArticle,
} from "@/data/learn";

const asParagraphs = (body: string | string[]) =>
  Array.isArray(body) ? body : [body];


// ── Education article template ────────────────────────────────────

export const EducationArticleTemplate = ({
  article,
}: {
  article: EducationArticle;
}) => {
  const topic = EDUCATION_TOPICS.find((t) => t.id === article.topic);
  const path = `/learn/education/${article.slug}`;

  const relatedResolved = article.relatedQuestions
    .map((r) => getEducationArticle(r.slug))
    .filter((a): a is EducationArticle => Boolean(a));

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.question,
      description: article.shortAnswer,
      dateModified: article.updated,
      author: { "@type": "Organization", name: "Source Standard" },
      publisher: { "@type": "Organization", name: "Source Standard" },
      mainEntityOfPage: `https://www.sourcestandard.org${path}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: article.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: article.shortAnswer,
          },
        },
      ],
    },
  ];

  return (
    <>
      <PageMeta
        title={article.question}
        description={article.shortAnswer}
        path={path}
        type="article"
        jsonLd={jsonLd}
      />

      <ArticleHeader
        title={article.question}
        lead={article.shortAnswer}
        category={topic ? `Education · ${topic.label}` : "Education"}
        backHref="/learn/education"
        backLabel="Back to Education"
      />

      {article.sections.map((s, i) => (
        <ArticleSection key={i} variant="prose" title={s.title}>
          {asParagraphs(s.body).map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </ArticleSection>
      ))}

      {relatedResolved.length > 0 && (
        <ArticleSection variant="callout" kind="Continue reading" title="Related Education">
          <ul className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {relatedResolved.map((r, i) => (
              <li
                key={r.slug}
                className={i > 0 ? "border-t border-border/40 mt-1 pt-1" : ""}
              >
                <FeatureLink
                  to={`/learn/education/${r.slug}`}
                  title={r.question}
                />
              </li>
            ))}
          </ul>
        </ArticleSection>
      )}

      <BackToLibrary />
    </>
  );
};

// ── News article template ─────────────────────────────────────────

export const NewsArticleTemplate = ({ article }: { article: NewsArticle }) => {
  const category = NEWS_CATEGORIES.find((c) => c.id === article.category);
  const path = `/learn/news/${article.slug}`;

  const relatedResolved = article.relatedEducation
    .map((r) => getEducationArticle(r.slug))
    .filter((a): a is EducationArticle => Boolean(a));

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

      <ArticleHeader
        title={article.headline}
        lead={article.standfirst}
        category={metaParts.join(" · ")}
        backHref="/learn/news"
        backLabel="Back to News & Insights"
      />

      <ArticleSection variant="prose">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </ArticleSection>

      <ArticleSection variant="prose" title="Why this matters">
        <p className="text-foreground font-medium">{article.whyThisMatters}</p>
      </ArticleSection>

      {relatedResolved.length > 0 && (
        <ArticleSection variant="callout" kind="Continue reading" title="Related Education">
          <ul className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {relatedResolved.map((r, i) => (
              <li
                key={r.slug}
                className={i > 0 ? "border-t border-border/40 mt-1 pt-1" : ""}
              >
                <FeatureLink
                  to={`/learn/education/${r.slug}`}
                  title={r.question}
                />
              </li>
            ))}
          </ul>
        </ArticleSection>
      )}

      <BackToLibrary />
    </>
  );
};
