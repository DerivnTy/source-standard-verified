import { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "audit", number: "01", label: "Documentation Review" },
  { id: "surveillance", number: "02", label: "Ongoing Monitoring" },
  { id: "disclosure", number: "03", label: "Vendor Disclosure" },
  { id: "boundaries", number: "04", label: "Boundaries" },
];

type Clause = { n: string; t: string; d: string };

const AUDIT_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Sourcing claims",
    d: "Reviews whether the vendor's stated sourcing relationships are supported by documentation.",
  },
  {
    n: "02",
    t: "Pharmacy records",
    d: "Cross-checks cited 503A and 503B pharmacy relationships against available registration, licensure, and public-record sources.",
  },
  {
    n: "03",
    t: "Chain of custody",
    d: "Reviews invoices, lot references, distribution records, and related documentation when available.",
  },
  {
    n: "04",
    t: "Entity identity",
    d: "Checks business identity, operating entity, location data, and related records for consistency.",
  },
];

const SURVEILLANCE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Record maintenance",
    d: "Published records may be reviewed to confirm that licensing data, pharmacy relationships, and documentation remain current.",
  },
  {
    n: "02",
    t: "Public-record updates",
    d: "Relevant licensure changes, enforcement notices, and administrative updates may be monitored where applicable.",
  },
  {
    n: "03",
    t: "Evidence reconciliation",
    d: "New information may be compared against the existing record to determine whether further review is needed.",
  },
  {
    n: "04",
    t: "Status response",
    d: "Material gaps or unresolved inconsistencies may result in a status update.",
  },
];

const DISCLOSURE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Change notification",
    d: "Vendors are expected to disclose sourcing, ownership, pharmacy, or operating changes that affect a published record.",
  },
  {
    n: "02",
    t: "Documentation updates",
    d: "Updated records may be required when sourcing relationships, therapy categories, or public claims change.",
  },
  {
    n: "03",
    t: "Review continuity",
    d: "Records may be reviewed to confirm that the published status remains supported.",
  },
  {
    n: "04",
    t: "Status adjustment",
    d: "Disclosure failures, expired documentation, or material inconsistencies may change registry status.",
  },
];

const BOUNDARIES = [
  "Reviews whether sourcing documentation supports the stated public claim.",
  "Does not provide medical advice or clinical recommendations.",
  "Does not verify outcomes, treatment effectiveness, or biological response.",
  "Does not certify product safety, potency, sterility, or quality.",
  "Does not replace federal or state regulatory authority.",
  "Does not approve, recommend, or rank vendors.",
];

/* ------------------------------ Local primitives ------------------------------ */

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground/70">
    {children}
  </p>
);

const ProtocolCard = ({ children }: { children: ReactNode }) => (
  <div
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "24px",
    }}
  >
    {children}
  </div>
);

const ProtocolRow = ({
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
  <div
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "14px 16px",
    }}
  >
    <div className="flex items-baseline justify-between gap-4">
      <p className="t-body-md font-semibold text-foreground">{title}</p>
      <span className="font-mono text-[11px] tabular-nums text-muted-foreground/70 shrink-0">
        {index} / {total}
      </span>
    </div>
    <p
      className="mt-1.5 text-muted-foreground"
      style={{ fontSize: "13px", lineHeight: 1.55 }}
    >
      {description}
    </p>
  </div>
);

const BoundaryRow = ({ index, text }: { index: string; text: string }) => (
  <div
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "12px 14px",
    }}
  >
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60 shrink-0">
        {index}
      </span>
      <p
        className="text-foreground"
        style={{ fontSize: "13px", lineHeight: 1.5 }}
      >
        {text}
      </p>
    </div>
  </div>
);

const SectionHeader = ({
  n,
  title,
  intro,
}: {
  n: string;
  title: string;
  intro: string;
}) => (
  <div className="max-w-2xl mb-6 lg:mb-0 lg:sticky lg:top-24">
    <p className="font-mono text-[12px] text-muted-foreground/60 mb-1 tabular-nums">{n}</p>
    <h2 className="t-section-title-sm text-foreground">{title}</h2>
    <p
      className="mt-3 text-muted-foreground"
      style={{ fontSize: "13.5px", lineHeight: 1.55 }}
    >
      {intro}
    </p>
  </div>
);

const ClauseStack = ({ clauses }: { clauses: Clause[] }) => {
  const total = String(clauses.length).padStart(2, "0");
  return (
    <div className="flex flex-col" style={{ gap: "10px" }}>
      {clauses.map((c) => (
        <ProtocolRow
          key={c.n}
          index={c.n}
          total={total}
          title={c.t}
          description={c.d}
        />
      ))}
    </div>
  );
};

/* ----------------------------------- Page ----------------------------------- */

const HowItWorks = () => {
  const heroDescription =
    "Independent review of vendor sourcing claims, pharmacy relationships, submitted documentation, and public-record consistency.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification" }]} />

      <PageMeta title="Verification Protocol · Source Standard" description={heroDescription} />

      {/* §1 Hero — untouched */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Verification Framework"
        title="The Verification Protocol"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Contents nav — untouched */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §3 Purpose */}
            <section style={{ paddingTop: "36px", paddingBottom: "36px" }}>
              <ProtocolCard>
                <Eyebrow>Protocol Purpose</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  What this protocol does
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    Source Standard reviews whether a vendor's public sourcing claims are supported by documentation, pharmacy relationship evidence, licensure records, and related public records.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    Verification is a documentation and registry-status review. It is not a guarantee of product safety, treatment effectiveness, clinical quality, or regulatory compliance.
                  </p>
                </div>
              </ProtocolCard>
            </section>

            {/* §4 Documentation Review */}
            <section
              id="audit"
              className="scroll-mt-24 border-t border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <SectionHeader
                n="01"
                title="Documentation Review"
                intro="How submitted claims are checked against records."
              />
              <ClauseStack clauses={AUDIT_CLAUSES} />
            </section>

            {/* §5 Ongoing Monitoring */}
            <section
              id="surveillance"
              className="scroll-mt-24 border-t border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <SectionHeader
                n="02"
                title="Ongoing Monitoring"
                intro="How published records may be reviewed after verification."
              />
              <ClauseStack clauses={SURVEILLANCE_CLAUSES} />
            </section>

            {/* §6 Disclosure */}
            <section
              id="disclosure"
              className="scroll-mt-24 border-t border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <SectionHeader
                n="03"
                title="Vendor Disclosure"
                intro="How material changes are handled."
              />
              <ClauseStack clauses={DISCLOSURE_CLAUSES} />
            </section>

            {/* §7 Boundaries */}
            <section
              id="boundaries"
              className="scroll-mt-24 border-t border-border/40"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <ProtocolCard>
                <Eyebrow>Review Boundaries</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">Review Boundaries</h2>
                <p
                  className="mt-3 text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                >
                  What verification does and does not claim.
                </p>
                <div className="mt-5 flex flex-col" style={{ gap: "8px" }}>
                  {BOUNDARIES.map((b, i) => (
                    <BoundaryRow
                      key={b}
                      index={String(i + 1).padStart(2, "0")}
                      text={b}
                    />
                  ))}
                </div>
              </ProtocolCard>
            </section>

            {/* §8 Closing — Record Standard */}
            <section
              className="border-t border-border/40"
              style={{ paddingTop: "36px", paddingBottom: "64px" }}
            >
              <ProtocolCard>
                <Eyebrow>Record Standard</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  Verification is a record standard.
                </h2>
                <p
                  className="mt-4 text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                >
                  The Verification Protocol helps the public interpret whether vendor sourcing claims are supported by documentation. Its role is to create a clearer public record in a market where sourcing claims are difficult to evaluate independently.
                </p>
              </ProtocolCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
