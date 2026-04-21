import { Link } from "react-router-dom";
import { RecordHeader } from "@/components/RecordHeader";
import { Section, SectionLabel } from "@/components/Section";

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

    <Section bordered={false}>
      <SectionLabel
        number="§1"
        title="Why this exists."
        description="In peptide, TRT, and hormone optimization markets, consumers are frequently asked to make decisions based on website language, branding, and trust signals that are not always easy to verify independently. At the same time, vendors who invest in proper sourcing, documentation, and oversight often operate in the same landscape as those who do not."
      />
      <p className="text-[15.5px] leading-[1.7] text-foreground max-w-[68ch]">
        <span className="font-semibold">Source Standard exists</span> to make that landscape easier to understand.
      </p>
    </Section>

    <Section>
      <SectionLabel
        number="§2"
        title="A public reference for vendor verification."
        description="Source Standard serves as a public reference for vendor verification and recognized upstream sources."
      />
      <div className="space-y-4 text-[15.5px] leading-[1.7] text-muted-foreground max-w-[68ch]">
        <p>
          Its purpose is not to market clinics, promote treatments, or influence care decisions. Its purpose is to
          help make sourcing and verification information more visible, more structured, and easier to interpret.
        </p>
        <p>
          When documentation is clearer, consumers are better informed and responsible operators are easier to
          recognize.
        </p>
      </div>
    </Section>

    <Section>
      <SectionLabel
        number="§3"
        title="Formed to address an information gap."
        description="A growing industry now carries real consumer demand, real clinical interest, and real variation in how claims are presented."
      />
      <div className="space-y-4 text-[15.5px] leading-[1.7] text-muted-foreground max-w-[68ch]">
        <p>
          Some operators invest heavily in documentation, sourcing standards, and oversight. Others present similar
          claims with far less visibility into what stands behind them. To the outside observer, those differences
          are not always easy to see.
        </p>
        <p className="text-foreground">
          Source Standard did not form to control the market. It formed to make it more legible.
        </p>
      </div>
    </Section>

    <Section>
      <SectionLabel
        number="§4"
        title="Four beliefs that shape the framework."
      />
      <ol className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
        {beliefs.map((b, i) => (
          <li key={i} className="grid grid-cols-12 gap-4 py-4">
            <div className="col-span-2 md:col-span-1 font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground pt-0.5">
              §4.{i + 1}
            </div>
            <p className="col-span-10 md:col-span-11 text-[15.5px] leading-[1.7] text-foreground">{b}</p>
          </li>
        ))}
      </ol>
    </Section>

    <Section>
      <SectionLabel
        number="§5"
        title="Scope of the framework."
        description="A two-column register of what falls inside and outside the auditing body's mandate."
      />
      <div className="rounded-[2px] border border-[#E5E7EB] overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 bg-surface-muted/60 border-b border-[#E5E7EB]">
          <div className="col-span-1 meta-label">Ref</div>
          <div className="col-span-5 meta-label">What we do</div>
          <div className="col-span-6 meta-label">What we do not do</div>
        </div>
        <ul className="divide-y divide-[#E5E7EB]">
          {weDo.map((item, i) => (
            <li key={i} className="grid grid-cols-12 gap-3 px-4 py-4 items-baseline">
              <div className="col-span-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted-foreground">
                §5.{i + 1}
              </div>
              <div className="col-span-5 text-[14px] text-foreground leading-[1.65]">{item}</div>
              <div className="col-span-6 text-[14px] text-muted-foreground leading-[1.65]">{weDoNot[i]}</div>
            </li>
          ))}
        </ul>
      </div>
    </Section>

    <Section>
      <SectionLabel number="§6" title="A single operating principle." />
      <div className="border border-[#E5E7EB] bg-background p-6 md:p-8 max-w-[68ch]">
        <p className="text-[16px] md:text-[17px] text-foreground leading-[1.7] font-medium">
          If documentation is present and supports the published status, that status can be shown publicly. If it
          is not, it cannot.
        </p>
        <div className="mt-5 pt-5 border-t border-[#E5E7EB]">
          <p className="text-[14.5px] text-muted-foreground leading-[1.7]">
            The role here is not to persuade. The role is to provide a clearer public reference.
          </p>
        </div>
      </div>
    </Section>

    <Section>
      <SectionLabel number="§7" title="Who this serves." />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-[12.5px] font-semibold text-foreground mb-3 uppercase tracking-[0.06em]">
            For consumers.
          </p>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Consumers should be able to understand more about the vendors they are evaluating. That does not make
            every decision simple. It does mean the public has better tools for interpreting what is being claimed,
            what has been reviewed, and what has not.
          </p>
        </div>
        <div>
          <p className="text-[12.5px] font-semibold text-foreground mb-3 uppercase tracking-[0.06em]">
            For responsible vendors.
          </p>
          <p className="text-[15px] text-muted-foreground leading-[1.7]">
            Responsible operators often absorb the cost of doing things carefully while competing in markets where
            those differences are not immediately visible. When transparency is easier to see, the market becomes
            easier to interpret — fairer to vendors willing to stand behind their documentation.
          </p>
        </div>
      </div>
    </Section>

    <Section>
      <SectionLabel number="§8" title="Mission." />
      <div className="space-y-5 max-w-[68ch]">
        <p className="text-[17px] md:text-[18px] text-foreground leading-[1.7] font-medium">
          To bring greater clarity, consistency, and transparency to vendor sourcing and verification in peptide,
          TRT, and hormone optimization markets.
        </p>
        <p className="text-[15.5px] text-muted-foreground leading-[1.7]">
          Source Standard exists to make the market easier to understand for the people moving through it.
        </p>
        <p className="text-[14px] text-muted-foreground leading-[1.7]">
          Medical advisory oversight and the standards authorities the framework references are documented in{" "}
          <Link to="/governance" className="text-foreground underline-offset-4 hover:underline">
            Governance & Oversight
          </Link>
          .
        </p>
      </div>
    </Section>

    <Section>
      <p className="text-[12.5px] text-muted-foreground leading-[1.7]">
        <span className="meta-label text-foreground mr-2">Cite as ·</span>
        Source Standard, Organization Reference, SS-ORG-2026.01. Last updated 04 / 21 / 2026.
      </p>
    </Section>
  </>
);

export default About;
