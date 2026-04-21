import { useMemo, useState } from "react";
import { ExternalLink, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  greenlistEntries,
  GREENLIST_TYPES,
  FOCUS_TAGS,
  getGreenlistLocations,
  type GreenlistEntry,
  type GreenlistCategory,
} from "@/data/greenlist";

const ALL = "__all__";

const META_ROW: { label: string; value: string }[] = [
  { label: "Standard", value: "SS-FRAMEWORK-2026.01" },
  { label: "Status", value: "Active" },
  { label: "Jurisdiction", value: "US" },
  { label: "Oversight", value: "Medical Advisory Board" },
  { label: "Updated", value: "April 16, 2026" },
];

function focusMatches(entry: GreenlistEntry, tagLabel: string): boolean {
  const tag = FOCUS_TAGS.find((t) => t.label === tagLabel);
  if (!tag) return true;
  const f = entry.focus.toLowerCase();
  return tag.keywords.some((k) => f.includes(k));
}

const Greenlist = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>(ALL);
  const [location, setLocation] = useState<string>(ALL);
  const [category, setCategory] = useState<string>(ALL);
  const [focus, setFocus] = useState<string>(ALL);
  const [tab, setTab] = useState<GreenlistCategory>("503B");

  const locations = useMemo(() => getGreenlistLocations(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return greenlistEntries.filter((e) => {
      if (q && !e.name.toLowerCase().includes(q)) return false;
      if (type !== ALL && e.type !== type) return false;
      if (location !== ALL && e.location !== location) return false;
      if (category !== ALL && e.category !== category) return false;
      if (focus !== ALL && !focusMatches(e, focus)) return false;
      return true;
    });
  }, [query, type, location, category, focus]);

  const counts = useMemo(
    () => ({
      "503B": filtered.filter((e) => e.category === "503B").length,
      "503A": filtered.filter((e) => e.category === "503A").length,
      Other: filtered.filter((e) => e.category === "Other").length,
    }),
    [filtered],
  );

  const filtersActive =
    query !== "" || type !== ALL || location !== ALL || category !== ALL || focus !== ALL;

  const reset = () => {
    setQuery("");
    setType(ALL);
    setLocation(ALL);
    setCategory(ALL);
    setFocus(ALL);
  };

  const sortedFor = (cat: GreenlistCategory) =>
    filtered.filter((e) => e.category === cat).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {/* §1 — Intro */}
      <section className="border-b border-border">
        <div className="container-wide py-14 md:py-20">
          <p className="eyebrow mb-4">Public registry · Upstream sources</p>
          <h1 className="text-[2rem] md:text-[2.5rem] font-semibold tracking-[-0.015em] leading-[1.1] text-foreground max-w-3xl">
            Greenlist of Recognized Sources
          </h1>
          <p className="mt-6 max-w-3xl text-[16.5px] text-muted-foreground leading-[1.6]">
            The Greenlist is the upstream reference layer within the Source Standard framework.
            It includes recognized 503B outsourcing facilities, 503A compounding pharmacies, and
            other qualified source categories used in vendor review.
          </p>
          <p className="mt-4 max-w-3xl text-[14.5px] text-muted-foreground leading-[1.6]">
            Inclusion in the Greenlist is based on public licensing, registration, and recognized
            credentialing standards. Greenlist inclusion does not itself mean a vendor is verified.
            Vendors are reviewed separately against recognized source categories and documented
            purchasing records.
          </p>

          {/* Metadata strip */}
          <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/70 pt-5">
            {META_ROW.map((m) => (
              <div key={m.label} className="flex items-baseline gap-2 text-[12.5px]">
                <dt className="text-muted-foreground">{m.label}</dt>
                <dd className="text-foreground font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* §2 — Search & filter controls */}
      <section className="border-b border-border bg-surface-muted/50 sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-surface-muted/80">
        <div className="container-wide py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by facility or pharmacy name"
                className="h-8 pl-8 rounded-[2px] bg-background text-[13px]"
                aria-label="Search Greenlist"
              />
            </div>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-8 w-[150px] rounded-[2px] bg-background text-[12.5px]" aria-label="Filter by type">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All types</SelectItem>
                {GREENLIST_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-8 w-[140px] rounded-[2px] bg-background text-[12.5px]" aria-label="Filter by location">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All locations</SelectItem>
                {locations.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-8 w-[130px] rounded-[2px] bg-background text-[12.5px]" aria-label="Filter by category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All categories</SelectItem>
                <SelectItem value="503B">503B</SelectItem>
                <SelectItem value="503A">503A</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={focus} onValueChange={setFocus}>
              <SelectTrigger className="h-8 w-[160px] rounded-[2px] bg-background text-[12.5px]" aria-label="Filter by focus">
                <SelectValue placeholder="Focus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All focuses</SelectItem>
                {FOCUS_TAGS.map((f) => (
                  <SelectItem key={f.label} value={f.label}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-3 ml-auto text-[12px] text-muted-foreground">
              <span>
                <span className="text-foreground font-medium tabular-nums">{filtered.length}</span>
                <span className="text-muted-foreground"> / {greenlistEntries.length}</span>
              </span>
              {filtersActive && (
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1 text-foreground hover:text-primary"
                >
                  <X className="h-3 w-3" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* §3 — Category navigation + database */}
      <section className="border-b border-border">
        <div className="container-wide pt-4 pb-10 md:pt-5 md:pb-12">
          <Tabs value={tab} onValueChange={(v) => setTab(v as GreenlistCategory)}>
            <TabsList className="bg-transparent p-0 h-auto rounded-none border-b border-border w-full justify-start gap-0">
              <TabTriggerCustom value="503B" label="503B Outsourcing Facilities" count={counts["503B"]} />
              <TabTriggerCustom value="503A" label="503A Compounding Pharmacies" count={counts["503A"]} />
              {counts.Other > 0 && (
                <TabTriggerCustom value="Other" label="Other Recognized Sources" count={counts.Other} />
              )}
            </TabsList>

            <TabsContent value="503B" className="mt-4">
              <SectionIntro
                title="503B Outsourcing Facilities"
                description="FDA-registered 503B outsourcing facilities relevant to sterile compounded products, including TRT, peptide, IV, and wellness-related clinical use."
              />
              <RegistryTable rows={sortedFor("503B")} onReset={reset} filtersActive={filtersActive} />
            </TabsContent>

            <TabsContent value="503A" className="mt-4">
              <SectionIntro
                title="503A Compounding Pharmacies"
                description="National 503A compounding pharmacies and related brands relevant to patient-specific hormones, peptides, TRT, wellness, and specialty compounding."
              />
              <RegistryTable rows={sortedFor("503A")} onReset={reset} filtersActive={filtersActive} />
            </TabsContent>

            {counts.Other > 0 && (
              <TabsContent value="Other" className="mt-4">
                <SectionIntro
                  title="Other Recognized Sources"
                  description="Additional qualified source categories recognized within the Source Standard framework."
                />
                <RegistryTable rows={sortedFor("Other")} onReset={reset} filtersActive={filtersActive} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      {/* §4 — How Greenlist entries are used */}
      <section className="border-b border-border bg-surface-muted/40">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">§ Notes</p>
              <h2 className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-[-0.01em] leading-[1.25] text-foreground">
                How Greenlist entries are used
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-[15px] text-muted-foreground leading-[1.65]">
              <p>
                Greenlist entries are part of the upstream reference layer within the Source
                Standard framework. Inclusion in this database does not itself indicate that a
                vendor is verified. Vendor verification is a separate review process that
                examines whether a vendor's documented sourcing matches recognized source
                categories and whether the products, categories, or compounds being represented
                publicly align with that review.
              </p>
              <p>
                All information on this page is presented for public reference. Greenlist
                inclusion does not constitute medical advice, product endorsement, or a
                guarantee of clinical outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §5 — Cite as / disclaimer footer */}
      <section className="border-b border-border">
        <div className="container-wide py-8 space-y-3">
          <p className="text-[12.5px] text-foreground leading-relaxed max-w-4xl">
            <span className="text-muted-foreground mr-2">Cite as ·</span>
            Source Standard Greenlist of Recognized Sources, SS-FRAMEWORK-2026.01. Last updated
            April 16, 2026.
          </p>
          <p className="text-[12.5px] text-muted-foreground leading-relaxed max-w-4xl">
            <span className="text-foreground mr-2">Disclaimer ·</span>
            Inclusion indicates that a source meets the criteria documented in the Source
            Standard framework at the time of publication. It is not an endorsement of any
            specific product, treatment, or clinical outcome.
          </p>
        </div>
      </section>
    </>
  );
};

// ---------- Local sub-components ----------

const TabTriggerCustom = ({
  value,
  label,
  count,
}: {
  value: string;
  label: string;
  count: number;
}) => (
  <TabsTrigger
    value={value}
    className="rounded-none bg-transparent border-b-2 border-transparent px-4 py-2.5 text-[13px] font-medium text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-primary data-[state=active]:shadow-none -mb-px"
  >
    {label}
    <span className="ml-2 font-mono text-[11.5px] text-muted-foreground tabular-nums">
      {count.toString().padStart(2, "0")}
    </span>
  </TabsTrigger>
);

const SectionIntro = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-3">
    <h2 className="text-[1.0625rem] md:text-[1.125rem] font-semibold tracking-[-0.005em] text-foreground leading-tight">
      {title}
    </h2>
    <p className="mt-1 max-w-3xl text-[13px] text-muted-foreground leading-[1.55]">
      {description}
    </p>
  </div>
);

const RegistryTable = ({
  rows,
  onReset,
  filtersActive,
}: {
  rows: GreenlistEntry[];
  onReset: () => void;
  filtersActive: boolean;
}) => {
  if (rows.length === 0) {
    return (
      <div className="border border-border/70 rounded-[2px] bg-background px-6 py-10 text-center">
        <p className="text-[13.5px] text-muted-foreground">— No sources match the current filters.</p>
        {filtersActive && (
          <button onClick={onReset} className="mt-3 text-[13px] text-primary hover:text-primary-hover font-medium">
            Reset filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="border border-border/70 rounded-[2px] bg-background">
      {/* Desktop header */}
      <div className="hidden lg:grid grid-cols-12 px-4 py-2 bg-surface-muted/60 border-b border-border/70 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        <div className="col-span-3">Facility / Brand</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Location</div>
        <div className="col-span-3">Focus</div>
        <div className="col-span-1">Website</div>
        <div className="col-span-1 text-right">Status</div>
      </div>

      <ul className="divide-y divide-border/70">
        {rows.map((r) => (
          <li key={r.name}>
            {/* Desktop row */}
            <div className="hidden lg:grid grid-cols-12 gap-3 px-4 py-2.5 items-start">
              <div className="col-span-3">
                <p className="text-[14px] font-medium text-foreground leading-snug">{r.name}</p>
              </div>
              <div className="col-span-2">
                <span className="font-mono text-[11.5px] text-foreground">{r.type}</span>
              </div>
              <div className="col-span-2 text-[13px] text-muted-foreground tabular-nums">
                {r.location}
              </div>
              <div className="col-span-3">
                <p className="text-[13px] text-muted-foreground leading-[1.5]" title={r.focus}>
                  {r.focus}
                </p>
              </div>
              <div className="col-span-1 text-[12.5px]">
                {r.website ? (
                  <a
                    href={r.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium break-all"
                  >
                    Visit <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                ) : (
                  <span className="text-muted-foreground italic">Not listed</span>
                )}
              </div>
              <div className="col-span-1 text-right">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Greenlisted
                </span>
              </div>
            </div>

            {/* Mobile / tablet stacked card */}
            <div className="lg:hidden px-4 py-3 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[14.5px] font-medium text-foreground leading-snug">{r.name}</p>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-muted-foreground whitespace-nowrap shrink-0 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Greenlisted
                </span>
              </div>
              <dl className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-1.5 text-[12.5px]">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-mono text-foreground text-[11.5px]">{r.type}</dd>
                <dt className="text-muted-foreground">Location</dt>
                <dd className="text-foreground">{r.location}</dd>
                <dt className="text-muted-foreground">Focus</dt>
                <dd className="text-foreground leading-[1.5]">{r.focus}</dd>
                <dt className="text-muted-foreground">Website</dt>
                <dd>
                  {r.website ? (
                    <a
                      href={r.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary-hover font-medium break-all"
                    >
                      {r.website.replace(/^https?:\/\//, "")} <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground italic">Public-facing site not listed</span>
                  )}
                </dd>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Greenlist;
