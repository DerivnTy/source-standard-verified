import { useEffect, useMemo, useRef, useState } from "react";
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
      borderRadius: "2px",
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
        borderRadius: "2px",
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
          borderRadius: "2px",
          boxShadow: "none",
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
                borderRadius: "2px",
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
    "Indexed records for compounding pharmacies, outsourcing facilities, and manufacturers followed by Source Standard. An indexed record is not a Greenlisted designation.";

  const filtersAnchorRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <PageMeta
        title="Facility Records"
        description={heroDescription}
        path="/greenlist"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Facility Records",
          url: "https://sourcestandard.org/greenlist",
        }}
      />

      <RegistryHeader
        indexNumber="02"
        title="Facility Records"
        description={heroDescription}
        recordCount={counts.total}
      >
        <div className="relative w-full md:max-w-[520px]">
          <Search
            aria-hidden
            className="pointer-events-none absolute text-white/50"
            style={{
              top: "50%",
              left: "12px",
              width: "15px",
              height: "15px",
              strokeWidth: 1.75,
              transform: "translateY(-50%)",
            }}
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Facility name"
            aria-label="Search Facility Records"
            className="hero-search-input font-sans w-full text-white placeholder:text-white/45 focus:outline-none"
            style={{
              height: "42px",
              borderRadius: "2px",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.26)",
              paddingLeft: "36px",
              paddingRight: "12px",
            }}
          />
        </div>
      </RegistryHeader>

      <section className="bg-background">
        <div className="page-shell" style={{ paddingTop: "32px", paddingBottom: "48px" }}>
          <div className="mx-auto w-reading-wide">
            {isSearching && (
              <div className="pb-3">
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
                    borderRadius: "2px",
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
            <div ref={filtersAnchorRef} className="space-y-3 scroll-mt-16">
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

                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  {STATUS_DEFINITIONS.map((s, i) => (
                    <span key={s.label}>
                      {i > 0 ? " · " : ""}
                      <span className="font-medium text-foreground/80">{s.label}</span>
                      {": "}
                      {s.body}
                    </span>
                  ))}
                </p>
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
                            to={`/greenlist/${entry.slug}`}
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
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount((n) => Math.min(n + PAGE_SIZE, sorted.length))
                        }
                        className="inline-flex h-10 items-center justify-center rounded-[2px] border border-border bg-card px-4 font-sans text-[13px] font-medium text-foreground hover:bg-muted"
                      >
                        Load more
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

export default Greenlist;
