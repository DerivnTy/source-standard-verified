import { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "audit", number: "01", label: "Evidence Review" },
  { id: "surveillance", number: "02", label: "Ongoing Monitoring" },
  { id: "disclosure", number: "03", label: "Vendor Responsibilities" },
  { id: "boundaries", number: "04", label: "Boundaries" },
];

type Clause = { n: string; t: string; d: string };

const AUDIT_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Transparency",
    d: "Sourcing claims are considered within a consistent public framework.",
  },
  {
    n: "02",
    t: "Consistency",
    d: "The same standards apply across all reviewed organizations.",
  },
  {
    n: "03",
    t: "Documentation",
    d: "Public standing is grounded in information that can be referenced.",
  },
  {
    n: "04",
    t: "Independence",
    d: "The framework is applied objectively and without vendor influence.",
  },
];

const SURVEILLANCE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Record Maintenance",
    d: "Published records are maintained and updated as new information becomes available.",
  },
  {
    n: "02",
    t: "Status Updates",
    d: "Changes in public information may be reflected in record standing over time.",
  },
  {
    n: "03",
    t: "Periodic Review",
    d: "Records are reviewed periodically to help ensure continued accuracy.",
  },
  {
    n: "04",
    t: "Public Information Updates",
    d: "The framework incorporates new public information as it becomes available.",
  },
];

const DISCLOSURE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Accurate Information",
    d: "Vendors are expected to maintain accurate public information.",
  },
  {
    n: "02",
    t: "Material Changes",
    d: "Vendors should notify Source Standard of material changes affecting published records.",
  },
  {
    n: "03",
    t: "Ongoing Currency",
    d: "Vendors are expected to support the continued accuracy of the public record.",
  },
];

const BOUNDARIES = [
  "Evaluates whether publicly stated sourcing claims are supported by available evidence and documentation.",
  "Does not provide medical advice, treatment guidance, or clinical recommendations.",
  "Does not evaluate patient outcomes, treatment effectiveness, or biological response.",
  "Does not certify product potency, sterility, safety, efficacy, manufacturing quality, or future performance.",
  "Does not replace federal, state, or medical regulatory oversight.",
  "Does not endorse, recommend, rank, promote, or market vendors.",
];

/* ------------------------------ Local primitives ------------------------------ */

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground/70">
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
        style={{ fontSize: "16px", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em", margin: 0 }}
      >
        {title}
      </h3>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "11px",
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: "0.06em",
          color: "rgba(0,0,0,0.38)",
          whiteSpace: "nowrap",
          paddingTop: "2px",
        }}
      >
        {index} / {total}
      </span>
    </div>
    <p
      className="text-muted-foreground"
      style={{ marginTop: "12px", fontSize: "14px", fontWeight: 400, lineHeight: 1.75 }}
    >
      {description}
    </p>
  </div>
);

const BoundaryRow = ({ index, text }: { index: string; text: string }) => (
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
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.55, margin: 0 }}
      >
        {text}
      </p>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "11px",
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: "0.06em",
          color: "rgba(0,0,0,0.38)",
          whiteSpace: "nowrap",
          paddingTop: "2px",
        }}
      >
        {index}
      </span>
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
        {n}
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
    "The Source Standard Verification Framework establishes the principles used to evaluate sourcing transparency and maintain consistent public-reference records.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification" }]} />

      <PageMeta
        title="Verification Framework · Source Standard"
        description={heroDescription}
        path="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Verification Framework",
          url: "https://sourcestandard.org/how-it-works",
        }}
      />

      {/* §1 Hero — untouched */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Verification Framework"
        title="Verification Framework"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Contents nav — untouched */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §3 Purpose */}
            <section style={{ paddingTop: "36px", paddingBottom: "24px" }}>
              <ProtocolCard>
                <Eyebrow>Protocol Purpose</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  What this framework exists to do
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    The Verification Framework establishes a consistent standard for evaluating sourcing transparency and maintaining public-reference records. Its purpose is to organize available information into a structured framework that helps consumers better understand vendor sourcing claims.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    Verification is an evidence-based record review and public-reference process. It is not a certification of product quality, treatment effectiveness, clinical outcomes, regulatory compliance, or patient safety.
                  </p>
                </div>
              </ProtocolCard>
            </section>

            {/* §4 Evidence Review */}
            <section
              id="audit"
              className="scroll-mt-24 border-t border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="01"
                title="Evidence Review"
                intro="Principles that guide the evaluation process."
              />
              <ClauseStack clauses={AUDIT_CLAUSES} />
            </section>

            {/* §5 Ongoing Monitoring */}
            <section
              id="surveillance"
              className="scroll-mt-24 border-t border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="02"
                title="Ongoing Monitoring"
                intro="How public records are maintained over time."
              />
              <ClauseStack clauses={SURVEILLANCE_CLAUSES} />
            </section>

            {/* §6 Disclosure */}
            <section
              id="disclosure"
              className="scroll-mt-24 border-t border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="03"
                title="Vendor Responsibilities"
                intro="Expectations for organizations with published records."
              />
              <ClauseStack clauses={DISCLOSURE_CLAUSES} />
            </section>

            {/* §7 Boundaries */}
            <section
              id="boundaries"
              className="scroll-mt-24 border-t border-border/40"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <ProtocolCard>
                <Eyebrow>Review Boundaries</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">Review Boundaries</h2>
                <p
                  className="mt-3 text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                >
                  What verification does and does not represent.
                </p>
                <div className="mt-5 flex flex-col lg:grid lg:grid-cols-2 lg:gap-2" style={{ gap: "8px" }}>
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
              style={{ paddingTop: "24px", paddingBottom: "64px" }}
            >
              <ProtocolCard>
                <Eyebrow>Record Standard</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  Verification is an evidence standard.
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    The Verification Framework establishes a consistent public-reference standard for sourcing transparency. It creates a structured way for consumers, vendors, and healthcare organizations to understand whether sourcing claims are supported by available information.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    Its purpose is not to certify products or replace regulatory oversight. Its purpose is to establish whether sourcing claims are supported by evidence that can be reviewed, documented, and maintained over time.
                  </p>
                </div>
              </ProtocolCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
