import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "partitioning", number: "01", label: "Partitioning" },
  { id: "collection", number: "02", label: "Collection" },
  { id: "retention", number: "03", label: "Retention" },
  { id: "processing", number: "04", label: "Processing" },
  { id: "inquiries", number: "05", label: "Inquiries" },
];

type Clause = { n: string; t: string; d: string };

const PARTITIONING: Clause[] = [
  {
    n: "01",
    t: "Public registry data",
    d: "Public registry data is limited to business identity, vendor type, therapy category, review scope, current status, status dates, and related public-reference fields published for consumer and clinician use.",
  },
  {
    n: "02",
    t: "Protected review materials",
    d: "Protected review materials may include licensing records, supplier invoices, certificates of analysis, submitted documentation, internal review notes, concern reports, and related supporting materials retained in the review file.",
  },
  {
    n: "03",
    t: "Access restriction",
    d: "Protected review materials are retained within a restricted internal environment and are not published, sold, or shared with third parties except where required by law or necessary for authorized infrastructure operations.",
  },
];

const COLLECTION: Clause[] = [
  {
    n: "01",
    t: "Vendor intake",
    d: "Business credentials, operating details, sourcing records, pharmacy relationship documentation, and related materials submitted for verification or review.",
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
    <p className="font-mono tabular-nums text-muted-foreground/60" style={{ fontSize: "11px" }}>
      {index}
    </p>
    <h2 className="t-section-title-sm text-foreground mt-1">{title}</h2>
    <p
      className="mt-2 text-muted-foreground"
      style={{ fontSize: "13.5px", lineHeight: 1.55, maxWidth: "62ch" }}
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
    "The administrative framework governing the collection, separation, retention, and processing of public registry data and protected review materials.";

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
                paddingTop: "40px",
                paddingBottom: "40px",
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
                    Source Standard maintains a distinction between public registry information and protected review materials.
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

            {/* §2 Record Partitioning */}
            <section
              id="partitioning"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="01"
                title="Record Partitioning"
                intro="How public registry information is separated from protected review materials."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PARTITIONING.map((c) => (
                  <PrivacyRow key={c.n} index={c.n} total="03" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §3 Scope of Collection */}
            <section
              id="collection"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="02"
                title="Scope of Collection"
                intro="What categories of data may be collected under the framework."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {COLLECTION.map((c) => (
                  <PrivacyRow key={c.n} index={c.n} total="04" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §4 Data Retention */}
            <section
              id="retention"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
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

            {/* §5 Authorized Processing */}
            <section
              id="processing"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <PrivacyCard>
                <Eyebrow>04 · Authorized Processing</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">Authorized Processing</h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "8px" }}
                >
                  How data may be processed in support of the framework.
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
                    Data processing is limited to essential internal functions and authorized infrastructure partners operating under confidentiality and access restrictions.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Any such partner is limited to the minimum data reasonably necessary for hosting, transactional communications, secure storage, registry operations, and privacy-respecting analytics.
                  </p>
                </div>
              </PrivacyCard>
            </section>

            {/* §6 Inquiries & Requests */}
            <section
              id="inquiries"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <PrivacyCard>
                <Eyebrow>05 · Inquiries</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">Inquiries & Requests</h2>
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
            <section style={{ paddingTop: "40px", paddingBottom: "64px" }}>
              <PrivacyCard>
                <Eyebrow>Record Handling</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Public transparency requires disciplined record handling.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "16px" }}
                >
                  The purpose of this protocol is to separate what must be published for public clarity from what must remain protected to preserve review integrity, privacy, and responsible record administration.
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
