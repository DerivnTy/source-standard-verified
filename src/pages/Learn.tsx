import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { PageSection, NavCard, FeatureItem } from "@/components/system";
import {
  EDUCATION_ARTICLES,
  EDUCATION_TOPICS,
  NEWS_ARTICLES,
  NEWS_CATEGORIES,
} from "@/data/learn";

const HERO_STATEMENT =
  "The public education library from Source Standard. Consumer-first answers to the questions that come up before you choose a provider, and timely updates about what's changing in compounded therapy.";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Learn = () => {
  const recent = [...NEWS_ARTICLES]
    .sort((a, b) => new Date(b.dateline).getTime() - new Date(a.dateline).getTime())
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Learn, Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn",
  };

  return (
    <>
      <PageMeta
        title="Learn, Education, News & FAQ"
        description={HERO_STATEMENT}
        path="/learn"
        jsonLd={jsonLd}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Learn"
        title="What do I need to know before choosing a provider?"
        statement={HERO_STATEMENT}
        docId=""
      />

      <PageSection
        title="Where do you want to start?"
        intro="Three ways to learn about compounded medications and how Source Standard verifies the pharmacies behind them."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <NavCard
            to="/learn/education"
            title="Education"
            desc={`Evergreen answers to the questions people ask before choosing a provider. ${EDUCATION_ARTICLES.length} articles.`}
          />
          <NavCard
            to="/learn/news"
            title="News & Insights"
            desc={`Reporting, commentary, and regulatory updates. ${NEWS_ARTICLES.length} posts.`}
          />
          <NavCard
            to="/learn/faq"
            title="Frequently Asked Questions"
            desc="Direct answers to the questions we receive most often, organized by topic."
          />
        </div>
      </PageSection>

      <PageSection
        title="Start with the basics"
        intro="Four consumer-first categories cover everything from what compounding is to how verification works."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {EDUCATION_TOPICS.map((t) => (
            <Link
              key={t.id}
              to={`/learn/education#${t.id}`}
              className="block group"
            >
              <FeatureItem
                variant="block"
                title={t.label}
                desc={t.description}
              />
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Recent updates"
        intro="What's changing in compounded therapy, and what it means for consumers."
      >
        <ul className="flex flex-col">
          {recent.map((a, i) => {
            const cat = NEWS_CATEGORIES.find((c) => c.id === a.category);
            return (
              <li
                key={a.slug}
                className={i > 0 ? "border-t border-border/40 pt-4 mt-4" : ""}
              >
                <Link to={`/learn/news/${a.slug}`} className="block group">
                  <p
                    className="font-mono uppercase text-muted-foreground tabular-nums"
                    style={{ fontSize: "10px", letterSpacing: "0.08em" }}
                  >
                    {formatDate(a.dateline)} · {cat?.label ?? ""}
                  </p>
                  <div style={{ marginTop: "4px" }}>
                    <FeatureItem
                      variant="block"
                      title={a.headline}
                      desc={a.standfirst}
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </PageSection>

      <PageSection
        title="Still have questions?"
        intro="Browse the FAQ or reach the Source Standard team directly."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <NavCard
            to="/learn/faq"
            title="Frequently Asked Questions"
            desc="Legal, clinical, verification, and consumer diligence, answered."
          />
          <NavCard
            to="/contact"
            title="Contact Source Standard"
            desc="Ask a question that isn't covered in the library."
          />
        </div>
      </PageSection>

      <NextStep primary="vendor-registry" eyebrow="Ready to check a provider?" />
    </>
  );
};

export default Learn;
