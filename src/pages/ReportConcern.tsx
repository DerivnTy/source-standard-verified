import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const inScope = [
  "Sourcing concerns — claimed supplier does not match documented records.",
  "Public claims divergence — vendor's website or marketing contradicts reviewed records.",
  "Supplier issues — disclosed upstream source has been delisted, suspended, or has lapsed registration.",
  "Listing accuracy — incorrect category, scope, location, or contact information.",
  "Misuse of status — entity displaying or implying a Source Standard status it does not hold.",
];

const outOfScope = [
  "Clinical or medical complaints — direct to FDA MedWatch or your state medical board.",
  "Pharmacy compounding complaints — direct to your state board of pharmacy or FDA.",
  "Billing, refund, or payment disputes — handle directly with the vendor or your payment processor.",
  "Personal disputes, employment matters, or non-public commercial disputes.",
];

const lifecycle = [
  { t: "Intake", d: "Submission is received and acknowledged. A reference identifier may be issued for follow-up." },
  { t: "Triage", d: "The submission is screened for scope, completeness, and credibility. Out-of-scope reports are referred to the appropriate authority." },
  { t: "Review", d: "In-scope reports are evaluated against records on file. The relevant listing may move to Under Review." },
  { t: "Outcome", d: "Possible outcomes include no change, clarification request, scope reduction, suspension, removal, or a public note. The reporter is not entitled to internal review details but may receive a status acknowledgment." },
];

const ReportConcern = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-REPORT-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Process"
      title="Report a concern."
      lead="What is in scope, how submissions are reviewed, and what reporters can expect."
    />

    <Section>
      <SectionLabel number="§1" title="In scope" description="Reports relevant to the integrity of a Source Standard listing or registry entry." />
      <ul className="space-y-3 max-w-3xl">
        {inScope.map((s, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{s}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted>
      <SectionLabel number="§2" title="Out of scope" description="The framework is not a substitute for regulatory or clinical authorities. The following matters should be directed elsewhere." />
      <ul className="space-y-3 max-w-3xl">
        {outOfScope.map((s, i) => (
          <li key={i} className="flex gap-4 text-[14.5px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-muted-foreground">{s}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section>
      <SectionLabel number="§3" title="How submissions are reviewed" />
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {lifecycle.map((s, i) => (
          <div key={s.t} className="grid md:grid-cols-12 gap-6 px-6 py-6">
            <div className="md:col-span-3 flex items-baseline gap-3">
              <span className="meta-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[14px] font-semibold text-foreground">{s.t}</p>
            </div>
            <p className="md:col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted>
      <SectionLabel number="§4" title="Confidentiality and good faith" description="Reporter identity is treated as confidential within the review process and is not published. Submissions made in good faith — even if they do not result in a status change — are valued and contribute to the registry's integrity. Knowingly false or harassing submissions are disregarded and may themselves be referred elsewhere." />
    </Section>

    <Section>
      <SectionLabel number="§5" title="Submitting a report" description="A structured intake form is forthcoming. In the interim, submit reports by email." />
      <div className="border border-border/70 rounded-[2px] bg-background p-6 max-w-2xl">
        <p className="meta-label mb-2">Email</p>
        <a
          href="mailto:concerns@sourcestandard.org?subject=Concern%20Report"
          className="text-[15px] font-medium text-foreground underline-offset-4 hover:underline break-all"
        >
          concerns@sourcestandard.org
        </a>
        <p className="mt-5 text-[14px] text-muted-foreground leading-relaxed">
          Please include: the listing or entity name, the nature of the concern, any supporting links or documents, and a way to follow up if clarification is needed.
        </p>
      </div>
    </Section>

    <Section muted>
      <SectionLabel number="§6" title="Read deeper" />
      <ul className="space-y-2 text-[14.5px]">
        <li><Link to="/accountability" className="text-foreground underline-offset-4 hover:underline">Accountability & Enforcement →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">Verification →</Link></li>
      </ul>
      <p className="mt-10 meta-label">
        Cite as: Source Standard Report a Concern, SS-REPORT-2026.01.
      </p>
    </Section>
  </>
);

export default ReportConcern;
