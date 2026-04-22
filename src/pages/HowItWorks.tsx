import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DocJumpBar } from "@/components/DocJumpBar";
import { DocSignature } from "@/components/DocSignature";
import { BoardCiteFooter } from "@/components/BoardSection";
import { BriefingHero } from "@/components/BriefingHero";

const DOC_ID = "SS-PROTO-2026.01";
const VERIFIED_ON = "04/21/2026";

const jumpWaypoints = [
  { id: "principles", number: "1", label: "Principles" },
  { id: "scope", number: "2", label: "Scope" },
  { id: "determinations", number: "3", label: "Determinations" },
  { id: "domains", number: "4", label: "Domains" },
  { id: "lifecycle", number: "5", label: "Lifecycle" },
  { id: "surveillance", number: "6", label: "Surveillance" },
  { id: "post", number: "7", label: "Post-determination" },
  { id: "rationale", number: "8", label: "Rationale" },
  { id: "limits", number: "9", label: "Limits" },
];

const whyItMatters: { t: string; d: string }[] = [
  {
    t: "Sourcing records matter",
    d: "Vendors carry no greater legitimacy than the pharmacies and upstream suppliers behind them. The protocol prioritizes the source over the storefront and examines the chain of custody as the primary evidentiary record.",
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
  "Business identity": "Entity Identification & Registration",
  "Licenses and registrations": "Regulatory Credentials Verification",
  "Pharmacy and supplier records": "Upstream Supply-Chain Verification",
  "Certificates and category records": "Analytical & Lot Record Validation",
  "Sourcing and invoice history": "Procurement & Invoice Reconciliation",
  "Public claims consistency": "Public-Claims Reconciliation",
  "Renewal-related updates": "Renewal-Cycle Delta Examination",
};

const STEP_TITLES: Record<string, string> = {
  "01": "Intake & Scope Declaration",
  "02": "Evidentiary Collection",
  "03": "Regulatory Cross-Referencing",
  "04": "Discrepancy Analysis & Claims Reconciliation",
  "05": "Determination & Scope Recordation",
  "06": "Publication & Continuous Surveillance",
};

// 12-col Board rail
const Rail = ({
  ref,
  label,
  title,
  body,
}: {
  ref: string;
  label: string;
  title: string;
  body?: string;
}) => (
  <div className="md:col-span-4">
    <p className="meta mb-3">
      {ref} · {label}
    </p>
    <h2 className="h-section">{title}</h2>
    {body && (
      <p className="mt-4 text-[14px] text-muted-foreground leading-relaxed">{body}</p>
    )}
  </div>
);

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <PageMeta
        title="Verification Protocol"
        description="The active auditing requirements and clinical criteria utilized for third-party validation."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Protocol" }]} />
      <BriefingHero
        category="PROTOCOL · SS-PROT"
        docId={DOC_ID}
        title="Verification Protocol."
        statement="The active auditing requirements and clinical criteria utilized for third-party validation."
        metadata={[
          { label: "Doc", value: DOC_ID },
          { label: "Status", value: "Active" },
          { label: "Jurisdiction", value: "United States" },
          { label: "Updated", value: "04 / 21 / 2026" },
        ]}
        verifiedOn={VERIFIED_ON}
      />

      <DocJumpBar waypoints={jumpWaypoints} />

      {/* §1 Governing principles */}
      <section id="principles" className="scroll-mt-36 border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§1"
              label="Governing principles"
              title="Governing Principles of Forensic Examination."
              body="The verification protocol prioritizes the source over the storefront. Every examination is conducted against a consistent evidentiary rubric, independent of marketing presentation."
            />
            <div className="md:col-span-8">
              <ol className="border border-border bg-background divide-y divide-border">
                {whyItMatters.map((w, i) => (
                  <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
                    <div className="col-span-2 meta text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-10">
                      <p className="text-[14px] font-semibold text-foreground">
                        {PRINCIPLE_TITLES[w.t] ?? w.t}
                      </p>
                      <p className="mt-1 text-[13.5px] text-muted-foreground leading-relaxed">
                        {w.d}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Scope of attestation */}
      <section id="scope" className="scroll-mt-36 border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§2"
              label="Scope of attestation"
              title="Attestation of Record Consistency."
              body="What the framework attests to — and the boundaries of that attestation."
            />
            <div className="md:col-span-8">
              <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
                {meaningBlocks.map((m, i) => (
                  <li key={i} className="bg-background p-5">
                    <p className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-primary mb-2">
                      ATTESTATION · {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[14px] font-semibold text-foreground">
                      {MEANING_TITLES[m.t] ?? m.t}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                      {m.d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §3 Registry determinations — Board-style table */}
      <section id="determinations" className="scroll-mt-36 border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§3"
              label="Registry determinations"
              title="Registry determinations."
              body="Each registry entry carries one of the following determinations. The determination reflects the state of the audit file at the time of last update."
            />
            <div className="md:col-span-8">
              <div className="border border-border bg-background">
                <div className="grid grid-cols-12 px-5 py-2.5 bg-surface-muted border-b border-border">
                  <div className="col-span-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Code
                  </div>
                  <div className="col-span-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Status
                  </div>
                  <div className="col-span-7 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Public-record meaning
                  </div>
                </div>
                <ul className="divide-y divide-border">
                  {statuses.map((s, i) => (
                    <li key={i} className="grid grid-cols-12 gap-3 px-5 py-4 items-baseline">
                      <div className="col-span-2 meta text-primary">
                        STATUS · {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="col-span-3 text-[13.5px] font-semibold text-foreground">
                        {s.t}
                      </div>
                      <div className="col-span-7 space-y-1.5">
                        <p className="text-[13.5px] text-foreground leading-relaxed">{s.meaning}</p>
                        <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                          <span className="meta-label mr-1">Tells:</span>
                          {s.tells}
                        </p>
                        <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                          <span className="meta-label mr-1">Does not imply:</span>
                          {s.notImply}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-[12.5px] text-muted-foreground">
                Full status definitions:{" "}
                <Link
                  to="/status-definitions"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  /status-definitions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §4 Examination domains */}
      <section id="domains" className="scroll-mt-36 border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§4"
              label="Examination domains"
              title="Administrative Examination Domains."
              body="Each domain is examined against the evidentiary standard for the requested verification category. All findings are logged to the controlled audit file."
            />
            <div className="md:col-span-8">
              <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
                {reviewGroups.map((g, i) => (
                  <li key={i} className="bg-background p-6">
                    <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-primary mb-2">
                      DOMAIN · {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[14px] font-semibold text-foreground">
                      {SCOPE_TITLES[g.t] ?? g.t}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                      {g.d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §5 Standardized review lifecycle — Board ol pattern */}
      <section id="lifecycle" className="scroll-mt-36 border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§5"
              label="Standardized review lifecycle"
              title="Standardized Review Lifecycle."
              body="Every verification proceeds through six controlled stages of forensic examination. A file may be paused at any stage when records are incomplete, inconsistent, or require evidentiary clarification."
            />
            <div className="md:col-span-8">
              <ol className="border border-border bg-background divide-y divide-border">
                {steps.map((s) => (
                  <li key={s.n} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
                    <div className="col-span-2 meta text-primary">{s.n}</div>
                    <div className="col-span-10 space-y-2">
                      <p className="text-[14px] font-semibold text-foreground">
                        {STEP_TITLES[s.n] ?? s.t}
                      </p>
                      <p className="text-[13.5px] text-foreground/90 leading-relaxed">
                        {s.summary}
                      </p>
                      <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                        <span className="meta-label mr-1">Examined:</span>
                        {s.reviewed}
                      </p>
                      <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                        <span className="meta-label mr-1">Disposition:</span>
                        {s.result}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* §6 Post-audit surveillance */}
      <section id="surveillance" className="scroll-mt-36 border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§6"
              label="Post-audit surveillance"
              title="Post-Audit Surveillance & Mandatory Disclosure."
              body="A determination is a snapshot in time. Verified files are subject to continuous surveillance and re-examined at a defined renewal interval and upon any reported material change."
            />
            <div className="md:col-span-8">
              <div className="border border-border bg-surface-muted px-4 py-3 mb-5">
                <p className="font-mono uppercase tracking-[0.08em] text-[10.5px] text-muted-foreground">
                  DISCLOSURE WINDOW · <span className="text-foreground">72 HOURS</span> ·{" "}
                  <span className="text-foreground">{DOC_ID}</span> · §6
                </p>
              </div>
              <ol className="border border-border bg-background divide-y divide-border">
                {changes.map((c, i) => (
                  <li key={i} className="grid grid-cols-12 gap-4 px-5 py-3.5 items-baseline">
                    <div className="col-span-2 meta text-primary">
                      EVENT · {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-10 text-[13.5px] text-foreground leading-relaxed">
                      {c}
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[13px] text-muted-foreground leading-relaxed">
                A disclosed event may result in a continued determination, a Suspended status
                pending re-examination, or a re-review limited to the affected scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §7 Post-determination handling */}
      <section id="post" className="scroll-mt-36 border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§7"
              label="Post-determination handling"
              title="Post-Determination Record Handling."
            />
            <div className="md:col-span-8">
              <ol className="border border-border bg-background divide-y divide-border">
                {afterReview.map((a, i) => (
                  <li key={i} className="grid grid-cols-12 gap-4 px-5 py-3.5 items-baseline">
                    <div className="col-span-2 meta text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-10 text-[13.5px] text-foreground leading-relaxed">
                      {a}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* §8 Applicant rationale */}
      <section id="rationale" className="scroll-mt-36 border-b border-border bg-surface-muted">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§8"
              label="Applicant rationale"
              title="Why entities submit to audit."
            />
            <div className="md:col-span-8">
              <ul className="grid md:grid-cols-2 gap-px bg-border border border-border">
                {vendorReasons.map((v, i) => (
                  <li key={i} className="bg-background p-6">
                    <p className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-primary mb-2">
                      RATIONALE · {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-[14px] font-semibold text-foreground">{v.t}</h3>
                    <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                      {v.d}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px]">
                <Link
                  to="/apply"
                  className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground hover:text-primary"
                >
                  Begin a verification application →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §9 Jurisdictional limitations */}
      <section id="limits" className="scroll-mt-36 border-b border-border bg-background">
        <div className="container-wide py-12 md:py-16">
          <div className="grid md:grid-cols-12 gap-10">
            <Rail
              ref="§9"
              label="Jurisdictional limitations"
              title="Jurisdictional Limitations."
              body="Administrative boundaries of the verification framework. They define what the SOP does not constitute as a matter of legal scope."
            />
            <div className="md:col-span-8">
              <ol className="border border-border bg-background divide-y divide-border">
                {notProcess.map((n, i) => (
                  <li key={i} className="grid grid-cols-12 gap-4 px-5 py-3.5 items-baseline">
                    <div className="col-span-2 meta text-primary">
                      LIMIT · {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-10 text-[13.5px] text-muted-foreground leading-relaxed">
                      {n}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Official citation block */}
      <BoardCiteFooter
        citation={`Source Standard. SOP: Verification Protocol & Audit Methodology. Document ${DOC_ID}. Issued ${VERIFIED_ON}. Revision 2026.01. Controlled copy on file with the issuing organization.`}
      />
      <DocSignature docId={DOC_ID} verifiedOn={VERIFIED_ON} />
    </div>
  );
};

export default HowItWorks;
