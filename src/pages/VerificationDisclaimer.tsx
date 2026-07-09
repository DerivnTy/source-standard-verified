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
    t: "Reviewed information",
    d: "Verification reflects the information considered at the time of review, which may include documentation, sourcing records, public records, and other supporting materials.",
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
    d: "Source Standard does not guarantee product safety, potency, purity, sterility, or future quality.",
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
    d: "Source Standard does not operate an analytical laboratory. Independent testing results, when referenced, come from qualified third-party laboratories.",
  },
  {
    n: "05",
    t: "Not an endorsement organization",
    d: "Verification does not constitute vendor endorsement, product endorsement, treatment recommendation, ranking, or promotional approval.",
  },
  {
    n: "06",
    t: "Not a certifying authority",
    d: "Source Standard assigns statuses under its own framework and is not a government certification body, accreditation organization, or regulatory authority.",
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
    style={{ fontSize: "11px", letterSpacing: "0.12em" }}
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
          fontSize: "12px",
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
          fontSize: "24px",
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
      style={{ fontSize: "15px", lineHeight: 1.7, fontWeight: 400, maxWidth: "68ch" }}
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
        style={{ fontSize: "14px", lineHeight: 1.3 }}
      >
        {title}
      </h3>
      <span
        className="font-mono tabular-nums text-muted-foreground/70 shrink-0 uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
      >
        {index} / {total}
      </span>
    </div>
    <p
      className="text-muted-foreground"
      style={{ fontSize: "13px", lineHeight: 1.7, marginTop: "6px" }}
    >
      {description}
    </p>
  </div>
);

// --- Page ---

const VerificationDisclaimer = () => {
  const heroDescription =
    "The scope and limits of Source Standard verification, public statuses, and public-reference records.";

  return (
    <>
      <Breadcrumb items={[{ label: "Framework" }, { label: "Verification Disclaimer" }]} />

      <PageMeta title="What Verification Does, and Doesn't, Mean" description={heroDescription} />

      {/* Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Verification Disclaimer"
        title="What Verification Does, and Doesn't, Mean"
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
                <h2 className="t-section-title-sm text-foreground">
                  How to interpret this document
                </h2>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Source Standard exists to improve transparency around sourcing claims and the pharmacies, facilities, and manufacturers that vendors rely on within the compounded therapy market.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Verification is an evidence-informed determination made within a defined public review framework.
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Because verification statuses may be viewed by consumers, providers, vendors, and third parties, it is important that the framework be interpreted within its intended scope. This document defines what Source Standard verification establishes, what it does not establish, and the limits under which registry information should be interpreted.
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
                style={{ fontSize: "14px", lineHeight: 1.75, marginBottom: "16px", maxWidth: "62ch" }}
              >
                A Verified status indicates that the information available to Source Standard supported the reviewed sourcing representations within the defined review scope at the time of review.
              </p>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "14px", lineHeight: 1.75, marginBottom: "16px", maxWidth: "62ch" }}
              >
                Verification establishes only the state of reviewed information within that scope. It does not establish facts beyond what was available at the time of review.
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
                style={{ fontSize: "14px", lineHeight: 1.75, marginBottom: "16px", maxWidth: "62ch" }}
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
                  <DisclaimerRow key={c.n} index={c.n} total="06" title={c.t} description={c.d} />
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
                  <p className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.75 }}>
                    Registry records are intended to improve transparency and public understanding.
                  </p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontSize: "14px", lineHeight: 1.75, marginTop: "12px" }}
                  >
                    Users should not rely on Source Standard records as a substitute for medical advice, legal advice, regulatory guidance, or independent due diligence.
                  </p>
                  <div
                    className="text-muted-foreground"
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.75,
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
                intro="Source Standard verification should be interpreted as a transparency determination made within a defined public review framework."
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <DisclaimerCard>
                  <div
                    className="text-muted-foreground"
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.75,
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
                      Its purpose is to improve public visibility into sourcing claims and the pharmacies, facilities, and manufacturers that vendors rely on.
                    </p>
                  </div>
                </DisclaimerCard>
              </div>
            </section>

            {/* §7 Closing */}
            <section style={{ paddingTop: "24px", paddingBottom: "64px" }}>
              <DisclaimerCard>
                <Eyebrow>Claims are not verification</Eyebrow>
                <h2 className="t-section-title-sm text-foreground mt-2">
                  Verification is an evidence determination, not a guarantee.
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "14px", lineHeight: 1.75, marginTop: "16px" }}
                >
                  The purpose of the Source Standard framework is to create a clearer public record around sourcing transparency. Verification reflects reviewed information within a defined scope and should always be interpreted within the limits of that scope.
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
