import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { PageMeta } from "@/components/PageMeta";
import { DocSignature } from "@/components/DocSignature";
import { advisoryBoard, responsibilities } from "@/data/advisoryBoard";
import { Breadcrumb } from "@/components/Breadcrumb";

const BOARD_TITLE_OVERRIDES: Record<string, string> = {
  "advisor-01": "Chair · Evidentiary Standards & Framework Review",
  "advisor-04": "Member · USP Sterile Compounding Standards",
  "advisor-06": "Member · Regulatory Posture & Ethical Boundaries",
};

const RESPONSIBILITY_TITLE_OVERRIDES: Record<string, string> = {
  "R-01": "Confirms audit determinations",
  "R-02": "Authorizes Greenlist inclusion",
  "R-03": "Ratifies policy revisions",
  "R-04": "Authorizes versioned standards",
  "R-05": "Confirms reference accuracy",
  "R-06": "Ratifies clinical scope",
  "R-07": "Confirms sourcing posture",
};

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
        title="Medical Advisory Board"
        description="The governing clinical body for the Source Standard framework. Ratifies evaluation logic and authorizes versioned revisions."
      />
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-MAB-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
        eyebrow="Reference"
        title="Medical Advisory Board (MAB)."
        lead="The governing clinical body for the Source Standard framework. The MAB ratifies evaluation logic, authorizes versioned revisions, and confirms that public determinations are administratively defensible."
        verifiedOn="04 / 21 / 2026"
      />

      {/* §1 — Current Board Appointments */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="mb-8">
            <p className="meta mb-3">§1 — Current Board Appointments</p>
            <h2 className="h-section max-w-2xl">
              Appointed members of the Medical Advisory Board.
            </h2>
          </div>

          <div className="border border-border bg-background mb-px">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
              <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                Roster · SS-MAB-2026.01
              </span>
              <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                {advisoryBoard.length.toString().padStart(2, "0")} appointed seats · Active
              </span>
            </div>
          </div>

          <ul className="grid md:grid-cols-2 gap-px bg-border border-x border-b border-border">
            {advisoryBoard.map((m, i) => {
              const seat = (i + 1).toString().padStart(2, "0");
              const boardTitle = BOARD_TITLE_OVERRIDES[m.slug] ?? m.boardTitle;
              return (
                <li key={m.slug} className="bg-background p-6 md:p-7 flex flex-col">
                  <div className="flex gap-5 pb-4 mb-4 border-b border-border">
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <img
                        src={m.photo}
                        alt={`Portrait of ${m.name}`}
                        loading="lazy"
                        width={96}
                        height={96}
                        className="h-20 w-20 rounded-[2px] object-cover border border-border bg-surface-muted"
                      />
                      <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                        SEAT · {seat}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[18px] font-semibold tracking-tight text-foreground leading-snug">
                        {m.name}
                        <span className="text-muted-foreground font-normal">, {m.credentials}</span>
                      </h3>
                      <p className="mt-1 meta-label text-primary">{boardTitle}</p>
                      <p className="mt-1 text-[12.5px] text-muted-foreground">{m.specialization}</p>
                      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-border pt-3">
                        <div className="flex flex-col">
                          <dt className="text-[9.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                            Jurisdiction
                          </dt>
                          <dd className="text-[12px] font-mono text-foreground">{m.jurisdiction}</dd>
                        </div>
                        <div className="flex flex-col">
                          <dt className="text-[9.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                            Years practicing
                          </dt>
                          <dd className="text-[12px] font-mono text-foreground">{m.yearsPracticing}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <p className="text-[13.5px] text-foreground/90 leading-relaxed flex-1">{m.shortSummary}</p>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                      MAB-{seat}
                    </span>
                    <Link
                      to={`/medical-advisory/${m.slug}`}
                      className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                    >
                      View profile →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* §2 — Regulatory Mandate & Scope */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Regulatory Mandate & Scope</p>
              <h2 className="h-section">
                Governing clinical body for the framework.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14.5px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                The Medical Advisory Board governs the evaluation logic of the Source Standard framework. It ratifies
                criteria, authorizes versioned revisions, and confirms that every public determination is grounded in
                current clinical practice and administratively defensible to a reviewing physician.
              </p>
              <p>
                The Board does not evaluate or treat patients through the framework. Its mandate is restricted to the
                rubric by which vendors, pharmacies, and upstream sources are assessed, and to the procedural
                discipline by which those assessments are recorded.
              </p>
              <p className="text-foreground">
                Determinations published under this framework are the product of a structured review process governed
                by this Board — not an editorial position of the organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §3 — Role in the Source Standard Framework */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — Role in the Source Standard Framework</p>
              <h2 className="h-section">
                Where the board sits in the verification chain.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                The board is the layer above the operational registry. It does not produce listings — it governs the
                logic by which listings are produced.
              </p>
            </div>
            <div className="md:col-span-8">
              <ol className="border border-border bg-background divide-y divide-border">
                {[
                  {
                    n: "01",
                    t: "Defines framework scope",
                    d: "Establishes what the Source Standard does and does not verify, and the boundaries of public reference.",
                  },
                  {
                    n: "02",
                    t: "Ratifies criteria",
                    d: "Approves the criteria used to evaluate vendors, pharmacies, and upstream sourcing relationships.",
                  },
                  {
                    n: "03",
                    t: "Reviews determinations",
                    d: "Spot-checks recorded determinations against underlying evidence on a quarterly cadence.",
                  },
                  {
                    n: "04",
                    t: "Authorizes revisions",
                    d: "Signs off on versioned revisions to the framework and records rationale in the public maintenance log.",
                  },
                ].map((s) => (
                  <li key={s.n} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
                    <div className="col-span-2 meta text-primary">{s.n}</div>
                    <div className="col-span-10">
                      <p className="text-[14px] font-semibold text-foreground">{s.t}</p>
                      <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Key Responsibilities */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§4 — Key Responsibilities</p>
              <h2 className="h-section">
                What the Board is accountable for.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Each responsibility maps to a recurring review activity recorded under the framework's maintenance log.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-5 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Code</div>
                  <div className="col-span-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Responsibility</div>
                  <div className="col-span-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Description</div>
                </div>
                <ul className="divide-y divide-border">
                  {responsibilities.map((r) => {
                    const title = RESPONSIBILITY_TITLE_OVERRIDES[r.code] ?? r.title;
                    return (
                      <li key={r.code} className="grid grid-cols-12 gap-3 px-5 py-4 items-baseline">
                        <div className="col-span-2 meta text-primary">{r.code}</div>
                        <div className="col-span-4 text-[13.5px] font-semibold text-foreground">{title}</div>
                        <div className="col-span-6 text-[13.5px] text-muted-foreground leading-relaxed">
                          {r.description}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Read deeper */}
      <section className="border-b border-border">
        <div className="container-wide py-8">
          <div className="border border-border bg-surface-muted">
            <div className="px-4 py-2.5 border-b border-border bg-background">
              <p className="meta-label text-foreground">Read deeper</p>
            </div>
            <ul className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {[
                { to: "/governance", l: "Governance & oversight" },
                { to: "/about", l: "About Source Standard" },
                { to: "/accountability", l: "Accountability & enforcement" },
              ].map((r) => (
                <li key={r.to} className="px-4 py-3">
                  <Link
                    to={r.to}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                  >
                    {r.l} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cite */}
      <section className="bg-surface-muted">
        <div className="container-wide py-8">
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-4xl">
            <span className="meta-label text-foreground mr-2">Cite as ·</span>
            Source Standard, Medical Advisory Board, SS-MAB-2026.01. Last updated 04 / 21 / 2026.
          </p>
        </div>
      </section>
      <DocSignature docId="SS-MAB-2026.01" verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default MedicalAdvisory;
