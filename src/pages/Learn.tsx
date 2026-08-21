import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";

import { LearnShell } from "@/components/learn/LearnShell";
import { PageSection, NavCard } from "@/components/system";

import {
  EDUCATION_TOPICS,
  NEWS_ARTICLES,
  NEWS_CATEGORIES,
} from "@/data/learn";
import { LEARN_HUB_LEAD, LEARN_HUB_TITLE } from "@/data/institutionalCopy";

const HERO_STATEMENT = LEARN_HUB_LEAD;

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
        title="Learn"
        description={HERO_STATEMENT}
        path="/learn"
        jsonLd={jsonLd}
      />

      <LearnShell section="home" crumbs={[]}>
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Learn"
        title={LEARN_HUB_TITLE}
        statement={HERO_STATEMENT}
        docId=""
      />

      {/* 1 — Start Here: primary learning path */}
      <PageSection title="Guides" first>
        <dl className="divide-y divide-border/60 border-t border-b border-border/60">
          {EDUCATION_TOPICS.map((t) => (
            <Link
              key={t.id}
              to={`/learn/${t.id}`}
              className="group grid grid-cols-[1fr_auto] md:grid-cols-[240px_1fr_auto] gap-x-6 gap-y-1 py-4 items-baseline hover:bg-muted/40 active:bg-muted/60 transition-colors"
              style={{ paddingLeft: "8px", paddingRight: "8px", marginLeft: "-8px", marginRight: "-8px" }}
            >
              <dt
                className="font-sans text-foreground group-hover:text-primary transition-colors col-span-1"
                style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0 }}
              >
                {t.label}
              </dt>
              <dd
                className="text-muted-foreground col-span-2 md:col-span-1 md:col-start-2"
                style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}
              >
                {t.description}
              </dd>
              <span
                aria-hidden
                className="text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 transition-all inline-flex items-center row-start-1 col-start-2 md:col-start-3 self-center"
              >
                <ChevronRight style={{ width: "14px", height: "14px", strokeWidth: 1.75 }} />
              </span>
            </Link>
          ))}
        </dl>
      </PageSection>

      {/* 2 — Browse by Resource: secondary browse layer */}
      <PageSection title="Other reference" compact>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <NavCard
            to="/learn/news"
            title="News & Insights"
            desc="Dated notes on regulatory and industry changes."
          />
          <NavCard
            to="/learn/faq"
            title="Frequently Asked Questions"
            desc="Short answers organized by legal, clinical, verification, and diligence topics."
          />
        </div>
      </PageSection>

      {/* 3 — Recent Updates */}
      <PageSection title="Recent Updates" compact>
        <ul className="flex flex-col divide-y divide-border/60 border-t border-b border-border/60" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {recent.map((a) => {
            const cat = NEWS_CATEGORIES.find((c) => c.id === a.category);
            return (
              <li key={a.slug}>
                <Link
                  to={`/learn/news/${a.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[160px_1fr] gap-x-6 gap-y-1 py-4 hover:bg-muted/40 active:bg-muted/60 transition-colors"
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

      {/* 4 — Still Have Questions? */}
      <PageSection last title="Further questions">
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "68ch", margin: 0 }}
        >
          Browse the{" "}
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
      </PageSection>

      </LearnShell>
    </>
  );
};

export default Learn;
