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
    id: "scope",
    n: "01",
    category: "SCOPE",
    title: "Administrative Attestation Scope",
    points: [
      "A Source Standard verification is defined as an Attestation of Record Consistency.",
      "It is an administrative finding that an entity's documented sourcing, licenses, and operating records are internally consistent with their public-facing claims.",
      "Documented Identity: Validation of business registration and operating credentials.",
      "Regulatory Standing: Cross-referencing of licensing with state and federal authorities at a fixed point in time.",
      "Upstream Sourcing: Review of pharmacy disclosures and invoice records submitted under the Vendor Submission Standard.",
      "The registry operates as an auditing mirror and does not supersede original third-party records.",
    ],
  },
  {
    id: "exclusions",
    n: "02",
    category: "EXCLUSIONS",
    title: "Matters Outside the Scope of Attestation",
    points: [
      "Clinical Outcomes: No attestation is made regarding the medical result for any individual patient.",
      "Product Suitability: We do not evaluate the appropriateness of any formulation or protocol for specific persons.",
      "Safety & Efficacy: The auditing body does not certify biological safety, sterility, or potency.",
      "Future Conduct: A determination reflects the records reviewed at a fixed point in time and is not a warranty of future performance.",
    ],
  },
  {
    id: "limitations",
    n: "03",
    category: "BOUNDARIES",
    title: "Regulatory & Professional Boundaries",
    points: [
      "Not a Statutory Body: Source Standard is a private auditing entity. We hold no government enforcement authority.",
      "Not a Clinical Practice: We do not diagnose, prescribe, or dispense. We do not practice medicine or pharmacy.",
      "Not a Manufacturer: We do not compound, repackage, or distribute pharmaceutical products.",
      "Not a Guarantor: A Verified status is an administrative snapshot; it is not a warranty, indemnity, or insurance policy.",
    ],
  },
  {
    id: "liability",
    n: "04",
    category: "LIABILITY",
    title: "Limitation of Liability",
    points: [
      "User Discretion: The registry is a public reference tool. Reliance on any determination is at the user's sole discretion.",
      "Professional Consultation: Users are directed to consult licensed clinicians for medical matters and applicable state boards for statutory matters.",
      "Exemption from Liability: Access to the registry constitutes a binding acknowledgment that Source Standard is exempt from liability for damages arising from any action taken based on registry content.",
    ],
  },
];

const waypoints = sections.map((s) => ({
  id: s.id,
  number: s.n,
  label: s.category,
}));

const VerificationDisclaimer = () => (
  <>
    <PageMeta
      title="Verification Disclaimer & Attestation Scope"
      description="The formal boundaries, jurisdictional limits, and liability framework governing Source Standard determinations."
    />
    <Breadcrumb items={[{ label: "Legal" }, { label: "Verification Disclaimer" }]} />

    <BriefingHero
      tone="navy"
      category="Policy · Verification Disclaimer"
      docId=""
      title="Verification Disclaimer & Attestation Scope"
      statement="The formal boundaries, jurisdictional limits, and liability framework governing Source Standard determinations."
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
        <ul className="space-y-4">
          {s.points.map((p, idx) => (
            <li key={idx} className="flex gap-6">
              <span aria-hidden className="text-muted-foreground/60 select-none font-sans">|</span>
              <span className="flex-1">{p}</span>
            </li>
          ))}
        </ul>
      </BoardSection>
    ))}

    <section className="border-b border-border bg-background">
      <div className="page-shell section-pad">
        <div className="mx-auto w-standard">
          <Link
            to="/education"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 t-utility-xs text-foreground hover:bg-surface-muted hover:text-primary transition-colors"
          >
            ← Return to Resource Library
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default VerificationDisclaimer;
