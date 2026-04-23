import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { EmptyState } from "@/components/EmptyState";
import { RegistryHeader } from "@/components/registry/RegistryHeader";
import { RegistryHorizon } from "@/components/registry/RegistryHorizon";
import {
  QueryBar,
  FacetSelect,
  FacetGroup,
  FacetToggle,
  ActiveChip,
} from "@/components/registry/QueryBar";
import { SourceTypeCell } from "@/components/registry/SourceTypeCell";
import { RegistryPagination } from "@/components/registry/RegistryPagination";
import {
  greenlistEntries,
  GreenlistEntry,
  GreenlistCategory,
  FOCUS_TAGS,
  getGreenlistCounts,
  getGreenlistStates,
  entryMatchesState,
} from "@/data/greenlist";

const ALL = "__all__";
const NATIONWIDE = "__nationwide__";

type SortMode = "name-asc" | "name-desc" | "type" | "state";
type WebsiteFilter = "all" | "yes" | "no";

const CATEGORY_ORDER: GreenlistCategory[] = ["503B", "503A", "Other"];

const CATEGORY_LABEL: Record<GreenlistCategory, string> = {
  "503B": "503B Outsourcing",
  "503A": "503A Pharmacy",
  Other: "Other",
};

const focusMatches = (entry: GreenlistEntry, tagLabel: string): boolean => {
  const tag = FOCUS_TAGS.find((t) => t.label === tagLabel);
  if (!tag) return true;
  const hay = entry.focus.toLowerCase();
  return tag.keywords.some((k) => hay.includes(k.toLowerCase()));
};

const SHORT_FOCUS_RULES: { label: string; keywords: string[] }[] = [
  { label: "Ophthalmics", keywords: ["ophthal", "eye drops", "eye-care", "cataract", "retina"] },
  { label: "Dermatology", keywords: ["dermatology", "aesthetic"] },
  { label: "Pediatric", keywords: ["pediatric"] },
  { label: "Veterinary", keywords: ["veterinary"] },
  { label: "Anesthesia / critical", keywords: ["anesthesia", "critical care", "critical-care"] },
  { label: "Pain management", keywords: ["pain"] },
  { label: "Nuclear medicine", keywords: ["nuclear"] },
  { label: "Hospice", keywords: ["hospice"] },
  { label: "GLP-1", keywords: ["glp-1", "weight"] },
  { label: "Peptide therapy", keywords: ["peptide"] },
  { label: "Hormone therapy", keywords: ["hormone", "trt"] },
  { label: "Regenerative", keywords: ["regenerative"] },
  { label: "Nootropic", keywords: ["nootropic", "anti-aging"] },
  { label: "Integrative", keywords: ["integrative", "functional"] },
  { label: "IV therapy", keywords: ["vitamin", "iv solution", "iv admixture", "infusion", "admixture", "iv bag"] },
  { label: "Nutraceutical", keywords: ["nutraceutical"] },
  { label: "Wellness", keywords: ["wellness"] },
  { label: "Ready-to-use", keywords: ["ready-to-use", "ready to use", "ready-to-administer"] },
  { label: "Hospital supply", keywords: ["hospital", "ambulatory", "surgery center", "surgical center", "health system"] },
  { label: "Specialty / PBM", keywords: ["specialty pharmacy", "pbm", "specialty compound"] },
  { label: "Network", keywords: ["network", "multi-location"] },
  { label: "Sterile injectables", keywords: ["sterile", "injectable"] },
];

const shortFocus = (entry: GreenlistEntry): string => {
  const hay = entry.focus.toLowerCase();
  const hits: string[] = [];
  for (const rule of SHORT_FOCUS_RULES) {
    if (rule.keywords.some((k) => hay.includes(k.toLowerCase()))) {
      if (!hits.includes(rule.label)) hits.push(rule.label);
    }
    if (hits.length >= 2) break;
  }
  if (hits.length === 0) return "Specialty compounding";
  return hits.join(" · ");
};

const websiteDomain = (url?: string): string | null => {
  if (!url) return null;
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
  }
};

const Greenlist = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>(ALL);
  const [state, setStateFilter] = useState<string>(ALL);
  const [focus, setFocus] = useState<string>(ALL);
  const [website, setWebsite] = useState<WebsiteFilter>("all");
  const [sort, setSort] = useState<SortMode>("name-asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const states = useMemo(() => getGreenlistStates(), []);
  const counts = useMemo(() => getGreenlistCounts(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return greenlistEntries.filter((e) => {
      if (q) {
        const hay = [e.name, e.location, e.focus, e.type, e.category].join(" ").toLowerCase();
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
      if (focus !== ALL && !focusMatches(e, focus)) return false;
      if (website === "yes" && !e.website) return false;
      if (website === "no" && e.website) return false;
      return true;
    });
  }, [query, type, state, focus, website]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "name-desc":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      case "type":
        return arr.sort((a, b) => {
          const t = a.type.localeCompare(b.type);
          if (t !== 0) return t;
          return a.name.localeCompare(b.name);
        });
      case "state":
        return arr.sort((a, b) => {
          const sa = a.state ?? "";
          const sb = b.state ?? "";
          const s = sa.localeCompare(sb);
          if (s !== 0) return s;
          return a.name.localeCompare(b.name);
        });
      case "name-asc":
      default:
        return arr.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = sorted.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, type, state, focus, website, sort, pageSize]);

  const filtersActive =
    query !== "" ||
    type !== ALL ||
    state !== ALL ||
    focus !== ALL ||
    website !== "all";

  const reset = () => {
    setQuery("");
    setType(ALL);
    setStateFilter(ALL);
    setFocus(ALL);
    setWebsite("all");
  };

  const activeChips: ActiveChip[] = [];
  if (type !== ALL) {
    activeChips.push({
      key: "type",
      label: `Type: ${CATEGORY_LABEL[type as GreenlistCategory] ?? type}`,
      onRemove: () => setType(ALL),
    });
  }
  if (state !== ALL) {
    activeChips.push({
      key: "state",
      label: `State: ${state === NATIONWIDE ? "Nationwide" : state}`,
      onRemove: () => setStateFilter(ALL),
    });
  }
  if (focus !== ALL) {
    activeChips.push({
      key: "focus",
      label: `Focus: ${focus}`,
      onRemove: () => setFocus(ALL),
    });
  }
  if (website !== "all") {
    activeChips.push({
      key: "website",
      label: website === "yes" ? "Website listed" : "No website",
      onRemove: () => setWebsite("all"),
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
      <option value="name-asc">Sort: Name A–Z</option>
      <option value="name-desc">Sort: Name Z–A</option>
      <option value="state">Sort: State</option>
      <option value="type">Sort: Source type</option>
    </FacetSelect>
  );

  const facets = (
    <>
      <FacetSelect
        value={type}
        onChange={setType}
        ariaLabel="Filter by source type"
      >
        <option value={ALL}>All source types</option>
        {CATEGORY_ORDER.map((c) => (
          <option key={c} value={c}>
            {CATEGORY_LABEL[c]}
          </option>
        ))}
      </FacetSelect>

      <FacetSelect
        value={state}
        onChange={setStateFilter}
        ariaLabel="Filter by state"
      >
        <option value={ALL}>All states</option>
        <option value={NATIONWIDE}>Nationwide</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </FacetSelect>

      <FacetSelect
        value={focus}
        onChange={setFocus}
        ariaLabel="Filter by focus"
      >
        <option value={ALL}>All focus areas</option>
        {FOCUS_TAGS.map((f) => (
          <option key={f.label} value={f.label}>
            {f.label}
          </option>
        ))}
      </FacetSelect>

      <FacetGroup ariaLabel="Filter by website availability">
        {([
          { value: "yes", label: "Website listed" },
          { value: "no", label: "No website" },
        ] as { value: WebsiteFilter; label: string }[]).map((opt) => {
          const active = website === opt.value;
          return (
            <FacetToggle
              key={opt.value}
              active={active}
              onClick={() => setWebsite(active ? "all" : opt.value)}
            >
              {opt.label}
            </FacetToggle>
          );
        })}
      </FacetGroup>
    </>
  );

  return (
    <>
      <PageMeta
        title="Upstream Greenlist · Source Standard"
        description="Maintained reference set of recognized upstream compounding facilities used within the Source Standard framework."
      />

      <RegistryHeader
        title="Greenlist Facilities"
        description="The maintained reference set of recognized upstream compounding facilities used within the Source Standard framework."
        scopeText="Inclusion supports upstream reference. Vendor verification is a separate layer"
        scopeHref="/directory"
        recordCount={counts.total}
      />

      <RegistryHorizon
        cells={[
          { label: "Total Recognized", value: counts.recognized },
          { label: "503B Facilities", value: counts["503B"] },
          { label: "503A Facilities", value: counts["503A"] },
          { label: "Registry Status", value: "ACTIVE", live: true },
        ]}
      />

      {/* Query + table — one instrument */}
      <section className="bg-background">
        <div className="page-shell pt-8 pb-12 md:pb-14">
          <div className="mx-auto w-wide">
            <QueryBar
              query={query}
              onQueryChange={setQuery}
              searchPlaceholder="Search facilities, locations, focus areas…"
              resultLabel={
                sorted.length === 0
                  ? "0 of 0 records"
                  : `${sorted.length.toLocaleString()} of ${counts.total.toLocaleString()} records`
              }
              sortControl={sortControl}
              facets={facets}
              hasActiveFilters={filtersActive}
              onReset={reset}
              activeChips={activeChips}
            />

            <div className="mt-5">
              {sorted.length === 0 ? (
                <EmptyState
                  eyebrow="No Recognized Sources Found"
                  body="No upstream facility matches these filters."
                />
              ) : (
                <>
                  {/* Desktop table */}
                  <div className="hidden md:block border-t border-border">
                    <div className="grid grid-cols-12 px-3 py-3 border-b border-border bg-surface-muted/30">
                      <div className="col-span-5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Facility
                      </div>
                      <div className="col-span-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Source type
                      </div>
                      <div className="col-span-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Location
                      </div>
                      <div className="col-span-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Focus
                      </div>
                    </div>

                    <div className="divide-y divide-border/60">
                      {pageItems.map((e) => {
                        const domain = websiteDomain(e.website);
                        const extraLocs = e.additionalLocations?.length ?? 0;
                        const isAlert = !!e.regulatoryAlert;
                        return (
                          <Link
                            key={e.slug}
                            to={`/greenlist/${e.slug}`}
                            aria-label={`${e.name} — ${CATEGORY_LABEL[e.category]} in ${e.location}`}
                            className="group relative grid grid-cols-12 px-3 py-3.5 items-center min-h-[64px] hover:bg-surface-muted/50 transition-colors duration-150 cursor-pointer"
                          >
                            {/* Hover left tick */}
                            <span
                              aria-hidden
                              className={`absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ${
                                isAlert ? "bg-destructive" : "bg-foreground"
                              }`}
                            />

                            <div className="col-span-5 min-w-0 pr-4">
                              <div className="text-[15px] font-semibold text-foreground leading-[22px] truncate">
                                {e.name}
                              </div>
                              <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-muted-foreground">
                                <span className="truncate">
                                  {domain ?? "no public site"}
                                </span>
                                {extraLocs > 0 && (
                                  <>
                                    <span className="text-border">·</span>
                                    <span className="shrink-0 tabular-nums">
                                      +{extraLocs} location{extraLocs > 1 ? "s" : ""}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="col-span-2 pr-3">
                              <SourceTypeCell
                                category={e.category}
                                typeDetail={e.type}
                                alert={
                                  e.regulatoryAlert
                                    ? {
                                        shortLabel: e.regulatoryAlert.shortLabel,
                                        reason: e.regulatoryAlert.reason,
                                      }
                                    : null
                                }
                              />
                            </div>

                            <div className="col-span-2 text-[13px] text-muted-foreground truncate pr-3">
                              {e.serviceArea ?? e.location}
                            </div>

                            <div className="col-span-3 flex items-center justify-between gap-3 pr-1">
                              <span className="text-[13px] text-muted-foreground truncate">
                                {shortFocus(e)}
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground" />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mobile list */}
                  <div className="md:hidden border-t border-border divide-y divide-border/60">
                    {pageItems.map((e) => {
                      const domain = websiteDomain(e.website);
                      return (
                        <Link
                          key={e.slug}
                          to={`/greenlist/${e.slug}`}
                          className="block py-4 px-1 hover:bg-surface-muted/40 transition-colors"
                        >
                          <div className="text-[15px] font-semibold text-foreground leading-tight">
                            {e.name}
                          </div>
                          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                            {domain ?? "no public site"}
                          </p>
                          <div className="mt-2">
                            <SourceTypeCell
                              category={e.category}
                              typeDetail={e.type}
                              alert={
                                e.regulatoryAlert
                                  ? {
                                      shortLabel: e.regulatoryAlert.shortLabel,
                                      reason: e.regulatoryAlert.reason,
                                    }
                                  : null
                              }
                            />
                          </div>
                          <p className="mt-2 text-[12.5px] text-muted-foreground">
                            {e.serviceArea ?? e.location}
                            <span className="mx-1.5 text-border">·</span>
                            {shortFocus(e)}
                          </p>
                        </Link>
                      );
                    })}
                  </div>

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
                  Two layers · One framework
                </p>
                <p className="t-body-md text-foreground/85 max-w-[52ch]">
                  The Greenlist establishes the upstream reference set — the
                  recognized facilities a vendor may legitimately source from.
                </p>
                <p className="mt-4 t-body-sm text-muted-foreground max-w-[52ch]">
                  Inclusion in the Greenlist is not a vendor verification.
                </p>
              </div>
              <div className="md:pl-8 md:border-l md:border-border/60">
                <p className="t-utility-xs text-muted-foreground mb-4">
                  The vendor layer
                </p>
                <p className="t-body-md text-foreground/85 max-w-[48ch]">
                  Verification assesses whether a clinic can substantiate its
                  sourcing through licensed upstream pharmacies and documented
                  records.
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
