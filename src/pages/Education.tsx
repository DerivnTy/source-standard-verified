import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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

// Local non-exported primitives — Source Standard reference-database language.
const LibraryCard = ({
  children,
  padded = true,
}: {
  children: ReactNode;
  padded?: boolean;
}) => (
  <div
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: padded ? "24px" : "0",
    }}
  >
    {children}
  </div>
);

const ViewAllPill = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => (
  <Link
    to={to}
    className="inline-flex items-center gap-1 font-sans font-semibold uppercase whitespace-nowrap transition-all active:scale-[0.97] hover:bg-[hsl(var(--muted))]/40"
    style={{
      fontSize: "11px",
      letterSpacing: "0.06em",
      height: "30px",
      padding: "0 12px",
      borderRadius: "20px",
      border: "1px solid hsl(var(--border))",
      backgroundColor: "#FFFFFF",
      color: "hsl(var(--foreground) / 0.85)",
    }}
  >
    {children}
    <ChevronRight aria-hidden style={{ width: "11px", height: "11px", strokeWidth: 1.5 }} />
  </Link>
);

const InquiryRow = ({
  label,
  description,
  to,
}: {
  label: string;
  description: string;
  to: string;
}) => (
  <Link
    to={to}
    aria-label={label}
    className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.97]"
    style={{
      position: "relative",
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "10px 14px",
    }}
  >
    <div className="flex flex-col" style={{ rowGap: "2px", paddingRight: "64px" }}>
      <span
        className="font-mono uppercase tabular-nums text-muted-foreground"
        style={{ fontSize: "10px", letterSpacing: "0.08em" }}
      >
        {label}
      </span>
      <p
        className="font-sans text-foreground/85 line-clamp-2"
        style={{ fontSize: "12.5px", lineHeight: "1.5" }}
      >
        {description}
      </p>
    </div>
    <span
      className="inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity"
      style={{
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "10px",
        letterSpacing: "0.06em",
      }}
    >
      View
      <ChevronRight aria-hidden style={{ width: "11px", height: "11px", strokeWidth: 1.5 }} />
    </span>
  </Link>
);

const ReferenceNote = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) => (
  <LibraryCard>
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      {eyebrow}
    </p>
    <h2 className="mt-2 t-section-title-sm text-foreground tracking-tight">
      {title}
    </h2>
    <div className="mt-3 t-body-sm text-muted-foreground leading-[1.55]">
      {children}
    </div>
  </LibraryCard>
);

const HERO_DESCRIPTION =
  "Foundational sourcing transparency resources and current publications from Source Standard. Reference materials covering vendor verification, facility relationships, documentation review, and emerging industry topics in compounded therapy.";

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
    to: "/library/faq/consumer-diligence",
  },
];

const PREVIEW_LIMIT_LATEST = 6;

const FILTER_TABS: { id: "all" | CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "core", label: "Core Reference" },
  { id: "latest", label: "Latest" },
];


const CategoryBlock = ({
  category,
  entries,
}: {
  category: Category;
  entries: ReturnType<typeof articlesByCategory>;
}) => {
  const isLatest = category.id === "latest";
  const visible =
    category.id === "core" ? entries : entries.slice(0, PREVIEW_LIMIT_LATEST);
  const hasMore =
    category.id !== "core" && entries.length > PREVIEW_LIMIT_LATEST;

  return (
    <section
      id={category.id}
      className="border-b border-border/40 scroll-mt-36"
      style={{
        paddingTop: "36px",
        paddingBottom: isLatest ? "48px" : "24px",
      }}
    >
      <div className="mx-auto w-wide">
        <div className="grid grid-cols-12 gap-x-8 gap-y-6">
          <div className="col-span-12 md:col-span-4">
            <h2 className="t-section-title-sm text-foreground tracking-tight">
              {category.label}
            </h2>
            <p className="mt-2 t-body-sm text-muted-foreground leading-[1.55] max-w-[42ch]">
              {category.description}
            </p>
            {category.id === "core" && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground tabular-nums">
                Foundational References
              </p>
            )}
          </div>

          <div className="col-span-12 md:col-span-8">
            {entries.length === 0 ? (
              <div
                className="bg-card text-center t-body-sm text-muted-foreground"
                style={{
                  border: "0.5px solid hsl(var(--border))",
                  borderRadius: "12px",
                  padding: "32px 20px",
                }}
              >
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

            {isLatest && entries.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <Link
                  to="/library/publications"
                  className="inline-flex items-center gap-1 font-sans font-semibold text-[hsl(var(--primary))] hover:opacity-80 transition-opacity"
                  style={{ fontSize: "11px", letterSpacing: "-0.005em" }}
                >
                  View All Publications
                  <ChevronRight aria-hidden style={{ width: "13px", height: "13px", strokeWidth: 1.75 }} />
                </Link>
              </div>
            )}

            {hasMore && !isLatest && (
              <div className="mt-3">
                <ViewAllPill to={category.path}>
                  View all {category.label}
                </ViewAllPill>
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

      {/* §2 Library controls */}
      <div className="bg-background border-b border-border/60">
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
        className="border-b border-border/40"
        style={{ paddingTop: "24px", paddingBottom: "32px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-wide">
            <div className="grid grid-cols-12 gap-x-8 gap-y-4">
              <div className="col-span-12 md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Reference Questions
                </p>
                <h2 className="mt-2 t-section-title-sm text-foreground tracking-tight">
                  Common Inquiries
                </h2>
                <p className="mt-2 t-body-sm text-muted-foreground leading-[1.55] max-w-[42ch]">
                  Recorded answers to recurring questions, organized by topic.
                </p>
              </div>

              <div className="col-span-12 md:col-span-8">
                <ul className="flex flex-col gap-2">
                  {COMMON_INQUIRIES.map((item) => (
                    <li key={item.label}>
                      <InquiryRow
                        label={item.label}
                        description={item.description}
                        to={item.to}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §7 Editorial Pipeline */}
      <section
        className="border-b border-border/40"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <div className="page-shell">
          <div className="mx-auto w-full">
            <ReferenceNote eyebrow="Forthcoming" title="Editorial Pipeline">
              <p>
                Additional reference formats are in development, including
                video explainers, Board-reviewed articles, and the 2026
                Integrity Ledger.
              </p>
            </ReferenceNote>
          </div>
        </div>
      </section>

      {/* §8 Closing statement */}
      <section style={{ paddingTop: "24px", paddingBottom: "56px" }}>
        <div className="page-shell">
          <div className="mx-auto w-full">
            <ReferenceNote
              eyebrow="Conclusion"
              title="A working reference, not a content feed."
            >
              <p>
                The Resource Library helps consumers, clinicians, and listed
                entities understand sourcing claims, pharmacy categories,
                documentation review, and verification limits through a
                consistent public-reference standard. It is maintained as part
                of the broader Source Standard framework, not as a standalone
                publishing channel.
              </p>
            </ReferenceNote>
          </div>
        </div>
      </section>
    </>
  );
};

export default Education;
