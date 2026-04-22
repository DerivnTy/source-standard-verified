import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { ProfileHeader, ProfileFootnote } from "@/components/ProfileHeader";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { getGreenlistEntry, GreenlistProfile as GLProfile } from "@/data/greenlist";

// Inline meta line: dot-separated row of short scalar values. Skips empties.
const MetaLine = ({ items }: { items: (string | number | null | undefined)[] }) => {
  const filled = items.filter((v) => v !== null && v !== undefined && v !== "") as (string | number)[];
  if (filled.length === 0) return null;
  return (
    <p className="text-[14px] text-foreground/85 leading-[1.55] max-w-[68ch]">
      {filled.map((v, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-border">·</span>}
          <span>{v}</span>
        </span>
      ))}
    </p>
  );
};

const TagRow = ({ label, items }: { label: string; items?: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <p className="text-[14px] text-foreground/85 leading-[1.55] max-w-[68ch]">
      <span className="font-semibold text-foreground mr-2">{label}</span>
      {items.join(", ")}
    </p>
  );
};

const Prose = ({ label, value }: { label?: string; value?: string }) => {
  if (!value) return null;
  return (
    <p className="text-[14px] text-foreground/85 leading-[1.55] max-w-[68ch]">
      {label && <span className="font-semibold text-foreground mr-2">{label}</span>}
      {value}
    </p>
  );
};

const SubSection = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) => {
  const filled = (Array.isArray(children) ? children : [children]).filter(
    (c) => c !== null && c !== false && c !== undefined
  );
  if (filled.length === 0) return null;
  return (
    <section>
      <div className="flex items-baseline gap-3 pb-2 border-b border-border/60">
        <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-muted-foreground/75">
          {number}
        </span>
        <h2 className="h-sub m-0">{title}</h2>
      </div>
      <div className="mt-4 space-y-3">{filled}</div>
    </section>
  );
};

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
      <dt className="text-[11px] uppercase tracking-[0.06em] text-muted-foreground font-medium">
        {label}
      </dt>
      <dd className="mt-0.5 text-[13.5px] text-foreground leading-snug">{value}</dd>
    </div>
  );
};

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
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
          className="text-[12px] font-mono uppercase tracking-[0.14em] text-foreground hover:text-primary"
        >
          ← Back to Greenlist
        </Link>
      </section>
    );
  }

  const p: GLProfile = entry.profile ?? {};
  const alert = entry.regulatoryAlert;
  const isAlert = !!alert;
  const summary = isAlert
    ? alert!.reason
    : (p.background ?? `${entry.focus}.`);

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
    {
      label: "Designation",
      value: !designationDuplicatesType && p.designation ? p.designation : null,
    },
  ];
  const visibleGlance = glanceData.filter(
    (r) => r.value !== null && r.value !== undefined && r.value !== "" && r.value !== false
  );

  return (
    <>
      <ProfileHeader
        backHref="/greenlist"
        backLabel="Back to Greenlist"
        eyebrow={isAlert ? "Unverified facility" : "Greenlist source"}
        title={entry.name}
        identity={
          <span className="inline-flex items-center gap-3">
            {isAlert ? (
              <span className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.12em] text-[10.5px] px-2 py-0.5 rounded-full bg-[hsl(var(--src-unverified-soft))] text-[hsl(var(--src-unverified))] ring-1 ring-[hsl(var(--src-unverified))]/25">
                <span
                  aria-hidden
                  className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--src-unverified))]"
                />
                {alertLabel}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.12em] text-[10.5px] text-foreground">
                <span
                  aria-hidden
                  className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--verified))]"
                />
                Greenlisted
              </span>
            )}
            <span className="text-border">·</span>
            <span>{entry.type}</span>
            <span className="text-border">·</span>
            <span>{entry.location}</span>
          </span>
        }
        lead={summary}
        rightSlot={
          <div className="rounded-md border border-border/60 bg-background overflow-hidden">
            <div className="px-3 py-2 border-b border-border/60 bg-surface-muted/40">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground/75">
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
            className="font-mono uppercase tracking-[0.1em] text-[11.5px]"
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
        <div className="space-y-10">
          {isAlert && (
            <section className="rounded-lg border border-[hsl(var(--src-unverified))]/30 bg-[hsl(var(--src-unverified-soft))]/40 p-5">
              <div className="flex items-baseline gap-3 pb-2 border-b border-[hsl(var(--src-unverified))]/25">
                <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[hsl(var(--src-unverified))]/85">
                  00
                </span>
                <h2 className="h-sub m-0 text-[hsl(var(--src-unverified))]">
                  Regulatory Alert
                </h2>
              </div>
              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-6 gap-y-3 text-[14px] leading-[1.55]">
                <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-medium pt-0.5">
                  Current status
                </dt>
                <dd>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.1em] bg-[hsl(var(--src-unverified-soft))] text-[hsl(var(--src-unverified))] ring-1 ring-[hsl(var(--src-unverified))]/25">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--src-unverified))]"
                    />
                    {alertLabel}
                  </span>
                </dd>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-medium pt-0.5">
                  As of
                </dt>
                <dd className="text-foreground tabular-nums">
                  {formatAsOf(alert!.asOf)}
                </dd>
                <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-medium pt-0.5">
                  Reason for alert
                </dt>
                <dd className="text-foreground/90 max-w-[68ch]">{alert!.reason}</dd>
                {alert!.proof.length > 0 && (
                  <>
                    <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-medium pt-0.5">
                      Source proof
                    </dt>
                    <dd>
                      <ul className="space-y-1.5">
                        {alert!.proof.map((pr) => (
                          <li key={pr.url}>
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
                    </dd>
                  </>
                )}
              </dl>
            </section>
          )}

          <SubSection number="01" title="Regulatory & Quality">
            <MetaLine
              items={[
                !designationDuplicatesType ? p.designation : null,
                p.fdaRegistration ? `FDA reg ${p.fdaRegistration}` : null,
                p.lastInspectionDate ? `Last inspected ${p.lastInspectionDate}` : null,
                p.cleanroomClass ? `Cleanroom ${p.cleanroomClass}` : null,
              ]}
            />
            <TagRow label="Standards" items={p.standards} />
            <TagRow label="States served" items={p.statesServed} />
            <TagRow label="Testing" items={p.testingProtocols} />
            <Prose label="Inspections" value={p.inspectionHistory} />
            <Prose label="Environmental monitoring" value={p.environmentalMonitoring} />
          </SubSection>

          <SubSection number="02" title="Product Capabilities">
            <TagRow label="Dosage forms" items={p.dosageForms} />
            <TagRow label="Specializations" items={p.specializations} />
            <Prose label="Clinical focus" value={entry.focus} />
            <Prose label="API sourcing" value={p.apiSourcingPolicy} />
          </SubSection>

          <SubSection number="03" title="Background">
            <MetaLine
              items={[
                p.yearsInOperation ? `${p.yearsInOperation} in operation` : null,
                p.facilityScale,
                p.qaStaffing ? `QA: ${p.qaStaffing}` : null,
                p.ssAuditDate ? `SS audit ${p.ssAuditDate}` : null,
              ]}
            />
            <Prose value={p.background} />
            <Prose label="Review notes" value={p.reviewNotes} />
          </SubSection>
        </div>
      </Section>

      <ProfileFootnote
        items={[
          { label: "Doc", value: `SS-GL-${entry.slug.toUpperCase().slice(0, 18)}` },
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
