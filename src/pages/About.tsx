import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection, FeatureItem } from "@/components/system";

const WAYPOINTS = [
  { id: "context", number: "01", label: "Context" },
  { id: "boundaries", number: "02", label: "Boundaries" },
  { id: "objectives", number: "03", label: "Objectives" },
  { id: "scope", number: "04", label: "Components" },
  { id: "principles", number: "05", label: "Principles" },
];

type Clause = { t: string; d: string };

const CONTEXT: Clause[] = [
  { t: "Information asymmetry", d: "Consumers often have limited visibility into vendor sourcing claims, making informed decisions difficult." },
  { t: "Verification challenges", d: "Many sourcing claims are difficult for the public to independently confirm through available records alone." },
  { t: "Documentation complexity", d: "Publicly available sourcing information is often incomplete or difficult for consumers to access and evaluate independently." },
  { t: "Transparency gap", d: "The framework exists to improve transparency by helping consumers better understand vendor sourcing claims." },
];

const BOUNDARIES: Clause[] = [
  { t: "Medical advice", d: "Does not diagnose, treat, recommend therapies, or provide individualized medical guidance." },
  { t: "Regulatory authority", d: "Does not replace federal, state, pharmacy, or medical regulatory oversight." },
  { t: "Commercial endorsement", d: "Does not market, promote, rank, endorse, or recommend vendors." },
  { t: "Product certification", d: "Does not certify product safety, potency, sterility, efficacy, manufacturing quality, or clinical performance." },
  { t: "Clinical outcomes", d: "Does not evaluate patient outcomes or treatment effectiveness." },
];

const OBJECTIVES: Clause[] = [
  { t: "Consumers", d: "Provides a structured public-reference system that helps consumers better understand sourcing transparency." },
  { t: "Providers", d: "Provides a trusted, independent framework for demonstrating sourcing transparency." },
  { t: "Industry", d: "Supports greater transparency and accountability across the compounded therapy market." },
];

const SCOPE: Clause[] = [
  { t: "Vendor Registry", d: "Maintains public-reference records that improve transparency around vendor sourcing." },
  { t: "Facility Records", d: "Maintains public-reference records relating to upstream organizations within the compounded therapy supply chain." },
  { t: "Verification Framework", d: "Explains the principles that guide Source Standard's public-reference framework and verification standards." },
  { t: "Educational Resources", d: "Provides educational materials explaining sourcing transparency, verification concepts, and public terminology." },
];

const PRINCIPLES: Clause[] = [
  { t: "Evidence before representation", d: "Public claims should be evaluated against supporting evidence whenever possible." },
  { t: "Transparency over promotion", d: "The framework exists to increase transparency, not to market vendors." },
  { t: "Consistency over discretion", d: "Status determinations are guided by consistent public standards." },
  { t: "Public clarity", d: "Information should be organized in a way that is understandable, reviewable, and accessible to the public." },
];

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

      <SectionAnchorNav waypoints={WAYPOINTS} />

      <PageSection
        title="Why Source Standard exists"
        intro="Compounded therapy vendors frequently make claims about sourcing relationships, facility and manufacturer partnerships, quality standards, manufacturing practices, and supply-chain integrity. For consumers, determining whether those claims are supported by evidence can be difficult."
      >
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.65, fontWeight: 400, maxWidth: "64ch", margin: 0 }}
        >
          Source Standard was established to improve sourcing transparency, create trusted public-reference records, increase accountability, and help consumers better understand sourcing claims within a complex and rapidly growing market. The objective is not to decide which treatments are best or to replace physicians, regulators, or pharmacists — it is to make sourcing legible.
        </p>
      </PageSection>

      <PageSection
        id="context"
        title="Why Is This Needed?"
        intro="Why the framework is needed."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {CONTEXT.map((c) => (
            <FeatureItem key={c.t} icon="check" title={c.t} desc={c.d} variant="row" />
          ))}
        </div>
      </PageSection>

      <PageSection
        id="boundaries"
        icon="minus"
        title="What Does Source Standard Not Do?"
        intro="What Source Standard does not do."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {BOUNDARIES.map((c) => (
            <div key={c.t} className="flex items-start gap-3 text-left">
              <span
                className="text-muted-foreground/70 shrink-0 inline-flex"
                style={{ paddingTop: "2px" }}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </span>
              <div className="min-w-0">
                <h3
                  className="font-sans text-foreground"
                  style={{ fontSize: "15px", lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}
                >
                  {c.t}
                </h3>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.6, fontWeight: 400, marginTop: "4px" }}
                >
                  {c.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="objectives"
        icon="handshake"
        title="Who Does This Help?"
        intro="Who the framework serves."
      >
        <div className="flex flex-col divide-y divide-border lg:grid lg:grid-cols-3 lg:gap-8 lg:divide-y-0">
          {OBJECTIVES.map((c, i) => (
            <div
              key={c.t}
              className={i === 0 ? "pb-4 lg:pb-0" : i === OBJECTIVES.length - 1 ? "pt-4 lg:pt-0" : "py-4 lg:py-0"}
            >
              <FeatureItem title={c.t} desc={c.d} variant="block" />
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="scope"
        title="What Does Source Standard Do?"
        intro="The systems maintained by Source Standard."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {SCOPE.map((c) => (
            <FeatureItem key={c.t} icon="check" title={c.t} desc={c.d} variant="row" />
          ))}
        </div>
      </PageSection>

      <PageSection
        id="principles"
        icon="scale"
        title="What Guides Source Standard?"
        intro="The principles guiding the framework."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {PRINCIPLES.map((c) => (
            <FeatureItem key={c.t} title={c.t} desc={c.d} variant="block" />
          ))}
        </div>
      </PageSection>

      <PageSection
        title="A transparency framework with defined limits"
        bordered={false}
      >
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "64ch", margin: 0 }}>
            Source Standard operates as an independent public-reference system focused on sourcing transparency within the compounded therapy market. Its role is to improve sourcing transparency, maintain trusted public-reference records, help consumers better understand sourcing claims, and increase accountability across the market.
          </p>
          <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "64ch", margin: 0 }}>
            The framework does not replace clinical judgment, regulatory oversight, or personal decision-making. Its role is focused but important: improving sourcing transparency and helping consumers better understand sourcing claims within a market where that information is often difficult to evaluate independently.
          </p>
        </div>
      </PageSection>
    </>
  );
};

export default About;
