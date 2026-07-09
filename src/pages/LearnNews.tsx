import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { NextStep } from "@/components/learn/NextStep";
import { NEWS_ARTICLES, NEWS_CATEGORIES, NewsCategoryId } from "@/data/learn";

const HERO_STATEMENT =
  "Timely reporting and analysis on compounded medications, regulatory changes, industry developments, and updates from Source Standard.";

type Filter = "all" | NewsCategoryId;

const FILTER_TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" }...NEWS_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const NewsRow = ({
  slug,
  headline,
  standfirst,
  dateline,
  category,
}: {
  slug: string;
  headline: string;
  standfirst: string;
  dateline: string;
  category: string;
}) => (
  <Link
    to={`/learn/news/${slug}`}
    aria-label={headline}
    className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99]"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "16px",
    }}
  >
    <p
      className="font-mono uppercase text-muted-foreground tabular-nums"
      style={{ fontSize: "10px", letterSpacing: "0.08em" }}
    >
      {formatDate(dateline)} · {category}
    </p>
    <h3
      className="font-sans font-semibold text-foreground"
      style={{
        marginTop: "6px",
        fontSize: "14.5px",
        lineHeight: "1.3",
        letterSpacing: "-0.01em",
      }}
    >
      {headline}
    </h3>
    <p
      className="text-muted-foreground"
      style={{
        marginTop: "6px",
        fontSize: "12.5px",
        lineHeight: "1.5",
        maxWidth: "70ch",
      }}
    >
      {standfirst}
    </p>
    <span
      className="inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
      style={{ marginTop: "10px", fontSize: "10px", letterSpacing: "0.06em" }}
    >
      Read
      <ChevronRight aria-hidden style={{ width: "11px", height: "11px", strokeWidth: 1.5 }} />
    </span>
  </Link>
);

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

      <div className="bg-background border-b border-border/60">
        <div className="page-shell">
          <div className="mx-auto w-wide">
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

      <section style={{ paddingTop: "32px", paddingBottom: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-wide">
            {filtered.length === 0 ? (
              <div
                className="bg-card text-center t-body-sm text-muted-foreground"
                style={{
                  border: "0.5px solid hsl(var(--border))",
                  borderRadius: "12px",
                  padding: "40px 20px",
                }}
              >
                No posts in this category yet.
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {filtered.map((a) => {
                  const cat = NEWS_CATEGORIES.find((c) => c.id === a.category);
                  return (
                    <li key={a.slug}>
                      <NewsRow
                        slug={a.slug}
                        headline={a.headline}
                        standfirst={a.standfirst}
                        dateline={a.dateline}
                        category={cat?.label ?? ""}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>

      <NextStep primary="learn-education" eyebrow="Want the fundamentals?" />
    </>
  );
};

export default LearnNews;
