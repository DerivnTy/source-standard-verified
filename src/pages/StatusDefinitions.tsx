import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "purpose", number: "01", label: "Purpose" },
  { id: "vendor-statuses", number: "02", label: "Vendor Statuses" },
  { id: "facility-statuses", number: "03", label: "Facility Statuses" },
  { id: "lifecycle", number: "04", label: "Status Progression" },
  { id: "related", number: "05", label: "Related Documents" },
];

type Status = {
  n: string;
  title: string;
  definition: string;
  meaning: string;
  notImply: string;
  issued: string;
  revised: string;
};

const VENDOR_STATUSES: Status[] = [
  {
    n: "01",
    title: "Verified",
    definition:
      "Documentation, sourcing records, facility relationships, manufacturer records, public records, and verification materials were sufficient to support the reviewed sourcing representations within the defined review scope.",
    meaning:
      "Documentation, sourcing records, facility relationships, and verification materials were sufficient to support the reviewed sourcing representations within the defined review scope.",
    notImply:
      "It does not imply product approval, treatment recommendation, guaranteed safety, future performance, or regulatory endorsement.",
    issued:
      "Issued when verification review is successfully completed.",
    revised:
      "Revised when monitoring activity, testing activity, material changes, or updated records require reassessment.",
  },
  {
    n: "02",
    title: "Unverified",
    definition:
      "The registry does not currently contain sufficient reviewed information to support the vendor's sourcing representations.",
    meaning:
      "The registry does not currently contain sufficient reviewed information to support the vendor's sourcing representations.",
    notImply:
      "It does not imply fraud, misconduct, regulatory violations, product quality concerns, or patient risk.",
    issued:
      "Issued when a vendor record exists without sufficient completed verification activity.",
    revised:
      "Revised when documentation review, testing activity, monitoring activity, or reassessment occurs.",
  },
];

const FACILITY_STATUSES: Status[] = [
  {
    n: "01",
    title: "Monitoring",
    definition:
      "The facility exists within the Source Standard database and is currently being monitored through facility intelligence, public records, manufacturer review, testing activity, or supply-chain review.",
    meaning:
      "The facility exists within the Source Standard database and is currently being monitored through facility intelligence, public records, manufacturer review, testing activity, or supply-chain review.",
    notImply:
      "It does not imply a negative finding, product quality issue, enforcement action, or regulatory concern.",
    issued:
      "Issued when a facility is entered into the Source Standard database and active monitoring is initiated.",
    revised:
      "Revised as facility intelligence, monitoring activity, testing activity, manufacturer review, or supply-chain information accumulates.",
  },
  {
    n: "02",
    title: "Greenlisted",
    definition:
      "Available facility records, monitoring activity, testing activity, and supporting evidence currently support Greenlisted status under the Source Standard framework.",
    meaning:
      "Available facility records, monitoring activity, testing activity, and supporting evidence currently support Greenlisted status under the Source Standard framework.",
    notImply:
      "It does not imply guaranteed quality, product approval, future performance, or regulatory endorsement.",
    issued:
      "Issued when facility records, monitoring activity, testing activity, and supporting evidence are sufficient to support Greenlisted status.",
    revised:
      "Revised when monitoring activity, testing activity, public records, or supply-chain information no longer support the status.",
  },
  {
    n: "03",
    title: "Status Alert",
    definition:
      "Testing activity, monitoring activity, public records, or supply-chain intelligence indicate information that may require heightened attention or additional review.",
    meaning:
      "Testing activity, monitoring activity, public records, or supply-chain intelligence indicate information that may require heightened attention or additional review.",
    notImply:
      "It does not imply a final determination, regulatory finding, or confirmed product defect.",
    issued:
      "Issued when monitoring activity, testing activity, public records, or supply-chain intelligence indicate that additional review is warranted.",
    revised:
      "Revised when subsequent review, monitoring activity, testing activity, or new information resolves the underlying matter.",
  },
];

const PROGRESSION_INPUTS = [
  { n: "01", t: "New documentation" },
  { n: "02", t: "Monitoring activity" },
  { n: "03", t: "Testing activity" },
  { n: "04", t: "Facility intelligence" },
  { n: "05", t: "Manufacturer review" },
  { n: "06", t: "Public-record updates" },
  { n: "07", t: "Supply-chain information" },
];

const RELATED = [
  {
    to: "/how-it-works",
    title: "Verification Protocol",
    description: "How documentation review, monitoring, and disclosure operate.",
  },
  {
    to: "/accountability",
    title: "Compliance & Operating Boundaries",
    description: "What the registry does, and what it does not do.",
  },
  {
    to: "/verification-disclaimer",
    title: "Verification Disclaimer",
    description: "The defined limits of any published verification status.",
  },
];

// --- Local primitives ---

const cardChrome = {
  backgroundColor: "hsl(var(--card))",
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
} as const;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-mono uppercase text-muted-foreground"
    style={{ fontSize: "10px", letterSpacing: "0.14em" }}
  >
    {children}
  </p>
);

const SectionHeader = ({
  index,
  title,
  intro,
}: {
  index: string;
  title: string;
  intro: string;
}) => (
  <div className="mb-5 lg:mb-0 lg:sticky lg:top-24">
    <div className="flex items-baseline" style={{ gap: "12px" }}>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "rgba(0,0,0,0.40)",
        }}
      >
        {index}
      </span>
      <h2
        className="font-sans text-foreground"
        style={{
          fontSize: "26px",
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "#0A0A0A",
        }}
      >
        {title}
      </h2>
    </div>
    <p
      className="mt-3 text-muted-foreground"
      style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 400, maxWidth: "68ch" }}
    >
      {intro}
    </p>
  </div>
);

const StatusCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...cardChrome, padding: "24px" }}>{children}</div>
);

const StatusField = ({
  label,
  value,
  first = false,
}: {
  label: string;
  value: string;
  first?: boolean;
}) => (
  <div
    style={
      first
        ? undefined
        : {
            borderTop: "0.5px solid hsl(var(--border))",
            paddingTop: "14px",
            marginTop: "14px",
          }
    }
  >
    <p
      className="font-mono uppercase text-muted-foreground"
      style={{ fontSize: "10px", letterSpacing: "0.14em" }}
    >
      {label}
    </p>
    <p
      className="mt-1.5 text-muted-foreground"
      style={{ fontSize: "11px", lineHeight: 1.55 }}
    >
      {value}
    </p>
  </div>
);

const StatusDefinitionCard = ({ status }: { status: Status }) => (
  <div
    style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: "18px",
      padding: "24px",
    }}
  >
    <div className="flex items-start justify-between" style={{ gap: "16px" }}>
      <h3
        className="font-sans text-foreground"
        style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}
      >
        {status.title}
      </h3>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "rgba(0,0,0,0.40)",
          whiteSpace: "nowrap",
          marginTop: "4px",
        }}
      >
        {status.n}
      </span>
    </div>
    <p
      className="text-muted-foreground"
      style={{ marginTop: "12px", fontSize: "14px", fontWeight: 400, lineHeight: 1.75 }}
    >
      {status.definition}
    </p>
    <div className="mt-5">
      <StatusField label="Public meaning" value={status.meaning} first />
      <StatusField label="Does not imply" value={status.notImply} />
      <StatusField label="Issued when" value={status.issued} />
      <StatusField label="Revised when" value={status.revised} />
    </div>
  </div>
);

const LifecycleRow = ({ index, text }: { index: string; text: string }) => (
  <div
    style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: "14px",
      padding: "16px 18px",
    }}
  >
    <div className="flex items-start justify-between" style={{ gap: "16px" }}>
      <p
        className="text-foreground"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.55 }}
      >
        {text}
      </p>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "rgba(0,0,0,0.40)",
          whiteSpace: "nowrap",
          marginTop: "1px",
        }}
      >
        {index}
      </span>
    </div>
  </div>
);

const RelatedLinkRow = ({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) => (
  <Link
    to={to}
    className="group block hover:bg-surface-muted/40 transition-colors"
    style={{ ...cardChrome, padding: "14px 16px" }}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0" style={{ paddingRight: "0px" }}>
        <h3
          className="font-sans font-semibold text-foreground group-hover:text-primary transition-colors"
          style={{ fontSize: "12px", lineHeight: 1.4 }}
        >
          {title}
        </h3>
        <p
          className="mt-1 text-muted-foreground"
          style={{ fontSize: "11px", lineHeight: 1.5 }}
        >
          {description}
        </p>
      </div>
      <span
        className="shrink-0 self-center inline-flex items-center gap-0.5 font-sans font-semibold uppercase text-primary"
        style={{ fontSize: "11px", letterSpacing: "0.08em" }}
      >
        View
        <ChevronRight style={{ width: "12px", height: "12px" }} />
      </span>
    </div>
  </Link>
);

// --- Page ---

const StatusDefinitions = () => {
  const heroDescription =
    "Public status classifications used throughout the Source Standard registry. Statuses communicate the current verification state of a vendor, facility, manufacturer, or sourcing record based on available evidence at the time of review.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Status Definitions" }]} />

      <PageMeta
        title="Status Definitions"
        description={heroDescription}
        path="/status-definitions"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Status Definitions",
          url: "https://sourcestandard.org/status-definitions",
        }}
      />

      {/* Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Registry Standards"
        title="Status Definitions"
        statement={heroDescription}
        docId=""
      />

      {/* Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §1 Purpose */}
            <section
              id="purpose"
              className="scroll-mt-24"
              style={{
                paddingTop: "36px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <StatusCard>
                <Eyebrow>Status Purpose</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Why these statuses exist
                </h2>
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    Status labels provide a standardized public language for understanding the current state of a sourcing record without requiring users to review underlying documentation.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    Each status has a defined public meaning and a defined limit. A status indicates the current documentation review state. It does not imply clinical recommendation, vendor approval, product approval, or regulatory endorsement.
                  </p>
                </div>
              </StatusCard>
            </section>

            {/* §2 Public Statuses */}
            <section
              id="statuses"
              className="scroll-mt-24 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="02"
                title="Public Statuses"
                intro="Each status has a public meaning, a limitation, and a defined path for assignment or revision."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {STATUSES.map((s) => (
                  <StatusDefinitionCard key={s.n} status={s} />
                ))}
              </div>
            </section>

            {/* §3 Lifecycle */}
            <section
              id="lifecycle"
              className="scroll-mt-24 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="03"
                title="Status Progression"
                intro="Registry records may change as new evidence becomes available, documentation is updated, sourcing relationships change, monitoring activity occurs, or review files are reopened."
              />
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-2" style={{ gap: "8px" }}>
                {LIFECYCLE.map((step) => (
                  <LifecycleRow key={step.n} index={step.n} text={step.t} />
                ))}
              </div>
            </section>

            {/* §4 Related Documents */}
            <section
              id="related"
              className="scroll-mt-24 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="04"
                title="Related Documents"
                intro="Further reading on the framework, review process, and operating boundaries."
              />
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-3" style={{ gap: "10px" }}>
                {RELATED.map((r) => (
                  <RelatedLinkRow key={r.to} to={r.to} title={r.title} description={r.description} />
                ))}
              </div>
            </section>

            {/* §5 Closing statement */}
            <section style={{ paddingTop: "24px", paddingBottom: "64px" }}>
              <StatusCard>
                <Eyebrow>Registry Interpretation Standard</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  A consistent public language for Source Standard records.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "16px" }}
                >
                  The purpose of these definitions is to establish a consistent public language for interpreting Source Standard records. A status communicates the current state of reviewed evidence within a defined scope. It should not be interpreted as a medical recommendation, product approval, or guarantee of future performance.
                </p>
              </StatusCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusDefinitions;
