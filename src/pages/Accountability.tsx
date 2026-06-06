import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "attestations", number: "01", label: "Attestations" },
  { id: "disclosure", number: "02", label: "Disclosure" },
  { id: "triggers", number: "03", label: "Review Triggers" },
  { id: "actions", number: "04", label: "Status & Review Actions" },
  { id: "reentry", number: "05", label: "Re-entry" },
  { id: "related", number: "06", label: "Related Documents" },
];

type Clause = { n: string; t: string; d: string };

const ATTESTATIONS: Clause[] = [
  {
    n: "01",
    t: "Submission accuracy",
    d: "Records, claims, and category descriptions submitted at intake are expected to remain accurate throughout the review term. Material inaccuracies discovered after publication may trigger additional review.",
  },
  {
    n: "02",
    t: "Sourcing transparency",
    d: "Pharmacy relationships, manufacturer relationships, upstream facilities, and sourcing records tied to reviewed categories are expected to remain documented, supportable, and consistent with the published record.",
  },
  {
    n: "03",
    t: "Renewal and review cooperation",
    d: "The vendor is expected to respond to renewal requests, clarification requests, and review notices within the published response windows and provide updated records when requested.",
  },
  {
    n: "04",
    t: "Public-claims alignment",
    d: "Public-facing representations, including websites, advertising, intake materials, and third-party listings, are expected to remain consistent with the records reviewed during the verification term.",
  },
];

const DISCLOSURE: Clause[] = [
  {
    n: "01",
    t: "Change in pharmacy, manufacturer, or upstream sourcing relationship",
    d: "Any substitution, addition, or termination of a disclosed pharmacy, outsourcing facility, or upstream source tied to a reviewed category.",
  },
  {
    n: "02",
    t: "Change in licensure status",
    d: "Any suspension, lapse, voluntary surrender, or jurisdictional change affecting the vendor or a disclosed upstream facility.",
  },
  {
    n: "03",
    t: "Change in ownership or operating control",
    d: "Any material change in ownership, controlling interest, operating entity, or registered legal identity.",
  },
  {
    n: "04",
    t: "Change in reviewed category scope",
    d: "Any addition, removal, or material change affecting the categories represented in the verified record.",
  },
  {
    n: "05",
    t: "Change in public-facing claims",
    d: "Any material change to public claims regarding sourcing, credentials, accreditation, or verified scope.",
  },
  {
    n: "06",
    t: "Regulatory or public-record action",
    d: "Any public notice, enforcement action, license change, warning letter, or administrative update affecting the vendor or a disclosed upstream facility.",
  },
];

const TRIGGERS: Clause[] = [
  {
    n: "01",
    t: "Consumer and clinician reports",
    d: "Submissions received through the public reporting channel and screened as in scope under the reporting protocol.",
  },
  {
    n: "02",
    t: "Upstream record change",
    d: "Status change, monitoring event, testing event, registration lapse, licensure issue, sourcing change, or public-record update affecting a disclosed upstream facility or manufacturer.",
  },
  {
    n: "03",
    t: "Regulatory or public-record action",
    d: "Public action, warning letter, licensure update, or administrative change involving the vendor or a disclosed upstream source.",
  },
  {
    n: "04",
    t: "Claims divergence",
    d: "A material difference between public-facing claims and the records currently on file.",
  },
  {
    n: "05",
    t: "Non-response",
    d: "Failure to respond to a renewal notice, clarification request, or disclosure acknowledgment within the published response window.",
  },
  {
    n: "06",
    t: "Credential lapse",
    d: "Lapse of any required licensure, registration, or accreditation held by the vendor or a disclosed upstream source.",
  },
];

const ACTIONS: Clause[] = [
  {
    n: "01",
    t: "Monitoring Review",
    d: "New information, sourcing updates, public reports, testing activity, or evidence submissions may be reviewed to determine whether additional action is necessary.",
  },
  {
    n: "02",
    t: "Administrative inquiry",
    d: "A written request for documentation, records, or explanation. The listing may remain in its current status during the response window unless additional action is required.",
  },
  {
    n: "03",
    t: "Scope reduction",
    d: "The verified scope may be narrowed to the categories that remain supported by current records. Unsupported categories may be removed from the public listing.",
  },
  {
    n: "04",
    t: "Suspension",
    d: "Verified status may be temporarily inactive pending additional documentation or review of an unresolved record issue. The vendor may remain in the registry but no longer displays active Verified status.",
  },
  {
    n: "05",
    t: "Removal",
    d: "The record may be removed from active verification status. Re-entry requires a new submission and a new review process.",
  },
  {
    n: "06",
    t: "Public note",
    d: "A short factual notation may be attached to a listing when clarification is warranted and the supporting record is verifiable and non-speculative.",
  },
];

const RELATED = [
  {
    to: "/how-it-works",
    label: "Verification Protocol",
    description: "How documentation review, monitoring, and disclosure operate.",
  },
  {
    to: "/status-definitions",
    label: "Status Definitions",
    description: "Public statuses assigned to records within the registry.",
  },
  {
    to: "/report-a-concern",
    label: "Reporting & Registry Review",
    description: "How public reports are received, screened, and acted on.",
  },
  {
    to: "/governance",
    label: "Compliance & Operating Boundaries",
    description: "What the registry does, and what it does not do.",
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
  <div className="mb-5">
    <div className="flex items-baseline" style={{ gap: "12px" }}>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "14px",
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
          fontSize: "28px",
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
      style={{ fontSize: "17px", lineHeight: 1.7, fontWeight: 400, maxWidth: "68ch" }}
    >
      {intro}
    </p>
  </div>
);

const ComplianceCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...cardChrome, padding: "24px" }}>{children}</div>
);

const ComplianceRow = ({
  index,
  total,
  title,
  description,
}: {
  index: string;
  total: string;
  title: string;
  description: string;
}) => (
  <div style={{ ...cardChrome, padding: "14px 16px" }}>
    <div className="flex items-baseline justify-between gap-4">
      <h3
        className="font-sans font-semibold text-foreground min-w-0"
        style={{ fontSize: "14px", lineHeight: 1.4 }}
      >
        {title}
      </h3>
      <span
        className="font-mono tabular-nums text-muted-foreground/70 shrink-0 uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.06em" }}
      >
        {index} / {total}
      </span>
    </div>
    <p
      className="text-muted-foreground"
      style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "6px" }}
    >
      {description}
    </p>
  </div>
);

const RelatedLinkRow = ({
  to,
  label,
  description,
}: {
  to: string;
  label: string;
  description: string;
}) => (
  <Link
    to={to}
    className="group block hover:bg-surface-muted/40 transition-colors"
    style={{ ...cardChrome, padding: "14px 16px" }}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3
          className="font-sans font-semibold text-foreground group-hover:text-primary transition-colors"
          style={{ fontSize: "14px", lineHeight: 1.4 }}
        >
          {label}
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

const Accountability = () => {
  const heroDescription =
    "Ongoing monitoring, disclosure requirements, review triggers, and status actions used to maintain the integrity of Source Standard records after publication.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Compliance" }]} />

      <PageMeta title="Compliance" description={heroDescription} />

      {/* Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Governance & Oversight"
        title="Compliance Monitoring & Record Maintenance"
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
              className="scroll-mt-24"
              style={{
                paddingTop: "36px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <ComplianceCard>
                <Eyebrow>Record Maintenance</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  How compliance is maintained after verification
                </h2>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    A Verified record is not permanent.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    It remains in effect only while the available evidence, sourcing relationships, submitted documentation, public records, and ongoing monitoring activity continue to support the published review scope.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    This page defines the continuing expectations attached to Verified status, the events vendors are expected to disclose, the conditions that may reopen review, and the status actions Source Standard may apply when a record no longer supports the listing.
                  </p>
                </div>
              </ComplianceCard>
            </section>

            {/* §2 Attestations */}
            <section
              id="attestations"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="01"
                title="Attestations"
                intro="The continuing representations accepted when Verified status is issued."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ATTESTATIONS.map((c) => (
                  <ComplianceRow
                    key={c.n}
                    index={c.n}
                    total="04"
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §3 Disclosure */}
            <section
              id="disclosure"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="02"
                title="Disclosure"
                intro="Events vendors are expected to report when they materially affect the published record."
              />
              <p
                className="text-muted-foreground"
                style={{ fontSize: "13.5px", lineHeight: 1.55, marginBottom: "16px", maxWidth: "62ch" }}
              >
                The following events are expected to be reported within the stated response window. Failure to report a material change may itself trigger review or status revision.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {DISCLOSURE.map((c) => (
                  <ComplianceRow
                    key={c.n}
                    index={c.n}
                    total="06"
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §4 Triggers */}
            <section
              id="triggers"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="03"
                title="Review Triggers"
                intro="Events that may trigger monitoring activity, evidence review, status reassessment, or reopening of an existing record."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {TRIGGERS.map((c) => (
                  <ComplianceRow
                    key={c.n}
                    index={c.n}
                    total="06"
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §5 Actions */}
            <section
              id="actions"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="04"
                title="Status & Review Actions"
                intro="How the framework responds when a reviewed record no longer supports the published status."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ACTIONS.map((c) => (
                  <ComplianceRow
                    key={c.n}
                    index={c.n}
                    total="06"
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §6 Re-entry */}
            <section
              id="reentry"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <ComplianceCard>
                <Eyebrow>05 · Re-entry</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">Re-entry</h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "8px" }}
                >
                  How a listing may return after suspension or removal.
                </p>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    A Suspended record may return to Verified status once the underlying matter is resolved and supported by documentation in the review file.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    A Removed record may return only through a new submission, new review cycle, and reassessment under the then-current framework.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Prior status history, including the original determination, triggering events, and disposition, may remain part of the record and may be referenced in future review.
                  </p>
                </div>
              </ComplianceCard>
            </section>

            {/* §7 Related Documents */}
            <section
              id="related"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="06"
                title="Related Documents"
                intro="Further reading on the framework, public statuses, and reporting logic."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {RELATED.map((r) => (
                  <RelatedLinkRow
                    key={r.to}
                    to={r.to}
                    label={r.label}
                    description={r.description}
                  />
                ))}
              </div>
            </section>

            {/* §8 Closing */}
            <section style={{ paddingTop: "24px", paddingBottom: "64px" }}>
              <ComplianceCard>
                <Eyebrow>Ongoing Record Integrity</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Verification requires continuing record support.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "16px" }}
                >
                  The purpose of this protocol is to preserve the integrity and reliability of Source Standard records after publication. Verification remains meaningful only when evidence continues to support the published scope, sourcing relationships remain transparent, material changes are disclosed, and monitoring activities are able to reconcile new information as it becomes available.
                </p>
              </ComplianceCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accountability;
