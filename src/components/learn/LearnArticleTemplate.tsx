import { Link } from "react-router-dom";
import { FeatureLink } from "@/components/system";

import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";

import {
  EducationArticle,
  NewsArticle,
  EDUCATION_TOPICS,
  NEWS_CATEGORIES,
  getEducationArticle,
  NEXT_STEPS,
} from "@/data/learn";

const asParagraphs = (body: string | string[]) =>
  Array.isArray(body) ? body : [body];

// ── Shared editorial closer ──────────────────────────────────────

const ContinueLearning = ({ nextStep }: { nextStep: string }) => {
  const labels: Record<string, { label: string; to: string }> = {
    "vendor-registry": NEXT_STEPS["vendor-registry"],
    "facility-records": NEXT_STEPS["facility-records"],
    "how-verification-works": NEXT_STEPS["how-verification-works"],
  };

  const next = labels[nextStep] ?? NEXT_STEPS["vendor-registry"];

  return (
    <section className="bg-background" style={{ paddingTop: "28px", paddingBottom: "48px" }}>
      <div className="page-shell">
        <div className="mx-auto w-reading-wide" style={{ maxWidth: "68ch" }}>
          <h2 className="t-section-title-sm text-foreground">Continue Learning</h2>
          <ul className="flex flex-col mt-4 divide-y divide-border/60 border-t border-b border-border/60" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                to={next.to}
                className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-3.5 items-baseline hover:bg-muted/40 active:bg-muted/60 transition-colors"
                style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
              >
                <span className="font-sans text-foreground group-hover:text-primary transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
                  {next.label}
                </span>
                <span
                  aria-hidden
                  className="text-muted-foreground/60 group-hover:text-foreground transition-colors font-mono"
                  style={{ fontSize: "14px" }}
                >
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={NEXT_STEPS["how-verification-works"].to}
                className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-3.5 items-baseline hover:bg-muted/40 active:bg-muted/60 transition-colors"
                style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
              >
                <span className="font-sans text-foreground group-hover:text-primary transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
                  {NEXT_STEPS["how-verification-works"].label}
                </span>
                <span
                  aria-hidden
                  className="text-muted-foreground/60 group-hover:text-foreground transition-colors font-mono"
                  style={{ fontSize: "14px" }}
                >
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={NEXT_STEPS["facility-records"].to}
                className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-3.5 items-baseline hover:bg-muted/40 active:bg-muted/60 transition-colors"
                style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
              >
                <span className="font-sans text-foreground group-hover:text-primary transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
                  {NEXT_STEPS["facility-records"].label}
                </span>
                <span
                  aria-hidden
                  className="text-muted-foreground/60 group-hover:text-foreground transition-colors font-mono"
                  style={{ fontSize: "14px" }}
                >
                  →
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

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

      <ContinueLearning nextStep={article.nextStep} />
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

  const metaParts = [dateLabel, article.location, category?.label].filter(
    Boolean
  );

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

      <ContinueLearning nextStep={article.nextStep} />
    </>
  );
};
