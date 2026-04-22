import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { BoardSection, BoardCiteFooter } from "@/components/BoardSection";
import { DocJumpBar } from "@/components/DocJumpBar";
import { DocSignature } from "@/components/DocSignature";
import { Callout, CalloutTitle } from "@/components/Callout";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";

const DOC_ID = "SS-DISCLAIM-2026.01";
const VERIFIED_ON = "04/21/2026";

const covers = [
  { n: "1.01", t: "Documented business identity, registration, and operating records of the entity." },
  { n: "1.02", t: "Licensing, registration, and standing with applicable regulatory authorities, as evidenced by third-party records." },
  { n: "1.03", t: "Disclosed upstream sources, including pharmacy, supplier, and laboratory documentation submitted under the Vendor Submission Standard." },
  { n: "1.04", t: "Sourcing and invoice records supporting the product categories within the reviewed scope." },
  { n: "1.05", t: "Consistency between the entity's public claims and the records on file with the auditing body." },
];

const doesNotCover = [
  { n: "2.01", t: "Clinical outcomes for any individual patient." },
  { n: "2.02", t: "Suitability of any product, formulation, or protocol for a specific person." },
  { n: "2.03", t: "Product safety, efficacy, sterility, or potency. The auditing body does not test, assay, or otherwise analyse any product." },
  { n: "2.04", t: "Future conduct of the entity beyond the records reviewed at the time of the determination." },
  { n: "2.05", t: "Activities, product lines, or jurisdictions outside the reviewed scope or category." },
];

const boundaries = [
  { t: "Not a Statutory Body.", d: "Source Standard is not a regulator, accreditor, or statutory body. It holds no enforcement authority. Statutory authority rests with the FDA, state boards of pharmacy, state medical boards, attorneys general, and other competent regulatory bodies, whose determinations supersede any registry entry." },
  { t: "Not a clinic.", d: "Source Standard does not provide clinical care, diagnose, prescribe, dispense, or otherwise practise medicine, pharmacy, or any other licensed health profession." },
  { t: "Not a manufacturer or pharmacy.", d: "Source Standard does not manufacture, compound, repackage, distribute, or sell any product. It references upstream sources operated by independently licensed third parties." },
  { t: "Not a laboratory.", d: "Source Standard does not test products and does not issue certificates of analysis. It reviews certificates produced by independent laboratories as part of the documentary record." },
  { t: "Not a guarantor.", d: "A Verified determination is an administrative finding at a fixed point in time. It is not a warranty, guarantee, indemnity, or insurance of any future state of affairs concerning the entity, its operations, or any product or service it provides." },
];

const deeper = [
  { to: "/how-it-works", label: "Verification — process and review" },
  { to: "/status-definitions", label: "Status Definitions" },
  { to: "/accountability", label: "Accountability & Enforcement" },
  { to: "/terms", label: "User Agreement & Registry Terms" },
  { to: "/governance", label: "Governance" },
];

const waypoints = [
  { id: "coverage", number: "1", label: "Coverage" },
  { id: "out-of-scope", number: "2", label: "Out of scope" },
  { id: "limits", number: "3", label: "Limits" },
  { id: "timebound", number: "4", label: "Time-bound" },
  { id: "liability", number: "5", label: "Liability" },
  { id: "deeper", number: "6", label: "Read deeper" },
];

const VerificationDisclaimer = () => (
  <>
    <PageMeta
      title="Verification Disclaimer"
      description="Scope of a Source Standard determination — what verification covers, what it does not cover, and the institutional boundaries of the auditing body."
    />
    <Breadcrumb items={[{ label: "Legal" }, { label: "Disclaimer" }]} />

    <RecordHeader
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      verifiedOn={VERIFIED_ON}
      eyebrow="Disclaimer · Formal regulatory attestation"
      title="Verification Disclaimer & Attestation Scope."
      lead={`The formal attestation document of the auditing body. Defines the scope, boundaries, time-bound nature, and liability framing of every Source Standard verification determination. Issued under document ${DOC_ID}.`}
    />

    <DocJumpBar waypoints={waypoints} />

    <BoardSection
      id="coverage"
      n="1"
      category="Coverage"
      title="Boundaries of administrative attestation."
      rationale="A Source Standard verification is an Attestation of Record Consistency. It is an administrative finding that an entity's documented records — as submitted, as cross-checked against third-party regulatory and supplier data, and as reviewed at a fixed point in time — are internally consistent and consistent with the public claims associated with the entity. The registry operates as an auditing mirror of third-party records and does not produce, replace, or supersede those records."
    >
      <ol className="border border-border bg-background divide-y divide-border">
        {covers.map((c) => (
          <li key={c.n} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
            <div className="col-span-2 meta text-primary tabular-nums">{c.n}</div>
            <p className="col-span-10 text-[14.5px] text-muted-foreground leading-relaxed">{c.t}</p>
          </li>
        ))}
      </ol>
    </BoardSection>

    <BoardSection
      id="out-of-scope"
      n="2"
      category="Out of scope"
      title="Items outside the attestation."
      rationale="The following matters are explicitly outside the scope of any Source Standard attestation and shall not be inferred from a Verified determination."
      muted
    >
      <ol className="border border-border bg-background divide-y divide-border">
        {doesNotCover.map((c) => (
          <li key={c.n} className="grid grid-cols-12 gap-4 px-5 py-4 items-baseline">
            <div className="col-span-2 meta text-muted-foreground tabular-nums">{c.n}</div>
            <p className="col-span-10 text-[14.5px] text-muted-foreground leading-relaxed">{c.t}</p>
          </li>
        ))}
      </ol>
    </BoardSection>

    <BoardSection
      id="limits"
      n="3"
      category="Limits"
      title="Institutional limitations."
      rationale="Source Standard occupies a defined position within the broader medical, pharmaceutical, and regulatory ecosystem. The following limitations are material to the interpretation of any registry entry."
    >
      <ol className="border border-border bg-background divide-y divide-border">
        {boundaries.map((b, i) => (
          <li key={b.t} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
            <div className="col-span-3 meta text-primary">
              <span className="text-foreground font-semibold">{String(i + 1).padStart(2, "0")} ·</span> {b.t}
            </div>
            <p className="col-span-9 text-[14.5px] text-muted-foreground leading-relaxed">{b.d}</p>
          </li>
        ))}
      </ol>
    </BoardSection>

    <BoardSection
      id="timebound"
      n="4"
      category="Time-bound"
      title="Time-bound nature."
      rationale="Every Source Standard determination is a Snapshot of Record Consistency. It reflects the records reviewed and the regulatory checks performed within a defined review window and remains valid only until the next scheduled renewal or until a Mandatory Disclosure Event triggers earlier reopening under SS-ENFORCE-2026.01. A current Verified status today does not warrant the same status at any future date and is not a representation regarding the entity's future conduct."
      muted
    >
      <p className="text-[14.5px] text-muted-foreground leading-relaxed">
        Every determination is anchored to a fixed review window and lapses or reopens by protocol — never by inference.
      </p>
    </BoardSection>

    <BoardSection id="liability" n="5" category="Liability" title="Limitation of liability & user discretion.">
      <Callout tone="warning" eyebrow="Warning · §5.1">
        <CalloutTitle>No warranty; reliance at user discretion.</CalloutTitle>
        <p className="text-[14.5px] text-foreground leading-relaxed">
          The registry is provided as a public reference. The auditing body makes no warranty, express or implied,
          regarding any vendor, upstream source, product, or determination. Reliance on registry content is at the
          user's sole discretion. Users should consult a licensed clinician for clinical matters and the applicable
          regulatory authority for matters within statutory jurisdiction.
        </p>
      </Callout>
      <Callout tone="warning" eyebrow="Warning · §5.2">
        <CalloutTitle>Acknowledgment and exemption from liability.</CalloutTitle>
        <p className="text-[14.5px] text-foreground leading-relaxed">
          Access to or use of the registry constitutes the user's acknowledgment that Source Standard is exempt from
          liability for any direct, indirect, incidental, consequential, special, or exemplary damages arising from
          any decision made, action taken, or action not taken on the basis of a registry entry, including any
          decision to engage or not to engage with a listed entity. This acknowledgment is a material condition of
          access under the User Agreement & Registry Terms (SS-TERMS-2026.01).
        </p>
      </Callout>
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
      citation={`Source Standard. Verification Disclaimer & Attestation Scope. Document ${DOC_ID}. Issued ${VERIFIED_ON}. Controlled copy on file with the issuing organization.`}
    />
    <DocSignature docId={DOC_ID} verifiedOn={VERIFIED_ON} />
  </>
);

export default VerificationDisclaimer;
