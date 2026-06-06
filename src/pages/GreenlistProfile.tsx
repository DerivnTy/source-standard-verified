import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import {
  getGreenlistEntry,
  GreenlistProfile as GLProfile,
} from "@/data/greenlist";

/**
 * GreenlistProfile — Manufacturer Intelligence Profile.
 * Restructured to function as a supply-chain intelligence profile,
 * not a static database record.
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
  <div className="flex items-baseline justify-between gap-4 py-2" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
    <span
      className="font-sans uppercase text-muted-foreground"
      style={{ fontSize: "10px", letterSpacing: "0.08em" }}
    >
      {label}
    </span>
    <span
      className="font-sans font-medium text-foreground tabular-nums text-right"
      style={{ fontSize: "12px" }}
    >
      {value ?? "—"}
    </span>
  </div>
);

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

  const typeBadge = manufacturerTypeLabel(entry.type);
  const lastUpdated =
    formatAsOf(p.ssReviewDate) ??
    formatAsOf(p.ssAuditDate) ??
    formatAsOf(p.lastInspectionDate) ??
    (p.mostRecentRegistrationYear ?? "—");

  // Testing activity — none recorded until program goes live.
  const testsRecorded = 0;
  const passingResults = 0;
  const failedResults = 0;
  const lastTestingActivity: string | undefined = undefined;

  // Supply chain presence — derive from existing profile fields.
  const observedVendors = p.vendorCount ?? 0;
  const observedCategories = (p.specializations ?? []).slice(0, 8);

  const statusBlurb =
    status === "greenlisted"
      ? "This manufacturer currently holds Greenlisted status based on successful independent testing activity observed through ongoing supply-chain monitoring."
      : status === "alert"
      ? "This manufacturer is currently under a Status Alert based on regulatory activity or supply-chain signals identified through ongoing monitoring."
      : "This manufacturer has been identified within the Source Standard database but has not yet achieved Greenlisted status.";

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
            url: entry.website || `https://sourcestandard.org/greenlist/${entry.slug}`,
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
          style={{ maxWidth: "680px", paddingTop: "16px", paddingBottom: "56px" }}
        >
          {/* Back link */}
          <Link
            to="/greenlist"
            className="inline-flex items-center font-sans font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontSize: "10px", letterSpacing: "0.08em" }}
          >
            ← Back to Manufacturer Registry
          </Link>

          {/* Intelligence profile card */}
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
                  style={{
                    fontSize: "20px",
                    lineHeight: "1.25",
                    letterSpacing: "-0.01em",
                  }}
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
                  <span
                    className="font-sans text-muted-foreground"
                    style={{ fontSize: "11px" }}
                  >
                    {entry.location}
                  </span>
                )}
                <span
                  className="font-sans text-muted-foreground"
                  style={{ fontSize: "11px" }}
                >
                  · Last Updated {lastUpdated}
                </span>
              </div>
            </header>

            {/* SECTION 1 — Manufacturer Overview */}
            <div className="mt-7 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Manufacturer Overview</SectionLabel>
              <p className="mt-2 text-foreground" style={{ fontSize: "13px", lineHeight: 1.65 }}>
                {entry.name} is a {typeBadge.toLowerCase()} identified within the
                Source Standard supply-chain database. Manufacturer records are
                maintained to support supply-chain visibility and ongoing
                testing activity.
              </p>
            </div>

            {/* SECTION 2 — Greenlisted Status */}
            <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Greenlisted Status</SectionLabel>
              <p className="mt-2 text-foreground" style={{ fontSize: "13px", lineHeight: 1.65 }}>
                {statusBlurb}
              </p>
              <p className="mt-2 text-muted-foreground" style={{ fontSize: "12px", lineHeight: 1.65 }}>
                FDA registration, 503A designation, and 503B designation alone
                do not qualify a manufacturer for Greenlisted status.
                Greenlisted status is earned through successful independent
                testing activity.
              </p>
            </div>

            {/* SECTION 3 — Testing Activity */}
            <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Testing Activity</SectionLabel>
              <div className="mt-3">
                <Row
                  label="Status"
                  value={
                    <span style={{ color: STATUS_COLOR.monitoring }} className="font-semibold uppercase" >
                      Monitoring Active
                    </span>
                  }
                />
                <Row label="Tests Recorded" value={testsRecorded} />
                <Row label="Passing Results" value={passingResults} />
                <Row label="Failed Results" value={failedResults} />
                <Row label="Last Testing Activity" value={lastTestingActivity ?? "—"} />
              </div>
            </div>

            {/* SECTION 4 — Supply Chain Presence */}
            <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Supply Chain Presence</SectionLabel>
              <div className="mt-3">
                <Row
                  label="Observed Vendor Relationships"
                  value={`${observedVendors} ${observedVendors === 1 ? "Vendor" : "Vendors"}`}
                />
              </div>
              <div className="mt-4">
                <p
                  className="font-sans uppercase text-muted-foreground"
                  style={{ fontSize: "10px", letterSpacing: "0.08em" }}
                >
                  Observed Categories
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {observedCategories.length === 0 ? (
                    <span className="text-muted-foreground" style={{ fontSize: "12px" }}>—</span>
                  ) : (
                    observedCategories.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center font-sans font-semibold uppercase text-foreground"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          padding: "4px 9px",
                          borderRadius: "20px",
                          border: "1px solid hsl(var(--border))",
                        }}
                      >
                        {c}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 5 — Status History */}
            <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Status History</SectionLabel>
              <ol className="mt-3 space-y-3">
                {[
                  { date: lastUpdated, event: "Manufacturer added to registry" },
                  { date: lastUpdated, event: "Monitoring initiated" },
                ].map((row, i) => (
                  <li key={i} className="flex items-baseline gap-4">
                    <span
                      className="font-mono tabular-nums text-muted-foreground shrink-0"
                      style={{ fontSize: "11px", minWidth: "92px" }}
                    >
                      {row.date}
                    </span>
                    <span className="text-foreground" style={{ fontSize: "13px", lineHeight: 1.5 }}>
                      {row.event}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* SECTION 6 — Registry Notes */}
            {p.reviewNotes && (
              <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
                <SectionLabel>Registry Notes</SectionLabel>
                <p className="mt-2 text-foreground" style={{ fontSize: "13px", lineHeight: 1.65 }}>
                  {p.reviewNotes}
                </p>
              </div>
            )}

            {/* SECTION 7 — Registry Framework */}
            <div className="mt-6 pt-6" style={{ borderTop: "0.5px solid hsl(var(--border))" }}>
              <SectionLabel>Registry Framework</SectionLabel>
              <p className="mt-2 text-muted-foreground" style={{ fontSize: "12px", lineHeight: 1.65 }}>
                Source Standard maintains records on manufacturers identified
                within the compounded therapy supply chain. Inclusion in the
                Manufacturer Registry does not imply endorsement,
                recommendation, or Greenlisted status. Registry records exist
                to improve supply-chain transparency and support ongoing
                monitoring activity.
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
