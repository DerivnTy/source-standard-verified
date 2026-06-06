import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "purpose", number: "01", label: "Purpose" },
  { id: "statuses", number: "02", label: "Statuses" },
  { id: "lifecycle", number: "03", label: "Status Progression" },
  { id: "related", number: "04", label: "Related Documents" },
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

const STATUSES: Status[] = [
  {
    n: "01",
    title: "Verified",
    definition:
      "Documentation review is complete for the defined scope. The published record reflects the documentation, public records, and pharmacy, manufacturer, or sourcing relationship evidence reviewed at the time of publication.",
    meaning:
      "Available documentation, sourcing evidence, facility relationships, public records, and supporting materials were sufficient to support the reviewed sourcing representations within the defined review scope.",
    notImply:
      "It does not imply vendor approval, product approval, clinical recommendation, treatment effectiveness, product safety, or outcome guarantee.",
    issued:
      "Assigned after completion of documentation review, pharmacy, manufacturer, or sourcing relationship review, chain-of-custody review, and scope confirmation.",
    revised:
      "Revised after renewal lapse, material disclosure event, documentation expiration, unresolved discrepancy, or reopening of the review file.",
  },
  {
    n: "02",
    title: "Pending Review",
    definition:
      "An application or review request has been received, but documentation review has not yet begun.",
    meaning: "The entity has entered the Source Standard review pipeline.",
    notImply:
      "It does not imply that documentation has been reviewed or that any sourcing claim has been supported.",
    issued: "Assigned when an application, request, or submission package is received and acknowledged.",
    revised: "Revised when documentation review begins, the request is withdrawn, or the submission is closed.",
  },
  {
    n: "03",
    title: "Under Review",
    definition:
      "An active documentation review is in progress. Records, public data, sourcing claims, and submitted materials are being evaluated against the Source Standard framework.",
    meaning: "The review file is open and being evaluated.",
    notImply:
      "It does not imply any conclusion about the vendor, sourcing claim, documentation quality, or compliance posture.",
    issued: "Assigned at the start of documentation review or when a previously published record is reopened.",
    revised: "Revised to Verified, Unverified, Suspended, or Removed when the current review cycle concludes.",
  },
  {
    n: "04",
    title: "Unverified",
    definition:
      "Available information was insufficient to support the reviewed sourcing representations within the defined review scope.",
    meaning:
      "The registry does not currently contain sufficient reviewed documentation to support the vendor's stated sourcing claim.",
    notImply:
      "It does not imply that the vendor is unsafe, unlawful, fraudulent, or clinically inappropriate.",
    issued: "Assigned when a vendor record exists but no sufficient documentation review is on file.",
    revised: "Revised when the vendor enters review, submits documentation, withdraws, or a status update is required.",
  },
  {
    n: "05",
    title: "Suspended",
    definition:
      "A previously published status is temporarily inactive pending additional documentation, renewal, or review of an unresolved record issue.",
    meaning: "The record cannot currently support continuation of the prior published status.",
    notImply:
      "It does not constitute a finding of misconduct, fraud, medical risk, or regulatory enforcement action.",
    issued:
      "Assigned after missed renewal, non-response to documentation requests, expired documentation, or unresolved material discrepancy.",
    revised:
      "Revised back to Verified if resolved, to Unverified if documentation no longer supports verification, or to Removed if the record is closed.",
  },
  {
    n: "06",
    title: "Removed",
    definition:
      "The record has been removed from active registry display or active verification status due to failed review, expired documentation, unresolved discrepancy, voluntary withdrawal, or closure of the review file.",
    meaning:
      "The entity is no longer maintained as an active verified or reviewable record under the Source Standard framework.",
    notImply:
      "It does not imply a specific finding of misconduct unless a public note states a documented record basis.",
    issued:
      "Assigned when the review file is closed, the entity withdraws, documentation cannot be reconciled, renewal remains unresolved, or a material discrepancy is not resolved.",
    revised: "Reinstatement requires a new submission and a new review cycle.",
  },
  {
    n: "07",
    title: "Upstream Reference Record",
    definition:
      "An upstream 503A pharmacy, 503B outsourcing facility, or other facility record used as a reference point during vendor sourcing review.",
    meaning:
      "The upstream record may be used as a reference point when reviewing vendor sourcing documentation.",
    notImply:
      "It does not imply endorsement, affiliation, vendor verification, product approval, product safety, or certification of every product associated with that facility.",
    issued:
      "Assigned when facility identity, public registration category, license status, or review relevance is recorded within the Upstream Registry.",
    revised:
      "Revised when public registration status, license status, review relevance, or Source Standard classification changes.",
  },
];

const LIFECYCLE = [
  { n: "01", t: "Application received → Pending Review" },
  { n: "02", t: "Documentation review begins → Under Review" },
  { n: "03", t: "Review concludes → Verified or Unverified" },
  { n: "04", t: "Renewal interval reached → Under Review" },
  { n: "05", t: "Disclosure event or material change → Under Review or Suspended" },
  { n: "06", t: "Resolution → Verified, Unverified, Suspended, or Removed" },
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
    <p className="font-mono tabular-nums text-muted-foreground/60" style={{ fontSize: "11px" }}>
      {index}
    </p>
    <h2 className="t-section-title-sm text-foreground mt-1">{title}</h2>
    <p
      className="mt-2 text-muted-foreground"
      style={{ fontSize: "13px", lineHeight: 1.55, maxWidth: "62ch" }}
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
      style={{ fontSize: "13px", lineHeight: 1.55 }}
    >
      {value}
    </p>
  </div>
);

const StatusDefinitionCard = ({ status }: { status: Status }) => (
  <div style={{ ...cardChrome, padding: "24px" }}>
    <div className="flex items-baseline gap-3">
      <span
        className="font-mono tabular-nums text-muted-foreground/60"
        style={{ fontSize: "12px" }}
      >
        {status.n}
      </span>
      <h3
        className="font-sans font-semibold text-foreground"
        style={{ fontSize: "22px", lineHeight: 1.2 }}
      >
        {status.title}
      </h3>
    </div>
    <p
      className="mt-3 text-foreground"
      style={{ fontSize: "14px", lineHeight: 1.55 }}
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
  <div style={{ ...cardChrome, padding: "12px 14px" }}>
    <div className="flex items-baseline gap-3">
      <span
        className="font-mono tabular-nums text-muted-foreground/60 shrink-0"
        style={{ fontSize: "11px" }}
      >
        {index}
      </span>
      <p className="text-foreground" style={{ fontSize: "13px", lineHeight: 1.5 }}>
        {text}
      </p>
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
          style={{ fontSize: "14px", lineHeight: 1.4 }}
        >
          {title}
        </h3>
        <p
          className="mt-1 text-muted-foreground"
          style={{ fontSize: "13px", lineHeight: 1.5 }}
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
