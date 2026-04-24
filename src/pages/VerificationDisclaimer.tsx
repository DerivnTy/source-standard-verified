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

// --- Local primitives ---

const cardChrome = {
  backgroundColor: "hsl(var(--card))",
  border: "0.5px solid hsl(var(--border))",
  borderRadius: "12px",
} as const;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-mono uppercase text-muted-foreground"
    style={{ fontSize: "10px", letterSpacing: "0.14em" }}
  >
    {children}
  </p>
);

const SectionHeader = ({
  index,
  title,
  intro,
}: {
  index: string;
  title: string;
  intro: string;
}) => (
  <div className="mb-5">
    <p className="font-mono tabular-nums text-muted-foreground/60" style={{ fontSize: "11px" }}>
      {index}
    </p>
    <h2 className="t-section-title-sm text-foreground mt-1">{title}</h2>
    <p
      className="mt-2 text-muted-foreground"
      style={{ fontSize: "13.5px", lineHeight: 1.55, maxWidth: "62ch" }}
    >
      {intro}
    </p>
  </div>
);

const DisclaimerCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...cardChrome, padding: "24px" }}>{children}</div>
);

const DisclaimerRow = ({
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
  <div style={{ ...cardChrome, padding: "14px 16px" }}>
    <div className="flex items-baseline justify-between gap-4">
      <h3
        className="font-sans font-semibold text-foreground min-w-0"
        style={{ fontSize: "14px", lineHeight: 1.4 }}
      >
        {title}
      </h3>
      <span
        className="font-mono tabular-nums text-muted-foreground/70 shrink-0 uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.06em" }}
      >
        {index} / {total}
      </span>
    </div>
    <p
      className="text-muted-foreground"
      style={{ fontSize: "13px", lineHeight: 1.55, marginTop: "6px" }}
    >
      {description}
    </p>
  </div>
);

const ReturnLinkRow = ({ to, label }: { to: string; label: string }) => (
  <Link
    to={to}
    className="group block hover:bg-surface-muted/40 transition-colors"
    style={{ ...cardChrome, padding: "14px 16px", marginTop: "16px" }}
  >
    <span
      className="inline-flex items-center gap-2 font-sans font-semibold uppercase text-primary"
      style={{ fontSize: "11px", letterSpacing: "0.08em" }}
    >
      <span aria-hidden>←</span>
      {label}
    </span>
  </Link>
);

// --- Page ---

const VerificationDisclaimer = () => {
  const heroDescription =
    "The formal boundaries, jurisdictional limits, and liability framework governing Source Standard determinations.";

  return (
    <>
      <Breadcrumb items={[{ label: "Legal" }, { label: "Verification Disclaimer" }]} />

      <PageMeta title="Verification Disclaimer" description={heroDescription} />

      {/* Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Verification Disclaimer"
        title="Verification Disclaimer"
        statement={heroDescription}
        docId=""
      />

      {/* Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">
            {/* §1 Purpose */}
            <section
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <DisclaimerCard>
                <Eyebrow>Verification Scope</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  What Source Standard verification means
                </h2>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Source Standard verification is a public-reference finding based on reviewed records within a defined scope and at a defined point in time.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    This page explains what verification status does and does not establish, the limits of the framework, and the boundaries under which registry information should be interpreted.
                  </p>
                </div>
              </DisclaimerCard>
            </section>

            {/* §2 Record Review Scope */}
            <section
              id="scope"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="01"
                title="Record Review Scope"
                intro="What verification status is designed to reflect."
              />
              <p
                className="text-muted-foreground"
                style={{ fontSize: "13.5px", lineHeight: 1.55, marginBottom: "16px", maxWidth: "62ch" }}
              >
                Source Standard verification reflects whether a vendor's submitted documentation, pharmacy relationship evidence, public records, and operating information support its stated sourcing claim within the declared review scope.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {SCOPE.map((c) => (
                  <DisclaimerRow key={c.n} index={c.n} total="04" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §3 Matters Outside the Review Scope */}
            <section
              id="exclusions"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="02"
                title="Matters Outside the Review Scope"
                intro="What verification status does not establish."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {EXCLUSIONS.map((c) => (
                  <DisclaimerRow key={c.n} index={c.n} total="04" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §4 Regulatory & Professional Boundaries */}
            <section
              id="boundaries"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="03"
                title="Regulatory & Professional Boundaries"
                intro="What Source Standard is not."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {BOUNDARIES.map((c) => (
                  <DisclaimerRow key={c.n} index={c.n} total="04" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §5 Limitation of Liability */}
            <section
              id="liability"
              className="scroll-mt-24"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="04"
                title="Limitation of Liability"
                intro="How registry information should be relied upon."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {LIABILITY.map((c) => (
                  <DisclaimerRow key={c.n} index={c.n} total="03" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §6 Closing */}
            <section style={{ paddingTop: "40px", paddingBottom: "64px" }}>
              <DisclaimerCard>
                <Eyebrow>Record Review</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Verification is a record review, not a medical guarantee.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "16px" }}
                >
                  The purpose of this disclaimer is to ensure that Source Standard verification status is interpreted within its actual scope. The framework exists to improve public understanding of documented sourcing claims, not to replace medical judgment, regulatory oversight, or individualized clinical decision-making.
                </p>
              </DisclaimerCard>
              <ReturnLinkRow to="/education" label="Return to Resource Library" />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationDisclaimer;
