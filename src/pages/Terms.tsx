import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "acceptance", number: "01", label: "Acceptance" },
  { id: "citation", number: "02", label: "Citation" },
  { id: "integrity", number: "03", label: "Integrity" },
  { id: "warranty", number: "04", label: "Warranty" },
  { id: "jurisdiction", number: "05", label: "Jurisdiction" },
  { id: "related", number: "06", label: "Related Policies" },
];

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

type Clause = { n: string; t: string; d: string };

const CITATION: Clause[] = [
  {
    n: "01",
    t: "Audit ID",
    d: "Include the unique registry identifier associated with the listing, where applicable.",
  },
  {
    n: "02",
    t: "Status date",
    d: "Include the date of the determination being referenced.",
  },
  {
    n: "03",
    t: "Attribution",
    d: "Provide a direct link to the source registry page so the current public record can be reviewed.",
  },
  {
    n: "04",
    t: "Citation integrity",
    d: "Citations that omit the identifying details necessary to locate the record may misstate the standing or timing of the published determination.",
  },
];

const INTEGRITY: Clause[] = [
  {
    n: "01",
    t: "Bulk extraction",
    d: "No automated scraping, crawling, or indexing of registry data for resale or creation of derivative datasets without authorization.",
  },
  {
    n: "02",
    t: "Status misrepresentation",
    d: "No display or implication of a Verified standing for any entity not currently published under that status in the registry.",
  },
  {
    n: "03",
    t: "Unauthorized use of marks",
    d: "No use of Source Standard names, marks, or badge artwork in a way that implies an uncontracted partnership, endorsement, or verified relationship.",
  },
  {
    n: "04",
    t: "Registry interference",
    d: "No activity intended to disrupt, falsify, or degrade the integrity of public records or related framework materials.",
  },
  {
    n: "05",
    t: "Related enforcement",
    d: "Confirmed violations may be addressed under the applicable enforcement and accountability protocols of the framework.",
  },
];

const WARRANTY: Clause[] = [
  {
    n: "01",
    t: "Reference basis",
    d: "The registry reflects Source Standard's review of third-party regulatory, pharmacy, laboratory, and related records within a defined scope and at a defined point in time.",
  },
  {
    n: "02",
    t: "As-is publication",
    d: "Registry data is provided as a public reference only and is not warranted as fit for any specific medical, legal, or commercial purpose.",
  },
  {
    n: "03",
    t: "Reliance limits",
    d: "Use of registry data is at the user's discretion. Medical decisions should be made with licensed clinicians and not on the basis of registry information alone.",
  },
];

const RELATED = [
  { to: "/privacy", label: "Data Governance & Privacy Policy" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
  { to: "/accountability", label: "Accountability & Enforcement" },
  { to: "/status-definitions", label: "Status Definitions" },
];

const ClauseList = ({ clauses }: { clauses: Clause[] }) => (
  <ol className="divide-y divide-border/60 border-y border-border/60">
    {clauses.map((c) => (
      <li key={c.n} className="grid grid-cols-12 gap-4 py-6">
        <div className="col-span-2 md:col-span-1 font-mono text-[12px] tabular-nums text-muted-foreground/70 pt-1">
          {c.n}
        </div>
        <div className="col-span-10 md:col-span-11">
          <h3 className="t-body-md font-semibold text-foreground mb-2">{c.t}</h3>
          <p className="t-body-md text-muted-foreground leading-relaxed">{c.d}</p>
        </div>
      </li>
    ))}
  </ol>
);

const SplitSection = ({
  id,
  n,
  title,
  intro,
  children,
}: {
  id: string;
  n: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 section-pad border-b border-border/40">
    <div className="grid md:grid-cols-12 md:gap-12 lg:gap-16">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-32">
          <SectionIndex n={n} />
          <h2 className="t-section-title-sm text-foreground">{title}</h2>
          <p className="mt-4 t-body-sm text-muted-foreground max-w-[36ch]">{intro}</p>
        </div>
      </div>
      <div className="md:col-span-8 mt-8 md:mt-0">{children}</div>
    </div>
  </section>
);

const Terms = () => {
  const heroDescription =
    "The governing terms for access to, citation of, and use of the Source Standard public registry and associated framework materials.";

  return (
    <>
      <Breadcrumb items={[{ label: "Legal" }, { label: "Terms" }]} />

      <PageMeta title="Terms" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Registry User Agreement"
        title="Terms of Use"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">
                How this agreement applies
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  These terms govern public access to the Source Standard registry and the related materials published under the framework.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  They define the conditions of access, rules for citation and use, prohibited conduct, and the legal boundaries that apply to reliance on registry information.
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
            {/* §4 Acceptance */}
            <SplitSection
              id="acceptance"
              n="01"
              title="Registry Access & Acceptance"
              intro="What use of the registry means."
            >
              <div className="space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Access to the Source Standard public registry constitutes acceptance of these terms and the related policies referenced on this page.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  If a user does not accept these terms, use of the registry and associated framework materials should be discontinued.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Continued access signifies acceptance of the jurisdictional, liability, and use limitations defined below.
                </p>
              </div>
            </SplitSection>

            {/* §5 Citation */}
            <SplitSection
              id="citation"
              n="02"
              title="Citation & Data Utilization"
              intro="How registry entries may be referenced publicly."
            >
              <p className="t-body-md text-muted-foreground leading-relaxed mb-8">
                Registry entries may be cited in journalistic, academic, or clinical contexts provided the citation preserves sufficient detail for the reader to identify the referenced record accurately.
              </p>
              <ClauseList clauses={CITATION} />
            </SplitSection>

            {/* §6 Integrity */}
            <SplitSection
              id="integrity"
              n="03"
              title="Integrity & Prohibitions"
              intro="Conduct that is not permitted in connection with the registry or its published materials."
            >
              <ClauseList clauses={INTEGRITY} />
            </SplitSection>

            {/* §7 Warranty */}
            <SplitSection
              id="warranty"
              n="04"
              title="Warranty & Liability"
              intro="How registry information should be understood and relied upon."
            >
              <ClauseList clauses={WARRANTY} />
            </SplitSection>

            {/* §8 Jurisdiction */}
            <SplitSection
              id="jurisdiction"
              n="05"
              title="Jurisdiction"
              intro="The governing law applied to this agreement."
            >
              <div className="space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of the State of Florida and applicable laws of the United States.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Any dispute arising under these terms is subject to the jurisdiction of the appropriate state and federal courts located in Florida.
                </p>
              </div>
            </SplitSection>

            {/* §9 Related Policies */}
            <SplitSection
              id="related"
              n="06"
              title="Related Policies"
              intro="Further reading on privacy, verification scope, enforcement, and public status meanings."
            >
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {RELATED.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="group grid grid-cols-12 gap-4 py-5 items-baseline hover:bg-surface-muted/40 transition-colors -mx-4 px-4"
                    >
                      <div className="col-span-9 md:col-span-10">
                        <p className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors">
                          {r.label}
                        </p>
                      </div>
                      <div className="col-span-3 md:col-span-2 text-right">
                        <span className="t-utility-xs text-muted-foreground group-hover:text-primary transition-colors">
                          View
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </SplitSection>

            {/* §10 Closing statement */}
            <section className="section-pad border-t border-border/40">
              <div className="max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Public access requires clear terms of use.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  These terms exist to preserve the integrity of the registry, support accurate public citation, and clarify the limits under which Source Standard information is published and used.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
