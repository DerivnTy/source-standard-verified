import { PageMeta } from "@/components/PageMeta";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection, FeatureItem, ProcessSteps } from "@/components/system";

const STEPS = [
  {
    title: "Provider enters the registry",
    desc: "A compounding pharmacy or clinic is added to the Source Standard public registry.",
  },
  {
    title: "Review of available information",
    desc: "Source Standard reviews available information for providers undergoing verification.",
  },
  {
    title: "Public verification status",
    desc: "A public verification status is assigned and shown on the provider's profile.",
  },
  {
    title: "Ongoing record maintenance",
    desc: "Records are periodically reviewed and updated as new public information becomes available.",
  },
];

const MEANS = [
  "Public sourcing transparency",
  "Independent review within the Source Standard framework",
  "Public verification status",
  "Ongoing record maintenance",
];

const DOES_NOT_MEAN = [
  "Medical advice",
  "FDA approval",
  "Product approval",
  "Safety guarantee",
  "Treatment recommendation",
  "Future outcome guarantee",
];

const HowItWorks = () => {
  const heroDescription =
    "How Source Standard verification works, what it means, and what it does not mean for consumers.";

  return (
    <>
      <Breadcrumb items={[{ label: "About", to: "/about" }, { label: "How Verification Works" }]} />

      <PageMeta
        title="How Verification Works · Source Standard"
        description={heroDescription}
        path="/how-it-works"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How Verification Works",
          url: "https://sourcestandard.org/how-it-works",
        }}
      />

      <BriefingHero
        tone="navy"
        variant="chapter"
        category="Public Guide"
        title="How Verification Works"
        statement={heroDescription}
        docId=""
      />

      <PageSection
        title="What Is Verification?"
        intro="Source Standard verification is a public reference standard. It gives consumers a consistent way to see whether a compounding pharmacy or clinic has undergone independent review of the sourcing information it publishes."
      >
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "64ch", margin: 0 }}
        >
          Verification is not a clinical, medical, or regulatory certification. It is a transparency signal about publicly available sourcing information.
        </p>
      </PageSection>

      <PageSection
        icon="shield-check"
        title="How Does Verification Work?"
      >
        <ProcessSteps steps={STEPS} />
      </PageSection>

      <PageSection title="What Does Verified Mean?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {MEANS.map((item) => (
            <FeatureItem key={item} icon="check" title={item} desc="" variant="row" />
          ))}
        </div>
      </PageSection>

      <PageSection icon="minus" title="What Does Verified Not Mean?">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {DOES_NOT_MEAN.map((item) => (
            <div key={item} className="flex items-start gap-3 text-left">
              <span
                className="text-muted-foreground/70 shrink-0 inline-flex"
                style={{ paddingTop: "6px" }}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </span>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "15px", lineHeight: 1.5, fontWeight: 400, margin: 0 }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        title="Why Does This Matter?"
        intro="Source Standard exists to bring public transparency to the compounded peptide market. By reviewing sourcing information and publishing verification status, Source Standard helps consumers, clinicians, and healthcare organizations understand where their care comes from."
        bordered={false}
      >
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.65, maxWidth: "64ch", margin: 0 }}
        >
          Verification is one input among many. It is intended to support informed decision-making, not to replace medical judgment or regulatory oversight.
        </p>
        <p
          className="mt-6 text-muted-foreground"
          style={{ fontSize: "12px", lineHeight: 1.6, fontWeight: 400 }}
        >
          Source Standard does not provide medical advice, treatment guidance, or clinical recommendations. Verification reflects only publicly reviewed sourcing information within the Source Standard framework. Unverified status does not imply that a provider is unsafe, unlawful, fraudulent, or clinically inappropriate. Source Standard does not certify product potency, sterility, safety, efficacy, manufacturing quality, or future performance, and does not replace federal, state, or medical regulatory oversight.
        </p>
      </PageSection>
    </>
  );
};

export default HowItWorks;
