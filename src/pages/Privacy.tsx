import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "partitioning", number: "01", label: "Classification" },
  { id: "collection", number: "02", label: "Sources" },
  { id: "retention", number: "03", label: "Retention" },
  { id: "processing", number: "04", label: "Use" },
  { id: "inquiries", number: "05", label: "Requests" },
];

type Clause = { n: string; t: string; d: string };

const PARTITIONING: Clause[] = [
  {
    n: "01",
    t: "Public registry data",
    d: "Public registry records may include vendor identity, facility relationships, status classifications, review scope, status history, and other information published to support transparency and public understanding.",
  },
  {
    n: "02",
    t: "Protected review materials",
    d: "Protected review materials may include invoices, sourcing records, facility documentation, certificates of analysis, licensing materials, submitted evidence, internal review materials, concern reports, and other records used to support verification activities.",
  },
  {
    n: "03",
    t: "Access restriction",
    d: "Protected review materials are maintained within restricted environments and are accessible only to authorized personnel and approved infrastructure partners operating under confidentiality and access-control requirements.",
  },
];

const COLLECTION: Clause[] = [
  {
    n: "01",
    t: "Vendor intake",
    d: "Business credentials, operating details, sourcing records, facility relationship documentation, and related materials submitted for verification or review.",
  },
  {
    n: "02",
    t: "Monitoring data",
    d: "Where applicable, records associated with public-record monitoring, status review, documentation updates, and related registry maintenance activity.",
  },
  {
    n: "03",
    t: "Concern reports",
    d: "Supporting documentation and contact details submitted through the public reporting channel.",
  },
  {
    n: "04",
    t: "Verification activity",
    d: "Records generated through documentation review, evidence assessment, status review, monitoring activity, and registry maintenance processes.",
  },
  {
    n: "05",
    t: "Site analytics",
    d: "Site usage may be monitored through aggregate, non-identifying signals. Source Standard does not rely on advertising trackers or cross-site identification systems.",
  },
];

const RETENTION: Clause[] = [
  {
    n: "01",
    t: "Active records",
    d: "Protected review materials may be retained for the duration of an entity's active status in the registry and for the period reasonably necessary to administer review, renewal, record maintenance, and related compliance processes.",
  },
  {
    n: "02",
    t: "Status history",
    d: "Public status transitions and related public record history may be retained to preserve the integrity and continuity of the registry timeline.",
  },
  {
    n: "03",
    t: "Withdrawn or closed submissions",
    d: "Documentation associated with withdrawn, denied, closed, or incomplete submissions may be held for a limited administrative period before secure disposal.",
  },
  {
    n: "04",
    t: "Secure disposal",
    d: "Sensitive records scheduled for deletion are disposed of through documented internal procedures designed to reduce the risk of unauthorized recovery.",
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
      style={{ fontSize: "18px", lineHeight: 1.6, fontWeight: 400, maxWidth: "68ch" }}
    >
      {intro}
    </p>
  </div>
);

const PrivacyCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...cardChrome, padding: "24px" }}>{children}</div>
);

const PrivacyRow = ({
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

const ContactLine = ({
  label,
  email,
}: {
  label: string;
  email: string;
}) => (
  <div
    style={{ ...cardChrome, padding: "12px 14px", marginTop: "16px" }}
    className="flex items-center justify-between gap-4 flex-wrap"
  >
    <span
      className="font-mono uppercase text-muted-foreground"
      style={{ fontSize: "10px", letterSpacing: "0.14em" }}
    >
      {label}
    </span>
    <a
      href={`mailto:${email}`}
      className="font-sans font-semibold text-primary hover:underline"
      style={{ fontSize: "13px" }}
    >
      {email}
    </a>
  </div>
);

// --- Page ---

const Privacy = () => {
  const heroDescription =
    "The governance framework governing how Source Standard collects, stores, protects, and administers registry records, review materials, and verification-related information.";

  return (
    <>
      <Breadcrumb items={[{ label: "Legal" }, { label: "Privacy" }]} />

      <PageMeta title="Privacy" description={heroDescription} />

      {/* Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Data Governance Protocol"
        title="Data Governance & Privacy"
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
              <PrivacyCard>
                <Eyebrow>Data Governance</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  How data is handled under the framework
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
                    Source Standard maintains two distinct information environments: public-reference records that support transparency and protected review materials that support verification. This framework defines how those records are collected, maintained, protected, and administered throughout the verification lifecycle.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    This page explains what is collected, how records are separated, how long materials may be retained, and the limits under which data may be processed.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    The goal of this protocol is to preserve the integrity of the public record while limiting access to sensitive review materials that are not published as part of the registry.
                  </p>
                </div>
              </PrivacyCard>
            </section>

            {/* §2 Information Classification */}
            <section
              id="partitioning"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="01"
                title="Information Classification"
                intro="How public registry information is separated from protected review materials."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PARTITIONING.map((c) => (
                  <PrivacyRow key={c.n} index={c.n} total="03" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §3 Information Sources */}
            <section
              id="collection"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="02"
                title="Information Sources"
                intro="What categories of data may be collected under the framework."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {COLLECTION.map((c) => (
                  <PrivacyRow key={c.n} index={c.n} total="05" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §4 Data Retention */}
            <section
              id="retention"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="03"
                title="Data Retention"
                intro="How long records are maintained under different conditions."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {RETENTION.map((c) => (
                  <PrivacyRow key={c.n} index={c.n} total="04" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §5 Authorized Use */}
            <section
              id="processing"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <PrivacyCard>
                <Eyebrow>04 · Authorized Use</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">Authorized Use</h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "8px" }}
                >
                  How data may be used in support of the framework.
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
                    Information maintained by Source Standard is used solely to support verification activities, registry administration, monitoring processes, public-reference records, operational infrastructure, and related governance functions. Access is limited to authorized personnel and approved service providers operating under confidentiality obligations.
                  </p>
                </div>
              </PrivacyCard>
            </section>

            {/* §6 Privacy Requests */}
            <section
              id="inquiries"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <PrivacyCard>
                <Eyebrow>05 · Requests</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">Privacy Requests</h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "8px" }}
                >
                  How privacy-related requests may be made.
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
                    Individuals may request access to or correction of personal data held by Source Standard where applicable under law and within the limits of the framework's record-retention obligations.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Deletion requests are reviewed in light of the organization's need to preserve legitimate administrative, legal, and historical recordkeeping obligations.
                  </p>
                </div>
                <ContactLine label="Data Privacy Officer" email="privacy@sourcestandard.org" />
              </PrivacyCard>
            </section>

            {/* §7 Closing */}
            <section style={{ paddingTop: "24px", paddingBottom: "64px" }}>
              <PrivacyCard>
                <Eyebrow>Information Integrity</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Public transparency requires disciplined stewardship.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "16px" }}
                >
                  The purpose of this framework is to balance transparency with responsible stewardship of sensitive information. Public records exist to improve visibility into sourcing relationships and verification status. Protected review materials exist to support evidence-based review while preserving privacy, security, and verification integrity.
                </p>
              </PrivacyCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
