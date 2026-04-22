import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { BoardSection, BoardCiteFooter } from "@/components/BoardSection";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
import { DocSignature } from "@/components/DocSignature";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const DOC_ID = "SS-PRIVACY-2026.01";
const VERIFIED_ON = "04/21/2026";

const collected = [
  { t: "Vendor application materials", d: "Business identity, licensing records, supplier disclosures, certificates of analysis, invoice samples, and category documentation submitted under Form SS-INTAKE-01 and during subsequent audit cycles." },
  { t: "Contact submissions", d: "Name, email, organization (if provided), and message content submitted through public contact forms." },
  { t: "Concern reports", d: "Submission content, supporting materials, and contact details voluntarily provided through the reporting channel." },
  { t: "Site analytics", d: "Aggregate, non-identifying technical signals such as page views, referrer, device type, and approximate region. No advertising trackers, no cross-site identifiers." },
];

const uses = [
  "Conducting time-bound verification reviews and renewal cycles.",
  "Communicating with applicants, vendors, and reporters about active matters of record.",
  "Publishing public registry entries within the scope each entity has consented to under the Vendor Submission Standard.",
  "Maintaining the integrity of the framework, its documentation, and the public site.",
];

const partitioning = [
  { p: "Public registry data", v: "Business name, location, scope categories, current status, status date, public references, and any attached public note. Published under SS-FRAMEWORK-2026.01." },
  { p: "Protected Audit Material (PAM)", v: "Application materials, licensing records, supplier and pharmacy invoices, certificates of analysis, prescriber credentials, internal review notes, reporter identity, and unredacted contact submissions. Retained internally; not published; not shared outside the audit function except as required by lawful process." },
];

const partners = [
  "Hosting and content delivery infrastructure for the public registry.",
  "Transactional email delivery for applicant, vendor, and reporter correspondence.",
  "Privacy-respecting site analytics (aggregate, non-identifying signals only).",
];

const retention = [
  { t: "Active standing", d: "Protected Audit Material is retained for the full duration the entity holds an active determination (Verified, Pending Review, Under Review, Suspended) and through any subsequent renewal or re-review cycle." },
  { t: "Historical record", d: "Public registry fields and the determination history are retained as a permanent record of the framework. Status transitions remain visible after Removed status." },
  { t: "Withdrawn applications", d: "PAM associated with a withdrawn or denied application is retained for a defined administrative window, after which it is securely disposed of in accordance with the disposal schedule." },
  { t: "Concern reports", d: "Submission content is retained for the duration of the matter and the reference period required to detect repeat patterns; reporter identity is segregated and access-controlled." },
  { t: "Disposal", d: "Disposal of PAM follows controlled deletion procedures with audit logging. Aggregate, non-identifying analytics are retained without time limit." },
];

const rights = [
  "Request access to personal data Source Standard holds about you.",
  "Request correction of inaccurate personal data.",
  "Request deletion of personal data, subject to retention obligations for active or historical registry records.",
  "Withdraw a pending application at any time.",
];

const deeper = [
  { to: "/governance", label: "Governance" },
  { to: "/accountability", label: "Accountability & Enforcement" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
  { to: "/terms", label: "User Agreement & Registry Terms" },
  { to: "/report-a-concern", label: "Report a Concern" },
];

const waypoints = [
  { id: "data", number: "1", label: "Data collected" },
  { id: "use", number: "2", label: "Use" },
  { id: "partition", number: "3", label: "Partitioning" },
  { id: "partners", number: "4", label: "Partners" },
  { id: "retention", number: "5", label: "Retention" },
  { id: "rights", number: "6", label: "Rights" },
  { id: "dpo", number: "7", label: "DPO" },
  { id: "deeper", number: "8", label: "Read deeper" },
];

const KVList = ({ items }: { items: { t: string; d: string }[] }) => (
  <ol className="border border-border bg-background divide-y divide-border">
    {items.map((it, i) => (
      <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
        <div className="col-span-3 meta text-primary">{it.t}</div>
        <p className="col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{it.d}</p>
      </li>
    ))}
  </ol>
);

const SimpleList = ({ items }: { items: string[] }) => (
  <ol className="border border-border bg-background divide-y divide-border">
    {items.map((it, i) => (
      <li key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
        <div className="col-span-2 meta text-primary">{String(i + 1).padStart(2, "0")}</div>
        <p className="col-span-10 text-[14.5px] text-muted-foreground leading-relaxed">{it}</p>
      </li>
    ))}
  </ol>
);

const Privacy = () => (
  <>
    <PageMeta
      title="Privacy Policy"
      description="How Source Standard collects, partitions, retains, and protects information across the public registry and audit file."
    />
    <Breadcrumb items={[{ label: "Legal" }, { label: "Privacy" }]} />

    <BriefingHero
      variant="chapter"
      category="Policy · Data governance protocol"
      docId={DOC_ID}
      title="Data Governance & Privacy Policy"
      statement="What Source Standard collects, how it is partitioned between public registry and Protected Audit Material, the partners that process it, retention rules, and the rights of individuals whose data is held."
    />

    <RecordHeader
      compact
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      verifiedOn={VERIFIED_ON}
    />

    <DocJumpBar waypoints={waypoints} />

    <BoardSection id="data" n="1" category="Data collected" title="Information collected by the auditing body.">
      <KVList items={collected} />
    </BoardSection>

    <BoardSection id="use" n="2" category="Use" title="How collected data is used." muted>
      <SimpleList items={uses} />
    </BoardSection>

    <BoardSection
      id="partition"
      n="3"
      category="Partitioning"
      title="Information partitioning."
      rationale="A documented separation governs every record held by the auditing body. Public registry fields are published; Protected Audit Material (PAM) is retained internally for review purposes only and is never published or shared outside the audit function."
    >
      <KVList items={partitioning.map((r) => ({ t: r.p, d: r.v }))} />
    </BoardSection>

    <BoardSection
      id="partners"
      n="4"
      category="Partners"
      title="Infrastructure partners."
      rationale="A small number of infrastructure partners process data on the auditing body's behalf under written non-disclosure and privacy-preserving protocols. Partners are limited to the minimum data required to perform their function and are not authorised to use or disclose data for any other purpose."
      muted
    >
      <SimpleList items={partners} />
    </BoardSection>

    <BoardSection
      id="retention"
      n="5"
      category="Retention"
      title="Retention & disposal."
      rationale="Audit records are retained for the period necessary to maintain the integrity of the public registry. Disposal follows a documented schedule."
    >
      <KVList items={retention} />
    </BoardSection>

    <BoardSection id="rights" n="6" category="Rights" title="Rights of individuals." muted>
      <SimpleList items={rights} />
    </BoardSection>

    <BoardSection
      id="dpo"
      n="7"
      category="DPO"
      title="Data Privacy Officer."
      rationale="Privacy inquiries, data-subject requests, and lawful-process correspondence are handled by the Data Privacy Officer."
    >
      <div className="border border-border bg-background p-5 max-w-2xl">
        <p className="meta-mono text-foreground/70 mb-2">EMAIL</p>
        <a
          href="mailto:privacy@sourcestandard.org"
          className="text-[14.5px] font-medium text-primary underline-offset-4 hover:underline"
        >
          privacy@sourcestandard.org
        </a>
      </div>
      <p className="text-[13.5px] text-muted-foreground leading-relaxed max-w-2xl">
        This protocol is provided in plain, controlled terms and is reviewed by counsel. Material updates are issued as a new document version under the {DOC_ID} series.
      </p>
    </BoardSection>

    <BoardSection id="deeper" n="8" category="Read deeper" title="Cross-references." muted>
      <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
        {deeper.map((d, i) => (
          <li key={d.to} className="bg-background">
            <Link to={d.to} className="group flex items-start justify-between gap-3 p-5 hover:bg-surface-muted transition-colors">
              <div>
                <p className="meta text-primary mb-1">REF · {String(i + 1).padStart(2, "0")}</p>
                <p className="text-[14.5px] font-semibold text-foreground leading-snug">{d.label}</p>
              </div>
              <span className="text-primary text-[14px] shrink-0 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </BoardSection>

    <BoardCiteFooter
      citation={`Source Standard. Data Governance & Privacy Policy. Document ${DOC_ID}. Issued ${VERIFIED_ON}. Controlled copy on file with the issuing organization.`}
    />
    <DocSignature docId={DOC_ID} verifiedOn={VERIFIED_ON} />
  </>
);

export default Privacy;
