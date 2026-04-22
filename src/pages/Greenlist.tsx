import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";

import { SourceCheck } from "@/components/SourceCheck";
import { EmptyState } from "@/components/EmptyState";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  greenlistEntries,
  GreenlistEntry,
  GreenlistCategory,
  AlertStatus,
  FOCUS_TAGS,
  getGreenlistCounts,
  getGreenlistStates,
  entryMatchesState,
} from "@/data/greenlist";

const ALERT_STATUS_LABEL: Record<AlertStatus, string> = {
  "shut-down": "Shut Down",
  "no-longer-registered": "No Active Registration",
  "not-on-fda-list": "Not on FDA List",
  unverified: "Unverified",
};

const ALL = "__all__";
const NATIONWIDE = "__nationwide__";
const PAGE_SIZE = 25;

type SortMode = "name-asc" | "name-desc" | "type" | "state";
type WebsiteFilter = "all" | "yes" | "no";

const CATEGORY_ORDER: GreenlistCategory[] = ["503B", "503A", "Other"];

const SOURCE_TYPE_DEF: Record<GreenlistCategory, { title: string; body: string }> = {
  "503B": {
    title: "503B Outsourcing Facility",
    body:
      "Facility registered with the U.S. Food and Drug Administration under Section 503B of the Federal Food, Drug, and Cosmetic Act. Subject to current good manufacturing practice (cGMP) requirements and routine FDA inspection.",
  },
  "503A": {
    title: "503A Compounding Pharmacy",
    body:
      "Pharmacy operating under Section 503A of the Federal Food, Drug, and Cosmetic Act. Licensed by the applicable state board of pharmacy and required to compound in accordance with USP <795>, <797>, and <800>.",
  },
  Other: {
    title: "Unverified Facilities",
    body:
      "Entities that have not yet undergone the Source Standard audit process or have failed to provide necessary transparency regarding their supply chain and clinical protocols.",
  },
};

const CATEGORY_STYLE: Record<GreenlistCategory, { dot: string }> = {
  "503B": { dot: "bg-[hsl(var(--src-503b))]" },
  "503A": { dot: "bg-[hsl(var(--src-503a))]" },
  Other: { dot: "bg-[hsl(var(--src-unverified))]" },
};

const CATEGORY_PILL: Record<GreenlistCategory, { wrap: string; dot: string }> = {
  "503B": {
    wrap: "bg-[hsl(var(--src-503b-soft))] text-[hsl(var(--src-503b))] ring-1 ring-[hsl(var(--src-503b))]/20",
    dot: "bg-[hsl(var(--src-503b))]",
  },
  "503A": {
    wrap: "bg-[hsl(var(--src-503a-soft))] text-[hsl(var(--src-503a))] ring-1 ring-[hsl(var(--src-503a))]/20",
    dot: "bg-[hsl(var(--src-503a))]",
  },
  Other: {
    wrap: "bg-[hsl(var(--src-unverified-soft))] text-[hsl(var(--src-unverified))] ring-1 ring-[hsl(var(--src-unverified))]/25",
    dot: "bg-[hsl(var(--src-unverified))]",
  },
};

const CATEGORY_LABEL: Record<GreenlistCategory, string> = {
  "503B": "503B",
  "503A": "503A",
  Other: "Unverified",
};

const CATEGORY_SUBLABEL: Record<GreenlistCategory, string> = {
  "503B": "Outsourcing facility",
  "503A": "Compounding pharmacy",
  Other: "Audit pending / non-transparent",
};

const CategoryPill = ({ category }: { category: GreenlistCategory }) => {
  const styles = CATEGORY_PILL[category];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.1em] tabular-nums ${styles.wrap}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
      {CATEGORY_LABEL[category]}
    </span>
  );
};

const AlertBadge = ({ entry }: { entry: GreenlistEntry }) => {
  if (!entry.regulatoryAlert) return null;
  const label =
    entry.regulatoryAlert.shortLabel ??
    ALERT_STATUS_LABEL[entry.regulatoryAlert.status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] bg-[hsl(var(--src-unverified-soft))] text-[hsl(var(--src-unverified))] ring-1 ring-[hsl(var(--src-unverified))]/25"
      title={entry.regulatoryAlert.reason}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--src-unverified))]"
      />
      {label}
    </span>
  );
};

const focusMatches = (entry: GreenlistEntry, tagLabel: string): boolean => {
  const tag = FOCUS_TAGS.find((t) => t.label === tagLabel);
  if (!tag) return true;
  const hay = entry.focus.toLowerCase();
  return tag.keywords.some((k) => hay.includes(k.toLowerCase()));
};

const SHORT_FOCUS_RULES: { label: string; keywords: string[] }[] = [
  { label: "Ophthalmics", keywords: ["ophthal", "eye drops", "eye-care", "cataract", "retina"] },
  { label: "Dermatology", keywords: ["dermatology", "aesthetic"] },
  { label: "Pediatric formulations", keywords: ["pediatric"] },
  { label: "Veterinary compounding", keywords: ["veterinary"] },
  { label: "Anesthesia / critical care", keywords: ["anesthesia", "critical care", "critical-care"] },
  { label: "Pain management", keywords: ["pain"] },
  { label: "Nuclear medicine", keywords: ["nuclear"] },
  { label: "Hospice", keywords: ["hospice"] },
  { label: "GLP-1 / weight management", keywords: ["glp-1", "weight"] },
  { label: "Peptide therapy", keywords: ["peptide"] },
  { label: "Hormone therapy", keywords: ["hormone", "trt"] },
  { label: "Regenerative medicine", keywords: ["regenerative"] },
  { label: "Nootropic / anti-aging", keywords: ["nootropic", "anti-aging"] },
  { label: "Integrative / functional", keywords: ["integrative", "functional"] },
  { label: "Vitamin / IV therapy", keywords: ["vitamin"] },
  { label: "Nutraceutical injectables", keywords: ["nutraceutical"] },
  { label: "Wellness protocols", keywords: ["wellness"] },
  { label: "IV solutions", keywords: ["iv solution", "iv admixture", "infusion", "admixture", "iv bag"] },
  { label: "Ready-to-use medications", keywords: ["ready-to-use", "ready to use", "ready-to-administer"] },
  { label: "Hospital supply", keywords: ["hospital", "ambulatory", "surgery center", "surgical center", "health system"] },
  { label: "Specialty / PBM compounding", keywords: ["specialty pharmacy", "pbm", "specialty compound"] },
  { label: "Compounding network", keywords: ["network", "multi-location"] },
  { label: "Sterile injectables", keywords: ["sterile", "injectable"] },
];

const shortFocus = (entry: GreenlistEntry): string => {
  const hay = entry.focus.toLowerCase();
  const hits: string[] = [];
  for (const rule of SHORT_FOCUS_RULES) {
    if (rule.keywords.some((k) => hay.includes(k.toLowerCase()))) {
      if (!hits.includes(rule.label)) hits.push(rule.label);
    }
    if (hits.length >= 2) break;
  }
  if (hits.length === 0) return "Specialty compounding";
  return hits.join(" · ");
};

const Greenlist = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>(ALL);
  const [state, setStateFilter] = useState<string>(ALL);
  const [focus, setFocus] = useState<string>(ALL);
  const [website, setWebsite] = useState<WebsiteFilter>("all");
  const [sort, setSort] = useState<SortMode>("name-asc");
  const [page, setPage] = useState(1);

  const states = useMemo(() => getGreenlistStates(), []);
  const counts = useMemo(() => getGreenlistCounts(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return greenlistEntries.filter((e) => {
      if (q) {
        const hay = [e.name, e.location, e.focus, e.type, e.category].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (type !== ALL && e.category !== type) return false;
      if (state !== ALL) {
        if (state === NATIONWIDE) {
          if (!e.serviceArea) return false;
        } else if (!entryMatchesState(e, state)) {
          return false;
        }
      }
      if (focus !== ALL && !focusMatches(e, focus)) return false;
      if (website === "yes" && !e.website) return false;
      if (website === "no" && e.website) return false;
      return true;
    });
  }, [query, type, state, focus, website]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "name-desc":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      case "type":
        return arr.sort((a, b) => {
          const t = a.type.localeCompare(b.type);
          if (t !== 0) return t;
          return a.name.localeCompare(b.name);
        });
      case "state":
        return arr.sort((a, b) => {
          const sa = a.state ?? "";
          const sb = b.state ?? "";
          const s = sa.localeCompare(sb);
          if (s !== 0) return s;
          return a.name.localeCompare(b.name);
        });
      case "name-asc":
      default:
        return arr.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query, type, state, focus, website, sort]);

  const filtersActive =
    query !== "" ||
    type !== ALL ||
    state !== ALL ||
    focus !== ALL ||
    website !== "all";

  const reset = () => {
    setQuery("");
    setType(ALL);
    setStateFilter(ALL);
    setFocus(ALL);
    setWebsite("all");
  };

  const statCards: {
    key: string;
    label: string;
    value: number;
    desc: string;
    glyph: "check" | "dot";
    dot?: string;
    accent?: boolean;
  }[] = [
    {
      key: "total",
      label: "Total Recognized",
      value: counts.total,
      desc: "Live count of upstream facilities recognized under federal registration, state licensure, or accredited credentialing.",
      glyph: "check",
      accent: true,
    },
    ...CATEGORY_ORDER.map((c) => ({
      key: c,
      label: SOURCE_TYPE_DEF[c].title,
      value: counts[c],
      desc: SOURCE_TYPE_DEF[c].body,
      glyph: "dot" as const,
      dot: CATEGORY_STYLE[c].dot,
    })),
  ];

  return (
    <>
      <PageMeta
        title="Greenlist · Recognized Upstream Sources"
        description="Public registry of upstream compounding facilities recognized under federal registration, state licensure, or accredited credentialing."
      />
      {/* Board-style split hero: title left, stat reference card right */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-8">
              <p className="meta mb-3">SS-GREENLIST-2026.01 · Public regulatory registry</p>
              <h1 className="title-page text-foreground tracking-[-0.02em]">
                Upstream Facility Registry.
              </h1>
              <p className="mt-4 max-w-[58ch] text-[15px] text-muted-foreground leading-[1.65]">
                Compounding facilities recognized under the framework on the basis of federal
                registration and state licensure. Inclusion is documentary; it is not a clinical
                endorsement.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="border border-border bg-background">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-muted">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                    Reference · Registry counts
                  </span>
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                    Active
                  </span>
                </div>
                <dl className="divide-y divide-border">
                  {statCards.map((s) => (
                    <HoverCard key={s.key} openDelay={120} closeDelay={60}>
                      <HoverCardTrigger asChild>
                        <div
                          className={`grid grid-cols-12 gap-2 px-4 py-2.5 items-center cursor-default ${
                            s.accent ? "bg-primary/[0.04]" : ""
                          }`}
                        >
                          <dt className="col-span-8 flex items-center gap-2 text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground">
                            {s.glyph === "check" ? (
                              <SourceCheck size="xs" />
                            ) : (
                              <span
                                aria-hidden
                                className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot}`}
                              />
                            )}
                            <span className="font-semibold text-foreground/80 truncate">
                              {s.key === "total"
                                ? s.label
                                : CATEGORY_LABEL[s.key as GreenlistCategory] ?? s.key}
                            </span>
                          </dt>
                          <dd className="col-span-4 text-right text-[15px] font-mono font-semibold tabular-nums text-foreground">
                            {s.value.toString().padStart(2, "0")}
                          </dd>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 text-[12.5px] leading-[1.6] text-muted-foreground">
                        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground">
                          {s.label}
                        </p>
                        {s.desc}
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide py-8 md:py-10">

          {/* Sticky filter bar */}
          <div className="sticky top-[57px] z-20 -mx-4 md:-mx-6 mt-6 px-4 md:px-6 py-2.5 bg-background/90 backdrop-blur-md shadow-[0_1px_0_hsl(var(--border)/0.6)]">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search facilities, pharmacies, brands, or focus areas…"
                  className="w-full pl-10 pr-3 h-10 bg-card border border-border/50 rounded-[10px] text-[13.5px] text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                  aria-label="Search registry"
                />
              </div>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-9 px-3 bg-card border border-border/50 rounded-[10px] text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Filter by source type"
              >
                <option value={ALL}>All source types</option>
                {CATEGORY_ORDER.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABEL[c]}
                  </option>
                ))}
              </select>

              <select
                value={state}
                onChange={(e) => setStateFilter(e.target.value)}
                className="h-9 px-3 bg-card border border-border/50 rounded-[10px] text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Filter by state"
              >
                <option value={ALL}>All states</option>
                <option value={NATIONWIDE}>Nationwide / multi-location</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="h-9 px-3 bg-card border border-border/50 rounded-[10px] text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Filter by focus"
              >
                <option value={ALL}>All focus areas</option>
                {FOCUS_TAGS.map((f) => (
                  <option key={f.label} value={f.label}>
                    {f.label}
                  </option>
                ))}
              </select>

              <select
                value={website}
                onChange={(e) => setWebsite(e.target.value as WebsiteFilter)}
                className="h-9 px-3 bg-card border border-border/50 rounded-[10px] text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Filter by website availability"
              >
                <option value="all">Website: All</option>
                <option value="yes">Website listed</option>
                <option value="no">No website listed</option>
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="h-9 px-3 bg-card border border-border/50 rounded-[10px] text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Sort records"
              >
                <option value="name-asc">Sort: Name A–Z</option>
                <option value="name-desc">Sort: Name Z–A</option>
                <option value="state">Sort: State</option>
                <option value="type">Sort: Source type</option>
              </select>

              {filtersActive && (
                <button
                  onClick={reset}
                  className="h-9 px-3 inline-flex items-center gap-1 bg-card border border-border/50 rounded-[10px] text-[13px] text-foreground hover:bg-surface-muted/60 hover:border-border-strong"
                >
                  <X className="h-3 w-3" /> Reset
                </button>
              )}

              <p className="meta-label ml-auto tabular-nums">
                {sorted.length === 0
                  ? "0 records"
                  : `${pageStart + 1}–${Math.min(
                      pageStart + PAGE_SIZE,
                      sorted.length,
                    )} of ${sorted.length}`}
              </p>
            </div>
          </div>

          {/* Dense table / cards */}
          <div className="mt-4">
            {sorted.length === 0 ? (
              <EmptyState
                eyebrow="No Recognized Sources Found"
                body="Source Standard has not yet recognized an upstream facility matching these filters."
              />
            ) : (
              <>
                <div className="hidden md:block rounded-[12px] border border-border/40 bg-card overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
                  <div className="grid grid-cols-12 px-5 py-3 border-b border-border/50">
                    <div className="col-span-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
                      Facility / Brand
                    </div>
                    <div className="col-span-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
                      Source Type
                    </div>
                    <div className="col-span-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
                      Location
                    </div>
                    <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
                      Focus
                    </div>
                    <div className="col-span-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70 text-right">
                      Profile
                    </div>
                  </div>
                  {pageItems.map((e) => (
                    <div
                      key={e.name}
                      className="grid grid-cols-12 px-5 py-2 border-b border-border/40 last:border-b-0 items-center hover:bg-primary/[0.04] transition-colors cursor-pointer"
                    >
                      <div className="col-span-4 min-w-0">
                        <Link
                          to={`/greenlist/${e.slug}`}
                          className="text-[13px] font-semibold text-foreground truncate hover:text-primary leading-tight block"
                        >
                          {e.name}
                        </Link>
                      </div>
                      <div className="col-span-2">
                        <div className="flex flex-col items-start gap-1">
                          <CategoryPill category={e.category} />
                          <AlertBadge entry={e} />
                        </div>
                      </div>
                      <div className="col-span-2 text-[13px] text-muted-foreground tabular-nums truncate leading-tight">
                        {e.location}
                      </div>
                      <div className="col-span-3 text-[13px] text-muted-foreground truncate leading-tight">
                        {shortFocus(e)}
                      </div>
                      <div className="col-span-1 text-right">
                        <Link
                          to={`/greenlist/${e.slug}`}
                          className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70 hover:text-primary transition-colors"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:hidden space-y-3">
                  {pageItems.map((e) => (
                    <div key={e.name} className="card-elevated p-3.5 rounded-[12px] hover:bg-primary/[0.04] transition-colors cursor-pointer">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          to={`/greenlist/${e.slug}`}
                          className="text-[13px] font-semibold text-foreground hover:text-primary"
                        >
                          {e.name}
                        </Link>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <CategoryPill category={e.category} />
                          <AlertBadge entry={e} />
                        </div>
                      </div>
                      <p className="mt-1 text-[12px] text-muted-foreground">{e.location}</p>
                      <p className="mt-1 text-[12px] text-muted-foreground">{shortFocus(e)}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {sorted.length > PAGE_SIZE && (
              <nav
                className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4"
                aria-label="Registry pagination"
              >
                <p className="meta-label">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-9 px-3 inline-flex items-center gap-1 border border-border/70 rounded-md text-[13px] text-foreground hover:bg-surface-muted/60 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-3 w-3" /> Prev
                  </button>
                  {(() => {
                    const pages: (number | "…")[] = [];
                    const window = 1;
                    const add = (n: number | "…") => pages.push(n);
                    const last = totalPages;
                    add(1);
                    const start = Math.max(2, currentPage - window);
                    const end = Math.min(last - 1, currentPage + window);
                    if (start > 2) add("…");
                    for (let i = start; i <= end; i++) add(i);
                    if (end < last - 1) add("…");
                    if (last > 1) add(last);
                    return pages.map((p, i) =>
                      p === "…" ? (
                        <span
                          key={`e-${i}`}
                          className="px-1 text-[12px] text-muted-foreground"
                          aria-hidden
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          aria-current={p === currentPage ? "page" : undefined}
                          className={`h-9 min-w-9 px-3 rounded-md text-[13px] tabular-nums ${
                            p === currentPage
                              ? "bg-primary text-primary-foreground"
                              : "border border-border/70 text-foreground hover:bg-surface-muted/60"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    );
                  })()}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3 inline-flex items-center gap-1 border border-border/70 rounded-md text-[13px] text-foreground hover:bg-surface-muted/60 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    Next <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </nav>
            )}
          </div>

          {/* Inclusion Standards — collapsed footer */}
          <details className="mt-10 group rounded-lg border border-border/60 bg-surface">
            <summary className="cursor-pointer list-none px-5 py-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">
              <span>Inclusion Standards &amp; Disclaimer</span>
              <span className="text-[11px] tabular-nums opacity-60 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-5 pb-5 pt-1 space-y-4 border-t border-border/50">
              <p className="text-[13.5px] text-muted-foreground leading-[1.7]">
                A maintained index of compounding facilities recognized under
                federal registration, state licensure, and accredited
                credentialing. Inclusion in this registry is the mandatory
                foundation for any vendor compliance assessment; a vendor cannot
                be listed in the Vendor Compliance Registry until each declared
                upstream source is present here.
              </p>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                <span className="font-semibold text-foreground">Technical note.</span>{" "}
                Greenlisted is an audit-framework status used to determine
                documentation eligibility for upstream sources. It records that a
                facility's federal registration, state licensure, or recognized
                accreditation has been verified for inclusion. It is not a
                clinical endorsement and does not assess product safety. Vendor
                audit status is tracked separately on the{" "}
                <Link
                  to="/verified-vendors"
                  className="text-primary hover:text-primary-hover underline-offset-2 hover:underline"
                >
                  Vendor Compliance Registry
                </Link>
                .
              </p>
              <div className="pt-3 border-t border-border/50 space-y-2">
                <p className="text-[12px] text-muted-foreground leading-[1.7]">
                  <span className="font-semibold text-foreground">Cite as.</span>{" "}
                  Source Standard, Public Registry of Recognized Sources,
                  SS-GREENLIST-2026.01. Last updated April 21, 2026.
                </p>
                <p className="text-[12px] text-muted-foreground leading-[1.7]">
                  <span className="font-semibold text-foreground">Disclaimer.</span>{" "}
                  Inclusion in this registry indicates recognition as a qualified
                  upstream source under the Source Standard framework. It does
                  not constitute endorsement of any specific product, protocol,
                  or clinical use, and does not replace independent due diligence
                  by prescribers or operators.
                </p>
              </div>
            </div>
          </details>
        </div>
      </section>
    </>
  );
};

export default Greenlist;
