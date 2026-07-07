import { Fragment } from "react";
import { PageMeta } from "@/components/PageMeta";
import { Section, Eyebrow, SectionHeading, Lead } from "@/components/system";
import { BriefingHero } from "@/components/BriefingHero";
import openLogo from "@/assets/open-logo-transparent.png.asset.json";

const PROCESS = [
  { n: "01", label: "Healthcare Organizations" },
  { n: "02", label: "Independent Laboratories" },
  { n: "03", label: "Upstream Facilities" },
  { n: "04", label: "Public Registry" },
  { n: "05", label: "Research Partners" },
];

const FieldRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1 border-t border-border py-3 sm:flex-row sm:gap-6">
    <div className="t-utility-xs text-muted-foreground sm:w-44 sm:shrink-0 sm:pt-0.5 uppercase tracking-wider">
      {label}
    </div>
    <div className="t-body-sm text-foreground">{children}</div>
  </div>
);


const Partners = () => (
  <>
    <PageMeta
      title="Partners"
      description="Independent laboratories, participating organizations, and research partners that support the Source Standard verification ecosystem."
      path="/partners"
    />

    {/* Page hero — matches Verification Framework */}
    <BriefingHero
      tone="navy"
      variant="chapter"
      category="Partners"
      title="Partners"
      statement="Independent laboratories, participating organizations, and research partners that support the Source Standard verification ecosystem."
      docId=""
    />


    {/* Section 1 — Verification Infrastructure */}
    <Section>
      <Eyebrow>Section 01</Eyebrow>
      <div className="mt-4">
        <SectionHeading>Independent Verification Infrastructure</SectionHeading>
      </div>
      <div className="mt-6 space-y-5 t-body-md text-muted-foreground">
        <p>
          Source Standard collaborates with independent organizations to support objective verification and
          improve transparency throughout the compounded therapy supply chain.
        </p>
        <p>
          All testing used within the Source Standard framework is performed by independent laboratories.
          Source Standard does not conduct laboratory testing internally. This separation exists to preserve
          objectivity, reduce conflicts of interest, and ensure verification decisions are based on
          independently generated data.
        </p>
      </div>

    </Section>

    {/* Section 2 — Verification Network */}
    <Section>
      <Eyebrow>Section 02</Eyebrow>
      <div className="mt-4">
        <SectionHeading>Verification Network</SectionHeading>
      </div>
      <div className="mt-6 space-y-5 t-body-md text-muted-foreground">
        <p>
          Source Standard works alongside healthcare organizations, independent laboratories, upstream
          facilities, and research partners to build a transparent and accountable public-reference ecosystem.
        </p>
        <p>
          Participating organizations contribute expertise, infrastructure, and services that support the
          Source Standard framework and strengthen confidence across the compounded therapy supply chain.
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
          <Fragment key={step.n}>
            <div className="border border-border bg-background px-4 py-5">
              <div className="t-utility-xs uppercase tracking-wider text-muted-foreground">{step.n}</div>
              <div className="mt-1 t-body-sm font-medium text-foreground">{step.label}</div>
            </div>
            {i < PROCESS.length - 1 && (
              <div className="flex items-center justify-center px-2">
                <span className="block h-px w-6 bg-border" aria-hidden />
              </div>
            )}
          </Fragment>
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
            className="h-14 w-auto md:h-16"
            loading="lazy"
          />
        </div>
        <div className="mt-8 flex flex-col">
          <FieldRow label="Organization">Open</FieldRow>
          <FieldRow label="Classification">Clinical Intelligence Partner</FieldRow>
          <FieldRow label="Description">
            <div className="space-y-4">
              <p>
                Open is a physician-led clinical intelligence organization focused on helping healthcare
                professionals better understand emerging therapies and treatment outcomes.
              </p>
              <p>While Source Standard verifies the source layer, Open studies the response layer.</p>
              <p>
                Source Standard focuses on source integrity and supply-chain accountability.
              </p>
              <p>
                Open focuses on clinical outcomes and professional decision support.
              </p>
              <p>
                Together, these organizations represent two complementary layers of infrastructure for
                emerging medicine.
              </p>
            </div>
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
            Source Standard provides independent verification and source accountability.
          </p>
        </div>
        <div className="border border-border bg-background p-6 md:p-8">
          <p className="t-section-title-sm text-foreground">“What happened after it was used?”</p>
          <p className="mt-5 t-body-md text-muted-foreground">
            Open provides clinical intelligence designed to help professionals better understand outcomes and
            response patterns.
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
