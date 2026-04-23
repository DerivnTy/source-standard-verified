import { useEffect, useMemo, useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { RegistryHorizon } from "@/components/registry/RegistryHorizon";
import { VendorRow } from "@/components/registry/VendorRow";
import { resolveStateAbbr } from "@/lib/usStates";
import {
  vendors,
  Vendor,
  VendorPublicStatus,
  getVendorStates,
  getVendorFulfillment,
  VendorFulfillment,
} from "@/data/vendors";

type StatusPill = "all" | "verified" | "unverified";

const PAGE_SIZE = 10;

const formatLocation = (vendor: Vendor) => {
  if (vendor.city && vendor.state) return `${vendor.city}, ${vendor.state}`;
  return vendor.city || vendor.state || "—";
};

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort, setSort] = useState<SortMode>("name-asc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);
  const [sortSheetOpen, setSortSheetOpen] = useState(false);

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
    const stateAbbr = resolveStateAbbr(query);

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

        const textMatch = haystack.includes(normalizedQuery);
        const stateMatch = stateAbbr ? vendor.state === stateAbbr : false;

        if (!textMatch && !stateMatch) return false;
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

  const visibleItems = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, category, sort]);

  const categoryOptions = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...categories.map((c) => ({ value: c, label: c })),
    ],
    [categories],
  );

  const sortOptions: { value: SortMode; label: string }[] = [
    { value: "name-asc", label: "Alphabetical" },
    { value: "location", label: "Location" },
    { value: "latest-audit", label: "Latest Audit" },
  ];

  const activeCategoryLabel =
    categoryOptions.find((o) => o.value === category)?.label ?? "Category";
  const activeSortLabel =
    sortOptions.find((o) => o.value === sort)?.label ?? "Sort";

  return (
    <>
      <PageMeta
        title="The Public Trust Registry · Verified Vendors"
        description="The national database for peptide and hormone sourcing transparency. Verify whether a clinic's sourcing has been substantiated by licensed facility records."
      />

      <RegistryHeader
        indexNumber="01"
        title="Verified Vendors"
        description="The recognized registry of clinical vendors cross-referenced with licensed FDA-approved facilities to separate documented medical sourcing from the unverified market."
        recordCount={vendors.length}
      />

      <RegistryHorizon
        seam
        cells={[
          { label: "Total Recognized", value: counts.verified },
          { label: "States Represented", value: statesRepresented },
          { label: "Total Audits", value: totalAudits },
        ]}
      />

      <section className="bg-background">
        <div className="page-shell pt-12 pb-20 md:pt-14 md:pb-14">
          <div className="mx-auto w-wide">
            {/* Custom underline search input */}
            <div className="px-5 md:px-0">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, city, state…"
                aria-label="Search the registry"
                className="font-sans w-full bg-transparent py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                style={{
                  borderBottom: "1px solid hsl(var(--border))",
                  transition: "border-color 0.5s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor =
                    "hsl(var(--navy-surface))";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor =
                    "hsl(var(--border))";
                }}
              />
            </div>

            {/* Filter / Sort triggers */}
            <div className="mt-4 flex items-center gap-2 px-5 md:px-0">
              <button
                type="button"
                onClick={() => setCategorySheetOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-[2px] border border-border bg-background px-3.5 text-[13px] text-foreground transition-colors hover:border-foreground/40"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span className="font-sans">{activeCategoryLabel}</span>
              </button>
              <button
                type="button"
                onClick={() => setSortSheetOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-[2px] border border-border bg-background px-3.5 text-[13px] text-foreground transition-colors hover:border-foreground/40"
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span className="font-sans">{activeSortLabel}</span>
              </button>
              <div className="ml-auto font-mono text-[11.5px] text-muted-foreground tabular-nums">
                {sorted.length.toLocaleString()} / {vendors.length.toLocaleString()}
              </div>
            </div>

            {/* Vendor card stack */}
            <div className="mt-6">
              {sorted.length === 0 ? (
                <EmptyState
                  eyebrow="No matching vendors"
                  body={
                    vendors.length === 0
                      ? "Directory pending population."
                      : "No vendors match the current search."
                  }
                />
              ) : (
                <>
                  <ul className="flex flex-col overflow-hidden rounded-[2px] border border-border bg-card divide-y divide-border">
                    {visibleItems.map((vendor) => {
                      const fulfillment = fulfillmentByVendor.get(vendor.slug)!;
                      return (
                        <li key={vendor.slug}>
                          <VendorRow
                            vendor={vendor}
                            fulfillment={fulfillment}
                            location={formatLocation(vendor)}
                          />
                        </li>
                      );
                    })}
                  </ul>

                  {hasMore && (
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount((n) =>
                            Math.min(n + PAGE_SIZE, sorted.length),
                          )
                        }
                        className="inline-flex h-11 items-center justify-center rounded-[2px] border border-foreground/15 bg-background px-6 font-sans text-[13px] font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-[hsl(var(--muted))]/40"
                      >
                        Load More
                        <span className="ml-2 font-mono text-[11px] text-muted-foreground tabular-nums">
                          +{Math.min(PAGE_SIZE, sorted.length - visibleCount)}
                        </span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <FilterBottomSheet
        open={categorySheetOpen}
        onOpenChange={setCategorySheetOpen}
        title="Filter by Category"
        options={categoryOptions}
        value={category}
        onChange={(v) => setCategory(v)}
      />
      <FilterBottomSheet
        open={sortSheetOpen}
        onOpenChange={setSortSheetOpen}
        title="Sort Records"
        options={sortOptions}
        value={sort}
        onChange={(v) => setSort(v as SortMode)}
      />

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
