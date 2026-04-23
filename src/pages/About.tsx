import { Link } from "react-router-dom";
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

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

type Clause = { n: string; t: string; d: string };

const OBJECTIVES: Clause[] = [
  {
    n: "01",
    t: "For Consumers",
    d: "Providing a structured reference point so healthcare decisions can rest more on documented evidence and less on aesthetic presentation alone.",
  },
  {
    n: "02",
    t: "For Operators",
    d: "Creating a visible standard for transparency that rewards vendors who maintain documented sourcing and operating discipline.",
  },
];

const SCOPE: Clause[] = [
  {
    n: "01",
    t: "Public registry",
    d: "Maintenance of a public registry of verified vendors and substantiated sourcing records.",
  },
  {
    n: "02",
    t: "Upstream reference layer",
    d: "Continuous publication of recognized upstream pharmaceutical sources used within the framework.",
  },
  {
    n: "03",
    t: "Educational reference",
    d: "Provision of educational material regarding sourcing, storage, and due-diligence standards.",
  },
  {
    n: "04",
    t: "Ongoing review",
    d: "Independent monitoring and, where applicable, analytical review of active registry listings within the limits of the framework.",
  },
];

const BOUNDARIES = [
  "Source Standard does not provide medical advice or prescribe treatment protocols.",
  "It does not substitute for physician judgment or federal regulatory oversight.",
  "The framework does not function as a marketing partner or promotional arm for any vendor.",
  "It does not guarantee clinical outcomes, biological efficacy, or individual product safety.",
  "Its mandate is limited to the verification of documentation and supply-chain transparency.",
];

const RELATED = [
  { to: "/governance", label: "Governance & Oversight", desc: "Clinical advisory and statutory anchors." },
  { to: "/how-it-works", label: "Verification Protocol", desc: "Detailed audit and renewal processes." },
  { to: "/status-definitions", label: "Status Definitions", desc: "Glossary of registry statuses and public meanings." },
  { to: "/accountability", label: "Enforcement", desc: "Accountability procedures and status-response protocols." },
];

const SplitSection = ({
  id,
  n,
  title,
  intro,
  clauses,
  firstSection = false,
}: {
  id: string;
  n: string;
  title: string;
  intro: string;
  clauses: Clause[];
  firstSection?: boolean;
}) => (
  <section
    id={id}
    className={`scroll-mt-24 ${firstSection ? "pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24" : "section-pad"} border-b border-border/40`}
  >
    <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-32">
          <SectionIndex n={n} />
          <h2 className="t-section-title-sm text-foreground">{title}</h2>
          <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">{intro}</p>
        </div>
      </div>
      <div className="md:col-span-8 mt-8 md:mt-0">
        <ol className="divide-y divide-border/60">
          {clauses.map((c) => (
            <li key={c.n} className="grid grid-cols-12 gap-4 py-6 first:pt-0 last:pb-0 items-baseline">
              <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70">
                {c.n}
              </div>
              <div className="col-span-10 md:col-span-11">
                <p className="t-body-md font-semibold text-foreground">{c.t}</p>
                <p className="mt-1.5 t-body-md text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

const About = () => {
  const heroDescription =
    "Source Standard exists to make sourcing claims easier to interpret through documented records, structured review, and public-reference standards.";

  return (
    <>
      <Breadcrumb items={[{ label: "About" }]} />

      <PageMeta title="About" description={heroDescription} />

      {/* §1 Hero */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <p className="t-eyebrow-sm text-muted-foreground">Organization & Mandate</p>
              <h1 className="mt-4 t-page-title text-foreground">
                An independent verification and public-reference framework for supply-chain transparency in the peptide and hormone optimization markets.
              </h1>
              <p className="mt-6 t-body-lg text-muted-foreground leading-relaxed">{heroDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <p className="t-eyebrow-sm text-muted-foreground">Purpose</p>
              <h2 className="mt-4 t-section-title-sm text-foreground">
                What Source Standard exists to do
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Source Standard is an independent verification and public-reference framework designed to improve sourcing transparency in peptide, hormone optimization, and adjacent clinical markets. Its role is to help the public interpret whether vendor claims are supported by documentation rather than presentation alone.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  The organization does not market clinics, promote treatment protocols, or function as a substitute for federal or state oversight. Its purpose is narrower and more disciplined: to organize sourcing records, verification status, and public-reference materials into a system people can evaluate with greater clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §4 Context */}
            <section
              id="context"
              className="scroll-mt-24 pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 border-b border-border/40"
            >
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="01" />
                    <h2 className="t-section-title-sm text-foreground">Context</h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      Why this framework exists.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <p className="t-body-md text-muted-foreground leading-relaxed max-w-2xl">
                    In high-growth medical markets, consumers are often asked to make decisions based on branding, trust signals, and marketing language that are difficult to verify independently. Source Standard was established to narrow that information gap by creating a clearer relationship between vendor claims and documented supply-chain reality.
                  </p>
                </div>
              </div>
            </section>

            {/* §5 Boundaries */}
            <section id="boundaries" className="scroll-mt-24 section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="02" />
                    <h2 className="t-section-title-sm text-foreground">Operational Boundaries</h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      What the organization does not do.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ul className="divide-y divide-border/60 border-y border-border/60">
                    {BOUNDARIES.map((b) => (
                      <li key={b} className="py-5 t-body-md text-foreground">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* §6 Objectives */}
            <SplitSection
              id="objectives"
              n="03"
              title="Strategic Objectives"
              intro="Who the framework is designed to serve."
              clauses={OBJECTIVES}
            />

            {/* §7 Scope */}
            <SplitSection
              id="scope"
              n="04"
              title="Defined Scope"
              intro="What the framework is built to maintain and publish."
              clauses={SCOPE}
            />

            {/* §8 Related pages */}
            <section id="related" className="scroll-mt-24 section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="05" />
                    <h2 className="t-section-title-sm text-foreground">Related Pages</h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      Further reading on oversight, standards, and verification methodology.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ul className="divide-y divide-border/60 border-y border-border/60">
                    {RELATED.map((r) => (
                      <li key={r.to}>
                        <Link
                          to={r.to}
                          className="group grid grid-cols-12 gap-4 py-5 items-baseline hover:bg-surface-muted/40 transition-colors -mx-4 px-4"
                        >
                          <div className="col-span-9 md:col-span-10">
                            <p className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors">
                              {r.label}
                            </p>
                            <p className="mt-1 t-body-sm text-muted-foreground">{r.desc}</p>
                          </div>
                          <div className="col-span-3 md:col-span-2 text-right">
                            <span className="t-utility-xs text-muted-foreground group-hover:text-primary transition-colors">
                              View
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* §9 Closing statement */}
            <section className="section-pad border-t border-border/40">
              <div className="max-w-2xl">
                <p className="t-eyebrow-sm text-muted-foreground">Conclusion</p>
                <h2 className="mt-4 t-section-title-sm text-foreground">
                  A public-reference system with defined limits.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  Source Standard is designed to make sourcing transparency easier to interpret, not to replace clinical judgment or statutory oversight. Its role is to provide a more disciplined public reference for a market where documentation is often harder to evaluate than presentation.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
