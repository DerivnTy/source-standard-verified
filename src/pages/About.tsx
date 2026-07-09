import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection } from "@/components/system";

type Clause = { t: string; d: string };

const SCOPE: Clause[] = [
  { t: "Vendor Registry", d: "Public-reference records that improve transparency around vendor sourcing." },
  { t: "Facility Records", d: "Public-reference records for upstream organizations in the compounded therapy supply chain." },
  { t: "Verification Framework", d: "The principles that guide the framework and its verification standards." },
  { t: "Educational Resources", d: "Materials explaining sourcing transparency, verification concepts, and public terminology." },
];

const BOUNDARIES: Clause[] = [
  { t: "Medical advice", d: "Does not diagnose, treat, recommend therapies, or provide individualized guidance." },
  { t: "Regulatory authority", d: "Does not replace federal, state, pharmacy, or medical regulatory oversight." },
  { t: "Commercial endorsement", d: "Does not market, promote, rank, endorse, or recommend vendors." },
  { t: "Product certification", d: "Does not certify safety, potency, sterility, efficacy, or manufacturing quality." },
  { t: "Clinical outcomes", d: "Does not evaluate patient outcomes or treatment effectiveness." },
];

const CONTEXT = [
  "Consumers often have limited visibility into vendor sourcing claims, making informed decisions difficult.",
  "Many sourcing claims are difficult for the public to independently confirm through available records alone.",
  "Publicly available sourcing information is often incomplete or difficult for consumers to access and evaluate.",
  "The framework exists to close that gap by helping consumers better understand vendor sourcing claims.",
];

const PRINCIPLES: Clause[] = [
  { t: "Evidence before representation", d: "Public claims are evaluated against supporting evidence whenever possible." },
  { t: "Transparency over promotion", d: "The framework exists to increase transparency, not to market vendors." },
  { t: "Consistency over discretion", d: "Status determinations are guided by consistent public standards." },
  { t: "Public clarity", d: "Information is organized to be understandable, reviewable, and accessible to the public." },
];

/**
 * DefinitionRow — inline reference-list row used across recomposed pages.
 * Not a shared component (per plan). Local to About.
 */
const DefinitionRow = ({ term, def }: { term: string; def: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-8 gap-y-1 py-3.5">
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

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Organization & Mandate"
        title="What is Source Standard?"
        statement={heroDescription}
        docId=""
      />

      {/* Document metadata — quiet institutional marker */}
      <div className="border-b border-border/60 bg-background">
        <div className="page-shell">
          <div
            className="mx-auto w-standard flex flex-wrap items-center gap-x-8 gap-y-2 py-3 font-mono uppercase text-muted-foreground/80"
            style={{ fontSize: "10px", letterSpacing: "0.12em" }}
          >
            <span>Doc SS-ABT-2026.01</span>
            <span aria-hidden>·</span>
            <span>Version 2026.01</span>
            <span aria-hidden>·</span>
            <span>Last reviewed 04/20/2026</span>
          </div>
        </div>
      </div>

      {/* Movement 1 — Opening statement. No section heading. Foreground body. */}
      <section className="border-b border-border bg-background" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="page-shell">
          <div className="mx-auto w-standard flex flex-col gap-5" style={{ maxWidth: "68ch" }}>
            <p
              className="text-foreground"
              style={{ fontSize: "19px", lineHeight: 1.55, fontWeight: 400, margin: 0, letterSpacing: "-0.005em" }}
            >
              Compounded therapy vendors frequently make claims about sourcing relationships, facility partnerships, quality standards, and supply-chain integrity. For consumers, determining whether those claims are supported by evidence is often difficult.
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "16px", lineHeight: 1.65, margin: 0 }}
            >
              Source Standard was established to improve sourcing transparency, maintain trusted public-reference records, and help consumers better understand sourcing claims within a complex and rapidly growing market. The objective is not to decide which treatments are best or to replace physicians, regulators, or pharmacists — it is to make sourcing legible.
            </p>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "16px", lineHeight: 1.65, margin: 0 }}
            >
              The framework does not replace clinical judgment, regulatory oversight, or personal decision-making. Its role is focused but important: improving sourcing transparency within a market where that information is often difficult to evaluate independently.
            </p>
          </div>
        </div>
      </section>

      {/* Movement 2 — Scope. Two labeled columns, one comparative block. */}
      <PageSection id="scope" title="Scope" intro="What Source Standard does — and does not do.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <h3
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.14em", marginBottom: "8px" }}
            >
              What it does
            </h3>
            <dl className="divide-y divide-border/60 border-t border-b border-border/60">
              {SCOPE.map((c) => (
                <DefinitionRow key={c.t} term={c.t} def={c.d} />
              ))}
            </dl>
          </div>
          <div>
            <h3
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.14em", marginBottom: "8px" }}
            >
              What it does not do
            </h3>
            <dl className="divide-y divide-border/60 border-t border-b border-border/60">
              {BOUNDARIES.map((c) => (
                <DefinitionRow key={c.t} term={c.t} def={c.d} />
              ))}
            </dl>
          </div>
        </div>
      </PageSection>

      {/* Movement 3 — Context. Numbered prose. Audience sentence. */}
      <PageSection id="context" compact title="Context">
        <ol className="flex flex-col gap-3" style={{ maxWidth: "68ch", listStyle: "none", padding: 0, margin: 0 }}>
          {CONTEXT.map((line, i) => (
            <li
              key={i}
              className="grid grid-cols-[28px_1fr] gap-x-3 text-muted-foreground"
              style={{ fontSize: "15px", lineHeight: 1.65 }}
            >
              <span
                className="font-mono tabular-nums text-muted-foreground/70"
                style={{ fontSize: "12px", letterSpacing: "0.08em", paddingTop: "3px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "68ch", marginTop: "28px", marginBottom: 0 }}
        >
          The framework serves <span className="text-foreground font-medium">consumers</span> who need to understand sourcing before choosing a provider, <span className="text-foreground font-medium">providers</span> seeking an independent way to demonstrate sourcing transparency, and <span className="text-foreground font-medium">the industry</span> as a shared reference point for accountability across the compounded therapy market.
        </p>
      </PageSection>

      {/* Movement 4 — Principles. Numbered list, no grid, no icons. */}
      <PageSection id="principles" compact title="Principles" bordered={false}>
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
    </>
  );
};

export default About;
