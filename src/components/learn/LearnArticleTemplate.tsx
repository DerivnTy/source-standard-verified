import { FeatureLink } from "@/components/system";

import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection, ArticleFooter } from "@/components/ArticleSection";
import { NextStep } from "@/components/learn/NextStep";

import {
  EducationArticle,
  NewsArticle,
  EDUCATION_TOPICS,
  NEWS_CATEGORIES,
  getEducationArticle,
} from "@/data/learn";

const asParagraphs = (body: string | string[]) =>
  Array.isArray(body) ? body : [body];

// ── Education article template ──────────────────────────────────────

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
        metadata={[{ label: "Updated", value: article.updated }]}
        backHref="/learn/education"
        backLabel="Back to Education"
      />

      {/* Topic tag row */}
      {topic && (
        <div className="page-shell" style={{ paddingTop: "16px" }}>
          <div className="mx-auto w-reading-wide">
            <p
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "10px", letterSpacing: "0.08em" }}
            >
              Education · {topic.label}
            </p>
          </div>
        </div>
      )}

      <ArticleSection n={0} title="What this answers">
        <p>{article.answersFor}</p>
      </ArticleSection>

      <ArticleSection n={1} title="Short answer">
        <p className="text-foreground font-medium">{article.shortAnswer}</p>
      </ArticleSection>

      {article.sections.map((s, i) => (
        <ArticleSection key={i} n={i + 2} title={s.title}>
          {asParagraphs(s.body).map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </ArticleSection>
      ))}

      {relatedResolved.length > 0 && (
        <ArticleSection title="Related questions">
          <ul className="flex flex-col">
            {relatedResolved.map((r, i) => (
              <li
                key={r.slug}
                className={i > 0 ? "border-t border-border/40 pt-3 mt-3" : ""}
              >
                <Link
                  to={`/learn/education/${r.slug}`}
                  className="block group"
                >
                  <FeatureItem variant="block" title={r.question} />
                </Link>
              </li>
            ))}
          </ul>
        </ArticleSection>
      )}


      <NextStep primary={article.nextStep} />

      <ArticleFooter back={{ to: "/learn/education", label: "Back to Education" }} />
    </>
  );
};

// ── News article template ──────────────────────────────────────────

export const NewsArticleTemplate = ({ article }: { article: NewsArticle }) => {
  const category = NEWS_CATEGORIES.find((c) => c.id === article.category);
  const path = `/learn/news/${article.slug}`;

  const relatedResolved = article.relatedEducation
    .map((r) => getEducationArticle(r.slug))
    .filter((a): a is EducationArticle => Boolean(a));

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

  const dateLabel = new Date(article.dateline).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        metadata={[{ label: "Updated", value: dateLabel }]}
        backHref="/learn/news"
        backLabel="Back to News & Insights"
      />

      <div className="page-shell" style={{ paddingTop: "16px" }}>
        <div className="mx-auto w-reading-wide">
          <p
            className="font-mono uppercase text-muted-foreground"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            {dateLabel}
            {article.location ? ` · ${article.location}` : ""}
            {category ? ` · ${category.label}` : ""}
          </p>
        </div>
      </div>

      {article.body.map((p, i) => (
        <ArticleSection key={i} n={i + 1}>
          <p>{p}</p>
        </ArticleSection>
      ))}

      <ArticleSection title="Why this matters">
        <p className="text-foreground font-medium">{article.whyThisMatters}</p>
      </ArticleSection>

      {relatedResolved.length > 0 && (
        <ArticleSection title="Related education">
          <ul className="flex flex-col">
            {relatedResolved.map((r, i) => (
              <li
                key={r.slug}
                className={i > 0 ? "border-t border-border/40 pt-3 mt-3" : ""}
              >
                <Link
                  to={`/learn/education/${r.slug}`}
                  className="block group"
                >
                  <FeatureItem variant="block" title={r.question} />
                </Link>
              </li>
            ))}
          </ul>
        </ArticleSection>
      )}


      <NextStep primary={article.nextStep} />

      <ArticleFooter back={{ to: "/learn/news", label: "Back to News & Insights" }} />
    </>
  );
};
