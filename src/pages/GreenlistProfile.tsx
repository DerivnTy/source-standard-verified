import { Link, useParams } from "react-router-dom";
import { ReactNode } from "react";
import { MetadataBar } from "@/components/MetadataBar";
import { Button } from "@/components/ui/button";
import { getGreenlistEntry, GreenlistProfile as GLProfile } from "@/data/greenlist";

// Inline meta line: dot-separated mono row of short scalar values. Skips empties.
const MetaLine = ({ items }: { items: (string | number | null | undefined)[] }) => {
  const filled = items.filter((v) => v !== null && v !== undefined && v !== "") as (string | number)[];
  if (filled.length === 0) return null;
  return (
    <p className="text-[12.5px] font-mono text-muted-foreground leading-relaxed">
      {filled.map((v, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-border">·</span>}
          <span className="text-foreground/80">{v}</span>
        </span>
      ))}
    </p>
  );
};

// Tag row: small label + wrapped chip list. Returns null if array is empty.
const TagRow = ({ label, items }: { label: string; items?: string[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
      <span className="text-[10.5px] uppercase tracking-[0.1em] font-mono text-muted-foreground shrink-0 pt-0.5">
        {label}
      </span>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="inline-flex items-center px-1.5 py-0.5 rounded-sm border border-border/60 bg-surface-muted/40 text-[11.5px] font-mono text-foreground/90"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Prose paragraph with a small inline label. Returns null if value missing.
const Prose = ({ label, value }: { label?: string; value?: string }) => {
  if (!value) return null;
  return (
    <p className="text-[14px] text-foreground/85 leading-[1.55] max-w-[68ch]">
      {label && (
        <span className="text-[10.5px] uppercase tracking-[0.1em] font-mono text-muted-foreground mr-2">
          {label}
        </span>
      )}
      {value}
    </p>
  );
};

// Editorial section: number + title, hairline rule, then content. Skips if no content.
const Section = ({
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
        <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
          {number}
        </span>
        <h2 className="text-[15px] font-semibold text-foreground tracking-[-0.005em] m-0">
          {title}
        </h2>
      </div>
      <div className="mt-4 space-y-3">{filled}</div>
    </section>
  );
};

// Row in the At-a-glance card. Returns null when value missing.
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
      <dd className="mt-0.5 text-[13px] text-foreground leading-snug">{value}</dd>
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
        <p className="eyebrow mb-3">Public Registry · Greenlist Facility</p>
        <h1 className="text-2xl font-semibold text-foreground mb-3">
          No facility profile found
        </h1>
        <p className="text-muted-foreground mb-6">
          The requested facility is not present in the Greenlist registry.
        </p>
        <Link
          to="/greenlist"
          className="text-[13px] font-mono uppercase tracking-[0.14em] text-foreground hover:text-primary"
        >
          ← Back to Greenlist
        </Link>
      </section>
    );
  }

  const p: GLProfile = entry.profile ?? {};
  const summary = p.background ?? `${entry.focus}.`;

  // Normalize for duplicate detection: lowercase, strip non-alphanumerics.
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const designationDuplicatesType =
    !!p.designation &&
    (norm(p.designation) === norm(entry.type) ||
      norm(entry.type).includes(norm(p.designation)) ||
      norm(p.designation).includes(norm(entry.type)));

  // Build glance rows so we can mark the last visible one without a border.
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
      value: !designationDuplicatesType ? text(p.designation) : null,
    },
  ];
  const visibleGlance = glanceData.filter(
    (r) => r.value !== null && r.value !== undefined && r.value !== "" && r.value !== false
  );

  return (
    <>
      <MetadataBar
        items={[
          { label: "Doc", value: `SS-GL-${entry.slug.toUpperCase().slice(0, 18)}` },
          { label: "Listing", value: "Greenlist Facility" },
          { label: "Updated", value: "April 21, 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
      />

      <header className="bg-background border-b border-border/60">
        <div className="container-wide pt-4 pb-6">
          <Link
            to="/greenlist"
            className="inline-flex items-center text-[12px] font-mono uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to Greenlist
          </Link>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <p className="eyebrow mb-2">Public Registry · Greenlist Facility</p>

              <span className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.14em] text-[10.5px] text-foreground mb-2">
                <span
                  aria-hidden
                  className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--verified))]"
                />
                Greenlisted
              </span>

              <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-[-0.015em] text-foreground leading-[1.15]">
                {entry.name}
              </h1>

              <p className="mt-2 text-[13px] text-muted-foreground font-mono">
                {entry.type} · {entry.location}
              </p>

              <p className="mt-3 max-w-[58ch] text-[15px] text-foreground/85 leading-relaxed">
                {summary}
              </p>

              <div className="mt-4">
                {entry.website ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="font-mono uppercase tracking-[0.1em] text-[11.5px]"
                  >
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit website ↗
                    </a>
                  </Button>
                ) : (
                  <p className="text-[12.5px] text-muted-foreground italic">
                    Official website not listed
                  </p>
                )}
              </div>
            </div>

            {/* At-a-glance — promoted summary card */}
            <aside className="md:col-span-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/80 mb-2">
                At a glance
              </p>
              <div className="rounded-lg border border-border/60 bg-background overflow-hidden">
                <div className="px-3 py-2 border-b border-border/60 bg-surface-muted/40">
                  <span className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.14em] text-[11px] text-foreground">
                    <span
                      aria-hidden
                      className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--verified))]"
                    />
                    Greenlisted
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
            </aside>
          </div>
        </div>
      </header>

      <section className="bg-surface-muted/30">
        <div className="container-wide py-5 space-y-3">
          <Section
            eyebrow="01 · Regulatory & Quality"
            title="Regulatory identity, quality systems"
            subtitle="Licensure, inspections, and quality systems."
          >
            <Field label="FDA registration / FEI" value={text(p.fdaRegistration)} />
            <Field label="States served / licensure" value={tags(p.statesServed)} />
            <Field label="Inspection history" value={text(p.inspectionHistory)} />
            <Field label="Last inspection date" value={text(p.lastInspectionDate)} />
            <Field label="Standards met" value={tags(p.standards)} />
            <Field label="Cleanroom classification" value={text(p.cleanroomClass)} />
            <Field label="Testing protocols" value={tags(p.testingProtocols)} />
            <Field label="Environmental monitoring" value={text(p.environmentalMonitoring)} />
          </Section>

          <Section
            eyebrow="02 · Capabilities"
            title="Product capabilities"
            subtitle="What this facility makes and specializes in."
          >
            <Field label="Dosage forms" value={tags(p.dosageForms)} />
            <Field label="Specializations" value={tags(p.specializations)} />
            <Field label="API sourcing policy" value={text(p.apiSourcingPolicy)} />
          </Section>

          <Section
            eyebrow="03 · Background"
            title="Neutral facility background"
            subtitle="Operational history and review notes."
          >
            <Field label="Years in operation" value={text(p.yearsInOperation)} />
            <Field label="Facility scale" value={text(p.facilityScale)} />
            <Field label="QA staffing" value={text(p.qaStaffing)} />
            <Field label="SS audit date" value={text(p.ssAuditDate)} />
            <Field label="Review notes" value={text(p.reviewNotes)} />
          </Section>

          <footer className="rounded-lg border border-border/60 bg-background px-4 py-2.5">
            <p className="text-[12px] text-muted-foreground leading-snug">
              Source Standard does not accept payment from facilities for inclusion in
              the Greenlist. Information is derived from public regulatory filings,
              disclosed facility information, and Source Standard review data where
              applicable.
            </p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default GreenlistProfile;
