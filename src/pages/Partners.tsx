import { PageMeta } from "@/components/PageMeta";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection, FeatureItem } from "@/components/system";
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

    <PageSection
      title="Why does Source Standard have partners?"
      intro="Consumers should not have to rely on a company's own claims about its products. Transparency is stronger when multiple independent parties contribute to the verification process."
    >
      <p
        className="text-muted-foreground"
        style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "64ch", margin: 0 }}
      >
        Source Standard works with independent organizations because independent contributions help preserve objectivity. Laboratory testing, clinical guidance, and supporting infrastructure are intentionally kept separate from Source Standard to maintain that independence.
      </p>
    </PageSection>

    <PageSection
      title="Who are Source Standard's partners?"
      intro="Source Standard collaborates with a range of independent organizations to support transparent verification across the therapy supply chain."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {PARTNER_CATEGORIES.map((cat) => (
          <FeatureItem key={cat.title} title={cat.title} desc={cat.description} variant="block" />
        ))}
      </div>
    </PageSection>

    <PageSection
      title="Open"
      intro="Clinical Intelligence Partner. Source Standard verifies where therapies come from. Open studies what happens after they are used."
    >
      <div
        className="bg-card"
        style={{
          border: "0.5px solid hsl(var(--border))",
          borderRadius: "12px",
          padding: "20px 24px",
        }}
      >
        <img
          src={openLogo.url}
          alt="Open"
          className="h-12 w-auto md:h-14"
          loading="lazy"
        />
      </div>
      <div className="mt-6 flex flex-col gap-3" style={{ maxWidth: "64ch" }}>
        <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
          Open is a physician-led organization focused on helping healthcare professionals better understand clinical outcomes and response patterns.
        </p>
        <p className="text-muted-foreground" style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
          Together, these two organizations provide different layers of transparency: one at the source, and one at the point of care.
        </p>
      </div>
    </PageSection>

    <PageSection
      title="Two Different Questions"
      bordered={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        <FeatureItem
          title="Can I trust where it came from?"
          desc="Source Standard provides independent verification and sourcing transparency."
          variant="block"
        />
        <FeatureItem
          title="What happened after it was used?"
          desc="Open helps healthcare professionals better understand clinical outcomes and response patterns."
          variant="block"
        />
      </div>
      <p
        className="mt-8 text-muted-foreground"
        style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "64ch" }}
      >
        Both organizations provide different layers of transparency that help consumers and professionals make more informed decisions.
      </p>
    </PageSection>
  </>
);

export default Partners;
