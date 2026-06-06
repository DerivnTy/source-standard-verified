import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { advisoryBoard } from "@/data/advisoryBoard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";

// Local governance primitives — white panel + numbered/structured row.
// Mirrors the homepage public-reference card system.
const GovCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div
    className={`bg-card ${className}`}
    style={{ border: "0.5px solid hsl(var(--border))", borderRadius: "12px", padding: "24px" }}
  >
    {children}
  </div>
);

const GovRow = ({
  index,
  title,
  description,
  compact = false,
}: {
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  compact?: boolean;
}) => (
  <div
    className="bg-card"
    style={{
      border: "0.5px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: compact ? "12px 16px" : "16px 18px",
    }}
  >
    <div className="grid grid-cols-12 gap-3 items-baseline">
      {index !== undefined && (
        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70">
          {index}
        </div>
      )}
      <div className={index !== undefined ? "col-span-10 md:col-span-11" : "col-span-12"}>
        <p className="t-body-sm font-semibold text-foreground leading-snug">{title}</p>
        {description && (
          <p className="mt-1.5 t-body-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  </div>
);

const WAYPOINTS = [
  { id: "transparency", number: "01", label: "Mandate" },
  { id: "verification-chain", number: "02", label: "Governance" },
  { id: "members", number: "03", label: "Structure" },
  { id: "scope", number: "04", label: "Scope" },
  { id: "responsibilities", number: "05", label: "Responsibilities" },
];

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

const BOARD_TITLE_OVERRIDES: Record<string, string> = {
  "advisor-01": "Chair · Clinical Audit Standards",
  "advisor-02": "Vice Chair · Pharmacy Sourcing Review",
  "advisor-03": "Member · Patient Safety & Public Clarity",
  "advisor-04": "Member · Pharmacy Compliance (USP Standards)",
  "advisor-05": "Member · Medical Reference Review",
  "advisor-06": "Member · Regulatory Policy & Ethics",
};

const RESPONSIBILITY_OVERRIDES: Record<string, { title: string; description: string }> = {
  "R-01": {
    title: "Standards review",
    description: "Reviews framework standards, evidence categories, review boundaries, and governance procedures.",
  },
  "R-02": {
    title: "Documentation criteria",
    description: "Provides advisory input regarding documentation requirements, sourcing evidence standards, and public-record evaluation criteria.",
  },
  "R-03": {
    title: "Regulatory awareness",
    description: "Supports periodic review of terminology and framework materials as regulatory environments and industry practices evolve.",
  },
  "R-04": {
    title: "Educational review",
    description: "Reviews public-reference materials for accuracy, neutrality, clarity, and appropriate scope.",
  },
};
const RESPONSIBILITY_ORDER = ["R-01", "R-02", "R-03", "R-04"];

const MANDATE_CLAUSES = [
  {
    n: "01",
    t: "Framework independence",
    d: "Supports the neutrality and procedural integrity of the Source Standard framework independent of vendor, pharmacy, or commercial interests.",
  },
  {
    n: "02",
    t: "Evidence-based standards",
    d: "Advises on documentation requirements, evidence categories, review criteria, and public-reference standards used throughout the registry.",
  },
  {
    n: "03",
    t: "Periodic review",
    d: "Participates in ongoing review of terminology, review boundaries, governance procedures, and public-facing educational materials.",
  },
  {
    n: "04",
    t: "Objective separation",
    d: "Maintains separation from vendor sales, marketing activity, promotional relationships, and individual status determinations.",
  },
];

const ROLE_FUNCTIONS = [
  {
    n: "01",
    t: "Review boundaries",
    d: "Provides advisory input regarding what Source Standard evaluates, what falls outside the framework, and how those distinctions are communicated publicly.",
  },
  {
    n: "02",
    t: "Evidence standards",
    d: "Reviews the documentation categories and evidence requirements used during sourcing-claim evaluation and registry review.",
  },
  {
    n: "03",
    t: "Framework maintenance",
    d: "Supports periodic updates to terminology, standards, educational materials, and procedural documentation as industry conditions evolve.",
  },
  {
    n: "04",
    t: "Public-reference integrity",
    d: "Helps ensure that public-facing materials remain accurate, appropriately scoped, and consistent with the framework's stated purpose.",
  },
];

const BOUNDARIES = [
  "Supports the standards behind public status determinations.",
  "Does not evaluate, diagnose, or treat patients.",
  "Does not provide individualized medical, pharmacy, or legal advice.",
  "Does not approve vendors, manufacturers, pharmacies, or products.",
  "Does not make individual vendor status determinations.",
  "Does not participate in marketing, promotion, or commercial endorsement activity.",
];

const MedicalAdvisory = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "About", to: "/about" },
          { label: "Medical Advisory" },
        ]}
      />

      <PageMeta
        title="Clinical Oversight · Source Standard"
        description="Independent medical, pharmacy, legal, and procedural advisors supporting the integrity, neutrality, and evidentiary standards of the Source Standard framework."
      />

      {/* §1 Hero — restrained */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Medical Advisory Board"
        title="Clinical Oversight"
        statement="Independent medical, pharmacy, legal, and procedural advisors supporting the integrity, neutrality, and evidentiary standards of the Source Standard framework."
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40" style={{ paddingTop: "36px", paddingBottom: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <div>
              <GovCard>
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground/70">Purpose</p>
                <h2 className="mt-2 t-section-title-sm text-foreground">Why Clinical Oversight exists</h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    Source Standard operates within a complex environment involving healthcare providers, pharmacies, manufacturers, regulators, and consumers. Maintaining public trust requires clear boundaries, consistent standards, and independent review of the framework itself.
                  </p>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    Clinical Oversight exists to support the integrity of the standards behind the registry. It provides independent advisory input on framework design, evidence categories, review procedures, public language, and governance practices used throughout the system.
                  </p>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    Its responsibility is not to determine which vendors succeed or fail. Its responsibility is to help ensure that the framework itself remains consistent, neutral, and evidence-driven.
                  </p>
                </div>
              </GovCard>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">

            {/* §4 Institutional Mandate */}
            <section id="transparency" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="01" />
                    <h2 className="t-section-title-sm text-foreground">
                      Institutional Mandate
                    </h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      The operating principles governing Clinical Oversight.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ul className="space-y-3">
                    {MANDATE_CLAUSES.map((c) => (
                      <li key={c.n}>
                        <GovRow index={c.n} title={c.t} description={c.d} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* §5 Governance Framework */}
            <section id="verification-chain" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="02" />
                    <h2 className="t-section-title-sm text-foreground">
                      Governance Functions
                    </h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      How Clinical Oversight supports the framework.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ul className="space-y-3">
                    {ROLE_FUNCTIONS.map((s) => (
                      <li key={s.n}>
                        <GovRow index={s.n} title={s.t} description={s.d} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* §6 Members */}
            <section id="members" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <SectionIndex n="03" />
              <div className="mb-8 max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Advisory Structure
                </h2>
                <div className="mt-4 flex flex-col" style={{ gap: "12px" }}>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    Clinical Oversight may include physicians, pharmacists, legal professionals, compliance specialists, regulatory advisors, and subject-matter experts whose expertise supports the framework.
                  </p>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    Appointments are made based on relevant experience, professional standing, and alignment with the framework's independence requirements.
                  </p>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    All advisory participation exists to support standards development, governance review, and public-reference integrity.
                  </p>
                </div>
              </div>

              <ul className="grid md:grid-cols-2 gap-4">
                {advisoryBoard.map((m) => {
                  const boardTitle = BOARD_TITLE_OVERRIDES[m.slug] ?? m.boardTitle;
                  return (
                    <li
                      key={m.slug}
                      className="flex flex-col text-left rounded-[2px] border border-white/10 bg-[#112240] p-6"
                    >
                      <div className="flex flex-col items-start text-left gap-4 pb-4 mb-4 border-b border-white/10">
                        <img
                          src={m.photo}
                          alt={`Portrait of ${m.name}`}
                          loading="eager"
                          decoding="async"
                          width={96}
                          height={96}
                          className="h-16 w-16 rounded-[2px] object-cover border border-white/15 shrink-0 aspect-square"
                        />
                        <div className="w-full min-w-0 text-left">
                          <h3 className="t-body-md font-semibold tracking-tight text-white leading-snug text-left">
                            {m.name}
                            <span className="text-white/70 font-normal">, {m.credentials}</span>
                          </h3>
                          <p className="mt-2 t-body-sm font-semibold text-white text-left">{boardTitle}</p>
                          <p className="mt-1 t-utility-xs text-white/70 text-left">{m.specialization}</p>
                          <p className="mt-1.5 t-utility-xs text-white/70 text-left">
                            {m.jurisdiction} · {m.yearsPracticing} practicing
                          </p>
                        </div>
                      </div>

                      <p className="t-body-sm text-white/85 flex-1 text-left leading-relaxed">{m.shortSummary}</p>

                      <div className="mt-4 flex justify-start">
                        <Link
                          to={`/medical-advisory/${m.slug}`}
                          className="t-body-sm text-white hover:text-white/80 transition-colors underline-offset-4 hover:underline"
                        >
                          View profile →
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* §7 Scope & boundaries */}
            <section id="scope" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <SectionIndex n="04" />
              <div className="max-w-2xl mb-6">
                <h2 className="t-section-title-sm text-foreground">
                  Scope & boundaries
                </h2>
              </div>
              <ul className="space-y-2 max-w-3xl">
                {BOUNDARIES.map((b, i) => (
                  <li key={b}>
                    <GovRow
                      compact
                      index={String(i + 1).padStart(2, "0")}
                      title={<span className="font-normal text-foreground">{b}</span>}
                    />
                  </li>
                ))}
              </ul>
            </section>

            {/* §8 Responsibilities */}
            <section id="responsibilities" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <SectionIndex n="05" />
              <div className="mb-6 max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Responsibilities
                </h2>
                <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
                  Each responsibility maps to a recurring advisory activity recorded under Source Standard's framework maintenance process.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {RESPONSIBILITY_ORDER.map((code) => {
                  const o = RESPONSIBILITY_OVERRIDES[code];
                  if (!o) return null;
                  return (
                    <li key={code}>
                      <GovRow index={code} title={o.title} description={o.description} />
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* §9 Closing statement */}
            <section style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <div className="max-w-2xl">
                <GovCard>
                  <h2 className="t-section-title-sm text-foreground">
                    Public trust requires disciplined oversight.
                  </h2>
                  <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
                    The Advisory Board exists to preserve neutrality, clinical seriousness, and evidentiary restraint within the Source Standard framework. Its role is to support the standards behind the registry, not to promote vendors, recommend treatment, or replace regulatory review.
                  </p>
                </GovCard>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalAdvisory;
