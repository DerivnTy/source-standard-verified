import { useEffect, useMemo, useState } from "react";
import { Building2, Globe, MapPin } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { RegistryHorizon } from "@/components/registry/RegistryHorizon";
import {
  QueryBar,
  FacetSelect,
  FacetGroup,
  FacetToggle,
  FacetDivider,
  ActiveChip,
} from "@/components/registry/QueryBar";
import { RegistryPagination } from "@/components/registry/RegistryPagination";
import { VerificationShield } from "@/components/registry/VerificationShield";
import { VendorAuditCard } from "@/components/registry/VendorAuditCard";
import {
  vendors,
  Vendor,
  VendorPublicStatus,
  VENDOR_STATUS_LABEL,
  getVendorStates,
  getVendorCities,
  getVendorCityKey,
  getClinicalFocusOptions,
  getVendorFulfillment,

  VendorFulfillment,
  VENDOR_FULFILLMENT_LABEL,
  VENDOR_FULFILLMENT_DESC,
} from "@/data/vendors";

const ALL = "__all__";

type SortMode = "name-asc" | "location" | "latest-audit";

type FulfillmentFilter = "all" | VendorFulfillment;
type VerifiedOnlyFilter = "all" | "verified";
type ViewMode = "list" | "grid";

const STATUS_ORDER: VendorPublicStatus[] = [
  "verified",
  "under-review",
  "unverified",
  "suspended",
  "removed",
];

const STATUS_RANK: Record<VendorPublicStatus, number> = {
  verified: 0,
  "under-review": 1,
  unverified: 2,
  suspended: 3,
  removed: 4,
};

const STATUS_LEGEND_DESC: Record<VendorPublicStatus, string> = {
  verified: "Source Standard has published a completed verification on file.",
  "under-review": "An application is currently undergoing review.",
  unverified: "No completed verification on file. Not a judgment of safety or compliance.",
  suspended: "A previously published verification has been temporarily paused.",
  removed: "Listing removed from the public directory; record preserved for transparency.",
};


const FulfillmentChip = ({ kind }: { kind: VendorFulfillment }) => {
  const Icon =
    kind === "in-person" ? Building2 : kind === "online" ? Globe : MapPin;
  return (
    <span
      title={VENDOR_FULFILLMENT_DESC[kind]}
      className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-[2px] border border-border/70 bg-surface-muted/40 text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground whitespace-nowrap"
    >
      <Icon className="h-2.5 w-2.5" aria-hidden />
      {VENDOR_FULFILLMENT_LABEL[kind]}
    </span>
  );
};

const formatLocation = (v: Vendor) => {
  if (v.city && v.state) return `${v.city}, ${v.state}`;
  return v.city || v.state || "—";
};

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState<VerifiedOnlyFilter>("all");
  const [fulfillment, setFulfillment] = useState<FulfillmentFilter>("all");
  const [state, setState] = useState<string>(ALL);
  const [city, setCity] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);
  const [focus, setFocus] = useState<string>(ALL);
  const [sort, setSort] = useState<SortMode>("name-asc");
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

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

  // Pre-compute fulfillment per vendor once.
  const fulfillmentByVendor = useMemo(() => {
    const m = new Map<string, VendorFulfillment>();
    for (const v of vendors) m.set(v.slug, getVendorFulfillment(v));
    return m;
  }, []);

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

  
  const statesRepresented = states.length;
  const totalAudits = useMemo(
    () => vendors.filter((v) => Boolean(v.reviewId)).length,
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((v) => {
      if (q) {
        const hay = [
          v.name,
          v.medicalDirector,
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
      if (verifiedOnly === "verified" && v.status !== "verified") return false;
      if (fulfillment !== "all" && fulfillmentByVendor.get(v.slug) !== fulfillment)
        return false;
      if (state !== ALL && v.state !== state) return false;
      if (city !== ALL && getVendorCityKey(v) !== city) return false;
      if (status !== ALL && v.status !== status) return false;
      if (focus !== ALL && !(v.clinicalFocus ?? []).includes(focus)) return false;
      return true;
    });
  }, [query, verifiedOnly, fulfillment, state, city, status, focus, fulfillmentByVendor]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    const byName = (a: Vendor, b: Vendor) => a.name.localeCompare(b.name);
    switch (sort) {
      case "location":
        return arr.sort((a, b) => {
          const s = (a.state ?? "").localeCompare(b.state ?? "");
          if (s !== 0) return s;
          const c = (a.city ?? "").localeCompare(b.city ?? "");
          return c !== 0 ? c : byName(a, b);
        });
      case "latest-audit":
        return arr.sort((a, b) => {
          const da = a.reviewDate ?? "";
          const db = b.reviewDate ?? "";
          if (da !== db) return db.localeCompare(da);
          return byName(a, b);
        });
      case "name-asc":
      default:
        return arr.sort(byName);
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, verifiedOnly, fulfillment, state, city, status, focus, sort, pageSize]);

  const filtersActive =
    query !== "" ||
    verifiedOnly !== "all" ||
    fulfillment !== "all" ||
    state !== ALL ||
    city !== ALL ||
    status !== ALL ||
    focus !== ALL;

  const reset = () => {
    setQuery("");
    setVerifiedOnly("all");
    setFulfillment("all");
    setState(ALL);
    setCity(ALL);
    setStatus(ALL);
    setFocus(ALL);
  };

  // Active chips
  const activeChips: ActiveChip[] = [];
  if (verifiedOnly === "verified") {
    activeChips.push({
      key: "verified-only",
      label: "Verified only",
      onRemove: () => setVerifiedOnly("all"),
    });
  }
  if (fulfillment !== "all") {
    activeChips.push({
      key: "fulfillment",
      label: VENDOR_FULFILLMENT_LABEL[fulfillment],
      onRemove: () => setFulfillment("all"),
    });
  }
  if (status !== ALL) {
    activeChips.push({
      key: "status",
      label: `Status: ${VENDOR_STATUS_LABEL[status as VendorPublicStatus]}`,
      onRemove: () => setStatus(ALL),
    });
  }
  if (state !== ALL) {
    activeChips.push({
      key: "state",
      label: `State: ${state}`,
      onRemove: () => setState(ALL),
    });
  }
  if (city !== ALL) {
    activeChips.push({
      key: "city",
      label: `City: ${city}`,
      onRemove: () => setCity(ALL),
    });
  }
  if (focus !== ALL) {
    activeChips.push({
      key: "focus",
      label: `Focus: ${focus}`,
      onRemove: () => setFocus(ALL),
    });
  }
  if (query) {
    activeChips.push({
      key: "query",
      label: `“${query}”`,
      onRemove: () => setQuery(""),
    });
  }

  const sortControl = (
    <FacetSelect
      value={sort}
      onChange={(v) => setSort(v as SortMode)}
      ariaLabel="Sort records"
    >
      <option value="name-asc">SORT // ALPHABETICAL</option>
      <option value="location">SORT // LOCATION</option>
      <option value="latest-audit">SORT // LATEST_AUDIT</option>
    </FacetSelect>
  );

  const facets = (
    <>
      {/* Verified-only — primary trust filter */}
      <FacetGroup ariaLabel="Verification filter">
        <FacetToggle
          active={verifiedOnly === "all"}
          onClick={() => setVerifiedOnly("all")}
        >
          Show all
        </FacetToggle>
        <FacetToggle
          tone="verified"
          active={verifiedOnly === "verified"}
          onClick={() => setVerifiedOnly("verified")}
        >
          Verified only
        </FacetToggle>
      </FacetGroup>

      <FacetDivider />

      {/* Fulfillment — second core filter */}
      <FacetGroup ariaLabel="Fulfillment filter">
        {(
          [
            { value: "in-person", label: "In-Person" },
            { value: "online", label: "Online" },
            { value: "hybrid", label: "Hybrid" },
          ] as { value: VendorFulfillment; label: string }[]
        ).map((opt) => {
          const active = fulfillment === opt.value;
          return (
            <FacetToggle
              key={opt.value}
              active={active}
              onClick={() => setFulfillment(active ? "all" : opt.value)}
            >
              {opt.label}
            </FacetToggle>
          );
        })}
      </FacetGroup>

      <FacetDivider />

      <FacetSelect
        value={state}
        onChange={setState}
        ariaLabel="Filter by state"
      >
        <option value={ALL}>All states</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </FacetSelect>

      <FacetSelect
        value={city}
        onChange={setCity}
        ariaLabel="Filter by city"
      >
        <option value={ALL}>All cities</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </FacetSelect>

      <FacetSelect
        value={focus}
        onChange={setFocus}
        ariaLabel="Filter by clinical focus"
      >
        <option value={ALL}>All clinical focus</option>
        {focusOptions.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </FacetSelect>

    </>
  );

  const STATUS_TABS: { value: string; label: string }[] = [
    { value: ALL, label: "All" },
    ...STATUS_ORDER.map((s) => ({
      value: s as string,
      label: VENDOR_STATUS_LABEL[s],
    })),
  ];

  return (
    <>
      <PageMeta
        title="The Public Trust Registry · Verified Vendors"
        description="The national database for peptide and hormone sourcing transparency. Verify whether a clinic's sourcing has been substantiated by licensed facility records."
      />

      <RegistryHeader
        indexNumber="01"
        title="Verified Registry"
        statusLine="REGISTRY_STATUS // ACTIVE"
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

      {/* Query + result surface */}
      <section className="bg-background">
        <div className="page-shell pt-20 pb-20 md:pt-14 md:pb-14">
          <div className="mx-auto w-wide">
            {/* View toggle — sharp rectangular */}
            <div className="mb-3 flex justify-end">
              <div
                role="radiogroup"
                aria-label="View mode"
                className="inline-flex overflow-hidden rounded-[2px]"
                style={{ border: "1px solid #64748B" }}
              >
                {(
                  [
                    { value: "list", label: "[ LIST VIEW ]" },
                    { value: "grid", label: "[ GRID VIEW ]" },
                  ] as { value: ViewMode; label: string }[]
                ).map((opt, i) => {
                  const active = view === opt.value;
                  return (
                    <button
                      key={opt.value}
                      role="radio"
                      aria-checked={active}
                      onClick={() => setView(opt.value)}
                      className={`h-9 px-3 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                        i > 0 ? "border-l" : ""
                      } ${
                        active
                          ? "bg-[hsl(var(--navy-surface))] text-white"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                      style={{ borderColor: "#64748B" }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Tabs — sharp rectangular, navy when active */}
            <div
              role="tablist"
              aria-label="Filter by status"
              className="mb-4 flex flex-wrap overflow-hidden rounded-[2px]"
              style={{ border: "1px solid #64748B" }}
            >
              {STATUS_TABS.map((t, i) => {
                const active = status === t.value;
                return (
                  <button
                    key={t.value}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStatus(t.value)}
                    className={`h-10 px-4 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${
                      i > 0 ? "border-l" : ""
                    } ${
                      active
                        ? "bg-[hsl(var(--navy-surface))] text-white"
                        : "bg-background text-muted-foreground hover:text-foreground hover:bg-surface-muted/40"
                    }`}
                    style={{ borderColor: "#64748B" }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <QueryBar
              query={query}
              onQueryChange={setQuery}
              searchPlaceholder="[ SEARCH_VENDOR_ID ]"
              resultLabel={
                sorted.length === 0
                  ? "0 of 0 records"
                  : `${sorted.length.toLocaleString()} of ${vendors.length.toLocaleString()} records`
              }
              sortControl={sortControl}
              facets={facets}
              hasActiveFilters={filtersActive}
              onReset={reset}
              activeChips={activeChips}
            />
            <p className="mt-3 px-5 md:px-0 text-[12px] text-muted-foreground">
              Filter by state or fulfillment.
            </p>

            <div className="mt-5">
              {sorted.length === 0 ? (
                <EmptyState
                  eyebrow="No matching vendors"
                  body={
                    vendors.length === 0
                      ? "Directory pending population."
                      : "No vendors match these filters. Try clearing one."
                  }
                />
              ) : view === "list" ? (
                <ul className="rounded-[2px] border border-border bg-card overflow-hidden divide-y divide-border">
                  {pageItems.map((v) => {
                    const ful = fulfillmentByVendor.get(v.slug)!;
                    return (
                      <li key={v.slug}>
                        <VendorAuditCard
                          vendor={v}
                          fulfillment={ful}
                          location={formatLocation(v)}
                          view="list"
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pageItems.map((v) => {
                    const ful = fulfillmentByVendor.get(v.slug)!;
                    return (
                      <li key={v.slug}>
                        <VendorAuditCard
                          vendor={v}
                          fulfillment={ful}
                          location={formatLocation(v)}
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

      {/* Registry logic — reference layer at the bottom */}
      <section className="border-t border-border bg-surface-muted/30">
        <div className="page-shell pt-20 pb-16 md:pt-14 md:pb-14">
          <div className="mx-auto w-wide">
            <p className="t-utility-xs text-muted-foreground mb-3">
              02 · Registry logic
            </p>
            <h2 className="t-section-title-sm text-foreground max-w-[40ch]">
              Understanding the Registry
            </h2>
            <p className="mt-6 text-[14px] text-muted-foreground max-w-[44ch] leading-[1.6]">
              Four states. One audit standard. No marketing claims.
            </p>

            <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 border-t border-border/50 pt-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-0.5">
                  <VerificationShield />
                </div>
                <p className="text-[13px] text-muted-foreground leading-[1.55] max-w-[60ch]">
                  <span className="font-semibold text-foreground">Verified.</span>{" "}
                  Sourcing cross-referenced with 503A/503B pharmacy records.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-0.5">
                  <StatusBadge status="unverified" />
                </div>
                <p className="text-[13px] text-muted-foreground leading-[1.55] max-w-[60ch]">
                  <span className="font-semibold text-foreground">Unverified.</span>{" "}
                  No sourcing on file. Audit not submitted.
                </p>
              </div>
              {counts["under-review"] > 0 && (
                <div className="flex items-start gap-4">
                  <div className="shrink-0 pt-0.5">
                    <StatusBadge status="under-review" />
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-[1.55] max-w-[60ch]">
                    <span className="font-semibold text-foreground">Under review.</span>{" "}
                    Application in audit.
                  </p>
                </div>
              )}
              {counts.suspended > 0 && (
                <div className="flex items-start gap-4">
                  <div className="shrink-0 pt-0.5">
                    <StatusBadge status="suspended" />
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-[1.55] max-w-[60ch]">
                    <span className="font-semibold text-foreground">Suspended.</span>{" "}
                    Verification temporarily paused.
                  </p>
                </div>
              )}
              {counts.removed > 0 && (
                <div className="flex items-start gap-4">
                  <div className="shrink-0 pt-0.5">
                    <StatusBadge status="removed" />
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-[1.55] max-w-[60ch]">
                    <span className="font-semibold text-foreground">Removed.</span>{" "}
                    Delisted. Record preserved for transparency.
                  </p>
                </div>
              )}
            </dl>

          </div>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
