import { PageHeader } from "@/components/PageHeader";
import { authorities } from "@/data/authorities";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { NavCard, PageSection } from "@/components/system";

const AUTHORITY_REFERENCE_OVERRIDES: Record<string, string> = {
  FDA: "Section 501(a)(2)(B) of the FD&C Act (21 U.S.C. § 351(a)(2)(B)); 503A/503B registration and establishment records; recall and warning-letter history.",
  PCAB: "Accreditation status of compounding pharmacies operating under recognized USP compendial standards.",
  NSF: "Independent product testing and facility certification issued under publicly recognized consensus standards.",
  USP: "Compendial standards, General Chapters <795> (non-sterile compounding), <797> (sterile compounding), and <800> (hazardous drugs).",
  STATE: "State-level pharmacy and prescriber licensure records, cited per the applicable jurisdiction of practice.",
};

const deeper = [
  { to: "/accountability", label: "Accountability & Enforcement", desc: "How Source Standard responds when integrity is questioned." },
  { to: "/medical-advisory", label: "Medical Advisory Board", desc: "Independent clinical oversight of the framework." },
  { to: "/how-it-works", label: "Verification Protocol", desc: "The process behind each verification decision." },
  { to: "/status-definitions", label: "Status Definitions", desc: "What each public verification status means." },
  { to: "/greenlist", label: "Facility Records", desc: "Documented sourcing and standing of upstream facilities." },
];

const ecosystemCategories = [
  {
    t: "Independent laboratories",
    d: "Independent laboratory testing, including quality and potency analysis where applicable. Results, when provided, inform Source Standard's review of sourcing claims and facility standing.",
  },
  {
    t: "Healthcare organizations",
    d: "Licensed organizations whose published standards or professional materials may be cited when they are relevant to a review.",
  },
  {
    t: "Research references",
    d: "Published research or technical literature may be cited when it is relevant to a review. Citation is not a partnership or endorsement.",
  },
];

const Governance = () => (
  <>
    <PageMeta
      title="Who Oversees Source Standard?"
      description="Source Standard governance: statutory anchors, clinical advisory oversight, and the institutional posture of organizational neutrality."
    />
    <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Governance" }]} />

    <PageHeader
      title="Who Oversees Source Standard?"
      description="How Source Standard publishes its criteria, keeps review independent of outcome, and records determinations."
    />

    <PageSection
      id="advisory"
      title="Framework criteria maintained under clinical oversight"
    >
      <div className="space-y-4">
        <p className="t-body-sm text-muted-foreground leading-relaxed">
          Licensed clinicians and advisors help review the scope definitions, evidence standards, and renewal
          intervals used by the Source Standard framework. Advisory participation supports the integrity of the
          framework, but does not turn Source Standard into a medical provider.
        </p>
        <p className="t-body-sm text-muted-foreground leading-relaxed">
          Advisors do not diagnose, treat, prescribe, or evaluate individual patients through Source Standard.
        </p>
      </div>
    </PageSection>

    <PageSection
      id="anchors"
      title="Anchored standards"
      intro="Where a requirement references a statute or compendial standard, the source is listed below. Source Standard still defines how those references are applied in its own published review criteria."
    >
      <div className="hidden md:grid grid-cols-12 gap-3 pb-2.5 border-b border-border">
        <div className="col-span-2 meta-mono text-foreground/70">ANCHOR</div>
        <div className="col-span-4 meta-mono text-foreground/70">ISSUING AUTHORITY</div>
        <div className="col-span-6 meta-mono text-foreground/70">REFERENCE</div>
      </div>
      <ul className="divide-y divide-border border-t border-border md:border-t-0">
        {authorities.map((a) => (
          <li
            key={a.code}
            className="flex flex-col gap-2 py-4 md:grid md:grid-cols-12 md:gap-3 md:items-baseline"
          >
            <div className="md:col-span-2 meta text-primary font-semibold">{a.code}</div>
            <div className="md:col-span-4">
              <p className="t-body-sm font-semibold text-foreground">{a.full}</p>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="meta-mono text-foreground/70 hover:text-primary transition-colors break-all"
              >
                {a.url.replace(/^https?:\/\//, "")} ↗
              </a>
            </div>
            <p className="md:col-span-6 t-body-sm text-muted-foreground leading-relaxed">
              {AUTHORITY_REFERENCE_OVERRIDES[a.code] ?? a.references}
            </p>
          </li>
        ))}
      </ul>
    </PageSection>

    <PageSection id="neutrality" title="Organizational neutrality">
      <div className="space-y-4">
        <p className="t-body-sm text-muted-foreground leading-relaxed">
          Source Standard does not manufacture, distribute, prescribe, dispense, or sell products in the categories
          it evaluates, and holds no equity, royalty, or revenue-share interest in any clinic or facility
          under review.
        </p>
        <p className="t-body-sm text-muted-foreground leading-relaxed">
          Evaluation fees, where applicable, are disclosed at intake and do not vary based on outcome.
          Reviewer determinations are recorded with written rationale. Payment buys the evaluation, never the grade.
        </p>
      </div>
    </PageSection>

    <PageSection
      id="ecosystem"
      title="Independent organizations supporting the framework"
      intro="Source Standard operates within a broader ecosystem of independent organizations while remaining operationally independent."
    >
      <dl className="divide-y divide-border/60 border-t border-b border-border/60">
        {ecosystemCategories.map((c) => (
          <div
            key={c.t}
            className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-x-8 gap-y-1 py-3.5"
          >
            <dt className="font-sans text-foreground" style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>
              {c.t}
            </dt>
            <dd className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              {c.d}
            </dd>
          </div>
        ))}
      </dl>
    </PageSection>

    <PageSection last id="deeper" title="Read deeper" bordered={false}>
      <div className="grid gap-2 sm:grid-cols-2">
        {deeper.map((d) => (
          <NavCard key={d.to} to={d.to} title={d.label} desc={d.desc} />
        ))}
      </div>
    </PageSection>
  </>
);

export default Governance;
