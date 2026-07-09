import { PageMeta } from "@/components/PageMeta";
import { Section, Eyebrow, SectionHeading } from "@/components/system";
import { BriefingHero } from "@/components/BriefingHero";
import openLogo from "@/assets/open-logo-transparent.png.asset.json";

const PARTNER_CATEGORIES = [
  {
    title: "Independent Laboratories",
    description:
      "Perform independent testing to verify the quality and integrity of compounded therapies.",
  },
  {
    title: "Healthcare Organizations",
    description:
      "Provide clinical expertise and guidance that supports transparent healthcare practices.",
  },
  {
    title: "Compounding Facilities",
    description:
      "Supply therapies manufactured according to established quality and sourcing standards.",
  },
  {
    title: "Medical Advisors",
    description:
      "Offer independent clinical oversight to help ensure objective, evidence-based verification.",
  },
  {
    title: "Research Partners",
    description:
      "Contribute data and insights that improve transparency across the therapy supply chain.",
  },
];

const Partners = () => (
  <>
    <PageMeta
      title="Partners"
      description="Independent organizations, laboratories, physicians, and partners that support the Source Standard verification ecosystem."
      path="/partners"
    />

    <BriefingHero
      tone="navy"
      variant="chapter"
      category="Partners"
      title="Who Helps Keep Source Standard Independent?"
      statement="Learn about the independent organizations, laboratories, physicians, and partners that support the Source Standard verification ecosystem."
      docId=""
    />

    {/* Section 1 — Why does Source Standard have partners? */}
    <Section>
      <SectionHeading>Why does Source Standard have partners?</SectionHeading>
      <div className="mt-6 space-y-5 t-body-md text-muted-foreground">
        <p>
          Consumers should not have to rely on a company&apos;s own claims about its products.
          Transparency is stronger when multiple independent parties contribute to the verification process.
        </p>
        <p>
          Source Standard works with independent organizations because independent contributions
          help preserve objectivity. Laboratory testing, clinical guidance, and supporting infrastructure
          are intentionally kept separate from Source Standard to maintain that independence.
        </p>
      </div>
    </Section>

    {/* Section 2 — Who are Source Standard's partners? */}
    <Section>
      <SectionHeading>Who are Source Standard&apos;s partners?</SectionHeading>
      <p className="mt-6 t-body-md text-muted-foreground">
        Source Standard collaborates with a range of independent organizations to support
        transparent verification across the therapy supply chain.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {PARTNER_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="border border-border bg-background p-6"
          >
            <h3 className="t-section-title-sm text-foreground">{cat.title}</h3>
            <p className="mt-2 t-body-sm text-muted-foreground">{cat.description}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* Section 3 — Featured Partner: Open */}
    <Section>
      <Eyebrow>Clinical Intelligence Partner</Eyebrow>
      <div className="mt-4">
        <SectionHeading>Open</SectionHeading>
      </div>
      <div className="mt-8 border border-border bg-background p-6 md:p-8">
        <div className="flex items-center">
          <img
            src={openLogo.url}
            alt="Open"
            className="h-14 w-auto md:h-16"
            loading="lazy"
          />
        </div>
        <div className="mt-6 space-y-4 t-body-md text-muted-foreground">
          <p>
            Source Standard verifies where therapies come from. Open studies what happens after they are used.
          </p>
          <p>
            Open is a physician-led organization focused on helping healthcare professionals
            better understand clinical outcomes and response patterns.
          </p>
          <p>
            Together, these two organizations provide different layers of transparency:
            one at the source, and one at the point of care.
          </p>
        </div>
      </div>
    </Section>

    {/* Section 4 — Two Different Questions */}
    <Section bordered={false}>
      <SectionHeading>Two Different Questions</SectionHeading>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="border border-border bg-background p-6 md:p-8">
          <h3 className="t-section-title-sm text-foreground">
            Can I trust where it came from?
          </h3>
          <p className="mt-4 t-body-md text-muted-foreground">
            Source Standard provides independent verification and sourcing transparency.
          </p>
        </div>
        <div className="border border-border bg-background p-6 md:p-8">
          <h3 className="t-section-title-sm text-foreground">
            What happened after it was used?
          </h3>
          <p className="mt-4 t-body-md text-muted-foreground">
            Open helps healthcare professionals better understand clinical outcomes and response patterns.
          </p>
        </div>
      </div>
      <p className="mt-8 t-body-md text-muted-foreground">
        Both organizations provide different layers of transparency that help consumers and
        professionals make more informed decisions.
      </p>
    </Section>
  </>
);

export default Partners;
