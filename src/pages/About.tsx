import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { DocSignature } from "@/components/DocSignature";

const beliefs = [
  "Consumers deserve more than marketing language when evaluating a vendor.",
  "Vendors who operate with transparency should be easier to distinguish.",
  "Public clarity helps everyone understand the landscape more accurately.",
  "Documentation matters.",
];

const weVerify = [
  "Maintain a public system to review verified vendors.",
  "Publish recognized upstream sources.",
  "Document verification definitions.",
  "Provide educational material on sourcing, documentation, storage, and due diligence.",
];

const weFlag = [
  "Prescribe treatment.",
  "Endorse specific medical protocols.",
  "Replace medical advice, physician judgment, or regulatory oversight.",
  "Function as a marketing arm for any clinic or vendor.",
];

const isNotItems = [
  "Does not prescribe treatment.",
  "Does not provide medical advice.",
  "Does not replace physician judgment.",
  "Does not function as a regulator.",
  "Does not market clinics or act as a promotional partner.",
  "Does not guarantee medical outcomes, product safety, or treatment efficacy.",
];

const readDeeper = [
  { to: "/governance", label: "Governance & Oversight", desc: "Clinical advisory and statutory anchors." },
  { to: "/how-it-works", label: "How verification works", desc: "Process, review, and renewal." },
  { to: "/status-definitions", label: "Status definitions", desc: "Glossary of regulatory standings." },
  { to: "/accountability", label: "Accountability & enforcement", desc: "Compliance protocol." },
];

const SectionHeader = ({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) => (
  <div className="mx-auto max-w-3xl text-center mb-10 md:mb-12">
    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
      {eyebrow}
    </p>
    <h2 className="text-[1.625rem] md:text-[1.875rem] font-semibold tracking-[-0.012em] leading-[1.25] text-foreground">
      {title}
    </h2>
    {lede && (
      <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">{lede}</p>
    )}
  </div>
);

const About = () => {
  return (
    <>
      <PageMeta
        title="About Source Standard"
        description="An independent verification and public-reference framework for vendor sourcing transparency in peptide, TRT, and hormone optimization markets."
      />
      <BriefingHero
        tone="navy"
        category="About Source Standard"
        docId=""
        title="About Source Standard"
        statement="An independent verification and public-reference framework for vendor sourcing transparency in peptide, TRT, and hormone optimization markets."
      />

      {/* Why this exists */}
      <section className="bg-background border-b border-border py-12 md:py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Why this exists"
            title="Consumers shouldn't have to decode marketing claims."
          />
          <div className="mx-auto max-w-3xl space-y-5">
            <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
              In peptide, TRT, and hormone optimization markets, consumers are routinely asked to make
              decisions based on website language, branding, and trust signals that are difficult to verify
              independently. Operators who invest in proper sourcing, documentation, and oversight share the
              same landscape as those who do not — and from the outside, the differences are not always
              easy to see.
            </p>
            <p className="text-[15.5px] text-foreground leading-[1.75] font-medium">
              Source Standard exists to make that landscape easier to interpret.
            </p>
          </div>
        </div>
      </section>

      {/* What Source Standard is */}
      <section className="bg-surface-muted border-b border-border py-12 md:py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="What Source Standard is"
            title="A public reference and verification framework."
          />
          <div className="mx-auto max-w-3xl">
            <p className="text-[15.5px] text-muted-foreground leading-[1.75]">
              Source Standard publishes vendor verification status and recognized upstream sources, and
              organizes sourcing and documentation information so the public can interpret it more clearly.
              It is a reference layer for an industry that has not had one.
            </p>
          </div>
        </div>
      </section>

      {/* What Source Standard is not */}
      <section className="bg-background border-b border-border py-12 md:py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="What Source Standard is not"
            title="Boundaries of the framework."
          />
          <ul className="mx-auto max-w-4xl grid md:grid-cols-2 md:gap-x-12">
            {isNotItems.map((item, i) => (
              <li
                key={i}
                className="border-b border-border py-4 text-[15px] font-medium text-foreground leading-[1.6]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Operating principle */}
      <section className="bg-surface-muted border-b border-border py-16 md:py-20">
        <div className="container-wide text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
            Operating principle
          </p>
          <p className="mx-auto max-w-2xl text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] leading-[1.45] text-foreground">
            “If documentation is present and supports the published status, that status can be shown
            publicly. If it is not, it cannot.”
          </p>
          <p className="mx-auto max-w-xl mt-6 text-[14.5px] text-muted-foreground leading-[1.7]">
            The role here is not to persuade. The role is to provide a clearer public reference.
          </p>
        </div>
      </section>

      {/* Who this serves */}
      <section className="bg-background border-b border-border py-12 md:py-16">
        <div className="container-wide">
          <SectionHeader eyebrow="Who this serves" title="Two audiences, one framework." />
          <div className="mx-auto max-w-4xl grid md:grid-cols-2 md:divide-x divide-border">
            <div className="md:pr-10 pb-8 md:pb-0 border-b md:border-b-0 border-border">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground mb-3">
                For consumers
              </p>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                Source Standard helps consumers understand what has been reviewed, what has not, and how to
                interpret vendor claims more clearly — so decisions rest on evidence rather than presentation.
              </p>
            </div>
            <div className="md:pl-10 pt-8 md:pt-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground mb-3">
                For responsible vendors
              </p>
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                Source Standard makes transparency more visible, distinguishing operators who are willing to
                stand behind their documentation from those who are not.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-surface-muted border-b border-border py-12 md:py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Principles"
            title="Four ideas that shape the framework."
          />
          <ol className="mx-auto max-w-3xl">
            {beliefs.map((b, i) => (
              <li
                key={i}
                className="grid grid-cols-12 gap-6 items-baseline border-b border-border py-5"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
                  0{i + 1}
                </span>
                <p className="col-span-10 md:col-span-11 text-[15px] text-foreground leading-[1.65]">
                  {b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scope & boundaries */}
      <section className="bg-background border-b border-border py-12 md:py-16">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Scope & boundaries"
            title="What falls within the framework, and what falls outside it."
          />
          <div className="mx-auto max-w-4xl grid md:grid-cols-2 md:divide-x divide-border">
            <div className="md:pr-10 pb-8 md:pb-0 border-b md:border-b-0 border-border">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground mb-4">
                Within the framework
              </p>
              <ul className="space-y-3">
                {weVerify.map((item, i) => (
                  <li key={i} className="text-[14.5px] text-muted-foreground leading-[1.7]">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-10 pt-8 md:pt-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground mb-4">
                Outside the framework
              </p>
              <ul className="space-y-3">
                {weFlag.map((item, i) => (
                  <li key={i} className="text-[14.5px] text-muted-foreground leading-[1.7]">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-muted border-b border-border py-16 md:py-20">
        <div className="container-wide text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
            Mission
          </p>
          <p className="mx-auto max-w-2xl text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] leading-[1.45] text-foreground">
            To bring greater clarity, consistency, and transparency to vendor sourcing and verification in
            peptide, TRT, and hormone optimization markets.
          </p>
          <p className="mx-auto max-w-xl mt-6 text-[14.5px] text-muted-foreground leading-[1.7]">
            Source Standard exists to make the market easier to understand for the people moving through it.
          </p>
        </div>
      </section>

      {/* Continue reading */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-wide">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground mb-6 text-center">
            Continue reading
          </p>
          <ul className="mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 border-t border-border">
            {readDeeper.map((d) => (
              <li key={d.to} className="border-b border-border sm:[&:nth-child(odd)]:border-r">
                <Link
                  to={d.to}
                  className="group block px-5 py-5 hover:bg-surface-muted transition-colors"
                >
                  <p className="text-[14.5px] font-medium text-foreground group-hover:text-primary">
                    {d.label} <span className="text-primary">→</span>
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-[1.6]">{d.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DocSignature docId="SS-ORG-2026.01" verifiedOn="04 / 21 / 2026" />
    </>
  );
};

export default About;
