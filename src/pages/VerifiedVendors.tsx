import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { RegistryHorizon } from "@/components/registry/RegistryHorizon";
import { RegistryPagination } from "@/components/registry/RegistryPagination";
import { VendorAuditCard } from "@/components/registry/VendorAuditCard";
import {
  vendors,
  Vendor,
  VendorPublicStatus,
  getVendorStates,
  getVendorFulfillment,
  VendorFulfillment,
} from "@/data/vendors";

type SortMode = "name-asc" | "location" | "latest-audit";
type CategoryFilter = "all" | string;
type ViewMode = "list" | "grid";

const formatLocation = (vendor: Vendor) => {
  if (vendor.city && vendor.state) return `${vendor.city}, ${vendor.state}`;
  return vendor.city || vendor.state || "—";
};

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortMode>("name-asc");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const states = useMemo(() => getVendorStates(), []);
  const categories = useMemo(
    () => Array.from(new Set(vendors.map((vendor) => vendor.category))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const fulfillmentByVendor = useMemo(() => {
    const map = new Map<string, VendorFulfillment>();
    for (const vendor of vendors) map.set(vendor.slug, getVendorFulfillment(vendor));
    return map;
  }, []);

  const counts = useMemo(() => {
    const next: Record<VendorPublicStatus, number> = {
      verified: 0,
      unverified: 0,
      "under-review": 0,
      suspended: 0,
      removed: 0,
    };

    for (const vendor of vendors) next[vendor.status] += 1;
    return next;
  }, []);

  const statesRepresented = states.length;
  const totalAudits = useMemo(
    () => vendors.filter((vendor) => Boolean(vendor.reviewId)).length,
    [],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return vendors.filter((vendor) => {
      if (normalizedQuery) {
        const haystack = [
          vendor.name,
          vendor.city,
          vendor.state,
          vendor.category,
          ...(vendor.clinicalFocus ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(normalizedQuery)) return false;
      }

      if (category !== "all" && vendor.category !== category) return false;

      return true;
    });
  }, [query, category]);

  const sorted = useMemo(() => {
    const records = [...filtered];
    const byName = (a: Vendor, b: Vendor) => a.name.localeCompare(b.name);

    switch (sort) {
      case "location":
        return records.sort((a, b) => {
          const byState = (a.state ?? "").localeCompare(b.state ?? "");
          if (byState !== 0) return byState;

          const byCity = (a.city ?? "").localeCompare(b.city ?? "");
          return byCity !== 0 ? byCity : byName(a, b);
        });
      case "latest-audit":
        return records.sort((a, b) => {
          const aDate = a.reviewDate ?? "";
          const bDate = b.reviewDate ?? "";
          if (aDate !== bDate) return bDate.localeCompare(aDate);
          return byName(a, b);
        });
      case "name-asc":
      default:
        return records.sort(byName);
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, category, sort, pageSize]);

  const toolbarSelectClass =
    "h-9 min-w-0 border-0 bg-background px-3 pr-8 text-[12.5px] text-foreground focus:outline-none focus:ring-0 appearance-none bg-no-repeat bg-[length:9px_9px] bg-[right_10px_center]";

  const toolbarChevron = {
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='none' stroke='%2364748b' stroke-width='1.5' d='M2 4l3 3 3-3'/%3E%3C/svg%3E\")",
  };

  return (
    <>
      <PageMeta
        title="The Public Trust Registry · Verified Vendors"
        description="The national database for peptide and hormone sourcing transparency. Verify whether a clinic's sourcing has been substantiated by licensed facility records."
      />

      <RegistryHeader
        indexNumber="01"
        title="Verified Registry"
        statusLine="Live Registry"
        recordCount={vendors.length}
        hideRecordPill
      />

      <RegistryHorizon
        seam
        cells={[
          { label: "Vendors Verified", value: counts.verified },
          { label: "States Represented", value: statesRepresented },
          { label: "Total Audits", value: totalAudits },
        ]}
      />

      <section className="bg-background">
        <div className="page-shell pt-12 pb-20 md:pt-14 md:pb-14">
          <div className="mx-auto w-wide">
            <div className="mb-3 flex justify-end px-5 md:px-0">
              <div
                role="radiogroup"
                aria-label="View mode"
                className="inline-flex overflow-hidden rounded-[2px]"
                style={{ border: "1px solid hsl(var(--border))" }}
              >
                {[
                  { value: "list", label: "List" },
                  { value: "grid", label: "Grid" },
                ].map((option, index) => {
                  const active = view === option.value;
                  return (
                    <button
                      key={option.value}
                      role="radio"
                      aria-checked={active}
                      onClick={() => setView(option.value as ViewMode)}
                      className={`h-7 px-3 text-[11.5px] transition-colors ${
                        index > 0 ? "border-l" : ""
                      } ${
                        active
                          ? "bg-[hsl(var(--navy-surface))] text-white"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="mx-5 md:mx-0 flex items-stretch overflow-hidden rounded-[2px]"
              style={{ border: "1px solid hsl(var(--border))" }}
            >
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Facility Database..."
                  aria-label="Search facility database"
                  className="h-9 w-full bg-background pl-9 pr-3 text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                />
              </div>

              <div className="shrink-0 border-l" style={{ borderColor: "hsl(var(--border))" }}>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  aria-label="Category"
                  className={toolbarSelectClass}
                  style={toolbarChevron}
                >
                  <option value="all">Category</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="shrink-0 border-l" style={{ borderColor: "hsl(var(--border))" }}>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortMode)}
                  aria-label="Sort"
                  className={toolbarSelectClass}
                  style={toolbarChevron}
                >
                  <option value="name-asc">Alphabetical</option>
                  <option value="location">Location</option>
                  <option value="latest-audit">Latest Audit</option>
                </select>
              </div>
            </div>

            <div className="mt-2 px-5 md:px-0 text-[12px] text-muted-foreground tabular-nums">
              {sorted.length === 0
                ? "0 of 0"
                : `${sorted.length.toLocaleString()} of ${vendors.length.toLocaleString()}`}
            </div>

            <div className="mt-5">
              {sorted.length === 0 ? (
                <EmptyState
                  eyebrow="No matching vendors"
                  body={
                    vendors.length === 0
                      ? "Directory pending population."
                      : "No vendors match the current search."
                  }
                />
              ) : view === "list" ? (
                <ul className="overflow-hidden rounded-[2px] border border-border bg-card divide-y divide-border">
                  {pageItems.map((vendor) => {
                    const fulfillment = fulfillmentByVendor.get(vendor.slug)!;
                    return (
                      <li key={vendor.slug}>
                        <VendorAuditCard
                          vendor={vendor}
                          fulfillment={fulfillment}
                          location={formatLocation(vendor)}
                          view="list"
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {pageItems.map((vendor) => {
                    const fulfillment = fulfillmentByVendor.get(vendor.slug)!;
                    return (
                      <li key={vendor.slug}>
                        <VendorAuditCard
                          vendor={vendor}
                          fulfillment={fulfillment}
                          location={formatLocation(vendor)}
                          view="grid"
                        />
                      </li>
                    );
                  })}
                </ul>
              )}

              {sorted.length > pageSize && (
                <RegistryPagination
                  page={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalRecords={sorted.length}
                  onPageChange={setPage}
                  onPageSizeChange={setPageSize}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted/30">
        <div className="page-shell pt-16 md:pt-20" style={{ paddingBottom: "80px" }}>
          <div className="mx-auto w-wide">
            <p className="font-mono text-[12px] tracking-[0.04em] text-muted-foreground">
              02
            </p>
            <h2 className="mt-4 t-section-title-sm max-w-[40ch] text-left text-foreground">
              Understanding the Registry
            </h2>
            <p className="mt-3 max-w-[60ch] text-[14px] text-muted-foreground">
              Four states. One audit standard. No marketing claims.
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-border pt-8 md:grid-cols-2">
              {[
                {
                  id: "01",
                  title: "Verification Criteria",
                  body: "Sourcing cross-referenced with 503A and 503B pharmacy records. Invoices and licenses on file.",
                },
                {
                  id: "02",
                  title: "Audit Frequency",
                  body: "Re-verification every 12 months. Triggered earlier on supplier or sourcing change.",
                },
                {
                  id: "03",
                  title: "Unverified Status",
                  body: "No sourcing on file. Not a judgment of safety or compliance.",
                },
                {
                  id: "04",
                  title: "Under Review",
                  body: "Application in active audit. Public record updates on completion.",
                  show: counts["under-review"] > 0,
                },
                {
                  id: "05",
                  title: "Suspended",
                  body: "Verification temporarily paused pending source clarification.",
                  show: counts.suspended > 0,
                },
                {
                  id: "06",
                  title: "Removed",
                  body: "Delisted from the active directory. Record preserved for transparency.",
                  show: counts.removed > 0,
                },
              ]
                .filter((item) => item.show !== false)
                .map((item) => (
                  <div key={item.id} className="text-left">
                    <p className="font-mono text-[11px] tracking-[0.04em] text-muted-foreground">
                      {item.id}
                    </p>
                    <h3 className="mt-2 text-[15px] font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p
                      className="mt-2 max-w-[48ch] text-[13.5px] text-muted-foreground"
                      style={{ lineHeight: 1.6 }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
            </dl>

            <div className="mt-12 flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[12.5px] text-muted-foreground">
                Live Registry — updated continuously
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
