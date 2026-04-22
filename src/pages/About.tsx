import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { BoardSection } from "@/components/BoardSection";
import { DocJumpBar } from "@/components/DocJumpBar";

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

const waypoints = [
  { id: "context", number: "1", label: "Context" },
  { id: "definition", number: "2", label: "Definition" },
  { id: "boundaries", number: "3", label: "Boundaries" },
  { id: "audiences", number: "4", label: "Audiences" },
  { id: "principles", number: "5", label: "Principles" },
  { id: "scope", number: "6", label: "Scope" },
];

const About = () => {
  return (
    <>
      <PageMeta
        title="About Source Standard"
        description="An independent verification and public-reference framework for vendor sourcing transparency in peptide, TRT, and hormone optimization markets."
      />
      <Breadcrumb items={[{ label: "About" }]} />
      <BriefingHero
        tone="navy"
        category="About Source Standard"
        docId=""
        title="About Source Standard"
        statement="An independent verification and public-reference framework for vendor sourcing transparency in peptide, TRT, and hormone optimization markets."
      />
      <DocJumpBar waypoints={waypoints} />

      <BoardSection
        id="context"
        n="1"
        category="Context"
        title="Consumers shouldn't have to decode marketing claims."
      >
        <p>
          In peptide, TRT, and hormone optimization markets, consumers are routinely asked to make
          decisions based on website language, branding, and trust signals that are difficult to
          verify independently. Operators who invest in proper sourcing, documentation, and
          oversight share the same landscape as those who do not, and from the outside, the
          differences are not always easy to see.
        </p>
        <p className="text-foreground font-medium">
          Source Standard exists to make that landscape easier to interpret.
        </p>
      </BoardSection>

      <BoardSection
        id="definition"
        n="2"
        category="Definition"
        title="A public reference and verification framework."
        muted
      >
        <p>
          Source Standard publishes vendor verification status and recognized upstream sources, and
          organizes sourcing and documentation information so the public can interpret it more
          clearly. It is a reference layer for an industry that has not had one.
        </p>
      </BoardSection>

      <BoardSection
        id="boundaries"
        n="3"
        category="Boundaries"
        title="Boundaries of the framework."
      >
        <ul className="border-y border-border divide-y divide-border">
          {isNotItems.map((item, i) => (
            <li key={i} className="py-4 text-[14.5px] font-medium text-foreground">
              {item}
            </li>
          ))}
        </ul>
      </BoardSection>

      {/* Operating principle — kept centered (single emphatic statement) */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide space-section-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="meta-mono mb-6">Operating principle</p>
            <p className="text-[20px] md:text-[22px] font-medium tracking-[-0.01em] leading-[1.45] text-foreground">
              "If documentation is present and supports the published status, that status can be shown
              publicly. If it is not, it cannot."
            </p>
            <p className="mt-6 text-[14px] text-muted-foreground leading-relaxed">
              The role here is not to persuade. The role is to provide a clearer public reference.
            </p>
          </div>
        </div>
      </section>

      <BoardSection
        id="audiences"
        n="4"
        category="Audiences"
        title="Two audiences, one framework."
      >
        <div className="grid md:grid-cols-2 md:divide-x divide-border">
          <div className="md:pr-8 pb-8 md:pb-0 border-b md:border-b-0 border-border">
            <p className="h-card mb-3">For consumers</p>
            <p>
              Source Standard helps consumers understand what has been reviewed, what has not, and
              how to interpret vendor claims more clearly, so decisions rest on evidence rather
              than presentation.
            </p>
          </div>
          <div className="md:pl-8 pt-8 md:pt-0">
            <p className="h-card mb-3">For responsible vendors</p>
            <p>
              Source Standard makes transparency more visible, distinguishing operators who are
              willing to stand behind their documentation from those who are not.
            </p>
          </div>
        </div>
      </BoardSection>

      <BoardSection
        id="principles"
        n="5"
        category="Principles"
        title="Four ideas that shape the framework."
        muted
      >
        <ol className="border-y border-border divide-y divide-border">
          {beliefs.map((b, i) => (
            <li key={i} className="grid grid-cols-12 gap-4 py-5 items-baseline">
              <div className="col-span-2 meta-mono text-primary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="col-span-10 text-[14.5px] text-foreground leading-relaxed">{b}</p>
            </li>
          ))}
        </ol>
      </BoardSection>

      <BoardSection
        id="scope"
        n="6"
        category="Scope"
        title="What falls within the framework, and what falls outside it."
      >
        <div className="grid md:grid-cols-2 md:divide-x divide-border">
          <div className="md:pr-8 pb-8 md:pb-0 border-b md:border-b-0 border-border">
            <p className="h-card mb-4">Within the framework</p>
            <ul className="space-y-2.5">
              {weVerify.map((item, i) => (
                <li key={i} className="text-[14px] text-muted-foreground leading-relaxed">
                 , {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:pl-8 pt-8 md:pt-0">
            <p className="h-card mb-4">Outside the framework</p>
            <ul className="space-y-2.5">
              {weFlag.map((item, i) => (
                <li key={i} className="text-[14px] text-muted-foreground leading-relaxed">
                 , {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </BoardSection>

      {/* Mission — kept centered (single emphatic statement) */}
      <section className="border-b border-border bg-surface-muted">
        <div className="container-wide space-section-tight">
          <div className="mx-auto max-w-2xl text-center">
            <p className="meta-mono mb-6">Mission</p>
            <p className="text-[20px] md:text-[22px] font-medium tracking-[-0.01em] leading-[1.45] text-foreground">
              To bring greater clarity, consistency, and transparency to vendor sourcing and
              verification in peptide, TRT, and hormone optimization markets.
            </p>
            <p className="mt-6 text-[14px] text-muted-foreground leading-relaxed">
              Source Standard exists to make the market easier to understand for the people moving
              through it.
            </p>
          </div>
        </div>
      </section>

      <BoardSection n="7" category="Continue reading" title="Read deeper into the framework.">
        <ul className="grid grid-cols-1 sm:grid-cols-2 border-t border-border">
          {readDeeper.map((d, i) => (
            <li
              key={d.to}
              className={`border-b border-border ${
                i % 2 === 0 ? "sm:border-r" : ""
              }`}
            >
              <Link
                to={d.to}
                className="group block px-5 py-5 hover:bg-surface-muted transition-colors"
              >
                <p className="text-[14.5px] font-medium text-foreground group-hover:text-primary">
                  {d.label} <span className="text-primary">→</span>
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{d.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </BoardSection>

    </>
  );
};

export default About;
