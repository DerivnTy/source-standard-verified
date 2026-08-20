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
    title: "Source Standard Verified",
    meaning: "The clinic has voluntarily completed Source Standard's verification process, and Source Standard has reviewed evidence supporting defined sourcing claims within a stated scope.",
    notImply: "It does not imply product approval, treatment recommendation, guaranteed safety, future performance, or regulatory endorsement. Payment covers the evaluation process, never a favorable outcome.",
    issued: "Issued when review under the framework is successfully completed.",
    revised: "Revised when new information, material changes, or updated records indicate the record no longer supports the published scope.",
  },
  {
    title: "Not Source Standard Verified",
    meaning: "The clinic has not completed Source Standard's independent sourcing verification process. Verification is voluntary, and most clinics in the directory have never applied.",
    notImply: "This status does not indicate that Source Standard has evaluated or reached a conclusion regarding the clinic's sourcing, product quality, or safety. It is not a failed verification and is not an adverse finding of any kind.",
    issued: "Applied to every directory record that has not completed verification.",
    revised: "Changes only if the clinic enters the verification process.",
  },
  {
    title: "Under Review",
    meaning: "The clinic has applied and its submission is currently under review.",
    notImply: "It does not imply any conclusion, positive or adverse, about the clinic.",
    issued: "Issued when an active review has opened for a participating clinic.",
    revised: "Resolved to Source Standard Verified, Suspended, or withdrawn at the conclusion of review.",
  },
  {
    title: "Active",
    meaning: "A completed verification is current and in good standing within the reviewed scope.",
    notImply: "It does not imply product approval, guaranteed safety, or regulatory endorsement.",
    issued: "Issued while a completed verification remains within its validity period.",
    revised: "Moves to Expired at lapse, or Suspended if a matter requires clarification.",
  },
  {
    title: "Suspended",
    meaning: "A previously issued verification has been temporarily withdrawn while a specific matter is clarified.",
    notImply: "It does not constitute a final adverse finding, regulatory action, or product-quality determination.",
    issued: "Issued when new information warrants pausing a published status pending further review.",
    revised: "Revised when the underlying matter is resolved.",
  },
  {
    title: "Expired",
    meaning: "A previously issued verification has lapsed and has not been renewed.",
    notImply: "Lapse alone does not indicate any change in the clinic's sourcing, product quality, or safety.",
    issued: "Issued when a verification period ends without a completed renewal review.",
    revised: "Returns to Under Review when the clinic submits for renewal.",
  },
  {
    title: "Removed",
    meaning: "The record has been withdrawn from active verification within the Source Standard framework.",
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
