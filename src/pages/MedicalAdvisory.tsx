import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
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
        statement="The Source Standard framework is reviewed under independent medical and legal oversight. The Board governs the standards behind every public determination, it does not produce listings, market clinics, or treat patients."
      />

      <div className="bg-background">
        <div className="container-wide">
          <div className="max-w-[1100px] mx-auto">

            {/* Why this Board exists */}
            <section className="py-14 border-b border-border/40">
              <p className="t-utility-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-6">
                Why this Board exists
              </p>
              <div className="grid md:grid-cols-3 md:divide-x md:divide-border/50">
                {WHY_ITEMS.map((w, i) => (
                  <div key={w.title} className={i === 0 ? "md:pr-8" : i === WHY_ITEMS.length - 1 ? "md:pl-8 mt-8 md:mt-0" : "md:px-8 mt-8 md:mt-0"}>
                    <p className="t-body-sm font-semibold text-foreground leading-snug">
                      {w.title}
                    </p>
                    <p className="mt-3 t-body-sm text-muted-foreground leading-relaxed">
                      {w.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Role in the framework */}
            <section className="py-14 border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="t-utility-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    Role in the framework
                  </p>
                  <h2 className="h-section">
                    Where the Board sits in the verification chain.
                  </h2>
                  <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed max-w-[40ch]">
                    The Board is the layer above the operational registry. It does not produce listings, it governs the logic by which listings are produced.
                  </p>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <ol className="divide-y divide-border/60">
                    {ROLE_FUNCTIONS.map((s) => (
                      <li key={s.n} className="grid grid-cols-12 gap-4 py-5 first:pt-0 last:pb-0 items-baseline">
                        <div className="col-span-2 t-body-sm font-mono text-muted-foreground">{s.n}</div>
                        <div className="col-span-10">
                          <p className="t-body-sm font-semibold text-foreground">{s.t}</p>
                          <p className="mt-1.5 t-body-sm text-muted-foreground leading-relaxed">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* Board roster */}
            <section className="py-14 border-b border-border/40">
              <div className="mb-8">
                <p className="t-utility-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  Appointed members
                </p>
                <h2 className="h-section max-w-2xl">
                  The Medical Advisory Board.
                </h2>
              </div>

              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-12">
                {advisoryBoard.map((m) => {
                  const boardTitle = BOARD_TITLE_OVERRIDES[m.slug] ?? m.boardTitle;
                  return (
                    <li key={m.slug} className="flex flex-col">
                      <div className="flex gap-5 pb-5 mb-5 border-b border-border/60">
                        <img
                          src={m.photo}
                          alt={`Portrait of ${m.name}`}
                          loading="eager"
                          decoding="async"
                          width={96}
                          height={96}
                          className="h-20 w-20 rounded-[2px] object-cover border border-border bg-surface-muted shrink-0"
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

                      <p className="t-body-sm text-foreground/90 leading-relaxed flex-1">{m.shortSummary}</p>

                      <div className="mt-5 flex justify-end">
                        <Link
                          to={`/medical-advisory/${m.slug}`}
                          className="t-body-sm text-foreground hover:text-primary transition-colors"
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
            <section className="py-14 border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="t-utility-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    Scope & boundaries
                  </p>
                  <h2 className="h-section">
                    What the Board does, and does not, do.
                  </h2>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <ul className="divide-y divide-border/60">
                    {BOUNDARIES.map((b) => (
                      <li key={b} className="py-4 first:pt-0 last:pb-0 t-body-sm text-foreground leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Responsibilities */}
            <section className="py-14 border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="t-utility-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    Responsibilities
                  </p>
                  <h2 className="h-section">
                    What the Board is accountable for.
                  </h2>
                  <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed max-w-[40ch]">
                    Each responsibility maps to a recurring review activity recorded under the framework's maintenance log.
                  </p>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <dl className="divide-y divide-border/60">
                    {responsibilities.map((r) => {
                      const title = RESPONSIBILITY_TITLE_OVERRIDES[r.code] ?? r.title;
                      return (
                        <div key={r.code} className="py-4 first:pt-0 last:pb-0">
                          <dt className="t-body-sm font-semibold text-foreground">{title}</dt>
                          <dd className="mt-1.5 t-body-sm text-muted-foreground leading-relaxed">
                            {r.description}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </section>

            {/* Bridge — Continue reading */}
            <section className="py-14">
              <p className="t-utility-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-6">
                Continue reading
              </p>
              <ul className="divide-y divide-border/60">
                {BRIDGE_LINKS.map((b) => (
                  <li key={b.to}>
                    <Link
                      to={b.to}
                      className="grid grid-cols-12 gap-4 py-5 group items-baseline"
                    >
                      <p className="col-span-12 md:col-span-4 t-body-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {b.label}
                      </p>
                      <p className="col-span-12 md:col-span-7 t-body-sm text-muted-foreground leading-relaxed">
                        {b.description}
                      </p>
                      <span className="col-span-12 md:col-span-1 t-body-sm text-muted-foreground md:text-right group-hover:text-primary transition-colors">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </div>


    </>
  );
};

export default MedicalAdvisory;
