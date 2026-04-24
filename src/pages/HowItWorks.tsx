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

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

type Clause = { n: string; t: string; d: string };

const AUDIT_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Supply-chain substantiation",
    d: "Review of the vendor's primary upstream sourcing relationships to determine whether claimed supply channels can be tied to legitimate, documented sources.",
  },
  {
    n: "02",
    t: "Registration cross-reference",
    d: "Cross-checking of cited 503A and 503B pharmacy relationships against federal registration records, state licensure, and related public filings where applicable.",
  },
  {
    n: "03",
    t: "Chain-of-custody review",
    d: "Assessment of invoices, distribution records, and related documentation to determine whether the available record supports a continuous sourcing chain.",
  },
  {
    n: "04",
    t: "Entity and standing review",
    d: "Review of ownership, legal standing, and operating identity to reduce the risk of undocumented intermediary supply arrangements.",
  },
];

const SURVEILLANCE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Sample acquisition review",
    d: "Where applicable, product samples may be acquired from active public listings for independent analytical review.",
  },
  {
    n: "02",
    t: "Third-party laboratory analysis",
    d: "Samples may be submitted to qualified independent laboratories for identity, potency, and sterility testing where that level of review is within scope.",
  },
  {
    n: "03",
    t: "Analytical confirmation",
    d: "Laboratory findings are compared against represented compound identity and concentration to assess whether the available evidence supports the public claim.",
  },
  {
    n: "04",
    t: "Deficiency response",
    d: "Where material analytical deficiencies are identified within the scope of review, public status may be revised in accordance with the framework's disclosure rules.",
  },
];

const DISCLOSURE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Change notification",
    d: "Vendors are expected to disclose material sourcing, ownership, or operating changes that could affect the accuracy of a published public record.",
  },
  {
    n: "02",
    t: "Regulatory monitoring",
    d: "The framework monitors relevant federal and state enforcement actions, licensure changes, and related administrative developments where applicable.",
  },
  {
    n: "03",
    t: "Credential continuity",
    d: "Published records are periodically reviewed to determine whether underlying licenses, pharmacy relationships, and related operating credentials remain consistent with the stated record.",
  },
  {
    n: "04",
    t: "Status adjustment",
    d: "Where disclosure failures or material inconsistencies are identified, registry status may be updated to reflect the current state of the record.",
  },
];

const BOUNDARIES = [
  "The framework publishes whether sourcing documentation and related records support the stated public claim within the reviewed scope.",
  "It does not provide clinical recommendations or individualized medical advice.",
  "It does not certify patient outcomes, treatment efficacy, or biological response.",
  "It does not replace federal or state regulatory authority.",
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

const HowItWorks = () => {
  const heroDescription =
    "An independent review framework designed to assess sourcing documentation, upstream pharmacy relationships, and public-record consistency across the compounded medicine landscape.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification" }]} />

      <PageMeta title="Verification · Source Standard" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Verification Framework"
        title="The Verification Standard"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">
                What this standard is designed to do
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  The Verification Standard defines how Source Standard reviews whether a vendor's public sourcing claims can be substantiated through documentation, pharmacy-of-record relationships, licensure, and related operating records.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  It is a framework for documentation review and public-reference consistency. It is not a guarantee of product efficacy, a substitute for medical judgment, or a replacement for federal or state regulatory oversight.
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
            {/* §4 Audit */}
            <SplitSection
              id="audit"
              n="01"
              title="Audit"
              intro="How sourcing claims are reviewed against upstream records."
              clauses={AUDIT_CLAUSES}
              firstSection
            />

            {/* §5 Surveillance */}
            <SplitSection
              id="surveillance"
              n="02"
              title="Surveillance"
              intro="How the framework monitors evidence beyond initial document review."
              clauses={SURVEILLANCE_CLAUSES}
            />

            {/* §6 Disclosure */}
            <SplitSection
              id="disclosure"
              n="03"
              title="Disclosure"
              intro="How ongoing changes are expected to be reported and monitored."
              clauses={DISCLOSURE_CLAUSES}
            />

            {/* §7 Boundaries */}
            <section id="boundaries" className="scroll-mt-24 section-pad border-b border-border/40">
              <SectionIndex n="04" />
              <div className="max-w-2xl mb-8">
                <h2 className="t-section-title-sm text-foreground">Boundaries</h2>
                <p className="mt-4 t-body-md text-muted-foreground leading-relaxed">
                  What the framework does and does not claim.
                </p>
              </div>
              <ul className="divide-y divide-border/60 border-y border-border/60 max-w-3xl">
                {BOUNDARIES.map((b) => (
                  <li key={b} className="py-5 t-body-md text-foreground">
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* §8 Closing statement */}
            <section className="section-pad">
              <div className="max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Verification is a record standard.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The purpose of the Verification Standard is to help the public interpret whether sourcing claims are supported by documentation, not to simulate regulatory authority or clinical endorsement. Its role is to bring greater clarity, consistency, and accountability to a market where those signals are often difficult to evaluate independently.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
