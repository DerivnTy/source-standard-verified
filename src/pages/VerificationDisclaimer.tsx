import { PageMeta } from "@/components/PageMeta";
import { EditorialBackLink } from "@/components/EditorialBackLink";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleSection } from "@/components/ArticleSection";
import { DefList } from "@/components/DefList";

type Item = { term: string; description: string };

const ESTABLISHES: Item[] = [
  { term: "Reviewed information", description: "Verification reflects the information considered at the time of review, which may include documentation, sourcing records, public records, and other supporting materials." },
  { term: "Defined scope", description: "Verification applies only to the categories, facilities, relationships, and records included within the published review scope." },
  { term: "Point-in-time determination", description: "Verification reflects conditions at the time of review and may change as new information becomes available." },
  { term: "Status-based framework", description: "Verification exists within a status framework that allows records to be updated, suspended, revised, or removed when circumstances change." },
];

const DOES_NOT_ESTABLISH: Item[] = [
  { term: "Product safety", description: "Source Standard does not guarantee product safety, potency, purity, sterility, or future quality." },
  { term: "Clinical outcomes", description: "Source Standard does not evaluate treatment effectiveness, patient outcomes, or biological response." },
  { term: "Medical appropriateness", description: "Source Standard does not determine whether a therapy, medication, protocol, or provider is appropriate for any individual." },
  { term: "Regulatory compliance", description: "Source Standard does not replace or perform the functions of federal, state, medical, pharmacy, or regulatory authorities." },
  { term: "Future performance", description: "Verification is not a guarantee of future conduct, future documentation accuracy, future sourcing relationships, or future compliance." },
];

const BOUNDARIES: Item[] = [
  { term: "Not a regulator", description: "Source Standard does not possess governmental or enforcement authority." },
  { term: "Not a medical practice", description: "Source Standard does not diagnose, prescribe, dispense, or provide medical care." },
  { term: "Not a pharmacy", description: "Source Standard does not compound, manufacture, distribute, or supply medications." },
  { term: "Not a testing laboratory", description: "Source Standard does not operate an analytical laboratory. Independent testing results, when referenced, come from qualified third-party laboratories." },
  { term: "Not an endorsement organization", description: "Verification does not constitute vendor endorsement, product endorsement, treatment recommendation, ranking, or promotional approval." },
  { term: "Not a certifying authority", description: "Source Standard assigns statuses under its own framework and is not a government certification body, accreditation organization, or regulatory authority." },
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
          Source Standard exists to improve transparency around sourcing claims and the pharmacies, facilities, and manufacturers that vendors rely on within the compounded therapy market. Verification is an evidence-informed determination made within a defined public review framework.
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
