import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { advisoryBoard } from "@/data/advisoryBoard";
import { Breadcrumb } from "@/components/Breadcrumb";

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
    title: "Audit confirmation",
    description: "Reviews vendor audits to confirm pharmacy sourcing is substantiated.",
  },
  "R-02": {
    title: "Greenlist authority",
    description: "Approves the rubric for recognizing 503A and 503B compounding facilities.",
  },
  "R-04": {
    title: "Regulatory alignment",
    description: "Ensures our standards stay current with FDA and State Board of Pharmacy shifts.",
  },
  "R-05": {
    title: "Evidence review",
    description: "Validates that educational materials on this site meet clinical truth, not marketing claims.",
  },
};
const RESPONSIBILITY_ORDER = ["R-01", "R-02", "R-04", "R-05"];

const MANDATE_CLAUSES = [
  {
    n: "01",
    t: "Independent clinical oversight.",
    d: "The Medical Advisory Board provides independent oversight of the verification framework.",
  },
  {
    n: "02",
    t: "Findings of record.",
    d: "Audit determinations are based on documented pharmacy sourcing, licensure, and regulatory standing.",
  },
  {
    n: "03",
    t: "Periodic review.",
    d: "The Board maintains the integrity of the standard through periodic review of forensic audit criteria.",
  },
  {
    n: "04",
    t: "Objective distance.",
    d: "Board members do not participate in individual vendor approvals or commercial activities.",
  },
];

const ROLE_FUNCTIONS = [
  {
    n: "01",
    t: "Regulatory Thresholds",
    d: "Establishing the clinical and statutory requirements for pharmaceutical sourcing verification.",
  },
  {
    n: "02",
    t: "Supplier Validation",
    d: "Defining the criteria for the recognition of greenlisted upstream pharmacy partners.",
  },
  {
    n: "03",
    t: "Administrative Audits",
    d: "Conducting randomized reviews of vendor records to ensure consistency with pharmacy-of-record data.",
  },
  {
    n: "04",
    t: "Protocol Evolution",
    d: "Authorizing updates to the Source Standard in alignment with evolving FDA and state regulatory guidelines.",
  },
];

const BOUNDARIES = [
  "The Board governs the audit criteria behind every public determination.",
  "The Board does not evaluate or treat patients.",
  "The Board does not provide individualized medical advice through Source Standard.",
  "The Board does not produce listings or market clinics.",
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
        description="Independent medical and legal experts overseeing the integrity of the Source Standard registry. The Board governs the audit criteria; they do not treat patients or market clinics."
      />

      {/* §1 Hero — restrained */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
            <div className="max-w-3xl">
              <p className="t-eyebrow-sm text-muted-foreground">Medical Advisory Board</p>
              <h1 className="mt-4 t-page-title text-foreground">Clinical Oversight</h1>
              <p className="mt-6 t-body-lg text-muted-foreground leading-relaxed">
                Independent medical and legal experts overseeing the integrity of the Source Standard registry. The Board governs the audit criteria and review standards used across the framework. It does not treat patients, market clinics, or participate in promotional activity.
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
              <h2 className="mt-4 t-section-title-sm text-foreground">Why the Board exists</h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  The Medical Advisory Board exists to provide independent oversight of the Source Standard framework and the standards used to support public registry determinations. Its role is to preserve sourcing transparency, review discipline, and the integrity of the verification process.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  The Board does not represent peptide distributors, market clinics, or operate as a promotional body. It serves as an oversight layer designed to protect neutrality, consumer trust, and the clinical seriousness of the public reference system.
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
            <section id="transparency" className="scroll-mt-24 pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="01" />
                    <h2 className="t-section-title-sm text-foreground">
                      Institutional Mandate
                    </h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      The governing terms under which the Board operates.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ol className="divide-y divide-border/60">
                    {MANDATE_CLAUSES.map((c) => (
                      <li key={c.n} className="grid grid-cols-12 gap-4 py-6 first:pt-0 last:pb-0 items-baseline">
                        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70">{c.n}</div>
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

            {/* §5 Governance Framework */}
            <section id="verification-chain" className="scroll-mt-24 section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-32">
                    <SectionIndex n="02" />
                    <h2 className="t-section-title-sm text-foreground">
                      Governance Framework
                    </h2>
                    <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">
                      The recurring functions the Board performs to maintain the standard.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-8 mt-8 md:mt-0">
                  <ol className="divide-y divide-border/60">
                    {ROLE_FUNCTIONS.map((s) => (
                      <li key={s.n} className="grid grid-cols-12 gap-4 py-6 first:pt-0 last:pb-0 items-baseline">
                        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70">{s.n}</div>
                        <div className="col-span-10 md:col-span-11">
                          <p className="t-body-md font-semibold text-foreground">{s.t}</p>
                          <p className="mt-1.5 t-body-md text-muted-foreground leading-relaxed">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* §6 Members */}
            <section id="members" className="scroll-mt-24 section-pad border-b border-border/40">
              <SectionIndex n="03" />
              <div className="mb-10 max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Appointed members
                </h2>
                <p className="mt-4 t-body-md text-muted-foreground leading-relaxed">
                  Independent clinicians and regulatory reviewers appointed to oversee framework standards, sourcing criteria, and public-reference integrity.
                </p>
              </div>

              <ul className="grid md:grid-cols-2 gap-5">
                {advisoryBoard.map((m) => {
                  const boardTitle = BOARD_TITLE_OVERRIDES[m.slug] ?? m.boardTitle;
                  return (
                    <li
                      key={m.slug}
                      className="flex flex-col rounded-md border border-border bg-card shadow-sm p-6"
                    >
                      <div className="flex gap-5 pb-5 mb-5 border-b border-border/60">
                        <img
                          src={m.photo}
                          alt={`Portrait of ${m.name}`}
                          loading="eager"
                          decoding="async"
                          width={96}
                          height={96}
                          className="h-20 w-20 rounded-[2px] object-cover border border-border bg-surface-muted shrink-0 aspect-square"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="t-body-md font-semibold tracking-tight text-foreground leading-snug">
                            {m.name}
                            <span className="text-muted-foreground font-normal">, {m.credentials}</span>
                          </h3>
                          <p className="mt-1.5 t-body-sm font-semibold text-foreground">{boardTitle}</p>
                          <p className="mt-1 t-utility-xs text-muted-foreground">{m.specialization}</p>
                          <p className="mt-2 t-utility-xs text-muted-foreground">
                            {m.jurisdiction} · {m.yearsPracticing} practicing
                          </p>
                        </div>
                      </div>

                      <p className="t-body-md text-foreground/85 flex-1">{m.shortSummary}</p>

                      <div className="mt-5 flex justify-end">
                        <Link
                          to={`/medical-advisory/${m.slug}`}
                          className="t-body-md text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                          View profile
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* §7 Scope & boundaries */}
            <section id="scope" className="scroll-mt-24 section-pad border-b border-border/40">
              <SectionIndex n="04" />
              <div className="max-w-2xl mb-8">
                <h2 className="t-section-title-sm text-foreground">
                  Scope & boundaries
                </h2>
              </div>
              <ul className="divide-y divide-border/60 border-y border-border/60 max-w-3xl">
                {BOUNDARIES.map((b) => (
                  <li key={b} className="py-5 t-body-md text-foreground">
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* §8 Responsibilities */}
            <section id="responsibilities" className="scroll-mt-24 section-pad border-b border-border/40">
              <SectionIndex n="05" />
              <div className="mb-10 max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Responsibilities
                </h2>
                <p className="mt-4 t-body-md text-muted-foreground leading-relaxed">
                  Each responsibility maps to a recurring oversight activity recorded under the registry's maintenance log.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {RESPONSIBILITY_ORDER.map((code) => {
                  const o = RESPONSIBILITY_OVERRIDES[code];
                  if (!o) return null;
                  return (
                    <li key={code}>
                      <p className="t-body-md font-semibold text-foreground">{o.title}</p>
                      <p className="mt-2 t-body-md text-muted-foreground leading-relaxed">{o.description}</p>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* §9 Closing statement */}
            <section className="section-pad">
              <div className="max-w-2xl">
                <p className="t-eyebrow-sm text-muted-foreground">Conclusion</p>
                <h2 className="mt-4 t-section-title-sm text-foreground">
                  Public trust requires independent oversight.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The Medical Advisory Board exists to preserve the neutrality, clinical seriousness, and evidentiary standards of the Source Standard framework. Its presence ensures that public determinations are governed by disciplined review criteria rather than promotion, market pressure, or presentation alone.
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
