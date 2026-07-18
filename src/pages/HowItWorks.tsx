import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { PageSection, ProcessSteps } from "@/components/system";

const STEPS = [
  {
    title: "Vendor enters the registry",
    desc: "A vendor \u2014 typically a clinic, telehealth company, or hybrid provider \u2014 is added to the Source Standard public registry.",
  },
  {
    title: "Review of available information",
    desc: "Source Standard reviews the documentation and public information supporting the vendor's sourcing claims within the framework.",
  },
  {
    title: "Public verification status",
    desc: "A public verification status is assigned and shown on the vendor's profile.",
  },
  {
    title: "Ongoing record maintenance",
    desc: "Records are periodically reviewed and updated as new public information becomes available.",
  },
];

const MEANS = [
  { t: "Public sourcing transparency", d: "The information supporting a sourcing claim has been reviewed and published." },
  { t: "Independent review", d: "Review is conducted within the Source Standard framework, separate from any vendor." },
  { t: "Public verification status", d: "A defined status is assigned and shown on the provider's public record." },
  { t: "Ongoing record maintenance", d: "The record is kept current as new public information becomes available." },
];

const DOES_NOT_MEAN = [
  { t: "Medical advice", d: "Verification is not a diagnosis, treatment recommendation, or clinical guidance." },
  { t: "FDA approval", d: "Verification is not a federal drug approval or a regulatory endorsement." },
  { t: "Product certification", d: "Verification does not certify potency, sterility, safety, or efficacy of a product." },
  { t: "Safety guarantee", d: "Verification is not a guarantee of clinical safety or future performance." },
  { t: "Treatment recommendation", d: "Source Standard does not recommend treatments, therapies, or providers." },
  { t: "Future outcome guarantee", d: "Verification does not predict how any individual will respond to any therapy." },
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


      {/* Movement 1 — Definition. Dictionary-style opening. No section heading. */}
      <PageSection first className="!pt-6 !pb-6 md:!pt-7 md:!pb-7 lg:!pt-7 lg:!pb-7">
        <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
          <p
            className="text-foreground"
            style={{ fontSize: "16px", lineHeight: 1.65, margin: 0 }}
          >
            <span className="font-semibold">Verification</span> is a documented review of the sourcing information a vendor publishes, conducted within the Source Standard framework. <span className="font-semibold">Verified</span> means the vendor's sourcing representations were supported by the information reviewed within a defined scope at the time of review.
          </p>
          <p
            className="text-muted-foreground"
            style={{ fontSize: "16px", lineHeight: 1.65, margin: 0 }}
          >
            Verification is not a clinical, medical, or regulatory certification. It is a transparency signal about publicly available sourcing information.
          </p>
        </div>
      </PageSection>

      {/* Movement 2 — Protocol. Small margin label, ProcessSteps carries the section. */}
      <PageSection className="!py-6 md:!py-7 lg:!py-7">
        <p
          className="font-mono uppercase text-muted-foreground"
          style={{ fontSize: "11px", letterSpacing: "0.14em", marginBottom: "20px" }}
        >
          Protocol
        </p>
        <ProcessSteps steps={STEPS} />
      </PageSection>



      {/* Movement 3 — What verification means. One heading, two labeled columns. */}
      <PageSection id="meaning" title="What Verification Means" className="!py-6 md:!py-7 lg:!py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <h3
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.14em", marginBottom: "8px" }}
            >
              Means
            </h3>
            <dl className="divide-y divide-border/60 border-t border-b border-border/60">
              {MEANS.map((item) => (
                <div key={item.t} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-6 gap-y-1 py-3.5">
                  <dt className="font-sans text-foreground" style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>
                    {item.t}
                  </dt>
                  <dd className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {item.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3
              className="font-mono uppercase text-muted-foreground"
              style={{ fontSize: "11px", letterSpacing: "0.14em", marginBottom: "8px" }}
            >
              Does not mean
            </h3>
            <dl className="divide-y divide-border/60 border-t border-b border-border/60">
              {DOES_NOT_MEAN.map((item) => (
                <div key={item.t} className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-6 gap-y-1 py-3.5">
                  <dt className="font-sans text-foreground" style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>
                    {item.t}
                  </dt>
                  <dd className="text-muted-foreground" style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {item.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p
          className="text-muted-foreground"
          style={{ fontSize: "12px", lineHeight: 1.6, marginTop: "28px", marginBottom: 0, maxWidth: "68ch" }}
        >
          Source Standard does not provide medical advice, treatment guidance, or clinical recommendations. Verification reflects only publicly reviewed sourcing information within the Source Standard framework. Unverified status does not imply that a provider is unsafe, unlawful, fraudulent, or clinically inappropriate. Source Standard does not certify product potency, sterility, safety, efficacy, manufacturing quality, or future performance, and does not replace federal, state, or medical regulatory oversight.
        </p>
      </PageSection>
    <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default HowItWorks;
