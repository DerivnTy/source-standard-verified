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
    t: "Sourcing-claim review",
    d: "Review of the vendor's stated sourcing relationships to determine whether the available documentation supports the public claim.",
  },
  {
    n: "02",
    t: "Pharmacy record cross-reference",
    d: "Cross-reference of cited 503A and 503B pharmacy relationships against public registration records, state licensure records, and related public filings where applicable.",
  },
  {
    n: "03",
    t: "Chain-of-custody review",
    d: "Review of invoices, lot references, distribution records, and related documentation to determine whether the available record supports a documented sourcing trail.",
  },
  {
    n: "04",
    t: "Entity and identity review",
    d: "Review of vendor identity, operating entity, location data, and related records to reduce inconsistency between public claims and submitted documentation.",
  },
];

const SURVEILLANCE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Record maintenance",
    d: "Published records may be reviewed periodically to determine whether licensing data, pharmacy relationships, and documentation remain consistent with the current status.",
  },
  {
    n: "02",
    t: "Public-record monitoring",
    d: "Source Standard may monitor relevant public records, enforcement notices, licensure changes, and administrative updates where applicable.",
  },
  {
    n: "03",
    t: "Evidence reconciliation",
    d: "New information may be compared against the existing vendor record to determine whether a status update, additional review, or limitation statement is required.",
  },
  {
    n: "04",
    t: "Status response",
    d: "Where material documentation gaps or unresolved inconsistencies are identified, registry status may be updated according to Source Standard status definitions.",
  },
];

const DISCLOSURE_CLAUSES: Clause[] = [
  {
    n: "01",
    t: "Change notification",
    d: "Vendors are expected to disclose material sourcing, ownership, pharmacy relationship, or operating changes that could affect the accuracy of a published record.",
  },
  {
    n: "02",
    t: "Documentation updates",
    d: "Updated documentation may be required when a vendor changes a pharmacy relationship, adds a therapy category, or expands the scope of a public sourcing claim.",
  },
  {
    n: "03",
    t: "Review continuity",
    d: "Published records may be reviewed to determine whether underlying licenses, pharmacy relationships, and documentation remain consistent with the stated status.",
  },
  {
    n: "04",
    t: "Status adjustment",
    d: "Where disclosure failures, expired documentation, or material inconsistencies are identified, registry status may be updated to reflect the current state of the record.",
  },
];

const BOUNDARIES = [
  "The framework reviews whether sourcing documentation and related records support the stated public claim within the reviewed scope.",
  "It does not provide clinical recommendations or individualized medical advice.",
  "It does not verify medical outcomes, treatment effectiveness, or biological response.",
  "It does not certify product safety, potency, sterility, or quality.",
  "It does not replace federal or state regulatory authority.",
  "It does not approve, recommend, or rank vendors.",
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
    "An independent review framework for compounded therapy vendor sourcing claims, pharmacy relationship evidence, submitted documentation, and public-record consistency.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification" }]} />

      <PageMeta title="Verification Protocol · Source Standard" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Verification Framework"
        title="The Verification Protocol"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">
                What this protocol is designed to do
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  The Verification Protocol defines how Source Standard reviews whether a vendor's public sourcing claims are supported by submitted documentation, pharmacy relationship evidence, licensure records, and related operating records.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  It is a framework for documentation review and public-reference consistency. It is not a guarantee of product safety, treatment effectiveness, clinical quality, or regulatory compliance.
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
            {/* §4 Documentation Review */}
            <SplitSection
              id="audit"
              n="01"
              title="Documentation Review"
              intro="How sourcing claims are reviewed against submitted and public records."
              clauses={AUDIT_CLAUSES}
              firstSection
            />

            {/* §5 Ongoing Monitoring */}
            <SplitSection
              id="surveillance"
              n="02"
              title="Ongoing Monitoring"
              intro="How the framework reviews changes after initial documentation review."
              clauses={SURVEILLANCE_CLAUSES}
            />

            {/* §6 Disclosure */}
            <SplitSection
              id="disclosure"
              n="03"
              title="Disclosure"
              intro="How vendor changes are expected to be reported and reflected."
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
