import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import {
  ExternalLink,
  MapPin,
  Globe,
  Building2,
  Flag,
  ShieldCheck,
  Info,
  Check,
} from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  getGreenlistEntry,
  GreenlistProfile as GLProfile,
  AlertStatus,
} from "@/data/greenlist";
import { getVendor } from "@/data/vendors";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ---------- Status theming ----------

type Theme = { hairline: string };

const THEME: Record<"recognized" | AlertStatus, Theme> = {
  recognized: { hairline: "bg-verified" },
  "shut-down": { hairline: "bg-destructive" },
  "no-longer-registered": { hairline: "bg-destructive" },
  "not-on-fda-list": { hairline: "bg-pending" },
  unverified: { hairline: "bg-muted-foreground/30" },
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
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

// (monogram helper removed — no auto-generated logo block)
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "·";

const isPresent = (
  v: ReactNode | string[] | undefined | null | false
): boolean => {
  if (v === null || v === undefined || v === "" || v === false) return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
};

const form483Display = (
  val: boolean | "unknown" | undefined,
  date?: string
): { label: ReactNode; muted: boolean } => {
  if (val === true) {
    return {
      label: (
        <>
          Yes
          {date && (
            <span className="ml-1.5 text-muted-foreground font-mono tabular-nums">
              · {formatAsOf(date)}
            </span>
          )}
        </>
      ),
      muted: false,
    };
  }
  if (val === false) return { label: "No", muted: false };
  return { label: "Unknown", muted: true };
};

// ---------- Locked primitives ----------

const FallbackLine = ({ children }: { children: ReactNode }) => (
  <span className="t-body-sm text-muted-foreground italic">{children}</span>
);

const Field = ({
  label,
  value,
  mono,
  labelExtra,
  forceForeground,
}: {
  label: string;
  value: ReactNode | string[];
  mono?: boolean;
  labelExtra?: ReactNode;
  forceForeground?: boolean;
}) => {
  const present = isPresent(value);
  return (
    <div>
      <dt className="t-utility-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground inline-flex items-center gap-1.5">
        {label}
        {labelExtra}
      </dt>
      <dd
        className={`mt-1.5 t-body-sm font-medium leading-[1.5] ${
          present || forceForeground ? "text-foreground" : "text-muted-foreground"
        } ${mono && present ? "font-mono tabular-nums" : ""}`}
      >
        {present
          ? Array.isArray(value)
            ? (value as string[]).join(", ")
            : value
          : "—"}
      </dd>
    </div>
  );
};

const RailRow = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: ReactNode | string[];
  mono?: boolean;
}) => {
  const present = isPresent(value);
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <span className="t-utility-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground shrink-0">
        {label}
      </span>
      {present ? (
        <span
          className={`t-body-sm text-foreground text-right leading-[1.45] ${
            mono ? "font-mono tabular-nums" : ""
          }`}
        >
          {Array.isArray(value) ? (value as string[]).join(", ") : value}
        </span>
      ) : (
        <FallbackLine>Not on file</FallbackLine>
      )}
    </div>
  );
};

const SectionHeading = ({
  eyebrow,
  children,
  trailing,
}: {
  eyebrow?: string;
  children: ReactNode;
  trailing?: ReactNode;
}) => (
  <div className="mb-5 flex items-baseline justify-between gap-4 flex-wrap">
    <div>
      {eyebrow && (
        <p className="t-utility-xs uppercase tracking-[0.16em] text-muted-foreground font-semibold mb-1.5">
          {eyebrow}
        </p>
      )}
      <h2 className="t-section-title-sm font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    </div>
    {trailing}
  </div>
);

// Stacked label/value row used inside FDA Registration History (narrative record)
const RecordRow = ({
  label,
  value,
  paragraph,
}: {
  label: string;
  value: ReactNode;
  paragraph?: boolean;
}) => (
  <div className="py-3 border-b border-border/40 last:border-0">
    <p className="t-utility-xs uppercase tracking-[0.1em] font-semibold text-muted-foreground">
      {label}
    </p>
    <p
      className={`mt-1.5 t-body-sm text-foreground leading-[1.6] ${
        paragraph ? "max-w-[68ch]" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

// Compounding scope row — monochrome capability
const CapabilityRow = ({
  label,
  on,
}: {
  label: string;
  on: boolean | undefined;
}) => (
  <div className="flex items-center gap-2.5 py-2">
    {on ? (
      <Check className="h-4 w-4 text-foreground shrink-0" aria-hidden />
    ) : (
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0 mx-[5px]"
      />
    )}
    <span
      className={`t-body-sm leading-[1.45] ${
        on ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {label}
    </span>
  </div>
);

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
  const themeKey: "recognized" | AlertStatus = isAlert
    ? alert!.status
    : "recognized";
  const theme = THEME[themeKey];
  const statusLabel = isAlert
    ? alert!.shortLabel ?? ALERT_STATUS_LABEL[alert!.status]
    : "Recognized";

  // (monogram removed)
  const lastInspection = p.lastInspectionDate
    ? formatAsOf(p.lastInspectionDate)
    : undefined;
  const f483 = form483Display(p.form483Issued, p.form483Date);

  // Compounding scope
  const scope = p.compoundingScope;
  const hasAnyScope =
    !!scope &&
    Object.values(scope).some((v) => v !== undefined && v !== null);

  // FDA Registration History — does any field exist?
  const hasRegHistory =
    !!p.initialRegistrationYear ||
    !!p.currentRegistrationStatus ||
    !!p.mostRecentRegistrationYear ||
    !!p.selfReportedIntent ||
    !!p.registrationNotes;

  // Verified Vendors Sourced Here
  const sourcedVendors = (p.verifiedVendorSlugs ?? [])
    .map((s) => getVendor(s))
    .filter((v): v is NonNullable<ReturnType<typeof getVendor>> => !!v)
    .filter((v) => v.status === "verified");

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

      <TooltipProvider delayDuration={150}>
        <section className="bg-background">
          <div className="container-wide pt-4 pb-6">
            <Link
              to="/greenlist"
              className="t-utility-xs text-muted-foreground hover:text-foreground mb-4 inline-block"
            >
              ← Back to Greenlist
            </Link>

            <article className="border border-border bg-background">
              {/* Status hairline */}
              <div className={`h-[3px] w-full ${theme.hairline}`} aria-hidden />

              {/* ---------- IDENTITY BAND ---------- */}
              <header className="px-6 md:px-8 pt-6 pb-5 border-b border-border">
                <div className="flex items-start gap-6 flex-wrap lg:flex-nowrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="t-eyebrow-sm text-muted-foreground">
                        {entry.type}
                      </span>
                      <span className="text-border" aria-hidden>·</span>
                      <span className="t-eyebrow-sm text-muted-foreground">
                        Source Standard Public Registry
                      </span>
                    </div>

                    <h1 className="t-page-title text-foreground break-words max-w-[24ch]">
                      {entry.name}
                    </h1>

                    <div className="mt-3 flex items-center gap-x-4 gap-y-1.5 flex-wrap t-body-sm text-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden
                        />
                        {entry.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden
                        />
                        {entry.location}
                      </span>
                      {p.feiNumber && (
                        <span className="inline-flex items-center gap-1.5 font-mono tabular-nums text-muted-foreground">
                          FEI {p.feiNumber}
                        </span>
                      )}
                      {entry.website && (
                        <a
                          href={entry.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-foreground hover:text-primary"
                        >
                          <Globe
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden
                          />
                          {hostname(entry.website)}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                    {isAlert ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-destructive/40 bg-destructive/5 t-utility-xs uppercase tracking-[0.1em] text-destructive font-semibold">
                        <span
                          aria-hidden
                          className="inline-block w-1.5 h-1.5 rounded-full bg-destructive"
                        />
                        {statusLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-verified/40 bg-verified/5 t-utility-xs uppercase tracking-[0.1em] text-foreground font-semibold">
                        <span
                          aria-hidden
                          className="inline-block w-1.5 h-1.5 rounded-full bg-verified"
                        />
                        Recognized
                      </span>
                    )}
                    <p className="t-body-sm text-muted-foreground leading-[1.45] max-w-[28ch] lg:text-right">
                      Recognition reflects published upstream role only. It does
                      not certify downstream vendors.
                    </p>
                    {entry.website && (
                      <a
                        href={entry.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 t-utility-xs font-medium tracking-tight"
                      >
                        Visit website <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </header>

              {/* ---------- BODY GRID ---------- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch lg:divide-x lg:divide-border">
                {/* ===== Main column (8/12) ===== */}
                <div className="lg:col-span-8">
                  {/* Public Record — 6-row matrix */}
                  <section className="px-6 md:px-8 py-6 border-b border-border">
                    <SectionHeading eyebrow="Record">
                      Public Record
                    </SectionHeading>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                      <Field
                        label="Last FDA Inspection"
                        value={lastInspection}
                        mono
                      />
                      <Field
                        label="Form 483 Issued"
                        value={f483.label}
                        forceForeground={!f483.muted}
                        labelExtra={
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="inline-flex items-center text-muted-foreground/70 hover:text-foreground"
                                aria-label="About FDA Form 483"
                              >
                                <Info className="h-3 w-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-[260px] t-utility-xs leading-[1.5]"
                            >
                              FDA Form 483 lists inspectional observations
                              issued at the close of an FDA inspection.
                            </TooltipContent>
                          </Tooltip>
                        }
                      />
                      <Field
                        label="Current Registration Status"
                        value={p.currentRegistrationStatus}
                      />
                      <Field
                        label="FEI Number"
                        value={p.feiNumber}
                        mono
                      />
                      <Field
                        label="Initial Registration Year"
                        value={p.initialRegistrationYear}
                        mono
                      />
                      <Field
                        label="Registration Category"
                        value={p.registrationCategory}
                      />
                    </dl>
                  </section>

                  {/* FDA Registration History */}
                  <section className="px-6 md:px-8 py-6 border-b border-border">
                    <SectionHeading eyebrow="History">
                      FDA Registration History
                    </SectionHeading>
                    {hasRegHistory ? (
                      <dl>
                        {p.initialRegistrationYear && (
                          <RecordRow
                            label="Initial Registration"
                            value={p.initialRegistrationYear}
                          />
                        )}
                        {p.currentRegistrationStatus && (
                          <RecordRow
                            label="Current Status"
                            value={p.currentRegistrationStatus}
                          />
                        )}
                        {p.mostRecentRegistrationYear && (
                          <RecordRow
                            label="Most Recent Registration Year"
                            value={p.mostRecentRegistrationYear}
                          />
                        )}
                        {p.selfReportedIntent && (
                          <RecordRow
                            label="Self-Reported Intent"
                            value={p.selfReportedIntent}
                            paragraph
                          />
                        )}
                        {p.registrationNotes && (
                          <RecordRow
                            label="Registration Notes"
                            value={p.registrationNotes}
                            paragraph
                          />
                        )}
                      </dl>
                    ) : (
                      <FallbackLine>
                        No FDA registration history on file.
                      </FallbackLine>
                    )}
                  </section>

                  {/* Compounding Scope */}
                  <section className="px-6 md:px-8 py-6 border-b border-border">
                    <SectionHeading eyebrow="Capabilities">
                      Compounding Scope
                    </SectionHeading>
                    {hasAnyScope ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                        <CapabilityRow
                          label="Sterile"
                          on={scope?.sterile}
                        />
                        <CapabilityRow
                          label="Office Use"
                          on={scope?.officeUse}
                        />
                        <CapabilityRow
                          label="Non-Sterile"
                          on={scope?.nonSterile}
                        />
                        <CapabilityRow
                          label="Bulk Drug Substances"
                          on={scope?.bulkDrugSubstances}
                        />
                        <CapabilityRow
                          label="Patient-Specific"
                          on={scope?.patientSpecific}
                        />
                        <CapabilityRow
                          label="Hazardous"
                          on={scope?.hazardous}
                        />
                      </div>
                    ) : (
                      <FallbackLine>
                        No published capability scope on file.
                      </FallbackLine>
                    )}
                  </section>

                  {/* Verified Vendors Sourced Here */}
                  <section
                    className={`px-6 md:px-8 py-6 ${
                      isAlert ? "border-b border-border" : ""
                    }`}
                  >
                    <SectionHeading eyebrow="Cross-reference">
                      Verified Vendors Sourced Here
                    </SectionHeading>
                    {sourcedVendors.length > 0 ? (
                      <ul className="divide-y divide-border/50 border-t border-border/50">
                        {sourcedVendors.map((v) => {
                          const loc =
                            v.city && v.state
                              ? `${v.city}, ${v.state}`
                              : v.city || v.state || "";
                          return (
                            <li key={v.slug}>
                              <Link
                                to={`/verified-vendors/${v.slug}`}
                                className="flex items-center justify-between gap-4 py-3 group"
                              >
                                <span className="t-body-sm text-foreground group-hover:text-primary">
                                  {v.name}
                                </span>
                                {loc && (
                                  <span className="t-utility-xs text-muted-foreground">
                                    {loc}
                                  </span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <FallbackLine>
                        No verified vendor sourcing relationships currently
                        published.
                      </FallbackLine>
                    )}
                  </section>

                  {/* Regulatory Alert (conditional) */}
                  {isAlert && (
                    <section className="px-6 md:px-8 py-6">
                      <p className="t-utility-xs uppercase tracking-[0.1em] text-destructive font-semibold mb-2">
                        Regulatory Alert · {statusLabel}
                      </p>
                      <p className="t-body-sm text-foreground/90 leading-[1.65] max-w-[68ch]">
                        {alert!.reason}
                      </p>
                      <p className="mt-1.5 t-utility-xs text-muted-foreground tabular-nums">
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
                    </section>
                  )}
                </div>

                {/* ===== Trust Rail (4/12) ===== */}
                <aside className="lg:col-span-4 bg-muted/20">
                  <div className="px-6 md:px-7 py-6">
                    <div className="flex items-center gap-2 mb-5">
                      <ShieldCheck
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden
                      />
                      <p className="t-utility-xs uppercase tracking-[0.16em] text-foreground font-semibold">
                        Trust Record
                      </p>
                    </div>

                    <dl className="border-t border-border/50">
                      <RailRow label="Registry status" value={statusLabel} />
                      <RailRow label="FEI Number" value={p.feiNumber} mono />
                      <RailRow
                        label="Last FDA Inspection"
                        value={lastInspection}
                        mono
                      />
                      <RailRow
                        label="Form 483 Issued"
                        value={
                          p.form483Issued === undefined
                            ? undefined
                            : f483.label
                        }
                      />
                      <RailRow
                        label="Current Reg. Status"
                        value={p.currentRegistrationStatus}
                      />
                      <RailRow label="Source type" value={entry.type} />
                    </dl>

                    <Link
                      to="/report-concern"
                      className="group mt-6 flex items-center justify-between gap-3 border border-border bg-background px-4 py-3.5 hover:border-foreground/40 transition-colors"
                    >
                      <div>
                        <p className="t-utility-xs uppercase tracking-[0.12em] text-foreground font-semibold">
                          Report a concern
                        </p>
                        <p className="mt-0.5 t-utility-xs text-muted-foreground leading-[1.45]">
                          Flag an inaccuracy or sourcing issue.
                        </p>
                      </div>
                      <Flag
                        className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </aside>
              </div>

              {/* ---------- FOOTER STRIP ---------- */}
              <div className="px-6 md:px-10 py-4 border-t border-border bg-muted/10 flex items-center justify-between gap-4 flex-wrap">
                <p className="t-utility-xs text-muted-foreground">
                  Public registry record · Upstream reference layer
                </p>
                <p className="t-utility-xs text-muted-foreground">
                  Recognition does not certify downstream vendors.
                </p>
              </div>
            </article>
          </div>
        </section>
      </TooltipProvider>
    </>
  );
};

export default GreenlistProfile;
