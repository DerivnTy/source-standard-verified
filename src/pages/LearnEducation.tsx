import { useEffect, useMemo, useState } from "react";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { PageSection, FeatureLink } from "@/components/system";
import {
  EDUCATION_ARTICLES,
  EDUCATION_TOPICS,
  EducationTopicId,
  educationArticlesByTopic,
} from "@/data/learn";


const HERO_STATEMENT =
  "Evergreen answers to the questions people ask before choosing a provider. Every article answers one question, plainly, and points you to the next useful step.";

type Filter = "all" | EducationTopicId;

const FILTER_TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...EDUCATION_TOPICS.map((t) => ({ id: t.id, label: t.label })),
];

const LearnEducation = () => {
  const initialHash =
    typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  const initialFilter =
    EDUCATION_TOPICS.some((t) => t.id === initialHash)
      ? (initialHash as EducationTopicId)
      : "all";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EDUCATION_ARTICLES.filter((a) => {
      if (filter !== "all" && a.topic !== filter) return false;
      if (!q) return true;
      return (
        a.question.toLowerCase().includes(q) ||
        a.shortAnswer.toLowerCase().includes(q) ||
        a.answersFor.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const visibleTopics =
    filter === "all"
      ? EDUCATION_TOPICS
      : EDUCATION_TOPICS.filter((t) => t.id === filter);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (EDUCATION_TOPICS.some((t) => t.id === hash)) {
        setFilter(hash as EducationTopicId);
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleTabClick = (id: Filter) => {
    setFilter(id);
    if (id === "all") {
      history.replaceState(null, "", window.location.pathname);
    } else {
      history.replaceState(null, "", `#${id}`);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Education, Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn/education",
  };

  return (
    <>
      <PageMeta
        title="Education"
        description={HERO_STATEMENT}
        path="/learn/education"
        jsonLd={jsonLd}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Learn · Education"
        title="Education"
        statement={HERO_STATEMENT}
        docId=""
      />

      {/* Sticky controls */}
      <div
        className="sticky z-30 bg-background/80 backdrop-blur-md border-b border-border/60"
        style={{ top: 0 }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3">
              <div className="flex items-center gap-3 flex-1 min-w-0 md:max-w-md">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search education…"
                  aria-label="Search education"
                  className="font-sans flex-1 min-w-0 text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                  style={{
                    height: "36px",
                    borderRadius: "20px",
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  }}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground shrink-0 tabular-nums">
                  {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                </span>
              </div>

              <nav className="flex items-center gap-2 flex-wrap" aria-label="Filter education">
                {FILTER_TABS.map((tab) => {
                  const active = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabClick(tab.id)}
                      aria-pressed={active}
                      className="inline-flex items-center justify-center font-sans font-semibold uppercase whitespace-nowrap transition-all active:scale-[0.97]"
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.06em",
                        height: "30px",
                        padding: "0 12px",
                        borderRadius: "20px",
                        border: "1px solid hsl(var(--border))",
                        backgroundColor: active ? "hsl(var(--foreground))" : "hsl(var(--card))",
                        color: active ? "hsl(var(--background))" : "hsl(var(--foreground) / 0.75)",
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Topic sections */}
      {visibleTopics.map((topic) => {
        const entries = educationArticlesByTopic(topic.id).filter((a) =>
          filtered.some((f) => f.slug === a.slug),
        );
        return (
          <div key={topic.id} id={topic.id} className="scroll-mt-24">
            <PageSection title={topic.label} intro={topic.description}>
              {entries.length === 0 ? (
                <p className="text-muted-foreground" style={{ fontSize: "14px" }}>
                  No articles match the current search.
                </p>
              ) : (
                <ul className="flex flex-col">
                  {entries.map((a, i) => (
                    <li
                      key={a.slug}
                      className={i > 0 ? "border-t border-border/40 pt-4 mt-4" : ""}
                    >
                      <Link
                        to={`/learn/education/${a.slug}`}
                        aria-label={a.question}
                        className="block group"
                      >
                        <FeatureItem
                          variant="block"
                          title={a.question}
                          desc={a.answersFor}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </PageSection>
          </div>
        );
      })}

      <NextStep primary="vendor-registry" />
    </>
  );
};

export default LearnEducation;
