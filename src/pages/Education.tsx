import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ArticleRow } from "@/components/library/ArticleRow";
import { BriefingHero } from "@/components/BriefingHero";
import {
  ARTICLES,
  CATEGORIES,
  Category,
  CategoryId,
  articlesByCategory,
  sortArticles,
} from "@/data/resourceLibrary";

const HERO_DESCRIPTION =
  "Clinical, regulatory, and documentation reference for compounded therapy sourcing, pharmacy standards, and consumer due diligence. Materials are reviewed for accuracy, scope, and public-reference clarity.";

const COMMON_INQUIRIES: {
  label: string;
  description: string;
  to: string;
}[] = [
  {
    label: "Legal",
    description:
      "Statutory framework, public records, vendor contracts, and lawful access boundaries.",
    to: "/library/faq/legal-regulatory",
  },
  {
    label: "Safety",
    description:
      "How Source Standard discusses handling, documentation, and product claims without guaranteeing outcomes.",
    to: "/library/faq/clinical-safety",
  },
  {
    label: "Verification",
    description:
      "How vendors, documentation trails, and upstream facility records are reviewed.",
    to: "/library/faq/verification-process",
  },
  {
    label: "Diligence",
    description: "Public-facing checks before relying on a vendor sourcing claim.",
    to: "/education/questions#due-diligence",
  },
];

const PREVIEW_LIMIT = 4;

const FILTER_TABS: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "regulation", label: "Regulation" },
  { id: "clinical", label: "Clinical" },
  { id: "consumer", label: "Consumer" },
];


const CategoryBlock = ({
  category,
  entries,
}: {
  category: Category;
  entries: ReturnType<typeof articlesByCategory>;
}) => {
  const visible = entries.slice(0, PREVIEW_LIMIT);

  return (
    <section
      id={category.id}
      className="section-pad border-b border-border/40 scroll-mt-36"
    >
      <div className="mx-auto w-wide">
        <div className="grid grid-cols-12 gap-x-8 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <h2 className="t-section-title-sm text-foreground tracking-tight">
              {category.label}
            </h2>
            <p className="mt-3 t-body-md text-muted-foreground leading-[1.6] max-w-[42ch]">
              {category.description}
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </p>
          </div>

          <div className="col-span-12 md:col-span-8">
            {entries.length === 0 ? (
              <div className="border border-border/60 px-5 py-10 text-center t-body-sm text-muted-foreground">
                No entries match the current search.
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {visible.map((e) => (
                  <li key={e.slug}>
                    <ArticleRow entry={e} />
                  </li>
                ))}
              </ul>
            )}

            {entries.length > 0 && (
              <div className="mt-5">
                <Link
                  to={category.path}
                  className="inline-block t-body-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  View all {category.label} entries
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

type Filter = "all" | CategoryId;

const Education = () => {
  const initialHash =
    typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  const initialFilter = CATEGORIES.some((c) => c.id === initialHash)
    ? (initialHash as Filter)
    : "all";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      if (filter !== "all" && a.category !== filter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.blurb.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const byCategory = (id: CategoryId) =>
    sortArticles(
      filtered.filter((a) => a.category === id),
      "newest",
    );

  const visibleCategories =
    filter === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === filter);

  const totalCount = filtered.length;

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (CATEGORIES.some((c) => c.id === hash)) {
        setFilter(hash as Filter);
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

  return (
    <>
      <Breadcrumb items={[{ label: "Resource Library" }]} />

      <PageMeta title="Resource Library" description={HERO_DESCRIPTION} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Reference Library"
        title="Resource Library"
        statement={HERO_DESCRIPTION}
        docId=""
      />

      {/* §2 Library controls — sticky bar */}
      <div className="sticky top-[var(--utility-bar-height,3.5rem)] z-20 bg-background/95 backdrop-blur border-b border-border/60">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3">
              <div className="flex items-center gap-3 flex-1 min-w-0 md:max-w-md">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search library…"
                  aria-label="Search library"
                  className="font-sans flex-1 min-w-0 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                  style={{
                    height: "36px",
                    borderRadius: "20px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid hsl(var(--border))",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                  }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground shrink-0 tabular-nums">
                  {totalCount} {totalCount === 1 ? "result" : "results"}
                </span>
              </div>

              <nav
                className="flex items-center gap-2 flex-wrap"
                aria-label="Filter library"
              >
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

      {/* §3–§5 Categories */}
      <div className="page-shell">
        {visibleCategories.map((c) => (
          <CategoryBlock
            key={c.id}
            category={c}
            entries={byCategory(c.id)}
          />
        ))}
      </div>

      {/* §6 Common Inquiries */}
      <section
        id="common-inquiries"
        className="section-pad border-b border-border/40"
      >
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <div className="grid grid-cols-12 gap-x-8 gap-y-8">
              <div className="col-span-12 md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Reference Questions
                </p>
                <h2 className="mt-3 t-section-title-sm text-foreground tracking-tight">
                  Common Inquiries
                </h2>
                <p className="mt-3 t-body-md text-muted-foreground leading-[1.6] max-w-[42ch]">
                  Recorded answers to recurring questions, organized by topic.
                </p>
              </div>

              <div className="col-span-12 md:col-span-8">
                <ul className="border-y border-border/60 divide-y divide-border/60">
                  {COMMON_INQUIRIES.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="group grid grid-cols-12 gap-4 items-center px-5 py-4 transition-colors hover:bg-surface-muted"
                      >
                        <div className="col-span-12 md:col-span-3">
                          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground group-hover:text-foreground transition-colors">
                            {item.label}
                          </span>
                        </div>
                        <div className="col-span-12 md:col-span-7">
                          <p className="t-body-sm text-foreground/85 leading-[1.55]">
                            {item.description}
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-2 md:text-right">
                          <span className="t-body-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            View
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §7 Editorial Pipeline */}
      <section className="section-pad border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <div className="max-w-[60ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Forthcoming
              </p>
              <h2 className="mt-3 t-section-title-sm text-foreground tracking-tight">
                Editorial Pipeline
              </h2>
              <p className="mt-4 t-body-md text-muted-foreground leading-[1.6]">
                Additional reference formats are in development, including
                video explainers, Board-reviewed articles, and the 2026
                Integrity Ledger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §8 Closing statement */}
      <section className="section-pad border-t border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <div className="max-w-[60ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Conclusion
              </p>
              <h2 className="mt-3 t-section-title-sm text-foreground tracking-tight">
                A working reference, not a content feed.
              </h2>
              <p className="mt-4 t-body-md text-muted-foreground leading-[1.6]">
                The Resource Library exists to help clinicians, consumers, and
                listed entities interpret sourcing, regulation, and
                verification through a consistent public-reference standard.
                It is maintained as part of the broader framework, not as a
                standalone publishing channel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
