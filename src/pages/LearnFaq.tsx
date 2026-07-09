import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { PageSection, FeatureItem } from "@/components/system";
import { FAQ_ENTRIES } from "@/data/learn";

const HERO_STATEMENT =
  "Direct answers to the questions we receive most often, organized by topic. If you don't find your question here, contact us.";

const LearnFaq = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Frequently Asked Questions, Source Standard",
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

      <PageSection
        title="Browse by topic"
        intro="Four topic sets cover the questions we hear most often."
      >
        <ul className="flex flex-col">
          {FAQ_ENTRIES.map((f, i) => (
            <li
              key={f.to}
              className={i > 0 ? "border-t border-border/40 pt-4 mt-4" : ""}
            >
              <Link to={f.to} aria-label={f.label} className="block group">
                <FeatureItem
                  variant="block"
                  title={f.label}
                  desc={f.description}
                />
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <NextStep primary="contact" eyebrow="Don't see your question?" />
    </>
  );
};

export default LearnFaq;
