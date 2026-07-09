import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { PageSection } from "@/components/system";
import { NEWS_ARTICLES, NEWS_CATEGORIES, NewsCategoryId } from "@/data/learn";

const HERO_STATEMENT =
  "Timely reporting and analysis on compounded medications, regulatory changes, industry developments, and updates from Source Standard.";

type Filter = "all" | NewsCategoryId;

const FILTER_TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...NEWS_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const LearnNews = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const sorted = useMemo(
    () =>
      [...NEWS_ARTICLES].sort(
        (a, b) => new Date(b.dateline).getTime() - new Date(a.dateline).getTime(),
      ),
    [],
  );

  const filtered = filter === "all" ? sorted : sorted.filter((a) => a.category === filter);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Insights, Source Standard",
    description: HERO_STATEMENT,
    url: "https://www.sourcestandard.org/learn/news",
  };

  return (
    <>
      <PageMeta
        title="News & Insights"
        description={HERO_STATEMENT}
        path="/learn/news"
        jsonLd={jsonLd}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Learn · News & Insights"
        title="News & Insights"
        statement={HERO_STATEMENT}
        docId=""
      />

      <div
        className="sticky z-30 bg-background/80 backdrop-blur-md border-b border-border/60"
        style={{ top: 0 }}
      >
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <div className="flex items-center justify-between gap-3 py-3 flex-wrap">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground tabular-nums">
                {filtered.length} {filtered.length === 1 ? "post" : "posts"}
              </span>
              <nav className="flex items-center gap-2 flex-wrap" aria-label="Filter news">
                {FILTER_TABS.map((tab) => {
                  const active = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFilter(tab.id)}
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

      <PageSection title="Latest" intro="Newest first. Reporting, analysis, and platform updates.">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground" style={{ fontSize: "14px" }}>
            No posts in this category yet.
          </p>
        ) : (
          <ul className="flex flex-col">
            {filtered.map((a, i) => {
              const cat = NEWS_CATEGORIES.find((c) => c.id === a.category);
              return (
                <li
                  key={a.slug}
                  className={i > 0 ? "border-t border-border/40 pt-5 mt-5" : ""}
                >
                  <Link
                    to={`/learn/news/${a.slug}`}
                    aria-label={a.headline}
                    className="block group"
                  >
                    <p
                      className="font-mono uppercase text-muted-foreground tabular-nums"
                      style={{ fontSize: "10px", letterSpacing: "0.08em" }}
                    >
                      {formatDate(a.dateline)} · {cat?.label ?? ""}
                    </p>
                    <h3
                      className="font-sans text-foreground group-hover:text-primary transition-colors"
                      style={{
                        marginTop: "6px",
                        fontSize: "16px",
                        lineHeight: 1.3,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {a.headline}
                    </h3>
                    <p
                      className="text-muted-foreground"
                      style={{
                        marginTop: "6px",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        maxWidth: "70ch",
                      }}
                    >
                      {a.standfirst}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </PageSection>

      <NextStep primary="learn-education" eyebrow="Want the fundamentals?" />
    </>
  );
};

export default LearnNews;
