import { Link } from "react-router-dom";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { PageMeta } from "@/components/PageMeta";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";

type Status = {
  title: string;
  meaning: string;
  notImply: string;
  issued: string;
  revised: string;
};

const VENDOR_STATUSES: Status[] = [
  {
    title: "Verified",
    meaning: "The vendor's sourcing representations were supported by the information reviewed within a defined scope at the time of review.",
    notImply: "It does not imply product approval, treatment recommendation, guaranteed safety, future performance, or regulatory endorsement.",
    issued: "Issued when review under the framework is successfully completed.",
    revised: "Revised when new information, material changes, or updated records indicate the current record no longer supports the published scope.",
  },
  {
    title: "Under Review",
    meaning: "A Source Standard review of the vendor's record is currently in progress.",
    notImply: "It does not imply any conclusion, positive or adverse, about the vendor.",
    issued: "Issued when an active review has opened for the vendor's record.",
    revised: "Resolved to Verified, Unverified, Suspended, or Removed at the conclusion of review.",
  },
  {
    title: "Unverified",
    meaning: "No Source Standard verification is currently published for the vendor. The registry does not contain sufficient reviewed information to support the vendor's sourcing representations.",
    notImply: "It does not by itself imply that the vendor is unsafe, noncompliant, illegitimate, or the subject of any finding. Many vendors have simply not entered the review process.",
    issued: "Issued when a vendor record exists without sufficient completed review under the framework.",
    revised: "Revised when additional review or new information becomes available.",
  },
  {
    title: "Suspended",
    meaning: "A previously published verification has been temporarily withdrawn while a specific matter is clarified.",
    notImply: "It does not constitute a final adverse finding, regulatory action, or product-quality determination.",
    issued: "Issued when new information warrants pausing the current published status pending further review.",
    revised: "Revised when the underlying matter is resolved, returning the record to Verified, Unverified, or Removed as appropriate.",
  },
  {
    title: "Removed",
    meaning: "The vendor record has been withdrawn from active verification within the Source Standard framework.",
    notImply: "It does not constitute a regulatory finding or adjudication of wrongdoing.",
    issued: "Issued when a record is withdrawn from active verification.",
    revised: "Re-entry into an active verification status requires a new submission and review.",
  },
];

const FACILITY_STATUSES: Status[] = [
  {
    title: "Monitoring",
    meaning: "The facility is included in the Source Standard database and is currently being followed against public records and supporting information.",
    notImply: "It does not imply a negative finding, product quality issue, enforcement action, or regulatory concern.",
    issued: "Issued when a facility is added to the Source Standard database.",
    revised: "Revised as public records and supporting information accumulate.",
  },
  {
    title: "Greenlisted",
    meaning: "Available facility records and supporting information currently support Greenlisted status under the Source Standard framework.",
    notImply: "It does not imply guaranteed quality, product approval, future performance, or regulatory endorsement.",
    issued: "Issued when facility records and supporting information support Greenlisted status.",
    revised: "Revised when public records or supporting information no longer support the status.",
  },
  {
    title: "Status Alert",
    meaning: "Public records or other information indicate that additional review is warranted before the current status can be confirmed.",
    notImply: "It does not imply a final determination, regulatory finding, or confirmed product defect.",
    issued: "Issued when public records or other information indicate that additional review is warranted.",
    revised: "Revised when subsequent review or new information resolves the underlying matter.",
  },
];

const PROGRESSION_INPUTS = [
  "New documentation",
  "Independent testing results",
  "Facility information",
  "Manufacturer information",
  "Public-record updates",
  "Sourcing information",
];

const RELATED = [
  { to: "/how-it-works", label: "Verification Protocol" },
  { to: "/accountability", label: "Compliance & Operating Boundaries" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
];

const StatusRow = ({ status }: { status: Status }) => (
  <div style={{ padding: "18px 0", borderTop: "0.5px solid hsl(var(--border) / 0.6)" }}>
    <h3
      className="font-sans text-foreground"
      style={{ fontSize: "17px", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}
    >
      {status.title}
    </h3>
    <p className="text-foreground" style={{ fontSize: "14.5px", lineHeight: 1.6, marginTop: "8px" }}>
      {status.meaning}
    </p>
    <dl className="mt-3" style={{ display: "grid", gap: "8px" }}>
      {[
        { k: "Does not imply", v: status.notImply },
        { k: "Issued", v: status.issued },
        { k: "Revised", v: status.revised },
      ].map((row) => (
        <div key={row.k} className="grid grid-cols-[110px_1fr] gap-3">
          <dt
            className="font-mono uppercase text-muted-foreground"
            style={{ fontSize: "10px", letterSpacing: "0.12em", paddingTop: "2px" }}
          >
            {row.k}
          </dt>
          <dd className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6, margin: 0 }}>
            {row.v}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

const StatusDefinitions = () => {
  const lead =
    "Public status classifications used throughout the Source Standard registry. Statuses communicate the current standing of a vendor, facility, manufacturer, or sourcing record based on available information at the time of review.";

  return (
    <>
      <PageMeta
        title="What Does Each Verification Status Mean?"
        description={lead}
        path="/status-definitions"
      />

      <ArticleHeader
        category="Registry Standards"
        title="What Does Each Status Mean?"
        lead={lead}
        backHref="/about"
        backLabel="Back to About"
      />

      <ArticleSection variant="prose">
        <p>
          Status labels provide a standardized public language for understanding the current state of a sourcing record without requiring users to review underlying documentation.
        </p>
        <p>
          Each status has a defined public meaning and a defined limit. A status indicates the current documentation review state. It does not imply clinical recommendation, vendor approval, product approval, or regulatory endorsement.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="Vendor statuses">
        <p>
          Public statuses applied to vendors within the Source Standard registry. Each status has a public meaning, a limitation, and a defined path for assignment or revision.
        </p>
        <div
          className="mt-4"
          style={{
            borderTop: "0.5px solid hsl(var(--border))",
            borderBottom: "0.5px solid hsl(var(--border))",
          }}
        >
          {VENDOR_STATUSES.map((s) => (
            <StatusRow key={s.title} status={s} />
          ))}
        </div>
      </ArticleSection>

      <ArticleSection variant="prose" title="Facility statuses">
        <p>
          Public statuses applied to facilities monitored within the framework, including 503A pharmacies, 503B outsourcing facilities, and related manufacturing operations.
        </p>
        <div
          className="mt-4"
          style={{
            borderTop: "0.5px solid hsl(var(--border))",
            borderBottom: "0.5px solid hsl(var(--border))",
          }}
        >
          {FACILITY_STATUSES.map((s) => (
            <StatusRow key={s.title} status={s} />
          ))}
        </div>
      </ArticleSection>

      <ArticleSection variant="prose" title="Status progression">
        <p>
          Statuses are dynamic. They represent the current state of available evidence and may evolve as new information becomes available through any of the following inputs.
        </p>
        <ul
          className="mt-3 grid gap-1"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {PROGRESSION_INPUTS.map((t) => (
            <li
              key={t}
              className="text-foreground"
              style={{ fontSize: "15px", lineHeight: 1.55, paddingLeft: "14px", position: "relative" }}
            >
              <span aria-hidden style={{ position: "absolute", left: 0, color: "hsl(var(--muted-foreground))" }}>·</span>
              {t}
            </li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection variant="callout" kind="Continue reading" title="Related documents">
        <ul className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {RELATED.map((r, i) => (
            <li
              key={r.to}
              className={i > 0 ? "border-t border-border/40 mt-1 pt-1" : ""}
            >
              <Link
                to={r.to}
                className="group flex items-center justify-between gap-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                <span style={{ fontSize: "14.5px", fontWeight: 500 }}>{r.label}</span>
                <span aria-hidden className="font-mono text-muted-foreground/60 group-hover:text-foreground transition-colors" style={{ fontSize: "14px" }}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </ArticleSection>

      <EditorialBackLink to="/about" label="Back to About" />
    </>
  );
};

export default StatusDefinitions;
