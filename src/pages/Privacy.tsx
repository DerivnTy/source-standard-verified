import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionAnchorNav } from "@/components/registry/SectionAnchorNav";
import { BriefingHero } from "@/components/BriefingHero";

const WAYPOINTS = [
  { id: "partitioning", number: "01", label: "Partitioning" },
  { id: "collection", number: "02", label: "Collection" },
  { id: "retention", number: "03", label: "Retention" },
  { id: "processing", number: "04", label: "Processing" },
  { id: "inquiries", number: "05", label: "Inquiries" },
];

const SectionIndex = ({ n }: { n: string }) => (
  <p className="font-mono text-[12px] text-muted-foreground/50 mb-1 tabular-nums">{n}</p>
);

type Clause = { n: string; t: string; d: string };

const PARTITIONING: Clause[] = [
  {
    n: "01",
    t: "Public registry data",
    d: "Public registry data is limited to business identity, verification categories, current status, status dates, and related public-reference fields published for consumer and clinician use.",
  },
  {
    n: "02",
    t: "Protected audit material",
    d: "Protected audit material may include licensing records, supplier invoices, certificates of analysis, internal review notes, and related supporting documentation retained in the audit file.",
  },
  {
    n: "03",
    t: "Access restriction",
    d: "Protected audit material is retained within a restricted internal environment and is not published, sold, or shared with third parties except where required by law or necessary for authorized infrastructure operations.",
  },
];

const COLLECTION: Clause[] = [
  {
    n: "01",
    t: "Vendor intake",
    d: "Business credentials, operating details, and sourcing records submitted for verification or related review.",
  },
  {
    n: "02",
    t: "Surveillance data",
    d: "Where applicable, records associated with analytical review, laboratory findings, and related monitoring activity.",
  },
  {
    n: "03",
    t: "Concern reports",
    d: "Supporting documentation and contact details submitted through the public reporting channel.",
  },
  {
    n: "04",
    t: "Site analytics",
    d: "Site usage is monitored through aggregate, non-identifying signals only. The framework does not rely on advertising trackers or cross-site identification systems.",
  },
];

const RETENTION: Clause[] = [
  {
    n: "01",
    t: "Active records",
    d: "Protected audit material is retained for the duration of an entity's active standing in the registry and for the period reasonably necessary to administer review, renewal, and related compliance processes.",
  },
  {
    n: "02",
    t: "Historical determinations",
    d: "Public status transitions and related public record history may be retained to preserve the integrity and continuity of the registry timeline.",
  },
  {
    n: "03",
    t: "Withdrawn or denied applications",
    d: "Documentation associated with withdrawn or denied applications may be held for a limited administrative period before secure disposal.",
  },
  {
    n: "04",
    t: "Secure disposal",
    d: "Sensitive records scheduled for deletion are disposed of through documented internal procedures designed to prevent unauthorized recovery.",
  },
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

const Privacy = () => {
  const heroDescription =
    "The administrative framework governing the collection, separation, retention, and processing of audit records and registry data.";

  return (
    <>
      <Breadcrumb items={[{ label: "Legal" }, { label: "Privacy" }]} />

      <PageMeta title="Privacy" description={heroDescription} />

      {/* §1 Hero */}
      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Data Governance Protocol"
        title="Data Governance & Privacy"
        statement={heroDescription}
        docId=""
      />

      {/* §2 Statement of purpose */}
      <section className="bg-background border-b border-border/40">
        <div className="page-shell">
          <div className="mx-auto w-standard section-pad">
            <div className="max-w-2xl">
              <h2 className="t-section-title-sm text-foreground">
                How data is handled under the framework
              </h2>
              <div className="mt-6 space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Source Standard maintains a distinction between public registry information and protected audit material. This page explains what is collected, how it is stored, how long it is retained, and the limits under which it may be processed.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  The goal of this protocol is to preserve the integrity of the public record while limiting access to sensitive audit material that is not published as part of the registry.
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
            {/* §4 Partitioning */}
            <SplitSection
              id="partitioning"
              n="01"
              title="Record Partitioning"
              intro="How public registry information is separated from protected audit material."
            >
              <ClauseList clauses={PARTITIONING} />
            </SplitSection>

            {/* §5 Collection */}
            <SplitSection
              id="collection"
              n="02"
              title="Scope of Collection"
              intro="What categories of data may be collected under the framework."
            >
              <ClauseList clauses={COLLECTION} />
            </SplitSection>

            {/* §6 Retention */}
            <SplitSection
              id="retention"
              n="03"
              title="Data Retention"
              intro="How long records are maintained under different conditions."
            >
              <ClauseList clauses={RETENTION} />
            </SplitSection>

            {/* §7 Processing */}
            <SplitSection
              id="processing"
              n="04"
              title="Authorized Processing"
              intro="How data may be processed in support of the framework."
            >
              <div className="space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Data processing is limited to essential internal functions and authorized infrastructure partners operating under confidentiality and access restrictions.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Any such partner is limited to the minimum data reasonably necessary for hosting, transactional communications, and privacy-respecting analytics.
                </p>
              </div>
            </SplitSection>

            {/* §8 Inquiries */}
            <SplitSection
              id="inquiries"
              n="05"
              title="Inquiries & Requests"
              intro="How privacy-related requests may be made."
            >
              <div className="space-y-5">
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Individuals may request access to or correction of personal data held by Source Standard where applicable under law and within the limits of the framework's record-retention obligations.
                </p>
                <p className="t-body-md text-muted-foreground leading-relaxed">
                  Deletion requests are reviewed in light of the organization's need to preserve legitimate administrative and historical recordkeeping obligations.
                </p>
                <p className="pt-2 t-body-md text-foreground">
                  Data Privacy Officer:{" "}
                  <a
                    href="mailto:privacy@sourcestandard.org"
                    className="font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                  >
                    privacy@sourcestandard.org
                  </a>
                </p>
              </div>
            </SplitSection>

            {/* §9 Closing statement */}
            <section className="section-pad border-t border-border/40">
              <div className="max-w-2xl">
                <h2 className="t-section-title-sm text-foreground">
                  Public transparency requires disciplined record handling.
                </h2>
                <p className="mt-6 t-body-md text-muted-foreground leading-relaxed">
                  The purpose of this protocol is to separate what must be published for public clarity from what must remain protected to preserve audit integrity, privacy, and responsible record administration.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
