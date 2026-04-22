import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const commitments = [
  {
    t: "Integrity of Submission",
    d: "All records, claims, and category descriptions submitted at intake are accurate as of the date of submission and remain accurate throughout the verification term. Material inaccuracies discovered post-issuance are treated as a Mandatory Disclosure Event under §2.",
  },
  {
    t: "Supply-Chain Transparency",
    d: "All upstream pharmacies, outsourcing facilities, and qualified suppliers used to fulfill listed product categories are disclosed in full and supported by documentation retained in the audit file.",
  },
  {
    t: "Renewal & Examination Cooperation",
    d: "The entity will respond to renewal requests, clarification requests, and re-examination notices within published timelines and will produce updated records when requested.",
  },
  {
    t: "Public-Claims Alignment",
    d: "Public-facing representations (website, advertising, intake materials, third-party listings) remain consistent with the records reviewed during verification for the duration of the verification term.",
  },
];

const reportable = [
  "Change in supplier or upstream source for any reviewed product category, including substitution, addition, or termination of a disclosed manufacturing anchor.",
  "Change in licensure status of the entity or any disclosed upstream source, including suspension, lapse, voluntary surrender, or jurisdictional change.",
  "Change in business ownership, controlling interest, operating entity, or registered agent of record.",
  "Addition or removal of a reviewed product category, or material change to the scope of an existing category.",
  "Material change to public-facing claims regarding sourcing, credentials, accreditation, or examination scope.",
  "Notice of regulatory action by the FDA, a State Board of Pharmacy, a State Medical Board, or any comparable authority of competent jurisdiction.",
];

const triggers = [
  "Consumer Reports — submissions from consumers, clinicians, or third parties received through the public reporting channel and screened as in-scope under the Reporting & Market Intelligence protocol.",
  "Delisting, suspension, voluntary surrender, or removal of a disclosed upstream source or manufacturing anchor.",
  "Public regulatory action against the entity or any disclosed supplier by an authority of competent jurisdiction.",
  "Divergence between public-facing claims and the records on file under the audit register.",
  "Failure to respond to a renewal notice, clarification request, or Mandatory Disclosure Event acknowledgment within the published response window.",
  "Lapse of any required licensure, registration, or accreditation held by the entity or a disclosed upstream source.",
];

const actions = [
  {
    t: "Administrative Inquiry",
    d: "A formal written request for documentation, records, or explanation, issued to the entity of record. The listing remains in its current standing during the response window. Failure to respond within the published window is itself an audit re-opening trigger under §3.",
  },
  {
    t: "Scope Reduction",
    d: "The verified examination scope is narrowed to only those categories that remain supported by current records. Categories no longer supported are withdrawn from the public listing and recorded in the audit file.",
  },
  {
    t: "Status Revocation (Suspension)",
    d: "The Verified standing is administratively withdrawn pending evidentiary clarification. The listing publicly displays Suspended for the duration of the hold. The entity remains in the registry but does not carry an affirmative standing.",
  },
  {
    t: "Registry Expulsion (Removal)",
    d: "The listing is withdrawn from the registry under a Removed standing. Reinstatement requires a new application and a fresh examination cycle under §5. Prior audit history is retained in the registry of record.",
  },
  {
    t: "Public Note",
    d: "A short, factual notation attached to the public listing where public clarification is administratively warranted. Public notes are limited to verifiable, non-speculative statements and are recorded in the audit file with rationale.",
  },
];

const Accountability = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-ENFORCE-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Compliance & sanctions"
      title="Compliance Monitoring & Enforcement Protocols."
      lead="Attestations accepted by Verified entities, Mandatory Disclosure Events, audit re-opening triggers, and the graduated enforcement actions available to the framework when compliance obligations are not met."
    />

    <Section density="doc" bordered={false}>
      <SectionLabel
        number="§1"
        title="Attestations of Continuous Compliance."
        description="Upon assignment of a Verified standing, the entity formally accepts the following standing attestations. These attestations form the controlling basis on which the public listing is issued, maintained, and renewed."
      />
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl">
        {commitments.map((c) => (
          <div key={c.t}>
            <p className="h-card mb-2">{c.t}</p>
            <p className="text-[15px] text-muted-foreground leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted density="doc">
      <SectionLabel
        number="§2"
        title="Mandatory Disclosure Events (MDE)."
        description="The following events are designated Mandatory Disclosure Events and must be reported to the framework within seventy-two (72) hours of occurrence. Failure to report within the disclosure window does not invalidate the underlying event and is itself an audit re-opening trigger under §3."
      />
      <div className="border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3 max-w-3xl mb-5">
        <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground">
          DISCLOSURE WINDOW · <span className="text-foreground">72 HOURS</span> · <span className="text-foreground">SS-ENFORCE-2026.01</span> · §2
        </p>
      </div>
      <ul className="divide-y divide-border/70 border-y border-border/70 bg-background max-w-3xl">
        {reportable.map((r, i) => (
          <li key={i} className="flex gap-4 px-5 py-3 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-foreground">{r}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section density="doc">
      <SectionLabel
        number="§3"
        title="Audit Re-opening Triggers."
        description="Any of the following constitutes an audit re-opening trigger and may open a re-examination of an existing Verified listing, regardless of the listing's position in the renewal cycle. Consumer and clinician reports submitted through the public reporting channel are a primary source of data for this surveillance function."
      />
      <ul className="space-y-3 max-w-3xl">
        {triggers.map((t, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{t}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted density="doc">
      <SectionLabel
        number="§4"
        title="Graduated Administrative Actions."
        description="When a re-examination identifies non-compliance, the framework applies a graduated set of administrative actions scaled to the nature, severity, and recurrence of the underlying conduct. Actions are recorded in the audit file and, where applicable, reflected in the public listing."
      />
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {actions.map((a, i) => (
          <div key={a.t} className="grid md:grid-cols-12 gap-6 px-5 py-5">
            <div className="md:col-span-3">
              <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-1">
                ACTION · {String(i + 1).padStart(2, "0")}
              </p>
              <p className="h-card">{a.t}</p>
            </div>
            <p className="md:col-span-9 text-[15px] text-muted-foreground leading-relaxed">{a.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section density="doc">
      <SectionLabel number="§5" title="Re-entry Protocol." />
      <div className="border-l-2 border-l-foreground bg-surface-muted/40 px-4 py-3 max-w-3xl mb-5">
        <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground">
          <span className="text-foreground">PERMANENT RECORD</span> · PRIOR HISTORY RETAINED · <span className="text-foreground">SS-ENFORCE-2026.01</span> · §5
        </p>
      </div>
      <p className="max-w-3xl text-[15px] text-muted-foreground leading-relaxed">
        An entity under Status Revocation (Suspension) may return to Verified once the underlying matter is resolved and documented in the audit file. An entity under Registry Expulsion (Removal) may apply for re-entry only by submitting a new application and undergoing a fresh examination cycle in full. Prior audit history — including the original determination, the triggering events, and the disposition — is retained on the permanent record of the entity and is referenced in any subsequent examination. Re-entry is not granted on the basis of time elapsed alone.
      </p>
    </Section>

    <Section muted density="tight">
      <SectionLabel number="§6" title="Cross-references." />
      <ul className="space-y-2 text-[15px]">
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">Verification Protocol & Audit Methodology →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Glossary of Regulatory Standings →</Link></li>
        <li><Link to="/report-a-concern" className="text-foreground underline-offset-4 hover:underline">Reporting & Market Intelligence — submitting a triggering event →</Link></li>
      </ul>
      <div className="border-t-2 border-t-foreground bg-background px-5 py-4 max-w-4xl mt-8">
        <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground mb-2">
          OFFICIAL CITATION · SS-ENFORCE-2026.01
        </p>
        <p className="text-[12.5px] text-foreground leading-relaxed">
          Source Standard. Compliance Monitoring & Enforcement Protocols. Document SS-ENFORCE-2026.01. Issued 04 / 21 / 2026. On file with the issuing organization.
        </p>
        <p className="font-mono uppercase tracking-[0.08em] text-[11px] text-muted-foreground mt-2">
          Controlled copy · Subject to versioned revision under §1
        </p>
      </div>
    </Section>
  </>
);

export default Accountability;
