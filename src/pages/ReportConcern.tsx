import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const inScope = [
  "Sourcing concerns. A vendor's claimed upstream supplier appears inconsistent with documentation or chain-of-custody records on file.",
  "Public-claim discrepancy. A vendor's website, advertising, or public statement appears inconsistent with the current Source Standard record.",
  "Upstream record change. A listed upstream facility appears to have a changed registration, license status, public-record status, or review relevance.",
  "Listing accuracy. A registry record may contain an incorrect category, status, location, jurisdiction, vendor type, or contact detail.",
  "Unauthorized status use. An entity displays, implies, or references Source Standard status it does not currently hold.",
];

const outOfScope = [
  "Clinical or medical complaints should be directed to FDA MedWatch, the treating clinician, or the appropriate state medical board.",
  "Pharmacy compounding complaints should be directed to the relevant state board of pharmacy or FDA where applicable.",
  "Billing, refund, or payment disputes should be pursued directly with the vendor or payment processor.",
  "Personal disputes, employment matters, and non-public commercial disputes are outside the registry review scope.",
];

const lifecycle = [
  { t: "Administrative acknowledgment", d: "Submission is logged into the intake register. A reference identifier may be issued for follow-up correspondence." },
  { t: "Scope screening", d: "Submission is screened for review scope, completeness, and available supporting information. Out-of-scope submissions may be redirected to the appropriate authority." },
  { t: "Record reconciliation", d: "In-scope submissions are reviewed against available registry records, submitted documentation, public records, and status history. A relevant listing may be moved to Under Review if additional review is warranted." },
  { t: "Disposition", d: "Possible outcomes include no status change, clarification request, record correction, limitation statement, status update, suspension, removal, or public note. Reporters are not entitled to internal review details but may receive a status acknowledgment." },
];

const ReportConcern = () => (
  <>
    <PageMeta
      title="Reporting & Registry Review"
      description="Intake channel for registry discrepancies, sourcing-claim concerns, and unauthorized use of Source Standard status language."
    />
    <Breadcrumb
      items={[
      { label: "Registry", to: "/verified-vendors" },
      { label: "Reporting & Registry Review" },
      ]}
    />

    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-REPORT-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Public intake channel"
      title="Reporting & Registry Review"
      lead="Intake channel for registry discrepancies, sourcing-claim concerns, and unauthorized use of Source Standard status language. Submissions are screened, logged, and reviewed against available records."
    />

    <Section density="doc" bordered={false}>
      <SectionLabel number="§1" title="Review Scope" description="Reports accepted for review within the Source Standard framework. The following categories may be reviewed against registry records, submitted documentation, and public sources." />
      <ul className="space-y-3 max-w-3xl">
        {inScope.map((s, i) => (
          <li key={i} className="flex gap-4 t-body-sm">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{s}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted density="doc">
      <SectionLabel number="§2" title="Review Boundaries" description="Source Standard is a private public-reference and verification framework. It is not a regulator, clinical authority, law enforcement agency, or court. The following matters fall outside the Source Standard review scope and should be directed to the appropriate authority." />
      <ul className="space-y-3 max-w-3xl">
        {outOfScope.map((s, i) => (
          <li key={i} className="flex gap-4 t-body-sm">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-muted-foreground">{s}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section density="doc">
      <SectionLabel number="§3" title="Submission Lifecycle" />
      <p className="t-utility-xs font-mono uppercase tracking-[0.1em] text-foreground mb-3">
        Controlled intake · Four-stage flow
      </p>
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {lifecycle.map((s, i) => (
          <div key={s.t} className="grid md:grid-cols-12 gap-6 px-5 py-5">
            <div className="md:col-span-3 flex items-baseline gap-3">
              <span className="meta-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <p className="h-card">{s.t}</p>
            </div>
            <p className="md:col-span-9 t-body-sm text-muted-foreground leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted density="doc">
      <SectionLabel number="§4" title="Confidentiality & Integrity Standards" description="Reporter identity is treated as confidential within the review file and is not published. Good-faith submissions are valued even when they do not result in a status change. Knowingly false, harassing, or bad-faith submissions may be disregarded and may be referred to an appropriate authority when warranted." />
    </Section>

    <Section density="doc">
      <SectionLabel number="§5" title="Submission Channel" description="A structured intake portal is forthcoming. In the interim, submissions are accepted at the secure address below. All correspondence is logged to the intake register." />
      <div className="border border-border rounded-[2px] bg-background p-5 max-w-2xl">
        <p className="t-utility-xs font-mono uppercase tracking-[0.1em] text-muted-foreground mb-4">
          SECURE SUBMISSION POINT · <span className="text-foreground">SS-REPORT-INTAKE</span>
        </p>
        <p className="meta-label mb-2">Email</p>
        <a
          href="mailto:concerns@sourcestandard.org?subject=Concern%20Report"
          className="t-body-md font-medium text-foreground underline-offset-4 hover:underline break-all"
        >
          concerns@sourcestandard.org
        </a>
        <p className="mt-4 t-body-sm text-muted-foreground leading-relaxed">
          Submissions should include the listing or entity name, the nature of the discrepancy, supporting links or documents, and a follow-up contact if clarification is required. Mark sensitive material clearly.
        </p>
      </div>
    </Section>

    <Section muted density="tight">
      <SectionLabel number="§6" title="Cross-references" />
      <ul className="space-y-2 t-body-sm">
        <li><Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">Compliance & Operating Boundaries →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">Verification Protocol →</Link></li>
      </ul>
    </Section>
  </>
);

export default ReportConcern;
