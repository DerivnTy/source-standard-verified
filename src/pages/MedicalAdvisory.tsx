import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
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

const WHY_ITEMS = [
  {
    title: "Public determinations need a framework",
    body: "Source Standard publishes verification status, not opinion. Those determinations follow a defined framework.",
  },
  {
    title: "Frameworks need governance",
    body: "The Board reviews, ratifies, and maintains that framework on a recurring cadence.",
  },
  {
    title: "Governance is bounded",
    body: "The Board does not produce listings, market clinics, or evaluate patients. It governs the logic by which listings are created.",
  },
];

const ROLE_FUNCTIONS = [
  {
    n: "01",
    t: "Defines scope",
    d: "Establishes what the framework does and does not verify.",
  },
  {
    n: "02",
    t: "Ratifies criteria",
    d: "Approves the criteria used to evaluate vendors, pharmacies, and upstream sources.",
  },
  {
    n: "03",
    t: "Reviews determinations",
    d: "Spot-checks recorded determinations against underlying evidence on a recurring cadence.",
  },
  {
    n: "04",
    t: "Authorizes revisions",
    d: "Signs off on versioned framework changes and records rationale.",
  },
];

const BOUNDARIES = [
  "The Board governs the framework.",
  "The Board does not evaluate or treat patients.",
  "The Board does not provide individualized medical advice through Source Standard.",
  "The Board's mandate is limited to criteria, review logic, scope, and oversight of public determinations.",
];

const BRIDGE_LINKS = [
  {
    to: "/how-it-works",
    label: "How verification works",
    description: "The protocol the Board governs.",
  },
  {
    to: "/accountability",
    label: "Accountability & enforcement",
    description: "What happens when verification fails.",
  },
  {
    to: "/about",
    label: "About Source Standard",
    description: "The organization the Board oversees.",
  },
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
        title="Medical Advisory Board · Governance & Oversight"
        description="The Source Standard framework is reviewed under independent medical and legal oversight. The Board governs the standards behind every public determination."
      />

      <BriefingHero
        tone="navy"
        category="Governance & Oversight"
        docId="SS-MAB-2026.01"
        title="Medical Advisory Board"
        statement="The Source Standard framework is reviewed under independent medical and legal oversight. The Board governs the standards behind every public determination — it does not produce listings, market clinics, or treat patients."
      />

      {/* Why this Board exists */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <p className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-8">
            Why this Board exists
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-border border-y border-border">
            {WHY_ITEMS.map((w) => (
              <div key={w.title} className="bg-background p-6 md:p-7">
                <p className="text-[14.5px] font-semibold text-foreground leading-snug">
                  {w.title}
                </p>
                <p className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role in the framework */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Role in the framework
              </p>
              <h2 className="h-section">
                Where the Board sits in the verification chain.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                The Board is the layer above the operational registry. It does not produce listings — it governs the logic by which listings are produced.
              </p>
            </div>
            <div className="md:col-span-8">
              <ol className="divide-y divide-border border-y border-border bg-background">
                {ROLE_FUNCTIONS.map((s) => (
                  <li key={s.n} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
                    <div className="col-span-2 text-[13px] font-mono text-muted-foreground">{s.n}</div>
                    <div className="col-span-10">
                      <p className="text-[14.5px] font-semibold text-foreground">{s.t}</p>
                      <p className="mt-1.5 text-[13.5px] text-muted-foreground leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Board roster */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="mb-8">
            <p className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Appointed members
            </p>
            <h2 className="h-section max-w-2xl">
              The Medical Advisory Board.
            </h2>
          </div>

          <ul className="grid md:grid-cols-2 gap-px bg-border border-y border-border">
            {advisoryBoard.map((m) => {
              const boardTitle = BOARD_TITLE_OVERRIDES[m.slug] ?? m.boardTitle;
              return (
                <li key={m.slug} className="bg-background p-6 md:p-7 flex flex-col">
                  <div className="flex gap-5 pb-5 mb-5 border-b border-border">
                    <img
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      loading="lazy"
                      width={96}
                      height={96}
                      className="h-20 w-20 rounded-[2px] object-cover border border-border bg-surface-muted shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[17px] font-semibold tracking-tight text-foreground leading-snug">
                        {m.name}
                        <span className="text-muted-foreground font-normal">, {m.credentials}</span>
                      </h3>
                      <p className="mt-1.5 text-[13.5px] font-semibold text-foreground">{boardTitle}</p>
                      <p className="mt-1 text-[12.5px] text-muted-foreground">{m.specialization}</p>
                      <p className="mt-2 text-[12px] text-muted-foreground">
                        {m.jurisdiction} · {m.yearsPracticing} practicing
                      </p>
                    </div>
                  </div>

                  <p className="text-[13.5px] text-foreground/90 leading-relaxed flex-1">{m.shortSummary}</p>

                  <div className="mt-6 pt-4 border-t border-border flex justify-end">
                    <Link
                      to={`/medical-advisory/${m.slug}`}
                      className="text-[13px] text-foreground hover:text-primary transition-colors"
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

      {/* Scope & boundaries */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Scope & boundaries
              </p>
              <h2 className="h-section">
                What the Board does — and does not — do.
              </h2>
            </div>
            <div className="md:col-span-8">
              <ul className="divide-y divide-border border-y border-border bg-background">
                {BOUNDARIES.map((b) => (
                  <li key={b} className="px-5 py-4 text-[14.5px] text-foreground leading-relaxed">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Responsibilities
              </p>
              <h2 className="h-section">
                What the Board is accountable for.
              </h2>
              <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">
                Each responsibility maps to a recurring review activity recorded under the framework's maintenance log.
              </p>
            </div>
            <div className="md:col-span-8">
              <dl className="divide-y divide-border border-y border-border">
                {responsibilities.map((r) => {
                  const title = RESPONSIBILITY_TITLE_OVERRIDES[r.code] ?? r.title;
                  return (
                    <div key={r.code} className="py-4 first:pt-5 last:pb-5">
                      <dt className="text-[14.5px] font-semibold text-foreground">{title}</dt>
                      <dd className="mt-1.5 text-[13.5px] text-muted-foreground leading-relaxed">
                        {r.description}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <p className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-8">
            Continue reading
          </p>
          <ul className="grid md:grid-cols-3 gap-px bg-border border-y border-border">
            {BRIDGE_LINKS.map((b) => (
              <li key={b.to} className="bg-background">
                <Link
                  to={b.to}
                  className="block p-6 md:p-7 group hover:bg-surface-muted transition-colors h-full"
                >
                  <p className="text-[14.5px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {b.label} →
                  </p>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cite */}
      <section className="bg-background">
        <div className="container-wide py-8">
          <p className="text-[12px] text-muted-foreground leading-relaxed max-w-4xl">
            Source Standard, Medical Advisory Board, SS-MAB-2026.01. Last updated 04 / 21 / 2026.
          </p>
        </div>
      </section>

      <DocSignature docId="SS-MAB-2026.01" verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default MedicalAdvisory;
