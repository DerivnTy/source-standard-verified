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

type StatusKey = "any" | "verified" | "unverified";
type DeliveryKey = "any" | "online" | "in-person";
type FocusKey = "all" | "peptides" | "hormone" | "longevity" | "wellness";

const PAGE_SIZE = 10;

const STATUS_PILLS: { value: StatusKey; label: string }[] = [
  { value: "verified", label: "VERIFIED" },
  { value: "unverified", label: "UNVERIFIED" },
];

const DELIVERY_PILLS: { value: DeliveryKey; label: string }[] = [
  { value: "online", label: "ONLINE" },
  { value: "in-person", label: "IN-PERSON" },
];

const FOCUS_OPTIONS: { value: FocusKey; label: string }[] = [
// 2x2 grid of focus pills (mirrors the primary 2x2 status/method grid)
const FOCUS_OPTIONS: { value: Exclude<FocusKey, "all">; label: string }[] = [
  { value: "peptides", label: "PEPTIDES" },
  { value: "hormone", label: "HORMONE" },
  { value: "longevity", label: "LONGEVITY" },
  { value: "wellness", label: "WELLNESS" },
];

const FOCUS_LABEL: Record<FocusKey, string> = {
  all: "All",
  peptides: "PEPTIDES",
  hormone: "HORMONE",
  longevity: "LONGEVITY",
  wellness: "WELLNESS",
};

/** Map vendor → consumer focus bucket. */
const matchesFocus = (vendor: Vendor, key: FocusKey): boolean => {
  if (key === "all") return true;
  const haystack = [vendor.category, ...(vendor.clinicalFocus ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  switch (key) {
    case "peptides":
      return /peptide/.test(haystack);
    case "hormone":
      return /(hormone|trt|hrt|testosterone|estrogen)/.test(haystack);
    case "longevity":
      return /(longevity|anti[- ]?aging|nad|regenerative)/.test(haystack);
    case "wellness":
      return /(wellness|weight|aesthetic|iv|recovery|vitamin)/.test(haystack);
  }
};

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
    aria-pressed={active}
    className={`${fullWidth ? "w-full" : "shrink-0"} font-sans text-[12px] font-semibold uppercase tracking-[0.06em] transition-colors`}
    style={{
      height: "32px",
      padding: "0 14px",
      borderRadius: "20px",
      border: "1px solid",
      borderColor: active
        ? "hsl(var(--navy-surface))"
        : "hsl(var(--border) / 0.7)",
      backgroundColor: active
        ? "hsl(var(--navy-surface))"
        : "hsl(var(--muted) / 0.6)",
      color: active ? "hsl(var(--background))" : "hsl(var(--foreground) / 0.75)",
    }}
  >
    {label}
  </button>
);

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusKey>("any");
  const [delivery, setDelivery] = useState<DeliveryKey>("any");
  const [focus, setFocus] = useState<FocusKey>("all");
  const [focusOpen, setFocusOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const states = useMemo(() => getVendorStates(), []);

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
    return vendors.filter((vendor) => {
      if (!matchesQuery(vendor, query)) return false;
      if (status === "verified" && vendor.status !== "verified") return false;
      if (status === "unverified" && vendor.status === "verified") return false;
      if (!matchesFocus(vendor, focus)) return false;
      if (delivery !== "any") {
        const f = fulfillmentByVendor.get(vendor.slug);
        if (delivery === "online" && f === "in-person") return false;
        if (delivery === "in-person" && f === "online") return false;
      }
      return true;
    });
  }, [query, status, delivery, focus, fulfillmentByVendor]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

  const visibleItems = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;
  const fadeKey = `${query}|${status}|${delivery}|${focus}`;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, status, delivery, focus]);

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
        <div className="page-shell pb-20 md:pb-14">
          <div className="mx-auto w-wide">
            {/* Sticky search + filter rail with subtle bottom divider */}
            <div
              className="sticky top-0 z-30 -mx-5 md:mx-0 bg-background/95 px-5 pt-6 pb-3 md:pt-8"
              style={{
                backdropFilter: "blur(8px)",
                borderBottom: "1px solid hsl(var(--border) / 0.6)",
              }}
            >
              {/* Borderless search on light grey */}
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, city, or state..."
                aria-label="Search by name, city, state, or category"
                className="font-sans w-full border-0 px-4 text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                style={{
                  height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "hsl(var(--muted) / 0.55)",
                }}
              />

              {/* 2x2 filter grid — Status row + Method row */}
              <div className="mt-3 grid grid-cols-2 gap-2">
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

              {/* Vendor focus — inline accordion expansion */}
              <button
                type="button"
                onClick={() => setFocusOpen((o) => !o)}
                aria-expanded={focusOpen}
                className="mt-2 flex w-full items-center justify-center gap-1.5 font-sans text-[12.5px] font-medium uppercase tracking-[0.08em] text-foreground/80 transition-colors hover:bg-[hsl(var(--muted))]/80"
                style={{
                  height: "40px",
                  borderRadius: "12px",
                  backgroundColor: "hsl(var(--muted) / 0.55)",
                  border: "1px solid hsl(var(--border) / 0.6)",
                }}
              >
                {focus === "all" ? (
                  <span className="text-muted-foreground">Select Focus...</span>
                ) : (
                  <>
                    <span className="text-muted-foreground">Focus:</span>
                    <span>{FOCUS_LABEL[focus]}</span>
                  </>
                )}
                <svg
                  aria-hidden
                  viewBox="0 0 12 12"
                  width="10"
                  height="10"
                  className="opacity-60"
                  style={{
                    transition: "transform 300ms ease-in-out",
                    transform: focusOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M2.5 4.5L6 8l3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Accordion expansion — grid trick for smooth height animation */}
              <div
                className="grid"
                style={{
                  gridTemplateRows: focusOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 300ms ease-in-out",
                }}
              >
                <div className="overflow-hidden">
                  <ul
                    className="mt-2 overflow-hidden"
                    style={{
                      borderRadius: "12px",
                      border: "1px solid hsl(var(--border) / 0.6)",
                      backgroundColor: "hsl(var(--background))",
                    }}
                  >
                    {FOCUS_OPTIONS.map((opt, idx) => {
                      const active = opt.value === focus;
                      const isLast = idx === FOCUS_OPTIONS.length - 1;
                      return (
                        <li key={opt.value}>
                          <button
                            type="button"
                            onClick={() => {
                              setFocus(opt.value);
                              setFocusOpen(false);
                            }}
                            className="flex w-full items-center justify-between px-4 text-left transition-colors hover:bg-[hsl(var(--muted))]/50"
                            style={{
                              height: "48px",
                              borderBottom: isLast
                                ? "none"
                                : "1px solid hsl(var(--border) / 0.5)",
                            }}
                          >
                            <span
                              className={`font-serif text-[15px] tracking-tight ${
                                active
                                  ? "font-semibold text-foreground"
                                  : "text-foreground/85"
                              }`}
                            >
                              {opt.label}
                            </span>
                            {active && (
                              <svg
                                aria-hidden
                                viewBox="0 0 20 20"
                                className="h-4 w-4"
                                style={{ color: "hsl(var(--navy-surface))" }}
                              >
                                <path
                                  d="M5 10.5l3 3L15 7"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Result list */}
            <div key={fadeKey} className="mt-4 animate-fade-in">
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
                  <ul className="flex flex-col gap-2">
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
