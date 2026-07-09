import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
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

const ArticleRow = ({
  slug,
  question,
  answersFor,
}: {
  slug: string;
  question: string;
  answersFor: string;
}) => (
  <Link
    to={`/learn/education/${slug}`}
    aria-label={question}
    className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99]"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "14px 16px",
    }}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3
          className="font-sans font-semibold text-foreground"
          style={{ fontSize: "13.5px", lineHeight: "1.35", letterSpacing: "-0.01em" }}
        >
          {question}
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
          {answersFor}
        </p>
      </div>
      <span
        className="shrink-0 inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
        style={{ fontSize: "10px", letterSpacing: "0.06em", paddingTop: "2px" }}
      >
        Read
        <ChevronRight aria-hidden style={{ width: "11px", height: "11px", strokeWidth: 1.5 }} />
      </span>
    </div>
  </Link>
);

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

      {/* Controls */}
      <div className="bg-background border-b border-border/60">
        <div className="page-shell">
          <div className="mx-auto w-wide">
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
                    backgroundColor: "#FFFFFF",
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
                        backgroundColor: active ? "hsl(var(--foreground))" : "#FFFFFF",
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

      {/* Topic blocks */}
      <div className="page-shell">
        {visibleTopics.map((topic) => {
          const entries = educationArticlesByTopic(topic.id).filter((a) =>
            filtered.some((f) => f.slug === a.slug),
          );
          return (
            <section
              key={topic.id}
              id={topic.id}
              className="border-b border-border/40 scroll-mt-36"
              style={{ paddingTop: "36px", paddingBottom: "28px" }}
            >
              <div className="mx-auto w-wide">
                <div className="grid grid-cols-12 gap-x-8 gap-y-6">
                  <div className="col-span-12 md:col-span-4">
                    <h2 className="t-section-title-sm text-foreground tracking-tight">
                      {topic.label}
                    </h2>
                    <p className="mt-2 t-body-sm text-muted-foreground leading-[1.55] max-w-[42ch]">
                      {topic.description}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    {entries.length === 0 ? (
                      <div
                        className="bg-card text-center t-body-sm text-muted-foreground"
                        style={{
                          border: "0.5px solid hsl(var(--border))",
                          borderRadius: "12px",
                          padding: "28px 20px",
                        }}
                      >
                        No articles match the current search.
                      </div>
                    ) : (
                      <ul className="flex flex-col gap-2">
                        {entries.map((a) => (
                          <li key={a.slug}>
                            <ArticleRow
                              slug={a.slug}
                              question={a.question}
                              answersFor={a.answersFor}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <NextStep primary="vendor-registry" />
    </>
  );
};

export default LearnEducation;
