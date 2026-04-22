import { RecordHeader } from "@/components/RecordHeader";
import { DocLayout, DocSection } from "@/components/DocLayout";
import { Callout, CalloutTitle } from "@/components/Callout";
import { RelatedDocs } from "@/components/RelatedDocs";

const DOC_ID = "SS-DISCLAIMER-2026.01";

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

const waypoints = [
  { id: "coverage", number: "01", label: "Coverage" },
  { id: "out-of-scope", number: "02", label: "Out of scope" },
  { id: "limits", number: "03", label: "Institutional limits" },
  { id: "timebound", number: "04", label: "Time-bound" },
  { id: "liability", number: "05", label: "Liability" },
  { id: "deeper", number: "06", label: "Read deeper" },
];

const VerificationDisclaimer = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: DOC_ID },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "United States" },
      ]}
      eyebrow="Disclaimer · Formal regulatory attestation"
      title="Verification Disclaimer & Attestation Scope."
      lead="The formal attestation document of the auditing body. Defines the scope, boundaries, time-bound nature, and liability framing of every Source Standard verification determination. Issued under document SS-DISCLAIMER-2026.01."
    />

    <DocLayout waypoints={waypoints} variant="certificate">
      <DocSection
        id="coverage"
        number="§1"
        title="Boundaries of Administrative Attestation"
        description="A Source Standard verification is an Attestation of Record Consistency. It is an administrative finding that an entity's documented records — as submitted, as cross-checked against third-party regulatory and supplier data, and as reviewed at a fixed point in time — are internally consistent and consistent with the public claims associated with the entity. The registry operates as an auditing mirror of third-party records and does not produce, replace, or supersede those records."
        first
      >
        <ul className="space-y-3 not-prose">
          {covers.map((c) => (
            <li key={c.n} className="flex gap-4 text-[15px]">
              <span className="meta-mono text-primary w-12 shrink-0">{c.n}</span>
              <span className="text-foreground">{c.t}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection
        id="out-of-scope"
        number="§2"
        title="Items outside the attestation"
        description="The following matters are explicitly outside the scope of any Source Standard attestation and shall not be inferred from a Verified determination."
      >
        <ul className="space-y-3 not-prose">
          {doesNotCover.map((c) => (
            <li key={c.n} className="flex gap-4 text-[15px]">
              <span className="meta-mono text-muted-foreground w-12 shrink-0">{c.n}</span>
              <span className="text-muted-foreground">{c.t}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection
        id="limits"
        number="§3"
        title="Institutional Limitations"
        description="Source Standard occupies a defined position within the broader medical, pharmaceutical, and regulatory ecosystem. The following limitations are material to the interpretation of any registry entry."
      >
        <div className="divide-y divide-border/60 border border-border/60 rounded-lg bg-surface shadow-sm overflow-hidden not-prose">
          {boundaries.map((b) => (
            <div key={b.t} className="grid md:grid-cols-12 gap-6 px-5 py-5">
              <p className="md:col-span-3 h-card font-semibold text-foreground">{b.t}</p>
              <p className="md:col-span-9 text-[15px] text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="timebound"
        number="§4"
        title="Time-bound nature"
        description="Every Source Standard determination is a Snapshot of Record Consistency. It reflects the records reviewed and the regulatory checks performed within a defined review window and remains valid only until the next scheduled renewal or until a Mandatory Disclosure Event triggers earlier reopening under SS-ENFORCE-2026.01. A current Verified status today does not warrant the same status at any future date and is not a representation regarding the entity's future conduct."
      />

      <DocSection id="liability" number="§5" title="Limitation of Liability & User Discretion">
        <div className="space-y-5 not-prose">
          <Callout tone="warning" eyebrow="Warning · §5.1">
            <CalloutTitle>No warranty; reliance at user discretion.</CalloutTitle>
            <p className="text-[15px] text-foreground leading-[1.7]">
              The registry is provided as a public reference. The auditing body makes no warranty, express or implied,
              regarding any vendor, upstream source, product, or determination. Reliance on registry content is at the
              user's sole discretion. Users should consult a licensed clinician for clinical matters and the applicable
              regulatory authority for matters within statutory jurisdiction.
            </p>
          </Callout>
          <Callout tone="warning" eyebrow="Warning · §5.2">
            <CalloutTitle>Acknowledgment and exemption from liability.</CalloutTitle>
            <p className="text-[15px] text-foreground leading-[1.7]">
              Access to or use of the registry constitutes the user's acknowledgment that Source Standard is exempt from
              liability for any direct, indirect, incidental, consequential, special, or exemplary damages arising from
              any decision made, action taken, or action not taken on the basis of a registry entry, including any
              decision to engage or not to engage with a listed entity. This acknowledgment is a material condition of
              access under the User Agreement & Registry Terms (SS-TERMS-2026.01).
            </p>
          </Callout>
        </div>
      </DocSection>

      <DocSection id="deeper" number="§6" title="Read deeper">
        <RelatedDocs
          items={[
            { to: "/how-it-works", label: "Verification — process and review" },
            { to: "/status-definitions", label: "Status Definitions" },
            { to: "/accountability", label: "Accountability & Enforcement" },
            { to: "/terms", label: "User Agreement & Registry Terms" },
            { to: "/governance", label: "Governance" },
          ]}
        />
        <p className="mt-8 meta-label">
          Cite as: Source Standard Verification Disclaimer & Attestation Scope, SS-DISCLAIMER-2026.01.
        </p>
      </DocSection>
    </DocLayout>
  </>
);

export default VerificationDisclaimer;
