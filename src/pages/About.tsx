import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection } from "@/components/system";

type Clause = { t: string; d: string };

const BOUNDARIES: Clause[] = [
  { t: "Medical advice", d: "Does not diagnose, treat, recommend therapies, or provide individualized guidance." },
  { t: "Regulatory authority", d: "Does not replace federal, state, pharmacy, or medical regulatory oversight." },
  { t: "Commercial endorsement", d: "Does not market, promote, rank, endorse, or recommend vendors." },
  { t: "Product certification", d: "Does not certify safety, potency, sterility, efficacy, or manufacturing quality." },
  { t: "Clinical outcomes", d: "Does not evaluate patient outcomes or treatment effectiveness." },
];

const PRINCIPLES: Clause[] = [
  { t: "Evidence before representation", d: "Public claims are evaluated against supporting evidence whenever possible." },
  { t: "Transparency over promotion", d: "The framework exists to increase transparency, not to market vendors." },
  { t: "Consistency over discretion", d: "Status determinations are guided by consistent public standards." },
  { t: "Public clarity", d: "Information is organized to be understandable, reviewable, and accessible to the public." },
];

/** DefinitionRow — inline reference-list row. Local to About. */
const DefinitionRow = ({ term, def }: { term: string; def: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-8 gap-y-1 py-3.5">
    <dt
      className="font-sans text-foreground"
      style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0 }}
    >
      {term}
    </dt>
    <dd
      className="text-muted-foreground"
      style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}
    >
      {def}
    </dd>
  </div>
);

const About = () => {
  const heroDescription =
    "Source Standard is an independent public-reference organization that maintains verification records for the compounded therapy market.";

  return (
    <>
      <Breadcrumb items={[{ label: "About" }]} />

      <PageMeta
        title="About Source Standard"
        description={heroDescription}
        path="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Source Standard",
          url: "https://sourcestandard.org/about",
        }}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Organization"
        title="About Source Standard"
        statement={heroDescription}
        docId=""
      />

      {/* 1 — Why We Exist */}
      <PageSection id="why-we-exist" title="Why We Exist">
        <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
          <p
            className="text-foreground"
            style={{ fontSize: "17px", lineHeight: 1.6, margin: 0 }}
          >
            The compounded therapy market has grown faster than the public information that surrounds it. Sourcing claims are common, but the records behind them are rarely available in one place, in a consistent form, and outside the influence of the parties making the claims.
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}
          >
            Source Standard was founded to close that gap. It exists so that patients, providers, and the wider industry have a single independent reference for sourcing transparency — not a marketing surface, and not a substitute for regulation, but a durable public record.
          </p>
        </div>
      </PageSection>

      {/* 2 — Our Role */}
      <PageSection id="our-role" compact title="Our Role">
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "68ch", margin: 0 }}
        >
          Source Standard maintains the public-reference records that describe vendor verification status and upstream facility relationships. It publishes the standards those records are held to, keeps them current as new information is available, and makes the entire framework openly reviewable. Its remit is narrow and deliberate: to make sourcing legible.
        </p>
      </PageSection>

      {/* 3 — Our Principles */}
      <PageSection id="principles" compact title="Our Principles">
        <ol className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: "68ch" }}>
          {PRINCIPLES.map((p, i) => (
            <li
              key={p.t}
              className="grid grid-cols-[40px_1fr] gap-x-4 py-3.5 border-t border-border/60 last:border-b"
            >
              <span
                className="font-mono tabular-nums text-muted-foreground/70"
                style={{ fontSize: "11px", letterSpacing: "0.08em", paddingTop: "3px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="font-sans text-foreground"
                  style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0 }}
                >
                  {p.t}
                </h3>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.6, marginTop: "4px", marginBottom: 0 }}
                >
                  {p.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </PageSection>

      {/* 4 — What We Don't Do */}
      <PageSection id="what-we-dont-do" compact title="What We Don't Do">
        <dl className="divide-y divide-border/60 border-t border-b border-border/60" style={{ maxWidth: "68ch" }}>
          {BOUNDARIES.map((c) => (
            <DefinitionRow key={c.t} term={c.t} def={c.d} />
          ))}
        </dl>
      </PageSection>

      {/* 5 — Independence */}
      <PageSection id="independence" compact title="Independence">
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "68ch", margin: 0 }}
        >
          Source Standard is not owned by, financed by, or operated on behalf of any vendor, manufacturer, or pharmacy. Verification status is never influenced by commercial relationships. The standards used to evaluate sourcing claims are published in full and available for public review, and the organization's governance is structured to keep it that way.
        </p>
      </PageSection>

      {/* 6 — Looking Ahead */}
      <PageSection id="looking-ahead" compact title="Looking Ahead" bordered={false}>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "68ch", margin: 0 }}
        >
          The public record will expand as the market does. New vendors will be reviewed, existing records kept current, and the framework refined as sourcing practices evolve. The organization's obligation is not to grow the registry for its own sake, but to keep it accurate, independent, and useful to the public it serves.
        </p>
      </PageSection>
    </>
  );
};

export default About;
