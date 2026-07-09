import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { FAQ_ENTRIES } from "@/data/learn";

const HERO_STATEMENT =
  "Direct answers to the questions we receive most often, organized by topic. If you don't find your question here, contact us.";

const FaqRow = ({
  label,
  description,
  to,
}: {
  label: string;
  description: string;
  to: string;
}) => (
  <Link
    to={to}
    aria-label={label}
    className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99]"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "16px",
    }}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3
          className="font-sans font-semibold text-foreground"
          style={{ fontSize: "13.5px", lineHeight: "1.35", letterSpacing: "-0.01em" }}
        >
          {label}
        </h3>
        <p
          className="text-muted-foreground"
          style={{
            marginTop: "4px",
            fontSize: "12px",
            lineHeight: "1.5",
            maxWidth: "70ch",
          }}
        >
          {description}
        </p>
      </div>
      <span
        className="shrink-0 inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
        style={{ fontSize: "10px", letterSpacing: "0.06em", paddingTop: "2px" }}
      >
        Open
        <ChevronRight aria-hidden style={{ width: "11px", height: "11px", strokeWidth: 1.5 }} />
      </span>
    </div>
  </Link>
);

const LearnFaq = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Frequently Asked Questions — Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn/faq",
  };

  return (
    <>
      <PageMeta
        title="Frequently Asked Questions"
        description={HERO_STATEMENT}
        path="/learn/faq"
        jsonLd={jsonLd}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Learn · FAQ"
        title="Frequently Asked Questions"
        statement={HERO_STATEMENT}
        docId=""
      />

      <section style={{ paddingTop: "32px", paddingBottom: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <ul className="flex flex-col gap-3">
              {FAQ_ENTRIES.map((f) => (
                <li key={f.to}>
                  <FaqRow label={f.label} description={f.description} to={f.to} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <NextStep primary="contact" eyebrow="Don't see your question?" />
    </>
  );
};

export default LearnFaq;
