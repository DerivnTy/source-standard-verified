import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

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
    d: "Review of business registration, operating identity, vendor type, and related credentials tied to the entity under review.",
  },
  {
    n: "02",
    t: "Public-record consistency",
    d: "Cross-reference of relevant licensing, registration, and public records against available federal and state sources at a fixed point in time.",
  },
  {
    n: "03",
    t: "Upstream sourcing evidence",
    d: "Review of disclosed pharmacy relationships, upstream facility references, and supporting documentation submitted within the review process.",
  },
  {
    n: "04",
    t: "Record basis",
    d: "The registry reflects Source Standard's review of available records and does not replace, supersede, or guarantee the accuracy of the original third-party records on which the review depends.",
  },
];

const EXCLUSIONS: Clause[] = [
  {
    n: "01",
    t: "Clinical outcomes",
    d: "No finding is made regarding the medical result for any individual patient.",
  },
  {
    n: "02",
    t: "Product suitability",
    d: "The framework does not evaluate whether any formulation, therapy, vendor, or protocol is appropriate for a specific person.",
  },
  {
    n: "03",
    t: "Safety and efficacy",
    d: "Source Standard verification does not certify product safety, sterility, potency, quality, treatment effectiveness, or therapeutic efficacy.",
  },
  {
    n: "04",
    t: "Future conduct",
    d: "A published status reflects the records reviewed at a fixed point in time and is not a warranty of future performance, future documentation accuracy, or future regulatory compliance.",
  },
];

const BOUNDARIES: Clause[] = [
  {
    n: "01",
    t: "Not a regulator",
    d: "Source Standard is a private public-reference and verification framework. It does not hold governmental enforcement authority.",
  },
  {
    n: "02",
    t: "Not a clinical practice",
    d: "The organization does not diagnose, prescribe, dispense, treat patients, or practice medicine or pharmacy.",
  },
  {
    n: "03",
    t: "Not a manufacturer",
    d: "Source Standard does not compound, repackage, distribute, handle, store, or supply pharmaceutical products.",
  },
  {
    n: "04",
    t: "Not a guarantor",
    d: "Verified status is a documentation-based registry status. It is not a warranty, indemnity, insurance-like guarantee, product approval, vendor approval, or clinical recommendation.",
  },
];

const LIABILITY: Clause[] = [
  {
    n: "01",
    t: "User discretion",
    d: "The registry is a public reference tool. Reliance on any published status or registry record is at the user's discretion.",
  },
  {
    n: "02",
    t: "Professional consultation",
    d: "Users should consult licensed clinicians for medical matters and appropriate regulatory authorities for regulatory or legal matters.",
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
    "The formal boundaries, jurisdictional limits, and liability framework governing Source Standard verification status and registry records.";

  return (
    <>
      <Breadcrumb items={[{ label: "Legal" }, { label: "Verification Disclaimer" }]} />

      <PageMeta title="Verification Disclaimer" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Verification Disclaimer"
        title="Verification Disclaimer"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">
                What Source Standard verification means
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Source Standard verification is a public-reference finding based on reviewed records within a defined scope and at a defined point in time.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  This page explains what verification status does and does not establish, the limits of the framework, and the boundaries under which registry information should be interpreted.
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
              title="Record Review Scope"
              intro="What verification status is designed to reflect."
            >
              <p className="t-body-md text-muted-foreground leading-relaxed mb-8">
                Source Standard verification reflects whether a vendor's submitted documentation, pharmacy relationship evidence, public records, and operating information support its stated sourcing claim within the declared review scope.
              </p>
              <ClauseList clauses={SCOPE} />
            </SplitSection>

            {/* §5 Exclusions */}
            <SplitSection
              id="exclusions"
              n="02"
              title="Matters Outside the Review Scope"
              intro="What verification status does not establish."
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
                <h2 className="t-section-title-sm text-foreground">
                  Verification is a record review, not a medical guarantee.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The purpose of this disclaimer is to ensure that Source Standard verification status is interpreted within its actual scope. The framework exists to improve public understanding of documented sourcing claims, not to replace medical judgment, regulatory oversight, or individualized clinical decision-making.
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
