import { PageHeader } from "@/components/PageHeader";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ContentsNav,
  DataTable,
  MethodologyNote,
  NavCard,
  PageSection,
  RelatedRail,
  type ContentsEntry,
  type DataColumn,
} from "@/components/system";

type AnchorRow = {
  code: string;
  authority: string;
  url: string;
  reference: string;
  limit: string;
};

/**
 * Anchored standards. Each row states the reference Source Standard relies on
 * AND the limit of what that reference establishes, so no registration,
 * accreditation, or compendial standard is presented as more than it is.
 */
const ANCHOR_ROWS: AnchorRow[] = [
  {
    code: "FDA",
    authority: "U.S. Food & Drug Administration",
    url: "https://www.fda.gov",
    reference:
      "Applicable FD&C Act provisions, including Section 501(a)(2)(B) (21 U.S.C. § 351(a)(2)(B)); 503A and 503B statutory categories; establishment and outsourcing-facility registration records; recalls, warning letters, and inspection records where publicly available.",
    limit:
      "FDA registration is not FDA approval. 503B registration is not independent verification of any specific product.",
  },
  {
    code: "PCAB / ACHC",
    authority: "Pharmacy Compounding Accreditation Board (ACHC)",
    url: "https://achc.org/pcab/",
    reference:
      "Accreditation status of compounding pharmacies, where accreditation is applicable and publicly verifiable.",
    limit:
      "Accreditation reflects a periodic review against that body's criteria. It is not proof of every aspect of product quality.",
  },
  {
    code: "USP",
    authority: "United States Pharmacopeia",
    url: "https://www.usp.org",
    reference:
      "Compendial standards, including General Chapters <795> (non-sterile compounding), <797> (sterile compounding), and <800> (hazardous drugs).",
    limit:
      "A compendial chapter defines a standard of practice. Citing it does not establish that a given facility conformed to it on a given date.",
  },
  {
    code: "STATE",
    authority: "State Boards of Pharmacy",
    url: "https://nabp.pharmacy",
    reference:
      "State-level pharmacy and prescriber licensure records, and disciplinary or regulatory actions, cited per the applicable jurisdiction of practice.",
    limit:
      "Licensure establishes authorization to operate in a jurisdiction. It does not establish sourcing transparency or product quality.",
  },
  {
    code: "NSF",
    authority: "NSF International",
    url: "https://www.nsf.org",
    reference:
      "Independent product testing and facility certification under publicly recognized consensus standards, cited only where relevant to the specific framework requirement being described.",
    limit:
      "A certification is scoped to what was tested. It does not extend to products, lots, or sites outside that scope.",
  },
];

const ANCHOR_COLUMNS: DataColumn<AnchorRow>[] = [
  {
    key: "code",
    header: "Anchor",
    render: (r) => <span className="meta text-primary font-semibold">{r.code}</span>,
  },
  {
    key: "authority",
    header: "Issuing authority",
    render: (r) => (
      <span className="block">
        <span className="block t-body-sm font-semibold text-foreground">{r.authority}</span>
        <a
          href={r.url}
          target="_blank"
          rel="noreferrer"
          className="meta-mono text-foreground/70 hover:text-primary transition-colors break-all"
        >
          {r.url.replace(/^https?:\/\//, "")} ↗
        </a>
      </span>
    ),
  },
  {
    key: "reference",
    header: "Reference",
    render: (r) => (
      <span className="block t-body-sm text-muted-foreground leading-relaxed">{r.reference}</span>
    ),
  },
  {
    key: "limit",
    header: "What it does not establish",
    render: (r) => (
      <span className="block t-body-sm text-muted-foreground leading-relaxed">{r.limit}</span>
    ),
  },
];

const CONTENTS: ContentsEntry[] = [
  { id: "oversight", label: "Clinical oversight", desc: "How framework criteria are reviewed." },
  { id: "anchors", label: "Anchored standards", desc: "The authorities the framework references." },
  { id: "neutrality", label: "Neutrality", desc: "Separation from evaluated entities." },
  { id: "ecosystem", label: "Ecosystem", desc: "Independent organizations and their function." },
  { id: "deeper", label: "Read deeper", desc: "Protocol, statuses, and enforcement." },
];

const deeper = [
  { to: "/accountability", label: "Accountability & Enforcement", desc: "How Source Standard responds when integrity is questioned." },
  { to: "/medical-advisory", label: "Medical Advisory Board", desc: "Independent clinical oversight of the framework." },
  { to: "/how-it-works", label: "Verification Protocol", desc: "The process behind each verification decision." },
  { to: "/status-definitions", label: "Status Definitions", desc: "What each public verification status means." },
  { to: "/facilities", label: "Facility Records", desc: "Documented sourcing and standing of upstream facilities." },
  { to: "/intelligence", label: "Research & Intelligence", desc: "Regulatory updates, enforcement actions, and testing analysis." },
];

const ecosystemCategories = [
  {
    t: "Independent laboratories",
    d: "Laboratories perform analytical testing, including identity, potency, sterility, and endotoxin analysis where applicable. Where results are provided to Source Standard, they inform the review of sourcing claims and facility standing. Listing this function does not imply that any particular laboratory has a relationship with Source Standard.",
  },
  {
    t: "Healthcare organizations",
    d: "Clinical and professional organizations publish practice standards and professional guidance that inform how sourcing claims are interpreted. Source Standard references such material as published; it does not represent endorsement in either direction.",
  },
  {
    t: "Research partners",
    d: "Research and academic sources contribute published evidence and industry data used as context in Source Standard records and intelligence coverage. Citation of published research is not a partnership.",
  },
];

const Governance = () => (
  <>
    <PageMeta
      title="Who Oversees Source Standard?"
      description="Source Standard governance: statutory and compendial anchors, clinical advisory oversight, organizational neutrality, and the limits of what each authority establishes."
    />
    <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Governance" }]} />

    <PageHeader
      title="Who Oversees Source Standard?"
      description="How Source Standard stays independent, objective, and accountable."
    />

    <PageSection first>
      <ContentsNav entries={CONTENTS} />
    </PageSection>

    <PageSection
      id="oversight"
      title="Framework criteria maintained under clinical oversight"
      intro="Scope definitions, evidence standards, and renewal intervals are reviewed with clinical and scientific input rather than set unilaterally."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
        <div className="space-y-4" style={{ maxWidth: "68ch" }}>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Licensed clinicians and advisors help review the scope definitions, evidence standards, and
            renewal intervals used by the Source Standard framework. Advisory participation supports the
            integrity of the framework; it does not make Source Standard a medical provider.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Advisors do not diagnose, treat, prescribe, or evaluate individual patients through Source
            Standard, and do not direct the outcome of any individual verification record.
          </p>
        </div>
        <MethodologyNote
          means="Framework criteria are reviewed with clinical and scientific input before they are applied to records."
          doesNotMean="Advisory involvement is not clinical care, not an endorsement of any provider, and not a review of any individual patient's treatment."
          to="/medical-advisory"
          linkLabel="See the Medical Advisory Board"
        />
      </div>
    </PageSection>

    <PageSection
      id="anchors"
      title="Anchored standards"
      intro="Source Standard does not originate regulatory requirements. Each framework requirement is anchored to a statutory provision, regulatory record, compendial standard, or accreditation record issued by an external authority. Each anchor below is published alongside the limit of what it establishes."
    >
      <DataTable
        columns={ANCHOR_COLUMNS}
        rows={ANCHOR_ROWS}
        rowKey={(r) => r.code}
        caption="Authorities referenced by the Source Standard framework"
      />
      <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed" style={{ maxWidth: "68ch" }}>
        Anchors are cited per requirement. An authority appearing in this table is not a partner of
        Source Standard and has not reviewed, endorsed, or approved the framework.
      </p>
    </PageSection>

    <PageSection
      id="neutrality"
      title="Organizational neutrality"
      intro="Independence is structural: Source Standard does not participate commercially in the market it documents."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
        <div className="space-y-4" style={{ maxWidth: "68ch" }}>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Source Standard does not manufacture, distribute, prescribe, dispense, or sell products in
            the categories it evaluates. It is not a pharmacy, an outsourcing facility, a prescriber, or
            a reseller, and it does not take a position in the commercial transaction between a provider
            and a patient.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Where a fee applies to an evaluation, the fee covers the work of the evaluation only.
            Payment obtains a review; it does not obtain a status. A record can result in verified
            standing, an absence of verified standing, or withdrawal of standing already published.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Verified and Greenlist standing are separate designations with separate criteria, and neither
            can be purchased.
          </p>
        </div>
        <MethodologyNote
          means="Source Standard has no operating role in manufacturing, prescribing, dispensing, or selling the products it documents."
          doesNotMean="Neutrality is not a warranty of any provider, product, or outcome, and a published record is not regulatory approval."
          to="/verification-disclaimer"
          linkLabel="Read the scope disclaimer"
        />
      </div>
    </PageSection>

    <PageSection
      id="ecosystem"
      title="Independent organizations supporting the framework"
      intro="Source Standard operates within a broader ecosystem of independent organizations while remaining operationally independent of each of them."
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

    <PageSection id="deeper" title="Read deeper" bordered={false} pb="0">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
        <div className="grid gap-2.5 sm:grid-cols-2">
          {deeper.map((d) => (
            <NavCard key={d.to} to={d.to} title={d.label} desc={d.desc} />
          ))}
        </div>
        <RelatedRail
          title="Registry"
          links={[
            { to: "/clinics", label: "Vendor registry", description: "Search providers by name, state, or status." },
            { to: "/facilities", label: "Facility records", description: "Upstream sources and current standing." },
            { to: "/apply", label: "Apply for verification", description: "Submit sourcing documentation for review." },
            { to: "/report-concern", label: "Report a concern", description: "Submit information relevant to a record." },
          ]}
        />
      </div>
    </PageSection>

    <EditorialBackLink to="/" label="Back to Home" />
  </>
);

export default Governance;
