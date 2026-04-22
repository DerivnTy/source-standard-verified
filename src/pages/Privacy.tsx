import { RecordHeader } from "@/components/RecordHeader";
import { DocLayout, DocSection } from "@/components/DocLayout";
import { RelatedDocs } from "@/components/RelatedDocs";

const DOC_ID = "SS-PRIVACY-2026.01";

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

const waypoints = [
  { id: "data", number: "01", label: "Data collected" },
  { id: "use", number: "02", label: "How data is used" },
  { id: "partition", number: "03", label: "Partitioning" },
  { id: "partners", number: "04", label: "Partners" },
  { id: "retention", number: "05", label: "Retention" },
  { id: "rights", number: "06", label: "Your rights" },
  { id: "dpo", number: "07", label: "Data Privacy Officer" },
  { id: "deeper", number: "08", label: "Read deeper" },
];

const Privacy = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Policy · Data governance protocol"
      title="Data Governance & Privacy Policy."
      lead="The data governance protocol of the auditing body. Defines what information Source Standard collects, how it is partitioned between public registry content and Protected Audit Material, the infrastructure partners that process it, retention and disposal rules, and the rights of individuals whose data is held."
    />

    <DocLayout waypoints={waypoints} variant="certificate">
      <DocSection id="data" number="§1" title="Data collected" first>
        <div className="divide-y divide-border/60 border border-border/60 rounded-lg bg-surface shadow-sm overflow-hidden not-prose">
          {collected.map((c) => (
            <div key={c.t} className="grid md:grid-cols-12 gap-6 px-5 py-5">
              <p className="md:col-span-3 h-card">{c.t}</p>
              <p className="md:col-span-9 text-[15px] text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="use" number="§2" title="How data is used">
        <ul className="space-y-3 not-prose">
          {uses.map((u, i) => (
            <li key={i} className="flex gap-4 text-[15px]">
              <span className="meta-mono text-primary w-6 shrink-0">·</span>
              <span className="text-foreground">{u}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection
        id="partition"
        number="§3"
        title="Information Partitioning"
        description="A documented separation governs every record held by the auditing body. Public registry fields are published; Protected Audit Material (PAM) is retained internally for review purposes only and is never published or shared outside the audit function."
      >
        <div className="divide-y divide-border/60 border border-border/60 rounded-lg bg-surface shadow-sm overflow-hidden not-prose">
          {partitioning.map((row) => (
            <div key={row.p} className="grid md:grid-cols-12 gap-6 px-5 py-5">
              <p className="md:col-span-3 h-card">{row.p}</p>
              <p className="md:col-span-9 text-[15px] text-muted-foreground leading-relaxed">{row.v}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="partners"
        number="§4"
        title="Infrastructure Partners"
        description="A small number of infrastructure partners process data on the auditing body's behalf under written non-disclosure and privacy-preserving protocols. Partners are limited to the minimum data required to perform their function and are not authorised to use or disclose data for any other purpose."
      >
        <ul className="space-y-3 not-prose">
          {partners.map((p, i) => (
            <li key={i} className="flex gap-4 text-[15px]">
              <span className="meta-mono text-primary w-6 shrink-0">·</span>
              <span className="text-foreground">{p}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection
        id="retention"
        number="§5"
        title="Retention & Disposal"
        description="Audit records are retained for the period necessary to maintain the integrity of the public registry. Disposal follows a documented schedule."
      >
        <div className="divide-y divide-border/60 border border-border/60 rounded-lg bg-surface shadow-sm overflow-hidden not-prose">
          {retention.map((r) => (
            <div key={r.t} className="grid md:grid-cols-12 gap-6 px-5 py-5">
              <p className="md:col-span-3 h-card">{r.t}</p>
              <p className="md:col-span-9 text-[15px] text-muted-foreground leading-relaxed">{r.d}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="rights" number="§6" title="Your rights">
        <ul className="space-y-3 not-prose">
          {rights.map((r, i) => (
            <li key={i} className="flex gap-4 text-[15px]">
              <span className="meta-mono text-primary w-6 shrink-0">·</span>
              <span className="text-foreground">{r}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection
        id="dpo"
        number="§7"
        title="Data Privacy Officer (DPO)"
        description="Privacy inquiries, data-subject requests, and lawful-process correspondence are handled by the Data Privacy Officer."
      >
        <div className="border border-border/60 rounded-lg bg-surface shadow-sm p-5 max-w-2xl not-prose">
          <p className="meta-label mb-2">Email</p>
          <a
            href="mailto:privacy@sourcestandard.org"
            className="text-[15px] font-medium text-primary underline-offset-4 hover:underline"
          >
            privacy@sourcestandard.org
          </a>
        </div>
        <p className="mt-5 text-[13.5px] text-muted-foreground leading-relaxed max-w-2xl">
          This protocol is provided in plain, controlled terms and is reviewed by counsel. Material updates are issued as a new document version under the SS-PRIVACY-2026.01 series.
        </p>
      </DocSection>

      <DocSection id="deeper" number="§8" title="Read deeper">
        <RelatedDocs
          items={[
            { to: "/governance", label: "Governance" },
            { to: "/accountability", label: "Accountability & Enforcement" },
            { to: "/verification-disclaimer", label: "Verification Disclaimer" },
            { to: "/terms", label: "Terms of Use" },
            { to: "/report-a-concern", label: "Report a Concern" },
          ]}
        />
        <p className="mt-8 meta-label">
          Cite as: Source Standard Data Governance & Privacy Policy, SS-PRIVACY-2026.01.
        </p>
      </DocSection>
    </DocLayout>
  </>
);

export default Privacy;
