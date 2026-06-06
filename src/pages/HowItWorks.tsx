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
    t: "Sourcing verification",
    d: "Reviews whether claimed pharmacy or manufacturing relationships are supported by documentation, records, and supporting evidence.",
  },
  {
    n: "02",
    t: "Pharmacy verification",
    d: "Evaluates cited 503A and 503B pharmacy relationships against registration records, licensure information, and publicly available sources.",
  },
  {
    n: "03",
    t: "Supply-chain documentation",
    d: "Reviews invoices, fulfillment records, distribution documentation, chain-of-custody materials, and related records when available.",
  },
  {
    n: "04",
    t: "Business verification",
    d: "Confirms consistency between business identity, operating entity information, ownership records, locations, and public-facing representations.",
  },
];

const SURVEILLANCE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Record maintenance",
    d: "Published records remain subject to ongoing review as new information, documentation, or public-record changes become available.",
  },
  {
    n: "02",
    t: "Public-record monitoring",
    d: "Relevant licensure actions, enforcement notices, administrative actions, and public-record changes may be incorporated into future reviews.",
  },
  {
    n: "03",
    t: "Evidence reconciliation",
    d: "New information may be compared against an existing record to determine whether previously supported claims remain supported.",
  },
  {
    n: "04",
    t: "Status review",
    d: "Material inconsistencies, documentation deficiencies, or unresolved evidence gaps may result in a reassessment of public status.",
  },
];

const DISCLOSURE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Material change reporting",
    d: "Vendors are expected to disclose sourcing, pharmacy, ownership, operational, or structural changes that materially affect a published record.",
  },
  {
    n: "02",
    t: "Documentation maintenance",
    d: "Supporting documentation may require updates when sourcing relationships, operating entities, therapy categories, or public claims change.",
  },
  {
    n: "03",
    t: "Review continuity",
    d: "Published records may be re-evaluated to determine whether the existing status remains supported by available evidence.",
  },
  {
    n: "04",
    t: "Status adjustment",
    d: "Failure to disclose material changes, maintain documentation, or resolve significant inconsistencies may result in status modification.",
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
    "Structured evaluation of vendor sourcing claims through documentation review, pharmacy relationship verification, public-record analysis, and ongoing evidence monitoring.";

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
                    Source Standard exists to create a clearer public record around compounded therapy sourcing. The Verification Framework evaluates whether vendor sourcing representations are supported by documentation, pharmacies, manufacturers, and sourcing organization relationships, public records, and other reviewable evidence available during the verification process.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    The Verification Framework evaluates whether publicly stated vendor claims are supported by submitted documentation, pharmacy relationship evidence, licensure records, public records, and related materials available during review.
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
                intro="How sourcing claims are evaluated."
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
                intro="How records are maintained after publication."
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
                intro="Responsibilities associated with a published record."
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
                    The Verification Framework establishes a structured method for evaluating sourcing transparency within the compounded therapy market. Its purpose is to create a clearer public record by determining whether vendor claims are supported by evidence that can be reviewed, documented, and maintained over time.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                  >
                    The framework is designed to improve transparency, consistency, and public understanding in a market where sourcing relationships are often difficult for consumers to evaluate independently.
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
