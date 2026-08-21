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
    title: "Learn the Basics",
    lead: "The starting point for compounded medication. Plain-language answers to what compounding is, what peptides are, and why the pharmacy behind a product matters more than the marketing around it.",
    takeaway:
      "Compounded medications are not FDA-approved products. Quality rests on the pharmacy that prepares them, and the pharmacy's name is the single most useful fact about any compounded product.",
  },
  verification: {
    title: "Verification Guide",
    lead: "Everything Source Standard's verification covers, in one place. What Verified means, what a review looks like, how Greenlisted status works, and why facility records are the accountable layer.",
    takeaway:
      "Verification narrows what you have to trust. It documents the pharmacy behind a product against public records — it does not endorse the product itself or replace clinical judgment.",
  },
  "choosing-a-provider": {
    title: "Provider Guide",
    lead: "How to identify a trustworthy provider. The four questions to ask, the specifics they should be able to name, the documentation you should expect, and the warning signs when they can't.",
    takeaway:
      "A trustworthy provider names the pharmacy behind your medication, discloses its regulatory category, and produces documentation on request. Vague sourcing language is itself an answer.",
  },
  "sourcing-and-manufacturing": {
    title: "Sourcing Guide",
    lead: "Where compounded medications actually come from. The regulatory categories (503A and 503B), how sterile compounding differs, how to read a certificate of analysis, and why sourcing is the most useful reference point for any compounded product.",
    takeaway:
      "The clinic is usually not the maker. The pharmacy that prepares a compounded medication is the accountable party, and its regulatory category, license, and documentation are the layer worth checking.",
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
        title={`${meta.title} — Source Standard`}
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
