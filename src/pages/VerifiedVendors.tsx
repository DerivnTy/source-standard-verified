import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { RegistryHeader } from "@/components/registry/RegistryHeader";

import { VendorRow } from "@/components/registry/VendorRow";
import { resolveStateAbbr } from "@/lib/usStates";
import {
  vendors,
  Vendor,
  getVendorFulfillment,
  VendorFulfillment,
} from "@/data/vendors";


type StatusKey = "any" | "verified" | "unverified";
type DeliveryKey = "any" | "online" | "in-person";

const PAGE_SIZE = 10;

const STATUS_PILLS: { value: StatusKey; label: string }[] = [
  { value: "verified", label: "VERIFIED" },
  { value: "unverified", label: "UNVERIFIED" },
];

const DELIVERY_PILLS: { value: DeliveryKey; label: string }[] = [
  { value: "online", label: "ONLINE" },
  { value: "in-person", label: "IN-PERSON" },
];

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

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusKey>("any");
  const [delivery, setDelivery] = useState<DeliveryKey>("any");
  const [focus, setFocus] = useState<FocusKey>("all");
  const [focusOpen, setFocusOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  

  const fulfillmentByVendor = useMemo(() => {
    const map = new Map<string, VendorFulfillment>();
    for (const vendor of vendors) map.set(vendor.slug, getVendorFulfillment(vendor));
    return map;
  }, []);


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
        title="Vendor Registry"
        description="A public-reference database of compounded therapy vendors indexed by verification status, therapy category, vendor type, and review scope."
        path="/verified-vendors"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Vendor Registry",
          url: "https://sourcestandard.org/verified-vendors",
        }}
      />

      <RegistryHeader
        compact
        indexNumber="01"
        title="Vendor Registry"
        description="A public-reference database of compounded therapy vendors indexed by verification status, therapy category, vendor type, and review scope."
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
                  { label: "States Represented", value: 50 },
                ].map((cell, idx) => (
                  <div
                    key={cell.label}
                    className="flex flex-col items-center justify-center text-center"
                    style={{
                      padding: "14px 10px",
                      borderLeft: idx === 0 ? "none" : "1px solid rgba(0,16,33,0.06)",
                    }}
                  >
                    <span
                      className="font-sans tabular-nums"
                      style={{
                        fontSize: "20px",
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
                        fontWeight: 600,
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
        <div className="page-shell pb-10 md:pb-10">
          <div className="mx-auto w-wide">
            {/* Grouped filters */}
            <div className="-mx-5 md:mx-0 px-5 pt-5 pb-3 space-y-4">
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

              {/* Vendor Type */}
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  Vendor Type
                </p>
                <div className="grid grid-cols-2 gap-2">
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

              {/* Category — collapsible folder */}
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  Category
                </p>
                <div
                  className="w-full overflow-hidden"
                  style={{
                    borderRadius: "20px",
                    border: "1px solid hsl(var(--border) / 0.7)",
                    backgroundColor: "hsl(var(--muted) / 0.6)",
                    transition: "background-color 300ms ease-in-out",
                  }}
                >
                  <div className="flex w-full items-stretch" style={{ height: "32px" }}>
                    <button
                      type="button"
                      onClick={() => setFocusOpen((o) => !o)}
                      aria-expanded={focusOpen}
                      className="flex flex-1 items-center justify-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-[hsl(var(--foreground)/0.75)] transition-colors"
                    >
                      {focus === "all" ? (
                        <span>Select Category</span>
                      ) : (
                        <>
                          <span className="opacity-60">Category:</span>
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

                    {focus !== "all" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFocus("all");
                          setFocusOpen(false);
                        }}
                        aria-label="Clear focus filter"
                        className="flex shrink-0 items-center justify-center text-[hsl(var(--foreground)/0.6)] transition-colors hover:text-[hsl(var(--foreground))]"
                        style={{
                          width: "32px",
                          borderLeft: "1px solid hsl(var(--border) / 0.7)",
                        }}
                      >
                        <svg aria-hidden viewBox="0 0 12 12" width="10" height="10">
                          <path
                            d="M3 3l6 6M9 3l-6 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div
                    className="grid"
                    style={{
                      gridTemplateRows: focusOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 300ms ease-in-out",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="grid grid-cols-2 gap-2 px-2 pb-2 pt-2"
                        style={{
                          borderTop: "1px solid hsl(var(--border) / 0.5)",
                        }}
                      >
                        {FOCUS_OPTIONS.map((opt) => (
                          <SoftPill
                            key={opt.value}
                            label={opt.label}
                            active={focus === opt.value}
                            fullWidth
                            onClick={() => {
                              setFocus(opt.value);
                              setFocusOpen(false);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search — final filter, adjacent to record list */}
            <div className="-mx-5 md:mx-0 px-5 pt-2 pb-1">
              <p
                className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                style={{ fontSize: "10px", letterSpacing: "0.12em" }}
              >
                Search
              </p>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by vendor name, city, state, or therapy category…"
                aria-label="Search by vendor name, city, state, or therapy category"
                className="font-sans w-full text-[15px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
                style={{
                  height: "40px",
                  borderRadius: "24px",
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E5E5EA",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              />
            </div>

            {/* Result list */}
            <div key={fadeKey} className="mt-3 animate-fade-in">
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
                  <ul className="flex flex-col gap-1.5">
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

      {/* Explainer panel — Verified vs. Unverified */}
      <section className="bg-background">
        <div className="page-shell pb-14 md:pb-20 pt-0">
          <div className="mx-auto w-wide">
            <div
              className="bg-white"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: "24px",
                padding: "28px 24px",
              }}
            >
              {/* Block 1 */}
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground"
                  style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  Verified vs. Unverified
                </p>
                <p
                  className="mt-3 text-foreground"
                  style={{ fontSize: "20px", lineHeight: 1.35 }}
                >
                  A Verified record means Source Standard has reviewed
                  documentation supporting the vendor's stated sourcing claims
                  within a defined scope and at a defined point in time.
                </p>
                <p
                  className="mt-3 text-muted-foreground"
                  style={{ fontSize: "15px", lineHeight: 1.45 }}
                >
                  An Unverified record means no sufficient documentation has
                  been reviewed by Source Standard to support the stated
                  sourcing claim within the registry framework.
                </p>
              </div>

              {/* Divider + Block 2 */}
              <div
                className="mt-7 pt-7"
                style={{ borderTop: "1px solid hsl(var(--border))" }}
              >
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground"
                  style={{ fontSize: "11px", letterSpacing: "0.08em" }}
                >
                  Consumer due diligence
                </p>
                <p
                  className="mt-3 text-foreground"
                  style={{ fontSize: "20px", lineHeight: 1.35 }}
                >
                  The registry is designed to make sourcing claims easier to
                  evaluate before a consumer engages a compounded therapy
                  vendor.
                </p>
                <p
                  className="mt-3 text-muted-foreground"
                  style={{ fontSize: "15px", lineHeight: 1.45 }}
                >
                  Source Standard does not provide medical advice, approve
                  products, or guarantee safety, efficacy, potency, sterility,
                  or outcomes. It helps consumers distinguish reviewed
                  documentation from unsupported public claims.
                </p>

                <Link
                  to="/how-it-works"
                  className="mt-6 inline-flex items-center gap-2 px-5 h-11 border border-foreground text-foreground text-[14px] font-medium rounded-[2px] hover:bg-foreground hover:text-background transition-colors duration-150"
                >
                  View Verification Protocol
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifiedVendors;
