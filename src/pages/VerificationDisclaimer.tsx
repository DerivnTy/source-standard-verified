import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "establishes", number: "01", label: "What Verification Establishes" },
  { id: "does-not-establish", number: "02", label: "What Verification Does Not Establish" },
  { id: "boundaries", number: "03", label: "Institutional Boundaries" },
  { id: "reliance", number: "04", label: "Reliance on Registry Information" },
  { id: "interpretation", number: "05", label: "Framework Interpretation" },
];

type Clause = { n: string; t: string; d: string };

const ESTABLISHES: Clause[] = [
  {
    n: "01",
    t: "Reviewed evidence",
    d: "Verification reflects the evidence reviewed at the time of determination.",
  },
  {
    n: "02",
    t: "Defined scope",
    d: "Verification applies only to the categories, facilities, relationships, and records included within the published review scope.",
  },
  {
    n: "03",
    t: "Point-in-time determination",
    d: "Verification reflects conditions at the time of review and may change as new information becomes available.",
  },
  {
    n: "04",
    t: "Status-based framework",
    d: "Verification exists within a status framework that allows records to be updated, suspended, revised, or removed when circumstances change.",
  },
];

const DOES_NOT_ESTABLISH: Clause[] = [
  {
    n: "01",
    t: "Product safety",
    d: "Source Standard does not certify product safety, sterility, potency, purity, efficacy, or manufacturing quality.",
  },
  {
    n: "02",
    t: "Clinical outcomes",
    d: "Source Standard does not evaluate treatment effectiveness, patient outcomes, or biological response.",
  },
  {
    n: "03",
    t: "Medical appropriateness",
    d: "Source Standard does not determine whether a therapy, medication, protocol, or provider is appropriate for any individual.",
  },
  {
    n: "04",
    t: "Regulatory compliance",
    d: "Source Standard does not replace or perform the functions of federal, state, medical, pharmacy, or regulatory authorities.",
  },
  {
    n: "05",
    t: "Future performance",
    d: "Verification is not a guarantee of future conduct, future documentation accuracy, future sourcing relationships, or future compliance.",
  },
];

const BOUNDARIES: Clause[] = [
  {
    n: "01",
    t: "Not a regulator",
    d: "Source Standard does not possess governmental or enforcement authority.",
  },
  {
    n: "02",
    t: "Not a medical practice",
    d: "Source Standard does not diagnose, prescribe, dispense, or provide medical care.",
  },
  {
    n: "03",
    t: "Not a pharmacy",
    d: "Source Standard does not compound, manufacture, distribute, or supply medications.",
  },
  {
    n: "04",
    t: "Not a testing laboratory",
    d: "Source Standard does not operate an analytical laboratory and does not represent itself as a laboratory certification body.",
  },
  {
    n: "05",
    t: "Not an endorsement organization",
    d: "Verification does not constitute vendor endorsement, product endorsement, treatment recommendation, ranking, or promotional approval.",
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
    <div className="flex items-baseline" style={{ gap: "12px" }}>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "rgba(0,0,0,0.40)",
        }}
      >
        {index}
      </span>
      <h2
        className="font-sans text-foreground"
        style={{
          fontSize: "28px",
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
      style={{ fontSize: "18px", lineHeight: 1.6, fontWeight: 400, maxWidth: "68ch" }}
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

// --- Page ---

const VerificationDisclaimer = () => {
  const heroDescription =
    "The formal limits of Source Standard verification, status assignments, monitoring activities, and public-reference records.";

  return (
    <>
      <Breadcrumb items={[{ label: "Framework" }, { label: "Verification Disclaimer" }]} />

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
                paddingTop: "36px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <DisclaimerCard>
                <Eyebrow>Purpose of this document</Eyebrow>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Source Standard exists to improve transparency around sourcing claims, supply-chain relationships, facility records, and supporting evidence within the compounded therapy market.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Because verification statuses may be viewed by consumers, providers, vendors, and third parties, it is important that the framework be interpreted within its intended scope.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    This document defines what Source Standard verification establishes, what it does not establish, and the limits under which registry information should be interpreted.
                  </p>
                </div>
              </DisclaimerCard>
            </section>

            {/* §2 What Verification Establishes */}
            <section
              id="establishes"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="01"
                title="What Verification Establishes"
                intro="Verification is an evidence-based determination."
              />
              <p
                className="text-muted-foreground"
                style={{ fontSize: "13.5px", lineHeight: 1.55, marginBottom: "16px", maxWidth: "62ch" }}
              >
                A Verified status indicates that available documentation, sourcing evidence, facility relationships, public records, and supporting materials were sufficient to support the reviewed sourcing representations within the defined review scope at the time of review.
              </p>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "13.5px", lineHeight: 1.55, marginBottom: "16px", maxWidth: "62ch" }}
              >
                Verification establishes only the state of reviewed evidence within that scope. It does not establish facts beyond the evidence available during the review process.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ESTABLISHES.map((c) => (
                  <DisclaimerRow key={c.n} index={c.n} total="04" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §3 What Verification Does Not Establish */}
            <section
              id="does-not-establish"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="02"
                title="What Verification Does Not Establish"
                intro="Verification has defined limits."
              />
              <p
                className="text-muted-foreground"
                style={{ fontSize: "13.5px", lineHeight: 1.55, marginBottom: "16px", maxWidth: "62ch" }}
              >
                Verification does not establish:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {DOES_NOT_ESTABLISH.map((c) => (
                  <DisclaimerRow key={c.n} index={c.n} total="05" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §4 Institutional Boundaries */}
            <section
              id="boundaries"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="03"
                title="Institutional Boundaries"
                intro="What Source Standard is not."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {BOUNDARIES.map((c) => (
                  <DisclaimerRow key={c.n} index={c.n} total="05" title={c.t} description={c.d} />
                ))}
              </div>
            </section>

            {/* §5 Reliance on Registry Information */}
            <section
              id="reliance"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="04"
                title="Reliance on Registry Information"
                intro="The registry is a public-reference system."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <DisclaimerCard>
                  <p className="text-muted-foreground" style={{ fontSize: "13.5px", lineHeight: 1.6 }}>
                    Registry records are intended to improve transparency and public understanding.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "12px" }}
                  >
                    Users should not rely on Source Standard records as a substitute for medical advice, legal advice, regulatory guidance, or independent due diligence.
                  </p>
                  <div
                    className="text-muted-foreground"
                    style={{
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      marginTop: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <p>Medical decisions should be made with licensed healthcare professionals.</p>
                    <p>Legal and regulatory decisions should be made with qualified professionals and appropriate authorities.</p>
                  </div>
                </DisclaimerCard>
              </div>
            </section>

            {/* §6 Framework Interpretation */}
            <section
              id="interpretation"
              className="scroll-mt-24"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                borderBottom: "0.5px solid hsl(var(--border))",
              }}
            >
              <SectionHeader
                index="05"
                title="Framework Interpretation"
                intro="Source Standard verification should be interpreted as an evidence-based transparency determination within a defined scope."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <DisclaimerCard>
                  <div
                    className="text-muted-foreground"
                    style={{
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <p>It is not a certification program.</p>
                    <p>It is not a guarantee program.</p>
                    <p>It is not a regulatory designation.</p>
                    <p>It is not a medical recommendation.</p>
                    <p>
                      Its purpose is to improve public visibility into sourcing claims, facility relationships, supporting evidence, and supply-chain transparency.
                    </p>
                  </div>
                </DisclaimerCard>
              </div>
            </section>

            {/* §7 Closing */}
            <section style={{ paddingTop: "24px", paddingBottom: "64px" }}>
              <DisclaimerCard>
                <Eyebrow>Framework Boundary</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Verification is an evidence determination, not a guarantee.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "13.5px", lineHeight: 1.6, marginTop: "16px" }}
                >
                  The purpose of the Source Standard framework is to create a clearer public record around sourcing transparency. Verification reflects reviewed evidence within a defined scope and should always be interpreted within the limits established by that scope.
                </p>
              </DisclaimerCard>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationDisclaimer;
