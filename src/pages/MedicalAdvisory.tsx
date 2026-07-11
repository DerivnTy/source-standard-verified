import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageSection } from "@/components/system";
import { DefList } from "@/components/DefList";

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
      <Breadcrumb
        items={[
          { label: "Governance", to: "/governance" },
          { label: "Medical Advisory Board" },
        ]}
      />

      <PageHeader
        eyebrow="Governance · Medical Advisory Board"
        title="Who Advises Source Standard?"
        description={lead}
      />

      <PageSection first>
        <div className="space-y-4">
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Source Standard operates within a complex environment involving healthcare providers, pharmacies, manufacturers, regulators, and consumers. Maintaining public trust requires clear boundaries, consistent standards, and independent review of the framework itself.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            The Medical Advisory Board exists to support the integrity of the standards behind the registry. It provides independent advisory guidance to help maintain independence, consistency, and public trust in the framework.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Its responsibility is not to determine which vendors succeed or fail. Its responsibility is to help ensure that the framework itself remains consistent, neutral, and evidence-driven.
          </p>
        </div>
      </PageSection>

      <PageSection
        id="mandate"
        title="Institutional mandate"
        intro="The Medical Advisory Board exists to help maintain consistency and public trust throughout the framework."
      >
        <DefList items={MANDATE} />
      </PageSection>

      <PageSection
        id="functions"
        title="Governance functions"
        intro="How the Medical Advisory Board supports the framework."
      >
        <DefList items={FUNCTIONS} />
      </PageSection>

      <PageSection
        id="structure"
        title="Advisory structure"
        intro="The Medical Advisory Board may include physicians, pharmacists, legal professionals, compliance specialists, regulatory advisors, and subject-matter experts whose expertise supports the framework."
      >
        <div className="space-y-4">
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Appointments are made based on relevant experience, professional standing, and alignment with the framework's independence requirements.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            All advisory participation exists to support standards development, governance review, and public-reference integrity.
          </p>
        </div>
        <DefList items={ROLES} />
      </PageSection>

      <PageSection
        id="members"
        title="Advisory board members"
        intro="Board member profiles will be published as appointments are finalized. The structure below reflects the planned composition of the Medical Advisory Board."
      >
        <dl className="divide-y divide-border/60 border-t border-b border-border/60">
          {BOARD_MEMBERS.map((m) => (
            <div
              key={m.role}
              className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-x-8 gap-y-1 py-3.5"
            >
              <dt
                className="font-sans text-foreground"
                style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}
              >
                {m.role}
              </dt>
              <dd
                className="text-muted-foreground"
                style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}
              >
                To be announced · Appointments in progress
              </dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="boundaries" title="Scope & boundaries" intro="What the Medical Advisory Board does and does not do.">
        <ul className="space-y-2 list-disc pl-5 t-body-sm text-muted-foreground leading-relaxed">
          {BOUNDARIES.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="responsibilities"
        title="Core responsibilities"
        intro="The recurring functions supporting framework integrity."
      >
        <DefList items={RESPONSIBILITIES} />
      </PageSection>

      <PageSection id="integrity" title="Framework integrity" bordered={false}>
        <div className="space-y-4">
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            The Medical Advisory Board exists to strengthen the integrity and independence of the Source Standard framework. Its purpose is to support the standards behind the registry, not to promote vendors, influence commercial activity, recommend treatment, or replace regulatory authority.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Its role is governance. Its responsibility is framework integrity.
          </p>
        </div>
      </PageSection>

      <EditorialBackLink to="/governance" label="Back to Governance" />
    </>
  );
};

export default MedicalAdvisory;
