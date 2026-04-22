import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const inScope = [
  "Sourcing concerns — claimed upstream supplier does not match documented chain-of-custody records on file.",
  "Marketing-Documentation Divergence — vendor's public-facing website, advertising, or claims contradict reviewed records within the declared examination scope.",
  "Upstream-supplier compromise — a disclosed manufacturing anchor has been delisted, suspended, or has lapsed FDA registration or state licensure.",
  "Listing accuracy — incorrect category, scope, jurisdiction, or contact information of record.",
  "Unauthorized Attribution — entity displaying, implying, or otherwise asserting a Source Standard standing it does not hold.",
];

const outOfScope = [
  "Clinical or medical complaints — refer to FDA MedWatch or the appropriate state medical board.",
  "Pharmacy compounding complaints — refer to the relevant state board of pharmacy or FDA.",
  "Billing, refund, or payment disputes — pursue directly with the vendor or the originating payment processor.",
  "Personal disputes, employment matters, or non-public commercial disputes between private parties.",
];

const lifecycle = [
  { t: "Administrative Acknowledgment", d: "Submission is logged into the intake register and acknowledged. A reference identifier may be issued for follow-up correspondence." },
  { t: "Credibility Screening", d: "Submission is screened against scope, completeness, and credibility thresholds. Out-of-jurisdiction reports are referred to the appropriate authority." },
  { t: "Evidentiary Reconciliation", d: "In-scope submissions are reconciled against records on file. The relevant listing may be transitioned to Under Review pending the outcome." },
  { t: "Disposition", d: "Possible dispositions include no change, clarification request, scope reduction, Suspended standing, Removal (De-listing), or attachment of a public note. The reporter is not entitled to internal review details but may receive a status acknowledgment." },
];

const ReportConcern = () => (
  <>
    <PageMeta
      title="Report a Concern"
      description="Submit a credible concern regarding a listed entity, sourcing claim, or unauthorized attribution."
    />
    <Breadcrumb
      items={[
      { label: "Registry", to: "/verified-vendors" },
      { label: "Report a Concern" },
      ]}
    />

    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-REPORT-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Compliance reporting"
      title="Reporting & Market Intelligence."
      lead="Intake channel for Registry discrepancies, supply-chain alignment concerns, and unauthorized attribution of Source Standard standings. Submissions are screened, triaged, and reconciled against the audit file."
    />

    <Section density="doc" bordered={false}>
      <SectionLabel number="§1" title="Investigative Scope." description="Reports falling within the surveillance mandate of the Source Standard framework. The following categories are accepted for review against the audit file." />
      <ul className="space-y-3 max-w-3xl">
        {inScope.map((s, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{s}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted density="doc">
      <SectionLabel number="§2" title="Jurisdictional Boundaries." description="Source Standard is an Auditing Body, not a regulator, clinical authority, or court of competent jurisdiction. The following matters fall outside the surveillance mandate and must be directed to the appropriate authority." />
      <ul className="space-y-3 max-w-3xl">
        {outOfScope.map((s, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-muted-foreground">{s}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section density="doc">
      <SectionLabel number="§3" title="Submission lifecycle." />
      <p className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-foreground mb-3">
        Controlled intake · Four-stage flow
      </p>
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {lifecycle.map((s, i) => (
          <div key={s.t} className="grid md:grid-cols-12 gap-6 px-5 py-5">
            <div className="md:col-span-3 flex items-baseline gap-3">
              <span className="meta-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <p className="h-card">{s.t}</p>
            </div>
            <p className="md:col-span-9 text-[15px] text-muted-foreground leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted density="doc">
      <SectionLabel number="§4" title="Confidentiality & Integrity Standards." description="Reporter Anonymity is a controlling principle of the intake process. Reporter identity is treated as confidential within the review file and is never published. Submissions made in good faith — even those that do not result in a status change — are valued and contribute to the integrity of the registry. Knowingly false, harassing, or vexatious submissions are disregarded and may themselves be referred to the appropriate authority." />
    </Section>

    <Section density="doc">
      <SectionLabel number="§5" title="Submission channel." description="A structured intake portal is forthcoming. In the interim, submissions are accepted at the secure address below. All correspondence is logged to the intake register." />
      <div className="border border-border rounded-[2px] bg-background p-5 max-w-2xl">
        <p className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-muted-foreground mb-4">
          SECURE SUBMISSION POINT · <span className="text-foreground">SS-REPORT-INTAKE</span>
        </p>
        <p className="meta-label mb-2">Email</p>
        <a
          href="mailto:concerns@sourcestandard.org?subject=Concern%20Report"
          className="text-[16px] font-medium text-foreground underline-offset-4 hover:underline break-all"
        >
          concerns@sourcestandard.org
        </a>
        <p className="mt-4 text-[13.5px] text-muted-foreground leading-relaxed">
          Submissions should include: the listing or entity name, the nature of the discrepancy, supporting links or documents, and a means of follow-up correspondence should clarification be required. Mark sensitive material accordingly.
        </p>
      </div>
    </Section>

    <Section muted density="tight">
      <SectionLabel number="§6" title="Cross-references." />
      <ul className="space-y-2 text-[15px]">
        <li><Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">Accountability & Enforcement — triggering events →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Glossary of Regulatory Standings →</Link></li>
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">Verification Protocol & Audit Methodology →</Link></li>
      </ul>
    </Section>
  </>
);

export default ReportConcern;
