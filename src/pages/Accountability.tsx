import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { BoardSection, BoardCiteFooter } from "@/components/BoardSection";
import { DocJumpBar } from "@/components/DocJumpBar";
import { Callout } from "@/components/Callout";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const DOC_ID = "SS-ENFORCE-2026.01";
const VERIFIED_ON = "04/21/2026";

const commitments = [
  { t: "Integrity of Submission", d: "All records, claims, and category descriptions submitted at intake are accurate as of the date of submission and remain accurate throughout the verification term. Material inaccuracies discovered post-issuance are treated as a Mandatory Disclosure Event under §2." },
  { t: "Supply-Chain Transparency", d: "All upstream pharmacies, outsourcing facilities, and qualified suppliers used to fulfill listed product categories are disclosed in full and supported by documentation retained in the audit file." },
  { t: "Renewal & Examination Cooperation", d: "The entity will respond to renewal requests, clarification requests, and re-examination notices within published timelines and will produce updated records when requested." },
  { t: "Public-Claims Alignment", d: "Public-facing representations (website, advertising, intake materials, third-party listings) remain consistent with the records reviewed during verification for the duration of the verification term." },
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
  "Consumer Reports, submissions from consumers, clinicians, or third parties received through the public reporting channel and screened as in-scope under the Reporting & Market Intelligence protocol.",
  "Delisting, suspension, voluntary surrender, or removal of a disclosed upstream source or manufacturing anchor.",
  "Public regulatory action against the entity or any disclosed supplier by an authority of competent jurisdiction.",
  "Divergence between public-facing claims and the records on file under the audit register.",
  "Failure to respond to a renewal notice, clarification request, or Mandatory Disclosure Event acknowledgment within the published response window.",
  "Lapse of any required licensure, registration, or accreditation held by the entity or a disclosed upstream source.",
];

const actions = [
  { t: "Administrative Inquiry", d: "A formal written request for documentation, records, or explanation, issued to the entity of record. The listing remains in its current standing during the response window. Failure to respond within the published window is itself an audit re-opening trigger under §3." },
  { t: "Scope Reduction", d: "The verified examination scope is narrowed to only those categories that remain supported by current records. Categories no longer supported are withdrawn from the public listing and recorded in the audit file." },
  { t: "Status Revocation (Suspension)", d: "The Verified standing is administratively withdrawn pending evidentiary clarification. The listing publicly displays Suspended for the duration of the hold. The entity remains in the registry but does not carry an affirmative standing." },
  { t: "Registry Expulsion (Removal)", d: "The listing is withdrawn from the registry under a Removed standing. Reinstatement requires a new application and a fresh examination cycle under §5. Prior audit history is retained in the registry of record." },
  { t: "Public Note", d: "A short, factual notation attached to the public listing where public clarification is administratively warranted. Public notes are limited to verifiable, non-speculative statements and are recorded in the audit file with rationale." },
];

const deeper = [
  { to: "/how-it-works", label: "Verification Protocol & Audit Methodology" },
  { to: "/status-definitions", label: "Glossary of Regulatory Standings" },
  { to: "/report-a-concern", label: "Reporting & Market Intelligence" },
  { to: "/governance", label: "Regulatory Alignment & Oversight" },
];

const waypoints = [
  { id: "attestations", number: "1", label: "Attestations" },
  { id: "mde", number: "2", label: "Disclosure" },
  { id: "triggers", number: "3", label: "Triggers" },
  { id: "actions", number: "4", label: "Actions" },
  { id: "reentry", number: "5", label: "Re-entry" },
  { id: "deeper", number: "6", label: "Read deeper" },
];

const Accountability = () => (
  <>
    <PageMeta
      title="Accountability & Enforcement"
      description="Mandatory disclosure events, audit re-opening triggers, and the administrative actions available to Source Standard."
    />
    <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Accountability" }]} />

    <RecordHeader
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      verifiedOn={VERIFIED_ON}
      eyebrow="Compliance & sanctions"
      title="Compliance Monitoring & Enforcement Protocols."
      lead="Attestations accepted by Verified entities, Mandatory Disclosure Events, audit re-opening triggers, and the graduated enforcement actions available to the framework when compliance obligations are not met."
    />

    <DocJumpBar waypoints={waypoints} />

    <BoardSection
      id="attestations"
      n="1"
      category="Attestations"
      title="Attestations of continuous compliance."
      rationale="Upon assignment of a Verified standing, the entity formally accepts the following standing attestations. These attestations form the controlling basis on which the public listing is issued, maintained, and renewed."
    >
      <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
        {commitments.map((c, i) => (
          <li key={c.t} className="bg-background p-5">
            <p className="meta text-primary mb-1">ATTESTATION · {String(i + 1).padStart(2, "0")}</p>
            <p className="text-[14.5px] font-semibold text-foreground mb-2">{c.t}</p>
            <p className="text-[14.5px] text-muted-foreground leading-relaxed">{c.d}</p>
          </li>
        ))}
      </ul>
    </BoardSection>

    <BoardSection
      id="mde"
      n="2"
      category="Disclosure"
      title="Mandatory Disclosure Events (MDE)."
      rationale="The following events are designated Mandatory Disclosure Events and must be reported to the framework within seventy-two (72) hours of occurrence. Failure to report within the disclosure window does not invalidate the underlying event and is itself an audit re-opening trigger under §3."
      muted
    >
      <Callout tone="warning" eyebrow={`Disclosure window · ${DOC_ID} · §2`}>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[28px] md:text-[32px] font-semibold tabular-nums text-foreground leading-none">
            72h
          </span>
          <span className="text-[14.5px] text-muted-foreground">
            maximum window from event occurrence to disclosure to the framework.
          </span>
        </div>
      </Callout>
      <ol className="border border-border bg-background divide-y divide-border">
        {reportable.map((r, i) => (
          <li key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
            <div className="col-span-2 meta text-primary">{String(i + 1).padStart(2, "0")}</div>
            <p className="col-span-10 text-[14.5px] text-muted-foreground leading-relaxed">{r}</p>
          </li>
        ))}
      </ol>
    </BoardSection>

    <BoardSection
      id="triggers"
      n="3"
      category="Triggers"
      title="Audit re-opening triggers."
      rationale="Any of the following constitutes an audit re-opening trigger and may open a re-examination of an existing Verified listing, regardless of the listing's position in the renewal cycle. Consumer and clinician reports submitted through the public reporting channel are a primary source of data for this surveillance function."
    >
      <ol className="border border-border bg-background divide-y divide-border">
        {triggers.map((t, i) => (
          <li key={i} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
            <div className="col-span-2 meta text-primary">TRIG · {String(i + 1).padStart(2, "0")}</div>
            <p className="col-span-10 text-[14.5px] text-muted-foreground leading-relaxed">{t}</p>
          </li>
        ))}
      </ol>
    </BoardSection>

    <BoardSection
      id="actions"
      n="4"
      category="Actions"
      title="Graduated administrative actions."
      rationale="When a re-examination identifies non-compliance, the framework applies a graduated set of administrative actions scaled to the nature, severity, and recurrence of the underlying conduct. Actions are recorded in the audit file and, where applicable, reflected in the public listing."
      muted
    >
      <ol className="border border-border bg-background divide-y divide-border">
        {actions.map((a, i) => (
          <li key={a.t} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
            <div className="col-span-3">
              <p className="meta text-primary mb-1">ACTION · {String(i + 1).padStart(2, "0")}</p>
              <p className="text-[14.5px] font-semibold text-foreground">{a.t}</p>
            </div>
            <p className="col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{a.d}</p>
          </li>
        ))}
      </ol>
    </BoardSection>

    <BoardSection id="reentry" n="5" category="Re-entry" title="Re-entry protocol.">
      <Callout tone="notice" eyebrow={`Permanent record · ${DOC_ID} · §5`}>
        <p className="text-[14.5px] text-foreground leading-relaxed">
          Prior history retained. Re-entry is not granted on the basis of time elapsed alone.
        </p>
      </Callout>
      <p className="text-[14.5px] text-muted-foreground leading-relaxed">
        An entity under Status Revocation (Suspension) may return to Verified once the underlying matter is resolved and documented in the audit file. An entity under Registry Expulsion (Removal) may apply for re-entry only by submitting a new application and undergoing a fresh examination cycle in full. Prior audit history, including the original determination, the triggering events, and the disposition, is retained on the permanent record of the entity and is referenced in any subsequent examination.
      </p>
    </BoardSection>

    <BoardSection id="deeper" n="6" category="Read deeper" title="Cross-references." muted>
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
      citation={`Source Standard. Compliance Monitoring & Enforcement Protocols. Document ${DOC_ID}. Issued ${VERIFIED_ON}. Controlled copy on file with the issuing organization.`}
    />
  </>
);

export default Accountability;
