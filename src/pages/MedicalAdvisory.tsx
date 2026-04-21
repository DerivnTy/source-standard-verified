import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { advisoryBoard, responsibilities } from "@/data/advisoryBoard";

const MedicalAdvisory = () => {
  return (
    <>
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-MAB-2026.01" },
          { label: "Version", value: "2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04 / 21 / 2026" },
          { label: "Jurisdiction", value: "US" },
        ]}
        eyebrow="Reference"
        title="Medical Advisory Board."
        lead="Physician oversight of Source Standard framework criteria, the Greenlist, and educational reference material."
      />

      {/* §1 — Board Mandate */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§1 — Board Mandate</p>
              <h2 className="h-section">
                The clinical authority behind the framework.
              </h2>
            </div>
            <div className="md:col-span-8 text-[14.5px] text-muted-foreground leading-relaxed space-y-4 border-t border-border pt-6">
              <p>
                The Medical Advisory Board exists to ensure that every standard, criterion, and public determination
                published under the Source Standard framework is grounded in current clinical practice and defensible
                to a reviewing physician.
              </p>
              <p>
                The board reviews framework criteria, ratifies revisions on a versioned schedule, oversees the
                evaluation rubric used for the Greenlist, and signs off on educational reference material before
                publication. Reviewers do not evaluate or treat patients through the framework.
              </p>
              <p className="text-foreground">
                Determinations published on this site are the product of a structured review process — not an
                editorial opinion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §2 — Role within the framework */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§2 — Role in the Source Standard Framework</p>
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

      {/* §3 — Key Responsibilities */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="meta mb-3">§3 — Key Responsibilities</p>
              <h2 className="h-section">
                What the board is accountable for.
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
                  {responsibilities.map((r) => (
                    <li key={r.code} className="grid grid-cols-12 gap-3 px-5 py-4 items-baseline">
                      <div className="col-span-2 meta text-primary">{r.code}</div>
                      <div className="col-span-4 text-[13.5px] font-semibold text-foreground">{r.title}</div>
                      <div className="col-span-6 text-[13.5px] text-muted-foreground leading-relaxed">
                        {r.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Board members */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
            <div>
              <p className="meta mb-3">§4 — Board Members</p>
              <h2 className="h-section max-w-2xl">
                Clinicians and pharmacists serving on the Medical Advisory Board.
              </h2>
            </div>
            <p className="text-[12px] text-muted-foreground max-w-sm leading-relaxed">
              <span className="meta-label text-foreground mr-2">Roster status ·</span>
              Initial advisory roster. Seats and credentials are versioned in this document.
            </p>
          </div>

          <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {advisoryBoard.map((m) => (
              <li key={m.slug} className="bg-background p-6 md:p-7 flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-border">
                  <img
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    loading="lazy"
                    width={96}
                    height={96}
                    className="h-16 w-16 rounded-[2px] object-cover border border-border bg-surface-muted"
                  />
                  <span className="text-[11px] meta-label text-muted-foreground">{m.slug.toUpperCase()}</span>
                </div>
                <p className="meta-label text-primary mb-2">{m.boardTitle}</p>
                <h3 className="text-[18px] font-semibold tracking-tight text-foreground leading-snug">
                  {m.name}
                  <span className="text-muted-foreground font-normal">, {m.credentials}</span>
                </h3>
                <p className="mt-1.5 text-[12.5px] text-muted-foreground">{m.specialization}</p>
                <p className="mt-4 text-[13.5px] text-foreground/90 leading-relaxed flex-1">{m.shortSummary}</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[11.5px] meta-label text-muted-foreground">
                    {m.jurisdiction} · {m.yearsPracticing} yrs practicing
                  </span>
                  <Link
                    to={`/medical-advisory/${m.slug}`}
                    className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                  >
                    View profile →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
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
    </>
  );
};

export default MedicalAdvisory;
