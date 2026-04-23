import { Link } from "react-router-dom";
import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { BoardSection } from "@/components/BoardSection";
import { DocJumpBar } from "@/components/DocJumpBar";

type Section = {
  id: string;
  n: string;
  category: string;
  title: string;
  paragraph?: string;
  points?: string[];
};

const sections: Section[] = [
  {
    id: "context",
    n: "01",
    category: "CONTEXT",
    title: "Context",
    paragraph:
      "In high-growth medical markets, consumers are frequently required to make decisions based on unverified marketing claims and branding signals. Source Standard was established to bridge the information gap between vendor claims and documented supply-chain reality. We provide the evidentiary layer necessary to distinguish compliant operators from unregulated sources.",
  },
  {
    id: "boundaries",
    n: "02",
    category: "BOUNDARIES",
    title: "Operational Boundaries",
    points: [
      "Source Standard does not provide medical advice or prescribe treatment protocols.",
      "We do not substitute for physician judgment or federal regulatory oversight.",
      "Our framework does not function as a marketing partner or promotional arm for any vendor.",
      "We do not guarantee clinical outcomes, biological efficacy, or individual product safety.",
      "Our mandate is limited to the verification of documentation and supply-chain transparency.",
    ],
  },
  {
    id: "audiences",
    n: "03",
    category: "OBJECTIVES",
    title: "Strategic Objectives",
    points: [
      "For Consumers: Providing a verified reference point so that healthcare decisions rest on documented evidence rather than aesthetic presentation.",
      "For Operators: Creating a visible standard for transparency that rewards vendors who maintain rigorous sourcing and oversight protocols.",
    ],
  },
  {
    id: "scope",
    n: "04",
    category: "SCOPE",
    title: "Defined Scope",
    points: [
      "Maintenance of a public registry of verified vendors and substantiated sourcing.",
      "Continuous publication of recognized upstream pharmaceutical sources.",
      "Provision of educational material regarding sourcing, storage, and due-diligence protocols.",
      "Independent surveillance and random analytical testing of registry listings.",
    ],
  },
];

const readDeeper = [
  { to: "/governance", label: "Governance & Oversight", desc: "Clinical advisory and statutory anchors." },
  { to: "/how-it-works", label: "Verification Protocol", desc: "Detailed audit and renewal processes." },
  { to: "/status-definitions", label: "Status Definitions", desc: "Glossary of regulatory standings." },
  { to: "/accountability", label: "Enforcement", desc: "Accountability and violation protocols." },
];

const waypoints = sections.map((s) => ({
  id: s.id,
  number: s.n,
  label: s.category,
}));

const About = () => {
  return (
    <>
      <PageMeta
        title="Organization & Mandate"
        description="An independent verification and public-reference framework for supply-chain transparency in the peptide and hormone optimization markets."
      />
      <Breadcrumb items={[{ label: "About" }]} />
      <BriefingHero
        tone="navy"
        category="Organization & Mandate"
        docId=""
        title="Organization & Mandate"
        statement="An independent verification and public-reference framework for supply-chain transparency in the peptide and hormone optimization markets."
      />
      <DocJumpBar waypoints={waypoints} />

      {sections.map((s, i) => (
        <BoardSection
          key={s.id}
          id={s.id}
          n={s.n}
          category={s.category}
          title={s.title}
          muted={i % 2 === 1}
          hideEyebrow
        >
          {s.paragraph && <p>{s.paragraph}</p>}
          {s.points && (
            <ul className="space-y-4">
              {s.points.map((p, idx) => (
                <li key={idx} className="flex gap-4">
                  <span aria-hidden className="text-muted-foreground/60 select-none font-sans">|</span>
                  <span className="flex-1">{p}</span>
                </li>
              ))}
            </ul>
          )}
        </BoardSection>
      ))}

      <BoardSection n="05" category="REFERENCE" title="Reference Library" muted={sections.length % 2 === 1} hideEyebrow>
        <ul className="grid grid-cols-1 sm:grid-cols-2 border-t border-border">
          {readDeeper.map((d, i) => (
            <li
              key={d.to}
              className={`border-b border-border ${i % 2 === 0 ? "sm:border-r" : ""}`}
            >
              <Link
                to={d.to}
                className="group block px-5 py-5 hover:bg-surface-muted transition-colors"
              >
                <p className="t-body-md font-medium text-foreground group-hover:text-primary">
                  {d.label} <span className="text-primary">→</span>
                </p>
                <p className="mt-1 t-body-sm text-muted-foreground">{d.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </BoardSection>
    </>
  );
};

export default About;
