import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";
import { Shield } from "lucide-react";

type Item = { term: string; description: string };

const MANDATE: Item[] = [
  {
    term: "Independence",
    description:
      "Supports the independence of the framework from vendor, pharmacy, and commercial interests.",
  },
  {
    term: "Consistency",
    description: "Supports consistent application of framework standards.",
  },
  {
    term: "Objectivity",
    description: "Promotes objective evaluation of framework boundaries.",
  },
  {
    term: "Public Trust",
    description: "Supports public confidence in the framework.",
  },
];

const FUNCTIONS: Item[] = [
  {
    term: "Framework Guidance",
    description:
      "Provides independent perspective on the structure, scope, and public communication of the Source Standard framework.",
  },
  {
    term: "Standards Consistency",
    description:
      "Supports the consistent application of framework principles across registry materials and public-reference content.",
  },
  {
    term: "Public Clarity",
    description:
      "Helps ensure that public-facing language remains clear, accurate, and aligned with the framework's purpose.",
  },
  {
    term: "Independent Perspective",
    description:
      "Offers independent review of framework boundaries, standards, and educational materials.",
  },
];

const ROLES: Item[] = [
  {
    term: "Medical Advisor",
    description: "Clinical Audit Standards. Appointment to be announced.",
  },
  {
    term: "Pharmacy Advisor",
    description: "Pharmacy Sourcing Review. Appointment to be announced.",
  },
  {
    term: "Clinical Advisor",
    description: "Patient Safety & Public Clarity. Appointment to be announced.",
  },
  {
    term: "Legal Advisor",
    description: "Regulatory Policy & Ethics. Appointment to be announced.",
  },
];

const BOUNDARIES = [
  "Supports the standards behind public status determinations.",
  "Does not evaluate, diagnose, or treat patients.",
  "Does not provide individualized medical, pharmacy, or legal advice.",
  "Does not approve vendors, manufacturers, pharmacies, or products.",
  "Does not make individual vendor status determinations.",
  "Does not participate in marketing, promotion, or commercial endorsement activity.",
];

const BOARD_MEMBERS = [
  { role: "Clinical Oversight" },
  { role: "Pharmacy Standards" },
  { role: "Regulatory Affairs" },
  { role: "Evidence Review" },
];

const RESPONSIBILITIES: Item[] = [
  {
    term: "Framework consistency",
    description:
      "Supports consistent application of standards and principles across the Source Standard registry and public-reference materials.",
  },
  {
    term: "Independent oversight",
    description:
      "Provides independent perspective to help maintain the objectivity and integrity of the framework.",
  },
  {
    term: "Public standards",
    description:
      "Promotes clear, accessible standards that support public understanding of the framework.",
  },
  {
    term: "Educational review",
    description:
      "Reviews public-reference materials for clarity, accuracy, and appropriate scope.",
  },
];

const MedicalAdvisory = () => {
  const lead =
    "Independent experts who help ensure Source Standard's verification framework stays objective, consistent, and worthy of public trust.";

  return (
    <>
      <PageMeta
        title="Who Advises Source Standard? · Source Standard"
        description={lead}
      />

      <ArticleHeader
        category="Governance · Medical Advisory Board"
        title="Who Advises Source Standard?"
        lead={lead}
      />

      <ArticleSection variant="prose">
        <p>
          Source Standard operates within a complex environment involving healthcare providers, pharmacies, manufacturers, regulators, and consumers. Maintaining public trust requires clear boundaries, consistent standards, and independent review of the framework itself.
        </p>
        <p>
          The Medical Advisory Board exists to support the integrity of the standards behind the registry. It provides independent advisory guidance to help maintain independence, consistency, and public trust in the framework.
        </p>
        <p>
          Its responsibility is not to determine which vendors succeed or fail. Its responsibility is to help ensure that the framework itself remains consistent, neutral, and evidence-driven.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="Institutional Mandate">
        <p>
          The Medical Advisory Board exists to help maintain consistency and public trust throughout the framework.
        </p>
        <DefList items={MANDATE} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Governance Functions">
        <p>How the Medical Advisory Board supports the framework.</p>
        <DefList items={FUNCTIONS} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Advisory Structure">
        <p>
          The Medical Advisory Board may include physicians, pharmacists, legal professionals, compliance specialists, regulatory advisors, and subject-matter experts whose expertise supports the framework.
        </p>
        <p>
          Appointments are made based on relevant experience, professional standing, and alignment with the framework's independence requirements.
        </p>
        <p>
          All advisory participation exists to support standards development, governance review, and public-reference integrity.
        </p>
        <DefList items={ROLES} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Advisory Board Members">
        <p>
          Board member profiles will be published as appointments are finalized. The structure below reflects the planned composition of the Medical Advisory Board.
        </p>
        <div className="not-prose mt-8 grid gap-4 sm:grid-cols-2">
          {BOARD_MEMBERS.map((m) => (
            <div
              key={m.role}
              className="group flex flex-col rounded-2xl bg-[hsl(var(--navy-surface))] p-7 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[hsl(var(--navy-surface-2))]"
              style={{ border: "1px solid hsl(0 0% 100% / 0.06)" }}
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Shield className="h-5 w-5 text-white/50" strokeWidth={1.5} />
              </div>
              <div className="mt-auto">
                <div className="text-[16px] font-medium text-white/95">
                  To Be Announced
                </div>
                <div className="mt-1.5 text-[14px] text-white/55">
                  {m.role}
                </div>
                <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.08em] text-white/35">
                  Appointments in Progress
                </div>
              </div>
            </div>
          ))}
        </div>
      </ArticleSection>

      <ArticleSection variant="prose" title="Scope & Boundaries">
        <p>What the Medical Advisory Board does and does not do.</p>
        <ul className="list-disc pl-5">
          {BOUNDARIES.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </ArticleSection>

      <ArticleSection variant="prose" title="Core Responsibilities">
        <p>The recurring functions supporting framework integrity.</p>
        <DefList items={RESPONSIBILITIES} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Framework Integrity">
        <p>
          The Medical Advisory Board exists to strengthen the integrity and independence of the Source Standard framework. Its purpose is to support the standards behind the registry, not to promote vendors, influence commercial activity, recommend treatment, or replace regulatory authority.
        </p>
        <p>Its role is governance. Its responsibility is framework integrity.</p>
      </ArticleSection>

      <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default MedicalAdvisory;
