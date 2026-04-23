import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { ArticleRow } from "@/components/library/ArticleRow";
import {
  ARTICLES,
  CATEGORIES,
  Category,
  CategoryId,
  articlesByCategory,
  sortArticles,
} from "@/data/resourceLibrary";

const FAQ_BUTTONS: { label: string; to: string }[] = [
  { label: "Legal", to: "/library/faq/legal-regulatory" },
  { label: "Safety", to: "/library/faq/clinical-safety" },
  { label: "Verification", to: "/library/faq/verification-process" },
  { label: "Diligence", to: "/education/questions#due-diligence" },
];

const PREVIEW_LIMIT = 5;

const CategoryBlock = ({
  category,
  entries,
}: {
  category: Category;
  entries: ReturnType<typeof articlesByCategory>;
}) => {
  const visible = entries.slice(0, PREVIEW_LIMIT);
  const showViewAllRow = entries.length > 0;

  return (
    <section
      id={category.id}
      className="rounded-md border border-border bg-card shadow-sm overflow-hidden scroll-mt-36"
    >
      <header className="px-5 py-4 border-b border-border bg-surface-muted/50 flex items-baseline justify-between gap-4">
        <div>
          <h2 className="t-body-md font-semibold text-foreground tracking-tight">
            {category.label}
          </h2>
          <p className="mt-1 t-body-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground shrink-0">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </span>
      </header>

      {entries.length === 0 ? (
        <div className="px-5 py-10 text-center t-body-sm text-muted-foreground">
          No entries match the current search.
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {visible.map((e) => (
            <ArticleRow key={e.slug} entry={e} />
          ))}
        </ul>
      )}

      {showViewAllRow && (
        <Link
          to={category.path}
          className="block border-t border-border bg-surface-muted/30 px-5 py-4 text-left t-body-sm font-semibold text-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          View all {category.label} entries →
        </Link>
      )}
    </section>
  );
};

type Filter = "all" | CategoryId;

const Education = () => {
  const initialHash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
  const initialFilter = CATEGORIES.some((c) => c.id === initialHash) ? (initialHash as Filter) : "all";
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

  return (
    <>
      <Breadcrumb items={[{ label: "Resource Library" }]} />

      <PageMeta
        title="Resource Library · Source Standard"
        description="Clinical and regulatory reference for peptide sourcing, pharmacy standards, and patient due diligence. All materials are reviewed by the Medical Advisory Board."
      />

      <BriefingHero
        tone="navy"
        category="Resource Library"
        docId=""
        title="Resource Library"
        statement="Clinical and regulatory reference for peptide sourcing, pharmacy standards, and patient due diligence. All materials are reviewed by the Medical Advisory Board."
      />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            {/* Global peer-review badge */}
            <div className="-mt-5 md:-mt-6 relative z-10 mb-4 flex justify-end">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card shadow-sm px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-verified"
                  strokeWidth={2.25}
                  aria-hidden
                />
                All content peer-reviewed by the Medical Advisory Board
              </span>
            </div>

            {/* Search bar */}
            <div className="rounded-md border border-border bg-card shadow-sm">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search
                  className="h-4 w-4 text-muted-foreground shrink-0"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search library…"
                  aria-label="Search library"
                  className="flex-1 bg-transparent border-0 outline-none t-body-md text-foreground placeholder:text-muted-foreground"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground shrink-0">
                  {totalCount} {totalCount === 1 ? "result" : "results"}
                </span>
              </div>

              {/* Filter chips — toggle filter AND smooth-scroll to that section */}
              <div className="flex flex-wrap items-center gap-2 px-4 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setFilter("all");
                    history.replaceState(null, "", window.location.pathname);
                  }}
                  className={
                    "rounded-md border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors " +
                    (filter === "all"
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:bg-surface-muted hover:text-foreground")
                  }
                  aria-pressed={filter === "all"}
                >
                  All
                </button>
                {CATEGORIES.map((c) => {
                  const active = filter === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setFilter(c.id);
                        history.replaceState(null, "", `#${c.id}`);
                        requestAnimationFrame(() => {
                          const el = document.getElementById(c.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        });
                      }}
                      className={
                        "rounded-md border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors " +
                        (active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-card text-muted-foreground hover:bg-surface-muted hover:text-foreground")
                      }
                      aria-pressed={active}
                    >
                      {c.short}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vertical stacked index */}
            <div className="mt-5 flex flex-col gap-5 pb-12 md:pb-14">
              {visibleCategories.map((c) => (
                <CategoryBlock
                  key={c.id}
                  category={c}
                  entries={byCategory(c.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Common Inquiries */}
      <section className="bg-surface-muted/60 border-y border-border" id="questions">
        <div className="page-shell py-12 md:py-14">
          <div className="mx-auto w-wide">
            <div className="mb-8 max-w-[60ch]">
              <h2 className="t-section-title-sm text-foreground">
                Common Inquiries
              </h2>
              <p className="mt-3 t-body-md text-muted-foreground">
                Recorded answers to recurring questions, organized by category.
              </p>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {FAQ_BUTTONS.map((b) => (
                <li key={b.label}>
                  <Link
                    to={b.to}
                    className="group flex items-center justify-between rounded-md border border-border bg-card shadow-sm px-5 py-4 transition-colors hover:bg-surface-muted"
                  >
                    <span className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors">
                      {b.label}
                    </span>
                    <span
                      aria-hidden
                      className="t-utility-xs text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Coming Soon footer */}
      <section className="bg-background">
        <div className="page-shell py-10">
          <div className="mx-auto w-wide">
            <p className="t-utility-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Coming soon
            </p>
            <p className="t-body-md text-foreground/85 max-w-[68ch]">
              Video Explainers, Board Webinars, and the 2026 Integrity Ledger.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
