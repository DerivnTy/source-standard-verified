import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
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

// Refined responsibility list. Only four are surfaced on this page; any
// extra entries in the data file are filtered out below.
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
  "The Medical Advisory Board provides independent clinical oversight of the verification framework.",
  "Audit determinations are findings of record based on documented pharmacy sourcing, licensure, and regulatory standing.",
  "The Board maintains the integrity of the standard through the periodic review of forensic audit criteria.",
  "To ensure objective distance, Board members do not participate in individual vendor approvals or commercial activities.",
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

      <BriefingHero
        tone="navy"
        category=""
        docId="SS-MAB-2026.01"
        title="Clinical Oversight"
        statement="Independent medical and legal experts overseeing the integrity of the Source Standard registry. The Board governs the audit criteria; they do not treat patients or market clinics."
      />

      <DocJumpBar waypoints={WAYPOINTS} />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">

            {/* Section 01 — Institutional Mandate (filing layout) */}
            <section id="transparency" className="scroll-mt-24 section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="font-mono text-[12px] tabular-nums text-muted-foreground/60 mb-3">01</p>
                  <h2 className="t-section-title-sm text-foreground">
                    Institutional Mandate
                  </h2>
                  <dl className="mt-8 space-y-2 border-t border-border/60 pt-5">
                    <div className="flex gap-3">
                      <dt className="t-utility-xs uppercase tracking-wider text-muted-foreground/70 w-28 shrink-0">Issued under</dt>
                      <dd className="font-mono text-[12px] tabular-nums text-foreground">SS-MAB-2026.01</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="t-utility-xs uppercase tracking-wider text-muted-foreground/70 w-28 shrink-0">Effective</dt>
                      <dd className="font-mono text-[12px] tabular-nums text-foreground">Current registry cycle</dd>
                    </div>
                  </dl>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <ol className="divide-y divide-border/60 border-t border-border/60">
                    {MANDATE_CLAUSES.map((c) => (
                      <li key={c.label} className="grid grid-cols-12 gap-4 py-6 items-baseline">
                        <div className="col-span-12 sm:col-span-4 font-mono text-[11px] tabular-nums uppercase tracking-wider text-muted-foreground">
                          {c.label}
                        </div>
                        <p className="col-span-12 sm:col-span-8 t-body-md text-foreground leading-relaxed">
                          {c.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 text-right font-mono text-[11px] tabular-nums uppercase tracking-wider text-muted-foreground/70">
                    End of Schedule §01 · 4 clauses enumerated
                  </p>
                </div>
              </div>
            </section>

            {/* Section 02 — Governance Framework (registry schedule) */}
            <section id="verification-chain" className="scroll-mt-24 section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="font-mono text-[12px] tabular-nums text-muted-foreground/60 mb-3">02</p>
                  <h2 className="t-section-title-sm text-foreground">
                    Governance Framework
                  </h2>
                  <dl className="mt-8 space-y-2 border-t border-border/60 pt-5">
                    <div className="flex gap-3">
                      <dt className="t-utility-xs uppercase tracking-wider text-muted-foreground/70 w-28 shrink-0">Authority</dt>
                      <dd className="font-mono text-[12px] tabular-nums text-foreground">Medical Advisory Board</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="t-utility-xs uppercase tracking-wider text-muted-foreground/70 w-28 shrink-0">Reference</dt>
                      <dd className="font-mono text-[12px] tabular-nums text-foreground">§02 of SS-MAB-2026.01</dd>
                    </div>
                  </dl>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <div className="grid grid-cols-12 gap-4 pb-3 border-b border-border/60">
                    <div className="col-span-3 font-mono text-[11px] tabular-nums uppercase tracking-wider text-muted-foreground/70">
                      No.
                    </div>
                    <div className="col-span-9 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
                      Function · Statutory Basis
                    </div>
                  </div>
                  <ol className="divide-y divide-border/60">
                    {ROLE_FUNCTIONS.map((s) => (
                      <li key={s.n} className="grid grid-cols-12 gap-4 py-6 items-baseline">
                        <div className="col-span-3 font-mono text-[12px] tabular-nums text-muted-foreground">{s.n}</div>
                        <div className="col-span-9">
                          <p className="t-body-md font-semibold text-foreground">{s.t}</p>
                          <p className="mt-1.5 t-body-md text-muted-foreground leading-relaxed">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 text-right font-mono text-[11px] tabular-nums uppercase tracking-wider text-muted-foreground/70">
                    End of Schedule §02 · 4 functions enumerated
                  </p>
                </div>
              </div>
            </section>

            {/* Board roster */}
            <section id="members" className="scroll-mt-24 section-pad border-b border-border/40">
              <SectionIndex n="03" />
              <div className="mb-8">
                <h2 className="t-section-title-sm text-foreground max-w-2xl">
                  Appointed members
                </h2>
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
                          className="t-body-md text-foreground hover:text-primary transition-colors"
                        >
                          View profile →
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Scope & boundaries */}
            <section id="scope" className="scroll-mt-24 section-pad border-b border-border/40">
              <SectionIndex n="04" />
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <h2 className="t-section-title-sm text-foreground">
                    Scope & boundaries
                  </h2>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <ul className="divide-y divide-border/60">
                    {BOUNDARIES.map((b) => (
                      <li key={b} className="py-4 first:pt-0 last:pb-0 t-body-md text-foreground">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Responsibilities — full-width SOP list on tinted surface */}
            <section id="responsibilities" className="scroll-mt-24 -mx-6 md:-mx-10 lg:-mx-16 px-6 md:px-10 lg:px-16 py-12 md:py-14 bg-surface-muted/60 border-y border-border/40">
              <SectionIndex n="05" />
              <div className="mb-8 max-w-[60ch]">
                <h2 className="t-section-title-sm text-foreground">
                  Responsibilities
                </h2>
                <p className="mt-3 t-body-md text-muted-foreground">
                  Each responsibility maps to a recurring oversight activity recorded under the registry's maintenance log.
                </p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                {RESPONSIBILITY_ORDER.map((code) => {
                  const o = RESPONSIBILITY_OVERRIDES[code];
                  if (!o) return null;
                  return (
                    <li key={code} className="flex gap-3.5">
                      <ShieldCheck
                        className="mt-0.5 h-4 w-4 shrink-0 text-verified"
                        aria-hidden="true"
                        strokeWidth={2.25}
                      />
                      <div>
                        <p className="t-body-md font-semibold text-foreground">{o.title}</p>
                        <p className="mt-1 t-body-md text-muted-foreground">{o.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>


          </div>
        </div>
      </div>


    </>
  );
};

export default MedicalAdvisory;
