import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { PageSection, NavCard } from "@/components/system";

import {
  EDUCATION_ARTICLES,
  EDUCATION_TOPICS,
  NEWS_ARTICLES,
  NEWS_CATEGORIES,
} from "@/data/learn";

const HERO_STATEMENT =
  "Consumer-first answers to the questions that come up before you choose a provider, and timely updates about what's changing in compounded therapy.";

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

      {/* Directory — primary navigation, directly under the hero, no heading. */}
      <section className="border-b border-border bg-background" style={{ paddingTop: "24px", paddingBottom: "28px" }}>
        <div className="page-shell">
          <div className="mx-auto w-standard grid grid-cols-1 md:grid-cols-3 gap-3">
            <NavCard
              to="/learn/education"
              title="Education"
              desc={`Evergreen answers to the questions people ask before choosing a provider. ${EDUCATION_ARTICLES.length} ${EDUCATION_ARTICLES.length === 1 ? "article" : "articles"}.`}
            />
            <NavCard
              to="/learn/news"
              title="News & Insights"
              desc={`Reporting, commentary, and regulatory updates. ${NEWS_ARTICLES.length} ${NEWS_ARTICLES.length === 1 ? "post" : "posts"}.`}
            />
            <NavCard
              to="/learn/faq"
              title="Frequently Asked Questions"
              desc="Direct answers to the questions we receive most often, organized by topic."
            />
          </div>
        </div>
      </section>

      {/* Education topics — vertical definition list, not a feature grid. */}
      <PageSection title="Start with the basics" compact>
        <dl className="divide-y divide-border/60 border-t border-b border-border/60">
          {EDUCATION_TOPICS.map((t) => (
            <Link
              key={t.id}
              to={`/learn/education#${t.id}`}
              className="group grid grid-cols-1 md:grid-cols-[240px_1fr_auto] gap-x-6 gap-y-1 py-3.5 items-baseline hover:bg-muted/40 transition-colors"
              style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
            >
              <dt
                className="font-sans text-foreground group-hover:text-primary transition-colors"
                style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0 }}
              >
                {t.label}
              </dt>
              <dd
                className="text-muted-foreground"
                style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}
              >
                {t.description}
              </dd>
              <span
                aria-hidden
                className="text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 transition-all font-mono hidden md:inline"
                style={{ fontSize: "14px" }}
              >
                ›
              </span>
            </Link>
          ))}
        </dl>
      </PageSection>

      {/* Recent updates — chronological. Dateline in mono margin. */}
      <PageSection title="Recent updates" compact>
        <ul className="flex flex-col divide-y divide-border/60 border-t border-b border-border/60" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {recent.map((a) => {
            const cat = NEWS_CATEGORIES.find((c) => c.id === a.category);
            return (
              <li key={a.slug}>
                <Link
                  to={`/learn/news/${a.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[160px_1fr] gap-x-6 gap-y-1 py-4 hover:bg-muted/40 transition-colors"
                  style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
                >
                  <div
                    className="font-mono uppercase text-muted-foreground/80"
                    style={{ fontSize: "10px", letterSpacing: "0.12em", paddingTop: "4px" }}
                  >
                    {formatDate(a.dateline)}
                    {cat?.label ? <span> · {cat.label}</span> : null}
                  </div>
                  <div>
                    <h3
                      className="font-sans text-foreground group-hover:text-primary transition-colors"
                      style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0, lineHeight: 1.35 }}
                    >
                      {a.headline}
                    </h3>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "14px", lineHeight: 1.55, marginTop: "4px", marginBottom: 0 }}
                    >
                      {a.standfirst}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </PageSection>

      {/* Footer sentence — collapsed from a section. */}
      <section className="border-b border-border bg-background" style={{ paddingTop: "20px", paddingBottom: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <p
              className="text-muted-foreground"
              style={{ fontSize: "14px", lineHeight: 1.65, margin: 0 }}
            >
              Still have questions? Browse the{" "}
              <Link
                to="/learn/faq"
                className="text-foreground hover:text-primary transition-colors"
                style={{ textDecoration: "underline", textDecorationThickness: "0.5px", textUnderlineOffset: "3px" }}
              >
                FAQ
              </Link>{" "}
              or{" "}
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors"
                style={{ textDecoration: "underline", textDecorationThickness: "0.5px", textUnderlineOffset: "3px" }}
              >
                contact Source Standard
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <NextStep primary="vendor-registry" eyebrow="Ready to check a provider?" />
    </>
  );
};

export default Learn;
