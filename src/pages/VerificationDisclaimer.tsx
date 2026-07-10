import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";
import { KeyTakeaway } from "@/components/learn/KeyTakeaway";

type Item = { term: string; description: string };

const PRINCIPLES: Item[] = [
  { term: "Evidence", description: "Verification is based on reviewed documentation, public records, and other supporting information." },
  { term: "Defined Scope", description: "Only the facilities, sourcing relationships, and records included in the review are evaluated." },
  { term: "Point in Time Review", description: "Verification reflects the information available when the review was completed. Records may change if new information becomes available." },
];

const VerificationDisclaimer = () => {
  const lead =
    "Source Standard verification is an independent review of a vendor's published sourcing information.";

  return (
    <>
      <PageMeta title="What Does Source Standard Verification Mean?" description={lead} />

      <ArticleHeader
        category="Framework · Verification Disclaimer"
        title="What Does Source Standard Verification Mean?"
        lead={lead}
        backHref="/"
        backLabel="Back to Home"
      />

      <ArticleSection variant="prose">
        <p>
          Source Standard verification is an independent review of a vendor's published sourcing information. A Verified status means the sourcing representations reviewed were supported by the documentation and public records available within the defined scope of the review at that point in time.
        </p>
        <p>
          Verification is designed to improve transparency. It is not a certification, an endorsement, a guarantee, or regulatory approval.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="What Verification Means">
        <p>
          A Verified status indicates that Source Standard reviewed a vendor's sourcing claims and found that the available documentation supported those claims within the published review scope.
        </p>
        <p>Every verification is based on three principles.</p>
        <DefList items={PRINCIPLES} />
      </ArticleSection>

      <ArticleSection variant="prose" title="What Verification Does Not Mean">
        <p>A Verified status should never be interpreted as a guarantee.</p>
        <p>Source Standard does not determine:</p>
        <ul className="list-disc pl-5">
          <li>Product safety, potency, purity, or sterility.</li>
          <li>Clinical effectiveness or patient outcomes.</li>
          <li>Whether a treatment is appropriate for an individual.</li>
          <li>Future compliance or future business practices.</li>
          <li>Regulatory approval or legal compliance beyond the reviewed scope.</li>
        </ul>
        <p>Verification reflects reviewed evidence, not future performance.</p>
      </ArticleSection>

      <ArticleSection variant="prose" title="What Source Standard Is">
        <p>
          Source Standard is an independent public reference organization focused on sourcing transparency.
        </p>
        <p>
          Our role is to review sourcing documentation, compare it with public records and framework standards, and publish transparent status determinations.
        </p>
        <p>Source Standard is not:</p>
        <ul className="list-disc pl-5">
          <li>A government regulator.</li>
          <li>A medical practice.</li>
          <li>A pharmacy or manufacturer.</li>
          <li>An analytical testing laboratory.</li>
          <li>An accreditation or certification body.</li>
          <li>A vendor endorsement organization.</li>
        </ul>
      </ArticleSection>

      <ArticleSection variant="prose" title="How Registry Information Should Be Used">
        <p>
          Registry records are intended to improve transparency and support informed decision making.
        </p>
        <p>They should be considered alongside:</p>
        <ul className="list-disc pl-5">
          <li>Guidance from licensed healthcare professionals.</li>
          <li>Official regulatory information.</li>
          <li>Independent due diligence.</li>
        </ul>
        <p>
          No registry record should be interpreted as the sole basis for a medical, legal, or purchasing decision.
        </p>
      </ArticleSection>

      <KeyTakeaway>
        A Source Standard verification indicates that reviewed sourcing claims were supported by the evidence available within a defined scope at the time of review. Every verification reflects the information available during that review and should always be interpreted within those boundaries.
      </KeyTakeaway>

      <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default VerificationDisclaimer;
