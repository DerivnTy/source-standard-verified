import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Check, ChevronDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { PageMeta } from "@/components/PageMeta";
import { RegistryHeader } from "@/components/registry/RegistryHeader";

import { VendorRow } from "@/components/registry/VendorRow";
import { resolveStateAbbr, US_STATE_TO_ABBR } from "@/lib/usStates";
import {
  vendors,
  Vendor,
  getVendorFulfillment,
  VendorFulfillment,
} from "@/data/vendors";



type StatusKey = "any" | "verified" | "unverified";
type DeliveryKey = "any" | "online" | "in-person" | "hybrid";

const PAGE_SIZE = 10;

const STATUS_PILLS: { value: StatusKey; label: string }[] = [
  { value: "verified", label: "VERIFIED" },
  { value: "unverified", label: "UNVERIFIED" },
];

const DELIVERY_PILLS: { value: DeliveryKey; label: string }[] = [
  { value: "online", label: "ONLINE" },
  { value: "in-person", label: "IN-PERSON" },
  { value: "hybrid", label: "HYBRID" },
];

const SPECIALTY_MIN_COUNT = 2;

// Full state name lookup (abbr → "Full Name")
const ABBR_TO_STATE_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(US_STATE_TO_ABBR).map(([name, abbr]) => [
    abbr,
    name.replace(/\b\w/g, (c) => c.toUpperCase()),
  ]),
);

/** Smart query: name, city, state name/abbr, category, focus. */
const matchesQuery = (vendor: Vendor, query: string): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const stateAbbr = resolveStateAbbr(query);
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
  if (haystack.includes(q)) return true;
  if (stateAbbr && vendor.state === stateAbbr) return true;
  return false;
};

const formatLocation = (vendor: Vendor) => {
  if (vendor.city && vendor.state) return `${vendor.city}, ${vendor.state}`;
  return vendor.city || vendor.state || "—";
};

const vendorSpecialties = (v: Vendor): string[] => {
  const s = [...(v.clinicalFocus ?? [])];
  if (v.category) s.push(v.category);
  return s.map((x) => x.trim()).filter(Boolean);
};

/**
 * SoftPill — Apple-feel pill: light grey wash inactive, solid navy active.
 * 20px corner radius, tight padding.
 */
const SoftPill = ({
  label,
  active,
  onClick,
  fullWidth = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    data-pill
    aria-pressed={active}
    className={`inline-flex items-center justify-center font-sans font-semibold uppercase whitespace-nowrap transition-all active:scale-[0.97] ${
      fullWidth ? "w-full" : "shrink-0"
    }`}
    style={{
      fontSize: "11px",
      letterSpacing: "0.06em",
      height: "32px",
      padding: "0 14px",
      borderRadius: "20px",
      border: "1px solid hsl(var(--border))",
      backgroundColor: active ? "hsl(var(--foreground))" : "#FFFFFF",
      color: active ? "hsl(var(--background))" : "hsl(var(--foreground) / 0.75)",
    }}
  >
    {label}
  </button>
);

/**
 * FilterSelect — Source Standard styled select.
 * Trigger matches the pill/input language (36px, 20px radius, hairline, white).
 * Menu is a white card with hairline border, 16px radius, subtle elevation.
 */
const FilterSelect = ({
  value,
  onValueChange,
  ariaLabel,
  placeholder,
  options,
}: {
  value: string;
  onValueChange: (v: string) => void;
  ariaLabel: string;
  placeholder: string;
  options: { value: string; label: string }[];
}) => (
  <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
    <SelectPrimitive.Trigger
      aria-label={ariaLabel}
      className="font-sans w-full text-foreground focus:outline-none focus:ring-0 inline-flex items-center justify-between"
      style={{
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.02em",
        height: "36px",
        borderRadius: "20px",
        border: "1px solid hsl(var(--border))",
        backgroundColor: "#FFFFFF",
        padding: "0 14px",
      }}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          aria-hidden
          style={{ width: "12px", height: "12px", strokeWidth: 1.75, opacity: 0.55 }}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className="z-50 overflow-hidden bg-white animate-fade-in"
        style={{
          minWidth: "var(--radix-select-trigger-width)",
          maxHeight: "min(60vh, 320px)",
          border: "1px solid hsl(var(--border))",
          borderRadius: "16px",
          boxShadow: "0 8px 24px -12px rgba(0,16,33,0.18)",
        }}
      >
        <SelectPrimitive.Viewport style={{ padding: "6px" }}>
          {options.map((opt) => (
            <SelectPrimitive.Item
              key={opt.value}
              value={opt.value}
              className="relative flex cursor-pointer select-none items-center justify-between outline-none data-[highlighted]:bg-[hsl(var(--muted))]/60 data-[state=checked]:text-foreground"
              style={{
                fontSize: "12.5px",
                fontWeight: 500,
                letterSpacing: "0.01em",
                color: "#001021",
                padding: "8px 12px",
                borderRadius: "10px",
                lineHeight: 1.35,
              }}
            >
              <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator>
                <Check
                  aria-hidden
                  style={{ width: "14px", height: "14px", strokeWidth: 2, marginLeft: "10px" }}
                />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);


const VerifiedVendors = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [status, setStatus] = useState<StatusKey>("any");
  const [delivery, setDelivery] = useState<DeliveryKey>("any");
  const [specialties, setSpecialties] = useState<string[]>([]); // canonical lowercased keys
  const [stateFilter, setStateFilter] = useState<string>("any"); // 2-letter abbr or "any"
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [definitionsOpen, setDefinitionsOpen] = useState(true);

  const isSearching = query.trim().length > 0;

  // Sync query state with the ?q= param when it changes via navigation.
  useEffect(() => {
    const paramQ = searchParams.get("q") ?? "";
    setQuery((current) => (current === paramQ ? current : paramQ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Search-mode transitions:
  // - Entering search (empty → non-empty): auto-collapse filters + definitions.
  // - Clearing search (non-empty → empty): auto-restore both to expanded.
  // User manual toggles during search persist until the field is cleared.
  useEffect(() => {
    if (isSearching) {
      setFiltersOpen(false);
      setDefinitionsOpen(false);
    } else {
      setFiltersOpen(true);
      setDefinitionsOpen(true);
    }
  }, [isSearching]);


  const fulfillmentByVendor = useMemo(() => {
    const map = new Map<string, VendorFulfillment>();
    for (const vendor of vendors) map.set(vendor.slug, getVendorFulfillment(vendor));
    return map;
  }, []);

  // Dynamic specialty options — dedupe case-insensitively, keep first-seen label,
  // only surface options with >= SPECIALTY_MIN_COUNT vendors.
  const specialtyOptions = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const v of vendors) {
      const seen = new Set<string>();
      for (const raw of vendorSpecialties(v)) {
        const key = raw.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        const existing = counts.get(key);
        if (existing) existing.count += 1;
        else counts.set(key, { label: raw, count: 1 });
      }
    }
    return Array.from(counts.entries())
      .filter(([, v]) => v.count >= SPECIALTY_MIN_COUNT)
      .sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label))
      .map(([key, v]) => ({ key, label: v.label, count: v.count }));
  }, []);

  // Dynamic state options — only states actually present in the dataset.
  const stateOptions = useMemo(() => {
    const set = new Set<string>();
    for (const v of vendors) if (v.state) set.add(v.state);
    return Array.from(set)
      .map((abbr) => ({ abbr, name: ABBR_TO_STATE_NAME[abbr] ?? abbr }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => {
    return vendors.filter((vendor) => {
      if (!matchesQuery(vendor, query)) return false;
      if (status === "verified" && vendor.status !== "verified") return false;
      if (status === "unverified" && vendor.status === "verified") return false;
      if (delivery !== "any") {
        const f = fulfillmentByVendor.get(vendor.slug);
        if (f !== delivery) return false;
      }
      if (stateFilter !== "any" && vendor.state !== stateFilter) return false;
      if (specialties.length > 0) {
        const vs = new Set(vendorSpecialties(vendor).map((s) => s.toLowerCase()));
        const anyMatch = specialties.some((k) => vs.has(k));
        if (!anyMatch) return false;
      }
      return true;
    });
  }, [query, status, delivery, stateFilter, specialties, fulfillmentByVendor]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

  const visibleItems = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;
  const fadeKey = `${query}|${status}|${delivery}|${stateFilter}|${specialties.join(",")}`;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, status, delivery, stateFilter, specialties]);

  const activeFilterCount =
    (status !== "any" ? 1 : 0) +
    (delivery !== "any" ? 1 : 0) +
    (stateFilter !== "any" ? 1 : 0) +
    (specialties.length > 0 ? 1 : 0);

  const hasActiveFilters =
    query.trim().length > 0 ||
    status !== "any" ||
    delivery !== "any" ||
    stateFilter !== "any" ||
    specialties.length > 0;


  return (
    <>
      <PageMeta
        title="Vendor Registry"
        description="Search the Source Standard Registry to find out whether your provider has been independently verified and to better understand their peptide sourcing transparency."
        path="/verified-vendors"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Vendor Registry",
          url: "https://sourcestandard.org/verified-vendors",
        }}
      />

      <RegistryHeader
        indexNumber="01"
        title="Vendor Registry"
        description="Search the Source Standard Registry to find out whether your provider has been independently verified and to better understand their peptide sourcing transparency."
        recordCount={vendors.length}
      />


      {/* Floating stats card — centered on the navy/gray boundary */}
      <section
        className="relative"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--navy-surface)) 0%, hsl(var(--navy-surface)) 50%, hsl(var(--background)) 50%, hsl(var(--background)) 100%)",
        }}
      >
        <div className="page-shell">
          <div className="mx-auto flex min-h-[64px] w-wide items-center justify-center">
            <div className="w-full">
              <div
                role="group"
                aria-label="Registry summary"
                className="relative z-10 grid grid-cols-2 overflow-hidden bg-white"
                style={{
                  borderRadius: "10px",
                  border: "1px solid rgba(0,16,33,0.08)",
                }}
              >
                {[
                  { label: "Total Indexed", value: vendors.length },
                  { label: "States Represented", value: stateOptions.length },
                ].map((cell, idx) => (
                  <div
                    key={cell.label}
                    className="flex flex-col items-center justify-center text-center"
                    style={{
                      padding: "12px 10px",
                      borderLeft: idx === 0 ? "none" : "1px solid rgba(0,16,33,0.06)",
                    }}
                  >
                    <span
                      className="font-sans tabular-nums"
                      style={{
                        fontSize: "16px",
                        lineHeight: 1,
                        fontWeight: 600,
                        letterSpacing: "-0.01em",
                        color: "#001021",
                      }}
                    >
                      {cell.value.toLocaleString("en-US")}
                    </span>
                    <span
                      style={{
                        marginTop: "6px",
                        fontSize: "9.5px",
                        fontWeight: 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(0,16,33,0.55)",
                      }}
                    >
                      {cell.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="page-shell pb-4 md:pb-6">
          <div className="mx-auto w-wide">
            {/* Search — centerpiece, above filters */}
            <div className="-mx-5 md:mx-0 px-5 pt-4 md:pt-6">
              <div className="mx-auto w-full md:max-w-[640px]">
                <p
                  className="text-muted-foreground mb-2 text-center"
                  style={{ fontSize: "12px", lineHeight: 1.5, fontWeight: 400 }}
                >
                  Search clinics, telehealth providers, and wellness practices nationwide.
                </p>
                <div className="relative">
                  <Search
                    aria-hidden
                    className="pointer-events-none absolute text-muted-foreground/70"
                    style={{
                      top: "50%",
                      left: "18px",
                      width: "16px",
                      height: "16px",
                      strokeWidth: 1.75,
                      transform: "translateY(-50%)",
                    }}
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by provider, clinic, telehealth company, city, or state..."
                    aria-label="Search by provider, clinic, telehealth company, city, or state"
                    className="font-sans w-full text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
                    style={{
                      height: "52px",
                      borderRadius: "24px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid hsl(var(--border))",
                      paddingLeft: "44px",
                      paddingRight: "18px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Grouped filters — collapsible during search */}
            {isSearching && (
              <div className="-mx-5 md:mx-0 px-5 pt-3">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((o) => !o)}
                  aria-expanded={filtersOpen}
                  className="font-sans w-full inline-flex items-center justify-between text-foreground transition-colors hover:bg-[hsl(var(--muted))]/40"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    height: "36px",
                    borderRadius: "20px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "#FFFFFF",
                    padding: "0 14px",
                  }}
                >
                  <span>
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="text-muted-foreground font-medium">
                        {" "}
                        ({activeFilterCount})
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    aria-hidden
                    style={{
                      width: "12px",
                      height: "12px",
                      strokeWidth: 1.75,
                      opacity: 0.55,
                      transform: filtersOpen ? "rotate(180deg)" : "none",
                      transition: "transform 200ms ease",
                    }}
                  />
                </button>
              </div>
            )}
            {(!isSearching || filtersOpen) && (
            <div className="-mx-5 md:mx-0 px-5 pt-3 pb-2 space-y-3 animate-fade-in">

              {/* Verification Status */}
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  Verification Status
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_PILLS.map((p) => (
                    <SoftPill
                      key={`s-${p.value}`}
                      label={p.label}
                      active={status === p.value}
                      fullWidth
                      onClick={() =>
                        setStatus((curr) => (curr === p.value ? "any" : p.value))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Specialty (dynamic, single-select dropdown) */}
              {specialtyOptions.length > 0 && (
                <div>
                  <p
                    className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                    style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                  >
                    Specialty
                  </p>
                  <FilterSelect
                    value={specialties[0] ?? "any"}
                    onValueChange={(v) =>
                      setSpecialties(v === "any" ? [] : [v])
                    }
                    ariaLabel="Filter by specialty"
                    placeholder="All specialties"
                    options={[
                      { value: "any", label: "All specialties" },
                      ...specialtyOptions.map((opt) => ({
                        value: opt.key,
                        label: opt.label,
                      })),
                    ]}
                  />

                </div>
              )}


              {/* Vendor Type */}
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  Vendor Type
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {DELIVERY_PILLS.map((p) => (
                    <SoftPill
                      key={`d-${p.value}`}
                      label={p.label}
                      active={delivery === p.value}
                      fullWidth
                      onClick={() =>
                        setDelivery((curr) => (curr === p.value ? "any" : p.value))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* State */}
              {stateOptions.length > 0 && (
                <div>
                  <p
                    className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                    style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                  >
                    State
                  </p>
                  <FilterSelect
                    value={stateFilter}
                    onValueChange={setStateFilter}
                    ariaLabel="Filter by state"
                    placeholder="All states"
                    options={[
                      { value: "any", label: "All states" },
                      ...stateOptions.map((s) => ({ value: s.abbr, label: s.name })),
                    ]}
                  />

                </div>
              )}
            </div>
            )}

            {/* Status definitions — collapsible during search */}
            {isSearching && (
              <div className="-mx-5 md:mx-0 px-5 pt-3">
                <button
                  type="button"
                  onClick={() => setDefinitionsOpen((o) => !o)}
                  aria-expanded={definitionsOpen}
                  className="font-sans w-full inline-flex items-center justify-between text-foreground transition-colors hover:bg-[hsl(var(--muted))]/40"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    height: "36px",
                    borderRadius: "20px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "#FFFFFF",
                    padding: "0 14px",
                  }}
                >
                  <span>Verification Status Definitions</span>
                  <ChevronDown
                    aria-hidden
                    style={{
                      width: "12px",
                      height: "12px",
                      strokeWidth: 1.75,
                      opacity: 0.55,
                      transform: definitionsOpen ? "rotate(180deg)" : "none",
                      transition: "transform 200ms ease",
                    }}
                  />
                </button>
              </div>
            )}
            {(!isSearching || definitionsOpen) && (
            <div
              className="mt-3 bg-white animate-fade-in"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
              }}
            >

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[hsl(var(--border))]">
                {[
                  {
                    label: "VERIFIED",
                    body:
                      "Reviewed by Source Standard within a defined scope and point in time based on available evidence.",
                  },
                  {
                    label: "UNVERIFIED",
                    body:
                      "Has not yet met the requirements for Verified status within the Source Standard framework.",
                  },
                ].map((cell) => (
                  <div key={cell.label} style={{ padding: "12px 14px" }}>
                    <p
                      className="font-sans font-semibold uppercase text-muted-foreground"
                      style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                    >
                      {cell.label}
                    </p>
                    <p
                      className="mt-1.5 text-foreground"
                      style={{ fontSize: "12.5px", lineHeight: 1.5, fontWeight: 400 }}
                    >
                      {cell.body}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="px-3.5 py-2 text-right"
                style={{ borderTop: "1px solid hsl(var(--border) / 0.6)" }}
              >
                <Link
                  to="/how-it-works"
                  className="font-sans text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontSize: "11px", letterSpacing: "0.02em" }}
                >
                  View Verification Framework →
                </Link>
              </div>
            </div>
            )}



            {/* Result list */}
            <div key={fadeKey} className="mt-3 animate-fade-in">
              {sorted.length === 0 ? (
                hasActiveFilters ? (
                  <div
                    className="bg-white text-center"
                    style={{
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "16px",
                      padding: "28px 20px",
                    }}
                  >
                    <p
                      className="font-sans font-semibold text-foreground"
                      style={{ fontSize: "14px", lineHeight: 1.35 }}
                    >
                      Can't find your provider?
                    </p>
                    <p
                      className="mt-1.5 text-muted-foreground mx-auto"
                      style={{ fontSize: "13px", lineHeight: 1.55, maxWidth: "420px" }}
                    >
                      Let us know so we can add them to the registry for review.
                    </p>
                    <Link
                      to="/contact?topic=request-provider-review"
                      className="mt-4 inline-flex items-center gap-1.5 px-5 h-10 border border-foreground text-foreground text-[12px] font-medium rounded-full hover:bg-foreground hover:text-background transition-colors duration-150"
                    >
                      Request Provider Review
                    </Link>
                  </div>
                ) : (
                  <div
                    className="bg-white text-center text-muted-foreground"
                    style={{
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "16px",
                      padding: "28px 20px",
                      fontSize: "13px",
                    }}
                  >
                    Directory pending population.
                  </div>
                )
              ) : (
                <>
                  <ul className="flex flex-col gap-1 md:gap-1.5">
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
                        className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/15 bg-background px-6 font-sans text-[13.5px] font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-[hsl(var(--muted))]/40"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
