import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

const covers = [
  "Documented business identity and operating records.",
  "Licensing and registration status with applicable authorities.",
  "Disclosed upstream sources, including pharmacy and supplier documentation.",
  "Sourcing and invoice records supporting reviewed product categories.",
  "Consistency between public claims and records on file.",
];

const doesNotCover = [
  "Clinical outcomes for any individual patient.",
  "Suitability of any product or protocol for a specific person.",
  "Product safety, efficacy, or potency testing — Source Standard does not test products.",
  "Future vendor conduct beyond the records reviewed at the time of verification.",
  "Activities outside the reviewed scope or category.",
];

const boundaries = [
  { t: "Not a regulator", d: "Source Standard does not have enforcement authority. Regulatory authority rests with FDA, state boards of pharmacy, state medical boards, and other competent bodies." },
  { t: "Not a clinic", d: "Source Standard does not provide clinical care, prescribe, or dispense medication." },
  { t: "Not a manufacturer or pharmacy", d: "Source Standard does not produce, compound, or sell any product. It references upstream sources operated by others." },
  { t: "Not a guarantor", d: "A Verified listing is a documentation finding at a point in time, not a guarantee of any future state of affairs." },
];

const VerificationDisclaimer = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-DISCLAIMER-2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
        { label: "Jurisdiction", value: "FL/US" },
      ]}
      eyebrow="Disclaimer"
      title="Verification disclaimer."
      lead="Defines the scope and limits of Source Standard verification so that a Verified status is interpreted accurately."
    />

    <Section density="doc">
      <SectionLabel number="§1" title="What verification covers" description="Verification is a documented review of records and claims. The following items are within the scope of every standard review." />
      <ul className="space-y-3 max-w-3xl">
        {covers.map((c, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-foreground">{c}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section muted density="doc">
      <SectionLabel number="§2" title="What verification does not cover" description="The following items are explicitly outside the scope of verification and should not be inferred from a Verified status." />
      <ul className="space-y-3 max-w-3xl">
        {doesNotCover.map((c, i) => (
          <li key={i} className="flex gap-4 text-[15px]">
            <span className="meta-mono text-muted-foreground w-6 shrink-0">·</span>
            <span className="text-muted-foreground">{c}</span>
          </li>
        ))}
      </ul>
    </Section>

    <Section density="doc">
      <SectionLabel number="§3" title="Role boundaries" description="Source Standard occupies a specific position in the broader medical and regulatory ecosystem. Understanding what it is not is as important as understanding what it is." />
      <div className="divide-y divide-border/70 border-y border-border/70 bg-background">
        {boundaries.map((b) => (
          <div key={b.t} className="grid md:grid-cols-12 gap-6 px-5 py-5">
            <p className="md:col-span-3 h-card">{b.t}</p>
            <p className="md:col-span-9 text-[15px] text-muted-foreground leading-relaxed">{b.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section muted density="doc">
      <SectionLabel number="§4" title="Time-bound nature" description="Verification reflects records reviewed at a specific point in time. Listings are reviewed on a defined renewal interval and can change between renewals when material events occur. A current Verified status today does not warrant the same status at any future date." />
    </Section>

    <Section density="doc">
      <SectionLabel number="§5" title="Liability framing" description="The registry is provided as a public reference. Source Standard makes no warranty, express or implied, regarding any vendor, product, or upstream source. Reliance on registry information is at the user's discretion. Source Standard is not liable for decisions made on the basis of registry entries, including decisions to engage or not engage with a listed entity. Users should consult licensed clinicians and applicable regulatory authorities for matters within those domains." />
    </Section>

    <Section muted density="tight">
      <SectionLabel number="§6" title="Read deeper" />
      <ul className="space-y-2 text-[15px]">
        <li><Link to="/how-it-works" className="text-foreground underline-offset-4 hover:underline">Verification — process and review →</Link></li>
        <li><Link to="/status-definitions" className="text-foreground underline-offset-4 hover:underline">Status Definitions →</Link></li>
        <li><Link to="/terms" className="text-foreground underline-offset-4 hover:underline">Terms of Use →</Link></li>
      </ul>
      <p className="mt-8 meta-label">
        Cite as: Source Standard Verification Disclaimer, SS-DISCLAIMER-2026.01.
      </p>
    </Section>
  </>
);

export default VerificationDisclaimer;
