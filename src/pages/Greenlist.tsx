import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { RegistryHorizon } from "@/components/registry/RegistryHorizon";
import { RegistryPagination } from "@/components/registry/RegistryPagination";
import { GreenlistRow } from "@/components/registry/GreenlistRow";
import {
  greenlistEntries,
  GreenlistEntry,
  GreenlistCategory,
  getGreenlistCounts,
  getGreenlistStates,
  entryMatchesState,
} from "@/data/greenlist";

const ALL = "__all__";
const NATIONWIDE = "__nationwide__";

const CATEGORY_ORDER: GreenlistCategory[] = ["503B", "503A", "Other"];

const CATEGORY_LABEL: Record<GreenlistCategory, string> = {
  "503B": "503B Outsourcing",
  "503A": "503A Pharmacy",
  Other: "Other",
};

type StatusKey = "any" | "authorized" | "alert";

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
  const [type, setType] = useState<string>(ALL);
  const [state, setStateFilter] = useState<string>(ALL);
  const [status, setStatus] = useState<StatusKey>("any");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);

  const states = useMemo(() => getGreenlistStates(), []);
  const counts = useMemo(() => getGreenlistCounts(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return greenlistEntries.filter((e) => {
      if (q) {
        const hay = [e.name, e.location, e.focus, e.type, e.category]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (type !== ALL && e.category !== type) return false;
      if (state !== ALL) {
        if (state === NATIONWIDE) {
          if (!e.serviceArea) return false;
        } else if (!entryMatchesState(e, state)) {
          return false;
        }
      }
      if (status === "authorized" && e.regulatoryAlert) return false;
      if (status === "alert" && !e.regulatoryAlert) return false;
      return true;
    });
  }, [query, type, state, status]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => a.name.localeCompare(b.name)),
    [filtered],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, type, state, status]);

  return (
    <>
      <PageMeta
        title="Upstream Registry · Source Standard"
        description="A public-reference list of upstream compounding facilities used for Source Standard sourcing review. Records are organized by facility type, location, public registration status, and review relevance."
      />

      <RegistryHeader
        indexNumber="02"
        title="Upstream Registry"
        description="A public-reference list of upstream compounding facilities used for Source Standard sourcing review. Records are organized by facility type, location, public registration status, and review relevance."
        recordCount={counts.total}
      />

      <RegistryHorizon
        seam
        cells={[
          { label: "Total Records", value: counts.recognized },
          { label: "503B Facilities", value: counts["503B"] },
          { label: "503A Facilities", value: counts["503A"] },
        ]}
      />

      <section className="bg-background">
        <div className="page-shell pb-20 md:pb-14">
          <div className="mx-auto w-wide">
            {/* Minimalist filter bar — search pill + Category + Status */}
            <div className="-mx-5 md:mx-0 px-5 pt-6 pb-3 md:pt-8">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search facilities, locations, or facility type…"
                aria-label="Search Upstream Registry"
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

              {/* Category row */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                <SoftPill
                  label="All"
                  active={type === ALL}
                  fullWidth
                  onClick={() => setType(ALL)}
                />
                {CATEGORY_ORDER.map((c) => (
                  <SoftPill
                    key={c}
                    label={c}
                    active={type === c}
                    fullWidth
                    onClick={() => setType(type === c ? ALL : c)}
                  />
                ))}
              </div>

              {/* Status row */}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <SoftPill
                  label="Recognized"
                  active={status === "authorized"}
                  fullWidth
                  onClick={() =>
                    setStatus((c) => (c === "authorized" ? "any" : "authorized"))
                  }
                />
                <SoftPill
                  label="Status Alert"
                  active={status === "alert"}
                  fullWidth
                  onClick={() =>
                    setStatus((c) => (c === "alert" ? "any" : "alert"))
                  }
                />
              </div>
            </div>

            {/* Result list — strip cards */}
            <div
              key={`${query}|${type}|${state}|${status}`}
              className="mt-4 animate-fade-in"
            >
              {sorted.length === 0 ? (
                <EmptyState
                  eyebrow="No Records Found"
                  body="No upstream facility matches these filters."
                />
              ) : (
                <>
                  <ul className="flex flex-col gap-1.5">
                    {pageItems.map((entry) => (
                      <li key={entry.slug}>
                        <GreenlistRow entry={entry} />
                      </li>
                    ))}
                  </ul>

                  {sorted.length > pageSize && (
                    <RegistryPagination
                      page={currentPage}
                      totalPages={totalPages}
                      pageSize={pageSize}
                      totalRecords={sorted.length}
                      onPageChange={setPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bridge to vendor registry */}
      <section className="bg-surface-muted/30 border-t border-border">
        <div className="page-shell py-12 md:py-16">
          <div className="mx-auto w-wide">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <p className="t-utility-xs text-muted-foreground mb-4">
                  Two layers. One review framework.
                </p>
                <p className="t-body-md text-foreground/85 max-w-[52ch]">
                  The Upstream Registry identifies facilities used as reference
                  records during vendor sourcing review.
                </p>
                <p className="mt-4 t-body-sm text-muted-foreground max-w-[52ch]">
                  Inclusion in the Upstream Registry does not verify that any
                  vendor is actively sourcing from that facility.
                </p>
              </div>
              <div className="md:pl-8 md:border-l md:border-border/60">
                <p className="t-utility-xs text-muted-foreground mb-4">
                  Vendor-level review
                </p>
                <p className="t-body-md text-foreground/85 max-w-[48ch]">
                  Vendor verification reviews whether submitted documentation
                  supports the vendor's stated pharmacy relationships, sourcing
                  claims, and chain-of-custody records.
                </p>
                <Link
                  to="/directory"
                  className="mt-6 inline-flex items-center gap-2 px-5 h-11 border border-foreground text-foreground text-[14px] font-medium rounded-[2px] hover:bg-foreground hover:text-background transition-colors duration-150"
                >
                  Open the Vendor Registry
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

export default Greenlist;
