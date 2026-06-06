import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import {
  getGreenlistEntry,
  GreenlistProfile as GLProfile,
} from "@/data/greenlist";

/**
 * GreenlistProfile — Manufacturer Intelligence Profile.
 * Public reference record. Excludes proprietary supply-chain intelligence
 * (vendor relationships, network mappings, internal risk scoring, etc.).
 */

const formatAsOf = (iso?: string): string | undefined => {
  if (!iso) return undefined;
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

type StatusTier = "greenlisted" | "monitoring" | "alert";

const STATUS_LABEL: Record<StatusTier, string> = {
  greenlisted: "Greenlisted",
  monitoring: "Under Monitoring",
  alert: "Status Alert",
};

const STATUS_COLOR: Record<StatusTier, string> = {
  greenlisted: "#34C759",
  monitoring: "#C99A2E",
  alert: "#FF3B30",
};

const manufacturerTypeLabel = (raw?: string): string => {
  if (!raw) return "Manufacturer";
  const t = raw.toLowerCase();
  if (t.includes("api")) return "API Manufacturer";
  if (t.includes("503a + 503b") || t.includes("hybrid")) return "Hybrid Facility";
  if (t.includes("503b")) return "503B Facility";
  if (t.includes("503a")) return "503A Facility";
  return raw;
};

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p
    className="font-sans font-semibold uppercase text-muted-foreground"
    style={{ fontSize: "10px", letterSpacing: "0.08em" }}
  >
    {children}
  </p>
);

const Row = ({ label, value }: { label: string; value: ReactNode }) => (
  <div
    className="flex items-baseline justify-between gap-4 py-2"
    style={{ borderTop: "0.5px solid hsl(var(--border))" }}
  >
    <span
      className="font-sans uppercase text-muted-foreground"
      style={{ fontSize: "10px", letterSpacing: "0.08em" }}
    >
      {label}
    </span>
    <span
      className="font-sans font-medium text-foreground tabular-nums text-right max-w-[60%]"
      style={{ fontSize: "12px" }}
    >
      {value ?? "—"}
    </span>
  </div>
);

const Pill = ({ children, muted = false }: { children: ReactNode; muted?: boolean }) => (
  <span
    className={`inline-flex items-center font-sans font-semibold uppercase ${
      muted ? "text-muted-foreground" : "text-foreground"
    }`}
    style={{
      fontSize: "10px",
      letterSpacing: "0.06em",
      padding: "4px 9px",
      borderRadius: "20px",
      border: "1px solid hsl(var(--border))",
    }}
  >
    {children}
  </span>
);

const SnapCard = ({ label, value }: { label: string; value: ReactNode }) => (
  <div
    className="bg-background"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "8px",
      padding: "12px 14px",
      minHeight: "62px",
    }}
  >
    <p
      className="font-sans font-semibold uppercase text-muted-foreground"
      style={{ fontSize: "9px", letterSpacing: "0.08em" }}
    >
      {label}
    </p>
    <div
      className="mt-1.5 font-sans font-medium text-foreground"
      style={{ fontSize: "12px", lineHeight: 1.4, wordBreak: "break-word" }}
    >
      {value}
    </div>
  </div>
);

const hasVal = (v: unknown): boolean => {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s !== "" && s !== "—" && s !== "-" && s !== "n/a" && s !== "na" && s !== "not available" && s !== "unknown";
  }
  if (Array.isArray(v)) return v.length > 0;
  return true;
};

// Capability detection from existing free-text data fields.
const CAPABILITY_DEFS: { key: string; label: string; match: RegExp }[] = [
  { key: "sterile", label: "Sterile Compounding", match: /sterile|injectable|infusion|admixture|ophthalmic|prefilled|iv\b/i },
  { key: "nonsterile", label: "Non-Sterile Compounding", match: /non[- ]?sterile|nonsterile|oral|topical|troche|capsule|tablet/i },
  { key: "injectables", label: "Injectables", match: /injectable|injection|im\/sc|intramuscular/i },
  { key: "oral", label: "Oral Medications", match: /oral|capsule|tablet|liquid/i },
  { key: "topicals", label: "Topicals", match: /topical|cream|gel|ointment/i },
  { key: "troches", label: "Troches", match: /troche|lozenge/i },
  { key: "lyophilized", label: "Lyophilized Products", match: /lyophil|freeze[- ]dried/i },
  { key: "multidose", label: "Multi-Dose Vials", match: /multi[- ]?dose|mdv/i },
  { key: "prefilled", label: "Pre-Filled Syringes", match: /prefilled|pre[- ]?filled|syringe/i },
];

const THERAPY_DEFS: { label: string; match: RegExp }[] = [
  { label: "TRT", match: /\btrt\b|testosterone/i },
  { label: "HRT", match: /\bhrt\b|hormone/i },
  { label: "GLP-1", match: /glp[- ]?1|semaglutide|tirzepatide/i },
  { label: "Peptides", match: /peptide/i },
  { label: "Longevity", match: /longevity|anti[- ]?aging/i },
  { label: "Weight Loss", match: /weight[- ]?loss|obesity/i },
  { label: "Wellness", match: /wellness|integrative/i },
  { label: "Sexual Health", match: /sexual|libido|ed\b|erectile/i },
  { label: "Aesthetics", match: /aesthetic|dermatolog|cosmetic/i },
  { label: "Functional Medicine", match: /functional medicine/i },
];

const GreenlistProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = getGreenlistEntry(slug);

  if (!entry) {
    return (
      <section className="container-narrow py-24 text-center">
        <p className="eyebrow mb-3">Not Found</p>
        <h1 className="title-page mb-4">No manufacturer profile found.</h1>
        <Link
          to="/greenlist"
          className="t-utility-xs font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
        >
          ← Back to Manufacturer Registry
        </Link>
      </section>
    );
  }

  const p: GLProfile = entry.profile ?? {};
  const status: StatusTier = entry.regulatoryAlert ? "alert" : "monitoring";
  const isGreenlisted = false;

  const typeBadge = manufacturerTypeLabel(entry.type);
  const lastUpdated =
    formatAsOf(p.ssReviewDate) ??
    formatAsOf(p.ssAuditDate) ??
    formatAsOf(p.lastInspectionDate) ??
    (p.mostRecentRegistrationYear ?? "—");

  // Derive capabilities and therapies from existing free-text fields.
  const searchText = [
    ...(p.dosageForms ?? []),
    ...(p.specializations ?? []),
    entry.focus ?? "",
    p.overview ?? p.background ?? "",
  ].join(" | ");

  const capabilities = p.capabilities && p.capabilities.length > 0
    ? p.capabilities
    : CAPABILITY_DEFS.filter((c) => {
        if (c.key === "sterile" && p.compoundingScope?.sterile) return true;
        if (c.key === "nonsterile" && p.compoundingScope?.nonSterile) return true;
        return c.match.test(searchText);
      }).map((c) => c.label);

  const therapies = p.therapyCategories && p.therapyCategories.length > 0
    ? p.therapyCategories
    : THERAPY_DEFS.filter((t) => t.match.test(searchText)).map((t) => t.label);

  const statusBlurb = isGreenlisted
    ? "This facility currently holds Greenlisted status based on successful independent testing activity."
    : status === "alert"
    ? "This facility is currently under a Status Alert based on regulatory activity or supply-chain signals identified through ongoing monitoring."
    : "This facility has been identified within the Source Standard database and is currently under monitoring. Greenlisted status will be assigned through Source Standard independent testing activity.";

  // Public records — prefer data-driven, fallback to derived FDA inspection link.
  const fdaInspectionUrl = p.feiNumber
    ? `https://www.accessdata.fda.gov/scripts/inspsearch/index.cfm?action=Search.ShowInspectionsTable&FEINumber=${encodeURIComponent(
        p.feiNumber,
      )}`
    : undefined;

  const publicRecords: { label: string; url: string }[] = p.publicRecords?.length
    ? p.publicRecords
    : [
        ...(entry.website ? [{ label: "Company Website", url: entry.website }] : []),
        ...(fdaInspectionUrl ? [{ label: "FDA Inspection Records", url: fdaInspectionUrl }] : []),
      ];






  return (
    <>
      <PageMeta
        title={`${entry.name} · Manufacturer Profile`}
        description={`Source Standard manufacturer intelligence profile for ${entry.name}.`}
        path={`/greenlist/${entry.slug}`}
        type="profile"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: entry.name,
            url:
              entry.website || `https://sourcestandard.org/greenlist/${entry.slug}`,
            mainEntityOfPage: `https://sourcestandard.org/greenlist/${entry.slug}`,
            additionalProperty: [
              {
                "@type": "PropertyValue",
                propertyID: "source-standard-registry",
                name: "Registry",
                value: "Manufacturer",
              },
              {
                "@type": "PropertyValue",
                propertyID: "source-standard-status",
                name: "Source Standard Status",
                value: STATUS_LABEL[status],
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sourcestandard.org/" },
              { "@type": "ListItem", position: 2, name: "Manufacturer Registry", item: "https://sourcestandard.org/greenlist" },
              { "@type": "ListItem", position: 3, name: entry.name, item: `https://sourcestandard.org/greenlist/${entry.slug}` },
            ],
          },
        ]}
      />

      <section className="bg-background">
        <div
          className="mx-auto px-4"
          style={{ maxWidth: "720px", paddingTop: "16px", paddingBottom: "56px" }}
        >
          <Link
            to="/greenlist"
            className="inline-flex items-center font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            ← Back to Manufacturer Registry
          </Link>

          <article
            className="mt-4 bg-card"
            style={{
              border: "0.5px solid hsl(var(--border))",
              borderRadius: "10px",
              padding: "28px",
            }}
          >
            {/* HEADER */}
            <header>
              <div className="flex items-start justify-between gap-4">
                <h1
                  className="min-w-0 font-sans font-semibold text-foreground"
                  style={{ fontSize: "20px", lineHeight: "1.25", letterSpacing: "-0.01em" }}
                >
                  {entry.name}
                </h1>
                <span
                  className="shrink-0 font-sans font-bold uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    color: STATUS_COLOR[status],
                  }}
                >
                  {STATUS_LABEL[status]}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-x-2 gap-y-2 flex-wrap">
                <span
                  className="inline-flex items-center font-sans font-semibold uppercase bg-primary text-primary-foreground"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.06em",
                    padding: "3px 6px",
                    borderRadius: "3px",
                  }}
                >
                  {typeBadge}
                </span>
                {entry.location && (
                  <span className="font-sans text-muted-foreground" style={{ fontSize: "11px" }}>
                    {entry.location}
                  </span>
                )}
                {entry.website && (
                  <>
                    <span className="text-muted-foreground" style={{ fontSize: "11px" }}>·</span>
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-sans text-foreground hover:text-primary underline underline-offset-2 decoration-border hover:decoration-foreground"
                      style={{ fontSize: "11px" }}
                    >
                      {entry.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </>
                )}
                {p.initialRegistrationYear && (
                  <span className="font-sans text-muted-foreground" style={{ fontSize: "11px" }}>
                    · Founded {p.initialRegistrationYear}
                  </span>
                )}
                <span className="font-sans text-muted-foreground" style={{ fontSize: "11px" }}>
                  · Last Updated {lastUpdated}
                </span>
              </div>
            </header>

            {/* SECTION 1 — Overview */}
            <div className="mt-7 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Overview</SectionLabel>
              <p className="mt-2 text-foreground" style={{ fontSize: "13px", lineHeight: 1.65 }}>
                {p.overview ?? p.background ??
                  `${entry.name} is a ${typeBadge.toLowerCase()} identified within the Source Standard supply-chain database. Records are maintained to support supply-chain visibility and ongoing testing activity.`}
              </p>
            </div>

            {/* SECTION 2 — Facility Snapshot */}
            {(() => {
              const headquarters = p.headquarters ?? entry.location;
              const founded = p.yearFounded ?? p.initialRegistrationYear;
              const additionalLocs = p.additionalLocationsList && p.additionalLocationsList.length > 0
                ? p.additionalLocationsList.join(" · ")
                : entry.additionalLocations && entry.additionalLocations.length > 0
                ? entry.additionalLocations.map((l) => [l.city, l.state].filter(Boolean).join(", ")).join(" · ")
                : undefined;
              const coverage =
                p.statesServed && p.statesServed.length >= 25
                  ? "National"
                  : p.statesServed && p.statesServed.length > 1
                  ? "Multi-State"
                  : entry.serviceArea;
              const states = p.statesServed && p.statesServed.length > 0
                ? (p.statesServed.length > 6 ? `${p.statesServed.length} States` : p.statesServed.join(", "))
                : undefined;
              const fdaStatus = p.currentRegistrationStatus;
              const status503A = p.status503A ?? ((entry.category === "503A" || entry.type?.includes("503A")) ? "Designated" : undefined);
              const status503B = p.status503B ?? ((entry.category === "503B" || entry.type?.includes("503B")) ? "Designated" : undefined);
              const websiteHost = entry.website ? entry.website.replace(/^https?:\/\//, "").replace(/\/$/, "") : undefined;

              const cards: { label: string; value: ReactNode }[] = [
                { label: "Facility Type", value: typeBadge },
                hasVal(headquarters) && { label: "Headquarters", value: headquarters },
                hasVal(founded) && { label: "Founded", value: founded },
                hasVal(coverage) && { label: "Coverage", value: coverage },
                hasVal(states) && { label: "States Served", value: states },
                hasVal(additionalLocs) && { label: "Additional Locations", value: additionalLocs },
                hasVal(fdaStatus) && { label: "FDA Registration", value: fdaStatus },
                hasVal(status503A) && { label: "503A Status", value: status503A },
                hasVal(status503B) && { label: "503B Status", value: status503B },
                p.nabpAccreditation && { label: "NABP", value: "Accredited" },
                p.pcabAccreditation && { label: "PCAB", value: "Accredited" },
                hasVal(websiteHost) && {
                  label: "Website",
                  value: (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:text-primary underline underline-offset-2 decoration-border"
                    >
                      {websiteHost}
                    </a>
                  ),
                },
                hasVal(p.feiNumber) && { label: "FEI Number", value: p.feiNumber },
              ].filter(Boolean) as { label: string; value: ReactNode }[];

              return (
                <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
                  <SectionLabel>Facility Snapshot</SectionLabel>
                  <div className="mt-3 grid gap-2 grid-cols-2 sm:grid-cols-3">
                    {cards.map((c) => (
                      <SnapCard key={c.label} label={c.label} value={c.value} />
                    ))}
                  </div>
                  {hasVal(p.registrationNotes) && (
                    <p
                      className="mt-3 text-muted-foreground"
                      style={{ fontSize: "12px", lineHeight: 1.6 }}
                    >
                      {p.registrationNotes}
                    </p>
                  )}
                </div>
              );
            })()}

            {/* SECTION 4 — Compounding Capabilities */}
            {capabilities.length > 0 && (
              <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
                <SectionLabel>Compounding Capabilities</SectionLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  {capabilities.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 5 — Therapy Categories */}
            {therapies.length > 0 && (
              <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
                <SectionLabel>Therapy Categories</SectionLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  {therapies.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 6 — Greenlisted Status */}
            <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Greenlisted Status</SectionLabel>
              <p className="mt-2 text-foreground" style={{ fontSize: "13px", lineHeight: 1.65 }}>
                {statusBlurb}
              </p>
              <p className="mt-2 text-muted-foreground" style={{ fontSize: "12px", lineHeight: 1.65 }}>
                FDA registration, 503A designation, and 503B designation alone do not
                qualify a facility for Greenlisted status. Greenlisted status is
                earned through successful independent testing activity.
              </p>
            </div>

            {/* SECTION 7 — Public Records */}
            {publicRecords.length > 0 && (
              <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
                <SectionLabel>Public Records</SectionLabel>
                <ul className="mt-3 space-y-2">
                  {publicRecords.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-sans text-foreground hover:text-primary underline underline-offset-2 decoration-border hover:decoration-foreground"
                        style={{ fontSize: "12px" }}
                      >
                        {r.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}





            {/* SECTION 8 — Registry Framework */}
            <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Registry Framework</SectionLabel>
              <p className="mt-2 text-muted-foreground" style={{ fontSize: "12px", lineHeight: 1.65 }}>
                Source Standard maintains records on manufacturers identified within
                the compounded therapy supply chain. Inclusion in the Manufacturer
                Registry does not imply endorsement, recommendation, or Greenlisted
                status.
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="mt-7 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <Link
                to="/greenlist"
                className="inline-flex items-center font-sans font-semibold uppercase text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground"
                style={{ fontSize: "11px", letterSpacing: "0.08em" }}
              >
                Back to Manufacturer Registry →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default GreenlistProfile;
