import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";

import { StatusBadge } from "@/components/StatusBadge";
import { EmptyState } from "@/components/EmptyState";
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
  verified: "Completed review on file.",
  "under-review": "Active review in progress.",
  unverified: "No completed verification on file.",
  suspended: "Previously verified status temporarily paused.",
  removed: "Verification no longer in effect.",
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

  const fmt = (n: number) => n.toLocaleString();

  return (
    <>
      <PageMeta
        title="Verified Vendors · Public Record"
        description="The public record of vendors and clinics tracked under the Source Standard framework — verified, under review, and unverified listings."
      />
      <BriefingHero
        tone="navy"
        category="Public Vendor Record"
        docId="SS-DIRECTORY"
        title="Verified Vendors"
        statement="The public record of vendors and clinics tracked under the Source Standard framework. Each listing reflects whether a documented verification has been completed, is in progress, or is not on file."
      />

      {/* Why this page matters — three plain statements */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border/60">
            {[
              {
                title: "A documented reference point",
                body: "Consumers can check whether a vendor has completed Source Standard verification.",
              },
              {
                title: "What verified means",
                body: "A completed review against documented sourcing records is on file.",
              },
              {
                title: "What unverified means",
                body: "No completed verification is on file. It does not imply unsafe or noncompliant.",
              },
            ].map((c) => (
              <div key={c.title} className="px-0 md:px-8 first:pl-0 last:pr-0 py-2 md:py-0">
                <p className="text-[13px] font-semibold text-foreground mb-2">{c.title}</p>
                <p className="text-[13.5px] text-muted-foreground leading-[1.7]">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refined status summary */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-10">
          <p className="font-mono text-[12px] text-muted-foreground tabular-nums leading-relaxed">
            {fmt(vendors.length)} tracked
            <span className="mx-2 text-border">·</span>
            {fmt(counts.verified)} verified
            <span className="mx-2 text-border">·</span>
            {fmt(counts["under-review"])} under review
            <span className="mx-2 text-border">·</span>
            {fmt(counts.unverified)} unverified
            <span className="mx-2 text-border">·</span>
            {fmt(counts.suspended)} suspended
            <span className="mx-2 text-border">·</span>
            {fmt(counts.removed)} removed
          </p>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-mono text-[44px] md:text-[52px] font-semibold tabular-nums text-foreground leading-none">
              {fmt(counts.verified)}
            </span>
            <span className="text-[13px] text-muted-foreground">
              Verified vendors on the public record
            </span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-wide py-8 md:py-10">
          {/* Filter bar — calmer */}
          <div className="sticky top-[57px] z-20 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-background border-t border-b border-border/50">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search vendors, clinics, cities, or clinical focus…"
                  className="w-full pl-10 pr-3 h-9 bg-background border border-border/40 rounded-md text-[13.5px] text-foreground placeholder:text-muted-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                  aria-label="Search directory"
                />
              </div>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-9 px-3 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
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
                className="h-9 px-3 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Filter by state"
                disabled={states.length === 0}
              >
                <option value={ALL}>All states</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-9 px-3 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Filter by city"
                disabled={cities.length === 0}
              >
                <option value={ALL}>All cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                className="h-9 px-3 bg-background border border-border/40 rounded-md text-[13px] text-foreground hover:border-border-strong focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus:border-primary"
                aria-label="Filter by clinical focus"
                disabled={focusOptions.length === 0}
              >
                <option value={ALL}>All clinical focus</option>
                {focusOptions.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>

              {filtersActive && (
                <button
                  onClick={reset}
                  className="h-9 px-1 text-[12.5px] text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  Reset
                </button>
              )}

              <div className="ml-auto flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className="h-9 px-2 bg-transparent border-0 text-[12.5px] text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label="Sort records"
                >
                  <option value="name-asc">Sort: Name A–Z</option>
                  <option value="name-desc">Sort: Name Z–A</option>
                  <option value="state">Sort: State</option>
                  <option value="city">Sort: City</option>
                  <option value="status">Sort: Status</option>
                </select>
                <p className="font-mono text-[12px] text-muted-foreground tabular-nums whitespace-nowrap">
                  {sorted.length === 0
                    ? "0 records"
                    : `${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, sorted.length)} of ${sorted.length}`}
                </p>
              </div>
            </div>
          </div>

          {/* Editorial table */}
          <div className="mt-6">
            {sorted.length === 0 ? (
              <EmptyState
                eyebrow="No records"
                body={
                  vendors.length === 0
                    ? "Directory pending population."
                    : "No vendors match these filters."
                }
              />
            ) : (
              <>
                <div className="hidden md:block">
                  <div className="grid grid-cols-12 px-1 py-3 border-b border-border/60">
                    <div className="col-span-4 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">Vendor / Clinic</div>
                    <div className="col-span-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">Status</div>
                    <div className="col-span-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">City / State</div>
                    <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70">Clinical focus</div>
                    <div className="col-span-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-foreground/70 text-right">Profile</div>
                  </div>
                  <div className="divide-y divide-border/50">
                    {pageItems.map((v) => (
                      <div
                        key={v.slug}
                        className="grid grid-cols-12 px-1 py-3 items-center hover:bg-surface-muted/40 transition-colors"
                      >
                        <div className="col-span-4 min-w-0">
                          <Link
                            to={`/directory/${v.slug}`}
                            className="text-[14.5px] font-semibold text-foreground hover:text-primary truncate leading-snug block"
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
                            className="text-[12.5px] text-muted-foreground hover:text-foreground"
                          >
                            View →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:hidden divide-y divide-border/50 border-t border-border/50">
                  {pageItems.map((v) => (
                    <Link
                      key={v.slug}
                      to={`/directory/${v.slug}`}
                      className="block py-4 hover:bg-surface-muted/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[14px] font-semibold text-foreground leading-snug">
                          {v.name}
                        </p>
                        <StatusBadge status={v.status} />
                      </div>
                      <p className="mt-1 text-[12.5px] text-muted-foreground">
                        {formatLocation(v)}
                      </p>
                      {v.clinicalFocus && v.clinicalFocus.length > 0 && (
                        <p className="mt-1 text-[12.5px] text-muted-foreground">
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
                className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4"
                aria-label="Directory pagination"
              >
                <p className="font-mono text-[12px] text-muted-foreground tabular-nums">
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
                        <span key={`e-${i}`} className="px-1 text-[12px] text-muted-foreground" aria-hidden>…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          aria-current={p === currentPage ? "page" : undefined}
                          className={`h-9 min-w-9 px-3 rounded-md text-[13px] tabular-nums ${
                            p === currentPage
                              ? "bg-primary text-primary-foreground"
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

      {/* Status meaning legend */}
      <section className="border-t border-border bg-background">
        <div className="container-wide py-12 md:py-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-5">
            What each status means
          </p>
          <dl className="divide-y divide-border/50 border-t border-border/50">
            {STATUS_ORDER.map((s) => (
              <div key={s} className="grid grid-cols-12 gap-4 py-3 items-center">
                <dt className="col-span-12 md:col-span-3 flex items-center gap-3">
                  <StatusBadge status={s} />
                </dt>
                <dd className="col-span-12 md:col-span-9 text-[13.5px] text-muted-foreground leading-relaxed">
                  {STATUS_LEGEND_DESC[s]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why verified status matters */}
      <section className="border-t border-border bg-surface-muted/40">
        <div className="container-wide py-14 md:py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-6">
            Why verified status matters
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                t: "For consumers",
                b: "A documented reference point beyond marketing claims.",
              },
              {
                t: "For vendors",
                b: "Public differentiation tied to reviewed records.",
              },
              {
                t: "For the market",
                b: "Sourcing transparency becomes easier to interpret when documented and undocumented operators are publicly distinguishable.",
              },
            ].map((c) => (
              <div key={c.t}>
                <p className="text-[13px] font-semibold text-foreground mb-2">{c.t}</p>
                <p className="text-[13.5px] text-muted-foreground leading-[1.7]">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge to vendor application */}
      <section className="border-t border-border bg-background">
        <div className="container-wide py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="md:col-span-8">
              <p className="text-[13px] font-semibold text-foreground mb-2">
                For vendors seeking public verification
              </p>
              <p className="text-[13.5px] text-muted-foreground leading-[1.7] max-w-[60ch]">
                Verification is recorded only after documentation review is complete.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to="/apply"
                className="text-[13px] font-medium text-foreground hover:text-primary"
              >
                Begin Verification →
              </Link>
            </div>
          </div>
          <p className="mt-10 text-[12px] text-muted-foreground/80 leading-relaxed max-w-[80ch]">
            Directory inclusion does not constitute medical advice, product endorsement, or a guarantee of clinical outcome. Verification, when published, reflects documentation reviewed at the time of assessment.
          </p>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
