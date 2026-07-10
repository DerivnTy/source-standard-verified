import { useMemo, useState } from "react";

import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { LearnShell } from "@/components/learn/LearnShell";
import { ArticleCard } from "@/components/learn/ArticleCard";
import { BrowseStrip } from "@/components/learn/BrowseStrip";
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

      <LearnShell
        section="news"
        crumbs={[
          { label: "Learn", to: "/learn" },
          { label: "News & Insights" },
        ]}
      >
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((a) => {
                const cat = NEWS_CATEGORIES.find((c) => c.id === a.category);
                return (
                  <ArticleCard
                    key={a.slug}
                    to={`/learn/news/${a.slug}`}
                    eyebrow={cat?.label}
                    title={a.headline}
                    description={a.standfirst}
                    meta={formatDate(a.dateline)}
                  />
                );
              })}
            </div>
          )}
        </PageSection>

        <BrowseStrip
          eyebrow="Continue in Learn"
          primary={{ to: "/learn/education", label: "Browse Education" }}
          secondary={[
            { to: "/learn/faq", label: "FAQ" },
            { to: "/learn", label: "Learn overview" },
          ]}
        />
      </LearnShell>
    </>
  );
};

export default LearnNews;
