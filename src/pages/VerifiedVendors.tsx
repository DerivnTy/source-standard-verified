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

type OutcomeKey =
  | "all"
  | "skin"
  | "longevity"
  | "trt"
  | "weight"
  | "wellness";
type DeliveryKey = "any" | "online" | "local";

const PAGE_SIZE = 10;

const OUTCOME_PILLS: { value: OutcomeKey; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "skin", label: "SKIN" },
  { value: "longevity", label: "LONGEVITY" },
  { value: "trt", label: "TRT" },
  { value: "weight", label: "WEIGHT" },
  { value: "wellness", label: "WELLNESS" },
];

const DELIVERY_PILLS: { value: DeliveryKey; label: string }[] = [
  { value: "online", label: "ONLINE" },
  { value: "local", label: "LOCAL" },
];

/** Match vendor to consumer outcome bucket. */
const matchesOutcome = (vendor: Vendor, key: OutcomeKey): boolean => {
  if (key === "all") return true;
  const haystack = [vendor.category, ...(vendor.clinicalFocus ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  switch (key) {
    case "skin":
      return /(skin|hair|aesthetic|derm|botox|filler)/.test(haystack);
    case "longevity":
      return /(longevity|anti[- ]?aging|nad|regenerative|peptide)/.test(haystack);
    case "trt":
      return /(trt|hrt|hormone|testosterone|estrogen)/.test(haystack);
    case "weight":
      return /(weight|glp|semaglutide|tirzepatide|metabolic)/.test(haystack);
    case "wellness":
      return /(wellness|iv|recovery|vitamin|nutrition)/.test(haystack);
  }
};

/** Smart query: name, city, state name/abbr, category, clinical focus. */
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

const VerifiedVendors = () => {
  const [query, setQuery] = useState("");
  const [outcome, setOutcome] = useState<OutcomeKey>("all");
  const [delivery, setDelivery] = useState<DeliveryKey>("any");
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
      if (!matchesOutcome(vendor, outcome)) return false;
      if (delivery !== "any") {
        const f = fulfillmentByVendor.get(vendor.slug);
        if (delivery === "online" && f === "in-person") return false;
        if (delivery === "local" && f === "online") return false;
      }
      return true;
    });
  }, [query, outcome, delivery, fulfillmentByVendor]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

  const visibleItems = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  // Fade key — re-triggers fade-in animation on filter change
  const fadeKey = `${query}|${outcome}|${delivery}`;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, outcome, delivery]);

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
            {/* Sticky search + pill rail — mobile efficiency pass */}
            <div
              className="sticky top-0 z-30 -mx-5 md:mx-0 bg-background/95 px-5 pt-6 pb-2 md:pt-8"
              style={{ backdropFilter: "blur(8px)" }}
            >
              {/* Universal smart search — full width, mono */}
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, city, or state..."
                aria-label="Search by name, city, state, or category"
                className="font-mono w-full bg-transparent py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                style={{
                  borderBottom: "1px solid hsl(var(--border))",
                  transition: "border-color 0.5s ease",
                  letterSpacing: "0.01em",
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

              {/* Unified pill row — outcomes + delivery, no emojis */}
              <div
                className="pill-scroll mt-2.5 flex gap-1.5 overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>{`.pill-scroll::-webkit-scrollbar{display:none}`}</style>
                {OUTCOME_PILLS.map((p) => (
                  <FilterPill
                    key={`o-${p.value}`}
                    label={p.label}
                    active={outcome === p.value}
                    onClick={() => setOutcome(p.value)}
                  />
                ))}
                {/* Divider between outcome and delivery */}
                <span
                  aria-hidden
                  className="mx-1 self-center"
                  style={{
                    width: "1px",
                    height: "18px",
                    backgroundColor: "hsl(var(--border))",
                  }}
                />
                {DELIVERY_PILLS.map((p) => (
                  <FilterPill
                    key={`d-${p.value}`}
                    label={p.label}
                    active={delivery === p.value}
                    onClick={() =>
                      setDelivery((curr) => (curr === p.value ? "any" : p.value))
                    }
                  />
                ))}
              </div>
            </div>

            {/* Vendor card stack — fade-in on filter change */}
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
