import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
import { InfoCallout } from "@/components/InfoCallout";
import { PageSection, ProcessSteps } from "@/components/system";

const STEPS = [
  {
    title: "Vendor enters the registry",
    desc: "A vendor — typically a clinic, telehealth company, or hybrid provider — is added to the Source Standard public registry.",
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
        eyebrow="Public Guide"
        heroPadding={{
          top: "clamp(48px, 7vh, 80px)",
          bottom: "clamp(56px, 8vh, 96px)",
        }}
        titleClassName="max-w-[18ch]"
        statementClassName="!text-[15px] md:!text-[16px] !leading-[1.75] !font-normal !text-white/65 max-w-[52ch]"
      />

      {/* What verification is */}
      <PageSection first className="!pt-10 !pb-8 md:!pt-12 md:!pb-10 lg:!pt-14 lg:!pb-12">
        <div className="mx-auto max-w-[45ch] sm:max-w-[52ch] md:max-w-reading">
          <p className="t-body-md text-foreground" style={{ lineHeight: 1.75 }}>
            <span className="font-semibold">Verification</span> is a documented review of the sourcing information a vendor publishes, conducted within the Source Standard framework. <span className="font-semibold">Verified</span> means the vendor's sourcing representations were supported by the information reviewed within a defined scope at the time of review.
          </p>
        </div>
      </PageSection>

      {/* What verification is not */}
      <PageSection className="!pt-8 !pb-10 md:!pt-10 md:!pb-12 lg:!pt-10 lg:!pb-14">
        <div className="mx-auto max-w-[45ch] sm:max-w-[52ch] md:max-w-reading">
          <p className="t-body-md text-muted-foreground" style={{ lineHeight: 1.75 }}>
            Verification is not a clinical, medical, or regulatory certification. It is a transparency signal about publicly available sourcing information.
          </p>
        </div>
      </PageSection>

      {/* Informational notice */}
      <PageSection className="!pt-0 !pb-10 md:!pb-12 lg:!pb-14">
        <InfoCallout>
          Source Standard does not provide medical advice, treatment guidance, or clinical recommendations. Verification reflects only publicly reviewed sourcing information within the Source Standard framework. Unverified status does not imply that a provider is unsafe, unlawful, fraudulent, or clinically inappropriate. Source Standard does not certify product potency, sterility, safety, efficacy, manufacturing quality, or future performance, and does not replace federal, state, or medical regulatory oversight.
        </InfoCallout>
      </PageSection>

      {/* Protocol */}
      <PageSection className="!pt-10 !pb-10 md:!pt-12 md:!pb-12 lg:!pt-14 lg:!pb-14">
        <div className="rounded-xl bg-surface border border-border p-5 md:p-6 lg:p-7">
          <p
            className="t-eyebrow-sm text-muted-foreground mb-5"
            style={{ fontSize: "11px", letterSpacing: "0.12em" }}
          >
            Protocol
          </p>
          <ProcessSteps steps={STEPS} />
        </div>
      </PageSection>

      {/* What verification means */}
      <PageSection
        id="meaning"
        bordered={false}
        className="!pt-10 !pb-10 md:!pt-12 md:!pb-12 lg:!pt-14 lg:!pb-14"
      >
        <div className="rounded-xl bg-surface border border-border p-5 md:p-6 lg:p-7">
          <h2
            className="text-foreground"
            style={{
              fontSize: "22px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              marginBottom: "24px",
            }}
          >
            What Verification Means
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div>
              <h3
                className="t-eyebrow-sm text-muted-foreground"
                style={{ fontSize: "11px", letterSpacing: "0.12em", marginBottom: "14px" }}
              >
                Means
              </h3>
              <dl className="space-y-4">
                {MEANS.map((item) => (
                  <div key={item.t} className="grid grid-cols-1 gap-y-0.5">
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
                className="t-eyebrow-sm text-muted-foreground"
                style={{ fontSize: "11px", letterSpacing: "0.12em", marginBottom: "14px" }}
              >
                Does not mean
              </h3>
              <dl className="space-y-4">
                {DOES_NOT_MEAN.map((item) => (
                  <div key={item.t} className="grid grid-cols-1 gap-y-0.5">
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
        </div>
      </PageSection>

      <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default HowItWorks;
