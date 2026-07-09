import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { EDUCATION_ARTICLES, NEWS_ARTICLES } from "@/data/learn";

const HERO_STATEMENT =
  "The public education library from Source Standard. Consumer-first answers to the questions that come up before you choose a provider — and timely updates about what's changing in compounded therapy.";

const PILLARS: {
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  cta: string;
  meta: string;
}[] = [
  {
    eyebrow: "Evergreen",
    title: "Education",
    description:
      "Timeless answers to the questions people ask before they choose a provider. Organized by topic, written for consumers, updated when the facts change.",
    to: "/learn/education",
    cta: "Browse Education",
    meta: `${EDUCATION_ARTICLES.length} articles`,
  },
  {
    eyebrow: "Timely",
    title: "News & Insights",
    description:
      "Reporting, commentary, and regulatory updates on compounded medications. What changed, what it means, and where it does — and doesn't — affect consumers.",
    to: "/learn/news",
    cta: "Read News & Insights",
    meta: `${NEWS_ARTICLES.length} posts`,
  },
  {
    eyebrow: "Direct",
    title: "Frequently Asked Questions",
    description:
      "Structured answers to the direct questions we receive most often — legal, clinical, verification, and consumer diligence.",
    to: "/learn/faq",
    cta: "See the FAQ",
    meta: "4 topics",
  },
];

const PillarCard = ({ p }: { p: (typeof PILLARS)[number] }) => (
  <Link
    to={p.to}
    className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/30 active:scale-[0.995]"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "16px",
      padding: "28px",
    }}
  >
    <div className="flex items-start justify-between gap-3">
      <p
        className="font-mono uppercase text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.14em" }}
      >
        {p.eyebrow}
      </p>
      <p
        className="font-mono uppercase text-muted-foreground tabular-nums"
        style={{ fontSize: "10px", letterSpacing: "0.06em" }}
      >
        {p.meta}
      </p>
    </div>

    <h2
      className="t-section-title-sm text-foreground tracking-tight"
      style={{ marginTop: "10px" }}
    >
      {p.title}
    </h2>

    <p
      className="text-muted-foreground"
      style={{
        marginTop: "10px",
        fontSize: "13.5px",
        lineHeight: "1.55",
        maxWidth: "58ch",
      }}
    >
      {p.description}
    </p>

    <span
      className="inline-flex items-center gap-1 font-sans font-semibold text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
      style={{ marginTop: "18px", fontSize: "11.5px", letterSpacing: "-0.005em" }}
    >
      {p.cta}
      <ChevronRight aria-hidden style={{ width: "13px", height: "13px", strokeWidth: 1.75 }} />
    </span>
  </Link>
);

const Learn = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Learn — Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn",
  };

  return (
    <>
      <PageMeta
        title="Learn — Education, News & FAQ"
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

      <section style={{ paddingTop: "40px", paddingBottom: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: "16px" }}
            >
              {PILLARS.map((p) => (
                <PillarCard key={p.to} p={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <NextStep primary="vendor-registry" eyebrow="Ready to check a provider?" />
    </>
  );
};

export default Learn;
