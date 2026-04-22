import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ProfileHeader, ProfileFootnote } from "@/components/ProfileHeader";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getGreenlistEntry, GreenlistProfile as GLProfile } from "@/data/greenlist";

const GlanceRow = ({
  label,
  value,
  isLast,
}: {
  label: string;
  value: ReactNode;
  isLast?: boolean;
}) => {
  if (value === null || value === undefined || value === "" || value === false) return null;
  return (
    <div className={`py-1.5 ${isLast ? "" : "border-b border-border/40"}`}>
      <dt className="text-[10.5px] uppercase tracking-[0.04em] text-muted-foreground font-medium">
        {label}
      </dt>
      <dd className="mt-0.5 text-[13.5px] text-foreground leading-snug">{value}</dd>
    </div>
  );
};

const StackedRow = ({ label, value }: { label: string; value: ReactNode }) => {
  if (value === null || value === undefined || value === "" || value === false) return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return (
    <div className="py-3 border-b border-border/50 last:border-b-0">
      <dt className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium">
        {label}
      </dt>
      <dd className="mt-1 text-[14px] text-foreground/90 leading-[1.6] max-w-[68ch]">
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </dd>
    </div>
  );
};

const SectionHeader = ({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) => (
  <div className="text-center max-w-2xl mx-auto mb-10">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="text-[22px] md:text-[26px] font-semibold text-foreground tracking-tight">
      {title}
    </h2>
    {lede && (
      <p className="mt-3 text-[14.5px] text-muted-foreground leading-[1.65]">{lede}</p>
    )}
  </div>
);

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const firstSentence = (text?: string): string | undefined => {
  if (!text) return undefined;
  const trimmed = text.trim();
  const m = trimmed.match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : trimmed).replace(/\.+$/, "") + ".";
};

const GREENLIST_MEANING = [
  "This facility appears in the upstream reference set used by the Source Standard framework.",
  "Greenlisted status means the facility meets the recognition criteria for upstream reference.",
  "Greenlisted status does not mean Source Standard is certifying every downstream vendor that claims to use it.",
  "Vendor verification requires a separate review of the vendor's own records.",
];

const GreenlistProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = getGreenlistEntry(slug);

  if (!entry) {
    return (
      <section className="container-wide py-24 text-center">
        <p className="eyebrow mb-3">Greenlist source</p>
        <h1 className="title-page mb-3">No facility profile found</h1>
        <p className="text-muted-foreground mb-6">
          The requested facility is not present in the Greenlist registry.
        </p>
        <Link
          to="/greenlist"
          className="text-[13px] text-foreground hover:text-primary underline-offset-2 hover:underline"
        >
          ← Back to Greenlist
        </Link>
      </section>
    );
  }

  const p: GLProfile = entry.profile ?? {};
  const alert = entry.regulatoryAlert;
  const isAlert = !!alert;

  const lead = isAlert
    ? alert!.reason
    : (firstSentence(p.background) ?? entry.focus);

  const ALERT_STATUS_LABEL: Record<string, string> = {
    "shut-down": "Shut Down",
    "no-longer-registered": "No Active Registration",
    "not-on-fda-list": "Not on FDA List",
    unverified: "Unverified",
  };
  const alertLabel = alert
    ? (alert.shortLabel ?? ALERT_STATUS_LABEL[alert.status] ?? "Unverified")
    : "";
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

  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const designationDuplicatesType =
    !!p.designation &&
    (norm(p.designation) === norm(entry.type) ||
      norm(entry.type).includes(norm(p.designation)) ||
      norm(p.designation).includes(norm(entry.type)));

  const glanceData: { label: string; value: ReactNode }[] = [
    { label: "Source type", value: entry.type },
    { label: "Location", value: entry.location },
    { label: "Status", value: isAlert ? alertLabel : "Recognized" },
    {
      label: "Website",
      value: entry.website ? (
        <a
          href={entry.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary underline-offset-2 hover:underline break-all"
        >
          {hostname(entry.website)} ↗
        </a>
      ) : (
        <span className="text-muted-foreground italic">Not listed</span>
      ),
    },
    { label: "Last reviewed", value: "April 21, 2026" },
    {
      label: "States served",
      value: p.statesServed && p.statesServed.length > 0 ? p.statesServed.join(", ") : null,
    },
    { label: "FDA registration", value: p.fdaRegistration ?? null },
  ];
  const visibleGlance = glanceData.filter(
    (r) => r.value !== null && r.value !== undefined && r.value !== "" && r.value !== false
  );

  // Regulatory section field count for sparse fallback
  const regulatoryFields: { label: string; value: ReactNode }[] = [
    { label: "Designation", value: !designationDuplicatesType ? p.designation : null },
    { label: "FDA registration", value: p.fdaRegistration },
    { label: "Standards", value: p.standards },
    { label: "Cleanroom class", value: p.cleanroomClass },
    { label: "States served", value: p.statesServed },
    { label: "Last inspection", value: p.lastInspectionDate },
    { label: "Inspection history", value: p.inspectionHistory },
    { label: "Environmental monitoring", value: p.environmentalMonitoring },
    { label: "Testing", value: p.testingProtocols },
  ];
  const populatedRegulatory = regulatoryFields.filter((f) => {
    const v = f.value;
    if (v === null || v === undefined || v === "" || v === false) return false;
    if (Array.isArray(v) && v.length === 0) return false;
    return true;
  });

  const characteristicFields: { label: string; value: ReactNode }[] = [
    { label: "Dosage forms", value: p.dosageForms },
    { label: "Specializations", value: p.specializations },
    { label: "Clinical focus", value: entry.focus },
    { label: "API sourcing", value: p.apiSourcingPolicy },
    { label: "Years in operation", value: p.yearsInOperation },
    { label: "Facility scale", value: p.facilityScale },
    { label: "QA staffing", value: p.qaStaffing },
  ];
  const populatedCharacteristics = characteristicFields.filter((f) => {
    const v = f.value;
    if (v === null || v === undefined || v === "" || v === false) return false;
    if (Array.isArray(v) && v.length === 0) return false;
    return true;
  });
  const characteristicsSparse =
    populatedCharacteristics.length <= 1 && !!p.background;

  return (
    <>
      <PageMeta
        title={`${entry.name} · ${entry.type}`}
        description={`Source Standard public registry record for ${entry.name}. ${entry.type} · ${entry.location}.`}
      />
      <Breadcrumb
        items={[
          { label: "Registry", to: "/greenlist" },
          { label: entry.category === "503B" ? "503B" : entry.category === "503A" ? "503A" : entry.category },
          { label: entry.name },
        ]}
      />

      {/* 1 · Top intro block */}
      <ProfileHeader
        backHref="/greenlist"
        backLabel="Back to Greenlist"
        eyebrow={isAlert ? "Unverified facility" : "Greenlist source"}
        title={entry.name}
        identity={
          <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
            {isAlert ? (
              <span className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em] text-[hsl(var(--src-unverified))]">
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--src-unverified))]"
                />
                {alertLabel}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.08em] text-foreground">
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--verified))]"
                />
                Recognized
              </span>
            )}
            <span className="text-border">·</span>
            <span>{entry.type}</span>
            <span className="text-border">·</span>
            <span>{entry.location}</span>
          </span>
        }
        lead={lead}
        rightSlot={
          <div className="rounded-md border border-border/60 bg-background overflow-hidden">
            <div className="px-3 py-2 border-b border-border/60 bg-surface-muted/40">
              <span className="text-[10.5px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                At a glance
              </span>
            </div>
            <dl className="px-3 py-1">
              {visibleGlance.map((r, i) => (
                <GlanceRow
                  key={r.label}
                  label={r.label}
                  value={r.value}
                  isLast={i === visibleGlance.length - 1}
                />
              ))}
            </dl>
          </div>
        }
      />

      {/* 3 · What Greenlisted means */}
      <section className="bg-surface-muted border-t border-border/60">
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Interpretation"
            title="What Greenlisted means"
          />
          <ul className="max-w-3xl mx-auto">
            {GREENLIST_MEANING.map((line, i) => (
              <li
                key={i}
                className="py-4 border-b border-border/60 last:border-b-0 text-[14.5px] text-foreground/90 leading-[1.65]"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · Regulatory alert (conditional) */}
      {isAlert && (
        <section className="bg-background border-t border-border/60">
          <div className="container-wide py-12 md:py-16">
            <div className="max-w-3xl mx-auto border border-[hsl(var(--src-unverified))]/30 rounded-md p-5">
              <div className="flex items-baseline flex-wrap gap-3 mb-3">
                <span className="text-[11px] uppercase tracking-[0.1em] text-[hsl(var(--src-unverified))] font-semibold">
                  Regulatory alert
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-[hsl(var(--src-unverified))]">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--src-unverified))]"
                  />
                  {alertLabel}
                </span>
                <span className="text-[12px] text-muted-foreground tabular-nums">
                  as of {formatAsOf(alert!.asOf)}
                </span>
              </div>
              <p className="text-[14px] text-foreground/90 leading-[1.65] max-w-[68ch]">
                {alert!.reason}
              </p>
              {alert!.proof.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {alert!.proof.map((pr) => (
                    <li key={pr.url} className="text-[13px]">
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
            </div>
          </div>
        </section>
      )}

      {/* 5 · Regulatory & standards anchors */}
      <section className={`${isAlert ? "bg-surface-muted" : "bg-background"} border-t border-border/60`}>
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            title="Regulatory & standards"
            lede="The recognition basis for this facility."
          />
          <div className="max-w-3xl mx-auto">
            {populatedRegulatory.length >= 2 ? (
              <dl>
                {populatedRegulatory.map((f) => (
                  <StackedRow key={f.label} label={f.label} value={f.value} />
                ))}
              </dl>
            ) : (
              <p className="text-[14px] text-muted-foreground leading-[1.65] text-center">
                Recognition basis: {entry.type} · public regulatory record.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 6 · Facility characteristics */}
      <section className={`${isAlert ? "bg-background" : "bg-surface-muted"} border-t border-border/60`}>
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            title="Facility characteristics"
            lede="What this facility is known to do."
          />
          <div className="max-w-3xl mx-auto">
            {characteristicsSparse ? (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium mb-1">
                    Clinical focus
                  </p>
                  <p className="text-[14px] text-foreground/90 leading-[1.65] max-w-[68ch]">
                    {entry.focus}
                  </p>
                </div>
                {p.background && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium mb-1">
                      Background
                    </p>
                    <p className="text-[14px] text-foreground/90 leading-[1.7] max-w-[68ch]">
                      {p.background}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <dl>
                {populatedCharacteristics.map((f) => (
                  <StackedRow key={f.label} label={f.label} value={f.value} />
                ))}
                {p.background && (
                  <div className="py-3 border-b border-border/50 last:border-b-0">
                    <dt className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium">
                      Background
                    </dt>
                    <dd className="mt-1 text-[14px] text-foreground/90 leading-[1.7] max-w-[68ch]">
                      {p.background}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* 7 · Relationship to the framework */}
      <section className={`${isAlert ? "bg-surface-muted" : "bg-background"} border-t border-border/60`}>
        <div className="container-wide py-12 md:py-16">
          <SectionHeader
            eyebrow="Within the framework"
            title="How this page fits the dual-layer model"
          />
          <p className="max-w-3xl mx-auto text-[15px] text-foreground/90 leading-[1.7] text-center">
            This facility is part of the upstream reference layer. Vendor verification requires a separate review of invoices, sourcing records, and other documentation to confirm that a listed vendor is actively sourcing from a recognized facility.
          </p>
        </div>
      </section>

      {/* 8 · Continue reading */}
      <section className={`${isAlert ? "bg-background" : "bg-surface-muted"} border-t border-border/60`}>
        <div className="container-wide py-10 md:py-12">
          <p className="eyebrow text-center mb-6">Continue reading</p>
          <ul className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 md:divide-x divide-border/60">
            <li className="py-3 md:py-0 md:px-4 border-b md:border-b-0 border-border/60 text-center">
              <Link
                to="/greenlist"
                className="text-[13.5px] text-foreground hover:text-primary underline-offset-2 hover:underline"
              >
                Back to Upstream Greenlist →
              </Link>
            </li>
            <li className="py-3 md:py-0 md:px-4 border-b md:border-b-0 border-border/60 text-center">
              <Link
                to="/verified-vendors"
                className="text-[13.5px] text-foreground hover:text-primary underline-offset-2 hover:underline"
              >
                View Verified Vendors →
              </Link>
            </li>
            <li className="py-3 md:py-0 md:px-4 text-center">
              <Link
                to="/how-it-works"
                className="text-[13.5px] text-foreground hover:text-primary underline-offset-2 hover:underline"
              >
                How Verification Works →
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 9 · Footer */}
      <ProfileFootnote
        items={[
          { label: "Listing", value: isAlert ? "Unverified Facility" : "Greenlist Facility" },
          { label: "Updated", value: "April 21, 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
        note="Source Standard does not accept payment from facilities for inclusion in the Greenlist. Information is derived from public regulatory filings, disclosed facility information, and Source Standard review data where applicable."
      />
    </>
  );
};

export default GreenlistProfile;
