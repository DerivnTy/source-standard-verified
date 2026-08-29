import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Check, ChevronDown } from "lucide-react";
import * as SelectPrimitive from "@radix-ui/react-select";

import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { RegistryHeader } from "@/components/registry/RegistryHeader";

import { RegistryRow, type StatusKey as PillStatusKey } from "@/components/system";
import {
  greenlistEntries,
  getGreenlistCounts,
  getGreenlistStates,
  entryMatchesState,
} from "@/data/greenlist";
import { US_STATE_TO_ABBR } from "@/lib/usStates";

const ALL = "__all__";

type StatusKey = "all" | "greenlisted" | "monitoring" | "alert";
type FacilityTypeKey = "all" | "503A" | "503B" | "Manufacturer";

const ABBR_TO_STATE_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(US_STATE_TO_ABBR).map(([name, abbr]) => [
    abbr,
    name.replace(/\b\w/g, (c) => c.toUpperCase()),
  ]),
);

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
      fullWidth ? "w-full" : ""
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
 * FilterSelect, Source Standard styled select, matching Vendor Registry.
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

const STATUS_DEFINITIONS: { label: string; body: string; color: string }[] = [
  { label: "Monitoring", body: "Included in the database and followed against public records", color: "#F59E0B" },
  { label: "Greenlisted", body: "Records currently support Greenlisted status under the framework", color: "#22C55E" },
  { label: "Status Alert", body: "Additional information requires review", color: "#FF3B30" },
];

const Greenlist = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusKey>("all");
  const [facilityType, setFacilityType] = useState<FacilityTypeKey>("all");
  const [stateFilter, setStateFilter] = useState<string>(ALL);
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const isSearching = query.trim().length > 0;

  useEffect(() => {
    setFiltersOpen(!isSearching);
  }, [isSearching]);

  const activeFilterCount =
    (status !== "all" ? 1 : 0) +
    (facilityType !== "all" ? 1 : 0) +
    (stateFilter !== ALL ? 1 : 0);

  const counts = useMemo(() => getGreenlistCounts(), []);

  const stateOptions = useMemo(() => {
    const states = getGreenlistStates();
    return [
      { value: ALL, label: "All states" },
    ...states.map((abbr) => ({ value: abbr, label: ABBR_TO_STATE_NAME[abbr] ?? abbr })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return greenlistEntries.filter((e) => {
      if (q) {
        const hay = [e.name, e.location, e.focus, e.type, e.category]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (stateFilter !== ALL && !entryMatchesState(e, stateFilter)) return false;

      // Facility Type
      if (facilityType === "503A" && e.category !== "503A") return false;
      if (facilityType === "503B" && e.category !== "503B") return false;
      if (facilityType === "Manufacturer") {
        const isManufacturer =
          e.category === "Other" || /manufactur/i.test(e.type ?? "");
        if (!isManufacturer) return false;
      }

      // Status: no entries are Greenlisted at launch
      if (status === "greenlisted") return false;
      if (status === "alert" && !e.regulatoryAlert) return false;
      if (status === "monitoring" && e.regulatoryAlert) return false;
      return true;
    });
  }, [query, stateFilter, facilityType, status]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

  const visibleItems = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, stateFilter, facilityType, status]);

  const heroDescription =
    "Search the manufacturers and compounding pharmacies behind your provider's compounded therapies.";

  // Sticky compact bar, appears once the original search scrolls out of view.
  const searchRef = useRef<HTMLDivElement | null>(null);
  const filtersAnchorRef = useRef<HTMLDivElement | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: "-8px 0px 0px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scrollToFilters = () => {
    filtersAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageMeta
        title="Who Compounds Your Medication? · Facility Records"
        description={heroDescription}
        path="/facilities"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Facility Records",
          url: "https://sourcestandard.org/facilities",
        }}
      />

      <RegistryHeader
        indexNumber="02"
        title="Who Compounds Your Medication?"
        description={heroDescription}
        recordCount={counts.total}
      />

      <section className="bg-background">
        <div className="page-shell pt-4 md:pt-6 pb-10 md:pb-14">
          <div className="mx-auto w-wide">
            {/* Search, first interactive element */}
            <div ref={searchRef} className="-mx-5 md:mx-0 px-5">
              <div className="mx-auto w-full md:max-w-[640px]">
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
                    placeholder="Search manufacturer, pharmacy, or facility..."
                    aria-label="Search Facility Records"
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

            {/* Compact Greenlisted context strip, hidden during search */}
            {!isSearching && (
              <div className="-mx-5 md:mx-0 px-5 pt-2">
                <div
                  className="bg-white"
                  style={{
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "16px",
                    padding: "12px 14px",
                  }}
                >
                  <p
                    className="font-sans font-semibold uppercase text-muted-foreground"
                    style={{ fontSize: "10.5px", letterSpacing: "0.12em" }}
                  >
                    Facility Records
                  </p>
                  <p
                    className="mt-1 text-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.45, fontWeight: 500 }}
                  >
                    Facility Records list the compounding pharmacies, outsourcing facilities, and manufacturers followed by Source Standard. Each record shows the facility's current status within the framework.
                  </p>
                  <p
                    className="mt-0.5 text-muted-foreground"
                    style={{ fontSize: "12px", lineHeight: 1.45 }}
                  >
                    Facilities enter the record in Monitoring status. Greenlisted is a status a facility may earn under the framework; it is not a registration check.
                  </p>
                  <Link
                    to="/how-it-works"
                    className="mt-1.5 inline-flex items-center gap-1 font-sans text-foreground/80 hover:text-foreground underline-offset-4 hover:underline transition-colors"
                    style={{ fontSize: "12px", fontWeight: 500 }}
                  >
                    Learn more <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Filters, compact toggle during search */}
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
                        {" "}({activeFilterCount})
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
            <div ref={filtersAnchorRef} className="-mx-5 md:mx-0 px-5 pt-3 space-y-3 scroll-mt-16 animate-fade-in">
              {/* Status */}
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  Status
                </p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  <SoftPill label="All" active={status === "all"} fullWidth onClick={() => setStatus("all")} />
                  <SoftPill label="Greenlisted" active={status === "greenlisted"} fullWidth onClick={() => setStatus("greenlisted")} />
                  <SoftPill label="Monitoring" active={status === "monitoring"} fullWidth onClick={() => setStatus("monitoring")} />
                  <SoftPill label="Status Alert" active={status === "alert"} fullWidth onClick={() => setStatus("alert")} />
                </div>

                {/* Compact status guide legend */}
                <div className="mt-3">
                  <p
                    className="font-sans font-semibold uppercase text-muted-foreground mb-1.5"
                    style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                  >
                    Status Guide
                  </p>
                  <ul className="flex flex-col" style={{ gap: "5px" }}>
                    {STATUS_DEFINITIONS.map((s) => (
                      <li key={s.label} className="flex flex-col">
                        <div className="flex items-center" style={{ gap: "6px" }}>
                          <span
                            aria-hidden
                            className="inline-block rounded-full shrink-0"
                            style={{ width: "5px", height: "5px", backgroundColor: s.color }}
                          />
                          <span
                            className="font-sans text-foreground/80"
                            style={{ fontSize: "11px", fontWeight: 600, lineHeight: 1.3 }}
                          >
                            {s.label}
                          </span>
                        </div>
                        <span
                          className="font-sans text-muted-foreground"
                          style={{
                            fontSize: "11px",
                            lineHeight: 1.35,
                            paddingLeft: "11px",
                          }}
                        >
                          {s.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Facility Type */}
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  Facility Type
                </p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  <SoftPill label="All" active={facilityType === "all"} fullWidth onClick={() => setFacilityType("all")} />
                  <SoftPill label="503A Pharmacy" active={facilityType === "503A"} fullWidth onClick={() => setFacilityType("503A")} />
                  <SoftPill label="503B Facility" active={facilityType === "503B"} fullWidth onClick={() => setFacilityType("503B")} />
                  <SoftPill label="Manufacturer" active={facilityType === "Manufacturer"} fullWidth onClick={() => setFacilityType("Manufacturer")} />
                </div>
              </div>

              {/* State */}
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
                  options={stateOptions}
                />
              </div>
            </div>
            )}

            {/* Result list */}
            <div
              key={`${query}|${stateFilter}|${facilityType}|${status}`}
              className="mt-4 animate-fade-in"
            >
              {sorted.length === 0 ? (
                <EmptyState
                  eyebrow="No Records Found"
                  body={
                    status === "greenlisted"
                      ? "No manufacturer has yet satisfied Greenlisted criteria."
                      : "No facility matches these filters."
                  }
                />
              ) : (
                <>
                  <ul className="divide-y divide-border/60 border-t border-border/60">
                    {visibleItems.map((entry) => {
                      const pillStatus: PillStatusKey = entry.regulatoryAlert
                        ? "alert"
                        : "monitoring";
                      const loc = entry.state?.toUpperCase();
                      const metaParts = [entry.type, loc].filter(Boolean) as string[];
                      return (
                        <li key={entry.slug}>
                          <RegistryRow
                            to={`/facilities/${entry.slug}`}
                            name={entry.name}
                            status={pillStatus}
                            chip={entry.category}
                            metaLeft={metaParts.join(" · ")}
                            ariaLabel={`${entry.name}, ${entry.category}`}
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
                          setVisibleCount((n) => Math.min(n + PAGE_SIZE, sorted.length))
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

      {/* Compact sticky bar, appears after the original search scrolls out of view */}
      <div
        aria-hidden={!stickyVisible}
        className="fixed left-0 right-0 top-0 z-40"
        style={{
          transform: stickyVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 220ms ease-out",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          backgroundColor: "hsl(var(--background) / 0.85)",
          borderBottom: "1px solid hsl(var(--border))",
          pointerEvents: stickyVisible ? "auto" : "none",
        }}
      >
        <div className="page-shell" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
          <div className="mx-auto w-wide flex items-center" style={{ gap: "8px" }}>
            <div className="relative flex-1 min-w-0">
              <Search
                aria-hidden
                className="pointer-events-none absolute text-muted-foreground/70"
                style={{
                  top: "50%",
                  left: "14px",
                  width: "14px",
                  height: "14px",
                  strokeWidth: 1.75,
                  transform: "translateY(-50%)",
                }}
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search facility..."
                aria-label="Search Facility Records"
                className="font-sans w-full text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0"
                style={{
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid hsl(var(--border))",
                  paddingLeft: "36px",
                  paddingRight: "14px",
                }}
              />
            </div>
            <button
              type="button"
              onClick={scrollToFilters}
              className="font-sans font-semibold uppercase text-foreground/80 hover:text-foreground transition-colors shrink-0"
              style={{
                fontSize: "11px",
                letterSpacing: "0.06em",
                height: "40px",
                padding: "0 14px",
                borderRadius: "20px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "#FFFFFF",
              }}
            >
              Filters
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Greenlist;
