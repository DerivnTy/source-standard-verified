import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "attestations", number: "01", label: "Attestations" },
  { id: "disclosure", number: "02", label: "Disclosure" },
  { id: "testing", number: "03", label: "Testing Activity" },
  { id: "triggers", number: "04", label: "Review Triggers" },
  { id: "actions", number: "05", label: "Status & Review Actions" },
  { id: "reentry", number: "06", label: "Re-entry" },
  { id: "related", number: "07", label: "Related Documents" },
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
  {
    n: "07",
    t: "Independent testing result",
    d: "An outcome from independent testing activity that warrants reassessment of a vendor, facility, manufacturer, product, or supply-chain relationship.",
  },
];

const TESTING: Clause[] = [
  {
    n: "01",
    t: "Scope of independent testing",
    d: "Source Standard may incorporate independent testing results as part of the framework, including results relating to vendors, facilities, manufacturers, products, and sourcing relationships.",
  },
  {
    n: "02",
    t: "Use of independent testing",
    d: "Independent testing results may inform the review of sourcing claims, manufacturer standing, facility standing, and public status.",
  },
];

const ACTIONS: Clause[] = [
  {
    n: "01",
    t: "Additional review",
    d: "New information, sourcing updates, public reports, or independent testing results may be reviewed to determine whether any change to the public record is warranted.",
  },
  {
    n: "02",
    t: "Request for clarification",
    d: "A written request for updated information or clarification. The listing may remain in its current status while the request is being addressed.",
  },
  {
    n: "03",
    t: "Facility review",
    d: "A more detailed review of a facility may be undertaken when public records, independent testing, or new information indicate that additional review is warranted.",
  },
  {
    n: "04",
    t: "Manufacturer review",
    d: "A more detailed review of a manufacturer may be undertaken when public records, independent testing, or new information indicate that additional review is warranted.",
  },
  {
    n: "05",
    t: "Scope adjustment",
    d: "The verified scope may be narrowed to the categories that remain supported by current records. Categories no longer supported may be removed from the public listing.",
  },
  {
    n: "06",
    t: "Suspension",
    d: "Verified status may be temporarily inactive while an unresolved matter is addressed. The vendor may remain in the registry but no longer displays active Verified status.",
  },
  {
    n: "07",
    t: "Removal",
    d: "The record may be removed from active verification status. Re-entry requires a new submission and a new review.",
  },
  {
    n: "08",
    t: "Public note",
    d: "A short factual notation may be attached to a listing when clarification is warranted and supported by verifiable, non-speculative information.",
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
    style={{ fontSize: "11px", letterSpacing: "0.12em" }}
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
          fontSize: "24px",
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
        style={{ fontSize: "14px", lineHeight: 1.3 }}
      >
        {title}
      </h3>
      <span
        className="font-mono tabular-nums text-muted-foreground/70 shrink-0 uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
      >
        {index} / {total}
      </span>
    </div>
    <p
      className="text-muted-foreground"
      style={{ fontSize: "13px", lineHeight: 1.7, marginTop: "6px" }}
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
          style={{ fontSize: "14px", lineHeight: 1.3 }}
        >
          {label}
        </h3>
        <p
          className="mt-1 text-muted-foreground"
          style={{ fontSize: "13px", lineHeight: 1.7 }}
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
    "How Source Standard records are kept current, and how public standing is maintained over time.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Compliance" }]} />

      <PageMeta title="Compliance" description={heroDescription} />

      {/* Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Governance & Oversight"
        title="Record Maintenance & Ongoing Standing"
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
                  Verified standing is maintained over time.
                </h2>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    A Verified record reflects the information supporting a listing at a defined point in time.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Standing continues while the underlying sourcing relationships, records, and public information remain consistent with the published scope.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    This page outlines what vendors are expected to disclose, the conditions under which a record may be revisited, and how public standing may change as new information becomes available.
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
                style={{ fontSize: "14px", lineHeight: 1.75, marginBottom: "16px", maxWidth: "62ch" }}
              >
                The following events are expected to be reported within a reasonable window. Timely disclosure supports the accuracy of the public record.
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

            {/* §3 Testing Activity */}
            <section
              id="testing"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="03"
                title="Independent Testing Activity"
                intro="Source Standard may conduct independent testing activity as part of the framework."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {TESTING.map((c) => (
                  <ComplianceRow
                    key={c.n}
                    index={c.n}
                    total="02"
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
                index="04"
                title="Review Triggers"
                intro="Events that may trigger monitoring activity, evidence review, status reassessment, or reopening of an existing record."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {TRIGGERS.map((c) => (
                  <ComplianceRow
                    key={c.n}
                    index={c.n}
                    total="07"
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
                index="05"
                title="Status & Review Actions"
                intro="How the framework responds when a reviewed record no longer supports the published status, or when testing activity, monitoring activity, public records, or supply-chain intelligence indicate additional review is necessary."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ACTIONS.map((c) => (
                  <ComplianceRow
                    key={c.n}
                    index={c.n}
                    total="08"
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
                <Eyebrow>06 · Re-entry</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">Re-entry</h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13px", lineHeight: 1.7, marginTop: "8px" }}
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
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    A Suspended record may return to Verified status once the underlying matter is resolved and supported by documentation in the review file.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    A Removed record may return only through a new submission, new review cycle, and reassessment under the then-current framework.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
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
                index="07"
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
                  style={{ fontSize: "14px", lineHeight: 1.75, marginTop: "16px" }}
                >
                  The purpose of this protocol is to preserve the integrity and reliability of Source Standard records after publication. Verification integrity depends on monitoring activity, supply-chain transparency, testing activity, facility monitoring, manufacturer oversight, and documentation support — not documentation alone. Verification remains meaningful only when these inputs continue to reconcile with the published scope as new information becomes available.
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
