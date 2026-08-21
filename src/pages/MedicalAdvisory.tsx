import { PageMeta } from "@/components/PageMeta";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PageSection } from "@/components/system";
import { DefList } from "@/components/DefList";

type Item = { term: string; description: string };

const ROLES: Item[] = [
  {
    term: "Medical Advisor",
    description: "Clinical audit standards. Appointment to be announced.",
  },
  {
    term: "Pharmacy Advisor",
    description: "Pharmacy sourcing review. Appointment to be announced.",
  },
  {
    term: "Clinical Advisor",
    description: "Patient safety and public clarity. Appointment to be announced.",
  },
  {
    term: "Legal Advisor",
    description: "Regulatory policy and ethics. Appointment to be announced.",
  },
];

const BOUNDARIES = [
  "May advise on the standards behind public status determinations.",
  "Does not evaluate, diagnose, or treat patients.",
  "Does not provide individualized medical, pharmacy, or legal advice.",
  "Does not approve clinics, manufacturers, pharmacies, or products.",
  "Does not make individual clinic status determinations.",
  "Does not participate in marketing or commercial endorsement.",
];

const MedicalAdvisory = () => {
  const lead =
    "Advisory seats that will review the consistency and limits of the Source Standard framework. Appointments have not been announced.";

  return (
    <>
      <PageMeta
        title="Who Advises Source Standard?"
        description={lead}
      />
      <Breadcrumb
        items={[
          { label: "Governance", to: "/governance" },
          { label: "Advisory seats" },
        ]}
      />

      <PageHeader
        title="Advisory seats"
        description={lead}
      />

      <PageSection first title="Purpose">
        <div className="space-y-4" style={{ maxWidth: "68ch" }}>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            The advisory function exists to review the framework itself: scope definitions, evidence standards, and public language. It does not decide which clinics succeed or fail.
          </p>
          <p className="t-body-sm text-muted-foreground leading-relaxed">
            Advisors do not diagnose, treat, prescribe, or evaluate individual patients through Source Standard.
          </p>
        </div>
      </PageSection>

      <PageSection
        id="structure"
        title="Planned seats"
        intro="Seats remain open. Names will be published only after appointment. No advisor is listed here in advance."
      >
        <DefList items={ROLES} />
      </PageSection>

      <PageSection last id="boundaries" title="Boundaries" intro="What advisory participation does and does not include.">
        <ul className="list-disc space-y-2 pl-5 t-body-sm leading-relaxed text-muted-foreground">
          {BOUNDARIES.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </PageSection>
    </>
  );
};

export default MedicalAdvisory;
