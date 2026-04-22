import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ProfileHeader, ProfileFootnote } from "@/components/ProfileHeader";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
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

const DLRow = ({ label, value }: { label: string; value: ReactNode }) => {
  if (value === null || value === undefined || value === "" || value === false) return null;
  return (
    <>
      <dt className="text-[12px] uppercase tracking-[0.06em] text-muted-foreground font-medium pt-1">
        {label}
      </dt>
      <dd className="text-[14px] text-foreground/90 leading-[1.6] max-w-[68ch]">
        {Array.isArray(value) ? (value as string[]).join(", ") : value}
      </dd>
    </>
  );
};

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
    {
      label: "Status",
      value: isAlert ? alertLabel : "Recognized",
    },
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
  ];
  const visibleGlance = glanceData
    .filter((r) => r.value !== null && r.value !== undefined && r.value !== "" && r.value !== false)
    .slice(0, 4);

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
      >
        {entry.website ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-[12.5px]"
          >
            <a href={entry.website} target="_blank" rel="noopener noreferrer">
              Visit website ↗
            </a>
          </Button>
        ) : (
          <p className="text-[12.5px] text-muted-foreground italic">
            Official website not listed
          </p>
        )}
      </ProfileHeader>

      <Section density="doc">
        <div className="space-y-12">
          {isAlert && (
            <section className="border border-[hsl(var(--src-unverified))]/30 rounded-md p-5">
              <div className="flex items-baseline gap-3 mb-3">
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
            </section>
          )}

          <section>
            <h2 className="text-[18px] font-semibold text-foreground mb-5 pb-2 border-b border-border/60">
              Regulatory & standards
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3">
              <DLRow label="Designation" value={!designationDuplicatesType ? p.designation : null} />
              <DLRow label="FDA registration" value={p.fdaRegistration} />
              <DLRow label="Last inspection" value={p.lastInspectionDate} />
              <DLRow label="Cleanroom class" value={p.cleanroomClass} />
              <DLRow label="Standards" value={p.standards} />
              <DLRow label="States served" value={p.statesServed} />
              <DLRow label="Testing" value={p.testingProtocols} />
              <DLRow label="Inspection history" value={p.inspectionHistory} />
              <DLRow label="Environmental monitoring" value={p.environmentalMonitoring} />
            </dl>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-foreground mb-5 pb-2 border-b border-border/60">
              Operating focus & capabilities
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-x-6 gap-y-3">
              <DLRow label="Dosage forms" value={p.dosageForms} />
              <DLRow label="Specializations" value={p.specializations} />
              <DLRow label="Clinical focus" value={entry.focus} />
              <DLRow label="API sourcing" value={p.apiSourcingPolicy} />
              <DLRow label="Years in operation" value={p.yearsInOperation} />
              <DLRow label="Facility scale" value={p.facilityScale} />
              <DLRow label="QA staffing" value={p.qaStaffing} />
              <DLRow label="Background" value={p.background} />
              <DLRow label="Review notes" value={p.reviewNotes} />
            </dl>
          </section>

          <section className="border-l-2 border-border/70 pl-4 py-1">
            <p className="text-[13px] leading-[1.7] text-muted-foreground max-w-[78ch]">
              This facility appears in the Source Standard upstream reference set. Inclusion reflects recognized federal registration, state licensure, or accredited credentialing. It is not a clinical endorsement and does not constitute verification of any downstream vendor or product that may source from this facility.
            </p>
          </section>
        </div>
      </Section>

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
