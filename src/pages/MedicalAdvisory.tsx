import { ReactNode } from "react";
import { PageMeta } from "@/components/PageMeta";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
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
    style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: compact ? "14px" : "18px",
      padding: compact ? "14px 16px" : "24px",
    }}
  >
    <div className="flex items-start justify-between" style={{ gap: compact ? "12px" : "16px" }}>
      <p
        className="font-sans text-foreground"
        style={{
          fontSize: compact ? "14px" : "16px",
          fontWeight: compact ? 400 : 600,
          lineHeight: compact ? 1.5 : 1.3,
          letterSpacing: compact ? 0 : "-0.01em",
          margin: 0,
        }}
      >
        {title}
      </p>
      {index !== undefined && (
        <span
          className="font-mono tabular-nums shrink-0"
          style={{
            fontSize: compact ? "10px" : "12px",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "0.06em",
            color: "rgba(0,0,0,0.38)",
            whiteSpace: "nowrap",
            paddingTop: compact ? "3px" : "2px",
          }}
        >
          {index}
        </span>
      )}
    </div>
    {description && (
      <p
        className="text-muted-foreground"
        style={{
          marginTop: compact ? "6px" : "12px",
          fontSize: compact ? "13px" : "14px",
          fontWeight: 400,
          lineHeight: compact ? 1.5 : 1.75,
        }}
      >
        {description}
      </p>
    )}
  </div>
);

const SectionHeadingInline = ({ n, title }: { n: string; title: React.ReactNode }) => (
  <div className="flex items-baseline" style={{ gap: "12px" }}>
    <span
      className="font-mono tabular-nums shrink-0"
      style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.04em", color: "rgba(0,0,0,0.40)" }}
    >
      {n}
    </span>
    <h2
      className="font-sans text-foreground"
      style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0A0A0A" }}
    >
      {title}
    </h2>
  </div>
);

const WAYPOINTS = [
  { id: "transparency", number: "01", label: "Mandate" },
  { id: "verification-chain", number: "02", label: "Governance" },
  { id: "members", number: "03", label: "Structure" },
  { id: "scope", number: "04", label: "Scope" },
  { id: "responsibilities", number: "05", label: "Responsibilities" },
];


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
    title: "Framework consistency",
    description: "Supports consistent application of standards and principles across the Source Standard registry and public-reference materials.",
  },
  "R-02": {
    title: "Independent oversight",
    description: "Provides independent perspective to help maintain the objectivity and integrity of the framework.",
  },
  "R-03": {
    title: "Public standards",
    description: "Promotes clear, accessible standards that support public understanding of the framework.",
  },
  "R-04": {
    title: "Educational review",
    description: "Reviews public-reference materials for clarity, accuracy, and appropriate scope.",
  },
};
const RESPONSIBILITY_ORDER = ["R-01", "R-02", "R-03", "R-04"];

const MANDATE_CLAUSES = [
  {
    n: "01",
    t: "Independence",
    d: "Helps maintain the independence of the Source Standard framework from vendor, pharmacy, or commercial interests.",
  },
  {
    n: "02",
    t: "Consistency",
    d: "Supports consistent application of standards across the registry and public-reference materials.",
  },
  {
    n: "03",
    t: "Objectivity",
    d: "Promotes objective evaluation of framework boundaries, scope, and stated purpose.",
  },
  {
    n: "04",
    t: "Public Trust",
    d: "Supports public confidence by helping keep the framework independent, consistent, and appropriately scoped.",
  },
];

const ROLE_FUNCTIONS = [
  {
    n: "01",
    t: "Framework Guidance",
    d: "Provides independent perspective on the structure, scope, and public communication of the Source Standard framework.",
  },
  {
    n: "02",
    t: "Standards Consistency",
    d: "Supports the consistent application of framework principles across registry materials and public-reference content.",
  },
  {
    n: "03",
    t: "Public Clarity",
    d: "Helps ensure that public-facing language remains clear, accurate, and aligned with the framework's purpose.",
  },
  {
    n: "04",
    t: "Independent Perspective",
    d: "Offers independent review of framework boundaries, standards, and educational materials.",
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

      {/* §2 Contents nav */}
      <SectionAnchorNav waypoints={WAYPOINTS} />

      {/* §3 Statement of purpose */}
      <section className="bg-background border-b border-border/40" style={{ paddingTop: "36px", paddingBottom: "24px" }}>
        <div className="page-shell">
          <div className="mx-auto w-standard">
            <div>
              <GovCard>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground/70">Purpose</p>
                <h2 className="mt-2 t-section-title-sm text-foreground">Why Clinical Oversight exists</h2>
                <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    Source Standard operates within a complex environment involving healthcare providers, pharmacies, manufacturers, regulators, and consumers. Maintaining public trust requires clear boundaries, consistent standards, and independent review of the framework itself.
                  </p>
                  <p className="t-body-sm text-muted-foreground leading-relaxed">
                    Clinical Oversight exists to support the integrity of the standards behind the registry. It provides independent advisory guidance to help maintain independence, consistency, and public trust in the framework.
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

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">

            {/* §4 Institutional Mandate */}
            <section id="transparency" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionHeadingInline n="01" title={<>Institutional Mandate</>} />
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
                    <SectionHeadingInline n="02" title={<>Governance Functions</>} />
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
              <div className="mb-8 max-w-2xl">
                <SectionHeadingInline n="03" title="Advisory Structure" />
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
                {[
                  { role: "Medical Advisor", focus: "Clinical Audit Standards" },
                  { role: "Pharmacy Advisor", focus: "Pharmacy Sourcing Review" },
                  { role: "Clinical Advisor", focus: "Patient Safety & Public Clarity" },
                  { role: "Legal Advisor", focus: "Regulatory Policy & Ethics" },
                ].map((p, i) => (
                  <li
                    key={i}
                    className="flex flex-col text-left rounded-[2px] border border-white/10 bg-[#112240] p-6"
                  >
                    <div className="flex flex-col items-start text-left gap-4 pb-4 mb-4 border-b border-white/10">
                      <div
                        aria-hidden="true"
                        className="h-16 w-16 rounded-[2px] border border-white/15 shrink-0 aspect-square overflow-hidden bg-white/5"
                      >
                        <div
                          className="h-full w-full"
                          style={{
                            filter: "blur(16px)",
                            background:
                              "linear-gradient(135deg, hsl(var(--muted) / 0.6), hsl(var(--primary) / 0.35))",
                          }}
                        />
                      </div>
                      <div className="w-full min-w-0 text-left">
                        <h3 className="t-body-md font-semibold tracking-tight text-white leading-snug text-left">
                          To Be Announced
                        </h3>
                        <p className="mt-2 t-body-sm font-semibold text-white text-left">{p.role}</p>
                        <p className="mt-1 t-utility-xs text-white/70 text-left">{p.focus}</p>
                      </div>
                    </div>

                    <p className="t-body-sm text-white/60 flex-1 text-left leading-relaxed italic">
                      Advisor profile, credentials, and biography will be published upon formal appointment.
                    </p>

                    <div className="mt-4 flex justify-start">
                      <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] border border-white/15 bg-white/5 t-utility-xs uppercase tracking-wider text-white/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                        Appointment To Be Announced
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* §7 Scope & boundaries */}
            <section id="scope" className="scroll-mt-24 border-b border-border/40" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <div className="max-w-2xl mb-6">
                <SectionHeadingInline n="04" title="Scope & Boundaries" />
                <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
                  What Clinical Oversight does and does not do.
                </p>
              </div>
              <ul className="space-y-2">
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
              <div className="mb-6 max-w-2xl">
                <SectionHeadingInline n="05" title="Core Responsibilities" />
                <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
                  The recurring functions supporting framework integrity.
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
              <div>
                <GovCard>
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground/70">Institutional Integrity</p>
                  <h2 className="mt-2 t-section-title-sm text-foreground">
                    Public trust requires independent oversight.
                  </h2>
                  <div className="mt-4 flex flex-col" style={{ gap: "14px" }}>
                    <p className="t-body-sm text-muted-foreground leading-relaxed">
                      Clinical Oversight exists to strengthen the integrity and independence of the Source Standard framework. Its purpose is to support the standards behind the registry, not to promote vendors, influence commercial activity, recommend treatment, or replace regulatory authority.
                    </p>
                    <p className="t-body-sm text-muted-foreground leading-relaxed">
                      Its role is governance. Its responsibility is framework integrity.
                    </p>
                  </div>
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
