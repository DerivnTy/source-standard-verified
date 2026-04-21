import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";

const whyItMatters: { t: string; d: string }[] = [
  {
    t: "Sourcing records matter",
    d: "Vendors are only as legitimate as the pharmacies and suppliers behind them. Verification examines that chain rather than the storefront alone.",
  },
  {
    t: "Public claims should match documented reality",
    d: "Verified status is assigned against reviewed evidence, not marketing language. Claims that cannot be supported by records are not treated as verified.",
  },
  {
    t: "Verification is time-bound",
    d: "Listings are reviewed against current records and renewed on a defined interval. A verified status reflects the most recent completed review, not a permanent endorsement.",
  },
];

const meaningBlocks: { t: string; d: string }[] = [
  {
    t: "What has been reviewed",
    d: "Business identity, applicable licenses and registrations, pharmacy and supplier records, certificates within the verified category, and the consistency of public-facing claims.",
  },
  {
    t: "What has not been reviewed",
    d: "Clinical outcomes, individual patient experiences, pricing, marketing channels, or anything outside the documented scope of the verified category.",
  },
  {
    t: "What a verified listing means",
    d: "The vendor submitted records that were reviewed against the standard, and those records support the claims associated with the verified scope at the time of review.",
  },
  {
    t: "What it does not mean",
    d: "It is not a medical endorsement, a guarantee of safety or efficacy, or a statement about any product or service outside the verified category.",
  },
];

const statuses: { t: string; meaning: string; tells: string; notImply: string }[] = [
  {
    t: "Verified",
    meaning: "Records were reviewed and support the claims within the verified category.",
    tells: "Documentation has been examined and meets the standard at the time of review.",
    notImply: "A medical endorsement or a guarantee of any clinical result.",
  },
  {
    t: "Unverified",
    meaning: "No completed verification on record.",
    tells: "The vendor has not been reviewed under this standard.",
    notImply: "That the vendor is illegitimate — only that no verification exists.",
  },
  {
    t: "Under Review",
    meaning: "An active review is in progress or additional records are being evaluated.",
    tells: "The file is open and a status decision has not yet been published.",
    notImply: "Any specific outcome before review is complete.",
  },
  {
    t: "Suspended",
    meaning: "A previously verified listing has been temporarily paused.",
    tells: "An issue has been identified that requires resolution before status continues.",
    notImply: "A final determination — the listing may be reinstated after review.",
  },
  {
    t: "Removed",
    meaning: "The listing has been withdrawn from the public registry.",
    tells: "Verification is no longer in effect for the listed scope.",
    notImply: "Any specific allegation beyond what is published in the public record.",
  },
];

const reviewGroups: { t: string; d: string }[] = [
  {
    t: "Business identity",
    d: "Legal entity name, registration, ownership where disclosed, and operating addresses are checked against public records and submitted documentation.",
  },
  {
    t: "Licenses and registrations",
    d: "State licenses, DEA registrations where applicable, and other regulatory credentials are verified against issuing authorities and current status.",
  },
  {
    t: "Pharmacy and supplier records",
    d: "503A and 503B compounding pharmacies and other upstream suppliers are identified and cross-referenced against FDA registration and applicable accreditations.",
  },
  {
    t: "Certificates and category records",
    d: "Certificates of analysis, lot documentation, and category-specific records are reviewed for the products or services within the verified scope.",
  },
  {
    t: "Sourcing and invoice history",
    d: "Invoices and shipping records are reviewed to confirm a documented sourcing chain that matches the vendor's public claims.",
  },
  {
    t: "Public claims consistency",
    d: "Statements made on the vendor's website and public materials are compared against the documentation on file for the verified category.",
  },
  {
    t: "Renewal-related updates",
    d: "At renewal, the same areas are re-reviewed against the most recent records, and material changes since the prior review are evaluated.",
  },
];

const steps: { n: string; t: string; summary: string; reviewed: string; result: string }[] = [
  {
    n: "01",
    t: "Application",
    summary:
      "The vendor submits an application identifying the entity, the verification category requested, and the records they intend to provide.",
    reviewed: "Entity identity, requested scope, and completeness of intake.",
    result: "Application accepted into review or returned for missing information.",
  },
  {
    n: "02",
    t: "Document intake",
    summary:
      "Required records are collected, including licenses, pharmacy and supplier documentation, certificates, and recent sourcing history.",
    reviewed: "Presence, legibility, and date currency of submitted records.",
    result: "Intake complete, or additional documentation requested.",
  },
  {
    n: "03",
    t: "Standards review",
    summary:
      "Submitted records are evaluated against the standard for the requested category, including upstream sourcing and applicable regulatory anchors.",
    reviewed: "Documents, registrations, and sourcing chain against category standard.",
    result: "Findings logged, with follow-up questions issued to the vendor as needed.",
  },
  {
    n: "04",
    t: "Public claims check",
    summary:
      "Public-facing statements are compared against the documentation on file to confirm consistency within the verified scope.",
    reviewed: "Vendor website and public materials against reviewed records.",
    result: "Claims consistent, or vendor asked to correct or clarify before status is assigned.",
  },
  {
    n: "05",
    t: "Status determination",
    summary:
      "A status is assigned based on the completed review. Scope is recorded explicitly so the public listing reflects only what was verified.",
    reviewed: "Cumulative review file and category scope.",
    result: "Verified, Unverified, Under Review, Suspended, or Removed status assigned.",
  },
  {
    n: "06",
    t: "Publication and monitoring",
    summary:
      "The listing is published or updated in the public registry. The file remains active for renewal and for review of any material change.",
    reviewed: "Listing accuracy at publication and ongoing change reports.",
    result: "Listing live with a defined renewal interval and change-report obligations.",
  },
];

const changes: string[] = [
  "Change of ownership or controlling entity",
  "Change in upstream pharmacy or primary supplier",
  "Loss, lapse, or material change of a license or registration",
  "Expansion into a category outside the current verified scope",
  "Material change to public claims tied to the verified category",
  "Recall, regulatory action, or accreditation change affecting the file",
];

const afterReview: string[] = [
  "A public listing is created or updated in the registry.",
  "The current status is shown publicly alongside the verified scope.",
  "Verification scope may be limited to specific categories rather than the full business.",
  "Renewal obligations continue on a defined interval.",
  "Material changes to records or claims can trigger re-review.",
];

const vendorReasons: { t: string; d: string }[] = [
  {
    t: "Public registry presence",
    d: "Verified vendors appear in a public registry where consumers and clinicians can confirm the review.",
  },
  {
    t: "Category-specific review",
    d: "Verification is recorded against a defined scope, so the listing reflects what was actually reviewed.",
  },
  {
    t: "Confidence signal for consumers",
    d: "A published status gives consumers a documented reference point rather than a marketing claim.",
  },
  {
    t: "Claims supported by reviewed records",
    d: "Statements tied to the verified category are backed by documentation that has been examined under the standard.",
  },
];

const notProcess: string[] = [
  "Source Standard does not provide medical advice or clinical recommendations.",
  "Source Standard does not certify safety, efficacy, or treatment outcomes.",
  "Source Standard does not verify pricing, marketing channels, or business performance.",
  "Source Standard does not act as a regulator or substitute for federal or state authorities.",
];

const PRINCIPLE_TITLES: Record<string, string> = {
  "Sourcing records matter": "Chain-of-Custody Primacy",
  "Public claims should match documented reality": "Evidentiary Reconciliation",
  "Verification is time-bound": "Time-Bounded Determination",
};

const MEANING_TITLES: Record<string, string> = {
  "What has been reviewed": "Records within examination scope",
  "What has not been reviewed": "Records outside examination scope",
  "What a verified listing means": "Effect of a Verified determination",
  "What it does not mean": "Limits of the determination",
};

const SCOPE_TITLES: Record<string, string> = {
  "Business identity": "Entity identification & registration",
  "Licenses and registrations": "Regulatory credentials",
  "Pharmacy and supplier records": "Upstream supply-chain records",
  "Certificates and category records": "Analytical certificates & lot records",
  "Sourcing and invoice history": "Procurement & invoice ledger",
  "Public claims consistency": "Public-claims reconciliation",
  "Renewal-related updates": "Renewal-cycle delta review",
};

const STEP_TITLES: Record<string, string> = {
  "01": "Intake & Scope Declaration",
  "02": "Evidentiary Collection",
  "03": "Regulatory Cross-Referencing",
  "04": "Claims-Documentation Reconciliation",
  "05": "Determination & Scope Recordation",
  "06": "Publication & Continuous Surveillance",
};

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <RecordHeader
        metadata={[
          { label: "Doc", value: "SS-FRAMEWORK-2026.01" },
          { label: "Status", value: "Active" },
          { label: "Updated", value: "04/21/26" },
          { label: "Scope", value: "Verification" },
        ]}
        eyebrow="Standard operating procedure"
        title="Verification Protocol & Audit Methodology."
        lead="Examination of supply-chain records, regulatory credentials, and public-facing claims against the Source Standard evidentiary rubric. Determinations are recorded against a defined scope and time window."
      />

      {/* Document header strip */}
      <div className="border-b border-border bg-surface-muted/40">
        <div className="container-wide flex items-center justify-between py-2.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted-foreground gap-4 flex-wrap">
          <span>
            Document · <span className="text-foreground">SS-FRAMEWORK-2026.01</span>
          </span>
          <span>
            Issued <span className="text-foreground">04/21/2026</span> · Revision <span className="text-foreground">2026.01</span> · Controlled copy
          </span>
        </div>
      </div>

      {/* Audit principles */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Audit principles</p>
          <h2 className="h-section max-w-3xl">
            Governing principles of the verification protocol.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
            Verification examines the records behind a vendor — not their public presentation — against a consistent
            evidentiary standard. Three principles govern conduct of every review.
          </p>
          <div className="mt-10 grid md:grid-cols-3 gap-10 max-w-5xl">
            {whyItMatters.map((w, i) => (
              <div key={i}>
                <h3 className="text-[15px] font-semibold text-foreground">{PRINCIPLE_TITLES[w.t] ?? w.t}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of attestation */}
      <section className="bg-surface-muted/40 border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Scope of attestation</p>
          <h2 className="h-section max-w-3xl">
            Attestation of Record Consistency.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
            {meaningBlocks.map((m, i) => (
              <div key={i}>
                <h3 className="text-[15px] font-semibold text-foreground">{MEANING_TITLES[m.t] ?? m.t}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public determinations */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Public determinations</p>
          <h2 className="h-section max-w-3xl">
            Registry determinations.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
            Each registry entry carries one of the following determinations. The determination reflects the state of the
            audit file at the time of last update.
          </p>
          <div className="mt-10 max-w-4xl divide-y divide-border border-t border-b border-border">
            {statuses.map((s, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-4 py-6">
                <div className="md:col-span-3">
                  <h3 className="text-[15px] font-semibold text-foreground">{s.t}</h3>
                </div>
                <div className="md:col-span-9 space-y-2">
                  <p className="text-[14px] text-foreground leading-relaxed">{s.meaning}</p>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                    <span className="meta-label mr-1">Public-record meaning:</span>
                    {s.tells}
                  </p>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                    <span className="meta-label mr-1">Does not imply:</span>
                    {s.notImply}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-muted-foreground">
            Full status definitions:{" "}
            <Link to="/status-definitions" className="underline underline-offset-4 hover:text-foreground">
              /status-definitions
            </Link>
          </p>
        </div>
      </section>

      {/* Examination domains */}
      <section className="bg-surface-muted/40 border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Examination domains</p>
          <h2 className="h-section max-w-3xl">
            Examination domains under audit.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
            Each domain is examined against the evidentiary standard for the requested verification category. Findings
            are logged to the audit file.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {reviewGroups.map((g, i) => (
              <div key={i} className="border border-border rounded-[2px] bg-background p-6">
                <h3 className="text-[15px] font-semibold text-foreground">{SCOPE_TITLES[g.t] ?? g.t}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit lifecycle */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Audit lifecycle</p>
          <h2 className="h-section max-w-3xl">
            Audit lifecycle.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
            Every verification proceeds through six controlled stages. A file may be paused at any stage when records
            are incomplete or require clarification.
          </p>
          <ol className="mt-10 max-w-4xl divide-y divide-border border-t border-b border-border">
            {steps.map((s) => (
              <li key={s.n} className="grid md:grid-cols-12 gap-6 py-8">
                <div className="md:col-span-2">
                  <p className="meta-mono text-[12.5px] text-muted-foreground">Step {s.n}</p>
                  <h3 className="mt-1 text-[15px] font-semibold text-foreground">{STEP_TITLES[s.n] ?? s.t}</h3>
                </div>
                <div className="md:col-span-10 space-y-3">
                  <p className="text-[14.5px] text-foreground leading-relaxed">{s.summary}</p>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                    <span className="meta-label mr-1">Examined:</span>
                    {s.reviewed}
                  </p>
                  <p className="text-[13.5px] text-muted-foreground leading-relaxed">
                    <span className="meta-label mr-1">Disposition:</span>
                    {s.result}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Continuous surveillance */}
      <section className="bg-surface-muted/40 border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Continuous surveillance</p>
          <h2 className="h-section max-w-3xl">
            Continuous Surveillance & Renewal Obligations.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
            Verified files are re-examined at a defined renewal interval and upon any reported material change. Vendors
            are bound to disclose the following Mandatory Disclosure Events without delay.
          </p>
          <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.1em] text-foreground mb-3">
            Mandatory Disclosure Events
          </p>
          <ul className="max-w-2xl space-y-2 text-[14px] text-foreground">
            {changes.map((c, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-muted-foreground">·</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-[14px] text-muted-foreground leading-relaxed">
            A disclosed event may result in a continued determination, a Suspended status pending re-examination, or a
            re-review limited to the affected scope.
          </p>
        </div>
      </section>

      {/* Post-determination */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Post-determination</p>
          <h2 className="h-section max-w-3xl">
            Post-determination record handling.
          </h2>
          <ul className="mt-8 max-w-3xl space-y-3 text-[14.5px] text-foreground">
            {afterReview.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="meta-mono text-muted-foreground w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why vendors apply */}
      <section className="bg-surface-muted/40 border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Applicant rationale</p>
          <h2 className="h-section max-w-3xl">
            Why entities submit to audit.
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
            {vendorReasons.map((v, i) => (
              <div key={i}>
                <h3 className="text-[15px] font-semibold text-foreground">{v.t}</h3>
                <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[14px]">
            <Link to="/apply" className="text-foreground underline underline-offset-4 hover:opacity-70">
              Begin a verification application →
            </Link>
          </p>
        </div>
      </section>

      {/* What this process is not */}
      <section className="border-b border-border">
        <div className="container-wide py-12 md:py-16">
          <p className="eyebrow mb-3">Boundaries</p>
          <h2 className="h-section max-w-3xl">
            What this process is not
          </h2>
          <ul className="mt-8 max-w-3xl space-y-3 text-[14px] text-muted-foreground">
            {notProcess.map((n, i) => (
              <li key={i} className="flex gap-3">
                <span>·</span>
                <span className="leading-relaxed">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer reference strip */}
      <section>
        <div className="container-wide py-8">
          <p className="text-[12.5px] text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
            <span>
              <span className="meta-label mr-1">Standard reference</span>
              <span className="meta-mono">SS-FRAMEWORK-2026.01</span>
            </span>
            <span>
              <span className="meta-label mr-1">Updated</span>
              <span className="meta-mono">04 / 21 / 2026</span>
            </span>
            <Link to="/status-definitions" className="underline underline-offset-4 hover:text-foreground">
              Status definitions
            </Link>
            <Link to="/accountability" className="underline underline-offset-4 hover:text-foreground">
              Accountability
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
