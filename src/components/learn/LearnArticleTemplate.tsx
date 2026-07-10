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
  EDUCATION_TOPICS,
  NEWS_CATEGORIES,
  EDUCATION_ARTICLES,
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
  

  // Resolve related. If fewer than 3 explicit, fill from same topic.
  const explicit = article.relatedQuestions
    .map((r) => getEducationArticle(r.slug))
    .filter((a): a is EducationArticle => Boolean(a) && a!.slug !== article.slug);

  const filler = EDUCATION_ARTICLES.filter(
    (a) =>
      a.topic === article.topic &&
      a.slug !== article.slug &&
      !explicit.some((e) => e.slug === a.slug),
  );

  const relatedResolved = [...explicit, ...filler].slice(0, 4);

  const relatedItems: RelatedItem[] = relatedResolved.map((r) => ({
    to: `/learn/education/${r.slug}`,
    title: r.question,
    description: r.answersFor,
    meta: formatReadingTime(readingTimeMinutes(r.sections)),
  }));

  const siblingLinks = topic
    ? EDUCATION_ARTICLES.filter(
        (a) => a.topic === topic.id && a.slug !== article.slug,
      )
        .slice(0, 3)
        .map((a) => ({
          to: `/learn/education/${a.slug}`,
          label: a.question,
        }))
    : [];

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

      <LearnShell
        section="education"
        crumbs={[
          { label: "Learn", to: "/learn" },
          { label: "Education", to: "/learn/education" },
          ...(topic
            ? [{ label: topic.label, to: `/learn/education#${topic.id}` }]
            : []),
          { label: article.question },
        ]}
      >
        <ArticleHeader
          title={article.question}
          lead={article.shortAnswer}
          category="education"
        />

        <KeyTakeaway>{article.shortAnswer}</KeyTakeaway>


        {article.sections.map((s, i) => (
          <ArticleSection key={i} variant="prose" title={s.title}>
            {asParagraphs(s.body).map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </ArticleSection>
        ))}

        <RelatedArticles items={relatedItems} />

        <ContinueLearning exclude="/learn/education" />
      </LearnShell>
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

  const relatedItems: RelatedItem[] = relatedResolved.map((r) => ({
    to: `/learn/education/${r.slug}`,
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
          category={metaParts.join(" · ")}
        />

        <KeyTakeaway>{article.standfirst}</KeyTakeaway>

        <ArticleSection variant="prose">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </ArticleSection>

        <ArticleSection variant="prose" title="Why this matters">
          <p className="text-foreground font-medium">{article.whyThisMatters}</p>
        </ArticleSection>

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
