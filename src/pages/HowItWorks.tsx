import { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "audit", number: "01", label: "Documentation Review" },
  { id: "surveillance", number: "02", label: "Ongoing Monitoring" },
  { id: "disclosure", number: "03", label: "Disclosure" },
  { id: "boundaries", number: "04", label: "Boundaries" },
];

type Clause = { n: string; t: string; d: string };

const AUDIT_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Sourcing-claim review",
    d: "Review of the vendor's stated sourcing relationships to determine whether the available documentation supports the public claim.",
  },
  {
    n: "02",
    t: "Pharmacy record cross-reference",
    d: "Cross-reference of cited 503A and 503B pharmacy relationships against public registration records, state licensure records, and related public filings where applicable.",
  },
  {
    n: "03",
    t: "Chain-of-custody review",
    d: "Review of invoices, lot references, distribution records, and related documentation to determine whether the available record supports a documented sourcing trail.",
  },
  {
    n: "04",
    t: "Entity and identity review",
    d: "Review of vendor identity, operating entity, location data, and related records to reduce inconsistency between public claims and submitted documentation.",
  },
];

const SURVEILLANCE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Record maintenance",
    d: "Published records may be reviewed periodically to determine whether licensing data, pharmacy relationships, and documentation remain consistent with the current status.",
  },
  {
    n: "02",
    t: "Public-record monitoring",
    d: "Source Standard may monitor relevant public records, enforcement notices, licensure changes, and administrative updates where applicable.",
  },
  {
    n: "03",
    t: "Evidence reconciliation",
    d: "New information may be compared against the existing vendor record to determine whether a status update, additional review, or limitation statement is required.",
  },
  {
    n: "04",
    t: "Status response",
    d: "Where material documentation gaps or unresolved inconsistencies are identified, registry status may be updated according to Source Standard status definitions.",
  },
];

const DISCLOSURE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Change notification",
    d: "Vendors are expected to disclose material sourcing, ownership, pharmacy relationship, or operating changes that could affect the accuracy of a published record.",
  },
  {
    n: "02",
    t: "Documentation updates",
    d: "Updated documentation may be required when a vendor changes a pharmacy relationship, adds a therapy category, or expands the scope of a public sourcing claim.",
  },
  {
    n: "03",
    t: "Review continuity",
    d: "Published records may be reviewed to determine whether underlying licenses, pharmacy relationships, and documentation remain consistent with the stated status.",
  },
  {
    n: "04",
    t: "Status adjustment",
    d: "Where disclosure failures, expired documentation, or material inconsistencies are identified, registry status may be updated to reflect the current state of the record.",
  },
];

const BOUNDARIES = [
  "The framework reviews whether sourcing documentation and related records support the stated public claim within the reviewed scope.",
  "It does not provide clinical recommendations or individualized medical advice.",
  "It does not verify medical outcomes, treatment effectiveness, or biological response.",
  "It does not certify product safety, potency, sterility, or quality.",
  "It does not replace federal or state regulatory authority.",
  "It does not approve, recommend, or rank vendors.",
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
  <div className="max-w-2xl mb-6">
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
    "An independent review framework for compounded therapy vendor sourcing claims, pharmacy relationship evidence, submitted documentation, and public-record consistency.";

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
                  What this protocol is designed to do
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    The Verification Protocol defines how Source Standard reviews whether a vendor's public sourcing claims are supported by submitted documentation, pharmacy relationship evidence, licensure records, and related operating records.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    It is a framework for documentation review and public-reference consistency. It is not a guarantee of product safety, treatment effectiveness, clinical quality, or regulatory compliance.
                  </p>
                </div>
              </ProtocolCard>
            </section>

            {/* §4 Documentation Review */}
            <section
              id="audit"
              className="scroll-mt-24 border-t border-border/40"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <SectionHeader
                n="01"
                title="Documentation Review"
                intro="How sourcing claims are reviewed against submitted and public records."
              />
              <ClauseStack clauses={AUDIT_CLAUSES} />
            </section>

            {/* §5 Ongoing Monitoring */}
            <section
              id="surveillance"
              className="scroll-mt-24 border-t border-border/40"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <SectionHeader
                n="02"
                title="Ongoing Monitoring"
                intro="How the framework reviews changes after initial documentation review."
              />
              <ClauseStack clauses={SURVEILLANCE_CLAUSES} />
            </section>

            {/* §6 Disclosure */}
            <section
              id="disclosure"
              className="scroll-mt-24 border-t border-border/40"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <SectionHeader
                n="03"
                title="Disclosure"
                intro="How vendor changes are expected to be reported and reflected."
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
                <h2 className="mt-2 t-section-title-sm text-foreground">Boundaries</h2>
                <p
                  className="mt-3 text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                >
                  What the framework does and does not claim.
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
                  The purpose of the Verification Protocol is to help the public interpret whether vendor sourcing claims are supported by documentation. Its role is to bring greater clarity, consistency, and accountability to a market where sourcing claims are often difficult to evaluate independently.
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
