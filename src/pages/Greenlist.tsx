import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { EmptyState } from "@/components/EmptyState";
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

const CATEGORY_DOT: Record<GreenlistCategory, string> = {
  "503B": "bg-[hsl(var(--src-503b))]",
  "503A": "bg-[hsl(var(--src-503a))]",
  Other: "bg-[hsl(var(--src-unverified))]",
};

const CATEGORY_LABEL: Record<GreenlistCategory, string> = {
  "503B": "503B",
  "503A": "503A",
  Other: "Unverified",
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

const AlertInline = ({ entry }: { entry: GreenlistEntry }) => {
  if (!entry.regulatoryAlert) return null;
  const label =
    entry.regulatoryAlert.shortLabel ??
    ALERT_STATUS_LABEL[entry.regulatoryAlert.status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[hsl(var(--src-unverified))]"
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

  const unverifiedCount = greenlistEntries.filter((e) => !!e.regulatoryAlert).length;

  return (
    <>
      <PageMeta
        title="Upstream Greenlist · Source Standard"
        description="Maintained reference set of recognized upstream compounding facilities used within the Source Standard framework."
      />
      <BriefingHero
        tone="navy"
        category="Reference Registry"
        docId=""
        title="Upstream Greenlist"
        statement="The maintained reference set of recognized upstream compounding facilities used within the Source Standard framework. Inclusion supports upstream reference only — vendor verification is assessed separately."
      />

      {/* Why this page exists */}
      <section className="bg-background border-b border-border/60">
        <div className="container-wide py-14 md:py-16">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Why this page exists
          </p>
          <div className="grid md:grid-cols-3 md:divide-x divide-border/60">
            <div className="md:pr-8 pb-6 md:pb-0">
              <h3 className="text-[15px] font-semibold text-foreground mb-2">
                Recognized upstream sources
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-muted-foreground max-w-[42ch]">
                Source Standard first identifies compounding facilities recognized under federal registration, state licensure, or accredited credentialing.
              </p>
            </div>
            <div className="md:px-8 py-6 md:py-0">
              <h3 className="text-[15px] font-semibold text-foreground mb-2">
                Vendor assessment
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-muted-foreground max-w-[42ch]">
                Clinics and vendors are then assessed against those upstream sources.
              </p>
            </div>
            <div className="md:pl-8 pt-6 md:pt-0">
              <h3 className="text-[15px] font-semibold text-foreground mb-2">
                One layer of the chain
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-muted-foreground max-w-[42ch]">
                The Greenlist is a reference layer. It is not, on its own, a vendor verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registry summary — institutional record strip */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-8 md:py-10">
          {/* Eyebrow row */}
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted-foreground">
              Registry Summary
              <span className="mx-2 text-border">·</span>
              As of {new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
            </p>
            <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted-foreground tabular-nums">
              Total recognized
              <span className="mx-2 text-border">·</span>
              <span className="text-foreground">{counts.total}</span>
            </p>
          </div>

          {/* Count grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 border-t border-border/60 md:divide-x md:divide-border/60">
            {[
              { label: "503B", value: counts["503B"], tick: "bg-[hsl(var(--src-503b))]" },
              { label: "503A", value: counts["503A"], tick: "bg-[hsl(var(--src-503a))]" },
              { label: "Other", value: counts.Other, tick: "bg-[hsl(var(--src-unverified))]" },
              { label: "Not currently recognized", value: unverifiedCount, tick: "bg-destructive" },
              { label: "Total", value: counts.total, tick: "bg-foreground/40" },
            ].map((cell) => (
              <div key={cell.label} className="px-0 md:px-5 py-4 first:md:pl-0 last:md:pr-0">
                <div className="flex items-center gap-2 mb-2">
                  <span aria-hidden className={`inline-block w-[2px] h-[10px] ${cell.tick}`} />
                  <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted-foreground">
                    {cell.label}
                  </span>
                </div>
                <div className="font-mono text-[22px] tabular-nums text-foreground leading-none">
                  {cell.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interpretation note */}
          <div className="mt-6 border-l-2 border-border/70 pl-4 py-1">
            <p className="text-[13px] leading-[1.7] text-muted-foreground max-w-[78ch]">
              Inclusion means the facility appears within the recognized upstream reference set used by the framework. It does not mean Source Standard is certifying any downstream vendor that uses the source. Vendor verification is a separate review.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide py-10 md:py-12">

          {/* Filter bar — calmer */}
          <div className="mt-8 border-t border-border/60 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search facilities, locations, or focus areas…"
                  className="w-full pl-9 pr-3 h-9 bg-background border border-border/40 rounded-md text-[13px] text-foreground placeholder:text-muted-foreground hover:border-border focus:outline-none focus:border-foreground/40"
                  aria-label="Search registry"
                />
              </div>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-9 px-2.5 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border focus:outline-none focus:border-foreground/40"
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
                className="h-9 px-2.5 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border focus:outline-none focus:border-foreground/40"
                aria-label="Filter by state"
              >
                <option value={ALL}>All states</option>
                <option value={NATIONWIDE}>Nationwide</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="h-9 px-2.5 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border focus:outline-none focus:border-foreground/40"
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
                className="h-9 px-2.5 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border focus:outline-none focus:border-foreground/40"
                aria-label="Filter by website availability"
              >
                <option value="all">Website: any</option>
                <option value="yes">Website listed</option>
                <option value="no">No website</option>
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="h-9 px-2.5 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border focus:outline-none focus:border-foreground/40"
                aria-label="Sort records"
              >
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="state">State</option>
                <option value="type">Source type</option>
              </select>

              {filtersActive && (
                <button
                  onClick={reset}
                  className="h-9 px-2 text-[12.5px] text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                >
                  Reset
                </button>
              )}

              <p className="text-[12px] text-muted-foreground tabular-nums ml-auto">
                {sorted.length === 0
                  ? "0 records"
                  : `${pageStart + 1}–${Math.min(
                      pageStart + PAGE_SIZE,
                      sorted.length,
                    )} of ${sorted.length}`}
              </p>
            </div>
          </div>

          {/* Editorial table */}
          <div className="mt-6">
            {sorted.length === 0 ? (
              <EmptyState
                eyebrow="No Recognized Sources Found"
                body="No upstream facility matches these filters."
              />
            ) : (
              <>
                {/* Desktop: clean divided list */}
                <div className="hidden md:block border-t border-border/60">
                  <div className="grid grid-cols-12 px-1 py-3 border-b border-border/60">
                    <div className="col-span-5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      Facility
                    </div>
                    <div className="col-span-2 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      Source type
                    </div>
                    <div className="col-span-2 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      Location
                    </div>
                    <div className="col-span-2 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      Focus
                    </div>
                    <div className="col-span-1 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground text-right">
                      &nbsp;
                    </div>
                  </div>
                  <div className="divide-y divide-border/50">
                    {pageItems.map((e) => (
                      <Link
                        key={e.name}
                        to={`/greenlist/${e.slug}`}
                        className="grid grid-cols-12 px-1 py-3.5 items-center hover:bg-surface-muted/40 transition-colors"
                      >
                        <div className="col-span-5 min-w-0 pr-4">
                          <div className="text-[14px] font-semibold text-foreground leading-tight truncate">
                            {e.name}
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 rounded-full ${e.regulatoryAlert ? "bg-destructive" : CATEGORY_DOT[e.category]}`}
                          />
                          <span className={`text-[12px] uppercase tracking-[0.1em] ${e.regulatoryAlert ? "text-destructive" : "text-muted-foreground"}`}>
                            {CATEGORY_LABEL[e.category]}
                          </span>
                        </div>
                        <div className="col-span-2 text-[12.5px] text-muted-foreground truncate">
                          {e.location}
                        </div>
                        <div className="col-span-2 text-[12.5px] text-muted-foreground truncate pr-3">
                          {shortFocus(e)}
                        </div>
                        <div className="col-span-1 text-right">
                          <span className="text-[12.5px] text-muted-foreground/80">
                            View →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile: divided list */}
                <div className="md:hidden border-t border-border/60 divide-y divide-border/50">
                  {pageItems.map((e) => (
                    <Link
                      key={e.name}
                      to={`/greenlist/${e.slug}`}
                      className="block py-3.5 hover:bg-surface-muted/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-[14px] font-semibold text-foreground">
                          {e.name}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 rounded-full ${e.regulatoryAlert ? "bg-destructive" : CATEGORY_DOT[e.category]}`}
                          />
                          <span className={`text-[11.5px] uppercase tracking-[0.1em] ${e.regulatoryAlert ? "text-destructive" : "text-muted-foreground"}`}>
                            {CATEGORY_LABEL[e.category]}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-[12.5px] text-muted-foreground">{e.location}</p>
                      <p className="mt-0.5 text-[12.5px] text-muted-foreground">{shortFocus(e)}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {sorted.length > PAGE_SIZE && (
              <nav
                className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4"
                aria-label="Registry pagination"
              >
                <p className="text-[12px] text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-9 px-3 inline-flex items-center gap-1 border border-border/60 rounded-md text-[13px] text-foreground hover:bg-surface-muted/60 disabled:opacity-40 disabled:cursor-not-allowed"
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
                              ? "bg-foreground text-background"
                              : "border border-border/60 text-foreground hover:bg-surface-muted/60"
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
                    className="h-9 px-3 inline-flex items-center gap-1 border border-border/60 rounded-md text-[13px] text-foreground hover:bg-surface-muted/60 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    Next <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </section>

      {/* Bridge to vendor registry */}
      <section className="bg-surface-muted/30 border-t border-border/60">
        <div className="container-wide py-10 md:py-12">
          <div className="max-w-[1040px] mx-auto">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70 mb-4">
              Two layers, one framework
            </p>
            <p className="text-[15px] leading-[1.7] text-foreground/85 max-w-[78ch]">
              The Greenlist establishes the upstream reference set — the recognized facilities a vendor may legitimately source from. Vendor verification is the second layer: it assesses whether a specific clinic or vendor can actually substantiate its sourcing through licensed upstream pharmacies and documented records.
            </p>
            <Link
              to="/directory"
              className="mt-6 inline-flex items-center text-[14px] font-medium text-foreground hover:text-primary underline-offset-4 hover:underline"
            >
              Open the Vendor Registry →
            </Link>

            <div className="mt-8 pt-5 border-t border-border/50">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                Note
              </span>
              <p className="mt-2 text-[12.5px] leading-[1.65] text-muted-foreground max-w-[68ch]">
                Source Standard does not accept payment from facilities for inclusion in the Greenlist. Information is derived from public regulatory filings, disclosed facility information, and Source Standard review data where applicable. Inclusion does not constitute endorsement of any specific product, protocol, or clinical use, and does not replace independent due diligence by prescribers or operators.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Greenlist;
