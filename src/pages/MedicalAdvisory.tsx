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
  { id: "members", number: "03", label: "Members" },
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
    description: "Reviews framework standards, review boundaries, and evidence categories used in documentation-based status assignment.",
  },
  "R-02": {
    title: "Upstream criteria",
    description: "Provides advisory input on the criteria used to classify 503A and 503B facilities as upstream reference records.",
  },
  "R-04": {
    title: "Regulatory awareness",
    description: "Supports review of public terminology and documentation boundaries as FDA, state board, and pharmacy practice standards evolve.",
  },
  "R-05": {
    title: "Education review",
    description: "Reviews educational materials for clinical accuracy, neutral language, and appropriate scope.",
  },
};
const RESPONSIBILITY_ORDER = ["R-01", "R-02", "R-04", "R-05"];

const MANDATE_CLAUSES = [
  {
    n: "01",
    t: "Independent advisory oversight.",
    d: "The Advisory Board provides clinical, pharmacy, legal, and procedural input on the Source Standard verification framework.",
  },
  {
    n: "02",
    t: "Documentation-based standards.",
    d: "Status determinations are based on submitted documentation, public records, pharmacy relationship evidence, and defined review criteria.",
  },
  {
    n: "03",
    t: "Periodic review.",
    d: "The Board supports periodic review of standards, terminology, evidence thresholds, and educational materials.",
  },
  {
    n: "04",
    t: "Objective distance.",
    d: "Board members do not participate in vendor sales, promotional activity, or individual vendor status decisions.",
  },
];

const ROLE_FUNCTIONS = [
  {
    n: "01",
    t: "Review boundaries",
    d: "Defining what Source Standard reviews, what it does not review, and how those limits are communicated publicly.",
  },
  {
    n: "02",
    t: "Upstream reference criteria",
    d: "Providing advisory input on the criteria used to classify upstream compounding facilities within the registry.",
  },
  {
    n: "03",
    t: "Documentation standards",
    d: "Reviewing the evidence categories used in sourcing-claim evaluation, including pharmacy relationship records, chain-of-custody documentation, and public records.",
  },
  {
    n: "04",
    t: "Protocol maintenance",
    d: "Supporting updates to Source Standard terminology, public explanations, and review boundaries as regulatory and documentation practices evolve.",
  },
];

const BOUNDARIES = [
  "The Board supports the standards behind public determinations.",
  "The Board does not evaluate or treat patients.",
  "The Board does not provide individualized medical advice through Source Standard.",
  "The Board does not approve vendors, clinics, pharmacies, or products.",
  "The Board does not make individual vendor status determinations.",
  "The Board does not participate in sales, marketing, or promotional activity.",
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
        description="Independent medical, pharmacy, and legal advisors supporting the integrity of the Source Standard framework. The Board reviews standards, terminology, evidence boundaries, and public-facing education."
      />

      {/* §1 Hero — restrained */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Medical Advisory Board"
        title="Clinical Oversight"
        statement="Independent medical, pharmacy, and legal advisors supporting the integrity of the Source Standard framework. The Board reviews standards, terminology, evidence boundaries, and public-facing education. It does not treat patients, market vendors, approve clinics, or participate in promotional activity."
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">Why the Board exists</h2>
              <div className="mt-6 space-y-4">
                <p className="t-body-sm text-muted-foreground leading-relaxed">
                  The Advisory Board exists to support the neutrality, clinical restraint, and procedural discipline of the Source Standard framework.
                </p>
                <p className="t-body-sm text-muted-foreground leading-relaxed">
                  Its role is to provide advisory input on review standards, documentation boundaries, public language, and education materials used across the registry.
                </p>
                <p className="t-body-sm text-muted-foreground leading-relaxed">
                  The Board does not represent vendors, compound distributors, medical clinics, or pharmacy partners. It does not make individual vendor status determinations. It serves as an independent advisory layer for the standards behind the public reference system.
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

            {/* §4 Institutional Mandate */}
            <section id="transparency" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="01" />
                    <h2 className="t-section-title-sm text-foreground">
                      Institutional Mandate
                    </h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      The operating boundaries under which the Board supports the framework.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ol className="divide-y divide-border/60">
                    {MANDATE_CLAUSES.map((c) => (
                      <li key={c.n} className="grid grid-cols-12 gap-4 py-4 first:pt-0 last:pb-0 items-baseline">
                        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70">{c.n}</div>
                        <div className="col-span-10 md:col-span-11">
                          <p className="t-body-sm font-semibold text-foreground">{c.t}</p>
                          <p className="mt-1.5 t-body-sm text-muted-foreground leading-relaxed">{c.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* §5 Governance Framework */}
            <section id="verification-chain" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="02" />
                    <h2 className="t-section-title-sm text-foreground">
                      Governance Framework
                    </h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      The recurring advisory functions used to preserve consistency across the framework.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ol className="divide-y divide-border/60">
                    {ROLE_FUNCTIONS.map((s) => (
                      <li key={s.n} className="grid grid-cols-12 gap-4 py-4 first:pt-0 last:pb-0 items-baseline">
                        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70">{s.n}</div>
                        <div className="col-span-10 md:col-span-11">
                          <p className="t-body-sm font-semibold text-foreground">{s.t}</p>
                          <p className="mt-1.5 t-body-sm text-muted-foreground leading-relaxed">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* §6 Members */}
            <section id="members" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <SectionIndex n="03" />
              <div className="mb-8 max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Appointed members
                </h2>
                <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
                  Independent clinicians, pharmacy reviewers, and legal advisors appointed to support framework standards, documentation boundaries, and public-reference integrity.
                </p>
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
            <section id="scope" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <SectionIndex n="04" />
              <div className="max-w-2xl mb-6">
                <h2 className="t-section-title-sm text-foreground">
                  Scope & boundaries
                </h2>
              </div>
              <ul className="divide-y divide-border/60 border-y border-border/60 max-w-3xl">
                {BOUNDARIES.map((b) => (
                  <li key={b} className="py-4 t-body-sm text-foreground">
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* §8 Responsibilities */}
            <section id="responsibilities" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <SectionIndex n="05" />
              <div className="mb-8 max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Responsibilities
                </h2>
                <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
                  Each responsibility maps to a recurring advisory activity recorded under Source Standard's framework maintenance process.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {RESPONSIBILITY_ORDER.map((code) => {
                  const o = RESPONSIBILITY_OVERRIDES[code];
                  if (!o) return null;
                  return (
                    <li key={code}>
                      <p className="t-body-sm font-semibold text-foreground">{o.title}</p>
                      <p className="mt-2 t-body-sm text-muted-foreground leading-relaxed">{o.description}</p>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* §9 Closing statement */}
            <section style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <div className="max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Public trust requires disciplined oversight.
                </h2>
                <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
                  The Advisory Board exists to preserve neutrality, clinical seriousness, and evidentiary restraint within the Source Standard framework. Its role is to support the standards behind the registry, not to promote vendors, recommend treatment, or replace regulatory review.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalAdvisory;
