import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { LearnShell } from "@/components/learn/LearnShell";
import { ContinueLearning } from "@/components/learn/ContinueLearning";
import { PageSection } from "@/components/system";
import { absoluteUrl } from "@/lib/siteUrl";
import {
  ACTIVE_LIBRARY_TOPICS,
  LIBRARY_ITEMS,
  type LibraryTopic,
} from "@/data/contentLibrary";

const HERO_STATEMENT =
  "One library for every Source Standard article: reporting, research, regulatory developments, recalls, testing analysis, and sourcing guidance.";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

type Filter = "All" | LibraryTopic;

const FilterPill = ({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className="font-sans uppercase transition-colors"
    style={{
      borderRadius: "20px",
      border: "1px solid",
      borderColor: active ? "hsl(var(--navy-surface))" : "hsl(var(--border))",
      background: active ? "hsl(var(--navy-surface))" : "transparent",
      color: active ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.08em",
      padding: "7px 14px",
      whiteSpace: "nowrap",
    }}
  >
    {label} <span style={{ opacity: 0.6 }}>{count}</span>
  </button>
);

/**
 * News & Insights — the single public destination for every article.
 *
 * The internal taxonomy (clusters, intelligence categories, news categories)
 * still drives SEO, schema, and related content. Here it is reduced to a flat
 * filter strip so readers browse one library instead of several sections.
 */
const LearnNews = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const items = useMemo(
    () => (filter === "All" ? LIBRARY_ITEMS : LIBRARY_ITEMS.filter((i) => i.topic === filter)),
    [filter],
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "News & Insights, Source Standard",
    description: HERO_STATEMENT,
    url: absoluteUrl("/learn/news"),
    hasPart: LIBRARY_ITEMS.map((i) => ({
      "@type": "Article",
      headline: i.title,
      description: i.summary,
      datePublished: i.date,
      url: absoluteUrl(i.to),
    })),
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
        crumbs={[{ label: "Learn", to: "/learn" }, { label: "News & Insights" }]}
      >
        <BriefingHero
          tone="navy"
          variant="chapter"
          category="Learn · News & Insights"
          title="News & Insights"
          statement={HERO_STATEMENT}
          docId=""
        />

        <PageSection
          title="Browse the library"
          intro="Filter in place. Every article stays in one library; topics are a lens, not a separate section."
          first
        >
          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="All"
              count={LIBRARY_ITEMS.length}
              active={filter === "All"}
              onClick={() => setFilter("All")}
            />
            {ACTIVE_LIBRARY_TOPICS.map((t) => (
              <FilterPill
                key={t}
                label={t}
                count={LIBRARY_ITEMS.filter((i) => i.topic === t).length}
                active={filter === t}
                onClick={() => setFilter(t)}
              />
            ))}
          </div>

          <ul
            className="mt-6 flex flex-col divide-y divide-border/60 border-t border-b border-border/60"
            style={{ listStyle: "none", padding: 0, margin: "24px 0 0" }}
          >
            {items.map((a) => (
              <li key={a.to}>
                <Link
                  to={a.to}
                  className="group grid grid-cols-1 md:grid-cols-[190px_1fr] gap-x-6 gap-y-1 py-4 hover:bg-muted/40 active:bg-muted/60 transition-colors"
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    marginLeft: "-8px",
                    marginRight: "-8px",
                  }}
                >
                  <div
                    className="font-mono uppercase text-muted-foreground/80"
                    style={{ fontSize: "10px", letterSpacing: "0.12em", paddingTop: "4px" }}
                  >
                    {formatDate(a.date)}
                    <span> · {a.topic}</span>
                  </div>
                  <div>
                    <h3
                      className="font-sans text-foreground group-hover:text-primary transition-colors"
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        letterSpacing: "-0.005em",
                        margin: 0,
                        lineHeight: 1.35,
                      }}
                    >
                      {a.title}
                    </h3>
                    <p
                      className="text-muted-foreground"
                      style={{ fontSize: "14px", lineHeight: 1.55, marginTop: "4px", marginBottom: 0 }}
                    >
                      {a.summary}
                    </p>
                    {a.sourceLabel && (
                      <p
                        className="font-mono uppercase text-muted-foreground/70"
                        style={{ fontSize: "10px", letterSpacing: "0.1em", margin: "6px 0 0" }}
                      >
                        Source: {a.sourceLabel}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>

        <ContinueLearning exclude="/learn/news" />
      </LearnShell>
    </>
  );
};

export default LearnNews;
