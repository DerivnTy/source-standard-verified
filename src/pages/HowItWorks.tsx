import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { DocJumpBar } from "@/components/DocJumpBar";
import { BoardSection } from "@/components/BoardSection";

type Section = {
  id: string;
  n: string;
  category: string;
  title: string;
  points: string[];
};

const sections: Section[] = [
  {
    id: "primary-source",
    n: "01",
    category: "AUDIT",
    title: "Supply-Chain Substantiation",
    points: [
      "Forensic mapping of the vendor's primary upstream supply chain to ensure legitimate sourcing.",
      "Direct cross-referencing with 503A and 503B pharmacy registrations and state-level licensing.",
      "Validation of Wholesale Distribution Records to establish a documented, unbroken chain of custody.",
      "Elimination of \u201CGhost Supply\u201D risks through comprehensive entity ownership and legal standing reviews.",
    ],
  },
  {
    id: "surveillance",
    n: "02",
    category: "SURVEILLANCE",
    title: "Analytical Surveillance",
    points: [
      "Execution of anonymous \u201CSilent Purchase\u201D protocols acquired directly from active registry listings.",
      "Independent submission of acquired samples to third-party, ISO-accredited laboratories.",
      "Quantitative molecular confirmation to verify the precise Identity of the compound.",
      "Rigorous laboratory testing for Concentration Accuracy (Potency) and Microbiological Sterility.",
      "Immediate status revocation and public disclosure upon any evidence of analytical deficiency.",
    ],
  },
  {
    id: "monitoring",
    n: "03",
    category: "DISCLOSURE",
    title: "Continuous Oversight",
    points: [
      "Contractual obligation for vendors to disclose sourcing or ownership changes within a 72-hour window.",
      "Real-time monitoring of federal FDA 483s, Warning Letters, and state-level administrative actions.",
      "Perpetual credential tracking to ensure licenses and DEA registrations remain in active, compliant standing.",
      "Automated status suspension protocols for vendors failing to meet ongoing disclosure requirements.",
    ],
  },
  {
    id: "boundaries",
    n: "04",
    category: "BOUNDARIES",
    title: "Operational Boundaries",
    points: [
      "Independent disclosure of substantiated supply-chain data for public risk mitigation.",
      "No provision of clinical recommendations or substitute for federal regulatory oversight.",
      "No certification of individual patient outcomes or biological efficacy.",
    ],
  },
];

const waypoints = sections.map((s) => ({
  id: s.id,
  number: s.n,
  label: s.category,
}));

const HowItWorks = () => {
  return (
    <div className="bg-background">
      <PageMeta
        title="The Verification Standard"
        description="An independent oversight framework designed to substantiate supply-chain integrity and ensure regulatory alignment across the compounded medicine landscape."
      />
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "Verification Standard" }]} />
      <BriefingHero
        tone="navy"
        category="The Verification Standard"
        docId=""
        title="The Verification Standard"
        statement="An independent oversight framework designed to substantiate supply-chain integrity and ensure regulatory alignment across the compounded medicine landscape."
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
          <ul className="space-y-4">
            {s.points.map((p, idx) => (
              <li key={idx} className="flex gap-4">
                <span aria-hidden className="text-muted-foreground/60 select-none font-sans">|</span>
                <span className="flex-1">{p}</span>
              </li>
            ))}
          </ul>
        </BoardSection>
      ))}
    </div>
  );
};

export default HowItWorks;
