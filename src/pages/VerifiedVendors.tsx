import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { AnchorHeader } from "@/components/AnchorHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { RegistryLayout, RegistrySection } from "@/components/RegistryLayout";
import { SourceCheck } from "@/components/SourceCheck";
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

// Tone dots used on non-verified status cards.
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

  return (
    <>
      <AnchorHeader
        eyebrow="Public ledger"
        title="Vendor Compliance Registry."
        lead="Public ledger of vendors assessed against the Source Standard framework. Every listing is anchored to a unique Audit ID."
      />

      <RegistryLayout
        waypoints={[
          { id: "total-tracked", number: "01", label: "Total Tracked" },
          { id: "verified", number: "02", label: "Verified" },
          { id: "under-review", number: "03", label: "Under Review" },
          { id: "browse", number: "04", label: "Browse Registry" },
          { id: "methodology", number: "05", label: "Methodology" },
        ]}
      >
        {/* §01 — Total Tracked headline card */}
        <RegistrySection
          id="total-tracked"
          number="01"
          title="Total Tracked Entities"
          description="Live count of vendors enrolled in the Source Standard registry. Each entity is anchored to a permanent audit file regardless of current status."
          first
        >
          <div className="card-elevated p-7 flex items-baseline justify-between">
            <div>
              <p className="eyebrow mb-2">Registry population</p>
              <p className="text-[2.5rem] md:text-[3rem] font-semibold tracking-[-0.02em] text-foreground tabular-nums leading-none">
                {vendors.length.toString().padStart(2, "0")}
              </p>
            </div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
              Live · SS-REG-2026.01
            </p>
          </div>
        </RegistrySection>

        {/* §02 — Verified card with SourceCheck */}
        <RegistrySection
          id="verified"
          number="02"
          title="Verified & Status Legend"
          description="Each listing carries one of five public statuses. Verified records have completed documentation review under the Source Standard framework."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATUS_ORDER.map((s) => {
              const isVerified = s === "verified";
              return (
                <div
                  key={s}
                  className={`card-elevated p-5 flex flex-col ${
                    isVerified ? "border-primary/40 ring-1 ring-primary/15" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {isVerified ? (
                        <SourceCheck size="md" />
                      ) : (
                        <span
                          aria-hidden
                          className={`inline-block w-2.5 h-2.5 rounded-full ${STATUS_DOT[s]}`}
                        />
                      )}
                      <p className="text-[13px] font-semibold text-foreground">
                        {VENDOR_STATUS_LABEL[s]}
                      </p>
                    </div>
                    <p className="text-[18px] font-semibold tabular-nums text-foreground leading-none">
                      {counts[s].toString().padStart(2, "0")}
                    </p>
                  </div>
                  <p className="text-[12.5px] text-muted-foreground leading-[1.55]">
                    {STATUS_LEGEND_DESC[s]}
                  </p>
                </div>
              );
            })}
          </div>
        </RegistrySection>

        {/* §03 — Under Review activity row */}
        <RegistrySection
          id="under-review"
          number="03"
          title="Active Reviews"
          description="Vendors currently undergoing audit. Status will resolve to Verified, Unverified, or Suspended once review concludes."
        >
          <div className="card-elevated p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className={`inline-block w-2.5 h-2.5 rounded-full ${STATUS_DOT["under-review"]}`}
              />
              <p className="text-[13.5px] text-foreground">
                <span className="font-semibold tabular-nums">
                  {counts["under-review"].toString().padStart(2, "0")}
                </span>{" "}
                vendors are presently under active review.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setStatus("under-review");
                document
                  .getElementById("browse")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[12px] font-medium uppercase tracking-[0.1em] text-primary hover:text-primary-hover"
            >
              Filter →
            </button>
          </div>
        </RegistrySection>

        {/* §04 — Browse Registry: filters + table */}
        <RegistrySection
          id="browse"
          number="04"
          title="Browse Registry"
          description="Filter, sort, and inspect every record in the registry. Each row links to the full audit profile."
        >
          {/* Filter row */}
          <div className="rounded-lg border border-border/60 bg-surface p-3 mb-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by vendor or clinic name"
                  className="w-full pl-9 pr-3 h-9 bg-background border border-border/70 rounded-md text-[13px] text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus:border-primary/60"
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

              <p className="meta-label ml-auto">
                {sorted.length === 0
                  ? "0 records"
                  : `${pageStart + 1}–${Math.min(
                      pageStart + PAGE_SIZE,
                      sorted.length,
                    )} of ${sorted.length}`}
              </p>
            </div>
          </div>

          {/* Table / cards */}
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
                <div className="grid grid-cols-12 px-5 py-2.5 border-b border-border/60 bg-surface-muted/60">
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
                    className="grid grid-cols-12 px-5 py-3 border-b border-border/50 last:border-b-0 items-center hover:bg-surface-muted/50 transition-colors"
                  >
                    <div className="col-span-4 min-w-0 flex items-center gap-2">
                      {v.status === "verified" && <SourceCheck size="xs" />}
                      <Link
                        to={`/directory/${v.slug}`}
                        className="text-[13px] font-medium text-foreground hover:text-primary truncate"
                      >
                        {v.name}
                      </Link>
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={v.status} />
                    </div>
                    <div className="col-span-2 text-[13px] text-muted-foreground tabular-nums truncate">
                      {formatLocation(v)}
                    </div>
                    <div className="col-span-3 text-[13px] text-muted-foreground truncate">
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
                    className="block card-elevated p-4"
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
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground">
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
        </RegistrySection>

        {/* §05 — Methodology footer (demoted) */}
        <RegistrySection
          id="methodology"
          number="05"
          title="Methodology & Disclaimer"
          description="Technical reference for how this registry is constructed and what its statuses do — and do not — represent."
        >
          <div className="card-elevated p-6 space-y-3">
            <p className="text-[13px] text-muted-foreground leading-[1.7]">
              <span className="font-semibold text-foreground">Note.</span> An
              Unverified status indicates a lack of administrative transparency
              and documentation on file. It is an indicator of audit status, not
              a direct assessment of clinical safety.{" "}
              <Link to="/how-to-read-the-directory" className="text-primary hover:text-primary-hover underline-offset-2 hover:underline">
                Read more
              </Link>
              .
            </p>
            <p className="text-[13px] text-muted-foreground leading-[1.7]">
              Directory inclusion does not constitute medical advice, product
              endorsement, or a guarantee of clinical outcome. Verification, when
              published, reflects documentation reviewed at the time of
              assessment under SS-FRAMEWORK-2026.01.
            </p>
          </div>
        </RegistrySection>
      </RegistryLayout>
    </>
  );
};

export default VerifiedVendors;
