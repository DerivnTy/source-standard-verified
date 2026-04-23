import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { advisoryBoard } from "@/data/advisoryBoard";
import { Breadcrumb } from "@/components/Breadcrumb";

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

const WHY_ITEMS = [
  {
    title: "Verification is a documented fact, not an opinion.",
    body: "Our Advisory Board ensures that every status in our registry is backed by evidence.",
  },
  {
    title: "Independent oversight protects the standard.",
    body: "Medical and legal experts govern the audit criteria so the registry stays trustworthy as the field evolves.",
  },
  {
    title: "The Board governs, it does not market.",
    body: "Members do not treat patients, market clinics, or produce listings. They protect the standard so you can trust the data.",
  },
];

const ROLE_FUNCTIONS = [
  {
    n: "01",
    t: "Define the standards",
    d: "The Board establishes the medical and regulatory requirements for \u201CVerified\u201D sourcing.",
  },
  {
    n: "02",
    t: "Vet the suppliers",
    d: "They approve the strict criteria used to recognize pharmacies on our Greenlist.",
  },
  {
    n: "03",
    t: "Audit the results",
    d: "The Board spot-checks vendor records to ensure they match the underlying pharmacy evidence.",
  },
  {
    n: "04",
    t: "Enforce accuracy",
    d: "They authorize changes to our protocol as FDA and regulatory guidelines evolve.",
  },
];

const BOUNDARIES = [
  "The Board governs the audit criteria behind every public determination.",
  "The Board does not evaluate or treat patients.",
  "The Board does not provide individualized medical advice through Source Standard.",
  "The Board does not produce listings or market clinics.",
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
        title="Governance & Clinical Oversight · Source Standard"
        description="Independent medical and legal experts overseeing the integrity of the Source Standard registry. The Board governs the audit criteria; they do not treat patients or market clinics."
      />

      <BriefingHero
        tone="navy"
        category="Governance & Clinical Oversight"
        docId="SS-MAB-2026.01"
        title="Governance & Clinical Oversight"
        statement="Independent medical and legal experts overseeing the integrity of the Source Standard registry. The Board governs the audit criteria; they do not treat patients or market clinics."
      />

      <div className="bg-background">
        <div className="page-shell">
          <div className="mx-auto w-standard">

            {/* Why the Board exists */}
            <section className="section-pad border-b border-border/40">
              <div className="h-px w-8 bg-border mb-6" aria-hidden="true" />
              <h2 className="t-section-title-sm text-foreground mb-8">
                Transparency requires accountability.
              </h2>
              <div className="grid md:grid-cols-3 md:divide-x md:divide-border/50">
                {WHY_ITEMS.map((w, i) => (
                  <div key={w.title} className={i === 0 ? "md:pr-8" : i === WHY_ITEMS.length - 1 ? "md:pl-8 mt-8 md:mt-0" : "md:px-8 mt-8 md:mt-0"}>
                    <p className="t-h4 text-foreground">{w.title}</p>
                    <p className="mt-3 t-body-md text-muted-foreground">{w.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Role in the framework */}
            <section className="section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <h2 className="t-section-title-sm text-foreground">
                    The verification chain
                  </h2>
                  <p className="mt-4 t-body-md text-muted-foreground max-w-[40ch]">
                    The Board sits above the operational registry. It does not produce listings — it governs the logic by which they are produced.
                  </p>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <ol className="divide-y divide-border/60">
                    {ROLE_FUNCTIONS.map((s) => (
                      <li key={s.n} className="grid grid-cols-12 gap-4 py-5 first:pt-0 last:pb-0 items-baseline">
                        <div className="col-span-2 t-utility-xs text-muted-foreground">{s.n}</div>
                        <div className="col-span-10">
                          <p className="t-body-md font-semibold text-foreground">{s.t}</p>
                          <p className="mt-1.5 t-body-md text-muted-foreground">{s.d}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* Board roster */}
            <section className="section-pad border-b border-border/40">
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
            <section className="section-pad border-b border-border/40">
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
            <section className="-mx-6 md:-mx-10 lg:-mx-16 px-6 md:px-10 lg:px-16 py-12 md:py-14 bg-surface-muted/60 border-y border-border/40">
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

            {/* Bridge — Continue reading */}
            <section className="pt-12 pb-12">
              <h2 className="t-section-title-sm text-foreground mb-6">
                Continue reading
              </h2>
              <ul className="divide-y divide-border/60">
                {BRIDGE_LINKS.map((b) => (
                  <li key={b.to}>
                    <Link
                      to={b.to}
                      className="grid grid-cols-12 gap-4 py-5 group items-baseline"
                    >
                      <p className="col-span-12 md:col-span-4 t-body-md font-semibold text-foreground group-hover:text-primary transition-colors">
                        {b.label}
                      </p>
                      <p className="col-span-12 md:col-span-7 t-body-md text-muted-foreground">
                        {b.description}
                      </p>
                      <span className="col-span-12 md:col-span-1 t-body-md text-muted-foreground md:text-right group-hover:text-primary transition-colors">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Scope & boundaries */}
            <section className="section-pad border-b border-border/40">
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

            {/* Responsibilities */}
            <section className="section-pad border-b border-border/40">
              <div className="grid md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <h2 className="t-section-title-sm text-foreground">
                    Responsibilities
                  </h2>
                  <p className="mt-4 t-body-md text-muted-foreground max-w-[40ch]">
                    Each responsibility maps to a recurring oversight activity recorded under the registry's maintenance log.
                  </p>
                </div>
                <div className="md:col-span-7 mt-8 md:mt-0 md:border-l md:border-border/50 md:pl-10">
                  <dl className="divide-y divide-border/60">
                    {RESPONSIBILITY_ORDER.map((code) => {
                      const o = RESPONSIBILITY_OVERRIDES[code];
                      if (!o) return null;
                      return (
                        <div key={code} className="py-4 first:pt-0 last:pb-0">
                          <dt className="t-body-md font-semibold text-foreground">{o.title}</dt>
                          <dd className="mt-1.5 t-body-md text-muted-foreground">
                            {o.description}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </section>

            {/* Bridge — Continue reading */}
            <section className="section-pad">
              <h2 className="t-section-title-sm text-foreground mb-6">
                Continue reading
              </h2>
              <ul className="divide-y divide-border/60">
                {BRIDGE_LINKS.map((b) => (
                  <li key={b.to}>
                    <Link
                      to={b.to}
                      className="grid grid-cols-12 gap-4 py-5 group items-baseline"
                    >
                      <p className="col-span-12 md:col-span-4 t-body-md font-semibold text-foreground group-hover:text-primary transition-colors">
                        {b.label}
                      </p>
                      <p className="col-span-12 md:col-span-7 t-body-md text-muted-foreground">
                        {b.description}
                      </p>
                      <span className="col-span-12 md:col-span-1 t-body-md text-muted-foreground md:text-right group-hover:text-primary transition-colors">
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
