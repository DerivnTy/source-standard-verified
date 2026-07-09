import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "context", number: "01", label: "Context" },
  { id: "boundaries", number: "02", label: "Boundaries" },
  { id: "objectives", number: "03", label: "Objectives" },
  { id: "scope", number: "04", label: "Components" },
  { id: "principles", number: "05", label: "Principles" },
];

type Clause = { t: string; d: string };

const CONTEXT: Clause[] = [
  {
    t: "Information asymmetry",
    d: "Consumers often have limited visibility into vendor sourcing claims, making informed decisions difficult.",
  },
  {
    t: "Verification challenges",
    d: "Many sourcing claims are difficult for the public to independently confirm through available records alone.",
  },
  {
    t: "Documentation complexity",
    d: "Publicly available sourcing information is often incomplete or difficult for consumers to access and evaluate independently.",
  },
  {
    t: "Transparency gap",
    d: "The framework exists to improve transparency by helping consumers better understand vendor sourcing claims.",
  },
];

const BOUNDARIES: Clause[] = [
  {
    t: "Medical advice",
    d: "Does not diagnose, treat, recommend therapies, or provide individualized medical guidance.",
  },
  {
    t: "Regulatory authority",
    d: "Does not replace federal, state, pharmacy, or medical regulatory oversight.",
  },
  {
    t: "Commercial endorsement",
    d: "Does not market, promote, rank, endorse, or recommend vendors.",
  },
  {
    t: "Product certification",
    d: "Does not certify product safety, potency, sterility, efficacy, manufacturing quality, or clinical performance.",
  },
  {
    t: "Clinical outcomes",
    d: "Does not evaluate patient outcomes or treatment effectiveness.",
  },
];

const OBJECTIVES: Clause[] = [
  {
    t: "Consumers",
    d: "Provides a structured public-reference system that helps consumers better understand sourcing transparency.",
  },
  {
    t: "Providers",
    d: "Provides a trusted, independent framework for demonstrating sourcing transparency.",
  },
  {
    t: "Industry",
    d: "Supports greater transparency and accountability across the compounded therapy market.",
  },
];

const SCOPE: Clause[] = [
  {
    t: "Vendor Registry",
    d: "Maintains public-reference records that improve transparency around vendor sourcing.",
  },
  {
    t: "Facility Records",
    d: "Maintains public-reference records relating to upstream organizations within the compounded therapy supply chain.",
  },
  {
    t: "Verification Framework",
    d: "Explains the principles that guide Source Standard's public-reference framework and verification standards.",
  },
  {
    t: "Educational Resources",
    d: "Provides educational materials explaining sourcing transparency, verification concepts, and public terminology.",
  },
];

const PRINCIPLES: Clause[] = [
  {
    t: "Evidence before representation",
    d: "Public claims should be evaluated against supporting evidence whenever possible.",
  },
  {
    t: "Transparency over promotion",
    d: "The framework exists to increase transparency, not to market vendors.",
  },
  {
    t: "Consistency over discretion",
    d: "Status determinations are guided by consistent public standards.",
  },
  {
    t: "Public clarity",
    d: "Information should be organized in a way that is understandable, reviewable, and accessible to the public.",
  },
];

/* ------------------------------ Local primitives ------------------------------ */

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p
    className="font-mono uppercase text-muted-foreground"
    style={{ fontSize: "11px", letterSpacing: "0.12em" }}
  >
    {children}
  </p>
);

const AboutCard = ({ children }: { children: ReactNode }) => (
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

const AboutRow = ({
  index,
  total,
  title,
  description,
}: {
  index: number;
  total: number;
  title: string;
  description?: string;
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
      <h3
        className="font-sans font-semibold text-foreground min-w-0"
        style={{ fontSize: "14px", lineHeight: 1.3, margin: 0 }}
      >
        {title}
      </h3>
      <span
        className="font-mono tabular-nums text-muted-foreground/70 shrink-0 uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
      >
        {`${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      </span>
    </div>
    {description ? (
      <p
        className="text-muted-foreground"
        style={{ fontSize: "14px", lineHeight: 1.75, marginTop: "6px" }}
      >
        {description}
      </p>
    ) : null}
  </div>
);

const AboutStatementRow = ({ index, text }: { index: number; text: string }) => (
  <div
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "14px 16px",
    }}
  >
    <div className="flex items-baseline justify-between" style={{ gap: "16px" }}>
      <p
        className="text-foreground"
        style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.55, margin: 0 }}
      >
        {text}
      </p>
      <span
        className="font-mono tabular-nums text-muted-foreground/70 shrink-0 uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
      >
        {String(index).padStart(2, "0")}
      </span>
    </div>
  </div>
);

const AboutLinkRow = ({
  to,
  title,
  description,
}: {
  to: string;
  title: string;
  description: string;
}) => (
  <Link
    to={to}
    aria-label={title}
    className="group block bg-card transition-all hover:bg-[hsl(var(--muted))]/40 active:scale-[0.99]"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "14px 16px",
    }}
  >
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3
          className="font-sans font-semibold text-foreground group-hover:text-primary transition-colors"
          style={{ fontSize: "14px", lineHeight: 1.3 }}
        >
          {title}
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
        <ChevronRight aria-hidden style={{ width: "12px", height: "12px" }} />
      </span>
    </div>
  </Link>
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
  <div className="mb-5 lg:mb-0 lg:sticky lg:top-24">
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


/* ----------------------------------- Page ----------------------------------- */

const About = () => {
  const heroDescription =
    "Source Standard is an independent public-reference organization that helps consumers understand provider verification status and sourcing transparency for compounded therapies.";

  return (
    <>
      <Breadcrumb items={[{ label: "About" }]} />

      <PageMeta
        title="What is Source Standard?"
        description={heroDescription}
        path="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Source Standard",
          url: "https://sourcestandard.org/about",
        }}
      />

      {/* §1 Hero, untouched */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Organization & Mandate"
        title="What is Source Standard?"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §3 Purpose */}
            <section
              className="border-b border-border/40"
              style={{ paddingTop: "36px", paddingBottom: "24px" }}
            >
              <AboutCard>
                <Eyebrow>Organizational Purpose</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  Why Source Standard exists
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Compounded therapy vendors frequently make claims regarding sourcing relationships, facility and manufacturer partnerships, quality standards, manufacturing practices, and supply-chain integrity.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    For consumers, determining whether those claims are supported by evidence can be difficult.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Source Standard was established to improve sourcing transparency, create trusted public-reference records, increase accountability, and help consumers better understand sourcing claims within a complex and rapidly growing market.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    The objective is not to determine which treatments are best.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    The objective is not to replace physicians, regulators, or pharmacists.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    The objective is to improve sourcing transparency and help consumers better understand claims through a structured public-reference system.
                  </p>
                </div>
              </AboutCard>
            </section>

            {/* §4 Market Context */}
            <section
              id="context"
              className="scroll-mt-24 border-b border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="01"
                title="Why Is This Needed?"
                intro="Why the framework is needed."
              />
              <div className="flex flex-col" style={{ gap: "10px" }}>

                {CONTEXT.map((c, i) => (
                  <AboutRow
                    key={c.t}
                    index={i + 1}
                    total={CONTEXT.length}
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §5 Operational Boundaries */}
            <section
              id="boundaries"
              className="scroll-mt-24 border-b border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="02"
                title="What Does Source Standard Not Do?"
                intro="What Source Standard does not do."
              />
              <div className="flex flex-col" style={{ gap: "10px" }}>

                {BOUNDARIES.map((c, i) => (
                  <AboutRow
                    key={c.t}
                    index={i + 1}
                    total={BOUNDARIES.length}
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §6 Strategic Objectives */}
            <section
              id="objectives"
              className="scroll-mt-24 border-b border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="03"
                title="Who Does This Help?"
                intro="Who the framework serves."
              />
              <div className="flex flex-col" style={{ gap: "10px" }}>

                {OBJECTIVES.map((c, i) => (
                  <AboutRow
                    key={c.t}
                    index={i + 1}
                    total={OBJECTIVES.length}
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §7 Framework Components */}
            <section
              id="scope"
              className="scroll-mt-24 border-b border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="04"
                title="What Does Source Standard Do?"
                intro="The systems maintained by Source Standard."
              />
              <div className="flex flex-col" style={{ gap: "10px" }}>

                {SCOPE.map((c, i) => (
                  <AboutRow
                    key={c.t}
                    index={i + 1}
                    total={SCOPE.length}
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §8 Institutional Principles */}
            <section
              id="principles"
              className="scroll-mt-24 border-b border-border/40 lg:grid lg:grid-cols-[280px_1fr] lg:gap-x-12 lg:items-start"
              style={{ paddingTop: "24px", paddingBottom: "24px" }}
            >
              <SectionHeader
                n="05"
                title="What Guides Source Standard?"
                intro="The principles guiding the framework."
              />
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-3" style={{ gap: "10px" }}>
                {PRINCIPLES.map((c, i) => (
                  <AboutRow
                    key={c.t}
                    index={i + 1}
                    total={PRINCIPLES.length}
                    title={c.t}
                    description={c.d}
                  />
                ))}
              </div>
            </section>

            {/* §9 Closing, Institutional Role */}
            <section style={{ paddingTop: "24px", paddingBottom: "64px" }}>
              <AboutCard>
                <Eyebrow>Institutional Role</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  A transparency framework with defined limits.
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Source Standard operates as an independent public-reference system focused on sourcing transparency within the compounded therapy market.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Its role is to improve sourcing transparency, maintain trusted public-reference records, help consumers better understand sourcing claims, and increase accountability within the compounded therapy market.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    The framework does not replace clinical judgment, regulatory oversight, or personal decision-making.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Its role is focused but important: improving sourcing transparency and helping consumers better understand sourcing claims within a market where that information is often difficult to evaluate independently.
                  </p>
                </div>
              </AboutCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
