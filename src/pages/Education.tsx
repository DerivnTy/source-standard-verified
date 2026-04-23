import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";

// ---------- Slug → route mapping ----------

const SLUG_ROUTE_OVERRIDES: Record<string, string> = {
  "what-is-compounding": "/library/what-is-compounding",
  "what-are-peptides": "/library/what-are-peptides",
  "how-to-read-a-certificate-of-analysis": "/library/interpreting-coas",
  "the-dual-layer-difference": "/library/dual-layer-difference",
  "safe-peptide-handling-and-reconstitution": "/library/sterile-preparation-integrity",
  "sanitization-and-aseptic-technique-fundamentals": "/library/aseptic-technique",
  "the-science-of-aging-and-trt": "/library/endocrinological-context",
  "dosing-guidance-summaries-for-common-compounds": "/library/reference-dosing-ranges",
  "the-2026-compounding-reclassification": "/library/analysis/2026-reclassification",
  "questions-to-ask-your-clinic": "/library/analysis/questions-for-your-clinic",
  "what-source-standard-verification-actually-means": "/library/analysis/meaning-of-verification",
  "warning-signs-of-undocumented-sourcing": "/library/analysis/undocumented-sourcing-signs",
};

const routeFor = (slug: string) =>
  SLUG_ROUTE_OVERRIDES[slug] ?? `/education/${slug}`;

// ---------- Content model ----------

type CategoryId = "regulation" | "clinical" | "consumer";

type Article = {
  slug: string;
  title: string;
  blurb: string;
  meta: string;
  category: CategoryId;
};

const CATEGORIES: { id: CategoryId; label: string; short: string; description: string }[] = [
  {
    id: "regulation",
    label: "Sourcing & Regulation",
    short: "Regulation",
    description:
      "Statutory framework, facility classifications, and verification methodology.",
  },
  {
    id: "clinical",
    label: "Clinical Handling",
    short: "Clinical",
    description:
      "Sterile technique, stability, and clinical context — peer-reviewed by the Medical Advisory Board.",
  },
  {
    id: "consumer",
    label: "Consumer Due Diligence",
    short: "Consumer",
    description:
      "Patient-facing checklists and signal interpretation for evaluating clinics and sources.",
  },
];

const ARTICLES: Article[] = [
  // Regulation
  {
    slug: "what-is-compounding",
    title: "What is Compounding?",
    blurb: "The critical difference between 503A and 503B facilities.",
    meta: "6 min read · Apr 2026",
    category: "regulation",
  },
  {
    slug: "the-2026-compounding-reclassification",
    title: "The 2026 Regulatory Shift",
    blurb: "Implications of the recent compounding reclassifications.",
    meta: "8 min read · Apr 2026",
    category: "regulation",
  },
  {
    slug: "how-to-read-a-certificate-of-analysis",
    title: "Interpreting CoAs",
    blurb: "Reading lab reports and detecting sourcing discrepancies.",
    meta: "7 min read · Mar 2026",
    category: "regulation",
  },
  {
    slug: "the-dual-layer-difference",
    title: "The Dual-Layer Audit",
    blurb: "Why we verify both the clinic and the manufacturer.",
    meta: "5 min read · Mar 2026",
    category: "regulation",
  },
  // Clinical
  {
    slug: "safe-peptide-handling-and-reconstitution",
    title: "Sterile Handling Protocol",
    blurb: "Best practices for reconstitution and aseptic storage.",
    meta: "6 min read · Apr 2026",
    category: "clinical",
  },
  {
    slug: "sanitization-and-aseptic-technique-fundamentals",
    title: "Stability Fundamentals",
    blurb: "How temperature, light, and time affect peptide integrity.",
    meta: "5 min read · Mar 2026",
    category: "clinical",
  },
  {
    slug: "the-science-of-aging-and-trt",
    title: "Endocrinological Context",
    blurb: "Age-related change and TRT mechanisms.",
    meta: "9 min read · Feb 2026",
    category: "clinical",
  },
  {
    slug: "dosing-guidance-summaries-for-common-compounds",
    title: "Dosing Reference",
    blurb: "Summaries of commonly cited clinical dosing ranges.",
    meta: "10 min read · Feb 2026",
    category: "clinical",
  },
  // Consumer
  {
    slug: "questions-to-ask-your-clinic",
    title: "The Clinic Checklist",
    blurb: "5 essential questions to ask your doctor about their sourcing.",
    meta: "4 min read · Apr 2026",
    category: "consumer",
  },
  {
    slug: "warning-signs-of-undocumented-sourcing",
    title: "Warning Signs",
    blurb: "Identifying \u201CGrey Market\u201D vendors and undocumented sources.",
    meta: "6 min read · Mar 2026",
    category: "consumer",
  },
  {
    slug: "what-source-standard-verification-actually-means",
    title: "Verification Scope",
    blurb: "What our \u201CVerified\u201D badge establishes (and what it doesn't).",
    meta: "5 min read · Mar 2026",
    category: "consumer",
  },
  {
    slug: "what-are-peptides",
    title: "Sterile Injection Guide",
    blurb: "Safe handling and disposal for injectable preparations.",
    meta: "7 min read · Feb 2026",
    category: "consumer",
  },
];

const FAQ_BUTTONS: { label: string; to: string }[] = [
  { label: "Legal", to: "/library/faq/legal-regulatory" },
  { label: "Safety", to: "/library/faq/clinical-safety" },
  { label: "Verification", to: "/library/faq/verification-process" },
  { label: "Diligence", to: "/education/questions#due-diligence" },
];

const VIEW_ALL_THRESHOLD = 5;

// ---------- Row + Section ----------

const ArticleRow = ({ entry }: { entry: Article }) => (
  <li>
    <Link
      to={routeFor(entry.slug)}
      className="group grid grid-cols-12 gap-4 items-center px-5 py-4 transition-colors hover:bg-surface-muted"
    >
      <div className="col-span-12 md:col-span-4">
        <h3 className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {entry.title}
        </h3>
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="t-body-sm text-muted-foreground leading-[1.55]">
          {entry.blurb}
        </p>
      </div>
      <div className="col-span-12 md:col-span-2 md:text-right">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {entry.meta}
        </span>
      </div>
    </Link>
  </li>
);

const CategoryBlock = ({
  category,
  entries,
}: {
  category: (typeof CATEGORIES)[number];
  entries: Article[];
}) => {
  const visible = entries.slice(0, VIEW_ALL_THRESHOLD);
  const hasMore = entries.length > VIEW_ALL_THRESHOLD;

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

      {hasMore && (
        <div className="px-5 py-3 border-t border-border bg-surface-muted/30 text-right">
          <Link
            to={`/education#${category.id}`}
            className="t-body-sm font-semibold text-primary hover:underline"
          >
            View full {category.short} index →
          </Link>
        </div>
      )}
    </section>
  );
};

// ---------- Page ----------

type Filter = "all" | CategoryId;

const Education = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

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
    filtered.filter((a) => a.category === id);

  const visibleCategories =
    filter === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === filter);

  const totalCount = filtered.length;

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

      {/* Search + filters — docked under hero, registry-aligned */}
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

              {/* Filter chips */}
              <div className="flex flex-wrap items-center gap-2 px-4 py-3">
                {(
                  [
                    { id: "all" as Filter, label: "All" },
                    ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.short })),
                  ]
                ).map((chip) => {
                  const active = filter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setFilter(chip.id)}
                      className={
                        "rounded-md border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-colors " +
                        (active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-card text-muted-foreground hover:bg-surface-muted hover:text-foreground")
                      }
                      aria-pressed={active}
                    >
                      {chip.label}
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
