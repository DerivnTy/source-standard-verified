import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import {
  ARTICLES,
  Article,
  CategoryId,
  findCategory,
  routeForArticle,
  sortArticles,
} from "@/data/resourceLibrary";

const PAGE_SUBTITLE =
  "Framework updates, educational resources, sourcing transparency articles, industry developments, and public-reference materials published by Source Standard.";

const READ_TIME_MIN = 5;
const PAGE_SIZE = 8;

type Filter = "all" | CategoryId;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "latest", label: "Latest" },
  { id: "core", label: "Core Reference" },
];

const headingForFilter = (filter: Filter): string => {
  switch (filter) {
    case "all":
      return "All Publications";
    case "latest":
      return "Latest Publications";
    case "core":
      return "Core Reference Library";
  }
};

const categoryTag = (id: CategoryId): string =>
  findCategory(id)?.label ?? "Publication";

const formatUpdated = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
};

const PublicationCard = ({ entry }: { entry: Article }) => (
  <article
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "16px",
      padding: "28px",
    }}
  >
    <div className="flex flex-col" style={{ rowGap: "12px" }}>
      <span
        className="font-mono uppercase text-muted-foreground"
        style={{ fontSize: "10.5px", letterSpacing: "0.12em" }}
      >
        {categoryTag(entry.category)}
      </span>

      <h3
        className="font-sans font-semibold text-foreground tracking-tight"
        style={{ fontSize: "18px", lineHeight: "1.25", letterSpacing: "-0.015em" }}
      >
        {entry.title}
      </h3>

      <p
        className="font-mono uppercase text-muted-foreground tabular-nums"
        style={{ fontSize: "10.5px", letterSpacing: "0.1em" }}
      >
        Updated {formatUpdated(entry.publishedAt)} · {READ_TIME_MIN} min read
      </p>

      <p
        className="font-sans text-muted-foreground"
        style={{ fontSize: "12px", lineHeight: "1.55" }}
      >
        {entry.blurb}
      </p>

      <div style={{ marginTop: "4px" }}>
        <Link
          to={routeForArticle(entry.slug)}
          className="inline-flex items-center gap-1 font-sans font-semibold text-[hsl(var(--primary))] hover:opacity-80 transition-opacity"
          style={{ fontSize: "11px", letterSpacing: "-0.005em" }}
        >
          View Article
          <ChevronRight aria-hidden style={{ width: "13px", height: "13px", strokeWidth: 1.75 }} />
        </Link>
      </div>
    </div>
  </article>
);

const SectionHeader = ({
  title,
  count,
}: {
  title: string;
  count: number;
}) => (
  <header className="flex items-baseline justify-between gap-4" style={{ marginBottom: "20px" }}>
    <h2 className="t-section-title-sm text-foreground tracking-tight">
      {title}
    </h2>
    <span
      className="font-mono uppercase text-muted-foreground tabular-nums shrink-0"
      style={{ fontSize: "10.5px", letterSpacing: "0.1em" }}
    >
      {count} {count === 1 ? "entry" : "entries"}
    </span>
  </header>
);

const LibraryPublications = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = ARTICLES.filter((a) => {
      if (filter !== "all" && a.category !== filter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.blurb.toLowerCase().includes(q)
      );
    });
    return sortArticles(list, "newest");
  }, [query, filter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const sectionTitle = headingForFilter(filter);

  const onFilterClick = (id: Filter) => {
    setFilter(id);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <PageMeta title={`${sectionTitle} · Resource Library`} description={PAGE_SUBTITLE} />

      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: sectionTitle },
        ]}
      />

      <div className="bg-background border-b border-border/60">
        <div className="page-shell py-3">
          <div className="mx-auto w-wide">
            <Link
              to="/education"
              className="inline-flex items-center gap-1.5 t-body-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              Back to Resource Library
            </Link>
          </div>
        </div>
      </div>

      <BriefingHero
        tone="navy"
        category="Resource Library"
        docId=""
        title={sectionTitle}
        statement={PAGE_SUBTITLE}
      />

      {/* Controls — search + filters */}
      <div className="bg-background border-b border-border/60">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3">
              <div
                className="flex items-center flex-1 min-w-0 md:max-w-md"
                style={{
                  height: "36px",
                  borderRadius: "20px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid hsl(var(--border))",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  gap: "8px",
                }}
              >
                <Search aria-hidden style={{ width: "14px", height: "14px", strokeWidth: 1.5 }} className="text-muted-foreground shrink-0" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  placeholder="Search publications…"
                  aria-label="Search publications"
                  className="font-sans flex-1 min-w-0 text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none bg-transparent"
                />
              </div>

              <nav className="flex items-center gap-2 flex-wrap" aria-label="Filter publications">
                {FILTERS.map((tab) => {
                  const active = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => onFilterClick(tab.id)}
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

      <div className="page-shell">
        <div className="mx-auto w-wide" style={{ paddingTop: "36px", paddingBottom: "56px" }}>
          {filtered.length === 0 ? (
            <div
              className="bg-card text-center t-body-sm text-muted-foreground"
              style={{
                border: "0.5px solid hsl(var(--border))",
                borderRadius: "12px",
                padding: "48px 20px",
              }}
            >
              No publications match the current search.
            </div>
          ) : (
            <section>
              <SectionHeader
                title={sectionTitle}
                count={filtered.length}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visible.map((entry) => (
                  <PublicationCard key={entry.slug} entry={entry} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center" style={{ marginTop: "32px" }}>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-1 font-sans font-semibold uppercase whitespace-nowrap transition-all active:scale-[0.97]"
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.06em",
                      height: "36px",
                      padding: "0 18px",
                      borderRadius: "20px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "#FFFFFF",
                      color: "hsl(var(--foreground) / 0.85)",
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default LibraryPublications;
