import { Check, X } from "lucide-react";
import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BriefingHero } from "@/components/BriefingHero";
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

const DefRow = ({ term, def }: { term: string; def: string }) => (
  <div className="grid grid-cols-1 gap-y-1 py-3.5">
    <dt
      className="font-sans text-foreground"
      style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0 }}
    >
      {term}
    </dt>
    <dd
      className="text-muted-foreground"
      style={{ fontSize: "14px", lineHeight: 1.6, margin: 0 }}
    >
      {def}
    </dd>
  </div>
);

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

      {/* What verification is */}
      <PageSection first id="what-verification-is" title="What Verification Is">
        <div className="flex flex-col gap-4" style={{ maxWidth: "68ch" }}>
          <p className="text-foreground" style={{ fontSize: "17px", lineHeight: 1.6, margin: 0 }}>
            <span className="font-semibold">Verification</span> is a documented review of the sourcing information a vendor publishes, conducted within the Source Standard framework.
          </p>
          <p className="text-foreground" style={{ fontSize: "17px", lineHeight: 1.6, margin: 0 }}>
            <span className="font-semibold">Verified</span> means the vendor's sourcing representations were supported by the information reviewed within a defined scope at the time of review.
          </p>
        </div>
      </PageSection>

      {/* What verification is not */}
      <PageSection id="what-verification-is-not" compact title="What Verification Is Not">
        <p
          className="text-muted-foreground"
          style={{ fontSize: "15px", lineHeight: 1.7, maxWidth: "68ch", margin: 0 }}
        >
          Verification is not a clinical, medical, or regulatory certification. It is a transparency signal about publicly available sourcing information.
        </p>
      </PageSection>

      {/* Protocol */}
      <PageSection
        id="protocol"
        title="Protocol"
        intro="Each vendor record moves through the same four steps within the Source Standard framework."
      >
        <div style={{ maxWidth: "68ch" }}>
          <ProcessSteps steps={STEPS} />
        </div>
      </PageSection>

      {/* What verification means */}
      <PageSection
        id="meaning"
        title="What Verification Means"
        bordered={false}
        pb="0"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: "10px" }}>
              <Check size={16} strokeWidth={1.75} className="text-primary/80" aria-hidden />
              <h3
                className="font-sans text-foreground"
                style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0 }}
              >
                Verification means
              </h3>
            </div>
            <dl className="divide-y divide-border/60 border-t border-b border-border/60">
              {MEANS.map((item) => (
                <DefRow key={item.t} term={item.t} def={item.d} />
              ))}
            </dl>
          </div>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: "10px" }}>
              <X size={16} strokeWidth={1.75} className="text-muted-foreground" aria-hidden />
              <h3
                className="font-sans text-foreground"
                style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "-0.005em", margin: 0 }}
              >
                Verification does not mean
              </h3>
            </div>
            <dl className="divide-y divide-border/60 border-t border-b border-border/60">
              {DOES_NOT_MEAN.map((item) => (
                <DefRow key={item.t} term={item.t} def={item.d} />
              ))}
            </dl>
          </div>
        </div>
      </PageSection>

      <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default HowItWorks;
