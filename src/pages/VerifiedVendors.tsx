import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { RecordHeader } from "@/components/RecordHeader";
import { StatusBadge } from "@/components/StatusBadge";
import {
  vendors,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_STATUS_SHORT,
  getVendorStates,
  getVendorCities,
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
  verified: "Source Standard verification has been completed and published.",
  "under-review": "An active Source Standard review is currently in progress.",
  unverified: "No Source Standard verification is currently published.",
  suspended: "A previously published verification is temporarily paused.",
  removed: "Listing has been removed from the public directory.",
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
    const inState = new Set(
      vendors.filter((v) => v.state === state && v.city).map((v) => v.city as string),
    );
    return all.filter((c) => inState.has(c));
  }, [state]);

  // Reset city if it's no longer valid for the selected state
  useEffect(() => {
    if (city !== ALL && !cities.includes(city)) setCity(ALL);
  }, [cities, city]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((v) => {
      if (q) {
        const hay = [v.name, v.city, v.state].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (state !== ALL && v.state !== state) return false;
      if (city !== ALL && v.city !== city) return false;
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

  // Reset to page 1 whenever filters/sort change the result set
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

  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-REGISTRY-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "April 21, 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
        eyebrow="Public Directory · Verified Vendors"
        title="Public vendor directory."
        lead="Source Standard maintains a public directory of vendors operating in peptide, TRT, and hormone optimization. Each listing carries a public status indicating whether a Source Standard verification has been published for that vendor."
        summary={[
          { label: "Total listings", value: vendors.length.toString().padStart(2, "0") },
          { label: "Verified", value: counts.verified.toString().padStart(2, "0") },
          { label: "Under review", value: counts["under-review"].toString().padStart(2, "0") },
          { label: "Unverified", value: counts.unverified.toString().padStart(2, "0") },
        ]}
      />

      {/* Status legend — softened segmented panel */}
      <section className="bg-surface-muted/60 border-b border-border/60">
        <div className="container-wide py-8">
          <p className="meta-label text-foreground mb-4">How to read this directory</p>
          <div className="rounded-lg border border-border/60 bg-background overflow-hidden grid grid-cols-2 md:grid-cols-5">
            {STATUS_ORDER.map((s, i) => (
              <div
                key={s}
                className={`p-4 ${i > 0 ? "border-t md:border-t-0 md:border-l border-border/40" : ""} ${i === 1 ? "border-t-0" : ""}`}
              >
                <StatusBadge status={s} />
                <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
                  {STATUS_LEGEND_DESC[s]}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground leading-relaxed max-w-3xl">
            <span className="font-semibold text-foreground">Note.</span> "Unverified" means no Source Standard verification is currently published — it does not by itself indicate that a vendor is unsafe or noncompliant.{" "}
            <Link to="/how-to-read-the-directory" className="underline underline-offset-2 hover:no-underline">
              Read more
            </Link>
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
                placeholder="Search vendor name, city, state, medical director"
                className="w-full pl-9 pr-3 h-9 bg-background border border-border/70 rounded-md text-[13px] text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
                aria-label="Search directory"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
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
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
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
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
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
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
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
              value={hasReview}
              onChange={(e) => setHasReview(e.target.value)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
              aria-label="Filter by published review"
            >
              <option value={ALL}>Review: any</option>
              <option value="yes">Has published review</option>
              <option value="no">No published review</option>
            </select>


            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="h-9 px-3 bg-background border border-border/70 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus:ring-[3px] focus:ring-primary/15 focus:border-primary/60"
              aria-label="Sort records"
            >
              <option value="status">Sort: Status</option>
              <option value="name-asc">Sort: Name A → Z</option>
              <option value="name-desc">Sort: Name Z → A</option>
              <option value="state-city">Sort: State / City</option>
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
              <p className="meta">
                {vendors.length === 0
                  ? "— Directory pending population. First batch import scheduled."
                  : "— No records match the current filters."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block rounded-lg border border-border/60 bg-background overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border/50 bg-surface-muted/60">
                  <div className="col-span-4 meta-label">Vendor / Clinic</div>
                  <div className="col-span-2 meta-label">Status</div>
                  <div className="col-span-2 meta-label">City / State</div>
                  <div className="col-span-3 meta-label">Clinical focus</div>
                  <div className="col-span-1 meta-label text-right">Profile</div>
                </div>
                {pageItems.map((v) => (
                  <div
                    key={v.slug}
                    className="grid grid-cols-12 px-4 py-3 border-b border-border/50 last:border-b-0 items-center hover:bg-surface-muted/40"
                  >
                    <div className="col-span-4 min-w-0">
                      <Link
                        to={`/directory/${v.slug}`}
                        className="text-[13px] font-medium text-foreground hover:text-primary truncate block"
                      >
                        {v.name}
                      </Link>
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={v.status} />
                    </div>
                    <div className="col-span-2 text-[12.5px] text-muted-foreground tabular-nums truncate">
                      {formatLocation(v)}
                    </div>
                    <div className="col-span-3 text-[12.5px] text-muted-foreground truncate">
                      {(v.clinicalFocus && v.clinicalFocus.length > 0
                        ? v.clinicalFocus.join(" · ")
                        : v.category) || "—"}
                    </div>
                    <div className="col-span-1 text-right">
                      <Link
                        to={`/directory/${v.slug}`}
                        className="text-[11px] font-mono uppercase tracking-[0.14em] text-foreground hover:text-primary"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {pageItems.map((v) => (
                  <Link
                    key={v.slug}
                    to={`/directory/${v.slug}`}
                    className="block rounded-md border border-border/60 bg-background p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[13px] font-medium text-foreground">{v.name}</p>
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
                    <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.14em] text-foreground">
                      View profile →
                    </p>
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
                  // Compact numeric range: up to 7 buttons centered around current
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

          <p className="mt-6 text-[12px] text-muted-foreground leading-relaxed max-w-3xl">
            Directory inclusion does not constitute medical advice, product endorsement, or a
            guarantee of clinical outcome. Verification, when published, reflects documentation
            reviewed at the time of assessment under SS-FRAMEWORK-2026.01.
          </p>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
