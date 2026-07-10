import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";

type Item = { term: string; description: string };

const PRINCIPLES: Item[] = [
  { term: "Evidence", description: "Verification is based on reviewed documentation, public records, and other supporting information." },
  { term: "Defined Scope", description: "Only the facilities, sourcing relationships, and records included in the review are evaluated." },
  { term: "Point in Time Review", description: "Verification reflects the information available when the review was completed. Records may change if new information becomes available." },
];

const VerificationDisclaimer = () => {
  const lead =
    "The scope and limits of Source Standard verification, public statuses, and public-reference records.";

  return (
    <>
      <PageMeta title="What Verification Does, and Doesn't, Mean" description={lead} />

      <ArticleHeader
        category="Framework · Verification Disclaimer"
        title="What Verification Does, and Doesn't, Mean"
        lead={lead}
        backHref="/"
        backLabel="Back to Home"
      />

      <ArticleSection variant="prose">
        <p>
          Source Standard exists to improve transparency around sourcing claims and the pharmacies, facilities, and manufacturers that vendors rely on within the compounded therapy market. Verification is a documented review of the sourcing information a vendor publishes, conducted within the Source Standard framework.
        </p>
        <p>
          Because verification statuses may be viewed by consumers, providers, vendors, and third parties, it is important that the framework be interpreted within its intended scope. This document defines what Source Standard verification establishes, what it does not establish, and the limits under which registry information should be interpreted.
        </p>
      </ArticleSection>

      <ArticleSection variant="prose" title="What verification establishes">
        <p>
          A Verified status indicates that the information available to Source Standard supported the reviewed sourcing representations within the defined review scope at the time of review. Verification establishes only the state of reviewed information within that scope. It does not establish facts beyond what was available at the time of review.
        </p>
        <DefList items={ESTABLISHES} />
      </ArticleSection>

      <ArticleSection variant="prose" title="What verification does not establish">
        <p>Verification has defined limits.</p>
        <DefList items={DOES_NOT_ESTABLISH} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Institutional boundaries">
        <p>What Source Standard is not.</p>
        <DefList items={BOUNDARIES} />
      </ArticleSection>

      <ArticleSection variant="prose" title="Reliance on registry information">
        <p>
          Registry records are intended to improve transparency and public understanding. Users should not rely on Source Standard records as a substitute for medical advice, legal advice, regulatory guidance, or independent due diligence.
        </p>
        <p>Medical decisions should be made with licensed healthcare professionals.</p>
        <p>Legal and regulatory decisions should be made with qualified professionals and appropriate authorities.</p>
      </ArticleSection>

      <ArticleSection variant="prose" title="Framework interpretation">
        <p>
          Source Standard verification should be interpreted as a transparency determination made within a defined public review framework. It is not a certification program, a guarantee program, a regulatory designation, or a medical recommendation. Its purpose is to improve public visibility into sourcing claims and the pharmacies, facilities, and manufacturers that vendors rely on.
        </p>
      </ArticleSection>

      <ArticleSection variant="callout" kind="Key takeaway" title="Verification is an evidence determination, not a guarantee">
        <p>
          The purpose of the Source Standard framework is to create a clearer public record around sourcing transparency. Verification reflects reviewed information within a defined scope and should always be interpreted within the limits of that scope.
        </p>
      </ArticleSection>

      <EditorialBackLink to="/" label="Back to Home" />
    </>
  );
};

export default VerificationDisclaimer;
