import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { AnchorHeader } from "@/components/AnchorHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { SourceCheck } from "@/components/SourceCheck";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  vendors,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  getVendorStates,
  getVendorCities,
  getVendorCityKey,
  getClinicalFocusOptions,
} from "@/data/vendors";

const ALL = "__all__";
const PAGE_SIZE = 25;

type SortMode = "name-asc" | "name-desc" | "state" | "city" | "status";

const STATUS_ORDER: VendorPublicStatus[] = [
  "verified",
  "under-review",
  "unverified",
  "suspended",
  "removed",
];

const STATUS_LEGEND_DESC: Record<VendorPublicStatus, string> = {
  verified:
    "Documentation of upstream sourcing and clinical oversight has been audited and published.",
  "under-review": "An active Source Standard review is currently in progress.",
  unverified:
    "No documentation has been submitted for audit. Source Standard has not verified the chain of custody for this entity.",
  suspended:
    "Verification retracted pending investigation into supply-chain discrepancies.",
  removed: "Listing has been removed from the public directory.",
};

const STATUS_DOT: Record<VendorPublicStatus, string> = {
  verified: "bg-[hsl(var(--verified))]",
  "under-review": "bg-[hsl(var(--pending))]",
  unverified: "bg-muted-foreground/40",
  suspended: "bg-[hsl(var(--destructive))]",
  removed: "bg-border-strong",
};

const formatLocation = (v: Vendor) => {
  if (v.city && v.state) return `${v.city}, ${v.state}`;
  return v.city || v.state || "—";
};

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<string>(ALL);
  const [city, setCity] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);
  const [focus, setFocus] = useState<string>(ALL);
  const [sort, setSort] = useState<SortMode>("name-asc");
  const [page, setPage] = useState(1);

  const states = useMemo(() => getVendorStates(), []);
  const focusOptions = useMemo(() => getClinicalFocusOptions(), []);
  const cities = useMemo(() => {
    const all = getVendorCities();
    if (state === ALL) return all;
    return all.filter((c) => c.endsWith(`, ${state}`));
  }, [state]);

  useEffect(() => {
    if (city !== ALL && !cities.includes(city)) setCity(ALL);
  }, [cities, city]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((v) => {
      if (q) {
        const hay = [
          v.name,
          v.city,
          v.state,
          v.category,
          ...(v.clinicalFocus ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (state !== ALL && v.state !== state) return false;
      if (city !== ALL && getVendorCityKey(v) !== city) return false;
      if (status !== ALL && v.status !== status) return false;
      if (focus !== ALL && !(v.clinicalFocus ?? []).includes(focus)) return false;
      return true;
    });
  }, [query, state, city, status, focus]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "name-desc":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      case "state":
        return arr.sort((a, b) => {
          const s = (a.state ?? "").localeCompare(b.state ?? "");
          if (s !== 0) return s;
          return a.name.localeCompare(b.name);
        });
      case "city":
        return arr.sort((a, b) => {
          const c = (a.city ?? "").localeCompare(b.city ?? "");
          if (c !== 0) return c;
          return a.name.localeCompare(b.name);
        });
      case "status":
        return arr.sort((a, b) => {
          const sa = STATUS_ORDER.indexOf(a.status);
          const sb = STATUS_ORDER.indexOf(b.status);
          if (sa !== sb) return sa - sb;
          return a.name.localeCompare(b.name);
        });
      case "name-asc":
      default:
        return arr.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filtered, sort]);

  const counts = useMemo(() => {
    const c: Record<VendorPublicStatus, number> = {
      verified: 0,
      unverified: 0,
      "under-review": 0,
      suspended: 0,
      removed: 0,
    };
    for (const v of vendors) c[v.status]++;
    return c;
  }, []);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(pageStart, pageStart + PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [query, state, city, status, focus, sort]);

  const filtersActive =
    query !== "" ||
    state !== ALL ||
    city !== ALL ||
    status !== ALL ||
    focus !== ALL;

  const reset = () => {
    setQuery("");
    setState(ALL);
    setCity(ALL);
    setStatus(ALL);
    setFocus(ALL);
  };

  // Stat strip configuration: Total + 5 statuses
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
      label: "Total Tracked",
      value: vendors.length,
      desc: "Live count of vendors enrolled in the Source Standard registry, regardless of current status.",
      glyph: "dot",
      dot: "bg-foreground/70",
    },
    ...STATUS_ORDER.map((s) => ({
      key: s,
      label: VENDOR_STATUS_LABEL[s],
      value: counts[s],
      desc: STATUS_LEGEND_DESC[s],
      glyph: (s === "verified" ? "check" : "dot") as "check" | "dot",
      dot: STATUS_DOT[s],
      accent: s === "verified",
    })),
  ];

  return (
    <>
      <AnchorHeader
        eyebrow="Public ledger"
        title="Vendor Compliance Registry."
        lead="Public ledger of vendors assessed against the Source Standard framework. Every listing is anchored to a unique Audit ID."
      />

      <section className="bg-background">
        <div className="container-wide py-8 md:py-10">
          {/* At-a-Glance stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {statCards.map((s) => (
              <HoverCard key={s.key} openDelay={120} closeDelay={60}>
                <HoverCardTrigger asChild>
                  <div
                    className={`card-elevated p-4 cursor-default ${
                      s.accent ? "border-primary/40 ring-1 ring-primary/15" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      {s.glyph === "check" ? (
                        <SourceCheck size="xs" />
                      ) : (
                        <span
                          aria-hidden
                          className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot}`}
                        />
                      )}
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground truncate">
                        {s.label}
                      </p>
                    </div>
                    <p className="text-[1.75rem] font-semibold tabular-nums leading-none text-foreground">
                      {s.value.toString().padStart(2, "0")}
                    </p>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 text-[12.5px] leading-[1.6] text-muted-foreground">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-foreground">
                    {s.label}
                  </p>
                  {s.desc}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          {/* Sticky filter bar */}
          <div className="sticky top-[57px] z-20 -mx-4 md:-mx-6 mt-6 px-4 md:px-6 py-2.5 bg-background/85 backdrop-blur-md border-y border-border/60">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search vendors, clinics, cities, or clinical focus…"
                  className="w-full pl-10 pr-3 h-10 bg-background border border-border/70 rounded-md text-[13.5px] text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus:border-primary/60"
                  aria-label="Search directory"
                />
              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus:border-primary/60"
                aria-label="Filter by status"
              >
                <option value={ALL}>All statuses</option>
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {VENDOR_STATUS_LABEL[s]}
                  </option>
                ))}
              </select>

              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus:border-primary/60"
                aria-label="Filter by state"
                disabled={states.length === 0}
              >
                <option value={ALL}>All states</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus:border-primary/60"
                aria-label="Filter by city"
                disabled={cities.length === 0}
              >
                <option value={ALL}>All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus:border-primary/60"
                aria-label="Filter by clinical focus"
                disabled={focusOptions.length === 0}
              >
                <option value={ALL}>All clinical focus</option>
                {focusOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus:border-primary/60"
                aria-label="Sort records"
              >
                <option value="name-asc">Sort: Name A–Z</option>
                <option value="name-desc">Sort: Name Z–A</option>
                <option value="state">Sort: State</option>
                <option value="city">Sort: City</option>
                <option value="status">Sort: Status</option>
              </select>

              {filtersActive && (
                <button
                  onClick={reset}
                  className="h-9 px-3 inline-flex items-center gap-1 border border-border/70 rounded-md text-[13px] text-foreground hover:bg-surface-muted/60"
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
              <div className="rounded-lg border border-border/60 bg-surface-muted/60 px-4 py-10 text-center">
                <p className="meta">
                  {vendors.length === 0
                    ? "— Directory pending population. First batch import scheduled."
                    : "— No records match the current filters."}
                </p>
              </div>
            ) : (
              <>
                <div className="hidden md:block rounded-xl border border-border/60 bg-surface overflow-hidden shadow-sm">
                  <div className="grid grid-cols-12 px-5 py-2 border-b border-border/60 bg-surface-muted/60">
                    <div className="col-span-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Vendor / Clinic
                    </div>
                    <div className="col-span-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Status
                    </div>
                    <div className="col-span-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      City / State
                    </div>
                    <div className="col-span-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Clinical focus
                    </div>
                    <div className="col-span-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground text-right">
                      Profile
                    </div>
                  </div>
                  {pageItems.map((v) => (
                    <div
                      key={v.slug}
                      className="grid grid-cols-12 px-5 py-2 border-b border-border/50 last:border-b-0 items-center hover:bg-surface-muted/50 transition-colors"
                    >
                      <div className="col-span-4 min-w-0 flex items-center gap-2">
                        {v.status === "verified" && <SourceCheck size="xs" />}
                        <Link
                          to={`/directory/${v.slug}`}
                          className="text-[13px] font-medium text-foreground hover:text-primary truncate leading-tight"
                        >
                          {v.name}
                        </Link>
                      </div>
                      <div className="col-span-2">
                        <StatusBadge status={v.status} />
                      </div>
                      <div className="col-span-2 text-[13px] text-muted-foreground tabular-nums truncate leading-tight">
                        {formatLocation(v)}
                      </div>
                      <div className="col-span-3 text-[13px] text-muted-foreground truncate leading-tight">
                        {(v.clinicalFocus && v.clinicalFocus.length > 0
                          ? v.clinicalFocus.join(" · ")
                          : v.category) || "—"}
                      </div>
                      <div className="col-span-1 text-right">
                        <Link
                          to={`/directory/${v.slug}`}
                          className="text-[11px] font-medium uppercase tracking-[0.12em] text-foreground hover:text-primary"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:hidden space-y-3">
                  {pageItems.map((v) => (
                    <Link
                      key={v.slug}
                      to={`/directory/${v.slug}`}
                      className="block card-elevated p-3.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {v.status === "verified" && <SourceCheck size="xs" />}
                          <p className="text-[13px] font-medium text-foreground">
                            {v.name}
                          </p>
                        </div>
                        <StatusBadge status={v.status} />
                      </div>
                      <p className="mt-1 text-[12px] text-muted-foreground">
                        {formatLocation(v)}
                      </p>
                      {v.clinicalFocus && v.clinicalFocus.length > 0 && (
                        <p className="mt-1 text-[12px] text-muted-foreground">
                          {v.clinicalFocus.join(" · ")}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </>
            )}

            {sorted.length > PAGE_SIZE && (
              <nav
                className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4"
                aria-label="Directory pagination"
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

          {/* Methodology — collapsed footer */}
          <details className="mt-10 group rounded-lg border border-border/60 bg-surface">
            <summary className="cursor-pointer list-none px-5 py-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">
              <span>Methodology &amp; Disclaimer</span>
              <span className="text-[11px] tabular-nums opacity-60 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="px-5 pb-5 pt-1 space-y-3 border-t border-border/50">
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                <span className="font-semibold text-foreground">Note.</span> An
                Unverified status indicates a lack of administrative transparency
                and documentation on file. It is an indicator of audit status,
                not a direct assessment of clinical safety.{" "}
                <Link
                  to="/how-to-read-the-directory"
                  className="text-primary hover:text-primary-hover underline-offset-2 hover:underline"
                >
                  Read more
                </Link>
                .
              </p>
              <p className="text-[13px] text-muted-foreground leading-[1.7]">
                Directory inclusion does not constitute medical advice, product
                endorsement, or a guarantee of clinical outcome. Verification,
                when published, reflects documentation reviewed at the time of
                assessment under SS-FRAMEWORK-2026.01.
              </p>
            </div>
          </details>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
