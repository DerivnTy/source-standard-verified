import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { RecordHeader } from "@/components/RecordHeader";
import { StatusBadge } from "@/components/StatusBadge";
import {
  vendors,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  VENDOR_STATUS_SHORT,
  getVendorStates,
  getClinicalFocusOptions,
} from "@/data/vendors";

const ALL = "__all__";

const STATUS_ORDER: VendorPublicStatus[] = [
  "verified",
  "under-review",
  "unverified",
  "suspended",
  "removed",
];

const formatLocation = (v: Vendor) => {
  if (v.city && v.state) return `${v.city}, ${v.state}`;
  return v.city || v.state || "—";
};

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);
  const [focus, setFocus] = useState<string>(ALL);
  const [hasReview, setHasReview] = useState<string>(ALL); // "yes" | "no" | ALL

  const states = useMemo(() => getVendorStates(), []);
  const focusOptions = useMemo(() => getClinicalFocusOptions(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((v) => {
      if (q) {
        const hay = [v.name, v.city, v.state, v.medicalDirector]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (state !== ALL && v.state !== state) return false;
      if (status !== ALL && v.status !== status) return false;
      if (focus !== ALL && !(v.clinicalFocus ?? []).includes(focus)) return false;
      if (hasReview === "yes" && !v.reviewId) return false;
      if (hasReview === "no" && v.reviewId) return false;
      return true;
    });
  }, [query, state, status, focus, hasReview]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const sa = STATUS_ORDER.indexOf(a.status);
      const sb = STATUS_ORDER.indexOf(b.status);
      if (sa !== sb) return sa - sb;
      return a.name.localeCompare(b.name);
    });
  }, [filtered]);

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

  const filtersActive =
    query !== "" ||
    state !== ALL ||
    status !== ALL ||
    focus !== ALL ||
    hasReview !== ALL;

  const reset = () => {
    setQuery("");
    setState(ALL);
    setStatus(ALL);
    setFocus(ALL);
    setHasReview(ALL);
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

      {/* Status legend */}
      <section className="bg-surface-muted border-b border-border">
        <div className="container-wide py-6">
          <p className="meta-label text-foreground mb-3">How to read this directory</p>
          <div className="grid md:grid-cols-5 gap-px bg-border border border-border">
            {STATUS_ORDER.map((s) => (
              <div key={s} className="bg-background p-3">
                <StatusBadge status={s} size="md" />
                <p className="mt-2 text-[12px] text-muted-foreground leading-relaxed">
                  {VENDOR_STATUS_SHORT[s]}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground leading-relaxed max-w-3xl">
            <strong className="text-foreground font-semibold">Note on “Unverified.”</strong>{" "}
            On this directory, “Unverified” means Source Standard verification is not currently
            published for that vendor. It does not indicate that the vendor is unsafe,
            noncompliant, or illegitimate.
          </p>
        </div>
      </section>

      {/* Filter row */}
      <section className="bg-background border-b border-border sticky top-0 z-20">
        <div className="container-wide py-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search vendor name, city, state, medical director"
                className="w-full pl-8 pr-3 h-8 bg-background border border-border text-[13px] placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
                aria-label="Search directory"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-8 px-2 bg-background border border-border text-[12px] text-foreground"
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
              className="h-8 px-2 bg-background border border-border text-[12px] text-foreground"
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
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="h-8 px-2 bg-background border border-border text-[12px] text-foreground"
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
              className="h-8 px-2 bg-background border border-border text-[12px] text-foreground"
              aria-label="Filter by published review"
            >
              <option value={ALL}>Review: any</option>
              <option value="yes">Has published review</option>
              <option value="no">No published review</option>
            </select>

            {filtersActive && (
              <button
                onClick={reset}
                className="h-8 px-2 inline-flex items-center gap-1 border border-border text-[12px] text-foreground hover:bg-surface-muted"
              >
                <X className="h-3 w-3" /> Reset
              </button>
            )}

            <p className="meta-label ml-auto">
              {sorted.length} {sorted.length === 1 ? "record" : "records"}
            </p>
          </div>
        </div>
      </section>

      {/* Registry table */}
      <section>
        <div className="container-wide py-6">
          {sorted.length === 0 ? (
            <div className="border border-border bg-surface-muted px-4 py-10 text-center">
              <p className="meta">
                {vendors.length === 0
                  ? "— Directory pending population. First batch import scheduled."
                  : "— No records match the current filters."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block border border-border bg-background">
                <div className="grid grid-cols-12 px-3 py-2 border-b border-border bg-surface-muted">
                  <div className="col-span-4 meta-label">Vendor / Clinic</div>
                  <div className="col-span-2 meta-label">Status</div>
                  <div className="col-span-2 meta-label">City / State</div>
                  <div className="col-span-3 meta-label">Clinical focus</div>
                  <div className="col-span-1 meta-label text-right">Profile</div>
                </div>
                {sorted.map((v) => (
                  <div
                    key={v.slug}
                    className="grid grid-cols-12 px-3 py-2 border-b border-border last:border-b-0 items-center hover:bg-surface-muted/50"
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
              <div className="md:hidden space-y-2">
                {sorted.map((v) => (
                  <Link
                    key={v.slug}
                    to={`/directory/${v.slug}`}
                    className="block border border-border bg-background p-3"
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
