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
  { id: "scope", number: "04", label: "Scope" },
  { id: "related", number: "05", label: "Related Pages" },
];

type Clause = { t: string; d: string };

const OBJECTIVES: Clause[] = [
  {
    t: "For Consumers",
    d: "Providing a structured public reference so vendor sourcing claims can be evaluated through documentation status, review scope, and last-reviewed dates.",
  },
  {
    t: "For Vendors",
    d: "Providing a documentation-based review pathway for vendors that want their sourcing claims evaluated within a defined public-reference framework.",
  },
];

const SCOPE: Clause[] = [
  {
    t: "Vendor registry",
    d: "Maintenance of a public registry containing verified, unverified, under-review, suspended, and removed vendor records.",
  },
  {
    t: "Upstream registry",
    d: "Publication of upstream facility records used as reference points during vendor sourcing review.",
  },
  {
    t: "Educational reference",
    d: "Publication of educational material covering sourcing claims, pharmacy categories, public records, documentation boundaries, and consumer due diligence.",
  },
  {
    t: "Status maintenance",
    d: "Periodic review of vendor records, documentation status, review scope, and public-facing status definitions within the limits of the framework.",
  },
];

const BOUNDARIES = [
  "Source Standard does not provide medical advice or prescribe treatment protocols.",
  "It does not substitute for physician judgment or federal or state regulatory oversight.",
  "It does not function as a marketing partner or promotional arm for any vendor.",
  "It does not guarantee clinical outcomes, treatment effectiveness, biological response, product quality, potency, sterility, or individual product safety.",
  "Its mandate is limited to documentation review, sourcing-claim review, public-record organization, and status-based registry publication.",
];

const RELATED = [
  { to: "/governance", label: "Governance & Oversight", desc: "Advisory oversight, review boundaries, and framework discipline." },
  { to: "/how-it-works", label: "Verification Protocol", desc: "Documentation review, monitoring, disclosure, and status-response process." },
  { to: "/status-definitions", label: "Status Definitions", desc: "Definitions for every public registry status." },
  { to: "/accountability", label: "Compliance", desc: "Legal posture, operating boundaries, and public-reference limitations." },
];

/* ------------------------------ Local primitives ------------------------------ */

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p
    className="font-mono uppercase text-muted-foreground/70"
    style={{ fontSize: "10px", letterSpacing: "0.14em" }}
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
      <h3 className="font-sans font-semibold text-foreground" style={{ fontSize: "14px" }}>
        {title}
      </h3>
      <span
        className="font-mono tabular-nums text-muted-foreground shrink-0"
        style={{ fontSize: "10px", letterSpacing: "0.06em" }}
      >
        {`${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
      </span>
    </div>
    {description ? (
      <p className="mt-1.5 text-muted-foreground" style={{ fontSize: "13px", lineHeight: "1.55" }}>
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
      padding: "12px 14px",
    }}
  >
    <div className="flex items-baseline gap-3">
      <span
        className="font-mono tabular-nums text-muted-foreground shrink-0"
        style={{ fontSize: "10px", letterSpacing: "0.06em" }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <p className="text-foreground" style={{ fontSize: "13px", lineHeight: "1.5" }}>
        {text}
      </p>
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
          style={{ fontSize: "14px" }}
        >
          {title}
        </h3>
        <p className="mt-1 text-muted-foreground" style={{ fontSize: "13px", lineHeight: "1.5" }}>
          {description}
        </p>
      </div>
      <span
        className="shrink-0 inline-flex items-center gap-0.5 font-sans font-bold uppercase text-[hsl(var(--primary))] group-hover:opacity-80 transition-opacity self-center"
        style={{ fontSize: "11px", letterSpacing: "0.06em" }}
      >
        View
        <ChevronRight aria-hidden style={{ width: "12px", height: "12px", strokeWidth: 1.5 }} />
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

/* ----------------------------------- Page ----------------------------------- */

const About = () => {
  const heroDescription =
    "Source Standard exists to make vendor sourcing claims easier to interpret through submitted records, public documentation, structured review, and status-based registry standards.";

  return (
    <>
      <Breadcrumb items={[{ label: "About" }]} />

      <PageMeta title="About" description={heroDescription} />

      {/* §1 Hero — untouched */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Organization & Mandate"
        title="An independent verification and public-reference framework for compounded therapy vendor sourcing claims."
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
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <AboutCard>
                <Eyebrow>Organizational Purpose</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  What Source Standard exists to do
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Source Standard is an independent verification and public-reference framework designed to improve transparency around compounded therapy vendor sourcing claims.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Its role is to help the public identify whether vendor claims are supported by submitted documentation, pharmacy relationship evidence, public records, and review timestamps.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    The organization does not market vendors, promote treatment protocols, provide medical advice, or function as a substitute for federal or state oversight.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Its purpose is narrower and more disciplined: to organize vendor records, sourcing documentation, verification status, and public-reference materials into a system that can be reviewed with greater clarity.
                  </p>
                </div>
              </AboutCard>
            </section>

            {/* §4 Context */}
            <section
              id="context"
              className="scroll-mt-24 border-b border-border/40"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <AboutCard>
                <Eyebrow>01 · Context</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">Context</h2>
                <p
                  className="mt-3 text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.55 }}
                >
                  Why this framework exists.
                </p>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    In compounded therapy markets, consumers are often asked to evaluate vendors through branding, testimonials, claims, and presentation.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Those signals are difficult to verify independently.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Source Standard was established to create a clearer relationship between vendor sourcing claims and documentation that can be reviewed, time-stamped, and assigned a public status.
                  </p>
                </div>
              </AboutCard>
            </section>

            {/* §5 Operational Boundaries */}
            <section
              id="boundaries"
              className="scroll-mt-24 border-b border-border/40"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <SectionHeader
                n="02"
                title="Operational Boundaries"
                intro="What the organization does not do."
              />
              <div className="flex flex-col" style={{ gap: "8px" }}>
                {BOUNDARIES.map((b, i) => (
                  <AboutStatementRow key={b} index={i + 1} text={b} />
                ))}
              </div>
            </section>

            {/* §6 Strategic Objectives */}
            <section
              id="objectives"
              className="scroll-mt-24 border-b border-border/40"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <SectionHeader
                n="03"
                title="Strategic Objectives"
                intro="Who the framework is designed to serve."
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

            {/* §7 Defined Scope */}
            <section
              id="scope"
              className="scroll-mt-24 border-b border-border/40"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <SectionHeader
                n="04"
                title="Defined Scope"
                intro="What the framework is built to maintain and publish."
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

            {/* §8 Related Pages */}
            <section
              id="related"
              className="scroll-mt-24 border-b border-border/40"
              style={{ paddingTop: "40px", paddingBottom: "40px" }}
            >
              <SectionHeader
                n="05"
                title="Related Pages"
                intro="Further reading on oversight, standards, and verification methodology."
              />
              <div className="flex flex-col" style={{ gap: "10px" }}>
                {RELATED.map((r) => (
                  <AboutLinkRow
                    key={r.to}
                    to={r.to}
                    title={r.label}
                    description={r.desc}
                  />
                ))}
              </div>
            </section>

            {/* §9 Closing — Framework Limits */}
            <section style={{ paddingTop: "40px", paddingBottom: "64px" }}>
              <AboutCard>
                <Eyebrow>Framework Limits</Eyebrow>
                <h2 className="mt-2 t-section-title-sm text-foreground">
                  A public-reference system with defined limits.
                </h2>
                <p
                  className="mt-4 text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6 }}
                >
                  Source Standard is designed to make compounded therapy vendor sourcing claims easier to interpret. It does not replace clinical judgment, regulatory oversight, or individual medical decision-making. Its role is to provide a disciplined public reference for a market where documentation is often harder to evaluate than presentation.
                </p>
              </AboutCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
