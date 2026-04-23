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
  body: string;
};

const sections: Section[] = [
  {
    id: "primary-source",
    n: "01",
    category: "AUDIT",
    title: "Supply-Chain Substantiation",
    body: "Our primary objective is the forensic mapping of the vendor's upstream supply chain. Before any entity is granted \u201CVerified\u201D status, we conduct an exhaustive review of their sourcing history to ensure a documented, unbroken link from the pharmaceutical manufacturer to the consumer-facing vendor. This involves direct cross-referencing with 503A and 503B pharmacy registrations and state-level licensing databases to confirm active and compliant standing.",
  },
  {
    id: "surveillance",
    n: "02",
    category: "SURVEILLANCE",
    title: "Analytical Surveillance",
    body: "Trust is maintained through ongoing, unannounced randomized testing. Source Standard executes \u201CSilent Purchase\u201D protocols from active registry listings\u2014acquiring products anonymously, exactly as a consumer would. These samples are submitted to independent, ISO-accredited laboratories for quantitative analysis. Our focus is restricted to three critical safety pillars: Molecular Identity, Concentration Accuracy (Potency), and Microbiological Sterility.",
  },
  {
    id: "monitoring",
    n: "03",
    category: "DISCLOSURE",
    title: "Continuous Oversight",
    body: "Verification is not a static designation; it is a dynamic status contingent upon perpetual compliance. Vendors are contractually obligated to disclose any material change in sourcing, ownership, or facility affiliation within 72 hours. Simultaneously, our system monitors federal FDA 483s, Warning Letters, and state-level administrative actions in real-time. Status is subject to immediate revocation upon evidence of any regulatory deficiency.",
  },
  {
    id: "boundaries",
    n: "04",
    category: "BOUNDARIES",
    title: "Operational Boundaries",
    body: "Source Standard operates as an independent documentation and analytical authority. We provide public disclosure of substantiated supply-chain data to assist in risk mitigation. We do not provide clinical recommendations, substitute for federal regulatory oversight, or certify individual patient outcomes.",
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
        >
          <p>{s.body}</p>
        </BoardSection>
      ))}
    </div>
  );
};

export default HowItWorks;
