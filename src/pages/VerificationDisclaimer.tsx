import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";

const WAYPOINTS = [
  { id: "scope", number: "01", label: "Scope" },
  { id: "exclusions", number: "02", label: "Exclusions" },
  { id: "boundaries", number: "03", label: "Boundaries" },
  { id: "liability", number: "04", label: "Liability" },
];

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

type Clause = { n: string; t: string; d: string };

const SCOPE: Clause[] = [
  {
    n: "01",
    t: "Documented identity",
    d: "Review of business registration, operating identity, and related credentials tied to the entity under review.",
  },
  {
    n: "02",
    t: "Regulatory standing",
    d: "Cross-checking of relevant licensing and registration records against available federal and state sources at a fixed point in time.",
  },
  {
    n: "03",
    t: "Upstream sourcing",
    d: "Review of disclosed pharmacy or supplier relationships and the supporting records submitted within the review process.",
  },
  {
    n: "04",
    t: "Record basis",
    d: "The registry reflects Source Standard's review of records and does not supersede the original third-party records on which the determination depends.",
  },
];

const EXCLUSIONS: Clause[] = [
  {
    n: "01",
    t: "Clinical outcomes",
    d: "No determination is made regarding the medical result for any individual patient.",
  },
  {
    n: "02",
    t: "Product suitability",
    d: "The framework does not evaluate whether any formulation, therapy, or protocol is appropriate for a specific person.",
  },
  {
    n: "03",
    t: "Safety and efficacy",
    d: "A Source Standard determination does not certify biological safety, sterility, potency, or therapeutic efficacy unless a separate published scope explicitly states otherwise.",
  },
  {
    n: "04",
    t: "Future conduct",
    d: "A published determination reflects the records reviewed at a fixed point in time and is not a warranty of future performance or future compliance.",
  },
];

const BOUNDARIES: Clause[] = [
  {
    n: "01",
    t: "Not a statutory body",
    d: "Source Standard is a private auditing and public-reference entity. It does not hold governmental enforcement authority.",
  },
  {
    n: "02",
    t: "Not a clinical practice",
    d: "The organization does not diagnose, prescribe, dispense, or practice medicine or pharmacy.",
  },
  {
    n: "03",
    t: "Not a manufacturer",
    d: "Source Standard does not compound, repackage, distribute, or supply pharmaceutical products.",
  },
  {
    n: "04",
    t: "Not a guarantor",
    d: "A Verified status is an administrative public record, not a warranty, indemnity, or insurance-like guarantee.",
  },
];

const LIABILITY: Clause[] = [
  {
    n: "01",
    t: "User discretion",
    d: "The registry is a public reference tool. Reliance on any published determination is at the user's discretion.",
  },
  {
    n: "02",
    t: "Professional consultation",
    d: "Users should consult licensed clinicians for medical matters and appropriate regulatory authorities for statutory matters.",
  },
  {
    n: "03",
    t: "Liability boundary",
    d: "Registry access and use are subject to the framework's published terms, disclaimers, and jurisdictional limits. Source Standard does not accept liability for decisions made solely on the basis of registry content.",
  },
];

const ClauseList = ({ clauses }: { clauses: Clause[] }) => (
  <ol className="divide-y divide-border/60 border-y border-border/60">
    {clauses.map((c) => (
      <li key={c.n} className="grid grid-cols-12 gap-4 py-6">
        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70 pt-1">
          {c.n}
        </div>
        <div className="col-span-10 md:col-span-11">
          <h3 className="t-body-md font-semibold text-foreground mb-2">{c.t}</h3>
          <p className="t-body-md text-muted-foreground leading-relaxed">{c.d}</p>
        </div>
      </li>
    ))}
  </ol>
);

const SplitSection = ({
  id,
  n,
  title,
  intro,
  children,
}: {
  id: string;
  n: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 section-pad border-b border-border/40">
    <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-32">
          <SectionIndex n={n} />
          <h2 className="t-section-title-sm text-foreground">{title}</h2>
          <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">{intro}</p>
        </div>
      </div>
      <div className="md:col-span-8 mt-8 md:mt-0">{children}</div>
    </div>
  </section>
);

const VerificationDisclaimer = () => {
  const heroDescription =
    "The formal boundaries, jurisdictional limits, and liability framework governing Source Standard determinations.";

  return (
    <>
      <Breadcrumb items={[{ label: "Legal" }, { label: "Verification Disclaimer" }]} />

      <PageMeta title="Verification Disclaimer" description={heroDescription} />

      {/* §1 Hero */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <p className="t-eyebrow-sm text-muted-foreground">Verification Disclaimer</p>
              <h1 className="mt-4 t-page-title text-foreground">Verification Disclaimer</h1>
              <p className="mt-6 t-body-lg text-muted-foreground leading-relaxed">
                {heroDescription}
              </p>
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
                What a Source Standard determination means
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  A Source Standard determination is a public-reference finding based on reviewed records within a defined scope and at a defined point in time.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  This page explains what that determination does and does not establish, the limits of the framework, and the boundaries under which registry information should be interpreted.
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
            {/* §4 Scope */}
            <SplitSection
              id="scope"
              n="01"
              title="Administrative Attestation Scope"
              intro="What a determination is designed to reflect."
            >
              <p className="t-body-md text-muted-foreground leading-relaxed mb-8">
                A Source Standard verification is an attestation of record consistency. It reflects whether an entity's documented sourcing, licenses, and operating records are consistent with its public-facing claims within the declared scope of review.
              </p>
              <ClauseList clauses={SCOPE} />
            </SplitSection>

            {/* §5 Exclusions */}
            <SplitSection
              id="exclusions"
              n="02"
              title="Matters Outside the Scope of Attestation"
              intro="What a determination does not establish."
            >
              <ClauseList clauses={EXCLUSIONS} />
            </SplitSection>

            {/* §6 Boundaries */}
            <SplitSection
              id="boundaries"
              n="03"
              title="Regulatory & Professional Boundaries"
              intro="What Source Standard is not."
            >
              <ClauseList clauses={BOUNDARIES} />
            </SplitSection>

            {/* §7 Liability */}
            <SplitSection
              id="liability"
              n="04"
              title="Limitation of Liability"
              intro="How registry information should be relied upon."
            >
              <ClauseList clauses={LIABILITY} />
            </SplitSection>

            {/* §8 Closing statement */}
            <section className="section-pad border-t border-border/40">
              <div className="max-w-2xl">
                <p className="t-eyebrow-sm text-muted-foreground">Conclusion</p>
                <h2 className="mt-4 t-section-title-sm text-foreground">
                  A determination is a record finding, not a medical guarantee.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The purpose of this disclaimer is to ensure that Source Standard determinations are interpreted within their actual scope. The framework exists to improve public understanding of documented sourcing, not to replace medical judgment, statutory oversight, or individualized clinical decision-making.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Return link */}
      <section className="bg-background">
        <div className="page-shell section-pad">
          <div className="mx-auto w-standard">
            <Link
              to="/education"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 t-utility-xs text-foreground hover:bg-surface-muted hover:text-primary transition-colors"
            >
              ← Return to Resource Library
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerificationDisclaimer;
