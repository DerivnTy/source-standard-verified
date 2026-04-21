import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { RecordHeader } from "@/components/RecordHeader";
import {
  greenlistEntries,
  GreenlistEntry,
  GreenlistCategory,
  GREENLIST_TYPES,
  FOCUS_TAGS,
  getGreenlistLocations,
  getGreenlistCounts,
} from "@/data/greenlist";

const ALL = "__all__";
const PAGE_SIZE = 25;

type SortMode = "name-asc" | "name-desc" | "category" | "location";

const CATEGORY_ORDER: GreenlistCategory[] = ["503B", "503A", "Other"];

const CATEGORY_LABEL: Record<GreenlistCategory, string> = {
  "503B": "503B",
  "503A": "503A",
  Other: "Other",
};

const SOURCE_TYPE_DEF: { key: GreenlistCategory; title: string; body: string }[] = [
  {
    key: "503B",
    title: "503B Outsourcing Facility",
    body:
      "FDA-registered facility producing sterile compounded medications at scale for office-use stock under cGMP-style oversight.",
  },
  {
    key: "503A",
    title: "503A Compounding Pharmacy",
    body:
      "State-licensed pharmacy compounding patient-specific prescriptions under state board of pharmacy oversight and USP standards.",
  },
  {
    key: "Other",
    title: "Other Qualified Source",
    body:
      "Additional source categories recognized within the framework, including hospital-focused suppliers and multi-location compounding networks.",
  },
];

const CategoryPill = ({ category }: { category: GreenlistCategory }) => (
  <span
    className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.12em] tabular-nums text-[10px] text-foreground"
  >
    <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground" />
    {CATEGORY_LABEL[category]}
  </span>
);

const GreenlistedPill = ({ size = "sm" }: { size?: "sm" | "md" }) => (
  <span
    className={`inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.12em] tabular-nums text-verified ${
      size === "md" ? "text-[11px]" : "text-[10px]"
    }`}
  >
    <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-current" />
    Greenlisted
  </span>
);

const focusMatches = (entry: GreenlistEntry, tagLabel: string): boolean => {
  const tag = FOCUS_TAGS.find((t) => t.label === tagLabel);
  if (!tag) return true;
  const hay = entry.focus.toLowerCase();
  return tag.keywords.some((k) => hay.includes(k.toLowerCase()));
};

const Greenlist = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [type, setType] = useState<string>(ALL);
  const [location, setLocation] = useState<string>(ALL);
  const [focus, setFocus] = useState<string>(ALL);
  const [sort, setSort] = useState<SortMode>("name-asc");
  const [page, setPage] = useState(1);

  const locations = useMemo(() => getGreenlistLocations(), []);
  const counts = useMemo(() => getGreenlistCounts(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return greenlistEntries.filter((e) => {
      if (q) {
        const hay = [e.name, e.location, e.focus, e.type].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (category !== ALL && e.category !== category) return false;
      if (type !== ALL && e.type !== type) return false;
      if (location !== ALL && e.location !== location) return false;
      if (focus !== ALL && !focusMatches(e, focus)) return false;
      return true;
    });
  }, [query, category, type, location, focus]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "name-desc":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      case "category":
        return arr.sort((a, b) => {
          const ca = CATEGORY_ORDER.indexOf(a.category);
          const cb = CATEGORY_ORDER.indexOf(b.category);
          if (ca !== cb) return ca - cb;
          return a.name.localeCompare(b.name);
        });
      case "location":
        return arr.sort((a, b) => {
          const l = a.location.localeCompare(b.location);
          if (l !== 0) return l;
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
  }, [query, category, type, location, focus, sort]);

  const filtersActive =
    query !== "" ||
    category !== ALL ||
    type !== ALL ||
    location !== ALL ||
    focus !== ALL;

  const reset = () => {
    setQuery("");
    setCategory(ALL);
    setType(ALL);
    setLocation(ALL);
    setFocus(ALL);
  };

  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-GREENLIST-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "April 21, 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
        eyebrow="Public Registry · Recognized Sources"
        title="Public registry of recognized upstream sources."
        lead="Source Standard maintains a public registry of upstream sources that carry Greenlisted status — recognized within the framework across source types including 503B outsourcing facilities, 503A compounding pharmacies, and other qualified source categories."
        summary={[
          { label: "Total entries", value: counts.total.toString().padStart(2, "0") },
          { label: "503B facilities", value: counts["503B"].toString().padStart(2, "0") },
          { label: "503A pharmacies", value: counts["503A"].toString().padStart(2, "0") },
          { label: "Other sources", value: counts.Other.toString().padStart(2, "0") },
        ]}
      />

      {/* Status + Source type legend */}
      <section className="bg-surface-muted/60 border-b border-border/60">
        <div className="container-wide py-8 space-y-6">
          <p className="meta-label text-foreground">How Greenlist status works</p>

          {/* Group A — Status */}
          <div>
            <p className="eyebrow mb-2">Status</p>
            <div className="rounded-lg border border-border/60 bg-background p-4">
              <GreenlistedPill size="md" />
              <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed max-w-3xl">
                A Source Standard designation indicating an upstream source is recognized within
                the Greenlist framework. Greenlisted is a status, not a facility type.
              </p>
            </div>
          </div>

          {/* Group B — Source types */}
          <div>
            <p className="eyebrow mb-2">Source types in this registry</p>
            <div className="rounded-lg border border-border/60 bg-background overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40">
              {SOURCE_TYPE_DEF.map((d) => (
                <div key={d.key} className="p-4">
                  <span className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.12em] tabular-nums text-[11px] text-foreground">
                    <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    {d.title}
                  </span>
                  <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-3xl">
            <strong className="text-foreground font-semibold">Scope note.</strong>{" "}
            Greenlisted is a Source Standard status for recognized upstream sources — not a
            facility type. Source types on this page include 503B outsourcing facilities, 503A
            compounding pharmacies, and other qualified source categories. Vendor verification is
            tracked separately on the{" "}
            <Link to="/verified-vendors" className="underline hover:text-foreground">
              Verified Vendors directory
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Filter row */}
      <section className="bg-background/95 backdrop-blur-sm border-b border-border/60 sticky top-0 z-20">
        <div className="container-wide py-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by facility, pharmacy, or brand name"
                className="w-full pl-9 pr-3 h-9 bg-background border border-border/70 rounded-md text-[13px] text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
                aria-label="Search registry"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
              aria-label="Filter by category"
            >
              <option value={ALL}>All source groups</option>
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABEL[c]}
                </option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
              aria-label="Filter by type"
            >
              <option value={ALL}>All types</option>
              {GREENLIST_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
              aria-label="Filter by location"
            >
              <option value={ALL}>All locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
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
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
              aria-label="Sort records"
            >
              <option value="name-asc">Sort: Name A → Z</option>
              <option value="name-desc">Sort: Name Z → A</option>
              <option value="category">Sort: Category</option>
              <option value="location">Sort: Location</option>
            </select>

            {filtersActive && (
              <button
                onClick={reset}
                className="h-9 px-3 inline-flex items-center gap-1 border border-border/70 rounded-md text-[13px] text-foreground hover:bg-surface-muted/60"
              >
                <X className="h-3 w-3" /> Reset
              </button>
            )}

            <p className="meta-label ml-auto">
              {sorted.length === 0
                ? "0 records"
                : `${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, sorted.length)} of ${sorted.length}`}
            </p>
          </div>
        </div>
      </section>

      {/* Registry table */}
      <section>
        <div className="container-wide py-8">
          {sorted.length === 0 ? (
            <div className="rounded-lg border border-border/60 bg-surface-muted/60 px-4 py-10 text-center">
              <p className="meta">— No records match the current filters.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block rounded-lg border border-border/60 bg-background overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border/50 bg-surface-muted/60">
                  <div className="col-span-3 meta-label">Facility / Brand</div>
                  <div className="col-span-2 meta-label">Status</div>
                  <div className="col-span-2 meta-label">Source Type</div>
                  <div className="col-span-2 meta-label">Location</div>
                  <div className="col-span-2 meta-label">Focus</div>
                  <div className="col-span-1 meta-label text-right">Website</div>
                </div>
                {pageItems.map((e) => (
                  <div
                    key={e.name}
                    className="grid grid-cols-12 px-4 py-3 border-b border-border/50 last:border-b-0 items-center hover:bg-surface-muted/40"
                  >
                    <div className="col-span-3 min-w-0">
                      <p className="text-[13px] font-medium text-foreground truncate">
                        {e.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">{e.type}</p>
                    </div>
                    <div className="col-span-2">
                      <GreenlistedPill />
                    </div>
                    <div className="col-span-2">
                      <CategoryPill category={e.category} />
                    </div>
                    <div className="col-span-2 text-[12.5px] text-muted-foreground tabular-nums truncate">
                      {e.location}
                    </div>
                    <div className="col-span-2 text-[12.5px] text-muted-foreground truncate">
                      {e.focus}
                    </div>
                    <div className="col-span-1 text-right">
                      {e.website ? (
                        <a
                          href={e.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono uppercase tracking-[0.14em] text-foreground hover:text-primary"
                        >
                          Visit →
                        </a>
                      ) : (
                        <span className="text-[11px] font-mono text-muted-foreground">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {pageItems.map((e) => (
                  <div key={e.name} className="block rounded-md border border-border/60 bg-background p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <GreenlistedPill />
                      <CategoryPill category={e.category} />
                    </div>
                    <p className="text-[13px] font-medium text-foreground">{e.name}</p>
                    <p className="mt-1 text-[12px] text-muted-foreground">{e.type}</p>
                    <p className="mt-1 text-[12px] text-muted-foreground">{e.location}</p>
                    <p className="mt-1 text-[12px] text-muted-foreground">{e.focus}</p>
                    {e.website && (
                      <a
                        href={e.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-[11px] font-mono uppercase tracking-[0.14em] text-foreground hover:text-primary"
                      >
                        Visit website →
                      </a>
                    )}
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
      </section>

      {/* Cite-as / disclaimer */}
      <section className="bg-surface-muted/60 border-t border-border/60">
        <div className="container-wide py-6 space-y-2">
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">Cite as.</strong> Source Standard,
            Public Registry of Recognized Sources, SS-GREENLIST-2026.01. Last updated April 21, 2026.
          </p>
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground font-semibold">Disclaimer.</strong> Inclusion in
            this registry indicates recognition as a qualified upstream source under the Source
            Standard framework. It does not constitute endorsement of any specific product,
            protocol, or clinical use, and does not replace independent due diligence by
            prescribers or operators.
          </p>
        </div>
      </section>
    </>
  );
};

export default Greenlist;
