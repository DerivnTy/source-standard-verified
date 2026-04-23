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
  points: string[];
};

const sections: Section[] = [
  {
    id: "acceptance",
    n: "01",
    category: "ACCEPTANCE",
    title: "Registry Access & Acceptance",
    points: [
      "Access to the Source Standard public registry constitutes binding acceptance of this agreement and the associated Data Governance Policy.",
      "If any term is not accepted, the user must immediately discontinue use of the registry and its associated framework documents.",
      "Continued access represents a contractual acknowledgment of the jurisdictional and liability limitations defined herein.",
    ],
  },
  {
    id: "citation",
    n: "02",
    category: "CITATION",
    title: "Citation & Data Utilization",
    points: [
      "Registry entries may be cited in journalistic, academic, or clinical contexts provided the following elements are included:",
      "Audit ID: The unique registry identifier (e.g., SS-V-####).",
      "Status Date: The specific date of the determination being referenced.",
      "Attribution: A direct link to the source registry page for real-time verification.",
      "Citations omitting the Audit ID or Status Date are considered non-conforming and may result in status-misrepresentation protocols.",
    ],
  },
  {
    id: "prohibited",
    n: "03",
    category: "INTEGRITY",
    title: "Integrity & Prohibitions",
    points: [
      "Bulk Extraction: No automated scraping, crawling, or indexing of registry data for resale or derivative datasets.",
      "Status Misrepresentation: No display or implication of a \u201CVerified\u201D status for any entity not currently active in the registry.",
      "Unauthorized Identification: No use of Source Standard marks or badge artwork to imply an uncontracted partnership or endorsement.",
      "Registry Interference: No activity intended to disrupt or falsify the integrity of the public records.",
      "Confirmed violations are subject to administrative action under the SS-ENFORCE-2026.01 protocol.",
    ],
  },
  {
    id: "warranty",
    n: "04",
    category: "WARRANTY",
    title: "Warranty & Liability",
    points: [
      "Auditing Mirror: This registry operates as a mirror of third-party regulatory, pharmacy, and laboratory records.",
      "As-Is Basis: Data is provided for reference only; the auditing body makes no warranties regarding the fitness of registry entries for any specific medical purpose.",
      "Limit of Liability: Reliance on registry data is at the user's discretion. Users are advised to consult licensed clinicians for all medical determinations.",
    ],
  },
  {
    id: "jurisdiction",
    n: "05",
    category: "JURISDICTION",
    title: "Jurisdiction",
    points: [
      "This agreement is governed by the laws of the State of Florida and applicable United States Federal Standards.",
      "Any dispute arising under this agreement is subject to the exclusive jurisdiction of the state and federal courts located in Florida.",
    ],
  },
];

const relatedPolicies = [
  { to: "/privacy", label: "Data Governance & Privacy Policy" },
  { to: "/verification-disclaimer", label: "Verification Disclaimer" },
  { to: "/accountability", label: "Accountability & Enforcement" },
  { to: "/status-definitions", label: "Status Definitions" },
];

const waypoints = sections.map((s) => ({
  id: s.id,
  number: s.n,
  label: s.category,
}));

const Terms = () => (
  <>
    <PageMeta
      title="Registry User Agreement"
      description="The binding framework governing the access, citation, and utilization of Source Standard registry data."
    />
    <Breadcrumb items={[{ label: "Legal" }, { label: "Terms" }]} />

    <BriefingHero
      tone="navy"
      category="Policy · Registry User Agreement"
      docId=""
      title="Registry User Agreement"
      statement="The binding framework governing the access, citation, and utilization of Source Standard registry data."
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

    <BoardSection
      n="06"
      category="REFERENCE"
      title="Related Policies"
      muted={sections.length % 2 === 1}
    >
      <ul className="border-y border-border divide-y divide-border">
        {relatedPolicies.map((d) => (
          <li key={d.to}>
            <Link
              to={d.to}
              className="group flex items-center justify-between gap-4 py-4 hover:text-primary transition-colors"
            >
              <span className="t-body-md text-foreground group-hover:text-primary">{d.label}</span>
              <span className="text-primary shrink-0">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </BoardSection>
  </>
);

export default Terms;
