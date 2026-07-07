import { useEffect, useMemo, useState } from "react";
import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { RegistryHorizon } from "@/components/registry/RegistryHorizon";

import { GreenlistRow } from "@/components/registry/GreenlistRow";
import {
  greenlistEntries,
  getGreenlistCounts,
  getGreenlistStates,
  entryMatchesState,
} from "@/data/greenlist";

const ALL = "__all__";
const NATIONWIDE = "__nationwide__";

type StatusKey = "all" | "greenlisted" | "monitoring" | "alert";

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

const Greenlist = () => {
  const [query, setQuery] = useState("");
  const [state] = useState<string>(ALL);
  const [status, setStatus] = useState<StatusKey>("all");
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const counts = useMemo(() => getGreenlistCounts(), []);
  void getGreenlistStates;

  // Derived manufacturer-tier counts.
  // At launch no manufacturer has yet satisfied Greenlisted requirements.
  const greenlistedCount = 0;
  const alertCount = counts.notRecognized;
  const monitoringCount = counts.total - greenlistedCount - alertCount;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return greenlistEntries.filter((e) => {
      if (q) {
        const hay = [e.name, e.location, e.focus, e.type, e.category]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (state !== ALL) {
        if (state === NATIONWIDE) {
          if (!e.serviceArea) return false;
        } else if (!entryMatchesState(e, state)) {
          return false;
        }
      }
      // Greenlisted: none at launch
      if (status === "greenlisted") return false;
      if (status === "alert" && !e.regulatoryAlert) return false;
      if (status === "monitoring" && e.regulatoryAlert) return false;
      return true;
    });
  }, [query, state, status]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

  const visibleItems = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, state, status]);

  const heroDescription =
    "A public-reference database of manufacturers, 503A pharmacies, 503B outsourcing facilities, and other organizations operating within compounded therapy supply chains.";

  return (
    <>
      <PageMeta
        title="Facility Records · Source Standard"
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
      />

      {/* Opening context + Greenlisted Status — unified white section */}
      <section className="bg-background">
        <div className="page-shell pt-5 md:pt-6 pb-0">
          <div className="mx-auto w-wide">
            <div
              className="bg-white"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: "24px",
                padding: "24px 22px",
              }}
            >
              {/* Lead-in paragraph */}
              <div className="max-w-[760px]">
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.65 }}
                >
                  Facility records provide transparency into recognized upstream
                  organizations operating within the compounded therapy supply chain.
                </p>
              </div>

              {/* Hairline divider */}
              <div
                className="mt-5"
                style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}
              />

              {/* Greenlisted Status */}
              <div className="mt-5 max-w-[760px]">
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground"
                  style={{ fontSize: "11px", letterSpacing: "0.12em" }}
                >
                  Greenlisted Status
                </p>
                <p
                  className="mt-2 text-foreground"
                  style={{ fontSize: "15px", lineHeight: 1.6, fontWeight: 500 }}
                >
                  Greenlisted status reflects recognition within the Source Standard framework based on available information within a defined scope.
                </p>
                <p
                  className="mt-2 text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.65 }}
                >
                  It is a recognition under the Source Standard framework and is distinct from FDA registration, 503A designation, or 503B designation.
                </p>
                <p
                  className="mt-2 text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.65 }}
                >
                  Greenlisted status is reviewed periodically and may change as new information becomes available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="page-shell pb-10 md:pb-12">
          <div className="mx-auto w-wide">
            {/* Status filter group */}
            <div className="-mx-5 md:mx-0 px-5 pt-5 pb-3 space-y-4">
              <div>
                <p
                  className="font-sans font-semibold uppercase text-muted-foreground mb-2"
                  style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                >
                  Verification Status
                </p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  <SoftPill
                    label="All"
                    active={status === "all"}
                    fullWidth
                    onClick={() => setStatus("all")}
                  />
                  <SoftPill
                    label="Greenlisted"
                    active={status === "greenlisted"}
                    fullWidth
                    onClick={() => setStatus("greenlisted")}
                  />
                  <SoftPill
                    label="Monitoring"
                    active={status === "monitoring"}
                    fullWidth
                    onClick={() => setStatus("monitoring")}
                  />
                  <SoftPill
                    label="Status Alert"
                    active={status === "alert"}
                    fullWidth
                    onClick={() => setStatus("alert")}
                  />
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
                placeholder="Search manufacturers, locations, or verification status…"
                aria-label="Search Facility Records"
                className="font-sans w-full text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
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
            <div
              key={`${query}|${state}|${status}`}
              className="mt-4 animate-fade-in"
            >
              {sorted.length === 0 ? (
                <EmptyState
                  eyebrow="No Records Found"
                  body={
                    status === "greenlisted"
                      ? "No manufacturer has yet satisfied Greenlisted criteria."
                      : "No manufacturer matches these filters."
                  }
                />
              ) : (
                <>
                  <ul className="flex flex-col gap-1.5">
                    {visibleItems.map((entry, idx) => (
                      <li key={entry.slug}>
                        <GreenlistRow entry={entry} index={idx} />
                      </li>
                    ))}
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

      {/* Status Definitions */}
      <section className="bg-background">
        <div className="page-shell pb-14 md:pb-20">
          <div className="mx-auto w-wide">
            <div
              className="bg-white"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: "24px",
                padding: "24px 22px",
              }}
            >
              <p
                className="font-sans font-semibold uppercase text-muted-foreground"
                style={{ fontSize: "11px", letterSpacing: "0.12em" }}
              >
                Status Definitions
              </p>
              <ul className="mt-4 flex flex-col gap-0">
                {[
                  {
                    label: "Greenlisted",
                    body: "The organization is currently recognized within the Source Standard framework for the reviewed scope.",
                  },
                  {
                    label: "Monitoring",
                    body: "The organization is undergoing additional review before a final status determination.",
                  },
                  {
                    label: "Status Alert",
                    body: "Additional information has been identified that requires further review before the current status can be confirmed.",
                  },
                  {
                    label: "Removed",
                    body: "The organization is no longer recognized within the current Source Standard framework.",
                  },
                ].map((s, i) => (
                  <li
                    key={s.label}
                    style={{
                      paddingTop: i === 0 ? "0" : "14px",
                      paddingBottom: "14px",
                      borderTop:
                        i === 0 ? "none" : "1px solid hsl(var(--border))",
                    }}
                  >
                    <p
                      className="font-sans font-semibold uppercase text-foreground"
                      style={{ fontSize: "11px", letterSpacing: "0.12em" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="mt-2 text-muted-foreground"
                      style={{ fontSize: "14px", lineHeight: 1.65 }}
                    >
                      {s.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

export default Greenlist;
