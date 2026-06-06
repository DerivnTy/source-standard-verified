import { useMemo, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { ArticleRow } from "@/components/library/ArticleRow";
import {
  CategoryId,
  articlesByCategory,
  findCategory,
  sortArticles,
} from "@/data/resourceLibrary";

type SortMode = "newest" | "oldest" | "title";

const SLUG_TO_CATEGORY: Record<string, CategoryId> = {
  core: "core",
  latest: "latest",
};

const LibraryCategory = () => {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "";
  const categoryId = SLUG_TO_CATEGORY[slug];
  const category = categoryId ? findCategory(categoryId) : undefined;

  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const sorted = useMemo(() => {
    if (!categoryId) return [];
    return sortArticles(articlesByCategory(categoryId), sortMode);
  }, [categoryId, sortMode]);

  if (!category) {
    return <Navigate to="/education" replace />;
  }

  return (
    <>
      <PageMeta
        title={`${category.label} · Resource Library`}
        description={category.description}
      />

      <Breadcrumb
        items={[
          { label: "Resource Library", to: "/education" },
          { label: category.label },
        ]}
      />

      {/* Back link, sits above the hero */}
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
        title={category.label}
        statement={category.description}
      />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <section className="-mt-5 md:-mt-6 relative z-10 mb-12 rounded-md border border-border bg-card shadow-sm overflow-hidden">
              <header className="px-5 py-4 border-b border-border bg-surface-muted/50 flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="t-body-md font-semibold text-foreground tracking-tight">
                    {category.label} · Full Index
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {sorted.length} {sorted.length === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="sort-mode"
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Sort
                  </label>
                  <select
                    id="sort-mode"
                    value={sortMode}
                    onChange={(e) => setSortMode(e.target.value as SortMode)}
                    className="rounded-md border border-border bg-background px-2.5 py-1.5 text-[10px] font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title">Title (A–Z)</option>
                  </select>
                </div>
              </header>

              {sorted.length === 0 ? (
                <div className="px-5 py-10 text-center t-body-sm text-muted-foreground">
                  No entries published in this category yet.
                </div>
              ) : (
                <ul className="flex flex-col gap-2">
                  {sorted.map((e) => (
                    <li key={e.slug}>
                      <ArticleRow entry={e} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryCategory;
