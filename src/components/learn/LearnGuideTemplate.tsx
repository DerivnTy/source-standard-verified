import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { ArticleSection } from "@/components/ArticleSection";

import { LearnShell } from "./LearnShell";
import { ContinueLearning } from "./ContinueLearning";
import { KeyTakeaway } from "./KeyTakeaway";
import { GuideTOC, TOCItem } from "./GuideTOC";

import {
  EducationTopicId,
  EducationArticle,
  EDUCATION_TOPICS,
  educationArticlesByTopic,
} from "@/data/learn";

const asParagraphs = (body: string | string[]) =>
  Array.isArray(body) ? body : [body];

const GUIDE_META: Record<
  EducationTopicId,
  { title: string; lead: string; takeaway: string }
> = {
  "learn-the-basics": {
    title: "Compounded Therapy Basics",
    lead: "What compounding is, how it differs from an FDA-approved product, and why the preparing pharmacy is the accountable party.",
    takeaway:
      "Compounded medications are not FDA-approved products. Quality depends on the pharmacy that prepares them. The pharmacy name is the fact that makes the rest of the record checkable.",
  },
  verification: {
    title: "Verification",
    lead: "What Source Standard reviews, what Verified and Greenlisted mean, and what a review does not establish.",
    takeaway:
      "Verification records what was reviewed, against what requirements, and when. It does not endorse a product or replace clinical judgment.",
  },
  "choosing-a-provider": {
    title: "Reviewing a Clinic",
    lead: "Questions a clinic should be able to answer, the documents to request, and how to read a published Source Standard record.",
    takeaway:
      "A clinic that can name the preparing pharmacy, its regulatory category, and supporting documents has given you something that can be checked. Vague sourcing language has not.",
  },
  "sourcing-and-manufacturing": {
    title: "Sourcing and Facilities",
    lead: "503A and 503B categories, sterile compounding, certificates of analysis, and why facility records sit behind clinic claims.",
    takeaway:
      "The clinic is usually not the maker. The preparing pharmacy's category, license, and documentation are the layer a sourcing review can address.",
  },
};

const buildJsonLd = (
  topicId: EducationTopicId,
  title: string,
  lead: string,
  articles: EducationArticle[],
  path: string,
) => {
  const canonical = `https://www.sourcestandard.org${path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: lead,
      author: { "@type": "Organization", name: "Source Standard" },
      publisher: { "@type": "Organization", name: "Source Standard" },
      mainEntityOfPage: canonical,
      dateModified: articles[0]?.updated ?? "2026-07-10",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: articles.map((a) => ({
        "@type": "Question",
        name: a.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: a.shortAnswer,
        },
      })),
    },
  ];
};

export const LearnGuideTemplate = ({ topicId }: { topicId: EducationTopicId }) => {
  const topic = EDUCATION_TOPICS.find((t) => t.id === topicId)!;
  const meta = GUIDE_META[topicId];
  const articles = educationArticlesByTopic(topicId);
  const path = `/learn/${topicId}`;

  const toc: TOCItem[] = articles.map((a) => ({ id: a.slug, label: a.question }));
  const jsonLd = buildJsonLd(topicId, meta.title, meta.lead, articles, path);

  return (
    <>
      <PageMeta
        title={meta.title}
        description={meta.lead}
        path={path}
        type="article"
        jsonLd={jsonLd}
      />

      <LearnShell
        section="education"
        crumbs={[
          { label: "Learn", to: "/learn" },
          { label: meta.title },
        ]}
      >
        <BriefingHero
          tone="navy"
          variant="chapter"
          category="Learn"
          title={meta.title}
          statement={meta.lead}
          docId=""
        />
        <div className="page-shell" style={{ paddingTop: "16px" }}>
          <div className="mx-auto w-reading-wide">
            <p className="t-meta">
              Source Standard · Updated {articles[0]?.updated ?? "2026-07-10"}
            </p>
          </div>
        </div>

        {/* Table of contents — inline on mobile, sticky on desktop */}
        <section
          className="bg-background"
          style={{ paddingTop: "32px", paddingBottom: "8px" }}
        >
          <div className="page-shell">
            <div className="mx-auto w-reading-wide">
              <GuideTOC items={toc} basePath={path} />
            </div>
          </div>
        </section>

        {/* Guide body — each article becomes one section */}
        {articles.map((article, i) => (
          <ArticleSection
            key={article.slug}
            variant="prose"
            title={article.question}
            id={article.slug}
            first={false}
          >
            <p
              className="text-foreground"
              style={{ fontWeight: 500 }}
            >
              {article.shortAnswer}
            </p>
            {article.sections.map((s, sIdx) => (
              <div key={sIdx} style={{ marginTop: sIdx === 0 ? "16px" : "20px" }}>
                <h3
                  className="font-sans text-foreground"
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    letterSpacing: "-0.005em",
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  {s.title}
                </h3>
                {Array.isArray(s.body) ? (
                  s.body.every((b) => /^\s*(\d+\.|[-•])/.test(b)) ? (
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                      {s.body.map((b, j) => (
                        <li key={j} style={{ marginBottom: "6px" }}>
                          {b.replace(/^\s*(\d+\.|[-•])\s*/, "")}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    asParagraphs(s.body).map((p, j) => <p key={j}>{p}</p>)
                  )
                ) : (
                  <p>{s.body}</p>
                )}
              </div>
            ))}
            {i < articles.length - 1 && (
              <div
                aria-hidden
                style={{
                  height: "0.5px",
                  background: "hsl(var(--border))",
                  marginTop: "32px",
                }}
              />
            )}
          </ArticleSection>
        ))}

        <KeyTakeaway>{meta.takeaway}</KeyTakeaway>

        <ContinueLearning exclude={path} />
      </LearnShell>
    </>
  );
};

export default LearnGuideTemplate;
