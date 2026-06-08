import { PageMeta } from "@/components/PageMeta";
import { Section, Eyebrow, PageTitle, SectionHeading, Lead } from "@/components/system";
import openLogo from "@/assets/open-logo.png.asset.json";

type Lab = {
  name: string;
  capabilities: string;
  status: string;
  accreditation: string;
  website: string;
};

const LABS: Lab[] = [
  {
    name: "Independent Laboratory — Placeholder A",
    capabilities: "Identity, potency, and sterility testing for compounded preparations.",
    status: "Active participant",
    accreditation: "Accreditation details pending publication.",
    website: "Website pending",
  },
  {
    name: "Independent Laboratory — Placeholder B",
    capabilities: "Endotoxin, particulate, and stability analysis.",
    status: "Active participant",
    accreditation: "Accreditation details pending publication.",
    website: "Website pending",
  },
];

const PROCESS = [
  { n: "01", label: "Intelligence Partners" },
  { n: "02", label: "Facility Verification" },
  { n: "03", label: "Independent Testing" },
  { n: "04", label: "Source Standard Registry" },
  { n: "05", label: "Ongoing Monitoring" },
];

const FieldRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1 border-t border-border py-3 first:border-t-0 first:pt-0 sm:flex-row sm:gap-6">
    <div className="t-utility-xs text-muted-foreground sm:w-44 sm:shrink-0 sm:pt-0.5 uppercase tracking-wider">
      {label}
    </div>
    <div className="t-body-sm text-foreground">{children}</div>
  </div>
);

const LabCard = ({ lab }: { lab: Lab }) => (
  <article className="border border-border bg-background p-6 md:p-7">
    <h3 className="h-card text-foreground">{lab.name}</h3>
    <div className="mt-5 flex flex-col">
      <FieldRow label="Testing Capabilities">{lab.capabilities}</FieldRow>
      <FieldRow label="Verification Status">{lab.status}</FieldRow>
      <FieldRow label="Accreditation">{lab.accreditation}</FieldRow>
      <FieldRow label="Website">
        <span className="t-utility-xs uppercase tracking-wider text-muted-foreground">{lab.website}</span>
      </FieldRow>
    </div>
  </article>
);

const Partners = () => (
  <>
    <PageMeta
      title="Partners & Infrastructure"
      description="Independent laboratory partners, verification network participants, and the research partnership between Source Standard and Open."
      path="/partners"
    />

    {/* Page header */}
    <Section bordered={false}>
      <Eyebrow>Infrastructure</Eyebrow>
      <div className="mt-4">
        <PageTitle>Partners & Infrastructure</PageTitle>
      </div>
      <div className="mt-5 max-w-2xl">
        <Lead>
          Public documentation of the independent laboratories, participating organizations, and research
          partners that support the Source Standard verification framework.
        </Lead>
      </div>
    </Section>

    {/* Section 1 — Verification Infrastructure */}
    <Section>
      <Eyebrow>Section 01</Eyebrow>
      <div className="mt-4">
        <SectionHeading>Independent Verification Infrastructure</SectionHeading>
      </div>
      <div className="mt-6 max-w-3xl space-y-5 t-body-md text-muted-foreground">
        <p>
          Source Standard operates through independent third-party laboratory testing, structured verification
          procedures, and ongoing monitoring protocols designed to strengthen confidence throughout the
          compounded therapy supply chain.
        </p>
        <p>
          All testing used within the Source Standard framework is performed by independent laboratories.
          Source Standard does not conduct laboratory testing internally. This separation exists to preserve
          objectivity, reduce conflicts of interest, and ensure verification decisions are based on
          independently generated data.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {LABS.map((lab) => (
          <LabCard key={lab.name} lab={lab} />
        ))}
      </div>
    </Section>

    {/* Section 2 — Verification Network */}
    <Section>
      <Eyebrow>Section 02</Eyebrow>
      <div className="mt-4">
        <SectionHeading>Verification Network</SectionHeading>
      </div>
      <div className="mt-6 max-w-3xl space-y-5 t-body-md text-muted-foreground">
        <p>
          Source Standard works with participating clinics, vendors, pharmacies, manufacturers, and
          healthcare organizations to support source verification, facility intelligence, product monitoring,
          and supply-chain transparency.
        </p>
        <p>
          Participating organizations contribute to the verification ecosystem through documentation review,
          facility verification, product testing, monitoring activities, and ongoing compliance with Source
          Standard procedures.
        </p>
      </div>

      {/* Mobile: vertical flow */}
      <div className="mt-10 flex flex-col gap-0 lg:hidden">
        {PROCESS.map((step, i) => (
          <div key={step.n} className="flex flex-col items-stretch">
            <div className="border border-border bg-background px-5 py-4">
              <div className="t-utility-xs uppercase tracking-wider text-muted-foreground">{step.n}</div>
              <div className="mt-1 t-body-sm font-medium text-foreground">{step.label}</div>
            </div>
            {i < PROCESS.length - 1 && (
              <div className="flex h-6 items-center justify-center">
                <span className="block h-6 w-px bg-border" aria-hidden />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: horizontal flow */}
      <div className="mt-10 hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch">
        {PROCESS.map((step, i) => (
          <>
            <div key={step.n} className="border border-border bg-background px-4 py-5">
              <div className="t-utility-xs uppercase tracking-wider text-muted-foreground">{step.n}</div>
              <div className="mt-1 t-body-sm font-medium text-foreground">{step.label}</div>
            </div>
            {i < PROCESS.length - 1 && (
              <div key={`${step.n}-sep`} className="flex items-center justify-center px-2">
                <span className="block h-px w-6 bg-border" aria-hidden />
              </div>
            )}
          </>
        ))}
      </div>
    </Section>

    {/* Section 3 — Research Infrastructure */}
    <Section>
      <Eyebrow>Section 03</Eyebrow>
      <div className="mt-4">
        <SectionHeading>Research Infrastructure</SectionHeading>
      </div>

      <article className="mt-8 border border-border bg-background p-6 md:p-8">
        <div className="flex items-center">
          <img
            src={openLogo.url}
            alt="Open"
            className="h-9 w-auto md:h-11"
            loading="lazy"
          />
        </div>
        <div className="mt-6 flex flex-col">
          <FieldRow label="Organization">Open</FieldRow>
          <FieldRow label="Classification">Clinical Intelligence Partner</FieldRow>
          <FieldRow label="Description">
            <div className="space-y-4">
              <p>
                Open is a physician-led clinical intelligence organization focused on helping healthcare
                professionals better understand emerging therapies, protocols, procedures, and treatment
                outcomes.
              </p>
              <p>While Source Standard verifies the source layer, Open studies the response layer.</p>
              <p>
                Source Standard focuses on source integrity, supply-chain verification, facility monitoring,
                and product accountability.
              </p>
              <p>
                Open focuses on clinical outcomes, monitoring frameworks, protocol intelligence, evidence
                generation, and professional decision support.
              </p>
              <p>
                Together, these organizations represent two complementary layers of infrastructure for
                emerging medicine.
              </p>
            </div>
          </FieldRow>
          <FieldRow label="Website">
            <span className="t-utility-xs uppercase tracking-wider text-muted-foreground">
              Website — Coming Soon
            </span>
          </FieldRow>
        </div>
      </article>
    </Section>

    {/* Section 4 — Why This Matters */}
    <Section>
      <Eyebrow>Section 04</Eyebrow>
      <div className="mt-4">
        <SectionHeading>Source Integrity + Clinical Intelligence</SectionHeading>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-0">
        <div className="border border-border bg-background p-6 md:p-8 lg:border-r-0">
          <p className="t-section-title-sm text-foreground">“Was the source trustworthy?”</p>
          <p className="mt-5 t-body-md text-muted-foreground">
            Source Standard provides independent verification, monitoring, and source accountability.
          </p>
        </div>
        <div className="border border-border bg-background p-6 md:p-8">
          <p className="t-section-title-sm text-foreground">“What happened after it was used?”</p>
          <p className="mt-5 t-body-md text-muted-foreground">
            Open provides structured clinical intelligence designed to help professionals better understand
            outcomes, safety, monitoring, and response patterns.
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-8 text-center">
        <p className="t-body-md italic text-foreground">
          Trust begins with verified sources. Progress depends on measurable outcomes.
        </p>
      </div>
    </Section>
  </>
);

export default Partners;
