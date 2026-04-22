import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  getGreenlistEntry,
  GreenlistProfile as GLProfile,
  AlertStatus,
} from "@/data/greenlist";

// status-tinted top border
const CARD_BORDER: Record<"recognized" | AlertStatus, string> = {
  recognized: "border-t-verified",
  "shut-down": "border-t-destructive",
  "no-longer-registered": "border-t-destructive",
  "not-on-fda-list": "border-t-pending",
  unverified: "border-t-muted-foreground/40",
};

const ALERT_STATUS_LABEL: Record<AlertStatus, string> = {
  "shut-down": "Shut Down",
  "no-longer-registered": "No Active Registration",
  "not-on-fda-list": "Not on FDA List",
  unverified: "Unverified",
};

// ---------- Helpers ----------

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
};

const formatAsOf = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

// ---------- Row primitive (fits 2-col grid) ----------

const Row = ({
  label,
  value,
  span,
  mono,
}: {
  label: string;
  value: ReactNode;
  span?: boolean;
  mono?: boolean;
}) => {
  if (value === null || value === undefined || value === "" || value === false)
    return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div
      className={`py-3 border-b border-border/50 ${
        span ? "md:col-span-2" : ""
      }`}
    >
      <dt className="t-utility-xs uppercase tracking-[0.08em] text-muted-foreground font-medium">
        {label}
      </dt>
      <dd
        className={`mt-1 t-body-sm text-foreground/90 leading-[1.55] ${
          mono ? "font-mono t-body-sm" : ""
        }`}
      >
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </dd>
    </div>
  );
};

// ---------- Page ----------

const GreenlistProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = getGreenlistEntry(slug);

  if (!entry) {
    return (
      <section className="container-narrow py-24 text-center">
        <p className="eyebrow mb-3">Not Found</p>
        <h1 className="title-page mb-4">No facility profile found.</h1>
        <Link
          to="/greenlist"
          className="t-utility-xs font-semibold uppercase tracking-[0.14em] text-primary hover:text-primary-hover"
        >
          ← Back to Greenlist
        </Link>
      </section>
    );
  }

  const p: GLProfile = entry.profile ?? {};
  const alert = entry.regulatoryAlert;
  const isAlert = !!alert;
  const borderKey: "recognized" | AlertStatus = isAlert
    ? alert!.status
    : "recognized";
  const statusLabel = isAlert
    ? alert!.shortLabel ?? ALERT_STATUS_LABEL[alert!.status]
    : "Recognized";

  const websiteLink = entry.website ? (
    <a
      href={entry.website}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-foreground hover:text-primary"
    >
      {hostname(entry.website)}
      <ExternalLink className="h-3 w-3" />
    </a>
  ) : (
    <span className="text-muted-foreground">Not listed</span>
  );

  // Sourcing & capability scope rendering
  const hasDosageForms = !!p.dosageForms && p.dosageForms.length > 0;
  const hasSpecializations =
    !!p.specializations && p.specializations.length > 0;
  const hasScope = hasDosageForms || hasSpecializations;

  return (
    <>
      <PageMeta
        title={`${entry.name} · ${statusLabel}`}
        description={`Source Standard public registry record for ${entry.name}. ${entry.type} · ${entry.location}.`}
      />
      <Breadcrumb
        items={[
          { label: "Registry", to: "/greenlist" },
          { label: entry.category },
          { label: entry.name },
        ]}
      />

      <section className="bg-background">
        <div className="container-wide pt-8 pb-4">
          {/* §1 — Identity row */}
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="min-w-0">
              <Link
                to="/greenlist"
                className="t-utility-xs text-muted-foreground hover:text-foreground mb-3 inline-block"
              >
                ← Back to Greenlist
              </Link>
              <h1 className="t-section-title-md font-semibold tracking-tight text-foreground leading-tight">
                {entry.name}
              </h1>
              <div className="mt-2 flex items-center gap-2 flex-wrap t-body-sm text-muted-foreground">
                {isAlert ? (
                  <span className="inline-flex items-center gap-1.5 t-utility-xs uppercase tracking-[0.08em] text-[hsl(var(--src-unverified))]">
                    <span
                      aria-hidden
                      className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--src-unverified))]"
                    />
                    {statusLabel}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 t-utility-xs uppercase tracking-[0.08em] text-foreground">
                    <span
                      aria-hidden
                      className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--verified))]"
                    />
                    Recognized
                  </span>
                )}
                <span className="text-border">·</span>
                <span>{entry.location}</span>
                <span className="text-border">·</span>
                <span>{entry.type}</span>
              </div>
            </div>

            {entry.website && (
              <div className="hidden md:flex items-center gap-4 t-utility-xs">
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight"
                >
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* §2 — Profile card */}
          <div
            className={`mt-6 border border-border border-t-2 ${CARD_BORDER[borderKey]} bg-background p-8 md:p-10`}
          >
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              <Row label="Registry status" value={statusLabel} />
              <Row label="Facility name" value={entry.name} />
              <Row label="Source type" value={entry.type} />
              <Row label="Category" value={entry.category} />
              <Row label="Location" value={entry.location} />
              <Row label="Website" value={websiteLink} />
              <Row label="FDA registration" value={p.fdaRegistration} />
              <Row label="Designation" value={p.designation} />
              <Row label="Standards" value={p.standards} />
              <Row label="Cleanroom class" value={p.cleanroomClass} />
              <Row label="States served" value={p.statesServed} />
              <Row label="Last inspection" value={p.lastInspectionDate} />
              <Row
                label="Environmental monitoring"
                value={p.environmentalMonitoring}
              />
              <Row label="Testing protocols" value={p.testingProtocols} />
              <Row label="Years in operation" value={p.yearsInOperation} />
              <Row label="Facility scale" value={p.facilityScale} />
              <Row label="QA staffing" value={p.qaStaffing} />
              <Row label="API sourcing policy" value={p.apiSourcingPolicy} />

              {p.inspectionHistory && (
                <Row
                  span
                  label="Inspection history"
                  value={p.inspectionHistory}
                />
              )}

              <Row span label="Clinical focus" value={entry.focus} />

              {p.background && (
                <Row span label="Background" value={p.background} />
              )}

              {/* Sourcing & capability scope — full-width inside card */}
              <div className="md:col-span-2 py-4 border-b border-border/50">
                <dt className="t-utility-xs uppercase tracking-[0.08em] text-muted-foreground font-medium">
                  Sourcing & capability scope
                </dt>
                <dd className="mt-2">
                  {!hasScope ? (
                    <p className="t-body-sm text-muted-foreground leading-[1.6]">
                      No published capability scope is currently on file for this
                      facility.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {hasDosageForms && (
                        <div>
                          <p className="t-utility-xs uppercase tracking-[0.06em] text-muted-foreground font-medium mb-1.5">
                            Dosage forms
                          </p>
                          <ul className="t-body-sm text-foreground/90 leading-[1.7]">
                            {p.dosageForms!.map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {hasSpecializations && (
                        <div>
                          <p className="t-utility-xs uppercase tracking-[0.06em] text-muted-foreground font-medium mb-1.5">
                            Specializations
                          </p>
                          <ul className="t-body-sm text-foreground/90 leading-[1.7]">
                            {p.specializations!.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="mt-2 t-utility-xs text-muted-foreground leading-[1.6]">
                        Recognition reflects the facility's published upstream role
                        only. It does not certify any downstream vendor that claims
                        to source from this facility, vendor verification requires
                        a separate review.
                      </p>
                    </div>
                  )}
                </dd>
              </div>

              {/* Regulatory alert (conditional, full-width inside card) */}
              {isAlert && (
                <div className="md:col-span-2 py-4 border-b border-border/50">
                  <dt className="t-utility-xs uppercase tracking-[0.08em] text-[hsl(var(--src-unverified))] font-semibold">
                    Regulatory alert · {statusLabel}
                  </dt>
                  <dd className="mt-2">
                    <p className="t-body-sm text-foreground/90 leading-[1.65]">
                      {alert!.reason}
                    </p>
                    <p className="mt-1 t-utility-xs text-muted-foreground tabular-nums">
                      As of {formatAsOf(alert!.asOf)}
                    </p>
                    {alert!.proof.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {alert!.proof.map((pr) => (
                          <li key={pr.url} className="t-body-sm">
                            <a
                              href={pr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground hover:text-primary underline-offset-2 hover:underline break-all"
                            >
                              ↗ {pr.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              )}
            </dl>

            {/* §3 — Action area */}
            {entry.website && (
              <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-end gap-5 flex-wrap t-utility-xs">
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight"
                >
                  Visit website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* §4 — Footer micro-line */}
          <p className="mt-6 pb-12 text-center t-utility-xs text-muted-foreground">
            Public registry record · Upstream reference layer · Recognition does
            not certify downstream vendors.
          </p>
        </div>
      </section>
    </>
  );
};

export default GreenlistProfile;
