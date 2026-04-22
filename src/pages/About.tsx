import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { DocLayout, DocSection } from "@/components/DocLayout";
import { Callout } from "@/components/Callout";
import { RelatedDocs } from "@/components/RelatedDocs";

const beliefs = [
  "Consumers deserve more than marketing language when evaluating a vendor.",
  "Vendors who operate with transparency should be easier to distinguish.",
  "Public clarity helps everyone understand the landscape more accurately.",
  "Documentation matters.",
];

const weDo = [
  "Maintain a public system to review verified vendors.",
  "Publish recognized upstream sources.",
  "Document verification definitions.",
  "Provide educational material on sourcing, documentation, storage, and due diligence.",
];

const weDoNot = [
  "Prescribe treatment.",
  "Endorse specific medical protocols.",
  "Replace medical advice, physician judgment, or regulatory oversight.",
  "Function as a marketing arm for any clinic or vendor.",
];

const waypoints = [
  { id: "why", number: "01", label: "Why this exists" },
  { id: "reference", number: "02", label: "Public reference" },
  { id: "gap", number: "03", label: "Information gap" },
  { id: "beliefs", number: "04", label: "Four beliefs" },
  { id: "scope", number: "05", label: "Scope" },
  { id: "principle", number: "06", label: "Operating principle" },
  { id: "audience", number: "07", label: "Who it serves" },
  { id: "mission", number: "08", label: "Mission" },
];

const About = () => (
  <>
    <RecordHeader
      metadata={[
        { label: "Doc", value: "SS-ORG-2026.01" },
        { label: "Version", value: "2026.01" },
        { label: "Status", value: "Active" },
        { label: "Updated", value: "04/21/26" },
      ]}
      eyebrow="Reference · Organization profile"
      title="About Source Standard."
      lead="An independent reference framework for vendor sourcing claims in peptide, TRT, and hormone-optimization markets."
    />

    <DocLayout waypoints={waypoints}>
      <DocSection
        id="why"
        number="§1"
        title="Why this exists."
        description="In peptide, TRT, and hormone optimization markets, consumers are frequently asked to make decisions based on website language, branding, and trust signals that are not always easy to verify independently. At the same time, vendors who invest in proper sourcing, documentation, and oversight often operate in the same landscape as those who do not."
        first
      >
        <p>
          <strong>Source Standard exists</strong> to make that landscape easier to understand.
        </p>
      </DocSection>

      <DocSection
        id="reference"
        number="§2"
        title="A public reference for vendor verification."
        description="Source Standard serves as a public reference for vendor verification and recognized upstream sources."
      >
        <p>
          Its purpose is not to market clinics, promote treatments, or influence care decisions. Its purpose is to
          help make sourcing and verification information more visible, more structured, and easier to interpret.
        </p>
        <p>
          When documentation is clearer, consumers are better informed and responsible operators are easier to
          recognize.
        </p>
      </DocSection>

      <DocSection
        id="gap"
        number="§3"
        title="Formed to address an information gap."
        description="A growing industry now carries real consumer demand, real clinical interest, and real variation in how claims are presented."
      >
        <p>
          Some operators invest heavily in documentation, sourcing standards, and oversight. Others present similar
          claims with far less visibility into what stands behind them. To the outside observer, those differences
          are not always easy to see.
        </p>
        <p>
          <strong>Source Standard did not form to control the market. It formed to make it more legible.</strong>
        </p>
      </DocSection>

      <DocSection id="beliefs" number="§4" title="Four beliefs that shape the framework.">
        <ol className="border border-border bg-background divide-y divide-border not-prose">
          {beliefs.map((b, i) => (
            <li key={i} className="grid grid-cols-12 gap-4 px-5 py-5 items-baseline">
              <div className="col-span-2 meta text-primary">
                §4.{i + 1}
              </div>
              <p className="col-span-10 text-[14px] text-foreground leading-relaxed">{b}</p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection
        id="scope"
        number="§5"
        title="Scope of the framework."
        description="A two-column register of what falls inside and outside the auditing body's mandate."
      >
        <div className="border border-border bg-background not-prose">
          <div className="grid grid-cols-12 gap-3 px-5 py-2.5 bg-surface-muted border-b border-border">
            <div className="col-span-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Ref</div>
            <div className="col-span-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">What we do</div>
            <div className="col-span-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">What we do not do</div>
          </div>
          <ul className="divide-y divide-border">
            {weDo.map((item, i) => (
              <li key={i} className="grid grid-cols-12 gap-3 px-5 py-4 items-baseline">
                <div className="col-span-2 meta text-primary">
                  §5.{i + 1}
                </div>
                <div className="col-span-5 text-[13.5px] text-foreground leading-relaxed">{item}</div>
                <div className="col-span-5 text-[13.5px] text-muted-foreground leading-relaxed">{weDoNot[i]}</div>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      <DocSection id="principle" number="§6" title="A single operating principle.">
        <Callout tone="notice" eyebrow="Operating principle · SS-ORG-2026.01 · §6">
          <p className="text-[15px] text-foreground leading-relaxed font-medium">
            If documentation is present and supports the published status, that status can be shown publicly. If it
            is not, it cannot.
          </p>
          <p className="mt-3 pt-3 border-t border-border/60 text-[13.5px] text-muted-foreground leading-relaxed">
            The role here is not to persuade. The role is to provide a clearer public reference.
          </p>
        </Callout>
      </DocSection>

      <DocSection id="audience" number="§7" title="Who this serves.">
        <ul className="grid md:grid-cols-2 gap-px bg-border border border-border not-prose">
          <li className="bg-background p-5">
            <p className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-primary mb-2">
              §7.1 · For consumers
            </p>
            <p className="text-[13.5px] text-muted-foreground leading-relaxed">
              Consumers should be able to understand more about the vendors they are evaluating. That does not make
              every decision simple. It does mean the public has better tools for interpreting what is being claimed,
              what has been reviewed, and what has not.
            </p>
          </li>
          <li className="bg-background p-5">
            <p className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-primary mb-2">
              §7.2 · For responsible vendors
            </p>
            <p className="text-[13.5px] text-muted-foreground leading-relaxed">
              Responsible operators often absorb the cost of doing things carefully while competing in markets where
              those differences are not immediately visible. When transparency is easier to see, the market becomes
              easier to interpret — fairer to vendors willing to stand behind their documentation.
            </p>
          </li>
        </ul>
      </DocSection>

      <DocSection id="mission" number="§8" title="Mission.">
        <p className="text-[17px] md:text-[18px] text-foreground leading-[1.7] font-medium">
          To bring greater clarity, consistency, and transparency to vendor sourcing and verification in peptide,
          TRT, and hormone optimization markets.
        </p>
        <p>
          Source Standard exists to make the market easier to understand for the people moving through it.
        </p>
        <p className="text-[14px] text-muted-foreground">
          Medical advisory oversight and the standards authorities the framework references are documented in{" "}
          <Link to="/governance">Governance & Oversight</Link>.
        </p>

        <div className="mt-10 pt-8 border-t border-border/60">
          <RelatedDocs
            items={[
              { to: "/governance", label: "Governance & Oversight", description: "Clinical advisory and statutory anchors." },
              { to: "/how-it-works", label: "How verification works", description: "Process, review, and renewal." },
              { to: "/status-definitions", label: "Status Definitions", description: "Glossary of regulatory standings." },
              { to: "/accountability", label: "Accountability & Enforcement", description: "Compliance protocol." },
            ]}
          />
        </div>

        <p className="mt-10 text-[12.5px] text-muted-foreground leading-[1.7]">
          <span className="meta-label text-foreground mr-2">Cite as ·</span>
          Source Standard, Organization Reference, SS-ORG-2026.01. Last updated 04 / 21 / 2026.
        </p>
      </DocSection>
    </DocLayout>
  </>
);

export default About;
